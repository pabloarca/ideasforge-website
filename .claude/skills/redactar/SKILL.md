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
uno a uno. Si falla alguno, se reescribe; no se presenta «a ver si cuela».

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
- Cifras: dos reales antes que tres con relleno. Nunca inventar.
