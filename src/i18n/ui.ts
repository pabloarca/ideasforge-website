/* ============================================================================
   i18n configuration + site copy
   ----------------------------------------------------------------------------
   Single source of truth for every visible string in both languages. Edit
   wording here. Type changes propagate to all components via `content[lang]`.
   ========================================================================== */

export const languages = {
  es: 'Español',
  en: 'English',
} as const;

import type { IconName } from '../lib/icons';

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'es';

// false => default language has no prefix (Spanish at "/", English at "/en/").
export const showDefaultLang = false;

/* ---- types ---------------------------------------------------------------- */
export interface CaseStudy {
  client: string;             // short label (shown above title when no logo)
  clientLogo?: string;        // /logos/foo.png, omit to render the client text as label
  image?: string;             // /case-studies/foo.jpg, omit to render lavender placeholder
  title: string;
  body: string;
  metricBig: string;          // big phrase OR short qualitative descriptor ("En planta")
  metricSmall: string;        // small explanatory text underneath
}

export interface ServiceItem {
  title: string;
  description: string;
  proof?: string;             // short chip text, e.g. "Como en Barceloneta Premium"
  href?: string;              // optional path to a dedicated landing
  /** Nombre de la página de destino, en el mismo vocabulario que el
   *  desplegable de la cabecera. La tarjeta vende el resultado y esto dice a
   *  dónde lleva, que es el puente que faltaba entre las dos listas. En dos
   *  casos hace además de aviso: la tarjeta ofrece un servicio y la etiqueta
   *  avisa de que se aterriza en un vertical. */
  pageLabel?: string;
  /** Icono del set «Astilla» que se revela al pasar por encima de la tarjeta.
   *  Tipado contra el set: un nombre inventado rompe la compilación. */
  icon?: IconName;
}

export interface ServiceGroup {
  label: string;              // "Para medianas y grandes empresas"
  items: ServiceItem[];
}

export interface WhyUsItem {
  title: string;
  body: string;
  /** Long-form content shown in the modal when the card is opened. */
  modal: WhyUsModal;
}

/** Short capability chip shown in the modal's right-hand column. */
export interface WhyUsBullet {
  title: string;              // 2-4 words
  body: string;               // one short line
}

/** Hard number pulled out of a real project. */
export interface WhyUsStat {
  value: string;              // "72 % → 91 %"
  label: string;              // what the number means
}

export interface WhyUsModal {
  eyebrow: string;
  title: string;
  subtitle: string;
  bullets: WhyUsBullet[];
  /** Large standalone line that opens the body section. */
  openingLine: string;
  /**
   * Experience-driven body copy. The stats row is rendered after the second
   * paragraph, so keep the first two as the setup and the rest as the payoff.
   * A plain string renders as a lone paragraph; an object adds a subheading
   * above it (rendered as h3), which is what long modals need to stay legible.
   * Bodies support inline HTML: <u> for emphasis, <a class="link-inline"> for links.
   */
  paragraphs: Array<string | { heading: string; body: string }>;
  /** Que diagrama va dentro del modal y tras que parrafo. `flow` es el de la
   *  arquitectura, `gate` el del examen previo a publicar. */
  diagram?: { after: number; kind: 'flow' | 'gate' };
  stats?: WhyUsStat[];
  /** Standalone line that closes the body section. Omit it when the argument
   *  already lands inside a paragraph. */
  closingLine?: string;
  /** Honest note about the limits of what we commit to. */
  notPromised: { heading: string; body: string };
  cta: { label: string; href: string };
}

export interface MethodologyStep {
  title: string;
  body: string;
  /** What the client actually walks away with at the end of this step.
   *  Rendered as the short list under the paragraph in the route. */
  outputs: string[];
}

/**
 * The house diagram, rendered by FlowDiagram.astro on the shared graphics kit.
 * Node positions live in the component; only the words live here. Keep every
 * label to two or three words: the canvas has fixed widths and no room for
 * sentences. Anything longer belongs in `legend`, which sits outside the frame.
 */
export interface FlowDiagramContent {
  title: string;
  nodes: {
    question: string;
    model: string;
    validator: string;
    blocked: string;
    query: string;
    database: string;
  };
  edges: { contract: string; rejects: string; accepts: string };
  /** The point the picture makes, in plain text under the frame. */
  legend: string;
}

/**
 * El segundo diagrama: el examen por el que pasa un cambio antes de salir.
 * Misma forma que FlowDiagramContent, con sus propios nodos. Las etiquetas se
 * mantienen cortas a proposito: el lienzo tiene anchos fijos.
 */
export interface GateDiagramContent {
  title: string;
  nodes: {
    change: string;
    known: string;
    fresh: string;
    gate: string;
    review: string;
    production: string;
  };
  edges: { fails: string; passes: string };
  legend: string;
}

/** One control in a form. `options` turns it into a <select>; the first entry
 *  is the empty prompt and never submits a value. */
export interface FormField {
  label: string;
  options?: string[];
  hint?: string;
}

/** The exploration page: the long form that starts step 1 of the route. */
export interface StartPageContent {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  getHeading: string;
  get: string[];
  notHeading: string;
  not: string[];
  form: {
    name: FormField;
    email: FormField;
    company: FormField;
    website: FormField;
    size: FormField;
    problem: FormField;
    dataHome: FormField;
    dataOut: FormField;
    timeline: FormField;
    submit: string;
    /** Subject line Web3Forms puts on the notification email. */
    subject: string;
  };
}

export interface Faq {
  q: string;
  a: string;
  /** Optional full-width image rendered above the answer text when the FAQ is open. */
  image?: string;
}

export interface SiteContent {
  meta: {
    homeTitle: string;
    homeDescription: string;
    blogTitle: string;
    blogDescription: string;
    enterpriseTitle: string;
    enterpriseDescription: string;
    smbTitle: string;
    smbDescription: string;
    realEstateTitle: string;
    realEstateDescription: string;
    accountingTitle: string;
    accountingDescription: string;
  };
  nav: {
    services: string;
    projects: string;
    about: string;
    blog: string;
    contact: string;
    switchTo: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary?: string;
  };
  trustedBy: { heading: string; subheading?: string };
  caseStudies: {
    eyebrow: string;
    heading: string;
    items: CaseStudy[];
  };
  services: {
    eyebrow: string;
    title: string;
    subtitle: string;
    enterprise: ServiceGroup;
    smb: ServiceGroup;
    cta: string;
  };
  whyUs: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: WhyUsItem[];
  };
  methodology: {
    eyebrow: string;
    title: string;
    subtitle: string;
    /** Small label above each step's deliverables list in the route. */
    outputsLabel: string;
    steps: MethodologyStep[];
    /** Closes the route by sending the reader into step 1 for real. */
    cta: { label: string; href: string };
  };
  integrations: {
    title: string;
    subtitle: string;
    cta: string;
  };
  blog: {
    eyebrow: string;
    /** Encabezado del bloque de entradas relacionadas en las páginas pilar. */
    clusterHeading: string;
    heading: string;
    subtitle: string;
    readMore: string;
    /** Etiqueta de la fecha de actualización visible en los posts. */
    updatedOn: string;
    viewAll: string;
    /** Sin flecha en el texto: la pone el icono compartido. */
    backToBlog: string;
    publishedOn: string;
    /** Posición dentro del carrusel: «Artículo 3 de 8». Se parte en dos para
     *  que el número lo escriba el script sin tocar la traducción. */
    counterLabel: string;
    counterOf: string;
  };
  faq: {
    eyebrow: string;
    heading: string;
    subtitle: string;
    items: Faq[];
  };
  contact: {
    eyebrow: string;
    heading: string;
    subhead: string;
    name: string;
    email: string;
    company: string;
    website: string;
    optional: string;
    message: string;
    messageHint: string;
    privacyPre: string;
    privacyLink: string;
    submit: string;
    /** Pointer to the longer exploration form, split so the link sits inline. */
    startPre: string;
    startLink: string;
    startPost: string;
  };
  /** Standalone page holding the exploration form. */
  start: StartPageContent;
  /** Shared architecture diagram, reused wherever the argument is made. */
  flowDiagram: FlowDiagramContent;
  /** Diagrama del examen previo a publicar, en el modal de observabilidad. */
  gateDiagram: GateDiagramContent;
  footer: {
    tagline: string;
    menu: string;
    legal: string;
    privacy: string;
    cookies: string;
    contactHeading: string;
    rights: string;
    /** Crawlable links to the service/keyword pages. */
    servicesHeading: string;
    servicesLinks: Array<{ label: string; href: string }>;
  };
  /** Content blocks for the dedicated landing pages. */
  pages: {
    enterprise: EnterprisePageContent;
    smb: SmbPageContent;
    realEstate: VerticalPageContent;
    accounting: VerticalPageContent;
    /** Credibility page. Reuses the long-form renderer without the FAQ block. */
    about: LongFormPageContent;
    /** Keyword architecture: guide + three service clusters (EN-led). */
    aiGuide: LongFormPageContent;
    agentDev: LongFormPageContent;
    processAuto: LongFormPageContent;
    conversational: LongFormPageContent;
    /** Cost guide. Existe en los dos idiomas desde el 21 ago 2026. */
    cost?: LongFormPageContent;
    /**
     * Pilar de confianza sobre cumplimiento y soberanía del dato. NO es una
     * página de servicio: no vende una línea nueva, explica cómo están
     * construidas las cuatro que ya hay. Solo inglés hasta que el planificador
     * vea demanda española.
     */
    compliance?: LongFormPageContent;
    /** Satelite del pilar de cumplimiento: posee `eu ai act compliance`. */
    aiAct?: LongFormPageContent;
  };
}

export interface EnterprisePageContent {
  hero: { eyebrow: string; title: string; subtitle: string; cta: string };
  forWhom: { heading: string; body: string };
  problem: { heading: string; body: string };
  whatWeBuild: { heading: string; body: string };
  how: { heading: string; body: string };
  /** `link` opcional: lleva al pilar de cumplimiento sin repetir su contenido. */
  guarantees: { heading: string; body: string; link?: { label: string; href: string } };
  proof: { heading: string; body: string };
  capabilities: {
    heading: string;
    items: Array<{ title: string; body: string }>;
  };
  cta: { heading: string; body: string; button: string };
}

export interface SmbPageContent {
  /** Optional: dropped when the H1 already carries the eyebrow's subject. */
  hero: { eyebrow?: string; title: string; subtitle: string; cta: string };
  packages: {
    heading: string;
    subtitle: string;
    items: Array<{ title: string; description: string; proof?: string }>;
  };
  cta: { heading: string; body: string; button: string };
}

export interface VerticalPageContent {
  /** Optional: dropped when the H1 already carries the eyebrow's subject. */
  hero: { eyebrow?: string; title: string; subtitle: string; cta: string };
  problem: { heading: string; body: string };
  solution: { heading: string; body: string };
  proof: { heading: string; body: string };
  /** Optional second-audience block (e.g. property management on /en/real-estate). */
  extra?: { heading: string; body: string };
  cta: { heading: string; body: string; button: string };
}

/* Long-form SEO pages (keyword architecture). Rendered by LongFormPage.astro. */
/**
 * Cómo se dibuja una sección larga. Las tres hablan el idioma de la home:
 *
 * - `prose`     texto corrido con viñetas de comprobación. El de siempre.
 * - `lattice`   las viñetas pasan a retícula continua de filetes compartidos,
 *               como «Lo que construimos». Para listas de elementos paralelos.
 * - `checklist` las viñetas pasan a ruta vertical numerada que se dibuja al
 *               bajar, como «Cómo trabajamos». Para secuencias y para listas
 *               que el lector va a recorrer una por una.
 *
 * Sirve para romper el muro: una página de dieciocho secciones idénticas no
 * tiene jerarquía, y el lector no distingue un argumento de una lista.
 */
export type LongFormKind = 'prose' | 'lattice' | 'checklist';

export interface LongFormSection {
  heading: string;
  /** Anchor id, so the hero CTA can jump here. */
  id?: string;
  paragraphs: string[];
  /** Optional bullet list rendered after the paragraphs. */
  bullets?: string[];
  /** Optional accent link rendered at the end of the section. */
  link?: { label: string; href: string };
  /** Renders the shared FlowDiagram after this section's paragraphs. */
  diagram?: boolean;
  /** Cómo se dibuja. Por defecto `prose`. */
  kind?: LongFormKind;
  /** Nombre de la parte a la que pertenece. Cuando cambia respecto a la
   *  sección anterior, el renderizador abre una parte nueva con su portada y
   *  la añade al índice. Las páginas cortas no lo usan. */
  part?: string;
}

export interface LongFormPageContent {
  /** Rótulo del índice de partes, si la página está dividida en partes. */
  tocHeading?: string;
  metaTitle: string;
  metaDescription: string;
  /**
   * `ctaHref` overrides the default contact anchor. Informational pages point
   * it at an in-page section so they don't ask for the sale on first contact.
   */
  hero: { eyebrow?: string; title: string; subtitle: string; cta: string; ctaHref?: string };
  sections: LongFormSection[];
  /** Hard numbers, rendered right after the hero. Only real ones: two beat three padded. */
  stats?: WhyUsStat[];
  faqHeading?: string;
  faq?: Faq[];
  cta: { heading: string; body: string; button: string };
}

/* ---- content -------------------------------------------------------------- */
export const content: Record<Lang, SiteContent> = {
  es: {
    meta: {
      homeTitle: 'Agentes de IA en producción para empresas, Ideasforge',
      homeDescription:
        'Diseñamos, construimos y mantenemos agentes de IA y automatización de procesos que llegan a producción y mueven una métrica de negocio. Para medianas y grandes empresas, con paquetes específicos para pymes.',
      blogTitle: 'Blog, Ideasforge',
      blogDescription:
        'Ideas, casos y aprendizajes sobre agentes de IA, automatización y desarrollo de IA generativa en producción.',
      enterpriseTitle: 'Asistente de IA sobre tu documentación interna, Ideasforge',
      enterpriseDescription:
        'Para medianas y grandes empresas: un asistente que responde en lenguaje natural consultando tu documentación interna, tus wikis y tus sistemas.',
      smbTitle: 'IA para pymes, Ideasforge',
      smbDescription:
        'Soluciones de IA paquetizadas por resultado para pymes: atención 24/7, cualificación de solicitudes y automatización documental, con la misma ingeniería que en proyectos grandes.',
      realEstateTitle: 'IA para inmobiliarias y agencias de alquiler, Ideasforge',
      realEstateDescription:
        'IA para inmobiliarias que atiende solicitudes 24/7, cualifica a los interesados y solo escala al equipo los que cumplen criterio. Especialmente útil en picos de demanda de alquiler.',
      accountingTitle: 'IA para gestorías, asesorías y administradores de fincas, Ideasforge',
      accountingDescription:
        'Automatización documental con IA para gestorías y asesorías fiscales: facturas, tickets y formularios escaneados que dejan de pasar a mano.',
    },
    nav: {
      services: 'Servicios',
      projects: 'Proyectos',
      about: 'Quiénes somos',
      blog: 'Blog',
      contact: 'Contacto',
      switchTo: 'Cambiar idioma',
    },
    hero: {
      eyebrow: 'Somos la forja de tus ideas',
      title: 'Deja de buscar en tus sistemas: agentes de IA que responden y actúan.',
      subtitle:
        'En Ideasforge diseñamos y mantenemos agentes de IA a medida para medianas y grandes empresas, sobre tu infraestructura y medidos antes de cada cambio.',
      ctaPrimary: 'Cuéntanos tu reto',
    },
    trustedBy: {
      heading: 'Empresas con las que trabajamos',
      subheading: 'Industria, agricultura, inmobiliaria, salud y servicios profesionales.',
    },
    caseStudies: {
      eyebrow: 'Proyectos',
      heading: 'En producción',
      items: [
        {
          client: 'Empresa industrial',
          image: '/case-studies/industrial.jpg',
          title: 'Diagnóstico guiado para quien está delante de la máquina',
          body: 'El conocimiento de planta vivía en manuales densos y en la cabeza de los más veteranos. Construimos un asistente sobre los sistemas de la propia empresa: los operarios consultan datos de producción y averías y reciben el diagnóstico guiado paso a paso cuando una máquina se para.',
          metricBig: '6 agentes',
          metricSmall:
            'especializados, coordinados por un orquestador que dirige cada consulta.',
        },
        {
          client: 'Savian',
          clientLogo: '/logos/savian.png',
          image: '/case-studies/harvest.jpg',
          title: 'Cualquiera del equipo, preguntando a sus datos',
          body: 'Para saber cuánto se produjo ayer había que pedírselo a analítica y esperar horas. Construimos un asistente en WhatsApp que entiende la pregunta en lenguaje natural y devuelve la cifra consultando la base de datos. El reparto es siempre el mismo: el juicio vive en el código, la interpretación del mundo vive en el modelo y el conocimiento vive en los datos.',
          metricBig: 'De horas a segundos',
          metricSmall:
            'lo que tarda ahora cualquier responsable en tener su cifra.',
        },
        {
          client: 'Stanton',
          clientLogo: '/logos/stanton.png',
          image: '/case-studies/stanton.jpg',
          title: 'Las facturas dejaron de teclearse',
          body: 'Las facturas de luz, gas y agua de sus inquilinos se pasaban a mano, una por una. Ahora el equipo las sube a un chat de Telegram y un agente con Gemini lee cada documento y devuelve los datos en filas listas para revisar. Empezaron por las facturas y siguen ampliando el sistema a otros procesos administrativos.',
          metricBig: '2 agentes',
          metricSmall: 'en producción y el sistema sigue creciendo.',
        },
        {
          client: 'Barceloneta Premium',
          clientLogo: '/logos/bcnpremium.png',
          image: '/case-studies/barceloneta.jpg',
          title: 'El filtro que trabaja mientras la oficina está cerrada',
          body: 'Cada solicitud de alquiler que entraba por WhatsApp costaba entre cinco y diez minutos de comprobación manual y llegaban decenas al día. El agente conversa con el interesado, recoge motivo, presupuesto y documentación y envía al equipo un correo con el resumen y un párrafo explicando por qué encaja o no. El equipo dejó de hacer criba y volvió a concertar visitas.',
          metricBig: '+3 horas',
          metricSmall: 'ahorradas al día respondiendo solicitudes.',
        },
        {
          client: 'Wazzy',
          clientLogo: '/logos/wazzy.png',
          image: '/case-studies/dentist.jpg',
          title: 'Reservar cita sin llamar ni esperar',
          body: 'Wazzy es nuestro producto: diseñamos el negocio, el producto y la arquitectura del asistente. Reserva, cambia y cancela citas por WhatsApp consultando la agenda real y escala al equipo cuando la conversación se complica. Trata datos de salud, así que el cifrado va campo a campo y el borrado respeta los plazos legales de la historia clínica.',
          metricBig: '103 controles',
          metricSmall: 'vigilan el sistema en producción y avisan si algo se rompe.',
        },
      ],
    },
    services: {
      eyebrow: 'Servicios',
      title: 'Lo que construimos',
      subtitle: 'Cuatro capacidades para medianas y grandes empresas. Para pymes, las mismas piezas en paquetes cerrados.',
      enterprise: {
        label: 'Para medianas y grandes empresas',
        items: [
          {
            title: 'Respuestas sobre tu documentación interna',
            icon: 'documentacion',
            description:
              'Un asistente que responde preguntas a partir de tu documentación interna y tus sistemas, sin que tu equipo tenga que buscar.',
            proof: 'Empresa industrial',
            pageLabel: 'Documentación interna',
            href: '/servicios/conocimiento-corporativo',
          },
          {
            title: 'Pregúntale a tus datos',
            icon: 'tus-datos',
            description:
              'Tu equipo consulta los datos operativos en lenguaje natural, sin esperar a analítica.',
            proof: 'Como en Savian',
            pageLabel: 'Desarrollo de agentes de IA',
            href: '/servicios/desarrollo-de-agentes-de-ia',
          },
          {
            title: 'Un agente para el trabajo repetitivo',
            icon: 'automatizacion',
            description:
              'Registra facturas, lanza alertas y deja los datos en tus sistemas sin que nadie teclee. Tu equipo solo revisa lo dudoso.',
            proof: 'Como en Stanton',
            pageLabel: 'Automatización de procesos con IA',
            href: '/servicios/automatizacion-de-procesos-con-ia',
          },
          {
            title: 'Consultoría y arquitectura',
            icon: 'consultoria',
            description:
              'Diseñamos contigo el plan de IA y la arquitectura, sin venderte tecnología que no necesitas.',
            pageLabel: 'Empezar la exploración',
            href: '/empezar',
          },
        ],
      },
      smb: {
        label: 'Para pequeñas y medianas empresas',
        items: [
          {
            title: 'Atención 24/7',
            icon: 'atencion-247',
            description:
              'Un agente que atiende solicitudes en WhatsApp o web, responde lo habitual y cualifica al resto sin saturar al equipo.',
            proof: 'Como en Wazzy',
            pageLabel: 'Agentes conversacionales',
            href: '/servicios/agentes-conversacionales',
          },
          {
            title: 'Cualificación de interesados',
            icon: 'cualificacion',
            description:
              'Filtramos a los interesados antes de que lleguen al equipo de ventas, con tu CRM y tu proceso de ventas.',
            proof: 'Como en Barceloneta Premium',
            pageLabel: 'IA para inmobiliarias',
            href: '/inmobiliarias',
          },
          {
            title: 'Soporte y mantenimiento',
            icon: 'soporte',
            description:
              'No te dejamos un sistema y nos vamos. Lo operamos contigo, lo afinamos y absorbemos los modelos nuevos cuando salen.',
            proof: '103 controles en producción',
            pageLabel: 'IA para pymes',
            href: '/pymes',
          },
        ],
      },
      cta: 'Cuéntanos tu reto',
    },
    whyUs: {
      eyebrow: 'Compromisos',
      title: '¿Por qué Ideasforge?',
      subtitle: 'Tres compromisos que no vienen en una suscripción.',
      items: [
        {
          title: 'Observabilidad por defecto',
          body: 'Cada cambio pasa por un banco de pruebas de regresión antes de publicarse y después seguimos midiendo cada semana. Si algo deja de entender bien una consulta, nos enteramos antes que tú.',
          modal: {
            eyebrow: 'Observabilidad por defecto',
            title: 'Medimos cada cambio antes de que llegue a producción',
            subtitle:
              'Tu proveedor actualiza el modelo que tienes debajo sin cambiarle el nombre, tu documentación no para de crecer y el sistema que ayer respondía bien hoy empieza a responder mal.',
            bullets: [
              { title: 'Pruebas antes de publicar', body: 'Si un cambio empeora la calidad, no llega a tus usuarios.' },
              { title: 'Sabemos por qué respondió eso', body: 'Queda registrado qué consultó y qué descartó.' },
              { title: 'Contamos lo que no supo hacer', body: 'Cada pregunta sin respuesta se anota con su motivo.' },
              { title: 'Vigilamos al proveedor', body: 'Si actualiza el modelo por su cuenta, lo notamos nosotros primero.' },
              { title: 'Avisa cuando va incompleto', body: 'Dice qué ha consultado y qué se ha dejado fuera.' },
            ],
            diagram: { after: 3, kind: 'gate' },
            openingLine:
              'El fallo más caro no hace saltar ninguna alarma, es una respuesta impecable (pero falsa).',
            paragraphs: [
              {
                heading: 'El fallo que no parece un fallo',
                body: 'Un responsable pregunta cuánto se produjo el mes pasado en la finca 4. El asistente contesta una cifra con buena pinta y bien redactada. Esa cifra está mal. En los registros no aparece ningún error. El sistema hizo exactamente lo que creía correcto. <u class="text-fg">Ese es el fallo que nos quita el sueño, porque no se parece a un fallo.</u>',
              },
              {
                heading: 'El suelo se mueve solo',
                body: 'Lo desconcertante es que el nombre del modelo no cambia mientras lo que hay detrás sí. Investigadores de Stanford y Berkeley lo midieron en 2023. Pasaron las mismas preguntas al mismo modelo comercial en marzo y en junio, llamándolo igual desde la misma conexión. En una de las tareas, el acierto cayó del 97,6 % al 2,4 %. Nadie del lado del cliente tocó nada. El proveedor había actualizado el modelo por debajo. Por eso medir no es una manía nuestra, es la única forma de saber que lo que funcionaba en marzo sigue funcionando en junio.',
              },
              {
                heading: 'Por qué podemos guardar la decisión',
                body: 'Contra eso no sirve mirar los registros de error, porque no hay error que mirar. Y aquí es donde nuestra forma de construir cambia las cosas. Si la decisión vive dentro del modelo, no hay nada que guardar, solo un texto que salió. Por eso <u class="text-fg">en nuestros sistemas el modelo no decide</u>. Entiende la pregunta y entrega un contrato en JSON con lo que ha entendido. Es un script quien lo valida, decide y responde. Esa decisión sí se puede guardar entera: qué entendió, qué pidió, qué descartó el validador y por qué. Lo contamos en detalle en <a class="link-inline" href="/blog/no-me-gustan-los-agentes-de-ia">por qué no nos gustan las arquitecturas agénticas</a>.',
              },
              {
                heading: 'Cómo lo hacíamos mal',
                body: 'Al principio revisábamos a mano las decisiones del modelo, una por una, leyendo ejecuciones a posteriori. No escalaba y tampoco servía como referencia, porque <u class="text-fg">un sistema que no es determinista no responde dos veces igual</u>. Revisar casos sueltos no te dice si el conjunto ha mejorado o ha empeorado. El salto fue sacar la decisión del modelo y meterla en código, porque lo determinista sí se puede probar en masa. Hoy cada cambio pasa por una batería de preguntas reales con su respuesta correcta ya anotada. Si hace fallar alguna que antes acertaba, no se publica.',
              },
              {
                heading: 'Lo que ve quien pregunta',
                body: 'Parte de lo que medimos se lo enseñamos al usuario y fue una decisión pensada. En uno de nuestros asistentes cada respuesta empieza diciendo qué periodo ha consultado, porque descubrimos que «el mes pasado» significaba cosas distintas según quién preguntara. Y si alguna fuente de datos no está disponible, el sistema responde con las que sí tiene y dice cuál se ha quedado fuera. Preferimos una respuesta que admite lo que le falta a una cifra incompleta con aspecto de completa.',
              },
            ],
            closingLine: 'Medir no evita que el sistema falle. Evita que falle en silencio.',
            notPromised: {
              heading: 'Lo que no prometemos',
              body: 'No prometemos que el sistema acierte siempre. Prometemos enterarnos antes que tú y dejar escrito por qué falló, para que el mismo error no vuelva a pasar desapercibido.',
            },
            cta: { label: 'Cuéntanos tu reto', href: '/#contacto' },
          },
        },
        {
          title: 'El código es tuyo',
          body: 'Te entregamos el sistema, no una caja negra. Si mañana decides llevártelo a otro proveedor, puedes.',
          modal: {
            eyebrow: 'El código es tuyo',
            title: 'Sin caja negra y sin ataduras',
            subtitle:
              'Los proveedores de IA cambian precios y retiran modelos. Algunas plataformas cierran sin más. El sistema que te entregamos está pensado para que ninguna de esas noticias llegue a ser un problema tuyo.',
            bullets: [
              { title: 'Repositorio a tu nombre', body: 'Desde el primer día, no al final.' },
              { title: 'No compras una suscripción', body: 'Compras un sistema que se queda en tu casa.' },
              { title: 'Traspaso de verdad', body: 'Manual de operación y sesiones con tu gente si lo requieres.' },
            ],
            openingLine:
              'La dependencia de un proveedor rara vez está en el contrato. Está en el día a día.',
            paragraphs: [
              {
                heading: 'Dónde nace de verdad',
                body: 'Empieza cuando las instrucciones que gobiernan el sistema viven en la cabeza de quien las escribió y nadie más puede comprobar si un cambio las empeora. Crece cuando la documentación cuenta lo que se pensaba hacer en lugar de lo que acabó haciéndose. Para cuando quieres cambiar de proveedor, ya nadie te lo impide por contrato, simplemente no queda nadie capaz de explicar cómo funciona aquello.',
              },
              {
                heading: 'Y mientras tanto, el suelo se mueve',
                body: 'Los proveedores retiran modelos con regularidad y lo hacen por escrito. Anthropic publica su <a class="link-inline" href="https://platform.claude.com/docs/en/about-claude/model-deprecations" rel="noopener noreferrer" target="_blank">calendario de retiradas</a> y avisa con sesenta días de antelación. El 15 de junio de 2026 dejaron de funcionar Claude Sonnet 4 y Opus 4, así que desde esa fecha cualquier llamada a esos identificadores falla. No es un accidente ni una mala práctica, es cómo funciona el sector. La pregunta es qué te cuesta a ti cada una de esas retiradas, porque <u class="text-fg">cuando un proveedor retira un modelo, eso no debería afectarte</u>.',
              },
              {
                heading: 'Qué hay dentro del repositorio',
                body: 'Todo lo que define el comportamiento del sistema vive versionado en tu repositorio: las instrucciones del modelo con su historial de cambios, las pruebas con su respuesta correcta anotada, los manuales de operación y un catálogo de incidencias. Ese catálogo es el que más agradecen los equipos técnicos y el que casi nadie pide, porque no cuenta cómo se arregló cada problema, cuenta cómo se reconoce desde fuera, que es lo que sirve la próxima vez que el sistema se comporte raro.',
              },
              {
                heading: 'Cambiar de modelo se prueba, no se promete',
                body: 'Que un modelo se pueda sustituir por otro es fácil de decir. Nosotros lo comprobamos antes de afirmarlo. Cuando valoramos cambiar el modelo de uno de nuestros sistemas por otro más barato, pasamos las dos versiones por el mismo juego de preguntas con su respuesta correcta anotada. El barato perdía diez puntos de acierto y en las preguntas donde había que elegir entre dos opciones parecidas caía del 89 % al 44 %, así que lo descartamos con esos números delante. Esa misma comprobación decide qué modelo entra en cada sitio, por eso nuestros sistemas en producción no corren todos sobre el mismo proveedor.',
              },
              {
                heading: 'Ni producto cerrado ni suscripción',
                body: 'Un producto de catálogo decide por ti dónde viven tus datos, qué se puede integrar y cuándo sube el precio. <u class="text-fg">Lo que te entregamos corre en la nube que te montemos, a tu nombre.</u> La única salida al exterior son las llamadas al modelo, que tú apruebas una a una. Si tu comité decide que ni siquiera eso puede salir del perímetro, esa es una conversación que tenemos encima de la mesa desde el primer día, con lo que se gana y lo que cuesta.',
              },
              {
                heading: 'Para quién escribimos la documentación',
                body: 'La documentación se escribe pensando en una persona concreta y no eres tú. Es quien mantenga esto dentro de dos años, alguien que hoy no está en ninguna reunión y que llegará sin contexto. Si lo que le dejamos escrito no viene acompañado de algo que pueda ejecutar para comprobarlo, no le sirve de nada. Nos aplicamos la misma regla que te aplicamos a ti.',
              },
            ],
            notPromised: {
              heading: 'Lo que no prometemos',
              body: 'No prometemos que nunca vayas a necesitarnos. Prometemos que el día que decidas prescindir de nosotros no tengas que pedirnos nada, porque lo tienes todo en tu casa desde el primer día.',
            },
            cta: { label: 'Cuéntanos tu reto', href: '/#contacto' },
          },
        },
        {
          title: 'Seguridad por defecto',
          body: 'El modelo no escribe las consultas que llegan a tus sistemas, elige entre opciones que ya hemos revisado. Cada persona entra con su cuenta de empresa y tus datos viven donde tú decidas.',
          modal: {
            eyebrow: 'Seguridad por defecto',
            title: 'Seguridad que no depende de que el modelo acierte',
            subtitle:
              'Dónde viven los datos y quién puede tocarlos son decisiones que tomamos al empezar, no al final. Es lo que acaba preguntando tu comité de seguridad y preferimos tener la respuesta antes que la reunión.',
            bullets: [
              { title: 'El modelo no escribe consultas', body: 'Rellena un formulario cerrado y el código ejecuta.' },
              { title: 'Solo habla con lo que apruebes', body: 'Contención por permisos, no por filtros.' },
              { title: 'RGPD', body: 'Borrado real y plazos legales cumplidos.' },
            ],
            diagram: { after: 2, kind: 'flow' },
            openingLine: 'El modelo decide, pero nunca es la autoridad.',
            paragraphs: [
              {
                heading: 'Por qué un filtro no lo arregla',
                body: 'Un modelo de lenguaje recibe por el mismo canal las instrucciones que le damos y el texto que le llega de fuera, sin nada que separe unas de otro. Por eso alguien puede colar en ese texto algo que el modelo lea como una orden nueva y la cumpla sin saber que ha cambiado de bando. La seguridad de toda la vida resuelve esto separando datos de instrucciones. Aquí esa separación no existe, por eso la <a class="link-inline" href="https://owasp.org/www-project-top-10-for-large-language-model-applications/" rel="noopener noreferrer" target="_blank">inyección de instrucciones</a> encabeza por segunda edición consecutiva la lista de riesgos de OWASP para aplicaciones con modelos de lenguaje. En diciembre de 2025 el <a class="link-inline" href="https://www.ncsc.gov.uk/news/mistaking-ai-vulnerability-could-lead-to-large-scale-breaches" rel="noopener noreferrer" target="_blank">centro nacional de ciberseguridad británico</a> fue más lejos y avisó de que probablemente no se arregle nunca como categoría, así que pidió dejar de esperar el parche para concentrarse en reducir el daño.',
              },
              {
                heading: 'El montaje habitual deja la puerta abierta',
                body: 'Lo que hace peligroso a un asistente no es lo que sabe, es lo que puede hacer. En seguridad se habla de <a class="link-inline" href="https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/" rel="noopener noreferrer" target="_blank">tres ingredientes</a> inofensivos por separado y peligrosos juntos: acceso a datos privados, entrada de texto que viene de fuera y una vía libre para actuar sobre los sistemas. Los dos primeros son la razón de que el asistente exista, así que el que hay que cortar es el tercero. El montaje más extendido hoy hace justo lo contrario, porque enchufa el modelo a la base de datos con un conector que le deja escribir él mismo las consultas (los famosos MCP). Desde ese momento puede escribir cualquier consulta que el lenguaje permita. Lo único que se lo impide es una frase en su prompt, del tipo «no consultes la tabla de nóminas». <u class="text-fg">Y esto no es una garantía, es una petición educada.</u>',
              },
              {
                heading: 'El modelo elige, el código ejecuta',
                body: 'Nuestro asistente de datos y la mayoría de los que construimos están montados al revés. El modelo no escribe la consulta. Rellena un formulario cerrado (un contrato JSON) con los campos que hemos definido nosotros y es un programa el que lee ese formulario y construye la consulta que llega a la base de datos. Ese programa solo sabe construir las consultas que le hemos enseñado, así que ninguna otra puede salir de ahí. En el asistente de planta que construimos para una empresa industrial pasa lo mismo con los documentos. El modelo elige una etiqueta de una lista cerrada y el código recupera el texto oficial asociado. <u class="text-fg">Un mensaje malicioso puede, como mucho, equivocarse de opción dentro de una lista que ya hemos revisado.</u>',
              },
              {
                heading: 'Nunca más permisos que la persona',
                body: 'El asistente no tiene una credencial todopoderosa propia. Las consultas a los sistemas internos las lanza el usuario con sus permisos de siempre, los mismos que ya tiene en el resto de aplicaciones de la casa. Y ante la duda bloquea. Si la lista de permisos llega vacía, la respuesta es un no rotundo en lugar de un acceso por defecto.',
              },
              {
                heading: 'Hay límites que no son técnicos',
                body: 'En uno de nuestros asistentes cualquiera con permisos consulta la producción de sus centros, pero el sistema no contesta sobre horas trabajadas de personas concretas, retrasos ni ausencias. Algunas de esas columnas están en la base de datos y sencillamente no se exponen. <u class="text-fg">La restricción vive en el código, no en la esperanza de que el modelo se porte bien.</u> La herramienta sirve para operar centros, no para hacer expedientes a nadie.',
              },
              {
                heading: 'Datos de salud, el listón más alto',
                body: 'En Wazzy tratamos datos de salud, que el reglamento europeo coloca en la categoría más protegida que existe. Sí guardamos datos personales, porque sin ellos no hay servicio. Lo que cambia es cómo. El cifrado va campo a campo y el borrado respeta los cinco años que exige la conservación de la historia clínica, un plazo legal y no una preferencia nuestra. El listón nos lo marcan el reglamento europeo de inteligencia artificial y la ley de protección de datos.',
              },
              {
                heading: 'Un atajo nuestro y cómo lo cerramos',
                body: 'En uno de nuestros sistemas existió una versión de pruebas que se saltaba el inicio de sesión. Se creó para ensayar cambios sin autenticarse cada vez, estaba documentada y estaba marcada para retirar, que es justo el tipo de cosa que sigue ahí dos años después. Lo que hicimos fue meter dentro del circuito autenticado un modo de ensayo que hace lo mismo, de forma que el atajo se quedó sin ninguna razón de ser. Desde entonces cada solución provisional que dejamos escrita lleva su fecha de caducidad.',
              },
            ],
            closingLine:
              'La pregunta no es si alguien va a intentar engañar al modelo. Es qué puede llegar a hacer el modelo cuando lo consigan.',
            notPromised: {
              heading: 'Lo que no prometemos',
              body: 'No prometemos un sistema invulnerable, porque eso no existe. Prometemos aplicar la máxima seguridad posible a las arquitecturas de IA que creamos y siempre tener bien atado todo lo que el modelo de lenguaje pueda hacer y no hacer.',
            },
            cta: { label: 'Cuéntanos tu reto', href: '/#contacto' },
          },
        },
      ],
    },
    methodology: {
      eyebrow: 'Nuestro método',
      title: 'Cómo trabajamos',
      subtitle:
        'Cuatro pasos para llevar la IA de la idea al uso diario.',
      outputsLabel: 'Lo que te llevas',
      cta: { label: 'Empezar por el paso 1', href: '/empezar' },
      steps: [
        {
          title: 'Explorar',
          body: 'Mapeamos contigo dónde está el dolor y dónde la IA aporta. No empezamos con tecnología, empezamos con tu negocio.',
          outputs: [
            'Un mapa de dónde la IA aporta y dónde no',
            'El estado real de los datos que haría falta usar',
            'Las restricciones que hay que respetar desde el principio',
          ],
        },
        {
          title: 'Priorizar',
          body: 'De todos los casos posibles, escogemos los que tienen ROI tangible y son viables hoy. <u>Si algo no compensa, te lo decimos.</u>',
          outputs: [
            'Los casos ordenados por lo que aportan',
            'Lo que descartamos, con el motivo escrito',
            'Un primer caso acotado con el que empezar',
          ],
        },
        {
          title: 'Implementar',
          body: 'Construimos el sistema en producción, no un prototipo. Con las cuentas de tu organización, tus integraciones y tus reglas de seguridad.',
          outputs: [
            'El sistema funcionando sobre tu infraestructura',
            'El repositorio a tu nombre desde el primer día',
            'La batería de pruebas con su respuesta correcta anotada',
          ],
        },
        {
          title: 'Optimizar',
          body: 'Medimos su comportamiento semana a semana. Lo afinamos, ampliamos su alcance y absorbemos los nuevos modelos cuando salen.',
          outputs: [
            'Medición semanal con el resultado a la vista',
            'El catálogo de incidencias, que dice cómo se reconoce cada fallo',
            'Cada cambio pasa por las pruebas antes de llegar a tus usuarios',
          ],
        },
      ],
    },
    integrations: {
      title: 'Conectamos con tus sistemas',
      subtitle:
        'SharePoint, Confluence, Azure, SAP, ERP, CRM y los modelos de OpenAI, Anthropic y Google. Tus sistemas se quedan donde están y la IA pasa por ellos.',
      cta: 'Cuéntanos tu reto',
    },
    blog: {
      eyebrow: 'Blog',
      clusterHeading: 'Lo contamos en detalle',
      heading: 'Blog',
      subtitle: 'Lo que vamos descubriendo construyendo IA en producción con nuestros clientes.',
      readMore: 'Leer más',
      updatedOn: 'Actualizado el',
      viewAll: 'Visitar blog',
      backToBlog: 'Volver al blog',
      publishedOn: 'Publicado el',
      counterLabel: 'Artículo',
      counterOf: 'de',
    },
    faq: {
      eyebrow: 'FAQs',
      heading: 'Preguntas frecuentes',
      subtitle: 'Las dudas que solemos resolver antes de empezar.',
      items: [
        {
          q: '¿Mis datos salen de mi infraestructura?',
          a: 'Solo si tú decides. Desplegamos sobre tu nube o tus propios servidores, con tu identidad corporativa y el sistema guarda lo mínimo para funcionar. La única salida son las llamadas al proveedor del modelo y tú apruebas cuáles se hacen y qué viaja en ellas.',
        },
        {
          q: '¿De quién es el código que construís?',
          a: 'Tuyo. Te entregamos los repositorios, la documentación y la arquitectura desde el día uno. No hay caja negra ni dependencia tecnológica.',
        },
        {
          q: '¿Cómo sabéis que la IA sigue funcionando bien después de entregarla?',
          a: 'Con dos ritmos. Un banco de pruebas de regresión se ejecuta antes de cada cambio y lo bloquea si baja la calidad. Y una vez en marcha, seguimos midiendo cada semana. Si el sistema deja de entender bien una pregunta, lo detectamos antes de que llegue al usuario final.',
        },
        {
          q: '¿Trabajáis solo con grandes empresas?',
          a: 'No. Tenemos paquetes específicos para pymes (atención al cliente, cualificación de solicitudes, automatización documental) con la misma ingeniería que usamos en proyectos grandes.',
        },
      ],
    },
    contact: {
      eyebrow: 'Contacto',
      heading: 'Cuéntanos tu reto.',
      subhead: 'Te respondemos en menos de 24 horas laborables. Sin presentación comercial de cuarenta diapositivas.',
      name: 'Nombre',
      email: 'Correo electrónico',
      company: 'Empresa',
      website: 'Página web',
      optional: 'Opcional',
      message: 'Qué quieres construir o qué problema quieres resolver',
      messageHint: 'Cuéntanoslo como se lo contarías a un compañero. No hace falta que sepas qué tecnología lo resuelve.',
      privacyPre: 'He leído y acepto la ',
      privacyLink: 'Política de privacidad',
      submit: 'Enviar',
      startPre: 'Si ya tienes claro que quieres empezar, ',
      startLink: 'el formulario de exploración',
      startPost: ' recoge lo que necesitamos para ponernos en marcha.',
    },
    flowDiagram: {
      title: 'El modelo interpreta, el código decide',
      nodes: {
        question: 'Pregunta del usuario',
        model: 'Modelo',
        validator: 'Validador',
        blocked: 'Bloqueo',
        query: 'Consulta parametrizada',
        database: 'Base de datos',
      },
      edges: { contract: 'contrato JSON', rejects: 'rechaza', accepts: 'acepta' },
      legend:
        'El modelo nunca llega a tocar tus sistemas. Interpreta la pregunta y entrega un contrato. A partir de ahí decide el código, que sí se comporta igual siempre. Lo peor que puede conseguir un mensaje malicioso es que se elija mal dentro de una lista que ya hemos revisado.',
    },
    gateDiagram: {
      title: 'Qué le pasa a un cambio antes de salir',
      nodes: {
        change: 'Un cambio nuevo',
        known: 'Las preguntas de siempre',
        fresh: 'Las nuevas del cambio',
        gate: '¿Falla alguna?',
        review: 'Vuelve a revisión',
        production: 'Sale a producción',
      },
      edges: { fails: 'falla', passes: 'no falla' },
      legend:
        'Las preguntas de siempre no se retiran cuando entra un cambio, se le suman las nuevas. Por eso una mejora en un sitio no puede estropear otro sin que nos enteremos antes de publicar, que es cuando todavía sale barato.',
    },
    start: {
      metaTitle: 'Empezar la exploración, Ideasforge',
      metaDescription:
        'Cuéntanos qué proceso quieres resolver y te respondemos en menos de 24 horas laborables con una primera lectura de tu caso.',
      eyebrow: 'Paso 1 · Explorar',
      title: 'Empecemos por entender tu caso',
      subtitle:
        'Estas preguntas son las mismas que haríamos en una primera reunión. Contestarlas por escrito nos ahorra esa reunión a los dos y nos deja empezar a trabajar antes.',
      getHeading: 'Qué recibes',
      get: [
        'Un correo de confirmación en cuanto envías, con copia de lo que nos has contado.',
        'Respuesta en menos de 24 horas laborables, escrita por una persona que ha leído tu caso.',
        'Una primera lectura de dónde creemos que la IA aporta en lo que nos cuentas y dónde no.',
      ],
      notHeading: 'Qué no recibes',
      not: [
        'No te vamos a meter en ninguna secuencia de correos automáticos.',
        'No hay intermediarios comerciales, contesta quien va a trabajar en tu caso.',
        'No damos un presupuesto antes de entender el problema.',
      ],
      form: {
        name: { label: 'Nombre' },
        email: { label: 'Correo electrónico' },
        company: { label: 'Empresa' },
        website: { label: 'Página web', hint: 'Opcional' },
        size: {
          label: 'Tamaño de la empresa',
          options: [
            'Selecciona una opción',
            'Menos de 50 personas',
            'Entre 50 y 250',
            'Entre 250 y 1.000',
            'Más de 1.000',
          ],
        },
        problem: {
          label: 'Qué proceso quieres resolver',
          hint: 'Mientras más detalles nos des más podremos entender el caso y darte una propuesta bien aterrizada.',
        },
        dataHome: {
          label: 'Dónde viven hoy los datos de ese proceso',
          options: [
            'Selecciona una opción',
            'En un ERP',
            'En una base de datos propia',
            'En hojas de cálculo',
            'En documentos sueltos',
            'En varios sitios a la vez',
            'Todavía no lo sé',
          ],
        },
        dataOut: {
          label: '¿Esos datos pueden salir de vuestra infraestructura?',
          options: [
            'Selecciona una opción',
            'Sí, sin problema',
            'No, tienen que quedarse dentro',
            'Hay que consultarlo con seguridad',
          ],
        },
        timeline: {
          label: 'Para cuándo lo necesitas',
          options: [
            'Selecciona una opción',
            'Sin fecha, estamos explorando',
            'Este trimestre',
            'Este año',
            'Es urgente',
          ],
        },
        submit: 'Empezar la exploración',
        subject: 'Nueva exploración desde ideasforge.io',
      },
    },
    footer: {
      tagline: 'Desarrollo de IA generativa en producción para empresas. Lo medimos cada semana.',
      menu: 'Menú',
      legal: 'Legal',
      privacy: 'Política de Privacidad',
      cookies: 'Política de Cookies',
      contactHeading: 'Contáctanos',
      rights: 'Ideasforge. Todos los derechos reservados.',
      servicesHeading: 'Servicios',
      servicesLinks: [
        { label: 'Guía: agentes de IA', href: '/agentes-de-ia' },
        { label: 'Desarrollo de agentes de IA', href: '/servicios/desarrollo-de-agentes-de-ia' },
        { label: 'Automatización de procesos con IA', href: '/servicios/automatizacion-de-procesos-con-ia' },
        { label: 'Agentes conversacionales', href: '/servicios/agentes-conversacionales' },
        { label: 'Documentación interna', href: '/servicios/conocimiento-corporativo' },
        { label: 'Qué cuesta un agente de IA', href: '/cuanto-cuesta-un-agente-de-ia' },
        { label: 'IA para pymes', href: '/pymes' },
        { label: 'IA para inmobiliarias', href: '/inmobiliarias' },
        { label: 'IA para gestorías', href: '/gestorias' },
      ],
    },
    pages: {
      enterprise: {
        hero: {
          eyebrow: 'Para grandes empresas',
          title: 'Un asistente de IA sobre tu documentación y tu conocimiento interno',
          subtitle:
            'Un asistente conversacional a medida que entiende preguntas en lenguaje natural y responde consultando tu documentación y tus sistemas internos, y, cuando hace falta, guía paso a paso o ejecuta acciones.',
          cta: 'Cuéntanos tu reto',
        },
        forWhom: {
          heading: 'Para quién',
          body: 'Medianas y grandes empresas con conocimiento y datos repartidos en documentación, wikis y sistemas internos (SharePoint, Azure, Confluence, ERP, sistemas industriales).',
        },
        problem: {
          heading: 'El problema',
          body: 'El conocimiento crítico vive en documentos densos, en sistemas distintos y en la cabeza de las personas con más experiencia. Encontrar una respuesta o diagnosticar un problema cuesta tiempo y depende de pocos.',
        },
        whatWeBuild: {
          heading: 'Qué construimos',
          body: 'Un buscador te devuelve diez documentos, pero no te da la respuesta. Aquí la persona pregunta con sus palabras y recibe la respuesta, con la referencia de dónde sale. Y cuando la consulta necesita un dato vivo de un sistema interno, el asistente va a buscarlo en lugar de citar un documento de hace dos años.',
        },
        how: {
          heading: 'Cómo',
          body: 'Búsqueda de calidad productiva sobre tu documentación, integración con tus sistemas y varios agentes coordinados que dirigen cada consulta al sitio correcto.',
        },
        guarantees: {
          heading: 'Garantías para grandes empresas',
          body: 'En tus servidores o en tu nube, con tu identidad corporativa y tus datos donde tú decidas. Y con la calidad medida de forma continua, no supuesta.',
        },
        proof: {
          heading: 'Prueba en producción',
          body: 'Construimos un asistente de planta para una gran empresa industrial. Operarios y supervisores consultan datos de producción y averías, hacen diagnóstico guiado de problemas en máquinas y resuelven dudas técnicas, todo en lenguaje natural, sobre su propia infraestructura.',
        },
        capabilities: {
          heading: 'Capacidades técnicas',
          items: [
            {
              title: 'Arquitectura multi-agente',
              body: 'Un orquestador entiende la intención de cada consulta y la dirige a agentes especializados. Escala a múltiples casos de uso sin convertirse en un monolito difícil de mantener.',
            },
            {
              title: 'Recuperación fiable de documentos',
              body: 'La búsqueda que alimenta al modelo (RAG) está diseñada para dar respuestas completas y correctas, sin filtrar al usuario final detalles internos que no le corresponden.',
            },
            {
              title: 'Calidad medible',
              body: 'Bancos de pruebas que verifican automáticamente, antes de cada cambio, que el asistente sigue entendiendo y respondiendo bien.',
            },
            {
              title: 'Integración con tus sistemas',
              body: 'ERP, bases de datos, identidad corporativa y sistemas industriales.',
            },
            {
              title: 'Seguridad y soberanía del dato',
              body: 'En tus servidores o en tu propia nube, con las cuentas corporativas de tu organización y tus datos donde tú decidas.',
            },
          ],
        },
        cta: {
          heading: '¿Te interesa para tu empresa?',
          body: 'Cuéntanos tu reto. Si no le vemos retorno, te lo diremos.',
          button: 'Cuéntanos tu reto',
        },
      },
      smb: {
        hero: {
          title: 'La misma ingeniería, empaquetada para tu pyme',
          subtitle:
            'Cada paquete se acota a un resultado concreto y se presupuesta cerrado, con la misma profundidad técnica que usamos en proyectos grandes.',
          cta: 'Cuéntanos tu reto',
        },
        packages: {
          heading: 'Paquetes',
          subtitle: 'Pensados para empezar pronto y crecer cuando esté validado.',
          items: [
            {
              title: 'Atención 24/7',
              description:
                'Un agente que atiende solicitudes en WhatsApp o web, responde lo habitual y cualifica al resto sin saturar al equipo.',
            },
            {
              title: 'Cualificación de interesados',
              description:
                'Filtramos a los interesados antes de que lleguen al equipo de ventas, con tu CRM y tu proceso de ventas.',
              proof: 'Como en Barceloneta Premium',
            },
            {
              title: 'Automatización documental',
              description:
                'Facturas, tickets y formularios escaneados que entran al ERP sin que nadie los pase a mano.',
              proof: 'Como en Stanton',
            },
            {
              title: 'Soporte y observabilidad',
              description:
                'No te dejamos un sistema y nos vamos. Los bancos de pruebas bloquean cada cambio que empeore la calidad y el seguimiento sigue cada semana.',
            },
          ],
        },
        cta: {
          heading: '¿Por dónde empezamos?',
          body: 'Cuéntanos tu reto. Si no le vemos retorno, te lo diremos.',
          button: 'Cuéntanos tu reto',
        },
      },
      realEstate: {
        hero: {
          title: 'Tu inmobiliaria atendiendo 24/7, sin desbordar al equipo',
          subtitle:
            'Un agente de IA que recibe la solicitud, hace las preguntas de calificación y solo escala al equipo humano las solicitudes que cumplen los criterios. Especialmente útil en los picos de demanda de alquiler.',
          cta: 'Cuéntanos tu reto',
        },
        problem: {
          heading: 'El problema',
          body: 'Cada solicitud entrante pasa por un mismo cuello de botella: alguien tiene que leerla, calificarla y decidir si vale la pena programar una visita. Son entre cinco y diez minutos por solicitud, decenas de veces al día. En picos de alquiler se acumulan horas de retraso y los interesados se enfrían.',
        },
        solution: {
          heading: 'La solución',
          body: 'Un agente conversacional que recibe la solicitud, pregunta zona, presupuesto, fechas y requisitos y solo escala al equipo las solicitudes que pasan el filtro. El equipo recibe un resumen por correo con el veredicto de apto o no apto y un párrafo que lo justifica. El interesado recibe respuesta inmediata y el rastro completo queda en el CRM.',
        },
        proof: {
          heading: 'Prueba en producción',
          body: 'Es el sistema que construimos para Barceloneta Premium. Más de tres horas ahorradas al día solo en gestionar solicitudes entrantes y un equipo humano que ya solo concierta visitas en lugar de hacer triaje.',
        },
        extra: {
          heading: 'Del alquiler a la venta y los procesos internos',
          body: 'La señal de que la primera pieza funciona es lo que viene después. La agencia está ampliando el agente a la venta de viviendas y a procesos internos, sobre la misma base que ya filtra el alquiler. Ese es el patrón que recomendamos a cualquier inmobiliaria, empezar por el proceso que más horas se lleva, medirlo y crecer desde ahí.',
        },
        cta: {
          heading: '¿Encaja para tu agencia?',
          body: 'Cuéntanos tu reto. Si no le vemos retorno, te lo diremos.',
          button: 'Cuéntanos tu reto',
        },
      },
      accounting: {
        hero: {
          eyebrow: 'Gestorías',
          title: 'Documentos sin tocar: del PDF al ERP',
          subtitle:
            'Facturas, tickets y formularios escaneados que el equipo ya no tiene que copiar a mano. El OCR los lee, el modelo los estructura y una capa de validación comprueba que los totales cuadran.',
          cta: 'Cuéntanos tu reto',
        },
        problem: {
          heading: 'El problema',
          body: 'Procesar facturas a mano es lento, repetitivo y propenso a errores. Cada PDF pasa por una persona que copia importes, fechas y proveedores a una hoja de cálculo y, después, al ERP. Horas a la semana, con riesgo de equivocarse en un dígito.',
        },
        solution: {
          heading: 'La solución',
          body: 'OCR + modelo de lenguaje para leer e interpretar el documento, capa de validación para comprobar que los totales cuadran y entrada directa al ERP. El equipo solo revisa los casos dudosos.',
        },
        proof: {
          heading: 'Prueba en producción',
          body: 'Es el sistema que construimos para Stanton. Dos agentes de IA en producción y un plan para extender la automatización al resto de sus procesos administrativos.',
        },
        cta: {
          heading: '¿Encaja para tu gestoría?',
          body: 'Cuéntanos tu reto. Si no le vemos retorno, te lo diremos.',
          button: 'Cuéntanos tu reto',
        },
      },
      about: {
        metaTitle: 'Quiénes somos, Ideasforge',
        metaDescription:
          'Un equipo pequeño que construye y mantiene sistemas de IA en producción y que opera su propio producto. Así trabajamos y por qué lo contamos con datos.',
        hero: {
          title: 'Un equipo pequeño que mantiene lo que construye',
          subtitle:
            'No entregamos un sistema y desaparecemos. Operamos software propio en producción, con usuarios reales y esa experiencia es la que aplicamos en cada proyecto de cliente.',
          cta: 'Cuéntanos tu reto',
        },
        sections: [
          {
            heading: 'Construimos nuestro propio producto',
            paragraphs: [
              'Wazzy es nuestro. Diseñamos la idea de negocio, construimos el producto y la arquitectura del asistente y lo operamos hoy en clínicas y negocios de servicios. Gestiona reservas, cambios y cancelaciones sobre la API oficial de WhatsApp y trata datos de salud, la categoría más protegida del RGPD.',
              'Mantener un producto propio cambia cómo trabajas. Cuando eres tú quien recibe el aviso a las tres de la mañana, dejas de escribir código que solo funciona en la demostración. Cada cosa que aprendemos ahí vuelve a los proyectos de cliente.',
            ],
            link: { label: 'Conocer Wazzy', href: 'https://wazzy.io' },
          },
          {
            heading: 'Lo que nos ha enseñado producción',
            paragraphs: [
              'Que el fallo más caro de un sistema con IA no hace saltar ninguna alarma: es una respuesta impecable y falsa. Que un banco de pruebas que replica al sistema en lugar de ejercitarlo acaba midiendo otra cosa. Que una alerta ruidosa puede agotar la cuota de avisos y dejarte ciego justo cuando falla algo de verdad.',
              'Ninguna de esas lecciones sale de un manual. Salen de haberlas sufrido y por eso las contamos con nombre y número en lugar de con adjetivos.',
            ],
            link: { label: 'Cómo trabajamos', href: '/#servicios' },
          },
          {
            heading: 'Cómo nos gusta trabajar',
            paragraphs: [
              'Empezamos por el problema, no por la tecnología. Si un caso no compensa, lo decimos antes de cobrarlo. Entregamos el repositorio a tu nombre desde el primer día, con la documentación escrita para quien mantendrá el sistema dentro de dos años.',
              'Y medimos. Cada cambio pasa por un banco de pruebas antes de publicarse y lo que el sistema no sabe hacer queda anotado con su causa para convertirse en la siguiente mejora.',
            ],
          },
          {
            heading: 'El equipo',
            paragraphs: [
              'PENDIENTE: nombre, cargo y una o dos frases de trayectoria de cada persona, con foto real. Es el bloque que más credibilidad aporta en una consultora pequeña y el único que no podemos escribir por ti.',
            ],
          },
        ],
        cta: {
          heading: '¿Hablamos de tu caso?',
          body: 'Cuéntanos tu reto. Si no le vemos retorno, te lo diremos.',
          button: 'Cuéntanos tu reto',
        },
      },
      aiGuide: {
        tocHeading: 'Qué recorre esta guía',
        metaTitle: 'Qué es un agente de IA y cómo funciona en una empresa, Ideasforge',
        metaDescription:
          'Guía completa de agentes de IA para empresas: qué son, qué es la IA agéntica, cinco casos en producción, lo que puede salir mal y cómo se controla y qué preguntar antes de contratar.',
        hero: {
          eyebrow: 'Guía',
          title: 'Agentes de IA, qué son y para qué sirven en tu empresa',
          subtitle:
            'Un agente de IA es un programa que usa un modelo de lenguaje para entender qué se le pide y actuar sobre tus sistemas. Esta guía lo explica sin folleto, con cinco casos nuestros en producción, lo que puede salir mal y las preguntas que haríamos en tu silla. Actualizada en agosto de 2026.',
          cta: 'Ver los cinco casos en producción',
          ctaHref: '#casos',
        },
        stats: [
          { value: '5', label: 'sistemas nuestros funcionando hoy con usuarios reales' },
          { value: '118', label: 'casos reales en el banco de pruebas de uno de ellos' },
          { value: '~0,05 €', label: 'cuesta la prueba semanal de extremo a extremo sobre un sistema vivo' },
        ],
        sections: [
          {
            heading: 'Qué es un agente de IA',
            id: 'que-es',
            part: 'La respuesta corta',
            paragraphs: [
              'Un agente de IA es un programa que usa un modelo de lenguaje para decidir qué hay que hacer con lo que una persona pide y que puede consultar datos y ejecutar acciones en los sistemas de la empresa para conseguirlo. La diferencia con un generador de texto está en el verbo. Un chat escribe. Un agente hace, reserva la cita, consulta la base de datos, registra la factura, escala el aviso.',
              'La definición encierra un reparto de papeles que conviene entender antes de comprar nada, porque explica dónde están los riesgos y dónde el valor. En nuestros sistemas lo formulamos así, el juicio vive en el código, la interpretación del mundo vive en el modelo y el conocimiento vive en los datos. El modelo entiende la petición. Un programa de toda la vida decide si procede y con qué permisos. Tus datos aportan la verdad sobre la que se trabaja.',
              'Si te quedas con una sola idea de toda la guía, que sea esa. Un agente bien construido no es un modelo suelto con acceso a tus sistemas. Es un sistema clásico y verificable con un modelo dentro, colocado justo donde aporta, en entender a las personas.',
              'Que esto sea posible hoy y no hace cinco años tiene una explicación concreta. Los modelos actuales saben rellenar un formato fijo con fiabilidad suficiente, entregar la petición entendida como datos estructurados en lugar de como un texto que alguien tendría que volver a interpretar. Sobre esa capacidad se apoya todo lo demás, porque un formato fijo se puede validar con código y un texto libre no.',
            ],
          },
          {
            heading: 'La guía en seis frases',
            part: 'La respuesta corta',
            kind: 'lattice',
            paragraphs: [
              'Todo lo que sigue desarrolla estas seis ideas. Si vas con prisa, son la guía entera.',
            ],
            bullets: [
              'Un agente entiende lo que pides y actúa sobre tus sistemas, con tus permisos y bajo tus reglas.',
              'La IA agéntica es la palabra de moda para sistemas donde el modelo decide pasos por su cuenta. Más autonomía es más potencia y también más formas de fallar.',
              'Un chatbot que solo responde preguntas es la versión pequeña. El salto de valor llega cuando el sistema termina la tarea.',
              'Los fallos típicos tienen nombre y control: alucinaciones, fugas entre datos de distintos usuarios y degradación silenciosa con el tiempo.',
              'Lo que separa una demostración de un sistema en producción es la medición, una batería de pruebas antes de cada cambio y vigilancia después.',
              'El precio de uno a medida se mueve entre 2.500 y 10.000 € de construcción más una operación mensual. Hay guía propia de coste al final.',
            ],
          },
          {
            heading: 'Qué es la IA agéntica',
            id: 'ia-agentica',
            part: 'El mapa del concepto',
            paragraphs: [
              'IA agéntica es el nombre que ha tomado la idea de dar autonomía al modelo, que no solo responda sino que planifique, use herramientas, mire el resultado y decida el siguiente paso él mismo. La palabra está en todas partes desde 2025 y merece una traducción honesta, porque describe un abanico y no una sola cosa.',
              'En un extremo del abanico está el flujo orquestado, donde el camino lo marca el código y el modelo interpreta en puntos concretos. En el otro está el agente autónomo, donde el modelo elige qué herramienta usar y cuándo, paso a paso. Anthropic, el laboratorio detrás de los modelos Claude, recomienda en su guía de referencia empezar por flujos orquestados por código y reservar la autonomía para lo que de verdad la necesita. Coincide con lo que vemos en producción. Y no por casualidad, cada paso que decide el modelo es un paso que hay que vigilar, probar y pagar.',
              'La conclusión práctica para quien compra no es evitar la palabra, es preguntar qué hay debajo. Cuánta autonomía tiene el sistema, en qué pasos y qué la contiene. Las respuestas separan la ingeniería del marketing con bastante rapidez.',
            ],
          },
          {
            heading: 'En qué se diferencia de un chatbot',
            part: 'El mapa del concepto',
            paragraphs: [
              'La palabra chatbot llega desde una época en la que el robot seguía un guion, apretabas 1 para citas y 2 para horarios. Cualquier pregunta fuera del guion acababa en un «no le he entendido». Un agente conversacional moderno entiende la petición aunque venga mal escrita, en otro idioma o por la mitad. Esa es la parte que pone el modelo.',
              'La diferencia que importa al negocio no es esa, es la de después. Un chatbot informativo responde y ahí acaba. Un agente termina la tarea, comprueba la agenda real, reserva la cita, actualiza la ficha, registra la factura o escala a una persona cuando toca. Nuestra vara para separarlos cabe en una pregunta, cuando la conversación acaba, ¿ha cambiado algo en tus sistemas o solo se ha hablado?',
              'Hay un tercer nombre en la sopa, la RPA, la automatización robótica de procesos que imita clics y teclas sobre las pantallas de siempre. Funciona muy bien mientras nada cambie y es frágil ante cualquier pantalla nueva. El agente ataca el mismo problema desde otro sitio, entendiendo el contenido en lugar de imitar los clics. Por eso los dos conviven en muchas empresas, cada uno en lo suyo.',
            ],
          },
          {
            heading: 'Agente no siempre significa autónomo',
            part: 'El mapa del concepto',
            paragraphs: [
              'Vender agentes y elegir con frialdad cuánta autonomía darles no es una contradicción, es el oficio. En cada proyecto decidimos qué pasos decide el modelo y qué pasos decide el código. El criterio es aburrido a propósito, coste y fiabilidad. Un encadenado donde la salida de una herramienta alimenta a la siguiente ahorra llamadas al modelo y produce un comportamiento que se puede probar. La autonomía plena se reserva para los tramos donde el camino no se puede conocer de antemano.',
              'Al comprador esta cocina le importa por una razón concreta, el presupuesto de vigilancia. Cada decisión que toma el modelo necesita su prueba, su registro y su métrica. Un sistema que decide poco se vigila barato. Uno que decide todo exige un despliegue de medición que casi nadie presupuesta. Ahí nacen buena parte de los proyectos que mueren a los seis meses.',
              'Contamos nuestra postura entera, con sus números y su parte incómoda, en un artículo aparte que es de lo más leído de esta casa.',
            ],
            link: { label: 'Por qué no nos gustan las arquitecturas agénticas', href: '/blog/no-me-gustan-los-agentes-de-ia' },
          },
          {
            heading: 'Cinco casos en producción',
            id: 'casos',
            part: 'Lo que hace hoy',
            kind: 'checklist',
            paragraphs: [
              'Todo lo anterior en abstracto vale poco, así que aquí están nuestros cinco sistemas funcionando hoy, cada uno con lo que hace y para quién. Son también la prueba de que nada de esta guía es teoría.',
            ],
            bullets: [
              'Un asistente de planta para una gran empresa industrial. Operarios y supervisores consultan producción y averías en lenguaje natural, con diagnóstico guiado de máquinas. Por debajo, un orquestador reparte cada pregunta entre media docena de agentes especializados.',
              'Un agente que responde preguntas de negocio consultando la base de datos, construido para Savian. La espera por una cifra pasó de horas a segundos. Cada número sale de una consulta fresca en lugar de la memoria de la conversación.',
              'Automatización documental para Stanton, un gestor inmobiliario. Las facturas de suministros de los inquilinos entran por un chat, un OCR con modelo las estructura y aterrizan como filas normalizadas. Dos agentes en producción y ampliándose.',
              'Cualificación de solicitudes para Barceloneta Premium, una agencia inmobiliaria. El agente conversa con cada interesado y el equipo recibe un resumen con veredicto y justificación. Más de tres horas al día ahorradas.',
              'Wazzy, nuestro producto propio. Un asistente de citas por WhatsApp para clínicas que reserva, cambia y cancela 24/7, con datos de salud tratados bajo el artículo 9 del RGPD. Nos comemos nuestra propia cocina.',
            ],
          },
          {
            heading: 'Las alucinaciones tienen arquitectura en contra',
            part: 'Lo que puede salir mal',
            paragraphs: [
              'Una alucinación es una respuesta falsa con buena redacción, el primer miedo razonable de cualquier comprador. La respuesta corta es que no se combate pidiéndole al modelo que no se la invente, se combate quitándole la ocasión. Cifras que solo pueden salir de una consulta a la base de datos, textos críticos que el modelo no redacta sino que selecciona de un catálogo aprobado y métricas que delatan al sistema cuando responde de memoria.',
              'En esta casa ese es un tema con artículo propio, mecanismo a mecanismo y con las cicatrices incluidas.',
            ],
            link: { label: 'Detectar y prevenir alucinaciones es arquitectura', href: '/blog/detectar-prevenir-alucinaciones' },
          },
          {
            heading: 'Los datos de cada uno, en su sitio',
            part: 'Lo que puede salir mal',
            paragraphs: [
              'El segundo miedo razonable es que el asistente mezcle lo que no debe, datos de dos clientes, de dos empresas o de dos empleados con permisos distintos. La regla de la casa es que esa separación nunca dependa del buen comportamiento del modelo. El contexto solo contiene lo que puede ver quien pregunta, un código valida cada petición contra una lista cerrada de permisos y la propia consulta lleva un filtro que, ante la duda, devuelve nada en lugar de todo.',
              'La historia completa, con las cuatro capas y el rediseño que eliminó una clase entera de fallos, está contada aparte.',
            ],
            link: { label: 'Cuatro capas entre tu empresa y la de al lado', href: '/blog/cuatro-capas-de-aislamiento' },
          },
          {
            heading: 'Lo difícil no es estrenarlo, es mantenerlo vivo',
            part: 'Lo que puede salir mal',
            paragraphs: [
              'El tercer riesgo es el que casi nadie presupuesta. Gartner estima que más del 40 % de los proyectos de IA agéntica se cancelarán antes de acabar 2027. Lo que mata proyectos no es el estreno, es el mes ocho. El suelo se mueve solo, el proveedor actualiza el modelo sin cambiarle el nombre, tu documentación crece y tus datos cambian de forma.',
              'Investigadores de Stanford y Berkeley lo midieron con el mismo modelo comercial en marzo y en junio de 2023, en una de las tareas el acierto cayó del 97,6 % al 2,4 % sin que nadie del lado del cliente tocara nada. Contra eso solo funciona medir. Una batería de casos reales que frena cualquier cambio que empeore el sistema y una vigilancia semanal de lo que ya está en producción, dos ritmos separados que son la diferencia entre saber que funciona y creer que funciona.',
            ],
            link: { label: 'Empezar es fácil, mantener vivo casi imposible', href: '/blog/mantener-viva-la-ia' },
          },
          {
            heading: 'El modelo interpreta, el código decide',
            part: 'Cómo se construye de verdad',
            paragraphs: [
              'Bajamos un momento a la sala de máquinas, porque aquí es donde se decide casi todo lo anterior. En nuestros sistemas el modelo no ejecuta nada directamente. Entiende la petición y entrega un contrato en un formato fijo con campos que definimos de antemano, qué se pide, sobre qué periodo, con qué filtros. Un programa valida ese contrato, comprueba los permisos de quien pregunta y construye la consulta con valores pasados como parámetros, nunca con texto libre del modelo.',
              'Cuando la respuesta tiene que ser exacta damos un paso más y el modelo ni siquiera redacta el texto final, devuelve una clave y el código recupera el texto canónico aprobado al que apunta. Y la identidad viaja con cada acción, el agente opera con los permisos de la persona, no con los de un robot con acceso a todo. Si alguien no puede abrir un dato a mano, su asistente tampoco.',
              'Nada de esto se ve en una demostración. Es exactamente lo que distingue un sistema que puede pasar una revisión de seguridad de uno que solo puede pasar una reunión.',
            ],
          },
          {
            heading: 'Medido antes de cada cambio, vigilado después',
            part: 'Cómo se construye de verdad',
            paragraphs: [
              'Los modelos no son deterministas, no devuelven exactamente lo mismo dos veces, así que comprobar una respuesta un día no garantiza nada. La disciplina que funciona es estadística y aburrida. Antes de publicar cualquier cambio, una batería de casos reales anotados tiene que pasar, 118 casos en uno de nuestros sistemas y 145 conversaciones en nuestro producto de citas. Si la calidad baja, el cambio no sale.',
              'Después del estreno, la vigilancia no se apaga. Una vez por semana lanzamos una conversación real contra el sistema vivo, de principio a fin, por unos cinco céntimos por ejecución. En el asistente de planta, la calibración del enrutado se midió sobre casos reales y pasó del 72 % al 91 % de acierto. También supimos pararnos, perseguir el cien por cien moldea las pruebas contra el sistema en lugar de mejorarlo.',
              'Estas cifras existen porque los sistemas se construyen para producirlas. Cuando evalúes a cualquier proveedor, nosotros incluidos, pide las suyas.',
            ],
          },
          {
            heading: 'Cómo es el proyecto, de la primera reunión a producción',
            part: 'Para tu empresa',
            paragraphs: [
              'Nuestro método tiene cuatro pasos con nombre y cada uno entrega algo tangible. Explorar, entender el proceso y los datos y decir con franqueza si vemos retorno, porque si no lo vemos, lo decimos y ahí acaba. Priorizar, elegir el primer caso por dolor y por cifra, no por vistosidad. Implementar, construir ese caso acotado y llevarlo a producción con su batería de pruebas puesta. Y optimizar, medir lo que hace con usuarios reales y decidir con datos el siguiente paso.',
              'La forma importa tanto como los pasos. El proyecto no arranca con una plataforma que lo hará todo, arranca con un proceso que duele y una cifra que debería moverse. Todo lo que hemos contado en esta guía, la medición, el aislamiento, los dos ritmos, entra en ese primer caso desde el día uno, porque añadirlo después es la versión cara.',
            ],
          },
          {
            heading: 'Cómo saber si tu empresa necesita uno',
            part: 'Para tu empresa',
            kind: 'checklist',
            paragraphs: [
              'No toda tarea merece un agente. Esta es la criba que aplicamos nosotros antes de aceptar un proyecto, en el mismo orden.',
            ],
            bullets: [
              'Existe una tarea repetitiva con criterio dentro. Si es puro trámite sin decisión, la automatización clásica es más barata. Si cada caso exige entender algo, leer un documento, interpretar una petición, ahí vive el agente.',
              'La información que necesita existe y es alcanzable. Un agente sin acceso a datos limpios responde desde la probabilidad y eso tiene otro nombre. A veces el primer trabajo real es ordenar las fuentes.',
              'Hay una cifra de negocio que debería moverse, horas, solicitudes atendidas, plazos. Si nadie sabe qué número mejoraría, el proyecto no tiene juez y los proyectos sin juez no se pueden defender.',
              'Alguien dentro será su dueño. Un agente en producción necesita una persona que mire las métricas y decida pequeñas cosas cada mes. Sin dueño interno, el mejor sistema se queda huérfano.',
            ],
          },
          {
            heading: 'Los errores que más vemos al empezar',
            part: 'Para tu empresa',
            kind: 'lattice',
            paragraphs: [
              'Casi ningún proyecto muere por la tecnología. Muere por decisiones de las primeras semanas que nadie revisó. Estas son las que más se repiten delante de nosotros.',
            ],
            bullets: [
              'Empezar por el caso vistoso en lugar del doloroso. La demostración espectacular consigue aplausos y el proceso aburrido que quema horas consigue presupuesto renovado.',
              'Comprar la plataforma antes que el caso. Primero un proceso en producción con su cifra, después la conversación sobre plataformas, si es que sigue haciendo falta.',
              'Dejar la medición para el final. La batería de pruebas se construye con el sistema, no después del susto. Retrofitarla cuesta el doble y llega tarde.',
              'No nombrar un dueño interno. Un agente sin dueño se queda huérfano en tres meses, con métricas que nadie mira y pequeñas decisiones que nadie toma.',
              'Esperar datos perfectos para arrancar. Alcanzables basta. Ordenarlos suele ser la primera fase del proyecto y rinde más que cualquier ajuste de instrucciones.',
              'Prometer autonomía total al comité. Vende mejor una tarde y se paga durante años. La autonomía se dosifica por coste y fiabilidad, no por titular.',
            ],
          },
          {
            heading: 'Qué preguntar a cualquier proveedor',
            part: 'Para tu empresa',
            kind: 'lattice',
            paragraphs: [
              'Con lo leído hasta aquí, estas seis preguntas te dejan ver la cocina de cualquier propuesta, la nuestra incluida.',
            ],
            bullets: [
              'En qué infraestructura corre el sistema y a nombre de quién quedan la cuenta y el repositorio.',
              'Qué viaja exactamente en cada llamada al modelo, mostrado para tu caso y no en general.',
              'Qué impide que el asistente enseñe datos a quien no debe y si la respuesta vive en el código o en las instrucciones del modelo.',
              'Qué hace el sistema cuando no sabe la respuesta y qué rastro deja ese «no».',
              'Qué batería de pruebas frena un cambio malo y qué se vigila cada semana en producción.',
              'Qué cifra de negocio movió su último proyecto, con número y no con adjetivos.',
            ],
          },
          {
            heading: 'El vocabulario, en diez líneas',
            part: 'Para tu empresa',
            kind: 'lattice',
            paragraphs: [
              'Los términos que van a aparecer en cualquier propuesta que recibas, definidos sin humo.',
            ],
            bullets: [
              'Modelo de lenguaje (LLM). El motor que entiende y produce texto. No sabe nada de tu empresa por sí mismo.',
              'Contexto. Lo que el modelo puede leer mientras responde. Es la frontera real de lo que puede saber y de lo que puede filtrar.',
              'RAG. Búsqueda que recupera fragmentos de tu documentación y se los da al modelo como contexto para que responda desde ahí.',
              'Orquestador. La pieza que reparte cada petición al agente o herramienta adecuados. En nuestro asistente de planta reparte entre media docena.',
              'Herramienta. Cada acción concreta que un agente puede ejecutar, consultar una base de datos, reservar una cita, enviar un correo.',
              'Contrato estructurado. El formato fijo con el que el modelo entrega lo que entendió, para que un código lo valide antes de actuar.',
              'Batería de regresión. Casos reales anotados que todo cambio debe pasar antes de publicarse. La nuestra más veterana tiene 118.',
              'Telemetría. Las mediciones que el sistema emite sobre su propia salud. Bien diseñada, con lista blanca, no puede contener datos personales.',
              'Alucinación. Respuesta falsa con apariencia impecable. Se combate con arquitectura, no con ruegos al modelo.',
              'Token de identidad. La credencial que viaja con cada acción para que el agente opere con los permisos de la persona, no con los de un robot.',
            ],
          },
          {
            heading: 'Cuánto cuesta, en corto',
            part: 'Para tu empresa',
            paragraphs: [
              'Un agente a medida de un solo trabajo arranca en torno a los 2.500 € de construcción, los que tocan varios sistemas se acercan a los 10.000 € y la operación mensual se mueve entre 150 y 500 €. Los sistemas multiagente grandes se presupuestan por proyecto. Qué mueve cada cifra, a dónde va la cuota mensual y qué es tuyo al final tiene su propia guía, con los números de verdad.',
            ],
            link: { label: 'Cuánto cuesta un agente de IA, la guía completa', href: '/cuanto-cuesta-un-agente-de-ia' },
          },
        ],
        faqHeading: 'Preguntas frecuentes sobre agentes de IA',
        faq: [
          {
            q: '¿Un agente de IA sustituye a las personas del equipo?',
            a: 'En nuestros proyectos sustituye tareas, no puestos. El agente absorbe el volumen repetitivo, el triaje, la primera respuesta, el tecleo de datos. Las personas se quedan la parte con criterio. En la agencia inmobiliaria del caso, el equipo dejó de filtrar solicitudes y pasó a concertar visitas, que es el trabajo que produce ingresos.',
          },
          {
            q: '¿Qué es la IA agéntica y en qué se diferencia de la IA generativa?',
            a: 'La IA generativa produce contenido, texto, imágenes, código. La IA agéntica usa esos mismos modelos para actuar, decidir pasos, consultar herramientas y completar tareas. La generativa escribe el correo. La agéntica lo escribe, comprueba la agenda y agenda la reunión. Más capacidad y también más necesidad de control, por eso el resto de esta guía habla tanto de medir.',
          },
          {
            q: '¿Un agente y la RPA son lo mismo?',
            a: 'No. La RPA imita clics y teclas sobre pantallas y funciona bien en procesos idénticos que nunca cambian. Un agente entiende contenido, un documento distinto cada vez, una petición escrita de cualquier manera y decide con reglas. Conviven a menudo, la RPA mueve lo mecánico y el agente lo que exige interpretar.',
          },
          {
            q: '¿Qué pasa cuando el agente no sabe responder?',
            a: 'Un buen agente dice que no lo sabe y deja rastro. Esa respuesta tiene más ingeniería detrás de lo que parece. Distinguimos el «no» porque el producto no llega hasta ahí del «no» porque falta documentación, cada uno con su cola de trabajo. Y los casos urgentes o delicados se escalan a una persona, con el historial de la conversación puesto.',
          },
          {
            q: '¿Necesito tener los datos perfectos antes de empezar?',
            a: 'Perfectos no, alcanzables sí. Se rinde más ordenando datos y herramientas que puliendo instrucciones. A veces la primera fase del proyecto es exactamente esa. Lo que no funciona es esperar que el modelo compense datos que nadie puede leer, porque rellenará los huecos con probabilidad.',
          },
          {
            q: '¿Cuánto se tarda en poner uno en producción?',
            a: 'Depende del alcance. Desconfía de quien te dé un plazo sin haber visto tus sistemas. Lo que sí es constante es la forma, un primer proceso acotado que entra en producción y se mide, con crecimiento desde ahí. Los proyectos que empiezan por la plataforma total y dejan la medición para el final engordan la estadística de cancelaciones.',
          },
          {
            q: '¿Los datos de mi empresa se usan para entrenar modelos?',
            a: 'Con los proveedores y la configuración que desplegamos, no. Las llamadas al modelo van bajo acuerdos y ajustes que excluyen el entrenamiento con tu contenido. La elección del proveedor la apruebas tú. Nuestros sistemas corren además en una cuenta de nube a tu nombre, así que los datos no viven en infraestructura nuestra.',
          },
          {
            q: '¿Qué pasa si el proveedor cambia el modelo por debajo?',
            a: 'Pasa, además sin avisar. Está medido que un mismo modelo comercial puede rendir muy distinto con meses de diferencia sin cambiar de nombre. Por eso cada sistema nuestro lleva su batería de pruebas y su vigilancia semanal, que detectan el cambio antes que tus usuarios. Cambiar de modelo tampoco es siempre un ajuste de configuración, a veces obliga a tocar el sistema. Prometer lo contrario sería vender humo.',
          },
          {
            q: '¿Funciona en mi sector?',
            a: 'Los cinco casos de esta guía cubren industria, agricultura, inmobiliaria, salud y servicios, que ya es variedad. La pregunta útil no es el sector, es si existe la tarea repetitiva con criterio, los datos alcanzables y la cifra que mover de la criba de arriba. Si las tres cosas están, el sector pone el vocabulario y poco más.',
          },
        ],
        cta: {
          heading: '¿Tiene sentido un agente en tu empresa?',
          body: 'Cuéntanos tu reto y te respondemos en menos de 24 horas laborables. Si no le vemos retorno, te lo diremos.',
          button: 'Cuéntanos tu reto',
        },
      },
      agentDev: {
        metaTitle: 'Desarrollo de agentes de IA a medida para empresas, Ideasforge',
        metaDescription:
          'Diseñamos, construimos y mantenemos agentes de IA para empresas: a medida, sobre tu infraestructura, con tus permisos y medidos antes de cada cambio.',
        hero: {
          eyebrow: 'Desarrollo de agentes de IA',
          title: 'Agentes de IA para empresas que llegan a producción',
          subtitle:
            'Diseñamos, construimos y mantenemos agentes de IA a medida para medianas y grandes empresas. Sobre tu infraestructura, con tu identidad corporativa y medidos antes de cada cambio.',
          cta: 'Cuéntanos tu reto',
        },
        stats: [
          { value: '118', label: 'casos reales en el banco de pruebas' },
          { value: '72 % → 91 %', label: 'de acierto tras calibrar el enrutado' },
          { value: '10 puntos', label: 'que perdía el modelo más barato: descartado' },
        ],
        sections: [
          {
            heading: 'Qué construimos',
            paragraphs: [
              'Agentes de IA a medida que hacen trabajo real: responden preguntas sobre tu documentación y tus bases de datos, guían diagnósticos, cualifican solicitudes y ejecutan acciones sobre los sistemas que apruebes. Cada agente se construye para una tarea y se conecta a las herramientas que esa tarea necesita.',
              'Cuando un agente no basta, construimos la arquitectura que coordina varios: un orquestador entiende cada consulta y la dirige al especialista. Uno de nuestros sistemas en producción funciona así, con media docena de agentes especializados detrás.',
            ],
            link: { label: 'Si estás situando el concepto, empieza por la guía de agentes de IA', href: '/agentes-de-ia' },
          },
          {
            heading: 'Cómo se gana un agente su puesto en producción',
            paragraphs: [
              'Una demostración se hace en días. Producción exige disciplina. Cada agente sale con una batería de pruebas que se ejecuta antes de cada cambio. Si la calidad baja, el cambio no se publica. En uno de nuestros agentes calibramos el enrutado del 72 % al 91 % de acierto sobre 118 casos reales antes de confiarle más alcance.',
              'Cada respuesta queda registrada con su contexto: qué consultó el agente, qué decidió y cuánto costó. Cuando llega una queja, reconstruimos exactamente qué pasó.',
            ],
          },
          {
            heading: 'La seguridad es el punto de partida',
          diagram: true,
            paragraphs: [
              'El modelo decide, pero nunca es la autoridad: elige dentro de un conjunto cerrado de acciones que el código revisa antes de ejecutar nada. Los agentes actúan con los permisos de la persona que los usa, a través de tu identidad corporativa. Si tu organización le retira el acceso a alguien, el agente también lo pierde.',
            ],
          },
          {
            heading: 'Prueba en producción',
            paragraphs: [
              'En Savian construimos un agente que entiende una pregunta de negocio, la traduce a una consulta segura contra la base de datos y devuelve la cifra, con gráfica cuando ayuda. Quien antes abría una petición a analítica y esperaba, ahora pregunta y sigue trabajando.',
            ],
            link: { label: 'Asistente sobre tu documentación interna', href: '/servicios/conocimiento-corporativo' },
          },
          {
            heading: 'Una empresa de desarrollo que entrega las llaves',
            paragraphs: [
              'El repositorio está a tu nombre desde el primer día: código, documentación, manuales de operación, instrucciones del modelo y juegos de pruebas. Cambiar de proveedor de modelo es un cambio de configuración y una pasada de pruebas. El día que decidas prescindir de nosotros, ya lo tienes todo.',
            ],
          },
        ],
        faqHeading: 'Preguntas frecuentes',
        faq: [
          {
            q: '¿Qué significa «para empresas» en la práctica?',
            a: 'Tu infraestructura o tu nube, tu identidad corporativa, tus datos donde tú decidas y la calidad medida de forma continua. Las garantías por las que va a preguntar tu comité de seguridad, respondidas antes de la reunión.',
          },
          {
            q: '¿El agente puede conectarse a nuestros sistemas internos?',
            a: 'Esa es la gracia. ERP, bases de datos, sistemas industriales, documentación. El agente solo habla con los sistemas que apruebes, con los permisos de cada usuario.',
          },
          {
            q: '¿Quién mantiene el agente después?',
            a: 'Lo que decidas. Podemos encargarnos del mantenimiento medido o formar a tu equipo y entregar el manual de operación para que lo lleve. La documentación se escribe para ese segundo caso, aunque elijas el primero.',
          },
          {
            q: '¿Qué pasa si el proveedor del modelo sube el precio o lo retira?',
            a: 'El modelo va detrás de una capa de abstracción, así que cambiarlo es configuración y una pasada del banco de pruebas. Lo hemos hecho: descartamos un modelo más barato porque las pruebas mostraron que perdía diez puntos de acierto.',
          },
        ],
        cta: {
          heading: '¿Te interesa para tu empresa?',
          body: 'Cuéntanos tu reto. Si no le vemos retorno, te lo diremos.',
          button: 'Cuéntanos tu reto',
        },
      },
      processAuto: {
        metaTitle: 'Automatización de procesos con IA, Ideasforge',
        metaDescription:
          'Automatización de procesos empresariales con IA: documentos, solicitudes y consultas de datos resueltos de principio a fin, sobre tus sistemas y con validación por código.',
        hero: {
          eyebrow: 'Automatización de procesos con IA',
          title: 'Los procesos que nunca pudiste automatizar',
          subtitle:
            'Automatización de procesos empresariales con IA: los flujos de trabajo con documentos, conversaciones o criterio por el medio, resueltos de principio a fin sobre tus sistemas.',
          cta: 'Cuéntanos tu reto',
        },
        stats: [
          { value: '+3 horas', label: 'al día que dejó de dedicar un equipo a filtrar solicitudes' },
          { value: '2 agentes', label: 'en producción registrando facturas sin intervención' },
        ],
        sections: [
          {
            heading: 'Qué procesos se abren con la IA',
            paragraphs: [
              'Los procesos que las herramientas clásicas no pudieron automatizar comparten un rasgo: en algún punto, una persona tiene que leer y decidir. Llega una factura y alguien la teclea. Llega una solicitud y alguien la cualifica. Llega una pregunta y alguien busca la respuesta. Los modelos de lenguaje absorben exactamente ese paso.',
            ],
            bullets: [
              'Entrada de documentos: facturas, tickets y formularios escaneados que se leen, se validan y se registran en tu ERP.',
              'Gestión de solicitudes: consultas entrantes atendidas, cualificadas y dirigidas las 24 horas.',
              'Acceso a datos: preguntas de negocio convertidas en consultas seguras a la base de datos, respondidas en segundos.',
              'Escalado: los casos que necesitan criterio llegan a tu equipo con todo el contexto.',
            ],
          },
          {
            heading: 'De principio a fin, con validación en el medio',
            paragraphs: [
              'La automatización con IA falla cuando se deja al modelo sin vigilancia. En nuestros sistemas el modelo interpreta y una capa de validación comprueba el resultado antes de que toque tu ERP: totales que cuadran, campos que encajan, permisos que se cumplen. El equipo revisa los casos dudosos y el resto fluye.',
            ],
          },
          {
            heading: 'Prueba en producción',
            paragraphs: [
              'En una gestora inmobiliaria, las facturas de suministros que se tecleaban a mano hoy entran solas: dos agentes de IA en producción y un plan para extender la automatización a más áreas. En una agencia inmobiliaria, el flujo de cualificación de solicitudes ahorra al equipo más de tres horas al día.',
            ],
            link: { label: 'Ver los proyectos', href: '/#proyectos' },
          },
          {
            heading: 'Medida como el software que es',
            paragraphs: [
              'Cada cambio pasa por una batería de pruebas antes de publicarse y cada ejecución deja registro. Si falta algún dato, el sistema responde con lo que tiene y dice qué se ha quedado fuera, en lugar de devolver una cifra incompleta que parece completa.',
            ],
          },
          {
            heading: 'Tus sistemas se quedan donde están',
            paragraphs: [
              'La automatización se conecta a lo que ya usas: ERP, CRM, bases de datos, correo, mensajería. Y el repositorio queda a tu nombre desde el primer día, con su documentación y sus manuales de operación.',
            ],
            link: { label: 'Automatización documental para gestorías', href: '/gestorias' },
          },
        ],
        faqHeading: 'Preguntas frecuentes',
        faq: [
          {
            q: '¿Qué es la automatización de procesos con IA?',
            a: 'Automatización donde un modelo de lenguaje resuelve los pasos que exigen leer o interpretar, dentro de un flujo validado por código. El modelo interpreta. El código comprueba y ejecuta.',
          },
          {
            q: '¿En qué se diferencia de la automatización clásica?',
            a: 'La automatización clásica repite reglas fijas y se rompe cuando la entrada varía. La IA absorbe la variación: una factura con otro formato o una solicitud redactada de otra manera siguen fluyendo.',
          },
          {
            q: '¿Y si la IA lee mal un documento?',
            a: 'Una capa de validación comprueba el resultado antes de registrarlo: totales, formatos, campos obligatorios. Los casos dudosos van a una persona, así que la revisión se concentra donde hace falta criterio.',
          },
          {
            q: '¿Cuánto del proceso queda automatizado de verdad?',
            a: 'Depende de cuántos casos raros tenga. Lo honesto es medirlo: el sistema registra qué resuelve solo y qué escala a una persona y ese porcentaje se ve desde el primer mes.',
          },
        ],
        cta: {
          heading: '¿Qué proceso te está costando horas?',
          body: 'Cuéntanos tu reto. Si no le vemos retorno, te lo diremos.',
          button: 'Cuéntanos tu reto',
        },
      },
      conversational: {
        metaTitle: 'Chatbot con IA y agentes conversacionales, Ideasforge',
        metaDescription:
          'Desarrollo de chatbots para empresas y agentes conversacionales que atienden, cualifican y actúan: citas reservadas, solicitudes filtradas y dudas resueltas sobre tus sistemas. Un servicio de chatbot con ingeniería de producción.',
        hero: {
          eyebrow: 'Agentes conversacionales',
          title: 'Chatbots con IA que terminan la tarea',
          subtitle:
            'Agentes conversacionales que atienden, cualifican y actúan: citas reservadas, solicitudes filtradas y dudas resueltas sobre los sistemas que ya usas.',
          cta: 'Cuéntanos tu reto',
        },
        stats: [
          { value: '+3 horas', label: 'al día ahorradas en atender solicitudes entrantes' },
          { value: 'Art. 9 RGPD', label: 'datos de salud, la categoría más protegida, en producción' },
        ],
        sections: [
          {
            heading: 'Qué construimos',
            paragraphs: [
              'Chatbots con inteligencia artificial para los canales donde ya están tus clientes: WhatsApp, web y herramientas internas. El agente entiende lenguaje natural, consulta tus sistemas reales (agenda, CRM, base de datos) y termina la tarea dentro de la conversación.',
              'La misma ingeniería sirve hacia dentro: empleados que preguntan a sus datos o a la documentación de la empresa y obtienen la respuesta en segundos.',
            ],
            link: { label: 'Asistente sobre tu documentación interna', href: '/servicios/conocimiento-corporativo' },
          },
          {
            heading: 'Atención al cliente con IA',
            paragraphs: [
              'La atención al cliente es donde un agente conversacional se paga antes. Responde lo habitual, cualifica el resto y escala con todo el contexto, así que las colas de espera se convierten en respuesta inmediata. Nuestra clienta inmobiliaria ahorra más de tres horas al día en solicitudes entrantes. El equipo ya solo concierta visitas.',
              'El escalado forma parte del diseño: cuando la conversación necesita una persona, llega a una persona, con el historial completo.',
            ],
            link: { label: 'El caso de la inmobiliaria', href: '/inmobiliarias' },
          },
          {
            heading: 'Wazzy: nuestro producto conversacional',
            paragraphs: [
              'Operamos nuestro propio producto en producción: Wazzy, un asistente en WhatsApp que gestiona reservas, cambios y cancelaciones de citas para clínicas y negocios de servicios. Consulta la disponibilidad en tiempo real, actualiza agenda y ficha y escala las urgencias al equipo. Mantener un producto propio nos obliga a ser buenos: cada lección vuelve a los proyectos de cliente.',
            ],
            link: { label: 'Conocer Wazzy', href: 'https://wazzy.io' },
          },
          {
            heading: 'Un chatbot al que confiarle datos de salud',
            paragraphs: [
              'Wazzy trata datos de salud, la categoría más protegida del RGPD: cifrado campo a campo, borrado que respeta los plazos legales de la historia clínica y registros internos que no pueden recibir datos personales. Si tu sector tiene requisitos de cumplimiento, la disciplina ya está montada.',
            ],
          },
          {
            heading: 'Medido, no supuesto',
            paragraphs: [
              'Los sistemas conversacionales se degradan en silencio: una actualización del modelo o un documento nuevo cambian respuestas sin ningún error visible. Cada cambio pasa por una batería de pruebas antes de publicarse y cada conversación deja un registro que se puede reconstruir.',
            ],
          },
        ],
        faqHeading: 'Preguntas frecuentes',
        faq: [
          {
            q: '¿Qué diferencia hay entre un chatbot y un agente conversacional?',
            a: 'Un chatbot clásico sigue un guion con botones y se rompe al salirse de él. Un agente conversacional entiende texto libre y decide entre las acciones disponibles, así que la misma pregunta formulada de veinte maneras llega al mismo sitio.',
          },
          {
            q: '¿En qué canales funciona?',
            a: 'WhatsApp con la API oficial, web y herramientas internas. Donde ya estén tus clientes o tu equipo.',
          },
          {
            q: '¿Puede reservar, cambiar o cancelar citas él solo?',
            a: 'Sí. Nuestro producto Wazzy hace exactamente eso en producción: disponibilidad en tiempo real, confirmación inmediata y agenda actualizada.',
          },
          {
            q: '¿Cumple el RGPD?',
            a: 'Sí y en el caso de Wazzy con datos de salud, la categoría más exigente: cifrado, plazos de conservación y borrado a petición.',
          },
        ],
        cta: {
          heading: '¿Un agente conversacional para tu negocio?',
          body: 'Cuéntanos tu reto. Si no le vemos retorno, te lo diremos.',
          button: 'Cuéntanos tu reto',
        },
      },
      cost: {
        metaTitle: 'Cuánto cuesta un agente de IA, Ideasforge',
        metaDescription:
          'Un agente de IA a medida cuesta entre 2.500 y 10.000 € de construcción, más 150 a 500 € al mes de operación. Desglosamos qué mueve el precio, a dónde va la cuota mensual y qué es tuyo al final.',
        hero: {
          eyebrow: 'Guía de precios',
          title: '¿Cuánto cuesta un agente de IA?',
          subtitle:
            'Un agente de IA a medida construido por Ideasforge cuesta entre 2.500 y 10.000 € de construcción, más 150 a 500 € al mes para mantenerlo funcionando y medido. Esta página explica qué mueve esa cifra, con datos de coste reales de nuestros sistemas en producción.',
          cta: 'Ver qué mueve el precio',
          ctaHref: '#factores',
        },
        stats: [
          { value: '5', label: 'sistemas en producción detrás de estas cifras' },
          { value: '145', label: 'conversaciones anotadas frenan cada cambio de nuestro asistente de citas' },
          { value: '~0,05 €', label: 'cuesta la prueba semanal de extremo a extremo sobre un sistema vivo' },
        ],
        sections: [
          {
            heading: 'La respuesta corta',
            id: 'respuesta',
            paragraphs: [
              'Un agente de un solo trabajo se queda en la parte baja del rango. Un canal, un sistema al que conectarse y una tarea acotada, como leer las facturas que llegan a un chat y convertir cada una en una fila normalizada. Construirlo arranca en torno a 2.500 €. Operarlo, en torno a 150 € al mes.',
              'La parte alta es para agentes que tocan varios sistemas y necesitan más validación antes de salir, como un asistente que responde desde tu documentación y además consulta datos vivos. Esas construcciones se acercan a los 10.000 € y su operación se sitúa en la parte alta del rango mensual.',
              'Los sistemas multiagente más grandes, como un asistente de planta que enruta cada pregunta a subagentes especializados, quedan fuera de estos rangos y se presupuestan por proyecto.',
            ],
          },
          {
            heading: 'Qué mueve el precio',
            id: 'factores',
            paragraphs: ['Cuatro cosas explican casi cualquier presupuesto que enviamos.'],
            bullets: [
              'A cuántos sistemas se conecta. Un agente que solo responde preguntas es más barato que uno que además escribe en tu calendario, en tu CRM o en tu base de datos, porque cada sistema conectado necesita sus propios permisos y sus propias pruebas.',
              'El estado de tus datos. Si el conocimiento que el agente necesita vive en fuentes limpias y legibles, el modelo rinde mejor y la construcción se acorta. Solemos ganar más ordenando los datos y las herramientas que puliendo instrucciones.',
              'Cuánta prueba necesitas antes de salir. Nuestro asistente de citas Wazzy no publica un cambio hasta que pasa una batería de 145 conversaciones anotadas. No todos los proyectos necesitan esa profundidad. Elegirla forma parte de la conversación del precio.',
              'Quién lo opera después. La cuota mensual cubre vigilar el sistema en producción. La siguiente sección enseña a dónde va ese dinero.',
            ],
          },
          {
            heading: 'A dónde va la cuota mensual',
            id: 'operacion',
            paragraphs: [
              'Cada mensaje que envía una persona dispara llamadas al proveedor del modelo y esas llamadas son el coste bruto de tener un agente en marcha. En Wazzy lo medimos por capas: leer y estructurar el mensaje que entra se lleva entre el 52 y el 57 % del gasto de modelo, decidir qué hacer a continuación entre el 24 y el 31 % y escribir la respuesta entre el 16 y el 19 %.',
              'Conocer ese reparto es lo que convierte recortar coste en una medición y no en una apuesta. En uno de nuestros sistemas probamos un modelo más barato y la batería de pruebas lo vetó, porque la calidad general bajaba diez puntos.',
              'El resto de la cuota paga la vigilancia. Una vez por semana lanzamos una conversación real contra el sistema vivo de principio a fin, por unos cinco céntimos. Y antes de publicar cualquier cambio tiene que pasar una batería de regresión. Son dos ritmos separados a propósito. La batería frena los cambios, la prueba semanal vigila lo que ya está funcionando.',
            ],
            link: { label: 'Por qué mantener viva la IA es lo difícil', href: '/blog/mantener-viva-la-ia' },
          },
          {
            heading: 'Qué es tuyo al final',
            paragraphs: [
              'El repositorio está a tu nombre desde el primer día y la infraestructura corre en una cuenta de nube que es tuya, no nuestra. Si nos separamos, el sistema se queda contigo, con su documentación y su historia.',
              'Eso explica también qué no incluye la cuota. No estás alquilando el agente, así que el coste mensual es operación y no una licencia que deja de funcionar cuando dejas de pagar.',
            ],
            link: { label: 'Cómo construimos agentes de IA', href: '/servicios/desarrollo-de-agentes-de-ia' },
          },
        ],
        faqHeading: 'Las preguntas de precio que más nos hacen',
        faq: [
          {
            q: '¿Cuánto cuesta un chatbot con IA?',
            a: 'Un chatbot de atención se queda en la parte baja del rango, desde 2.500 € de construcción, porque suele vivir en un solo canal y beber de una sola fuente de conocimiento. El precio sube cuando deja de solo responder y empieza a actuar, reservando citas o actualizando fichas, porque cada acción necesita sus permisos y sus pruebas.',
          },
          {
            q: '¿Por qué hay una cuota mensual?',
            a: 'Porque el modelo sobre el que corre tu agente cambia por debajo. Los proveedores actualizan modelos sin cambiarles el nombre. Un sistema que ayer respondía bien puede empezar a fallar en silencio. La cuota paga la medición y la prueba semanal que lo detectan antes que tus usuarios.',
          },
          {
            q: '¿Podemos operarlo sin vosotros?',
            a: 'Sí. Todo es tuyo, así que puedes tomar el relevo cuando quieras y hacemos sesiones de traspaso cuando un cliente las pide. Ten en cuenta una cosa, eso sí. Operar un agente significa medirlo y si nadie sigue midiendo, los fallos se vuelven silenciosos.',
          },
        ],
        cta: {
          heading: '¿Quieres una cifra para tu caso?',
          body: 'Cuéntanos tu reto y respondemos en menos de 24 horas laborables. Si no vemos retorno, te lo decimos.',
          button: 'Cuéntanos tu reto',
        },
      },
    },
  },

  en: {
    meta: {
      homeTitle: 'AI Automation Agency for Enterprises, Ideasforge',
      homeDescription:
        'AI automation agency for production systems: AI workflow automation, enterprise AI agents and conversational AI that reach production and move a business metric.',
      blogTitle: 'Blog, Ideasforge',
      blogDescription:
        'Ideas, case studies and lessons from building AI agents, automation and generative AI in production.',
      enterpriseTitle: 'AI assistant over your internal documentation, Ideasforge',
      enterpriseDescription:
        'For mid-size and large companies: an assistant that answers in natural language by querying your internal documentation, wikis and systems.',
      smbTitle: 'AI for Small Business, Ideasforge',
      smbDescription:
        'AI for small business, packaged by outcome: 24/7 customer support, lead qualification and document automation, with the same engineering we use on enterprise projects.',
      realEstateTitle: 'AI for Real Estate and Property Management, Ideasforge',
      realEstateDescription:
        'AI for real-estate agencies and property managers. An agent qualifies rental requests 24/7 and the utility invoices tenants send in stop being typed by hand.',
      accountingTitle: 'AI for Accounting Firms, Ideasforge',
      accountingDescription:
        'Document automation with AI for accounting firms: invoices, tickets and scanned forms reach your systems without anyone typing them in.',
    },
    nav: {
      services: 'Services',
      projects: 'Projects',
      about: 'About us',
      blog: 'Blog',
      contact: 'Contact',
      switchTo: 'Switch language',
    },
    hero: {
      eyebrow: 'We are the forge of your ideas',
      title: 'Stop searching your systems: AI agents that answer and act.',
      subtitle:
        'At Ideasforge we design and maintain custom AI agents for mid-size and large companies, on your infrastructure and measured before every change.',
      ctaPrimary: 'Tell us your challenge',
    },
    trustedBy: {
      heading: 'Companies we work with',
      subheading: 'Industry, agriculture, real estate, healthcare and professional services.'
    },
    caseStudies: {
      eyebrow: 'Projects',
      heading: 'In production',
      items: [
        {
          client: 'Industrial company',
          image: '/case-studies/industrial.jpg',
          title: 'Guided troubleshooting for whoever is at the machine',
          body: 'Plant knowledge lived in dense manuals and in the heads of the most experienced people. We built an assistant on the company’s own systems: operators query production and fault data, and get step-by-step guided troubleshooting when a machine stops.',
          metricBig: '6 agents',
          metricSmall:
            'specialized, coordinated by an orchestrator that routes every query.',
        },
        {
          client: 'Savian',
          clientLogo: '/logos/savian.png',
          image: '/case-studies/harvest.jpg',
          title: 'Anyone on the team, asking their own data',
          body: 'Finding out yesterday’s output meant asking analytics and waiting hours. We built a WhatsApp assistant that understands the question in natural language and returns the figure by querying the database. The split is always the same: judgment lives in the code, interpretation of the world lives in the model, and knowledge lives in the data.',
          metricBig: 'From hours to seconds',
          metricSmall:
            'how long it now takes any manager to get their figure.',
        },
        {
          client: 'Stanton',
          clientLogo: '/logos/stanton.png',
          image: '/case-studies/stanton.jpg',
          title: 'The invoices stopped being typed',
          body: 'Their tenants’ electricity, gas and water bills were keyed in by hand, one by one. Now the team uploads them to a Telegram chat and an agent running on Gemini reads each document and returns the data as rows ready to review. They started with invoices and keep extending the system to other back-office processes.',
          metricBig: '2 agents',
          metricSmall: 'in production, and the system keeps growing.',
        },
        {
          client: 'Barceloneta Premium',
          clientLogo: '/logos/bcnpremium.png',
          image: '/case-studies/barceloneta.jpg',
          title: 'The filter that works while the office is closed',
          body: 'Every rental enquiry arriving on WhatsApp took five to ten minutes of manual checking, and dozens came in every day. The agent talks to the applicant, collects reason, budget and paperwork, and emails the team a summary with a paragraph explaining why each one fits or does not. The team stopped screening and went back to booking viewings.',
          metricBig: '+3 hours',
          metricSmall: 'saved per day answering requests.',
        },
        {
          client: 'Wazzy',
          clientLogo: '/logos/wazzy.png',
          image: '/case-studies/dentist.jpg',
          title: 'Booking an appointment without calling or waiting',
          body: 'Wazzy is our own product: we shaped the business, the product and the assistant’s architecture. It books, changes and cancels appointments over WhatsApp against the real calendar, and escalates to the team when a conversation gets complicated. It handles health data, so encryption goes field by field and deletion respects clinical-record retention law.',
          metricBig: '103 controls',
          metricSmall: 'watch the system in production and raise the alarm if something breaks.',
        },
      ],
    },
    services: {
      eyebrow: 'Services',
      title: 'What we build',
      subtitle: 'Four capabilities for mid-size and large companies. For SMBs, the same pieces in fixed-scope packages.',
      enterprise: {
        label: 'For mid-size and large companies',
        items: [
          {
            title: 'Answers from your internal documentation',
            icon: 'documentacion',
            description:
              'An assistant that answers questions from your internal documentation and systems, so your team does not have to search.',
            proof: 'Industrial company',
            pageLabel: 'Internal documentation',
            href: '/en/services/corporate-knowledge',
          },
          {
            title: 'Ask your data',
            icon: 'tus-datos',
            description:
              'Your team queries operational data in natural language, no need to wait on analytics.',
            proof: 'Like at Savian',
            pageLabel: 'AI agent development',
            href: '/en/ai-agent-development',
          },
          {
            title: 'An agent for repetitive work',
            icon: 'automatizacion',
            description:
              'Registers invoices, fires alerts and lands the data in your systems with nobody typing. Your team only reviews the doubtful cases.',
            proof: 'Like at Stanton',
            pageLabel: 'AI workflow automation',
            href: '/en/ai-workflow-automation',
          },
          {
            title: 'Consulting and architecture',
            icon: 'consultoria',
            description:
              'We design the AI plan and architecture with you, without selling you tech you do not need.',
            pageLabel: 'Start the exploration',
            href: '/en/get-started',
          },
        ],
      },
      smb: {
        label: 'For small and mid-size businesses',
        items: [
          {
            title: '24/7 customer support',
            icon: 'atencion-247',
            description:
              'An agent that handles requests on WhatsApp or web, answers the usual ones and qualifies the rest without overloading the team.',
            proof: 'Like at Wazzy',
            pageLabel: 'Conversational AI',
            href: '/en/conversational-ai',
          },
          {
            title: 'Lead qualifier',
            icon: 'cualificacion',
            description:
              'We filter prospects before they reach your sales team, with your CRM and your pipeline.',
            proof: 'Like at Barceloneta Premium',
            pageLabel: 'AI for real estate',
            href: '/en/real-estate',
          },
          {
            title: 'Support and maintenance',
            icon: 'soporte',
            description:
              'We do not drop a system and leave. We run it with you, tune it and absorb new models as they ship.',
            proof: '103 controls in production',
            pageLabel: 'AI for small business',
            href: '/en/smb',
          },
        ],
      },
      cta: 'Tell us your challenge',
    },
    whyUs: {
      eyebrow: 'Commitments',
      title: 'Why Ideasforge?',
      subtitle: 'Three commitments a subscription cannot give you.',
      items: [
        {
          title: 'Observability by default',
          body: 'Every change goes through a regression suite before it ships, and we keep measuring every week afterwards. If one of them stops understanding queries well, we know before you do.',
          modal: {
            eyebrow: 'Observability by default',
            title: 'We measure every change before it ships to production',
            subtitle:
              'Your provider updates the model underneath without changing its name, your documentation keeps growing, and the system that answered well yesterday starts answering badly today.',
            bullets: [
              { title: 'Tests before going live', body: 'If a change lowers quality, it never reaches your users.' },
              { title: 'We know why it answered that', body: 'What it consulted and what it discarded is on record.' },
              { title: 'We count what it could not do', body: 'Every unanswered question is logged with its reason.' },
              { title: 'We watch your provider', body: 'If they update the model on their own, we notice first.' },
              { title: 'It flags partial answers', body: 'It states what it queried and what was left out.' },
            ],
            diagram: { after: 3, kind: 'gate' },
            openingLine:
              'The most expensive failure sets off no alarm, it is a flawless answer (that happens to be false).',
            paragraphs: [
              {
                heading: 'The failure that does not look like one',
                body: 'A manager asks how much field 4 produced last month. The assistant returns a good-looking, well-written figure. That figure is wrong. No log shows an error. The system did exactly what it believed was right. <u class="text-fg">That is the failure that keeps us up at night, because it does not look like a failure.</u>',
              },
              {
                heading: 'The ground moves on its own',
                body: 'The disconcerting part is that the model name stays the same while what sits behind it does not. Researchers at Stanford and Berkeley measured this in 2023. They sent the same questions to the same commercial model in March and in June, calling it by the same name over the same connection. On one of the tasks, accuracy fell from 97.6% to 2.4%. Nobody on the customer side touched anything. The provider had updated the model underneath. That is why measuring is not a quirk of ours, it is the only way to know that what worked in March still works in June.',
              },
              {
                heading: 'Why we can store the decision',
                body: 'Against that, looking at error logs is useless, because there is no error to look at. And this is where the way we build changes things. If the decision lives inside the model, there is nothing to store, only a piece of text that came out. So <u class="text-fg">in our systems the model does not decide</u>. It understands the question and hands over a JSON contract with what it understood. A script validates it, decides and answers. That decision can be stored whole: what it understood, what it asked for, what the validator rejected and why. We cover it in detail in <a class="link-inline" href="/en/blog/i-dont-like-ai-agents">why we don\'t like agentic architectures</a>.',
              },
              {
                heading: 'How we were getting it wrong',
                body: 'At first we reviewed the model\'s decisions by hand, one by one, reading execution histories after the fact. It did not scale and it was no baseline either, because <u class="text-fg">a system that is not deterministic does not answer the same way twice</u>. Reviewing isolated cases tells you nothing about whether the whole got better or worse. The leap was taking the decision out of the model and putting it in code, because deterministic things can be tested in bulk. Today every change runs against a battery of real questions with their correct answer already recorded. If it breaks one that used to pass, it does not ship.',
              },
              {
                heading: 'What the person asking sees',
                body: 'Some of what we measure is shown to the person asking, and that was deliberate. In one of our assistants every answer opens by stating which period it queried, because we found that \'last month\' meant different things to different people. And if a data source is unavailable, the system answers with the ones it has and says which was left out. We prefer an answer that admits what it is missing to an incomplete figure that looks complete.',
              },
            ],
            closingLine: 'Measuring does not stop the system from failing. It stops it from failing in silence.',
            notPromised: {
              heading: 'What we don’t promise',
              body: 'We don’t promise the system will always get it right. We promise we will find out before you do and leave a written record of why it failed, so the same error does not slip past twice.',
            },
            cta: { label: 'Tell us your challenge', href: '/en/#contacto' },
          },
        },
        {
          title: 'The code is yours',
          body: 'We hand you a system, not a black box. If you decide to take it elsewhere tomorrow, you can.',
          modal: {
            eyebrow: 'The code is yours',
            title: 'No black box, no lock-in',
            subtitle:
              'AI providers change prices and retire models. Some platforms shut down outright. The system we hand over is designed so that none of that news ever becomes your problem.',
            bullets: [
              { title: 'Repository under your name', body: 'From day one, not at the end.' },
              { title: 'You are not buying a subscription', body: 'You are buying a system that stays in your house.' },
              { title: 'A real handover', body: 'Operations manual and sessions with your people if you want them.' },
            ],
            openingLine: 'Vendor dependence is rarely in the contract. It lives in the day-to-day.',
            paragraphs: [
              {
                heading: 'Where it really starts',
                body: 'It begins when the instructions that govern the system live in the head of whoever wrote them and nobody else can check whether a change makes them worse. It grows when documentation describes what someone meant to do instead of what ended up being done. By the time you want to switch providers, no contract is stopping you, there is simply nobody left who can explain how the thing works.',
              },
              {
                heading: 'And meanwhile the ground moves',
                body: 'Providers retire models regularly and they do it in writing. Anthropic publishes its <a class="link-inline" href="https://platform.claude.com/docs/en/about-claude/model-deprecations" rel="noopener noreferrer" target="_blank">deprecation schedule</a> and gives sixty days of notice. On 15 June 2026 Claude Sonnet 4 and Opus 4 stopped working, so from that date any call to those identifiers fails. This is not an accident or bad practice, it is how the sector works. The question is what each of those retirements costs you, because <u class="text-fg">when a provider retires a model, that should not affect you</u>.',
              },
              {
                heading: 'What is inside the repository',
                body: 'Everything that defines the system behaviour lives versioned in your repository: the model instructions with their change history, the tests with their correct answer recorded, the operations manuals and an incident catalog. That catalog is the piece technical teams appreciate most and the one almost nobody asks for, because it does not say how each problem was fixed, it says how it is recognized from the outside, which is what helps the next time the system acts strange.',
              },
              {
                heading: 'Swapping models is proven, not promised',
                body: 'Saying one model can be replaced by another is easy. We check it before we claim it. When we considered swapping the model in one of our systems for a cheaper one, we ran both versions through the same set of questions with their correct answer recorded. The cheaper one lost ten points of accuracy and on the questions where it had to choose between two similar options it fell from 89% to 44%, so we rejected it with those numbers in front of us. That same check decides which model goes where, which is why our production systems do not all run on the same provider.',
              },
              {
                heading: 'Neither a closed product nor a subscription',
                body: 'An off-the-shelf product decides for you where your data lives, what can be integrated and when the price goes up. <u class="text-fg">What we hand over runs on the cloud we set up for you, under your name.</u> The only outbound path is the calls to the model, which you approve one by one. If your committee decides that not even those may leave the perimeter, that is a conversation we have on the table from day one, with what it gains and what it costs.',
              },
              {
                heading: 'Who we write the documentation for',
                body: 'Documentation is written with one specific person in mind, and it is not you. It is whoever maintains this in two years, someone who sits in none of today\'s meetings and will arrive without context. If what we leave them does not come with something they can run to check it, it is no use to them. We hold ourselves to the same rule we hold you to.',
              },
            ],
            notPromised: {
              heading: 'What we don’t promise',
              body: 'We don’t promise you will never need us. We promise that the day you decide to move on you won’t have to ask us for anything, because you have had it all at home since day one.',
            },
            cta: { label: 'Tell us your challenge', href: '/en/#contacto' },
          },
        },
        {
          title: 'Security by default',
          body: 'The model does not write the queries that reach your systems, it picks from options we have already reviewed. Each person signs in with their company account and your data lives wherever you decide.',
          modal: {
            eyebrow: 'Security by default',
            title: 'Security that does not depend on the model getting it right',
            subtitle:
              'Where the data lives and who gets to touch it are decisions we make at the start, not at the end. Your security committee will ask eventually, and we would rather have the answer before the meeting.',
            bullets: [
              { title: 'The model does not write queries', body: 'It fills a closed form and the code runs it.' },
              { title: 'It only talks to what you approve', body: 'Contained by permissions, not filters.' },
              { title: 'GDPR', body: 'Real deletion and legal retention periods met.' },
            ],
            diagram: { after: 2, kind: 'flow' },
            openingLine: 'The model decides, but it is never the authority.',
            paragraphs: [
              {
                heading: 'Why a filter does not fix it',
                body: 'A language model receives the instructions we give it and the text that reaches it from outside through the same channel, with nothing separating one from the other. So someone can slip into that text something the model reads as a new order and follows without realising it has switched sides. Classic security solves this by separating data from instructions. Here that separation does not exist, which is why <a class="link-inline" href="https://owasp.org/www-project-top-10-for-large-language-model-applications/" rel="noopener noreferrer" target="_blank">prompt injection</a> tops the OWASP risk list for language-model applications for the second edition running. In December 2025 the UK’s <a class="link-inline" href="https://www.ncsc.gov.uk/news/mistaking-ai-vulnerability-could-lead-to-large-scale-breaches" rel="noopener noreferrer" target="_blank">national cyber security centre</a> went further and warned it may never be fixed as a category, asking defenders to stop waiting for a patch and work on reducing the damage instead.',
              },
              {
                heading: 'The usual setup leaves the door open',
                body: 'What makes an assistant dangerous is not what it knows, it is what it can do. Security people talk about <a class="link-inline" href="https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/" rel="noopener noreferrer" target="_blank">three ingredients</a> that are harmless apart and dangerous together: access to private data, input that comes from outside and a free path to act on your systems. The first two are the reason the assistant exists, so the third is the one to cut. The most common setup today does the opposite, because it plugs the model into the database through a connector that lets it write the queries itself (the now-famous MCP connectors). From that moment it can write any query the language allows. The only thing stopping it is a sentence in its prompt, along the lines of “do not query the payroll table”. <u class="text-fg">And this is not a guarantee, it is a polite request.</u>',
              },
              {
                heading: 'The model chooses, the code executes',
                body: 'Our data assistant, and most of the ones we build, are built the other way round. The model does not write the query. It fills in a closed form (a JSON contract) with the fields we defined and a program reads that form and builds the query that reaches the database. That program only knows how to build the queries we taught it, so no other one can come out of there. The plant assistant we built for an industrial company works the same way with documents. The model picks a label from a closed list and the code retrieves the official text attached to it. <u class="text-fg">A malicious message can, at most, pick the wrong option from a list we have already reviewed.</u>',
              },
              {
                heading: 'Never more permissions than the person',
                body: 'The assistant has no all-powerful credential of its own. Queries to internal systems are fired by the user with their usual permissions, the same ones they already have across the rest of the company’s applications. And when in doubt it blocks. If the permission list arrives empty, the answer is a flat no instead of default access.',
              },
              {
                heading: 'Some limits are not technical',
                body: 'In one of our assistants anyone with permissions can look up production at their sites, but the system will not answer about the hours worked by specific people, lateness or absences. Some of those columns sit in the database and are simply not exposed. <u class="text-fg">The restriction lives in the code, not in the hope that the model behaves.</u> The tool is there to run sites, not to build a file on anyone.',
              },
              {
                heading: 'Health data, the highest bar',
                body: 'At Wazzy we handle health data, which European regulation places in the most protected category there is. We do store personal data, because without it there is no service. What changes is how. Encryption runs field by field and deletion respects the five years that clinical record retention requires, a legal deadline rather than a preference of ours. The bar is set for us by the European AI regulation and by data protection law.',
              },
              {
                heading: 'A shortcut of ours and how we closed it',
                body: 'One of our systems had a test build that skipped the login. It was created so changes could be tried without authenticating every time, it was documented and it was flagged for removal, which is exactly the kind of thing still sitting there two years later. What we did was put a dry-run mode inside the authenticated path that does the same job, so the shortcut was left with no reason to exist. Since then every temporary fix we write down carries its own expiry date.',
              },
            ],
            closingLine:
              'The question is not whether someone will try to trick the model. It is what the model can actually do once they succeed.',
            notPromised: {
              heading: 'What we don’t promise',
              body: 'We don’t promise an invulnerable system, because there is no such thing. We promise to apply the highest security our AI architectures allow and to keep a tight grip on everything the language model can and cannot do.',
            },
            cta: { label: 'Tell us your challenge', href: '/en/#contacto' },
          },
        },
      ],
    },
    methodology: {
      eyebrow: 'Our method',
      title: 'How we work',
      subtitle: 'Four steps to take AI from idea to daily use.',
      outputsLabel: 'What you walk away with',
      cta: { label: 'Start with step 1', href: '/en/get-started' },
      steps: [
        {
          title: 'Explore',
          body: 'We map with you where the pain is and where AI moves a metric. We do not start with technology, we start with your business.',
          outputs: [
            'A map of where AI helps and where it does not',
            'The real state of the data it would need',
            'The constraints to respect from the start',
          ],
        },
        {
          title: 'Prioritize',
          body: 'Out of every possible use case we pick the ones with tangible ROI that are doable today. <u>If something does not pay off, we tell you.</u>',
          outputs: [
            'The use cases ranked by what they return',
            'What we ruled out, with the reason written down',
            'A first bounded case to start with',
          ],
        },
        {
          title: 'Implement',
          body: 'We build a production system, not a prototype. With your organization’s accounts, your integrations and your security rules.',
          outputs: [
            'The system running on your infrastructure',
            'The repository under your name from day one',
            'The test suite with its correct answers recorded',
          ],
        },
        {
          title: 'Optimize',
          body: 'We measure how it behaves week after week. We tune it, extend it and absorb new models when they ship.',
          outputs: [
            'Weekly measurement with the result in plain sight',
            'The incident catalog, which says how each fault is recognized',
            'Every change goes through the tests before reaching your users',
          ],
        },
      ],
    },
    integrations: {
      title: 'We integrate with your stack',
      subtitle:
        'SharePoint, Confluence, Azure, SAP, ERP, CRM and models from OpenAI, Anthropic and Google. Your systems stay put; AI flows through them.',
      cta: 'Tell us your challenge',
    },
    blog: {
      eyebrow: 'Blog',
      clusterHeading: 'We cover this in detail',
      heading: 'Blog',
      subtitle: 'What we discover while building AI in production with our clients.',
      readMore: 'Read more',
      updatedOn: 'Updated on',
      viewAll: 'Visit blog',
      backToBlog: 'Back to blog',
      publishedOn: 'Published on',
      counterLabel: 'Article',
      counterOf: 'of',
    },
    faq: {
      eyebrow: 'FAQs',
      heading: 'Frequently asked questions',
      subtitle: 'The questions we usually answer before we start.',
      items: [
        {
          q: 'Does my data leave my infrastructure?',
          a: 'Only if you decide so. We deploy on your cloud or your own servers, under your corporate identity, and the system stores the minimum it needs. The only outbound path is the calls to the model provider, and you approve which ones happen and what travels in them.',
        },
        {
          q: 'Who owns the code you build?',
          a: 'You do. We hand you the repositories, the documentation and the architecture from day one. No black box, no vendor lock-in.',
        },
        {
          q: 'How do you know AI keeps working after delivery?',
          a: 'Two rhythms. A regression suite runs before every change and blocks it if quality drops. Once live, we keep measuring every week. If the system stops understanding a question, we catch it before it reaches the end user.',
        },
        {
          q: 'Do you only work with large enterprises?',
          a: 'No. We have dedicated packages for small businesses (customer support, lead qualification, document automation) with the same engineering we use on enterprise projects.',
        },
        {
          q: 'Do you work as an AI automation consultant?',
          a: 'Yes, as the first phase of every project. Before anything is built we study your processes and your data and tell you where an agent pays off and where it does not. If we see no return, we say so and it ends there. And when there is one, the same team that recommended the system builds it and operates it, so the advice answers for its results.',
        },
      ],
    },
    contact: {
      eyebrow: 'Contact',
      heading: 'Tell us your challenge.',
      subhead: 'We reply within 24 business hours. No forty-slide sales deck.',
      name: 'Name',
      email: 'Email',
      company: 'Company',
      website: 'Website',
      optional: 'Optional',
      message: 'What you want to build, or the problem you want to solve',
      messageHint: 'Describe it the way you would to a colleague. You do not need to know which technology solves it.',
      privacyPre: 'I have read and accept the ',
      privacyLink: 'Privacy Policy',
      submit: 'Send',
      startPre: 'If you already know you want to start, ',
      startLink: 'the exploration form',
      startPost: ' collects what we need to get going.',
    },
    flowDiagram: {
      title: 'The model interprets, the code decides',
      nodes: {
        question: 'User question',
        model: 'Model',
        validator: 'Validator',
        blocked: 'Blocked',
        query: 'Parameterized query',
        database: 'Database',
      },
      edges: { contract: 'JSON contract', rejects: 'rejects', accepts: 'accepts' },
      legend:
        'The model never reaches your systems. It interprets the question and hands over a contract, and from there the code decides, and the code does behave the same every time. The worst a malicious message can achieve is a wrong pick from a list we have already reviewed.',
    },
    gateDiagram: {
      title: 'What happens to a change before it ships',
      nodes: {
        change: 'A new change',
        known: 'The usual questions',
        fresh: 'The new ones it brings',
        gate: 'Any failures?',
        review: 'Back to review',
        production: 'Goes to production',
      },
      edges: { fails: 'fails', passes: 'passes' },
      legend:
        'The usual questions are not retired when a change arrives, the new ones are added to them. That is why an improvement in one place cannot break another without us finding out before it ships, which is while it is still cheap.',
    },
    start: {
      metaTitle: 'Start the exploration, Ideasforge',
      metaDescription:
        'Tell us which process you want to solve and we reply within 24 business hours with a first read of your case.',
      eyebrow: 'Step 1 · Explore',
      title: 'Let’s start with your case',
      subtitle:
        'These are the same questions we would ask in a first meeting. Answering them in writing saves that meeting for both of us and lets us start working sooner.',
      getHeading: 'What you get',
      get: [
        'A confirmation email as soon as you send it, with a copy of what you told us.',
        'A reply within 24 business hours, written by a person who has read your case.',
        'A first read of where we think AI helps in what you describe, and where it does not.',
      ],
      notHeading: 'What you do not get',
      not: [
        'We will not drop you into an automated email sequence.',
        'There are no sales intermediaries, the person who answers is the one who will work on your case.',
        'We do not quote a price before understanding the problem.',
      ],
      form: {
        name: { label: 'Name' },
        email: { label: 'Email' },
        company: { label: 'Company' },
        website: { label: 'Website', hint: 'Optional' },
        size: {
          label: 'Company size',
          options: [
            'Select an option',
            'Fewer than 50 people',
            'Between 50 and 250',
            'Between 250 and 1,000',
            'More than 1,000',
          ],
        },
        problem: {
          label: 'Which process do you want to solve',
          hint: 'The more detail you give us, the better we can understand the case and come back with a grounded proposal.',
        },
        dataHome: {
          label: 'Where does the data for that process live today',
          options: [
            'Select an option',
            'In an ERP',
            'In our own database',
            'In spreadsheets',
            'In loose documents',
            'In several places at once',
            'I do not know yet',
          ],
        },
        dataOut: {
          label: 'Can that data leave your infrastructure?',
          options: [
            'Select an option',
            'Yes, no problem',
            'No, it has to stay inside',
            'We would have to check with security',
          ],
        },
        timeline: {
          label: 'When do you need it',
          options: [
            'Select an option',
            'No date, we are exploring',
            'This quarter',
            'This year',
            'It is urgent',
          ],
        },
        submit: 'Start the exploration',
        subject: 'New exploration from ideasforge.io',
      },
    },
    footer: {
      tagline: 'Generative AI development in production for businesses. Measured every week.',
      menu: 'Menu',
      legal: 'Legal',
      privacy: 'Privacy Policy',
      cookies: 'Cookies Policy',
      contactHeading: 'Contact us',
      rights: 'Ideasforge. All rights reserved.',
      servicesHeading: 'Services',
      servicesLinks: [
        { label: 'Guide: AI automation', href: '/en/ai-automation' },
        { label: 'AI agent development', href: '/en/ai-agent-development' },
        { label: 'AI workflow automation', href: '/en/ai-workflow-automation' },
        { label: 'Conversational AI', href: '/en/conversational-ai' },
        { label: 'Internal documentation', href: '/en/services/corporate-knowledge' },
        { label: 'GDPR-compliant AI', href: '/en/gdpr-compliant-ai' },
        { label: 'AI for small business', href: '/en/smb' },
        { label: 'AI for real estate', href: '/en/real-estate' },
        { label: 'AI for accounting firms', href: '/en/accounting-firms' },
        { label: 'What an AI agent costs', href: '/en/ai-agent-development-cost' },
      ],
    },
    pages: {
      enterprise: {
        hero: {
          eyebrow: 'Enterprise offering',
          title: 'An AI assistant over your internal documentation and knowledge',
          subtitle:
            'A custom conversational assistant that understands natural-language questions and answers by querying your documentation and internal systems, and, when needed, guides step by step or takes actions.',
          cta: 'Tell us your challenge',
        },
        forWhom: {
          heading: 'For whom',
          body: 'Mid-size and large companies whose knowledge and data are scattered across documentation, wikis and internal systems (SharePoint, Azure, Confluence, ERP, industrial systems).',
        },
        problem: {
          heading: 'The problem',
          body: 'Critical knowledge lives in dense documents, in separate systems and in the heads of the most experienced people. Finding an answer or diagnosing a problem takes time and depends on a few.',
        },
        whatWeBuild: {
          heading: 'What we build',
          body: 'A search box returns ten documents; it does not give you the answer. Here a person asks in their own words and gets the answer, with a reference to where it came from. And when the question needs live data from an internal system, the assistant goes and fetches it instead of quoting a two-year-old document.',
        },
        how: {
          heading: 'How',
          body: 'Production-grade search over your documentation, integration with your systems and several coordinated agents that route each query to the right place.',
        },
        guarantees: {
          heading: 'Enterprise guarantees',
          body: 'On your infrastructure (on-premise or your cloud), with your corporate identity (SSO / Azure AD) and your data wherever you decide. With observability: we measure quality continuously.',
          link: {
            label: 'How this holds up under GDPR and the EU AI Act',
            href: '/en/gdpr-compliant-ai',
          },
        },
        proof: {
          heading: 'Proof in production',
          body: 'We built a plant-floor assistant for a large industrial company. Operators and supervisors query production and fault data, run guided troubleshooting for machines and resolve technical questions, in natural language, on their own infrastructure.',
        },
        capabilities: {
          heading: 'Technical capabilities',
          items: [
            {
              title: 'Multi-agent architecture',
              body: 'An orchestrator understands each query’s intent and routes it to specialized agents. Scales to multiple use cases without becoming an unmaintainable monolith.',
            },
            {
              title: 'Reliable document retrieval',
              body: 'The search that feeds the model (RAG) is designed to return complete and correct answers, without leaking internal details to the end user.',
            },
            {
              title: 'Measurable quality',
              body: 'Test suites that automatically verify, before every change, that the assistant still understands and answers correctly.',
            },
            {
              title: 'Integration with your systems',
              body: 'ERP, databases, corporate identity and industrial systems.',
            },
            {
              title: 'Security and data sovereignty',
              body: 'On-premise or your own cloud, corporate SSO, your data wherever you decide.',
            },
          ],
        },
        cta: {
          heading: 'Interested for your company?',
          body: 'Tell us your challenge. If we don’t see a return, we’ll tell you.',
          button: 'Tell us your challenge',
        },
      },
      smb: {
        hero: {
          title: 'Same engineering, packaged for your small business',
          subtitle:
            'Each package is scoped to one concrete outcome and quoted as a fixed price, with the same depth we use on larger projects.',
          cta: 'Tell us your challenge',
        },
        packages: {
          heading: 'Packages',
          subtitle: 'Built to start fast and grow once validated.',
          items: [
            {
              title: '24/7 customer support',
              description:
                'An agent that handles requests on WhatsApp or web, answers the usual ones and qualifies the rest without overloading the team.',
            },
            {
              title: 'Lead qualifier',
              description:
                'We filter prospects before they reach your sales team, with your CRM and your pipeline.',
              proof: 'Like at Barceloneta Premium',
            },
            {
              title: 'Document automation',
              description:
                'Invoices, tickets and scanned forms that flow into the ERP without anyone typing them in.',
              proof: 'Like at Stanton',
            },
            {
              title: 'Support and observability',
              description:
                'We don’t drop a system and leave. The test suites block any change that degrades quality, and the weekly measuring continues.',
            },
          ],
        },
        cta: {
          heading: 'Where do we start?',
          body: 'Tell us your challenge. If we don’t see a return, we’ll tell you.',
          button: 'Tell us your challenge',
        },
      },
      realEstate: {
        hero: {
          eyebrow: 'Real estate and property management',
          title: 'Your agency answering 24/7, without overloading the team',
          subtitle:
            'An AI agent that receives the request, asks the qualifying questions and only escalates the leads that match. Especially useful during rental-demand peaks.',
          cta: 'Tell us your challenge',
        },
        problem: {
          heading: 'The problem',
          body: 'Every incoming request goes through the same bottleneck: someone has to read it, qualify it and decide whether it is worth scheduling a visit. That is five to ten minutes per enquiry, dozens of times a day. During rental peaks the backlog piles up and leads cool off.',
        },
        solution: {
          heading: 'The solution',
          body: 'A conversational agent that takes the request, asks area, budget, dates and requirements, and only escalates the leads that pass the filter. It replies to the client immediately and leaves the full trail in the CRM.',
        },
        proof: {
          heading: 'Proof in production',
          body: 'This is the system we built for Barceloneta Premium. More than three hours saved per day just on handling incoming requests, and a human team that now only schedules visits instead of triaging.',
        },
        extra: {
          heading: 'AI for property management',
          body: 'Property management has its own repetitive work. At Stanton, a property manager, the utility invoices tenants send in used to be typed into a spreadsheet by hand. Today a chatbot receives each invoice and an OCR layer with a language model turns it into a normalized row in the spreadsheet the team already uses. Two AI agents in production, and the client keeps extending the automation to more processes.',
        },
        cta: {
          heading: 'Does it fit your agency?',
          body: 'Tell us your challenge. If we don’t see a return, we’ll tell you.',
          button: 'Tell us your challenge',
        },
      },
      accounting: {
        hero: {
          eyebrow: 'Accounting firms',
          title: 'Documents untouched: from PDF to ERP',
          subtitle:
            'Invoices, tickets and scanned forms the team no longer needs to type in by hand. OCR reads them, the model structures them and a validation layer checks the totals add up.',
          cta: 'Tell us your challenge',
        },
        problem: {
          heading: 'The problem',
          body: 'Processing invoices by hand is slow, repetitive and error-prone. Every PDF goes through a person who copies amounts, dates and vendors into a spreadsheet and then into the ERP. Hours every week, with the risk of getting a digit wrong.',
        },
        solution: {
          heading: 'The solution',
          body: 'OCR + language model to read and interpret the document, validation layer to check totals add up and a direct hand-off to the ERP. The team only reviews edge cases.',
        },
        proof: {
          heading: 'Proof in production',
          body: 'This is the system we built for Stanton. Two AI agents in production and a plan to extend the automation across the rest of their back-office processes.',
        },
        cta: {
          heading: 'Does it fit your firm?',
          body: 'Tell us your challenge. If we don’t see a return, we’ll tell you.',
          button: 'Tell us your challenge',
        },
      },
      about: {
        metaTitle: 'About us, Ideasforge',
        metaDescription:
          'A small team that builds and maintains AI systems in production, and runs its own product. How we work and why we back it with numbers.',
        hero: {
          title: 'A small team that maintains what it builds',
          subtitle:
            'We don’t hand over a system and disappear. We run our own software in production, with real users, and that experience is what we bring to every client project.',
          cta: 'Tell us your challenge',
        },
        sections: [
          {
            heading: 'We build our own product',
            paragraphs: [
              'Wazzy is ours. We shaped the business idea, built the product and the assistant’s architecture, and we run it today in clinics and service businesses. It manages bookings, changes and cancellations on the official WhatsApp API, and it handles health data, the most protected category under GDPR.',
              'Running your own product changes how you work. When you are the one getting the alert at three in the morning, you stop writing code that only holds up in the demo. Everything we learn there goes back into client projects.',
            ],
            link: { label: 'Meet Wazzy', href: 'https://wazzy.io' },
          },
          {
            heading: 'What production has taught us',
            paragraphs: [
              'That the most expensive failure in an AI system sets off no alarm: it is a flawless answer that happens to be false. That a test suite which replicates the system instead of exercising it ends up measuring something else. That one noisy alert can burn through your alerting quota and leave you blind exactly when something real breaks.',
              'None of those lessons come from a manual. They come from having lived them, which is why we tell them with names and numbers instead of adjectives.',
            ],
            link: { label: 'How we work', href: '/en/#servicios' },
          },
          {
            heading: 'How we like to work',
            paragraphs: [
              'We start from the problem, not the technology. If a use case does not pay off, we say so before invoicing it. The repository is under your name from day one, with documentation written for whoever maintains the system in two years.',
              'And we measure. Every change goes through a test suite before it ships, and whatever the system cannot do is logged with its cause so it becomes the next improvement.',
            ],
          },
          {
            heading: 'The team',
            paragraphs: [
              'TO DO: name, role and a line or two of background for each person, with a real photo. This is the block that carries the most credibility for a small consultancy, and the only one we cannot write for you.',
            ],
          },
        ],
        cta: {
          heading: 'Shall we talk about your case?',
          body: 'Tell us your challenge. If we don’t see a return, we’ll tell you.',
          button: 'Tell us your challenge',
        },
      },
      aiGuide: {
        tocHeading: 'What this guide covers',
        metaTitle: 'AI Automation, a Practical Guide for Businesses, Ideasforge',
        metaDescription:
          'What AI automation actually is, its two shapes, five cases in production, what goes wrong and how it is kept under control, and what to ask before hiring anyone. No tool list, written from real systems.',
        hero: {
          eyebrow: 'Guide',
          title: 'AI automation, what it is and what it can do for your business',
          subtitle:
            'AI automation means software that understands language and documents well enough to run work that used to need a person, and this guide explains it without selling you a platform. Five of our systems in production, what breaks, what it costs and the questions we would ask in your chair. Updated August 2026.',
          cta: 'See the five cases in production',
          ctaHref: '#casos',
        },
        stats: [
          { value: '5', label: 'of our systems running today with real users' },
          { value: '118', label: 'real cases in the test battery of one of them' },
          { value: '~€0.05', label: 'cost of the weekly end-to-end test on a live system' },
        ],
        sections: [
          {
            heading: 'What AI automation is',
            id: 'what-it-is',
            part: 'The short answer',
            paragraphs: [
              'AI automation is the use of language models inside business processes so that work which used to need a person reading, interpreting or deciding can run on its own. The word covers everything from an invoice that files itself to an assistant that answers questions against your databases, and that breadth is why most of what you find when you search it is a list of twenty tools. This guide is not a tool list. It explains the thing itself, from systems we run in production, so you can judge any tool or any proposal, including ours.',
              'One design idea underneath everything that follows. In our systems, judgment lives in the code, interpretation of the world lives in the model and knowledge lives in the data. The model understands what a person wrote or what a document says. Ordinary, testable software decides what happens with that understanding, under whose permissions and with which limits. Getting that split right is the difference between automation you can trust and a demo with good manners.',
              'The reason this field exploded now, and not five years ago, is narrow and concrete. Current models can reliably fill a fixed structure with what they understood, which means code can validate the result before anything happens. Free text cannot be validated. A fixed structure can, and that single capability is what made language safe enough to put inside business processes.',
            ],
          },
          {
            heading: 'The guide in six sentences',
            part: 'The short answer',
            kind: 'lattice',
            paragraphs: [
              'Everything below unpacks these six ideas. In a hurry, they are the guide.',
            ],
            bullets: [
              'AI automation puts a model where a person used to read, interpret or decide, and code everywhere else.',
              'It comes in two shapes, agents that converse and act, and workflows that process volume end to end.',
              'It differs from your existing automation because it survives variety, a hundred invoice layouts, a question asked twenty ways.',
              'The failure modes have names and countermeasures, hallucinations, data leaking across boundaries and silent degradation over time.',
              'What separates a demo from production is measurement, a test battery before every change and a watch on the live system after.',
              'A single-job build starts around €2,500 plus monthly operation. There is a full cost guide at the end.',
            ],
          },
          {
            heading: 'The two shapes, agents and workflows',
            part: 'The map of the concept',
            paragraphs: [
              'Almost everything in this field arrives in one of two shapes, and knowing which one you need saves months. The first is the AI agent, software that holds a conversation or receives a request, works out what is being asked and acts on your systems to complete it. Booking the appointment, qualifying the enquiry, answering from your documentation. Agents shine where a person used to be the interface.',
              'The second is workflow automation, a pipeline that processes volume without anyone talking to it. Invoices arrive, get read, validated and filed. Requests get classified and routed. Documents get extracted into rows. Workflows shine where the interface already exists and the bottleneck is the reading and typing in the middle.',
              'Most real deployments mix both, an agent at the front where people ask, workflows behind where volume flows. The reason to keep the names straight is budgetary. Agents carry conversation design, identity and escalation paths. Workflows carry validation layers and exception queues. Proposals that blur the two tend to have priced neither properly.',
            ],
          },
          {
            heading: 'How it differs from the automation you already have',
            part: 'The map of the concept',
            paragraphs: [
              'Your company already automates. Rules in the ERP, macros, integration platforms, perhaps RPA robots imitating clicks on screens. All of it shares one assumption, the input arrives in a known shape. The rule fires when the field matches, the robot clicks where the button always is. The moment reality varies, a new invoice layout, a differently worded request, a screen redesign, the automation stops and a person absorbs the difference.',
              'AI automation removes exactly that assumption. A model does not match shapes, it reads content. The hundredth invoice layout is just another invoice. The question asked twenty different ways is the same question. This is why the technology unlocks processes that survived every previous automation wave, the ones with language, documents or judgment in the middle.',
              'It does not replace what already works. Fixed rules are cheaper, faster and perfectly predictable where inputs are stable, and we happily leave them in place. The honest engineering question is never which technology is newer. It is where variety lives in your process, because that is where a model earns its cost and nowhere else.',
            ],
          },
          {
            heading: 'Agentic AI, the word doing the heavy lifting',
            part: 'The map of the concept',
            paragraphs: [
              'You will meet the phrase agentic AI in every proposal this year. It names the idea of giving the model autonomy, planning steps, choosing tools, looking at results and deciding what to do next by itself. The idea is real and the range is wide, from a pipeline where code sets the path and the model interprets at fixed points, to a free agent deciding everything step by step.',
              'Anthropic, the lab behind the Claude models, recommends in its reference guide starting with workflows orchestrated by code and reserving autonomy for what genuinely needs it. Our production experience agrees, for an unglamorous reason. Every step the model decides is a step someone must test, watch and pay for. Autonomy is not a feature to maximise, it is a budget to allocate.',
              'For a buyer the practical question is never whether something is agentic. It is how much the model decides, where, and what contains it. We wrote down our full position, numbers and uncomfortable parts included.',
            ],
            link: { label: 'Why we distrust agentic architectures', href: '/en/blog/i-dont-like-ai-agents' },
          },
          {
            heading: 'Five cases in production',
            id: 'casos',
            part: 'What it does today',
            kind: 'checklist',
            paragraphs: [
              'Theory earns nothing. These are our five systems running today, each with what it does and for whom. They are also the proof that nothing in this guide is speculation.',
            ],
            bullets: [
              'A plant-floor assistant for a large industrial company. Operators and supervisors query production and faults in natural language, with guided troubleshooting. Underneath, an orchestrator routes each question across half a dozen specialised agents.',
              'An agent that answers business questions by querying the database, built for Savian. Waiting for a figure went from hours to seconds, and every number comes from a fresh query rather than the conversation’s memory.',
              'Document automation for Stanton, a property manager. Tenants’ utility invoices arrive through a chat, OCR plus a model structures them and each lands as a normalized row. Two agents in production and growing.',
              'Request qualification for Barceloneta Premium, a real-estate agency. The agent converses with each prospect and the team receives a summary with a verdict and its justification. More than three hours a day saved.',
              'Wazzy, our own product. A WhatsApp appointments assistant for clinics that books, changes and cancels 24/7, handling health data under Article 9 of the GDPR. We eat our own cooking.',
            ],
          },
          {
            heading: 'Hallucinations have architecture against them',
            part: 'What goes wrong',
            paragraphs: [
              'A hallucination is a false answer with excellent manners, and it is the first reasonable fear of any buyer. It is not fought by asking the model to behave. It is fought by removing the opportunity, figures that can only come from a database query, critical texts the model selects from an approved catalogue rather than writes, and metrics that catch the system answering from memory.',
              'We keep a full article on it, mechanism by mechanism, scars included.',
            ],
            link: { label: 'Detecting and preventing AI hallucinations is architecture', href: '/en/blog/detect-prevent-hallucinations' },
          },
          {
            heading: 'Everyone’s data, in its own lane',
            part: 'What goes wrong',
            paragraphs: [
              'The second fear is the assistant mixing what it must not, two clients, two companies, two employees with different permissions. Our house rule is that this separation never depends on the model behaving. The context only contains what the asker may see, code validates every request against a closed permission list and the query itself carries a filter that returns nothing rather than everything when in doubt.',
              'The full story, four layers and the redesign that erased a whole class of failures, is told separately. And if your review involves lawyers, the deeper page on data, records and European rules is the one to forward.',
            ],
            link: { label: 'GDPR-compliant AI on infrastructure you own', href: '/en/gdpr-compliant-ai' },
          },
          {
            heading: 'The hard part is not launching, it is staying alive',
            part: 'What goes wrong',
            paragraphs: [
              'The third risk is the one almost nobody budgets. Gartner estimates that over 40 percent of agentic AI projects will be cancelled before the end of 2027, and in our experience the mortality is not at the start. The ground moves on its own, the provider updates the model without renaming it, your documentation grows, your data drifts.',
              'Stanford and Berkeley researchers measured it on the same commercial model in March and June of 2023. On one task, accuracy fell from 97.6 percent to 2.4 percent with nobody on the client side touching anything. The only working answer is measurement, a battery of real cases that blocks any change that degrades the system, and a weekly watch on what is already live. Two rhythms, kept separate, and together they are the difference between knowing it works and believing it works.',
            ],
            link: { label: 'Starting is easy, keeping AI alive is the hard part', href: '/en/blog/keeping-ai-alive' },
          },
          {
            heading: 'The model interprets, the code decides',
            part: 'How it is really built',
            paragraphs: [
              'A quick visit to the engine room, because this is where most of the above gets decided. In our systems the model executes nothing directly. It understands the request and hands over a contract in a fixed format with fields we defined in advance, what is being asked, over which period, with which filters. A program validates that contract, checks the permissions of whoever is asking and builds the query with parameterised values, never with free text the model wrote.',
              'Where an answer must be exact we go further and the model does not even write the final text. It returns a key and the code retrieves the approved canonical text that key points to. Identity travels with every action too. The agent operates with the person’s own permissions, not with an all-access robot account, so if someone cannot open a record by hand, their assistant cannot open it for them.',
              'None of this shows up in a demo. All of it is what lets a system pass a security review instead of merely a meeting.',
            ],
          },
          {
            heading: 'Measured before every change, watched after',
            part: 'How it is really built',
            paragraphs: [
              'Models are not deterministic, they do not return exactly the same answer twice, so checking a response once proves nothing. The discipline that works is statistical and boring. Before any change ships, a battery of annotated real cases must pass, 118 cases in one of our systems, 145 conversations in our appointments product. If quality drops, the change does not go out.',
              'After launch the watching continues. Once a week we run a real conversation against the live system end to end, at about five cents per run. In the plant assistant, routing calibration was measured on real cases and went from 72 to 91 percent accuracy, and we also knew when to stop, chasing one hundred percent shapes the test against the system instead of improving it.',
              'These figures exist because the systems are built to produce them. When you evaluate any provider, ourselves included, ask for theirs.',
            ],
          },
          {
            heading: 'What the project looks like, first meeting to production',
            part: 'For your company',
            paragraphs: [
              'Our method has four named steps and each one hands over something tangible. Explore, understand the process and the data and say plainly whether we see a return, because when we do not, we say so and it ends there. Prioritise, choose the first case by pain and by figure, not by spectacle. Implement, build that bounded case and take it to production with its test battery in place. And optimise, measure what it does with real users and decide the next step with data.',
              'The shape matters as much as the steps. The project does not start with a platform that will do everything. It starts with one process that hurts and one figure that should move, and everything this guide described, the measurement, the isolation, the two rhythms, enters that first case from day one, because adding it later is the expensive version.',
            ],
          },
          {
            heading: 'How to tell if your company needs it',
            part: 'For your company',
            kind: 'checklist',
            paragraphs: [
              'Not every task deserves this. Here is the sieve we apply before accepting a project, in order.',
            ],
            bullets: [
              'A repetitive task with judgment inside exists. Pure mechanical steps are cheaper with classic automation. If each case requires understanding something, a document, a request, a question, that is where the model earns its place.',
              'The information it needs exists and is reachable. An agent without clean data answers from probability, which has another name. Sometimes the first real work is ordering the sources.',
              'A business figure should move, hours, requests handled, response times. If nobody can name the number, the project has no judge, and projects without a judge cannot be defended.',
              'Someone inside will own it. A production system needs a person who reads the metrics and takes small decisions every month. Without an internal owner, the best system becomes an orphan.',
            ],
          },
          {
            heading: 'Custom, off the shelf, or both',
            part: 'For your company',
            paragraphs: [
              'The build-or-buy question has an unhelpful reputation as a technology choice. It is a variety choice. Where your process is standard, a proven product will beat a custom build on speed and price, and pretending otherwise would be selling you hours. Where your process carries your particular judgment, your data model and your exceptions, off-the-shelf tools flatten exactly what makes the process yours, and the subscription that looked cheap starts costing workarounds.',
              'The pattern we see work is unromantic. Buy the commodity edges, the ticketing, the calendars, the accounting software, and build the thin intelligent layer that reads, decides and connects them the way your operation actually runs. That layer is where agents live, it is small enough to afford and it is the part no vendor can ship in a box, because the box has never seen your business.',
              'One caution from the buying side. If a proposal only makes sense with every process migrated onto someone’s platform, you are not buying automation, you are buying a dependency. Ask what remains yours the day the contract ends. Our answer is everything, repository, infrastructure and data, and it is in writing.',
            ],
          },
          {
            heading: 'The mistakes we see most often',
            part: 'For your company',
            kind: 'lattice',
            paragraphs: [
              'Projects rarely die of technology. They die of first-month decisions nobody revisited. These are the ones that repeat in front of us.',
            ],
            bullets: [
              'Starting with the impressive case instead of the painful one. Spectacle wins applause, the boring hour-eating process wins renewed budget.',
              'Buying the platform before the case. First one process in production with its figure, then the platform conversation, if it is still needed.',
              'Leaving measurement for the end. The test battery is built with the system, not after the scare. Retrofitting costs double and arrives late.',
              'Naming no internal owner. An ownerless agent is an orphan within three months, metrics unread and small decisions untaken.',
              'Waiting for perfect data. Reachable is enough, and ordering it is usually the first phase of the project, worth more than any prompt tuning.',
              'Promising the committee full autonomy. It sells well for one afternoon and gets paid for over years. Autonomy is dosed by cost and reliability, not by headline.',
            ],
          },
          {
            heading: 'What to ask any provider',
            part: 'For your company',
            kind: 'lattice',
            paragraphs: [
              'With this guide read, these six questions show you the kitchen of any proposal, ours included.',
            ],
            bullets: [
              'Which infrastructure does it run on, and in whose name are the account and the repository.',
              'What exactly travels in each model call, shown for your case rather than in general.',
              'What stops the assistant from showing data to the wrong person, and does the answer live in code or in the model’s instructions.',
              'What does the system do when it does not know, and what trace does that "no" leave.',
              'Which test battery blocks a bad change, and what is watched weekly in production.',
              'Which business figure did your last project move, with a number rather than adjectives.',
            ],
          },
          {
            heading: 'The European rules, in one minute',
            part: 'For your company',
            paragraphs: [
              'If you deploy in Europe, two regulations frame the work. The GDPR governs the personal data inside the system, and the EU AI Act sorts systems by the risk of their use, with its heaviest obligations applicable since August 2026. Neither forbids what this guide describes. Both reward the same architecture, records, oversight and restraint designed in from the start.',
              'We keep a full page on each, written for the person who has to defend the project in front of legal.',
            ],
            link: { label: 'EU AI Act compliance, for companies that deploy AI', href: '/en/eu-ai-act-compliance' },
          },
          {
            heading: 'What it costs, in short',
            part: 'For your company',
            paragraphs: [
              'A custom single-job build starts around €2,500, systems that touch several of your tools approach €10,000 and monthly operation runs between €150 and €500. Large multi-agent systems are quoted per project. What moves each figure, where the monthly fee goes and what you own at the end has its own guide, with the real numbers from our production systems.',
            ],
            link: { label: 'How much does an AI agent cost, the full guide', href: '/en/ai-agent-development-cost' },
          },
        ],
        faqHeading: 'Frequently asked questions about AI automation',
        faq: [
          {
            q: 'Does AI automation replace the team?',
            a: 'In our projects it replaces tasks, not jobs. The system absorbs the repetitive volume, the triage, the first reply, the typing, and people keep the part that needs judgment. In the real-estate case, the team stopped filtering requests and went back to scheduling visits, which is the work that produces revenue.',
          },
          {
            q: 'What is the difference between AI automation and RPA?',
            a: 'RPA imitates clicks and keystrokes on screens and works well for identical processes that never change. AI automation reads content, a different document every time, a request written any old way, and decides with rules. They often coexist, RPA moving the mechanical part and the model handling whatever requires interpretation.',
          },
          {
            q: 'What is the difference between agentic AI and generative AI?',
            a: 'Generative AI produces content, text, images, code. Agentic AI uses those same models to act, deciding steps, calling tools and completing tasks. Generative writes the email. Agentic writes it, checks the calendar and books the meeting. More capability, and more need for control, which is why this guide talks so much about measurement.',
          },
          {
            q: 'What happens when the AI gets it wrong?',
            a: 'It will, sometimes, which is why the design assumes it. Wrong outputs get caught by validation layers before they act, uncertain cases fall to a human queue with the conversation attached, and every decision is recorded so it can be inspected afterwards. The honest promise is not zero errors. It is errors that are visible, contained and cheap.',
          },
          {
            q: 'Do we need to change our current systems?',
            a: 'Usually not. The point of an agent is to adapt to the systems you already run, reading from them and writing to them under your permissions. Our deployments run in a cloud account under your name and connect to what exists. When something does need to change, it is almost always the data being unreachable, not the systems being old.',
          },
          {
            q: 'Do we need perfect data first?',
            a: 'Reachable, not perfect. More is gained by ordering data and tools than by polishing instructions, and sometimes that ordering is the first phase of the project. What does not work is expecting the model to compensate for sources nobody can read, because it will fill the gaps with probability.',
          },
          {
            q: 'Is our data used to train models?',
            a: 'No. Calls to the model run under agreements and settings that exclude training on your content, and the provider is yours to approve. Our systems also run in a cloud account under your name, so the data never lives on our infrastructure.',
          },
          {
            q: 'What if the provider changes the model underneath?',
            a: 'It happens, unannounced. It is documented that the same commercial model can perform very differently months apart without changing its name. That is exactly why every system carries its test battery and its weekly probe, which catch the change before your users do. And switching models is not always a configuration tweak, sometimes it means touching the system, so anyone promising otherwise is selling smoke.',
          },
          {
            q: 'How long until production?',
            a: 'It depends on scope, and distrust anyone quoting a deadline before seeing your systems. What stays constant is the shape, a first bounded process that reaches production and gets measured, then growth from there. Projects that start with the total platform and leave measurement for last are the ones feeding the cancellation statistics.',
          },
        ],
        cta: {
          heading: 'Does AI automation fit your company?',
          body: 'Tell us your challenge and we reply within 24 business hours. If we don’t see a return, we’ll tell you.',
          button: 'Tell us your challenge',
        },
      },
      agentDev: {
        metaTitle: 'Custom AI Agent Development for Enterprises, Ideasforge',
        metaDescription:
          'Custom AI agent development services for mid-size and large companies: enterprise AI agents on your infrastructure, under your identity, measured before every release.',
        hero: {
          eyebrow: 'AI agent development',
          title: 'Enterprise AI agents that reach production',
          subtitle:
            'We design, build and maintain custom AI agents for mid-size and large companies. On your infrastructure, under your corporate identity, and measured before every change.',
          cta: 'Tell us your challenge',
        },
        stats: [
          { value: '118', label: 'real cases in the test battery' },
          { value: '72% → 91%', label: 'accuracy after calibrating the routing' },
          { value: '10 points', label: 'lost by the cheaper model: rejected' },
        ],
        sections: [
          {
            heading: 'What custom AI agent development covers',
            paragraphs: [
              'Custom AI agents that do real work: they answer questions against your documentation and databases, run guided diagnostics, qualify requests and execute actions on the systems you approve. Each agent is built for one job and connected to the tools that job needs.',
              'When one agent is not enough, we build the architecture that coordinates several: an orchestrator understands each query and routes it to the specialist. One of our production systems runs this way, with half a dozen specialized agents behind the orchestrator.',
            ],
            link: { label: 'New to the concept? Start with the AI automation guide', href: '/en/ai-automation' },
          },
          {
            heading: 'How an agent earns its place in production',
            paragraphs: [
              'A demo takes days. Production takes discipline. Every agent ships with a battery of tests that runs before each change; if quality drops, the change does not go live. On one enterprise agent we calibrated the routing from 72% to 91% accuracy over 118 real cases before trusting it with more scope.',
              'Every answer is recorded with its context: what the agent consulted, what it decided and what it cost. When a complaint arrives, we reconstruct exactly what happened.',
            ],
          },
          {
            heading: 'Security is the starting point',
          diagram: true,
            paragraphs: [
              'The model decides, but it is never the authority: it picks from a closed set of actions that the code reviews before anything runs. Agents act with the permissions of the person using them, through your corporate identity. If your organization revokes someone’s access, the agent loses it too.',
            ],
            link: { label: 'Built to run under EU rules', href: '/en/gdpr-compliant-ai' },
          },
          {
            heading: 'Proof in production',
            paragraphs: [
              'At Savian we built an agent that understands a business question, turns it into a safe database query and returns the figure, with a chart when it helps. People who used to file a ticket with analytics and wait now simply ask and carry on.',
            ],
            link: { label: 'Assistant over your internal documentation', href: '/en/services/corporate-knowledge' },
          },
          {
            heading: 'An AI agent development company that hands over the keys',
            paragraphs: [
              'The repository is under your name from day one: code, documentation, operations manuals, the model’s instructions and the test suites. Switching model providers is a configuration change plus a test run. The day you decide to move on, you already have everything.',
            ],
          },
        ],
        faqHeading: 'Frequently asked questions',
        faq: [
          {
            q: 'What does “enterprise” mean in practice?',
            a: 'Your infrastructure or your cloud, your corporate identity, your data where you decide, and quality measured continuously. The guarantees your security committee will ask about, answered before the meeting.',
          },
          {
            q: 'Can the agent connect to our internal systems?',
            a: 'That is the point. ERP, databases, industrial systems, documentation. The agent only talks to the systems you approve, with each user’s permissions.',
          },
          {
            q: 'Who maintains the agent afterwards?',
            a: 'Whatever you decide. We can handle measured maintenance, or train your team and hand over the operations manual so they run it. The documentation is written for that second case even if you pick the first.',
          },
          {
            q: 'What if the model provider raises prices or retires the model?',
            a: 'The model sits behind an abstraction layer, so swapping it is configuration plus a test run. We have done it: we rejected a cheaper model because the suite showed it lost ten points of accuracy.',
          },
        ],
        cta: {
          heading: 'Interested for your company?',
          body: 'Tell us your challenge. If we don’t see a return, we’ll tell you.',
          button: 'Tell us your challenge',
        },
      },
      processAuto: {
        metaTitle: 'AI Workflow Automation Services, Ideasforge',
        metaDescription:
          'AI workflow automation for business processes: documents, requests and data queries handled end to end, on your systems, with code-level validation at every step.',
        hero: {
          eyebrow: 'AI workflow automation',
          title: 'The workflows you could never automate',
          subtitle:
            'AI workflow automation for business processes: the flows with documents, conversations or judgment in the middle, handled end to end on your systems.',
          cta: 'Tell us your challenge',
        },
        stats: [
          { value: '+3 hours', label: 'a day a team stopped spending on filtering requests' },
          { value: '2 agents', label: 'in production registering invoices unattended' },
        ],
        sections: [
          {
            heading: 'Which workflows open up with AI',
            paragraphs: [
              'The processes that classic tools could not automate share one trait: somewhere in the middle, a person has to read and decide. An invoice arrives and someone types it in. A request arrives and someone qualifies it. A question arrives and someone looks up the answer. Language models absorb exactly that step.',
            ],
            bullets: [
              'Document intake: scanned invoices, receipts and forms read, validated and registered in your ERP.',
              'Request handling: incoming enquiries answered, qualified and routed around the clock.',
              'Data access: business questions turned into safe database queries, answered in seconds.',
              'Escalation: the cases that need judgment reach your team with full context.',
            ],
          },
          {
            heading: 'End to end, with validation in the middle',
            paragraphs: [
              'AI business process automation fails when the model is left unsupervised. In our systems the model interprets and a validation layer checks the result before it touches your ERP: totals that add up, fields that match, permissions that hold. The team reviews the edge cases; everything else flows.',
            ],
          },
          {
            heading: 'Proof in production',
            paragraphs: [
              'For a property manager, the utility invoices that used to be typed in by hand now flow in on their own: two AI agents in production and a plan to extend the automation further. For a real-estate agency, the request-qualification workflow saves the team more than three hours a day.',
            ],
            link: { label: 'See the projects', href: '/en/#proyectos' },
          },
          {
            heading: 'Measured like the software it is',
            paragraphs: [
              'Every change runs against a battery of tests before going live, and every run leaves a record. If data is missing, the system answers with what it has and says what was left out, instead of returning a figure that looks complete.',
            ],
            link: { label: 'Where your data goes, and what we log', href: '/en/gdpr-compliant-ai' },
          },
          {
            heading: 'Your systems stay put',
            paragraphs: [
              'The automation connects to what you already run: ERP, CRM, databases, mail, messaging. And the repository is under your name from day one, with its documentation and operations manuals.',
            ],
            link: { label: 'Document automation for accounting firms', href: '/en/accounting-firms' },
          },
        ],
        faqHeading: 'Frequently asked questions',
        faq: [
          {
            q: 'What is AI workflow automation?',
            a: 'Automation where a language model handles the steps that require reading or interpretation, inside a workflow validated by code. The model interprets; deterministic code checks and executes.',
          },
          {
            q: 'How is it different from RPA?',
            a: 'RPA repeats fixed steps and breaks when the input changes. AI workflow automation absorbs variation: a new invoice layout or a differently phrased request keeps flowing.',
          },
          {
            q: 'What if the AI misreads a document?',
            a: 'A validation layer checks the result before it is registered: totals, formats, required fields. Doubtful cases go to a person, so review happens only where judgment is needed.',
          },
          {
            q: 'How much of the process actually gets automated?',
            a: 'It depends how many odd cases it has. The honest answer is to measure it: the system records what it resolves on its own and what it escalates to a person, and you see that share from the first month.',
          },
        ],
        cta: {
          heading: 'Which process is costing you hours?',
          body: 'Tell us your challenge. If we don’t see a return, we’ll tell you.',
          button: 'Tell us your challenge',
        },
      },
      conversational: {
        metaTitle: 'Conversational AI and Chatbot Development Services, Ideasforge',
        metaDescription:
          'Chatbot development services with production discipline: conversational AI for customer service, bookings and internal knowledge, on your channels and your systems.',
        hero: {
          eyebrow: 'Conversational AI',
          title: 'AI chatbots that finish the task',
          subtitle:
            'Chatbot development services for assistants that answer, qualify and act: bookings made, requests filtered and questions resolved on the systems you already run.',
          cta: 'Tell us your challenge',
        },
        stats: [
          { value: '+3 hours', label: 'a day saved handling incoming requests' },
          { value: 'Art. 9 GDPR', label: 'health data, the strictest category, in production' },
        ],
        sections: [
          {
            heading: 'What we build',
            paragraphs: [
              'AI chatbot development for the channels your customers already use: WhatsApp, web and internal tools. The assistant understands natural language, checks your real systems (calendar, CRM, database) and completes the task inside the conversation.',
              'The same engineering works inward: employees asking their own data or their company’s documentation and getting the answer in seconds.',
            ],
            link: { label: 'Assistant over your internal documentation', href: '/en/services/corporate-knowledge' },
          },
          {
            heading: 'AI chatbots for customer service',
            paragraphs: [
              'Customer service is where conversational AI pays back first. An assistant that answers the usual questions, qualifies the rest and escalates with full context turns waiting queues into instant response. Our real-estate client saves more than three hours a day on incoming requests; the team now only schedules visits.',
              'Escalation is part of the design: when the conversation needs a person, it reaches one, with the whole history attached.',
            ],
            link: { label: 'The real-estate case', href: '/en/real-estate' },
          },
          {
            heading: 'Wazzy: our own conversational product',
            paragraphs: [
              'We run our own product in production: Wazzy, a WhatsApp assistant that manages appointment bookings, changes and cancellations for clinics and service businesses. It checks real-time availability, updates calendar and records, and escalates urgencies to the team. Operating our own product keeps us sharp: every lesson lands back in client projects.',
            ],
            link: { label: 'Meet Wazzy', href: 'https://wazzy.io' },
          },
          {
            heading: 'A chatbot you can trust with health data',
            paragraphs: [
              'Wazzy handles health data, the most protected category under GDPR: field-by-field encryption, deletion aligned with clinical-record retention law, and internal records that cannot receive personal data. If your sector has compliance requirements, the discipline is already in place.',
            ],
            link: { label: 'How we handle data and compliance', href: '/en/gdpr-compliant-ai' },
          },
          {
            heading: 'Measured, not assumed',
            paragraphs: [
              'Conversational systems degrade quietly: a model update or a new document can change answers with no visible error. Every change runs against a test battery before shipping, and every conversation leaves a record that can be reconstructed.',
            ],
          },
        ],
        faqHeading: 'Frequently asked questions',
        faq: [
          {
            q: 'What is the difference between a chatbot and conversational AI?',
            a: 'A classic chatbot follows a script with buttons and breaks outside it. Conversational AI understands free text and decides among the available actions, so the same question phrased twenty ways lands in the same place.',
          },
          {
            q: 'Which channels does it run on?',
            a: 'WhatsApp through the official API, web, and internal tools. Wherever your customers or your team already are.',
          },
          {
            q: 'Can it book, change or cancel appointments on its own?',
            a: 'Yes. Our product Wazzy does exactly that in production: real-time availability, instant confirmation, calendar and records updated.',
          },
          {
            q: 'What about GDPR?',
            a: 'Covered, and in Wazzy’s case with health data, the strictest category: encryption, retention periods and deletion on request.',
          },
        ],
        cta: {
          heading: 'A conversational agent for your business?',
          body: 'Tell us your challenge. If we don’t see a return, we’ll tell you.',
          button: 'Tell us your challenge',
        },
      },
      cost: {
        metaTitle: 'How much does an AI agent cost, Ideasforge',
        metaDescription:
          'A custom AI agent typically costs €2,500 to €10,000 to build, plus €150 to €500 a month to operate. We break down what moves the number, where the monthly fee goes and what you own at the end.',
        hero: {
          eyebrow: 'Pricing guide',
          title: 'How much does an AI agent cost?',
          subtitle:
            'A custom AI agent built by Ideasforge typically costs between €2,500 and €10,000 to build, plus €150 to €500 a month to keep it running and measured. This page explains what moves the number, with real cost data from our systems in production.',
          cta: 'See what moves the price',
          ctaHref: '#factors',
        },
        stats: [
          { value: '5', label: 'systems in production behind these numbers' },
          { value: '145', label: 'annotated conversations gate every change to our appointments assistant' },
          { value: '~€0.05', label: 'cost of the weekly end-to-end test on a live system' },
        ],
        sections: [
          {
            heading: 'The short answer',
            id: 'answer',
            paragraphs: [
              'A single-job agent sits at the lower end of the range. One channel, one system to connect to and a clearly scoped task, like reading the invoices that arrive in a chat and turning each one into a normalized row. Building it starts around €2,500, and running it around €150 a month.',
              'The upper end belongs to agents that touch several systems and need deeper validation before going live, like an assistant that answers from your documentation and also queries live data. Those builds approach €10,000 and their operation sits in the upper part of the monthly range.',
              'Larger multi-agent systems, like a plant-floor assistant that routes each question to specialized sub-agents, fall outside these ranges and are quoted per project.',
            ],
          },
          {
            heading: 'What moves the price',
            id: 'factors',
            paragraphs: ['Four things explain almost every quote we send.'],
            bullets: [
              'How many systems it connects to. An agent that only answers questions is cheaper than one that also writes to your calendar, your CRM or your database, because every connected system needs its own permissions and its own tests.',
              'The state of your data. If the knowledge the agent needs lives in clean, readable sources, the model performs better and the build gets shorter. We usually gain more by ordering data and tools than by polishing instructions.',
              'How much proof you need before going live. Our appointments assistant Wazzy does not ship a change until a battery of 145 annotated conversations passes. Not every project needs that depth, and choosing it is part of the price conversation.',
              'Who operates it afterwards. The monthly fee covers watching the system in production, and the next section shows where that money actually goes.',
            ],
          },
          {
            heading: 'Where the monthly fee goes',
            id: 'operation',
            paragraphs: [
              'Every message a user sends triggers calls to the model provider, and those calls are the raw running cost of an agent. In Wazzy we meter that cost per layer: reading and structuring the incoming message takes 52 to 57 percent of the model spend, deciding what to do next takes 24 to 31 percent and writing the reply takes 16 to 19 percent.',
              'Knowing the split is what turns cost-cutting into a measurement instead of a gamble. In one of our systems we tried a cheaper model and the test battery vetoed it, because overall quality fell ten points.',
              'The rest of the fee pays for vigilance. Once a week we run a real conversation against the live system from end to end, at about five cents per run, and before any change ships a regression battery has to pass. Two rhythms, kept separate on purpose. The battery gates changes, and the weekly test watches what is already running.',
            ],
            link: { label: 'Why keeping AI alive is the hard part', href: '/en/blog/keeping-ai-alive' },
          },
          {
            heading: 'What you own at the end',
            paragraphs: [
              'The repository is in your name from day one and the infrastructure runs in a cloud account that belongs to you, not to us. If we part ways, the system stays yours, with its documentation and its history.',
              'That also explains what the fee does not include. You are not renting the agent, so the monthly cost is operation, not a license that stops working when you stop paying.',
            ],
            link: { label: 'How we build AI agents', href: '/en/ai-agent-development' },
          },
        ],
        faqHeading: 'Cost questions we hear most',
        faq: [
          {
            q: 'How much does an AI chatbot cost?',
            a: 'A support chatbot sits at the lower end of the range, from €2,500 of build, because it usually lives on one channel and draws on one knowledge source. The price climbs when it stops only answering and starts acting, booking appointments or updating records, because every action needs its own permissions and tests.',
          },
          {
            q: 'Why is there a monthly fee at all?',
            a: 'Because the model your agent runs on changes underneath it. Providers update models without changing their name, and a system that answered well yesterday can start failing quietly. The fee pays for the metering and the weekly test that catch it before your users do.',
          },
          {
            q: 'Can we run it without you afterwards?',
            a: 'Yes. Everything is yours, so you can take over whenever you want, and we run handover sessions when a client asks for them. Keep one thing in mind, though. Operating an agent means measuring it, and if nobody keeps measuring, failures turn silent.',
          },
        ],
        cta: {
          heading: 'Want a number for your case?',
          body: 'Tell us your challenge and we reply within 24 business hours. If we don’t see a return, we’ll tell you.',
          button: 'Tell us your challenge',
        },
      },
      compliance: {
        metaTitle: 'GDPR-Compliant AI Development, Ideasforge',
        tocHeading: 'What this page covers',
        metaDescription:
          'What GDPR-compliant AI means when a system actually ships: where data goes, isolation enforced in code, health data under Article 9 and the records your DPO will ask for. From five systems in production.',
        hero: {
          eyebrow: 'Data sovereignty',
          title: 'GDPR-compliant AI on infrastructure you own',
          subtitle:
            'We build AI agents for European companies whose data cannot leave their control. Everything runs in a cloud account under your name, isolation is enforced by code rather than by instructions to a model, and every decision is recorded so that someone can inspect it later. Written from five systems in production, and updated for the EU AI Act obligations that took effect on 2 August 2026.',
          cta: 'See how it is built',
          ctaHref: '#isolation',
        },
        stats: [
          { value: '5', label: 'systems in production built this way' },
          { value: 'Art. 9', label: 'GDPR health data handled in production, the strictest category' },
          { value: '4', label: 'layers of isolation between one company’s data and another’s' },
        ],
        sections: [
          {
            heading: 'What we do and what we do not',
          part: 'The short answer',
            paragraphs: [
              'We are engineers, not auditors. We do not certify your compliance, we do not issue legal opinions and we do not sign off on your risk classification. Those are jobs for your lawyers and your data protection officer, and any provider who offers to settle them for you in a sales call is offering something they cannot deliver.',
              'What we do is build the system underneath so that those people have something solid to assess. When your DPO asks where the data went, who could have seen it and why the assistant answered what it answered, the answer exists, is written down and can be shown. Most AI projects cannot do that, which is why so many of them stall the moment legal gets involved.',
              'This page explains, mechanism by mechanism, how our systems make those answers possible. It is written for the person who has to defend the project in front of a committee. If that is you, by the end you should know exactly which questions to put to us, or to anyone else bidding for the work.',
            ],
          },
          {
            heading: 'What GDPR-compliant AI actually means',
          part: 'What compliance means',
          kind: 'lattice',
            id: 'meaning',
            paragraphs: [
              'A GDPR-compliant AI system is one whose owner can answer three questions with evidence rather than assurances.',
            ],
            bullets: [
              'Where does personal data travel when someone uses the system, including every third party in the chain.',
              'Who can see what, and which piece of software enforces that boundary when someone pushes against it.',
              'Why did the system answer what it answered, reconstructed after the fact from records rather than from memory.',
            ],
          },
          {
            heading: 'Compliance is an architecture decision, not a paperwork one',
            paragraphs: [
              'The regulation itself never mentions artificial intelligence by name. It regulates personal data, and an assistant that reads invoices, books appointments or answers questions about your operations is soaked in personal data from the first day. So the same familiar principles apply, and each of them lands on a concrete engineering choice.',
              'Data minimisation stops being a policy line and becomes a question about context. A language model can only leak what it was given, so the real control is what enters the prompt in the first place. Purpose limitation becomes a question about tools. An agent that can only call three approved functions cannot quietly repurpose your data, because it has no path to do so. And accountability becomes a question about records. If the system cannot show why it did what it did, no policy document will show it either.',
              'This is why we say the paperwork is downstream of the architecture. A well-built system makes the DPA, the impact assessment and the register of processing activities faster to write and easier to defend, because every claim in those documents points at something that actually exists in the code. The reverse does not work. No amount of documentation makes an unaccountable system accountable.',
            ],
          },
          {
            heading: 'Two European rules, one architecture',
            paragraphs: [
              'A company deploying AI in Europe now answers to two regulations at once. The GDPR governs what may happen to personal data, whoever processes it. The AI Act sorts systems by the risk of their use, from banned practices to minimal risk, and hangs concrete duties on companies that deploy the risky ones, oversight, monitoring and logs among them. Its broad middle applies since 2 August 2026, with fines tiered up to 35 million euros or 7 percent of turnover at the top of the scale.',
              'We keep the full map of that second regulation on its own page, role by role and duty by duty, because it deserves the space. One piece belongs here, though, since it is about data rather than systems. In December 2024 the European Data Protection Board published Opinion 28/2024, its first word on AI models themselves, and two findings matter for a buyer. Whether a trained model is anonymous gets assessed case by case, and legitimate interest can only carry AI processing after a documented three-step assessment. Neither is a rubber stamp. Both reward providers who can show their homework, which is the posture this whole page describes.',
            ],
            link: { label: 'The full guide: EU AI Act compliance for deployers', href: '/en/eu-ai-act-compliance' },
          },
          {
            heading: 'Where your data actually goes',
          part: 'Where your data goes',
            id: 'infrastructure',
            paragraphs: [
              'The infrastructure runs in a cloud account that belongs to you, not to us, and the repository is in your name from the first day. We do not host your assistant on our side and hand you a login. This is unusual in the sector and it is deliberate, because it collapses a whole family of questions your DPO would otherwise have to chase. There is no second controller to map, no vendor database holding a copy of your records and no exit negotiation if we part ways. The system stays where it always was, with its documentation and its history.',
              'The only outbound path is the call to the model provider, the company that runs the language model itself. You approve which provider, under which agreement and with which settings, and you approve what is allowed to travel inside those calls. Nothing else leaves the account. Model providers sign data processing agreements, the contracts that bind a supplier to process data only on your instructions, and the serious ones offer European processing regions. Whether a given setup satisfies the rules on international transfers is your lawyers’ assessment to make. Our job is to hand them a complete map of what flows where, so the assessment takes days instead of months.',
              'Everything else in this page builds on that starting point. Isolation, records and health-data handling all assume the data already sits inside an account you control, because that is the only place from which the rest can be guaranteed.',
            ],
            link: { label: 'What it costs to build and run one', href: '/en/ai-agent-development-cost' },
          },
          {
            heading: 'What actually travels in a model call',
            paragraphs: [
              'Minimisation stops being abstract the moment you look inside one call. A request to a language model carries three things: the instructions that tell the model its job, the context it may use for this answer and the question the person just asked. That is the entire surface. The model never connects to your database, never browses your systems and never receives what the code did not put in the envelope.',
              'So the real engineering question is what the code puts in the envelope, and the answer should embarrass nobody. A well-built agent sends the few rows or paragraphs the person is entitled to, already filtered, rather than shovelling tables in and hoping the model quotes the right part. Sending less is safer. It also happens to be cheaper and more accurate, because a model reasons more reliably over one page of relevant material than over fifty pages of noise.',
              'When your DPO asks what the provider can see, the envelope is the answer, documented per use case. In our deployments that document is short, and more than one reviewer has been surprised by how little actually leaves. The assistant that answers production questions does not export your production database. It sends one person’s question and that person’s permitted slice of context, then throws the reply into the same records everything else goes through.',
            ],
          },
          {
            heading: 'So is using ChatGPT itself GDPR-compliant?',
            paragraphs: [
              'It is the question every committee asks first, and it is usually the wrong question, because "ChatGPT" names several different products with different data terms. A free browser tab, a paid workspace subscription and an API contract, the machine-to-machine interface a system like ours calls, are three different legal surfaces. Terms about training, retention and European processing differ across them, and they change over time, so a blanket yes or no printed on this page would be worthless the month after we wrote it.',
              'The useful question is which surface your data enters and under which agreement. An employee pasting a customer email into a free consumer tool is one situation. A system calling an API under a signed data processing agreement, in a European region, with training excluded and with only a filtered context in the envelope, is a different situation entirely, even when the model underneath carries the same name. Your lawyers assess the agreement. We build the second situation, and we hand them the evidence that it is what actually runs.',
              'This is also why a company that bans AI tools outright often ends up with less control, not more. The demand does not disappear, it moves to personal accounts and phones where no agreement, no logging and no filter applies. A sanctioned assistant with the right architecture gives people the capability inside a perimeter someone actually governs.',
            ],
          },
          {
            heading: 'AI data sovereignty, without the slogan',
            id: 'sovereignty',
            paragraphs: [
              'Data sovereignty gets used as a marketing word, so it is worth pinning down. It means that the location of your data, the keys that open it and the identity system that says who is who all answer to you, under a jurisdiction you chose. Location alone does not get you there. A system whose data sits in Frankfurt but whose access keys, admin accounts and logs belong to a vendor is sovereign in the brochure and nowhere else.',
              'There is a spectrum, and honesty about it beats slogans. At one end sits shared software where your data lives in someone else’s multi-tenant product under their terms. Then comes running in a European region of a large cloud, then a cloud account of your own, then your own servers in your own building. Each step buys control and costs convenience. We build in the third position by default, your own cloud account, because it delivers the control that matters, ownership of data, keys and identity, without asking your team to run physical machines.',
              'The honest paragraph, and the one most providers skip. The application we build runs entirely inside infrastructure you own. The language model itself usually does not, because we call it as a service from the provider you approve. Running an open model on your own hardware would close that last gap, and it is a different project with different costs and different quality trade-offs. We have not deployed open models in production, so we will not sell you that experience as if we had it. If full on-premise inference is a hard requirement for you, say so in the first conversation, because it changes the architecture from the foundations up.',
              'Questions about third-country access statutes, the American ones included, belong in that same first conversation. They are legal terrain and your counsel will have a view. What we control is the engineering that determines how much there is to worry about, which is the subject of the next two sections.',
            ],
          },
          {
            heading: 'Isolation that does not depend on the model behaving',
          part: 'How isolation is enforced',
          kind: 'checklist',
            id: 'isolation',
            paragraphs: [
              'An early version of one of our assistants kept companies apart by telling the model, in its instructions, never to omit a filter. It worked in every test we ran. It was still wrong, because an instruction to a language model is a request, and a model can fail to honour a request for reasons nobody can predict from outside. We have described that lesson to clients as the difference between a guarantee and a polite request, and it reshaped how we build. Security has to hold even when the model fails.',
              'Today, in the agent that answers questions about live business data for several companies at once, the separation is enforced in four places, and the model is not one of them.',
            ],
            bullets: [
              'The context, the information the model is allowed to read while answering, only ever contains what the person asking is entitled to see. The assistant cannot leak what it never held, and it cannot even formulate a question about a company that does not exist in its world.',
              'Name matching is confined to the sites that person is authorised for. When someone types a misspelt site name, the correction can only land inside their own perimeter, so a near-miss cannot drift into a neighbouring company.',
              'Code validates every request against an allow-list, a closed list of permitted values, before any query is built. The model proposes, the code decides.',
              'The final query carries an unconditional filter. If the permission list ever arrives empty, the query resolves to a condition that matches nothing. Failure closes the door instead of opening it.',
            ],
          },
          {
            heading: 'When we fixed the architecture, a whole class of bugs died',
            paragraphs: [
              'Layers are good. Changing the ground so the failure cannot exist is better, and one of our systems shows the difference. Its isolation originally worked by filtering, every query carrying a condition that said which company’s rows were allowed. We later rebuilt the data store so that each company lives in its own schema, its own sealed compartment inside the database, and the combined view joins them with the company stamped onto every single row. After that change, adding two companies into one figure stopped being a bug that a filter must catch and became a query that cannot be written.',
              'The practical effect showed up immediately. A fuzzy name comparison that had been a genuine security worry under the filtering design simply stopped mattering, because even a wrong match could no longer cross a schema boundary. Fixing the architecture killed the entire class of failures, not one instance of it. That is the standard we aim for wherever the data allows it, and it is a useful question to ask any provider. Which failures are impossible in your design, rather than merely caught.',
            ],
          },
          {
            heading: 'The model is never the authority',
          diagram: true,
            paragraphs: [
              'Our systems share one design rule. Judgment lives in the code, interpretation of the world lives in the model, and knowledge lives in the data. The model reads a person’s question and hands over a structured form, a contract in a fixed format whose fields we defined in advance. Code validates that form, checks the permissions of whoever is asking and decides what actually happens. The queries that touch your data are built by the code from the validated form, with values passed as parameters and column names drawn from a closed list, never assembled from text the model wrote.',
              'Where records matter most we go a step further. In one of our assistants the model does not even return the text that ends up in front of the user. It returns a key, an identifier, and the code looks up the canonical text that key points to. What the person reads is guaranteed to be what was approved, word for word, no matter what the model generated around it.',
              'Identity follows the same rule. When an assistant queries an internal system on someone’s behalf, it carries that person’s own identity token, the credential your systems already use to know who is asking. Every downstream call runs with the permissions of the human, not with the broad permissions of a robot account. If the person cannot open a record by hand, the assistant cannot open it for them. A whole family of GDPR access questions dissolves at that point, because the access model of the assistant is the access model your company already audited.',
            ],
            link: { label: 'Why we distrust agentic architectures, in detail', href: '/en/blog/i-dont-like-ai-agents' },
          },
          {
            heading: 'Health data, under the strictest article there is',
          part: 'What it looks like in practice',
            paragraphs: [
              'Wazzy, our own appointments product, runs in dental, physiotherapy and aesthetics clinics. An appointment note that says who visits which clinic and why is health data, which the GDPR places in its most protected category and permits us to process under Article 9.2.h, the ground that covers healthcare provision. We did not choose the hardest category to make a point. The product needed it, and the result is that our practices were shaped by the strictest case first.',
              'Every sensitive field is encrypted on its own, with AES-256-GCM, rather than relying on the disk being encrypted underneath. The difference matters in practice. Disk encryption protects you if someone steals the hardware, while field-level encryption protects the data from every process and person that touches the database in normal operation. Deletion is designed against the law rather than against instinct, because Spanish clinical-record law requires keeping medical history for five years. A deletion request must honour the patient without quietly breaking a legal retention duty, so the system separates what is erased now from what is retained under obligation, and can show which is which.',
              'We built all of that because we had to. It is the reason this page can speak from experience rather than from a checklist, and it is the standard the rest of our client work inherits.',
            ],
          },
          {
            heading: 'The person on the other side is told, and can reach a human',
            paragraphs: [
              'Compliance talk tends to fixate on databases and forget the person typing. Two duties meet there. The GDPR expects honesty about how personal data is used, and the AI Act, in the obligations that apply since August 2026, requires that people be told when they are interacting with a machine. Neither duty is exotic to implement, but both are easy to fail by omission, one vague welcome message at a time.',
              'Our conversational systems present themselves as what they are, and the escalation path is part of the design rather than an apology. In Wazzy, our appointments product, an urgent case does not get a soothing paragraph from a model. It gets escalated to the clinic’s staff, because a machine that recognises its limit and hands over is safer than one that improvises confidence. The same shape repeats in our client work. The assistant does the repetitive volume, and the moments that need a human reach a human, with the conversation’s trail attached.',
              'There is a quieter benefit. When the handover is designed, the humans behind the assistant stop being a fiction in the privacy policy and become an actual queue with actual owners, which is exactly the kind of claim an authority can verify and find true.',
            ],
          },
          {
            heading: 'What we record, and what we cannot record',
            id: 'records',
            paragraphs: [
              'Record the decision, not only the result. Every meaningful step is written down, what the assistant understood, what it asked for, what the validator rejected and why. The log is append-only, meaning entries can be added but never edited or removed, and the system never reads it back during execution, so it cannot influence an answer even in principle. It exists for one purpose, to be inspected afterwards by someone with a question. That someone might be your DPO, an auditor or a supervisory authority, and the answer they get is the record of what happened, not a reconstruction from memory.',
              'The telemetry, the technical measurements the system sends home about its own health, works the other way round. It runs on an allow-list, so a field that is not explicitly on the list cannot be transmitted at all. The internal records are structurally unable to receive personal data. Not "we try not to log it", but "the field is not on the list, so it cannot arrive". When a regulator asks what your monitoring collects, the answer is a short, closed list rather than an investigation.',
              'Even expiry is designed to be visible. Access tokens, the temporary credentials that prove who is asking, die after about an hour, and re-running an old request with a dead token produces a clear 401 error instead of silently borrowing fresher credentials. We would rather a system fail loudly and honestly than succeed in a way nobody can account for. A new and visible error is a better posture than a comfortable silence.',
            ],
          },
          {
            heading: 'What your DPO will ask us, and what we hand over',
          part: 'What you get, and what to ask',
          kind: 'lattice',
            id: 'dpo',
            paragraphs: [
              'Buying AI in Europe now involves a predictable review. Legal and the DPO will want a data protection impact assessment, the structured study of what could go wrong for the people whose data is processed, and they will want a data processing agreement with every supplier in the chain. We do not run that review, it is theirs to run. We shorten it, because the inputs it needs are things our systems produce anyway.',
            ],
            bullets: [
              'A data-flow map: which data enters the system, where it is stored, which calls leave the account and what travels inside them.',
              'The list of suppliers underneath the system, starting with the model provider you approved, with the agreements that govern each one.',
              'Retention and deletion, as configured: what is kept, for how long, what a deletion request touches and what it lawfully must not touch.',
              'The isolation design in writing, from the four enforcement layers to what the model can and cannot see.',
              'The records themselves: the decision log, the allow-listed telemetry and how both are consulted when someone asks a question.',
            ],
          },
          {
            heading: 'How we keep it true after launch',
            paragraphs: [
              'A compliance story that was true at launch and unmeasured afterwards is a story, and the ground under these systems moves. Model providers update models without changing their names, your documentation grows and your data drifts. So we run two rhythms, kept deliberately separate. Before any change ships, a regression battery, a bank of real annotated cases the system must answer correctly, blocks the release if quality drops. And once a week, on the live system, we run a real conversation from end to end and check what actually happened.',
              'This is the same discipline that catches a model quietly getting worse, applied to the promises on this page. The isolation, the records and the refusal behaviours are tested like features, because that is what they are. When your DPO asks in March whether the guarantees from the September review still hold, the honest answer is a test result, not a shrug.',
            ],
            link: { label: 'Why keeping AI alive is the hard part', href: '/en/blog/keeping-ai-alive' },
          },
          {
            heading: 'Eight questions to put to any provider, including us',
          kind: 'checklist',
            paragraphs: [
              'The introduction promised you would leave knowing what to ask. These are the questions we would ask in your chair, in the order that exposes the most.',
            ],
            bullets: [
              'In whose cloud account does the system run, and what happens to it the day we stop working together.',
              'What exactly leaves that account in a model call, shown for our concrete use case rather than in general terms.',
              'Which pieces of software enforce isolation, and does any of them consist of an instruction to the model. Ask for the honest history of that answer.',
              'What does the system do when a permission list arrives empty, fail open or fail closed.',
              'Show me the decision log for one real interaction, and tell me who can edit it. The correct answer to the second half is nobody.',
              'What can your telemetry physically receive, a closed list or whatever the code happens to send.',
              'What gates a release, and what watches the live system between releases. Two different answers, or it is one answer pretending to be two.',
              'Who owns the repository, today, not at the end of a payment plan.',
            ],
          },
          {
            heading: 'Where this shows up in what we build',
          kind: 'lattice',
            paragraphs: [
              'This page is not a separate product and you cannot buy it on its own. It is how the four things we build are built, and each one meets the question from a different angle.',
            ],
            bullets: [
              'Assistants over internal documentation, where the work is making sure a person only ever retrieves the documents their role allows.',
              'Agents that query live business data, where isolation between companies has to hold at the level of the query, not the prompt.',
              'Workflow automation over documents, where the record of what was extracted, validated and rejected is the audit trail.',
              'Customer-facing chatbots, where the data subject is a person who did not choose to talk to a machine, and deserves the strictest handling of all.',
            ],
          },
        ],
        faqHeading: 'What clients ask before legal gets involved',
        faq: [
          {
            q: 'Is it even allowed to use a US-based model provider under GDPR?',
            a: 'That assessment belongs to your lawyers, and serious providers give them real material to work with: data processing agreements, European processing regions and no-training commitments. What we control is the engineering side of the question, which data ever travels in a model call, and we keep that surface as small as the use case allows and documented field by field. Many of our deployments send far less than people assume, because the model often works on a question and a permitted context rather than on your database.',
          },
          {
            q: 'Does our data train anyone’s model?',
            a: 'Not with the providers and settings we deploy. Model calls run under agreements and configuration that exclude training on your content, and the choice of provider is yours to approve. If a provider ever changes those terms, that is a decision you get to take with full information, not one we take for you.',
          },
          {
            q: 'Can this run entirely on our own servers?',
            a: 'The system we build can, and does, run in infrastructure you own. The model is the part to be honest about. We call models as a service from providers you approve, we have not deployed open models in production, and we will not sell that experience as if we had it. Raise the requirement before anything is quoted and we will tell you plainly what it would take.',
          },
          {
            q: 'Do we need a DPIA for an AI assistant?',
            a: 'Quite often yes, and always when the processing is large in scale or touches special categories like health data. The call is your DPO’s to make, not ours. What we change is the cost of making it. The technical half of a DPIA is a description of data flows, risks and safeguards, and our systems produce that description from what is actually built rather than from interviews and guesswork.',
          },
          {
            q: 'What does the EU AI Act change for us in practice?',
            a: 'For most deployers it changes what you must be able to demonstrate: logs the system kept about itself, human oversight that actually functions, and knowledge of what data went in. Whether your specific use is high-risk is a legal classification and we stay out of it. The engineering consequence is simpler, systems that record their decisions from day one are cheap to defend, and systems that do not are expensive to retrofit. Ours record from day one.',
          },
          {
            q: 'What happens when someone asks the assistant for data they should not see?',
            a: 'Nothing dramatic, which is the point. In one of our agents the columns about individual people’s hours and absences exist in the database and are simply not exposed to the assistant, so the question cannot be answered from what it holds. The refusal is built into what the system can reach, not into a phrase in its instructions, and the attempt is recorded like any other decision.',
          },
          {
            q: 'Which model providers do you work with?',
            a: 'More than one, and the choice is yours to approve. Our systems in production run on more than one provider, Gemini among them, because different projects justified different calls. We are not a reseller for anyone, so the recommendation follows the use case, the agreement on offer and where the data may travel, in that order.',
          },
          {
            q: 'Our people already paste things into chatbots. Does building an official assistant make that worse?',
            a: 'In our experience it points the other way. The pasting happens because people need the capability and have no sanctioned place to get it, so the data flows through personal accounts nobody governs. An official assistant with a filtered context, an approved provider and real records gives them a better tool inside a perimeter your DPO can actually describe. Policy alone rarely wins that fight. A better option usually does.',
          },
          {
            q: 'Who owns the code?',
            a: 'You do, from day one. Repositories, documentation and architecture are yours, in a cloud account under your name. There is no black box and no lock-in, and if we stop working together the system does not notice.',
          },
        ],
        cta: {
          heading: 'Does your data have to stay where it is?',
          body: 'Tell us your challenge and we reply within 24 business hours. If we don’t see a return, we’ll tell you.',
          button: 'Tell us your challenge',
        },
      },
      aiAct: {
        tocHeading: 'What this page covers',
        metaTitle: 'EU AI Act Compliance for Companies That Deploy AI, Ideasforge',
        metaDescription:
          'What the EU AI Act asks of a company that deploys AI: roles, the eight high-risk domains, Article 26 duty by duty, logs, oversight and a first pass you can run this week. Written by engineers, not lawyers.',
        hero: {
          eyebrow: 'EU AI Act',
          title: 'EU AI Act compliance, for companies that deploy AI',
          subtitle:
            'Most companies are deployers under the EU AI Act, and for them the regulation is a list of things they must be able to demonstrate: oversight that works, logs that exist and knowing what their systems do. The heaviest obligations apply since 2 August 2026. This guide walks the whole map in plain terms, written by engineers who build systems that have to survive these reviews, not by lawyers selling the review.',
          cta: 'Start with the short version',
          ctaHref: '#short',
        },
        stats: [
          { value: '2 Aug 2026', label: 'the date the broad middle of the Act, deployer duties included, became applicable' },
          { value: '6 months', label: 'minimum retention for the logs a high-risk deployer must keep under its control' },
          { value: '3%', label: 'of worldwide turnover, the fine bracket most company breaches fall into, with 7% reserved for prohibited practices' },
        ],
        sections: [
          {
            heading: 'Who this page is for, and who wrote it',
            part: 'The short answer',
            paragraphs: [
              'This page is for the people inside a company who have been handed the question "are we fine under the AI Act" and need to give an answer with structure. It maps the regulation from the point of view of a deployer, the legal word for a company that uses AI professionally rather than building it for the market, because that is what most companies are.',
              'It is written by engineers. We build AI agents that run inside European companies, which means our work sits on the receiving end of these reviews, and we are Spanish, so our national supervisor is AESIA, the first dedicated AI authority in Europe. What follows is the map we wish every client had before the first meeting. It is not legal advice, we do not classify your risk and the calls that need a lawyer are marked as such throughout.',
              'If you want the deeper story of how our systems handle data, isolation and records, that lives in our page on GDPR-compliant AI, which this guide extends on the AI Act side.',
            ],
            link: { label: 'The pillar this guide extends: GDPR-compliant AI', href: '/en/gdpr-compliant-ai' },
          },
          {
            heading: 'The whole Act in six sentences',
            id: 'short',
            part: 'The short answer',
            kind: 'lattice',
            paragraphs: [
              'Everything below unpacks these six statements. If you only remember six things, make them these.',
            ],
            bullets: [
              'The Act follows the market, not your address. If your system or its output is used in the Union, you are in scope, headquartered wherever you like.',
              'It sorts systems by risk into four levels: prohibited, high, limited and minimal. Your duties depend on the level, not on how advanced the technology is.',
              'Roles decide everything else. Providers build and place systems on the market, deployers use them, and most companies reading this are deployers.',
              'Deploying a high-risk system triggers Article 26, a concrete list of duties around oversight, input data, monitoring and logs.',
              'The calendar has already happened. Bans and AI literacy since February 2025, general-purpose model rules since August 2025, the broad middle since August 2026.',
              'Fines are tiered, up to 35 million euros or 7 percent of turnover for prohibited practices and up to 15 million or 3 percent for most other breaches.',
            ],
          },
          {
            heading: 'Four risk levels, and where normal companies land',
            part: 'The map of the law',
            paragraphs: [
              'The Act does not regulate artificial intelligence as a substance. It regulates uses, sorted by how much damage a failure could do to a person’s rights, safety or livelihood. A short list of practices is prohibited outright, social scoring and manipulative techniques among them. A defined set of uses is high-risk and carries the heavy machinery of the regulation. A middle band carries transparency duties, telling people they are dealing with a machine. Everything else is minimal risk and carries almost nothing.',
              'General-purpose models, the large models systems like ours call as a service, sit on a separate axis with their own obligations for the companies that train and provide them. That axis is mostly the provider’s problem, not yours, but it matters when you buy, because the documentation your integrator receives from the model provider feeds the file you may one day show an authority.',
              'Here is the honest orientation most guides bury. An internal assistant that answers questions about documentation, a chatbot that books appointments or an agent that reads invoices lands, in most configurations, in the limited or minimal band. The heavy regime is triggered by domain, not by sophistication. The moment AI touches hiring, credit, education, essential services, biometrics or the other domains in the Act’s Annex III, the same underlying technology becomes high-risk with everything that follows. Which band your concrete use falls into is the first question for your lawyers, and the next sections give you the vocabulary for that conversation.',
            ],
          },
          {
            heading: 'The separate axis, general-purpose models',
            part: 'The map of the law',
            paragraphs: [
              'The large models that systems like ours call as a service live under their own chapter, in force since August 2025 for the companies that provide them. Providers of general-purpose models owe technical documentation, information to the companies building on top, a copyright policy and a summary of the content used for training, and the handful of models classed as systemic risk owe more on top of that.',
              'Little of it is your duty as a deployer, and all of it is your business as a buyer. The documentation a model provider publishes flows downhill into your compliance file, because the description of your system leans on the description of the model underneath. When we assemble the file for a client, the model provider’s terms and documentation go in it, which is one more reason the choice of provider is approved by you rather than defaulted by us.',
              'The practical ask is short. Whoever sells you anything built on a large model should be able to name the model, point at its provider’s AI Act documentation and show what of your data reaches it. If any of those three draws a blank, the gap is yours to carry.',
            ],
          },
          {
            heading: 'The calendar already happened',
            part: 'The map of the law',
            kind: 'checklist',
            paragraphs: [
              'The Act entered into force in August 2024 and has been switching on in stages. Every date below is in the past, which is worth letting sink in, because a surprising number of companies still file the whole subject under "future".',
            ],
            bullets: [
              'Since 2 February 2025. The prohibited practices became illegal, and Article 4 began requiring AI literacy, meaning staff who work with AI systems must be trained to a level appropriate to their role. This applies to every AI system, high-risk or not.',
              'Since 2 August 2025. The obligations for providers of general-purpose models apply, including the regime for models with systemic risk. If you deploy systems built on large models, your providers have been under duties for a year.',
              'Since 2 August 2026. The broad middle of the regulation applies, including Article 26 for deployers of high-risk systems and the Article 50 transparency duties, like telling people they are interacting with a machine.',
              'Through 2027. The remaining tranche arrives for high-risk AI embedded in products already covered by EU safety law, medical devices and machinery among them, with its own dates.',
            ],
          },
          {
            heading: 'The fines, and who actually gets inspected',
            part: 'The map of the law',
            paragraphs: [
              'The penalty structure is tiered like the GDPR’s. Prohibited practices reach 35 million euros or 7 percent of worldwide turnover, whichever is higher. Most other breaches, deployer duties included, reach 15 million or 3 percent. Supplying misleading information to authorities has its own lower tier. Which bracket a concrete failure lands in is a legal question, and the honest answer to "how likely is an inspection" is that nobody selling you certainty deserves your trust.',
              'What can be said with evidence is who is watching. Each member state names its market surveillance authority, and ours is a useful preview of the breed because it moved first. AESIA, the Spanish agency created by Royal Decree 729/2023, was the first dedicated national AI supervisor in Europe, has held full sanctioning powers since August 2025 and published sixteen compliance guides within months of the regulation biting. Its public posture through 2026 has been warnings before sanctions, and it has already opened preliminary investigations into systems deployed by Spanish organisations. The window in which nobody was looking is closing on schedule, not with a bang.',
              'The practical consequence for a buyer is timing. Building demonstrability into a system while it is being built costs little, and we know because it is how we work anyway. Retrofitting it under an authority’s deadline is the expensive version of the same project.',
            ],
          },
          {
            heading: 'Is it even an AI system under the Act?',
            part: 'Which box you are in',
            paragraphs: [
              'Committees lose real time here, so settle it early. The Act defines an AI system through seven elements, and the load-bearing one is inference: a machine-based system, operating with some autonomy, that infers from its input how to generate outputs like predictions, recommendations or decisions. The European Commission published guidelines on this exact definition in February 2025, precisely because every company asked the same question.',
              'The practical reading is narrower than the panic. A calculator, a fixed spreadsheet formula or a rules engine that applies the same written logic every time does not infer, and generally falls outside. A system that learns patterns, ranks candidates, scores risk or generates text does infer, and is in. The borderline cases exist, they belong to counsel, and the reasoning is worth writing down either way.',
              'For anything built on a language model the question answers itself, models infer, that is their entire job. So we never spend a client’s money arguing that an agent is not AI. We spend it building the agent so that the duties that follow are already met.',
            ],
          },
          {
            heading: 'Provider or deployer, the question that decides your duties',
            part: 'Which box you are in',
            paragraphs: [
              'Two roles carry almost all of the weight. A provider develops an AI system, or has one developed, and places it on the market under its own name. A deployer uses an AI system professionally, under its own authority, for its own purposes. The provider owes the design-side duties, conformity, documentation and registration where it applies. The deployer owes the use-side duties, and they are the subject of this guide.',
              'A bank that buys a credit-scoring system from a vendor is a deployer, with duties about oversight, monitoring and logs. The vendor is the provider, with duties about how the system was built and documented. The same split repeats down the market: the clinic using an appointment assistant, the manufacturer using a diagnostic aid and the gestoría running document extraction are deployers of those systems, whoever built them.',
              'When we build a custom agent for a client, the question of who counts as provider of that specific system is exactly the kind of boundary a contract should fix in writing rather than leave to vibes. We flag it in the first conversation, our lawyers and yours settle the wording, and the engineering side of the answer, who documents what, who keeps which records, is designed in rather than argued about later.',
            ],
          },
          {
            heading: 'How a deployer becomes a provider without noticing',
            part: 'Which box you are in',
            paragraphs: [
              'The roles are not permanent labels. The Act moves a deployer into the provider seat when it puts its own name or trademark on a high-risk system, when it substantially modifies one, or when it changes a system’s intended purpose into high-risk territory. The third one is the quiet trap, because intended purpose sounds like marketing language and is actually the load-bearing concept of the whole regulation.',
              'Concretely. A company that licenses a general document assistant and turns it into a tool that screens job applications has changed the purpose into an Annex III domain, and with it, possibly, its own role. A company that rebadges a vendor’s system as its own product has walked into provider duties by branding. None of this outlaws customisation, it prices it, and the price is documentation and duties that someone must consciously accept.',
              'Whether any specific modification is "substantial" is a legal judgment. Our contribution is narrower and earlier. Systems built with a written intended purpose, a record of what changed and logs of what the system actually does give your lawyers the raw material to make that judgment cheaply. Systems assembled informally give them nothing to work with, and the default answer of a careful lawyer holding nothing is the expensive one.',
            ],
          },
          {
            heading: 'Annex III in plain terms, the eight domains',
            part: 'Which box you are in',
            kind: 'lattice',
            paragraphs: [
              'High-risk by domain means the Act lists where the stakes are high enough for the heavy regime. Annex III names eight areas. If your use of AI touches one of them, assume high-risk until your lawyers conclude otherwise.',
            ],
            bullets: [
              'Biometrics: identification, categorisation of people and emotion recognition, with the narrow exceptions the Act itself carves.',
              'Critical infrastructure: safety components in traffic, water, gas, heating and electricity.',
              'Education and training: admission, evaluation, level placement and exam surveillance.',
              'Employment and worker management: recruitment, screening, promotion, termination, task allocation and performance monitoring.',
              'Essential services: creditworthiness and credit scoring, insurance risk and pricing for life and health, public benefits and emergency dispatch.',
              'Law enforcement, covering the uses police and prosecutors may make of AI about people.',
              'Migration, asylum and border control, from risk assessments to application processing.',
              'Justice and democracy, assisting courts in interpreting facts and law or influencing elections.',
            ],
          },
          {
            heading: 'The escape hatch, and the trap inside it',
            part: 'Which box you are in',
            paragraphs: [
              'Article 6(3) opens a narrow exit. A system that lands in an Annex III domain may still avoid high-risk status when it only performs a narrow procedural task, improves the result of a human activity that is already complete, or detects patterns without replacing human judgment. A tool that formats interview notes touches employment and plainly is not deciding anyone’s career.',
              'Two conditions guard the exit. The exemption must be documented, a written assessment of why the system qualifies, produced before you rely on it rather than after someone asks. And profiling slams the door shut. A system in an Annex III domain that profiles people, in the GDPR sense of evaluating aspects of their life like performance, reliability or economic situation, is always high-risk, whatever else it does.',
              'Our advice as builders is unglamorous. Decide which side of this line a system is meant to live on before it is built, write that intention down and design the data flows so the system cannot quietly drift across. Drift is the real risk here, a helpful tool that gains one feature per quarter until it is doing the thing nobody classified.',
            ],
          },
          {
            heading: 'Article 26, duty by duty',
            id: 'article-26',
            part: 'What deployers must do',
            kind: 'checklist',
            paragraphs: [
              'If a system you deploy is high-risk, Article 26 is your list. In plain terms, duty by duty, this is what it asks.',
            ],
            bullets: [
              'Use the system as the provider’s instructions say. The instructions of use stop being a leaflet nobody reads and become the reference an authority measures you against.',
              'Assign human oversight to named people with the competence, training and authority to act, including the authority to not use the system’s output. A name in a document with no power to intervene does not satisfy this.',
              'Keep your input data relevant and sufficiently representative, to the extent you control it. Feeding a scoring system data it was never designed for is a deployer failure, not a provider one.',
              'Monitor the system’s operation against those instructions, and tell the provider, and where required the authorities, when you see risk or serious incidents.',
              'Keep the automatically generated logs that are under your control for at least six months, longer where other law says so. No logs, no defence.',
              'Tell workers and their representatives before putting a high-risk system over them at the workplace. Quietly switching on monitoring is its own breach.',
              'Use the provider’s information to run your data protection impact assessment where one is due. The two regulations meet exactly here.',
              'Cooperate with the market surveillance authority when it comes asking, which folds every duty above into one practical question, can you show your homework.',
            ],
          },
          {
            heading: 'The extra step some deployers owe, a rights assessment',
            part: 'What deployers must do',
            paragraphs: [
              'Article 27 adds one more duty for a defined group. Deployers that are public bodies, private companies providing public services, and deployers using high-risk systems for credit scoring or for risk and pricing in life and health insurance must run a fundamental rights impact assessment before first use. It is what it sounds like, a structured look at which rights the system could touch, who is exposed, and what happens when it goes wrong.',
              'The Act allows leaning on work already done. A deployer may rely on an assessment the provider carried out, or on an existing impact assessment that covers the ground, which in practice means the exercise overlaps heavily with the DPIA your data protection officer already knows how to run. Same discipline, wider lens.',
              'Our role in it stays the same as everywhere else on this page. The assessment is yours to run and sign. The description of the system it needs, what it does, what enters it, who oversees it and what gets recorded, is the file our systems produce as a side effect of being built.',
            ],
          },
          {
            heading: 'AI literacy is already mandatory, for everyone',
            part: 'What deployers must do',
            paragraphs: [
              'Article 4 is the obligation companies keep missing because it looks soft. Since February 2025, providers and deployers must ensure a sufficient level of AI literacy in the people who operate and use AI systems on their behalf, proportional to their role and the context. It applies to every AI system, high-risk or not, which makes it the one duty in the Act that almost certainly applies to you today.',
              'Sufficient is not defined as a certificate, and the point is not sending everyone to a course. The person approving model outputs should understand what a model can and cannot be trusted with. The person operating an assistant should know what it must never be fed. The person overseeing a high-risk system needs enough depth to justify overriding it. Training that maps to roles, written down, with dates, is both the legal expectation and the cheapest risk reduction on this entire page.',
              'It is also, quietly, a procurement question. Ask any vendor what material they hand your team for this, because a supplier whose answer is a shrug is planning for your people to misuse their system.',
            ],
          },
          {
            heading: 'Telling people they are talking to a machine',
            part: 'What deployers must do',
            paragraphs: [
              'The transparency duties in Article 50 apply since August 2026 and they are refreshingly concrete. People interacting with an AI system must be informed they are doing so, unless it is obvious from context. Synthetic audio, image and video content must be marked as artificially generated. Deployers of emotion recognition or biometric categorisation must inform the people exposed to them.',
              'For the systems most companies actually run, this reduces to honest interface design. The assistant introduces itself as an assistant, the generated report says it was generated and the escalation path to a human is real. We covered how our own conversational systems present themselves and hand urgent cases to staff on the sovereignty page, and the same design serves this article without modification. Duties that are cheap to meet when designed in, and embarrassing to meet retroactively, are a pattern by now.',
            ],
            link: { label: 'How our systems present themselves and escalate', href: '/en/gdpr-compliant-ai' },
          },
          {
            heading: 'Most of Article 26 is an engineering property',
            part: 'How it lands in a real system',
            paragraphs: [
              'Read the duty list again with an engineer’s eye and it decomposes into three system properties. Things the system must produce about itself, logs and records. Things a human must be able to do to it, inspect, intervene and override. And things it must never silently change, its purpose and its inputs. None of the three can be added convincingly after the fact, all three are cheap when they are design decisions.',
              'This is where our practice happens to line up with the regulation, not because we built for the Act but because production forced the same conclusions earlier. Our systems write down each decision as it happens, in a record that can be added to but never edited, and the system itself never reads that record back, so it documents behaviour without influencing it. Oversight is not a name in a file. The people behind our assistants get real queues with real trails, and every action a system takes on someone’s behalf runs under that person’s own permissions, so the question "who could have done this" always has an answer your identity system already knew.',
              'Monitoring, the duty that sounds vaguest, is the one we can show most concretely. Before any change ships, a battery of real annotated cases must pass, and one of our systems carries 118 of them. After shipping, a weekly probe runs a real conversation against the live system end to end. Two rhythms, deliberately separate, and together they are precisely the "monitor the operation of the system" evidence Article 26 asks a deployer to have.',
            ],
            link: { label: 'The records, isolation and identity design in full', href: '/en/gdpr-compliant-ai' },
          },
          {
            heading: 'What we hand you for the AI Act file',
            part: 'How it lands in a real system',
            kind: 'lattice',
            paragraphs: [
              'When a system we built enters your compliance review, these artefacts exist because the build produced them, not because someone reconstructed them for the meeting.',
            ],
            bullets: [
              'A written intended purpose for the system, the sentence every classification question starts from.',
              'The technical description of what it does, which data enters it and which calls leave it, per use case.',
              'The oversight design: which humans can inspect, intervene and stop what, and through which interface.',
              'The decision log and how to consult it, with retention configured to your obligations, six months being the floor for high-risk deployers.',
              'The evaluation evidence, meaning the battery of cases that gates each release and the weekly probe that watches the live system.',
              'The supplier chain under the system, starting with the model provider you approved and the terms that bind them.',
            ],
          },
          {
            heading: 'A first pass you can run this week',
            part: 'What to do now',
            kind: 'checklist',
            paragraphs: [
              'None of this requires a consultant to start. A competent internal owner with a spreadsheet gets a company from "no idea" to "mapped, with open questions for counsel" in days, and the open questions come out sharp instead of vague.',
            ],
            bullets: [
              'Inventory every AI system in professional use, including the ones that arrived inside other products, the copilots, the scoring module in the HR suite, the chatbot in the support desk. Shadow tools count, because the Act does not care that procurement never saw them.',
              'Assign a role per system, provider or deployer, and note who else sits in the chain. Most entries will read deployer, and the exceptions are where your lawyers should look first.',
              'Screen each system against the eight Annex III domains. Anything that touches one gets flagged, and anything flagged either goes to counsel or gets a documented Article 6(3) assessment, written now, not when asked.',
              'Name the oversight for anything plausibly high-risk, real people with authority to override, and check they would pass the literacy bar for their role.',
              'Verify the paper: instructions of use from each provider, worker information where systems touch the workplace, and logs, switched on, retained, and readable by someone.',
              'Put the vendor questions in writing, what is the intended purpose, what documentation accompanies the system, what will you give us for oversight, literacy and logging. A vendor who answers slowly has told you something too.',
            ],
          },
          {
            heading: 'Where this sits in the bigger picture',
            part: 'What to do now',
            paragraphs: [
              'The AI Act and the GDPR ask different questions about the same system. One regulates the use by risk, the other the personal data inside, and a system that answers both well tends to be one system, built once, with records, oversight and restraint designed in rather than promised. That architecture is what our sovereignty page describes mechanism by mechanism, and it is the standard everything we build inherits, whether or not a given system ever goes near Annex III.',
              'If you are deciding whether to build something under these rules, the same honesty applies to budgets, and we publish ours. And if what you need first is the map of duties turned into a working system, that is the actual job description of an AI agent development company operating in Europe in 2026.',
            ],
            link: { label: 'What an AI agent costs to build and run', href: '/en/ai-agent-development-cost' },
          },
        ],
        faqHeading: 'The questions committees actually ask',
        faq: [
          {
            q: 'We are not based in the EU. Does the Act reach us?',
            a: 'It can. The Act applies by market, covering providers and deployers outside the Union whenever the system is placed on the EU market or its output is used in the Union. A US company whose AI serves EU customers is in scope, headquartered wherever it likes. Whether your specific setup crosses that line is a question for counsel, and it is a short one to ask.',
          },
          {
            q: 'We only use ChatGPT and the AI inside Microsoft 365. Are we a provider?',
            a: 'In the normal case you are a deployer of those systems, and the provider duties sit with the companies that build them. The role can shift if you rebadge a system as your own product or substantially modify it, and where the line sits is a legal call. What you certainly keep either way are the deployer-side habits, literacy for your people, honesty with the people exposed to the output and knowing which of your uses could touch Annex III domains.',
          },
          {
            q: 'Is a customer-service chatbot high-risk?',
            a: 'By itself, normally not. Its home duty is transparency, people must know they are talking to a machine. It moves toward high-risk when the use crosses into an Annex III domain or when it profiles people in the GDPR sense. A support bot that starts making decisions about refunds based on scoring a customer’s reliability has changed category in substance, whatever it says on the tin. Classification is your lawyers’ call, drift is the thing to watch.',
          },
          {
            q: 'HR wants AI to screen CVs. What does that trigger?',
            a: 'Employment is one of the eight Annex III domains, and screening candidates is named in it, so the working assumption is high-risk with everything that follows, Article 26 duties, worker information and oversight included. Profiling makes the narrow exemption unavailable. This is the single most common way a mid-size company acquires its first high-risk system without noticing, usually inside an HR suite update, so it deserves a named owner and a conversation with counsel before the feature is switched on.',
          },
          {
            q: 'We are GDPR-compliant. Are we done?',
            a: 'No, and the inverse is also false. The GDPR governs the personal data in the system, the AI Act governs the system by its use and risk, and each has duties the other never mentions. The good news is architectural, one well-built system feeds both files, because records, oversight and data discipline are what both regulations reward. That overlap is deliberate in how we build, and it is why our GDPR page and this one describe the same systems from two angles.',
          },
          {
            q: 'What logs do we actually have to keep, and for how long?',
            a: 'Deployers of high-risk systems must keep the automatically generated logs under their control for at least six months, longer where other law applies. Our position goes further for a practical reason, we design systems to record their decisions from day one whatever their classification, because the record costs little while the system is being built and cannot be conjured afterwards, and because a company’s risk classification can change while its architecture stays.',
          },
          {
            q: 'Do we need a fundamental rights impact assessment?',
            a: 'Only a defined group does. Public bodies, private companies providing public services, and deployers using high-risk AI for credit scoring or for life and health insurance pricing must run one before first use. If you are in that group, the good news is reuse, the Act lets you lean on assessments already done, including the provider’s, and the exercise overlaps with the DPIA your organisation likely knows. Whether you are in the group is, one more time, a question for counsel.',
          },
          {
            q: 'Is there any relief for smaller companies?',
            a: 'Some, and it is real but narrow. The Act mandates regulatory sandboxes, controlled environments where companies test systems with the regulator watching, and Spain’s ran early, with AESIA selecting twelve companies in 2025. Simplified documentation for small providers exists in places. What does not exist is an SME exemption from the substance, a small company deploying a high-risk system carries the same core duties as a large one, scaled by proportionality, not waived.',
          },
          {
            q: 'If an authority asks about a system you built for us, what do we show them?',
            a: 'The file from this page: the written intended purpose, the technical description, the oversight design, the decision log with its retention, the evaluation evidence and the supplier chain. What we never promise is the outcome of the inspection, because that depends on your use, your classification and calls that belong to your counsel. What we promise is that the questions will have answers that exist in writing, which is more than most systems can say.',
          },
        ],
        cta: {
          heading: 'Deploying AI under these rules?',
          body: 'Tell us your challenge and we reply within 24 business hours. If we don’t see a return, we’ll tell you.',
          button: 'Tell us your challenge',
        },
      },
    },
  },
};
