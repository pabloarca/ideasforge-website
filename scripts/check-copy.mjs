/**
 * Comprobador de estilo del contenido en castellano.
 *
 * Hace cumplir mecánicamente las reglas de la sección 7 del árbitro
 * (.private/base-editorial.md). Escribirlas no basta: se han incumplido a los
 * pocos minutos de fijarlas, así que aquí quedan verificadas.
 *
 *   npm run check:copy
 *
 * Revisa el bloque español de src/i18n/ui.ts y los posts de
 * src/content/blog/es/. El inglés queda fuera a propósito, porque sus normas
 * de coma y punto y coma son otras.
 */
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const UI = 'src/i18n/ui.ts';
const BLOG_ES = 'src/content/blog/es';

/** Solo el bloque español de ui.ts: el inglés no sigue estas reglas. */
function bloqueEspanol(src) {
  const ini = src.indexOf('  es: {');
  const fin = src.indexOf('\n  en: {');
  if (ini < 0 || fin < 0) throw new Error('No encuentro el bloque es/en en ui.ts');
  return src.slice(ini, fin);
}

/** Quita lo que no es prosa: claves, rutas, clases y etiquetas HTML. */
function soloProsa(txt) {
  return txt
    .replace(/<[^>]+>/g, ' ')          // etiquetas
    .replace(/^\s*[a-zA-Z]+:\s*$/gm, ' ') // claves sueltas
    .replace(/https?:\/\/\S+/g, ' ')   // urls
    .replace(/\/[a-z0-9-]+(\/[a-z0-9-]+)*/g, ' '); // rutas
}

const PALABRAS_VETADAS = [
  'crucial', 'fundamental', 'esencial', 'robusto', 'vibrante', 'innovador',
  'transformador', 'imprescindible', 'potenciar', 'impulsar', 'empoderar',
  'sinergia', 'panorama', 'en un mundo donde', 'imagina que',
  'es importante destacar', 'cabe señalar', 'en definitiva', 'prosa',
];

function revisa(nombre, textoBruto) {
  const t = soloProsa(textoBruto);
  const fallos = [];
  const avisos = [];

  const coma = [...t.matchAll(/,\s+(y|e|o|u)\s/g)];
  for (const m of coma) {
    fallos.push(['coma antes de conjunción', contexto(t, m.index)]);
  }

  for (const m of [...t.matchAll(/;/g)]) {
    fallos.push(['punto y coma', contexto(t, m.index)]);
  }

  for (const m of [...t.matchAll(/—/g)]) {
    fallos.push(['raya larga', contexto(t, m.index)]);
  }

  for (const w of PALABRAS_VETADAS) {
    for (const m of [...t.matchAll(new RegExp(`\\b${w}`, 'gi'))]) {
      fallos.push([`palabra vetada «${w}»`, contexto(t, m.index)]);
    }
  }

  // Ráfagas: tres o más frases cortas seguidas suenan a telegrama.
  const frases = t.split(/(?<=[.!?])\s+/).filter((f) => f.trim().length > 1);
  let racha = 0;
  for (const f of frases) {
    const palabras = f.trim().split(/\s+/).length;
    if (palabras > 0 && palabras <= 7) {
      racha += 1;
      if (racha === 3) fallos.push(['ráfaga de frases cortas', f.trim().slice(0, 80)]);
    } else {
      racha = 0;
    }
  }

  // Dos puntos: válidos solo si introducen tres o más elementos.
  // Heurística: se cuentan las comas hasta el final de la frase.
  for (const m of [...t.matchAll(/:\s/g)]) {
    const resto = t.slice(m.index + 2, m.index + 220).split(/\.\s/)[0];
    if ((resto.match(/,/g) || []).length < 2) {
      avisos.push(['dos puntos que no enumeran', contexto(t, m.index)]);
    }
  }

  return { nombre, fallos, avisos };
}

function contexto(t, i) {
  return t.slice(Math.max(0, i - 55), i + 45).replace(/\s+/g, ' ').trim();
}

const objetivos = [
  { nombre: UI, texto: bloqueEspanol(readFileSync(UI, 'utf8')) },
  ...readdirSync(BLOG_ES)
    .filter((f) => f.endsWith('.md'))
    .map((f) => ({ nombre: join(BLOG_ES, f), texto: readFileSync(join(BLOG_ES, f), 'utf8') })),
];

let totalFallos = 0;
let totalAvisos = 0;

for (const o of objetivos) {
  const r = revisa(o.nombre, o.texto);
  if (!r.fallos.length && !r.avisos.length) continue;
  console.log(`\n${r.nombre}`);
  for (const [regla, ctx] of r.fallos) {
    console.log(`  ERROR  ${regla}\n         …${ctx}…`);
  }
  for (const [regla, ctx] of r.avisos) {
    console.log(`  aviso  ${regla}\n         …${ctx}…`);
  }
  totalFallos += r.fallos.length;
  totalAvisos += r.avisos.length;
}

console.log(
  `\n${totalFallos} errores, ${totalAvisos} avisos.` +
    (totalAvisos ? ' Los avisos piden criterio: revísalos a mano.' : '')
);

// Los avisos no rompen el build; los errores sí.
process.exit(totalFallos > 0 ? 1 : 0);
