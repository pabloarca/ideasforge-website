---
title: 'Dice que lo ha hecho y no lo ha hecho'
metaTitle: 'El falso éxito de los agentes de IA'
description: 'Casi la mitad de las veces que un agente de IA falla, además te dice que ha ido bien. Qué miden los estudios, por qué otra IA no lo ve y quién puede decir «hecho».'
lang: 'es'
pubDate: 2026-09-01
translationId: 'false-success'
tags: ['Agentes', 'Fiabilidad', 'Arquitectura']
heroImage: '/blog/false-success.jpg'
draft: false
---

Todos hemos trabajado con alguien así. Dice que lo ha hecho y no lo ha hecho. No miente con mala intención. Unas veces cree de verdad que lo ha hecho y otras le sale la frase de cierre sin pensarla.

Los sistemas de IA que ejecutan tareas hacen exactamente eso. Ahora hay números que lo miden.

## La segunda alucinación

Cuando decimos que un modelo alucina pensamos en un dato inventado, una fecha que no existe o una política de devoluciones que nadie escribió. Ese es el caso fácil, porque tarde o temprano alguien lo contrasta.

Hay una segunda alucinación, propia de los sistemas que actúan, bastante peor que la primera. El sistema afirma que la tarea está terminada mientras el estado real es otro. Tiene nombre desde este año. Se llama **falso éxito** y se lo puso Laksh Advani en un trabajo presentado en un taller del congreso ICML de 2026.

Lo midió sobre 11.755 conversaciones de dos bancos de pruebas públicos, con doce familias de modelos distintas. **Entre el 45 % y el 48 % de los fallos son falsos éxitos**, según el dominio, en los dominios donde nadie confirma la operación. En los agentes de programación que se autoevalúan y declaran explícitamente haber terminado, el 75,8 % de sus fallos son falsos éxitos.

No es un hallazgo aislado. Hongliu Cao, Ilias Driouich y Eoin Thomas publicaron en marzo de 2026 una revisión que no mira solo el resultado sino cómo se llegó a él. Encuentra que **entre el 27 % y el 78 % de los éxitos que estas pruebas dan por buenos esconden alguna irregularidad por el camino**, desde saltarse una autorización hasta fabricar una confirmación.

La horquilla es tan ancha porque depende del modelo. Cada uno tiene su manera propia de fallar.

Un tercer trabajo, de Vikas Reddy y su equipo, mide el mismo fenómeno por otro lado en el dominio de aerolíneas, el de los fallos que no dejan rastro de error y lo presentó en un taller del congreso KDD en agosto de 2026. En uno de los agentes que probaron, el 78 % de los fallos observados dejan un estado equivocado sin que ninguna herramienta devuelva un solo error.

Llévalo a tu producto y verás por qué esto no se parece a un dato erróneo. Un dato erróneo la persona lo puede contrastar. Aquí el asistente dice «listo, tu cita queda cambiada al martes», la cita sigue donde estaba, la persona se va tranquila y tú te enteras el jueves cuando no aparece.

Nosotros lo hemos vivido. La primera versión del agente que hoy filtra solicitudes para una agencia de alquiler era un modelo con herramientas a su disposición. Muchas veces no las llamaba, así que o se inventaba la respuesta o decía que no podía avanzar cuando sí se podía. Está contado entero en [el caso de Barceloneta](/casos/barceloneta).

## Poner otra IA a vigilar no funciona

La reacción de manual es poner un supervisor, un segundo modelo que lea lo que pasó y juzgue si el sistema hizo lo que dice. El mismo estudio lo midió.

Para leer el dato hace falta la escala que usan, el AUROC. **0,5 es tirar una moneda al aire y 1 es un detector perfecto.**

Probaron cinco supervisores distintos, cinco formas de darles instrucciones y les entregaron la descripción completa de la tarea. Ninguna combinación pasó de 0,65. Y cuando en vez de un mensaje de cierre bien redactado solo tenían el registro técnico de las llamadas, los mismos supervisores bajaron a 0,54, que es la moneda al aire después de pagar por el análisis.

El motivo importa más que el número. Los supervisores no comprobaban si el estado había cambiado, se fijaban en señales de superficie: el tono seguro del cierre en un caso y la cantidad bruta de acciones en el otro. **Al supervisor lo convence exactamente el mismo aplomo que causó el problema.**

Lo que sí caza los falsos éxitos es más tonto y funciona mejor. Un clasificador clásico que cuenta palabras y secuencias, de los que ya se usaban antes de que existieran los modelos de lenguaje, llega a 0,83 en uno de los dos bancos de pruebas y a 0,95 en el otro. Encuentra de cuatro a ocho veces más falsos éxitos que el mejor de los jueces.

Sus dos señales dicen mucho de dónde está el problema. En las conversaciones, lo que delata el falso éxito es el propio vocabulario del cierre, expresiones como «se ha completado» o «correctamente». En las tareas de programación son secuencias donde el agente **consulta mucho, no escribe nada y acto seguido declara el trabajo hecho**, mientras que cuando el agente sí reconoce el fallo lo que se ve son intentos de escritura repetidos.

Ninguna de las dos señales exige entender la tarea, que es justo lo que los jueces con modelo intentaban hacer.

## Quién tiene permitido decir «hecho»

Aquí el estudio deja de describir un problema y empieza a señalar dónde está la decisión de diseño.

La diferencia entre el agente autónomo y la arquitectura que usamos no es de vigilancia, es de permisos. En un agente autónomo, quien dice que el trabajo está hecho es el modelo, en una frase que no está atada a nada.

En la arquitectura que usamos, quien lo dice es el código, después de que la base de datos haya devuelto un número de operación. **El modelo no puede decir «hecho», porque «hecho» no es una de las respuestas que tiene permitidas.** El modelo entiende lo que quiere la persona y elige entre las opciones que existen. El código comprueba, ejecuta e informa del resultado.

No hemos hecho al modelo más fiable. Le hemos quitado la posibilidad de opinar sobre si el trabajo está hecho.

Esa regla no salió de ningún estudio. La aprendimos rompiéndola. En nuestro asistente de citas había una confirmación de asistencia abierta cuando la persona contestó con dos emojis. El clasificador los marcó como algo que no iba de la cita. Tenía razón, no iban de la cita. El problema es que al marcarlos así cerró la confirmación con ellos.

Un minuto después llegó el mensaje diciendo que sí iba, sin nada abierto donde encajarlo. La cita se quedó pendiente y la clínica no llegó a saber que aquella persona pensaba presentarse. Y se presentó.

**El sistema confundió «esto no trata de la cita» con «la cita ya está resuelta».** De ahí salió la regla de una línea que hoy va en todo lo que construimos. Solo una acción cierra una acción y una clasificación no lo es.

Lo medimos, porque una anécdota sin cifra no sirve para decidir nada. En toda la vida del producto hay 287 confirmaciones que salieron por el camino bueno, 105 que caducaron sin respuesta y 10 que murieron de esta manera. Está contado con su contexto en [el caso de Wazzy](/casos/wazzy).

Y el problema es más sutil que impedirle al modelo decir «hecho». Nuestro clasificador no dijo en ningún momento que algo estuviera terminado, solo puso una etiqueta. Lo que la volvía peligrosa es que esa etiqueta tenía efectos de escritura por detrás, porque al marcar el mensaje cerraba la confirmación.

**Una salida del modelo puede cerrar una operación sin haber declarado nada.** Por eso la regla tiene dos mitades: que el modelo no pueda decir «hecho» y que ninguna etiqueta suya cierre nada por su cuenta. Por qué repartimos así el trabajo, con sus costes reconocidos, está en [no me gustan las arquitecturas agénticas](/blog/no-me-gustan-los-agentes-de-ia).

Queda el dato más útil del estudio de Advani. En su dominio de control doble, donde la operación pasa por un segundo actor capaz de contradecir al asistente, el falso éxito se quedaba en el 3 %. Probablemente sea esa la razón. Confirmar con la persona antes de cerrar una operación irreversible pone un testigo en la sala y sale barato.

## El formulario estorba si le pides pensar y ayuda si le pides elegir

Contra esta forma de construir hay una objeción técnica buena. Conviene contarla entera, porque su segunda mitad casi nadie la cuenta.

Se sabe desde 2024 que obligar a un modelo a responder dentro de un formato rígido le empeora el razonamiento. Lo midieron Zhi Rui Tam y su equipo. El desplome es serio: en un examen de problemas matemáticos un modelo pasó del 76,6 % de aciertos escribiendo libre al 49,3 % obligado a rellenar un formato fijo.

Es como pedirle a alguien que escriba el veredicto en la primera línea del formulario y después el análisis del caso.

Ese resultado se cita constantemente como argumento en contra de los formatos estructurados. La otra mitad de la conclusión de ese mismo estudio dice que **en las tareas de clasificación el formato rígido no empeora el acierto, lo mejora**. En su examen de diagnóstico un modelo subió del 41,6 % al 60,4 % justo por estar obligado a elegir dentro de una lista cerrada.

Léelo otra vez, porque es el eje de todo lo demás. El formulario es malo si le pides pensar y bueno si le pides elegir.

Y elegir es lo único que le pedimos. No le pedimos que planifique, ni que decida el orden de las operaciones, ni que calcule un descuento. Le pedimos que mire un mensaje ambiguo, con faltas y con contexto implícito, para decidir a cuál de las opciones que existen se parece.

Es en lo que estos modelos son extraordinarios. Y da la casualidad de que es también la tarea donde el formato cerrado ayuda en vez de estorbar.

## Lo que esto no arregla

Si has llegado hasta aquí convencido del todo, no hemos hecho bien nuestro trabajo.

El error no ha desaparecido, ha cambiado de sitio. Si el modelo entiende «cancelar la cita» donde la persona quería «cambiarla», todas las comprobaciones dan luz verde, el código ejecuta con total confianza y el resultado es el mismo desastre. Peor incluso, porque un agente que divaga se nota y una instrucción bien escrita y equivocada pasa todos los controles.

Esto tiene una consecuencia incómoda para el vocabulario del sector. Llamar determinista a un sistema que tiene un modelo en la ruta crítica es marketing. Nuestro código es determinista, nuestro sistema no. Lo que hemos conseguido es que el fallo quede localizado, registrado y medible, que no es poco, pero es una afirmación mucho más modesta.

Hay además un daño que nos hacemos solos, al diseñar el esquema de datos. Piensa en un formulario de papel con una casilla obligatoria de «nombre del cónyuge»: si la persona está soltera, alguien acabará escribiendo algo ahí. 

Con un modelo pasa igual, porque un campo obligatorio que el mensaje no puede rellenar le obliga a poner algo. Y lo que pone se lo inventa. Por eso casi ningún campo debería ser obligatorio, porque un hueco vacío es información y un dato inventado es ruido con cara de dato.

Conviene además distinguir «vacío» de «no preguntado». No es lo mismo que la persona no tenga fecha nueva a que nadie se la haya pedido. Esa diferencia separa «no lo sabemos» de «no lo hemos preguntado», que llevan a dos siguientes pasos distintos.

Contra eso solo hay una defensa, que es medir con el mismo examen tantas veces como haga falta. En el asistente de planta que mantenemos, la primera medición del enrutado sobre 118 consultas reales dio un 72,8 % de acierto. Algo más de una de cada cuatro preguntas acababa en el agente equivocado. Dos rondas de correcciones después, con esas mismas 118 consultas, quedó en 91,5 %.

**Lo que importa ahí no es el número final, es que el examen no cambió entre rondas.** Un examen que se retoca cuando el sistema falla deja de medir el sistema y pasa a medir la paciencia de quien lo escribe. Las mediciones están en [el caso del asistente de planta](/casos/industrial).

La posición que sostenemos, dicha sin adornos: la invención no ha desaparecido, se ha movido. Ha pasado de «qué he hecho» a «qué he entendido». Lo segundo está acotado, se puede contrastar contra la base de datos y por sí solo no cambia nada en el mundo. Lo primero, no.

## El oído, no el cerebro

**La IA no es el cerebro de tu sistema, es el oído.** Es la pieza que convierte el mundo real, ambiguo y desordenado, en algo con lo que tu código puede trabajar.

Y el oído hace más de lo que parece. No se limita a recibir ruido, decide cuál de las palabras posibles ha escuchado, que ya es elegir. Nuestro clasificador de los emojis eligió bien y aun así se cerró una confirmación, porque el problema no estaba en lo que oyó sino en lo que su etiqueta movía por detrás.

Un oído no te dice que ha hecho el trabajo. Solo te dice lo que ha escuchado.

Así que la pregunta para la próxima reunión con quien te venda un agente no es cuántas tareas resuelve, es esta otra: *cuando tu sistema dice que algo está hecho, ¿quién lo está diciendo, el modelo o la base de datos?*

Si construimos algo para ti, esa respuesta la dejamos por escrito antes de empezar, en el [desarrollo del agente](/servicios/desarrollo-de-agentes-de-ia).
