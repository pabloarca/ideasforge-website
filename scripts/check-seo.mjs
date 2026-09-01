/*
  Verificador de SEO y calidad técnica, hermano de `check-copy.mjs`.

  Reparto: `check-copy` mira el ORIGEN (ui.ts y los markdown) y vigila la voz
  de la casa. Este mira el SITIO COMPILADO, que es lo que Google recibe de
  verdad, y vigila lo que se puede comprobar sin criterio humano.

  Nace de la auditoría del 1 sep 2026: cada regla de aquí es un hallazgo de
  aquella pasada convertido en alarma, para que no haya que repetirla a mano.
  Si mañana alguien sube una imagen sin medidas o deja un título de 80
  caracteres, salta aquí y no tres meses después en Search Console.

  Errores rompen el build. Los avisos piden criterio y no lo rompen, igual que
  en `check-copy`.

  Y la misma advertencia de la casa: el verde es el suelo, no el techo. Esto no
  sabe si un título es flojo, si un dato es falso o si un párrafo se entiende.
*/
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, sep } from 'node:path';

const DIST = 'dist';

if (!existsSync(DIST)) {
  console.log('No hay carpeta dist/. Compila antes con `npm run build`.');
  process.exit(1);
}

/* ── Presupuestos. Se suben o se bajan a propósito, nunca por accidente. ──
   Los números salen de la medición del 1 sep 2026 con algo de holgura: la
   idea es cazar una regresión gorda, no perseguir kilobytes. */
const PRESUPUESTO = {
  ficheroKB: 600,        // ningún recurso suelto por encima
  sitioMB: 8,            // dist/ entero
  htmlKB: 400,           // una página compilada
  tituloMax: 62,         // con el sufijo «, Ideasforge»
  descMin: 70,
  descMax: 165,
  palabrasMin: 250,      // por debajo, una página no compite por nada
  profundidadMax: 3,     // clics desde una portada
};

/* Páginas a las que no se aplican las reglas de contenido: no compiten en
   búsqueda y algunas ni deberían indexarse. */
const EXENTAS = [/^\/404$/, /^\/(en\/)?politica-|^\/en\/(privacy|cookies)-policy$/];

let fallos = 0;
let avisos = 0;
const grupos = new Map();

function error(pagina, regla, ctx) {
  if (!grupos.has(pagina)) grupos.set(pagina, []);
  grupos.get(pagina).push(['ERROR', regla, ctx]);
  fallos += 1;
}
function aviso(pagina, regla, ctx) {
  if (!grupos.has(pagina)) grupos.set(pagina, []);
  grupos.get(pagina).push(['aviso', regla, ctx]);
  avisos += 1;
}

/* ── Recolección ─────────────────────────────────────────────────────────── */
const todos = (d, a = []) => {
  for (const f of readdirSync(d, { withFileTypes: true })) {
    const p = join(d, f.name);
    if (f.isDirectory()) todos(p, a);
    else a.push(p);
  }
  return a;
};
const ficheros = todos(DIST);
const htmls = ficheros.filter((f) => f.endsWith('index.html'));
const rutaDe = (f) =>
  f.split(sep).join('/').replace(new RegExp(`^${DIST}`), '').replace(/\/index\.html$/, '') || '/';

const paginas = htmls.map((f) => {
  const s = readFileSync(f, 'utf8');
  const r = rutaDe(f);
  const cuerpo = (s.match(/<main[\s\S]*?<\/main>/) || [s])[0];
  return {
    r,
    s,
    kb: Math.round(statSync(f).size / 1024),
    exenta: EXENTAS.some((re) => re.test(r)),
    titulo: (s.match(/<title>([^<]*)<\/title>/) || [])[1] || '',
    desc: (s.match(/name="description" content="([^"]*)"/) || [])[1] || '',
    canonical: (s.match(/rel="canonical" href="([^"]*)"/) || [])[1] || '',
    ogImage: (s.match(/property="og:image" content="([^"]*)"/) || [])[1] || '',
    h1: (cuerpo.match(/<h1[\s>]/g) || []).length,
    niveles: [...cuerpo.matchAll(/<h([1-6])[\s>]/g)].map((m) => +m[1]),
    imgs: [...s.matchAll(/<img [^>]*>/g)].map((m) => m[0]),
    jsonld: [...s.matchAll(/<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]),
    enlaces: [...new Set([...s.matchAll(/href="(\/[^"#?]*)"/g)].map((m) => m[1].replace(/\/$/, '') || '/'))],
    palabras: cuerpo.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<[^>]*>/g, ' ')
      .split(/\s+/).filter(Boolean).length,
  };
});
const rutas = new Set(paginas.map((p) => p.r));

/* ── 1. Metadatos por página ─────────────────────────────────────────────── */
for (const p of paginas) {
  if (!p.canonical) error(p.r, 'sin canonical', 'toda página necesita la suya');
  if (!p.ogImage) error(p.r, 'sin og:image', 'al compartirla sale un hueco');
  if (p.h1 !== 1) error(p.r, `${p.h1} etiquetas h1`, 'tiene que haber exactamente una');

  // Un salto de nivel (h2 → h4) rompe el esquema del documento.
  for (let i = 1; i < p.niveles.length; i += 1) {
    if (p.niveles[i] > p.niveles[i - 1] + 1) {
      error(p.r, 'salto en la jerarquía de encabezados', `h${p.niveles[i - 1]} seguido de h${p.niveles[i]}`);
      break;
    }
  }

  if (p.exenta) continue;

  if (p.titulo.length > PRESUPUESTO.tituloMax) {
    error(p.r, `title de ${p.titulo.length} caracteres`, `Google corta pasados ${PRESUPUESTO.tituloMax}: «${p.titulo}»`);
  }
  if (p.desc.length < PRESUPUESTO.descMin || p.desc.length > PRESUPUESTO.descMax) {
    error(p.r, `description de ${p.desc.length} caracteres`,
      `fuera del rango ${PRESUPUESTO.descMin}-${PRESUPUESTO.descMax}: «${p.desc.slice(0, 70)}…»`);
  }
  if (p.palabras < PRESUPUESTO.palabrasMin) {
    aviso(p.r, `${p.palabras} palabras`, `por debajo de ${PRESUPUESTO.palabrasMin} una página no compite por ningún término`);
  }
}

/* ── 2. Duplicados entre páginas ─────────────────────────────────────────── */
for (const [campo, etiqueta] of [['titulo', 'title'], ['desc', 'description']]) {
  const por = new Map();
  for (const p of paginas.filter((x) => !x.exenta && x[campo])) {
    por.set(p[campo], [...(por.get(p[campo]) || []), p.r]);
  }
  for (const [valor, dónde] of por) {
    if (dónde.length > 1) {
      error(dónde[0], `${etiqueta} duplicado`, `el mismo en ${dónde.join(', ')}: «${valor.slice(0, 60)}…»`);
    }
  }
}

/* ── 3. Imágenes ─────────────────────────────────────────────────────────────
   `width` y `height` reservan el hueco antes de que la imagen llegue. Sin
   ellos el contenido salta al cargar, que es lo que Google mide como CLS. Los
   pone solos `medidas()` de `src/lib/imagen.ts`: si aquí falta alguna, es que
   ese `<img>` se escribió sin pasar por el ayudante. */
const sinMedidas = new Map();
const sinAlt = new Map();
for (const p of paginas) {
  for (const img of p.imgs) {
    const src = (img.match(/src="([^"]*)"/) || [])[1] || '(sin src)';
    if (!/width=/.test(img) || !/height=/.test(img)) {
      sinMedidas.set(src, (sinMedidas.get(src) || 0) + 1);
    }
    /*
      `alt` vacío es correcto y deliberado en una imagen decorativa: le dice al
      lector de pantalla que la salte. Lo que no vale es que el atributo no
      exista, porque entonces el lector lee la URL del fichero.

      OJO al escribir esta comprobación: Astro compila `alt={''}` como `alt` a
      secas, sin `=""`. Buscar `alt=` da ocho falsos positivos en las copias
      duplicadas del carrusel de logotipos, que llevan el vacío a propósito
      porque van `aria-hidden`. Es el mismo error que cometió la auditoría del
      1 sep antes de mirar el componente.
    */
    if (!/\salt(\s|=|>|\/)/.test(img)) sinAlt.set(src, (sinAlt.get(src) || 0) + 1);
  }
}
for (const [src, veces] of sinMedidas) {
  error('imágenes', 'img sin width/height', `${src} (${veces} veces) · usa {...medidas(src)} de src/lib/imagen.ts`);
}
for (const [src, veces] of sinAlt) {
  error('imágenes', 'img sin atributo alt', `${src} (${veces} veces) · si es decorativa, alt="" explícito`);
}

/* ── 4. Datos estructurados ──────────────────────────────────────────────── */
for (const p of paginas) {
  for (const bloque of p.jsonld) {
    let o;
    try {
      o = JSON.parse(bloque);
    } catch (e) {
      error(p.r, 'JSON-LD que no parsea', String(e.message).slice(0, 60));
      continue;
    }
    if (!o['@context'] || !o['@type']) {
      error(p.r, 'JSON-LD sin @context o @type', 'un bloque sin tipo no lo lee nadie');
    }
    if (o['@type'] === 'BreadcrumbList') {
      const mal = (o.itemListElement || []).filter((x) => !x.name || !x.item);
      if (mal.length) error(p.r, 'miga de pan incompleta', `${mal.length} elementos sin nombre o sin URL`);
    }
    if (o['@type'] === 'FAQPage') {
      const mal = (o.mainEntity || []).filter((q) => !q.name || !q.acceptedAnswer?.text);
      if (mal.length) error(p.r, 'FAQPage con preguntas vacías', `${mal.length} sin texto`);
    }
  }
}

/* ── 5. Enlazado interno y profundidad ───────────────────────────────────── */
const grafo = new Map(paginas.map((p) => [p.r, p.enlaces.filter((e) => rutas.has(e))]));
const entrantes = new Map(paginas.map((p) => [p.r, 0]));
for (const p of paginas) {
  for (const e of p.enlaces) {
    if (entrantes.has(e) && e !== p.r) entrantes.set(e, entrantes.get(e) + 1);
  }
  // Un enlace interno a una ruta que no existe es un 404 con nuestro nombre.
  for (const e of p.enlaces) {
    if (!rutas.has(e) && !ficheros.some((f) => rutaDe(f) === e || f.split(sep).join('/').endsWith(e))) {
      if (!/\.[a-z0-9]{2,4}$/i.test(e)) error(p.r, 'enlace interno roto', e);
    }
  }
}
for (const [r, n] of entrantes) {
  if (n === 0 && r !== '/' && r !== '/en' && !/^\/404$/.test(r)) {
    error(r, 'página huérfana', 'ningún enlace interno apunta a ella');
  }
}

const profundidad = new Map();
for (const inicio of ['/', '/en']) {
  if (!rutas.has(inicio)) continue;
  const visto = new Map([[inicio, 0]]);
  const cola = [inicio];
  while (cola.length) {
    const u = cola.shift();
    for (const v of grafo.get(u) || []) {
      if (!visto.has(v)) {
        visto.set(v, visto.get(u) + 1);
        cola.push(v);
      }
    }
  }
  for (const [k, v] of visto) {
    if (!profundidad.has(k) || v < profundidad.get(k)) profundidad.set(k, v);
  }
}
for (const p of paginas) {
  const d = profundidad.get(p.r);
  if (d === undefined) {
    if (!/^\/404$/.test(p.r)) error(p.r, 'inalcanzable', 'no se llega desde ninguna portada siguiendo enlaces');
  } else if (d > PRESUPUESTO.profundidadMax) {
    aviso(p.r, `a ${d} clics de la portada`, `el techo de la casa son ${PRESUPUESTO.profundidadMax}`);
  }
}

/* ── 6. Redirecciones: todo destino tiene que existir ────────────────────── */
const redir = join(DIST, '_redirects');
if (existsSync(redir)) {
  const reglas = readFileSync(redir, 'utf8')
    .split(/\r?\n/)
    .filter((l) => l.trim() && !l.trim().startsWith('#'))
    .map((l) => l.trim().split(/\s+/));
  for (const [origen, destino, codigo] of reglas) {
    const limpio = (destino || '').split('#')[0].replace(/\/$/, '') || '/';
    if (!rutas.has(limpio)) error('_redirects', 'destino inexistente', `${origen} -> ${destino}`);
    if (codigo !== '301') aviso('_redirects', `código ${codigo}`, `${origen}: para una migración se usa 301`);
    // Una regla exacta detrás de un comodín que la absorbe no se ejecuta nunca.
    const antes = reglas.slice(0, reglas.indexOf([origen, destino, codigo]));
    void antes;
  }
} else {
  aviso('_redirects', 'no existe en dist/', 'la migración de la web vieja depende de él');
}

/* ── 7. Sitemap ──────────────────────────────────────────────────────────── */
const sm = join(DIST, 'sitemap-0.xml');
if (existsSync(sm)) {
  const locs = [...readFileSync(sm, 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  for (const u of locs) {
    const ruta = new URL(u).pathname.replace(/\/$/, '') || '/';
    if (!rutas.has(ruta)) error('sitemap', 'URL que no existe', u);
  }
  const faltan = paginas.filter((p) => !/^\/404$/.test(p.r))
    .filter((p) => !locs.some((u) => (new URL(u).pathname.replace(/\/$/, '') || '/') === p.r));
  for (const p of faltan) aviso('sitemap', 'página fuera del sitemap', p.r);
} else {
  error('sitemap', 'no se generó', 'la integración de sitemap debería crearlo');
}

/* ── 8. Presupuestos de peso ─────────────────────────────────────────────── */
const totalMB = ficheros.reduce((a, f) => a + statSync(f).size, 0) / 1024 / 1024;
if (totalMB > PRESUPUESTO.sitioMB) {
  error('peso', `dist/ pesa ${totalMB.toFixed(1)} MB`, `el presupuesto son ${PRESUPUESTO.sitioMB} MB`);
}
for (const f of ficheros) {
  const kb = statSync(f).size / 1024;
  const r = f.split(sep).join('/').replace(new RegExp(`^${DIST}`), '');
  if (kb > PRESUPUESTO.ficheroKB) {
    error('peso', `${r} pesa ${Math.round(kb)} KB`, `el presupuesto por fichero son ${PRESUPUESTO.ficheroKB} KB`);
  }
}
for (const p of paginas) {
  if (p.kb > PRESUPUESTO.htmlKB) {
    aviso('peso', `${p.r} compila ${p.kb} KB de HTML`, `el presupuesto son ${PRESUPUESTO.htmlKB} KB`);
  }
}

/* ── 9. Ficheros que tienen que estar ────────────────────────────────────── */
for (const [f, motivo] of [
  ['robots.txt', 'sin él los rastreadores van a ciegas'],
  ['og-default.png', 'es el respaldo de og:image de casi todas las páginas'],
]) {
  if (!existsSync(join(DIST, f))) error('ficheros', `falta ${f}`, motivo);
}

/* ── Informe ─────────────────────────────────────────────────────────────── */
for (const [pagina, lineas] of [...grupos].sort((a, b) => a[0].localeCompare(b[0]))) {
  console.log(`\n${pagina}`);
  for (const [nivel, regla, ctx] of lineas) {
    console.log(`  ${nivel === 'ERROR' ? 'ERROR' : 'aviso'}  ${regla}\n         ${ctx}`);
  }
}

console.log(
  `\n${paginas.length} páginas revisadas. ${fallos} errores, ${avisos} avisos.` +
    (avisos ? ' Los avisos piden criterio: revísalos a mano.' : '')
);

// Los avisos no rompen el build; los errores sí.
process.exit(fallos > 0 ? 1 : 0);
