/*
  Herramienta «¿Qué tareas automatizar primero?» (t0190).

  Historia corta:
  - 20 oct 2026: rehecha desde el prototipo del 15 oct. La cuenta mide
    ganancia y no productividad, sin la cita cancelada entre lo irreversible,
    y se mide sin pedir correo.
  - 21 oct 2026, mañana: tras leer a Tobias Zwingmann
    (`.private/referencias/zwingmann/analisis-que-automatizar.md`), la cuenta
    se invierte (tope de gasto a uno y dos años), las horas solo cuentan si se
    pagan aparte, si no compensa se dice primero, hay condiciones en «Ojo», la
    cifra de partida es de una semana, el siguiente paso es probar con casos
    reales y la revisión se pide por correo. Suelo: 700 € y 70 €/mes.
  - 21 oct 2026, tarde: una prueba simulada con 50 perfiles de pyme (23 sí,
    19 a medias, 8 no) rehízo las preguntas y el árbol, y el propietario pidió
    una pregunta por pantalla, con barra de progreso y lenguaje de andar por
    casa. Los números se eligen entre opciones; nada hay que calcularlo.

  - 21 oct 2026, noche: sin símbolo de moneda, para que sirva también a quien
    llega de Latinoamérica o de Estados Unidos (propietario: «quitemos el
    símbolo del precio»). Las cifras valen en euros o en dólares y la página
    lo dice donde se elige una cantidad. Llegan además el título y la
    descripción para «qué tareas automatizar» y «procesos que se pueden
    automatizar», los ejemplos por departamento y tres preguntas frecuentes.

  El espejo inglés vive en `que-automatizar-en.ts`, con las mismas preguntas,
  los mismos valores y los mismos números: la lógica lee `v` y `n`, y
  `npm run check:herramienta` comprueba que los dos idiomas coinciden.
*/

export type Opcion = { v: string; l: string; n?: number | null };
export type Paso = {
  id: string;
  tipo: 'texto' | 'una' | 'varias';
  q: string;
  hint?: string;
  placeholder?: string;
  /** Caracteres como máximo; el campo enseña cuántos lleva («12/80»). */
  max?: number;
  opts?: Opcion[];
  /** Pregunta que se abre en la misma pantalla al elegir `si`. */
  sub?: { id: string; si: string | string[]; q: string; hint?: string; opts: Opcion[] };
  /** Solo se pregunta si se cumple (lo evalúa el script). */
  cuando?: 'fallos';
};

const pasos: Paso[] = [
  {
    id: 'name',
    tipo: 'texto',
    q: '¿Qué tarea te gustaría quitarte de encima?',
    placeholder: 'Por ejemplo: pasar las facturas al programa de contabilidad',
    max: 80,
    hint: 'Con un nombre corto basta. Es para reconocerla después.',
  },
  {
    id: 'veces',
    tipo: 'una',
    q: '¿Cada cuánto se hace?',
    opts: [
      { v: 'pocas', l: 'Pocas veces al mes', n: 5 },
      { v: 'semana', l: 'Varias veces a la semana', n: 15 },
      { v: 'diaria', l: 'Una vez al día', n: 22 },
      { v: 'dia', l: 'Varias veces al día', n: 105 },
      { v: 'decenas', l: 'Decenas de veces al día', n: 630 },
      { v: 'cientos', l: 'Cientos de veces al día', n: 4200 },
    ],
  },
  {
    id: 'min',
    tipo: 'una',
    q: '¿Cuánto se tarda cada vez?',
    hint: 'Cada vez es cada factura, cada correo o cada pedido, no todo el día junto. De principio a fin, contando lo que hay que buscar y comprobar.',
    opts: [
      { v: 'm3', l: 'Menos de 5 minutos', n: 3 },
      { v: 'm10', l: 'Entre 5 y 15 minutos', n: 10 },
      { v: 'm22', l: 'Entre 15 minutos y media hora', n: 22 },
      { v: 'm45', l: 'Entre media hora y una hora', n: 45 },
      { v: 'm90', l: 'Más de una hora', n: 90 },
    ],
  },
  {
    id: 'hace',
    tipo: 'varias',
    q: '¿Qué hay que hacer?',
    hint: 'Marca todo lo que haga falta.',
    opts: [
      { v: 'normas', l: 'Copiar datos o seguir unas normas fijas (si pasa esto, se hace aquello)' },
      { v: 'cuentas', l: 'Hacer cuentas: presupuestos, precios, importes, cantidades' },
      { v: 'repartir', l: 'Organizar quién hace qué y cuándo: turnos, rutas, citas o producción' },
      { v: 'leer', l: 'Leer lo que llega: correos, mensajes, PDF, fotos o audios' },
      { v: 'escribir', l: 'Escribir: respuestas, informes, descripciones' },
      { v: 'decidir', l: 'Decidir algo que solo sabe hacer bien alguien con experiencia' },
    ],
    sub: {
      id: 'normas',
      si: 'normas',
      q: 'Esas normas…',
      opts: [
        { v: 'lista', l: 'Están escritas en una lista o una tabla' },
        { v: 'documentos', l: 'Están en documentos largos que hay que interpretar, como un convenio o una póliza' },
        { v: 'nadie', l: 'No están escritas: las sabe alguien' },
      ],
    },
  },
  {
    id: 'pasos',
    tipo: 'una',
    q: 'Si se lo explicaras a alguien nuevo, ¿le bastaría con una lista de pasos?',
    opts: [
      { v: 'igual', l: 'Sí. Los pasos son siempre los mismos, aunque cambien los datos' },
      { v: 'casi', l: 'Sí, salvo algún caso raro que le pasaría a un compañero' },
      { v: 'conversa', l: 'No. Hay que ir hablando con la persona: preguntarle, darle opciones, confirmar' },
    ],
  },
  {
    id: 'info',
    tipo: 'varias',
    q: '¿De dónde sale lo que hace falta para hacerla?',
    hint: 'Marca todo lo que haya.',
    opts: [
      { v: 'programa', l: 'De un programa o una hoja compartida (el de facturación, la agenda, un Excel)' },
      { v: 'correos', l: 'De correos, mensajes o archivos sueltos' },
      { v: 'papel', l: 'De papeles: albaranes, partes, notas a mano' },
      { v: 'cabeza', l: 'De lo que sabe alguien y no está escrito en ningún sitio' },
    ],
    sub: {
      id: 'cabeza',
      si: 'cabeza',
      q: '¿Cuánto de lo necesario está solo en su cabeza?',
      opts: [
        { v: 'todo', l: 'Casi todo' },
        { v: 'parte', l: 'Solo una parte, como precios o normas de la casa' },
      ],
    },
  },
  {
    id: 'sensibles',
    tipo: 'una',
    q: '¿Se manejan datos delicados?',
    opts: [
      { v: 'salud', l: 'Sí, de salud' },
      { v: 'personales', l: 'Sí, datos personales, económicos o confidenciales' },
      { v: 'no', l: 'No' },
    ],
  },
  {
    id: 'destino',
    tipo: 'una',
    q: 'Cuando está hecha, ¿adónde va?',
    opts: [
      { v: 'equipo', l: 'Lo usa alguien de tu equipo' },
      { v: 'programa', l: 'Se mete en un programa (facturación, pedidos, agenda)' },
      { v: 'publica', l: 'Se publica: en la web, un portal o las redes' },
      { v: 'cliente', l: 'Le llega a un cliente, a un proveedor o a la Administración' },
    ],
  },
  {
    id: 'revisa',
    tipo: 'una',
    q: '¿Quieres que alguien lo mire antes de darlo por bueno?',
    opts: [
      { v: 'todo', l: 'Sí, todo' },
      { v: 'dudosos', l: 'Solo lo que tenga dudas' },
      { v: 'no', l: 'No, que se haga solo' },
    ],
  },
  {
    id: 'riesgo',
    tipo: 'una',
    q: 'Si un día sale mal, ¿qué pasa?',
    hint: 'Piensa solo en esta tarea. Si después una persona ya aprueba el pago o el envío, elige la del medio.',
    opts: [
      { v: 'leve', l: 'Se ve enseguida y se arregla sin que nadie de fuera se entere' },
      { v: 'cuesta', l: 'Se arregla, pero cuesta tiempo, dinero o un cliente molesto' },
      { v: 'irreversible', l: 'Sale dinero, mercancía o un mensaje a muchos clientes, y ya no hay vuelta atrás' },
    ],
  },
  {
    id: 'fallos',
    tipo: 'una',
    q: 'Hoy, ¿cuántas veces al mes sale mal o llega tarde?',
    hint: 'Un error, algo que se olvida, un cliente que espera demasiado.',
    opts: [
      { v: 'f0', l: 'Nunca o casi nunca', n: 0 },
      { v: 'f1', l: 'Una o dos veces', n: 1.5 },
      { v: 'f6', l: 'Entre 3 y 10 veces', n: 6 },
      { v: 'f20', l: 'Más de 10 veces', n: 20 },
    ],
  },
  {
    id: 'coste',
    tipo: 'una',
    cuando: 'fallos',
    q: 'Cada vez que pasa, ¿cuánto te cuesta más o menos?',
    hint: 'Lo que se pierde de verdad: un recargo, un descuento, un cliente que se va. Si solo se retrasa un cobro, cuenta poco. El sueldo de quien hace la tarea no cuenta aquí. Puedes pensar en euros o en dólares.',
    opts: [
      { v: 'c0', l: 'Nada, solo la molestia', n: 0 },
      { v: 'c25', l: 'Menos de 50', n: 25 },
      { v: 'c150', l: 'Entre 50 y 300', n: 150 },
      { v: 'c600', l: 'Entre 300 y 1.000', n: 600 },
      { v: 'c1500', l: 'Más de 1.000', n: 1500 },
      { v: 'nose', l: 'No lo sé', n: null },
    ],
  },
  {
    id: 'tiempo',
    tipo: 'una',
    q: 'Si te quitaras este trabajo de encima, ¿qué haríais con ese tiempo?',
    opts: [
      { v: 'vender', l: 'Atender a más clientes o vender más' },
      { v: 'pagar', l: 'Dejar de pagar horas extra o a alguien de fuera' },
      { v: 'nada', l: 'Nada en concreto, iríamos más desahogados' },
    ],
    sub: {
      id: 'hora',
      si: ['vender', 'pagar'],
      q: '¿Cuánto cuesta cada hora de ese trabajo, más o menos?',
      hint: 'Si es para vender, lo que te deja una hora de venta. Si es para dejar de pagar, lo que pagas por esa hora. En euros o en dólares.',
      opts: [
        { v: 'h15', l: 'Unos 15', n: 15 },
        { v: 'h25', l: 'Unos 25', n: 25 },
        { v: 'h40', l: 'Unos 40', n: 40 },
        { v: 'h60', l: 'Más de 50', n: 60 },
      ],
    },
  },
];

export const qa = {
  /** Formato de los números que pinta el script. */
  locale: 'es-ES',
  /* Título y descripción (21 oct 2026): la página posee «qué tareas
     automatizar» y «procesos que se pueden automatizar» (árbitro §5). Son
     términos de 10-100 búsquedas al mes, pero con la intención exacta de la
     herramienta, y en Google solo salen listas de ejemplos. */
  metaTitle: 'Qué tareas automatizar primero: test gratuito, Ideasforge',
  metaDescription:
    'Test gratuito para saber qué procesos de tu empresa se pueden automatizar. Contestas unas preguntas sobre una tarea y te decimos si compensa y cuánto ahorrarías.',
  /** Dato estructurado de la herramienta (`WebApplication`). */
  app: {
    name: 'Qué tareas automatizar primero',
    description: 'Test gratuito que dice si merece la pena automatizar una tarea de tu empresa, con qué tipo de solución y en cuánto tiempo se recupera.',
  },
  breadcrumb: 'Qué automatizar primero',
  hero: {
    kicker: 'Herramienta gratuita',
    title: '¿Qué tareas automatizar primero?',
    lead: [
      'Contesta unas preguntas rápidas sobre una tarea de tu empresa y te decimos si merece la pena automatizarla, cómo y cuánto podrías ahorrar.',
      /* Delegar, no solo automatizar (propietario, 22 oct 2026): la mitad de
         los resultados dejan a una persona aprobando, y uno no usa IA. */
      'No siempre se trata de automatizar del todo. A veces la IA prepara el trabajo y una persona de tu equipo lo aprueba, y a veces basta un programa sin IA.',
      'Casi todas se contestan con un toque. Puedes probar varias tareas y ver por cuál empezar.',
    ],
    cta: 'Empezar',
  },
  pasos,
  ui: {
    progreso: 'Pregunta {a} de {b}',
    cargado: 'Hemos cargado el ejemplo «{n}». Cambia lo que no se parezca a tu caso.',
    atras: 'Atrás',
    siguiente: 'Siguiente',
    verResultado: 'Ver el resultado',
    falta: 'Elige una opción para seguir.',
    faltaTexto: 'Escribe un nombre corto para la tarea.',
    otra: 'Probar otra tarea',
    revisar: 'Pedir que lo revisemos',
    tarea: 'Tarea {n}',
    hechas: 'Tareas analizadas',
    hechasNota: 'Se guardan solo en este navegador.',
    ver: 'Ver',
    borrar: 'Borrar todas',
  },
  /** Frases que escribe el script. `{x}` se sustituye al pintar. */
  t: {
    /* El semáforo: cada resultado abre con un estado y una sola acción
       (propietario, 21 oct 2026: «tiene que invitar a una acción»). */
    estados: {
      verde: 'Merece la pena · Empieza por aquí',
      ambar: 'Puede merecer la pena · Hablemos',
      rojo: 'Hoy no compensa',
      noia: 'Más fácil de lo que parece',
      datos: 'Antes, un paso previo',
      suscripcion: 'Sale barato',
    },
    titulos: {
      horas: 'Esta tarea se come {h} horas al mes',
      ahorro: 'Podrías dejar de perder entre {a} y {b} al mes',
      rojo: 'Mejor empieza por otra tarea',
      depende: 'Depende de lo que te cuesta cada fallo',
      revisa: 'Algo no cuadra en las respuestas',
    },
    personas: 'Es como tener a {p} a jornada completa solo para esto.',
    media: 'Es como tener a una persona a media jornada solo para esto.',
    cuarto: 'Es como tener a una persona un día a la semana solo para esto.',
    persona1: 'una persona',
    casi: 'Es casi como tener a una persona a jornada completa solo para esto.',
    personasN: '{n} personas',
    semana: 'Son unas {h} horas a la semana.',
    haremos: 'Lo que haríamos',
    /** El último paso del plan, según lo que se contestó en «¿Quieres que alguien lo mire?». */
    revision: {
      todo: 'Una persona revisa cada resultado antes de darlo por bueno.',
      dudosos: 'Lo dudoso lo mira una persona y el resto sigue solo.',
      no: 'A partir de ahí se hace solo.',
    },
    multiplica: 'Hoy se pierde: {f} veces al mes × {c} = {p} al mes.',
    horasRojo: 'Hoy se lleva unas {h} horas al mes. No las contamos como ahorro porque nos has dicho que no haríais nada concreto con ese tiempo.',
    planes: {
      asistente: [
        'Lo probamos con unos cuantos casos reales tuyos, para ver si la IA prepara borradores buenos.',
        'Si funciona, lo conectamos con donde tienes la información.',
        'Tu equipo revisa cada resultado y lo da por bueno.',
      ],
      flujo: [
        'Lo probamos con casos reales tuyos antes de conectar nada.',
        'Si acierta lo suficiente, lo conectamos con tus programas.',
        'A partir de ahí se hace solo, y lo dudoso lo mira una persona.',
      ],
      programa: [
        'Repasamos contigo las normas o las cuentas, una por una.',
        'Montamos el programa y lo conectamos con los tuyos.',
        'Lo probamos con casos reales tuyos antes de dejarlo solo.',
      ],
      agente: [
        'Lo probamos con conversaciones reales tuyas.',
        'Lo conectamos con tu agenda o tus programas, y cada gestión se comprueba antes de hacerse.',
        'Lo que no sepa resolver, lo pasa a una persona de tu equipo.',
      ],
    },
    precio: {
      rango: 'Construirlo cuesta entre {a} y {b}, y mantenerlo, entre {c} y {d} al mes, según lo que haga falta.',
      plazo: 'Con lo que dejas de perder, se recupera {m}.',
      plazoLargo: 'Con lo que dejas de perder hoy, tardaría más de dos años en recuperarse. Lo miraríamos contigo.',
      entre: 'en {a} a {b} meses',
      desde: 'en unos {a} meses con el precio bajo',
      uno: 'en un mes',
      tiempo: 'Si ese tiempo se dedicara a vender o a atender, el ahorro sería de verdad: es lo que miraríamos contigo.',
      sinDato: 'Compensaría si cada fallo te cuesta más de {x}.',
      vender: 'Además, liberarías unas {h} horas al mes para vender o atender, que valen unos {g}.',
    },
    avisos: {
      horas: 'Revisa las respuestas: salen {h} horas al mes, como {p} personas a jornada completa. Si es así, hablemos cuanto antes.',
      perdida: 'Revisa las respuestas: salen más de {x} al mes en pérdidas. Si es así, hablemos cuanto antes.',
      perdidaHoras: 'Revisa las respuestas: salen {x} al mes en pérdidas para una tarea de pocas horas. Si es así, hablemos cuanto antes.',
    },
    form: {
      titulo: '¿Lo revisamos contigo? Es gratis.',
      tituloOtro: '¿Quieres que lo revisemos igualmente?',
      cuerpo: 'Te contestamos por correo, por escrito o con un vídeo corto: qué haríamos, qué no y por dónde empezar.',
      boton: 'Que lo revisen gratis',
      llamada: 'Prefiero una llamada',
    },
    jornada: 'Contamos 160 horas al mes por persona a jornada completa.',
    why: {
      irreversible: 'Si sale mal no hay vuelta atrás, así que una persona da el último visto bueno.',
      datos: 'Casi todo lo que hace falta está en la cabeza de alguien, y una máquina no puede usarlo.',
      noia: 'No hay nada que leer, escribir ni decidir: solo copiar o seguir normas escritas.',
      decidir: 'Hace falta el criterio de alguien con experiencia.',
      suscripcion: 'Es escribir contenido o ideas, alguien lo revisa todo, se queda en tu equipo y un error no tiene consecuencias.',
      programa: 'No hay nada que leer, escribir ni decidir, pero sí mucho trabajo repetido.',
      repartir: 'Repartir es un problema de cálculo: lo resuelve un programa, no una IA, que podría equivocarse.',
      agente: 'Hay que ir hablando con la persona varias veces, y cada conversación va por un camino.',
      flujo: 'Los pasos se repiten. La IA solo tiene que leer o escribir lo que llega.',
      cuentas: 'Hay cuentas, y una IA puede equivocarse con los números. La IA lee lo que piden y un programa hace los cálculos, siempre igual.',
    },
    whatIf: {
      conversa: 'Si hubiera que ir hablando con la persona varias veces',
      igual: 'Si los pasos fueran siempre los mismos',
      riesgo: 'Si un error se pudiera arreglar',
      escrito: 'Si casi todo estuviera escrito',
      revisa: 'Si alguien mirara cada resultado',
      programa: 'Si el resultado hubiera que meterlo en un programa',
      saldria: '{x}, saldría «{v}».',
    },
    notes: {
      casi: 'Los casos raros se apartan para que los vea una persona.',
      cuentas: 'Las cuentas las hace un programa, no la IA. La IA interpreta y el código ejecuta.',
      sensibles: 'Hay datos delicados: no vale cualquier herramienta. Hace falta saber dónde se guardan y un contrato que cumpla el RGPD.',
      salud: 'Hay datos de salud, que el RGPD protege más que el resto. Hace falta saber dónde se guardan, un contrato que lo cubra y no mandarlos a un chat cualquiera.',
      personas: 'Si la IA ayuda a decidir sobre personas, como seleccionar o evaluar, el Reglamento europeo de IA lo trata como de alto riesgo y pide más controles.',
      repartida: 'Lo que hace falta está en varios sitios. Cada programa que hay que conectar sube el precio.',
      parte: 'Antes, hay que poner por escrito lo que hoy solo sabe esa persona.',
      papel: 'Los papeles se pueden leer con IA si se escanean o se fotografían bien. Es lo primero que hay que probar.',
      dudosos: 'La IA marca lo dudoso y eso lo mira una persona.',
      cuesta: 'Lo que cuesta dinero, lo aprueba una persona antes.',
      usar: 'Para que funcione, tu equipo tiene que usar lo que prepara la IA. Si alguien lo rehace entero cada vez, se pierde el ahorro.',
      leer: 'Para que funcione, lo que llega tiene que poder leerse bien. Es lo primero que hay que probar.',
      pocas: 'Con tan pocas veces al mes, solo compensa si cada fallo sale caro. Si no, hacerlo a mano puede seguir siendo lo más sensato.',
      partida: 'Apunta durante una semana cuántas veces pasa, cuánto se tarda y qué se pierde cuando sale mal. Con esas cifras, la cuenta deja de ser una estimación.',
      prueba: 'Probar la IA con casos reales tuyos antes de conectar ningún programa. Si no acierta lo suficiente, se para ahí. Así empiezan nuestros proyectos.',
    },
    labels: {
      result: 'Resultado',
      why: 'Por qué',
      prueba: 'Siguiente paso',
      detalles: 'Ver los detalles y la cuenta',
      note: 'Ojo',
      whatIf: 'Qué lo cambiaría',
      partida: 'Antes de construir',
      noCompensaT: 'Hoy no compensa',
      noCompensaD: 'Con lo que hoy se pierde, lo que haría falta construir no se paga solo en dos años.',
      siCompensa: 'Si algún día compensa, haría falta esto: {v}.',
    },
    money: {
      ganancia: 'Te ahorrarías unos {g} al mes',
      gananciaNota: 'Contamos solo la mitad de lo que hoy pierdes, para no pasarnos.',
      horas: 'Hoy se lleva unas {h} horas al mes.',
      horasNoCuentan: 'Esas horas no entran en la cuenta del ahorro porque no nos has dicho a qué dedicaríais ese tiempo.',
      sinDato: 'Compensaría si cada fallo te cuesta más de {x}.',
      sinNada: 'Con lo que nos has contado, esta tarea no te hace perder dinero. Solo compensaría automatizarla si esas horas te cuestan algo.',
      tope: 'Para recuperarlo en un año, construirlo y mantenerlo no debería costarte más de {a} ese primer año. Para recuperarlo en dos, {b}.',
      horquilla: 'La parte baja cuenta la mitad de lo que hoy pierdes y la alta, todo. Nada elimina el problema entero desde el primer mes.',
      noCompensa: 'No compensa: la cuota de {f} al mes es mayor que el ahorro',
      ok: 'Se recupera en {m}',
      warn: 'Se recupera justo, en {m}',
      bad: 'Tardarías {m} en recuperarlo',
      mes: 'mes',
      meses: 'meses',
      precio: 'Lo más sencillo que haría falta empieza en {b} y {f} al mes.',
      suscripcion: 'No hay nada que construir: se paga por persona y mes.',
      nada: 'No hace falta pagar ninguna IA.',
    },
    summary: {
      kicker: 'Tus tareas',
      top: 'Por dónde empezar',
      topEmpty: 'Ninguna de tus tareas compensa hoy. En la lista de al lado tienes el porqué.',
      topMeta: '{g} al mes de ahorro',
      topPay: ' · se recupera en {m}',
      not: 'Lo que todavía no toca',
      notEmpty: 'Nada. Todas tus tareas son candidatas.',
      notFoot: 'Saber qué no automatizar ahorra más que cualquier IA.',
      noCompensa: 'Hoy no compensa.',
      ver: 'Ver',
      quitar: 'Quitar',
    },
  },
  verdicts: {
    programa: {
      t: 'Un programa a medida, sin IA',
      d: 'Aquí no hace falta IA: las normas o las cuentas son fijas. Pero con este volumen, hacerlo a mano o con hojas de cálculo sale caro. Un programa a medida lo hace solo y no se equivoca.',
    },
    noia: {
      t: 'Esto no necesita IA',
      d: 'Un programa normal, una hoja de cálculo bien montada o una conexión entre dos programas lo hace solo. Sale más barato y se equivoca menos que una IA.',
    },
    datos: {
      t: 'Primero, pon por escrito lo que sabe esa persona',
      d: 'Ninguna máquina puede usar lo que solo está en la cabeza de alguien. Empieza por apuntarlo en un documento o en un programa y vuelve a hacer esta prueba después.',
    },
    asistente: {
      t: 'La IA lo prepara y una persona da el visto bueno',
      d: 'La IA hace el trabajo pesado (lee, ordena, prepara un borrador) y alguien de tu equipo lo revisa antes de que salga.',
    },
    suscripcion: {
      t: 'Te basta con ChatGPT, Copilot o Gemini de empresa',
      d: 'Se pagan por persona y mes. Si alguien revisa cada resultado y no hay que meterlo en otro programa, no necesitas nada a medida.',
    },
    flujo: {
      t: 'Una automatización a medida',
      d: 'La tarea sigue siempre el mismo camino. La IA solo lee o escribe lo que hace falta y el resto lo hace un programa. Por nuestra experiencia, es lo más barato de construir y de mantener.',
    },
    agente: {
      t: 'Un asistente de IA que conversa y hace gestiones',
      d: 'Hay que ir hablando con la persona: preguntar, dar opciones, confirmar. Es lo que llamamos un agente de IA. La IA conversa y un programa comprueba cada gestión antes de hacerla.',
    },
  },
  /* Los ejemplos (21 oct 2026). Las respuestas viven en
     `src/lib/que-automatizar-ejemplos.ts` y el resultado lo calcula la
     herramienta al compilar: aquí solo va el nombre y lo que se supone. */
  ejemplos: {
    kicker: 'Ejemplos',
    title: 'Ejemplos de tareas que se pueden automatizar',
    lead: 'Diez tareas que se repiten en muchas empresas, ordenadas por departamento. Cada una lleva unas respuestas de ejemplo y lo que dice la herramienta con ellas. Con «Probar con esta tarea» las cargas arriba y las cambias por las de tu empresa.',
    resultado: 'Con estas respuestas',
    probar: 'Probar con esta tarea',
    deps: {
      finanzas: 'Finanzas',
      clientes: 'Atención al cliente',
      ventas: 'Ventas',
      personas: 'Recursos humanos',
      informes: 'Informes',
      oficina: 'Correo y reuniones',
    },
    items: {
      facturas: {
        n: 'Pasar las facturas de proveedores al programa de contabilidad',
        d: 'Llegan varias al día en PDF por correo y alguien las teclea a mano. Entre 3 y 10 al mes salen con algún error.',
      },
      conciliar: {
        n: 'Cuadrar los movimientos del banco con las facturas',
        d: 'Varias veces a la semana, con una lista de normas para emparejar cada cobro y cada pago con su factura.',
      },
      consultas: {
        n: 'Responder las consultas de clientes que llegan por correo',
        d: 'Decenas al día. Casi todas se parecen y la respuesta está en el programa de la empresa o en correos anteriores.',
      },
      citas: {
        n: 'Dar, cambiar y anular citas por mensaje',
        d: 'Decenas de conversaciones al día, en las que hay que preguntar, ofrecer huecos libres y confirmar.',
      },
      presupuestos: {
        n: 'Preparar presupuestos a partir de lo que pide el cliente',
        d: 'Uno al día y casi una hora cada uno. Hay que leer la petición, hacer las cuentas y escribir la propuesta, y un error sale caro.',
      },
      crm: {
        n: 'Apuntar en el programa de clientes (CRM) lo hablado con cada uno',
        d: 'Varias veces al día, copiando de los correos lo que se acordó con cada contacto.',
      },
      alta: {
        n: 'Dar de alta a una persona nueva en la plantilla',
        d: 'Pocas veces al mes, siguiendo siempre la misma lista de pasos en los programas de la empresa.',
      },
      informe: {
        n: 'Preparar el informe semanal de ventas',
        d: 'Cada semana se sacan las cifras del programa, se hacen las cuentas y se manda al equipo.',
      },
      reuniones: {
        n: 'Escribir el resumen de las reuniones',
        d: 'Varias a la semana. Alguien del equipo lo revisa entero antes de mandarlo.',
      },
      correos: {
        n: 'Repartir los correos que llegan al buzón general',
        d: 'Cientos al día, que hay que leer y mandar al departamento que toca según unas normas escritas.',
      },
    },
  },
  /* Tres preguntas frecuentes (21 oct 2026). Las dos primeras salen en
     «Otras preguntas de los usuarios» de Google para las búsquedas de la
     página. La tercera no sale, pero solo la herramienta la responde. */
  faq: {
    kicker: 'Preguntas frecuentes',
    title: 'Qué procesos se pueden automatizar y cuándo compensa',
    items: [
      /* La pregunta de delegar (22 oct 2026): «qué puede hacer la IA» es la
         única búsqueda medida de esa familia (10-100 al mes, España). */
      {
        q: '¿Qué puede hacer la IA en una empresa y qué tareas conviene delegarle?',
        a: [
          'La IA es buena leyendo y escribiendo. Entiende correos, PDF, mensajes o audios, saca de ellos los datos que hacen falta y prepara respuestas, resúmenes o borradores. Lo que no conviene dejarle son las cuentas ni las decisiones que no tienen vuelta atrás: eso lo hace mejor un programa o una persona.',
          'Por eso delegar en la IA casi nunca es todo o nada. Hay tareas que se hacen solas, porque la IA solo lee o escribe y un programa hace el resto, y otras en las que la IA prepara el trabajo y una persona lo aprueba antes de que salga. Y a veces la respuesta es que no hace falta IA. La herramienta de esta página te dice en cuál de esos casos cae cada tarea tuya.',
        ],
      },
      {
        q: '¿Qué procesos o tareas se pueden automatizar en una empresa?',
        a: [
          'Casi cualquier tarea que se repite y que podrías explicarle a alguien nuevo con una lista de pasos: pasar facturas al programa de contabilidad, responder consultas que se parecen, preparar presupuestos, apuntar lo hablado en el programa de clientes o dar citas.',
          'Lo que cambia de una a otra es con qué se automatiza. Si solo hay que copiar datos o seguir normas escritas, basta un programa normal y no hace falta IA. Si hay que leer correos, PDF o mensajes, o escribir respuestas, entra la IA. Y si hay que ir hablando con la persona, preguntar y confirmar, hace falta un agente de IA.',
          'Lo que todavía no se puede automatizar es lo que solo sabe una persona y no está escrito en ningún sitio. Antes hay que ponerlo por escrito.',
        ],
      },
      {
        q: '¿Qué necesito para automatizar un proceso?',
        a: [
          'Lo primero, que lo necesario para hacerlo esté en algún sitio que se pueda leer: un programa, una hoja de cálculo, los correos o los papeles escaneados. Lo que solo sabe alguien hay que apuntarlo antes.',
          'Lo segundo, unas cifras de partida: cuántas veces pasa al mes, cuánto se tarda cada vez y qué se pierde cuando sale mal. Basta con apuntarlo durante una semana. Con esas cifras se prueba la automatización con casos reales tuyos antes de conectar ningún programa, que es como empiezan nuestros proyectos.',
        ],
      },
      {
        q: '¿Cómo sé si me compensa automatizar una tarea?',
        a: [
          'Compara lo que hoy te cuesta la tarea con lo que costaría construirla y mantenerla. Lo que cuesta no son solo las horas. Cuenta sobre todo lo que se pierde cuando sale mal o tarde, como un recargo, un descuento o un cliente que se va, y las horas que hoy pagas aparte.',
          'Las horas que tu equipo podría dedicar a otra cosa solo son ahorro si de verdad se dedican a vender o a atender. La herramienta de esta página hace esa cuenta con prudencia: cuenta la mitad de lo que hoy pierdes y te dice en cuántos meses se recupera. Si no se recupera en dos años, te dice que hoy no compensa.',
        ],
      },
    ],
  },
  cta: {
    title: '¿Revisamos tu resultado?',
    body: 'Mándanos el resumen y te contestamos por correo, por escrito o con un vídeo corto: qué haríamos, qué no y por dónde empezar. Si no vemos ahorro, te lo decimos.',
    name: 'Nombre',
    email: 'Correo',
    nota: 'Algo más que debamos saber (opcional)',
    privacyPre: 'He leído la ',
    privacyLink: 'Política de privacidad',
    privacyPost: ' y sé que solo usaréis mis datos para contestarme.',
    button: 'Pedir la revisión',
    sending: 'Enviando…',
    ok: 'Recibido. Te contestamos por correo.',
    fail: 'No se ha podido enviar. Inténtalo de nuevo o escríbenos desde la página de contacto.',
    empty: 'Prueba al menos una tarea antes de pedir la revisión.',
    subject: 'Revisión pedida desde «Qué automatizar primero»',
    llamada: 'Prefiero una llamada',
  },
} as const;
