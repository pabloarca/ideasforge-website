/*
  La lógica de la herramienta «¿Qué tareas automatizar primero?» (t0190), sin
  textos ni navegador: entra lo que contestó la persona y salen códigos y
  números. El componente los convierte en frases; `scripts/test-que-automatizar.mjs`
  los comprueba contra los casos de referencia y contra reglas que nunca
  pueden romperse. Por eso vive aparte (21 oct 2026).

  Dos principios del propietario mandan sobre todo lo demás:
  1. La herramienta es para vender nuestros servicios. Se manda a otro
     producto (un chat de pago, un programa normal) solo cuando es evidente;
     ante la duda, un servicio con nosotros.
  2. Las cuentas y los repartos los hace un programa, nunca la IA: la IA
     interpreta y el código ejecuta. Un chat solo sirve para contenido e ideas
     donde un error no tiene consecuencias.
  Y uno de oficio: ninguna cifra se da como un hecho. El ahorro va en
  horquilla, el plazo en rango, y si las respuestas no cuadran se avisa.
*/

export type A = Record<string, string | string[] | undefined>;
export type Opcion = { v: string; l: string; n?: number | null };
export type PasoNum = { id: string; opts?: Opcion[]; sub?: { id: string; opts: Opcion[] } };

export type Veredicto = 'noia' | 'programa' | 'datos' | 'suscripcion' | 'asistente' | 'flujo' | 'agente';
export type Estado = 'verde' | 'ambar' | 'rojo' | 'noia' | 'datos' | 'suscripcion';

/** Lo que construimos nosotros: todo lo que no es «no necesita IA», «ordena los datos» o «suscripción». */
export const NUESTROS: Veredicto[] = ['programa', 'asistente', 'flujo', 'agente'];

/* Precios. El tramo bajo es el proyecto pequeño que el propietario acepta
   para coger tracción (21 oct 2026); el alto, el techo de los rangos
   publicados (decisión del 20 ago 2026). El plazo se da entre los dos. */
export const PRECIO = {
  sencillo: { bajo: { build: 700, fee: 70 }, alto: { build: 2500, fee: 150 } },
  medida: { bajo: { build: 2500, fee: 150 }, alto: { build: 10000, fee: 500 } },
};
/** Parte de lo que se pierde que contamos como ahorro seguro (el resto es el techo). */
export const REAL = 0.5;
/** «Poco volumen» para un chat de pago: hasta unas cuantas veces al día. */
export const POCO = 105;
/** «Muchas horas»: una semana de trabajo al mes. Pasa a ser el titular. */
export const MUCHAS = 40;
/** Con estas horas al mes nunca se dice «hoy no compensa»: ante la duda, hablar (propietario, 21 oct 2026). */
export const HABLAR = 20;
/** Ahorro al mes a partir del cual una tarea sin IA ya merece un programa a medida. */
export const PROGRAMA_DESDE = 300;
/** Horas al mes de una persona a jornada completa. */
export const JORNADA = 160;
/** A partir de aquí las respuestas probablemente no cuadran: se avisa. */
export const TOPE_HORAS = 5 * JORNADA;
export const TOPE_PERDIDA = 15000;
/** Pérdidas altas para una tarea de pocas horas: probablemente infladas. */
export const SOSPECHA_PERDIDA = 5000;

const lista = (a: A, k: string) => (Array.isArray(a[k]) ? (a[k] as string[]) : []);

/** El número asociado a la opción elegida en una pregunta o subpregunta. */
export function num(pasos: PasoNum[], a: A, id: string): number | null | undefined {
  for (const p of pasos) {
    const o = p.id === id ? p.opts : p.sub?.id === id ? p.sub.opts : null;
    if (o) return o.find((x) => x.v === a[id])?.n;
  }
  return undefined;
}

export const fuentes = (a: A) => lista(a, 'info').filter((x) => x !== 'cabeza').length;

export function decide(a: A, pasos: PasoNum[]): { v: Veredicto; por: string } {
  const hace = lista(a, 'hace');
  const info = lista(a, 'info');
  // Lo que llega por correo o en papel también hay que leerlo, aunque no se marque «Leer».
  const leer = hace.includes('leer') || a.normas === 'documentos' || info.includes('papel') || info.includes('correos');
  const escribir = hace.includes('escribir');
  const decidir = hace.includes('decidir') || a.normas === 'nadie';
  const cuentas = hace.includes('cuentas');
  const repartir = hace.includes('repartir');
  const ia = leer || escribir || decidir;
  const horas = ((num(pasos, a, 'min') ?? 0) * (num(pasos, a, 'veces') ?? 0)) / 60;
  const fallos = num(pasos, a, 'fallos') ?? 0;
  const perdida = fallos > 0 ? fallos * (num(pasos, a, 'coste') ?? 0) : 0;

  if (a.riesgo === 'irreversible' && ia) return { v: 'asistente', por: 'irreversible' };
  if (info.includes('cabeza') && a.cabeza === 'todo') return { v: 'datos', por: 'datos' };
  if (!ia) {
    // Sin nada que leer, escribir ni decidir no hace falta IA. Pero un reparto,
    // o mucho trabajo, es un programa a medida, y eso también lo hacemos.
    if (repartir) return { v: 'programa', por: 'repartir' };
    if (horas >= MUCHAS || perdida * REAL >= PROGRAMA_DESDE) return { v: 'programa', por: 'programa' };
    return { v: 'noia', por: 'noia' };
  }
  // Un chat de pago solo cuando es evidente: escribir contenido o ideas (para
  // el equipo o para publicar), sin cuentas, sin datos delicados, sin nada
  // irreversible, revisado entero y con poco volumen.
  if (
    escribir &&
    !leer &&
    !decidir &&
    !cuentas &&
    !repartir &&
    (a.sensibles === 'no' || a.sensibles === undefined) &&
    a.riesgo !== 'irreversible' &&
    (a.destino === 'equipo' || a.destino === 'publica') &&
    a.revisa === 'todo' &&
    a.pasos !== 'conversa' &&
    (num(pasos, a, 'veces') ?? Infinity) <= POCO
  )
    return { v: 'suscripcion', por: 'suscripcion' };
  if (decidir) return { v: 'asistente', por: 'decidir' };
  if (a.pasos === 'conversa') return { v: 'agente', por: 'agente' };
  if (repartir) return { v: 'flujo', por: 'repartir' };
  return { v: 'flujo', por: cuentas ? 'cuentas' : 'flujo' };
}

export function tramo(a: A, v: Veredicto, horas = 0) {
  if (!NUESTROS.includes(v)) return null;
  // Más de una persona a jornada completa o cientos de veces al día ya no es un proyecto pequeño.
  if (horas > JORNADA || a.veces === 'cientos') return PRECIO.medida;
  if (v === 'agente' || lista(a, 'hace').includes('repartir') || ((v === 'flujo' || v === 'programa') && fuentes(a) >= 2)) return PRECIO.medida;
  if (NUESTROS.includes(v)) return PRECIO.sencillo;
  return null;
}

const plazo = (p: { build: number; fee: number }, g: number) => (g - p.fee > 0 ? p.build / (g - p.fee) : Infinity);

export function cuenta(a: A, v: Veredicto, pasos: PasoNum[]) {
  const horas = ((num(pasos, a, 'min') ?? 0) * (num(pasos, a, 'veces') ?? 0)) / 60;
  const fallos = num(pasos, a, 'fallos') ?? 0;
  const desconocido = fallos > 0 && a.coste === 'nose';
  const perdida = fallos > 0 ? fallos * (num(pasos, a, 'coste') ?? 0) : 0;
  const hora = num(pasos, a, 'hora') ?? 0;
  /* Dinero que deja de salir: la mitad de lo que se pierde, más las horas que
     hoy se pagan aparte. Las horas que se dedicarían a vender son una
     oportunidad, no dinero ahorrado: se enseñan aparte y no entran en el plazo. */
  const dejas = perdida * REAL + (a.tiempo === 'pagar' ? horas * REAL * hora : 0);
  const vender = a.tiempo === 'vender' ? horas * hora : 0;
  const t = tramo(a, v, horas);
  const mBajo = t ? plazo(t.bajo, dejas) : Infinity;
  const mAlto = t ? plazo(t.alto, dejas) : Infinity;
  const equilibrio = t && desconocido ? Math.max(0, (t.bajo.build / 24 + t.bajo.fee) / REAL / fallos) : 0;
  const avisos: string[] = [];
  if (horas > TOPE_HORAS) avisos.push('horas');
  if (perdida > TOPE_PERDIDA) avisos.push('perdida');
  else if (perdida > SOSPECHA_PERDIDA && horas < MUCHAS) avisos.push('perdidaHoras');
  return {
    horas,
    personas: horas / JORNADA,
    fallos,
    perdida,
    desconocido,
    hora,
    /** Horquilla del ahorro: de la mitad (lo que contamos) a todo lo que se pierde. */
    dejas,
    techo: perdida + (a.tiempo === 'pagar' ? horas * hora : 0),
    vender,
    t,
    mBajo,
    mAlto,
    equilibrio,
    avisos,
  };
}
export type Cuenta = ReturnType<typeof cuenta>;

export function estado(v: Veredicto, c: Cuenta): Estado {
  if (v === 'noia' || v === 'datos' || v === 'suscripcion') return v;
  // Si las respuestas no cuadran, nada de verde: a hablar.
  if (c.avisos.length) return 'ambar';
  if (c.mBajo <= 12 && c.mAlto <= 24) return 'verde';
  // Ante la duda, a hablar: tiempo en juego, un plazo razonable con el precio
  // bajo, una cifra que no saben u horas que podrían dedicarse a vender.
  if (c.mBajo <= 24 || c.horas >= HABLAR || c.desconocido || c.vender > 0) return 'ambar';
  return 'rojo';
}

/** Los avisos de «Ojo», por clave y en orden de importancia. */
export function notas(a: A, v: Veredicto): string[] {
  const n: string[] = [];
  const nuestro = NUESTROS.includes(v);
  const hace = lista(a, 'hace');
  const info = lista(a, 'info');
  if (a.sensibles === 'salud' && v !== 'noia') n.push('salud');
  else if (a.sensibles === 'personales' && v !== 'noia') n.push('sensibles');
  // El aviso de que el equipo tiene que usarlo, el primero en las tarjetas de asistente.
  if (v === 'asistente') n.push('usar');
  if (nuestro && (hace.includes('decidir') || a.normas === 'nadie') && a.sensibles !== 'no') n.push('personas');
  if (nuestro && hace.includes('cuentas')) n.push('cuentas');
  if (nuestro && a.pasos === 'casi') n.push('casi');
  if (nuestro && fuentes(a) >= 2) n.push('repartida');
  if (a.cabeza === 'parte' && v !== 'datos') n.push('parte');
  if (nuestro && info.includes('papel')) n.push('papel');
  else if (nuestro && (hace.includes('leer') || a.normas === 'documentos')) n.push('leer');
  if (nuestro && a.revisa === 'dudosos') n.push('dudosos');
  if ((v === 'flujo' || v === 'agente') && a.riesgo === 'cuesta') n.push('cuesta');
  if (nuestro && a.veces === 'pocas') n.push('pocas');
  return n;
}

/** El primer cambio de una sola respuesta que cambiaría el veredicto. */
export const ALTERNATIVAS: [string, string][] = [
  ['pasos', 'conversa'],
  ['pasos', 'igual'],
  ['riesgo', 'cuesta'],
  ['cabeza', 'parte'],
  ['revisa', 'todo'],
  ['destino', 'programa'],
];
export function queCambiaria(a: A, v: Veredicto, pasos: PasoNum[]) {
  for (const [k, val] of ALTERNATIVAS) {
    if (a[k] === undefined || a[k] === val) continue;
    const r2 = decide({ ...a, [k]: val }, pasos);
    if (r2.v !== v) return { k: `${k}:${val}`, v: r2.v };
  }
  return null;
}

export function analiza(a: A, pasos: PasoNum[]) {
  const r = decide(a, pasos);
  const c = cuenta(a, r.v, pasos);
  return { ...r, c, estado: estado(r.v, c), notas: notas(a, r.v), alt: queCambiaria(a, r.v, pasos) };
}
export type Analisis = ReturnType<typeof analiza>;
