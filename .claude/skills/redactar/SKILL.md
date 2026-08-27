---
name: redactar
description: Write or edit ANY visible copy for the Ideasforge website (headlines, sections, service pages, FAQs, blog posts, meta titles/descriptions) following the editorial arbiter document. Use whenever the task involves drafting, rewriting, translating or tweaking user-facing text, in Spanish or English.
---

# Redactar contenido de la web

Una regla, una casa. Los hechos, las decisiones y la voz viven en
`.private/base-editorial.md` (el árbitro); léelo entero antes de escribir
una palabra. La mecánica (puntuación, palabras vetadas, ráfagas) vive en
`scripts/check-copy.mjs`, que la comprueba sola. Esta skill define solo el
procedimiento. Si el árbitro no existe en esta copia, DETENTE y pídeselo al
propietario. No se redacta de memoria.

El procedimiento existe por la revisión del 24 ago 2026: los errores graves
nacían de perseguir muchos objetivos a la vez. La respuesta es ponerlos en
fila, no añadir reglas.

## El contrato (decisión del propietario, 24 ago 2026)

1. **Un idioma por pasada.** El espejo al otro idioma se hace después del
   visto bueno del propietario, como tarea aparte. Nunca los dos a la vez.
2. **Una sección por entrega** cuando hay redacción nueva o cambios de
   fondo. Los lotes grandes quedan para cambios que verifica una máquina
   (renombrados, sustituciones, puntuación).
3. **Afirmación estructural, pregunta previa.** Si la pieza va a construir
   secciones sobre una afirmación técnica que no está en el banco ni en una
   fuente formal, se le enseña al propietario en una línea y se espera su
   sí ANTES de escribir. Marcarla como deducción no basta cuando hace de
   viga.
4. **Fondo y forma en pasadas separadas.** El borrador de fondo responde
   solo a tres preguntas: ¿es verdad y puedo rastrearlo?, ¿lo entiende
   alguien que no ha visto nunca el proyecto?, ¿está en el orden correcto?
   La forma llega en una segunda pasada: método de la sección 12 del
   árbitro (caja de herramientas, no checklist), negritas de posts, frases
   de la casa. El mapa de palabras clave solo toca títulos y H2, nunca
   decide la prosa.
5. **Correcciones del propietario, numeradas y devueltas.** Sus mensajes
   con varios cambios se convierten en lista numerada y se responde número
   a número con lo que cambió, para que vea de un vistazo si falta alguna.
6. **Revisión en frío antes de dar una página por terminada.** Al cerrar
   cambios de fondo en una página se ejecuta `npm run frio -- <ruta>`, que
   deja un fichero en `revisiones/` con el prompt dentro. Se le da la ruta
   completa del fichero para que lo arrastre a una conversación NUEVA de
   claude.ai. Nada de portapapeles ni de pegar dos mil palabras a mano: se
   probó el 25 ago y no le sirvió. No se da por terminada una página sin
   ese paso.

**Por qué el lector frío no puede ser un subagente.** Se comprobó el 25 ago
2026: un subagente hereda el CLAUDE.md entero, la memoria persistente del
propietario, el catálogo de skills y hasta las rutas de otros proyectos
abiertos. Es aislamiento de mensajes, no de contexto, y su valor está justo
en no tener contexto. La preparación se automatiza; el juicio, no.

**El silencio no aprueba.** Una decisión solo entra en la sección 3 del
árbitro cuando el propietario dice que sí con esas palabras. Que pase a otro
asunto después de leer una recomendación NO es un sí. Pasó el 25 ago 2026
con la disolución de conocimiento corporativo: se registró como cerrada, él
nunca la aprobó y dos días después apareció en la lista de pendientes una
decisión que no había tomado. Mientras no haya sí, la propuesta vive en
`PENDIENTES.md`, no en el árbitro.

**Y cuando se recomienda, van los dos lados.** Ese mismo día la
recomendación llegó con los datos a favor y sin el argumento en contra, que
existía y era fuerte. Una recomendación sin su contraparte no es un consejo,
es una conclusión disfrazada.

**Cómo se triangula lo que devuelve.** El lector frío no ve el banco de
hechos, así que marcará como dudoso algo que sí está verificado. Cada apunte
suyo cae en uno de tres sitios y se dice en cuál: se aplica, se rechaza con
la evidencia del banco que él no podía ver, o es decisión del propietario
porque toca una norma suya (le pasó a Codex con los dos puntos).

## De dónde sale cada afirmación (tres caminos, ninguno más)

- **Habla de nosotros** → banco del árbitro, solo VERIFICADO. INTERNO exige
  anonimato («uno de nuestros asistentes»). PENDIENTE no se usa. Una cifra
  que falta se pide, nunca se estima.
- **Habla del mundo** → fuente formal nombrada (estudios, reguladores,
  listas de referencia del sector, documentación oficial de fabricante),
  anotada en el banco al usarla. Los blogs se digieren con nuestras
  palabras y NUNCA se citan. Copiar una frase ajena está prohibido, con
  cita o sin ella.
- **Deducción nuestra** → se marca («por nuestra experiencia») o se corta.
  Si sostiene una sección, manda la regla 3 del contrato.

## Antes de enseñar

- **Releer la sección RENDERIZADA entera, no el diff.** Ahí viven los
  vecinos rotos: el intro que anuncia cuatro sobre una lista de cinco, el
  subtítulo con la definición vieja. Un volcado a texto de la página local
  sirve.
- `npm run check:copy` en verde. El verde es el suelo, no el techo. El
  verificador no ve una afirmación falsa ni una contradicción entre
  párrafos.
- Criterios de la sección 2 del árbitro en silencio. Se informa SOLO de lo
  que falla o queda en duda, nunca con tabla de ✓.

## Tras la aprobación

1. Aplicar, compilar (`npx astro build`) y verificar que renderiza.
2. Anotar el cambio en la sección 9 del árbitro.
3. Hecho o decisión nueva → banco (sección 1) o decisiones cerradas
   (sección 3). Si el propietario rechaza algo que pasaba los criterios,
   lo que falta se añade al árbitro ANTES de reescribir (sección 8).

## Lo que la máquina no ve

- Cliente industrial jamás identificable, ni por nombre ni por sector ni
  por producto. Los términos que lo delatan están en el árbitro.
- Wazzy es producto propio, nunca un cliente.
- Modales de «¿Por qué Ideasforge?»: congelados salvo orden expresa.
- Metáfora que obliga a descifrar, fuera. La frase llana gana siempre.
- Informar pesa más que posicionarse. Nuestra manera de construir no se
  disfraza de definición ni ocupa el sitio del concepto.
- En `ui.ts` no hay markdown. La negrita quirúrgica es cosa de los posts.
