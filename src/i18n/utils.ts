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
  const prefixed = `/${lang}${clean}`;
  return prefixed;
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
  start:       { es: '/empezar',                       en: '/en/get-started' },
  /* EN LA NEVERA (31 ago 2026, decisión del propietario). La entrada se
     conserva porque el contenido sigue entero en `pages.about` de ui.ts y
     porque el bloque «El equipo» esperaba datos suyos que nunca llegaron.
     Para revivirla: recrear `src/pages/quienes-somos.astro` y
     `src/pages/en/about.astro` (nueve líneas cada uno, en el historial de
     git) y devolver la línea a `sueltos` de Header y a `menu` de Footer. */
  about:       { es: '/quienes-somos',                 en: '/en/about' },
  privacy:     { es: '/politica-privacidad',           en: '/en/privacy-policy' },
  cookies:     { es: '/politica-cookies',              en: '/en/cookies-policy' },
  enterprise:  { es: '/servicios/conocimiento-corporativo', en: '/en/services/corporate-knowledge' },
  // English-led keyword architecture. Each ES page is the local mirror of the
  // EN page that defines the cluster; the guide pair is intentionally NOT a
  // translation (each targets its language's biggest informational term).
  aiGuide:     { es: '/agentes-de-ia',                 en: '/en/ai-agents' },
  agentDev:    { es: '/servicios/desarrollo-de-agentes-de-ia', en: '/en/services/ai-agent-development' },
  processAuto: { es: '/servicios/automatizacion-de-procesos-con-ia', en: '/en/services/ai-workflow-automation' },
  conversational: { es: '/servicios/agentes-conversacionales', en: '/en/services/conversational-ai' },
  smb:         { es: '/pymes',                         en: '/en/smb' },
  // El espejo español se añadió el 21 ago 2026: las tandas comerciales dieron
  // `cuanto cuesta un agente de ia` con crecimiento interanual infinito, o sea
  // término recién nacido. Antes esta entrada era solo inglesa porque en agosto
  // no había demanda medible de coste en español.
  cost:        { es: '/cuanto-cuesta-un-agente-de-ia',  en: '/en/ai-agent-development-cost' },
  // Pilar de confianza. Nació solo en inglés porque `gdpr compliant ai` crece
  // un 9.900 % con competencia 0 mientras el planificador no veía nada en
  // español. El espejo español se añadió el 27 ago 2026 por decisión del
  // propietario: la página no vive de la búsqueda, vive de la conversación con
  // el comité que tiene que aprobar el proyecto, y ese comité es español.
  compliance:  { es: '/ia-y-rgpd',                      en: '/en/gdpr-compliant-ai' },
  // Satélite del pilar de cumplimiento. Nació solo en inglés y ganó su espejo
  // español el 28 ago 2026: la página española de RGPD enlazaba aquí, así que
  // un lector español acababa en una página en inglés. Era la única fuga de
  // idioma del sitio y la única página sin pareja.
  aiAct:       { es: '/reglamento-europeo-de-ia',       en: '/en/eu-ai-act-compliance' },
  // Familia nueva de rutas (28 ago 2026): los casos. No persiguen término,
  // su trabajo es convertir a quien ya llegó y dar destino a las tarjetas del
  // carrusel, que hasta ahora no enlazaban a ninguna parte. Sin entrada inglesa hasta que
  // se escriba el espejo, así que esta ruta no emite hreflang todavía.
  caseSavian:  { es: '/casos/savian' },
  caseStanton: { es: '/casos/stanton' },
  caseBarceloneta: { es: '/casos/barceloneta' },
  caseIndustrial: { es: '/casos/industrial' },
  caseWazzy: { es: '/casos/wazzy' },
  realEstate:  { es: '/inmobiliarias',                 en: '/en/real-estate' },
  accounting:  { es: '/gestorias',                     en: '/en/accounting-firms' },
};

/**
 * The alternate-language URLs that pages pass to BaseLayout. Helper for the
 * static pages above. Returns e.g. { es: '/blog', en: '/en/blog' }.
 */
export function altsFor(routeKey: keyof typeof routeMap): Partial<Record<Lang, string>> {
  return routeMap[routeKey];
}
