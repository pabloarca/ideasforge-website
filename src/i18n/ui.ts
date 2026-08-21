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
}

export interface LongFormPageContent {
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
        'Un agente de IA que atiende solicitudes 24/7, cualifica a los interesados y solo escala al equipo los que cumplen criterio. Especialmente útil en picos de demanda de alquiler.',
      accountingTitle: 'IA para gestorías y administradores de fincas, Ideasforge',
      accountingDescription:
        'Automatización documental con IA: facturas, tickets y formularios escaneados que entran al ERP sin pasar a mano.',
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
          body: 'Un agente conversacional que recibe la solicitud, pregunta zona, presupuesto, fechas y requisitos y solo escala al equipo las solicitudes que pasan el filtro. Devuelve respuesta inmediata al cliente y deja el rastro completo en el CRM.',
        },
        proof: {
          heading: 'Prueba en producción',
          body: 'Es el sistema que construimos para Barceloneta Premium. Más de tres horas ahorradas al día solo en gestionar solicitudes entrantes y un equipo humano que ya solo concierta visitas en lugar de hacer triaje.',
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
        metaTitle: 'Qué es un agente de IA y cómo funciona en una empresa, Ideasforge',
        metaDescription:
          'Guía sobre agentes de IA, IA agéntica y automatización con IA: qué son, en qué se diferencian de un chatbot, qué puede salir mal y cómo se controla. Con casos reales en producción.',
        hero: {
          eyebrow: 'Guía',
          title: 'Agentes de IA: qué son y para qué sirven en tu empresa',
          subtitle:
            'Qué es exactamente un agente, en qué se diferencia de un chatbot, qué puede salir mal y cómo se controla. Escrito por un equipo que los mantiene en producción.',
          cta: 'Ver los cinco casos en producción',
          ctaHref: '#casos',
        },
        stats: [
          { value: '5', label: 'sistemas nuestros funcionando hoy con usuarios reales' },
          { value: '118', label: 'casos reales en el banco de pruebas de uno de ellos' },
        ],
        sections: [
          {
            heading: 'Qué es un agente de IA',
            paragraphs: [
              'Un agente de IA es un programa que usa un modelo de lenguaje para decidir qué hacer, no solo qué decir. Recibe una petición, consulta las herramientas que tiene permitidas (una base de datos, un calendario, un sistema de facturación) y encadena los pasos necesarios hasta resolverla. La diferencia con un programa clásico está en quién marca el camino: en el programa clásico lo fijó quien lo programó. En un agente lo elige el modelo en cada caso.',
              'Un ejemplo real de nuestros proyectos. Un paciente escribe por WhatsApp «¿puedo cambiar mi cita del jueves?». El agente entiende la petición, comprueba la agenda de la clínica en tiempo real, propone huecos y confirma el cambio. Nadie del equipo ha intervenido y el calendario y la ficha quedan actualizados.',
            ],
          },
          {
            heading: 'Qué es la IA agéntica',
            paragraphs: [
              'IA agéntica es el nombre que ha recibido esta forma de trabajar: sistemas donde el modelo no se limita a redactar una respuesta, sino que planifica, usa herramientas y ejecuta. El término viene del inglés «agentic AI» y se ha instalado en español durante el último año.',
              'Detrás de la etiqueta hay una idea sencilla. Con un modelo de lenguaje puedes generar texto. Con un agente puedes delegar una tarea: cualificar a un interesado, registrar una factura, diagnosticar una avería siguiendo un árbol de decisión. El valor no está en la conversación. Está en la tarea terminada.',
              'Los proyectos suelen tomar una de dos formas. El agente conversa, usa herramientas y resuelve la tarea de principio a fin. La automatización con IA quita los pasos manuales de un proceso que ya existe: llega una factura, se lee, se valida y se registra sin que nadie teclee. Se combinan a menudo y en nuestros proyectos conviven.',
            ],
            link: { label: 'Automatización de procesos con IA', href: '/servicios/automatizacion-de-procesos-con-ia' },
          },
          {
            heading: 'En qué se diferencia de un chatbot',
            paragraphs: [
              'Un chatbot tradicional sigue un guion: botones, opciones cerradas, respuestas prefabricadas. Cuando la pregunta se sale del guion, se rompe. Un agente entiende lenguaje natural y decide entre las acciones disponibles, así que la misma pregunta formulada de veinte maneras llega al mismo sitio.',
              'La diferencia práctica se ve en nuestro asistente de datos: responde a «cuánto produjimos ayer» y también a «dame los kilos medios por centro esta semana, desglosados por día». Nadie escribió esas preguntas de antemano.',
            ],
            link: { label: 'Cómo construimos agentes conversacionales', href: '/servicios/agentes-conversacionales' },
          },
          {
            id: 'casos',
            heading: 'Lo que un agente puede hacer hoy: cinco casos en producción',
            paragraphs: [
              'Todo lo que sigue está funcionando ahora mismo, con usuarios reales.',
            ],
            bullets: [
              'Un asistente de planta industrial con el que operarios y supervisores consultan datos de producción y averías en lenguaje natural.',
              'Un asistente que traduce preguntas de negocio a consultas seguras sobre la base de datos y responde en segundos, con gráfica cuando hace falta.',
              'Una automatización que lee facturas escaneadas y las registra sin que nadie las pase a mano.',
              'Un agente que cualifica a los interesados de una inmobiliaria las 24 horas y ahorra al equipo más de tres horas diarias.',
              'Wazzy, nuestro producto: un asistente en WhatsApp que gestiona reservas de citas para clínicas y negocios de servicios.',
            ],
            link: { label: 'Ver los proyectos', href: '/#proyectos' },
          },
          {
            heading: 'Lo que puede salir mal y cómo se controla',
            paragraphs: [
              'El fallo típico de un agente no es un error visible: es una respuesta bien redactada y equivocada. Por eso un agente serio no se entrega con una demostración. Se entrega con una batería de pruebas que se ejecuta antes de cada cambio y con un registro que permite reconstruir cada decisión.',
              'La seguridad se resuelve con permisos. En nuestros sistemas el modelo elige entre un conjunto cerrado de acciones que el código revisa antes de ejecutar y nunca tiene más permisos que la persona que lo usa. Un mensaje malicioso puede, como mucho, equivocarse de opción dentro de una lista ya revisada.',
            ],
          },
          {
            heading: 'Cómo saber si tu empresa necesita uno',
            paragraphs: [
              'Empieza por la tarea, no por la tecnología. Si en tu empresa hay un trabajo que exige leer, decidir y actuar sobre sistemas que ya tienes y se repite decenas de veces al día, es un candidato: cualificar solicitudes, registrar documentos, responder consultas sobre datos internos.',
              'Nuestro método arranca ahí: exploramos contigo dónde está el dolor, escogemos lo que tiene retorno tangible y construimos en producción, no un prototipo. Si algo no compensa, te lo decimos.',
            ],
            link: { label: 'Desarrollo de agentes de IA para empresas', href: '/servicios/desarrollo-de-agentes-de-ia' },
          },
        ],
        faqHeading: 'Preguntas frecuentes sobre agentes de IA',
        faq: [
          {
            q: '¿Un agente de IA sustituye a las personas del equipo?',
            a: 'En los casos que hemos llevado a producción, absorbe la parte repetitiva y el equipo se queda con la que necesita criterio. En la inmobiliaria, el agente filtra y las personas conciertan visitas. En la gestoría, el agente registra facturas y el equipo revisa los casos dudosos.',
          },
          {
            q: '¿Qué pasa cuando el agente no sabe responder?',
            a: 'Un agente bien construido reconoce sus límites: escala la conversación a una persona con todo el contexto o responde con lo que tiene y dice qué se ha quedado fuera. La respuesta inventada es un fallo de diseño, no una fatalidad.',
          },
          {
            q: '¿Cuánto se tarda en poner uno en producción?',
            a: 'Depende de los sistemas con los que tenga que hablar y de las garantías que exija tu sector. La primera versión útil se acota a una tarea concreta. Crecer viene después, cuando está validado.',
          },
          {
            q: '¿Los datos de mi empresa se usan para entrenar modelos?',
            a: 'No. Los sistemas que construimos consultan tus datos para responder, con tus permisos y guardan lo mínimo para funcionar. Dónde viven los datos lo decides tú.',
          },
        ],
        cta: {
          heading: '¿Tiene sentido un agente en tu empresa?',
          body: 'Cuéntanos tu reto. Si no le vemos retorno, te lo diremos.',
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
          'Desarrollo de chatbots con inteligencia artificial y agentes conversacionales que atienden, cualifican y actúan: citas reservadas, solicitudes filtradas y dudas resueltas sobre tus sistemas.',
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
        metaTitle: 'AI Automation: a practical guide for businesses, Ideasforge',
        metaDescription:
          'What AI automation is, how it differs from the automation you already know, what AI agents and workflow automation can do today, and how to tell if your company needs it.',
        hero: {
          eyebrow: 'Guide',
          title: 'AI automation: what it is and what it can do for your business',
          subtitle:
            'What AI automation actually covers, how it differs from the automation you already know, what can go wrong and how it is kept under control. Written by a team that maintains these systems in production.',
          cta: 'See the five systems in production',
          ctaHref: '#casos',
        },
        stats: [
          { value: '5', label: 'of our systems running today with real users' },
          { value: '118', label: 'real cases in the test battery of one of them' },
        ],
        sections: [
          {
            heading: 'What AI automation is',
            paragraphs: [
              'AI automation uses language models to handle work that classic automation could never reach: tasks that involve reading, interpreting and deciding. A classic automation follows fixed rules. An AI automation reads an invoice it has never seen, understands a question phrased in twenty different ways, or works out which department an alert belongs to.',
              'The pieces are not exotic. A model interprets, your existing systems execute, and a layer of code in between validates every step before anything runs.',
            ],
          },
          {
            heading: 'Two shapes: AI agents and workflow automation',
            paragraphs: [
              'Most projects take one of two shapes. AI workflow automation removes the manual steps from an existing process: an invoice arrives, gets read, validated and registered without anyone typing. AI agents go further: they hold a conversation, use tools and complete a task end to end, like qualifying a rental applicant or booking an appointment.',
              'The two combine. For one of our clients, an agent receives scanned invoices through a chat and a workflow turns them into clean, structured records. The client uploads a document and gets data back.',
            ],
            link: { label: 'How we build enterprise AI agents', href: '/en/ai-agent-development' },
          },
          {
            id: 'casos',
            heading: 'What it looks like in production: real cases',
            paragraphs: ['Everything below is running right now, with real users.'],
            bullets: [
              'A plant-floor assistant where operators query production and fault data in natural language, on the company’s own infrastructure.',
              'An assistant that turns business questions into safe database queries and answers in seconds, chart included when useful.',
              'An invoice automation that reads scanned documents and registers them without manual typing.',
              'A real-estate agent that qualifies leads around the clock and saves the team more than three hours a day.',
              'Wazzy, our own product: a WhatsApp assistant that manages appointment bookings for clinics and service businesses.',
            ],
            link: { label: 'See the projects', href: '/en/#proyectos' },
          },
          {
            heading: 'How it differs from the automation you already have',
            paragraphs: [
              'Rule-based tools automate the predictable and break when the input varies: a new invoice layout, a question phrased differently, an unexpected field. Language models absorb that variation. That is why the processes that resisted automation for years, the ones with documents, conversations or judgment in the middle, are the ones opening up now.',
              'It cuts both ways. A rules engine fails loudly; a model can fail with a fluent, wrong answer. Measurement matters more here than anywhere else.',
            ],
          },
          {
            heading: 'The part nobody shows in the demo: keeping it reliable',
            paragraphs: [
              'The expensive failure in AI automation sets off no alarm: clean records and a wrong answer. A serious system ships with a battery of tests that runs before every change, a record that lets you reconstruct each decision, and alarms that are themselves tested. With that discipline we calibrated a routing component from 72% to 91% accuracy over 118 real cases.',
              'Security follows one principle: contain with permissions, not with filters. The model chooses from a closed, reviewed set of actions and never holds more permissions than the person using it.',
            ],
          },
          {
            heading: 'How to tell if your company needs it',
            paragraphs: [
              'Start from the task. If some work in your company requires reading, deciding and acting on systems you already run, and it repeats dozens of times a day, it is a candidate: qualifying requests, registering documents, answering questions about internal data.',
              'Our method starts there: we map where the pain is, pick what has tangible return and build in production, not a prototype. If something does not pay off, we tell you.',
            ],
            link: { label: 'AI workflow automation services', href: '/en/ai-workflow-automation' },
          },
        ],
        faqHeading: 'Frequently asked questions about AI automation',
        faq: [
          {
            q: 'Does AI automation replace the team?',
            a: 'In the cases we have shipped, it absorbs the repetitive part and the team keeps the part that needs judgment. The real-estate agent filters, people close. The invoice system registers, people review the edge cases.',
          },
          {
            q: 'What happens when the AI gets it wrong?',
            a: 'It will, occasionally. The difference between a demo and a production system is whether you find out first. We measure every change before it ships and keep a record that shows why each answer was given.',
          },
          {
            q: 'Do we need to change our current systems?',
            a: 'No. The AI connects to what you already run: your database, your ERP, your calendar, your messaging channels. Your systems stay where they are.',
          },
          {
            q: 'Is our data used to train models?',
            a: 'No. The systems we build query your data to answer, with your permissions, and store the minimum needed to work. Where the data lives is your decision.',
          },
        ],
        cta: {
          heading: 'Does AI automation fit your company?',
          body: 'Tell us your challenge. If we don’t see a return, we’ll tell you.',
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
            paragraphs: [
              'We are engineers, not auditors. We do not certify your compliance, we do not issue legal opinions and we do not sign off on your risk classification. Those are jobs for your lawyers and your data protection officer, and any provider who offers to settle them for you in a sales call is offering something they cannot deliver.',
              'What we do is build the system underneath so that those people have something solid to assess. When your DPO asks where the data went, who could have seen it and why the assistant answered what it answered, the answer exists, is written down and can be shown. Most AI projects cannot do that, which is why so many of them stall the moment legal gets involved.',
              'This page explains, mechanism by mechanism, how our systems make those answers possible. It is written for the person who has to defend the project in front of a committee. If that is you, by the end you should know exactly which questions to put to us, or to anyone else bidding for the work.',
            ],
          },
          {
            heading: 'What GDPR-compliant AI actually means',
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
            heading: 'EU AI Act compliance, in plain terms',
            id: 'eu-ai-act',
            paragraphs: [
              'Two European rules now apply to a company deploying AI, and they answer different questions. The GDPR governs what you may do with personal data, whoever processes it. The AI Act governs the systems themselves, sorted by how much harm they could do. You comply with both at once, not with one or the other.',
              'The AI Act arrived in stages. Bans on a short list of unacceptable practices, social scoring among them, have applied since 2 February 2025. Obligations for the providers of general-purpose models followed on 2 August 2025. The broad middle of the regulation, including the duties of companies that deploy high-risk systems, applies since 2 August 2026. A final tranche for AI embedded in already-regulated products arrives in 2027.',
              'The fines are tiered. Prohibited practices reach 35 million euros or 7 percent of worldwide turnover, most other breaches reach 15 million or 3 percent, and which bracket a given failure falls into is, again, a question for counsel. What matters for a buyer is the shape of the duties underneath, because for deployers they are mostly about being able to demonstrate things. Keeping logs the system produced itself. Assigning real human oversight instead of nominal oversight. Knowing which data went in and being able to say so.',
              'Whether your particular use counts as high-risk is a legal judgment and we will not make it for you. What we can tell you is that the systems we build record the decision rather than only the result, and that this is precisely the capability that is expensive to retrofit once a system is live. Teams that treated logging as an afterthought are now rebuilding pipelines that we switch on from day one.',
              'One more piece of the landscape matters when you buy. In December 2024 the European Data Protection Board published Opinion 28/2024, its first word on AI models themselves. Two findings stand out. Whether a trained model is anonymous gets assessed case by case, and legitimate interest can only carry AI processing after a documented three-step assessment. Neither is a rubber stamp. Both reward providers who can show their homework, which is the posture this whole page describes.',
            ],
          },
          {
            heading: 'Where your data actually goes',
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
            paragraphs: [
              'Our systems share one design rule. Judgment lives in the code, interpretation of the world lives in the model, and knowledge lives in the data. The model reads a person’s question and hands over a structured form, a contract in a fixed format whose fields we defined in advance. Code validates that form, checks the permissions of whoever is asking and decides what actually happens. The queries that touch your data are built by the code from the validated form, with values passed as parameters and column names drawn from a closed list, never assembled from text the model wrote.',
              'Where records matter most we go a step further. In one of our assistants the model does not even return the text that ends up in front of the user. It returns a key, an identifier, and the code looks up the canonical text that key points to. What the person reads is guaranteed to be what was approved, word for word, no matter what the model generated around it.',
              'Identity follows the same rule. When an assistant queries an internal system on someone’s behalf, it carries that person’s own identity token, the credential your systems already use to know who is asking. Every downstream call runs with the permissions of the human, not with the broad permissions of a robot account. If the person cannot open a record by hand, the assistant cannot open it for them. A whole family of GDPR access questions dissolves at that point, because the access model of the assistant is the access model your company already audited.',
            ],
            link: { label: 'Why we distrust agentic architectures, in detail', href: '/en/blog/i-dont-like-ai-agents' },
          },
          {
            heading: 'Health data, under the strictest article there is',
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
    },
  },
};
