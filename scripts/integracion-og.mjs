import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import { htmlATexto } from './html-a-texto.mjs';
import { join, sep, dirname } from 'node:path';
import { portadaSocial } from './og.mjs';

/*
  Integración de Astro que genera una portada social por página, ya terminado
  el build.

  Por qué en un gancho de fin de build y no en un endpoint con
  `getStaticPaths`: un endpoint tendría que volver a enumerar todas las
  páginas y volver a averiguar el título de cada una, duplicando lo que ya
  sabe `ui.ts` y el frontmatter de los posts. En cuanto alguien creara una
  página nueva, su portada faltaría y nadie se enteraría hasta ver un enlace
  compartido sin imagen.

  Aquí la fuente de la verdad es la propia página compilada: se lee su
  `<title>` y su `og:image`, y se genera la imagen solo si esa etiqueta apunta
  a `/og/`. Una página nueva la hereda sin que nadie se acuerde, igual que la
  miga de pan y los datos estructurados.

  Las páginas que traen fotografía propia (los posts con `heroImage`) no pasan
  por aquí: su `og:image` apunta a la foto y se respeta, porque una imagen real
  del asunto vende más que una tarjeta generada.
*/

/** La familia decide el color y la etiqueta. Se deduce de la ruta. */
function familiaDe(ruta) {
  if (ruta === '/' || ruta === '/en') return 'home';
  if (/^\/(en\/)?blog\//.test(ruta)) return 'blog';
  if (/^\/(servicios|en\/services)\//.test(ruta)) return 'servicio';
  if (/^\/(proyectos|en\/cases)\//.test(ruta)) return 'caso';
  // Los sectores españoles viven bajo `/sectores/` desde el 7 oct 2026. Pymes
  // pasó a guía ese día, así que en español cae en el caso por defecto.
  if (/^\/(sectores(\/[a-z-]+)?|en\/(smb|accounting-firms|real-estate))$/.test(ruta)) {
    return 'vertical';
  }
  // Las legales caían en el saco de «guía» por defecto y se anunciaban como
  // tal. Nadie comparte una política de cookies, pero salía mal.
  if (/^\/(politica-|en\/(privacy|cookies)-policy)/.test(ruta)) return 'legal';
  return 'guia';
}

const recorre = (d, a = []) => {
  for (const f of readdirSync(d, { withFileTypes: true })) {
    const p = join(d, f.name);
    if (f.isDirectory()) recorre(p, a);
    // Desde el 2 sep 2026 el compilado es `gestorias.html` y no
    // `gestorias/index.html` (`build.format: 'file'`, ver astro.config.mjs).
    // Se aceptan las dos formas para que este script no dependa de esa
    // decisión, que es de servidor y puede volver a cambiar.
    else if (f.name.endsWith('.html')) a.push(p);
  }
  return a;
};

/*
  llms.txt y llms-full.txt, lo que el sitio le cuenta a un modelo de lenguaje.

  Es una convención emergente, no un estándar con respaldo de nadie, y conviene
  decirlo antes de que alguien espere de más: hoy ningún buscador promete
  leerlo. Encaja con lo que esta casa predica, así que se pone con esa
  expectativa y no con otra.

  Se genera del sitio compilado por la misma razón que las portadas: una lista
  escrita a mano se queda vieja a la primera página nueva. De cada página salen
  su título y su descripción, que ya pasaron por revisión editorial.

  Rehecho el 21 oct 2026 (pedido por Dani), en cinco puntos:
    1. El índice va agrupado por tipo de página (empresa, soluciones, sectores,
       proyectos, guías, preguntas frecuentes, blog), con lo importante
       primero, en vez de una lista alfabética por idioma.
    2. Fuera las páginas de confirmación de formulario (`/gracias`,
       `/en/thank-you`), que no dicen nada.
    3. Arriba, los datos básicos de la casa en los dos idiomas: qué hacemos,
       desde dónde, los cinco sistemas, los precios publicados y el contacto.
       Todos salen del banco de hechos de `.private/base-editorial.md`. Si
       cambia uno allí, se cambia aquí.
    4. El texto completo sale sin el formulario de contacto, que se repetía en
       casi cada página y no dice nada de lo que hacemos.
    5. El texto completo va en un fichero por idioma (`llms-full.txt` el
       español, `llms-full-en.txt` el inglés), con el mismo orden que el índice.
*/

const RAIZ_SITIO = 'https://ideasforge.io';

/** Ruta limpia de un fichero compilado: `/guias/ia-y-rgpd`, `/en`, `/`. */
const rutaDe = (raiz, fichero) => {
  const ruta =
    fichero.split(sep).join('/').replace(raiz.split(sep).join('/'), '/').replace(/\/index\.html$/, '').replace(/\.html$/, '') ||
    '/';
  return ruta.replace(/\/+$/, '') || '/';
};

const esIngles = (r) => r === '/en' || r.startsWith('/en/');

/* Páginas que no entran en ninguno de los dos ficheros. */
const FUERA = new Set(['/404', '/gracias', '/en/thank-you']);
const esLegal = (r) => /^\/(politica-|en\/(privacy|cookies)-policy)/.test(r);

/*
  Los grupos, en el orden en que se leen. Cada uno sabe reconocer sus rutas y
  cuál es su página índice, que va la primera. Dentro de soluciones y sectores
  manda el orden del menú, que es el de importancia para la casa. En el blog,
  lo más reciente primero. En el resto, el orden alfabético basta.
*/
const GRUPOS = [
  {
    clave: 'empresa',
    titulo: { es: 'Empresa', en: 'Company' },
    orden: ['/', '/en', '/quienes-somos', '/en/about', '/seguridad', '/en/security', '/contacto', '/en/contact', '/empezar', '/en/get-started'],
    es: (r) => ['/', '/en', '/quienes-somos', '/en/about', '/seguridad', '/en/security', '/contacto', '/en/contact', '/empezar', '/en/get-started'].includes(r),
  },
  {
    clave: 'soluciones',
    titulo: { es: 'Soluciones', en: 'Solutions' },
    orden: [
      '/servicios/desarrollo-de-agentes-de-ia', '/servicios/automatizacion-de-procesos-con-ia',
      '/servicios/conocimiento-corporativo', '/servicios/agentes-conversacionales', '/servicios/consultoria-de-ia',
      '/en/services/ai-agent-development', '/en/services/ai-workflow-automation',
      '/en/services/corporate-knowledge', '/en/services/conversational-ai', '/en/services/ai-consulting',
    ],
    es: (r) => /^\/(servicios|en\/services)\//.test(r),
  },
  {
    clave: 'sectores',
    titulo: { es: 'Sectores', en: 'Industries' },
    orden: [
      '/sectores', '/sectores/real-estate-e-inmobiliario', '/sectores/gestorias-y-asesorias',
      '/sectores/industria-y-manufactura', '/sectores/salud-y-grupos-sanitarios', '/sectores/logistica-y-transporte',
      '/sectores/energia-y-utilities', '/sectores/ecommerce-y-retail',
      '/en/industries', '/en/industries/real-estate', '/en/industries/accounting-firms', '/en/industries/manufacturing',
      '/en/industries/healthcare', '/en/industries/logistics', '/en/industries/energy-and-utilities',
      '/en/industries/ecommerce-and-retail',
    ],
    es: (r) => /^\/(sectores|en\/industries)(\/|$)/.test(r),
  },
  {
    clave: 'proyectos',
    titulo: { es: 'Proyectos', en: 'Cases' },
    indice: ['/proyectos', '/en/cases'],
    es: (r) => /^\/(proyectos|en\/cases)(\/|$)/.test(r),
  },
  {
    clave: 'guias',
    titulo: { es: 'Guías', en: 'Guides' },
    indice: ['/guias', '/en/guides'],
    // La herramienta de qué automatizar vive en la raíz, pero en el menú va con las guías.
    es: (r) => /^\/(guias|en\/guides)(\/|$)/.test(r) || ['/que-automatizar', '/en/what-to-automate'].includes(r),
  },
  {
    clave: 'faqs',
    titulo: { es: 'Preguntas frecuentes', en: 'Frequently asked questions' },
    indice: ['/preguntas-frecuentes', '/en/faqs'],
    es: (r) => /^\/(preguntas-frecuentes|en\/faqs)(\/|$)/.test(r),
  },
  {
    clave: 'blog',
    titulo: { es: 'Blog', en: 'Blog' },
    indice: ['/blog', '/en/blog'],
    porFecha: true,
    es: (r) => /^\/(en\/)?blog(\/|$)/.test(r),
  },
];

/** Lee el sitio compilado y reparte cada página en su grupo, ya ordenada. */
function leeSitio(raiz) {
  const paginas = [];
  for (const fichero of recorre(raiz)) {
    const ruta = rutaDe(raiz, fichero);
    if (FUERA.has(ruta)) continue;
    const html = readFileSync(fichero, 'utf8');
    paginas.push({
      ruta,
      html,
      en: esIngles(ruta),
      legal: esLegal(ruta),
      titulo: ((html.match(/<title>([^<]*)<\/title>/) || [])[1] || '').replace(/,\s*Ideasforge$/, ''),
      desc: (html.match(/name="description" content="([^"]*)"/) || [])[1] || '',
      fecha: (html.match(/property="article:published_time" content="([^"]*)"/) || [])[1] || '',
    });
  }

  const ordena = (g, items) => {
    const pos = (r) => {
      if (g.orden) {
        const i = g.orden.indexOf(r);
        return i < 0 ? g.orden.length : i;
      }
      return g.indice?.includes(r) ? -1 : 0;
    };
    return items.sort((a, b) => {
      const d = pos(a.ruta) - pos(b.ruta);
      if (d) return d;
      if (g.porFecha && a.fecha !== b.fecha) return b.fecha.localeCompare(a.fecha);
      return a.ruta.localeCompare(b.ruta);
    });
  };

  const reparto = (en) => {
    const propias = paginas.filter((p) => p.en === en && !p.legal);
    const usadas = new Set();
    const grupos = GRUPOS.map((g) => {
      const items = ordena(g, propias.filter((p) => !usadas.has(p.ruta) && g.es(p.ruta)));
      items.forEach((p) => usadas.add(p.ruta));
      return { titulo: g.titulo[en ? 'en' : 'es'], items };
    });
    // Lo que no encaje en ningún grupo no se pierde: va al final.
    const resto = propias.filter((p) => !usadas.has(p.ruta)).sort((a, b) => a.ruta.localeCompare(b.ruta));
    if (resto.length) grupos.push({ titulo: en ? 'Other pages' : 'Otras páginas', items: resto });
    return grupos.filter((g) => g.items.length);
  };

  return {
    es: reparto(false),
    en: reparto(true),
    legales: paginas.filter((p) => p.legal).sort((a, b) => a.ruta.localeCompare(b.ruta)),
    total: paginas.length,
  };
}

/*
  Los datos básicos de la cabecera. Son los que un modelo toma para contestar
  «qué es Ideasforge». Cada uno está en el banco de hechos como VERIFICADO:
  España y la fórmula del reglamento europeo (31 ago), los cinco sistemas, el
  98 % de Stanton, las más de tres horas de Barceloneta, Wazzy como producto
  propio, los rangos de precio (§3, 20 ago), la cuota sin permanencia y el
  consumo a nombre del cliente (31 ago), y el repositorio a su nombre.
*/
const DATOS = {
  es: [
    '## Datos básicos',
    '',
    '- Qué hacemos: desarrollo de agentes de IA a medida, automatización de procesos con IA, IA sobre la documentación interna de la empresa, agentes conversacionales y chatbots (también en WhatsApp) y consultoría de IA.',
    '- Desde dónde: trabajamos desde España, con empresas sujetas al reglamento europeo, estén donde estén.',
    '- Sistemas en producción: el asistente de planta de una empresa industrial. Savian, consultas a datos de producción en lenguaje natural. Stanton, donde el 98 % de las facturas pasa sin que nadie las toque. Barceloneta Premium, con más de tres horas al día ahorradas filtrando solicitudes de alquiler. Y Wazzy, gestión de citas por WhatsApp, que es producto nuestro y no un cliente.',
    '- Precios publicados: la construcción va de 2.500 a 10.000 € y la operación de 150 a 500 € al mes, sin permanencia. El consumo del modelo y la infraestructura van en cuentas a nombre del cliente. Los sistemas con varios agentes y la consultoría se presupuestan por proyecto.',
    '- Propiedad: el repositorio y la infraestructura están a nombre del cliente desde el primer día.',
    '- Cómo trabajamos: el modelo interpreta y el código decide y ejecuta. Cada cambio pasa una batería de pruebas antes de publicarse y lo que está en producción se revisa cada semana.',
    `- Contacto: ${RAIZ_SITIO}/contacto. Respondemos en un día laborable.`,
    '',
  ],
  en: [
    '## Key facts',
    '',
    '- What we do: custom AI agent development, AI workflow automation, AI over a company’s internal documentation, conversational agents and chatbots (including on WhatsApp) and AI consulting.',
    '- Where from: we work from Spain, with companies bound by European rules, wherever they are based.',
    '- Systems in production: the plant assistant of an industrial company. Savian, natural-language queries on production data. Stanton, where 98% of invoices go through with nobody touching them. Barceloneta Premium, more than three hours a day saved screening rental inquiries. And Wazzy, appointment management on WhatsApp, which is our own product and not a client.',
    '- Published prices: building runs from €2,500 to €10,000 and operation from €150 to €500 a month, with no minimum term. Model usage and infrastructure run in accounts under the client’s name. Multi-agent systems and consulting are quoted per project.',
    '- Ownership: the repository and the infrastructure are under the client’s name from day one.',
    '- How we work: the model interprets and the code decides and executes. Every change passes a test suite before it ships and what runs in production is reviewed every week.',
    `- Contact: ${RAIZ_SITIO}/en/contact. We reply within one business day.`,
    '',
  ],
};

function escribeLlmsTxt(raiz, logger) {
  const sitio = leeSitio(raiz);

  const lineaDe = (p) => `- [${p.titulo}](${RAIZ_SITIO}${p.ruta === '/' ? '' : p.ruta}): ${p.desc}`;
  const bloques = (grupos, sufijo) =>
    grupos.map((g) => [`## ${g.titulo}${sufijo}`, '', ...g.items.map(lineaDe), '', ''].join('\n')).join('');

  const cabecera = [
    '# Ideasforge',
    '',
    '> Ideasforge diseña, construye y mantiene agentes de IA y automatización de',
    '> procesos para empresas, desde España, con cinco sistemas en producción.',
    '> Ideasforge designs, builds and maintains AI agents and process automation',
    '> for companies, from Spain, with five systems in production.',
    '',
    'El sitio existe en español, en la raíz, y en inglés bajo /en. Las cifras que',
    'hablan de nosotros salen de sistemas en producción y están verificadas una a',
    'una. Las que hablan del mundo llevan su fuente nombrada en el propio texto.',
    'The site is in Spanish at the root and in English under /en. Figures about',
    'us come from systems in production and are verified one by one. Figures',
    'about the world name their source in the text itself.',
    '',
    `Texto completo en español: ${RAIZ_SITIO}/llms-full.txt`,
    `Full text in English: ${RAIZ_SITIO}/llms-full-en.txt`,
    '',
    ...DATOS.es,
    ...DATOS.en,
    '',
  ].join('\n');

  const llms =
    cabecera +
    bloques(sitio.es, ' (español)') +
    bloques(sitio.en, ' (English)') +
    // «Optional» es la sección que la convención deja saltarse cuando el
    // contexto va justo. Las legales son exactamente eso.
    ['## Optional', '', ...sitio.legales.map(lineaDe), ''].join('\n');

  writeFileSync(join(raiz, 'llms.txt'), llms, 'utf8');
  logger.info(`llms.txt: ${sitio.total - sitio.legales.length} páginas indexadas y ${sitio.legales.length} legales`);
}

/*
  El texto completo, un fichero por idioma. Sale con el MISMO extractor que
  usa la lectura en frío (`html-a-texto.mjs`), a propósito: lo que se le
  enseña a un modelo es lo que lee una persona. Antes de extraerlo se quita
  el formulario de contacto (`<section id="contacto">`), que es igual en
  todas las páginas.
*/
function escribeLlmsFullTxt(raiz, logger) {
  const sitio = leeSitio(raiz);
  const sinFormulario = (html) => html.replace(/<section id="contacto"[\s\S]*?<\/section>/, ' ');

  const escribe = (grupos, fichero, cabecera) => {
    const piezas = [];
    for (const g of grupos) {
      for (const p of g.items) {
        const texto = htmlATexto(sinFormulario(p.html));
        // Una página que solo era el formulario (contacto) se queda vacía.
        if (texto.replace(/^#.*$/m, '').trim().length < 80) continue;
        piezas.push(`\n---\n\nURL: ${RAIZ_SITIO}${p.ruta === '/' ? '' : p.ruta}\n\n${texto}\n`);
      }
    }
    const salida = cabecera.join('\n') + piezas.join('');
    writeFileSync(join(raiz, fichero), salida, 'utf8');
    const kb = Math.round(Buffer.byteLength(salida, 'utf8') / 1024);
    logger.info(`${fichero}: ${piezas.length} páginas, ${kb} KB`);
  };

  escribe(sitio.es, 'llms-full.txt', [
    '# Ideasforge, texto completo en español',
    '',
    `> El contenido entero del sitio en español, página por página, agrupado como el índice de ${RAIZ_SITIO}/llms.txt.`,
    `> The English version is at ${RAIZ_SITIO}/llms-full-en.txt`,
    '',
    'Las cifras que hablan de nosotros salen de sistemas en producción y están',
    'verificadas una a una. Las que hablan del mundo llevan su fuente nombrada en',
    'el propio texto. Cada bloque empieza por la URL de la que sale, para que se',
    'pueda citar.',
    '',
    ...DATOS.es,
  ]);
  escribe(sitio.en, 'llms-full-en.txt', [
    '# Ideasforge, full text in English',
    '',
    `> The whole site in English, page by page, grouped like the index at ${RAIZ_SITIO}/llms.txt.`,
    `> La versión en español está en ${RAIZ_SITIO}/llms-full.txt`,
    '',
    'Figures about us come from systems in production and are verified one by',
    'one. Figures about the world name their source in the text itself. Each',
    'block starts with the URL it comes from, so it can be cited.',
    '',
    ...DATOS.en,
  ]);
}

export default function portadasSociales() {
  return {
    name: 'portadas-sociales',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const raiz = dir.pathname.replace(/^\/([A-Za-z]:)/, '$1');
        let hechas = 0;

        for (const fichero of recorre(raiz)) {
          const html = readFileSync(fichero, 'utf8');
          const og = (html.match(/property="og:image" content="([^"]*)"/) || [])[1] || '';
          // Solo las que piden portada generada. El resto trae foto propia.
          const m = og.match(/\/og\/(.+)\.png$/);
          if (!m) continue;

          const titulo = ((html.match(/<title>([^<]*)<\/title>/) || [])[1] || '')
            .replace(/,\s*Ideasforge$/, '')
            .replace(/&#39;/g, '’')
            .replace(/&amp;/g, '&')
            .replace(/&quot;/g, '"');
          const ruta =
            fichero.split(sep).join('/').replace(raiz.split(sep).join('/'), '/').replace(/\/index\.html$/, '').replace(/\.html$/, '') ||
            '/';
          const limpia = ruta.replace(/\/+$/, '') || '/';
          const lang = limpia === '/en' || limpia.startsWith('/en/') ? 'en' : 'es';

          const png = await portadaSocial({
            titulo,
            familia: familiaDe(limpia),
            lang,
            pie: 'ideasforge.io' + (limpia === '/' ? '' : limpia),
          });

          const destino = join(raiz, 'og', m[1] + '.png');
          mkdirSync(dirname(destino), { recursive: true });
          writeFileSync(destino, png);
          hechas += 1;
        }

        logger.info(`portadas sociales generadas: ${hechas}`);
        escribeLlmsTxt(raiz, logger);
        escribeLlmsFullTxt(raiz, logger);
      },
    },
  };
}
