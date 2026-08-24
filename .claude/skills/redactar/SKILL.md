---
name: redactar
description: Write or edit ANY visible copy for the Ideasforge website (headlines, sections, service pages, FAQs, blog posts, meta titles/descriptions) following the editorial arbiter document. Use whenever the task involves drafting, rewriting, translating or tweaking user-facing text, in Spanish or English.
---

# Redactar contenido de la web

Flujo obligatorio para escribir o retocar cualquier texto visible del sitio.
Las reglas NO viven aquí: viven en `.private/base-editorial.md` (el documento
árbitro). Esta skill define el procedimiento y hace cumplir el árbitro.

## Paso 0 · Cargar el árbitro

Lee `.private/base-editorial.md` COMPLETO antes de escribir una palabra.
Contiene: banco de hechos con estado de verificación, criterios de aceptación
(sección 2), decisiones cerradas (3), posicionamiento (4), mapa de palabras
clave (5), brief por página (6), reglas de estilo (7), régimen de iteración
(8). La cola de piezas de blog (sección 9) y todo lo pendiente viven en
`.private/PENDIENTES.md`; léelo también si la tarea es un post o si
necesitas saber qué datos siguen sin confirmar.

Si el archivo no existe en esta copia del proyecto, DETENTE y pídeselo al
propietario. No redactes de memoria.

## Paso 1 · Situar la pieza

Antes de redactar, deja constancia (una línea cada uno):

- **Página o pieza** y qué trabajo hace según el brief por página (sección 6).
- **Término que posee** esa página según el mapa (sección 5), y qué términos
  tiene prohibidos por pertenecer a otra página.
- **Concepto que estrena o refuerza** (sección 12, registro de conceptos) y
  **qué decisión del lector mejora** la pieza. Si no hay concepto ni
  decisión, replantear antes de escribir.
- **Hechos del banco** que se van a usar, con su estado. Solo `VERIFICADO`.
  Los `INTERNO` exigen anonimato («uno de nuestros asistentes»); los
  `PENDIENTE` no se usan. Si hace falta una cifra que no está en el banco,
  se pide al propietario ANTES de escribir, nunca se estima.

## Paso 2 · Redactar

En ambos idiomas cuando la pieza exista en los dos. El inglés define la
arquitectura de palabras clave; el español es su eco local (decisión cerrada).
Las frases hechas del banco («Frases del material de origen») se usan antes
que inventar equivalentes.

La **sección 11 del árbitro (convicciones)** da la voz y el ángulo: el texto
debe sonar a eso aunque no la cite. Son opiniones, así que NUNCA se usan como
evidencia ni sustituyen al banco de hechos. Ojo a las dos tensiones marcadas
allí (flujo frente a agente; velocidad de probar frente a rigor con cliente).

## Paso 3 · Autoevaluar ANTES de enseñar

Pasa el borrador por los criterios de aceptación de la sección 2 del árbitro,
uno a uno, y después por la checklist de método de la sección 12.D. Si falla
alguno, se reescribe; no se presenta «a ver si cuela».

Al presentar el borrador, incluye al final una tabla breve:

| Criterio (sección 2) | Veredicto |
|---|---|
| 1 · Datos en el banco | ✓ / ✗ + qué hecho |
| 2 · Infirmable por un competidor | ✓ / ✗ |
| 3 · Sin repetición en el bloque | ✓ / ✗ |
| 4 · Mapa de palabras clave | ✓ / ✗ |
| 5 · Reglas de estilo | ✓ / ✗ |
| 6 · Cinco segundos, perfil I+D | ✓ / ✗ |
| 7 · Se entiende sin conocer los sistemas | ✓ / ✗ + las tres preguntas |
| 12 · Método: concepto, decisión, herramienta, cierre | ✓ / ✗ + cuáles |

Y las alternativas descartadas con su porqué, si las hubo (máximo tres
líneas: esto no es un concurso de opciones salvo que el usuario lo pida).

## Paso 4 · Tras la aprobación

1. Aplicar el cambio en `src/i18n/ui.ts` o en el `.md` que corresponda,
   compilar (`npx astro build`) y verificar que renderiza.
2. Anotar el cambio en la **sección 9** del árbitro (registro de cambios):
   fecha, página, qué cambió, qué se espera que mueva.
3. Si durante el trabajo surgió un hecho nuevo o una decisión nueva,
   añadirla al banco (sección 1) o a decisiones cerradas (sección 3).

## Si el usuario rechaza algo que pasó los seis criterios

No iterar a ciegas. El régimen (sección 8) manda: la conversación pasa a ser
qué criterio falta en el árbitro, se añade allí, y ENTONCES se reescribe la
pieza. Cada desacuerdo debe dejar el árbitro mejor.

## El error que más repetimos: escribir en clave

Conocemos los sistemas de memoria y ese conocimiento se cuela en el texto.
Antes de enseñar cualquier borrador, releerlo haciendo de lector que no ha
visto nunca el proyecto:

- **Sustantivos señalables.** Ningún «una copia», «otra pieza», «los
  umbrales» o «esas opciones» sin decir en la misma frase de qué se trata.
- **Mecanismo explicado al nombrarlo.** Que los sistemas de avisos tienen
  cuota, que un banco de pruebas compara contra respuestas anotadas, que un
  modelo no es determinista: nada de esto se da por sabido.
- **Hilo conductor.** El texto es un recorrido, no una lista de temas. Si un
  párrafo se puede mover sin que se note, sobra o está mal colocado.

Ante la duda entre concisión y comprensión, gana la comprensión. Ante la duda
entre añadir un tema o desarrollar los que ya hay, se desarrollan los que hay.
Detalle completo en el criterio 7 del árbitro.

## Recordatorios duros (no sustituyen al árbitro, lo señalan)

- Modales de «¿Por qué Ideasforge?»: congelados salvo orden expresa.
- Cliente industrial: jamás identificable (ni por nombre, ni por sector, ni
  por producto). Los términos concretos que lo delatan están listados en el
  árbitro, que no se versiona. Consúltalos allí antes de escribir.
- Wazzy es producto propio, nunca un cliente.
- Cero em dashes (—) en todo el sitio. Comillas «» en español.
- **Puntuación del propietario:** nunca coma antes de «y», nunca punto y coma,
  y dos puntos solo para enumerar tres o más elementos (nunca para unir dos
  ideas). Detalle en la sección 7 del árbitro.
- **Nada de ráfagas.** Variar la longitud no es encadenar frases cortas. Tres
  seguidas suenan a telegrama. Si dos ideas van unidas, coma antes que punto.
- **La palabra «prosa» está prohibida**, y en especial «es prosa y no
  evidencia»: es un tópico de texto generado.
- Antes de dar por terminado un texto en castellano, ejecuta `npm run check:copy`.
- Cifras: dos reales antes que tres con relleno. Nunca inventar. El número
  asimétrico del banco antes que el redondo de adorno.
- **Enlaces internos anclados en el nombre del concepto** (sección 12.A del
  árbitro), nunca «como contamos en este otro artículo».
- **Negrita quirúrgica solo en posts (.md)**: frases-tesis completas, y las
  negritas solas deben contar el argumento. En `ui.ts` no hay markdown.
- **Cierre con pregunta-herramienta** y callback al gancho; el CTA solo al
  final. Estructura completa en la sección 12.B del árbitro.
- **Experiencia antes que teoría**: el problema se vive antes de definirse.
  Prohibido abrir con contexto o definición.
- **En una pieza explicativa, informar pesa más que posicionarse** (decisión
  del propietario, 24 ago 2026). En guías y textos que definen algo, no se
  cuela cómo lo construimos nosotros como si fuera la definición, ni se
  defiende nuestra arquitectura donde toca explicar el concepto. Nuestra
  postura va al final, enlazada y ofrecida, nunca disfrazada de definición.
- **Metáfora que obliga a descifrar, fuera.** Si el lector tiene que traducir
  la imagen (el folleto, la silla, la cocina, la vara, la tubería, el suelo
  que se mueve), se dice en llano. La prueba es leer la frase en voz alta
  ante alguien de fuera del sector. La frase llana gana siempre; la metáfora
  solo entra cuando además de sonar bien es lo más corto y lo más exacto.

## Los cuatro fallos que más se repiten, y cómo se evitan

Salen de la revisión del 24 ago 2026, cuando el propietario encontró leyendo
tres errores de fondo que el verificador no puede ver. Se comprueban SIEMPRE
antes de dar una pieza por terminada.

1. **Releer la sección entera renderizada, no el diff.** Casi todo lo que se
   rompe es del tipo «cambié una frase y no releí a sus vecinas»: un intro que
   anuncia cuatro elementos sobre una lista de cinco, un «segundo miedo» cuyo
   primero se cortó, un subtítulo con la definición vieja tres líneas encima de
   la nueva. El diff no enseña eso. Vuelca la sección como texto corrido y
   léela entera.
2. **Ninguna afirmación se presenta como hecho sin poder rastrearla.** Tres
   caminos y ninguno más. Si habla de nosotros, sale del banco como
   VERIFICADO. Si habla del mundo (definiciones, mercado, datos de terceros),
   lleva fuente nombrada y comprobable, y esa fuente se anota en el banco al
   usarla, como ya se hizo con Gartner, Stanford, Anthropic o el EDPB; el
   material externo que traiga el propietario entra por aquí. Y si es
   deducción nuestra, se dice que lo es («por nuestra experiencia», «nuestra
   lectura») o se corta. Lo prohibido es vestir una deducción de hecho, que
   fue exactamente el fallo del párrafo del formato fijo.
   **Qué se cita y qué no** (decisión del propietario, 24 ago 2026). Se citan
   fuentes formales: estudios y artículos científicos, organismos y
   reguladores, listas de referencia del sector y documentación oficial de un
   fabricante. NO se citan blogs, ni personales ni de empresa, ni manifiestos
   comunitarios, aunque la idea venga de ahí: se digiere, se escribe con
   nuestras palabras y se sostiene por otra vía, o con una fuente formal que
   diga lo mismo o con nuestra propia experiencia en producción. Copiar una
   frase ajena sigue prohibido, con cita o sin ella.
3. **Ojo al tópico del sector.** Cuando no se verifica, no se inventa: se
   recita lo que más se repite en la red, y llega con la seguridad de una
   frase muy leída. Así entró «los chatbots hablan, los agentes actúan», que
   es falso y además contradecía a otra sección de la misma página. Es el
   mismo comportamiento que el árbitro describe en §11 («elige lo que ha
   visto más veces»), aplicado a quien escribe.
4. **`check:copy` en verde no significa terminado.** Solo caza comas, puntos
   y coma y dos puntos. No ve una afirmación falsa, una referencia colgada ni
   una contradicción entre dos párrafos. Es el suelo, nunca el techo.
