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
  /**
   * Página de caso, si existe. Opcional a propósito: hasta el 28 ago 2026
   * ninguna ficha enlazaba a ninguna parte, y las que aún no tienen página
   * se quedan sin enlace en vez de apuntar a un sitio que no las cuenta.
   * No se pone en un idioma cuyo espejo no exista todavía.
   */
  href?: string;
  /** Texto del enlace. Va por ficha porque cada caso promete algo distinto. */
  hrefLabel?: string;
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
  /** The point the picture makes. One string is one paragraph; a list is
   *  several, so a long caption does not render as a wall (§12.C bis). */
  legend: string | string[];
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
  /** Una cadena es un párrafo. Varias, varios párrafos, para que una
   *  respuesta larga no salga como un muro (§12.C bis del árbitro). */
  a: string | string[];
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

  };
  /**
   * Aviso de cookies. Existe porque Google Analytics instala cookies que no
   * son necesarias para que la web funcione, y esas exigen consentimiento
   * previo: nada se carga hasta que alguien decide.
   */
  consent: {
    heading: string;
    body: string;
    accept: string;
    reject: string;
    link: string;
  };
  nav: {
    /** Etiqueta de la home en la miga de pan estructurada. */
    home: string;
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
    /** Rótulo del índice lateral de una entrada. Mismo texto que las páginas
     *  largas: el índice es el mismo componente y hace el mismo trabajo. */
    tocHeading: string;
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
    /** «por», delante de la firma. */
    byline: string;
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
    /** Asunto del correo que llega al buzón. Va aquí, y no escrito en el
     *  componente, porque el inglés recibía el asunto en español. */
    subject: string;
    name: string;
    email: string;
    company: string;
    website: string;
    optional: string;
    message: string;
    messageHint: string;
    privacyPre: string;
    privacyLink: string;
    /** Cierre de la casilla, detrás del enlace. Existe porque la etiqueta dejó
     *  de decir «acepto» la política, que insinuaba un consentimiento del
     *  6.1.a cuando el amparo del formulario es el 6.1.b. */
    privacyPost: string;
    submit: string;
    /** Pointer to the longer exploration form, split so the link sits inline. */
    startPre: string;
    startLink: string;
    startPost: string;
  };
  /** Standalone page holding the exploration form. */
  start: StartPageContent;
  /** Acuse propio al que aterrizan los dos formularios tras enviar. */
  thanks: {
    metaTitle: string;
    metaDescription: string;
    eyebrow: string;
    title: string;
    body: string[];
    /** Partido para que el correo de la casa entre como enlace, y salga de
     *  `EMPRESA` en vez de escribirse aquí. */
    extraPre: string;
    extraPost: string;
    /** Igual, para que el enlace al blog vaya dentro de la frase. */
    blogPre: string;
    blogLink: string;
    blogPost: string;
  };
  /** Shared architecture diagram, reused wherever the argument is made. */
  flowDiagram: FlowDiagramContent;
  /** Diagrama de la guía: el chatbot de guion frente al agente. */
  chatVsAgent: {
    title: string;
    lanes: { bot: string; agente: string };
    nodes: {
      botUsuario: string;
      botRespuesta: string;
      agenteUsuario: string;
      agenteElige: string;
      agenteResponde: string;
    };
    legend: string;
  };
  /** Diagrama comparativo de las cinco formas de automatizar. */
  formasDiagram: {
    title: string;
    /** Rótulo del eje, sin él la banda se lee como barra de progreso. */
    axis: string;
    key: { codigo: string; modelo: string };
    lanes: Record<
      'fijo' | 'paradas' | 'agente' | 'dentro' | 'varios',
      { name: string; segs: string[] }
    >;
    legend: string;
  };
  /** Diagrama de las entradas con formato fijo frente a las que no lo tienen. */
  entradasDiagram: {
    title: string;
    izq: { name: string; items: string[]; foot: string };
    der: { name: string; items: string[]; foot: string };
    legend: string;
  };
  /** Diagrama de las cuatro capas que aíslan los datos de una empresa de los
   *  de la de al lado. */
  capasDiagram: {
    title: string;
    entrada: string;
    salida: string;
    /** Rótulos de las dos llaves laterales: hasta dónde llega el modelo. */
    llaves: { modelo: string; codigo: string };
    capas: Array<{ name: string; desc: string }>;
    legend: string;
  };
  /** Diagrama del examen previo a publicar, en el modal de observabilidad. */
  gateDiagram: GateDiagramContent;
  footer: {
    tagline: string;
    menu: string;
    legal: string;
    privacy: string;
    cookies: string;
    /** Reabre el aviso de cookies. Obligatorio: retirar el consentimiento
     *  tiene que ser tan fácil como darlo. */
    cookiePrefs: string;
    contactHeading: string;
    rights: string;
    /** Crawlable links to the service/keyword pages. */
    /**
     * Taxonomía de navegación, compartida por los desplegables de la cabecera
     * y las columnas del pie. Tres grupos por intención (decisión del 28 ago
     * 2026): lo que se compra, para quién viene empaquetado y lo que se lee.
     * «Servicios» contiene servicios y nada más, que es lo que su rótulo dice.
     */
    navGroups: Array<{
      heading: string;
      /** Solo en el pie, fuera de los desplegables de la cabecera. El menú
       *  declara a quién sirve el sitio, y el público primario del árbitro
       *  (§4) son medianas y grandes empresas: un grupo de cabecera dedicado
       *  al secundario le dice al primario que se ha equivocado de web. */
      soloPie?: true;
      links: Array<{ label: string; href: string }>;
    }>;
  };
  /** Content blocks for the dedicated landing pages. */
  pages: {
    /** Migrada a LongFormPage el 21 ago 2026: partes, FAQ y satélites de serie. */
    enterprise: LongFormPageContent;
    smb: LongFormPageContent;
    realEstate: LongFormPageContent;
    /**
     * Vertical de gestorías y asesorías, página larga en los dos idiomas desde
     * el 31 ago 2026. Dejó de ser plantilla corta porque Search Console mide
     * ahí la mayor demanda desatendida del sitio, la familia de facturas y OCR:
     * más de 900 impresiones en posiciones 24 a 95 contra una página de 225
     * palabras que no podía competir por ninguna.
     */
    accounting: LongFormPageContent;
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
     * Página de caso. Familia nueva (28 ago 2026): no persigue término, su
     * trabajo es convertir a quien ya llegó y darle destino a las tarjetas
     * del carrusel, que hasta ahora no enlazaban a ninguna parte. Solo
     * español hasta que se escriba el espejo.
     */
    caseSavian?: LongFormPageContent;
    caseStanton?: LongFormPageContent;
    caseBarceloneta?: LongFormPageContent;
    caseIndustrial?: LongFormPageContent;
    caseWazzy?: LongFormPageContent;
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
  /** Renders the scripted-chatbot vs agent diagram after the paragraphs. */
  chatDiagram?: boolean;
  /** Renders the five-shapes comparison diagram after the paragraphs. */
  formasDiagram?: boolean;
  /** Renders the fixed-format vs no-format comparison after the paragraphs. */
  entradasDiagram?: boolean;
  /** Renders the four-layer isolation diagram after the paragraphs. */
  capasDiagram?: boolean;
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
  /**
   * Fuerza la presencia del índice lateral. Por defecto lo decide el número de
   * secciones, que sirve para las páginas largas de posicionamiento pero no
   * para las cortas: `false` aquí las deja a una columna centrada, con el
   * ancho de lectura del cuerpo de un post y sin menú a la izquierda.
   * Decisión del propietario para «Quiénes somos» (23 ago 2026).
   */
  nav?: boolean;
  metaTitle: string;
  metaDescription: string;
  /**
   * `ctaHref` overrides the default contact anchor. Informational pages point
   * it at an in-page section so they don't ask for the sale on first contact.
   */
  hero: { eyebrow?: string; title: string; subtitle: string; cta?: string; ctaHref?: string };
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
        'Agentes de IA y automatización de procesos para medianas y grandes empresas. Los diseñamos, los construimos y los mantenemos hasta que mueven una métrica de negocio.',
      blogTitle: 'Blog de agentes de IA y automatización, Ideasforge',
      blogDescription:
        'Lo que aprendemos construyendo agentes de IA y automatizaciones que llegan a producción: qué falla, cómo se mide y qué se decide antes de escribir código.',
      enterpriseTitle: 'Asistente de IA sobre tu documentación interna, Ideasforge',
      enterpriseDescription:
        'Para medianas y grandes empresas: un asistente que responde en lenguaje natural consultando tu documentación interna, tus wikis y tus sistemas.',
    },
    consent: {
      heading: 'Cookies de medición',
      body: 'Usamos Google Analytics para saber qué páginas sirven y cuáles no. Instala cookies, así que no se carga hasta que decidas. Si dices que no, la web funciona exactamente igual.',
      accept: 'Aceptar',
      reject: 'Rechazar',
      link: 'Leer la política de cookies',
    },
    nav: {
      home: 'Inicio',
      services: 'Servicios',
      projects: 'Proyectos',
      about: 'Quiénes somos',
      blog: 'Blog',
      contact: 'Contacto',
      switchTo: 'Cambiar idioma',
    },
    hero: {
      eyebrow: 'Somos la forja de tus ideas',
      title: 'Deja de buscar en tus sistemas. Agentes de IA que responden y actúan.',
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
          href: '/casos/industrial',
          hrefLabel: 'Lo que costó saber que acertaba',
          image: '/case-studies/industrial.jpg',
          title: 'Diagnóstico guiado para quien está delante de la máquina',
          body: 'El conocimiento de planta vivía en manuales densos y en la cabeza de los más veteranos. Construimos un asistente sobre los sistemas de la propia empresa. Los operarios consultan datos de producción y averías y reciben el diagnóstico guiado paso a paso cuando una máquina se para.',
          metricBig: '6 agentes',
          metricSmall:
            'especializados, coordinados por un orquestador que dirige cada consulta.',
        },
        {
          client: 'Savian',
          href: '/casos/savian',
          hrefLabel: 'Cómo está construido y qué le quitamos al modelo',
          clientLogo: '/logos/savian.png',
          image: '/case-studies/harvest.jpg',
          title: 'Cualquiera del equipo, preguntando a sus datos',
          body: 'Para saber cuánto se produjo ayer había que esperar a estar delante de un ordenador. Construimos un asistente en WhatsApp que entiende la pregunta en lenguaje natural y devuelve la cifra consultando la base de datos. El reparto es siempre el mismo: el juicio vive en el código, la interpretación del lenguaje vive en el modelo y el conocimiento vive en los datos.',
          metricBig: 'De horas a segundos',
          metricSmall:
            'lo que tarda ahora cualquier responsable en tener su cifra.',
        },
        {
          client: 'Stanton',
          href: '/casos/stanton',
          hrefLabel: 'La factura que llegó distinta y lo que añadimos después',
          clientLogo: '/logos/stanton.png',
          image: '/case-studies/stanton.jpg',
          title: 'Las facturas dejaron de teclearse',
          body: 'Las facturas de luz, gas y agua de sus inquilinos se pasaban a mano, una por una. Ahora el equipo las sube a un chat de Telegram y un agente con Gemini lee cada documento y devuelve los datos en filas listas para revisar. Empezaron por las facturas y siguen ampliando el sistema a otros procesos administrativos.',
          metricBig: '2 agentes',
          metricSmall: 'en producción y el sistema sigue creciendo.',
        },
        {
          client: 'Barceloneta Premium',
          href: '/casos/barceloneta',
          hrefLabel: 'La primera versión y por qué hubo que tirarla',
          clientLogo: '/logos/bcnpremium.png',
          image: '/case-studies/barceloneta.jpg',
          title: 'El filtro que trabaja mientras la oficina está cerrada',
          body: 'Cada solicitud de alquiler que entraba por WhatsApp costaba entre cinco y diez minutos de comprobación manual y llegaban decenas al día. El agente conversa con el interesado, recoge motivo, presupuesto y documentación y envía al equipo un correo con el resumen y un párrafo explicando por qué encaja o no. El equipo dejó de hacer criba y volvió a concertar visitas.',
          metricBig: '+3 horas',
          metricSmall: 'ahorradas al día respondiendo solicitudes.',
        },
        {
          client: 'Wazzy',
          href: '/casos/wazzy',
          hrefLabel: 'Una auditoría contada por dentro',
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
              'Tu equipo consulta los datos operativos en lenguaje natural, desde el móvil y sin abrir un panel.',
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
              'No te dejamos un sistema y nos vamos. Lo operamos contigo, lo afinamos y nos encargamos de los modelos nuevos cuando salen.',
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
          body: 'Cada cambio pasa por una batería de pruebas antes de publicarse y después seguimos midiendo cada semana. Si algo deja de entender bien una consulta, nos enteramos antes que tú.',
          modal: {
            eyebrow: 'Observabilidad por defecto',
            title: 'Medimos cada cambio antes de que llegue a producción',
            subtitle:
              'Tu proveedor actualiza el modelo sobre el que corre tu sistema sin cambiarle el nombre, tu documentación no para de crecer y el sistema que ayer respondía bien hoy empieza a responder mal.',
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
                body: 'Empieza cuando las instrucciones que gobiernan el sistema solo las conoce quien las escribió y nadie más puede comprobar si un cambio las empeora. Crece cuando la documentación cuenta lo que se pensaba hacer en lugar de lo que acabó haciéndose. Para cuando quieres cambiar de proveedor, ya nadie te lo impide por contrato, simplemente no queda nadie capaz de explicar cómo funciona aquello.',
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
                body: 'Lo que hace peligroso a un asistente no es lo que sabe, es lo que puede hacer. En seguridad se habla de tres ingredientes inofensivos por separado y peligrosos juntos: acceso a datos privados, entrada de texto que viene de fuera y una vía libre para actuar sobre los sistemas. Los dos primeros son la razón de que el asistente exista, así que el que hay que cortar es el tercero. El montaje más extendido hoy hace justo lo contrario, porque enchufa el modelo a la base de datos con un conector que le deja escribir él mismo las consultas (los famosos MCP). Desde ese momento puede escribir cualquier consulta que el lenguaje permita. Lo único que se lo impide es una frase en su prompt, del tipo «no consultes la tabla de nóminas». <u class="text-fg">Y esto no es una garantía, es una petición educada.</u>',
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
                heading: 'Datos de salud, protección reforzada',
                body: 'En Wazzy tratamos datos de salud, que el reglamento europeo mete en sus categorías especiales, las de protección reforzada. Sí guardamos datos personales, porque sin ellos no hay servicio. Lo que cambia es cómo. El cifrado va campo a campo y el borrado separa lo que se elimina a petición de lo que la clínica debe retener por plazo legal. El nivel nos lo marcan el reglamento europeo de inteligencia artificial y la ley de protección de datos.',
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
      tocHeading: 'Qué verás en esta página',
      clusterHeading: 'Lo contamos en detalle',
      heading: 'Blog',
      subtitle: 'Lo que vamos descubriendo construyendo IA en producción con nuestros clientes.',
      readMore: 'Leer más',
      updatedOn: 'Actualizado el',
      viewAll: 'Visitar blog',
      backToBlog: 'Volver al blog',
      publishedOn: 'Publicado el',
      byline: 'por',
      counterLabel: 'Artículo',
      counterOf: 'de',
    },
    faq: {
      eyebrow: 'FAQs',
      heading: 'Preguntas frecuentes',
      subtitle: 'Las dudas que solemos resolver antes de empezar.',
      items: [
        {
          q: '¿Qué presupuesto hay que tener?',
          a: 'Un agente a medida se mueve entre 2.500 y 10.000 € de construcción, según cuántos sistemas haya que tocar y cuánta validación exija, más entre 150 y 500 € al mes de operación, que cubren la vigilancia y el mantenimiento. El modelo y la infraestructura van en cuentas a nombre de tu empresa, así que esas facturas son tuyas y no entran en la cuota. Los sistemas grandes con varios agentes se presupuestan por proyecto.',
        },
        {
          q: '¿Cuánto se tarda en tener algo funcionando?',
          a: 'Con los datos disponibles, los accesos concedidos y la tarea bien acotada, un piloto en dos semanas es realista. Cuando falta alguna de esas condiciones lo que se alarga es la preparación y no la construcción. El piloto se paga y su precio entra dentro del proyecto final.',
        },
        {
          q: '¿Hay permanencia en la cuota mensual?',
          a: 'No hay permanencia. La cuota paga la vigilancia y el mantenimiento de ese mes y se deja de pagar cuando tú decidas. El sistema no se apaga por eso, porque el repositorio está a tu nombre desde el primer día y la infraestructura corre en cuentas tuyas. Lo que dejas de tener es nuestro trabajo, no lo construido.',
        },
        {
          q: '¿Y si lo que necesitamos no lleva IA?',
          a: 'Te lo decimos. Si tu proceso tiene reglas claras sobre datos que llegan siempre igual, una automatización sin modelo lo resuelve más barato y más rápido, sin nada que vigilar después. Eso también lo construimos nosotros. Un agente compensa cuando en medio del proceso hay que leer, interpretar o decidir sobre entradas que cambian.',
        },
        {
          q: '¿Trabajáis solo con grandes empresas?',
          a: 'No. Tenemos paquetes específicos para pymes (atención al cliente, cualificación de solicitudes, automatización documental) con la misma ingeniería que usamos en proyectos grandes.',
        },
        {
          q: '¿Desde dónde trabajáis?',
          a: 'Desde España. Trabajamos con empresas sujetas al reglamento europeo, estén donde estén, porque lo que decide cómo hay que construir el sistema es la norma que obliga a tu empresa y no dónde tenga la sede.',
        },
        {
          q: '¿Mis datos salen de mi infraestructura?',
          a: 'Solo si tú decides. Desplegamos sobre tu nube o tus propios servidores, con las cuentas de tu organización y el sistema guarda lo mínimo para funcionar. La única salida son las llamadas al proveedor del modelo y tú apruebas cuáles se hacen y qué viaja en ellas.',
        },
        {
          q: '¿De quién es el código que construís?',
          a: 'Tuyo. Te entregamos los repositorios, la documentación y la arquitectura desde el día uno. No hay caja negra ni dependencia tecnológica.',
        },
        {
          q: '¿Cómo sabéis que la IA sigue funcionando bien después de entregarla?',
          a: 'De dos maneras. Una batería de pruebas se ejecuta antes de cada cambio y lo bloquea si baja la calidad. Y una vez en marcha, seguimos midiendo cada semana. Si el sistema deja de entender bien una pregunta, lo detectamos antes de que llegue al usuario final.',
        },
      ],
    },
    contact: {
      eyebrow: 'Contacto',
      heading: 'Cuéntanos tu reto.',
      subhead: 'Te respondemos en un día laborable. Sin presentación comercial de cuarenta diapositivas.',
      subject: 'Nuevo mensaje desde ideasforge.io',
      name: 'Nombre',
      email: 'Correo electrónico',
      company: 'Empresa',
      website: 'Página web',
      optional: 'Opcional',
      message: 'Qué quieres construir o qué problema quieres resolver',
      messageHint: 'Cuéntanoslo como se lo contarías a un compañero. No hace falta que sepas qué tecnología lo resuelve.',
      privacyPre: 'He leído la ',
      privacyLink: 'Política de privacidad',
      privacyPost: ' y sé que solo usaréis mis datos para contestarme.',
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
      legend: [
        'El diagrama enseña una parada de consulta a datos, que es donde mejor se ve. El modelo nunca llega a tocar tus sistemas, interpreta la pregunta y entrega un contrato. A partir de ahí decide el código, que sí se comporta igual siempre. Es también el código quien decide qué puede ver cada persona.',
        'En este caso lo peor que puede conseguir un mensaje malicioso es que se elija mal dentro de una lista ya revisada.',
        'Cuando la parada es de lectura de documentos el modelo no elige de una lista, devuelve valores, así que ahí la defensa es la validación del paso siguiente y la confirmación de una persona en lo que mueve dinero.',
      ],
    },
    chatVsAgent: {
      title: 'Bot vs Agente de IA',
      lanes: { bot: 'BOT', agente: 'AGENTE DE IA' },
      nodes: {
        botUsuario: 'El usuario elige o escribe una opción',
        botRespuesta: 'El bot contesta una respuesta predefinida',
        agenteUsuario: 'El usuario escribe',
        agenteElige: 'El modelo elige entre sus herramientas',
        agenteResponde: 'Responde al usuario',
      },
      legend:
        'La diferencia está en quién decide la respuesta. La del bot ya estaba escrita antes de que nadie preguntara, así que solo sirve para lo que alguien previó. La del agente se construye en ese momento, eligiendo qué herramienta usa según lo que le han pedido.',
    },
    formasDiagram: {
      title: 'Quién decide el camino en cada forma',
      axis: 'El recorrido de una petición, de principio a fin',
      key: { codigo: 'Decide el código', modelo: 'Decide el modelo' },
      lanes: {
        fijo: { name: 'Un flujo fijo sin modelo', segs: ['Todo el recorrido lo decide el código'] },
        paradas: {
          name: 'Un flujo fijo con paradas de modelo',
          segs: ['Código', 'El modelo lee', 'Código'],
        },
        agente: { name: 'Un agente', segs: ['El modelo decide todo el recorrido, paso a paso'] },
        dentro: {
          name: 'Un agente dentro de un flujo',
          segs: ['Código', 'El agente decide este tramo', 'Código'],
        },
        varios: {
          name: 'Varios agentes con un orquestador',
          segs: ['El orquestador elige', 'El especialista decide su tramo'],
        },
      },
      legend:
        'Cada banda es el recorrido de una petición, desde que entra hasta que se resuelve. Lo azul es lo que decide el modelo en ese momento. Lo gris es código corriente, que hace siempre lo mismo y se puede comprobar entero antes de publicarlo. Cuanto más azul hay, más decide el sistema por su cuenta y más trabajo cuesta probarlo y vigilarlo. No es un ranking. Las dos primeras formas no llevan agente y la cuarta, pese a llevarlo, decide menos que la tercera.',
    },
    entradasDiagram: {
      title: 'El mismo pedido, en dos formatos',
      izq: {
        name: 'Con formato fijo',
        items: [
          'Un formulario con sus campos',
          'Un fichero con columnas siempre iguales',
          'Un pedido que llega por integración',
        ],
        foot: 'Reglas y código. Automatizado desde hace décadas.',
      },
      der: {
        name: 'Sin formato fijo',
        items: [
          'El mismo pedido dentro de un PDF',
          'El mismo pedido escrito en un correo',
          '«Lo del mes pasado, al almacén nuevo»',
        ],
        foot: 'Antes, una persona tecleando. Ahora, un modelo que lee y código que ejecuta.',
      },
      legend:
        'Las tres filas son el mismo encargo escrito de dos maneras. Lo de la izquierda lleva décadas automatizado porque siempre llega igual. Lo de la derecha es lo que obligaba a poner a alguien a teclear. Ese es justo el hueco donde vive un agente. Fíjate en que lo que cambia no es la dificultad del trabajo, es la forma en que entra.',
    },
    capasDiagram: {
      title: 'Las cuatro capas del aislamiento',
      entrada: 'Una persona pregunta',
      salida: 'Sus datos y ninguno más',
      llaves: { modelo: 'Lo que el modelo ve', codigo: 'Lo que decide el código' },
      capas: [
        {
          name: 'El contexto',
          desc: 'Solo entran los datos de quien pregunta, el resto no existe para el agente',
        },
        {
          name: 'Los nombres a medias',
          desc: 'Se corrigen solo contra lo que esa persona ya puede ver',
        },
        {
          name: 'La validación',
          desc: 'El código contrasta la petición con la lista cerrada de esa persona',
        },
        {
          name: 'El filtro',
          desc: 'Viaja dentro de la consulta y no hay manera de omitirlo',
        },
      ],
      legend:
        'Cada capa aguanta el fallo de la anterior. La primera es lo único que el modelo llega a ver. Ese contenido lo decide el código, igual que en las otras tres. La última desconfía incluso de las de arriba. Si la lista de permisos llega vacía, la consulta no casa con ninguna fila y la respuesta viene vacía.',
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
        'Cuéntanos qué proceso quieres resolver y te respondemos en un día laborable con una primera lectura de tu caso.',
      eyebrow: 'Paso 1 · Explorar',
      title: 'Empecemos por entender tu caso',
      subtitle:
        'Estas preguntas son las mismas que haríamos en una primera reunión. Contestarlas por escrito nos ahorra esa reunión a los dos y nos deja empezar a trabajar antes.',
      getHeading: 'Qué recibes',
      get: [
        'Respuesta en un día laborable, escrita por una persona que ha leído tu caso.',
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
          hint: 'Cuantos más detalles nos des, mejor entenderemos el caso y más aterrizada será la propuesta.',
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
    thanks: {
      metaTitle: 'Mensaje recibido, Ideasforge',
      metaDescription:
        'Hemos recibido lo que nos has contado. Te contestamos en un día laborable y lo hace la persona que trabajaría en tu caso.',
      eyebrow: 'Recibido',
      title: 'Lo hemos recibido',
      body: [
        'Te contestamos en un día laborable. Lo hace una persona que habrá leído tu caso entero, la misma que trabajaría en él si seguimos adelante.',
        'No vas a recibir ningún correo de confirmación y tampoco te hemos apuntado a ninguna lista. El siguiente correo nuestro que te llegue será la respuesta a lo que nos has contado.',
      ],
      extraPre: 'Si se te ha quedado algo fuera, escríbenos a ',
      extraPost: ' y lo sumamos al mismo hilo.',
      blogPre: 'Mientras esperas, en ',
      blogLink: 'el blog',
      blogPost: ' contamos cómo construimos estos sistemas y qué nos ha salido mal por el camino.',
    },
    footer: {
      tagline: 'Desarrollo de IA generativa en producción para empresas. Lo medimos cada semana.',
      menu: 'Menú',
      legal: 'Legal',
      privacy: 'Política de Privacidad',
      cookies: 'Política de Cookies',
      cookiePrefs: 'Preferencias de cookies',
      contactHeading: 'Contáctanos',
      rights: 'Ideasforge. Todos los derechos reservados.',
      navGroups: [
        {
          heading: 'Servicios',
          links: [
            { label: 'Desarrollo de agentes de IA', href: '/servicios/desarrollo-de-agentes-de-ia' },
            { label: 'Automatización de procesos con IA', href: '/servicios/automatizacion-de-procesos-con-ia' },
            { label: 'Agentes conversacionales', href: '/servicios/agentes-conversacionales' },
            { label: 'Documentación interna', href: '/servicios/conocimiento-corporativo' },
          ],
        },
        {
          heading: 'Sectores',
          soloPie: true,
          links: [
            { label: 'IA para pymes', href: '/pymes' },
            { label: 'IA para inmobiliarias', href: '/inmobiliarias' },
            { label: 'IA para gestorías', href: '/gestorias' },
          ],
        },
        {
          heading: 'Casos',
          links: [
            { label: 'Asistente de planta', href: '/casos/industrial' },
            { label: 'Savian', href: '/casos/savian' },
            { label: 'Stanton', href: '/casos/stanton' },
            { label: 'Barceloneta Premium', href: '/casos/barceloneta' },
            { label: 'Wazzy', href: '/casos/wazzy' },
          ],
        },
        {
          heading: 'Guías',
          links: [
            { label: 'Guía: agentes de IA', href: '/agentes-de-ia' },
            { label: 'Qué cuesta un agente de IA', href: '/cuanto-cuesta-un-agente-de-ia' },
            { label: 'IA y RGPD', href: '/ia-y-rgpd' },
            { label: 'Reglamento europeo de IA', href: '/reglamento-europeo-de-ia' },
          ],
        },
      ],
    },
    pages: {
      enterprise: {
        tocHeading: 'Qué verás en esta página',
        metaTitle: 'Asistente de IA sobre tu documentación interna, Ideasforge',
        metaDescription:
          'Un asistente que responde en lenguaje natural consultando tu documentación, tus wikis y tus sistemas. Con la prueba de un caso industrial en producción.',
        hero: {
          eyebrow: 'Para grandes empresas',
          title: 'Un asistente de IA sobre tu documentación y tu conocimiento interno',
          subtitle:
            'Un asistente conversacional a medida que entiende preguntas en lenguaje natural y responde consultando tu documentación y tus sistemas internos, con la referencia de dónde salió cada respuesta. Cuando una respuesta no basta, lleva a la persona por un diagnóstico paso a paso o ejecuta la acción en el sistema que toca.',
        },
        sections: [
          {
            heading: 'El conocimiento atrapado cuesta dinero todos los días',
            part: 'A quién le pasa',
            paragraphs: [
              'El síntoma es conocido. Alguien necesita un dato técnico, un procedimiento o el histórico de un problema y la respuesta existe, pero está enterrada. Se pregunta al compañero, el compañero pregunta al más veterano de la empresa y el veterano lo sabe de memoria porque el documento que lo cuenta tiene doscientas páginas. Cada consulta de estas roba minutos a dos o tres personas a la vez, siempre a las mismas.',
              '<strong>El coste real no son solo los minutos.</strong> Es la dependencia de unas pocas personas, que convierte cada baja y cada jubilación en un riesgo para la operación.',
            ],
          },
          {
            heading: 'Un buscador te da diez documentos, este asistente te da la respuesta',
            part: 'Lo que construimos',
            paragraphs: [
              'La diferencia con el buscador de siempre está en quién hace el trabajo final. <strong>Un buscador devuelve diez documentos donde puede estar la respuesta y la persona sigue teniendo que leerlos.</strong> Este asistente responde a la pregunta y la acompaña con la referencia de dónde salió, para que verificar cueste un clic en lugar de una tarde.',
              'Por debajo hay una búsqueda de calidad de producción sobre tu documentación, lo que el sector llama RAG, una recuperación de fragmentos relevantes que alimenta al modelo para que responda desde tus fuentes en lugar de desde su memoria.',
              '<strong>Un RAG de demostración encuentra lo fácil. Uno de producción tiene que encontrar lo difícil</strong>, con documentos densos, vocabulario propio de la casa y preguntas mal formuladas a las tres de la tarde.',
            ],
          },
          {
            heading: 'Cuando la respuesta necesita datos vivos',
            part: 'Lo que construimos',
            paragraphs: [
              'Hay preguntas que ningún documento responde bien, porque la respuesta cambia cada hora. El estado de una máquina, el histórico reciente de una avería, un dato de producción. Para esas, el asistente no cita un documento de hace dos años, consulta el sistema interno que tiene el dato y responde con lo que hay ahora mismo.',
              'Esa mezcla es la que hace útil al asistente en el trabajo real, <strong>documentación para el conocimiento que se escribe una vez y sistemas para el que cambia cada día</strong>. Y cuando la consulta lo pide, el asistente guía paso a paso, un diagnóstico, un procedimiento. O ejecuta la acción directamente sobre los sistemas que tú apruebes.',
            ],
          },
          {
            heading: 'Media docena de agentes, un solo interlocutor',
            part: 'Lo que construimos',
            paragraphs: [
              '¿Por qué no un solo agente que lo haga todo? A partir de cierto tamaño esa pieza única se vuelve enorme e imposible de mantener, así que nuestra arquitectura para estos casos es otra.',
              'Un orquestador entiende la intención de cada pregunta y la enruta al agente especializado que corresponde, uno por dominio de conocimiento. En el caso industrial del que sale esta página, ese orquestador coordina media docena de agentes especializados y el conjunto suma unas 86 piezas conectadas entre sí. Ese caso está contado entero en <a class="link-inline" href="/casos/industrial">su propia página</a>.',
              'Quien hace la pregunta no se entera de nada de lo que pasa por detrás, solo recibe una respuesta. <strong>La arquitectura importa por lo que permite, añadir un dominio nuevo sin tocar los demás</strong>, medir cada agente por separado y que un fallo en uno no arrastre al conjunto.',
            ],
          },
          {
            heading: 'Los dos «no» que un asistente serio distingue',
            part: 'Cómo se gana la confianza',
            paragraphs: [
              '<strong>La confianza no se gana respondiendo bien, se gana respondiendo bien y negándose bien.</strong> Hay dos «no» distintos. El «esto queda fuera del producto», que se responde al instante y con texto de catálogo, sin lanzar una búsqueda. Y el «esto debería estar documentado y no lo está», que solo se dice después de buscar de verdad y deja rastro, porque es una tarea para el equipo de documentación.',
              'Confundirlos sale caro en las dos direcciones y separarlos tiene más ingeniería detrás de la que parece.',
            ],
          },
          {
            heading: 'Cuando la aclaración no necesita al modelo',
            part: 'Cómo se gana la confianza',
            paragraphs: [
              'Un detalle de diseño que enseña cómo pensamos. Cuando el asistente ofrece varias opciones, la respuesta corta de la persona, un ordinal, un término suelto, un «la segunda», se resuelve sin llamar al modelo, con una regla sencilla que reconoce esos términos y esos números y que caduca a los quince minutos.',
              'Parece un ahorro menor y es tres cosas a la vez, una respuesta instantánea, una llamada menos que pagar y un mensaje menos expuesto a instrucciones maliciosas escondidas en el texto.',
              'La regla general detrás del detalle es que <strong>el modelo se usa donde aporta, entender lenguaje abierto</strong>. Se evita donde un programa normal hace el mismo trabajo más rápido, más barato y sin sorpresas.',
            ],
          },
          {
            heading: 'Cada persona ve lo que su puesto permite',
            part: 'Cómo se gana la confianza',
            paragraphs: [
              'Un asistente que lee toda la documentación de la empresa plantea una pregunta obvia. ¿Quién puede preguntarle qué?',
              'Nuestra respuesta es que <strong>el asistente hereda los permisos que ya existen</strong>. La recuperación de documentos respeta el rol de quien pregunta, así que nadie recibe en una respuesta un fragmento que no podría abrir a mano. Y cuando el asistente consulta un sistema interno, viaja con la identidad de la persona, no con una cuenta de servicio que lo ve todo.',
              'Cada decisión queda además registrada, qué entendió, a dónde enrutó, qué respondió.',
            ],
          },
          {
            heading: 'Garantías para grandes empresas',
            part: 'Garantías y encaje',
            paragraphs: [
              'El asistente corre en tu infraestructura, en tu nube o en tus servidores, con los datos donde tú decidas. La única pieza externa es la llamada al modelo, bajo los acuerdos que tú apruebes. <strong>Se entra con el inicio de sesión que tu gente ya usa</strong>, así que dar y quitar acceso sigue siendo cosa de tu equipo, no nuestra.',
              'El código es tuyo desde el primer día, en tu repositorio. Y <strong>la calidad se mide siempre</strong>, con una batería de casos reales que frena cualquier cambio que empeore el sistema y una vigilancia semanal de lo que está en producción.',
              'El coste de un sistema de este tamaño se presupuesta por proyecto, porque depende de tus fuentes, tus sistemas y tu exigencia de validación. Lo desglosa la <a class="link-inline" href="/cuanto-cuesta-un-agente-de-ia">guía de coste</a>, que explica qué mueve cada cifra y dónde se sale del rango estándar.',
              'Y cómo las reglas europeas de protección de datos moldean todo lo anterior tiene su propia página, escrita para el comité que tiene que aprobarlo.',
            ],
            link: { label: 'IA conforme al RGPD, en una cuenta que controlas', href: '/ia-y-rgpd' },
          },
          {
            heading: 'Capacidades técnicas',
            part: 'Garantías y encaje',
            kind: 'lattice',
            paragraphs: [
              'Para la revisión técnica, esto es lo que hay debajo, en una línea cada pieza.',
            ],
            bullets: [
              'Arquitectura multiagente. Un orquestador entiende la intención y enruta a agentes especializados. Escala por dominios sin volverse un monolito.',
              'Recuperación fiable. La búsqueda que alimenta al modelo está diseñada para respuestas completas y correctas, sin dejar escapar detalles internos a quien no debe verlos.',
              'Calidad medible. Baterías de prueba que verifican antes de cada cambio que el asistente sigue entendiendo y respondiendo bien.',
              'Integración con tus sistemas. ERP, bases de datos y sistemas industriales, siempre con la identidad y los permisos de cada persona.',
              'Registro de decisiones. Cada interacción deja escrito qué se entendió y por qué se respondió lo que se respondió, para poder auditarlo después.',
              'Soberanía del dato. Tu nube o tus servidores, tus cuentas, tus datos donde decidas y el repositorio a tu nombre.',
            ],
          },
        ],
        faqHeading: 'Lo que preguntan antes de empezar',
        faq: [
          {
            q: '¿Cuánto cuesta un asistente de conocimiento corporativo?',
            a: 'Se presupuesta por proyecto, porque el coste depende del volumen y estado de tus fuentes, de cuántos sistemas se integran y de cuánta validación exiges antes de salir. Los sistemas multiagente de este tamaño quedan fuera de los rangos estándar que publicamos para agentes de un solo trabajo. La estructura del precio, construcción más operación mensual, es la misma. La guía de coste la desglosa.',
          },
          {
            q: '¿Qué pasa con las preguntas que la documentación no cubre?',
            a: 'El asistente lo dice, con claridad y con rastro. Distinguimos el «queda fuera del producto» del «falta documentación», cada uno con su respuesta y su cola de trabajo, así que los huecos reales acaban convertidos en tareas para quien documenta. Un asistente que rellena huecos con seguridad fingida es exactamente lo que no construimos.',
          },
          {
            q: '¿Los empleados verán documentos que no les tocan?',
            a: 'No. La búsqueda que alimenta al asistente respeta los permisos de cada puesto, así que un documento restringido ni siquiera llega a lo que el modelo lee antes de responder. Y las consultas a sistemas viajan con la identidad de quien pregunta, con sus permisos de siempre. Si alguien no puede abrir un dato a mano, su asistente tampoco.',
          },
          {
            q: '¿Cómo se mantiene al día cuando la documentación cambia?',
            a: 'Los documentos se vuelven a procesar cuando cambian y la calidad se vigila de dos maneras, una batería de casos reales antes de cada cambio nuestro y una prueba semanal sobre el sistema en marcha. Cuando algo deja de encontrarse o de entenderse bien, lo vemos en las métricas antes de que se convierta en queja.',
          },
          {
            q: '¿Funciona con nuestro vocabulario y en varios idiomas?',
            a: 'El vocabulario propio de la casa es precisamente el caso difícil para el que se calibra la búsqueda, con casos reales de tu gente y no con ejemplos de laboratorio. Los idiomas que hagan falta se definen en la exploración, que es la primera fase del proyecto.',
          },
          {
            q: '¿Puede correr sin salir de nuestra infraestructura?',
            a: [
                'El sistema completo corre en infraestructura tuya, nube o servidores propios. La llamada al modelo de lenguaje es la única pieza externa, va bajo los acuerdos y la configuración que apruebes y sin que tu contenido se use para entrenar.',
                'Desplegar el propio modelo en tus máquinas es un proyecto distinto, con otros costes y otro equilibrio de calidad. Si es requisito hay que decirlo en la primera conversación, porque cambia la arquitectura desde los cimientos.',
              ],
          },
          {
            q: '¿Cuánto se tarda?',
            a: 'La exploración, que es la primera fase del proyecto, lo responde con tus fuentes delante y no antes. La forma del proyecto sí es constante, un primer dominio de conocimiento acotado que entra en producción con su medición puesta y crecimiento dominio a dominio desde ahí. El caso industrial creció exactamente así.',
          },
        ],
        cta: {
          heading: '¿Te interesa para tu empresa?',
          body: 'Cuéntanos tu reto. Si no le vemos retorno, te lo diremos.',
          button: 'Cuéntanos tu reto',
        },
      },
      smb: {
        metaTitle: 'IA para pymes en paquetes cerrados por resultado, Ideasforge',
        metaDescription:
          'IA para pymes en cuatro paquetes acotados, con el precio dicho antes de empezar y la prueba medida en empresas pequeñas que ya los tienen funcionando.',
        hero: {
          title: 'IA para tu pyme, un resultado cada vez',
          subtitle:
            'Cuatro paquetes acotados, construidos con la misma ingeniería que los proyectos grandes, con precio cerrado antes de empezar y una cifra que cumplir después.',
          cta: 'Cuéntanos tu reto',
        },
        stats: [
          {
            value: '+3 horas',
            label: 'al día recuperadas en una agencia de alquiler que comprobaba cada consulta a mano',
          },
          {
            value: '98 %',
            label: 'de las facturas pasa hoy sin que nadie las toque, en la gestora donde lo construimos',
          },
          {
            value: '2.500 €',
            label: 'es donde arranca un proyecto acotado, con los rangos completos en la guía de coste',
          },
        ],
        sections: [
          {
            heading: 'La cifra que crece es la de adopción, no la de resultados',
            id: 'el-problema',
            paragraphs: [
              'El 21,1 % de las empresas españolas de diez o más empleados usó inteligencia artificial en el primer trimestre de 2025, según el Instituto Nacional de Estadística. Son 8,7 puntos más que un año antes. Lo que esa cifra mide es cuánta gente la usa, que no es lo mismo que cuánta gente gana dinero con ella.',
              'La pregunta que decide si la IA sale a cuenta en una empresa pequeña va por otro lado. No cuál es la herramienta del momento, sino qué proceso tuyo se repite lo suficiente y cuesta lo suficiente cada vez como para pagarse su propia automatización.',
              '<strong>Ese proceso casi siempre existe y casi nunca es el que sale en los titulares.</strong> En las empresas donde hemos trabajado suele ser el que alguien hace todos los días sin quejarse, porque lleva años haciéndolo y ya nadie lo mira.',
              'Encontrarlo es la mitad del trabajo. La otra mitad es ponerle un número antes de construir nada, para que dentro de seis meses se pueda decir si la cosa funcionó sin depender de la impresión de nadie.',
            ],
          },
          {
            heading: 'Usar IA y tener un sistema no son la misma compra',
            paragraphs: [
              'Si en tu empresa alguien redacta correos o resume documentos con una herramienta de chat, ya estás dentro de esa estadística. Eso es usar IA y funciona para lo que sirve.',
              'Una suscripción responde cuando alguien le pregunta. En un equipo de cinco personas nadie tiene por oficio pasarse el día preguntando, así que esa ayuda llega hasta donde llega la atención de quien la tiene abierta.',
              'Un sistema es otra compra. Vigila el canal por donde entra el trabajo, hace la tarea, comprueba su propio resultado y deja un registro que puedes auditar. <strong>Un sistema no espera a que le pregunten y se mide contra un número pactado antes de construirlo.</strong>',
              'Ahí está la distancia que enseñan las estadísticas europeas. En la Unión, el 17 % de las empresas pequeñas usó IA en 2025 frente al 55 % de las grandes. Eurostat atribuye esa brecha al coste y a la complejidad de implantar estos sistemas.',
              'Una empresa grande se paga la ingeniería que hace falta para que la IA deje de ser una suscripción y pase a ser una pieza de su operación. <strong>Eso es lo que empaquetamos, un proceso cada vez y con el precio dicho antes.</strong>',
            ],
          },
          {
            heading: 'Cuatro paquetes, un resultado cada uno',
            paragraphs: [
              'Cada paquete se acota a un resultado concreto y se presupuesta con precio cerrado antes de empezar. Estos son los cuatro.',
            ],
            kind: 'lattice',
            bullets: [
              '<strong>Atención 24/7.</strong> Un agente en WhatsApp o en tu web que responde lo habitual a cualquier hora, resuelve las gestiones que le has confiado y pasa el resto a tu equipo con el contexto ya recogido.',
              '<strong>Cualificación de interesados.</strong> Mantiene la primera conversación, hace las preguntas que tú defines y aplica tus criterios. Tu equipo recibe un resumen con los motivos al lado y quien decide sobre cada interesado sigue siendo una persona.',
              '<strong>Automatización documental.</strong> Facturas, tickets y formularios que llegan por chat o por correo y aterrizan como filas comprobadas donde tu equipo ya trabaja. Si ese sitio es una hoja de cálculo, se queda en una hoja de cálculo.',
              '<strong>Soporte y mantenimiento.</strong> Alguien que mira el sistema cada semana y que responde cuando pide atención. Ningún cambio sale a producción sin pasar antes la batería de pruebas.',
            ],
          },
          {
            heading: 'Medido en empresas de tu tamaño',
            paragraphs: [
              'Stanton gestiona alquileres. Las facturas de luz, gas y agua que enviaban sus inquilinos se pasaban a mano a una hoja de cálculo, un minuto de teclado cada una.',
              'Hoy las recibe el mismo chat que el equipo ya usaba, una capa de lectura con un modelo de lenguaje convierte cada una en una fila comprobada de esa misma hoja y <strong>el 98 % pasa sin que nadie las toque</strong>. Desde entonces el cliente ha seguido encargando procesos.',
              'Barceloneta Premium alquila pisos en Barcelona y recibe decenas de mensajes de WhatsApp al día. Comprobar cada consulta se llevaba entre cinco y diez minutos de la atención de alguien. Ahora un agente mantiene la conversación, reúne lo que la agencia necesita saber y le entrega al equipo un resumen por correo con los motivos ya escritos. <strong>La agencia recuperó más de tres horas al día.</strong>',
              'El tercer sistema es producto nuestro. Wazzy reserva, cambia y cancela citas por WhatsApp para clínicas y mueve cientos de citas al mes. En toda la historia del producto no se ha reservado dos veces ninguna cita. Lo operamos nosotros y con nuestro dinero, que es donde se aprende la disciplina de mantenimiento que cuenta esta página.',
            ],
          },
          {
            heading: 'Cuándo te decimos que no compres',
            paragraphs: [
              'Hay proyectos que nacen de un dolor y proyectos que nacen de una demostración. Al segundo lo llamamos el juguete brillante, el que nadie echa de menos cuando no está, cuya ganancia nunca tuvo un número y donde la IA aparece en el titular en vez de en el resultado.',
              'Y está el caso en el que la respuesta buena es más sencilla que un agente. Si tu proceso sigue reglas claras y no hay nada que interpretar dentro de él, una automatización clásica sin modelo lo resuelve por menos dinero y sin un modelo al que vigilar. <strong>Eso también lo construimos nosotros</strong> y te lo decimos cuando es la compra que te conviene.',
            ],
            link: {
              label: 'El juguete brillante, contado entero',
              href: '/blog/el-juguete-brillante',
            },
          },
          {
            heading: 'El precio, antes de que preguntes',
            paragraphs: [
              'Un proyecto acotado se mueve entre 2.500 y 10.000 € de construcción. Mantenerlo vigilado y al día cuesta entre 150 y 500 € al mes. Son los mismos rangos que publicamos para cualquier proyecto, desglosados en la guía de coste.',
              'Lo que consume el modelo y lo que cuesta la infraestructura no están dentro de esa cuota. Los dos van en cuentas abiertas a nombre de tu empresa, así que esas facturas te llegan a ti y no pasan por nosotros.',
              '<strong>La cuota no tiene permanencia.</strong> Pagas el mes que recibes y dejas de pagarlo cuando lo decidas. Lo construido no se apaga ese día, porque el repositorio y la infraestructura están a tu nombre desde el primero.',
            ],
            link: {
              label: 'La guía de coste, rango por rango',
              href: '/cuanto-cuesta-un-agente-de-ia',
            },
          },
          {
            heading: 'Cómo arranca un proyecto',
            paragraphs: [
              'Con un proceso y un número. Antes de construir nada pactamos qué debería ahorrar el sistema y cómo lo vamos a medir, de forma que la decisión de ampliarlo se apoye en una cifra y no en las ganas que le tenga cada uno.',
              'El primer paso es un piloto pequeño, que se paga y cuyo precio cuenta dentro del proyecto final si sigues adelante. Con los datos, los accesos y la tarea bien definida, dos semanas para ese piloto es un plazo realista.',
              'Cuando falta alguna de esas tres cosas te decimos cuál es y qué hace falta para tenerla, en vez de prometerte una fecha que no controlamos.',
            ],
          },
        ],
        faqHeading: 'Preguntas de empresas pequeñas',
        faq: [
          {
            q: '¿No somos demasiado pequeños para esto?',
            a: 'Lo que lo decide no es cuánta gente seáis, es si hay un proceso que se repita lo suficiente como para pagarse su propia automatización. La agencia de alquiler y la gestora que dan las cifras de esta página son equipos pequeños. Las clínicas donde funciona nuestro producto son negocios de barrio.',
          },
          {
            q: '¿Hay que cambiar las herramientas que usamos?',
            a: 'No. El trabajo sigue entrando por donde ya entra hoy y los resultados aterrizan en los archivos y programas que tu equipo abre cada mañana. Una herramienta que obliga a un equipo de cuatro personas a cambiar de costumbres acaba abandonada sin que nadie lo diga en voz alta.',
          },
          {
            q: '¿Qué paga exactamente la cuota mensual?',
            a: 'La vigilancia y el mantenimiento de ese mes: la revisión semanal en producción y alguien que responde cuando el sistema pide atención. Cualquier cambio tiene que pasar la batería de pruebas antes de llegar a tus usuarios. El consumo del modelo y la infraestructura van aparte, en cuentas a nombre de tu empresa.',
          },
          {
            q: 'Nuestros datos están en hojas de cálculo. ¿Es un problema?',
            a: 'Es el caso normal y no un inconveniente. Los dos sistemas de cliente que cuenta esta página leen de un chat y escriben en una hoja de cálculo. Lo que sí comprobamos antes de empezar es que el dato que el proceso necesita exista en alguna parte, porque es lo único que no se puede construir.',
          },
          {
            q: '¿Cuánto tardamos en tener algo funcionando?',
            a: 'Dos semanas para el piloto es un plazo realista, con el proceso elegido, los datos alcanzables y la tarea definida. Un piloto no es una demostración preparada, es tu proceso real sobre tus casos reales y con su medición al lado, así que lo que decidas al final lo decides con tus propios números.',
          },
          {
            q: '¿Y si al final no sale a cuenta?',
            a: 'Te lo decimos antes de construir nada. Si eso solo se ve una vez arrancado el piloto, te lo decimos al terminarlo, que es cuando pararlo te cuesta el piloto y no el proyecto entero. Lo que no vamos a hacer es entregarte algo sin medir y llamarlo un éxito.',
          },
        ],
        cta: {
          heading: '¿Qué dejarías de hacer a mano primero?',
          body: 'Cuéntanos la tarea que más se repite y cada cuánto vuelve, no la tecnología que crees que la arregla. Te respondemos en menos de un día laborable.',
          button: 'Cuéntanos tu reto',
        },
      },
      realEstate: {
        metaTitle: 'IA para inmobiliarias y gestión de alquileres, Ideasforge',
        metaDescription:
          'IA para inmobiliarias que atiende solicitudes a cualquier hora, cualifica con tus criterios y deja de teclear las facturas de los inquilinos. Dos casos reales.',
        hero: {
          title: 'IA para tu inmobiliaria, de la primera consulta a la última factura',
          subtitle:
            'Una agencia tiene dos cuellos de botella, las consultas que entran a cualquier hora y el papeleo que se acumula puertas adentro. Hemos construido para los dos y los dos están funcionando.',
          cta: 'Cuéntanos tu reto',
        },
        stats: [
          {
            value: '5 a 10 min',
            label: 'costaba comprobar una sola consulta entrante, decenas de veces al día',
          },
          {
            value: '+3 horas',
            label: 'al día recuperó la agencia, solo en gestionar las solicitudes que entran',
          },
          {
            value: '98 %',
            label: 'de las facturas de suministros pasa sin que nadie las toque en la gestora',
          },
        ],
        sections: [
          {
            heading: 'Dos trabajos distintos en el mismo negocio',
            id: 'el-problema',
            paragraphs: [
              'Los dos cuellos de botella de una inmobiliaria están en extremos opuestos de la misma empresa. Uno mira hacia fuera, las consultas que llegan a cualquier hora de gente que quiere ver un piso. El otro mira hacia dentro, el papeleo que se acumula cuando esa gente ya se ha mudado.',
              'Casi siempre se ataca primero el de fuera, porque hace ruido y se ve. El de dentro no se queja, solo se lleva las tardes de alguien.',
              '<strong>Construimos para un cuello de botella cada vez y medimos lo que te cuesta hoy antes de construir nada.</strong> Los dos sistemas que cuenta esta página son eso, uno en una agencia que se ahogaba en consultas y otro en una gestora que se ahogaba en facturas.',
            ],
          },
          {
            heading: 'Las consultas y el precio de una hora de silencio',
            paragraphs: [
              'Quien busca piso no te escribe solo a ti. Escribe a la vez a todos los anuncios que le encajan. La conversación se la queda quien conteste primero con algo útil.',
              'Que un interesado se enfríe no es una intuición de comercial, se midió en 2011 sobre más de un millón de consultas y las cifras están contadas en el blog. Lo que importa en esta página es la cuenta de tu lado.',
              'Barceloneta Premium, una agencia de Barcelona, recibía decenas de mensajes de WhatsApp al día. Comprobar cada consulta se llevaba entre cinco y diez minutos antes de que nadie supiera si merecía una visita.',
              '<strong>Esos minutos no se iban en vender. Se iban en averiguar si había algo que vender.</strong>',
              'El canal tampoco lo elegimos nosotros. Según el panel de hogares de la CNMC, con datos del cuarto trimestre de 2025, el 94,6 % de los internautas españoles usa WhatsApp de forma habitual. La segunda aplicación de mensajería se queda en el 27,6 %. Un canal que nadie tiene que instalarse es medio camino hecho.',
            ],
            link: {
              label: 'Las cifras de un interesado que se enfría',
              href: '/blog/agente-ia-inmobiliaria',
            },
          },
          {
            heading: 'Qué hace el agente con una consulta',
            paragraphs: [
              'Mantiene la conversación en el idioma en que le han escrito y reúne lo que la agencia necesita saber: por qué preguntan, qué presupuesto manejan y qué documentación pueden aportar.',
              '<strong>Los criterios no son nuestros y no están enterrados dentro del sistema.</strong> Viven en una hoja de cálculo del propio Drive de la agencia y los edita la agencia. El día que cambian los requisitos para considerar apto a alguien, nadie tiene que llamarnos.',
              'Lo que recibe el equipo es un correo con el veredicto y un párrafo que lo explica. Alguien lee tres líneas y decide si concierta la visita.',
              '<strong>Quien juzga sigue siendo una persona, que es lo sensato y además lo que pide la norma.</strong> El artículo 22 del reglamento europeo de protección de datos reconoce el derecho a no quedar sujeto a decisiones basadas únicamente en un tratamiento automatizado cuando te afectan de forma significativa. Una revisión humana con peso real es lo que hace que la decisión deje de ser «únicamente» automatizada.',
              'El que ha escrito recibe respuesta al momento, a cualquier hora, también en los picos de alquiler donde antes se quedaba esperando. La agencia recuperó más de tres horas al día.',
            ],
          },
          {
            heading: 'La versión que hubo que tirar',
            paragraphs: [
              'La primera que construimos seguía el patrón sobre el que está montado casi todo lo que se vende como agente, un modelo con herramientas a su disposición e instrucciones de usarlas cuando hiciera falta.',
              '<strong>Muchas veces no las usaba.</strong> No fallaba nada que se pudiera consultar después en ningún registro. El modelo decidía que podía responder sin comprobar, así que o se inventaba la respuesta o le decía a un interesado real que no podía avanzar cuando sí se podía.',
              'La reconstrucción se llevó la contabilidad al código. Una máquina de estados lleva la cuenta de qué se ha reunido ya y en qué fase de preguntas está la conversación. El modelo enruta a la herramienta que toca en esa fase. <strong>El código lleva la cuenta y el modelo interpreta a las personas.</strong>',
              'Lo contamos porque es el fallo que una demostración no enseña nunca. Un agente que responde con seguridad sin haber comprobado nada queda mejor en una reunión que uno que se para.',
            ],
          },
          {
            heading: 'La otra mitad, el papeleo de puertas adentro',
            paragraphs: [
              'El segundo cuello de botella no tiene ninguna conversación dentro. Stanton gestiona alquileres. Las facturas de luz, gas y agua que enviaban sus inquilinos se pasaban a mano a una hoja de cálculo, documento a documento.',
              'Cada una costaba un minuto de teclado. Hoy llegan por el mismo chat que el equipo ya usaba, una capa de lectura con un modelo de lenguaje convierte cada una en una fila comprobada de esa misma hoja y <strong>el 98 % pasa sin que nadie las toque</strong>.',
              'El resto se para y llega a una persona con el documento al lado y el motivo señalado. <strong>Pararse es el diseño y no el fallo.</strong> Un formato nuevo leído con la plantilla vieja no da ningún error, te entrega un número equivocado con buena pinta. Eso lo hemos visto pasar.',
              'Nadie tuvo que aprender una herramienta nueva. El cliente ha seguido encargando procesos desde entonces, que es la señal que cuenta, porque lo que se usa se amplía.',
            ],
            link: {
              label: 'El recorrido documental, paso a paso',
              href: '/servicios/automatizacion-de-procesos-con-ia',
            },
          },
          {
            heading: 'Lo que no hace',
            paragraphs: [
              '<strong>Si alguien deja de contestar, la conversación se queda como está.</strong> No hay ninguna secuencia de insistencia. Fue decisión de la agencia y nos parece la buena, porque perseguir a quien se ha enfriado rara vez compensa la molestia que causa.',
              'Tampoco escribe en tu CRM cuando tu CRM solo deja consultar. Es el caso de Barceloneta, así que el veredicto sale por correo, que además es donde el equipo abre las cosas.',
              'Y no decide quién se queda el piso. Reúne, aplica los criterios que tú has escrito y explica su razonamiento. La firma es de una persona.',
            ],
          },
          {
            heading: 'Qué cuesta',
            paragraphs: [
              'Un sistema de este tamaño se mueve entre 2.500 y 10.000 € de construcción, con una operación mensual de entre 150 y 500 €. Qué mueve esas cifras está desglosado en la guía de coste.',
              '<strong>Esa cuota paga la vigilancia y el mantenimiento, no el consumo.</strong> El modelo y la infraestructura van en cuentas a nombre de tu empresa, así que esas facturas las ves tú y no pasan por nosotros. La cuota no tiene permanencia y el repositorio es tuyo desde el primer día.',
            ],
            link: {
              label: 'La guía de coste, rango por rango',
              href: '/cuanto-cuesta-un-agente-de-ia',
            },
          },
          {
            heading: 'Por dónde se empieza',
            paragraphs: [
              'Por el de los dos cuellos de botella que más te esté costando este mes. Cuenta los minutos que se lleva una consulta y multiplica por cuántas entran al día. O cuenta los documentos que alguien reteclea en una semana. Ese número es a la vez el techo del presupuesto y la vara de medir.',
              'Con los datos, los accesos y la tarea definida, dos semanas para un piloto es un plazo realista. El piloto se paga y su precio cuenta dentro del proyecto si sigues adelante, así que lo que compras ahí es una decisión apoyada en tus propios números.',
            ],
          },
        ],
        faqHeading: 'Preguntas de agencias y gestoras',
        faq: [
          {
            q: '¿Hay que cambiar el CRM o el programa de gestión?',
            a: 'No. Nos conectamos a lo que ya tienes y los resultados aterrizan donde tu equipo ya trabaja, que en los dos sistemas de esta página son un chat que ya usaban y una hoja de cálculo que ya tenían. Donde un sistema solo permite consultar y no escribir, te lo decimos y la salida va a otro sitio.',
          },
          {
            q: '¿Quién decide si un interesado es apto?',
            a: 'Una persona de tu agencia, con el resumen y su razonamiento delante. El agente reúne la información y aplica los criterios que tú has escrito, sin dar nunca la última palabra por su cuenta. Además de ser lo sensato, es lo que espera el artículo 22 del reglamento europeo de protección de datos sobre las decisiones tomadas solo por medios automáticos.',
          },
          {
            q: '¿Podemos cambiar nosotros los criterios de cualificación?',
            a: 'Sí, porque se diseñó así a propósito. Viven en una hoja de cálculo de tu propio Drive y no dentro del sistema, de modo que tu equipo los edita el día que cambian los requisitos sin abrirnos ninguna petición.',
          },
          {
            q: '¿Qué pasa con las consultas que entran a las tres de la mañana?',
            a: 'Se contestan. En eso está buena parte de la gracia, porque quien escribe a las tres de la mañana está escribiendo a varios anuncios a la vez y la respuesta útil es la que llega primero. Lo que necesite criterio espera a tu equipo por la mañana, ya reunido y resumido.',
          },
          {
            q: '¿Sirve para venta o solo para alquiler?',
            a: 'La agencia de esta página está ampliando la misma base del alquiler a la venta de viviendas y a procesos internos. Ese es el patrón que recomendamos, empezar por el proceso que más horas se lleva, medirlo y crecer desde ahí una vez que se ha demostrado.',
          },
          {
            q: 'Somos una agencia pequeña. ¿No nos queda grande?',
            a: 'Los dos sistemas de esta página funcionan en equipos pequeños. Lo que lo decide no es cuánta gente seáis, es si la misma tarea se repite lo suficiente como para pagarse su propia automatización. Decenas de consultas al día a cinco o diez minutos cada una responden rápido a esa pregunta.',
          },
        ],
        cta: {
          heading: '¿Cuál de los dos te está costando más?',
          body: 'Cuéntanos dónde se van las horas, si en las consultas o en el papeleo. Te decimos si le vemos retorno y te respondemos en menos de un día laborable.',
          button: 'Cuéntanos tu reto',
        },
      },
      accounting: {
        metaTitle: 'IA para gestorías y asesorías fiscales, Ideasforge',
        metaDescription:
          'Facturas, tickets y albaranes que tu equipo deja de teclear. Un sistema que los lee, comprueba que cuadran y solo escala lo dudoso, con un caso en producción.',
        hero: {
          eyebrow: 'Gestorías y asesorías',
          title: 'Las facturas de tus clientes, leídas y comprobadas sin teclear',
          subtitle:
            'Un sistema que lee cada documento que entra, comprueba que los datos cuadran antes de darlos por buenos y solo escala a una persona lo que necesita criterio.',
          cta: 'Cuéntanos tu caso',
        },
        stats: [
          {
            value: '98 %',
            label: 'de las facturas pasa sin que nadie la toque, en el sistema que tenemos en producción',
          },
          {
            value: '1 minuto',
            label: 'de teclado costaba cada una de esas facturas antes de que existiera el sistema',
          },
          { value: '2 semanas', label: 'para un piloto, con los datos y los accesos preparados' },
        ],
        sections: [
          {
            heading: 'El cuello de botella nunca fue leer la factura',
            id: 'el-problema',
            paragraphs: [
              'En una gestoría no entra un tipo de documento, entran todos. Facturas de suministros, facturas de proveedor, tickets de gasto, albaranes que hay que casar contra un pedido. Cada cliente trae sus emisores y cada emisor coloca el total donde le pareció.',
              'Leer ese papel dejó de ser difícil hace tiempo. El OCR, que es el reconocimiento óptico de caracteres, convierte la imagen en texto desde hace décadas. Un modelo de lenguaje interpreta hoy ese texto como lo haría alguien con oficio.',
              '<strong>Lo que sigue costando es poder fiarte de lo leído sin volver a abrir el documento.</strong> Un importe mal extraído que nadie detecta no te ahorra un minuto, te cuesta una corrección contable tres meses después.',
              'Ese trabajo se mide fácil. En el caso que sostiene esta página cada factura costaba un minuto de teclado, así que una asesoría con cuatrocientas facturas al mes dedica casi siete horas mensuales a copiar datos que ya estaban escritos. Cambia el número por el tuyo y sale tu cuenta.',
            ],
          },
          {
            heading: 'Por qué la demostración siempre sale bien',
            paragraphs: [
              'Cualquier proveedor te enseñará una factura leída sin un fallo. Y saldrá bien de verdad, porque la factura de la demostración suele ser un PDF nativo, limpio, generado por un programa.',
              'Las tuyas no siempre lo son. Llegan escaneadas de un original doblado, fotografiadas con el móvil de un inquilino en un portal mal iluminado, reenviadas tres veces y comprimidas por el camino.',
              'Esa distancia se ha medido. <strong>PureDocBench</strong>, un banco de pruebas publicado en mayo de 2026 por investigadores del Instituto de Automatización de la Academia China de Ciencias, tomó 1.475 páginas anotadas de diez ámbitos y presentó cada una en tres versiones, desde la limpia hasta la degradada como llega en la vida real.',
              'Sobre las degradadas de verdad, los sistemas especializados en documentos perdían más de catorce puntos respecto a su nota en limpio. Y el titular del estudio conviene retenerlo. <strong>El mejor sistema medido saca un 74 sobre 100.</strong> Sus autores concluyen que evaluar solo con documentos limpios engaña a la hora de decidir si algo se puede poner en producción.',
              'No lo contamos para desanimar a nadie. Lo contamos porque señala dónde está el trabajo de verdad, que no es la lectura sino lo que el sistema hace cuando la lectura sale regular.',
            ],
          },
          {
            heading: 'Qué entra en un sistema así y qué no',
            paragraphs: [
              'Lo que automatizamos en una gestoría y lo que dejamos donde está.',
            ],
            kind: 'checklist',
            bullets: [
              'Facturas de suministros y de proveedor. Entran por el canal que tu equipo ya usa y salen como filas normalizadas allí donde trabajáis.',
              'Tickets y justificantes de gasto, fotografiados por quien los genera.',
              'Albaranes que hay que casar contra un pedido antes de dar nada por bueno.',
              'Formularios escaneados que hoy alguien vuelca campo a campo.',
              'No hacemos la contabilidad ni decidimos el asiento. El sistema deja el dato comprobado y con su enlace al documento original.',
              'No sustituimos tu programa de gestión. Nos conectamos a lo que ya tienes. Si el destino es una hoja de cálculo, es una hoja de cálculo.',
              'No certificamos nada ante la Agencia Tributaria. Esto no es software de facturación ni lo sustituye.',
            ],
          },
          {
            heading: 'Facturas de proveedor, tickets y albaranes no se rompen igual',
            paragraphs: [
              'La lista de arriba se lee como si los tres fueran el mismo trabajo con distinto papel. No lo son. Quien haya intentado automatizarlos lo sabe. <strong>Cada tipo falla por un motivo distinto y por eso se trata distinto.</strong>',
              'Una <strong>factura de proveedor</strong> llega en cien maquetaciones y el total está donde su emisor decidió ponerlo. Ahí el problema es de interpretación. Es donde un modelo de lenguaje aporta lo que ninguna plantilla podía.',
              'Un <strong>ticket de gasto</strong> casi nunca es un PDF. Es una foto de un papel térmico arrugado, hecha con prisa en la puerta de un sitio y con media luz. El problema deja de ser interpretar y pasa a ser leer, que es justo donde las herramientas se caen y donde la comprobación posterior importa más.',
              'Un <strong>albarán</strong> no se parece a ninguno de los dos, porque la pregunta que hay que responder no es qué pone. Es si lo que pone coincide con lo que se pidió. Eso no es extraer, es casar dos documentos. Un sistema que solo sabe extraer lo da por bueno sin haber comprobado nada.',
            ],
          },
          {
            heading: 'Del OCR a la contabilidad, hasta dónde llegamos',
            paragraphs: [
              'El dato sale comprobado y con su enlace al documento original, en el sitio desde el que tu equipo trabaja. Hasta ahí llegamos nosotros.',
              '<strong>El asiento lo decides tú. No es una limitación nuestra, es una raya puesta a propósito.</strong> Clasificar un gasto es una decisión con criterio fiscal detrás, que cambia según el cliente y que a veces depende de una conversación que la máquina no ha tenido.',
              'Un asiento equivocado tiene además una propiedad desagradable: no se nota al ponerlo, se nota meses después y a veces delante de una inspección. Preferimos dejar el dato impecable en la puerta y que la decisión la firme quien responde de ella.',
              'Lo que sí te ahorras es todo lo anterior, que es donde estaban las horas. Nadie teclea importes, nadie busca el número de factura dos veces y nadie descubre en el cierre que faltaba un documento.',
            ],
          },
          {
            heading: 'Lo que pasa cuando algo no cuadra',
            paragraphs: [
              'Un sistema que siempre responde es un sistema en el que no se puede confiar. El nuestro comprueba antes de dar un dato por bueno. Lo que no pasa la comprobación se detiene.',
              'Detenerse no es el fallo, es el diseño. <strong>Un formato nuevo procesado con la plantilla vieja produce datos que parecen buenos.</strong> Eso es peor que no procesarlos, porque nadie revisa lo que parece bien.',
              'Cuando algo se detiene, llega a una persona con el documento delante y el motivo señalado. No como una alerta suelta a media tarde que hay que ponerse a investigar.',
            ],
            link: {
              label: 'El flujo completo, paso a paso',
              href: '/servicios/automatizacion-de-procesos-con-ia',
            },
          },
          {
            heading: 'Y si la factura electrónica deja esto obsoleto',
            paragraphs: [
              'Es la primera objeción de quien trabaja con papel fiscal todos los días. Y es justa, así que la respuesta va con sus dos mitades.',
              'Los plazos, a día de hoy. VeriFactu obliga a las sociedades desde el 1 de enero de 2027 y al resto desde el 1 de julio de ese mismo año, tras el aplazamiento aprobado en diciembre de 2025. La factura electrónica entre empresas ya tiene reglamento, el Real Decreto 238/2026 publicado el 31 de marzo, pero sus plazos no empiezan a contar hasta que se apruebe una orden ministerial que sigue en borrador. <strong>Si alguien te da una fecha firme para eso, te está citando un proyecto y no el BOE.</strong>',
              'Fuera de España la dirección es la misma. La directiva del Consejo 2025/516, adoptada en marzo de 2025, fija julio de 2030 para la facturación electrónica estructurada entre países de la Unión.',
              'La primera mitad de la respuesta es que sí, para parte del papel esto caduca a medio plazo. Quien te diga lo contrario te está vendiendo algo. La obligación cubre las facturas entre empresarios y profesionales. Esas acabarán llegando estructuradas de origen.',
              'La segunda mitad es todo lo demás. Las facturas emitidas a personas quedan fuera. En una administración de fincas son casi todas. Quedan también los tickets, los albaranes, el proveedor de fuera y los años de transición en que convivirán los dos mundos.',
              'Y cuando el dato llegue limpio de origen seguirá haciendo falta comprobar que cuadra, porque limpio de formato no es lo mismo que correcto.',
            ],
            link: {
              label: 'Lo desarrollamos en el blog',
              href: '/blog/automatizacion-facturas-ocr-ia',
            },
          },
          {
            heading: 'Lo que llevamos medido',
            paragraphs: [
              'Stanton es una gestora de fincas y fue el primer sitio donde montamos esto. Las facturas de luz, gas y agua de cada inquilino se metían a mano, documento a documento. Cada una costaba un minuto de teclado.',
              'Hoy el equipo las reenvía por el chat que ya usaba, el sistema las lee y cada una aterriza como una fila normalizada en la misma hoja de cálculo de siempre. <strong>El 98 % pasa sin que nadie la toque.</strong> El resto escala con el documento al lado.',
              'Nadie tuvo que aprender una herramienta nueva. Y el cliente ya nos ha encargado más procesos administrativos, que es la señal que de verdad cuenta, porque lo que se usa se amplía.',
            ],
            link: { label: 'El caso completo', href: '/casos/stanton' },
          },
          {
            heading: 'Por dónde se empieza',
            paragraphs: [
              'Por un proceso, no por todos. El que más duele y más se repite, que en una gestoría suele ser el mismo para casi todos los clientes.',
              'Con los datos, los accesos y la tarea bien definida, un piloto en dos semanas es realista. Antes de empezarlo te decimos qué esperamos que ahorre y cómo lo vamos a medir, para que la palabra «automatizado» venga con un número detrás.',
            ],
          },
          {
            heading: 'Qué cuesta',
            paragraphs: [
              'Un sistema de este tamaño entra en el rango que desglosamos en la guía de precios, con una construcción cerrada y una cuota mensual mientras está en marcha.',
              '<strong>Esa cuota paga la vigilancia y el mantenimiento, no el consumo.</strong> Las llamadas al modelo y la infraestructura van en cuentas a tu nombre, así que ves lo que gastas y no pasa por nosotros.',
            ],
            link: {
              label: 'Cuánto cuesta un agente de IA',
              href: '/cuanto-cuesta-un-agente-de-ia',
            },
          },
        ],
        faqHeading: 'Preguntas de gestorías',
        faq: [
          {
            q: '¿Sirve si cada cliente nos manda las facturas de una manera distinta?',
            a: [
              'Sí, es el caso normal. La entrada es el canal que tu equipo ya usa, un correo reenviado o un chat, así que nadie tiene que cambiar lo que hace hoy.',
              'La variedad de emisores tampoco es el problema. Lo que se fija no es el formato de entrada, es la estructura de salida, los campos que tienen que salir de cada documento para que el dato sirva.',
            ],
          },
          {
            q: '¿Qué pasa el día que un proveedor cambia el formato de su factura?',
            a: [
              'El sistema comprueba que el documento encaja con lo esperado antes de extraer nada. Si no encaja, no lo procesa. Se detiene y una persona recibe el aviso con el documento delante.',
              'Detenerse es la respuesta correcta. Un formato nuevo leído con la plantilla vieja no da un error, da un dato equivocado con buena pinta. Y eso lo hemos visto pasar.',
            ],
          },
          {
            q: '¿Tenemos que cambiar de programa de gestión?',
            a: 'No. Nos conectamos a lo que ya tienes y el dato aterriza donde tu equipo trabaja hoy, sea un programa de contabilidad o una hoja de cálculo. Obligar a aprender una herramienta nueva es la forma más rápida de que una automatización termine sin usarse.',
          },
          {
            q: '¿Esto sustituye a nuestro software de facturación o nos vale para VeriFactu?',
            a: 'No. Conviene decirlo claro. Lo que construimos lee los documentos que entran y deja sus datos comprobados en tus sistemas. Emitir facturas conforme a la normativa es trabajo de tu programa de facturación. Esto ni lo sustituye ni lo certifica.',
          },
          {
            q: '¿Cuánto tarda en estar funcionando?',
            a: 'Dos semanas para un piloto es realista cuando el proceso está acotado y los accesos preparados. Un piloto no es una demostración, es el proceso real con documentos reales y su medición al lado, para poder decidir con un número si se amplía.',
          },
          {
            q: '¿Y si al final no compensa?',
            a: 'Te lo decimos antes de cobrarlo. Si al mirar el proceso no le vemos retorno, lo decimos y no seguimos. Un proyecto que no ahorra horas medibles termina abandonado. Y eso sale más caro que no haberlo hecho.',
          },
        ],
        cta: {
          heading: '¿Cuántas facturas teclea hoy tu equipo?',
          body: 'Cuéntanos el proceso que más horas se lleva, no la tecnología que crees que lo arregla. Te respondemos en un día laborable con una primera lectura de tu caso.',
          button: 'Cuéntanos tu reto',
        },
      },
      about: {
        nav: false,
        metaTitle: 'Quiénes somos, Ideasforge',
        metaDescription:
          'Diseñamos, construimos y mantenemos agentes de IA y automatización de procesos que llegan a producción. Cinco sistemas funcionando hoy con usuarios reales.',
        hero: {
          title: 'Un equipo que mantiene lo que construye',
          subtitle:
            'Si tu idea no es viable, te lo decimos antes de cobrarla. Si tiene recorrido, trabajamos contigo codo con codo hasta que funcione en producción.',
          cta: 'Cuéntanos tu reto',
        },
        sections: [
          {
            heading: 'Qué hacemos',
            paragraphs: [
              'En Ideasforge diseñamos, construimos y mantenemos agentes de IA y automatización de procesos. Trabajamos sobre lo que ya tienes y nos conectamos a tus sistemas y a las herramientas con las que tu gente trabaja cada día, en lugar de pedirte que cambies tu manera de trabajar para encajar con la nuestra.',
              '<strong>El repositorio y la infraestructura quedan a tu nombre desde el primer día</strong>, porque un sistema del que dependes tiene que ser tuyo.',
              'Hoy hay <strong>cinco sistemas nuestros funcionando con usuarios reales</strong> en industria, agricultura, inmobiliaria, salud y servicios. Uno es producto propio, Wazzy, un asistente de citas por WhatsApp que trata datos de salud a diario y que usamos como campo de pruebas de nuestras prácticas antes de llevarlas a un cliente.',
              'El criterio con el que juzgamos todos es el mismo, lo que gana el negocio antes que lo que luce en una demostración.',
            ],
            link: { label: 'Ver los servicios', href: '/#servicios' },
          },
        ],
        cta: {
          heading: '¿Hablamos de tu caso?',
          body: 'Escríbenos con el problema que tienes ahora mismo, no con la tecnología que crees que lo arregla. Respondemos en un día laborable.',
          button: 'Cuéntanos tu reto',
        },
      },
      aiGuide: {
        tocHeading: 'Qué verás en esta guía',
        metaTitle: 'Qué es un agente de IA y cómo funciona, Ideasforge',
        metaDescription:
          'Qué es un agente de IA, qué tipos hay, para qué se usan de verdad en una empresa y dónde encaja la IA agéntica. En lenguaje llano, con casos en producción.',
        hero: {
          eyebrow: 'Guía',
          title: 'Agentes de IA, qué son y para qué sirven en tu empresa',
          subtitle:
            'Qué es un agente de IA, qué tipos hay, para qué se usan de verdad en una empresa, lo que puede salir mal y qué preguntar antes de contratar a nadie.',
        },
        sections: [
          {
            heading: 'Qué es un agente de IA',
            id: 'que-es',
            part: 'La respuesta corta',
            paragraphs: [
              '<strong>Un agente de IA es un programa que entiende lo que le pides y elige por su cuenta qué hacer para resolverlo.</strong> Dentro lleva un modelo de lenguaje, que es la parte que entiende, más una lista de acciones que alguien le ha autorizado, como consultar una agenda, buscar en un manual o registrar un dato.',
              'La diferencia con un bot de los de siempre está en quién decide la respuesta. La del bot ya estaba escrita antes de que nadie preguntara. La del agente se decide en el momento, según lo que le hayan pedido.',
              'Y la diferencia que importa en una empresa es sobre qué datos trabaja. Un asistente de uso general se queda en lo que trae de fábrica. Un agente de empresa entra en tus sistemas, con los permisos de quien lo usa y dentro de los límites que tú apruebes.',
            ],
          },
          {
            heading: 'Dónde acaba la IA generativa y empieza la IA agéntica',
            id: 'ia-agentica',
            part: 'La respuesta corta',
            paragraphs: [
              'Al buscar sobre esto te vas a cruzar con dos etiquetas que el mercado usa sin explicar nunca. <strong>La IA generativa produce contenido, desde un texto hasta un trozo de código.</strong> La IA agéntica usa esos mismos modelos para actuar: decide los pasos, consulta las herramientas que hacen falta, comprueba lo que sale y termina la tarea.',
              'El ejemplo más corto que tenemos. La generativa te escribe el correo. La agéntica lo escribe, mira la agenda de los convocados y manda la invitación.',
              'Esa capacidad extra exige un control extra. Es la razón de que el resto de esta guía hable tanto de medir. <strong>Un sistema que solo escribe se corrige leyéndolo antes de enviarlo. Uno que actúa ya ha tocado tus sistemas cuando alguien se entera.</strong>',
            ],
          },
          {
            heading: 'Tipos de agentes',
            part: 'Tipos y usos',
            kind: 'lattice',
            paragraphs: [
              '<strong>No todos los agentes deciden igual y ahí está buena parte de la diferencia de precio</strong>, tanto lo que cuesta construir uno como, sobre todo, lo que cuesta mantenerlo. Con tres categorías sitúas casi todo lo que te van a ofrecer.',
            ],
            bullets: [
              'Que reacciona. Responde siempre igual ante la misma situación, siguiendo reglas fijas. Un termostato que enciende la calefacción cuando baja la temperatura. Barato y predecible, aunque solo sirve para lo que alguien previó de antemano.',
              'Que planifica. Recibe un objetivo y monta él mismo los pasos para llegar, rehaciéndolos si algo se tuerce. Le pides un presupuesto y consulta el catálogo, mira existencias y avisa si falta una pieza. Es lo que hoy se vende como agente de IA, el nuestro incluido.',
              'Que aprende. Mejoraría solo, con su propia experiencia y sin que nadie vuelva a tocarlo. Es el que más sale en las promesas y el que menos en producción.',
            ],
          },
          {
            heading: 'Cuando te dicen que aprende solo',
            part: 'Tipos y usos',
            paragraphs: [
              'El tipo de agente de inteligencia artificial que «aprende» merece un aviso aparte, porque «aprende de tus datos» es de las frases más repetidas del sector y casi nunca significa lo que parece. <strong>Un agente en producción no mejora por sí solo.</strong> Mejora cuando una persona cambia sus instrucciones, ordena mejor los datos o añade casos a la batería de pruebas. Ese cambio lo ejecuta siempre alguien.',
              'Si te dicen que aprende solo, te conviene hacerte estas tres preguntas: qué cambia exactamente, quién lo ejecuta y cómo se comprueba que no ha empeorado otra cosa. Sirven tanto para hacérselas al proveedor que te vaya a construir la solución como para hacértelas tú mismo y entender mejor lo que se está construyendo.',
            ],
          },
          {
            heading: 'Dónde encaja un agente entre las formas de automatizar',
            id: 'formas',
            part: 'Tipos y usos',
            kind: 'checklist',
            formasDiagram: true,
            paragraphs: [
              '<strong>Casi cualquier propuesta que recibas encaja en una de estas cinco formas.</strong> Conviene saber cuál te están vendiendo, porque lo que de verdad marca el coste de probarlo, de vigilarlo y de arreglarlo cuando falla es la forma, más que el tipo de agente que lleve dentro. <strong>Las dos primeras no llevan ningún agente.</strong> Las tres últimas son las que el mercado llama IA agéntica.',
            ],
            bullets: [
              'Un flujo fijo sin modelo. Los pasos corren en un orden establecido y unas reglas deciden las bifurcaciones. Tu ERP y tu plataforma de integración ya hacen esto y es lo más barato que funciona.',
              'Un flujo fijo con paradas de modelo. El mismo flujo de siempre, con el modelo llamado solo en los dos o tres puntos donde hay que leer o interpretar algo. Es la forma más común hoy en sistemas de empresa reales y la primera que consideramos.',
              'Un agente. Recibe un objetivo, un conjunto cerrado de acciones y sus límites. Con eso decide qué acción toca según lo que va encontrando. Compensa cuando la ruta cambia de verdad en cada caso.',
              'Un agente dentro de un flujo. El recorrido sigue siendo fijo por fuera y uno de sus pasos le cede el mando a un agente, que resuelve ese trozo y lo devuelve. Da margen donde los casos llegan desordenados y mantiene previsible todo lo demás.',
              'Varios agentes con un orquestador. Una única puerta de entrada entiende la petición y la dirige al especialista que toca. Es la respuesta correcta cuando los dominios son de verdad distintos. Nosotros la usamos en el asistente de planta justo por eso. Para todo lo demás es la equivocada, porque cada agente que añades vuelve a costar lo que costó el primero.',
            ],
            link: {
              label: 'Por qué no nos gustan las arquitecturas agénticas',
              href: '/blog/no-me-gustan-los-agentes-de-ia',
            },
          },
          {
            heading: 'Aplicaciones de agentes de IA en el mundo real',
            id: 'aplicaciones',
            part: 'Tipos y usos',
            kind: 'lattice',
            paragraphs: [
              '«Sirve para todo» es la respuesta que no ayuda a nadie. En la práctica, casi todo lo que hoy funciona dentro de una empresa cae en unos pocos usos. Estos cinco son los que más se repiten.',
              'Todos comparten la misma forma. Alguien tenía que leer algo y después actuar sobre un sistema de la empresa. <strong>Si a tu caso le falta una de esas dos mitades, casi siempre hay una manera más barata de resolverlo que un agente.</strong>',
            ],
            bullets: [
              'Leer documentos que llegan sin formato fijo. Facturas, albaranes, contratos, partes de trabajo. Cada emisor manda el suyo con otra plantilla, así que alguien acaba tecleándolos uno a uno. Lo tenemos funcionando sobre facturas de suministros.',
              'Preguntar a los datos de la empresa sin saber consultarlos. Alguien pregunta con sus palabras y recibe la cifra, sin abrir un panel ni aprender a escribir una consulta. Lo tenemos funcionando por WhatsApp.',
              'Consultar la documentación interna y guiar un diagnóstico. Manuales, procedimientos e histórico de averías que existen pero que nadie encuentra a tiempo. Lo tenemos funcionando en una planta industrial.',
              'Cualificar lo que entra por mensaje. Solicitudes, interesados, peticiones de presupuesto. El agente reúne lo que hace falta para decidir y lo entrega ordenado. Quien decide sigue siendo una persona. Lo tenemos funcionando en una agencia inmobiliaria.',
              'Atender y gestionar fuera de horario. Reservas, cambios y cancelaciones a cualquier hora, con el calendario al día y una persona detrás para lo urgente. Lo tenemos funcionando en clínicas, con nuestro propio producto.',
            ],
          },
          {
            heading: 'Lo que puede hacer y lo que no',
            part: 'Lo que puede salir mal',
            paragraphs: [
              'Nada de esto se enchufa y funciona. <strong>La distancia entre un buen resultado y una decepción está casi siempre en el alcance del proyecto.</strong> Con un alcance demasiado amplio el sistema corre el peligro de ser mediocre en todo y de no ganarse la confianza en nada. Con uno demasiado estrecho, el montaje cuesta más que el trabajo que ahorra.',
              'Los proyectos que salen bien eligen una tarea con un límite claro alrededor, la demuestran y después la amplían.',
              'Lo que los sistemas de hoy hacen bien es leer lo que llega sin forma fija, entender una petición escrita de veinte maneras, seguir un procedimiento paso a paso y actuar dentro de un conjunto cerrado de acciones que alguien aprobó. Esa lista es nueva de verdad y es la razón de que procesos que sobrevivieron a todas las olas de automatización anteriores estén ahora en juego.',
              'Lo que no hacen es inventar conocimiento que nadie escribió, garantizar un resultado sin que un código lo compruebe antes, ni mejorar solos mientras nadie mide.',
              '<strong>Parte de nuestro trabajo es decirte cuándo no hace falta un agente.</strong> A veces basta con una regla, con un formulario bien hecho o con rediseñar el proceso, porque un modelo encima de un proceso roto o mal definido solo hace que el desastre llegue antes.',
            ],
          },
          {
            heading: 'Medido antes de cada cambio, vigilado después',
            part: 'Lo que puede salir mal',
            paragraphs: [
              'Hay un riesgo que casi nadie presupuesta. <strong>Un sistema con IA puede empeorar solo, sin que nadie lo toque.</strong> El proveedor actualiza el modelo sin cambiarle el nombre, tu documentación crece y tus datos van cambiando con el tiempo.',
              '<a class="link-inline" href="https://arxiv.org/abs/2307.09009" rel="noopener noreferrer" target="_blank">Chen, Zaharia y Zou</a>, de Stanford y Berkeley, lo midieron sobre el mismo modelo comercial en marzo y en junio de 2023. Su comportamiento cambió tanto que en una tarea el acierto pasó del 97,6 % al 2,4 %, sin que nadie del lado del cliente tocara nada.',
              'Gartner calculó en junio de 2025 que más del 40 % de los proyectos de IA agéntica se cancelará antes de acabar 2027. Por nuestra experiencia esa mortalidad vive en el mantenimiento y no en el estreno.',
              '¿Cómo se vigila algo que empeora en silencio? Los modelos no son deterministas, no siempre devuelven lo mismo, así que comprobar una respuesta un día no garantiza nada. La única disciplina que funciona ahí es estadística y aburrida. Antes de publicar cualquier cambio, una batería de casos anotados y anonimizados tiene que pasar. Si la calidad baja, el cambio no sale.',
              'Después del estreno, la vigilancia no se apaga. Una vez por semana reproducimos de principio a fin una conversación de prueba anonimizada contra el sistema vivo. En el asistente de planta, la calibración del enrutado se midió sobre casos reales y pasó del 72 % al 91 % de acierto.',
              'También supimos parar a tiempo. Buscar el cien por cien acaba llevándote a ajustar las pruebas para que aprueben, en vez de a mejorar el sistema. En Wazzy, por ejemplo, empezamos con una arquitectura de agentes con herramientas a su disposición y la hemos cambiado tres veces hasta dar con la correcta, la que de verdad subió el porcentaje de conversaciones que acaban bien.',
              'Ninguna de estas cifras aparece sola. Existen porque el sistema se construyó desde el principio para medirse, con su batería y su vigilancia dentro del presupuesto. <strong>Cuando evalúes a cualquier proveedor, nosotros incluidos, pide sus cifras.</strong> Lo que hace falta para que un sistema pase de su sexto mes tiene artículo propio.',
            ],
            link: { label: 'Empezar es fácil, mantenerlo vivo es lo difícil', href: '/blog/mantener-viva-la-ia' },
          },
          {
            heading: 'Cómo es el proyecto, de la primera reunión a producción',
            part: 'Para tu empresa',
            kind: 'checklist',
            paragraphs: [
              '<strong>El proyecto no arranca con una plataforma que lo hará todo, arranca con un proceso que duele y una cifra que debería moverse.</strong> Y todo lo que cuenta esta guía, las pruebas antes de cada cambio, la vigilancia después y el control de quién ve qué, entra en ese primer caso desde el día uno, porque añadirlo más tarde es la versión cara.',
              'Nuestro método tiene cuatro pasos con nombre y cada uno entrega algo que puedes tener en la mano.',
            ],
            bullets: [
              '<strong>Explorar.</strong> Entendemos el proceso y los datos y te decimos con franqueza si vemos retorno. Lo que sale de aquí es un sí o un no.',
              '<strong>Priorizar.</strong> Elegimos el primer caso por dolor y por cifra en vez de por vistosidad. Sale ese caso, con su cifra al lado.',
              '<strong>Implementar.</strong> Construimos ese caso acotado y lo llevamos a producción. Sale un sistema funcionando con su batería de pruebas puesta.',
              '<strong>Optimizar.</strong> Medimos lo que hace con usuarios reales, para que la decisión sobre el paso siguiente salga de datos y no de opiniones.',
            ],
          },
          {
            heading: 'Cómo saber si tu empresa necesita uno',
            part: 'Para tu empresa',
            kind: 'checklist',
            paragraphs: [
              'No toda tarea merece un agente. <strong>Esta es la criba que aplicamos nosotros antes de aceptar un proyecto, en el mismo orden.</strong> Puedes pasarla tú solo con la lista de procesos de tu empresa delante.',
            ],
            bullets: [
              'Existe una tarea que exige criterio. Si es puro trámite sin decisiones, la automatización de siempre es más barata. Si cada caso exige entender algo, leer un documento, interpretar una petición, ahí vive el agente.',
              'La información que necesita existe y es alcanzable. Un agente sin acceso a datos fiables responde con lo que le parece más probable, que es justo lo que se llama alucinar. A veces el primer trabajo real es ordenar las fuentes.',
              'Hay una cifra de negocio que debería moverse, horas, solicitudes atendidas, plazos. Si nadie sabe qué número mejoraría, no habrá manera de saber si ha funcionado ni de defenderlo cuando toque renovarlo.',
              'Alguien dentro será su dueño. Un agente en producción necesita una persona que mire las métricas y decida pequeñas cosas cada mes. Sin dueño interno, el mejor sistema se queda huérfano.',
              'Ocurre a menudo. Un flujo que corre tres veces al mes no llega a pagar la vigilancia que exige, por bien construido que esté. Por debajo de esa frecuencia la respuesta casi siempre es que no.',
            ],
          },
          {
            heading: 'La conversación de cinco minutos que lo decide',
            part: 'Para tu empresa',
            paragraphs: [
              'Con un proceso candidato en la cabeza, tres preguntas separan el proyecto que compensa del que solo da titulares. Las dos primeras ya las contestaste en la criba de arriba y aquí se dicen en voz alta.',
              'Antes de las tres, una comprobación. Si el proceso te vino a la cabeza por lo bien que quedaría en una demostración y no por lo que te está costando, hay una trampa esperándote y tiene nombre, el juguete brillante.',
              'La primera es de números. Cuántas veces al día ocurre y cuánto se tarda cada vez. Multiplica las dos cifras y tendrás los minutos al día que ese proyecto puede llegar a ahorrarte como mucho, que conviene saber antes de encargar nada.',
              'La segunda es sobre el tipo de trabajo. Qué hace exactamente la persona que hoy lo resuelve, mirar o decidir. Si solo comprueba que un campo está donde tiene que estar, tu problema es de reglas y el modelo te sobra. Si tiene que leer, entender y elegir entre opciones que no siempre son las mismas, ahí empieza el terreno del agente.',
              'La tercera es la que casi nadie hace y la que más dinero ahorra. Qué pasa si el sistema se equivoca una vez de cada veinte. Si la respuesta es que se corrige en un minuto, puedes automatizar con validación ligera y avanzar rápido. Si la respuesta es una factura mal emitida, un cliente perdido o una multa, el proyecto sigue siendo viable pero cambia de forma, con más validación por código, más casos escalados a una persona y un presupuesto mayor.',
              '<strong>La tolerancia al error no decide si se hace, decide cuánto cuesta hacerlo bien.</strong>',
            ],
            link: { label: 'El juguete brillante, el proyecto que nace del brillo', href: '/blog/el-juguete-brillante' },
          },
          {
            heading: 'A medida, de catálogo o las dos cosas',
            part: 'Para tu empresa',
            paragraphs: [
              'La pregunta de comprar o construir tiene fama de ser una decisión técnica y no lo es. Es una decisión sobre cuánto se parece tu proceso al de los demás.',
              'Donde tu proceso es estándar, un producto probado le gana a un desarrollo a medida en tiempo y en precio. Fingir lo contrario sería venderte horas. Donde tu proceso lleva dentro tu criterio, tu modelo de datos y tus excepciones, una herramienta de catálogo aplana justo lo que hace que ese proceso sea tuyo. La suscripción que parecía barata empieza a costar apaños.',
              '<strong>El patrón que funciona no tiene ningún brillo. Compra las piezas estándar, la gestión de tickets, los calendarios, el programa de contabilidad. Y construye la capa fina de inteligencia que lee, decide y las conecta como funciona de verdad tu operación.</strong>',
              'Esa capa es donde viven los agentes. Es lo bastante pequeña como para pagarla y es la parte que ningún fabricante puede meter en una caja, porque la caja no ha visto nunca tu negocio.',
              'Un aviso desde el lado de quien compra. Si una propuesta solo tiene sentido migrando todos tus procesos a la plataforma de alguien, no estás comprando automatización, estás comprando una dependencia. Pregunta qué se queda contigo el día que acabe el contrato. Nuestra respuesta es todo, repositorio, infraestructura y datos. Y va por escrito.',
            ],
          },
          {
            heading: 'Los errores que más vemos al empezar',
            part: 'Para tu empresa',
            kind: 'lattice',
            paragraphs: [
              '<strong>Casi ningún proyecto muere por la tecnología. Muere por decisiones de las primeras semanas que nadie revisó.</strong> Estas son las que más nos encontramos.',
            ],
            bullets: [
              'Empezar por el caso vistoso en lugar del doloroso, que es el juguete brillante del apartado anterior. La demostración espectacular consigue aplausos y el proceso aburrido que quema horas consigue presupuesto renovado.',
              'Comprar la plataforma antes que el caso. Primero un proceso en producción con su cifra, después la conversación sobre plataformas, si es que sigue haciendo falta.',
              'Dejar la medición para el final. La batería de pruebas se construye con el sistema, no después del susto. Añadirla después cuesta el doble y llega tarde.',
              'No nombrar un dueño interno. Un agente sin dueño se queda huérfano en tres meses, con métricas que nadie mira y pequeñas decisiones que nadie toma.',
              'Esperar datos perfectos para arrancar. Con que sean alcanzables, basta. Ordenarlos suele ser la primera fase del proyecto y rinde más que cualquier ajuste de instrucciones.',
              'Prometer al comité que el agente funcionará solo desde el primer día. Es la promesa que mejor suena en una reunión y la que más caro se paga después, porque la autonomía se suelta poco a poco, según lo que las pruebas vayan demostrando.',
            ],
          },
          {
            heading: 'Qué preguntar a cualquier proveedor',
            part: 'Para tu empresa',
            kind: 'lattice',
            paragraphs: [
              'Con lo leído hasta aquí, <strong>estas seis preguntas te dejan ver por dentro cualquier propuesta, la nuestra incluida.</strong>',
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
            heading: 'Las reglas europeas',
            part: 'Para tu empresa',
            paragraphs: [
              'Si despliegas en Europa, dos reglamentos enmarcan el trabajo. El RGPD gobierna los datos personales que hay dentro del sistema y el <a class="link-inline" href="/reglamento-europeo-de-ia">reglamento europeo de IA</a> ordena los sistemas por el riesgo de su uso.',
              'Sus deberes de transparencia se aplican desde agosto de 2026, mientras que el Ómnibus Digital de julio de 2026 empujó las obligaciones pesadas de alto riesgo a diciembre de 2027 y más allá. <strong>Ninguno de los dos prohíbe lo que esta guía describe. Los dos premian la misma arquitectura, con registros, supervisión y contención diseñados desde el principio.</strong>',
              'Mantenemos una página completa sobre cada uno, escritas para quien tiene que defender el proyecto delante del departamento legal.',
            ],
            link: {
              label: 'IA conforme al RGPD, en una cuenta que controlas',
              href: '/ia-y-rgpd',
            },
          },
          {
            heading: 'El vocabulario, en once términos',
            part: 'Para tu empresa',
            kind: 'lattice',
            paragraphs: [
              'Los términos que van a aparecer en cualquier propuesta que recibas, explicados en una línea.',
            ],
            bullets: [
              'Modelo de lenguaje (LLM). El motor que entiende y produce texto. No sabe nada de tu empresa por sí mismo.',
              'Contexto. Lo que el modelo puede leer mientras responde. Es el límite real de lo que puede saber y también de lo que podría enseñar por error.',
              'Generación aumentada por recuperación (RAG). Búsqueda que recupera fragmentos de tu documentación y se los da al modelo como contexto para que responda desde ahí.',
              'Orquestador. La pieza que reparte cada petición al agente o herramienta adecuados. En nuestro asistente de planta reparte entre media docena de especialistas.',
              'Herramienta. Cada acción concreta que un agente puede ejecutar: consultar una base de datos, reservar una cita, enviar un correo.',
              'Contrato estructurado. El formato fijo con el que el modelo entrega lo que entendió, para que un código lo valide antes de actuar. En las propuestas lo verás como salida estructurada o function calling.',
              'Batería de pruebas. Casos reales, con su respuesta correcta escrita al lado, que todo cambio debe superar antes de publicarse. En inglés lo verás como evals.',
              'Telemetría. Las mediciones que el propio sistema publica sobre cómo está funcionando. Bien diseñada, solo recoge campos aprobados de antemano, para que no viajen datos personales.',
              'RPA. Automatización que imita clics y teclas sobre las pantallas de siempre. Funciona muy bien mientras nada cambie y se rompe cuando la pantalla cambia. Un agente ataca el mismo problema entendiendo el contenido, así que en muchas empresas conviven, cada uno en lo suyo.',
              'Alucinación. Respuesta falsa con apariencia impecable. Se combate con arquitectura, no con ruegos al modelo.',
              'Identidad del usuario. La credencial que viaja con cada acción, para que el agente actúe con los permisos de esa persona y no con los de una cuenta que lo puede todo.',
            ],
          },
          {
            heading: 'Cuánto cuesta, en corto',
            part: 'Para tu empresa',
            paragraphs: [
              'Un agente a medida de un solo trabajo arranca en torno a los 2.500 € de construcción, los que tocan varios sistemas se acercan a los 10.000 € y la operación mensual se mueve entre 150 y 500 €. Los sistemas multiagente grandes se presupuestan por proyecto. Qué mueve cada cifra, a dónde va la cuota mensual y qué es tuyo al final tiene su propia guía.',
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
            q: '¿«IA agéntica» y «agente de IA» son lo mismo?',
            a: 'En la práctica se usan como sinónimos y no pasa nada por hacerlo. «Agente de IA» nombra la pieza que trabaja y «IA agéntica» nombra la categoría, la manera de construir sistemas que deciden y actúan en lugar de limitarse a responder. Si alguien te los presenta como dos productos distintos, te está vendiendo dos veces lo mismo.',
          },
          {
            q: '¿Un agente y la RPA son lo mismo?',
            a: 'No. La RPA imita clics y teclas sobre pantallas y funciona bien en procesos idénticos que nunca cambian. Un agente entiende contenido, un documento distinto cada vez, una petición escrita de cualquier manera y decide qué hacer con ello. Conviven a menudo, la RPA mueve lo mecánico y el agente lo que exige interpretar.',
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
            a: 'Con los proveedores y la configuración que desplegamos, no. Las llamadas al modelo van bajo acuerdos y ajustes que excluyen el entrenamiento con tu contenido. La elección del proveedor la apruebas tú. Nuestros sistemas corren además en una cuenta en la nube a tu nombre, así que los datos no viven en infraestructura nuestra.',
          },
          {
            q: '¿Qué pasa si el proveedor cambia el modelo por debajo?',
            a: 'Pasa, además sin avisar. Está medido que un mismo modelo comercial puede rendir muy distinto con meses de diferencia sin cambiar de nombre. Por eso cada sistema nuestro lleva su batería de pruebas y su vigilancia semanal, que detectan el cambio antes que tus usuarios. Cambiar de modelo tampoco es siempre un ajuste de configuración, a veces obliga a tocar el sistema. Prometer lo contrario sería vender humo.',
          },
          {
            q: '¿Funciona en mi sector?',
            a: 'Nuestros cinco sistemas en producción cubren industria, agricultura, inmobiliaria, salud y servicios, que ya es variedad. La pregunta útil no es el sector, es si existe la tarea repetitiva con criterio, los datos alcanzables y la cifra que mover de la criba de arriba. Si las tres cosas están, el sector pone el vocabulario y poco más.',
          },
        ],
        cta: {
          heading: '¿Tiene sentido un agente en tu empresa?',
          body: 'Cuéntanos tu reto y te respondemos en un día laborable. Si no le vemos retorno, te lo diremos.',
          button: 'Cuéntanos tu reto',
        },
      },
      agentDev: {
        tocHeading: 'Qué verás en esta página',
        metaTitle: 'Desarrollo de agentes de IA a medida para empresas, Ideasforge',
        metaDescription:
          'Diseñamos, construimos y mantenemos agentes de IA para empresas: a medida, sobre tu infraestructura y medidos antes de cada cambio.',
        hero: {
          eyebrow: 'Desarrollo de agentes de IA a medida',
          title: 'Agentes de IA para empresas, construidos para llegar a producción y quedarse.',
          subtitle:
            'Diseñamos, construimos y mantenemos agentes de IA a medida para medianas y grandes empresas. Funcionan sobre tu infraestructura y se miden antes de cada cambio.',
          cta: 'Cuéntanos tu reto',
        },
        sections: [
          {
            heading: 'Qué construimos',
            part: 'El servicio',
            paragraphs: [
              'Agentes de IA a medida que hacen trabajo real: responden preguntas sobre tu documentación y tus bases de datos, guían diagnósticos, cualifican solicitudes y ejecutan acciones sobre los sistemas que apruebes. <strong>Cada agente se construye para una tarea concreta y se conecta solo a las herramientas que esa tarea necesita.</strong>',
              'Cuando un agente no basta, construimos la arquitectura que coordina varios. Un orquestador entiende cada consulta y la dirige al especialista. Uno de nuestros sistemas en producción funciona así, con media docena de agentes especializados detrás.',
              'Estos son algunos de los encargos que más se repiten:',
            ],
            kind: 'lattice',
            bullets: [
              'Consultas a tus datos. La pregunta se escribe en lenguaje natural y la respuesta sale de tu base de datos por un camino validado, nunca de la memoria del modelo. «¿Cuánto facturamos en marzo en la zona norte?», escrito así, tal cual se le preguntaría a un compañero.',
              'Asistente sobre tu documentación. Manuales, wikis y sistemas internos respondiendo en una sola conversación y citando de dónde salió cada respuesta. La política de devoluciones que hoy vive repartida entre tres manuales se contesta en una frase, con su fuente al lado.',
              'Diagnóstico guiado. El agente pregunta, descarta y acompaña paso a paso hasta la causa, como nuestro asistente de planta cuando una máquina se para.',
              'Cualificación de solicitudes. Cada entrada se lee, se puntúa y se dirige. Tu equipo recibe solo las que valen su tiempo. De veinte solicitudes de presupuesto que entran por la web, tres merecen una llamada hoy y el resto puede esperar a mañana.',
              'Acciones sobre tus sistemas. La gestión completa, ejecutada dentro de un conjunto cerrado de acciones que tú apruebas. Dar de alta al cliente, generar su contrato y dejarlo listo para la firma, sin que nadie copie datos de una pantalla a otra.',
            ],
            link: { label: 'Si todavía estás decidiendo qué es un agente y qué no, empieza por la guía de agentes de IA', href: '/agentes-de-ia' },
          },
          {
            heading: 'Lo que antes no salía a cuenta automatizar',
            part: 'El servicio',
            paragraphs: [
              'Los procesos con reglas claras se automatizan desde hace décadas. Lo que se quedaba fuera era todo lo que llegaba sin un formato fijo, por ejemplo un cliente manda el pedido en PDF, otro lo escribe en el cuerpo del correo y un tercero pide «lo del mes pasado, pero para el almacén nuevo».',
              'Automatizar eso exigía o una persona picando datos o un proyecto de reglas que se rompía con el primer proveedor o usuario que escribiera la petición de forma distinta.',
              '¿Por qué ahora sí sale a cuenta?',
              '<strong>Los modelos de lenguaje o LLM cambiaron todas las reglas del juego, porque la parte cara ya no es leer la entrada sucia o desestructurada.</strong> El modelo entiende el pedido escrito de cualquier manera y lo traduce a los campos que el resto del sistema espera.',
            ],
          },
          {
            heading: 'La autonomía se gana por etapas',
            part: 'El servicio',
            paragraphs: [
              'Solemos recomendar que ningún agente nuestro empiece actuando por su cuenta. Los primeros días solo debería proponer. Una persona debería revisar cada salida antes de que salga al usuario final. Cuando la batería de pruebas y unas semanas de uso enseñan dónde acierta, se le permite la autonomía deseada.',
              'Con un ejemplo se ve mejor. Un agente que contesta a proveedores empieza escribiendo borradores que aprueba el equipo. Semanas después manda él solo los acuses de recibo, mientras una reclamación o una negociación de precio siguen pasando por una persona.',
              'Y hay una regla que no rompemos. <strong>Nunca ampliamos a la vez lo que el agente toca y lo que decide por su cuenta.</strong> Si le damos acceso a un sistema nuevo, en ese sistema vuelve al modo de revisión, aunque lleve meses trabajando solo en los demás.',
            ],
          },
          {
            heading: 'La seguridad es el punto de partida',
            part: 'Las garantías',
            capasDiagram: true,
            paragraphs: [
              '<strong>El modelo elige, pero no decide.</strong> Escoge dentro de un conjunto cerrado de acciones y es el código quien revisa esa elección antes de ejecutar nada. El agente de un taller puede consultar el historial de un vehículo, proponer cita y enviar un presupuesto. Borrar no puede, porque esa acción no existe en su lista y pedírsela por escrito no la crea.',
              'Por eso el límite no vive en una instrucción que el modelo pueda ignorar, ahí está la diferencia entre una garantía y lo que llamamos una petición educada, un prompt perfectamente bien hecho que aun así puede fallar en cualquier momento.',
              'El reparto de papeles es la regla de la casa: el juicio vive en el código, la interpretación del lenguaje vive en el modelo y el conocimiento vive en tus datos. Todo lo que pueda resolverse con código normal se resuelve con código, porque cada llamada al modelo en producción añade coste, tiempo de espera y una variabilidad que hay que vigilar.',
              'Calcular un vencimiento o aplicar un tipo de IVA con código (un script) saldrá igual el millón de veces que se ejecute, en cambio un LLM, al no ser determinista, no siempre dará el mismo resultado. Entender que «lo del otro día para el almacén nuevo» es el pedido 4512 con otra dirección de entrega, eso es el modelo. De ahí salen sistemas más baratos de operar y más fáciles de auditar, no menos capaces.',
              'Y cuando conviven datos de varias empresas o de varias áreas, el aislamiento no se pide por instrucciones. Se construye en capas que acaban en un filtro que el modelo no puede tocar y al agente solo se le entrega el contexto de quien pregunta, para que ni siquiera pueda formular una consulta sobre datos ajenos.',
              'Es lo que una asesoría ya exige a su propio equipo, que cada gestor vea sus empresas y ninguna más.',
            ],
          },
          {
            heading: 'El modelo interpreta, el código decide',
            part: 'Las garantías',
            paragraphs: [
              '<strong>El modelo (LLM, IA o como quieras llamarle) nunca llega a tocar tus sistemas.</strong> Interpreta la pregunta y entrega un formulario de campos fijos, lo que llamamos un contrato. A partir de ahí decide el código, que sí se comporta igual siempre. Lo peor que puede conseguir un mensaje malicioso es que se elija mal dentro de una lista que ya hemos revisado. Un caso construido así, con lo que tuvimos que quitarle al modelo por el camino, está en <a class="link-inline" href="/casos/savian">la página de Savian</a>.',
            ],
          },
          {
            heading: 'Cómo se gana un agente su puesto en producción',
            part: 'Las garantías',
            paragraphs: [
              'Una demostración se hace en días. Producción exige disciplina. Cada agente sale con una batería de pruebas, un conjunto de casos reales con su respuesta correcta anotada que se ejecuta entera antes de cada cambio. Dentro hay casos incómodos y ambiguos a propósito, la factura que llega sin número de pedido, la pregunta con dos lecturas posibles, el mensaje con faltas escrito desde el móvil.',
              '<strong>Si la calidad baja, el cambio no sale.</strong> En uno de nuestros agentes esa batería tiene 118 casos reales y con ella llevamos del 72 % al 91 % el acierto del enrutado, la pieza que decide qué agente atiende cada pregunta.',
              'Cada respuesta queda registrada con su contexto: qué consultó el agente, qué decidió y cuánto costó. Cuando llega una queja, reconstruimos exactamente qué pasó. Y lo que está en producción se revisa cada semana, porque un sistema con un modelo dentro puede empeorar sin que aparezca un solo error en ningún registro.',
            ],
          },
          {
            heading: 'El perímetro de confianza',
            part: 'Las garantías',
            paragraphs: [
              'La batería hace algo más que vigilar la calidad. Dibuja el mapa de lo que el agente ha demostrado y a ese mapa lo llamamos el perímetro de confianza. <strong>Dentro del perímetro, el agente actúa solo. Fuera, aparta el caso y lo entrega a una persona.</strong>',
              'Ese mapa no sale de una reunión, sale de los casos que el agente ya ha superado. Un agente que lleva meses tramitando pedidos nacionales recibe un día el primero con aduanas por medio. Lo que toca no es improvisar la respuesta, es reconocer que ese terreno no está probado y pasarlo a quien sepa, hasta que entre en la batería con sus propios casos.',
              'Esto pide construir algo que a las personas les sale gratis. A un empleado nuevo se le enseña a preguntar cuando duda. ¿Y a un modelo? Hay que construirle la duda, porque por sí solo no levanta la mano, rellena el hueco con algo que suena bien.',
              'Si a una solicitud le falta el CIF, el agente no registra nada y pide el dato. Esa parada no la decide el modelo, la impone el código.',
            ],
          },
          {
            heading: 'Cuánta supervisión necesita',
            part: 'Las garantías',
            paragraphs: [
              'Un agente en producción necesita un responsable en tu equipo que responda por él. La persona que hoy lee cada solicitud entera pasa a revisar la bandeja de dudas, donde cada caso llega con los datos extraídos y el motivo de la duda señalado. Decide de un vistazo lo que antes le llevaba un rato.',
              '<strong>Lo que el agente no resuelve solo no desaparece, se entrega.</strong> Antes de arrancar queda pactado qué casos escala, a qué bandeja llegan y quién los atiende.',
            ],
          },
          {
            heading: 'Empezamos por el problema, no por el modelo',
            part: 'Decidir con criterio',
            paragraphs: [
              '<strong>No buscamos maneras de usar la IA en tu empresa. Buscamos los problemas que ya te cuestan dinero y evaluamos si un agente los resuelve con ganancia demostrable.</strong> Parece lo mismo y es lo contrario. La primera búsqueda produce juguetes que se enseñan bien y se abandonan pronto. La segunda produce sistemas que un responsable defiende delante de dirección con números.',
              '¿Cómo se encuentra un problema así?',
              'La primera fase se hace con quien sufre el proceso, no solo con quien compra la tecnología. Mapeamos el proceso paso a paso con sus actores, sus sistemas y sus tiempos. Después separamos los problemas que duelen hoy, los que ya cuestan horas o clientes, de los cuellos de botella que aguantarán solo hasta que el volumen crezca.',
              'Cada candidato se traduce a su ganancia esperada partiendo de una línea base medida, cuánto cuesta hoy en horas, en errores o en espera.',
              'De esa lista, la mayoría se descarta. Con lo que sobrevive no arrancamos un despliegue grande sino un piloto acotado: una parte del problema, un grupo reducido de usuarios y una métrica pactada de antemano. Estrecho y profundo antes que ancho y superficial, porque un piloto barato que falla es información y un despliegue caro que falla es un agujero.',
            ],
          },
          {
            heading: 'Qué ponemos nosotros y qué pones tú',
            part: 'Decidir con criterio',
            paragraphs: [
              '<strong>La tecnología ya no es el cuello de botella y lo decimos habiendo construido la tecnología.</strong> Los proyectos se caen por el lado de la organización, cuando nadie tiene tiempo de revisar el piloto o el acceso a los datos se eterniza.',
              'Por eso pedimos tres cosas antes de empezar: un responsable con nombre que decide y responde, horas reales de su equipo para revisar los casos del piloto y acceso a los datos que el agente necesita. Sin esas horas no hay batería que calibrar ni nadie que pueda dar el resultado por bueno.',
              'Y hay una parte que no se compra, se gana. Quien hoy hace la tarea a mano será quien vigile al agente mañana. Si entra al proyecto el último, lo vivirá como una amenaza y encontrará motivos por los que no funciona.',
              'Es la muerte más tonta de un buen sistema y se evita gratis, el mapeo del proceso se hace con esas personas dentro desde el primer día y con un papel nuevo encima de la mesa.',
            ],
          },
          {
            heading: 'Cuándo un agente no compensa',
            part: 'Decidir con criterio',
            paragraphs: [
              '<strong>Decírtelo es parte de nuestro servicio en Ideasforge.</strong> Si las reglas de tu proceso son claras y estables, una automatización a medida lo resuelve más barato, más rápido y sin la vigilancia que exige un modelo. Eso también lo construimos nosotros. Un agente compensa cuando en medio del proceso hay que leer, interpretar o decidir sobre entradas que cambian, un correo redactado de cualquier manera, un documento escaneado torcido, una pregunta con tres formas de entenderse.',
              'Dos pruebas rápidas lo destapan. Si el proceso se deja escribir como una lista de comprobación, llega el archivo, se vuelca, se confirma, siempre con el mismo formato, lo tuyo son reglas y te sobra el modelo. Y si llevas meses apilando condiciones para cada manera nueva en que la gente escribe una dirección, el problema ya no es de reglas, es de lectura. Ahí empieza el terreno del agente.',
              'Tampoco compensa cuando nadie puede señalar la ganancia con el dedo, ni cuando los datos que el agente necesita no existen o el equipo que debería usarlo no quiere. En esos casos lo sensato es empezar por ordenar los datos o por el proceso, no por el agente.',
              'El mercado está pagando cara esa lección. Gartner calcula que antes de que acabe 2027 se habrá cancelado más del 40 % de los proyectos de IA agéntica. Nuestra manera de no engrosar esa cifra es descartar pronto y con números.',
              'Descartar el agente no es quedarse sin nada. Un proceso de reglas claras se automatiza igual y sale más barato de construir y de operar. Esa es la otra mitad de lo que hacemos.',
            ],
            link: {
              label: 'Si tus reglas son claras, lo tuyo es la automatización de procesos con IA',
              href: '/servicios/automatizacion-de-procesos-con-ia',
            },
          },
          {
            heading: 'Qué te llevas el último día',
            part: 'Decidir con criterio',
            paragraphs: [
              '<strong>El repositorio está a tu nombre desde el primer día</strong>: código, documentación, manuales de operación, instrucciones del modelo y la batería de pruebas. La infraestructura también, montada en una nube a nombre de tu empresa.',
              'Hay sistemas nuestros funcionando sobre más de un proveedor de modelo. Cambiar el tuyo es posible y se hace con la batería de pruebas delante, porque modelos distintos se comportan distinto y el cambio se mide.',
              'Con el sistema entregamos el catálogo de incidencias, escrito para reconocer cada fallo desde fuera antes de saber su causa. Si decides operarlo por tu cuenta, formamos a tu equipo. El día que decidas prescindir de nosotros, ya lo tienes todo.',
            ],
          },
          {
            heading: 'Qué cuesta',
            part: 'Decidir con criterio',
            paragraphs: [
              'Un agente a medida se mueve entre 2.500 y 10.000 € de construcción, según integraciones y exigencia de validación, más entre 150 y 500 € al mes de operación, que cubre la vigilancia y el mantenimiento del sistema. El modelo y la infraestructura van en cuentas a nombre de tu empresa, así que esas facturas son tuyas y no entran en la cuota. <strong>La cuota se pacta antes de arrancar y los consumos se vigilan con límites, no es un contador abierto que descubres a fin de mes.</strong>',
              'Los sistemas con orquestador y varios agentes se presupuestan por proyecto. El desglose entero, qué encarece la construcción y a qué se va la cuota, está en la guía de coste.',
            ],
            link: { label: 'Cuánto cuesta un agente de IA, desglosado', href: '/cuanto-cuesta-un-agente-de-ia' },
          },
        ],
        faqHeading: 'Preguntas frecuentes',
        faq: [
          {
            q: '¿Qué significa «para empresas» en la práctica?',
            a: 'Tu infraestructura o tu nube, las cuentas de tu organización, tus datos donde tú decidas y la calidad medida de forma continua. Las garantías por las que va a preguntar tu comité de seguridad, respondidas antes de la reunión.',
          },
          {
            q: '¿No nos basta con ChatGPT?',
            a: 'Para ayudar a las personas en su trabajo, quizá sí. Esa respuesta no la cobramos. Un chat es una herramienta de ayuda donde cada salida la revisa quien la pidió. Un agente es un sistema que produce el resultado él solo, sobre tus datos y con tus permisos. Eso exige la ingeniería que describe esta página. Son compras distintas para problemas distintos.',
          },
          {
            q: '¿El agente puede conectarse a nuestros sistemas internos?',
            a: 'Sí, es exactamente para eso. ERP, bases de datos, sistemas industriales, documentación. El agente solo habla con los sistemas que apruebes, con los permisos de cada usuario.',
          },
          {
            q: '¿El agente decide por su cuenta?',
            a: 'Decide dentro de un perímetro. Las acciones posibles son una lista cerrada que tú apruebas, el código valida cada una antes de ejecutarla y las sensibles piden confirmación de una persona. La autonomía se administra por coste y fiabilidad, no por fe en el modelo.',
          },
          {
            q: '¿Y si nuestros datos están hechos un desastre?',
            a: 'Es de lo primero que miramos. Si los datos que el caso necesita no están o no son fiables, te lo decimos y la primera fase pasa a ser ordenarlos, porque un agente sobre datos rotos solo automatiza el error más rápido.',
          },
          {
            q: '¿Quién mantiene el agente después?',
            a: 'Lo que decidas. Podemos encargarnos del mantenimiento medido o formar a tu equipo y entregar el manual de operación para que lo lleve. La documentación se escribe para ese segundo caso, aunque elijas el primero.',
          },
          {
            q: '¿Qué pasa si el proveedor del modelo sube el precio o lo retira?',
            a: 'El modelo va detrás de una capa de abstracción, así que cambiarlo es un cambio acotado que pasa la batería de pruebas antes de salir. A veces obliga además a tocar el sistema, porque modelos distintos se comportan distinto. Lo hemos probado. Descartamos un modelo más barato porque las pruebas mostraron que perdía diez puntos de acierto.',
          },
          {
            q: '¿Qué pasa si concluís que nuestro caso no compensa?',
            a: 'Te lo decimos antes de cobrarlo y te quedas con el mapa del proceso y sus números, que valen aunque el agente no salga. Descartar pronto es parte del método, no un fracaso del método.',
          },
        ],
        cta: {
          heading: '¿Te interesa para tu empresa?',
          body: 'Cuéntanos tu reto. Si no le vemos retorno, te lo diremos.',
          button: 'Cuéntanos tu reto',
        },
      },
      processAuto: {
        tocHeading: 'Qué verás en esta página',
        metaTitle: 'Automatización de procesos con IA, Ideasforge',
        metaDescription:
          'Automatización de procesos empresariales con IA: documentos, solicitudes y consultas de datos resueltos de principio a fin, con validación por código.',
        hero: {
          eyebrow: 'Automatización de procesos con IA',
          title: 'Los procesos que la automatización clásica no cerraba',
          subtitle:
            'Automatización de procesos empresariales con IA. Los flujos de trabajo que llevan documentos, conversaciones o decisiones de por medio, resueltos de principio a fin sobre tus sistemas.',
          cta: 'Cuéntanos tu reto',
        },
        sections: [
          {
            heading: 'Qué resuelve la automatización de procesos con IA',
            part: 'Lo que se abre ahora',
            paragraphs: [
              'Los procesos que las herramientas clásicas no pudieron automatizar comparten un rasgo. En algún punto, una persona tiene que leer y decidir. Llega una factura y alguien la teclea. Llega una solicitud y alguien la cualifica. Llega una pregunta y alguien busca la respuesta.',
              '<strong>Ese paso, leer algo que no viene en un formato fijo y decidir qué hacer con ello, era la frontera de la automatización.</strong> Los modelos de lenguaje absorben exactamente ese paso y con él se abre la familia entera de procesos que lo contenían.',
              'Estos procesos rara vez tienen nombre en el organigrama. Viven en una bandeja de correo que alguien vacía cada mañana, en el Excel puente entre dos sistemas que no se hablan, en el copiar y pegar de cada alta nueva. Si tu equipo tiene uno de esos rituales diarios, tienes un candidato.',
              'Cuatro encargos concentran casi todo lo que nos piden. El quinto punto no es un encargo, es la salida que llevan todos.',
            ],
            kind: 'lattice',
            bullets: [
              'Entrada de documentos. Facturas, tickets y formularios escaneados que se leen, se validan y se registran en tus sistemas sin que nadie los teclee.',
              'Gestión de solicitudes. Consultas entrantes cualificadas y dirigidas a quien corresponde, a cualquier hora, con lo que hace falta para decidir ya extraído.',
              'Consultas a datos. Preguntas de negocio que se convierten en consultas seguras a la base de datos y vuelven con la respuesta en segundos.',
              'Redacción a partir de datos. Correos, resúmenes y avisos que el flujo escribe con lo que ya averiguó. Los que van a una persona de tu equipo pueden salir solos. Los que van a un cliente salen de una plantilla que tú apruebas, rellena con datos ya validados.',
              'Escalado con contexto. Los casos que piden criterio llegan a tu equipo con todo lo que el sistema ya averiguó, para decidir sin rebuscar.',
            ],
          },
          {
            heading: 'La frontera con la automatización clásica',
            part: 'Lo que se abre ahora',
            paragraphs: [
              'La automatización clásica, la de reglas y la robotización de pantallas, funciona muy bien mientras la entrada no cambia. Su debilidad la conoce cualquiera que la haya mantenido. La regla que leía la factura del proveedor A no entiende la del proveedor B y el robot que rellenaba un formulario se pierde cuando el programa cambia de versión.',
              'Cada variación nueva es una regla nueva que escribir y la lista no termina nunca.',
              'La IA cambia dónde está el esfuerzo. El modelo interpreta la entrada aunque venga con otro formato, otra redacción u otro orden, así que la variación deja de romper el flujo. A cambio exige validación y medición, porque interpretar puede fallar.',
              '¿De qué lado cae el tuyo? Hay una prueba rápida que hacemos en la primera llamada, pedir tres ejemplos reales de la entrada y de tres orígenes distintos, porque tres facturas del mismo proveedor se parecen siempre y no prueban nada. Si los tres se parecen entre sí, tu problema es de reglas. Si cada uno viene de una manera distinta, ahí hace falta el modelo (LLM, llamada a la IA o como prefieras llamarlo).',
              'La misma frontera también se dibuja al revés. <strong>Si tu proceso tiene reglas claras sobre datos que siempre llegan igual, la automatización clásica lo resuelve más barato y más rápido, sin modelo que vigilar.</strong> Eso también lo construimos nosotros. Te lo diremos en la primera conversación, porque meter IA donde no hace falta es pagar vigilancia a cambio de nada.',
              'Y cuando ya tienes automatización clásica funcionando, no la tiramos. Conviven bien, con las reglas moviendo lo estable y el modelo leyendo lo variable, cada pieza en el papel que le toca.',
            ],
          },
          {
            heading: 'Automatizar pasos no es mover una cifra',
            part: 'Lo que se abre ahora',
            paragraphs: [
              'Un sistema puede producir resúmenes, borradores y registros a docenas sin que el negocio note nada. <strong>Producir cosas no es mover una cifra.</strong> Por eso la unidad de trabajo aquí no es la tarea suelta sino el proceso entero, de la entrada al resultado, con su métrica delante: las horas que se dejan de pagar por teclear, los errores que dejan de producirse, la espera que deja de existir.',
              'Se ve mejor con un ejemplo. Un sistema que redacta resúmenes de cada reunión produce salidas a diario. Si nadie decide nada distinto con ellos, la ganancia es cero y el coste no. Un flujo que deja cada factura registrada sin que nadie la toque convierte su resultado en horas que puedes contar.',
              'La diferencia no está en la tecnología. Está en si el resultado cambia algo que el negocio mide.',
              'Ese criterio cambia decisiones de diseño. A veces el paso que más ahorra no se acelera, se elimina, porque reorganizar el proceso hace innecesario lo que íbamos a automatizar. Y un flujo que resuelve la mayor parte del volumen con una fracción del esfuerzo gana a la ambición de cubrirlo todo, que es la que convierte los proyectos en obras interminables.',
              'En el blog contamos cómo medimos esa ganancia y por qué no la llamamos productividad.',
            ],
            link: { label: 'Medir la IA por las ganancias, no por la productividad', href: '/blog/medir-la-ia-por-las-ganancias' },
          },
          {
            heading: 'El flujo lo lleva el código, la interpretación el modelo',
            part: 'Cómo lo construimos',
            paragraphs: [
              'Nuestros flujos son una cadena de pasos que siempre corre igual, con paradas de modelo donde hace falta interpretar. <strong>El código mueve los datos, llama a cada sistema y decide el orden.</strong> El modelo entra solo en esas paradas: leer un documento, entender una petición, clasificar un caso. Y devuelve un resultado con estructura fija que el código puede comprobar.',
              '¿Por qué no dejar que el modelo lleve el flujo entero? Cada llamada a un modelo en producción cuesta dinero, tarda y puede variar, así que cuantas menos llamadas y más acotadas, más barato de operar y más estable es el flujo.',
              'No lo decimos solo nosotros. Anthropic, uno de los grandes laboratorios de modelos, aconseja en <a class="link-inline" href="https://www.anthropic.com/engineering/building-effective-agents" rel="noopener noreferrer" target="_blank">Building effective agents</a> empezar con flujos que orquesta el código y guardar la autonomía del agente para los pocos casos que la justifican.',
            ],
          },
          {
            heading: 'Un flujo de facturas, paso a paso',
            part: 'Cómo lo construimos',
            paragraphs: [
              'Para que nada de esto quede abstracto, así recorre el sistema una factura desde que llega hasta que queda archivada. Son seis pasos. <strong>Lo que no pasa la validación del cuarto paso no sigue adelante, sale hacia una persona con el caso preparado y el motivo señalado.</strong>',
            ],
            kind: 'checklist',
            bullets: [
              'Llega. La factura entra por el canal que el equipo ya usa, un correo reenviado o un chat. Queda archivada tal cual llegó.',
              'Se clasifica. El código decide de qué tipo es y a qué flujo pertenece, sin gastar una llamada al modelo si una regla basta.',
              'Se lee. El modelo extrae los campos con estructura fija: proveedor, fechas, importes, impuestos.',
              'Se valida. El código comprueba que todo cuadra: el total suma, el impuesto encaja, el proveedor existe, el importe está en rango.',
              'Se registra. Lo validado aterriza en tu sistema, sea un ERP o un Excel, con su referencia al documento original.',
              'Queda escrito. Cada paso deja registro de qué se leyó y qué se decidió, para poder reconstruir la ejecución después.',
            ],
          },
          {
            heading: 'Validación en el medio, no confianza al final',
            part: 'Cómo lo construimos',
            paragraphs: [
              'La automatización con IA falla cuando se deja al modelo sin vigilancia. Por eso el paso de validación no es opcional ni se deja para el final: cada resultado del modelo se comprueba antes de tocar tus sistemas, con las reglas del paso de validación que acabas de ver y con las que cada proceso añada.',
              'Lo que pasa la validación fluye solo. Lo que no la pasa no se descarta ni se inventa, va a una persona con el caso preparado.',
              '<strong>Validar al final, cuando el dato ya se registró, convierte cada error en una corrección contable. Validar en el medio lo convierte en un caso escalado, que es más barato y deja menos cicatriz.</strong> Ese reparto concentra la revisión humana donde hace falta criterio y la retira de donde solo hacía falta paciencia.',
              'El objetivo no es un sistema que jamás pregunte, es uno que pregunte poco y siempre con motivo. Y que tenga medido cuánto resuelve por su cuenta, para que la palabra «automatizado» venga con un número detrás.',
            ],
          },
          {
            heading: 'Dos procesos reales en producción',
            part: 'Cómo lo construimos',
            paragraphs: [
              'En Stanton, una gestora de fincas, las facturas de luz, agua y gas de cada inquilino se metían a mano. Hoy el equipo las reenvía por Telegram, un modelo lee la factura y extrae los datos y el resultado aterriza como filas normalizadas en el Excel con el que ya trabajaban.',
              '<strong>Cada factura costaba un minuto de teclado. Hoy el 98 % pasa sin que nadie la toque</strong> y el resto escala con el documento al lado. Son dos agentes en producción, sin ninguna herramienta nueva que aprender. El cliente ya nos ha encargado más procesos administrativos, que es la señal de éxito que más nos importa. El caso entero, con lo que tuvimos que añadirle después, tiene <a class="link-inline" href="/casos/stanton">su propia página</a> que puedes visitar.',
              'En Barceloneta Premium, una agencia inmobiliaria de Barcelona, el equipo recibe cada día decenas de consultas por WhatsApp de gente que busca alquiler. Cada consulta se llevaba entre cinco y diez minutos de comprobación a mano.',
              'Ahora el flujo extrae de cada conversación el motivo, el presupuesto y la documentación. Al equipo le llega un correo que dice si cumple o no los requisitos que la agencia fijó, con el porqué al lado. Quien decide sigue siendo una persona, con ese correo delante. La agencia cifra en más de tres horas al día lo que recupera para el trabajo que sí necesita personas.',
              'Los dos casos se parecen en dos cosas: entraron por un canal que el equipo ya usaba y tenían una cifra medible antes y después. Eso es lo que buscamos en cada proceso nuevo.',
            ],
            link: { label: 'Ver los proyectos', href: '/#proyectos' },
          },
          {
            heading: 'Medida como el software que es',
            part: 'Cómo lo construimos',
            paragraphs: [
              'Un flujo que lleva un modelo dentro puede degradarse sin lanzar un solo error, porque el modelo cambia o los documentos cambian. Por eso fijamos la versión del modelo, de modo que actualizarla es una decisión nuestra y no una sorpresa del proveedor.',
              'Cada modificación pasa por una batería de pruebas con casos reales antes de publicarse y cada ejecución deja registro de qué se leyó, qué se decidió y qué se registró. Cuando algo no cuadra semanas después, se reconstruye la ejecución exacta en lugar de discutir de memoria.',
              'Cuando un error real se cuela, el circuito es siempre el mismo: se reproduce la ejecución, se corrige y el caso entra a la batería de pruebas para no volver a colarse callado. Un flujo nuestro envejece aprendiendo de sus propios sustos.',
              'Y si un día falta un dato o una fuente está caída, en las consultas a datos el sistema responde con lo que tiene y dice qué se ha quedado fuera, en lugar de devolver una cifra incompleta que parece completa. En un flujo de documentos es al revés, lo que no cuadra no se registra a medias, escala.',
              'Esa claridad de máquina es la diferencia entre un número que puedes llevar a una reunión con tus socios para defender el proyecto y uno que te deja en evidencia.',
              'La operación mensual se lee en tres números: cuánto resolvió el flujo por su cuenta, cuánto escaló con sus motivos y qué costó cada ejecución. Con esos tres se decide dónde afinar, qué regla nueva añadir y si la ampliación siguiente compensa.',
              '<strong>Sin esos tres números, «funciona bien» es una opinión.</strong> Cada flujo hereda además las alarmas de la casa, así que si un servicio externo se cae o una cuota se agota, lo sabemos nosotros antes de que lo sufra tu equipo.',
            ],
          },
          {
            heading: 'Tus sistemas se quedan donde están',
            part: 'Cómo lo construimos',
            paragraphs: [
              '<strong>La automatización se conecta a lo que ya usas</strong>: ERP, CRM, bases de datos, correo, mensajería y, sí, también ese Excel que gobierna medio departamento. La entrada puede ser el canal que tu equipo ya tiene en el bolsillo, un chat de Telegram o de WhatsApp o un buzón de correo, porque la mejor herramienta nueva es la que nadie tiene que aprender.',
              'Y el repositorio es tuyo desde el primer día, con su documentación y sus manuales de operación. Si un día quieres operarlo con tu equipo o con otro proveedor, te llevas el flujo entero con su documentación y sus pruebas, no una suscripción. Lo que sí es servicio mientras trabajemos juntos es la operación, la vigilancia semanal y las alarmas de la casa. Eso queda dicho en el presupuesto.',
            ],
            link: { label: 'Automatización documental para gestorías', href: '/gestorias' },
          },
          {
            heading: 'Dónde viven tus datos',
            part: 'Cómo lo construimos',
            paragraphs: [
              'Un flujo de estos lee facturas de tus inquilinos, solicitudes con la documentación de un candidato o consultas con nombres y apellidos dentro. Eso es tratamiento de datos personales. A veces incluso de los que el reglamento europeo protege de forma reforzada, como los de salud.',
              'El reparto legal conviene decirlo claro y de entrada. <strong>Tu empresa es la responsable del tratamiento y nosotros el encargado.</strong> Lo que entregamos es lo que exige el artículo 28 del reglamento, un contrato de encargo con sus finalidades, sus plazos y sus obligaciones. Y lo que pide el artículo 32, medidas técnicas escritas y comprobables en vez de una declaración de intenciones.',
              'En la práctica eso significa infraestructura montada en una cuenta en la nube, a tu nombre, cada acción viajando con los permisos de quien la pide, los datos sensibles cifrados, los plazos de conservación pactados por escrito y las llamadas al modelo bajo acuerdos que excluyen entrenar con tu contenido. Es la misma disciplina que aplicamos donde más procede, en un sistema que trata datos de salud a diario.',
            ],
          },
          {
            heading: 'Del primer proceso a los siguientes',
            part: 'Cómo lo construimos',
            paragraphs: [
              '<strong>El primer proceso paga el montaje</strong>: la conexión con tus sistemas, el registro, la batería de pruebas, la operación. Los siguientes lo reutilizan, así que cada ampliación cuesta menos que la anterior y se decide con los números del flujo que ya está funcionando. Así creció Stanton, un flujo primero y los siguientes sobre el mismo montaje, cada uno aprobado por lo que el anterior demostró.',
            ],
          },
          {
            heading: 'El proceso por el que empezar',
            part: 'Decidir con criterio',
            paragraphs: [
              '<strong>No hace falta un plan de transformación para empezar, hace falta elegir bien un proceso.</strong> El bueno suele cumplir tres condiciones: duele de forma medible, se repite con volumen y tiene a alguien que lo sufre y quiere quitárselo de encima.',
              'Con ese proceso delante, lo mapeamos paso a paso con quien lo ejecuta cada día, qué llega, quién lo toca, por qué sistemas pasa y dónde se atasca. Después medimos lo que cuesta hoy. Ese punto de partida medido es lo que luego permite decir cuánto mejoró, con números y no con sensaciones.',
              '¿Cuánto hay que construir antes de saber si funciona? Se arranca con un piloto que cubre solo una parte del volumen, con la cifra que debería moverse pactada de antemano. A veces incluso lo validamos en modo mixto, una persona apoyada por la herramienta a medio construir, porque confirma la ganancia antes de construir el resto.',
              'El mapeo, además, cambia decisiones antes de escribir una línea de código. Con la automatización para la agencia de alquiler aprendimos que el tiempo no se iba en contestar mensajes sino en comprobar a cada interesado, así que el flujo se diseñó alrededor de esa comprobación y no del buzón. Sin ese mapa habríamos automatizado la parte equivocada del proceso.',
              'Si el piloto cumple, se amplía por fases. Si no cumple, se ha perdido poco y se ha aprendido dónde estaba el error.',
            ],
          },
          {
            heading: 'Lo que no automatizamos',
            part: 'Decidir con criterio',
            paragraphs: [
              'Hay pasos que dejamos con confirmación humana a propósito: los que mueven dinero de verdad, los irreversibles y los que deciden sobre personas. <strong>El flujo prepara el caso, la persona aprieta el botón.</strong> No es una limitación técnica sino una elección de diseño, porque un error barato de corregir puede automatizarse y uno caro no debe.',
              'Tampoco automatizamos procesos sin volumen, porque un flujo que corre tres veces al mes no paga su mantenimiento, ni procesos que conviene rediseñar antes que acelerar. Si tu caso está en alguno de esos grupos, te lo decimos antes de arrancar y te ahorras el proyecto entero.',
            ],
          },
          {
            heading: 'Qué cuesta',
            part: 'Decidir con criterio',
            paragraphs: [
              'Un flujo de un solo proceso arranca en torno a los 2.500 € de construcción, los que tocan varios de tus sistemas se acercan a los 10.000 € y la operación mensual va entre 150 y 500 €, que cubren la vigilancia y el mantenimiento. El modelo y la infraestructura van en cuentas a nombre de tu empresa, así que esas facturas son tuyas y no entran en la cuota. Lo que mueve esas cifras aquí es concreto: cuántos sistemas hay que conectar, cuánta validación exige el proceso y cuánto volumen corre por él.',
              '<strong>La regla sana es que el coste medido del proceso hoy ponga el techo del presupuesto y que el piloto lo confirme, no al revés.</strong> El desglose entero está en la guía de coste.',
            ],
            link: { label: 'Cuánto cuesta un agente de IA, desglosado', href: '/cuanto-cuesta-un-agente-de-ia' },
          },
        ],
        faqHeading: 'Preguntas frecuentes',
        faq: [
          {
            q: '¿Qué es la automatización de procesos con IA?',
            a: 'Automatización donde un modelo de lenguaje resuelve los pasos que exigen leer o interpretar, dentro de un flujo validado por código. El modelo interpreta. El código comprueba y ejecuta.',
          },
          {
            q: '¿Esto es RPA?',
            a: 'No es lo mismo, aunque hoy muchas suites de RPA lleven lectura con IA dentro. La RPA repite clics y reglas sobre pantallas y se rompe cuando algo cambia de sitio o de formato. Lo que aportamos es que el modelo interpreta el contenido, así que la variación no rompe el flujo. Conviven bien, la RPA moviendo lo estable y el modelo leyendo lo variable.',
          },
          {
            q: '¿Y si la IA lee mal un documento?',
            a: 'Una capa de validación comprueba el resultado antes de registrarlo: totales, formatos, campos obligatorios. Los casos dudosos van a una persona, así que la revisión se concentra donde hace falta criterio.',
          },
          {
            q: '¿Cuánto del proceso queda automatizado de verdad?',
            a: 'Depende de cuántos casos raros tenga, así que se mide en vez de estimarse. El sistema registra qué resuelve solo y qué escala a una persona y ese porcentaje se ve desde el primer mes.',
          },
          {
            q: '¿Tenemos que cambiar de ERP o de herramientas?',
            a: 'No. El flujo se conecta a lo que ya usas y el resultado aterriza donde tu equipo ya trabaja, sea un ERP o un Excel. Uno de nuestros clientes gestiona sus facturas reenviándolas por Telegram, sin aprender ninguna herramienta nueva.',
          },
          {
            q: '¿Podemos empezar por un solo proceso?',
            a: 'Es justo lo que recomendamos. Un proceso con dolor medible, un piloto con su métrica y ampliar por fases si cumple. Es como empezaron nuestros clientes de automatización. El que más tiempo lleva sigue añadiendo procesos.',
          },
          {
            q: '¿Funciona con escaneos malos o fotos de móvil?',
            a: 'Los legibles pasan y los dudosos escalan a una persona con la imagen al lado, en vez de registrarse a medias. Qué porcentaje cae de cada lado no te lo prometemos de antemano, se mide en tu piloto con tus documentos reales.',
          },
          {
            q: '¿El flujo solo lee o también escribe en nuestros sistemas?',
            a: 'Lee y escribe, con red. Las escrituras pasan la validación y las sensibles piden confirmación de una persona antes de ejecutarse. Qué puede tocar cada flujo se define contigo, por sistema y por acción.',
          },
          {
            q: '¿Cuánto se tarda en tener el primer flujo andando?',
            a: 'Depende de tres cosas: que los datos existan, que los accesos estén dados y que la tarea a automatizar esté bien definida. Con las tres, un piloto en dos semanas es realista. Si falta alguna, lo primero del proyecto es conseguirla. Ese plazo no lo marcamos nosotros.',
          },
          {
            q: '¿Qué pasa con los casos que el flujo no resuelve?',
            a: 'Escalan a tu equipo con todo el contexto que el sistema ya reunió. Ese reparto es la diferencia con la pregunta de los escaneos, que va de una lectura dudosa. Aquí caben además los casos que el flujo entiende bien pero no le corresponde decidir. El objetivo no es el cien por cien, es que la revisión humana quede donde aporta criterio y que el porcentaje resuelto esté medido, no supuesto.',
          },
        ],
        cta: {
          heading: '¿Qué proceso te está costando horas?',
          body: 'Cuéntanos tu reto. Si no le vemos retorno, te lo diremos.',
          button: 'Cuéntanos tu reto',
        },
      },
      conversational: {
        tocHeading: 'Qué verás en esta página',
        metaTitle: 'Chatbot con IA y agentes conversacionales, Ideasforge',
        metaDescription:
          'Chatbot con IA y agentes conversacionales que atienden, cualifican y actúan: citas reservadas, solicitudes filtradas y dudas resueltas sobre tus sistemas.',
        hero: {
          eyebrow: 'Agentes conversacionales',
          title: 'Chatbots con IA que terminan la tarea',
          subtitle:
            'Agentes conversacionales que atienden, cualifican y actúan. Citas reservadas, solicitudes filtradas y dudas resueltas, todo sobre los sistemas que ya usas.',
          cta: 'Cuéntanos tu reto',
        },
        sections: [
          {
            heading: 'Qué construimos',
            part: 'El encargo',
            paragraphs: [
              'Chatbots con inteligencia artificial para los canales donde ya están tus clientes o tu equipo, WhatsApp con la API oficial de Meta, la web y herramientas internas. El agente entiende lenguaje natural, consulta tus sistemas reales (agenda, CRM, base de datos) y termina la tarea dentro de la conversación.',
              '<strong>Terminar es la palabra importante.</strong> Lo habitual es que un chatbot de guion explique el procedimiento y te deje a ti el trabajo. Estos lo hacen dentro de la conversación, sea reservar una cita, devolver una cifra o dejar una solicitud cualificada.',
              'Esto es lo que puede hacer. Los cuatro primeros son los encargos que más nos piden y el último va incluido en todos.',
            ],
            kind: 'lattice',
            bullets: [
              'Atención que resuelve. Respuestas apoyadas en tus datos y tu documentación, con su referencia, a cualquier hora.',
              'Gestiones completas. Reservar, cambiar, cancelar o consultar, con la agenda y la ficha actualizadas en el momento.',
              'Filtro de conversaciones. Las que tienen recorrido comercial pasan a tu equipo ya cualificadas y el resto queda atendido sin robarle tiempo a nadie.',
              'Consultas internas. La misma ingeniería hacia dentro, con empleados que preguntan a sus datos o a su documentación.',
              'Salida a persona. Cuando la conversación necesita a alguien del equipo, llega a alguien del equipo, con el historial entero.',
            ],
            link: { label: 'Asistente sobre tu documentación interna', href: '/servicios/conocimiento-corporativo' },
          },
          {
            heading: 'Por qué los chatbots de guion tienen mala fama',
            part: 'El encargo',
            paragraphs: [
              'Casi todo el mundo ha sufrido uno: el bot que da vueltas en su guion, no entiende la segunda pregunta y esconde el camino hacia una persona. Y cuando por fin llega la persona, hay que contárselo todo otra vez.',
              'Esa experiencia tuvo dos causas y conviene separarlas. La primera es tecnológica y está resuelta, aquellos menús se rompían en cuanto alguien escribía como escriben las personas. La segunda sigue viva y es una manera de medir. A muchos bots se les pide que retengan el mayor número de conversaciones sin pasarlas al equipo humano, en lugar de que resuelvan el mayor número posible.',
              'Nosotros medimos otra cosa. <strong>Una conversación cuenta cuando la tarea quedó hecha o cuando llegó a la persona adecuada con todo el contexto.</strong> Por eso la salida a persona nunca se esconde y el traspaso lleva el historial completo, para que nadie repita lo que ya escribió.',
              'Un cliente que pidió hablar con alguien y lo consiguió rápido vuelve. Uno que peleó diez minutos contra un guion no vuelve. Y tampoco te recomienda.',
            ],
          },
          {
            heading: 'De guion a acciones',
            part: 'El encargo',
            paragraphs: [
              'Los chatbots de hace unos años eran menús de botones. Funcionaban hasta que el cliente escribía como escriben las personas, dando contexto, metiendo dos preguntas en una o pidiendo la opción que el menú no tenía.',
              '<strong>La generación actual no sigue un árbol rígido. Entiende texto libre, pero solo hace lo que le hemos permitido.</strong> El modelo interpreta la intención y elige entre un conjunto cerrado de acciones que definimos contigo, reservar, consultar, cambiar, escalar. El código ejecuta la acción elegida y valida el resultado antes de responder.',
            ],
          },
          {
            heading: 'Pocas gestiones, cerradas de verdad',
            part: 'El encargo',
            paragraphs: [
              'El error clásico del sector es el bot que sabe de todo y no cierra nada. <strong>Nosotros preferimos el contrario, un agente que hace pocas gestiones y las termina, con cada categoría medida por separado.</strong> Si el ochenta por ciento de tus conversaciones son tres trámites, el agente que hace esos tres de principio a fin vale más que el que responde regular a cien preguntas.',
              '¿Significa eso que responde a poco? Conviene separar dos cosas que se confunden. Las acciones que el agente ejecuta son pocas y cerradas. Las preguntas que responde apoyándose en tu documentación pueden ser muchas. Las dos se miden por separado, pero no se amplían igual.',
              'En la práctica cada gestión es una categoría con nombre, sus casos de prueba y su número. «Cambiar una cita» se mide por separado, así que si su acierto baja se ve en su propia fila y no escondido en un promedio general. Las categorías se amplían cuando los números lo piden, no cuando la demo lo sugiere.',
            ],
          },
          {
            heading: 'Atención al cliente con IA',
            part: 'Cómo funciona y por qué fiarse',
            paragraphs: [
              'La atención al cliente es donde un agente conversacional se rentabiliza antes. Responde lo habitual, cualifica el resto y escala lo que necesita criterio, así que las colas de espera se convierten en respuesta inmediata.',
              'La agencia inmobiliaria con la que trabajamos recibe decenas de consultas de alquiler al día por WhatsApp. Cada una le llevaba antes entre cinco y diez minutos de comprobación y hoy cifra en más de tres horas al día lo que se ahorra. Su equipo ya solo concierta visitas. Ese caso está contado entero en <a class="link-inline" href="/casos/barceloneta">su propia página</a>.',
              'Ahí se atiende y se cualifica en el mismo mensaje, porque filtrar bien es lo que deja al equipo el trabajo que produce ingresos.',
              '<strong>Buena parte del valor está en la hora a la que se contesta.</strong> Las consultas no llegan solo en horario de oficina, llegan también cuando el cliente tiene el móvil en la mano. Cuanto más tarda la respuesta, menos ganas le quedan de volver a escribir. Un agente que contesta al minuto uno convierte ese goteo nocturno en citas.',
            ],
            link: { label: 'El caso de la inmobiliaria', href: '/inmobiliarias' },
          },
          {
            heading: 'Una reserva, mensaje a mensaje',
            part: 'Cómo funciona y por qué fiarse',
            paragraphs: [
              'Son seis pasos. <strong>En cualquiera de ellos la conversación puede saltar a una persona, con el historial delante y con el mismo registro que cualquier otra conversación.</strong>',
            ],
            kind: 'checklist',
            bullets: [
              'Escribe el cliente. «¿Tenéis hueco el jueves por la tarde?», con sus palabras y sus prisas.',
              'El agente entiende. Detecta qué gestión pide, para quién y con qué condiciones, aunque venga todo en una frase.',
              'Consulta la agenda real. La disponibilidad sale del calendario en ese momento, no de una copia de ayer.',
              'Propone y encaja. Ofrece huecos concretos y absorbe los cambios, el jueves no, mejor el viernes a primera hora.',
              'Confirma y registra. La cita queda en la agenda y en la ficha, con su confirmación dentro del chat.',
              'Queda registrado. La conversación y lo que el agente hizo se pueden reconstruir después, paso a paso.',
            ],
          },
          {
            heading: 'Un chatbot útil depende de otros sistemas',
            part: 'Cómo funciona y por qué fiarse',
            paragraphs: [
              'Un agente que solo conversa sirve de poco. El valor está en las conexiones: la agenda que consulta antes de ofrecer hora, el CRM donde apunta, la base de datos de la que saca la respuesta. Y cada conexión nueva es una cosa más que puede fallar, porque <strong>cualquier sistema externo puede caerse un martes a las once</strong>.',
              '<strong>Cuando eso pasa, el agente no finge ni se rompe.</strong> Avisa de que esa gestión concreta no está disponible ahora mismo, sigue con las demás y tu equipo se entera por una alarma, no por las quejas. Cómo se construye eso, con un mecanismo que aparta automáticamente la pieza que falla, lo contamos en detalle en el blog.',
            ],
            link: { label: 'Qué hace tu asistente cuando una herramienta se cae', href: '/blog/cuando-una-herramienta-se-cae' },
          },
          {
            heading: 'Lo que responde y lo que no se inventa',
            part: 'Cómo funciona y por qué fiarse',
            paragraphs: [
              'El miedo razonable de cualquier responsable es un bot improvisando delante de un cliente. Eso no se evita con promesas y tampoco se elimina del todo. Se reduce con la manera de construirlo. Lo que no se elimina se mide.',
              'Las respuestas de conocimiento salen de tus datos y tu documentación, con la fuente al lado. Las frases delicadas, una política de devoluciones, una condición legal, un precio, no las redacta el modelo. Son textos aprobados por ti que el sistema entrega tal cual. Los editas sin tocar código y ninguna edición llega a producción sin pasar su comprobación.',
              'En las partes donde un dato inventado se paga caro damos un paso más y le cambiamos el papel al modelo. Un modelo de lenguaje está construido para responderte, así que cuando le falta un dato rellena el hueco con algo que suena bien.',
              '¿Cómo se le quita esa costumbre? Ahí el modelo no redacta la respuesta. Lee lo que se le pide, decide con cuál de las salidas que le hemos dado encaja y entrega esa decisión en un formato fijo. A partir de ahí trabaja el código, que consulta el dato real y compone la respuesta.',
              '<strong>Si lo que le piden no encaja con ninguna salida, no hay nada que inventar, el sistema se detiene y la conversación pasa a una persona.</strong>',
              'Y cuando no hay dato para responder, el agente lo dice y ofrece el camino a una persona. Un «no lo sé» a tiempo conserva clientes. Una respuesta inventada los pierde sin que te enteres, que es la peor manera de perderlos. Por eso las respuestas se miden por categoría, para que un fallo aparezca en su propia fila en vez de perderse en un promedio.',
            ],
          },
          {
            heading: 'Cuando la conversación toca datos sensibles',
            part: 'Cómo funciona y por qué fiarse',
            paragraphs: [
              'Hay conversaciones que llevan dentro cosas que el reglamento europeo trata aparte. Los datos de salud son el ejemplo más claro y están en el mismo grupo que la ideología, los datos biométricos o la orientación sexual, lo que la norma llama categorías especiales y protege de forma reforzada. Si tu negocio las toca, montar un asistente deja de ser solo una cuestión de producto.',
              '<strong>Lo que ponemos ahí no es una promesa, es una lista.</strong> Cifrado campo a campo, que significa que cada dato sensible va cifrado por su cuenta dentro de la base de datos y no en bloque con todo lo demás. Plazos de conservación acordados por escrito y borrado a petición de todo lo que no esté sujeto a un plazo legal. Y el reparto de responsabilidades dicho desde el principio, tu empresa responde del tratamiento y nosotros somos el encargado, con su contrato.',
              'No es teoría. Wazzy, el asistente de citas que operamos nosotros, trabaja a diario con datos de salud y lleva esa disciplina puesta desde el primer día, así que cuando aparece un sector con requisitos de cumplimiento no empezamos de cero.',
            ],
          },
          {
            heading: 'Medido, no supuesto',
            part: 'Cómo funciona y por qué fiarse',
            paragraphs: [
              '<strong>Los sistemas conversacionales se degradan en silencio.</strong> Una actualización del modelo o un documento nuevo cambian respuestas sin ningún error visible. Por eso fijamos la versión del modelo, de modo que actualizarla es una decisión nuestra y no una sorpresa del proveedor. Cada cambio pasa por una batería de pruebas antes de publicarse y cada conversación deja un registro que se puede reconstruir.',
              'La operación también tiene sus números: qué porcentaje termina en tarea hecha, qué porcentaje escala y por qué motivos, qué cuesta cada conversación. Con ellos se decide qué categoría afinar y cuál añadir. Cómo se leen esos números en un sistema propio, con sus fallos y lo que costó corregirlos, está en <a class="link-inline" href="/casos/wazzy">la página de Wazzy</a>.',
            ],
          },
          {
            heading: 'Cómo se arranca',
            part: 'Decidir con criterio',
            paragraphs: [
              '<strong>Un agente conversacional no se lanza al mundo entero el primer día.</strong> Se estrena acotado, lo que llamamos el piloto, en un canal, en un horario o en un grupo de clientes, con sus categorías medidas desde la primera conversación. Los textos delicados salen aprobados por ti antes de que nadie los lea y tu equipo sabe cómo llega un escalado y qué hacer con él.',
              'A las pocas semanas podemos valorar si el piloto está listo para ampliarse: qué se termina dentro de la conversación, qué escala con qué motivos y qué pregunta la gente que no habíamos previsto. Con eso se decide la ampliación, categoría a categoría. Es la manera de crecer sin ampliar nada que no se haya probado antes.',
            ],
          },
          {
            heading: 'Cuándo un agente conversacional no compensa',
            part: 'Decidir con criterio',
            paragraphs: [
              '<strong>Decírtelo también es el servicio.</strong> Si te llegan un puñado de conversaciones al día, una página de preguntas bien escrita y una persona que contesta rápido te sale más barato. Si las respuestas que necesitas no están en ningún sistema, el trabajo previo es ordenar ese conocimiento, no montar el bot. Y si por el motivo que sea tu cliente necesita hablar con una persona, lo que toca es que llegue a ella antes, no poner una máquina en medio.',
              '¿Y cuándo sí? Un agente conversacional compensa cuando hay volumen, cuando la información existe y cuando una parte real de las gestiones puede terminarse dentro de la conversación. Filtrar y cualificar cuentan como gestión terminada, aunque el cierre lo haga después una persona. Si tu caso no cumple alguna de las tres, te lo decimos en la primera llamada.',
            ],
          },
          {
            heading: 'Qué cuesta',
            part: 'Decidir con criterio',
            paragraphs: [
              'Los rangos publicados para cualquier agente nuestro valen aquí, entre 2.500 y 10.000 € de construcción y entre 150 y 500 € al mes de operación. El factor propio de lo conversacional es el volumen.',
              '<strong>En WhatsApp el coste tiene dos contadores en vez de uno.</strong> Cada conversación gasta sus llamadas al modelo. Meta cobra aparte cada plantilla que entrega. Un recordatorio de cita es una plantilla, así que cada aviso tiene su propio coste. Los dos van desglosados.',
              'Antes de encargar nada tendrás una estimación, hecha con lo que ya tenemos medido en sistemas parecidos y aplicada a tu volumen. El piloto la convierte en medida con tus propias conversaciones. El desglose entero está en la guía de coste.',
            ],
            link: { label: 'Cuánto cuesta un agente de IA, desglosado', href: '/cuanto-cuesta-un-agente-de-ia' },
          },
        ],
        faqHeading: 'Preguntas frecuentes',
        faq: [
          {
            q: '¿Qué diferencia hay entre un chatbot de guion y un agente conversacional?',
            a: 'Un chatbot de guion sigue un árbol de botones y se rompe al salirse de él. Un agente conversacional entiende texto libre y decide entre las acciones disponibles, así que la misma pregunta formulada de veinte maneras llega al mismo sitio.',
          },
          {
            q: '¿En qué canales funciona?',
            a: 'WhatsApp con la API oficial, web y herramientas internas. Donde ya estén tus clientes o tu equipo.',
          },
          {
            q: '¿Puede reservar, cambiar o cancelar citas él solo?',
            a: 'Sí. Lo tenemos en producción con Wazzy, un asistente de citas que es producto nuestro, con disponibilidad en tiempo real, confirmación inmediata y agenda actualizada.',
          },
          {
            q: '¿Y si mi cliente quiere hablar con una persona?',
            a: 'Siempre. El camino a una persona está a la vista y quien atiende recibe la conversación entera, sin hacer repetir nada. Fuera de horario el caso espera con su historial y se atiende a primera hora. Un bot que atrapa a la gente sale caro en clientes, no lo construimos.',
          },
          {
            q: '¿Se inventará respuestas delante de mis clientes?',
            a: 'Las respuestas de conocimiento salen de tus datos con su fuente y las frases delicadas son textos aprobados por ti que el sistema entrega tal cual. Cuando no hay dato, lo dice y ofrece una persona. Con eso el riesgo baja mucho. El que queda se mide por tipo de gestión, así que un fallo aparece en su categoría en vez de perderse en un promedio.',
          },
          {
            q: '¿Podemos cambiar lo que dice sin llamaros?',
            a: 'Los textos aprobados los editas tú sin tocar código. Ninguna edición entra en producción sin pasar su comprobación. Un documento nuevo tampoco cambia respuestas hasta que la batería lo aprueba. Para cambiar lo que el agente puede hacer entramos nosotros, también con las pruebas delante.',
          },
          {
            q: '¿Quién responde del RGPD?',
            a: 'El responsable del tratamiento es tu empresa y nosotros somos el encargado. Lo que entregamos es contrato de encargo, medidas técnicas y plazos de conservación por escrito. Cuando hay datos de categoría especial de por medio, como los de salud, eso incluye además cifrado campo a campo y borrado a petición de todo lo que no tenga un plazo legal por encima.',
          },
          {
            q: '¿Y si WhatsApp cambia sus reglas o sus precios?',
            a: 'La API oficial nos protege de que Meta corte los atajos no oficiales, no de que suba sus tarifas. Las suyas se repercuten desglosadas y aparte de nuestra parte, así que siempre ves cuál es cuál. Y la lógica del agente no vive en el canal, la misma conversación puede atenderse en web o en una herramienta interna con el mismo cerebro detrás.',
          },
          {
            q: '¿Sirve para vender o solo para atender?',
            a: 'Las dos cosas se tocan. Un agente que filtra y cualifica entrega a tu equipo interesados cualificados, como la inmobiliaria que ya solo concierta visitas. Lo que no hacemos es envío masivo por WhatsApp, ni con IA ni sin ella.',
          },
          {
            q: '¿Cuántas conversaciones hacen falta para que compense?',
            a: 'No damos un número mágico porque depende de lo que te cuesta hoy atender esos mensajes a mano. El piloto lo mide con tus conversaciones reales, se paga y su precio entra dentro del proyecto final. Si la cuenta no sale, te lo decimos nosotros antes de ampliar.',
          },
        ],
        cta: {
          heading: '¿Un agente conversacional para tu negocio?',
          body: 'Cuéntanos tu reto. Si no le vemos retorno, te lo diremos.',
          button: 'Cuéntanos tu reto',
        },
      },
      cost: {
        tocHeading: 'Qué verás en esta guía',
        metaTitle: 'Cuánto cuesta un agente de IA, Ideasforge',
        metaDescription:
          'Un agente de IA a medida cuesta entre 2.500 y 10.000 € de construcción, más 150 a 500 € al mes de operación. Qué mueve el precio y qué es tuyo al final.',
        hero: {
          eyebrow: 'Guía de precios',
          title: '¿Cuánto cuesta un agente de IA?',
          subtitle:
            'Un agente de IA a medida construido por Ideasforge cuesta entre 2.500 y 10.000 € de construcción, más 150 a 500 € al mes por operarlo y medirlo. El modelo y la nube se facturan aparte, a tu empresa. Esta página explica qué mueve esa cifra, con datos de coste reales de nuestros sistemas en producción.',
        },
        sections: [
          {
            heading: 'La respuesta corta',
            id: 'respuesta',
            paragraphs: [
              'Un agente de un solo trabajo se queda en la parte baja del rango. Un canal, un sistema al que conectarse y una tarea acotada, como leer las facturas que llegan a un chat y convertir cada una en una fila de datos lista para usar. <strong>Construirlo arranca en torno a 2.500 €. Operarlo, en torno a 150 € al mes.</strong>',
              'La parte alta es para agentes que tocan varios sistemas y necesitan más validación antes de salir, como un asistente que responde desde tu documentación y además consulta datos vivos. Esas construcciones se acercan a los 10.000 € y su operación se sitúa en la parte alta del rango mensual.',
              'Los sistemas multiagente más grandes se presupuestan por proyecto.',
              '<strong>Y hay una tercera cifra que conviene tener clara desde el principio.</strong> El modelo que usa el agente y la nube donde corre van en cuentas a nombre de tu empresa, así que sus facturas son tuyas y no están dentro de la cuota mensual.',
            ],
          },
          {
            heading: 'Qué mueve el precio',
            id: 'factores',
            paragraphs: ['<strong>Cuatro cosas explican casi cualquier presupuesto que enviamos.</strong>'],
            bullets: [
              'A cuántos sistemas se conecta. Un agente que solo responde preguntas es más barato que uno que además escribe en tu calendario, en tu CRM o en tu base de datos, porque cada sistema conectado necesita sus propios permisos y sus propias pruebas.',
              'El estado de tus datos. Si el conocimiento que el agente necesita vive en fuentes limpias y legibles, el modelo rinde mejor y la construcción se acorta. Se avanza más ordenando los datos y las herramientas que puliendo instrucciones.',
              'Cuántas pruebas necesitas antes de salir. Nuestro asistente de citas Wazzy no publica un cambio hasta que pasa una batería de conversaciones anotadas de una en una. No todos los proyectos necesitan esa profundidad. Elegirla forma parte de la conversación del precio.',
              'Quién lo opera después. La cuota mensual cubre vigilar el sistema en producción. La siguiente sección explica en qué se gasta.',
            ],
          },
          {
            heading: 'Los dos gastos de un agente en marcha',
            id: 'operacion',
            paragraphs: [
              '<strong>Tener un agente funcionando genera dos gastos distintos y conviene no mezclarlos.</strong> Uno es lo que el sistema consume para funcionar, el modelo y la infraestructura, que va en cuentas a nombre de tu empresa. El otro es nuestra cuota, que paga el trabajo de vigilarlo.',
              'Cada mensaje que entra dispara llamadas al proveedor del modelo. Ese es el coste bruto de tener el agente en marcha, lo paga tu empresa y sube o baja con el uso, así que no lo escondemos dentro de nuestra cuota. La infraestructura funciona igual. La cuenta en la nube está a tu nombre, así que su factura también.',
              'Que vaya aparte tiene una consecuencia buena para ti. Lo ves, así que puedes bajarlo. <strong>Conocer el reparto del gasto es lo que permite recortarlo midiendo, en lugar de a ciegas.</strong> En Wazzy lo medimos por capas: leer y estructurar el mensaje que entra se lleva entre el 52 y el 57 % del gasto de modelo, decidir qué hacer a continuación entre el 24 y el 31 % y escribir la respuesta entre el 16 y el 19 %.',
              'Con ese mapa delante se decide con datos. En uno de nuestros sistemas probamos un modelo más barato y la batería de pruebas lo descartó, porque la calidad general bajaba diez puntos. El ahorro era real. No compensaba.',
              '<strong>Nuestra cuota paga otra cosa, que es el trabajo de vigilar.</strong> Una vez por semana lanzamos una conversación de prueba anonimizada contra el sistema vivo de principio a fin. Y antes de publicar cualquier cambio tiene que pasar la batería de pruebas. Son dos cosas distintas y separadas a propósito. <strong>La batería frena los cambios, la prueba semanal vigila lo que ya está funcionando.</strong>',
            ],
            link: { label: 'Por qué mantener viva la IA es lo difícil', href: '/blog/mantener-viva-la-ia' },
          },
          {
            heading: 'Qué es tuyo al final',
            paragraphs: [
              '<strong>El repositorio está a tu nombre desde el primer día</strong> y la infraestructura corre en una cuenta en la nube que es tuya, no nuestra. Si nos separamos, el sistema se queda contigo, con su documentación y su historial.',
              'Eso explica también qué no incluye la cuota. <strong>No estás alquilando el agente</strong>, así que el coste mensual es operación y no una licencia que deja de funcionar cuando dejas de pagar.',
            ],
            link: { label: 'Cómo construimos agentes de IA', href: '/servicios/desarrollo-de-agentes-de-ia' },
          },
        ],
        faqHeading: 'Las preguntas de precio que más nos hacen',
        faq: [
          {
            q: '¿Cuánto cuesta un chatbot con IA?',
            a: 'Un chatbot de atención se queda en la parte baja del rango, desde 2.500 € de construcción, porque suele vivir en un solo canal y consultar una sola fuente de conocimiento. El precio sube cuando deja de solo responder y empieza a actuar, reservando citas o actualizando fichas, porque cada acción necesita sus permisos y sus pruebas.',
          },
          {
            q: '¿Por qué hay una cuota mensual?',
            a: [
                'Porque el modelo sobre el que corre tu agente cambia por debajo. Los proveedores actualizan modelos sin cambiarles el nombre. Un sistema que ayer respondía bien puede empezar a fallar en silencio. La cuota paga la medición y la prueba semanal que lo detectan antes que tus usuarios.',
                'Y la cuenta sale porque lo caro, construir la batería de casos con sus respuestas anotadas, ya quedó pagado en la construcción. Pasarla antes de cada cambio y vigilar cada semana es trabajo de máquina.',
              ],
          },
          {
            q: '¿Podemos operarlo sin vosotros?',
            a: 'Sí. Todo es tuyo, así que puedes tomar el relevo cuando quieras y hacemos sesiones de traspaso cuando un cliente las pide. Ten en cuenta una cosa, eso sí. Operar un agente significa medirlo y si nadie sigue midiendo, los fallos se vuelven silenciosos.',
          },
        ],
        cta: {
          heading: '¿Quieres una cifra para tu caso?',
          body: 'Cuéntanos tu reto y respondemos en un día laborable. Si no vemos retorno, te lo decimos.',
          button: 'Cuéntanos tu reto',
        },
      },
      compliance: {
        tocHeading: 'Qué verás en esta página',
        metaTitle: 'IA y RGPD, un sistema que tu DPD pueda defender, Ideasforge',
        metaDescription:
          'Agentes de IA para empresas con datos que no pueden salir de su control: infraestructura a tu nombre, aislamiento por código y cada decisión registrada.',
        hero: {
          eyebrow: 'Soberanía del dato',
          title: 'IA conforme al RGPD que tu delegado de protección de datos puede comprobar',
          subtitle:
            'Construimos agentes de IA para empresas sujetas al reglamento europeo, estén donde estén, cuyos datos no pueden salir de su control. La aplicación y sus datos corren en una cuenta en la nube a tu nombre, el aislamiento lo garantiza el código y no una instrucción al modelo. Cada decisión queda registrada para que alguien pueda revisarla después. Escrito desde cinco sistemas en producción.',
          cta: 'Cuéntanos tu reto',
        },
        sections: [
          {
            heading: 'Lo que hacemos y lo que no',
            part: 'Lo que hacemos y lo que no',
            paragraphs: [
              'Somos ingenieros, no auditores. <strong>No certificamos tu cumplimiento, no emitimos dictámenes jurídicos y no firmamos tu clasificación de riesgo.</strong> Eso es trabajo de tus abogados y de tu delegado de protección de datos. Cualquier proveedor que se ofrezca a resolvértelo en una reunión comercial está ofreciendo algo que no puede entregar.',
              '¿Para qué llamarnos, entonces?',
              'Lo que sí hacemos es construir el sistema de debajo para que esas personas tengan algo sólido que evaluar. Cuando tu DPD pregunte por dónde fueron los datos, quién pudo verlos y por qué el asistente respondió lo que respondió, la respuesta existe, está escrita y se puede enseñar.',
              'La mayoría de los proyectos de IA no pueden hacer eso. Por eso tantos se paran en cuanto entra el departamento legal.',
              'Esta página explica, mecanismo a mecanismo, cómo nuestros sistemas hacen posibles esas respuestas. Está escrita para quien tiene que defender el proyecto delante de un comité. Si ese eres tú, al terminar deberías saber exactamente qué preguntarnos, a nosotros o a cualquiera que se presente al trabajo.',
            ],
          },
          {
            heading: 'Qué significa de verdad que una IA cumple el RGPD',
            id: 'que-significa',
            part: 'Qué significa cumplir',
            kind: 'lattice',
            paragraphs: [
              'Cumplir el RGPD tiene una mitad jurídica que no es nuestra, la base de legitimación, la información al interesado y el ejercicio de derechos. <strong>Lo que la ingeniería puede aportar son tres respuestas con pruebas en vez de con garantías verbales</strong>. Sin ellas, la mitad jurídica se defiende mal.',
            ],
            bullets: [
              'Por dónde viajan los datos personales cuando alguien usa el sistema, incluido cada tercero de la cadena.',
              'Quién puede ver qué. Qué pieza de software impone ese límite cuando alguien intenta saltárselo.',
              'Por qué el sistema respondió lo que respondió, reconstruido después a partir de registros y no de memoria.',
            ],
          },
          {
            heading: 'Cumplir es una decisión de arquitectura antes que de papeleo',
            part: 'Qué significa cumplir',
            paragraphs: [
              'El reglamento no menciona la inteligencia artificial por su nombre en ningún sitio. Regula datos personales. Un asistente que lee facturas, reserva citas o responde preguntas sobre tu operación está lleno de datos personales desde el primer día. Así que se le aplican los principios de siempre. Cada uno aterriza en una decisión concreta de ingeniería.',
              'La minimización deja de ser una línea de una política y pasa a ser una pregunta sobre el contexto. Un modelo de lenguaje solo puede filtrar lo que le dieron, así que el control real es qué entra en la petición.',
              'La limitación de finalidad, que es un deber tuyo y no del agente, pasa a ser algo verificable. Un agente que solo puede llamar a tres funciones aprobadas no tiene camino técnico para desviarse de su finalidad, así que la arquitectura no garantiza la limitación pero sí permite demostrarla.',
              'Y la responsabilidad proactiva pasa a ser una pregunta sobre registros. Si el sistema no puede enseñar por qué hizo lo que hizo, ningún documento de política lo va a enseñar tampoco.',
              '<strong>Por eso decimos que el papeleo sigue a la arquitectura y no al revés.</strong> Un sistema bien construido hace que el contrato de encargo, la evaluación de impacto y el registro de actividades de tratamiento se escriban antes y se defiendan mejor, porque cada afirmación de esos documentos señala algo que existe de verdad en el código.',
              '¿Y al revés, primero los papeles y luego el sistema? Ninguna documentación vuelve auditable un sistema que no lo es.',
            ],
          },
          {
            heading: 'Dos reglamentos europeos, una sola arquitectura',
            part: 'Qué significa cumplir',
            paragraphs: [
              '<strong>Una empresa que despliega IA en Europa responde hoy ante dos reglamentos a la vez.</strong> El RGPD gobierna qué puede pasarle a un dato personal, lo trate quien lo trate. En España lo acompaña la ley orgánica de protección de datos, la 3/2018, con la AEPD como autoridad de control.',
              'El reglamento europeo de IA ordena los sistemas por el riesgo de su uso, desde las prácticas prohibidas hasta el riesgo mínimo. Pone deberes concretos a las empresas que usan los de más riesgo, entre ellos supervisión, vigilancia y registros. Su calendario cambió en julio de 2026.',
              'El Ómnibus Digital, el Reglamento (UE) 2026/1744, aplazó las obligaciones de alto riesgo de los sistemas del anexo III al 2 de diciembre de 2027 y las de la IA integrada en productos del anexo I al 2 de agosto de 2028.',
              'Lo que sí se aplica ya es lo demás, las prácticas prohibidas y la alfabetización en IA desde febrero de 2025, las reglas de los modelos de propósito general desde agosto de 2025 y la transparencia del artículo 50 desde el 2 de agosto de 2026. Las multas del tramo más alto llegan a 35 millones de euros o al 7 % de la facturación.',
              'El mapa completo de ese segundo reglamento lo tenemos en su propia página, función por función y deber por deber, porque merece el espacio. Una pieza sí pertenece aquí, porque va de datos y no de sistemas. En diciembre de 2024 el Comité Europeo de Protección de Datos publicó su Dictamen 28/2024, su primer dictamen formal sobre los modelos en sí. Tres conclusiones importan a un comprador.',
              'Que un modelo entrenado sea anónimo se valora caso por caso. El interés legítimo solo puede sostener un tratamiento con IA tras una evaluación documentada en tres pasos. Y la tercera es la que más te toca. Un modelo desarrollado con un tratamiento ilícito puede contaminar el despliegue, así que quien lo despliega tiene que valorarlo. Ninguna de las tres es un sello automático.',
              'Las tres premian al proveedor que puede enseñar los deberes hechos. La tercera es exactamente por qué el proveedor de modelo se aprueba en vez de heredarse.',
            ],
            link: {
              label: 'La guía completa del reglamento europeo de IA',
              href: '/reglamento-europeo-de-ia',
            },
          },
          {
            heading: 'Dónde acaban tus datos de verdad',
            id: 'donde-van',
            part: 'Dónde van tus datos',
            paragraphs: [
              '<strong>La infraestructura corre en una cuenta en la nube que es tuya, no nuestra.</strong> El repositorio está a tu nombre desde el primer día. No alojamos tu asistente de nuestro lado para darte luego un usuario. Es poco habitual en el sector y es a propósito, porque quita de golpe toda una familia de preguntas que tu DPD tendría que ir persiguiendo.',
              'No hay una base de datos nuestra con una copia de tus registros ni una negociación de salida si dejamos de trabajar juntos. El sistema se queda donde siempre estuvo, con su documentación y su historia.',
              'Y hay algo más que conviene decir, porque casi ningún proveedor lo dice de sí mismo. <strong>Nosotros también somos encargados del tratamiento.</strong> Operamos el sistema, así que accedemos a datos personales, lo que significa que hace falta un contrato de encargo con nosotros igual que con cualquier otro proveedor de la cadena.',
              'De la cuenta salen dos caminos y los dos hay que tenerlos dibujados. El primero es la llamada al proveedor del modelo, la empresa que ejecuta el modelo de lenguaje. Tú apruebas qué proveedor, bajo qué contrato y con qué configuración. Apruebas qué puede viajar dentro de esas llamadas. El segundo aparece cuando el asistente vive en un canal de mensajería.',
              'Si la conversación entra por WhatsApp o por Telegram, ese canal recibe el contenido íntegro y es un tercero más de la cadena, con su propio contrato y su propia valoración de transferencias. Un asistente web o interno no tiene esa segunda salida. Los proveedores de modelos firman contratos de encargo del tratamiento, que obligan a un proveedor a tratar datos solo según tus instrucciones.',
              'Los serios ofrecen regiones de procesamiento europeas. Si una configuración concreta satisface las reglas de transferencias internacionales es una valoración de tus abogados. Lo nuestro es entregarles el dibujo completo de qué va a dónde, para que esa valoración lleve días en vez de meses.',
              'El aislamiento, los registros y el trato de los datos de salud parten de ahí, porque una cuenta que controlas es el único sitio desde el que se puede garantizar el resto.',
            ],
            link: {
              label: 'Cuánto cuesta construir y operar uno',
              href: '/cuanto-cuesta-un-agente-de-ia',
            },
          },
          {
            heading: 'Qué viaja de verdad en una llamada al modelo',
            part: 'Dónde van tus datos',
            paragraphs: [
              'La minimización deja de ser abstracta en cuanto miras dentro de una llamada. Una petición a un modelo de lenguaje lleva tres cosas: las instrucciones que le dicen cuál es su trabajo, el contexto que puede usar para esta respuesta y la pregunta que acaba de hacer la persona. Esa es toda la superficie.',
              '<strong>El modelo nunca se conecta a tu base de datos, nunca navega por tus sistemas y nunca recibe lo que el código no metió en el sobre.</strong>',
              'Entonces, ¿quién llena el sobre? Lo llena el código, así que la pregunta de ingeniería que importa es qué mete dentro. La respuesta debería ser una que puedas enseñar a cualquiera. Un agente bien construido manda las pocas filas o párrafos a los que esa persona tiene derecho, ya filtrados, en vez de volcar tablas enteras y confiar en que el modelo cite la parte correcta.',
              'Mandar menos es más seguro. Además sale más barato y acierta más, porque un modelo razona mejor sobre una página relevante que sobre cincuenta de ruido.',
              'Cuando tu DPD pregunte qué puede ver el proveedor, el sobre es la respuesta, documentado caso de uso por caso de uso. En nuestros despliegues ese documento es corto. Más de un revisor se ha sorprendido de lo poco que sale de verdad. El asistente que responde preguntas de producción no exporta tu base de datos de producción.',
              'El asistente manda la pregunta de una persona y la porción de contexto a la que esa persona tiene derecho. Después escribe la respuesta en los mismos registros que todo lo demás.',
            ],
          },
          {
            heading: 'Entonces, ¿usar ChatGPT cumple el RGPD?',
            part: 'Dónde van tus datos',
            paragraphs: [
              'Es la pregunta que todo comité hace primero y casi siempre es la pregunta equivocada, porque «ChatGPT» nombra varios productos distintos con condiciones de datos distintas. Una pestaña gratuita del navegador, una suscripción de empresa y un contrato de API, que es la interfaz de máquina a máquina que llama un sistema como los nuestros, son tres situaciones distintas a ojos de la ley.',
              'Las condiciones sobre entrenamiento, conservación y procesamiento europeo cambian entre ellas. Y cambian con el tiempo, así que cualquier respuesta cerrada que diéramos hoy estaría caducada dentro de un mes.',
              '<strong>La pregunta útil es en cuál de las tres entran tus datos y bajo qué contrato.</strong> Un empleado pegando el correo de un cliente en una herramienta gratuita es una situación.',
              'Un sistema llamando a una API bajo un contrato de encargo firmado, en región europea, con el entrenamiento excluido y con solo un contexto filtrado dentro del sobre (lo que hacemos en Ideasforge), es una situación completamente distinta, aunque el modelo de debajo se llame igual. Tus abogados valoran el contrato. Nosotros construimos la segunda situación y les entregamos la prueba de que es lo que corre de verdad.',
              'Por eso también una empresa que prohíbe las herramientas de IA a secas acaba muchas veces con menos control, no con más. La demanda no desaparece, se muda a cuentas personales y a teléfonos donde no aplica ningún contrato, ningún registro y ningún filtro.',
              'Prohibir no quita el uso, lo saca de tu vista. Un asistente autorizado con la arquitectura correcta da a la gente la capacidad dentro de un perímetro que alguien gobierna de verdad.',
            ],
          },
          {
            heading: 'Soberanía del dato, sin el eslogan',
            id: 'soberania',
            part: 'Dónde van tus datos',
            paragraphs: [
              'La soberanía del dato se usa como palabra de marketing, así que conviene concretarla. Significa que la ubicación de tus datos, las claves que los abren y el sistema de identidad que dice quién es quién responden ante ti. La jurisdicción es otra cosa y esto no la resuelve. Una cuenta propia dentro de una nube estadounidense sigue teniendo detrás a una empresa estadounidense, con las leyes de su país.',
              'Por eso la palabra soberanía se usa con más alegría de la que aguanta. La ubicación sola no te lleva ahí. Un sistema cuyos datos están en Frankfurt pero cuyas claves de acceso, cuentas de administración y registros pertenecen a un proveedor es soberano en el folleto y en ningún otro sitio.',
              '¿Entonces es soberano o no lo es? No es una pregunta de sí o no. Hay un abanico y contarlo entero vale más que un eslogan.',
              'En un extremo está el software compartido, donde tus datos viven dentro del producto de otro bajo sus condiciones. Después viene correr en una región europea de una nube grande, luego una cuenta propia dentro de esa nube y por último tus propios servidores en tu propio edificio. Cada escalón compra control y cuesta comodidad.',
              'Nosotros construimos por defecto en el tercero, tu propia cuenta en la nube, porque da el control que importa, la propiedad del dato y el control de las claves y de la identidad, sin pedirle a tu equipo que administre máquinas físicas.',
              'Y ahora el párrafo que casi todos los proveedores se saltan. <strong>La aplicación que construimos corre entera dentro de infraestructura tuya. El modelo de lenguaje normalmente no</strong>, porque lo llamamos como servicio al proveedor que tú apruebes. Ejecutar un modelo abierto sobre tu propio hardware cerraría ese último hueco. Es otro proyecto, con otros costes y otro equilibrio de calidad.',
              'Si necesitas que hasta el modelo corra en tus instalaciones, dilo en la primera conversación, porque cambia la arquitectura desde los cimientos.',
              'Las preguntas sobre gobiernos extranjeros alcanzando tus datos, incluidas las leyes estadounidenses, van en esa misma primera conversación. Son terreno jurídico y tu asesoría tendrá su criterio. Lo que nosotros controlamos es la ingeniería que determina cuánto hay de lo que preocuparse, que es de lo que van las dos secciones siguientes.',
            ],
          },
          {
            heading: 'Un aislamiento que no depende de que el modelo se porte bien',
            id: 'aislamiento',
            part: 'Cómo se garantiza el aislamiento',
            kind: 'checklist',
            paragraphs: [
              'Una versión temprana de uno de nuestros asistentes mantenía separadas a las empresas diciéndole al modelo, en sus instrucciones, que no se saltara nunca el filtro. Funcionaba en todas las pruebas que hicimos.',
              '¿Y si funcionaba, qué había que arreglar? Seguía estando mal, porque una instrucción a un modelo de lenguaje es una petición. Un modelo puede dejar de atender una petición por motivos que nadie predice desde fuera.',
              'A los clientes se lo hemos contado como la diferencia entre una garantía y una petición educada. Cambió nuestra manera de construir. <strong>La seguridad tiene que aguantar incluso cuando el modelo falla.</strong>',
              'El sistema donde mejor se ve es el de Savian, un agente que responde a los responsables de varias empresas del mismo grupo, cada uno sobre las suyas. Corre en la cuenta de Savian, que es quien lo encarga. Ahí la separación se impone en cuatro sitios. El modelo no es ninguno de ellos.',
            ],
            bullets: [
              'El contexto, la información que el modelo puede leer mientras responde, solo contiene lo que la persona que pregunta tiene derecho a ver. El asistente no puede filtrar lo que nunca tuvo. Ni siquiera puede formular una pregunta sobre una empresa que no existe en su mundo.',
              'La corrección de nombres se limita a los centros para los que esa persona está autorizada. Cuando alguien escribe mal el nombre de un centro, la corrección solo puede caer dentro de su propio perímetro, así que un nombre parecido nunca lleva a la empresa de al lado.',
              'El código valida cada petición contra una lista blanca, una lista cerrada de valores permitidos, antes de construir ninguna consulta. El modelo propone, el código decide.',
              'La consulta final lleva un filtro incondicional. Si la lista de permisos llegara vacía, la consulta se resuelve en una condición que no encaja con nada. El fallo cierra la puerta en vez de abrirla.',
            ],
          },
          {
            heading: 'Cuando arreglamos la arquitectura, murió una clase entera de fallos',
            part: 'Cómo se garantiza el aislamiento',
            paragraphs: [
              'Las capas de seguridad están bien, pero cambiar el diseño para que el fallo no pueda existir está mejor. Uno de nuestros sistemas enseña la diferencia. Su aislamiento funcionaba originalmente por filtrado, con cada consulta llevando una condición que decía de qué empresa se permitían las filas.',
              'Después rehicimos el almacén de datos para que cada empresa viva en su propio esquema, su compartimento sellado dentro de la base de datos. La vista combinada las une con con la empresa marcada en cada fila. Las consultas del asistente corren contra el esquema de quien pregunta, nunca contra la vista combinada, que existe para otros usos.',
              'Tras ese cambio, sumar dos empresas en una misma cifra dejó de ser un fallo que un filtro debe atrapar y pasó a ser una consulta que el asistente no puede formular.',
              'El efecto práctico se vio enseguida. Una comparación poco estricta de nombres que había sido una preocupación real de seguridad bajo el diseño por filtrado simplemente dejó de importar, porque ni siquiera una coincidencia equivocada podía cruzar la frontera de un esquema.',
              '<strong>Arreglar la arquitectura mató la clase entera de fallos, no un caso suelto.</strong> Es el nivel al que apuntamos siempre que los datos lo permiten.',
              'Es una pregunta útil para cualquier proveedor. Qué fallos son imposibles en tu diseño, en vez de cuáles se atrapan.',
            ],
          },
          {
            heading: 'El modelo nunca es la autoridad',
            part: 'Cómo se garantiza el aislamiento',
            diagram: true,
            paragraphs: [
              'Nuestros sistemas comparten una regla de diseño. <strong>El juicio vive en el código, la interpretación del lenguaje vive en el modelo y el conocimiento vive en los datos.</strong>',
              'El modelo lee la pregunta de una persona y entrega un formulario estructurado, un contrato en formato fijo cuyos campos definimos de antemano. El código valida ese formulario, comprueba los permisos de quien pregunta y decide qué ocurre de verdad.',
              'Las consultas que tocan tus datos las construye el código a partir del formulario validado, con los valores pasados como parámetros y los nombres de columna sacados de una lista cerrada, nunca ensamblados con texto que escribió el modelo.',
              'Donde los registros importan más damos un paso adicional. En uno de nuestros asistentes el modelo ni siquiera devuelve el texto que acaba delante del usuario. Devuelve una clave, un identificador. El código busca el texto aprobado al que esa clave apunta. Lo que la persona lee es con seguridad lo que se aprobó, palabra por palabra, sin importar lo que el modelo generase alrededor.',
              'La identidad sigue la misma regla. Cuando un asistente consulta un sistema interno en nombre de alguien, lleva la credencial de esa persona, la misma que tus sistemas ya usan para saber quién pregunta. Cada llamada posterior corre con los permisos del humano, no con los permisos amplios de una cuenta de robot. Si la persona no puede abrir un registro a mano, el asistente no puede abrírselo.',
              'Buena parte de las preguntas de acceso del RGPD se simplifican ahí, porque el modelo de acceso del asistente pasa a ser el que tu empresa ya auditó. Esto vale cuando el asistente actúa por un usuario identificado.',
              'Cuando alguien escribe a un número de WhatsApp sin identificarse, como pasa en un asistente de citas, la identidad se resuelve de otra manera y lo que limita el acceso es lo poco que el sistema puede alcanzar.',
            ],
            link: {
              label: 'Por qué no nos gustan las arquitecturas agénticas',
              href: '/blog/no-me-gustan-los-agentes-de-ia',
            },
          },
          {
            heading: 'Datos de salud, en la categoría que más cuidado exige',
            part: 'Cómo se ve en la práctica',
            paragraphs: [
              'Wazzy, nuestro propio producto de citas, funciona en clínicas dentales, de fisioterapia y de estética. Una nota de cita que dice quién visita qué clínica y por qué es un dato de salud, que el RGPD mete en las categorías especiales de su artículo 9, sin jerarquía entre ellas y con los datos penales del artículo 10 todavía más restringidos.',
              'Quien trata esos datos al amparo del artículo 9.2.h, el que cubre la prestación de asistencia sanitaria, es la clínica, que es la responsable. Nosotros tratamos por cuenta suya, como encargados.',
              'No elegimos la categoría más difícil para presumir. El producto la necesitaba. El resultado es que nuestras prácticas quedaron moldeadas por el caso más estricto desde el principio.',
              'Cada campo sensible va cifrado por su cuenta, con AES-256-GCM, en vez de confiar en que el disco esté cifrado por debajo. La diferencia importa en la práctica.',
              'El cifrado de disco te protege si alguien se lleva el hardware, mientras que el cifrado por campo protege el dato de quien toca la base de datos sin pasar por la aplicación, que es el caso de una copia robada o de quien la administra.',
              'La aplicación tiene la clave, así que quien la opera sí ve el dato. Por eso los permisos y los registros importan tanto como el cifrado.',
              '<strong>Y el borrado está diseñado alrededor de lo que la ley exige, no alrededor de lo que parezca razonable</strong>. Wazzy retiene lo que la ley obliga a retener, ni más ni menos. Ese plazo no lo fijamos nosotros.',
              'Lo fija la clínica, que es la responsable del tratamiento, con la ley de autonomía del paciente delante, la 41/2002, que marca un mínimo de cinco años para la historia clínica y más en algunas comunidades. Una cita en un chat no es la historia clínica, que vive en el sistema de la clínica, pero la lógica es la misma.',
              'Una petición de supresión tiene que honrar al paciente sin incumplir en silencio una obligación legal de conservación, así que el sistema separa lo que se borra ahora de lo que se retiene por obligación y puede enseñar cuál es cuál.',
              'Todo eso lo construimos porque no había alternativa. Es la razón de que esta página pueda hablar desde la experiencia y no desde una lista de comprobación. Y es el nivel que hereda el resto de nuestro trabajo con clientes.',
            ],
          },
          {
            heading: 'A la persona del otro lado se le avisa y puede llegar a un humano',
            part: 'Cómo se ve en la práctica',
            paragraphs: [
              'Las conversaciones sobre cumplimiento tienden a fijarse en las bases de datos y a olvidar a la persona que está escribiendo. Ahí se cruzan dos deberes. El RGPD espera claridad sobre cómo se usan los datos personales. El reglamento europeo de IA, en su obligación de transparencia, que es de las que sí mantuvieron su fecha, exige que a la gente se le diga cuándo está hablando con una máquina.',
              'Ninguno de los dos es difícil de montar, pero los dos son fáciles de incumplir por omisión, un mensaje de bienvenida vago cada vez.',
              'Nuestros sistemas conversacionales se presentan como lo que son. El camino a una persona forma parte del diseño en vez de ser una disculpa. En Wazzy, un caso urgente no recibe un párrafo tranquilizador de un modelo. Se escala al personal de la clínica, porque <strong>una máquina que reconoce su límite y entrega es más segura que una que improvisa seguridad</strong>.',
              'La misma forma se repite en el trabajo con clientes. El asistente hace el volumen repetitivo. Los momentos que necesitan a un humano llegan a un humano, con el rastro de la conversación puesto.',
              'Hay un beneficio más callado. Cuando el traspaso está diseñado, los humanos detrás del asistente dejan de ser una ficción de la política de privacidad y pasan a ser una bandeja de casos real, con personas concretas que la atienden, que es exactamente la clase de afirmación que una autoridad puede verificar y encontrar cierta.',
            ],
          },
          {
            heading: 'Qué registramos y cómo se consulta',
            id: 'registros',
            part: 'Cómo se ve en la práctica',
            paragraphs: [
              '<strong>Se registra la decisión, no solo el resultado.</strong> Cada paso con significado queda escrito, qué entendió el asistente, qué pidió, qué rechazó el validador y por qué. El registro es de solo añadir, es decir que se pueden sumar entradas pero nunca editarlas ni borrarlas. El sistema no lo lee de vuelta durante la ejecución, así que no puede influir en una respuesta ni siquiera en principio.',
              'Existe para una cosa, para que alguien con una pregunta lo revise después. Ese alguien puede ser tu DPD, un auditor o la AEPD. Lo que reciben es el registro de lo que pasó, no una reconstrucción de memoria.',
              'Que nadie lo edite no significa que sea eterno. Contiene datos personales, así que tiene su plazo de conservación y una petición de supresión puede alcanzarlo, lo que se resuelve poniéndole fecha de caducidad y separando el dato de la persona, en vez de con la tecla de borrar.',
              'La telemetría, las mediciones técnicas que el sistema publica sobre su propio estado, funciona al revés. Corre sobre una lista blanca, así que los campos que lleva se deciden de antemano y quedan escritos, en vez de dejarse a lo que el código mande. Cuando una autoridad pregunte qué recoge tu vigilancia, la respuesta es una lista corta y cerrada, no una investigación.',
              'Hasta la caducidad está diseñada para verse. Las credenciales temporales que demuestran quién está preguntando caducan en torno a la hora. Repetir una petición vieja con una credencial caducada produce un error claro y visible en vez de tomar prestadas credenciales más frescas en silencio.',
              'Preferimos que un sistema falle de forma ruidosa y visible a que acierte de una manera que nadie puede explicar. Un error nuevo y visible es mejor postura que un silencio cómodo.',
            ],
          },
          {
            heading: 'Qué nos va a pedir tu DPD y qué entregamos',
            id: 'dpd',
            part: 'Qué te llevas y qué preguntar',
            kind: 'lattice',
            paragraphs: [
              'Comprar IA en Europa implica hoy una revisión predecible. El departamento legal y el DPD van a querer una evaluación de impacto relativa a la protección de datos, el estudio estructurado de qué puede salir mal para las personas cuyos datos se tratan. Van a querer un contrato de encargo con cada proveedor de la cadena. Esa revisión no la hacemos nosotros, es suya.',
              '¿Qué ponemos nosotros, entonces? <strong>Lo que hacemos es acortar esa revisión, porque los materiales que necesita son cosas que nuestros sistemas producen de todas formas.</strong>',
            ],
            bullets: [
              'Un mapa del flujo de datos: qué entra al sistema, dónde se guarda, qué llamadas salen de la cuenta y qué viaja dentro de ellas.',
              'La lista de proveedores por debajo del sistema, con los contratos que gobiernan cada uno: el proveedor de modelo que aprobaste, el canal de mensajería si el asistente vive en uno y nosotros mismos, que también somos encargados.',
              'Conservación y borrado, tal como están configurados: qué se guarda, cuánto tiempo, qué toca una petición de supresión y qué no puede tocar por ley.',
              'El diseño del aislamiento por escrito, desde las cuatro capas que lo imponen hasta qué puede y qué no puede ver el modelo.',
              'Los registros en sí: el registro de decisiones, la telemetría de lista blanca y cómo se consultan los dos cuando alguien pregunta.',
            ],
          },
          {
            heading: 'Cómo comprobamos que todo esto sigue siendo verdad',
            part: 'Qué te llevas y qué preguntar',
            paragraphs: [
              '<strong>Un cumplimiento que era cierto el día del estreno y no se volvió a medir es un cuento</strong>. Estos sistemas cambian por debajo. Los proveedores actualizan modelos sin cambiarles el nombre, tu documentación crece y tus datos se mueven con el tiempo. Por eso hacemos dos cosas distintas.',
              'Antes de publicar cualquier cambio, una batería de pruebas, un banco de casos anotados y anonimizados que el sistema debe responder bien, frena la publicación si la calidad baja. Y una vez por semana, sobre el sistema vivo, reproducimos una conversación de prueba anonimizada de principio a fin y comprobamos qué pasó de verdad.',
              'Es la misma disciplina que caza a un modelo empeorando en silencio, aplicada a las promesas de esta página. El aislamiento, los registros y las negativas se prueban como funcionalidades, porque eso es lo que son.',
              'Cuando tu DPD pregunte en marzo si las garantías de la revisión de septiembre siguen en pie, la respuesta que vale es un resultado de pruebas, no un encogimiento de hombros.',
            ],
            link: {
              label: 'Empezar es fácil, mantenerlo vivo es lo difícil',
              href: '/blog/mantener-viva-la-ia',
            },
          },
          {
            heading: 'Ocho preguntas para cualquier proveedor, nosotros incluidos',
            part: 'Qué te llevas y qué preguntar',
            kind: 'checklist',
            paragraphs: [
              'La introducción prometía que saldrías de aquí sabiendo qué preguntar. Estas son las preguntas que haríamos nosotros si estuviéramos en tu lado de la mesa, en el orden que más destapa.',
            ],
            bullets: [
              'En qué cuenta en la nube corre el sistema y qué le pasa el día que dejemos de trabajar juntos.',
              'Qué sale exactamente de esa cuenta en una llamada al modelo, enseñado para nuestro caso concreto y no en términos generales.',
              'Qué piezas de software imponen el aislamiento y si alguna de ellas consiste en una instrucción al modelo. Pide que te cuenten cómo llegaron a esa respuesta.',
              'Qué hace el sistema cuando una lista de permisos llega vacía, abrir la puerta o cerrarla.',
              'Enséñame el registro de decisiones de una conversación real y dime quién puede editarlo. Si alguien puede, ese registro no sirve como prueba.',
              'Qué puede recibir técnicamente vuestra telemetría, una lista cerrada o lo que el código mande.',
              'Qué frena una publicación y qué vigila el sistema vivo entre publicaciones. Tienen que ser dos mecanismos distintos. Si te dan uno solo con dos nombres, no lo son.',
              'Quién es el dueño del repositorio, hoy, no al final de un plan de pagos.',
            ],
          },
          {
            heading: 'Dónde aparece esto en lo que construimos',
            part: 'Qué te llevas y qué preguntar',
            kind: 'lattice',
            paragraphs: [
              'Esta página no es un producto aparte y no se puede comprar suelta. Es cómo están construidas las cuatro cosas que hacemos. Cada una se encuentra con la pregunta desde un ángulo distinto.',
            ],
            bullets: [
              'Asistentes sobre documentación interna, donde el trabajo es asegurar que una persona solo recupere los documentos que su puesto permite.',
              'Agentes que consultan datos de negocio en vivo, donde el aislamiento entre empresas tiene que aguantar al nivel de la consulta, no del prompt.',
              'Automatización de procesos documentales, donde el registro de qué se extrajo, se validó y se rechazó es el rastro de auditoría.',
              'Chatbots de cara al cliente, donde el interesado es una persona que no eligió hablar con una máquina y merece el trato más estricto de todos.',
            ],
          },
        ],
        faqHeading: 'Lo que preguntan los clientes antes de que entre el departamento legal',
        faq: [
          {
            q: '¿Está permitido siquiera usar un proveedor de modelo estadounidense bajo el RGPD?',
            a: [
                'Esa valoración es de tus abogados. Los proveedores serios les dan material real con el que trabajar: contratos de encargo, regiones de procesamiento europeas y compromisos de no entrenar. Lo que nosotros controlamos es el lado de ingeniería de la pregunta, qué datos llegan a viajar en una llamada al modelo. Esa superficie la mantenemos tan pequeña como el caso permita y documentada campo a campo.',
                'Muchos de nuestros despliegues mandan bastante menos de lo que la gente supone, porque el modelo suele recibir la pregunta y la poca información aprobada que hace falta para responderla, no tu base de datos.',
              ],
          },
          {
            q: '¿Nuestros datos entrenan el modelo de alguien?',
            a: 'No con los proveedores y las configuraciones que desplegamos. Las llamadas al modelo corren bajo contratos y ajustes que excluyen entrenar con tu contenido. La elección de proveedor la apruebas tú. Si un proveedor cambiara alguna vez esas condiciones, esa es una decisión que tomas tú con toda la información, no una que tomamos nosotros por ti.',
          },
          {
            q: '¿Puede correr entero en nuestros propios servidores?',
            a: 'Lo que construimos nosotros corre en tu infraestructura. El modelo es la parte que conviene decir con claridad. Llamamos a modelos como servicio a proveedores que tú apruebas. Correr un modelo abierto en tus máquinas es otro proyecto, con otros costes y otro equilibrio de calidad. Plantea el requisito antes de que se presupueste nada y te diremos con claridad lo que costaría.',
          },
          {
            q: '¿Necesitamos una evaluación de impacto para un asistente de IA?',
            a: [
                'Bastantes veces sí, aunque el criterio no es el que suele citarse. La AEPD publica una lista de criterios y la evaluación es exigible cuando el tratamiento reúne dos o más. Un asistente de IA con datos de salud reúne al menos dos, categoría especial y tecnología nueva, así que en ese caso la respuesta es que sí. La decisión es de tu DPD, no nuestra.',
                'Lo que cambiamos es lo que cuesta tomarla. La mitad técnica de una evaluación de impacto es una descripción de flujos de datos, riesgos y salvaguardas. Nuestros sistemas producen esa descripción a partir de lo que hay construido de verdad, no de entrevistas y suposiciones.',
              ],
          },
          {
            q: '¿Qué nos cambia en la práctica el reglamento europeo de IA?',
            a: [
                'Menos de lo que la gente cree a corto plazo y más de lo que cree a medio. Lo que ya te aplica hoy son dos cosas. La alfabetización en IA del artículo 4, obligatoria desde febrero de 2025 para toda empresa que use estos sistemas, que significa que quien los opera tenga formación proporcional a su papel. Y la transparencia del artículo 50 desde agosto de 2026.',
                'Lo que se aplazó a diciembre de 2027 es lo pesado, los registros, la supervisión humana formal y la trazabilidad de datos que exige el artículo 26 al desplegador de un sistema de alto riesgo. Si tu uso concreto es de alto riesgo es una clasificación jurídica y nos mantenemos fuera de ella.',
                'La consecuencia de ingeniería es más simple, los sistemas que registran sus decisiones desde el primer día salen baratos de defender y los que no, caros de adaptar. Los nuestros registran desde el primer día.',
              ],
          },
          {
            q: '¿Qué pasa cuando alguien le pide al asistente datos que no debería ver?',
            a: [
                'Nada dramático, que es justo el objetivo. En uno de nuestros agentes las columnas sobre horas y ausencias de personas concretas existen en la base de datos y sencillamente no se le exponen al asistente, así que la pregunta no se puede responder con lo que tiene.',
                'La negativa está construida en lo que el sistema puede alcanzar, no en una frase de sus instrucciones. El intento queda registrado como cualquier otra decisión.',
              ],
          },
          {
            q: '¿Con qué proveedores de modelo trabajáis?',
            a: 'Con más de uno. La elección la apruebas tú. Nuestros sistemas en producción corren sobre más de un proveedor, Google entre ellos con su modelo Gemini, porque distintos proyectos justificaron distintas decisiones. No somos revendedores de nadie, así que la recomendación sigue al caso de uso, al contrato que se ofrece y a por dónde pueden viajar los datos, en ese orden.',
          },
          {
            q: 'Nuestra gente ya pega cosas en chatbots. ¿Montar un asistente oficial lo empeora?',
            a: [
                'Por nuestra experiencia apunta al revés. Lo pegan porque necesitan la capacidad y no tienen un sitio autorizado donde conseguirla, así que el dato circula por cuentas personales que nadie gobierna.',
                'Un asistente oficial con contexto filtrado, proveedor aprobado y registros de verdad les da una herramienta mejor dentro de un perímetro que tu DPD sí puede describir. La política sola rara vez gana esa batalla. Una opción mejor suele ganarla.',
              ],
          },
          {
            q: '¿De quién es el código?',
            a: 'Tuyo, desde el primer día. Repositorios, documentación y arquitectura son tuyos, en una cuenta en la nube a tu nombre. No hay caja negra ni dependencia forzada. Si dejamos de trabajar juntos el sistema sigue funcionando, lo que cambia es quién lo opera, quién pasa la batería antes de cada cambio y quién atiende las alarmas.',
          },
        ],
        cta: {
          heading: '¿Tus datos tienen que quedarse donde están?',
          body: 'Cuéntanos tu reto y te respondemos en un día laborable. Si no le vemos retorno, te lo diremos.',
          button: 'Cuéntanos tu reto',
        },
      },
      aiAct: {
        tocHeading: 'Qué verás en esta página',
        metaTitle: 'Reglamento europeo de IA para empresas que la usan, Ideasforge',
        metaDescription:
          'Qué te pide el reglamento europeo de IA si la usas en tu empresa: los dos papeles, los ocho dominios de alto riesgo y el artículo 26 deber a deber.',
        hero: {
          eyebrow: 'Reglamento europeo de IA',
          title: 'El reglamento europeo de IA, explicado para la empresa que la usa',
          subtitle:
            'La mayoría de las empresas no fabrican inteligencia artificial, la usan. Para ellas el reglamento es una lista de cosas que hay que poder demostrar: una supervisión que funcione, unos registros que existan y una descripción clara de lo que hacen tus sistemas. El Ómnibus Digital de julio de 2026 aplazó los deberes más pesados a diciembre de 2027, mientras que la transparencia y la alfabetización ya se aplican hoy. Esta guía recorre el mapa entero en lenguaje llano.',
          cta: 'Empezar por la versión corta',
          ctaHref: '#corta',
        },
        stats: [
          { value: 'feb 2025', label: 'desde cuándo es obligatoria la alfabetización en IA, el deber que ya te aplica hoy' },
          { value: '2 dic 2027', label: 'cuando llegan los deberes de alto riesgo, tras el aplazamiento de julio de 2026' },
          { value: '6 meses', label: 'lo mínimo que hay que conservar los registros de un sistema de alto riesgo' },
        ],
        sections: [
          {
            heading: 'Para quién es esta página y quién la escribe',
            part: 'La respuesta corta',
            paragraphs: [
              'Esta página es para quien dentro de una empresa ha recibido la pregunta de si cumplís el reglamento europeo de IA y necesita dar una respuesta con estructura. Recorre la norma desde el punto de vista de quien la usa, que en el texto legal se llama responsable del despliegue.',
              '<strong>La mayoría de las empresas no fabrican inteligencia artificial, la usan.</strong> Esa distinción decide casi todos tus deberes, así que conviene fijarla antes que ninguna otra cosa.',
              'La escriben ingenieros. Construimos agentes de IA que funcionan dentro de empresas sujetas a estas normas, así que somos los que respondemos el cuestionario de cumplimiento, no los que lo mandan. Y la escribimos desde España, donde la autoridad que vigila es la AESIA.',
              'Esto no es asesoramiento jurídico. No clasificamos tu riesgo. Las decisiones que necesitan un abogado van señaladas como tales a lo largo de toda la página.',
            ],
            link: { label: 'La guía de la que parte esta: IA conforme al RGPD', href: '/ia-y-rgpd' },
          },
          {
            heading: 'El reglamento entero en seis frases',
            id: 'corta',
            part: 'La respuesta corta',
            kind: 'lattice',
            paragraphs: [
              'Todo lo que viene después desarrolla estas seis frases. Si solo te quedas con seis cosas, que sean estas.',
            ],
            bullets: [
              'El reglamento sigue al mercado, no a tu domicilio. Si tu sistema o su resultado se usa en la Unión, estás dentro, tengas la sede donde la tengas.',
              'Ordena los sistemas por riesgo en cuatro niveles: prohibido, alto, limitado y mínimo. Tus deberes dependen del nivel, no de lo avanzada que sea la tecnología.',
              'Los papeles deciden el resto. El proveedor construye y pone el sistema en el mercado, el responsable del despliegue lo usa. Casi todas las empresas que lean esto son lo segundo.',
              'Desplegar un sistema de alto riesgo activa el artículo 26, una lista concreta de deberes sobre supervisión, datos de entrada, vigilancia y registros.',
              'El calendario cambió en julio de 2026. Prohibiciones y alfabetización desde febrero de 2025, modelos de propósito general desde agosto de 2025, transparencia desde agosto de 2026 y el alto riesgo aplazado a diciembre de 2027.',
              'Las multas van por tramos, hasta 35 millones de euros o el 7 % de la facturación por prácticas prohibidas y hasta 15 millones o el 3 % por casi todo lo demás.',
            ],
          },
          {
            heading: 'Cuatro niveles de riesgo y dónde cae una empresa normal',
            part: 'El mapa de la ley',
            paragraphs: [
              'El reglamento no regula la inteligencia artificial como si fuera una sustancia. Regula usos, ordenados por el daño que un fallo podría hacerle a los derechos, la seguridad o el sustento de una persona.',
              'Una lista corta de prácticas está prohibida sin más, con la puntuación social y las técnicas manipuladoras dentro. Un conjunto definido de usos es de alto riesgo y carga con la maquinaria pesada de la norma. Una banda intermedia lleva deberes de transparencia, que consiste en avisar a la persona de que está interactuando con una máquina. Todo lo demás es riesgo mínimo y casi no lleva nada.',
              '¿Y dónde cae un asistente normal de empresa? Un asistente interno que responde sobre documentación, un chatbot que reserva citas o un agente que lee facturas caen, en la mayoría de configuraciones, en la banda limitada o en la mínima.',
              '<strong>El régimen duro lo dispara el dominio, no lo avanzada que sea la tecnología.</strong> En cuanto la IA toca contratación, crédito, educación, servicios esenciales, biometría o cualquiera de los demás dominios del anexo III, la misma tecnología de debajo pasa a ser de alto riesgo con todo lo que eso arrastra.',
              'En qué banda cae tu uso concreto es la primera pregunta para tus abogados. Las secciones siguientes te dan el vocabulario para esa conversación.',
            ],
          },
          {
            heading: 'El eje aparte, los modelos de propósito general',
            part: 'El mapa de la ley',
            paragraphs: [
              'Los modelos grandes que sistemas como los nuestros consumen como servicio viven bajo su propio capítulo, en vigor desde agosto de 2025 para las empresas que los proveen. Quien provee un modelo de propósito general debe documentación técnica, información a las empresas que construyen encima, una política de derechos de autor y un resumen del contenido usado para entrenar.',
              '<strong>Casi nada de eso es deber tuyo y todo es asunto tuyo al comprar.</strong> La documentación que publica un proveedor de modelo baja hasta tu expediente de cumplimiento, porque la descripción de tu sistema se apoya en la descripción del modelo de debajo.',
              'Cuando montamos ese expediente para un cliente, las condiciones y la documentación del proveedor de modelo entran dentro. Es una razón más de que la elección de proveedor la apruebes tú en vez de heredarla de nosotros.',
              'Lo que hay que pedir es corto. Quien te venda algo construido sobre un modelo grande debería poder nombrar el modelo, señalar la documentación que su proveedor publica para este reglamento y enseñar qué datos tuyos llegan hasta él. Si alguna de las tres se queda en blanco, ese hueco lo cargas tú.',
            ],
          },
          {
            heading: 'El calendario ya va por la mitad',
            part: 'El mapa de la ley',
            kind: 'checklist',
            paragraphs: [
              'El reglamento entró en vigor en agosto de 2024 y se ha ido encendiendo por fases. <strong>Todas las fechas de abajo están en el pasado o ya tienen día fijado</strong>, que conviene dejar reposar, porque un número sorprendente de empresas sigue archivando el asunto entero en la carpeta de «más adelante».',
            ],
            bullets: [
              'Desde el 2 de febrero de 2025. Las prácticas prohibidas pasaron a ser ilegales y el artículo 4 empezó a exigir alfabetización en materia de IA, es decir que quien trabaja con estos sistemas tenga formación proporcional a su puesto. Esto aplica a todo sistema de IA, sea de alto riesgo o no.',
              'Desde el 2 de agosto de 2025. Se aplican las obligaciones de quien provee modelos de propósito general, incluido el régimen de los modelos con riesgo sistémico. Si despliegas sistemas construidos sobre modelos grandes, tus proveedores llevan un año con deberes.',
              'Desde el 2 de agosto de 2026. Se aplican los deberes de transparencia del artículo 50, como avisar a una persona de que está hablando con una máquina. El artículo 26, el que gobierna a quien despliega sistemas de alto riesgo, iba a entrar aquí hasta que el Ómnibus Digital lo movió.',
              'A partir del 2 de diciembre de 2027. Llegan las obligaciones de alto riesgo de los sistemas del anexo III, con el artículo 26 dentro, después de que el Ómnibus Digital, el Reglamento (UE) 2026/1744, las moviera desde agosto de 2026. La IA integrada en productos que ya cubre la legislación europea de seguridad, con los productos sanitarios y las máquinas dentro, va detrás, el 2 de agosto de 2028.',
            ],
          },
          {
            heading: 'Las multas y quién inspecciona de verdad',
            part: 'El mapa de la ley',
            paragraphs: [
              'La estructura de sanciones va por tramos, como la del RGPD. Las prácticas prohibidas llegan a 35 millones de euros o al 7 % de la facturación mundial, lo que sea más alto. Casi todo lo demás, con los deberes de quien despliega dentro, llega a 15 millones o al 3 %. Dar información engañosa a las autoridades tiene su propio tramo, más bajo.',
              '¿Y qué probabilidad real hay de que te inspeccionen? Nadie que te venda certeza sobre eso merece que le creas. Lo que sí se puede decir con pruebas es quién está mirando.',
              'Cada país nombra a su autoridad de vigilancia del mercado y la nuestra llegó antes que ninguna. <strong>La AESIA fue la primera agencia nacional de Europa dedicada solo a la IA</strong>, creada por el Real Decreto 729/2023, con potestad sancionadora plena desde agosto de 2025 y dieciséis guías publicadas.',
              'Su línea declarada durante 2026 ha sido avisar antes que sancionar. Ya ha abierto investigaciones preliminares sobre sistemas desplegados por organizaciones españolas. <strong>La ventana en la que nadie miraba se está cerrando</strong>. Sin dramatismo, pero con fecha.',
              'La consecuencia práctica para quien compra es de calendario. Construir un sistema que pueda demostrar lo que hace mientras se está construyendo cuesta poco. Lo sabemos porque es como trabajamos de todas formas. Añadírselo con la fecha de una autoridad encima es la versión cara del mismo proyecto.',
            ],
          },
          {
            heading: '¿Es siquiera un sistema de IA a ojos del reglamento?',
            part: 'En qué casilla estás',
            paragraphs: [
              'Los comités pierden tiempo de verdad en esta pregunta, así que conviene cerrarla pronto. La Comisión desglosa la definición de sistema de IA en siete elementos y <strong>el que carga con el peso es la inferencia</strong>: un sistema basado en una máquina, con cierta autonomía, que deduce de lo que recibe cómo generar resultados como predicciones, recomendaciones o decisiones.',
              'La Comisión Europea publicó unas directrices sobre esta definición exacta en febrero de 2025, precisamente porque todas las empresas hacían la misma pregunta.',
              'La lectura práctica es más estrecha que el pánico. Una calculadora, una fórmula fija de hoja de cálculo o un motor de reglas que aplica siempre la misma lógica escrita no infiere y por lo general queda fuera. Un sistema que aprende patrones, ordena candidatos, puntúa riesgo o genera texto sí infiere y está dentro.',
              'Los casos de frontera existen, pertenecen a tus abogados y el razonamiento conviene dejarlo por escrito caiga del lado que caiga. Para cualquier cosa construida sobre un modelo de lenguaje la pregunta se responde sola, porque un modelo infiere, es su trabajo entero.',
            ],
          },
          {
            heading: 'Proveedor o responsable del despliegue, la pregunta que decide tus deberes',
            part: 'En qué casilla estás',
            paragraphs: [
              'Dos papeles cargan con casi todo el peso. Un proveedor desarrolla un sistema de IA o encarga que se desarrolle, para ponerlo en el mercado bajo su propio nombre. Un responsable del despliegue usa un sistema de IA de forma profesional, bajo su propia autoridad y para sus propios fines.',
              '<strong>El proveedor responde del diseño y quien despliega responde del uso.</strong> Los deberes de diseño son la conformidad, la documentación y el registro donde toque. Los deberes de uso son el asunto de esta guía.',
              'Un banco que compra un sistema de puntuación crediticia a un fabricante es responsable del despliegue, con deberes de supervisión, vigilancia y registros. El fabricante es el proveedor, con deberes sobre cómo se construyó y documentó el sistema.',
              'El reparto se repite mercado abajo: la clínica que usa un asistente de citas, el hospital que usa una ayuda al diagnóstico y la asesoría que extrae datos de documentos son responsables del despliegue de esos sistemas, los haya construido quien los haya construido.',
              'Cuando construimos un agente a medida para un cliente, quién cuenta como proveedor de ese sistema concreto es justo la clase de frontera que un contrato debe fijar por escrito en vez de dejarla a la suposición.',
              'Lo sacamos en la primera conversación, tus abogados y los nuestros cierran la redacción. El lado de ingeniería de la respuesta, quién documenta qué y quién guarda qué registros, se diseña desde dentro en lugar de discutirse después.',
            ],
          },
          {
            heading: 'Cómo alguien pasa a ser proveedor sin darse cuenta',
            part: 'En qué casilla estás',
            paragraphs: [
              'Los papeles no son etiquetas permanentes. El reglamento sienta a quien despliega en la silla del proveedor cuando le pone su nombre o su marca a un sistema de alto riesgo, cuando lo modifica de forma sustancial o cuando cambia la finalidad prevista del sistema hacia terreno de alto riesgo.',
              '<strong>La tercera es la trampa silenciosa</strong>, porque «finalidad prevista» suena a lenguaje de marketing y es en realidad el concepto sobre el que descansa el reglamento entero.',
              'Concretando. Una empresa que licencia un asistente documental general y lo convierte en una herramienta que criba candidaturas de empleo ha cambiado la finalidad hacia un dominio del anexo III y con ella, quizá, su propio papel. Una empresa que rebautiza el sistema de un fabricante como producto propio se ha metido en deberes de proveedor por la vía de la marca.',
              'Nada de esto prohíbe personalizar, le pone precio. Y ese precio es documentación y deberes que alguien tiene que aceptar a conciencia. Si una modificación concreta es «sustancial» es un juicio jurídico.',
              'Nuestra aportación es más estrecha y llega antes. Un sistema construido con una finalidad prevista escrita, un registro de qué cambió y unos registros de lo que el sistema hace de verdad le dan a tus abogados la materia prima para emitir ese juicio en una tarde en vez de en una auditoría. Un sistema montado de manera informal no les da nada. Un abogado prudente sin nada con lo que trabajar siempre te dará la respuesta cara.',
            ],
          },
          {
            heading: 'El anexo III en llano, los ocho dominios',
            part: 'En qué casilla estás',
            kind: 'lattice',
            paragraphs: [
              'Alto riesgo por dominio significa que el reglamento enumera dónde están las cosas lo bastante en juego como para el régimen pesado. El anexo III nombra ocho áreas. <strong>Si tu uso de la IA toca una de ellas, da por hecho alto riesgo hasta que tus abogados concluyan otra cosa.</strong>',
            ],
            bullets: [
              'Biometría: identificación, categorización de personas y reconocimiento de emociones, con las excepciones estrechas que el propio reglamento recorta.',
              'Infraestructuras críticas: componentes de seguridad en tráfico, agua, gas, calefacción y electricidad.',
              'Educación y formación: admisión, evaluación, asignación de nivel y vigilancia de exámenes.',
              'Empleo y gestión de trabajadores: selección, criba, ascensos, despidos, reparto de tareas y seguimiento del rendimiento.',
              'Servicios esenciales: solvencia y puntuación crediticia, riesgo y precio de los seguros de vida y salud, prestaciones públicas y despacho de emergencias.',
              'Aplicación de la ley, que cubre los usos que policía y fiscalía pueden hacer de la IA sobre personas.',
              'Migración, asilo y control de fronteras, desde las evaluaciones de riesgo hasta la tramitación de solicitudes.',
              'Justicia y democracia, asistir a los tribunales a interpretar hechos y derecho o influir en elecciones.',
            ],
          },
          {
            heading: 'La puerta de salida y la trampa que lleva dentro',
            part: 'En qué casilla estás',
            paragraphs: [
              'El artículo 6.3 abre una salida estrecha. Un sistema que cae en un dominio del anexo III puede evitar la condición de alto riesgo cuando solo hace una tarea procedimental estrecha, cuando mejora el resultado de una actividad humana ya terminada o cuando detecta patrones sin sustituir el juicio humano.',
              'Una herramienta que da formato a las notas de una entrevista toca empleo y a las claras no está decidiendo la carrera de nadie.',
              'Tres cosas estrechan esa salida. La excepción tiene que estar documentada, con una evaluación escrita de por qué el sistema encaja, hecha antes de apoyarse en ella y no después de que alguien pregunte. Hay que registrarse además en la base de datos de la UE, que es el paso que más se olvida.',
              '<strong>Y el perfilado cierra la puerta de golpe.</strong> Un sistema en un dominio del anexo III que perfile a personas, en el sentido que le da el RGPD de evaluar aspectos de su vida como el rendimiento, la fiabilidad o la situación económica, es siempre de alto riesgo, haga lo que haga además.',
              'Nuestro consejo como constructores no tiene ningún brillo. Decide de qué lado de esa línea va a vivir un sistema antes de construirlo, escribe esa intención y diseña los flujos de datos para que el sistema no pueda cruzarla en silencio. La deriva es el riesgo de verdad aquí, una herramienta útil que gana una función por trimestre hasta que está haciendo aquello que nadie clasificó.',
            ],
          },
          {
            heading: 'El artículo 26, deber a deber',
            id: 'articulo26',
            part: 'Qué debe hacer quien despliega',
            kind: 'checklist',
            paragraphs: [
              'Si un sistema que despliegas es de alto riesgo, el artículo 26 es tu lista. En llano, deber a deber, esto es lo que pide.',
            ],
            bullets: [
              'Usar el sistema como digan las instrucciones del proveedor. Las instrucciones de uso dejan de ser un folleto que nadie lee y pasan a ser la referencia contra la que una autoridad te mide.',
              'Encargar la supervisión humana a personas con nombre que tengan la competencia, la formación y la autoridad para actuar, incluida la autoridad de no usar el resultado del sistema. Un nombre en un documento sin poder de intervenir no cumple esto.',
              'Mantener tus datos de entrada pertinentes y suficientemente representativos, en la medida en que los controles tú. Alimentar un sistema de puntuación con datos para los que nunca se diseñó es un fallo de quien despliega, no del proveedor.',
              'Vigilar el funcionamiento del sistema frente a esas instrucciones. Y avisar al proveedor o a las autoridades donde proceda, cuando veas un riesgo o un incidente grave.',
              'Conservar los registros generados automáticamente que estén bajo tu control durante al menos seis meses, más si otra ley lo dice. Sin registros no hay defensa.',
              'Informar a los trabajadores y a sus representantes antes de desplegar un sistema de alto riesgo que les afecte en el trabajo. Encender una vigilancia en silencio es un incumplimiento por sí solo.',
              'Usar la información del proveedor para hacer tu evaluación de impacto de protección de datos cuando toque. Los dos reglamentos se encuentran exactamente aquí.',
              'Informar a la persona afectada cuando el sistema del anexo III se use para tomar una decisión sobre ella o para ayudar a tomarla. Es el deber que más pregunta un departamento de personal.',
              'Cooperar con la autoridad de vigilancia del mercado cuando venga a preguntar, que resume todos los deberes de arriba en una sola pregunta práctica, si puedes enseñar los deberes hechos.',
            ],
          },
          {
            heading: 'El paso extra que deben algunos, la evaluación de derechos',
            part: 'Qué debe hacer quien despliega',
            paragraphs: [
              'El artículo 27 añade un deber más que no es para todos. <strong>Solo obliga a un grupo definido.</strong> Son los organismos públicos, las empresas privadas que prestan servicios públicos y quienes usan sistemas de alto riesgo para puntuación crediticia o para riesgo y precio en seguros de vida y salud.',
              'Esos tienen que hacer una evaluación de impacto sobre los derechos fundamentales antes del primer uso. Es lo que suena, una mirada estructurada a qué derechos podría tocar el sistema, quién queda expuesto y qué pasa cuando sale mal.',
              'El reglamento permite apoyarse en trabajo ya hecho. Quien despliega puede basarse en una evaluación que hiciera el proveedor o en una evaluación de impacto existente que cubra el terreno, lo que en la práctica significa que el ejercicio se solapa mucho con la evaluación de impacto que tu delegado de protección de datos ya sabe hacer. La misma disciplina, con la lente más ancha.',
              'Nuestro papel ahí sigue siendo el mismo que en el resto de la página. La evaluación es tuya, la haces y la firmas tú. La descripción del sistema que necesita, qué hace, qué entra en él, quién lo supervisa y qué queda registrado, es el expediente que nuestros sistemas producen como efecto secundario de estar construidos así.',
            ],
          },
          {
            heading: 'La alfabetización en IA ya es obligatoria, para todos',
            part: 'Qué debe hacer quien despliega',
            paragraphs: [
              'El artículo 4 es la obligación que las empresas siguen pasando por alto porque parece blanda. Desde febrero de 2025, proveedores y responsables del despliegue tienen que garantizar un nivel suficiente de alfabetización en materia de IA en las personas que operan y usan estos sistemas por su cuenta, proporcional a su puesto y al contexto.',
              'Aplica a todo sistema de IA, sea de alto riesgo o no, lo que la convierte en <strong>el deber del reglamento que te aplica hoy con independencia de lo que hagas</strong>.',
              '¿Y cuánta formación es suficiente? «Suficiente» no está definido como un certificado. La idea no es mandar a todo el mundo a un curso. Quien aprueba los resultados de un modelo debería entender qué se le puede confiar y qué no. Quien opera un asistente debería saber qué no hay que darle nunca. Quien supervisa un sistema de alto riesgo necesita profundidad bastante para justificar que lo anula.',
              'Formación que corresponda a los puestos, escrita y con fechas, es a la vez lo que la ley espera y la reducción de riesgo más barata de toda esta página.',
              'Es además, de forma callada, una pregunta de compras. Pregúntale a cualquier proveedor qué material le entrega a tu equipo para esto, porque un suministrador que se encoge de hombros te está trasladando entero el riesgo de que tu gente lo use mal.',
            ],
          },
          {
            heading: 'Decirle a la gente que está hablando con una máquina',
            part: 'Qué debe hacer quien despliega',
            paragraphs: [
              'Los deberes de transparencia del artículo 50 se aplican desde agosto de 2026 y son de una concreción que se agradece. A la persona que interactúa con un sistema de IA hay que informarle de que lo está haciendo, salvo que resulte obvio por el contexto.',
              'El audio, la imagen y el vídeo sintéticos tienen que ir marcados como generados artificialmente y ese marcado lo debe quien construye el sistema. A quien despliega le toca avisar cuando publique una ultrasuplantación o un texto generado sobre asuntos de interés público. Quien despliega reconocimiento de emociones o categorización biométrica debe informar a las personas expuestas.',
              'Para los sistemas que la mayoría de las empresas tienen de verdad en marcha, esto se reduce a diseñar la interfaz sin trampas. El asistente se presenta como asistente, el informe generado dice que se ha generado y el camino hacia una persona existe de verdad.',
              'Contamos cómo se presentan nuestros sistemas conversacionales y cómo entregan los casos urgentes al equipo en la página del servicio. Ese mismo diseño sirve para este artículo sin modificarlo.',
              'A estas alturas el patrón está claro. <strong>Estos deberes son baratos de cumplir cuando se diseñan dentro y vergonzosos de cumplir a posteriori.</strong>',
            ],
            link: { label: 'Cómo se presentan y escalan nuestros sistemas conversacionales', href: '/servicios/agentes-conversacionales' },
          },
          {
            heading: 'Casi todo el artículo 26 es una propiedad de ingeniería',
            part: 'Cómo aterriza en un sistema real',
            paragraphs: [
              'Lee otra vez la lista de deberes con ojos de ingeniero y se descompone en tres propiedades del sistema. Cosas que el sistema tiene que producir sobre sí mismo, que son registros. Cosas que una persona tiene que poder hacerle, que son inspeccionar, intervenir y anular. Y cosas que nunca puede cambiar en silencio, que son su finalidad y sus entradas.',
              '<strong>Ninguna de las tres se puede añadir de forma convincente después. Las tres salen baratas cuando son decisiones de diseño.</strong>',
              'Aquí es donde nuestra manera de trabajar coincide con el reglamento. Y no porque construyéramos pensando en él, sino porque operar sistemas en producción nos llevó antes a las mismas conclusiones. Nuestros sistemas escriben cada decisión según ocurre, en un registro al que se puede añadir pero que nunca se edita. El propio sistema nunca vuelve a leerlo, así que documenta el comportamiento sin influir en él.',
              'La supervisión no es un nombre en un archivo. Las personas que hay detrás de nuestros asistentes reciben bandejas de casos reales con su rastro. Cada acción que un sistema hace por alguien corre con los permisos de esa persona, así que la pregunta de quién pudo hacer esto siempre tiene una respuesta que tu sistema de identidad ya conoce.',
              'La vigilancia es el deber que suena más vago y el que mejor podemos demostrar. Antes de publicar un cambio tiene que pasar una batería de casos anotados y anonimizados. Después de publicar, una prueba semanal recorre de principio a fin una conversación de prueba anonimizada contra el sistema vivo.',
              'Dos comprobaciones separadas a propósito. Juntas son exactamente la prueba de «vigilar el funcionamiento del sistema» que el artículo 26 le pide a quien despliega.',
            ],
            link: { label: 'El diseño de registros, aislamiento e identidad, en detalle', href: '/ia-y-rgpd' },
          },
          {
            heading: 'Qué te entregamos para el expediente',
            part: 'Cómo aterriza en un sistema real',
            kind: 'lattice',
            paragraphs: [
              'Cuando un sistema que hemos construido entra en tu revisión de cumplimiento, estos materiales <strong>existen porque construirlo los produjo</strong>, no porque alguien los reconstruyera para la reunión.',
            ],
            bullets: [
              'La finalidad prevista del sistema por escrito, que es la frase con la que empieza cualquier pregunta de clasificación.',
              'La descripción técnica de qué hace, qué datos entran y qué llamadas salen, caso de uso por caso de uso.',
              'El diseño de la supervisión: qué personas pueden inspeccionar, intervenir y parar qué, con qué interfaz.',
              'El registro de decisiones y cómo se consulta, con la conservación ajustada a tus obligaciones y seis meses como suelo para el alto riesgo.',
              'Las pruebas de evaluación, que son la batería de casos que frena cada publicación y la prueba semanal que vigila el sistema vivo.',
              'La cadena de proveedores por debajo del sistema, empezando por el proveedor de modelo que aprobaste y las condiciones que lo obligan.',
            ],
          },
          {
            heading: 'Una primera pasada que puedes hacer esta semana',
            part: 'Qué hacer ahora',
            kind: 'checklist',
            paragraphs: [
              '<strong>Nada de esto exige un consultor para empezar.</strong> Una persona competente de dentro, con una hoja de cálculo, lleva a una empresa de «ni idea» a «mapeado, con preguntas abiertas para los abogados» en días. Y las preguntas abiertas salen afiladas en vez de vagas.',
            ],
            bullets: [
              'Haz inventario de todos los sistemas de IA en uso profesional, incluidos los que llegaron dentro de otros productos, los copilotos, el módulo de puntuación de la herramienta de personal, el chatbot del servicio de soporte. Las herramientas que nadie aprobó cuentan, porque al reglamento le da igual que el departamento de compras no las viera pasar.',
              'Asigna un papel por sistema, proveedor o responsable del despliegue, anotando quién más está en la cadena. Casi todas las entradas dirán responsable del despliegue. Las excepciones son donde tus abogados deberían mirar primero.',
              'Cruza cada sistema contra los ocho dominios del anexo III. Lo que toque uno queda marcado. Y lo marcado o va a los abogados o recibe una evaluación documentada del artículo 6.3, escrita ahora y no cuando alguien pregunte.',
              'Pon nombre a la supervisión de todo lo que pueda ser de alto riesgo, personas reales con autoridad para anular. Y mira si pasarían el nivel de alfabetización de su puesto.',
              'Revisa la documentación: instrucciones de uso de cada proveedor, información a los trabajadores donde los sistemas toquen el puesto de trabajo. Y los registros encendidos, conservados y legibles por alguien.',
              'Pon por escrito las preguntas a los proveedores, cuál es la finalidad prevista, qué documentación acompaña al sistema y qué os van a dar para supervisión, alfabetización y registros. Un proveedor que responde despacio también te ha dicho algo.',
            ],
          },
          {
            heading: 'Dónde encaja esto en el cuadro completo',
            part: 'Qué hacer ahora',
            paragraphs: [
              'El reglamento de IA y el RGPD hacen preguntas distintas sobre el mismo sistema. Uno regula el uso por su riesgo y el otro los datos personales de dentro.',
              '<strong>Un sistema que responde bien a los dos suele ser un solo sistema, construido una vez, con registros, supervisión y contención diseñados dentro en lugar de prometidos.</strong> Esa arquitectura es la que nuestra página de RGPD describe mecanismo a mecanismo. Es el nivel que hereda todo lo que construimos, pase o no pase cerca del anexo III.',
              'Si estás decidiendo si construir algo bajo estas reglas, la misma claridad vale para los presupuestos. Los nuestros están publicados.',
            ],
            link: { label: 'Cuánto cuesta construir y operar un agente de IA', href: '/cuanto-cuesta-un-agente-de-ia' },
          },
        ],
        faqHeading: 'Lo que preguntan los comités de verdad',
        faq: [
          {
            q: 'No estamos en la Unión Europea. ¿Nos alcanza el reglamento?',
            a: 'Puede. El reglamento aplica por mercado y cubre a proveedores y responsables del despliegue de fuera de la Unión siempre que el sistema se ponga en el mercado europeo o su resultado se use en la Unión. Una empresa estadounidense cuya IA sirve a clientes europeos está dentro, tenga la sede donde la tenga. Si tu montaje concreto cruza esa línea es una pregunta para tus abogados, de las que se contestan rápido.',
          },
          {
            q: 'Solo usamos ChatGPT y la IA que viene dentro de Microsoft 365. ¿Somos proveedores?',
            a: [
              'En el caso normal sois responsables del despliegue de esos sistemas. Los deberes de proveedor se quedan en las empresas que los construyen. El papel puede cambiar si rebautizáis un sistema como producto propio o lo modificáis de forma sustancial. Dónde está esa línea es una decisión jurídica.',
              'Lo que sí conserváis en cualquier caso son las costumbres del lado de quien despliega: formación para vuestra gente, claridad con las personas expuestas al resultado y saber cuáles de vuestros usos podrían tocar dominios del anexo III.',
            ],
          },
          {
            q: '¿Un chatbot de atención al cliente es de alto riesgo?',
            a: 'Por sí solo, normalmente no. Su deber de casa es la transparencia, que la gente sepa que habla con una máquina. Se mueve hacia el alto riesgo cuando el uso cruza a un dominio del anexo III o cuando perfila a personas en el sentido del RGPD. Un bot de soporte que empieza a decidir devoluciones puntuando la fiabilidad de un cliente ha cambiado de categoría en el fondo, diga lo que diga la etiqueta. La clasificación la deciden tus abogados. La deriva es lo que hay que vigilar.',
          },
          {
            q: 'Recursos Humanos quiere IA para cribar currículums. ¿Qué activa eso?',
            a: [
              'El empleo es uno de los ocho dominios del anexo III y la criba de candidaturas está nombrada dentro, así que la hipótesis de trabajo es alto riesgo con todo lo que arrastra, deberes del artículo 26, información a los trabajadores y supervisión incluidos. Y la excepción que el reglamento reserva para usos menores no aplica aquí, porque cribar currículums perfila a personas.',
              'Es la manera más común en que una empresa mediana adquiere su primer sistema de alto riesgo sin enterarse, normalmente dentro de una actualización de su herramienta de personal, así que merece un responsable con nombre y una conversación con los abogados antes de encender la función.',
            ],
          },
          {
            q: 'Cumplimos el RGPD. ¿Ya está?',
            a: 'No. Y al revés tampoco. El RGPD gobierna los datos personales que hay dentro del sistema y el reglamento de IA gobierna el sistema por su uso y su riesgo. Cada uno tiene deberes que el otro no menciona nunca. La buena noticia es de arquitectura, porque un sistema bien construido alimenta los dos expedientes: registros, supervisión y disciplina con los datos es lo que premian los dos reglamentos.',
          },
          {
            q: '¿Qué registros hay que guardar exactamente y cuánto tiempo?',
            a: [
              'Quien despliega sistemas de alto riesgo debe conservar los registros generados automáticamente que estén bajo su control durante al menos seis meses, más si otra ley lo exige.',
              'Nuestra posición va más allá por un motivo práctico. Diseñamos los sistemas para que registren sus decisiones desde el primer día, tengan la clasificación que tengan, porque el registro cuesta poco mientras el sistema se construye y no se puede inventar después. Y porque la clasificación de riesgo de una empresa puede cambiar mientras su arquitectura se queda igual.',
            ],
          },
          {
            q: '¿Necesitamos una evaluación de impacto sobre los derechos fundamentales?',
            a: 'Solo la debe un grupo definido: los organismos públicos, las empresas privadas que prestan servicios públicos y quienes usan IA de alto riesgo para puntuación crediticia o para el precio de los seguros de vida y salud. Si estás en ese grupo, la buena noticia es que se puede reutilizar trabajo, porque el reglamento permite apoyarse en evaluaciones ya hechas, incluida la del proveedor. Y el ejercicio se solapa con la evaluación de impacto que tu organización probablemente ya sabe hacer. Si estás en el grupo o no es, una vez más, pregunta para tus abogados.',
          },
          {
            q: '¿Hay algún alivio para las empresas pequeñas?',
            a: 'Alguno, real pero estrecho. El reglamento obliga a los Estados miembros a montar entornos controlados de pruebas, donde las empresas ensayan sistemas con el regulador mirando. El español arrancó pronto, con la AESIA seleccionando doce empresas en 2025. También existe documentación simplificada para proveedores pequeños en algunos puntos. Lo que no existe es una exención de fondo para pymes, porque una empresa pequeña que despliega un sistema de alto riesgo carga con los mismos deberes básicos que una grande, escalados por proporcionalidad y no perdonados.',
          },
          {
            q: 'Si una autoridad pregunta por un sistema que nos habéis construido, ¿qué le enseñamos?',
            a: 'El expediente de esta página: la finalidad prevista escrita, la descripción técnica, el diseño de la supervisión, el registro de decisiones con su conservación, las pruebas de evaluación y la cadena de proveedores. Lo que no prometemos nunca es el resultado de la inspección, porque eso depende de tu uso, de tu clasificación y de decisiones que pertenecen a tus abogados. Lo que sí prometemos es que las preguntas van a tener respuestas que existen por escrito, que es más de lo que puede decir la mayoría de los sistemas.',
          },
        ],
        cta: {
          heading: '¿Vas a desplegar IA bajo estas reglas?',
          body: 'Cuéntanos tu reto y te respondemos en un día laborable. Si no le vemos retorno, te lo diremos.',
          button: 'Cuéntanos tu reto',
        },
      },
      caseSavian: {
        tocHeading: 'Qué verás en esta página',
        metaTitle: 'Savian: un agente que lleva los datos al campo, Ideasforge',
        metaDescription:
          'Los datos ya estaban en un panel y quien los necesitaba estaba en el campo. Cómo construimos para Savian un agente que responde por mensaje y por voz.',
        hero: {
          eyebrow: 'Caso en producción',
          title: 'Savian: el dato estaba en un panel y quien lo necesitaba, en una furgoneta',
          subtitle:
            'Savian es una empresa agrícola cuyos responsables necesitan datos de producción y de asistencia para decidir. Los datos estaban y había un panel para consultarlos, pero quien los necesita está en el campo o en una furgoneta, sin un ordenador delante. Hoy pregunta como le preguntaría a un compañero, por mensaje o por nota de voz. La respuesta llega en segundos. Esta página cuenta cómo está construido y las dos cosas que tuvimos que sacarle al modelo por el camino.',
          cta: 'Empezar por el problema',
          ctaHref: '#problema',
        },
        sections: [
          {
            heading: 'El dato estaba y aun así no llegaba',
            id: 'problema',
            part: 'El problema',
            paragraphs: [
              'Savian trabaja en el sector agrícola. Los dueños y los responsables de sus fincas de cultivo necesitan a diario datos de producción y de asistencia para tomar decisiones que no pueden esperar.',
              'Conviene decir de entrada lo que no era el problema. Esos datos no estaban perdidos ni escondidos. Savian ya tenía un panel donde se consulta la misma información que hoy contesta el agente, montado y funcionando desde antes que él.',
              'El problema era de última milla, que es el que casi nunca se cuenta. <strong>Un panel es una herramienta de escritorio. Está pensada para alguien sentado</strong>, con la pantalla entera delante y tiempo para elegir filtros y leer una tabla.',
              '¿Y dónde está quien necesita el dato? No en esa silla. Está en una furgoneta a primera hora o en mitad de una finca, con el móvil en el bolsillo y las manos ocupadas. Y manejar un panel con soltura se aprende, que es un trabajo en sí mismo y no es el trabajo de quien está en el campo.',
              'Así que la consulta esperaba. Se miraba al llegar a la oficina, cuando ya había un ordenador delante y la jornada en el campo había terminado. Un dato que llega al final del día deja de servir para decidir. Sirve para explicar después lo que ya pasó.',
            ],
          },
          {
            heading: 'La primera versión dejaba escribir la consulta al modelo',
            part: 'Lo que retiramos',
            paragraphs: [
              'La primera versión hacía lo que parece obvio cuando se tiene un modelo de lenguaje delante. Recibía la pregunta en castellano, escribía con ella una consulta SQL y la ejecutaba. SQL es el lenguaje con el que se le piden datos a una base de datos.',
              'Funcionaba. <strong>En una demostración funcionaba muy bien, que es precisamente el problema de dejarle escribir la consulta.</strong>',
              '¿Por qué retirar algo que funciona? Por dos motivos distintos que conviene separar, porque uno se ve enseguida y el otro no.',
            ],
          },
          {
            heading: 'Por qué la retiramos',
            part: 'Lo que retiramos',
            paragraphs: [
              'El primero es de seguridad. Un modelo al que se le deja escribir la consulta puede escribir cualquiera que el lenguaje permita. Lo único que se lo impide es una frase en sus instrucciones. Una instrucción a un modelo de lenguaje es una petición y no una garantía. Se atiende casi siempre. Ese «casi» es toda la diferencia cuando al otro lado hay datos de varias empresas.',
              'El segundo es más aburrido y lo vimos antes que el primero. Cometía fallos. Consultas que se ejecutaban sin error y devolvían una cifra que no era la que se había preguntado, que es la peor clase de fallo porque nadie lo ve.',
              'De ahí sale la regla que ordena todo lo que construimos desde entonces. <strong>El juicio vive en el código, la interpretación del lenguaje vive en el modelo y el conocimiento vive en los datos.</strong> El modelo hace lo que sabe hacer, que es entender lo que le piden. El código hace lo que exige garantías, que es tocar los datos.',
            ],
            link: { label: 'Por qué no nos gustan las arquitecturas agénticas', href: '/blog/no-me-gustan-los-agentes-de-ia' },
          },
          {
            heading: 'La comparación de nombres también vivía dentro del modelo',
            part: 'Lo que retiramos',
            paragraphs: [
              'No fue lo único que hubo que sacar de ahí. Los centros de trabajo y las fincas tienen nombres largos que nadie teclea igual dos veces, así que el agente corrige lo que la persona escribe y lo empareja con el nombre real. Esa corrección existe para que nadie tenga que acordarse de una denominación exacta.',
              'Al principio ese emparejamiento también lo hacía el modelo. Le dábamos la lista de centros de trabajo y fincas a los que esa persona tiene acceso y le pedíamos que dijera cuál de ellos era el que quería decir.',
              'Fallaba mucho. Y cuando no fallaba del todo hacía algo peor, emparejaba con el más parecido de la lista, que no siempre es el correcto. <strong>Un nombre que se parece no es un nombre que coincide.</strong> El modelo no distingue bien entre esas dos cosas.',
              'Hoy esa comparación la hace un algoritmo de emparejamiento aproximado, lo que en inglés se llama fuzzy matching. Mide cuánto se parecen dos textos y devuelve una puntuación, así que se puede exigir un mínimo y descartar lo que no llega. El acierto subió en cuanto dejó de ser una opinión.',
              'La forma del arreglo es la misma que en la consulta. Una tarea que parecía de lenguaje resultó ser de comparación. Y comparar es de las cosas que un código hace igual todas las veces.',
            ],
          },
          {
            heading: 'El modelo propone, el código construye',
            part: 'Cómo funciona hoy',
            paragraphs: [
              'Hoy el modelo no escribe ninguna consulta. Lee la pregunta y devuelve un formulario de campos fijos que definimos de antemano: el periodo, el ámbito, los filtros, la métrica y las agrupaciones. Nada más.',
              'El código recibe ese formulario, comprueba que cada campo trae un valor permitido y construye él la consulta, con los valores pasados como parámetros y los nombres de columna sacados de una lista cerrada. <strong>Ningún identificador se arma con texto que haya escrito el modelo.</strong>',
              'Y de ahí sale la garantía. Un formulario de cinco campos conocidos se puede comprobar entero antes de ejecutar nada. Una consulta escrita en texto libre, no.',
            ],
            link: { label: 'El agente que consulta datos sin escribir una sola consulta', href: '/blog/ai-agents-sql' },
          },
          {
            heading: 'Cuatro capas entre una empresa y la de al lado',
            part: 'Cómo funciona hoy',
            paragraphs: [
              'El agente responde a los responsables de varias empresas del mismo grupo, cada uno sobre las suyas, así que la separación entre unas y otras es la garantía que sostiene el sistema entero. <strong>La separación se impone en cuatro sitios. El modelo no es ninguno de los cuatro.</strong>',
              'La información que el modelo puede leer mientras responde contiene solo las empresas de quien pregunta, así que las demás no existen para él y no puede filtrar lo que nunca tuvo.',
              'La corrección de nombres que acabamos de contar busca solo dentro de esas mismas empresas. Quien escribe un nombre a medias o con una letra bailada acaba en el centro que quería, si ese centro es suyo. Si no lo es, no llega a ninguna parte.',
              'Después, el código valida la petición contra una lista cerrada de valores permitidos antes de construir nada. Y la consulta final lleva un filtro incondicional que, si la lista de permisos llegara vacía, la resuelve en una condición que no encaja con ninguna fila. Cuando algo falla, el sistema se cierra en vez de abrirse.',
            ],
          },
          {
            heading: 'Lo que el agente se niega a responder',
            part: 'Lo que no hace',
            paragraphs: [
              'Hay preguntas que el sistema no contesta a propósito. Las columnas con las horas trabajadas, los retrasos y las ausencias de personas concretas existen en la base de datos y sencillamente no se le exponen al agente.',
              '<strong>La negativa no vive en una frase de sus instrucciones, vive en lo que el sistema puede alcanzar.</strong> No es que decida no contestar, es que no tiene con qué.',
            ],
          },
          {
            heading: 'Una nota de voz desde el campo',
            part: 'La voz',
            paragraphs: [
              'Con las manos ocupadas y el móvil en el bolsillo, escribir tampoco es siempre cómodo. La manera natural de preguntar en el campo es mandar una nota de voz, así que el agente las entiende.',
              '<strong>Detrás de una nota de voz trabajan tres modelos y cada uno hace una sola cosa.</strong> El primero transcribe el audio a texto. El segundo lee ese texto, entiende qué se está preguntando y compone la respuesta, con el mismo reparto de siempre, porque los datos los sigue trayendo el código. El tercero convierte la respuesta en voz.',
              'Es la misma idea que sostiene el resto del sistema, repartir el trabajo en piezas que hacen una cosa cada una y se pueden comprobar por separado.',
            ],
          },
          {
            heading: 'Un número escrito no es un número dicho',
            part: 'La voz',
            paragraphs: [
              'Esa cadena nos enseñó algo que no aparece en ninguna demostración. El modelo que compone la respuesta tiene que escribir las cifras y las fechas en letra, porque el que las va a leer en voz alta lee lo que está escrito.',
              '¿Y qué pasa si no lo hace? Que un texto que dice «12.539 kilos» no suena a doce mil quinientos treinta y nueve kilos cuando lo lee un sintetizador. Escrito con letras, sí. Lo mismo pasa con las fechas, que dichas y escritas no se parecen en nada.',
              'Parece un detalle de acabado y decide si el sistema se usa o se abandona. <strong>Una respuesta que suena rara no se cuestiona, se deja de escuchar.</strong>',
            ],
          },
          {
            heading: 'Qué se mide cada semana',
            part: 'Lo que se vigila',
            paragraphs: [
              'La medida más útil de este sistema compara dos cosas que deberían coincidir siempre: la herramienta que la conversación pedía usar y la que el modelo usó de verdad. <strong>Cuando la herramienta pedida y la usada no coinciden, casi siempre significa que respondió de memoria en lugar de consultar</strong>, que es el fallo que ningún error de sistema delata.',
              'Los huecos también se clasifican, uno a uno. Una pregunta que queda fuera de lo que el agente cubre, una que sí cubre pero para la que no hay datos y una que no ha entendido son tres problemas distintos, con tres arreglos distintos y tres dueños distintos. Contarlas juntas es no resolver ninguna.',
            ],
          },
          {
            heading: 'Dónde está hoy y qué viene detrás',
            part: 'Lo que se vigila',
            paragraphs: [
              'La consulta que antes esperaba a la oficina hoy se hace desde donde esté quien pregunta, con el móvil, escrita o hablada. La respuesta llega en segundos. <strong>El panel sigue ahí para quien lo quiera. Lo que ha cambiado es que ya no hace falta llegar hasta él.</strong>',
              'Lo siguiente que está en camino son las alertas automáticas, del tipo «avísame cuando pase esto», para que el sistema deje de esperar la pregunta y sea él quien avise.',
            ],
          },
        ],
        cta: {
          heading: '¿Tienes datos que nadie consulta porque cuesta llegar a ellos?',
          body: 'Cuéntanos tu reto y te respondemos en un día laborable. Si no le vemos retorno, te lo diremos.',
          button: 'Cuéntanos tu reto',
        },
      },
      caseStanton: {
        tocHeading: 'Qué verás en esta página',
        metaTitle: 'Stanton: facturas que dejaron de teclearse, Ideasforge',
        metaDescription:
          'Cómo automatizamos para Stanton la entrada de facturas de suministros, con el 98 % pasando sin que nadie las toque. Y el día que una cambió de formato sin avisar.',
        hero: {
          eyebrow: 'Caso en producción',
          title: 'Stanton: dábamos por hecho que las facturas no cambian. Las facturas cambian',
          subtitle:
            'Stanton es una gestora de fincas que metía a mano las facturas de luz, gas y agua de cada inquilino, a un minuto de teclado por documento. Hoy el 98 % pasa sin que nadie las toque. Esta página cuenta cómo funciona, por qué entra por un chat de Telegram y qué tuvimos que añadirle después de que una comercializadora rediseñara su factura sin avisar a nadie.',
          cta: 'Empezar por el problema',
          ctaHref: '#problema',
        },
        sections: [
          {
            heading: 'Un minuto de teclado por factura',
            id: 'problema',
            part: 'El problema',
            paragraphs: [
              'Stanton gestiona fincas. Cada inquilino trae consigo sus facturas de luz, gas y agua. Cada comercializadora las emite a su manera, con el total donde a cada una le pareció y con los conceptos escritos con otras palabras.',
              'Alguien las convertía en datos, documento a documento. <strong>Un minuto de teclado por factura, todos los meses.</strong>',
              'Nada de esto es un problema de volumen, es un problema de confianza. Mientras alguien tenga que comprobar la fila contra el papel, el trabajo no ha desaparecido, solo ha cambiado de sitio.',
            ],
          },
          {
            heading: 'Por qué entra por un chat de Telegram',
            part: 'Por dónde entra',
            paragraphs: [
              'El equipo reenvía las facturas a un chat de Telegram, que hace de buzón. No hay ninguna herramienta nueva que aprender, ni una pantalla más en la que entrar cada mañana.',
              'La elección tiene una parte que conviene decir en voz alta. <strong>Telegram no es el canal al que la gente está acostumbrada.</strong> Esa es la razón por la que casi nadie lo usa para esto.',
              'Lo elegimos igualmente porque para este trabajo es el más factible de todos. Su interfaz de programación es sencilla y gratuita, así que el buzón se monta en horas en lugar de en semanas y no añade una cuota mensual al proyecto antes de que nadie haya demostrado que funciona.',
              'Y la parte que sí importa al equipo se cumple. Reenviar un documento a un chat es algo que cualquiera sabe hacer desde el móvil, esté donde esté.',
            ],
          },
          {
            heading: 'Dábamos por hecho que el formato no cambia',
            part: 'Lo que aprendimos',
            paragraphs: [
              'La primera versión leía cada factura, extraía los campos y los dejaba en la hoja de cálculo con la que el equipo ya trabajaba. Funcionaba. Ese no era el problema.',
              '¿Qué se nos escapó, entonces? Una suposición que no habíamos escrito en ninguna parte. Dábamos por hecho que una comercializadora emite siempre sus facturas igual.',
              'No es así. Una comercializadora rediseña su factura cuando le conviene, sin avisar a nadie y desde luego sin avisar a la gestora que las recibe. El día que eso pasa, el sistema sigue leyendo, sigue extrayendo y sigue escribiendo filas. <strong>Solo que algunas ya no dicen lo que parecen decir.</strong>',
              'Ese es el fallo caro de esta clase de sistemas. No el que se rompe con estrépito, sino el que sigue funcionando y va llenando una hoja de cálculo de datos que nadie va a volver a comprobar.',
            ],
          },
          {
            heading: 'Por eso el flujo comprueba el formato antes de seguir',
            part: 'Lo que aprendimos',
            paragraphs: [
              '<strong>Lo que añadimos no fue más inteligencia, fue una comprobación.</strong> Antes de dar por buena la lectura, el flujo verifica que la factura tiene la forma que se espera de ella.',
              'Cuando esa comprobación falla, el flujo no continúa. No intenta adivinar dónde ha quedado el total ahora, no lo aproxima y no escribe una fila con lo que ha podido sacar. Se detiene y avisa a una persona, con el documento delante para que decida.',
              'La factura que llega distinta deja de ser un dato silencioso y pasa a ser un aviso. Es más trabajo el día que ocurre y es mucho menos trabajo los meses siguientes, cuando ya nadie tiene que auditar una hoja hacia atrás buscando desde cuándo cuadran mal las cifras.',
            ],
          },
          {
            heading: 'Qué se comprueba antes de dar un dato por bueno',
            part: 'Lo que aprendimos',
            paragraphs: [
              'La verificación del formato es una de tres. Las otras dos son igual de aburridas y hacen el mismo trabajo.',
              'Que estén todos los datos, porque un campo que falta no puede quedarse vacío en la hoja como si el dato no existiera. Que cuadren entre sí, porque un total que no suma sus conceptos es un total en el que no se puede confiar. Y que el formato sea el previsto, que es la que aprendimos por el camino difícil.',
              '<strong>Las tres se ejecutan en medio del flujo, antes de que nada llegue a la hoja de cálculo.</strong> Validar al final, cuando el dato ya está escrito, convierte cada error en una corrección que hay que rastrear.',
            ],
            link: { label: 'Por qué la validación es el verdadero producto', href: '/blog/automatizacion-facturas-ocr-ia' },
          },
          {
            heading: 'El 98 % que pasa solo y el 2 % que no',
            part: 'Lo que se ve desde fuera',
            paragraphs: [
              'Hoy el 98 % de las facturas se convierte en filas sin que nadie las toque. El equipo ya no teclea importes ni fechas.',
              '<strong>El 2 % restante no desaparece, escala.</strong> Sale del flujo con el documento al lado y el motivo señalado, así que quien lo revisa ve en qué se atascó en lugar de tener que buscarlo.',
              '¿Y por qué no aspirar al cien por cien? Porque ese reparto es lo que hace que el número valga algo. Un sistema que pasara el cien por cien estaría inventando en el 2 % que no entendió. Ese 2 % iría a la hoja de cálculo con el mismo aspecto que el resto.',
            ],
          },
          {
            heading: 'Empezó por un proceso y siguió por los demás',
            part: 'Lo que se ve desde fuera',
            paragraphs: [
              'Son dos agentes en producción, no una plataforma. Y la palabra agente está elegida, porque debajo de cada uno hay flujos, que son secuencias de pasos que corren siempre igual.',
              '<strong>El agente es quien decide qué flujo activar con lo que acaba de llegar.</strong> Es el mismo reparto de siempre, el modelo elige el camino y el código lo recorre, con la diferencia de que aquí el camino es un flujo entero en vez de una consulta.',
              'Empezaron por las facturas de suministros, que era el proceso que más horas se llevaba. Desde entonces el cliente ha ido ampliando la automatización a otros procesos administrativos.',
              'Ese es el patrón que recomendamos y el que vemos sobrevivir. El primer proceso paga el montaje, la conexión, el registro y las comprobaciones. Los siguientes lo reutilizan y se deciden con los números del que ya está funcionando.',
              'Sobre cuánto tarda el primero, la respuesta honrada depende de lo que haya al empezar. Con los datos disponibles, los accesos concedidos y la tarea bien definida, un piloto en dos semanas es realista.',
            ],
            link: { label: 'Cómo trabajamos la automatización de procesos', href: '/servicios/automatizacion-de-procesos-con-ia' },
          },
        ],
        cta: {
          heading: '¿Tu equipo sigue tecleando documentos?',
          body: 'Cuéntanos tu reto y te respondemos en un día laborable. Si no le vemos retorno, te lo diremos.',
          button: 'Cuéntanos tu reto',
        },
      },
      caseBarceloneta: {
        tocHeading: 'Qué verás en esta página',
        metaTitle: 'Barceloneta Premium: filtrar consultas de alquiler, Ideasforge',
        metaDescription:
          'Un agente que atiende las consultas de alquiler de Barceloneta Premium por WhatsApp y las filtra. La primera versión tenía herramientas y no las usaba.',
        hero: {
          eyebrow: 'Caso en producción',
          title: 'Barceloneta Premium: le dimos herramientas al modelo y no las usaba',
          subtitle:
            'Una agencia inmobiliaria de Barcelona recibe cada día decenas de consultas de alquiler por WhatsApp. Comprobar cada una costaba entre cinco y diez minutos. Hoy un agente mantiene esa conversación y deja al equipo el veredicto preparado. Esta página cuenta cómo funciona y, sobre todo, por qué la primera versión hubo que tirarla.',
          cta: 'Empezar por el problema',
          ctaHref: '#problema',
        },
        sections: [
          {
            heading: 'Diez minutos por consulta, decenas de consultas al día',
            id: 'problema',
            part: 'El problema',
            paragraphs: [
              'Una agencia de alquiler recibe consultas todo el día y casi ninguna sirve. Cada persona interesada escribe por WhatsApp. Antes de poder decir nada útil hay que averiguar qué busca, con qué presupuesto y qué documentación tiene.',
              'Esa comprobación llevaba entre cinco y diez minutos por consulta, con decenas entrando al día. En los picos de demanda de alquiler el trabajo no cabía en la jornada, así que las respuestas se retrasaban y quien preguntaba se enfriaba esperando.',
              '<strong>El cuello de botella no era contestar. Era averiguar, para cada conversación, si merecía la pena contestar.</strong>',
            ],
          },
          {
            heading: 'La primera versión tenía herramientas y no las usaba',
            part: 'Lo que retiramos',
            paragraphs: [
              'La construimos como se construye casi todo lo que hoy se vende como agente. Un modelo con un conjunto de herramientas a su disposición, cada una capaz de consultar o registrar algo, más la instrucción de usarlas cuando hicieran falta.',
              '¿Y qué puede salir mal ahí? Que muchas veces no las usaba. No fallaba la herramienta, no fallaba la conexión y no había ningún error que mirar. <strong>Sencillamente el modelo decidía que podía responder sin llamar a la herramienta.</strong>',
              'Eso salía de dos maneras y ninguna es buena. O se inventaba la respuesta, porque un modelo al que le falta un dato rellena el hueco con algo que suena razonable. O se atascaba, diciéndole a la persona que no podía seguir adelante cuando sí se podía.',
              'Lo llamativo del caso es que sobre el papel estaba todo bien. Las herramientas existían, la instrucción de usarlas estaba escrita y en las pruebas funcionaba. Una instrucción a un modelo es una petición, no una garantía. Aquí la petición era nada menos que acordarse de mirar antes de hablar.',
            ],
            link: { label: 'Por qué no nos gustan las arquitecturas agénticas', href: '/blog/no-me-gustan-los-agentes-de-ia' },
          },
          {
            heading: 'La conversación dejó de ser cosa del modelo',
            part: 'Cómo funciona hoy',
            paragraphs: [
              'Lo que hicimos fue quitarle al modelo la decisión de en qué punto está la conversación. Esa decisión pasó a un mecanismo aparte, escrito en código, que lleva la cuenta de por dónde va cada charla.',
              'Funciona con dos cosas. Qué datos se han conseguido ya, porque no es lo mismo saber el presupuesto y no la documentación que al revés. Y en qué fase de preguntas está la conversación, porque hay un orden y las preguntas no se hacen todas de golpe.',
              'Con esas dos, el mecanismo sabe siempre en qué situación exacta estamos. Y ahí es donde vuelve a entrar el modelo, que es lo que sabe hacer: leer lo que la persona acaba de escribir y decidir qué herramienta toca para ese estado concreto.',
              'El reparto es el mismo de siempre y por eso funciona. <strong>El código lleva la cuenta y el modelo interpreta.</strong> Ninguno de los dos hace el trabajo del otro, así que ya no hay ningún punto en el que acordarse de algo dependa de la buena voluntad de un modelo.',
            ],
          },
          {
            heading: 'Cómo se decide qué es apto',
            part: 'Cómo funciona hoy',
            paragraphs: [
              'El agente no rellena un formulario ni lo manda. Pregunta como preguntaría alguien del equipo, reuniendo a lo largo de la conversación lo que la agencia necesita saber: la solvencia, si hay mascotas, si se fuma en la vivienda y algunas cosas más que la agencia define.',
              'Con esos datos se clasifica la solicitud como apta o no apta. Los criterios están fijados de antemano, así que la clasificación es siempre la misma para los mismos datos y no depende de con qué palabras se contestó.',
              '¿Y dónde viven esos criterios? La respuesta es la parte que más suele sorprender. En una tabla de hoja de cálculo, en el Drive de la agencia, que ellos abren y editan cuando quieren. Si mañana cambian de idea sobre un requisito, lo cambian ahí.',
              'No hay que avisarnos, no hay que esperar a una publicación nuestra y no hay ningún sitio del sistema donde ese criterio esté escrito por duplicado. <strong>Quien pone las reglas es quien responde de ellas. Por eso viven donde esa persona puede llegar.</strong>',
            ],
          },
          {
            heading: 'Quién decide de verdad y qué pasa con el silencio',
            part: 'Lo que no hace',
            paragraphs: [
              'El agente no cierra nada. Cuando ha reunido la información, manda al equipo un resumen con la clasificación y un párrafo que explica el porqué. Alguien de la agencia lo lee y decide si concierta la visita.',
              'Esa separación no es un adorno. Una clasificación automática sobre personas es una recomendación. La decisión sobre a quién se le alquila una vivienda pertenece a quien responde de ella.',
              'Y hay algo que el sistema no hace a propósito. <strong>Si la persona interesada deja de contestar, la conversación se queda exactamente donde estaba.</strong> No insiste, no recuerda al tercer día y no vuelve a escribir una semana después.',
              'Eso se decidió así porque perseguir a quien se ha enfriado no le compensa a la agencia. Es una función menos que construir, una menos que mantener y una menos que explicar cuando alguien pregunta por qué le escribe un robot.',
            ],
          },
          {
            heading: 'Por qué el resumen va por correo',
            part: 'Lo que no hace',
            paragraphs: [
              'El resumen llega por correo, que a primera vista parece la opción perezosa cuando la agencia tiene un CRM. La razón es más aburrida y más común de lo que parece.',
              'El CRM de la agencia deja consultar sus datos desde fuera, pero no deja escribir en él. Tiene puntos de consulta y no una interfaz completa, así que ningún sistema externo puede dejarle nada dentro.',
              'Se puede pelear con eso o se puede aceptar. Nosotros construimos para lo que hay, así que el veredicto sale por el canal que sí funciona y llega igual de rápido a la persona que tiene que decidir.',
              'Es el tipo de detalle que no aparece en una demostración y decide el diseño entero. <strong>Antes de prometerle a nadie que el resultado aterriza en su sistema conviene mirar si su sistema deja que aterrice algo.</strong>',
            ],
          },
          {
            heading: 'Tres horas al día y la señal que llegó después',
            part: 'Lo que se ve desde fuera',
            paragraphs: [
              'La agencia cifra en más de tres horas al día lo que recupera, solo en gestionar las solicitudes que entran. <strong>El equipo dejó de hacer triaje y pasó a concertar visitas</strong>, que es la parte del trabajo que produce ingresos.',
              'Quien pregunta, además, recibe respuesta en el momento y a cualquier hora, incluidos esos picos en los que antes se quedaba esperando.',
              'La señal que más nos importa llegó después. La agencia está ampliando el agente a la venta de viviendas y a procesos internos, sobre la misma base que ya filtra el alquiler.',
            ],
            link: { label: 'El caso contado desde dentro, en el blog', href: '/blog/agente-ia-inmobiliaria' },
          },
        ],
        cta: {
          heading: '¿Tu equipo hace triaje en lugar de vender?',
          body: 'Cuéntanos tu reto y te respondemos en un día laborable. Si no le vemos retorno, te lo diremos.',
          button: 'Cuéntanos tu reto',
        },
      },
      caseIndustrial: {
        tocHeading: 'Qué verás en esta página',
        metaTitle: 'Asistente de planta para una empresa industrial, Ideasforge',
        metaDescription:
          'Un asistente de planta para una gran empresa industrial. La primera medición del enrutado dio 72,8 % sobre 118 consultas reales. Y lo que hicimos con ese número.',
        hero: {
          eyebrow: 'Caso en producción',
          title: 'Un asistente de planta y lo que costó saber si acertaba',
          subtitle:
            'Una gran empresa industrial tenía su conocimiento operativo repartido entre manuales densos y la memoria de los más veteranos. Construimos un asistente que responde sobre sus propios sistemas y guía el diagnóstico paso a paso. Esta página cuenta cómo está hecho y qué nos costó demostrar que acertaba.',
          cta: 'Empezar por el problema',
          ctaHref: '#problema',
        },
        sections: [
          {
            heading: 'El manual no se lee con la máquina parada',
            id: 'problema',
            part: 'El problema',
            paragraphs: [
              'El conocimiento de una planta vive en dos sitios y ninguno está a mano cuando hace falta. Una parte está en manuales largos, escritos para leerse con tiempo y con calma. La otra parte está en la cabeza de quienes llevan años trabajando allí.',
              'Quien tiene delante una máquina parada no puede recurrir a ninguno de los dos. No va a ponerse a leer cuarenta páginas y la persona que sabe puede estar en otro turno o no estar ese día.',
              'Lo que esta empresa quería no era un buscador. <strong>Un buscador devuelve documentos y deja el trabajo de leerlos para quien menos tiempo tiene.</strong> Querían una respuesta, con los pasos a seguir, sacada de sus propios sistemas.',
            ],
          },
          {
            heading: 'Media docena de agentes y un solo interlocutor',
            part: 'Cómo funciona',
            paragraphs: [
              'Por dentro no hay un asistente sino varios. Media docena de agentes especializados, cada uno con su terreno, coordinados por un orquestador que decide a cuál de ellos le corresponde cada consulta.',
              'Por fuera no se nota nada de eso. Quien pregunta escribe una sola vez y recibe una sola respuesta, sin elegir destinatario y sin saber que ahí dentro hay un reparto de trabajo.',
              'El reparto existe por una razón práctica. <strong>Un agente que atiende un terreno acotado responde mejor de ese terreno que un modelo general intentando cubrirlos todos a la vez.</strong>',
              'Pero esa arquitectura resuelve un problema y crea otro. Aparece una decisión que antes no existía, que es acertar a qué agente le toca cada pregunta. Si esa decisión falla, da igual lo bueno que sea el agente al que la consulta no llegó.',
            ],
            link: { label: 'Por qué no nos gustan las arquitecturas agénticas', href: '/blog/no-me-gustan-los-agentes-de-ia' },
          },
          {
            heading: 'La primera medición dio 72,8 %',
            part: 'Lo que costó',
            paragraphs: [
              'Esa decisión hay que medirla y medirla cuesta trabajo. Reunimos 118 consultas reales, de las que se hacen de verdad en la planta. Después comprobamos una por una si la pregunta había llegado al agente que le correspondía.',
              '¿Y cuántas habían llegado a donde debían? El 72,8 %. <strong>Algo más de una de cada cuatro consultas iba a parar al agente equivocado.</strong>',
              'Un número así es incómodo de enseñar y es la única puerta que hay para mejorar. <strong>Sin medir, lo que se tiene es la impresión de que funciona, que es justo lo que tiene todo el mundo antes de medir.</strong>',
              'Con las 118 delante se ve dónde se rompe. Corregimos el enrutado y volvimos a pasar las mismas consultas, que dieron 89,3 %. Una segunda ronda de correcciones lo dejó en 91,5 %.',
              'Las mismas 118 las tres veces. Cambiar el examen entre una medición y la siguiente convierte la comparación en un adorno.',
            ],
          },
          {
            heading: 'Por qué nos quedamos cerca del 92 %',
            part: 'Lo que costó',
            paragraphs: [
              '¿Y hasta dónde seguir? Del 91,5 % al 100 % hay trecho y la tentación de recorrerlo es fuerte, porque un número redondo se enseña mucho mejor.',
              'Decidimos parar cerca del 92 % y decirlo en voz alta. <strong>A partir de cierto punto, lo que mejora ya no es el sistema sino el examen.</strong>',
              'Cuando se persigue el pleno, cada caso que falla empuja a retocar la prueba hasta que deje de fallar. El número sube, el sistema se queda igual y lo que se ha construido es un examen a la medida de quien lo aprueba.',
              'La misma disciplina nos quitó una idea que nos apetecía. Probamos un modelo más barato para el enrutado y perdió diez puntos en el conjunto, que ya es bastante.',
              'Lo importante estaba en los casos de empate, aquellos en los que dos agentes podían encajar y hay que elegir bien. Ahí cayó del 89 % al 44 %. El ahorro estaba en la factura del modelo y el coste en las consultas difíciles, que son las que llevan a alguien a preguntar.',
            ],
            link: { label: 'Medir la IA por las ganancias, no por la productividad', href: '/blog/medir-la-ia-por-las-ganancias' },
          },
          {
            heading: 'Quien pregunta manda, no el asistente',
            part: 'Lo que sostiene el resto',
            paragraphs: [
              'Hay dos decisiones que no se ven desde fuera y son las que permiten que esto esté funcionando en una empresa grande.',
              'La primera es de permisos. <strong>El asistente no tiene acceso propio a nada.</strong> Cuando consulta un sistema lo hace con la identidad de la persona que está preguntando, así que cada una ve lo que su puesto le permite ver y ni un dato más.',
              'La segunda es de exactitud. Cuando la respuesta tiene que incluir un texto de referencia, el modelo no lo escribe. Devuelve una clave y el código va a buscar ese texto tal como está guardado, con sus palabras y sin variaciones.',
              'Las dos salen de la misma idea, que es la que ordena todo lo demás. <strong>Lo que puede tener consecuencias no se deja al criterio de un modelo, sino que se resuelve en código.</strong>',
            ],
          },
        ],
        cta: {
          heading: '¿Tu conocimiento operativo vive en manuales y en la memoria de tres personas?',
          body: 'Cuéntanos tu reto y te respondemos en un día laborable. Si no le vemos retorno, te lo diremos.',
          button: 'Cuéntanos tu reto',
        },
      },
      caseWazzy: {
        tocHeading: 'Qué verás en esta página',
        metaTitle: 'Wazzy: nuestro asistente de citas por WhatsApp, Ideasforge',
        metaDescription:
          'Wazzy gestiona cientos de citas al mes por WhatsApp en clínicas, con datos de salud de por medio y sin que ninguna se haya reservado nunca dos veces.',
        hero: {
          eyebrow: 'Producto propio',
          title: 'Wazzy: cientos de citas al mes y ninguna reservada dos veces',
          subtitle:
            'Wazzy es nuestro asistente de citas por WhatsApp. Trabaja en clínicas dentales, de fisioterapia y de estética, trata datos de salud todos los días y es el sistema donde probamos primero lo que después construimos para un cliente.',
          cta: 'Ver cómo trabaja',
          ctaHref: '#que-hace',
        },
        sections: [
          {
            heading: 'Wazzy contesta el WhatsApp de la clínica a cualquier hora',
            id: 'que-hace',
            part: 'Qué es',
            paragraphs: [
              'Una clínica pequeña pierde reservas por una razón poco tecnológica. La persona que atiende está con alguien delante y quien escribe pidiendo cita no recibe respuesta. Wazzy contesta ese mensaje a las once de la noche o en mitad de una consulta.',
              '<strong>Reserva, cambia y cancela citas por WhatsApp. Deja el calendario y la ficha del paciente al día sin que nadie teclee nada por la mañana.</strong> Está en producción en clínicas dentales, de fisioterapia y de estética. Gestiona cientos de citas al mes.',
              'Una conversación de estas cabe en cuatro mensajes. Alguien escribe a las diez y media de la noche que necesita cita para una limpieza, a ser posible por la tarde. Wazzy le ofrece dos huecos concretos, la persona elige uno y la cita queda puesta en el calendario de la clínica antes de que nadie abra la puerta.',
              'Cuando el mensaje no es una reserva, el trabajo se parece más al de un recepcionista. Hay que mover una hora, entender que «lo de la semana que viene mejor no» significa cancelar. Y a veces hay que darse cuenta de que quien escribe tiene un dolor que no espera al jueves. Eso último no lo resuelve el asistente, lo sube a una persona.',
            ],
            link: {
              label: 'Qué construimos con esto para otras empresas',
              href: '/servicios/agentes-conversacionales',
            },
          },
          {
            heading: 'Lo que se puede comprobar desde fuera',
            part: 'Por qué nos fiamos',
            paragraphs: [
              '<strong>La primera versión de Wazzy era un agente con herramientas a su disposición y la dejamos atrás.</strong> La que está hoy en producción reparte el trabajo de otra manera, con mucho más peso del lado del código y bastante menos del lado del modelo. Cómo está montada por dentro no lo vamos a contar aquí, entre otras cosas porque no es información que le debamos a la competencia. Lo que sí se puede enseñar es lo que esa decisión produce.',
              'Ninguna cita se ha reservado dos veces en toda la historia del producto. Ni una. Es un fallo que no se arregla pidiendo perdón, porque cuando ocurre hay dos personas en la puerta a la misma hora y una se tiene que ir a casa.',
              '<strong>Nada sale a producción sin pasar antes una batería de casos reales con su respuesta correcta anotada.</strong> Eso incluye lo que edita la propia clínica desde su panel, que no cambia lo que el asistente responde hasta que la batería lo aprueba. Y la versión del modelo la fijamos nosotros, así que una actualización del proveedor no aparece sola en producción un martes por la mañana.',
              'Sobre el sistema en marcha hay 103 controles vigilando, atados a 91 reglas con nombre que el sistema tiene que cumplir. Y una vez por semana una prueba recorre el sistema entero de punta a punta, pidiendo cita como lo haría una persona.',
            ],
          },
          {
            heading: 'Una cita en una clínica es un dato de salud',
            part: 'Datos de salud',
            paragraphs: [
              'Eso cambia las reglas antes de escribir una línea. El reglamento europeo aparta los datos de salud en su artículo 9, entre las categorías que no se pueden tratar sin un motivo tasado. El que ampara a una clínica es el 9.2.h, el de la asistencia sanitaria.',
              '<strong>Sí guardamos datos personales.</strong> Decir lo contrario sería más cómodo y sería falso. Lo que hacemos es guardarlos cifrados campo a campo en vez de cifrar el almacén entero de una pieza, de modo que lo que se descifra es el dato que hace falta en ese momento.',
              'La ley marca cuánto tiempo hay que conservar una historia clínica, pero esa obligación es de la clínica y no nuestra. Wazzy borra a petición todo lo que no tenga un plazo legal por encima. Lo que sí lo tiene se conserva mientras ese plazo dure.',
              '<strong>Y el modelo no habla con la base de datos.</strong> Las dos cosas que un asistente puede hacer mal aquí, inventarse un dato o sacar el de otra persona, no dependen de que el modelo se porte bien.',
            ],
            link: { label: 'Cómo tratamos los datos personales, en detalle', href: '/ia-y-rgpd' },
          },
          {
            heading: 'El emoji que cerró una confirmación',
            part: 'La cicatriz',
            paragraphs: [
              'Ningún sistema en producción está libre de haber hecho algo tonto. Este es el nuestro y lo contamos porque de él salió una regla que usamos desde entonces en todo lo que construimos.',
              'El asistente había pedido confirmar la asistencia a una cita y esa pregunta se quedaba abierta veinticuatro horas. Dos horas y media después, la persona contestó con dos emojis. El asistente los leyó como lo que eran, algo que no iba de la cita, pero al marcarlos así dio por cerrada la confirmación.',
              'Un minuto más tarde esa misma persona escribió que sí iba. Ya no había nada abierto que confirmar. La cita se quedó en pendiente, la clínica nunca supo que iba <strong>y fue</strong>.',
              '<strong>La confirmación tenía veintiuna horas de vida por delante. No expiró, la mató un emoji.</strong> De ahí salió una regla de una línea que hoy va en todo lo que construimos. Que un mensaje no vaya de algo no significa que ese algo haya terminado. Solo una acción cierra una acción.',
              'Y lo medimos, porque una anécdota sin cifra no sirve para decidir nada. En toda la vida del producto hay 287 confirmaciones que fueron por el camino bueno, 105 que caducaron sin respuesta y 10 que se quemaron así.',
            ],
          },
          {
            heading: 'Lo que aprendemos aquí acaba en tu proyecto',
            part: 'Qué te llevas',
            paragraphs: [
              '<strong>Wazzy es el único sistema nuestro donde el que paga cuando algo sale mal somos nosotros.</strong> Por eso es donde probamos primero. Casi todo lo que sabemos sobre lo que se rompe en un asistente conversacional lo sabemos por él. Ese aprendizaje llega a los proyectos de cliente ya hecho.',
              'Un cliente no compra Wazzy. Wazzy es de una clínica y de sus citas. Lo que construimos para otra empresa se construye para su problema. Lo que se hereda de aquí es el método, que son las pruebas delante de cada cambio y la disciplina de no dejarle al modelo una decisión que puede tomar el código.',
            ],
            link: {
              label: 'Cómo construimos un agente a medida',
              href: '/servicios/desarrollo-de-agentes-de-ia',
            },
          },
        ],
        cta: {
          heading: '¿Quieres uno así para tu empresa?',
          body: 'Cuéntanos tu reto y te respondemos en un día laborable. Si no le vemos retorno, te lo diremos.',
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
      blogTitle: 'Blog on AI agents and automation, Ideasforge',
      blogDescription:
        'What we learn building AI agents and automations that reach production: what breaks, how it gets measured and what is decided before any code is written.',
      enterpriseTitle: 'AI assistant over your internal documentation, Ideasforge',
      enterpriseDescription:
        'For mid-size and large companies: an assistant that answers in natural language by querying your internal documentation, wikis and systems.',
    },
    consent: {
      heading: 'Measurement cookies',
      body: 'We use Google Analytics to learn which pages earn their place and which do not. It sets cookies, so nothing loads until you decide. If you say no, the site works exactly the same.',
      accept: 'Accept',
      reject: 'Reject',
      link: 'Read the cookies policy',
    },
    nav: {
      home: 'Home',
      services: 'Services',
      projects: 'Projects',
      about: 'About us',
      blog: 'Blog',
      contact: 'Contact',
      switchTo: 'Switch language',
    },
    hero: {
      eyebrow: 'We are the forge of your ideas',
      title: 'Stop searching your systems. AI agents that answer and act.',
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
          href: '/en/cases/industrial',
          hrefLabel: 'What it cost to know it was right',
          image: '/case-studies/industrial.jpg',
          title: 'Guided troubleshooting for whoever is at the machine',
          body: 'Plant knowledge lived in dense manuals and in the heads of the most experienced people. We built an assistant on the company’s own systems. Operators query production and fault data, and get step-by-step guided troubleshooting when a machine stops.',
          metricBig: '6 agents',
          metricSmall:
            'specialized, coordinated by an orchestrator that routes every query.',
        },
        {
          client: 'Savian',
          clientLogo: '/logos/savian.png',
          href: '/en/cases/savian',
          hrefLabel: 'How it is built and what we took away from the model',
          image: '/case-studies/harvest.jpg',
          title: 'Anyone on the team, asking their own data',
          body: 'Finding out yesterday’s output meant waiting until you were in front of a computer. We built a WhatsApp assistant that understands the question in natural language and returns the figure by querying the database. The split is always the same: judgment lives in the code, interpretation of language lives in the model, and knowledge lives in the data.',
          metricBig: 'From hours to seconds',
          metricSmall:
            'how long it now takes any manager to get their figure.',
        },
        {
          client: 'Stanton',
          clientLogo: '/logos/stanton.png',
          href: '/en/cases/stanton',
          hrefLabel: 'The invoice that arrived different, and what we added',
          image: '/case-studies/stanton.jpg',
          title: 'The invoices stopped being typed',
          body: 'Their tenants’ electricity, gas and water bills were keyed in by hand, one by one. Now the team uploads them to a Telegram chat and an agent running on Gemini reads each document and returns the data as rows ready to review. They started with invoices and keep extending the system to other back-office processes.',
          metricBig: '2 agents',
          metricSmall: 'in production, and the system keeps growing.',
        },
        {
          client: 'Barceloneta Premium',
          clientLogo: '/logos/bcnpremium.png',
          href: '/en/cases/barceloneta',
          hrefLabel: 'The first version and why we threw it away',
          image: '/case-studies/barceloneta.jpg',
          title: 'The filter that works while the office is closed',
          body: 'Every rental inquiry arriving on WhatsApp took five to ten minutes of manual checking, and dozens came in every day. The agent talks to the applicant, collects reason, budget and paperwork, and emails the team a summary with a paragraph explaining why each one fits or does not. The team stopped screening and went back to booking viewings.',
          metricBig: '+3 hours',
          metricSmall: 'saved per day answering requests.',
        },
        {
          client: 'Wazzy',
          clientLogo: '/logos/wazzy.png',
          href: '/en/cases/wazzy',
          hrefLabel: 'What it costs to trust your own code',
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
              'Your team queries operational data in natural language, from a phone and without opening a dashboard.',
            proof: 'Like at Savian',
            pageLabel: 'AI agent development',
            href: '/en/services/ai-agent-development',
          },
          {
            title: 'An agent for repetitive work',
            icon: 'automatizacion',
            description:
              'Registers invoices, fires alerts and lands the data in your systems with nobody typing. Your team only reviews the doubtful cases.',
            proof: 'Like at Stanton',
            pageLabel: 'AI workflow automation',
            href: '/en/services/ai-workflow-automation',
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
            href: '/en/services/conversational-ai',
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
          body: 'Every change goes through the test suite before it ships, and we keep measuring every week afterwards. If one of them stops understanding queries well, we know before you do.',
          modal: {
            eyebrow: 'Observability by default',
            title: 'We measure every change before it ships to production',
            subtitle:
              'Your provider updates the model your system runs on without changing its name, your documentation keeps growing, and the system that answered well yesterday starts answering badly today.',
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
                body: 'It begins when the instructions that govern the system are known only to whoever wrote them and nobody else can check whether a change makes them worse. It grows when documentation describes what someone meant to do instead of what ended up being done. By the time you want to switch providers, no contract is stopping you, there is simply nobody left who can explain how the thing works.',
              },
              {
                heading: 'And meanwhile the ground moves',
                body: 'Providers retire models regularly and they do it in writing. Anthropic publishes its <a class="link-inline" href="https://platform.claude.com/docs/en/about-claude/model-deprecations" rel="noopener noreferrer" target="_blank">deprecation schedule</a> and gives sixty days of notice. On 15 June 2026 Claude Sonnet 4 and Opus 4 stopped working, so from that date any call to those identifiers fails. This is not an accident or bad practice, it is how the sector works. The question is what each of those retirements costs you, because <u class="text-fg">when a provider retires a model, that should not affect you</u>.',
              },
              {
                heading: 'What is inside the repository',
                body: 'Everything that defines the system behavior lives versioned in your repository: the model instructions with their change history, the tests with their correct answer recorded, the operations manuals and an incident catalog. That catalog is the piece technical teams appreciate most and the one almost nobody asks for, because it does not say how each problem was fixed, it says how it is recognized from the outside, which is what helps the next time the system acts strange.',
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
                body: 'A language model receives the instructions we give it and the text that reaches it from outside through the same channel, with nothing separating one from the other. So someone can slip into that text something the model reads as a new order and follows without realizing it has switched sides. Classic security solves this by separating data from instructions. Here that separation does not exist, which is why <a class="link-inline" href="https://owasp.org/www-project-top-10-for-large-language-model-applications/" rel="noopener noreferrer" target="_blank">prompt injection</a> tops the OWASP risk list for language-model applications for the second edition running. In December 2025 the UK’s <a class="link-inline" href="https://www.ncsc.gov.uk/news/mistaking-ai-vulnerability-could-lead-to-large-scale-breaches" rel="noopener noreferrer" target="_blank">national cyber security centre</a> went further and warned it may never be fixed as a category, asking defenders to stop waiting for a patch and work on reducing the damage instead.',
              },
              {
                heading: 'The usual setup leaves the door open',
                body: 'What makes an assistant dangerous is not what it knows, it is what it can do. Security people talk about three ingredients that are harmless apart and dangerous together: access to private data, input that comes from outside and a free path to act on your systems. The first two are the reason the assistant exists, so the third is the one to cut. The most common setup today does the opposite, because it plugs the model into the database through a connector that lets it write the queries itself (the now-famous MCP connectors). From that moment it can write any query the language allows. The only thing stopping it is a sentence in its prompt, along the lines of “do not query the payroll table”. <u class="text-fg">And this is not a guarantee, it is a polite request.</u>',
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
                body: 'At Wazzy we handle health data, which European regulation places among its special categories, the ones under reinforced protection. We do store personal data, because without it there is no service. What changes is how. Encryption runs field by field and deletion separates what is erased on request from what the clinic must retain by legal deadline. The bar is set for us by the European AI regulation and by data protection law.',
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
      tocHeading: 'What this page covers',
      clusterHeading: 'We cover this in detail',
      heading: 'Blog',
      subtitle: 'What we discover while building AI in production with our clients.',
      readMore: 'Read more',
      updatedOn: 'Updated on',
      viewAll: 'Visit blog',
      backToBlog: 'Back to blog',
      publishedOn: 'Published on',
      byline: 'by',
      counterLabel: 'Article',
      counterOf: 'of',
    },
    faq: {
      eyebrow: 'FAQs',
      heading: 'Frequently asked questions',
      subtitle: 'The questions we usually answer before we start.',
      items: [
        {
          q: 'What budget do we need?',
          a: 'A custom agent runs between €2,500 and €10,000 to build, depending on how many systems it has to touch and how much validation it needs, plus €150 to €500 a month to operate, which covers watching it and keeping it working. The model and the infrastructure sit in accounts under your company’s name, so those bills are yours and they are not inside the fee. Larger systems with several agents are quoted per project.',
        },
        {
          q: 'How long until we have something working?',
          a: 'With the data available, the access granted and the task clearly scoped, a pilot in two weeks is realistic. When one of those conditions is missing, what stretches is the preparation and not the build. The pilot is paid work and its price counts toward the final project.',
        },
        {
          q: 'Is there a minimum term on the monthly fee?',
          a: 'There is none. The fee pays for watching and maintaining the system that month and you stop paying whenever you decide. Nothing switches off when you do, because the repository has been in your name since day one and the infrastructure runs in accounts that are yours. What you stop having is our work, not what was built.',
        },
        {
          q: 'What if what we need does not involve AI?',
          a: 'We tell you. If your process runs on clear rules over data that always arrives the same way, automation without a model solves it cheaper and faster, with nothing to watch afterwards. We build that too. An agent pays off when something in the middle of the process has to read, interpret or decide over inputs that change.',
        },
        {
          q: 'Do you work as an AI automation consultant?',
          a: 'Yes, as the first phase of every project. Before anything is built we study your processes and your data and tell you where an agent pays off and where it does not. If we see no return, we say so and it ends there. And when there is one, the same team that recommended the system builds it and operates it, so the advice answers for its results.',
        },
        {
          q: 'Do you only work with large enterprises?',
          a: 'No. We have dedicated packages for small businesses (customer support, lead qualification, document automation) with the same engineering we use on enterprise projects.',
        },
        {
          q: 'Where do you work from?',
          a: 'From Spain. We work with companies bound by European rules, wherever they are based, because what decides how the system has to be built is the rule your company answers to and not where it has its head office.',
        },
        {
          q: 'Does my data leave my infrastructure?',
          a: 'Only if you decide so. We deploy on your cloud or your own servers, with your organization’s accounts, and the system stores the minimum it needs. The only outbound path is the calls to the model provider, and you approve which ones happen and what travels in them.',
        },
        {
          q: 'Who owns the code you build?',
          a: 'You do. We hand you the repositories, the documentation and the architecture from day one. No black box, no vendor lock-in.',
        },
        {
          q: 'How do you know AI keeps working after delivery?',
          a: 'In two ways. A test suite runs before every change and blocks it if quality drops. Once live, we keep measuring every week. If the system stops understanding a question, we catch it before it reaches the end user.',
        },
      ],
    },
    contact: {
      eyebrow: 'Contact',
      heading: 'Tell us your challenge.',
      subhead: 'We reply within one business day. No forty-slide sales deck.',
      subject: 'New message from ideasforge.io',
      name: 'Name',
      email: 'Email',
      company: 'Company',
      website: 'Website',
      optional: 'Optional',
      message: 'What you want to build, or the problem you want to solve',
      messageHint: 'Describe it the way you would to a colleague. You do not need to know which technology solves it.',
      privacyPre: 'I have read the ',
      privacyLink: 'Privacy Policy',
      privacyPost: ' and I know you will only use my data to reply to me.',
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
        'The model never reaches your systems. It interprets the question and hands over a contract, and from there the code decides. Unlike the model, the code behaves the same way every time. The worst a malicious message can achieve is a wrong pick from a list we have already reviewed.',
    },
    chatVsAgent: {
      title: 'Bot vs AI agent',
      lanes: { bot: 'BOT', agente: 'AI AGENT' },
      nodes: {
        botUsuario: 'The user picks or types an option',
        botRespuesta: 'The bot returns a predefined answer',
        agenteUsuario: 'The user writes',
        agenteElige: 'The model picks from its tools',
        agenteResponde: 'It answers the user',
      },
      legend:
        'The difference is who decides the answer. The bot’s answer was written before anyone asked, so it only covers what somebody anticipated. The agent’s answer gets built at that moment, by choosing which tool to use for what it was asked.',
    },
    formasDiagram: {
      title: 'Who decides the path in each shape',
      axis: 'One request, from arrival to resolution',
      key: { codigo: 'Code decides', modelo: 'The model decides' },
      lanes: {
        fijo: { name: 'A fixed flow with no model', segs: ['Code decides the whole path'] },
        paradas: {
          name: 'A fixed flow with model checkpoints',
          segs: ['Code', 'The model reads', 'Code'],
        },
        agente: { name: 'An agent', segs: ['The model decides the whole path, step by step'] },
        dentro: {
          name: 'An agent inside a flow',
          segs: ['Code', 'The agent decides this stretch', 'Code'],
        },
        varios: {
          name: 'Several agents with an orchestrator',
          segs: ['The orchestrator picks', 'The specialist decides its stretch'],
        },
      },
      legend:
        'Each band is one request, from the moment it arrives to the moment it is resolved. Blue is what the model decides right then. Gray is ordinary code, which always does the same thing and can be checked in full before it ships. The more blue there is, the more the system decides on its own and the more work it takes to test and watch. This is not a ranking. The first two shapes carry no agent at all, and the fourth, despite having one, decides less than the third.',
    },
    entradasDiagram: {
      title: 'The same order, in two formats',
      izq: {
        name: 'Fixed format',
        items: [
          'A form with its fields',
          'A file with the same columns every time',
          'An order that arrives through an integration',
        ],
        foot: 'Rules and code. Automated for decades.',
      },
      der: {
        name: 'No fixed format',
        items: [
          'The same order inside a PDF',
          'The same order typed into an email',
          '“Last month’s, but to the new warehouse”',
        ],
        foot: 'Once, a person keying it in. Now, a model that reads and code that executes.',
      },
      legend:
        'The three rows are the same request written two ways. The left has been automated for decades because it always arrives the same. The right is what used to force someone to type, and it is exactly the gap an agent fills. Note that what changes is not how hard the work is, it is the shape it arrives in.',
    },
    capasDiagram: {
      title: 'The four layers of isolation',
      entrada: 'Someone asks a question',
      salida: 'Their own data, nothing else',
      llaves: { modelo: 'What the model sees', codigo: 'What the code decides' },
      capas: [
        {
          name: 'The context',
          desc: 'Only the data of whoever asked goes in, the rest does not exist for the agent',
        },
        {
          name: 'Half-typed names',
          desc: 'They are corrected only against what that person can already see',
        },
        {
          name: 'The validation',
          desc: 'Code checks the request against the closed list for that person',
        },
        {
          name: 'The filter',
          desc: 'It travels inside the query and there is no way to skip it',
        },
      ],
      legend:
        'Each layer holds even if the one above it fails. The first decides what the model gets to see and the other three are ordinary code that behaves the same way every time. The last one distrusts even the three above it. If the permission list arrives empty, the query matches no rows. It fails closed.',
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
        'Tell us which process you want to solve and we reply within one business day with a first read of your case.',
      eyebrow: 'Step 1 · Explore',
      title: 'Let’s start with your case',
      subtitle:
        'These are the same questions we would ask in a first meeting. Answering them in writing saves that meeting for both of us and lets us start working sooner.',
      getHeading: 'What you get',
      get: [
        'A reply within one business day, written by a person who has read your case.',
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
    thanks: {
      metaTitle: 'Message received, Ideasforge',
      metaDescription:
        'Your message reached us. We reply within one business day, and the person who replies is the one who would work on your case.',
      eyebrow: 'Received',
      title: 'We have it',
      body: [
        'We reply within one business day. The reply comes from a person who has read your whole case, the same one who would work on it if we go ahead.',
        'You will not get a confirmation email and we have not added you to any list. The next email you get from us will be the answer to what you told us.',
      ],
      extraPre: 'If something got left out, write to ',
      extraPost: ' and we will add it to the same thread.',
      blogPre: 'While you wait, ',
      blogLink: 'the blog',
      blogPost: ' covers how we build these systems and what went wrong along the way.',
    },
    footer: {
      tagline: 'Generative AI development in production for businesses. Measured every week.',
      menu: 'Menu',
      legal: 'Legal',
      privacy: 'Privacy Policy',
      cookies: 'Cookies Policy',
      cookiePrefs: 'Cookie preferences',
      contactHeading: 'Contact us',
      rights: 'Ideasforge. All rights reserved.',
      navGroups: [
        {
          heading: 'Services',
          links: [
            { label: 'AI agent development', href: '/en/services/ai-agent-development' },
            { label: 'AI workflow automation', href: '/en/services/ai-workflow-automation' },
            { label: 'Conversational AI', href: '/en/services/conversational-ai' },
            { label: 'Internal documentation', href: '/en/services/corporate-knowledge' },
          ],
        },
        {
          heading: 'Sectors',
          soloPie: true,
          links: [
            { label: 'AI for small business', href: '/en/smb' },
            { label: 'AI for real estate', href: '/en/real-estate' },
            { label: 'AI for accounting firms', href: '/en/accounting-firms' },
          ],
        },
        {
          heading: 'Cases',
          links: [
            { label: 'Plant assistant', href: '/en/cases/industrial' },
            { label: 'Savian', href: '/en/cases/savian' },
            { label: 'Stanton', href: '/en/cases/stanton' },
            { label: 'Barceloneta Premium', href: '/en/cases/barceloneta' },
            { label: 'Wazzy', href: '/en/cases/wazzy' },
          ],
        },
        {
          heading: 'Guides',
          links: [
            { label: 'Guide: AI agents', href: '/en/ai-agents' },
            { label: 'What an AI agent costs', href: '/en/ai-agent-development-cost' },
            { label: 'GDPR-compliant AI', href: '/en/gdpr-compliant-ai' },
            { label: 'EU AI Act', href: '/en/eu-ai-act-compliance' },
          ],
        },
      ],
    },
    pages: {
      enterprise: {
        tocHeading: 'What this page covers',
        metaTitle: 'AI Assistant over Your Internal Documentation, Ideasforge',
        metaDescription:
          'An assistant that answers in natural language by querying your documentation, wikis and systems. With the proof of an industrial case in production.',
        hero: {
          eyebrow: 'Enterprise offering',
          title: 'An AI assistant over your internal documentation and knowledge',
          subtitle:
            'A custom conversational assistant that understands natural-language questions and answers by querying your documentation and internal systems, with a reference to where each answer came from. When an answer is not enough, it walks the person through a step-by-step diagnosis or runs the action in the right system.',
        },
        sections: [
          {
            heading: 'Trapped knowledge costs money every day',
            part: 'Who this happens to',
            paragraphs: [
              'The symptom is familiar. Someone needs a technical fact, a procedure or the history of a problem, and the answer exists but is buried. They ask a colleague, the colleague asks the most senior person in the company and the veteran knows it by heart because nobody else is going to read the two hundred pages that hold it. Each of these queries steals minutes from two or three people at once, always the same ones.',
              'The real cost is not only the minutes. It is the dependence on a few people, which turns every absence and every retirement into an operational risk.',
            ],
          },
          {
            heading: 'A search box gives you ten documents, this gives you the answer',
            part: 'What we build',
            paragraphs: [
              'The difference from a search box is who does the final work. A search box returns ten documents where the answer might be, and the person still has to read them. This assistant answers the question, in the language of whoever asked, and attaches the reference of where the answer came from, so verifying costs one click instead of one afternoon.',
              'Underneath sits production-grade retrieval over your documentation, what the industry calls RAG, a search that feeds relevant fragments to the model so it answers from your sources rather than from its memory. A demo RAG finds the easy things. A production one has to find the hard things, dense documents, in-house vocabulary and half-formed questions typed between two tasks.',
            ],
          },
          {
            heading: 'When the answer needs live data',
            part: 'What we build',
            paragraphs: [
              'Some questions no document answers well, because the answer changes every hour. The state of a machine, the recent history of a fault, a production figure. For those, the assistant does not quote a two-year-old document. It queries the internal system that holds the fact and answers with what is true right now.',
              'That mix is what makes the assistant useful in real work, documentation for the knowledge that gets written once, systems for the knowledge that changes daily. And when the query calls for it, the assistant guides step by step, a diagnosis, a procedure, or executes the action directly on the systems you approve.',
            ],
          },
          {
            heading: 'Half a dozen agents, one conversation',
            part: 'What we build',
            paragraphs: [
              'Past a certain size, a single agent that does everything becomes one huge piece nobody can maintain. Our architecture for these cases is different. An orchestrator understands the intent of each question and routes it to the specialized agent for that domain, one per area of knowledge. In the industrial case behind this page, that orchestrator coordinates half a dozen specialized agents and the whole adds up to some 86 connected pieces. That case is told in full on <a class="link-inline" href="/en/cases/industrial">its own page</a>.',
              'The person asking sees none of this. They write their question and get their answer. The architecture matters for what it allows, adding a new domain without touching the others, measuring each agent separately and keeping a failure in one from dragging down the rest.',
            ],
          },
          {
            heading: 'The two kinds of "no" a serious assistant tells apart',
            part: 'How the assistant earns trust',
            paragraphs: [
              'Trust is not earned by answering well alone. It is earned by answering well and refusing well. There are two different kinds of "no". The "this is outside the product", answered instantly with catalog text, no search spent. And the "this should be documented and is not", said only after genuinely searching, and leaving a trace, because it is a task for whoever owns the documentation.',
              'Confusing them is expensive in both directions, and separating them takes more engineering than it seems.',
            ],
          },
          {
            heading: 'When the clarification does not need the model',
            part: 'How the assistant earns trust',
            paragraphs: [
              'One design detail that shows how we think. When the assistant offers several options, the person’s short reply, a number, a bare term, a "the second one", is resolved without calling the model, through a simple rule that recognizes those terms and those numbers and that expires after fifteen minutes. It looks like a minor saving and is three things at once, an instant response, one less call to pay for and one less message exposed to malicious instructions hidden in text.',
              'The general rule behind the detail is that the model gets used where it earns its place, understanding open language, and avoided where an ordinary program does the same job faster, cheaper and without surprises.',
            ],
          },
          {
            heading: 'Everyone sees what their job allows',
            part: 'How the assistant earns trust',
            paragraphs: [
              'An assistant that reads all of the company’s documentation raises an obvious question, who may ask it what. Our answer is that the assistant inherits the permissions that already exist. Retrieval respects the role of whoever asks, so nobody receives in an answer a fragment they could not open by hand. And when the assistant queries an internal system, it travels with the person’s identity, not with an all-seeing robot account.',
              'Every decision is recorded as well, what was understood, where it was routed, what was answered. That record is never consulted during execution.',
            ],
          },
          {
            heading: 'Enterprise guarantees',
            part: 'Guarantees, capabilities and cost',
            paragraphs: [
              'The assistant runs on your infrastructure, your cloud or your own servers, with the call to the language model as the only external piece, with your organization’s accounts for access and your data wherever you decide. The repository is in your name from day one. And quality is measured all the time, with a battery of real cases that blocks any change that degrades the system and a weekly watch on what is live.',
              'A system of this size is quoted per project, because the cost depends on your sources, your systems and how much validation you demand. For how the rules of European data protection shape all of this, the full story is on its own page.',
            ],
            link: { label: 'GDPR-compliant AI on infrastructure you own', href: '/en/gdpr-compliant-ai' },
          },
          {
            heading: 'Technical capabilities',
            part: 'Guarantees, capabilities and cost',
            kind: 'lattice',
            paragraphs: [
              'For the technical review, this is what sits underneath, one line per piece.',
            ],
            bullets: [
              'Multi-agent architecture. An orchestrator understands intent and routes to specialized agents. It grows domain by domain instead of turning into one unmanageable piece.',
              'Reliable retrieval. The search that feeds the model is designed for complete, correct answers, without letting internal detail reach the wrong reader.',
              'Measurable quality. Test batteries verify before every change that the assistant still understands and answers correctly.',
              'Integration with your systems. ERP, databases, your organization’s accounts and industrial systems, under each person’s own permissions.',
              'Decision log. Every interaction leaves a written record of what was understood and why the answer was given, auditable afterwards.',
              'Data sovereignty. Your cloud or your servers, your identity, your data where you decide and the repository in your name.',
            ],
          },
        ],
        faqHeading: 'What gets asked before starting',
        faq: [
          {
            q: 'How much does a corporate knowledge assistant cost?',
            a: 'It is quoted per project, because the cost depends on the volume and state of your sources, how many systems get integrated and how much validation you demand before going live. Multi-agent systems of this size sit outside the standard ranges we publish for single-job agents. The price structure, build plus monthly operation, is the same, and the cost guide breaks it down.',
          },
          {
            q: 'What about questions the documentation does not cover?',
            a: 'The assistant says so, plainly and with a trace. We separate "outside the product" from "missing documentation", each with its own answer and its own work queue, so real gaps end up as tasks for whoever owns the documentation. An assistant that fills gaps with false confidence is exactly what we refuse to build.',
          },
          {
            q: 'Will employees see documents that are not theirs to see?',
            a: 'No. The search that feeds the assistant respects each role’s permissions, so a restricted document never enters the context the model sees before answering. And system queries travel with the identity of the person asking, under their usual permissions. If someone cannot open a record by hand, their assistant cannot either.',
          },
          {
            q: 'How does it stay current when documentation changes?',
            a: 'Documents are processed again whenever they change, and quality is watched in two ways, a battery of real cases before every change we ship and a weekly probe on the live system. When something stops being found or understood, it shows in the metrics before it becomes a complaint.',
          },
          {
            q: 'Does it handle our in-house vocabulary, and several languages?',
            a: 'Your jargon is exactly what we calibrate retrieval against, using real questions from your people, with real cases from your people rather than lab examples. The languages you need are defined during exploration.',
          },
          {
            q: 'Can it run without leaving our infrastructure?',
            a: 'The full system runs on infrastructure you own, cloud or on-premise servers. The call to the language model is the only external piece, it runs under agreements and settings you approve, with training on your content excluded. Deploying the model itself on your hardware is a different project we have not done in production, and if it is a requirement it belongs in the first conversation.',
          },
          {
            q: 'How long does it take?',
            a: 'Exploration, which is the first phase of the project, answers that with your sources in front of us, not before. The shape of the project is constant though, a first bounded knowledge domain that reaches production with its measurement in place, then growth domain by domain. The industrial case grew exactly that way.',
          },
        ],
        cta: {
          heading: 'Interested in this for your company?',
          body: 'Tell us your challenge. If we don’t see a return, we’ll tell you.',
          button: 'Tell us your challenge',
        },
      },
      smb: {
        metaTitle: 'AI for Small Business in fixed-scope packages, Ideasforge',
        metaDescription:
          'AI for small business without the tool list: four fixed-scope packages, published price ranges and proof measured at businesses your size.',
        hero: {
          title: 'AI for your small business, one outcome at a time',
          subtitle:
            'Four fixed-scope packages built with the same engineering as our larger projects, priced before we start and measured once they run.',
          cta: 'Tell us your challenge',
        },
        stats: [
          {
            value: '+3 hours',
            label: 'a day recovered at a rental agency that used to check every inquiry by hand',
          },
          {
            value: 'Hundreds',
            label: 'of appointments a month handled on WhatsApp by our own product, running at clinics',
          },
          {
            value: '€2,500',
            label: 'is where a fixed-scope build starts, with the full ranges published in the pricing guide',
          },
        ],
        sections: [
          {
            heading: 'The tool lists answer the wrong question',
            id: 'the-problem',
            paragraphs: [
              'Search “AI for small business” and what comes back is lists. The biggest names in software publish rankings of tools, one for marketing, one for bookkeeping, one more for answering messages. None of it is wrong. It just answers a question you were not asking.',
              'The question that decides whether AI pays in a small business runs the other way around. Not which tools exist, but which of your processes repeats often enough, and costs enough each time, to pay for its own automation. The best AI for a small business is the one attached to that number.',
              'The official statistics show who is getting that answer right. Eurostat, the statistics office of the European Union, measured that one in five European companies with ten or more employees used AI technologies in 2025, up from 13.5% the year before. Split by company size it stops being one story, 17% of small companies against 55% of large ones.',
              'Large companies are not three times more convinced than you are. They can afford systems built around their own operations, with engineering behind them, and that is the kind of AI that moves a business number. <strong>We package the engineering large companies get, for one process at a time and with the price said first.</strong>',
            ],
          },
          {
            heading: 'The difference between using AI and having a system',
            paragraphs: [
              'By August 2025, 58% of small businesses in the United States said they used generative AI, more than double the 23% of two years earlier. The figure comes from the U.S. Chamber of Commerce, which has tracked it since 2023. If your team drafts emails or summarizes documents with a chat tool, you are already in that majority.',
              'That kind of AI helps whoever is holding it, and only while they hold it. A subscription answers when somebody asks, and in a team of five nobody’s job is to sit and ask all day.',
              'A system is a different purchase. It watches the channel where the work arrives, does the task, checks its own output and leaves a record you can audit. <strong>A system does not wait to be prompted, and it is measured against a number agreed before it was built.</strong>',
              'Most AI software for small business is the first kind, and it is fine at what it does. What we build is the second kind, cut to the size of one process and one result.',
            ],
          },
          {
            heading: 'Four packages, one outcome each',
            paragraphs: [
              'Each package is scoped to one concrete outcome and quoted at a fixed price before anything starts. These are the four we offer.',
            ],
            kind: 'lattice',
            bullets: [
              '<strong>24/7 customer service.</strong> An agent on WhatsApp or your website that answers the usual requests at any hour, resolves the ones it has been trusted with and hands the rest to your team with the context already gathered.',
              '<strong>Lead qualification.</strong> It holds the first conversation, asks the questions you define and applies your criteria. Your team receives a summary with the reasons, and the final say on every applicant stays with a person.',
              '<strong>Document automation.</strong> Invoices, receipts and forms that arrive by chat or email and land as checked rows where your team already works. If that place is a spreadsheet, it stays a spreadsheet.',
              '<strong>Support and maintenance.</strong> Someone watching the system every week and answerable when it needs attention. No change ships without passing the test suite first.',
            ],
          },
          {
            heading: 'Measured at businesses your size',
            paragraphs: [
              'Stanton manages rental properties. The electricity, gas and water bills their tenants sent in were typed into a spreadsheet by hand, a minute each. Today a chat the team already used receives them, a reading layer with a language model turns each one into a checked row in that same spreadsheet and <strong>98% of the invoices go through with nobody touching them</strong>. The client has kept commissioning more processes since.',
              'Barceloneta Premium rents apartments in Barcelona and receives dozens of WhatsApp inquiries a day. Checking each one used to take five to ten minutes of somebody’s attention. Now an agent holds the conversation, gathers what the agency needs to know and hands the team an email summary with the reasons already written. <strong>The agency got more than three hours a day back.</strong>',
              'The third system is our own product. Wazzy books, moves and cancels appointments on WhatsApp for clinics, and it handles hundreds of appointments a month. In the entire history of the product, no appointment has ever been booked twice. We run it ourselves, with our own money on the line, which is where the maintenance discipline this page describes was learned.',
            ],
          },
          {
            heading: 'When we tell you not to buy',
            paragraphs: [
              'Some projects are born from a pain and some are born from a demo. We wrote about the second kind and called it the shiny toy, the project nobody suffers when it is missing, whose gain never had a number and where the AI sits in the headline instead of in the result.',
              'There is also the case where the right answer is simpler than an agent. If your process follows clear rules and nothing in it needs interpreting, classic automation without a model does the job for less money and with no model to keep an eye on. We build that too, and we say so when it is the better buy.',
            ],
            link: {
              label: 'The shiny toy, told in full',
              href: '/en/blog/the-shiny-toy',
            },
          },
          {
            heading: 'The price, before you ask',
            paragraphs: [
              'A fixed-scope build falls between €2,500 and €10,000, and keeping it watched and maintained costs between €150 and €500 a month. They are the same ranges we publish for every project, broken down in the pricing guide.',
              'What the model consumes and what the infrastructure costs are not inside that fee. Both run on accounts opened in your company’s name, so those bills arrive at your desk, visible line by line, and never pass through us.',
              '<strong>The fee has no lock-in.</strong> You pay for the month you get and stop when you decide, and what was built does not switch off when you do, because the repository and the infrastructure were yours from the first day.',
            ],
            link: {
              label: 'The pricing guide, range by range',
              href: '/en/ai-agent-development-cost',
            },
          },
          {
            heading: 'How a project starts',
            paragraphs: [
              'With one process and one number. Before anything is built we agree what the system should save and how we will measure it, so the decision to extend rests on evidence instead of on enthusiasm.',
              'The first step is a pilot, paid and small, and its price counts toward the final project if you go ahead. With the data, the access and the task well defined, two weeks for that pilot is realistic. When one of the three is missing, we say which one and what it takes to get there, instead of promising a date we do not control.',
            ],
          },
        ],
        faqHeading: 'Questions from small businesses',
        faq: [
          {
            q: 'Is our company too small for this?',
            a: 'What decides it is not headcount, it is whether one process repeats often enough to pay for its own automation. The rental agency and the property manager behind the numbers on this page are small teams, and the clinics our product runs in are neighborhood businesses.',
          },
          {
            q: 'Do we have to change the tools we use?',
            a: 'No. The work keeps arriving through whatever your team already uses to move it around, and the results land in the files and programs you already open every morning. A tool that forces new habits on a four-person team ends up quietly abandoned.',
          },
          {
            q: 'What does the monthly fee pay for, exactly?',
            a: 'The monitoring and the maintenance of that month: the weekly check in production and someone answerable when the system needs attention. Any change has to pass the test suite before it reaches your users.',
          },
          {
            q: 'Our data lives in spreadsheets. Is that a problem?',
            a: 'It is the normal case, not a handicap. The two client systems on this page read from a chat and write to a spreadsheet. What we do check before starting is that the data the process needs exists somewhere at all, because that is the one thing a build cannot invent.',
          },
          {
            q: 'How long until something is running?',
            a: 'Two weeks for the pilot is a realistic figure, with the process chosen, the data reachable and the task defined. It is the real process on your real cases, measured, not a prepared demonstration, so what you decide at the end is backed by your own numbers.',
          },
          {
            q: 'And if it turns out the numbers are not there?',
            a: 'Then you hear it from us before we build, or at worst at the end of the pilot, and stopping there costs you the pilot and not the project. What we will not do is deliver something unmeasured and call it a success.',
          },
        ],
        cta: {
          heading: 'What would you stop doing by hand first?',
          body: 'Describe the task that repeats most and how often it comes around, and leave the technology to us. We answer within one business day.',
          button: 'Tell us your challenge',
        },
      },
      realEstate: {
        metaTitle: 'AI for Real Estate and Property Management, Ideasforge',
        metaDescription:
          'AI for real-estate agencies and property managers. An agent qualifies rental requests 24/7 and the utility invoices tenants send in stop being typed by hand.',
        hero: {
          title: 'AI for real estate, from the first inquiry to the last invoice',
          subtitle:
            'An agency has two bottlenecks, the inquiries arriving at every hour and the paperwork piling up behind the door. We have built for both, and both are running in production.',
          cta: 'Tell us your challenge',
        },
        stats: [
          {
            value: '5 to 10 min',
            label: 'was what checking a single incoming inquiry used to cost, dozens of times a day',
          },
          {
            value: '+3 hours',
            label: 'a day the agency got back, on handling incoming requests alone',
          },
          {
            value: '98%',
            label: 'of the utility invoices go through untouched at the property manager we built for',
          },
        ],
        sections: [
          {
            heading: 'Two bottlenecks at opposite ends of the agency',
            id: 'the-problem',
            paragraphs: [
              'The two bottlenecks of an agency sit at opposite ends of the same business. One faces outward, the inquiries arriving at every hour from people who want to see a flat. The other faces inward, the paperwork that piles up once they have moved in.',
              'The industry is trying things. AppFolio, a property management software company, surveyed more than two thousand professionals for its 2025 benchmark report and found AI use up from 21% to 34% in a single year, with the share saying they had no plans at all dropping from 51% to 37%.',
              'An adoption figure tells you the industry is buying. It does not tell you which of the two bottlenecks anybody cleared.',
              '<strong>We build for one bottleneck at a time, and we measure what it costs you today before anything gets built.</strong> The two systems on this page are exactly that, one at an agency that was drowning in inquiries and one at a property manager that was drowning in invoices.',
            ],
          },
          {
            heading: 'The inquiries, and what an hour of silence costs',
            paragraphs: [
              'Someone looking for a flat is not writing only to you. They write to every listing that fits, at the same time, and the conversation goes to whoever comes back first with something useful.',
              'That an inquiry goes cold is not a hunch, it was measured back in 2011 across more than a million of them, and the numbers are in the blog. What matters on this page is the arithmetic on your side of it.',
              'Barceloneta Premium, an agency in Barcelona, was receiving dozens of WhatsApp messages a day. Checking each one took five to ten minutes before anybody knew whether it was worth a visit.',
              '<strong>Those minutes were not spent selling. They were spent finding out whether there was anything to sell.</strong>',
            ],
            link: {
              label: 'The numbers on a cooling inquiry',
              href: '/en/blog/ai-agent-real-estate',
            },
          },
          {
            heading: 'What the agent does with an inquiry',
            paragraphs: [
              'It holds the conversation in the language the person wrote in, and gathers what the agency needs to know: why they are asking, what budget they have and what documentation they can produce.',
              '<strong>The criteria are not ours and they are not buried inside the system.</strong> They live in a spreadsheet on the agency’s own drive and the agency edits them. When the rules for a suitable applicant change, nobody has to call us first.',
              'What the team receives is an email with the verdict and a paragraph explaining it. Somebody reads three lines and decides whether to book the visit. <strong>The judgment stays with a person, which is the right way round and also what the rules on automated decisions expect.</strong>',
              'The person who wrote in gets an answer straight away, at any hour, including the rental peaks where they used to sit waiting. The agency got back more than three hours a day.',
            ],
          },
          {
            heading: 'The version we threw away',
            paragraphs: [
              'The first one we built followed the pattern almost everything sold as an agent is built on, a model with tools available to it and instructions to use them when needed.',
              '<strong>It often did not use them.</strong> Nothing failed in a way anyone could look up afterwards. The model decided it could answer without checking, so it either made the answer up or told a real applicant it could not go on when it perfectly well could.',
              'The rebuild moved the bookkeeping into code. A state machine tracks what has already been gathered and which phase the questions are in, and the model routes to whatever tool that phase calls for. <strong>The code keeps count and the model reads people.</strong>',
              'We tell you this because it is the failure that a demonstration never shows. An agent that answers confidently without checking looks better in a meeting than one that stops.',
            ],
          },
          {
            heading: 'AI for property management, behind the door',
            paragraphs: [
              'The second bottleneck has no conversation in it at all. Stanton manages rental property, and the electricity, gas and water bills their tenants sent in were typed into a spreadsheet by hand, one document at a time.',
              'Each one cost a minute of typing. Today they arrive through the chat the team already used, a reading layer with a language model turns each into a checked row in that same spreadsheet, and <strong>98% go through without anybody touching them</strong>.',
              'The rest stops and reaches a person with the document alongside and the reason pointed at. <strong>Stopping is the design and not the failure.</strong> A new format read with the old template does not throw an error, it hands you a wrong number that looks convincing, and we have watched that happen.',
              'Nobody had to learn a new tool. The client has kept commissioning more back-office processes since, which is the signal that counts, because what gets used gets extended.',
            ],
            link: {
              label: 'The document flow, step by step',
              href: '/en/services/ai-workflow-automation',
            },
          },
          {
            heading: 'What it will not do',
            paragraphs: [
              '<strong>If someone stops replying, the conversation stays where it is.</strong> There is no chasing sequence. That was the agency’s decision and we think it was the right one, because pursuing somebody who has gone cold rarely pays for the nuisance it causes.',
              'It does not write into your CRM when your CRM only lets you read. That is the case at Barceloneta, so the verdict goes out by email, which is where the team opens things anyway.',
              'And it does not decide who gets the flat. It gathers, applies the criteria you wrote and explains its reasoning, and a person signs it off.',
            ],
          },
          {
            heading: 'What it costs',
            paragraphs: [
              'A system of this size falls between €2,500 and €10,000 to build, with monthly operation between €150 and €500. The full breakdown of what moves those figures is in the pricing guide.',
              '<strong>That monthly fee pays for the monitoring and the maintenance, not the consumption.</strong> Model usage and infrastructure run in accounts under your company’s name, so those bills are yours to see and they do not pass through us. There is no lock-in on the fee, and the repository is yours from the first day.',
            ],
            link: {
              label: 'How much an AI agent costs',
              href: '/en/ai-agent-development-cost',
            },
          },
          {
            heading: 'Where you start',
            paragraphs: [
              'With whichever of the two bottlenecks is costing you more this month. Count the minutes one inquiry takes and multiply by how many arrive, or count the documents somebody retypes in a week. That number is the budget ceiling and the yardstick at the same time.',
              'With the data, the access and the task defined, two weeks for a pilot is realistic. The pilot is paid and its price counts toward the project if you carry on, so what you are buying at that point is a decision backed by your own numbers.',
            ],
          },
        ],
        faqHeading: 'Questions from agencies and property managers',
        faq: [
          {
            q: 'Do we have to change our CRM or our property management software?',
            a: 'No. We connect to what you already run and the results land where your team already works, which in the two systems on this page means a chat they already used and a spreadsheet they already had. Where a system only allows reading and not writing, we say so and the output goes somewhere else.',
          },
          {
            q: 'Who decides whether an applicant is suitable?',
            a: 'A person at your agency, with the summary and its reasoning in front of them. The agent gathers the information and applies the criteria you wrote, and it never issues the final word on its own. Beyond being the sensible arrangement, it is what the rules on decisions taken purely by automated means expect.',
          },
          {
            q: 'Can we change the qualifying criteria ourselves?',
            a: 'Yes, and that was deliberate. They live in a spreadsheet on your own drive rather than inside the system, so your team edits them the day the requirements change without opening a ticket with us.',
          },
          {
            q: 'What happens with the inquiries that arrive at three in the morning?',
            a: 'They get answered. That is most of the point, because the person writing at three in the morning is writing to several listings at once and the useful reply is the one that arrives first. Anything that needs judgment waits for your team in the morning, already gathered and summarized.',
          },
          {
            q: 'Does this work for sales as well as rentals?',
            a: 'The agency behind this page is extending the same base from rentals to sales and to internal processes. That is the pattern we recommend, start with the process eating the most hours, measure it and grow from there once it has proved itself.',
          },
          {
            q: 'We are a small agency. Is this oversized for us?',
            a: 'Both systems on this page run at small teams. What decides it is not headcount, it is whether the same task repeats often enough to pay for its own automation, and dozens of inquiries a day at five to ten minutes each answers that question quickly.',
          },
        ],
        cta: {
          heading: 'Which of the two is costing you more?',
          body: 'Tell us where the hours go, the inquiries or the paperwork, and we will tell you whether we see a return. We reply within one business day.',
          button: 'Tell us your challenge',
        },
      },
      accounting: {
        metaTitle: 'AI for Accounting Firms: invoices read and checked, Ideasforge',
        metaDescription:
          'Invoices, receipts and delivery notes your team stops typing. A system that reads them, checks they add up and only escalates what is doubtful.',
        hero: {
          eyebrow: 'Accounting firms',
          title: 'Your clients’ invoices, read and checked without typing',
          subtitle:
            'A system that reads every document coming in, checks the data adds up before treating it as good and only escalates to a person what needs judgment.',
          cta: 'Tell us your case',
        },
        stats: [
          {
            value: '98%',
            label: 'of invoices go through untouched, in the system we run in production',
          },
          {
            value: '1 minute',
            label: 'of typing was what each of those invoices cost before the system existed',
          },
          { value: '2 weeks', label: 'for a pilot, with the data and the access ready' },
        ],
        sections: [
          {
            heading: 'The bottleneck was never reading the invoice',
            id: 'the-problem',
            paragraphs: [
              'An accounting firm does not receive one kind of document, it receives all of them. Utility bills, supplier invoices, expense receipts, delivery notes that have to be matched against an order. Every client brings their own issuers and every issuer puts the total wherever they felt like putting it.',
              'Reading that paper stopped being hard a long time ago. OCR, optical character recognition, has been turning images into text for decades. A language model now interprets that text the way someone who knows the trade would.',
              '<strong>What still costs you is being able to trust what was read without opening the document again.</strong> An amount extracted wrong that nobody catches does not save you a minute, it costs you an accounting correction three months later.',
              'That work is easy to measure. In the case behind this page each invoice cost a minute of typing, so a firm handling four hundred invoices a month spends close to seven hours every month copying data that was already written down. Put your own number in and you get your own figure.',
            ],
          },
          {
            heading: 'Why the demo always works',
            paragraphs: [
              'Any vendor will show you an invoice read without a single error. And it will genuinely work, because the invoice in the demo is usually a native PDF, clean, generated by a program.',
              'Yours are not always like that. They arrive scanned from a folded original, photographed on a phone in a badly lit hallway, forwarded three times and compressed along the way.',
              'That distance has been measured. <strong>PureDocBench</strong>, a benchmark published in May 2026 by researchers at the Institute of Automation of the Chinese Academy of Sciences, took 1,475 annotated pages across ten domains and presented each one in three versions, from clean to degraded the way it arrives in real life.',
              'On the genuinely degraded ones, systems specialized in documents lost more than fourteen points against their score on clean pages. And the headline of the study is worth keeping. <strong>The best system measured scores 74 out of 100.</strong> Its authors conclude that evaluating only on clean documents misleads you when the decision is whether something can be deployed.',
              'We do not tell you this to put anyone off. We tell you because it points at where the real work is, which is not the reading but what the system does when the reading comes out rough.',
            ],
          },
          {
            heading: 'What AI for accounting firms covers, and what it does not',
            paragraphs: ['What we automate in an accounting firm and what we leave where it is.'],
            kind: 'checklist',
            bullets: [
              'Utility bills and supplier invoices. They come in through the channel your team already uses and come out as normalized rows wherever you work.',
              'Receipts and expense slips, photographed by whoever generates them.',
              'Delivery notes that have to be matched against an order before anything is treated as good.',
              'Scanned forms that someone types in field by field today.',
              'We do not do the bookkeeping or decide the entry. The system leaves the data checked, with its link back to the original document.',
              'We do not replace your practice management software. We connect to what you already have. If the destination is a spreadsheet, it is a spreadsheet.',
              'We do not certify anything with a tax authority. This is not invoicing software and it does not replace it.',
            ],
          },
          {
            heading: 'Supplier invoices, receipts and delivery notes break differently',
            paragraphs: [
              'The list above reads as though the three were the same job on different paper. They are not, and anyone who has tried to automate them knows it. <strong>Each type fails for a different reason, so each one gets handled differently.</strong>',
              'A <strong>supplier invoice</strong> arrives in a hundred layouts with the total wherever its issuer decided to put it. There the problem is interpretation. It is where a language model brings what no template ever could.',
              'An <strong>expense receipt</strong> is almost never a PDF. It is a photograph of a crumpled thermal slip, taken in a hurry in a doorway with half the light you would want. The problem stops being interpretation and goes back to being reading, which is exactly where tools fall over and where the checking afterwards matters most.',
              'A <strong>delivery note</strong> is like neither of them, because the question to answer is not what it says. It is whether what it says matches what was ordered. That is not extraction, it is matching two documents. A system that only knows how to extract will wave it through without having checked anything.',
            ],
          },
          {
            heading: 'From OCR to the ledger, and where we stop',
            paragraphs: [
              'The data comes out checked, with its link back to the original document, in the place your team already works from. That is as far as we go.',
              '<strong>The entry is yours to make. That is not a limitation on our side, it is a line drawn on purpose.</strong> Classifying a cost is a decision with tax judgment behind it, one that changes from client to client and that sometimes rests on a conversation the machine was never part of.',
              'A wrong entry also has an unpleasant property: it does not show up when you make it. It shows up months later, sometimes in front of an inspection. We would rather leave the data spotless at the door and have the decision signed by whoever answers for it.',
              'What you do save is everything that came before, which is where the hours were. Nobody keys in amounts, nobody looks up the same invoice number twice and nobody finds out at closing that a document was missing.',
            ],
          },
          {
            heading: 'What happens when something does not add up',
            paragraphs: [
              'A system that always answers is a system you cannot trust. Ours checks before treating a value as good. What does not pass the check stops.',
              'Stopping is not the failure, it is the design. <strong>A new format processed with the old template produces data that looks fine.</strong> That is worse than not processing it, because nobody reviews what looks fine, and we have watched it happen.',
              'When something stops, it reaches a person with the document in front of them and the reason pointed at. Not as a loose alert mid-afternoon that somebody then has to go and investigate.',
            ],
            link: {
              label: 'The full flow, step by step',
              href: '/en/services/ai-workflow-automation',
            },
          },
          {
            heading: 'And if e-invoicing makes all this obsolete',
            paragraphs: [
              'It is the first objection from anyone who works with tax paperwork every day. And it is a fair one, so the answer comes in two halves.',
              'The ground is moving across Europe in one direction. Council Directive (EU) 2025/516, adopted in March 2025, sets July 2030 for structured electronic invoicing and digital reporting on trade between EU countries.',
              'Spain, where we build, is further along and makes a useful preview. VeriFactu becomes mandatory for companies on 1 January 2027 and for everyone else on 1 July that year. The regulation for business-to-business electronic invoicing already exists, Royal Decree 238/2026, but its deadlines do not start counting until a ministerial order that is still a draft. <strong>Anyone giving you a firm date for that is quoting a proposal, not the law.</strong>',
              'The first half of the answer is yes, for part of the paper this expires in the medium term. Anyone telling you otherwise is selling you something. The obligation covers invoices between businesses and professionals, and those will end up arriving structured at source.',
              'The second half is everything else. Invoices issued to individuals fall outside it. So do receipts, delivery notes, the supplier abroad and the transition years when both worlds will live side by side.',
              'And when the data does arrive clean at source, it will still need checking that it adds up, because clean in format is not the same as correct.',
            ],
            link: {
              label: 'We go into it in the blog',
              href: '/en/blog/invoice-automation-ocr-ai',
            },
          },
          {
            heading: 'What we have measured',
            paragraphs: [
              'Stanton manages rental property and it was the first place we built this. The electricity, gas and water bills for each tenant were entered by hand, document by document. Each one cost a minute of typing.',
              'Today the team forwards them through the chat they already used, the system reads them and each one lands as a normalized row in the same spreadsheet they always had. <strong>98% goes through untouched.</strong> The rest escalates with the document alongside.',
              'Nobody had to learn a new tool. And the client has already commissioned more back-office processes, which is the signal that actually counts, because what gets used gets extended.',
            ],
          },
          {
            heading: 'Where you start',
            paragraphs: [
              'With one process, not all of them. The one that hurts most and repeats most, which in an accounting firm tends to be the same one across almost every client.',
              'With the data, the access and the task properly defined, a pilot in two weeks is realistic. Before we start it we tell you what we expect it to save and how we are going to measure it, so the word “automated” comes with a number behind it.',
            ],
          },
          {
            heading: 'What it costs',
            paragraphs: [
              'A system this size falls in the range we break down in the pricing guide, with a fixed build and a monthly fee while it is running.',
              '<strong>That fee pays for the monitoring and the maintenance, not the consumption.</strong> The model calls and the infrastructure go into accounts in your name, so you see what you spend and it does not go through us.',
            ],
            link: {
              label: 'How much an AI agent costs',
              href: '/en/ai-agent-development-cost',
            },
          },
        ],
        faqHeading: 'Questions from accounting firms',
        faq: [
          {
            q: 'Does it work if every client sends us invoices a different way?',
            a: [
              'Yes, and that is the normal case. The entry point is the channel your team already uses, a forwarded email or a chat, so nobody has to change what they do today.',
              'The variety of issuers is not the problem either. What gets fixed is not the input format, it is the output structure, the fields that have to come out of every document for the data to be usable.',
            ],
          },
          {
            q: 'What happens the day a supplier changes the format of their invoice?',
            a: [
              'The system checks the document matches what is expected before extracting anything. If it does not match, it is not processed. It stops and a person gets the alert with the document in front of them.',
              'Stopping is the right answer. A new format read with the old template does not throw an error, it hands you a wrong value that looks convincing.',
            ],
          },
          {
            q: 'Do we have to change our practice management software?',
            a: 'No. We connect to what you already have and the data lands where your team works today, whether that is an accounting package or a spreadsheet. Forcing people to learn a new tool is the fastest way for an automation to end up unused.',
          },
          {
            q: 'Does this replace our invoicing software?',
            a: 'No, and it is worth saying plainly. What we build reads the documents coming in and leaves their data checked in your systems. Issuing invoices that comply with your tax authority is your invoicing software’s job, and this neither replaces nor certifies it.',
          },
          {
            q: 'How long until it is running?',
            a: 'Two weeks for a pilot is realistic when the process is scoped and the access is ready. A pilot is not a demo, it is the real process with real documents and its measurement alongside, so the decision to extend comes with a number.',
          },
          {
            q: 'And if it turns out not to be worth it?',
            a: 'We tell you before charging for it. If we look at the process and cannot see a return, we say so and we stop. A project that does not save measurable hours ends up abandoned, and that costs more than never having built it.',
          },
        ],
        cta: {
          heading: 'How many invoices does your team type today?',
          body: 'Tell us which process eats the most hours, not the technology you think fixes it. We reply within one business day with a first read on your case.',
          button: 'Tell us your challenge',
        },
      },
      about: {
        nav: false,
        metaTitle: 'About us, Ideasforge',
        metaDescription:
          'We design, build and maintain AI agents and process automation that reach production. Five systems running today with real users.',
        hero: {
          title: 'A team that maintains what it builds',
          subtitle:
            'If your idea is not viable, we will say so before we invoice it. If it has legs, we work alongside you until it runs in production.',
          cta: 'Tell us your challenge',
        },
        sections: [
          {
            heading: 'What we do',
            paragraphs: [
              'At Ideasforge we design, build and maintain AI agents and process automation. We work with what you already have and connect to your systems and to the tools your people use every day, rather than asking you to change how you work so it fits how we work. The repository and the infrastructure are in your name from day one, because a system you depend on has to be yours. Five of our systems run today with real users across industry, agriculture, real estate, healthcare and services. The test we judge them by has not changed, what the business gains rather than what looks good in a demo.',
            ],
            link: { label: 'See the services', href: '/en/#servicios' },
          },
        ],
        cta: {
          heading: 'Shall we talk about your case?',
          body: 'Write to us about the problem you have right now, not the technology you think fixes it. We reply within one working day.',
          button: 'Tell us your challenge',
        },
      },
      aiGuide: {
        tocHeading: 'What you will see in this guide',
        metaTitle: 'What an AI Agent Is and How It Works in a Company, Ideasforge',
        metaDescription:
          'What an AI agent is, the types that exist, what companies actually use them for and where agentic AI fits. Plain English, from systems running in production.',
        hero: {
          eyebrow: 'Guide',
          title: 'AI agents, what they are and what they do for your company',
          subtitle:
            'What an AI agent is, the types that exist, what companies actually use them for, what goes wrong and what to ask before you hire anyone.',
        },
        sections: [
          {
            heading: 'What an AI agent is',
            id: 'what-it-is',
            part: 'The short answer',
            paragraphs: [
              '<strong>An AI agent is a program that understands what you ask of it and works out on its own what to do about it.</strong> Inside it carries a language model, which is the part that understands, plus a list of actions someone has authorized, like checking a calendar, searching a manual or filing a record.',
              'What sets it apart from an old-style bot is who decides the answer. The bot’s answer was written before anyone asked. The agent’s is decided in the moment, from whatever it was asked.',
              'And the difference that matters inside a company is what it works on. A general-purpose assistant stops at what it ships with. A company agent goes into your systems, with the permissions of the person using it, and inside the limits you approve.',
            ],
          },
          {
            heading: 'Where generative AI ends and agentic AI begins',
            id: 'agentic-ai',
            part: 'The short answer',
            paragraphs: [
              'Search around this subject and you will run into two labels the market never bothers to explain. <strong>Generative AI produces content, anything from a paragraph to a piece of code.</strong> Agentic AI uses those same models to act: it decides the steps, calls the tools it needs, checks what comes back and finishes the task.',
              'The shortest example we have. Generative drafts the email. Agentic writes it, checks the calendars of the people invited and sends the invitation.',
              'That extra capability brings an extra need for control. It is the reason the rest of this guide talks so much about measurement. <strong>A system that only writes gets corrected by reading it before you send it. One that acts has already touched your systems by the time anyone notices.</strong>',
            ],
          },
          {
            heading: 'Types of AI agents',
            part: 'Types and uses',
            kind: 'lattice',
            paragraphs: [
              'Not all agents decide the same way, and that accounts for much of the price difference, both what one costs to build and, above all, what it costs to keep running. Three categories will place almost anything you are offered.',
            ],
            bullets: [
              '<strong>The reactive kind.</strong> Answers the same way to the same situation every time, following fixed rules. A thermostat that turns the heating on when the temperature drops. Cheap and predictable, though it only ever serves what someone worked out in advance.',
              '<strong>The planning kind.</strong> Takes a goal and works out the steps to get there itself, redoing them when something goes sideways. Ask it for a quote and it checks the catalog, looks at stock and flags a missing part. <strong>This is what gets sold today as an AI agent, ours included.</strong>',
              '<strong>The learning kind.</strong> Would improve by itself, from its own experience, with nobody touching it again. It is the one that turns up most in promises and least in production.',
            ],
          },
          {
            heading: 'When they tell you it learns on its own',
            part: 'Types and uses',
            paragraphs: [
              'That third kind deserves a warning of its own, because “it learns from your data” is one of the most repeated phrases in this industry and it almost never means what it sounds like. <strong>An agent in production does not improve on its own.</strong> It improves when a person changes its instructions, tidies the data or adds cases to the test suite. Somebody always carries that change out.',
              'If you are told it learns on its own, these are the three questions worth asking: what exactly changes, who carries it out, and how anyone checks that nothing else got worse. They work just as well put to the supplier who is going to build the thing as asked of yourself, to understand better what is being built.',
            ],
          },
          {
            heading: 'Where an agent fits among the ways to automate',
            id: 'shapes',
            part: 'Types and uses',
            kind: 'checklist',
            formasDiagram: true,
            paragraphs: [
              'Almost any proposal you receive fits one of these five shapes. It is worth knowing which one you are being sold, because what really drives the cost of testing it, watching it and fixing it when it breaks is the shape, more than the type of agent inside. <strong>The first two carry no agent at all.</strong> The last three are what the market calls agentic AI.',
            ],
            bullets: [
              'A fixed flow with no model. Steps run in a set order and rules decide the branches. Your ERP and your integration platform already do this, and it is the cheapest thing that works.',
              'A fixed flow with model checkpoints. The same dependable flow, with the model called only at the two or three points where something has to be read or interpreted. It is the most common shape in real company systems today, and the first one we consider.',
              'An agent. It gets a goal, a closed set of actions and its limits. From there it decides which action comes next as it goes. It earns its keep when the route genuinely changes with every case.',
              'An agent inside a flow. The route stays fixed on the outside and one of its steps hands control to an agent, which resolves that stretch and hands it back. It gives room where cases arrive messy and keeps everything else predictable.',
              'Several agents with an orchestrator. A single front door reads the request and sends it to the right specialist. It is the right answer when the domains really are different, which is exactly why we use it in our plant assistant. For anything else it is the wrong one, because every agent you add brings its own build, its own tests and its own monitoring.',
            ],
            link: {
              label: 'Why we do not like agentic architectures',
              href: '/en/blog/i-dont-like-ai-agents',
            },
          },
          {
            heading: 'What companies actually use AI agents for',
            id: 'uses',
            part: 'Types and uses',
            kind: 'lattice',
            paragraphs: [
              '“It works for everything” is the answer that helps nobody. In practice, almost everything running inside a company today falls into a handful of uses. These five are the ones that come up most.',
              'They all share the same shape. Somebody had to read something and then act on a company system. <strong>If your case is missing one of those halves, there is almost always a cheaper way to solve it than an agent.</strong>',
            ],
            bullets: [
              'Reading documents that arrive in no fixed format. Invoices, delivery notes, contracts, job sheets. Every sender uses its own template, so somebody ends up keying them in one by one. We have this running on utility bills.',
              'Asking your own data a question without knowing how to query it. Somebody asks in their own words and gets the figure back, without opening a dashboard or learning to write a query. We have this running over WhatsApp.',
              'Searching internal documentation and guiding a diagnosis. Manuals, procedures and a fault history that exist but that nobody finds in time. We have this running at an industrial plant.',
              'Qualifying inbound messages. Requests, leads, quote inquiries. The agent gathers what it takes to decide and hands it over in order. The person still decides. We have this running at a real estate agency.',
              'Answering and resolving requests outside office hours. Bookings, changes and cancellations at any hour, with the calendar kept up to date and a person behind it for anything urgent. We have this running in clinics, with our own product.',
            ],
          },
          {
            heading: 'What it can do, and what it cannot',
            part: 'What can go wrong',
            paragraphs: [
              'None of this is plug and play. <strong>The gap between a good result and a disappointment is almost always in the scope of the project.</strong> Too broad and the system risks being mediocre at everything and trusted for nothing. Too narrow and the wiring costs more than the work it saves. The projects that go well pick one task with a clear boundary around it, prove it, then widen it.',
              'What these systems are genuinely good at is reading what arrives without a fixed shape, understanding a request written twenty different ways, following a procedure step by step and acting within a closed set of actions someone approved. That list is new, and it is why processes that survived every earlier wave of automation are in play now.',
              'What they do not do is invent knowledge nobody wrote down, guarantee an outcome without code checking it first, or improve on their own while nobody measures. <strong>Part of our job is telling you when you do not need an agent.</strong> Sometimes a rule, a well-built form or a redesigned process is enough, because a model sitting on top of a broken or badly framed process only makes the mess arrive sooner.',
            ],
          },
          {
            heading: 'Measured before every change, watched after',
            part: 'What can go wrong',
            paragraphs: [
              'There is a risk almost nobody budgets for. <strong>A system with AI in it can get worse on its own, without anyone touching it.</strong> The provider updates the model without changing its name, your documentation grows and your data drifts. <a class="link-inline" href="https://arxiv.org/abs/2307.09009" rel="noopener noreferrer" target="_blank">Chen, Zaharia and Zou</a>, at Stanford and Berkeley, measured this on the same commercial model in March and in June of 2023. Its behavior changed so much that on one task accuracy went from 97.6% to 2.4%, with nothing touched on the customer side. Gartner forecast in June 2025 that more than 40% of agentic AI projects will be canceled before the end of 2027. In our experience those cancellations happen in the upkeep, not at launch, not in the launch.',
              'Models are not deterministic, they do not always return the same thing, so checking one answer on one day guarantees nothing. The only discipline that works there is statistical and dull. Before any change ships, a suite of annotated, anonymized cases has to pass. If quality drops, the change does not go out.',
              'After launch the watching does not stop. Once a week we replay a scripted end-to-end test conversation end to end against the live system. In the plant assistant, routing accuracy was measured on real cases and went from 72% to 91%. We also knew when to stop. Chasing a hundred percent ends with you tuning the tests until they pass rather than improving the system. In Wazzy, for instance, we started with an architecture of agents with tools at their disposal and have rebuilt it three times before landing on the one that genuinely raised the share of conversations that end well.',
              'Numbers like these do not appear on their own. They exist because the system was built from the start to measure itself, with its test suite and its weekly watch inside the budget. <strong>When you evaluate any provider, ours included, ask for theirs.</strong> What it takes for a system to get past its sixth month has an article of its own.',
            ],
            link: {
              label: 'Starting is easy, keeping it alive is the hard part',
              href: '/en/blog/keeping-ai-alive',
            },
          },
          {
            heading: 'What the project looks like, first meeting to production',
            part: 'For your company',
            kind: 'checklist',
            paragraphs: [
              '<strong>A project does not start with a platform that will do everything, it starts with a process that hurts and a figure that ought to move.</strong> And everything this guide describes, the tests before each change, the watching afterwards and the control over who sees what, goes into that first case from day one, because adding it later is the expensive version.',
              'Our method has four named steps and each one hands over something you can hold.',
            ],
            bullets: [
              '<strong>Explore.</strong> We work through the process and the data and tell you frankly whether we see a return. What comes out of this is a yes or a no.',
              '<strong>Prioritize.</strong> We pick the first case by pain and by figure rather than by spectacle. Out comes that case, with its number beside it.',
              '<strong>Implement.</strong> We build that bounded case and take it to production. Out comes a working system with its test suite in place.',
              '<strong>Optimize.</strong> We measure what it does with real users, so the decision about the next step comes from data rather than opinions.',
            ],
          },
          {
            heading: 'How to tell if your company needs one',
            part: 'For your company',
            kind: 'checklist',
            paragraphs: [
              'Not every task deserves an agent. <strong>This is the sieve we run before accepting a project, in that order.</strong> You can run it yourself with your list of processes in front of you.',
            ],
            bullets: [
              'There is a task that needs judgment. Purely mechanical steps are cheaper with classic automation. If each case requires understanding something, reading a document, interpreting a request, that is where an agent earns its place.',
              'The information it needs exists and is reachable. An agent without reliable data answers with whatever seems most likely, which is exactly what hallucinating means. Sometimes the first real work is ordering the sources.',
              'A business figure should move: hours, requests handled, turnaround times. If nobody can name the number, there will be no way to know whether it worked, nor to defend it when renewal comes around.',
              'Someone inside will own it. An agent in production needs a person who reads the metrics and takes small decisions every month. Without an internal owner, the best system becomes an orphan.',
              'It happens often enough. A flow that runs three times a month never pays for the watching it demands, however well built it is. Below that frequency the answer is almost always no.',
            ],
          },
          {
            heading: 'The five-minute conversation that decides it',
            part: 'For your company',
            paragraphs: [
              'With a candidate process in mind, three questions separate the project that pays from the one that only makes a good slide. You answered the first two in the sieve above and here they get said out loud.',
              'Before the three, one check. If the process came to mind because of how good it would look in a demo rather than because of what it is costing you, there is a trap waiting for you and it has a name, the shiny toy.',
              'The first is about numbers. How many times a day does it happen, and how long does it take each time. Multiply the two and you have the minutes a day this project could save you at the very most, which is worth knowing before commissioning anything.',
              'The second is about the kind of work. What does the person handling it today actually do, look or decide. If they only check that a field is where it should be, yours is a rules problem and the model is surplus. If they have to read, understand and choose between options that are not always the same, that is where agent territory starts.',
              'The third is the one almost nobody asks and the one that saves the most money. What happens if the system gets it wrong one time in twenty. If the answer is that it is fixed in a minute, you can automate with light validation and move fast. If the answer is a wrongly issued invoice, a lost customer or a fine, the project is still viable but it changes shape, with more validation in code, more cases escalated to a person and a bigger budget. <strong>Error tolerance does not decide whether you do it, it decides what doing it properly costs.</strong>',
            ],
            link: {
              label: 'The shiny toy, the project born of the sparkle',
              href: '/en/blog/the-shiny-toy',
            },
          },
          {
            heading: 'Custom, off the shelf, or both',
            part: 'For your company',
            paragraphs: [
              'The build-or-buy question has an unhelpful reputation as a technology choice. It is a question of how standard your process really is. Where your process is standard, a proven product will beat a custom build on speed and price, and pretending otherwise would be selling you hours. Where your process carries your particular judgment, your data model and your exceptions, off-the-shelf tools flatten exactly what makes the process yours, and the subscription that looked cheap starts costing workarounds.',
              '<strong>The pattern that works is unglamorous. Buy the standard pieces, the ticketing, the calendars, the accounting software, and build the thin layer of intelligence that reads, decides and connects them the way your operation actually runs.</strong> That layer is where agents live, it is small enough to afford and it is the part no vendor can ship in a box, because the box has never seen your business.',
              'One caution from the buying side. If a proposal only makes sense with every process migrated onto someone’s platform, you are not buying automation, you are buying a dependency. Ask what remains yours the day the contract ends. Our answer is everything, repository, infrastructure and data, and it is in writing.',
            ],
          },
          {
            heading: 'The mistakes we see most often',
            part: 'For your company',
            kind: 'lattice',
            paragraphs: [
              '<strong>Projects rarely die of technology. They die of first-month decisions nobody revisited.</strong> These are the ones we run into most.',
            ],
            bullets: [
              'Starting with the impressive case instead of the painful one, which is the shiny toy from a few sections back. Spectacle wins applause, the boring hour-eating process wins renewed budget.',
              'Buying the platform before the case. First one process in production with its figure, then the platform conversation, if it is still needed.',
              'Leaving measurement for the end. The test suite is built with the system, not after the scare. Adding it afterwards costs double and arrives late.',
              'No internal owner. An ownerless agent is an orphan within three months, metrics unread and small decisions untaken.',
              'Waiting for perfect data. Reachable is enough, and ordering it is usually the first phase of the project, worth more than any prompt tuning.',
              'Promising the committee the agent will run on its own from day one. It is the promise that sounds best in a meeting and the one paid for most dearly afterwards, because autonomy gets released little by little, on what the tests actually show.',
            ],
          },
          {
            heading: 'What to ask any provider',
            part: 'For your company',
            kind: 'lattice',
            paragraphs: [
              'With this guide read, <strong>these six questions let you see inside any proposal, ours included.</strong>',
            ],
            bullets: [
              'Which infrastructure does it run on, and in whose name are the account and the repository.',
              'What exactly travels in each model call, shown for your case rather than in general.',
              'What stops the assistant from showing data to the wrong person, and does the answer live in code or in the model’s instructions.',
              'What does the system do when it does not know, and what trace does that “no” leave.',
              'Which test suite blocks a bad change, and what is watched weekly in production.',
              'Which business figure did your last project move, with a number rather than adjectives.',
            ],
          },
          {
            heading: 'The European rules',
            part: 'For your company',
            paragraphs: [
              'If you deploy in Europe, two regulations frame the work. The GDPR governs the personal data inside the system, and the <a class="link-inline" href="/en/eu-ai-act-compliance">EU AI Act</a> sorts systems by the risk of their use. Its transparency duties have applied since August 2026, while the Digital Omnibus of July 2026 pushed the heavy high-risk obligations to December 2027 and beyond. <strong>Neither forbids what this guide describes. Both reward the same architecture, records, oversight and restraint designed in from the start.</strong>',
              'We keep a full page on each, written for the person who has to defend the project in front of legal.',
            ],
            link: {
              label: 'GDPR-compliant AI on infrastructure you own',
              href: '/en/gdpr-compliant-ai',
            },
          },
          {
            heading: 'The vocabulary, in eleven terms',
            part: 'For your company',
            kind: 'lattice',
            paragraphs: [
              'The terms that will turn up in any proposal you receive, one line each.',
            ],
            bullets: [
              'Language model (LLM). The engine that understands and produces text. It knows nothing about your company by itself.',
              'Context. What the model can read while it answers. It is the real limit of what it can know, and of what it could give away by mistake.',
              'Retrieval-augmented generation (RAG). A search that pulls fragments of your documentation and hands them to the model as context so it answers from there.',
              'Orchestrator. The piece that routes each request to the right agent or tool. In our plant assistant it routes between half a dozen specialists.',
              'Tool. Each specific action an agent can carry out: querying a database, booking an appointment, sending an email.',
              'Structured contract. The fixed format the model uses to hand over what it understood, so code can check it before anything happens. Proposals will call it structured output or function calling.',
              'Test suite. Real cases with the right answer written beside them, which every change has to pass before it ships. Most vendors call these evals.',
              'Telemetry. The measurements the system publishes about how it is running. Well designed, it only collects fields approved in advance, so that no personal data travels with it.',
              'Hallucination. A false answer with a flawless surface. You fight it with architecture, not by pleading with the model.',
              'RPA. Automation that imitates clicks and keystrokes on your existing screens. It works well as long as nothing changes and it is brittle the moment a screen moves. An agent attacks the same problem by understanding the content, which is why the two often coexist, each on its own ground.',
              'User identity. The credential that travels with every action, so the agent acts with that person’s permissions rather than with those of an account that can do everything.',
            ],
          },
          {
            heading: 'What it costs, in short',
            part: 'For your company',
            paragraphs: [
              'A custom single-job build starts around €2,500, systems that touch several of your tools approach €10,000 and monthly operation runs between €150 and €500. Large multi-agent systems are quoted per project. What moves each figure, where the monthly fee goes and what you own at the end has its own guide, with the full detail.',
            ],
            link: {
              label: 'How much does an AI agent cost, the full guide',
              href: '/en/ai-agent-development-cost',
            },
          },
        ],
        faqHeading: 'Frequently asked questions about AI agents',
        faq: [
          {
            q: 'Does an AI agent replace the team?',
            a: 'In our projects it replaces tasks, not jobs. The system absorbs the repetitive volume, the triage, the first reply, the typing, and people keep the part that needs judgment. At the real-estate agency we work with, the team stopped filtering requests and went back to scheduling visits, which is the work that produces revenue.',
          },
          {
            q: 'Is an AI agent the same thing as RPA?',
            a: 'No. RPA imitates clicks and keystrokes on screens and works well for identical processes that never change. An agent reads content, a different document every time, a request written any old way, and decides with rules. They often coexist, RPA moving the mechanical part and the model handling whatever requires interpretation.',
          },
          {
            q: 'Are “agentic AI” and “AI agent” the same thing?',
            a: 'In practice they are used interchangeably, and there is nothing wrong with that. “AI agent” names the piece that does the work and “agentic AI” names the category, the way of building systems that decide and act instead of only answering. If someone presents them to you as two different products, they are selling you the same thing twice.',
          },
          {
            q: 'What happens when the AI gets it wrong?',
            a: 'It will, sometimes, which is why the design assumes it. Wrong outputs get caught by validation layers before they act, uncertain cases fall to a human queue with the conversation attached, and every decision is recorded so it can be inspected afterwards. The promise is not zero errors. It is errors that are visible, contained and cheap.',
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
            a: 'No. Calls to the model run under agreements and settings that exclude training on your content, and and you approve which provider we use. Our systems also run in a cloud account under your name, so the data never lives on our infrastructure.',
          },
          {
            q: 'What if the provider changes the model underneath?',
            a: 'It happens, unannounced. It is documented that the same commercial model can perform very differently months apart without changing its name. That is exactly why every system carries its test battery and its weekly probe, which catch the change before your users do. And switching models is not always a configuration tweak, sometimes it means touching the system, so anyone promising otherwise is selling you a fantasy.',
          },
          {
            q: 'How long until production?',
            a: 'It depends on scope, and distrust anyone quoting a deadline before seeing your systems. What stays constant is the shape, a first bounded process that reaches production and gets measured, then growth from there. Projects that start with the total platform and leave measurement for last are the ones feeding the cancellation statistics.',
          },
        ],
        cta: {
          heading: 'Does an AI agent fit your company?',
          body: 'Tell us your challenge and we reply within one business day. If we don’t see a return, we’ll tell you.',
          button: 'Tell us your challenge',
        },
      },
      agentDev: {
        tocHeading: 'On this page',
        metaTitle: 'Custom AI agent development for enterprises, Ideasforge',
        metaDescription:
          'Custom AI agent development services for mid-size and large companies: enterprise AI agents on your infrastructure, measured before every change.',
        hero: {
          eyebrow: 'Custom AI agent development',
          title: 'Enterprise AI agents, built to reach production and stay there.',
          subtitle:
            'We design, build and maintain custom AI agents for mid-size and large companies. On your infrastructure, measured before every change.',
          cta: 'Tell us your challenge',
        },
        sections: [
          {
            heading: 'What custom AI agent development covers',
            part: 'The service',
            paragraphs: [
              'Custom AI agents that do real work: they answer questions against your documentation and databases, run guided diagnostics, qualify requests and execute actions on the systems you approve. <strong>Each agent is built for one concrete task and connects only to the tools that task needs.</strong> When one agent is not enough, we build the architecture that coordinates several. An orchestrator understands each query and routes it to the specialist. One of our production systems runs this way, with half a dozen specialized agents behind the orchestrator.',
              'These are some of the briefs we get most often:',
            ],
            kind: 'lattice',
            bullets: [
              'Queries on your data. The question is written in plain language and the answer comes out of your database through a validated path, never from the model’s memory. “How much did we invoice in March in the northern region?”, asked exactly like that, the way you would ask a colleague.',
              'Assistant on your documentation. Manuals, wikis and internal systems answering in a single conversation, citing where each answer came from. The returns policy that today lives spread across three manuals gets answered in one sentence, with its source beside it.',
              'Guided diagnostics. The agent asks, rules out and walks step by step to the cause, the way our plant-floor assistant does when a machine stops.',
              'Request qualification. Every incoming item is read, scored and routed. Your team receives only the ones worth its time. Of twenty quote requests arriving through the website, three deserve a call today and the rest can wait until tomorrow.',
              'Actions on your systems. The full transaction, executed inside a closed set of actions you approve. Registering the client, generating their contract and leaving it ready for signature, with nobody copying data from one screen to another.',
            ],
            link: { label: 'If you are still working out what an AI agent actually is, start with the AI agents guide', href: '/en/ai-agents' },
          },
          {
            heading: 'What never used to be worth automating',
            part: 'The service',
            paragraphs: [
              'Processes with clear rules have been automated for decades. What stayed out of reach was everything arriving with no fixed format, say one client sends the order as a PDF, another writes it in the body of an email and a third asks for “the same as last month, but for the new warehouse”. Automating that took either a person keying data in or a rules project that broke with the first supplier or user who phrased the request differently.',
              '<strong>Language models, or LLMs, changed the rules of the game, because the expensive part is no longer reading input that arrives messy or unstructured.</strong> The model understands the order however it was written and turns it into something the rest of the system can process.',
            ],
          },
          {
            heading: 'Autonomy is earned in stages',
            part: 'The service',
            paragraphs: [
              'We usually recommend that no agent of ours starts out acting on its own. For the first few days it should only propose, and a person should review every answer before it reaches the end user. Once the test suite and a few weeks of use show where it gets things right, it is given the autonomy you want.',
              'An example makes it clearer. An agent that replies to suppliers starts by writing drafts the team approves. Weeks later it sends the acknowledgements itself, while a complaint or a price negotiation still goes through a person.',
              'And there is one rule we never break. <strong>We never widen what the agent touches and what it decides on its own at the same time.</strong> If we give it access to a new system, in that system it goes back to review mode, even after months working alone on the others.',
            ],
          },
          {
            heading: 'Security is the starting point',
            part: 'The guarantees',
            capasDiagram: true,
            paragraphs: [
              '<strong>The model chooses, but it does not decide.</strong> It picks from a closed set of actions, and it is the code that reviews that choice before anything runs. A workshop’s agent can look up a vehicle’s history, propose an appointment and send a quote. Deleting it cannot do, because that action does not exist in its list and asking for it in writing does not create it. That is why the limit does not live in an instruction the model can ignore, and that is the difference between a guarantee and a polite request, a perfectly written prompt that can still fail at any moment.',
              'We split the work the same way in every system: judgment lives in the code, interpretation of language lives in the model and knowledge lives in your data. Everything ordinary code can solve, ordinary code solves, because every model call in production adds cost, waiting time and a variability someone has to watch. Working out a due date or applying a tax rate with code (a script) will come out the same the millionth time it runs, whereas an LLM, not being deterministic, will not always give the same result. Understanding that “the one from the other day for the new warehouse” means order 4512 with a different delivery address, that is the model. What comes out of the split is systems that are cheaper to run and easier to audit, not less capable.',
              'And when data from several companies or several departments lives side by side, isolation is not something we ask the model for in a prompt. It is built in layers that end in a filter the model cannot touch, and the agent only ever receives the context of the person asking, so it cannot even phrase a query about anyone else’s data. It is what an accounting firm already demands of its own team, that each manager sees their clients and no others.',
            ],
          },
          {
            heading: 'The model interprets, the code decides',
            part: 'The guarantees',
            paragraphs: [
              '<strong>The model (LLM, AI, or whatever you want to call it) never gets to touch your systems.</strong> It interprets the question and hands over a fixed-field form, what we call a contract. From there the code decides, and code does behave the same way every time. The worst a malicious message can achieve is a bad pick from a list we already reviewed. A system built this way, with everything we had to take away from the model along the road, is on <a class="link-inline" href="/en/cases/savian">the Savian page</a>.',
            ],
          },
          {
            heading: 'How an agent earns its place in production',
            part: 'The guarantees',
            paragraphs: [
              'A demo takes days. Production takes discipline. Every agent ships with a test suite, a set of anonymized cases with their correct answers annotated, which runs in full before every change. Inside it there are deliberately difficult, awkward or ambiguous cases, the invoice that arrives with no order number, the question with two possible readings, the message full of typos written from a phone. <strong>If quality drops, the change never ships.</strong> In one of our agents that suite is 118 real cases, and with it we took routing accuracy from 72% to 91%, routing being the piece that decides which agent handles each question.',
              'Every answer is recorded with its context: what the agent consulted, what it decided and what it cost. When a complaint arrives, we reconstruct exactly what happened. And what runs in production gets reviewed weekly, because a system with a model inside can get worse without a single error showing up in any log.',
            ],
          },
          {
            heading: 'The trust perimeter',
            part: 'The guarantees',
            paragraphs: [
              'The suite does more than watch quality. It draws the map of what the agent has actually proven, and we call that map the trust perimeter. <strong>Inside the perimeter, the agent acts alone. Outside it, it sets the case aside and hands it to a person.</strong> That map does not come out of a meeting, it comes out of the cases the agent has already passed. An agent that has spent months processing domestic orders receives its first order that involves customs. The right move is not improvising an answer, it is recognizing that this ground has not been proven and passing it to someone who knows, until it enters the suite with cases of its own.',
              'This asks us to build something people get for free. A new employee is taught to ask when unsure. The doubt has to be engineered around the model, because on its own it does not raise a hand, it fills the gap with something that sounds right. If a request is missing the tax ID, the agent registers nothing and asks for it. That stop is not the model’s decision, the code imposes it.',
            ],
          },
          {
            heading: 'How much supervision it needs',
            part: 'The guarantees',
            paragraphs: [
              'An agent in production needs someone inside who answers for it. The person who today reads every request in full moves to reviewing the queue of doubts, where each case arrives with the data already extracted and the reason for the doubt flagged. They decide at a glance what used to take a while. <strong>What the agent cannot resolve alone does not vanish, it gets handed over.</strong> Before anything starts, we agree which cases escalate, which queue they land in and who attends them.',
            ],
          },
          {
            heading: 'We start from the problem, not the model',
            part: 'Deciding with judgment',
            paragraphs: [
              '<strong>We do not look for ways to use AI in your company. We look for the problems already costing you money</strong> and evaluate whether an agent solves them with a gain you can demonstrate. It sounds the same and it is the opposite. The first search produces toys that demo well and get abandoned soon. The second produces systems a manager defends in front of the board with numbers.',
              'The first phase happens with the people who live the process every day, not only with the people who buy the technology. We map the process step by step with its actors, its systems and its timings. Then we separate the problems that hurt today, the ones already costing hours or customers, from the bottlenecks that will hold only until volume grows. Each candidate gets translated into its expected gain against a measured baseline, what it costs today in hours, errors or waiting.',
              'Most of that list gets discarded. With what survives we do not start a big rollout but a bounded pilot: one slice of the problem, a small group of users and a metric agreed in advance. Narrow and deep before wide and shallow, because a cheap pilot that fails is information and an expensive rollout that fails is a hole.',
            ],
          },
          {
            heading: 'What we bring and what you bring',
            part: 'Deciding with judgment',
            paragraphs: [
              '<strong>Technology is no longer the bottleneck, and we say that having built the technology.</strong> Projects fall over on the organizational side, when nobody has time to review the pilot or access to the data drags on forever. So we ask for three things before starting: a named owner who decides and answers, real hours from their team to review the pilot cases, and access to the data the agent needs. Without those hours there is no suite to calibrate and nobody with the authority to sign off on the result.',
              'And there is a part that cannot be bought, only earned. Whoever does the task by hand today will be the one watching the agent tomorrow. If they join the project last, they will experience it as a threat and will find reasons why it does not work. It is the silliest way for a good system to die and it costs nothing to avoid. The process mapping happens with those people in the room from day one, and with a new role on the table for them.',
            ],
          },
          {
            heading: 'When an agent is not worth it',
            part: 'Deciding with judgment',
            paragraphs: [
              '<strong>Telling you is part of our service at Ideasforge.</strong> If the rules of your process are clear and stable, a custom automation solves it cheaper, faster and without the supervision a model demands. We build that too. An agent pays off when somewhere in the middle something has to be read, interpreted or judged on inputs that keep changing, an email written any which way, a crooked scanned document, a question with three possible readings.',
              'Two quick tests expose it. If the process can be written as a checklist, the file arrives, it gets loaded, it gets confirmed, always in the same format, then rules are what you need and the model is surplus. And if you have spent months stacking conditions for each new way people write an address, the problem is no longer about rules, it is about reading. That is where an agent’s ground begins.',
              'It is also not worth it when nobody can point at the gain, or when the data the agent needs does not exist, or when the team that should use it does not want to. In those cases the sensible move is to start by fixing the data or the process, not by building the agent. The market is paying dearly for that lesson. Gartner reckons that by the end of 2027 more than 40% of agentic AI projects will have been canceled. Our way of staying out of that figure is discarding early, with numbers.',
              'Discarding the agent does not leave you with nothing. A process with clear rules gets automated all the same and comes out cheaper to build and to run. That is the other half of what we do.',
            ],
            link: {
              label: 'If your rules are clear, AI workflow automation is your page',
              href: '/en/services/ai-workflow-automation',
            },
          },
          {
            heading: 'What you take home on the last day',
            part: 'Deciding with judgment',
            paragraphs: [
              '<strong>The repository is under your name from day one</strong>: code, documentation, operations manuals, the model’s instructions and the test suites. So is the infrastructure, set up in a cloud under your company’s name. We have systems running on more than one model provider. Switching yours is possible and it happens with the test suite in front of us, because different models behave differently and the change gets measured.',
              'With the system we hand over the incident catalog, written so each failure can be recognized from the outside before anyone knows its cause. If you decide to operate it yourself, we train your team. The day you choose to walk away from us, you already have everything.',
            ],
          },
          {
            heading: 'What it costs',
            part: 'Deciding with judgment',
            paragraphs: [
              'A custom agent runs between €2,500 and €10,000 to build, depending on integrations and validation requirements, plus €150 to €500 a month to operate, which covers monitoring and maintenance. Model usage and infrastructure run in accounts under your company’s name, so those bills are yours and are not part of the fee. <strong>The monthly fee is agreed before anything starts and consumption is watched with caps, it is not an open meter you discover at the end of the month.</strong> Systems with an orchestrator and several agents are quoted per project. The full breakdown, what makes the build more expensive and where the monthly fee goes, is in the cost guide.',
            ],
            link: { label: 'AI agent development cost, broken down', href: '/en/ai-agent-development-cost' },
          },
        ],
        faqHeading: 'Frequently asked questions',
        faq: [
          {
            q: 'What does “for enterprise” mean in practice?',
            a: 'Your infrastructure or your cloud, your organization’s accounts, your data where you decide, and quality measured continuously. The guarantees your security committee will ask about, answered before the meeting.',
          },
          {
            q: 'Is ChatGPT not enough for us?',
            a: 'For helping people with their work, maybe it is, and we do not charge for telling you so. A chat is a helper tool where whoever asked reviews every output. An agent is a system that produces the outcome on its own, on your data and under your permissions, and that demands the engineering this page describes. They are different purchases for different problems.',
          },
          {
            q: 'Can the agent connect to our internal systems?',
            a: 'That is the point. ERP, databases, industrial systems, documentation. The agent only talks to the systems you approve, under each person’s own permissions.',
          },
          {
            q: 'Does the agent act on its own?',
            a: 'It decides inside a perimeter. The possible actions are a closed list you approve, the code validates each one before running it, and the sensitive ones require a person’s confirmation. Autonomy is rationed by cost and reliability, not by faith in the model.',
          },
          {
            q: 'What if our data is a mess?',
            a: 'That is among the first things we look at. If the data the case needs is missing or unreliable, we tell you, and the first phase becomes fixing it, because an agent on top of broken data only automates the error faster.',
          },
          {
            q: 'Who maintains the agent afterwards?',
            a: 'Your call. We can run the measured maintenance, or train your team and hand over the operations manual so they run it. The documentation is written for that second case even if you choose the first.',
          },
          {
            q: 'What if the model provider raises prices or retires the model?',
            a: 'The model sits behind an abstraction layer, so swapping it is a bounded change that has to pass the test suite before it ships. It sometimes means touching the system as well, because different models behave differently. We have tried it. We rejected a cheaper model because the suite showed it lost ten points of accuracy.',
          },
          {
            q: 'What if you conclude our case is not worth it?',
            a: 'We tell you before charging for it, and you keep the process map with its numbers, which is worth having even if the agent never gets built. Discarding early is part of the method, not a failure of it.',
          },
        ],
        cta: {
          heading: 'Interested in this for your company?',
          body: 'Tell us your challenge. If we see no return in it, we will say so.',
          button: 'Tell us your challenge',
        },
      },
      processAuto: {
        tocHeading: 'What you will see on this page',
        metaTitle: 'AI Workflow Automation for Business Processes, Ideasforge',
        metaDescription:
          'AI workflow automation for the processes classic tools could never close: documents, requests and decisions, carried end to end on the systems you already run.',
        hero: {
          eyebrow: 'AI workflow automation',
          title: 'The processes classic automation could never close',
          subtitle:
            'AI business process automation. The workflows with documents, conversations or decisions in the middle, carried end to end on your own systems.',
          cta: 'Tell us your challenge',
        },
        sections: [
          {
            heading: 'What AI workflow automation actually solves',
            part: 'What opens up now',
            kind: 'lattice',
            paragraphs: [
              'The processes classic tools could never automate share one trait. At some point, a person has to read and decide. An invoice arrives and somebody keys it in. A request arrives and somebody qualifies it. A question arrives and somebody goes looking for the answer. <strong>That step, reading something that does not come in a fixed format and deciding what to do with it, was the frontier of automation.</strong> Language models absorb exactly that step, and with it the whole family of processes built around it opens up.',
              'These processes rarely have a name on the org chart. They live in an inbox somebody empties every morning, in the spreadsheet bridging two systems that do not talk to each other, in the copy and paste of every new account. If your team has one of those daily rituals, you have a candidate.',
              'Four jobs account for almost everything we get asked for. The fifth item is not a job, it is the exit route all of them carry.',
            ],
            bullets: [
              'Document intake. Invoices, receipts and scanned forms that get read, validated and filed in your systems without anyone typing them.',
              'Request handling. Incoming inquiries qualified and routed to the right person at any hour, with whatever it takes to decide already pulled out.',
              'Questions to your data. Business questions turned into safe database queries and answered in seconds.',
              'Writing from data. Emails, summaries and notices the flow writes from what it already found out. The ones going to someone on your team can go out on their own. The ones going to a customer come from a template you approved, filled with data already validated.',
              'Escalation with context. The cases that need judgment reach your team with everything the system already gathered, so nobody has to go digging.',
            ],
          },
          {
            heading: 'The line with classic automation',
            part: 'What opens up now',
            paragraphs: [
              'Classic automation, the kind built on rules and screen robots, works very well as long as the input does not change. Anyone who has maintained it knows the weakness. The rule that read supplier A’s invoice does not understand supplier B’s, and the robot that filled in a form gets lost when the program changes version. Every new variation is another rule to write and the list never ends.',
              'AI changes the split. The model reads the input even when it arrives in another format, another wording or another order, so variation stops breaking the flow. There is a quick test we run on the first call, asking for three real examples of the input and from three different sources, because three invoices from the same supplier always look alike and prove nothing. If the three look the same, yours is a rules problem. If each one arrives its own way, that is where the model earns its place (the LLM, the AI call, or whatever you prefer to call it). In exchange it demands what this whole page describes, validation and measurement, because interpreting is not infallible.',
              'The same line works the other way too. <strong>If your process has clear rules over data that always arrives the same, classic automation solves it cheaper and faster, with no model to watch.</strong> We build that too. We will tell you on the first call, because putting AI where it is not needed means paying for supervision and getting nothing back. And when you already have classic automation running, we do not throw it out. They coexist well, rules moving what is stable and the model reading what varies, each piece in its own role.',
            ],
          },
          {
            heading: 'Automating steps is not moving the needle',
            part: 'What opens up now',
            paragraphs: [
              'A system can turn out summaries, drafts and records by the dozen without the business noticing a thing. <strong>Producing output is not moving the needle.</strong> That is why the unit of work here is not the individual task but the whole process but the whole process, from input to outcome, with its metric in front: the hours you stop paying for typing, the errors that stop needing correction, the delay that disappears.',
              'An example makes it clearer. A system that writes up every meeting produces output daily. If nobody decides anything differently because of it, the gain is zero and the cost is not. A flow that leaves every invoice filed without anyone touching it turns its output into hours you can count. The difference is not in the technology. It is in whether the outcome changes something the business measures.',
              'That criterion changes design decisions. Sometimes the step that saves the most does not get faster, it disappears, because reorganizing the process makes the thing we were about to automate unnecessary. And a flow that resolves most of the volume with a fraction of the effort beats the ambition of covering everything, which is what turns projects into work that never ends. On the blog we explain how we measure that gain and why we do not call it productivity.',
            ],
            link: {
              label: 'Measure AI by the gains, not by productivity',
              href: '/en/blog/measure-ai-by-profit',
            },
          },
          {
            heading: 'Code runs the flow, the model does the reading',
            part: 'How we build it',
            paragraphs: [
              'Our flows are a chain of steps that always runs the same way, with model calls at the points that require interpretation. <strong>The code moves the data, calls each system and decides the order.</strong> The model only comes in at those stops: reading a document, understanding a request, classifying a case. And it returns a result in a fixed shape the code can check. This is not an engineering whim. Every model call in production costs money, takes time and can vary, so the fewer and the more bounded the calls, the cheaper the flow is to run and the more stable it is.',
              'We are not the only ones saying it. Anthropic, one of the leading model developers, recommends in <a class="link-inline" href="https://www.anthropic.com/engineering/building-effective-agents" rel="noopener noreferrer" target="_blank">Building effective agents</a> starting with flows the code orchestrates and saving agent autonomy for the few cases that justify it.',
            ],
          },
          {
            heading: 'An invoice flow, step by step',
            part: 'How we build it',
            kind: 'checklist',
            paragraphs: [
              'So none of this stays abstract. Here is how an invoice travels through the system from arrival to filing. Six steps. <strong>Anything that fails validation at step four stops there, it heads to a person with the case prepared and the reason flagged.</strong>',
            ],
            bullets: [
              'It arrives. The invoice comes in through the channel the team already uses, a forwarded email or a chat. It is filed exactly as it arrived.',
              'It gets classified. The code works out what type it is and which flow it belongs to, without spending a model call when a rule is enough.',
              'It gets read. The model extracts the fields in a fixed shape: supplier, dates, amounts, taxes.',
              'It gets validated. The code checks that everything adds up: the total sums, the tax adds up, the supplier exists, the amount is in range.',
              'It gets filed. What passed lands in your system, an ERP or a spreadsheet, with its reference back to the original document.',
              'It leaves a trail. Every step records what was read and what was decided, so the run can be reconstructed later.',
            ],
          },
          {
            heading: 'Validation in the middle, not trust at the end',
            part: 'How we build it',
            paragraphs: [
              'AI automation fails when the model is left unwatched. That is why the validation step is neither optional nor left until the end: every model result is checked before it touches your systems, with the rules of the validation step you just saw and with whatever each process adds. What passes flows on its own. What does not pass is neither discarded nor invented, it goes to a person with the case prepared.',
              '<strong>Validating at the end, once the data is already filed, turns every error into an accounting correction. Validating in the middle turns it into an escalated case, which is cheaper and leaves less of a scar.</strong> That split concentrates human review where judgment is needed and takes it away from where only patience was. The goal is not a system that never asks, it is one that asks rarely and always with a reason. And that has measured how much it resolves on its own, so the word automated comes with a number behind it.',
            ],
          },
          {
            heading: 'Two real processes in production',
            part: 'How we build it',
            paragraphs: [
              'At Stanton, a property management firm, the electricity, water and gas bills for every tenant used to be keyed in by hand. Today the team forwards them over Telegram, an AI step reads and extracts the data and the result lands as normalized rows in the same spreadsheet they already worked with. Each invoice cost a minute of typing. <strong>Today 98% goes through without anyone touching it</strong> and the rest escalates with the document alongside. Two agents in production, with no new tool to learn. The client has already commissioned more administrative processes, which is the success signal that matters most to us. The whole case, with what we had to add to it afterwards, has <a class="link-inline" href="/en/cases/stanton">its own page</a>.',
              'At Barceloneta Premium, a real estate agency in Barcelona, the team gets dozens of WhatsApp inquiries a day from people looking to rent. Each inquiry took five to ten minutes to check by hand. Now the flow pulls the reason, the budget and the paperwork out of every conversation. What reaches the team is an email saying whether the requirements the agency set are met, budget and paperwork, with the why beside it. The decision is still a person’s, with that email in front of them. The agency estimates it wins back over three hours a day for the work that does need people.',
              'The two cases are alike in two ways: they came in through a channel the team already used, and their gain could be measured before and after. That is what we look for in every new process.',
            ],
            link: {
              label: 'See the projects',
              href: '/en#projects',
            },
          },
          {
            heading: 'Measured like the software it is',
            part: 'How we build it',
            paragraphs: [
              'A flow with a model inside can degrade without throwing a single error, because the model changes or the documents change. That is why we pin the model version, so updating it is our decision rather than a surprise from the provider. Every change goes through a suite of real test cases before it ships, and every run records what was read, what was decided and what was filed. When something does not add up weeks later, we reconstruct the exact run instead of arguing from memory. And when a real error does slip through, the circuit is always the same: reproduce the run, fix it, and the case joins the test suite so it never slips through quietly again. Our flows age by learning from their own near misses.',
              'And if one day a figure is missing or a source is down, in the questions-to-your-data case the system answers with what it has and says what got left out, rather than returning an incomplete number that looks complete. In a document flow it is the other way round, what does not add up is not half filed, it escalates. That machine clarity is the difference between a number you can take into a meeting with your partners to defend the project and one that leaves you exposed.',
              'The monthly operation comes down to three numbers: how much the flow resolved on its own, how much it escalated and for which reasons, and what each run cost. Those three decide where to sharpen, which new rule to add and whether the next expansion pays. <strong>Without them, working well is an opinion.</strong> Every flow also inherits the house alarms, so if an external service goes down or a quota runs out, we know before your team suffers it.',
            ],
          },
          {
            heading: 'Your systems stay where they are',
            part: 'How we build it',
            paragraphs: [
              '<strong>The automation connects to what you already use</strong>: ERP, CRM, databases, email, messaging and, yes, that spreadsheet that governs half a department. The entry point can be the channel your team already has in its pocket, a Telegram or WhatsApp chat or an email inbox, because the best new tool is the one nobody has to learn.',
              'And the repository is yours from day one, with its documentation and its operating manuals. If one day you want to run it with your own team or another provider, you take the whole flow with its documentation and its tests, not a subscription. What is a service while we work together is the operation, the weekly check and our standard alerting. That is stated in the quote.',
            ],
            link: {
              label: 'Document automation for accounting firms',
              href: '/en/accounting-firms',
            },
          },
          {
            heading: 'Where your data lives',
            part: 'How we build it',
            paragraphs: [
              'A flow like these reads your tenants’ invoices, requests carrying a candidate’s paperwork, or questions with names inside them. That is processing of personal data. Sometimes even the kind the European regulation protects more strictly, health data for instance.',
              'The legal split is worth saying plainly and up front. <strong>Your company is the controller and we are the processor.</strong> What we hand over is what Article 28 of the regulation requires, a processing agreement with its purposes, its terms and its obligations. And what Article 32 asks for, technical measures written down and verifiable rather than a statement of intent.',
              'In practice that means infrastructure built in a cloud account in your name, every action traveling with the permissions of whoever asked, sensitive data encrypted, retention periods agreed in writing, and model calls running under agreements that exclude training on your content. It is the same discipline we apply where it matters most, in a system that handles health data every day.',
            ],
          },
          {
            heading: 'From the first process to the next ones',
            part: 'How we build it',
            paragraphs: [
              '<strong>The first process pays for the setup</strong>: the connection to your systems, the logging, the test suite, the operation. The ones after reuse it, so each expansion costs less than the last and gets decided with the numbers of the flow already running. That is how Stanton grew, one flow first and the rest on the same setup, each one approved by what the previous one proved.',
            ],
          },
          {
            heading: 'The process to start with',
            part: 'Deciding with judgment',
            paragraphs: [
              '<strong>You do not need a transformation plan to start, you need to pick one process well.</strong> A good one usually meets three conditions: it hurts measurably, it repeats with volume, and it has someone who suffers it and wants it gone. With that process in front of us, we map it step by step with whoever runs it every day, what arrives, who touches it, which systems it passes through and where it jams. Then we measure what it costs today. That measured starting point is what later lets you say how much it improved, with numbers rather than impressions.',
              'It starts with a pilot covering only part of the volume, with the figure that should move agreed in advance. Sometimes we even validate it in mixed mode, a person supported by the half-built tool, because that confirms the gain before building the rest. The mapping also changes decisions before a line of code gets written. Automating for the rental agency taught us the time was not going on answering messages but on checking each applicant, so the flow was designed around that check rather than around the inbox. Without that map we would have automated the wrong part of the process.',
              'If the pilot delivers, it grows in phases. If it does not, little has been lost and we have learned where the mistake was.',
            ],
          },
          {
            heading: 'What we do not automate',
            part: 'Deciding with judgment',
            paragraphs: [
              'There are steps we deliberately leave with human confirmation: the ones that move real money, the irreversible ones and the ones that decide about people. <strong>The flow prepares the case, the person presses the button.</strong> It is not a technical limitation but a design choice, because an error that is cheap to correct can be automated and an expensive one should not be.',
              'We also do not automate processes without volume, because a flow that runs three times a month does not pay for its upkeep, nor processes better redesigned than accelerated. If your case falls into one of those groups, we tell you before we start and you save yourself the entire project.',
            ],
          },
          {
            heading: 'What it costs',
            part: 'Deciding with judgment',
            paragraphs: [
              'A single-process flow starts around €2,500 to build, the ones touching several of your systems approach €10,000, and monthly operation runs between €150 and €500, covering monitoring and maintenance. Model usage and infrastructure run in accounts under your company’s name, so those bills are yours and are not part of the fee. What moves those figures here is concrete: how many systems have to be connected, how much validation the process demands and how much volume runs through it. <strong>The sensible rule is that the measured cost of the process today sets the ceiling for the budget and the pilot confirms it, not the other way round.</strong> The full breakdown is in the cost guide.',
            ],
            link: {
              label: 'How much does an AI agent cost, broken down',
              href: '/en/ai-agent-development-cost',
            },
          },
        ],
        faqHeading: 'Frequently asked questions',
        faq: [
          {
            q: 'What is AI workflow automation?',
            a: 'Automation where a language model handles the steps that require reading or interpretation, inside a flow validated by code. The model interprets. The code checks and executes.',
          },
          {
            q: 'Is this RPA?',
            a: 'Not the same thing, although plenty of RPA suites now bundle AI-based reading inside them. RPA repeats clicks and rules over screens and breaks when something changes place or format. What we add is a model that interprets the content, so variation does not break the flow. They coexist well, RPA moving the stable parts and the model reading the variable ones.',
          },
          {
            q: 'What if the AI misreads a document?',
            a: 'A validation layer checks the result before it is registered: totals, formats, required fields. Doubtful cases go to a person, so review happens exactly where judgment is needed.',
          },
          {
            q: 'How much of the process really gets automated?',
            a: 'It depends how many edge cases it has, so it gets measured rather than estimated. The system records what it resolves on its own and what it escalates to a person, and you see that share from the first month.',
          },
          {
            q: 'Do we have to replace our ERP or our tools?',
            a: 'No. The flow connects to what you already use and the result lands where your team already works, be it an ERP or a spreadsheet. One of our clients manages invoices by forwarding them over Telegram, without having to learn a single new tool.',
          },
          {
            q: 'Can we start with just one process?',
            a: 'That is exactly what we recommend. One process with measurable pain, a pilot with its metric, and growth in phases if it delivers. That is how our automation clients started. The longest-running one keeps adding processes.',
          },
          {
            q: 'Does it work with bad scans or phone photos?',
            a: 'The legible ones pass and the doubtful ones escalate to a person with the image right there, instead of getting half-registered. What share falls on each side is not something we promise up front, it gets measured in your pilot with your real documents.',
          },
          {
            q: 'Does the flow only read, or does it write into our systems too?',
            a: 'It reads and writes, with a net. Writes go through validation, and the sensitive ones require a person’s confirmation before executing. What each flow may touch is defined with you, per system and per action.',
          },
          {
            q: 'How long until the first flow is running?',
            a: 'It depends on three things: that the data exists, that the access is granted and that the task to automate is well defined. With all three, a pilot in two weeks is realistic. If one is missing, the first job of the project is getting it, and that timeline is not ours to set.',
          },
          {
            q: 'What happens to the cases the flow cannot resolve?',
            a: 'They escalate to your team with all the context the system already gathered, and that split is what separates this from the question about scans, which is about a doubtful reading. Here also belong the cases the flow understands perfectly well but has no business deciding. The goal is not one hundred percent. It is human review sitting where it adds judgment, with the resolved share measured rather than assumed.',
          },
        ],
        cta: {
          heading: 'Which process is costing you hours?',
          body: 'Tell us your challenge. If we see no return in it, we will say so.',
          button: 'Tell us your challenge',
        },
      },
      conversational: {
        tocHeading: 'What you will see on this page',
        metaTitle: 'AI Chatbot Development Services for Business, Ideasforge',
        metaDescription:
          'Conversational AI agents that answer, qualify and act on the systems you already run. What we build, what it costs and when it is the wrong answer.',
        hero: {
          eyebrow: 'Conversational agents',
          title: 'AI chatbots that finish the job',
          subtitle:
            'Conversational agents that answer, qualify and act. Appointments booked, requests filtered and questions resolved, running on top of the systems you already use.',
          cta: 'Tell us your challenge',
        },
        sections: [
          {
            heading: 'What we build',
            part: 'The brief',
            kind: 'lattice',
            paragraphs: [
              'AI chatbots for the channels where your customers or your team already are, WhatsApp on the official Meta API, the web and internal tools. The agent understands plain language, queries your real systems (calendar, CRM, database) and finishes the task inside the conversation. <strong>Finishing is the word that matters.</strong> The usual script chatbot explains the procedure and leaves the work to you. These do it in the conversation, whether that is booking an appointment, returning a figure or handing over a qualified request.',
              'This is what they can do. The first four are the jobs we get asked for most and the fifth is included in every build.',
            ],
            bullets: [
              'Support that resolves. Answers grounded in your data and your documentation, with the source beside them, at any hour.',
              'Complete transactions. Book, change, cancel or check, with the calendar and the record updated on the spot.',
              'Conversation filter. The ones worth it reach your team already qualified and the rest get handled without stealing anyone’s time.',
              'Internal queries. The same agent, pointed at your team instead of your customers, with staff asking their own data or their own documentation.',
              'Handover to a person. When a conversation needs someone from the team, it reaches someone from the team, with the whole history attached.',
            ],
            link: {
              label: 'An assistant over your internal documentation',
              href: '/en/services/corporate-knowledge',
            },
          },
          {
            heading: 'Why script chatbots have a bad name',
            part: 'How it works and why to trust it',
            paragraphs: [
              'Almost everyone has suffered one: the bot that goes around its script, does not understand the second question and hides the way out to a human. And when the human finally arrives, you have to tell the whole story again. That experience had two causes and it is worth separating them. The first is technical and it is solved, those menus broke the moment somebody wrote the way people write. The second is still with us and it is a way of measuring. Plenty of bots are asked to hold on to as many conversations as possible without passing them to the team, rather than to resolve as many as possible.',
              'We measure it the other way round. <strong>A conversation counts when the task got done or when it reached the right person with all the context.</strong> That is why the way out is never hidden and the handover carries the full history, so nobody repeats what they already typed. A customer who asked for a human and got one quickly comes back. One who fought a script for ten minutes does not. And does not recommend you either.',
            ],
          },
          {
            heading: 'From script to actions',
            part: 'How it works and why to trust it',
            paragraphs: [
              'The chatbots of a few years ago were button menus. They worked until the customer wrote the way people write, adding context, packing two questions into one or asking for the option the menu did not have. This generation does not follow a rigid tree. <strong>It understands free text, but it only does what we have allowed it to do.</strong> The model reads the intent and picks from a closed set of actions we define with you, book, check, change, escalate. The code runs the chosen action and validates the result before answering.',
            ],
          },
          {
            heading: 'Few transactions, actually finished',
            part: 'How it works and why to trust it',
            paragraphs: [
              'The classic mistake in this business is the bot that knows about everything and closes nothing. <strong>We prefer the opposite, an agent that handles few transactions and finishes them, with every category measured on its own.</strong> If eighty percent of your conversations are three procedures, the agent that does those three end to end is worth more than the one that answers a hundred questions passably. Two things get confused here and it is worth pulling them apart. The actions an agent executes are few and closed. The questions it answers from your documentation can be many. Both get measured, but they do not grow the same way.',
              'In practice each transaction is a named category with its test cases and its number. “Change an appointment” is measured separately, so if its accuracy drops it shows up in its own row rather than buried in a general average. Categories grow when the numbers ask for it, not when the demo suggests it.',
            ],
          },
          {
            heading: 'AI customer service',
            part: 'How it works and why to trust it',
            paragraphs: [
              'Customer service is where a conversational agent turns a profit soonest. It answers the routine, qualifies the rest and escalates what needs judgment, so waiting queues turn into immediate replies. The real estate agency we work with takes in dozens of rental inquiries a day over WhatsApp. Each one used to take five to ten minutes to check by hand, and today the agency puts the saving at over three hours a day. Their team now spends its time on viewings instead of filtering. There, answering and qualifying are the same conversation, because filtering well is what leaves the team the work that brings in revenue. That case is told in full on <a class="link-inline" href="/en/cases/barceloneta">its own page</a>.',
              '<strong>A good part of the value is in the hour you reply.</strong> Inquiries do not arrive only in office hours, they also arrive when the customer has the phone in their hand. The longer the reply takes, the less inclined they are to write again. An agent that answers within the first minute turns that overnight trickle into appointments.',
            ],
            link: {
              label: 'The real estate agency case',
              href: '/en/real-estate',
            },
          },
          {
            heading: 'One booking, message by message',
            part: 'How it works and why to trust it',
            kind: 'checklist',
            paragraphs: [
              'Six steps. <strong>At any of them the conversation can jump to a person, with the history in front of them and leaving the same trail.</strong>',
            ],
            bullets: [
              'The customer writes. “Any slot on Thursday afternoon?”, in their own words and in their own hurry.',
              'The agent understands. It works out which transaction is being asked for, for whom and under what conditions, even when it all arrives in one sentence.',
              'It checks the real calendar. Availability comes from the calendar right then, not from yesterday’s copy.',
              'It offers and adjusts. Concrete slots, and it absorbs the changes, not Thursday, better Friday first thing.',
              'It confirms and writes. The appointment lands in the calendar and in the record, with its confirmation inside the chat.',
              'It leaves a trail. The conversation and what the agent did can be reconstructed afterwards, step by step.',
            ],
          },
          {
            heading: 'A serious chatbot does not live alone',
            part: 'How it works and why to trust it',
            paragraphs: [
              'An agent that only talks is worth little. The value is in the connections: the calendar it checks before offering a time, the CRM where it writes, the database the answer comes from. And every new connection is one more thing that can fail, because any external system can go down on a Tuesday at eleven.',
              '<strong>When that happens the agent neither pretends nor breaks.</strong> It says that particular transaction is unavailable right now, carries on with the rest, and your team hears it from an alarm rather than from complaints. How that is built, with a mechanism that automatically sets aside the failing piece, we tell in full on the blog.',
            ],
            link: {
              label: 'What your assistant does when a tool goes down',
              href: '/en/blog/when-a-tool-goes-down',
            },
          },
          {
            heading: 'What it answers and what it does not make up',
            part: 'How it works and why to trust it',
            paragraphs: [
              'The reasonable fear of anyone in charge is a bot improvising in front of a customer. That is not avoided with promises and it is not eliminated either. It is reduced by how the thing is built. What is not eliminated gets measured. Knowledge answers come from your data and your documentation, with the source beside them. The delicate lines, a returns policy, a legal condition, a price, are not written by the model. They are texts you approved that the system delivers as they are. You edit them without touching code, and no edit reaches production without passing its check.',
              'Where an invented figure is expensive we go a step further and change the model’s job. A language model is built to answer you, so when it is missing a fact it tends to fill the gap with something that sounds right. That is why it does not write the answer there. It reads what is being asked, decides which of the outputs we gave it fits, and hands that decision over in a fixed format. From there the code takes over, looks up the real data and composes the reply. <strong>If what they asked for fits none of the outputs, there is nothing to invent, there is a stop.</strong>',
              'And when there is no data to answer with, the agent says so and offers the way to a person. An “I do not know” in time keeps customers. A made-up answer loses them without you finding out, which is the worst way to lose them. That is why answers are measured by category, so a failure shows up in its own row instead of getting lost in an average.',
            ],
          },
          {
            heading: 'When the conversation touches sensitive data',
            part: 'How it works and why to trust it',
            paragraphs: [
              'Some conversations carry things the European regulation treats separately. Health data is the clearest example and it sits in the same group as political views, biometrics and sexual orientation, what the law calls special categories and protects more strictly. If your business touches them, building an assistant stops being only a product question.',
              '<strong>What we put there is not a promise, it is a list.</strong> Field-by-field encryption, meaning each sensitive value is encrypted on its own inside the database rather than in one block with everything else. Retention periods agreed in writing and deletion on request of anything not held by a legal retention duty. And the split of responsibilities said from the start, your company answers for the processing and we are the processor, with the contract that goes with it.',
              'This is not theory. Wazzy, the appointment assistant we run ourselves, works with health data every day and carries that discipline, so when a sector with compliance requirements turns up we are not starting from zero.',
            ],
          },
          {
            heading: 'Measured, not assumed',
            part: 'How it works and why to trust it',
            paragraphs: [
              '<strong>Conversational systems degrade quietly.</strong> A model update or a new document changes answers without a single visible error. That is why we pin the model version, so updating it is our decision rather than a surprise from the provider. Every change goes through a test suite before it ships and every conversation leaves a record that can be reconstructed.',
              'The operation has its numbers too: what share ends in the task done, what share escalates and for which reasons, what each conversation costs. Those are what decide which category to sharpen and which to add. How those numbers get read on a system of our own, with its failures and what they cost to correct, is on <a class="link-inline" href="/en/cases/wazzy">the Wazzy page</a>.',
            ],
          },
          {
            heading: 'How it starts',
            part: 'Deciding with judgment',
            paragraphs: [
              '<strong>A conversational agent does not go out to the whole world on day one.</strong> It launches bounded, what we call the pilot, on one channel, in one time slot or with one group of customers, with its categories measured from the first conversation. The delicate texts come approved by you before anyone reads them, and your team knows how an escalation arrives and what to do with it.',
              'A few weeks in we can judge whether the pilot is ready to expand: what finishes inside the conversation, what escalates and why, and what people ask that we had not anticipated. That is what decides the expansion, category by category. It is how you grow without extending anything that has not been tested first.',
            ],
          },
          {
            heading: 'When a conversational agent does not pay off',
            part: 'Deciding with judgment',
            paragraphs: [
              '<strong>Telling you so is part of the service too.</strong> If you get a handful of conversations a day, a well-written questions page and one person answering quickly come out cheaper. If the answers you need are not in any system, the work that comes first is ordering that knowledge, not building the bot. And if for whatever reason your customer needs to talk to a person, what you want is for them to get there sooner, not to put a machine in the way.',
              'A conversational agent pays off when there is volume, when the information exists and when a real share of the transactions can be finished inside the conversation. Filtering and qualifying count as finished, even when a person closes the deal afterwards. If your case fails any of the three, we say so on the first call.',
            ],
          },
          {
            heading: 'What it costs',
            part: 'Deciding with judgment',
            paragraphs: [
              'The published ranges for any agent of ours hold here, between €2,500 and €10,000 to build and between €150 and €500 a month to run. The factor particular to conversational work is volume. <strong>On WhatsApp that comes with two meters rather than one.</strong> Each conversation spends its model calls. Meta charges separately for every template it delivers. An appointment reminder is a template, so every notice carries its own cost. Both arrive itemized. Before you commission anything you will have an estimate, built from what we already measure on comparable systems and applied to your volume. The pilot turns it into a measurement with your own conversations. The full breakdown is in the cost guide.',
            ],
            link: {
              label: 'How much does an AI agent cost, broken down',
              href: '/en/ai-agent-development-cost',
            },
          },
        ],
        faqHeading: 'Frequently asked questions about conversational agents',
        faq: [
          {
            q: 'What is the difference between a script chatbot and a conversational agent?',
            a: 'A script chatbot follows a tree of buttons and breaks the moment you step outside it. A conversational agent understands free text and picks from the available actions, so the same question asked twenty different ways lands in the same place.',
          },
          {
            q: 'Which channels does it work on?',
            a: 'WhatsApp on the official API, the web and internal tools. Wherever your customers or your team already are.',
          },
          {
            q: 'Can it book, change or cancel appointments on its own?',
            a: 'Yes. We run it in production with Wazzy, an appointment assistant that is our own product, with real-time availability, immediate confirmation and the calendar kept up to date.',
          },
          {
            q: 'What if my customer wants to talk to a person?',
            a: 'The way to a person is always in plain sight, and whoever picks it up receives the whole conversation without making anyone repeat themselves. Outside working hours the handover waits in the queue and your team finds it first thing, with the history attached. A bot that traps people is expensive in customers, so we do not build one.',
          },
          {
            q: 'Will it make up answers in front of my customers?',
            a: 'Knowledge answers come from your data with their source, and the delicate lines are texts you approved that the system delivers as they are. When there is no data it says so and offers a person. That brings the risk down a long way. What is left gets measured per type of transaction, so a failure shows up in its own category instead of getting lost in an average.',
          },
          {
            q: 'Can we change what it says without calling you?',
            a: 'You edit the approved texts yourself without touching code. No edit reaches production without passing its check, and a new document does not change answers either until the test suite approves it. To change what the agent is able to do, that is where we come in, also with the tests in front of us.',
          },
          {
            q: 'Who answers for the GDPR?',
            a: 'Your company is the controller and we are the processor. What we hand over is a processing agreement, technical measures and retention periods in writing. When special category data is involved, health for instance, that also includes field-by-field encryption and deletion on request of anything without a legal retention duty over it.',
          },
          {
            q: 'What if WhatsApp changes its rules or its prices?',
            a: 'The official API protects you from Meta cutting off unofficial shortcuts, not from Meta raising its rates. Theirs are passed on itemized and separate from our part, so you always see which is which. And the agent logic does not live in the channel, the same conversation can be handled on the web or in an internal tool with the same brain behind it.',
          },
          {
            q: 'Is it for selling or only for support?',
            a: 'The two touch. An agent that filters and qualifies hands your team qualified leads, like the real estate agency that now only books viewings. What we do not do is bulk messaging on WhatsApp, with or without AI.',
          },
          {
            q: 'How many conversations does it take to pay off?',
            a: 'We do not give a magic number, because it depends on what your channel costs you today. The pilot measures it with your real conversations, it is paid for and its price counts toward the final project. If the math does not work, we are the ones who tell you before you expand.',
          },
        ],
        cta: {
          heading: 'A conversational agent for your business?',
          body: 'Tell us your challenge and we reply within one business day. If we don’t see a return, we’ll tell you.',
          button: 'Tell us your challenge',
        },
      },
      cost: {
        tocHeading: 'What this guide covers',
        metaTitle: 'How much does an AI agent cost, Ideasforge',
        metaDescription:
          'A custom AI agent typically costs €2,500 to €10,000 to build, plus €150 to €500 a month to operate. What moves the number and what you own at the end.',
        hero: {
          eyebrow: 'Pricing guide',
          title: 'How much does an AI agent cost?',
          subtitle:
            'A custom AI agent built by Ideasforge typically costs between €2,500 and €10,000 to build, plus €150 to €500 a month for us to operate and measure it. The model and cloud bills are separate, and they are yours. This page explains what moves the number, with real cost data from our systems in production.',
        },
        sections: [
          {
            heading: 'The short answer',
            id: 'answer',
            paragraphs: [
              'A single-job agent sits at the lower end of the range. One channel, one system to connect to and a clearly scoped task, like reading the invoices that arrive in a chat and turning each one into a row in your spreadsheet. <strong>Building it starts around €2,500, and running it around €150 a month.</strong>',
              'The upper end belongs to agents that touch several systems and need deeper validation before going live, like an assistant that answers from your documentation and also queries live data. Those builds approach €10,000 and their operating fee sits at the top of the monthly range.',
              'Larger multi-agent systems are quoted per project.',
              '<strong>And there is a third figure worth being clear about from the start.</strong> The model the agent uses and the cloud it runs on sit in accounts under your company’s name, so those bills are yours and they are not inside the monthly fee.',
            ],
          },
          {
            heading: 'What moves the price',
            id: 'factors',
            paragraphs: ['<strong>Four things explain almost every quote we send.</strong>'],
            bullets: [
              'How many systems it connects to. An agent that only answers questions is cheaper than one that also writes to your calendar, your CRM or your database, because every connected system needs its own permissions and its own tests.',
              'The state of your data. If the knowledge the agent needs lives in clean, readable sources, the model performs better and the build gets shorter. We usually gain more by cleaning up data and tools than by rewriting prompts.',
              'How much proof you need before going live. Our appointments assistant Wazzy does not ship a change until a battery of conversations annotated one by one passes. Not every project needs that depth, and choosing it is part of the price conversation.',
              'Who operates it afterwards. The monthly fee covers watching the system in production, and the next section shows where that money actually goes.',
            ],
          },
          {
            heading: 'The two costs of a running agent',
            id: 'operation',
            paragraphs: [
              '<strong>A running agent has two costs, and they are worth keeping apart.</strong> One is what the system consumes to work, the model and the infrastructure, which sits in accounts under your company’s name. The other is our fee, which pays for the work of watching it.',
              'Every message that comes in triggers calls to the model provider. That is the raw running cost of having the agent live, your company pays it, and it goes up and down with usage, so we do not bury it inside our fee. Infrastructure works the same way. The cloud account is in your name, so its bill is too.',
              'Keeping it separate has an upside for you. You can see it, so you can bring it down. <strong>Knowing how the spend splits is what lets you cut it by measuring instead of guessing.</strong> In Wazzy we meter it per layer: reading and structuring the incoming message takes 52 to 57 percent of the model spend, deciding what to do next takes 24 to 31 percent and writing the reply takes 16 to 19 percent.',
              'With that map in front of you, the decision comes from data. In one of our systems we tried a cheaper model and the test battery rejected it, because overall quality fell ten points. The saving was real. It just was not worth what it cost in quality.',
              '<strong>Our fee pays for something else, which is the work of watching it.</strong> Once a week we run an anonymized test conversation against the live system from end to end. And before any change ships, the test battery has to pass. Two different things, kept separate on purpose. <strong>The battery gates changes, and the weekly test watches what is already running.</strong>',
            ],
            link: { label: 'Why keeping AI alive is the hard part', href: '/en/blog/keeping-ai-alive' },
          },
          {
            heading: 'What you own at the end',
            paragraphs: [
              '<strong>The repository is in your name from day one</strong> and the infrastructure runs in a cloud account that belongs to you, not to us. If we part ways, the system stays yours, with its documentation and its record of changes.',
              'That also explains what the fee does not include. <strong>You are not renting the agent</strong>, so the monthly cost is operation, not a license that stops working when you stop paying.',
            ],
            link: { label: 'How we build AI agents', href: '/en/services/ai-agent-development' },
          },
        ],
        faqHeading: 'Cost questions we hear most',
        faq: [
          {
            q: 'How much does an AI chatbot cost?',
            a: 'A support chatbot sits at the lower end of the range, starting at €2,500 to build, because it usually lives on one channel and draws on one knowledge source. The price climbs when it stops only answering and starts acting, booking appointments or updating records, because every action needs its own permissions and tests.',
          },
          {
            q: 'Why is there a monthly fee at all?',
            a: [
              'Because the model your agent runs on changes underneath it. Providers update models without changing their name, and a system that answered well yesterday can start failing quietly. The fee pays for the metering and the weekly test that catch it before your users do.',
              'And the arithmetic works because the expensive part, building the battery of cases with their annotated answers, was already paid for during the build. Running it before every change and watching every week is machine work.',
            ],
          },
          {
            q: 'Can we run it without you afterwards?',
            a: 'Yes. Everything is yours, so you can take over whenever you want, and we run handover sessions when a client asks for them. Keep one thing in mind, though. Operating an agent means measuring it, and if nobody keeps measuring, you find out from a customer.',
          },
        ],
        cta: {
          heading: 'Want a number for your case?',
          body: 'Tell us your challenge and we reply within one business day. If we don’t see a return, we’ll tell you.',
          button: 'Tell us your challenge',
        },
      },
      compliance: {
        metaTitle: 'GDPR-Compliant AI Development, Ideasforge',
        tocHeading: 'What this page covers',
        metaDescription:
          'What GDPR-compliant AI means when a system actually ships: where data goes, isolation enforced in code and the records your DPO will ask for.',
        hero: {
          eyebrow: 'Data sovereignty',
          title: 'GDPR-compliant AI on infrastructure you own',
          subtitle:
            'We build AI agents for companies bound by European rules, wherever they are based, whose data cannot leave their control. The application and its data run in a cloud account under your name, isolation is enforced by code rather than by instructions to a model, and every decision is recorded so that your DPO or an auditor can reconstruct it later. Based on five systems running in production, and updated for the AI Act calendar as the Digital Omnibus left it in July 2026.',
          cta: 'See how it is built',
          ctaHref: '#isolation',
        },
        stats: [
          { value: '5', label: 'systems in production built this way' },
          { value: 'Art. 9', label: 'GDPR health data handled in production, a special category' },
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
              'The regulation itself never mentions artificial intelligence by name. It regulates personal data, and an assistant that reads invoices, books appointments or answers questions about your operations is full of personal data from the first day. So the same familiar principles apply, and each of them lands on a concrete engineering choice.',
              'Data minimization stops being a policy line and becomes a question about context. A language model can only leak what it was given, so the real control is what enters the prompt in the first place. Purpose limitation becomes a question about tools. An agent that can only call three approved functions cannot quietly repurpose your data, because it has no path to do so. And accountability becomes a question about records. If the system cannot show why it did what it did, no policy document will show it either.',
              'This is why we say the paperwork follows the architecture and not the other way round. A well-built system makes the DPA, the impact assessment and the register of processing activities faster to write and easier to defend, because every claim in those documents points at something that actually exists in the code. The reverse does not work. No amount of documentation makes an unaccountable system accountable.',
            ],
          },
          {
            heading: 'Two European rules, one architecture',
            paragraphs: [
              'A company deploying AI in Europe now answers to two regulations at once. The GDPR governs what may happen to personal data, whoever processes it. The AI Act sorts systems by the risk of their use, from banned practices to minimal risk, and places concrete duties on companies that deploy the risky ones, oversight, monitoring and logs among them. Its calendar changed in July 2026. The Digital Omnibus, Regulation (EU) 2026/1744, pushed the high-risk obligations for Annex III systems to 2 December 2027 and those for AI embedded in regulated products under Annex I to 2 August 2028. What already applies is everything else, the prohibited practices and the AI literacy duty since February 2025, the general-purpose model rules since August 2025 and the Article 50 transparency duties since 2 August 2026. Fines at the top of the scale reach 35 million euros or 7 percent of turnover.',
              'We keep the full map of that second regulation on its own page, role by role and duty by duty, because it deserves the space. One piece belongs here, though, since it is about data rather than systems. In December 2024 the European Data Protection Board published Opinion 28/2024, its first word on AI models themselves, and two findings matter for a buyer. Whether a trained model is anonymous gets assessed case by case, and legitimate interest can only carry AI processing after a documented three-step assessment. Neither is a rubber stamp. Both reward providers who can show their homework, which is the approach this whole page describes.',
            ],
            link: { label: 'The full guide: EU AI Act compliance for deployers', href: '/en/eu-ai-act-compliance' },
          },
          {
            heading: 'Where your data actually goes',
          part: 'Where your data goes',
            id: 'infrastructure',
            paragraphs: [
              'The infrastructure runs in a cloud account that belongs to you, not to us, and the repository is in your name from the first day. We do not host your assistant on our side and hand you a login. This is unusual in the sector and it is deliberate, because it removes a whole family of questions your DPO would otherwise have to chase. While we maintain the system we act as your processor, under a data processing agreement and with named access you can revoke. What disappears is the vendor database holding a copy of your records, and the exit negotiation over who keeps what. The system stays where it always was, with its documentation and its history.',
              'The only outbound path is the call to the model provider, the company that runs the language model itself. You approve which provider, under which agreement and with which settings, and you approve what is allowed to travel inside those calls. The only other outbound path is our own health telemetry, which travels on a closed allow-list of technical fields and is described further down. Model providers sign data processing agreements, the contracts that bind a supplier to process data only on your instructions, and the serious ones offer European processing regions. Whether a given setup satisfies the rules on international transfers is your lawyers’ assessment to make. Our job is to hand them a complete map of what flows where, so the assessment takes days instead of months.',
              'Everything else in this page builds on that starting point. Isolation, records and health-data handling all assume the data already sits inside an account you control, because that is the only place from which the rest can be guaranteed.',
            ],
            link: { label: 'What it costs to build and run one', href: '/en/ai-agent-development-cost' },
          },
          {
            heading: 'What actually travels in a model call',
            paragraphs: [
              'Minimisation stops being abstract the moment you look inside one call. A request to a language model carries three things: the instructions that tell the model its job, the context it may use for this answer and the question the person just asked. That is the entire surface. The model never connects to your database, never browses your systems and never receives what the code did not put in the envelope.',
              'So the real engineering question is what the code puts in the envelope, and the answer should be one you can show to anyone. A well-built agent sends the few rows or paragraphs the person is entitled to, already filtered, rather than shovelling tables in and hoping the model quotes the right part. Sending less is safer. It also happens to be cheaper and more accurate, because a model reasons more reliably over one page of relevant material than over fifty pages of noise.',
              'When your DPO asks what the provider can see, the envelope is the answer, documented per use case. In our deployments that document is short, and more than one reviewer has been surprised by how little actually leaves. The assistant that answers production questions does not export your production database. It sends one person’s question and that person’s permitted slice of context, then writes the reply into the same records as everything else.',
            ],
          },
          {
            heading: 'So is using ChatGPT itself GDPR-compliant?',
            paragraphs: [
              'It is the question every committee asks first, and it is usually the wrong question, because "ChatGPT" names several different products with different data terms. A free browser tab, a paid workspace subscription and an API contract, the machine-to-machine interface a system like ours calls, are three different situations in the eyes of the law. Terms about training, retention and European processing differ across them, and they change over time, so a blanket yes or no printed on this page would be worthless the month after we wrote it.',
              'The useful question is which of the three your data enters and under which agreement. An employee pasting a customer email into a free consumer tool is one situation. A system calling an API under a signed data processing agreement, in a European region, with training excluded and with only a filtered context in the envelope, is a different situation entirely, even when the model underneath carries the same name. Your lawyers assess the agreement. We build the second situation, and we hand them the evidence that it is what actually runs.',
              'This is also why a company that bans AI tools outright often ends up with less control, not more. The demand does not disappear, it moves to personal accounts and phones where no agreement, no logging and no filter applies. A sanctioned assistant with the right architecture gives people the capability inside a perimeter someone actually governs.',
            ],
          },
          {
            heading: 'AI data sovereignty, without the slogan',
            id: 'sovereignty',
            paragraphs: [
              'Data sovereignty gets used as a marketing word, so it is worth pinning down. It means that the location of your data, the keys that open it and the identity system that says who is who all answer to you, under a jurisdiction you chose. Location alone does not get you there. A system whose data sits in Frankfurt but whose access keys, admin accounts and logs belong to a vendor is sovereign in the brochure and nowhere else.',
              'There is a spectrum, and being straight about it beats slogans. At one end sits shared software where your data lives in someone else’s multi-tenant product under their terms. Then comes running in a European region of a large cloud, then a cloud account of your own, then your own servers in your own building. Each step buys control and costs convenience. We build in the third position by default, your own cloud account, because it delivers the control that matters, ownership of data, keys and identity, without asking your team to run physical machines.',
              'The paragraph most providers skip. The application we build runs entirely inside infrastructure you own. The language model itself usually does not, because we call it as a service from the provider you approve. Running an open model on your own hardware would close that last gap, and it is a different project with different costs and different quality trade-offs. We have not deployed open models in production, so we will not sell you that experience as if we had it. If full on-premise inference is a hard requirement for you, say so in the first conversation, because it changes the architecture from the foundations up.',
              'Questions about foreign governments reaching your data, the American laws included, belong in that same first conversation. They are legal terrain and your counsel will have a view. What we control is the engineering that determines how much there is to worry about, which is the subject of the next two sections.',
            ],
          },
          {
            heading: 'Isolation that does not depend on the model behaving',
          part: 'How isolation is enforced',
          kind: 'checklist',
            id: 'isolation',
            paragraphs: [
              'An early version of one of our assistants kept companies apart by telling the model, in its instructions, never to omit a filter. It worked in every test we ran. It was still wrong, because an instruction to a language model is a request, and a model can fail to honor a request for reasons nobody can predict from outside. We have described that lesson to clients as the difference between a guarantee and a polite request, and it reshaped how we build. Security has to hold even when the model fails.',
              'Today, in the agent that answers questions about live business data for several companies at once, the separation is enforced in four places, and the model is not one of them.',
            ],
            bullets: [
              'The context, the information the model is allowed to read while answering, only ever contains what the person asking is entitled to see. The assistant cannot leak what it never held, and it cannot even form a query about a company that does not exist in its world.',
              'Name matching is confined to the sites that person is authorized for. When someone types a misspelt site name, the correction can only land inside their own perimeter, so a near-miss cannot drift into a neighbouring company.',
              'Code validates every request against an allow-list, a closed list of permitted values, before any query is built. The model proposes, the code decides.',
              'The final query carries an unconditional filter. If the permission list ever arrives empty, the query resolves to a condition that matches nothing. Failure closes the door instead of opening it.',
            ],
          },
          {
            heading: 'When we fixed the architecture, a whole class of bugs died',
            paragraphs: [
              'Layers are good. Changing the design so the failure cannot exist is better, and one of our systems shows the difference. Its isolation originally worked by filtering, every query carrying a condition that said which company’s rows were allowed. We later rebuilt the data store so that each company lives in its own schema, its own sealed compartment inside the database, and the combined view joins them with the company stamped onto every single row. After that change, adding two companies into one figure stopped being a bug that a filter must catch and became a query that cannot be written.',
              'The practical effect showed up immediately. A fuzzy name comparison that had been a genuine security worry under the filtering design simply stopped mattering, because even a wrong match could no longer cross a schema boundary. Fixing the architecture killed the entire class of failures, not one instance of it. That is the standard we aim for wherever the data allows it, and it is a useful question to ask any provider. Which failures are impossible in your design, rather than merely caught.',
            ],
          },
          {
            heading: 'The model is never the authority',
          diagram: true,
            paragraphs: [
              'Our systems share one design rule. Judgment lives in the code, interpretation of language lives in the model, and knowledge lives in the data. The model reads a person’s question and hands over a structured form, a contract in a fixed format whose fields we defined in advance. Code validates that form, checks the permissions of whoever is asking and decides what actually happens. The queries that touch your data are built by the code from the validated form, with values passed as parameters and column names drawn from a closed list, never assembled from text the model wrote.',
              'Where records matter most we go a step further. In one of our assistants the model does not even return the text that ends up in front of the user. It returns a key, an identifier, and the code looks up the canonical text that key points to. What the person reads is guaranteed to be what was approved, word for word, no matter what the model generated around it.',
              'Identity follows the same rule. When an assistant queries an internal system on someone’s behalf, it carries that person’s own identity token, the credential your systems already use to know who is asking. Every downstream call runs with the permissions of the human, not with the broad permissions of a robot account. If the person cannot open a record by hand, the assistant cannot open it for them. A whole family of GDPR access questions dissolves at that point, because the access model of the assistant is the access model your company already audited.',
            ],
            link: { label: 'Why we distrust agentic architectures, in detail', href: '/en/blog/i-dont-like-ai-agents' },
          },
          {
            heading: 'Health data, under the strictest article there is',
          part: 'What it looks like in practice',
            paragraphs: [
              'Wazzy, our own appointments product, runs in dental, physiotherapy and aesthetics clinics. An appointment note that says who visits which clinic and why is health data, which the GDPR places among the special categories of its Article 9, with no hierarchy among them. The party processing it under Article 9.2.h, the ground that covers healthcare provision, is the clinic, which is the controller. We process on its behalf, as a processor. We did not pick that regime to make a point. The product needed it, and the result is that our practices were shaped by the strictest case first.',
              'Every sensitive field is encrypted on its own, with AES-256-GCM, rather than relying on the disk being encrypted underneath. The difference matters in practice. Disk encryption protects you if someone steals the hardware, while field-level encryption protects the data from every process and person that touches the database in normal operation. Deletion is designed around what the law requires. Wazzy retains what the law obliges it to retain, no more and no less, and that period is not ours to set. The clinic sets it, as the controller, with Spanish patient-rights law in front of it, Law 41/2002, which sets a five-year floor for medical records and longer in some regions. An appointment in a chat is not the medical record, which lives in the clinic’s own system, but the logic is the same. A deletion request must honor the patient without quietly breaking a legal retention duty, so the system separates what is erased now from what is retained under obligation, and can show which is which.',
              'We built all of that because we had to. It is the reason this page can speak from experience rather than from a checklist, and it is the standard the rest of our client work inherits.',
            ],
          },
          {
            heading: 'The person on the other side is told, and can reach a human',
            paragraphs: [
              'Compliance talk tends to fixate on databases and forget the person typing. Two duties meet there. The GDPR expects clarity about how personal data is used, and the AI Act, in its transparency duty, one of the ones that kept its date, requires that people be told when they are interacting with a machine. Neither duty is exotic to implement, but both are easy to fail by omission, one vague welcome message at a time.',
              'Our conversational systems present themselves as what they are, and the escalation path is part of the design rather than an apology. In Wazzy, our appointments product, an urgent case does not get a soothing paragraph from a model. It gets escalated to the clinic’s staff, because a machine that recognizes its limit and hands over is safer than one that improvises confidence. The same shape repeats in our client work. The assistant does the repetitive volume, and the moments that need a human reach a human, with the conversation’s trail attached.',
              'There is a quieter benefit. When the handover is designed, the humans behind the assistant stop being a fiction in the privacy policy and become an actual queue with actual owners, which is exactly the kind of claim an authority can check and confirm.',
            ],
          },
          {
            heading: 'What we record, and what we cannot record',
            id: 'records',
            paragraphs: [
              'Record the decision, not only the result. Every meaningful step is written down, what the assistant understood, what it asked for, what the validator rejected and why. The log is append-only, meaning entries can be added but never edited or removed, and the system never reads it back during execution, so it cannot influence an answer even in principle. It exists for one purpose, to be inspected afterwards by someone with a question. That someone might be your DPO, an auditor or a supervisory authority, and the answer they get is the record of what happened, not a reconstruction from memory.',
              'The telemetry, the technical measurements the system sends home about its own health, works the other way round. It runs on an allow-list, so the fields it carries are decided in advance and written down rather than left to whatever the code happens to send. When a regulator asks what your monitoring collects, the answer is a short, closed list rather than an investigation.',
              'Even expiry is designed to be visible. Access tokens, the temporary credentials that prove who is asking, expire after 60 minutes, and re-running an old request with a dead token produces a clear 401 error instead of silently borrowing fresher credentials. We would rather a system fail loudly and visibly than succeed in a way nobody can account for. A new and visible error beats a comfortable silence.',
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
              'A compliance story that was true at launch and unmeasured afterwards is a story, and these systems change underneath you. Model providers update models without changing their names, your documentation grows and your data shifts over time. So we do two separate things. Before any change ships, a test battery, a bank of annotated, anonymized cases the system must answer correctly, blocks the release if quality drops. And once a week, on the live system, we run a scripted end-to-end test conversation from end to end and check what actually happened.',
              'This is the same discipline that catches a model quietly getting worse, applied to the promises on this page. The isolation, the records and the refusal behaviors are tested like features, because that is what they are. When your DPO asks in March whether the guarantees from the September review still hold, the answer that counts is a test result, not a shrug.',
            ],
            link: { label: 'Why keeping AI alive is the hard part', href: '/en/blog/keeping-ai-alive' },
          },
          {
            heading: 'Eight questions to put to any provider, including us',
          kind: 'checklist',
            paragraphs: [
              'The introduction promised you would leave knowing what to ask. These are the questions we would ask if we were sitting on your side of the table, in the order that exposes the most.',
            ],
            bullets: [
              'In whose cloud account does the system run, and what happens to it the day we stop working together.',
              'What exactly leaves that account in a model call, shown for our concrete use case rather than in general terms.',
              'Which pieces of software enforce isolation, and does any of them consist of an instruction to the model. Ask for the full history of that answer.',
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
            a: 'The system we build can, and does, run in infrastructure you own. The model is the part to be clear about. We call models as a service from providers you approve, we have not deployed open models in production, and we will not sell that experience as if we had it. Raise the requirement before anything is quoted and we will tell you plainly what it would take.',
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
          heading: 'Does your data have to stay under your control?',
          body: 'Tell us your challenge and we reply within one business day. If we don’t see a return, we’ll tell you.',
          button: 'Tell us your challenge',
        },
      },
      aiAct: {
        tocHeading: 'What this page covers',
        metaTitle: 'EU AI Act Compliance for Companies That Deploy AI, Ideasforge',
        metaDescription:
          'What the EU AI Act asks of a company that deploys AI: the two roles, the eight high-risk domains and Article 26 duty by duty.',
        hero: {
          eyebrow: 'EU AI Act',
          title: 'EU AI Act compliance, for companies that deploy AI',
          subtitle:
            'Most companies are deployers under the EU AI Act, and for them the regulation is a list of things they must be able to demonstrate: oversight that works, logs that exist, and a clear account of what their systems do. The Digital Omnibus of July 2026 moved the heaviest of those obligations to December 2027, while transparency and AI literacy apply today. This guide lays out the whole map in plain terms, written by engineers who build systems that have to survive these reviews, not by lawyers selling the review.',
          cta: 'Start with the short version',
          ctaHref: '#short',
        },
        stats: [
          { value: '2 Aug 2026', label: 'transparency duties apply from here. High-risk deployer duties moved to Dec 2027' },
          { value: '6 months', label: 'minimum retention for the logs a high-risk deployer must keep under its control' },
          { value: '3%', label: 'of worldwide turnover, the fine bracket most company breaches fall into, with 7% reserved for prohibited practices' },
        ],
        sections: [
          {
            heading: 'Who this page is for, and who wrote it',
            part: 'The short answer',
            paragraphs: [
              'This page is for the people inside a company who have been handed the question "are we fine under the AI Act" and need to give an answer with structure. It maps the regulation from the point of view of a deployer, the legal word for a company that uses AI professionally rather than building it for the market, because that is what most companies are.',
              'It is written by engineers. We build AI agents that run inside companies bound by these rules, which means our work sits on the receiving end of these reviews, and we are Spanish, so our national supervisor is AESIA, the first dedicated AI authority in Europe. What follows is the map we wish every client had before the first meeting. It is not legal advice, we do not classify your risk and the calls that need a lawyer are marked as such throughout.',
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
              'The calendar moved in July 2026. Bans and AI literacy since February 2025, general-purpose model rules since August 2025, transparency since August 2026, and the high-risk obligations pushed to December 2027.',
              'Fines are tiered, up to 35 million euros or 7 percent of turnover for prohibited practices and up to 15 million or 3 percent for most other breaches.',
            ],
          },
          {
            heading: 'Four risk levels, and where normal companies land',
            part: 'The map of the law',
            paragraphs: [
              'The Act does not regulate artificial intelligence as a substance. It regulates uses, sorted by how much damage a failure could do to a person’s rights, safety or livelihood. A short list of practices is prohibited outright, social scoring and manipulative techniques among them. A defined set of uses is high-risk and carries the heavy machinery of the regulation. A middle band carries transparency duties, telling people they are dealing with a machine. Everything else is minimal risk and carries almost nothing.',
              'General-purpose models, the large models systems like ours call as a service, sit on a separate axis with their own obligations for the companies that train and provide them. That axis is mostly the provider’s problem, not yours, but it matters when you buy, because the documentation your integrator receives from the model provider feeds the file you may one day show an authority.',
              'Here is the orientation most guides bury. An internal assistant that answers questions about documentation, a chatbot that books appointments or an agent that reads invoices lands, in most configurations, in the limited or minimal band. The heavy regime is triggered by domain, not by sophistication. The moment AI touches hiring, credit, education, essential services, biometrics or the other domains in the Act’s Annex III, the same underlying technology becomes high-risk with everything that follows. Which band your concrete use falls into is the first question for your lawyers, and the next sections give you the vocabulary for that conversation.',
            ],
          },
          {
            heading: 'The separate axis, general-purpose models',
            part: 'The map of the law',
            paragraphs: [
              'The large models that systems like ours call as a service live under their own chapter, in force since August 2025 for the companies that provide them. Providers of general-purpose models owe technical documentation, information to the companies building on top, a copyright policy and a summary of the content used for training, and the handful of models classed as systemic risk owe more on top of that.',
              'Little of it is your duty as a deployer, and all of it is your business as a buyer. The documentation a model provider publishes flows downhill into your compliance file, because the description of your system leans on the description of the model underneath. When we assemble the file for a client, the model provider’s terms and documentation go in it, which is one more reason the choice of provider is approved by you not defaulted into by us.',
              'The practical ask is short. Whoever sells you anything built on a large model should be able to name the model, point at its provider’s AI Act documentation and show what of your data reaches it. If any of those three draws a blank, the gap is yours to carry.',
            ],
          },
          {
            heading: 'The calendar is already half run',
            part: 'The map of the law',
            kind: 'checklist',
            paragraphs: [
              'The Act entered into force in August 2024 and has been switching on in stages. Every date below is in the past, which is worth letting sink in, because a surprising number of companies still file the whole subject under "future".',
            ],
            bullets: [
              'Since 2 February 2025. The prohibited practices became illegal, and Article 4 began requiring AI literacy, meaning staff who work with AI systems must be trained to a level appropriate to their role. This applies to every AI system, high-risk or not.',
              'Since 2 August 2025. The obligations for providers of general-purpose models apply, including the regime for models with systemic risk. If you deploy systems built on large models, your providers have been under duties for a year.',
              'Since 2 August 2026. The Article 50 transparency duties apply, like telling people they are interacting with a machine. Article 26, the one that governs deployers of high-risk systems, was due here too until the Digital Omnibus moved it.',
              'From 2 December 2027. The high-risk obligations for the Annex III systems arrive, Article 26 for deployers among them, after the Digital Omnibus, Regulation (EU) 2026/1744, moved them from August 2026. High-risk AI embedded in products already covered by EU safety law, medical devices and machinery among them, follows on 2 August 2028.',
            ],
          },
          {
            heading: 'The fines, and who actually gets inspected',
            part: 'The map of the law',
            paragraphs: [
              'The penalty structure is tiered like the GDPR’s. Prohibited practices reach 35 million euros or 7 percent of worldwide turnover, whichever is higher. Most other breaches, deployer duties included, reach 15 million or 3 percent. Supplying misleading information to authorities has its own lower tier. Which bracket a concrete failure lands in is a legal question, and the answer to "how likely is an inspection" is that nobody selling you certainty deserves your trust.',
              'What can be said with evidence is who is watching. Each member state names its market surveillance authority, and ours is a useful preview of what these authorities look like, because it moved first. AESIA, the Spanish agency created by Royal Decree 729/2023, was the first dedicated national AI supervisor in Europe, has held full sanctioning powers since August 2025 and published sixteen compliance guides within months of the first obligations applying. Its declared line through 2026 has been warnings before sanctions, and it has already opened preliminary investigations into systems deployed by Spanish organizations. The enforcement machinery exists now, and it is staffed.',
              'The practical consequence for a buyer is timing. Building demonstrability into a system while it is being built costs little, and we know because it is how we work anyway. Retrofitting it under an authority’s deadline is the expensive version of the same project.',
            ],
          },
          {
            heading: 'Is it even an AI system under the Act?',
            part: 'Which box you are in',
            paragraphs: [
              'Internal committees can burn weeks on this question. Settle it in the first meeting. The Act defines an AI system through seven elements, and the one that carries the weight is inference: a machine-based system, operating with some autonomy, that infers from its input how to generate outputs like predictions, recommendations or decisions. The European Commission published guidelines on this exact definition in February 2025, precisely because every company asked the same question.',
              'The practical reading is narrower than the panic. A calculator, a fixed spreadsheet formula or a rules engine that applies the same written logic every time does not infer, and generally falls outside. A system that learns patterns, ranks candidates, scores risk or generates text does infer, and is in. The borderline cases exist, they belong to counsel, and the reasoning is worth writing down either way.',
              'For anything built on a language model the question answers itself, models infer, that is their entire job. So we never spend a client’s money arguing that an agent is not AI. We spend it building the agent so that the duties that follow are already met.',
            ],
          },
          {
            heading: 'Provider or deployer, the question that decides your duties',
            part: 'Which box you are in',
            paragraphs: [
              'Two roles carry almost all of the weight. A provider develops an AI system, or has one developed, and places it on the market under its own name. A deployer uses an AI system professionally, under its own authority, for its own purposes. The provider owes the design-side duties, conformity, documentation and registration where it applies. The deployer owes the use-side duties, and they are the subject of this guide.',
              'A bank that buys a credit-scoring system from a vendor is a deployer, with duties about oversight, monitoring and logs. The vendor is the provider, with duties about how the system was built and documented. The same split repeats down the market: the clinic using an appointment assistant, the workshop using a fault-diagnosis tool and the accounting firm running document extraction are deployers of those systems, whoever built them.',
              'When we build a custom agent for a client, the question of who counts as provider of that specific system is settled by the facts, not by the contract, but the contract can still fix in writing who documents what rather than leave it to assumption. We flag it in the first conversation, our lawyers and yours settle the wording, and the engineering side of the answer, who documents what, who keeps which records, is designed in rather than argued about later.',
            ],
          },
          {
            heading: 'How a deployer becomes a provider without noticing',
            part: 'Which box you are in',
            paragraphs: [
              'The roles are not permanent labels. The Act moves a deployer into the provider seat when it puts its own name or trademark on a high-risk system, when it substantially modifies one, or when it changes a system’s intended purpose into high-risk territory. The third one is the quiet trap, because intended purpose sounds like marketing language and is actually the concept the whole regulation rests on.',
              'Concretely. A company that licenses a general document assistant and turns it into a tool that screens job applications has changed the purpose into an Annex III domain, and with it, possibly, its own role. A company that rebadges a vendor’s system as its own product has walked into provider duties by branding. None of this outlaws customization, it prices it, and the price is documentation and duties that someone must consciously accept.',
              'Whether any specific modification is "substantial" is a legal judgment. Our contribution is narrower and earlier. Systems built with a written intended purpose, a record of what changed and logs of what the system actually does give your lawyers the raw material to make that judgment cheaply. Systems assembled informally give them nothing to work with, and a careful lawyer with nothing to work from will always give you the expensive answer.',
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
              'Biometrics: identification, categorization of people and emotion recognition, with the narrow exceptions the Act itself carves.',
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
              'Three things narrow that exit. The exemption must be documented, a written assessment of why the system qualifies, produced before you rely on it rather than after someone asks. You also have to register in the EU database, which is the step most people miss. And profiling slams the door shut. A system in an Annex III domain that profiles people, in the GDPR sense of evaluating aspects of their life like performance, reliability or economic situation, is always high-risk, whatever else it does.',
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
              'Keep the automatically generated logs that are under your control for at least six months, longer where other law says so. No logs, no defense.',
              'Tell workers and their representatives before deploying a high-risk system that affects them at work. Quietly switching on monitoring is its own breach.',
              'Use the provider’s information to run your data protection impact assessment where one is due. The two regulations meet exactly here.',
              'Tell the affected person when the Annex III system is used to make a decision about them, or to help make one. It is the duty an HR department asks about most.',
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
              'The transparency duties in Article 50 apply since August 2026 and they are refreshingly concrete. People interacting with an AI system must be informed they are doing so, unless it is obvious from context. Synthetic audio, image and video content must be marked as artificially generated, and that marking is the provider’s duty. Yours is to disclose a deepfake you publish, or AI-generated text you put out on a matter of public interest. Deployers of emotion recognition or biometric categorization must inform the people exposed to them.',
              'For the systems most companies actually run, this reduces to plain interface design. The assistant introduces itself as an assistant, the generated report says it was generated and the escalation path to a human is real. We covered how our own conversational systems present themselves and hand urgent cases to staff on the sovereignty page, and the same design serves this article without modification. By now the pattern is clear. These duties are cheap to meet when they are designed in and expensive to retrofit.',
            ],
            link: { label: 'How our systems present themselves and escalate', href: '/en/gdpr-compliant-ai' },
          },
          {
            heading: 'Most of Article 26 is an engineering property',
            part: 'How it lands in a real system',
            paragraphs: [
              'Read the duty list again with an engineer’s eye and it breaks down into three properties of the system. Things the system must produce about itself, logs and records. Things a human must be able to do to it, inspect, intervene and override. And things it must never silently change, its purpose and its inputs. None of the three can be added convincingly after the fact, all three are cheap when they are design decisions.',
              'This is where our practice happens to line up with the regulation, not because we built for the Act but because production forced the same conclusions earlier. Our systems write down each decision as it happens, in a record that can be added to but never edited, and the system itself never reads that record back, so it documents behavior without influencing it. Oversight is not a name in a file. The people behind our assistants get real queues with real trails, and every action a system takes on someone’s behalf runs under that person’s own permissions, so the question "who could have done this" always has an answer your identity system already knew.',
              'Monitoring, the duty that sounds vaguest, is the one we can show most concretely. Before any change ships, a battery of annotated, anonymized cases must pass, and one of our systems carries 118 of them. After shipping, a weekly probe runs a scripted end-to-end test conversation against the live system end to end. Two separate checks, kept apart on purpose, and together they are precisely the "monitor the operation of the system" evidence Article 26 asks a deployer to have.',
            ],
            link: { label: 'The records, isolation and identity design in full', href: '/en/gdpr-compliant-ai' },
          },
          {
            heading: 'What we hand you for the AI Act file',
            part: 'How it lands in a real system',
            kind: 'lattice',
            paragraphs: [
              'When a system we built enters your compliance review, these artifacts exist because the build produced them, not because someone reconstructed them for the meeting.',
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
              'Put the vendor questions in writing, what is the intended purpose, what documentation accompanies the system, what will you give us for oversight, literacy and logging. A vendor who cannot answer in writing has answered.',
            ],
          },
          {
            heading: 'Where this sits in the bigger picture',
            part: 'What to do now',
            paragraphs: [
              'The AI Act and the GDPR ask different questions about the same system. One regulates the use by risk, the other the personal data inside, and a system that answers both well tends to be one system, built once, with records, oversight and restraint designed in rather than promised. That architecture is what our sovereignty page describes mechanism by mechanism, and it is the standard everything we build inherits, whether or not a given system ever goes near Annex III.',
              'If you are deciding whether to build something under these rules, the same candor applies to prices, and we publish ours. And if what you need first is the map of duties turned into a working system, that is the actual job description of an AI agent development company working under these rules in 2026.',
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
            a: 'In the normal case you are a deployer of those systems, and the provider duties sit with the companies that build them. The role can shift if you rebadge a system as your own product or substantially modify it, and where the line sits is a legal call. What you certainly keep either way are the deployer-side habits, literacy for your people, clarity with the people exposed to the output and knowing which of your uses could touch Annex III domains.',
          },
          {
            q: 'Is a customer-service chatbot high-risk?',
            a: 'By itself, normally not. Its home duty is transparency, people must know they are talking to a machine. It moves toward high-risk when the use crosses into an Annex III domain, and once it is there, profiling people in the GDPR sense closes the narrow exemption. A support bot that starts making decisions about refunds based on scoring a customer’s reliability has changed category in substance, whatever it says on the tin. Classification is your lawyers’ call, drift is the thing to watch.',
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
            a: 'Only a defined group does. Public bodies, private companies providing public services, and deployers using high-risk AI for credit scoring or for life and health insurance pricing must run one before first use. If you are in that group, the good news is reuse, the Act lets you lean on assessments already done, including the provider’s, and the exercise overlaps with the DPIA your organization likely knows. Whether you are in the group is, one more time, a question for counsel.',
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
          body: 'Tell us your challenge and we reply within one business day. If we don’t see a return, we’ll tell you.',
          button: 'Tell us your challenge',
        },
      },
      /*
       * Páginas de caso, espejo inglés (1 sep 2026). El español las escribió
       * entre el 28 y el 29 de agosto y quedaron sin par, así que las cinco
       * rutas no emitían hreflang y el grupo «Casos» no podía entrar en el
       * menú sin descuadrar las dos cabeceras. Con estos cinco espejos entra.
       *
       * Divergencia deliberada en `caseIndustrial`: el español publica las tres
       * mediciones del enrutado (72,8 → 89,3 → 91,5) y aquí solo van la primera
       * y la última. La intermedia está EN DUDA en el banco desde el 1 sep,
       * porque 89,3 % no es una división de 118, y un espejo no propaga una
       * cifra que el árbitro no da por buena. Se iguala el día que el
       * propietario mire el resumen del proyecto.
       */
      caseSavian: {
        tocHeading: 'What this page covers',
        metaTitle: 'Savian: an agent that takes the data to the field, Ideasforge',
        metaDescription:
          'The data was already on a dashboard and the people who needed it were out in the field. How we built Savian an agent that answers by message and by voice.',
        hero: {
          eyebrow: 'Case in production',
          title: 'Savian: the data was on a dashboard and the person who needed it was in a van',
          subtitle:
            'Savian is an agricultural company whose managers need production and attendance data to decide. The data was there and there was a dashboard to look it up, but the person who needs it is out in the field or in a van, with no computer in front of them. Today they ask the way they would ask a colleague, by message or by voice note, and the answer comes back in seconds. This page tells how it is built and the two things we had to take away from the model along the way.',
          cta: 'Start with the problem',
          ctaHref: '#problem',
        },
        sections: [
          {
            heading: 'The data was there and it still did not arrive',
            id: 'problem',
            part: 'The problem',
            paragraphs: [
              'Savian works in agriculture. The owners and the managers of its growing estates need production and attendance data every day, for decisions that cannot wait.',
              'It is worth saying up front what the problem was not. That data was not lost and it was not hidden. Savian already had a dashboard where you can look up the same information the agent answers today, built and running before the agent existed.',
              'The problem was the last mile, which is the one almost nobody tells. <strong>A dashboard is a desk tool. It is designed for somebody sitting down</strong>, with the whole screen in front of them and time to pick filters and read a table.',
              'And where is the person who needs the number? Not in that chair. They are in a van first thing in the morning or in the middle of an estate, with the phone in a pocket and their hands busy. Getting fluent with a dashboard is a job in itself, and it is not the job of somebody working in the field.',
              'So the question waited. It got looked up back at the office, once there was a computer in front of them and the day in the field was over. A number that arrives at the end of the day stops being useful for deciding. It becomes useful for explaining what already happened.',
            ],
          },
          {
            heading: 'The first version let the model write the query',
            part: 'What we removed',
            paragraphs: [
              'The first version did the thing that looks obvious when you have a language model in front of you. It took the question in plain Spanish, wrote a SQL query with it and ran that query. SQL is the language you use to ask a database for data.',
              'It worked. <strong>In a demo it worked very well, which is exactly the problem with letting it write the query.</strong>',
              'Why pull something that works? For two separate reasons that are worth keeping apart, because one is visible immediately and the other is not.',
            ],
          },
          {
            heading: 'Why we pulled it',
            part: 'What we removed',
            paragraphs: [
              'The first one is security. A model that is allowed to write the query can write any query the language allows. The only thing stopping it is a sentence in its instructions, and an instruction to a language model is a request rather than a guarantee. It gets followed almost every time. That “almost” is the whole difference when there is data from several companies on the other side.',
              'The second one is duller and we saw it before the first. It made mistakes. Queries that ran without an error and returned a number that was not the one somebody had asked for, which is the worst kind of failure because nobody sees it.',
              'That is where the rule that orders everything we have built since comes from. <strong>Judgment lives in the code, the interpretation of language lives in the model and knowledge lives in the data.</strong> The model does what it is good at, which is understanding what it has been asked. The code does what needs guarantees, which is touching the data.',
            ],
            link: { label: 'Why we do not like agentic architectures', href: '/en/blog/i-dont-like-ai-agents' },
          },
          {
            heading: 'Matching names also lived inside the model',
            part: 'What we removed',
            paragraphs: [
              'That was not the only thing we had to take out of there. Work sites and estates have long names that nobody types the same way twice, so the agent corrects what the person writes and matches it to the real name. That correction exists so that nobody has to remember an exact label.',
              'At first the model did that matching too. We handed it the list of work sites and estates that person has access to and asked it which one they meant.',
              'It failed often. And when it did not fail outright it did something worse, matching to the closest name on the list, which is not always the right one. <strong>A name that looks alike is not a name that matches.</strong> The model does not tell those two things apart well.',
              'Today an approximate matching algorithm does the comparison, what in English is called fuzzy matching. It measures how close two pieces of text are and returns a score, so you can set a floor and discard anything below it. Accuracy went up as soon as it stopped being an opinion.',
              'The shape of the fix is the same as with the query. A task that looked like language turned out to be comparison. And comparing is one of those things code does the same way every time.',
            ],
          },
          {
            heading: 'The model proposes, the code builds',
            part: 'How it works today',
            paragraphs: [
              'Today the model writes no query at all. It reads the question and returns a form with fixed fields that we defined in advance: the period, the scope, the filters, the metric and the groupings. Nothing else.',
              'The code takes that form, checks that every field carries an allowed value and builds the query itself, with the values passed as parameters and the column names taken from a closed list. <strong>No identifier is assembled from text the model wrote.</strong>',
              'And that is where the guarantee comes from. A form with five known fields can be checked in full before anything runs. A query written in free text cannot.',
            ],
            link: { label: 'The agent that queries data without writing a single query', href: '/en/blog/ai-agents-sql' },
          },
          {
            heading: 'Four layers between one company and the one next door',
            part: 'How it works today',
            paragraphs: [
              'The agent answers managers from several companies in the same group, each one about their own, so keeping them apart is the guarantee that holds the whole system up. <strong>Separation is enforced in four places. The model is none of the four.</strong>',
              'The information the model can read while it answers contains only the companies of whoever is asking, so the rest do not exist for it and it cannot filter out what it never had.',
              'The name correction we just described searches only inside those same companies. Somebody who writes a name half finished or with a letter out of place lands on the site they meant, if that site is theirs. If it is not, they land nowhere.',
              'After that, the code validates the request against a closed list of allowed values before building anything. And the final query carries an unconditional filter that, if the permission list ever arrived empty, resolves into a condition no row can match. When something fails, the system closes rather than opening.',
            ],
          },
          {
            heading: 'What the agent refuses to answer',
            part: 'What it will not do',
            paragraphs: [
              'There are questions the system does not answer on purpose. The columns holding hours worked, lateness and absences for named individuals exist in the database and are simply not exposed to the agent.',
              '<strong>The refusal does not live in a sentence in its instructions, it lives in what the system can reach.</strong> It is not that it decides not to answer, it is that it has nothing to answer with.',
            ],
          },
          {
            heading: 'A voice note from the field',
            part: 'Voice',
            paragraphs: [
              'With your hands busy and the phone in your pocket, typing is not always comfortable either. The natural way to ask something in the field is to send a voice note, so the agent understands them.',
              '<strong>Behind a voice note there are three models and each one does a single thing.</strong> The first transcribes the audio into text. The second reads that text, works out what is being asked and composes the answer, with the usual split, because the code still fetches the data. The third turns the answer into speech.',
              'It is the same idea that holds up the rest of the system, splitting the work into pieces that each do one thing and can be checked separately.',
            ],
          },
          {
            heading: 'A written number is not a spoken number',
            part: 'Voice',
            paragraphs: [
              'That chain taught us something that shows up in no demo. The model composing the answer has to write figures and dates out in words, because the one reading them aloud reads what is written.',
              'And what happens when it does not? A text that says “12,539 kilos” does not sound like twelve thousand five hundred and thirty-nine kilos when a synthesizer reads it. Spelled out in words, it does. The same goes for dates, which spoken and written look nothing alike.',
              'It looks like a finishing detail and it decides whether the system gets used or abandoned. <strong>An answer that sounds odd does not get questioned, it stops being listened to.</strong>',
            ],
          },
          {
            heading: 'What gets measured every week',
            part: 'What we watch',
            paragraphs: [
              'The most useful measure on this system compares two things that should always agree: the tool the conversation called for and the tool the model actually used. <strong>When the tool asked for and the tool used do not match, it almost always means the model answered from memory instead of querying</strong>, which is the failure no system error gives away.',
              'The gaps get classified too, one by one. A question that falls outside what the agent covers, one it does cover but has no data for, and one it did not understand are three different problems, with three different fixes and three different owners. Counting them together solves none of them.',
            ],
          },
          {
            heading: 'Where it stands today and what comes next',
            part: 'What we watch',
            paragraphs: [
              'The question that used to wait for the office now gets asked from wherever the person is, on a phone, typed or spoken, and the answer comes back in seconds. <strong>The dashboard is still there for anyone who wants it. What changed is that you no longer have to reach it.</strong>',
              'What is coming next are automatic alerts, the “tell me when this happens” kind, so the system stops waiting for the question and speaks first.',
            ],
          },
        ],
        cta: {
          heading: 'Do you have data nobody looks up because it is too much work to reach?',
          body: 'Tell us your challenge and we reply within one business day. If we don’t see a return, we’ll tell you.',
          button: 'Tell us your challenge',
        },
      },
      caseStanton: {
        tocHeading: 'What this page covers',
        metaTitle: 'Stanton: invoices that stopped being typed, Ideasforge',
        metaDescription:
          'How we automated utility invoice entry for Stanton, with 98% going through untouched. And the day one supplier redesigned its invoice without telling anyone.',
        hero: {
          eyebrow: 'Case in production',
          title: 'Stanton: we assumed invoices do not change. Invoices change',
          subtitle:
            'Stanton is a property manager that used to key in every tenant’s electricity, gas and water invoices by hand, at a minute of typing per document. Today 98% go through without anyone touching them. This page tells how it works, why it comes in through a Telegram chat and what we had to add after one utility company redesigned its invoice without telling anyone.',
          cta: 'Start with the problem',
          ctaHref: '#problem',
        },
        sections: [
          {
            heading: 'A minute of typing per invoice',
            id: 'problem',
            part: 'The problem',
            paragraphs: [
              'Stanton manages properties. Every tenant brings their own electricity, gas and water invoices along with them. Every utility company issues them its own way, with the total wherever each one felt like putting it and the line items written in different words.',
              'Somebody turned those into data, document by document. <strong>A minute of typing per invoice, every month.</strong>',
              'None of this is a volume problem, it is a trust problem. As long as somebody has to check the row against the paper, the work has not gone away, it has only moved.',
            ],
          },
          {
            heading: 'Why it comes in through a Telegram chat',
            part: 'How it comes in',
            paragraphs: [
              'The team forwards the invoices to a Telegram chat, which acts as the inbox. There is no new tool to learn and no extra screen to open every morning.',
              'The choice has a part worth saying out loud. <strong>Telegram is not the channel people are used to.</strong> That is the reason almost nobody uses it for this.',
              'We picked it anyway because for this job it is the most workable option there is. Its programming interface is simple and free, so the inbox gets built in hours rather than weeks and it does not add a monthly fee to the project before anyone has shown that it works.',
              'And the part the team does care about holds. Forwarding a document to a chat is something anybody knows how to do from a phone, wherever they are.',
            ],
          },
          {
            heading: 'We assumed the format does not change',
            part: 'What we learned',
            paragraphs: [
              'The first version read each invoice, pulled out the fields and dropped them into the spreadsheet the team already worked with. It worked. That was not the problem.',
              'So what got past us? An assumption we had never written down anywhere. We took it for granted that a utility company always issues its invoices the same way.',
              'It does not. A utility company redesigns its invoice whenever it suits, without telling anyone and certainly without telling the property manager receiving them. The day that happens, the system keeps reading, keeps extracting and keeps writing rows. <strong>Only some of them no longer say what they appear to say.</strong>',
              'That is the expensive failure in this class of system. Not the one that breaks loudly, but the one that keeps running and fills a spreadsheet with data nobody is going to check again.',
            ],
          },
          {
            heading: 'That is why the flow checks the format before going on',
            part: 'What we learned',
            paragraphs: [
              '<strong>What we added was not more intelligence, it was a check.</strong> Before accepting the reading, the flow verifies that the invoice has the shape it is expected to have.',
              'When that check fails, the flow does not carry on. It does not try to guess where the total has moved to, it does not approximate it and it does not write a row with whatever it managed to pull. It stops and tells a person, with the document in front of them so they can decide.',
              'The invoice that arrives different stops being a silent data point and becomes a warning. It is more work on the day it happens and much less work in the months that follow, when nobody has to audit a spreadsheet backwards looking for the point where the figures stopped adding up.',
            ],
          },
          {
            heading: 'What gets checked before a number is accepted',
            part: 'What we learned',
            paragraphs: [
              'The format check is one of three. The other two are just as dull and do the same job.',
              'That every field is there, because a missing field cannot sit empty in the spreadsheet as if the number did not exist. That they add up between them, because a total that does not match its line items is a total you cannot rely on. And that the format is the expected one, which is the one we learned the hard way.',
              '<strong>All three run in the middle of the flow, before anything reaches the spreadsheet.</strong> Validating at the end, once the data is written, turns every error into a correction somebody has to trace.',
            ],
            link: { label: 'Why validation is the real product', href: '/en/blog/invoice-automation-ocr-ai' },
          },
          {
            heading: 'The 98% that goes through and the 2% that does not',
            part: 'What you see from outside',
            paragraphs: [
              'Today 98% of the invoices become rows without anyone touching them. The team no longer types amounts or dates.',
              '<strong>The remaining 2% does not disappear, it escalates.</strong> It comes out of the flow with the document beside it and the reason flagged, so whoever reviews it sees where it got stuck instead of having to hunt for it.',
              'And why not aim for a hundred percent? Because that split is what makes the number worth anything. A system that passed everything would be making things up in the 2% it did not understand. That 2% would land in the spreadsheet looking exactly like the rest.',
            ],
          },
          {
            heading: 'It started with one process and carried on with the rest',
            part: 'What you see from outside',
            paragraphs: [
              'These are two agents in production, not a platform. And the word agent is deliberate, because underneath each one there are flows, which are sequences of steps that run the same way every time.',
              '<strong>The agent is the one deciding which flow to trigger with whatever just arrived.</strong> It is the usual split, the model picks the path and the code walks it, with the difference that here the path is a whole flow rather than a query.',
              'They started with utility invoices, which was the process eating the most hours. Since then the client has been extending the automation to other back-office processes.',
              'That is the pattern we recommend and the one we see survive. The first process pays for the plumbing, the connection, the logging and the checks. The ones after it reuse all of that and get decided with the numbers from the one already running.',
              'On how long the first one takes, the straight answer depends on what is there at the start. With the data available, the access granted and the task clearly defined, a pilot in two weeks is realistic.',
            ],
            link: { label: 'How we approach process automation', href: '/en/services/ai-workflow-automation' },
          },
        ],
        cta: {
          heading: 'Is your team still typing documents?',
          body: 'Tell us your challenge and we reply within one business day. If we don’t see a return, we’ll tell you.',
          button: 'Tell us your challenge',
        },
      },
      caseBarceloneta: {
        tocHeading: 'What this page covers',
        metaTitle: 'Barceloneta Premium: filtering rental inquiries, Ideasforge',
        metaDescription:
          'An agent that handles Barceloneta Premium’s rental inquiries over WhatsApp and filters them. The first version had tools and would not use them.',
        hero: {
          eyebrow: 'Case in production',
          title: 'Barceloneta Premium: we gave the model tools and it did not use them',
          subtitle:
            'A rental agency in Barcelona gets dozens of inquiries a day over WhatsApp. Checking each one took five to ten minutes. Today an agent holds that conversation and hands the team a verdict ready to act on. This page tells how it works and, above all, why the first version had to be thrown away.',
          cta: 'Start with the problem',
          ctaHref: '#problem',
        },
        sections: [
          {
            heading: 'Ten minutes per inquiry, dozens of inquiries a day',
            id: 'problem',
            part: 'The problem',
            paragraphs: [
              'A rental agency gets inquiries all day and almost none of them lead anywhere. Every interested person writes over WhatsApp. Before you can say anything useful you have to find out what they are looking for, on what budget and what paperwork they have.',
              'That check took five to ten minutes per inquiry, with dozens arriving a day. In the rental peaks the work did not fit in the day, so replies got delayed and the person asking went cold while waiting.',
              '<strong>The bottleneck was not replying. It was working out, for each conversation, whether it was worth replying at all.</strong>',
            ],
          },
          {
            heading: 'The first version had tools and would not use them',
            part: 'What we removed',
            paragraphs: [
              'We built it the way almost everything sold as an agent gets built today. A model with a set of tools at its disposal, each one able to look something up or record something, plus the instruction to use them when needed.',
              'And what can go wrong there? That a lot of the time it did not use them. The tool was not failing, the connection was not failing and there was no error to look at. <strong>The model simply decided it could answer without calling the tool.</strong>',
              'That came out in two ways and neither is good. Either it made the answer up, because a model missing a fact fills the hole with something that sounds reasonable. Or it got stuck, telling the person it could not go any further when it could.',
              'What stands out about this case is that on paper everything was right. The tools existed, the instruction to use them was written down and it worked in testing. An instruction to a model is a request, not a guarantee. Here the request was nothing less than remembering to look before speaking.',
            ],
            link: { label: 'Why we do not like agentic architectures', href: '/en/blog/i-dont-like-ai-agents' },
          },
          {
            heading: 'The conversation stopped being the model’s business',
            part: 'How it works today',
            paragraphs: [
              'What we did was take away from the model the decision about where the conversation stands. That decision moved to a separate mechanism, written in code, that keeps track of where each chat has got to.',
              'It runs on two things. Which pieces of information have already been collected, because knowing the budget and not the paperwork is not the same as the other way round. And which stage of questions the conversation is in, because there is an order and the questions do not all get asked at once.',
              'With those two, the mechanism always knows the exact situation. And that is where the model comes back in, doing what it is good at: reading what the person just wrote and deciding which tool fits that particular state.',
              'The split is the usual one and that is why it works. <strong>The code keeps count and the model interprets.</strong> Neither one does the other’s job, so there is no longer any point where remembering something depends on a model’s goodwill.',
            ],
          },
          {
            heading: 'How a lead is judged suitable',
            part: 'How it works today',
            paragraphs: [
              'The agent does not fill in a form and send it. It asks the way somebody from the team would ask, gathering over the course of the conversation what the agency needs to know: solvency, whether there are pets, whether anyone smokes in the property and a few other things the agency defines.',
              'With that, the request gets classified as suitable or not. The criteria are set in advance, so the classification is always the same for the same answers and does not depend on the words somebody happened to use.',
              'And where do those criteria live? The answer is the part that usually surprises people. In a spreadsheet table, in the agency’s own Drive, which they open and edit whenever they like. If they change their mind about a requirement tomorrow, they change it there.',
              'Nobody has to tell us, nobody has to wait for a release on our side and there is no place in the system where that criterion is written down twice. <strong>Whoever sets the rules is whoever answers for them. That is why they live where that person can reach them.</strong>',
            ],
          },
          {
            heading: 'Who really decides, and what happens with silence',
            part: 'What it does not do',
            paragraphs: [
              'The agent closes nothing. Once it has gathered the information, it sends the team a summary with the classification and a paragraph explaining why. Somebody at the agency reads it and decides whether to book the viewing.',
              'That separation is not decoration. An automatic classification about people is a recommendation. The decision about who gets to rent a home belongs to whoever answers for it.',
              'And there is something the system does not do, on purpose. <strong>If the interested person stops replying, the conversation stays exactly where it was.</strong> It does not push, it does not remind them on the third day and it does not write again a week later.',
              'That was decided because chasing somebody who has gone cold does not pay off for the agency. It is one less feature to build, one less to maintain and one less to explain when somebody asks why a robot is writing to them.',
            ],
          },
          {
            heading: 'Why the summary goes out by email',
            part: 'What it does not do',
            paragraphs: [
              'The summary arrives by email, which at first glance looks like the lazy option when the agency has a CRM. The reason is duller and more common than it sounds.',
              'The agency’s CRM lets you read its data from outside, but it does not let you write to it. It has read endpoints rather than a full interface, so no external system can leave anything inside it.',
              'You can fight that or you can accept it. We build for what is there, so the verdict goes out through the channel that does work and reaches the person who has to decide just as fast.',
              'It is the kind of detail that shows up in no demo and decides the whole design. <strong>Before promising anyone that the result lands in their system, it is worth checking whether their system lets anything land.</strong>',
            ],
          },
          {
            heading: 'Three hours a day, and the signal that came later',
            part: 'What you see from outside',
            paragraphs: [
              'The agency puts what it gets back at more than three hours a day, in handling incoming requests alone. <strong>The team stopped doing triage and moved to booking viewings</strong>, which is the part of the job that brings in revenue.',
              'The person asking, on top of that, gets an answer straight away and at any hour, including the peaks where they used to be left waiting.',
              'The signal that matters most to us came later. The agency is extending the agent to home sales and to internal processes, on the same foundation that already filters rentals.',
            ],
            link: { label: 'The case told from the inside, on the blog', href: '/en/blog/ai-agent-real-estate' },
          },
        ],
        cta: {
          heading: 'Is your team doing triage instead of selling?',
          body: 'Tell us your challenge and we reply within one business day. If we don’t see a return, we’ll tell you.',
          button: 'Tell us your challenge',
        },
      },
      caseIndustrial: {
        tocHeading: 'What this page covers',
        metaTitle: 'A plant assistant for an industrial company, Ideasforge',
        metaDescription:
          'A plant assistant for a large industrial company. The first routing measurement came out at 72.8% over 118 real queries. And what we did with that number.',
        hero: {
          eyebrow: 'Case in production',
          title: 'A plant assistant, and what it cost to know whether it was right',
          subtitle:
            'A large industrial company had its operating knowledge split between dense manuals and the memory of its most experienced people. We built an assistant that answers from the company’s own systems and walks through the diagnosis step by step. This page tells how it is put together and what it cost us to show that it was getting the answers right.',
          cta: 'Start with the problem',
          ctaHref: '#problem',
        },
        sections: [
          {
            heading: 'Nobody reads the manual with the machine stopped',
            id: 'problem',
            part: 'The problem',
            paragraphs: [
              'The knowledge of a plant lives in two places and neither is at hand when you need it. Part of it is in long manuals, written to be read with time and calm. The other part is in the heads of the people who have worked there for years.',
              'Somebody standing in front of a stopped machine can reach neither. They are not going to read forty pages, and the person who knows may be on another shift or not in that day.',
              'What this company wanted was not a search engine. <strong>A search engine returns documents and leaves the reading to whoever has the least time.</strong> They wanted an answer, with the steps to follow, taken from their own systems.',
            ],
          },
          {
            heading: 'Half a dozen agents and a single point of contact',
            part: 'How it works',
            paragraphs: [
              'Underneath there is not one assistant but several. Half a dozen specialized agents, each with its own ground, coordinated by an orchestrator that decides which of them a query belongs to.',
              'From outside none of that shows. Whoever asks writes once and gets one answer, without picking a recipient and without knowing there is a division of labor in there.',
              'The division exists for a practical reason. <strong>An agent covering a narrow area answers better on that area than a general model trying to cover all of them at once.</strong>',
              'But that architecture solves one problem and creates another. A decision appears that did not exist before, which is getting right which agent each question belongs to. If that decision fails, it makes no difference how good the agent was that the query never reached.',
            ],
            link: { label: 'Why we do not like agentic architectures', href: '/en/blog/i-dont-like-ai-agents' },
          },
          {
            heading: 'The first measurement came out at 72.8%',
            part: 'What it cost to know',
            paragraphs: [
              'That decision has to be measured, and measuring it is work. We gathered 118 real queries, the kind actually asked on the plant floor. Then we checked one by one whether the question had reached the agent it belonged to.',
              'And how many landed where they should? 72.8%. <strong>Something more than one in four queries was ending up at the wrong agent.</strong>',
              'A number like that is uncomfortable to show and it is the only door there is to improving. <strong>Without measuring, what you have is the impression that it works, which is exactly what everybody has before they measure.</strong>',
              'With the 118 in front of you, you can see where it breaks. We corrected the routing and ran the same queries again, and a second round of corrections left it at 91.5%.',
              'The same 118 every round. Changing the exam between one measurement and the next turns the comparison into decoration.',
            ],
          },
          {
            heading: 'Why we stopped near 92%',
            part: 'What it cost to know',
            paragraphs: [
              'And how far do you keep going? From 91.5% to 100% there is a stretch, and the temptation to walk it is strong, because a round number shows far better.',
              'We decided to stop near 92% and say so out loud. <strong>Past a certain point, what improves is no longer the system but the exam.</strong>',
              'When you chase a perfect score, every case that fails pushes you to adjust the test until it stops failing. The number goes up, the system stays where it was and what you have built is an exam cut to fit whoever passes it.',
              'The same discipline took away an idea we liked. We tried a cheaper model for the routing and it lost ten points overall, which is already plenty.',
              'What mattered was in the tie cases, the ones where two agents could both fit and you have to pick well. There it fell from 89% to 44%. The saving was on the model bill and the cost was on the hard queries, which are the ones that make somebody ask in the first place.',
            ],
            link: { label: 'Measure AI by profit, not by productivity', href: '/en/blog/measure-ai-by-profit' },
          },
          {
            heading: 'Whoever asks is in charge, not the assistant',
            part: 'What holds the rest up',
            paragraphs: [
              'There are two decisions you cannot see from outside, and they are the ones that let this run inside a large company.',
              'The first is about permissions. <strong>The assistant has no access of its own to anything.</strong> When it queries a system it does so with the identity of the person asking, so each one sees what their role allows them to see and not one field more.',
              'The second is about exactness. When the answer has to include a reference text, the model does not write it. It returns a key and the code goes and fetches that text as it is stored, in its own words and with no variation.',
              'Both come from the same idea, the one that orders everything else. <strong>Anything that can have consequences is not left to a model’s judgment, it is settled in code.</strong>',
            ],
          },
        ],
        cta: {
          heading: 'Does your operating knowledge live in manuals and in three people’s memory?',
          body: 'Tell us your challenge and we reply within one business day. If we don’t see a return, we’ll tell you.',
          button: 'Tell us your challenge',
        },
      },
      caseWazzy: {
        tocHeading: 'What this page covers',
        metaTitle: 'Wazzy: our WhatsApp appointment assistant, Ideasforge',
        metaDescription:
          'Wazzy handles hundreds of appointments a month over WhatsApp in clinics, with health data involved and without a single appointment ever being booked twice.',
        hero: {
          eyebrow: 'Our own product',
          title: 'Wazzy: hundreds of appointments a month and none ever booked twice',
          subtitle:
            'Wazzy is our appointment assistant on WhatsApp. It works in dental, physiotherapy and aesthetics clinics, it handles health data every day and it is the system where we try things first before building them for a client.',
          cta: 'See how it works',
          ctaHref: '#what-it-does',
        },
        sections: [
          {
            heading: 'Wazzy answers the clinic’s WhatsApp at any hour',
            id: 'what-it-does',
            part: 'What it is',
            paragraphs: [
              'A small clinic loses bookings for a fairly untechnical reason. The person on the desk is with somebody in front of them, and whoever writes in asking for an appointment gets no reply. Wazzy answers that message at eleven at night or in the middle of a consultation.',
              '<strong>It books, changes and cancels appointments over WhatsApp. It leaves the calendar and the patient record up to date without anyone typing anything in the morning.</strong> It is in production in dental, physiotherapy and aesthetics clinics, and it handles hundreds of appointments a month.',
              'A conversation like that fits in four messages. Somebody writes at half past ten at night saying they need an appointment for a cleaning, afternoon if possible. Wazzy offers two specific slots, the person picks one and the appointment is in the clinic’s calendar before anybody unlocks the door.',
              'When the message is not a booking, the work looks more like a receptionist’s. An hour has to be moved, and “next week is not great after all” has to be understood as a cancellation. And sometimes you have to notice that whoever is writing has a pain that will not wait until Thursday. That last one the assistant does not resolve, it escalates to a person.',
            ],
            link: {
              label: 'What we build with this for other companies',
              href: '/en/services/conversational-ai',
            },
          },
          {
            heading: 'What can be checked from outside',
            part: 'Why we trust it',
            paragraphs: [
              '<strong>The first version of Wazzy was an agent with tools at its disposal and we left it behind.</strong> The one in production today splits the work differently, with much more weight on the code side and considerably less on the model side. How it is put together inside is not something we are going to spell out here, among other reasons because it is not information we owe the competition. What we can show is what that decision produces.',
              'No appointment has ever been booked twice in the whole history of the product. Not one. It is a failure you cannot fix with an apology, because when it happens there are two people at the door at the same time and one of them has to go home.',
              '<strong>Nothing reaches production without first passing a battery of real cases with their correct answers written down.</strong> That includes what the clinic itself edits from its own panel, which does not change what the assistant answers until the battery approves it. And we pin the model version, so a provider update does not turn up on its own in production on a Tuesday morning.',
              'On the running system there are 103 checks watching, tied to 91 named rules the system has to satisfy. And once a week a test walks the whole system end to end, booking an appointment the way a person would.',
            ],
          },
          {
            heading: 'An appointment at a clinic is health data',
            part: 'Health data',
            paragraphs: [
              'That changes the rules before a line is written. European rules set health data apart in Article 9, among the categories that cannot be processed without a listed reason. The one that covers a clinic is 9.2.h, the healthcare one.',
              '<strong>Yes, we do store personal data.</strong> Saying otherwise would be more comfortable and it would be false. What we do is store it encrypted field by field rather than encrypting the whole store in one piece, so what gets decrypted is the field needed at that moment.',
              'The law sets how long a medical record has to be kept, but that duty belongs to the clinic and not to us. Wazzy deletes on request everything that has no legal period over it. What does have one is kept for as long as that period lasts.',
              '<strong>And the model does not talk to the database.</strong> The two things an assistant can get wrong here, inventing a fact or pulling somebody else’s, do not depend on the model behaving well.',
            ],
            link: { label: 'How we handle personal data, in detail', href: '/en/gdpr-compliant-ai' },
          },
          {
            heading: 'The emoji that closed a confirmation',
            part: 'The scar',
            paragraphs: [
              'No system in production is free of having done something silly. This is ours, and we tell it because a rule came out of it that we have used ever since in everything we build.',
              'The assistant had asked somebody to confirm they were coming to an appointment, and that question stayed open for twenty-four hours. Two and a half hours later, the person replied with two emojis. The assistant read them for what they were, something that was not about the appointment, but in marking them that way it treated the confirmation as closed.',
              'A minute later that same person wrote to say they were coming. There was nothing open left to confirm. The appointment stayed as pending, the clinic never knew they were coming <strong>and they came</strong>.',
              '<strong>The confirmation had twenty-one hours of life ahead of it. It did not expire, an emoji killed it.</strong> Out of that came a one-line rule that now goes into everything we build. A message not being about something does not mean that something has finished. Only an action closes an action.',
              'And we measure it, because an anecdote without a number is no use for deciding anything. Across the life of the product there are 287 confirmations that went the right way, 105 that expired with no reply and 10 that burned like that one.',
            ],
          },
          {
            heading: 'What we learn here ends up in your project',
            part: 'What you take from it',
            paragraphs: [
              '<strong>Wazzy is the only system of ours where we are the ones who pay when something goes wrong.</strong> That is why it is where we try things first. Almost everything we know about what breaks in a conversational assistant, we know because of it. That learning arrives at client projects already done.',
              'A client does not buy Wazzy. Wazzy belongs to a clinic and to its appointments. What we build for another company is built for that company’s problem. What carries over from here is the method, which is the tests in front of every change and the discipline of not leaving a model a decision the code can make.',
            ],
            link: {
              label: 'How we build a custom agent',
              href: '/en/services/ai-agent-development',
            },
          },
        ],
        cta: {
          heading: 'Do you want one like this for your company?',
          body: 'Tell us your challenge and we reply within one business day. If we don’t see a return, we’ll tell you.',
          button: 'Tell us your challenge',
        },
      },
    },
  },
};
