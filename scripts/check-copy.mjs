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

/*
 * Patrones de rótulo, donde los dos puntos separan una etiqueta de su texto
 * y no anuncian una enumeración. Mismo criterio que la excepción declarada
 * para «Guía: …» el 21 ago 2026: el nombre del cliente en el título de una
 * página de caso dice de quién va la página, no introduce una lista.
 */
const ROTULOS_DOS_PUNTOS = [
  // Título de página de caso: «Savian: …», «Stanton: …»
  /(^|['"])\s*[A-ZÁÉÍÓÚÑ][\wáéíóúñÁÉÍÓÚÑ]*:\s/,
];

const PALABRAS_VETADAS = [
  'crucial', 'fundamental', 'esencial', 'robust', 'vibrante', 'innovador',
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

/*
 * Léxico que el propietario ya corrigió una vez (revisión de patrones del
 * 27 ago 2026: se releyeron TODAS sus correcciones del historial y seis
 * términos corregidos seguían vivos en clones de otras páginas). Hoy hay
 * cero usos, así que cualquier aparición es una recaída, no una duda.
 */
const LEXICO_VETADO = [
  [/Fráncfort/g, 'Frankfurt'],
  [/\brendible/g, 'capaz de rendir cuentas'],
  [/harina de otro costal/g, 'otra cosa, dicho llano'],
  [/por lo bajo/g, 'en silencio, o como mínimo, según el caso'],
  [/cuenta de nube/g, 'cuenta en la nube'],
  [/parada a parada/g, 'paso a paso («parada» es solo la de modelo)'],
  [/seudonimiz/g, 'separar el dato de la persona, dicho así'],
  [/testigo de (acceso|identidad)/g, 'credencial'],
  [/\blax[oa]s?\b/g, 'poco estricto/a'],
  [/\bcanónic[oa]s?\b/g, 'aprobado, o el de referencia'],
  [/Actualizad[oa] en agosto/g, 'fuera: el propietario lo quitó y reapareció una vez'],
  // Vetadas por el propietario en todo el sitio, 27 ago 2026 (noche)
  [/\bhonest[oa]s?\b/g, 'claridad, a tiempo, sensato… según el trabajo de la frase'],
  [/honestidad/g, 'claridad («claridad de máquina» es el concepto renombrado)'],
  // La forma inglesa faltaba, y por eso «keeping it honest» sobrevivió en la
  // guía de coste hasta el 1 sep. El veto del propietario era de todo el sitio.
  [/\bhonest(ly|y)?\b/g, 'la forma inglesa de la palabra vetada el 27 ago'],
  [/\binstinto/g, 'primer impulso'],
];

/*
 * Hechos y afirmaciones RETIRADOS: cero apariciones en todo el sitio, en
 * los dos idiomas. La lección del 27 ago es que un hecho corregido en la
 * página señalada sobrevivía en sus clones («24 horas laborables» seguía en
 * 15 sitios; el ranking de datos de salud, en 4, dos de ellos en inglés).
 * Cuando se retire un hecho nuevo, su huella entra AQUÍ en el mismo cambio.
 */
const HECHOS_RETIRADOS = [
  ['24 horas laborables', 'pasó a «un día laborable» (27 ago 2026)'],
  ['24 business hours', 'pasó a «one business day» (27 ago 2026)'],
  ['pueden recibir datos personales', 'hecho retirado por el propietario (20 ago 2026)'],
  ['cannot receive personal data', 'hecho retirado por el propietario (20 ago 2026)'],
  ['a gran escala o toca', 'criterio AEPD corregido: dos o más criterios de su lista'],
  ['categoría más protegida', 'ranking inexistente: categorías especiales del art. 9, sin jerarquía'],
  ['most protected category', 'ranking inexistente: special categories, no hierarchy'],
  ['strictest category', 'el mismo ranking inexistente'],
  ['listón más alto', 'el mismo ranking, dicho de otra manera'],
  ['respeta los cinco años', 'la conservación de la historia clínica es de la clínica, no de Wazzy'],
  ['respects the five years', 'la conservación de la historia clínica es de la clínica, no de Wazzy'],
  ['cinco céntimos', 'coste de la prueba semanal retirado por el propietario (27 ago 2026)'],
  ['five cents', 'coste de la prueba semanal retirado por el propietario (27 ago 2026)'],
  ['0,05 €', 'la misma cifra retirada'],
  ['€0.05', 'la misma cifra retirada'],
  // Ojo: la huella es la fórmula CON «sin esperar». La observación genérica
  // sobre equipos que esperan a su departamento de analítica sigue siendo
  // válida, lo retirado es atribuírsela a Savian (§1 del árbitro).
  ['sin esperar a analítica', 'la espera de Savian era llegar a la oficina, no una cola de analítica (28 ago 2026)'],
  ['without waiting for analytics', 'la misma atribución, en inglés'],
  // El CRM de Barceloneta solo tiene puntos de consulta, sin escritura: el
  // resumen va por correo. Corregido en /inmobiliarias el 28 ago 2026 y el
  // clon inglés sobrevivió hasta el 1 sep, que es cuando entra esta huella.
  ['rastro completo queda en el CRM', 'el CRM de Barceloneta no admite escritura: el resumen va por correo (28 ago 2026)'],
  ['full trail in the CRM', 'el CRM de Barceloneta no admite escritura: el resumen va por correo (28 ago 2026)'],
  // Retirado de /empezar y de /en/get-started por el propietario. La huella es
  // el tamaño del equipo dicho de nosotros, no de un cliente: las preguntas
  // frecuentes inglesas siguen diciendo con razón que los clientes de las dos
  // páginas de números son equipos pequeños, y eso se queda.
  ['somos un equipo pequeño', 'el tamaño del equipo se retira de la web (1 sep 2026)'],
  ['we are a small team', 'el tamaño del equipo se retira de la web (1 sep 2026)'],
  // La batería de Wazzy quedó EN DUDA el 29 ago 2026: el ROADMAP del producto
  // da 206 casos dorados y 41 campos donde la ficha decía 145 y 37, y el banco
  // declara que ninguna de las dos parejas se publica hasta que el propietario
  // elija. Estaba viva en las dos guías de coste y sale el 1 sep.
  ['145 conversaciones anotadas', 'cifra del eval de Wazzy EN DUDA en el banco (29 ago 2026)'],
  ['145 annotated conversations', 'cifra del eval de Wazzy EN DUDA en el banco (29 ago 2026)'],
  // La promesa absoluta del héroe de /ia-y-rgpd contradecía a su propia
  // sección 03, que explica bien que de la cuenta salen dos caminos, la
  // llamada al proveedor del modelo y el canal de mensajería, y que WhatsApp o
  // Telegram reciben el contenido íntegro. Lo que la página entrega de verdad
  // no es que el dato no salga: es que decides tú qué sale y a dónde, y que
  // queda dibujado para tu DPD.
  ['no pueden salir de su control', 'contradecía la sección 03 de /ia-y-rgpd (2 sep 2026)'],
  ['cannot leave their control', 'la misma promesa absoluta, en inglés'],
  // La telemetría con lista blanca la retiró el propietario el 20 ago 2026 («sí
  // se almacenan datos personales») y el banco la marca «prohibido publicarlo».
  // Sobrevivió en la página de cumplimiento hasta el 2 sep, en cinco sitios y
  // en las dos lenguas. OJO: la lista blanca de PARÁMETROS DE CONSULTA es otra
  // cosa, es el aislamiento, está VERIFICADA y no se toca. Por eso las huellas
  // llevan la palabra telemetría al lado y no cazan «lista blanca» a secas.
  ['telemetría de lista blanca', 'hecho retirado por el propietario (20 ago 2026)'],
  ['telemetría, las mediciones técnicas', 'el párrafo de la telemetría con lista blanca, retirado'],
  ['allow-listed telemetry', 'el mismo hecho retirado, en inglés'],
  ['health telemetry, which travels', 'la telemetría como camino de salida, retirada'],
];

/* Daños típicos de una edición quirúrgica: nunca son intencionados. */
const DANOS_EDICION = [
  [/(?<!\.)\.\.(?!\.)/, 'punto doble'],
  [/\. \./, 'punto suelto tras punto'],
  [/, *\./, 'coma pegada a punto'],
  [/\.,/, 'punto pegado a coma'],
  [/ ,/, 'espacio antes de coma'],
];

/** Comprobaciones comunes a los dos idiomas, sobre el texto bruto. */
function revisaComunes(t, fallos) {
  for (const re of LEXICO_VETADO) {
    for (const m of [...t.matchAll(new RegExp(re[0].source, re[0].flags))]) {
      fallos.push([`léxico ya corregido, debe ser «${re[1]}»`, contexto(t, m.index)]);
    }
  }
  for (const [huella, motivo] of HECHOS_RETIRADOS) {
    let i = t.indexOf(huella);
    while (i >= 0) {
      fallos.push([`hecho retirado: ${motivo}`, contexto(t, i)]);
      i = t.indexOf(huella, i + 1);
    }
  }
  const sinEtiquetas = t.replace(/<[^>]+>/g, '');
  for (const [re, nombre] of DANOS_EDICION) {
    for (const m of [...sinEtiquetas.matchAll(new RegExp(re.source, 'g'))]) {
      fallos.push([`daño de edición: ${nombre}`, contexto(sinEtiquetas, m.index)]);
    }
  }
}

/*
 * Terminos literales de la normativa que colisionan con la lista de palabras
 * vetadas. «Derechos fundamentales» es el nombre del articulo 27 del
 * reglamento de IA y «servicios esenciales» es un dominio del anexo III: no
 * son relleno, son como se llaman. Se retiran antes de buscar.
 */
const TERMINOS_LEGALES = [/derechos fundamentales/gi, /servicios esenciales/gi];

function revisa(nombre, textoBruto) {
  let t = soloProsa(textoBruto);
  for (const re of TERMINOS_LEGALES) t = t.replace(re, ' ');
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

  // Dos puntos: válidos si introducen dos o más elementos (ampliado el 27 ago
  // 2026; antes exigían tres). Heurística: detrás tiene que haber una coma o
  // una conjunción. Una enumeración de dos («a y b») no lleva coma, y una de
  // tres a la manera de la casa («a, b y c») lleva solo una, así que contar
  // comas ya no distingue. Dos ideas unidas sin conjunción («X: porque Y») no
  // tienen ninguna de las dos cosas y siguen cayendo. La unión CON conjunción
  // se cuela: es el precio de admitir la enumeración de dos, asumido en §7.
  // Una frase no cruza un salto de línea en estas fuentes, así que el resto
  // se corta también ahí: sin ese corte, el dos puntos de un título de
  // frontmatter se validaba con las comas de la descripción vecina.
  // Un dos puntos a final de línea que abre tres o más bloques en negrita o
  // viñetas también enumera, aunque sus elementos no lleven comas.
  for (const m of [...t.matchAll(/:\s/g)]) {
    const alrededor = t.slice(Math.max(0, m.index - 90), m.index + 90);
    if (EXCEPCIONES_DOS_PUNTOS.some((e) => alrededor.includes(e))) continue;
    // El rótulo se mira justo delante de los dos puntos, no en el contexto
    // ancho: si no, cualquier nombre propio cercano indultaría la frase.
    const antes = t.slice(Math.max(0, m.index - 40), m.index + 2);
    if (ROTULOS_DOS_PUNTOS.some((re) => re.test(antes))) continue;
    const tras = t.slice(m.index + 1);
    if (/^[ \t]*\n/.test(tras)) {
      const bloques = (tras.slice(0, 1500).match(/\n[ \t]*(\*\*|- )/g) || []).length;
      if (bloques >= 3) continue;
    }
    const resto = t.slice(m.index + 2, m.index + 220).split(/\.\s|\n/)[0];
    const comas = (resto.match(/,/g) || []).length;
    const conjuncion = /\s(y|e|o|u)\s/.test(resto);
    if (comas === 0 && !conjuncion) {
      avisos.push(['dos puntos que no enumeran', contexto(t, m.index)]);
    }
  }


  revisaComunes(textoBruto, fallos);

  // «parada» es término de la casa: la parada de modelo (§12 del árbitro).
  // Usarla sin «modelo» a la vista es la extensión que el propietario
  // corrigió el 27 ago («Un flujo de facturas, parada a parada»).
  const EXCEPCIONES_PARADA = ['no hay nada que inventar, hay una parada'];
  for (const linea of textoBruto.split('\n')) {
    if (!/\bparadas?\b/i.test(linea)) continue;
    if (/modelo/i.test(linea)) continue;
    if (/máquinas? parad[ao]s?/i.test(linea)) continue; // el adjetivo, no el término
    if (EXCEPCIONES_PARADA.some((e) => linea.includes(e))) continue;
    if (/^\s*[a-zA-Z_]+:\s*[{['"]?\s*$/.test(linea)) continue; // clave de código
    const i = linea.search(/\bparadas?\b/i);
    avisos.push([
      '«parada» sin «modelo» cerca: ¿se ha extendido el término de la casa?',
      linea.slice(Math.max(0, i - 55), i + 45).replace(/\s+/g, ' ').trim(),
    ]);
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
  organisation: 'organization', organisations: 'organizations',
  organise: 'organize', organised: 'organized',
  digitise: 'digitize', digitised: 'digitized', digitisation: 'digitization',
  recognise: 'recognize', recognised: 'recognized', recognises: 'recognizes',
  prioritise: 'prioritize', optimise: 'optimize', optimisation: 'optimization',
  authorise: 'authorize', authorised: 'authorized', authorisation: 'authorization',
  realise: 'realize', realised: 'realized', realising: 'realizing',
  organising: 'organizing', recognising: 'recognizing', analysing: 'analyzing',
  specialise: 'specialize',
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
  maths: 'math', aeroplane: 'airplane', kerb: 'curb', tyre: 'tire',
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
  revisaComunes(textoBruto, fallos);
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

// ── Páginas de caso huérfanas ──────────────────────────────────────────────
// Una corrección de texto puede llevarse por delante un enlace sin que se
// note: pasó el 29 ago 2026 con `/casos/savian`, cuyo enlace desde la página
// de servicio murió dentro del párrafo que lo alojaba. El estándar de la casa
// es dos entradas por caso, la ficha del carrusel y una editorial desde su
// página de servicio.
const RUTAS = 'src/i18n/utils.ts';
const casos = [...readFileSync(RUTAS, 'utf8').matchAll(/'(\/casos\/[a-z-]+)'/g)].map((m) => m[1]);
const uiEntero = readFileSync(UI, 'utf8');
const huerfanas = [];
for (const ruta of casos) {
  // El routeMap declara la ruta una vez; solo cuentan las referencias de ui.ts.
  const veces = (uiEntero.match(new RegExp(`["']${ruta}["']`, 'g')) || []).length;
  if (veces === 0) {
    huerfanas.push(['página de caso sin ninguna entrada', `${ruta} no se enlaza desde ui.ts`]);
  } else if (veces === 1) {
    console.log(
      `\n${UI}\n  aviso  página de caso con una sola entrada\n         …${ruta}, y el estándar son dos…`
    );
    totalAvisos += 1;
  }
}
if (huerfanas.length) {
  console.log(`\n${UI}`);
  for (const [regla, ctx] of huerfanas) {
    console.log(`  ERROR  ${regla}\n         …${ctx}…`);
  }
  totalFallos += huerfanas.length;
}

console.log(
  `\n${totalFallos} errores, ${totalAvisos} avisos.` +
    (totalAvisos ? ' Los avisos piden criterio: revísalos a mano.' : '')
);

// Los avisos no rompen el build; los errores sí.
process.exit(totalFallos > 0 ? 1 : 0);
