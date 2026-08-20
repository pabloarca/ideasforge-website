---
title: 'Te cuento un secreto: no me gustan las arquitecturas agénticas'
description: 'Vendemos agentes de IA y no nos gusta cómo los construye casi todo el mundo. Las reglas de negocio no pueden vivir en el prompt, tienen que vivir en el código.'
lang: 'es'
pubDate: 2026-08-18
updatedDate: 2026-08-20
translationId: 'dont-like-agents'
tags: ['Agentes', 'Arquitectura', 'Seguridad']
---

Sí, es lo que vendemos. Está en nuestra portada. Y aun así, no me gustan las arquitecturas agénticas. Conviene afinar la confesión antes de que suene a escándalo. No me estorba la categoría, me estorba la forma de construirla que domina el mercado. Un agente de IA puede ser una pieza seria de ingeniería. Lo que casi nunca me gusta es dónde ha decidido el sector que vivan las reglas.

Este artículo existe porque la conversación se repite. Un cliente llega pidiendo un agente, nosotros lo construimos y en algún punto del proyecto alguien pregunta por qué nuestra versión se parece tan poco a la de los vídeos de demostración. La respuesta corta es que a la de los vídeos no le encargaríamos nada que firme en tu nombre. La larga es este artículo.

## Qué es una arquitectura agéntica, contada en llano

Un agente de IA, tal como lo entiende el mercado, es un modelo de lenguaje metido en un bucle. Lee la situación, decide el siguiente paso, lo ejecuta con las herramientas que le han conectado y vuelve a mirar dónde está, así hasta dar la tarea por terminada. Las herramientas pueden ser un buscador, un calendario, el correo o el acceso a una base de datos. La palabra importante del párrafo no es «modelo» ni «herramientas». Es «decide».

¿Y dónde viven las reglas que gobiernan esa decisión? En el prompt, el texto de instrucciones que se le entrega al modelo antes de empezar. Ahí suele estar escrito qué puede hacer, qué tiene prohibido y cómo debe comportarse cuando dude. El problema es que un modelo de lenguaje no ejecuta instrucciones como las ejecuta un programa. Las lee, las pondera y las sigue casi siempre. Ese «casi» es la grieta por la que entra todo lo que viene a continuación.

Los modelos no son deterministas. La misma pregunta no devuelve siempre la misma respuesta. Una instrucción que hoy se respeta puede ignorarse mañana sin que nada haya cambiado en tu sistema, sin mensaje de error y sin que nadie se entere. Construir reglas de negocio sobre esa base es construir sobre arena.

Merece la pena preguntarse por qué el sector construye así, porque la respuesta no es pereza. Los marcos de trabajo de moda hacen que montar el bucle cueste una tarde. Las demostraciones salen deslumbrantes, el dinero de los inversores va hacia lo que lleva la etiqueta de agéntico y añadir una frase al prompt es infinitamente más barato que programar una validación. Todos los incentivos empujan en la misma dirección y ninguno de ellos apunta hacia lo que pasa en producción dos años después.

## Una garantía y una petición educada

Heredamos una vez una pieza que confiaba un filtro de seguridad al prompt. La instrucción decía, literalmente, «bajo ninguna circunstancia omitas el filtro». Sonaba contundente. Puesta a prueba, no era una garantía, era una petición educada a un sistema que no firma contratos. La marcamos para retirada, movimos el filtro a código que se ejecuta siempre y de ahí salió la frase que usamos desde entonces para explicar nuestro criterio, que hay que saber distinguir una garantía de una petición educada.

Lo llamativo del caso es que nadie había hecho nada mal en el sentido clásico. El filtro existía, la instrucción era clara y el sistema se portaba bien la mayoría de los días. Lo que fallaba era más profundo. Le habían pedido a un generador de texto que se comportara como una barrera. Las barreras no se piden, se construyen.

Si tienes un sistema de este tipo en casa, hay una prueba que puedes hacerle hoy sin tocar nada. Busca en el prompt cualquier frase que empiece por «nunca» o por «bajo ninguna circunstancia» y pregúntate qué pasaría si el modelo, un día entre mil, la ignorase. Si la respuesta es que no pasaría nada porque el código lo pararía, esa regla vive donde debe. Si la respuesta es que tendríais un problema, ya sabes qué es lo único que protege tu negocio. Una frase.

## La aritmética juega en contra

Demos por bueno un prompt perfecto que el modelo nunca ignora. Aun así queda un problema que no se arregla escribiendo mejores instrucciones, porque no está en las instrucciones. Está en la multiplicación.

### Los errores no se suman, se multiplican

Un agente encadena pasos y cada paso puede salir mal. La intuición dice que un sistema que acierta el 95 % de las veces es un sistema fiable. La aritmética dice otra cosa. Para que una tarea de veinte pasos termine bien tienen que salir bien los veinte, así que las probabilidades se multiplican entre sí. Un 95 % de acierto por paso deja la tarea completa en un 36 %. Con diez pasos se queda en un 59 %. La fiabilidad que impresiona en un paso suelto se evapora en cuanto los pasos se encadenan.

El cálculo lo publicó [Utkarsh Kanwat](https://utkarshkanwat.com/writing/betting-against-agents), un ingeniero que ha construido más de una docena de sistemas de agentes en producción y que aun así explica por qué apuesta contra los agentes autónomos de muchos pasos. Su salida no es abandonar, es acortar. Los sistemas suyos que funcionan dividen el trabajo en tres a cinco pasos discretos, cada uno verificable por separado, con puntos de vuelta atrás y con confirmación humana en los momentos delicados. Y añade un detalle que casi nadie cuenta, que el coste también crece con la longitud, porque cada paso arrastra todo el contexto de los anteriores y las conversaciones largas se encarecen a un ritmo que las demostraciones nunca enseñan.

Aquí está la trampa de las demostraciones, que casi todas tienen menos de cinco pasos. Con cinco pasos y un 95 % de acierto, el conjunto sale bien tres de cada cuatro veces y el vídeo se graba a la segunda toma. Los procesos reales de tu empresa rara vez caben en cinco pasos.

### Lo que sale cuando alguien lo mide sin vender nada

A finales de 2024 un equipo de Carnegie Mellon montó [una empresa simulada](https://arxiv.org/abs/2412.14161) para medir esto. Una compañía ficticia con herramientas reales, con su repositorio de código, su gestor de proyectos y su mensajería interna. Les encargaron a los mejores agentes del momento 175 tareas de oficina de las que cualquier empleado reconocería como parte de un día normal. El mejor agente que ha pasado por esa prueba completó por sí solo el 30,3 % de las tareas. El resto de los intentos fracasó o se quedó por el camino. Hubo agentes que llegaron a hacer trampas, uno renombró a otro usuario para fingir que había encontrado a la persona que le habían pedido buscar.

Y Gartner, la consultora a la que esas mismas empresas piden consejo, [estima](https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027) que más del 40 % de los proyectos de IA agéntica se cancelarán antes de acabar 2027, por costes que se disparan, por valor que no aparece o por controles de riesgo insuficientes. Ninguna de las tres causas es un misterio si has leído hasta aquí.

## La seguridad tampoco acompaña

Hay un segundo frente y es más incómodo que la aritmética, porque no se arregla ni con modelos mejores.

Un modelo de lenguaje recibe por el mismo canal las instrucciones que le das y el texto que le llega de fuera. No hay nada que separe unas de otro, así que cualquiera que pueda hacerle llegar texto puede intentar colarle una orden disfrazada de contenido. La seguridad clásica resuelve este problema separando datos de instrucciones. Aquí esa separación no existe. Por eso la inyección de instrucciones encabeza por segunda edición consecutiva la [lista de riesgos de OWASP](https://owasp.org/www-project-top-10-for-large-language-model-applications/) para aplicaciones con modelos de lenguaje. En diciembre de 2025 el [centro nacional de ciberseguridad británico](https://www.ncsc.gov.uk/news/mistaking-ai-vulnerability-could-lead-to-large-scale-breaches) fue más allá y avisó de que probablemente no se arregle nunca como categoría. Su recomendación oficial es dejar de esperar el parche y diseñar los sistemas para que el daño posible sea pequeño.

Piensa en lo que eso significa para las arquitecturas. Si la puerta de entrada no se puede cerrar del todo, la única defensa seria es reducir lo que hay detrás de la puerta. No consiste en afinar lo que se le dice al modelo, consiste en recortar lo que el modelo puede hacer cuando lo engañen.

Ahora vuelve a la arquitectura agéntica típica y cuenta ingredientes. El agente tiene acceso a datos privados. Lee texto que viene de fuera. Y dispone de herramientas para actuar sobre tus sistemas. En seguridad se conocen como [los tres ingredientes](https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/) que por separado son inofensivos y juntos abren la puerta a que un texto malicioso acabe moviendo datos que no debía. Los dos primeros suelen ser la razón de que el sistema exista. El tercero es el que hay que recortar.

El caso extremo es el montaje donde el modelo se enchufa directamente a la base de datos con un conector que le deja escribir él mismo las consultas (los famosos MCP). Desde ese momento puede escribir cualquier consulta que el lenguaje permita y lo único que se lo impide es una frase en su prompt, del tipo «no consultes la tabla de nóminas». Ya hemos visto de qué familia es esa frase. Es una petición educada.

## Cómo lo construimos nosotros

Nuestro reparto es siempre el mismo: el juicio vive en el código, la interpretación del mundo vive en el modelo y el conocimiento vive en los datos. El juicio es todo lo que decide qué está permitido y qué no. La interpretación es entender qué quiere decir una persona cuando escribe como escriben las personas. El conocimiento es lo que el sistema sabe de tu negocio, versionado y consultable. Suena abstracto hasta que se baja a un sistema concreto, así que bajemos.

### El modelo elige, el código ejecuta

En nuestro asistente de datos el modelo no escribe consultas contra la base de datos. Entiende la pregunta y rellena un formulario cerrado (un contrato JSON) con los campos que hemos definido nosotros, el periodo, el ámbito, los filtros y la métrica. Un programa lee ese formulario, comprueba que la petición es legítima y construye la consulta que llega de verdad a la base de datos. Ese programa solo sabe construir las consultas que le hemos enseñado, así que ninguna otra puede salir de ahí, se lo pida quien se lo pida.

En el asistente de planta que construimos para una empresa industrial pasa lo mismo con los documentos. El modelo elige una etiqueta de una lista cerrada y el código recupera el texto oficial asociado a esa etiqueta. La política vive en datos versionados, no en la salida de un generador. Un mensaje malicioso puede, como mucho, equivocarse de opción dentro de una lista que ya hemos revisado. No puede inventarse una política ni saltarse un filtro, porque el filtro no está a su alcance.

### Nunca más permisos que la persona

El agente no tiene una credencial todopoderosa propia. Las consultas a los sistemas internos las lanza el usuario con sus permisos de siempre, los mismos que tiene en el resto de aplicaciones de su empresa. Y ante la duda, el sistema bloquea. Si la lista de permisos de alguien llega vacía, la respuesta es un no rotundo en lugar de un acceso por defecto.

### La pieza que decide no caduca con el modelo

Hay una consecuencia de este reparto que se nota el día que toca cambiar de modelo. Ese día llega siempre, porque los proveedores retiran modelos con regularidad y con fecha. Cuando el modelo no es la autoridad, sustituirlo es un cambio acotado que se puede medir. Al valorar si cambiábamos el modelo de uno de nuestros sistemas por otro más barato, pasamos las dos versiones por el mismo juego de preguntas con su respuesta correcta anotada. El barato perdía diez puntos de acierto y en las preguntas donde había que elegir entre dos opciones parecidas caía del 89 % al 44 %, así que se quedó fuera con esos números delante. Si las reglas hubieran vivido en el prompt, esa comparación no habría existido, porque no habría habido contra qué comparar.

### La decisión se puede guardar

Queda el beneficio menos visible, que con los años es el que más importa. Si la decisión vive dentro del modelo, cuando algo sale raro no queda nada que examinar, solo un texto que salió. En nuestro reparto la decisión queda entera fuera del modelo, así que se puede registrar qué entendió, qué pidió, qué descartó el validador y por qué lo descartó. Cuando seis meses después alguien pregunta por qué el sistema respondió lo que respondió, hay algo que enseñar. Sobre esa base se montan las pruebas de regresión que cada cambio tiene que pasar antes de publicarse y la medición semanal que vigila que nada se degrade en silencio.

### Lo que este reparto cuesta

Para ser justos, esta forma de construir también tiene factura. Exige entender el proceso antes de programarlo, así que el arranque es más lento que pegar un modelo a una base de datos. Cada capacidad nueva es trabajo de ingeniería y no una frase más en el prompt. Y el sistema no te sorprenderá con habilidades que nadie le pidió, porque está diseñado justo para eso. Son costes reales y los pagamos a cambio de algo concreto, que el sistema se comporte igual el día de la demostración y el día mil.

## No somos los únicos que hemos llegado aquí

Lo revelador de esta postura es quién más la sostiene. No son los escépticos de la IA. Son los que construyen agentes para ganarse la vida.

[Building Effective Agents](https://www.anthropic.com/engineering/building-effective-agents), la guía de Anthropic, el fabricante de Claude, recomienda empezar por flujos orquestados por código y reservar la autonomía del agente para los problemas que de verdad la necesitan. Cuanta más estructura conoces del problema, menos decisiones deberías delegarle al modelo.

Cognition, la empresa detrás del agente de programación Devin, publicó [Don't Build Multi-Agents](https://cognition.com/blog/dont-build-multi-agents) contra la moda de repartir una tarea entre varios agentes que se coordinan solos. Su argumento es que el contexto se fragmenta y las decisiones de unos chocan con las de otros. Su versión más reciente afina la idea sin retractarse de ella. Los sistemas con varios agentes funcionan cuando los cambios los ejecuta uno solo y los demás aportan criterio en lugar de acciones.

Y [12-Factor Agents](https://github.com/humanlayer/12-factor-agents), una guía comunitaria escrita para quien lleva agentes a producción, dedica principios enteros a lo mismo que venimos defendiendo, que el bucle de control sea tuyo y no de un marco de moda, que los prompts se versionen y se prueben como cualquier otro código y que cada agente se mantenga pequeño y centrado en tareas de pocos pasos.

Cada uno llega desde un ángulo distinto, el fabricante de modelos, el que vende un agente de programación y la comunidad que los opera a diario. Todos aterrizan en el mismo sitio. La autonomía del modelo no es un objetivo de diseño, es un coste que solo se paga cuando compra algo a cambio.

## Cuándo sí tiene sentido soltarle la mano al modelo

Sería cómodo terminar aquí y dejar el cuadro en blanco y negro, pero faltaría la otra mitad. Hay problemas donde la autonomía compensa. Son justo aquellos cuya estructura no conoces de antemano. Explorar una base de código desconocida, investigar una pregunta abierta, preparar un borrador que una persona va a revisar con calma antes de que pase nada. En esos casos no puedes escribir el flujo por adelantado porque no sabes qué pasos harán falta. Y el coste de un paso en falso es bajo, se tira el borrador y no ha pasado nada.

Fíjate en que los dos criterios van juntos. Estructura desconocida y coste del error bajo. Los agentes de programación funcionan porque cumplen los dos, el terreno cambia con cada tarea y hay una persona revisando antes de que nada llegue a producción. Un agente con permiso de escritura sobre tu facturación no cumple ninguno.

Nuestra regla es que la autonomía se gana. Todo empieza como un flujo orquestado por código y el modelo recibe margen solo en los tramos donde lo necesita, con el resultado medido antes y después de cada ampliación. Lo que no hacemos es empezar por la autonomía y añadir control cuando algo se rompe, porque para entonces el sistema ya está delante de tus usuarios y el control llega tarde.

## Tres preguntas para la próxima reunión

Si estás evaluando comprar un agente, del proveedor que sea, hay tres preguntas que separan las arquitecturas en dos montones.

Primera, ¿dónde viven las reglas que el sistema no puede saltarse? Si la respuesta menciona el prompt, ya sabes en qué montón estás. Segunda, ¿qué pasa exactamente si el modelo ignora una instrucción? La respuesta buena describe un mecanismo que lo para. La mala te asegura que eso no ocurre. Tercera, ¿qué queda registrado de cada decisión? Si la respuesta es la conversación entera y nada más, no habrá forma de explicar un fallo cuando llegue, ni de demostrar que se ha corregido.

Ninguna de las tres exige saber programar. Las tres se contestan en un minuto cuando la arquitectura está bien hecha.

## Entonces, ¿por qué lo vendemos?

Porque «agente de IA» es como el mercado nombra esta categoría y pelearse con el vocabulario de tu cliente es perder el tiempo de los dos. Lo que importa no es la etiqueta, es dónde viven las reglas. Cuando construimos un agente, el modelo hace aquello en lo que es insustituible, entender el lenguaje humano con toda su ambigüedad. El código hace aquello en lo que el modelo es un peligro, decidir qué está permitido. Esa división no la nota nadie en la demostración, porque las demostraciones premian justo lo contrario.

Un agente así es menos espectacular el primer día. Aguanta mejor los tres años siguientes.

Si estás situando el concepto, empieza por nuestra [guía de agentes de IA](/agentes-de-ia). Y si quieres ver cómo es esto por dentro, te lo contamos en [desarrollo de agentes de IA](/servicios/desarrollo-de-agentes-de-ia).
