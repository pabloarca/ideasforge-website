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
  about:       { es: '/quienes-somos',                 en: '/en/about' },
  privacy:     { es: '/politica-privacidad',           en: '/en/privacy-policy' },
  cookies:     { es: '/politica-cookies',              en: '/en/cookies-policy' },
  enterprise:  { es: '/servicios/conocimiento-corporativo', en: '/en/services/corporate-knowledge' },
  // English-led keyword architecture. Each ES page is the local mirror of the
  // EN page that defines the cluster; the guide pair is intentionally NOT a
  // translation (each targets its language's biggest informational term).
  aiGuide:     { es: '/agentes-de-ia',                 en: '/en/ai-automation' },
  agentDev:    { es: '/servicios/desarrollo-de-agentes-de-ia', en: '/en/ai-agent-development' },
  processAuto: { es: '/servicios/automatizacion-de-procesos-con-ia', en: '/en/ai-workflow-automation' },
  conversational: { es: '/servicios/agentes-conversacionales', en: '/en/conversational-ai' },
  smb:         { es: '/pymes',                         en: '/en/smb' },
  // El espejo español se añadió el 21 ago 2026: las tandas comerciales dieron
  // `cuanto cuesta un agente de ia` con crecimiento interanual infinito, o sea
  // término recién nacido. Antes esta entrada era solo inglesa porque en agosto
  // no había demanda medible de coste en español.
  cost:        { es: '/cuanto-cuesta-un-agente-de-ia',  en: '/en/ai-agent-development-cost' },
  // Pilar de confianza, solo inglés: `gdpr compliant ai` crece un 9.900 % con
  // competencia 0, pero en español el planificador aún no ve nada. Se añade el
  // espejo cuando lo vea.
  compliance:  {                                        en: '/en/gdpr-compliant-ai' },
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
