import { defaultLang, showDefaultLang, languages, type Lang } from './ui';

/** Read the active language from a URL ("/en/blog" -> "en"). */
export function getLangFromUrl(url: URL): Lang {
  const [, maybeLang] = url.pathname.split('/');
  if (maybeLang in languages) return maybeLang as Lang;
  return defaultLang;
}

/** The "other" language (only two for now). */
export function otherLang(lang: Lang): Lang {
  return lang === 'es' ? 'en' : 'es';
}

/**
 * Build a localized URL for a logical path.
 *   localizedPath('/blog', 'es') -> '/blog'
 *   localizedPath('/blog', 'en') -> '/en/blog'
 *   localizedPath('/#contacto', 'en') -> '/en/#contacto'
 */
export function localizedPath(path: string, lang: Lang): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  if (lang === defaultLang && !showDefaultLang) return clean === '/' ? '/' : clean;
  // La raíz de un idioma con prefijo va sin barra final (`/en`, no `/en/`):
  // con `trailingSlash: 'never'` y salida en fichero, `/en/` da 404. Pasaba
  // en el logo de la cabecera, el del pie y el botón de la 404 (19 oct 2026).
  if (clean === '/') return `/${lang}`;
  // Lo mismo con las anclas de la portada: `/en#soluciones`, no `/en/#soluciones`.
  if (clean.startsWith('/#')) return `/${lang}${clean.slice(1)}`;
  return `/${lang}${clean}`;
}

/**
 * Map of static-page routes between languages, keyed by the Spanish path.
 * Add an entry whenever you create a page whose slug differs per language so
 * the language switcher and hreflang tags point at the right counterpart.
 *
 * Values are `Partial<Record<Lang, string>>` so a page can exist in only one
 * language (none do right now). The language switcher falls back to that
 * language's home when no counterpart exists.
 */
export const routeMap: Record<string, Partial<Record<Lang, string>>> = {
  home:        { es: '/',                              en: '/en' },
  blog:        { es: '/blog',                          en: '/en/blog' },
  // Página de contacto (7 oct 2026): destino de los botones «Cuéntanos…».
  contact:     { es: '/contacto',                      en: '/en/contact' },
  start:       { es: '/empezar',                       en: '/en/get-started' },
  /* Vuelve de la nevera el 21 oct 2026, solo en español: el espejo inglés
     llega después del visto bueno, como cualquier redacción. Mientras tanto
     la entrada no lleva `en` para que el hreflang no apunte a una página que
     no existe. Cuando exista `src/pages/en/about.astro`, se añade
     `en: '/en/about'`, y su `href` a «About us» en `resourceLinks` de ui.ts.
     En español ya enlazan la cabecera («Recursos») y el pie («Empresa»). */
  about:       { es: '/quienes-somos' },
  // Acuse de los dos formularios. Va `noindex` y fuera del sitemap, pero la
  // entrada hace falta igual: el par de hreflang y el selector de idioma se
  // construyen desde aquí, y una página sin par manda al visitante a la portada.
  thanks:      { es: '/gracias',                       en: '/en/thank-you' },
  privacy:     { es: '/politica-privacidad',           en: '/en/privacy-policy' },
  cookies:     { es: '/politica-cookies',              en: '/en/cookies-policy' },
  enterprise:  { es: '/servicios/conocimiento-corporativo', en: '/en/services/corporate-knowledge' },
  // English-led keyword architecture. Each ES page is the local mirror of the
  // EN page that defines the cluster; the guide pair is intentionally NOT a
  // translation (each targets its language's biggest informational term).
  // Índices de guías y de sectores (7 oct 2026). El inglés pasó a carpeta el
  // 15 oct 2026 (las direcciones tienen que ser espejo en los dos idiomas):
  // cada página conserva su nombre por palabra clave, salvo `/en/smb`, que
  // pasó a `ai-for-small-business`. Redirecciones en `public/_redirects`.
  guides:      { es: '/guias',                         en: '/en/guides' },
  sectors:     { es: '/sectores',                      en: '/en/industries' },
  // Preguntas frecuentes (8 oct 2026). La portada va aquí. Las páginas de
  // bloque salen de `pages.faqs.blocks` y cuelgan de esta ruta.
  faqs:        { es: '/preguntas-frecuentes', en: '/en/faqs' },
  // Seguridad y privacidad (8 oct 2026). Su espejo inglés, el 19 oct 2026.
  security:    { es: '/seguridad', en: '/en/security' },
  aiGuide:     { es: '/guias/que-es-un-agente-de-ia',                 en: '/en/guides/ai-agents' },
  agentDev:    { es: '/servicios/desarrollo-de-agentes-de-ia', en: '/en/services/ai-agent-development' },
  processAuto: { es: '/servicios/automatizacion-de-procesos-con-ia', en: '/en/services/ai-workflow-automation' },
  conversational: { es: '/servicios/agentes-conversacionales', en: '/en/services/conversational-ai' },
  // Nació solo en español el 7 oct 2026. Su espejo inglés, el 16 oct 2026.
  consulting:  { es: '/servicios/consultoria-de-ia', en: '/en/services/ai-consulting' },
  smb:         { es: '/guias/ia-para-pymes',                        en: '/en/guides/ai-for-small-business' },
  // El espejo español se añadió el 21 ago 2026: las tandas comerciales dieron
  // `cuanto cuesta un agente de ia` con crecimiento interanual infinito, o sea
  // término recién nacido. Antes esta entrada era solo inglesa porque en agosto
  // no había demanda medible de coste en español.
  cost:        { es: '/guias/cuanto-cuesta-un-agente-de-ia',  en: '/en/guides/ai-agent-development-cost' },
  // Pilar de confianza. Nació solo en inglés porque `gdpr compliant ai` crece
  // un 9.900 % con competencia 0 mientras el planificador no veía nada en
  // español. El espejo español se añadió el 27 ago 2026 por decisión del
  // propietario: la página no vive de la búsqueda, vive de la conversación con
  // el comité que tiene que aprobar el proyecto, y ese comité es español.
  compliance:  { es: '/guias/ia-y-rgpd',                      en: '/en/guides/gdpr-compliant-ai' },
  // Satélite del pilar de cumplimiento. Nació solo en inglés y ganó su espejo
  // español el 28 ago 2026: la página española de RGPD enlazaba aquí, así que
  // un lector español acababa en una página en inglés. Era la única fuga de
  // idioma del sitio y la única página sin pareja.
  aiAct:       { es: '/guias/reglamento-europeo-de-ia',       en: '/en/guides/eu-ai-act-compliance' },
  // Familia nueva de rutas (28 ago 2026): los casos. No persiguen término,
  // su trabajo es convertir a quien ya llegó y dar destino a las tarjetas del
  // carrusel, que hasta ahora no enlazaban a ninguna parte. Emparejadas el
  // 1 sep 2026, cuando se escribieron los cinco espejos ingleses: hasta ese día
  // ninguna emitía hreflang y el grupo «Casos» no podía entrar en el menú sin
  // descuadrar las dos cabeceras.
  // Índice de casos (7 oct 2026): lista las fichas del carrusel de la portada.
  cases:       { es: '/proyectos',             en: '/en/cases' },
  caseSavian:  { es: '/proyectos/savian',      en: '/en/cases/savian' },
  caseStanton: { es: '/proyectos/stanton',     en: '/en/cases/stanton' },
  caseBarceloneta: { es: '/proyectos/barceloneta', en: '/en/cases/barceloneta' },
  caseIndustrial: { es: '/proyectos/industrial',   en: '/en/cases/industrial' },
  caseWazzy: { es: '/proyectos/wazzy',         en: '/en/cases/wazzy' },
  realEstate:  { es: '/sectores/real-estate-e-inmobiliario',                 en: '/en/industries/real-estate' },
  accounting:  { es: '/sectores/gestorias-y-asesorias',                     en: '/en/industries/accounting-firms' },
  // Sectores nacidos el 7 oct 2026, con contenido desde el día 8. Su espejo
  // inglés llegó entre el 16 y el 19 oct 2026.
  sectorIndustry:  { es: '/sectores/industria-y-manufactura', en: '/en/industries/manufacturing' },
  sectorHealth:    { es: '/sectores/salud-y-grupos-sanitarios', en: '/en/industries/healthcare' },
  sectorLogistics: { es: '/sectores/logistica-y-transporte', en: '/en/industries/logistics' },
  sectorEnergy:    { es: '/sectores/energia-y-utilities', en: '/en/industries/energy-and-utilities' },
  sectorEcommerce: { es: '/sectores/ecommerce-y-retail', en: '/en/industries/ecommerce-and-retail' },
};

/**
 * The alternate-language URLs that pages pass to BaseLayout. Helper for the
 * static pages above. Returns e.g. { es: '/blog', en: '/en/blog' }.
 */
export function altsFor(routeKey: keyof typeof routeMap): Partial<Record<Lang, string>> {
  return routeMap[routeKey];
}
