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

// Excepciones declaradas: comas antes de «y» que el propietario escribió y
// decidió conservar en su revisión manual de /servicios/automatizacion-de-
// procesos-con-ia (2 oct 2026), donde pidió expresamente no aplicar las
// reglas de la casa a sus frases. La regla sigue valiendo para todo lo demás.
const EXCEPCIONES_COMA = [
  'con la del proveedor B, y un robot',
  'cuánto tiene sentido invertir, y el piloto',
  // Su revisión de /servicios/desarrollo-de-agentes-de-ia (2 oct 2026).
  'interpretara y copiara los datos, o construir',
  'que un proyecto útil fracase, y puede evitarse',
  // Su revisión de /servicios/conocimiento-corporativo (2 oct 2026).
  'a dos o tres personas, y casi siempre',
  'que no deberían hacerse, y distinguirlos',
  // Su revisión de /cuanto-cuesta-un-agente-de-ia (5 oct 2026).
  'coste de automatizarlos, y puedes detectarlo',
  // Su revisión de /reglamento-europeo-de-ia (5 oct 2026).
  'intervenga o lo detenga, y mantener',
];

// Lo mismo con el punto y coma, en sus revisiones manuales de
// /servicios/agentes-conversacionales, /servicios/desarrollo-de-agentes-de-ia
// y /servicios/conocimiento-corporativo (2 oct 2026).
const EXCEPCIONES_PUNTO_Y_COMA = [
  'tipos de trabajo concretos; la última',
  'la inversión es limitada; si funciona',
  'no solo tiene que responder bien; también',
  // Su revisión de /ia-y-rgpd (5 oct 2026).
  'no elimina necesariamente su uso; puede',
  'El modelo interpreta; el código controla',
  // Su revisión de /reglamento-europeo-de-ia (5 oct 2026).
  'comercializa el sistema; el responsable',
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
  // 14 sep 2026: «booked twice» es ambiguo en inglés. Un nativo puede leerlo
  // como que ningún cliente reservó una segunda vez, lo contrario de lo que dice
  // el dato (DOUBLE_BOOKING_DETECTED = 0). El término idiomático es el de la fuente.
  [/booked twice/g, 'double-booked («booked twice» se lee como que nadie repite reserva)'],
  // 29 sep 2026: registro rebuscado. El propietario señaló «estorba» y
  // «confesión» («yo no uso esas palabras») y aprobó vetar la lista entera del
  // inventario del español publicado. La regla vive en §7 del árbitro: la
  // palabra que dirías en una reunión, no la que escribirías en un ensayo.
  [/estorb/gi, 'molestar, frenar o sobrar, según la frase'],
  [/confesi[óo]n/gi, 'quitarla: la frase suele sobrar'],
  [/\baplomo/gi, 'seguridad, tono seguro'],
  [/antídoto/gi, 'remedio'],
  [/bautiz/gi, 'llamar, poner nombre, cambiar el nombre'],
  [/centinela/gi, 'alarma, comprobación'],
  [/estrépito/gi, 'a la vista, haciendo ruido'],
  [/entornad/gi, 'abierta'],
  [/\bescrut/gi, 'revisar'],
  [/franqueza/gi, 'claro («te decimos claro»)'],
  [/\bhonr(ar|ad)/gi, 'respetar, sincero, o quitarlo'],
  [/todopoderos/gi, '«que lo abre todo»'],
  [/\bengord|\bengros/gi, 'inflar, sumarse a'],
  [/\baflor/gi, 'aparecer, salir a la luz'],
  [/\berosion/gi, 'desgastar, hacer perder'],
  [/\bresient|\bresentir/gi, 'caer, perderse'],
  [/puntería/gi, 'acierto'],
  [/desconcertante/gi, 'raro'],
  [/glamur/gi, 'llamativo'],
  [/\bponder/gi, 'valorar, interpretar'],
  [/\blentes?\b/gi, 'mirada, alcance'],
  [/\breposar/gi, 'dejar para luego, o quitarlo'],
  [/\bvaras?\b/gi, 'criterio, métrica, prueba'],
  [/\bampar[oa]\b/gi, 'base legal, cubrir'],
];

/*
 * Metáforas y fórmulas que el propietario ya sustituyó en sus revisiones del
 * 2 al 5 oct 2026 (unas 350 frases en ocho páginas). Es la regla de
 * «claridad literal» de §7 del árbitro llevada a la máquina: lo que él ya
 * corrigió una vez no debe volver a escribirse. Va como AVISO y no como
 * error porque alguna puede funcionar en su contexto, y porque los posts
 * publicados aún no han pasado su revisión.
 */
const METAFORAS_RETIRADAS = [
  [/maquinaria pesada/g, 'di qué obligaciones son'],
  [/ventana (en la que|se está cerrando|se cierra)/g, 'di qué está pasando y desde cuándo'],
  [/carga(r|n)? con (el|todo el|casi todo el) peso/g, 'di quién asume qué'],
  [/mercado abajo/g, 'en el resto de la cadena'],
  [/le pone precio/g, 'di qué obligación o coste aparece'],
  [/se gana (su|el) puesto/g, 'di cómo se valida'],
  [/cuello de botella/g, 'el principal obstáculo, y cuál es'],
  [/la muerte más tonta/g, 'la forma más habitual de fracasar'],
  [/petición educada/g, 'una instrucción que el modelo puede incumplir'],
  [/perímetro de confianza/g, 'los casos validados'],
  [/tercera cifra/g, 'el tercer coste, el modelo y la infraestructura'],
  [/en el folleto/g, 'di qué es lo que no se cumple'],
  [/a estas alturas/g, 'di la conclusión directamente'],
  [/lo que (eso )?arrastra/g, 'di qué obligaciones activa'],
  [/ese hueco/g, 'nombra el hueco'],
  [/trampa silenciosa/g, 'di qué caso se pasa por alto'],
  [/(cierra|abre) la puerta/g, 'di qué se permite o se impide'],
  [/puerta de salida/g, 'la excepción'],
  [/se porta bien/g, 'funciona aunque el modelo falle'],
  [/levanta la mano/g, 'pide más información'],
  [/estrecho y profundo/g, 'una parte concreta, probada a fondo'],
  [/(mató|murió) (una|la) clase entera/g, 'eliminó una categoría de fallos'],
  [/sale caro en las dos direcciones/g, 'di qué falla en cada caso'],
  [/el lado de ingeniería/g, 'la parte técnica'],
  [/reglas del juego/g, 'di qué cambia exactamente'],
  [/no tiene ningún brillo/g, 'es sencillo'],
  [/juguetes? que se enseña/g, 'demostraciones que no llegan a usarse'],
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
  // La vigilancia semanal no es UNA conversación de prueba: es una tanda de
  // muchas, cada semana y en todos los sistemas (propietario, 1 oct 2026). La
  // forma singular estaba en nueve sitios entre los dos idiomas.
  ['una conversación de prueba anonimizada', 'la vigilancia semanal es una tanda de conversaciones (1 oct 2026)'],
  ['una prueba semanal', 'la vigilancia semanal es una tanda de conversaciones (1 oct 2026)'],
  ['an anonymized test conversation', 'the weekly check is a batch of test conversations (1 oct 2026)'],
  ['a scripted end-to-end test conversation', 'the weekly check is a batch of test conversations (1 oct 2026)'],
  ['weekly probe', 'the weekly check is a batch of test conversations (1 oct 2026)'],
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

/*
 * Negrita por sección en los posts (§12.C del árbitro): «una o dos
 * frases-tesis por sección», y leídas solas deben contar el argumento. El
 * barrido del 23 ago 2026 lo comprobó con un script que no quedó aquí, y el
 * 29 sep había 17 secciones sin negrita en cada idioma, cinco de ellas en el
 * mismo post. Cuenta como sección la entradilla y cada H2; las H3 van dentro
 * de su H2. Las tablas y las imágenes no son párrafos.
 */
function seccionesSinNegrita(textoBruto) {
  const partes = textoBruto.split(/^---\s*$/m);
  if (partes.length < 3) return [];
  const sin = [];
  partes.slice(2).join('---').split(/^## /m).forEach((s, i) => {
    const titulo = i === 0 ? '(entradilla)' : s.split('\n')[0].trim();
    const resto = i === 0 ? s : s.split('\n').slice(1).join('\n');
    const parrafos = resto
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter((p) => p && !p.startsWith('|') && !p.startsWith('!['));
    if (parrafos.length && !parrafos.some((p) => p.includes('**'))) sin.push(titulo);
  });
  return sin;
}
const SIN_NEGRITA = 'sección de post sin negrita (§12.C: una o dos frases-tesis por sección)';

function revisa(nombre, textoBruto) {
  let t = soloProsa(textoBruto);
  for (const re of TERMINOS_LEGALES) t = t.replace(re, ' ');
  const fallos = [];
  const avisos = [];

  const coma = [...t.matchAll(/,\s+(y|e|o|u|ni)\s/g)];
  for (const m of coma) {
    const alrededor = t.slice(Math.max(0, m.index - 60), m.index + 60);
    if (EXCEPCIONES_COMA.some((e) => alrededor.includes(e))) continue;
    // Aviso y no error desde el 5 oct 2026 (§3): la coma vale cuando la
    // conjunción abre un inciso o una oración con otro sujeto, y eso no lo
    // distingue una expresión regular.
    avisos.push(['coma antes de conjunción (solo vale si abre un inciso o una oración con otro sujeto)', contexto(t, m.index)]);
  }

  for (const m of [...t.matchAll(/;/g)]) {
    const alrededor = t.slice(Math.max(0, m.index - 60), m.index + 60);
    if (EXCEPCIONES_PUNTO_Y_COMA.some((e) => alrededor.includes(e))) continue;
    fallos.push(['punto y coma', contexto(t, m.index)]);
  }

  for (const [re, mejor] of METAFORAS_RETIRADAS) {
    for (const m of [...t.matchAll(new RegExp(re.source, re.flags))]) {
      avisos.push([`metáfora ya corregida por el propietario (§7, claridad literal): ${mejor}`, contexto(t, m.index)]);
    }
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
      avisos.push(['dos puntos que ni enumeran ni explican lo anterior', contexto(t, m.index)]);
    }
  }


  if (nombre.endsWith('.md')) {
    for (const s of seccionesSinNegrita(textoBruto)) fallos.push([SIN_NEGRITA, s]);
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

/* Palabras británicas por USO, no por grafia. Ver el comentario de
   `revisaIngles`. Entra aquí solo lo que no admite duda en contexto. */
const VOCABULARIO_BRITANICO = {
  'the other way round': 'the other way around',
};

/** Solo el bloque inglés de ui.ts. */
function bloqueIngles(src) {
  const ini = src.indexOf('\n  en: {');
  if (ini < 0) throw new Error('No encuentro el bloque en de ui.ts');
  /*
    Y se corta donde cierra el objeto `content`. El español va acotado entre dos
    marcas y el inglés se llevaba el resto del fichero, cierre incluido. No
    importaba mientras solo se buscaran palabras británicas; al entrar la regla
    de puntuación el 2 sep 2026 empezó a cazar el cierre de JavaScript como si
    fuera prosa.
  */
  const resto = src.slice(ini);
  const fin = resto.indexOf('\n};');
  return fin < 0 ? resto : resto.slice(0, fin);
}

function revisaIngles(nombre, textoBruto) {
  // Mismo filtro que el español: sin él, las claves de objeto, las rutas y las
  // etiquetas entran como si fueran texto visible.
  let t = soloProsa(textoBruto);
  for (const n of NOMBRES_PROPIOS) t = t.split(n).join(' ');
  const fallos = [];
  const avisos = [];
  for (const [brit, ameri] of Object.entries(BRITANICO)) {
    for (const m of [...t.matchAll(new RegExp(`\\b${brit}\\b`, 'gi'))]) {
      fallos.push([`ortografía británica «${brit}», debe ser «${ameri}»`, contexto(t, m.index)]);
    }
  }
  /*
    Las reglas de puntuación de §7 valen también para el inglés, todas salvo la
    coma antes de «y», que en inglés sigue las normas del idioma. Hasta el 2 sep
    2026 solo se comprobaban sobre el español, y el inglés llevaba publicado un
    «Your systems stay put; AI flows through them» en la portada mientras su
    espejo español decía lo mismo con una «y». Una regla escrita y no vigilada
    dura lo que tarda alguien en no acordarse.
  */
  for (const m of [...t.matchAll(/;/g)]) {
    fallos.push(['punto y coma', contexto(t, m.index)]);
  }
  for (const m of [...t.matchAll(/—/g)]) {
    fallos.push(['raya larga', contexto(t, m.index)]);
  }
  /*
    Vocabulario británico, que es distinto de la ortografía de arriba. La
    decisión del 25 ago 2026 es inglés americano en TODO el sitio, y
    `BRITANICO` solo miraba cómo se escriben las palabras, no cuáles se usan:
    cazaba «behaviour» y dejaba pasar «the other way round». Lo destaparon las
    once lecturas en frío del 14 sep 2026. «flat» por apartamento NO entra
    aquí: «a flat no» es americano correcto y hay que mirarlo caso por caso.
  */
  for (const [brit, ameri] of Object.entries(VOCABULARIO_BRITANICO)) {
    for (const m of [...t.matchAll(new RegExp(brit, 'gi'))]) {
      fallos.push([`vocabulario británico «${brit}», debe ser «${ameri}»`, contexto(t, m.index)]);
    }
  }
  /*
    Comma splice: dos oraciones independientes unidas por una coma. En español
    es corriente y en inglés es un error. Va como AVISO, nunca como error,
    porque la detección es heurística y el juicio es de quien lee.

    **La primera versión de esta regla avisó 128 veces y tenía razón en unas
    veinte.** Se miró la lista entera antes de corregir nada, el 14 sep 2026, y
    salió esto: 34 llevaban una subordinada delante («If it breaks one that used
    to pass, it does not ship»), donde la coma es la correcta; y 65 eran el
    patrón contrastivo «no es A, es B», que es el ritmo de esta casa y que el
    inglés SÍ admite cuando las dos mitades son cortas y paralelas. Partir esas
    65 con un punto habría aplanado la voz para arreglar algo que no lo estaba.

    Una regla que acierta una de cada seis no señala: tapa. Así que ahora se
    descuentan los dos casos y lo que queda pide mirada de verdad.

    EL REMEDIO, cuando toca, ES EL PUNTO. La raya larga y el punto y coma están
    vetados en esta casa y los cazan las reglas de aquí arriba.
  */
  const SPLICE =
    /,\s+(it|they|we|you|he|she|that|this|there)\s+(is|are|was|were|does|do|did|has|have|had|will|would|can|could|should)\b/gi;
  /* Conjunciones que hacen dependiente a la primera mitad. */
  const SUBORDINA =
    /(^|[.!?]\s+)[*“"'(]*(and |but |so |or |yes, |no, )?[*“"'(]*(if|when|while|although|though|because|after|before|since|unless|until|once|whenever|whether|as|where|even if|so that|given that)\b/i;
  /* Negación en la primera mitad: es el contraste «no es A, es B». */
  const CONTRASTE = /(\b(not|no|none|never|nothing|nobody|neither)\b|n’t\b|n't\b|\bcannot\b)/i;
  const FIN_ORACION = /[.!?]/g;
  for (const m of [...t.matchAll(SPLICE)]) {
    /* La primera mitad: desde el final de la oración anterior hasta la coma. */
    let desde = -1;
    FIN_ORACION.lastIndex = 0;
    for (const f of [...t.slice(0, m.index).matchAll(FIN_ORACION)]) desde = f.index;
    const primera = t.slice(desde + 1, m.index);
    if (SUBORDINA.test(primera.trim())) continue;
    /* Una primera mitad corta suele ser una introducción («In plain terms,»,
       «Yes,», «For the technical review,»), no una oración independiente. */
    if (primera.trim().split(/\s+/).length < 5) continue;
    if (CONTRASTE.test(primera)) continue;
    avisos.push(['posible comma splice: en inglés se parte en dos con un punto', contexto(t, m.index)]);
  }
  // Aviso y no error hasta la pasada de negritas del inglés: el español se
  // cerró el 29 sep 2026 y un idioma por pasada es regla del contrato.
  if (nombre.endsWith('.md')) {
    for (const s of seccionesSinNegrita(textoBruto)) avisos.push([SIN_NEGRITA, s]);
  }
  revisaComunes(textoBruto, fallos);
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

const objetivosEn = [
  { nombre: `${UI} (bloque inglés)`, texto: bloqueIngles(readFileSync(UI, 'utf8')) },
  ...readdirSync(BLOG_EN)
    .filter((f) => f.endsWith('.md'))
    .map((f) => ({ nombre: join(BLOG_EN, f), texto: readFileSync(join(BLOG_EN, f), 'utf8') })),
];

for (const o of objetivosEn) {
  const r = revisaIngles(o.nombre, o.texto);
  if (!r.fallos.length && !r.avisos.length) continue;
  console.log(`\n${r.nombre}`);
  for (const [regla, ctx] of r.fallos) {
    console.log(`  ERROR  ${regla}\n         …${ctx}…`);
  }
  for (const [regla, ctx] of r.avisos) {
    console.log(`  aviso  ${regla}
         …${ctx}…`);
  }
  totalFallos += r.fallos.length;
  totalAvisos += r.avisos.length;
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
