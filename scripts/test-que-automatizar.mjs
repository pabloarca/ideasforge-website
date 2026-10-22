#!/usr/bin/env node
/**
 * Pruebas de la herramienta «¿Qué tareas automatizar primero?» (t0190).
 *
 * Dos partes, y las dos tienen que pasar para publicar:
 *
 * 1. Reglas que nunca pueden romperse, comprobadas con miles de combinaciones
 *    de respuestas al azar (semilla fija, así que el resultado se repite). Son
 *    los dos principios del propietario (vender lo nuestro y mandar fuera solo
 *    lo evidente; las cuentas, siempre un programa) y el de oficio: ninguna
 *    cifra imposible ni rota.
 * 3. Desde el 21 oct 2026, el espejo inglés y los ejemplos: el inglés tiene
 *    las mismas preguntas, valores y números que el español (la lógica solo
 *    lee esos), los dos ficheros tienen las mismas claves de texto, y cada
 *    ejemplo de la página contesta todas las preguntas que la herramienta le
 *    haría, con valores que existen.
 * 2. Casos de referencia (`scripts/casos-que-automatizar.json`): tareas
 *    concretas con el veredicto y el estado que el propietario da por buenos.
 *    Si un cambio en las reglas mueve uno, falla, y hay que decidir si el
 *    caso estaba mal o el cambio.
 *
 * Usa el soporte de TypeScript de Node 24 para importar la lógica tal cual,
 * sin compilar nada: `node scripts/test-que-automatizar.mjs`.
 */
import { readFileSync } from 'node:fs';
import { analiza, NUESTROS, HABLAR, JORNADA, TOPE_HORAS, TOPE_PERDIDA, MUCHAS } from '../src/lib/que-automatizar.ts';
import { qa } from '../src/i18n/que-automatizar.ts';
import { qaEn } from '../src/i18n/que-automatizar-en.ts';
import { EJEMPLOS, DEPARTAMENTOS } from '../src/lib/que-automatizar-ejemplos.ts';

const PASOS = qa.pasos;
const fallos = [];
const falla = (regla, a, detalle = '') => fallos.push({ regla, a, detalle });

/* ---------- Generador de respuestas al azar, con semilla ---------- */
let semilla = 20261021;
const azar = () => ((semilla = (semilla * 1103515245 + 12345) % 2 ** 31) / 2 ** 31);
const una = (opts) => opts[Math.floor(azar() * opts.length)].v;
const varias = (opts) => {
  const l = opts.filter(() => azar() < 0.4).map((o) => o.v);
  return l.length ? l : [una(opts)];
};
function respuestas() {
  const a = { name: 'Prueba' };
  for (const p of PASOS) {
    if (p.tipo === 'texto') continue;
    if (p.cuando === 'fallos' && a.fallos === 'f0') continue;
    a[p.id] = p.tipo === 'varias' ? varias(p.opts) : una(p.opts);
    if (p.sub) {
      const si = Array.isArray(p.sub.si) ? p.sub.si : [p.sub.si];
      const v = Array.isArray(a[p.id]) ? a[p.id] : [a[p.id]];
      if (v.some((x) => si.includes(x))) a[p.sub.id] = una(p.sub.opts);
    }
  }
  return a;
}

/* ---------- 1. Reglas que nunca pueden romperse ---------- */
const N = 50000;
const VEREDICTOS = ['noia', 'programa', 'datos', 'suscripcion', 'asistente', 'flujo', 'agente'];
const ESTADOS = ['verde', 'ambar', 'rojo', 'noia', 'datos', 'suscripcion'];
const reparto = {};
for (let i = 0; i < N; i++) {
  const a = respuestas();
  const r = analiza(a, PASOS);
  const c = r.c;
  const hace = a.hace ?? [];
  const leer = hace.includes('leer') || a.normas === 'documentos' || (a.info ?? []).includes('papel') || (a.info ?? []).includes('correos');
  const ia = leer || hace.includes('escribir') || hace.includes('decidir') || a.normas === 'nadie';
  reparto[`${r.v}:${r.estado}`] = (reparto[`${r.v}:${r.estado}`] ?? 0) + 1;

  if (!VEREDICTOS.includes(r.v)) falla('veredicto desconocido', a, r.v);
  if (!ESTADOS.includes(r.estado)) falla('estado desconocido', a, r.estado);

  // Un chat de pago, solo cuando es evidente.
  if (r.v === 'suscripcion') {
    if (hace.includes('cuentas') || hace.includes('repartir')) falla('chat de pago con cuentas o repartos', a);
    if (a.sensibles && a.sensibles !== 'no') falla('chat de pago con datos delicados', a);
    if (a.riesgo === 'irreversible') falla('chat de pago con algo irreversible', a);
    if (!hace.includes('escribir') || leer || hace.includes('decidir')) falla('chat de pago para algo que no es solo escribir', a);
    if (!['equipo', 'publica'].includes(a.destino) || a.revisa !== 'todo' || a.pasos === 'conversa') falla('chat de pago que no es para el equipo ni para publicar, o sin revisión', a);
  }
  // «No necesita IA», solo cuando es evidente.
  if (r.v === 'noia' && (ia || hace.includes('repartir') || c.horas >= MUCHAS)) falla('«no necesita IA» con algo que leer, repartir o mucho trabajo', a);
  // Lo irreversible siempre pasa por una persona.
  if (a.riesgo === 'irreversible' && ia && r.v !== 'asistente') falla('irreversible sin una persona al final', a, r.v);
  // Las cuentas nunca las hace la IA sola: no hay veredicto de chat ni de «sin programa».
  if (hace.includes('cuentas') && r.v === 'suscripcion') falla('cuentas en un chat', a);

  // Ninguna cifra rota.
  for (const [k, v] of Object.entries(c)) if (typeof v === 'number' && Number.isNaN(v)) falla('cifra NaN', a, k);
  if (c.dejas < 0 || c.techo < 0 || c.horas < 0) falla('cifra negativa', a);
  if (c.dejas > c.techo + 1e-9) falla('lo que se deja de perder supera el techo', a, `${c.dejas} > ${c.techo}`);
  if (Math.abs(c.personas - c.horas / JORNADA) > 1e-9) falla('personas mal contadas', a);
  if (c.mBajo > c.mAlto + 1e-9) falla('el plazo con precio bajo es mayor que con el alto', a);
  if (NUESTROS.includes(r.v) && !c.t) falla('veredicto nuestro sin precio', a, r.v);
  if (!NUESTROS.includes(r.v) && c.t) falla('veredicto ajeno con precio', a, r.v);
  // Las respuestas que no cuadran se avisan.
  if (c.horas > TOPE_HORAS && !c.avisos.includes('horas')) falla('horas imposibles sin aviso', a, String(c.horas));
  if (c.perdida > TOPE_PERDIDA && !c.avisos.includes('perdida')) falla('pérdidas desorbitadas sin aviso', a, String(c.perdida));
  // Semáforo coherente.
  if (r.estado === 'verde' && !(c.mBajo <= 12 && c.mAlto <= 24)) falla('verde sin recuperarse en un año', a);
  if (r.estado === 'verde' && c.avisos.length) falla('verde con respuestas que no cuadran', a, c.avisos.join(','));
  if (c.horas > JORNADA && c.t && c.t.bajo.build < 2500) falla('más de una persona al precio del proyecto pequeño', a);
  if (r.estado === 'rojo' && !NUESTROS.includes(r.v)) falla('rojo en un veredicto que no construimos', a);
  // Ante la duda, a hablar: nada de rojo con mucho tiempo en juego, cifra desconocida o avisos.
  if (r.estado === 'rojo' && (c.horas >= HABLAR || c.desconocido || c.vender > 0 || c.avisos.length)) falla('rojo cuando había motivo para hablar', a);
}

/* ---------- 2. Casos de referencia ---------- */
const casos = JSON.parse(readFileSync(new URL('./casos-que-automatizar.json', import.meta.url), 'utf8'));
let casosMal = 0;
for (const caso of casos.casos) {
  const r = analiza(caso.a, PASOS);
  const esperado = caso.esperado;
  const mal = [];
  if (esperado.v && r.v !== esperado.v) mal.push(`veredicto ${r.v}, se esperaba ${esperado.v}`);
  if (esperado.estado && r.estado !== esperado.estado) mal.push(`estado ${r.estado}, se esperaba ${esperado.estado}`);
  if (esperado.dejas && (r.c.dejas < esperado.dejas[0] || r.c.dejas > esperado.dejas[1]))
    mal.push(`deja de perder ${Math.round(r.c.dejas)} €, se esperaba entre ${esperado.dejas[0]} y ${esperado.dejas[1]}`);
  if (mal.length) {
    casosMal++;
    console.error(`✗ caso «${caso.nombre}»: ${mal.join('; ')}`);
  }
}

/* ---------- 3. Espejo inglés y ejemplos ---------- */
const espejo = [];
const huella = (pasos) =>
  pasos.map((p) => ({
    id: p.id,
    tipo: p.tipo,
    cuando: p.cuando,
    opts: p.opts?.map((o) => [o.v, o.n]),
    sub: p.sub && { id: p.sub.id, si: p.sub.si, opts: p.sub.opts.map((o) => [o.v, o.n]) },
  }));
if (JSON.stringify(huella(qa.pasos)) !== JSON.stringify(huella(qaEn.pasos))) espejo.push('las preguntas inglesas no tienen los mismos valores o números que las españolas');
function claves(o, ruta = '') {
  if (Array.isArray(o)) return [`${ruta}[${o.length}]`, ...o.flatMap((x, i) => (x && typeof x === 'object' ? claves(x, `${ruta}[${i}]`) : []))];
  return Object.keys(o).flatMap((k) => (o[k] && typeof o[k] === 'object' ? claves(o[k], `${ruta}.${k}`) : [`${ruta}.${k}`]));
}
const { pasos: _p1, ...restoEs } = qa;
const { pasos: _p2, ...restoEn } = qaEn;
const kEs = new Set(claves(restoEs));
const kEn = new Set(claves(restoEn));
for (const k of kEs) if (!kEn.has(k)) espejo.push(`falta en inglés: ${k}`);
for (const k of kEn) if (!kEs.has(k)) espejo.push(`sobra en inglés: ${k}`);
for (const e of EJEMPLOS) {
  if (!DEPARTAMENTOS.includes(e.dep)) espejo.push(`ejemplo ${e.id}: departamento ${e.dep} desconocido`);
  for (const t of [qa, qaEn]) if (!t.ejemplos.items[e.id]) espejo.push(`ejemplo ${e.id}: sin texto en ${t.locale}`);
  const a = e.a;
  for (const p of PASOS) {
    if (p.tipo === 'texto') continue;
    if (p.cuando === 'fallos' && a.fallos === 'f0') {
      if (a[p.id] !== undefined) espejo.push(`ejemplo ${e.id}: contesta ${p.id}, que no se pregunta`);
      continue;
    }
    const v = a[p.id];
    const vs = Array.isArray(v) ? v : v === undefined ? [] : [v];
    if (!vs.length) espejo.push(`ejemplo ${e.id}: sin respuesta a ${p.id}`);
    for (const x of vs) if (!p.opts.some((o) => o.v === x)) espejo.push(`ejemplo ${e.id}: ${p.id}=${x} no existe`);
    if (p.sub) {
      const si = Array.isArray(p.sub.si) ? p.sub.si : [p.sub.si];
      const abre = vs.some((x) => si.includes(x));
      const sv = a[p.sub.id];
      if (abre && !p.sub.opts.some((o) => o.v === sv)) espejo.push(`ejemplo ${e.id}: falta o no existe ${p.sub.id}`);
      if (!abre && sv !== undefined) espejo.push(`ejemplo ${e.id}: contesta ${p.sub.id}, que no se pregunta`);
    }
  }
}
espejo.forEach((m) => console.error(`✗ ${m}`));

/* ---------- Informe ---------- */
const porRegla = {};
for (const f of fallos) (porRegla[f.regla] ??= []).push(f);
for (const [regla, l] of Object.entries(porRegla)) {
  console.error(`✗ ${regla}: ${l.length} de ${N} combinaciones. Ejemplo: ${JSON.stringify(l[0].a)} ${l[0].detalle}`);
}
const total = Object.values(reparto).reduce((x, y) => x + y, 0);
console.log(`Reparto de ${total} combinaciones al azar (veredicto:estado):`);
for (const [k, n] of Object.entries(reparto).sort((x, y) => y[1] - x[1])) console.log(`  ${k.padEnd(22)} ${((n / total) * 100).toFixed(1)} %`);
console.log(`\n${casos.casos.length} casos de referencia, ${casosMal} mal. ${Object.keys(porRegla).length} reglas rotas. ${EJEMPLOS.length} ejemplos y espejo inglés: ${espejo.length} fallos.`);
process.exit(fallos.length || casosMal || espejo.length ? 1 : 0);
