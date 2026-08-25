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
const BLOG_EN = 'src/content/blog/en';

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
    // Claves de objeto y de frontmatter con valor en la misma línea
    // (`title: '…'`, `body: '…'`, `pubDate: 2026-…`). Antes su dos puntos se
    // contaba como prosa y la mitad de los avisos eran ruido de código. Se
    // quita SOLO la clave y su dos puntos: el valor sigue revisándose, así
    // que un título con dos puntos dentro sí se detecta.
    .replace(/(^|[\s{,])[a-zA-Z_]+:\s*(?=['"\[{\d]|true|false)/g, '$1')
    .replace(/https?:\/\/\S+/g, ' ')   // urls
    .replace(/\/[a-z0-9-]+(\/[a-z0-9-]+)*/g, ' '); // rutas
}

// Excepciones declaradas: dos puntos que el propietario decidió conservar.
// Cada entrada lleva su porqué y su rastro en el registro del árbitro (§9).
const EXCEPCIONES_DOS_PUNTOS = [
  // Gancho del título del post de agénticas, retitulado deliberado del 20 ago 2026.
  'Te cuento un secreto: no me gustan',
];

const PALABRAS_VETADAS = [
  'crucial', 'fundamental', 'esencial', 'robusto', 'vibrante', 'innovador',
  'transformador', 'imprescindible', 'potenciar', 'impulsar', 'empoderar',
  'sinergia', 'panorama', 'en un mundo donde', 'imagina que',
  'es importante destacar', 'cabe señalar', 'en definitiva', 'prosa',
  // Resto del informe de texto generado, completado el 24 ago 2026. Los
  // prefijos cazan la familia entera (aprovech- llega a «aprovechables»).
  // Fuera de la lista, con motivo: «clave» (uso literal en la guía,
  // «devuelve una clave, un identificador») y «optimizar» (nombre del
  // cuarto paso del método). Una regla que llora en falso acaba ignorada.
  'fascinante', 'aprovech', 'sumergir', 'profundiz', 'desbloque', 'elevar',
  'en constante evolución', 'punto de inflexión', 'retrofit', 'deprec',
  'no es solo', 'no se trata de',
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
  // Heurística: comas hasta el final de la frase. Una enumeración de tres
  // escrita a la manera de la casa («a, b y c») solo tiene una coma, así que
  // también cuenta como válida la combinación de al menos una coma con una
  // conjunción posterior. Dos ideas unidas («X: porque Y») no tienen ninguna.
  // Una frase no cruza un salto de línea en estas fuentes, así que el resto
  // se corta también ahí: sin ese corte, el dos puntos de un título de
  // frontmatter se validaba con las comas de la descripción vecina.
  // Un dos puntos a final de línea que abre tres o más bloques en negrita o
  // viñetas también enumera, aunque sus elementos no lleven comas.
  for (const m of [...t.matchAll(/:\s/g)]) {
    const alrededor = t.slice(Math.max(0, m.index - 90), m.index + 90);
    if (EXCEPCIONES_DOS_PUNTOS.some((e) => alrededor.includes(e))) continue;
    const tras = t.slice(m.index + 1);
    if (/^[ \t]*\n/.test(tras)) {
      const bloques = (tras.slice(0, 1500).match(/\n[ \t]*(\*\*|- )/g) || []).length;
      if (bloques >= 3) continue;
    }
    const resto = t.slice(m.index + 2, m.index + 220).split(/\.\s|\n/)[0];
    const comas = (resto.match(/,/g) || []).length;
    const conjTrasComa = /,[^,]*\s(y|e|o|u)\s/.test(resto);
    if (comas < 2 && !(comas >= 1 && conjTrasComa)) {
      avisos.push(['dos puntos que no enumeran', contexto(t, m.index)]);
    }
  }

  return { nombre, fallos, avisos };
}

/*
 * Ortografía inglesa: americana en todo el sitio (decisión del propietario,
 * 25 ago 2026). La lista es explícita a propósito. Una regla general
 * -ise → -ize habría roto advise, enterprise, promise, supervise, comprise,
 * exercise, compromise y franchise, que no llevan zeta en ningún inglés.
 */
const BRITANICO = {
  organisation: 'organization', organise: 'organize', organised: 'organized',
  recognise: 'recognize', recognised: 'recognized', recognises: 'recognizes',
  prioritise: 'prioritize', optimise: 'optimize', optimisation: 'optimization',
  authorise: 'authorize', authorised: 'authorized', authorisation: 'authorization',
  realise: 'realize', realised: 'realized', specialise: 'specialize',
  specialised: 'specialized', standardise: 'standardize', normalise: 'normalize',
  minimise: 'minimize', maximise: 'maximize', summarise: 'summarize',
  categorise: 'categorize', emphasise: 'emphasize', utilise: 'utilize',
  customise: 'customize', personalise: 'personalize', analyse: 'analyze',
  behaviour: 'behavior', behaviours: 'behaviors', behavioural: 'behavioral',
  colour: 'color', favour: 'favor', favourite: 'favorite', labour: 'labor',
  neighbour: 'neighbor', honour: 'honor', rumour: 'rumor',
  centre: 'center', centres: 'centers', metre: 'meter', theatre: 'theater',
  cancelled: 'canceled', cancelling: 'canceling', travelled: 'traveled',
  modelled: 'modeled', labelled: 'labeled',
  defence: 'defense', offence: 'offense', licence: 'license',
  whilst: 'while', amongst: 'among', learnt: 'learned', spelt: 'spelled',
  enquiry: 'inquiry', enquiries: 'inquiries', grey: 'gray',
  storey: 'story', cheque: 'check', practise: 'practice',
};

/* Nombres propios que nacieron con grafía británica. No son faltas: el
   National Cyber Security Centre se llama así. */
const NOMBRES_PROPIOS = ['national cyber security centre'];

/** Solo el bloque inglés de ui.ts. */
function bloqueIngles(src) {
  const ini = src.indexOf('\n  en: {');
  if (ini < 0) throw new Error('No encuentro el bloque en de ui.ts');
  return src.slice(ini);
}

function revisaIngles(nombre, textoBruto) {
  let t = textoBruto;
  for (const n of NOMBRES_PROPIOS) t = t.split(n).join(' ');
  const fallos = [];
  for (const [brit, ameri] of Object.entries(BRITANICO)) {
    for (const m of [...t.matchAll(new RegExp(`\\b${brit}\\b`, 'gi'))]) {
      fallos.push([`ortografía británica «${brit}», debe ser «${ameri}»`, contexto(t, m.index)]);
    }
  }
  return { nombre, fallos };
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

const objetivosEn = [
  { nombre: `${UI} (bloque inglés)`, texto: bloqueIngles(readFileSync(UI, 'utf8')) },
  ...readdirSync(BLOG_EN)
    .filter((f) => f.endsWith('.md'))
    .map((f) => ({ nombre: join(BLOG_EN, f), texto: readFileSync(join(BLOG_EN, f), 'utf8') })),
];

for (const o of objetivosEn) {
  const r = revisaIngles(o.nombre, o.texto);
  if (!r.fallos.length) continue;
  console.log(`\n${r.nombre}`);
  for (const [regla, ctx] of r.fallos) {
    console.log(`  ERROR  ${regla}\n         …${ctx}…`);
  }
  totalFallos += r.fallos.length;
}

console.log(
  `\n${totalFallos} errores, ${totalAvisos} avisos.` +
    (totalAvisos ? ' Los avisos piden criterio: revísalos a mano.' : '')
);

// Los avisos no rompen el build; los errores sí.
process.exit(totalFallos > 0 ? 1 : 0);
