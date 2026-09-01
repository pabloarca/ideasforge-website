---
title: 'Dice que lo ha hecho y no lo ha hecho'
metaTitle: 'El falso éxito de los agentes de IA'
description: 'Casi la mitad de las veces que un agente de IA falla, además te dice que ha ido bien. Qué miden los estudios, por qué otra IA no lo ve y quién puede decir «hecho».'
lang: 'es'
pubDate: 2026-09-01
translationId: 'false-success'
tags: ['Agentes', 'Fiabilidad', 'Arquitectura']
draft: false
---

Todos hemos trabajado con alguien así. Dice que lo ha hecho y no lo ha hecho. No miente con mala intención. Unas veces cree de verdad que lo ha hecho y otras le sale la frase de cierre sin pensarla.

Los sistemas de IA que ejecutan tareas hacen exactamente eso. Desde este año hay números.

## La segunda alucinación

Cuando decimos que un modelo alucina pensamos en un dato inventado, una fecha que no existe o una política de devoluciones que nadie escribió. Ese es el caso fácil, porque tarde o temprano alguien lo contrasta.

Hay una segunda alucinación, propia de los sistemas que actúan, bastante peor que la primera. El sistema afirma que la tarea está terminada mientras el estado real dice lo contrario. Tiene nombre desde este año. Se llama **falso éxito** y se lo puso Laksh Advani en un trabajo presentado en un taller del congreso ICML de 2026.

Lo midió sobre 11.755 conversaciones de dos bancos de pruebas públicos, con doce familias de modelos distintas. **Entre el 45 % y el 48 % de los fallos son falsos éxitos**, así que casi la mitad de las veces que el sistema falla, además te dice que ha ido bien. En los agentes de programación que se autoevalúan y declaran explícitamente haber terminado, la cifra sube al 75,8 %.

No es un hallazgo aislado. Hongliu Cao, Ilias Driouich y Eoin Thomas publicaron en marzo de 2026 una revisión que no mira solo el resultado sino cómo se llegó a él. Encuentra que **entre el 27 % y el 78 % de los éxitos que estas pruebas dan por buenos esconden alguna irregularidad por el camino**, desde saltarse una autorización hasta fabricar una confirmación.

Un tercer trabajo, de Vikas Reddy y su equipo, presentado en un taller del congreso KDD en agosto de 2026, mide en el dominio de aerolíneas que, en uno de los agentes que probaron, el 78 % de los fallos observados dejan un estado equivocado sin que ninguna herramienta devuelva un solo error.

Llévalo a tu producto y verás por qué esto no se parece a un dato erróneo. Un dato erróneo la persona lo puede contrastar. Aquí el asistente dice «listo, tu cita queda cambiada al martes», la cita sigue el jueves, la persona se va tranquila y tú te enteras el jueves cuando no aparece.

Nosotros lo hemos vivido. La primera versión del agente que hoy filtra solicitudes para una agencia de alquiler era un modelo con herramientas a su disposición que muchas veces no las llamaba. O se inventaba la respuesta o decía que no podía avanzar cuando sí se podía. Está contado entero en [el caso de Barceloneta](/casos/barceloneta).

## Poner otra IA a vigilar no funciona

La reacción de manual es poner un supervisor, un segundo modelo que lea lo que pasó y juzgue si el sistema hizo lo que dice. El mismo estudio lo midió.

Para leer el dato hace falta la escala que usan, que va de 0,5 a 1. **0,5 es tirar una moneda al aire y 1 es un detector perfecto.**

Probaron cinco supervisores distintos, cinco formas de darles instrucciones y les entregaron la descripción completa de la tarea. Ninguna combinación pasó de 0,65. Y cuando en vez de un mensaje de cierre bien redactado solo tenían el registro técnico de las llamadas, los mismos supervisores bajaron a 0,54, que es la moneda al aire con pasos de más.

El motivo es la parte que merece la pena. Los supervisores no comprobaban si el estado había cambiado, se fijaban en señales de superficie: el tono seguro del cierre en un caso y la cantidad bruta de acciones en el otro. **Al supervisor lo convence exactamente el mismo aplomo que causó el problema.**

Lo que sí lo caza es más tonto y funciona mejor. Un detector estadístico de los que ya se usaban antes de todo esto llega a 0,83 y a 0,95 en esa misma escala según el banco de pruebas. Encuentra de cuatro a ocho veces más falsos éxitos que el mejor de los jueces.

Sus dos señales dicen mucho de dónde está el problema. En las conversaciones, lo que delata el falso éxito es el propio vocabulario del cierre, expresiones como «se ha completado» o «correctamente». En las tareas de programación son secuencias donde el agente **consulta mucho, no escribe nada y acto seguido declara el trabajo hecho**, mientras que un fallo reconocido se parece a intentar escribir varias veces seguidas.

Ninguna de las dos señales exige entender la tarea, que es justo lo que los jueces con modelo intentaban hacer.

## Quién tiene permitido decir «hecho»

Aquí el estudio deja de ser un argumento contra los agentes autónomos y pasa a ser un plano.

La diferencia entre las dos formas de construir esto no es de vigilancia, es de permisos. En un agente autónomo, quien dice que el trabajo está hecho es el modelo, en una frase que no está atada a nada. Es texto generado al lado de otro texto.

En la arquitectura que usamos, quien lo dice es el código, después de que la base de datos haya devuelto un número de operación. **El modelo no puede decir «hecho», porque «hecho» no es una de las respuestas que tiene permitidas.** El modelo entiende lo que quiere la persona y elige entre las opciones que existen. El código comprueba, ejecuta e informa del resultado.

No hemos hecho al modelo más fiable. Le hemos quitado la posibilidad de opinar sobre si trabajó.

Esa regla no salió de ningún estudio. La aprendimos rompiéndola. En nuestro asistente de citas había una confirmación de asistencia abierta cuando la persona contestó con dos emojis. El clasificador los marcó como algo que no iba de la cita. Tenía razón, no iban de la cita. El problema es que al marcarlos así cerró la confirmación con ellos.

Un minuto después llegó el mensaje diciendo que sí iba, sin nada abierto donde encajarlo. La cita se quedó pendiente y la clínica no llegó a saber que aquella persona pensaba presentarse, como hizo.

**El sistema confundió «esto no trata de la cita» con «la cita ya está resuelta».** De ahí salió la regla de una línea que hoy va en todo lo que construimos. Solo una acción cierra una acción.

Lo medimos, porque una anécdota sin cifra no sirve para decidir nada. En toda la vida del producto salieron bien 287 confirmaciones y 10 murieron de esta manera, un 2,2 %. Está contado con su contexto en [el caso de Wazzy](/casos/wazzy). Por qué repartimos así el trabajo, con sus costes reconocidos, está en [no me gustan las arquitecturas agénticas](/blog/no-me-gustan-los-agentes-de-ia).

Queda el dato más útil de los tres. En uno de los escenarios medidos el falso éxito se quedaba en el 3 %. Ese escenario tenía una particularidad que lo explica, la presencia de un segundo actor en el proceso capaz de contradecir al asistente. Confirmar con la persona antes de cerrar una operación irreversible pone un testigo en la sala y sale barato.

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

Esto tiene una consecuencia incómoda para el vocabulario del sector. Llamar determinista a un sistema que tiene un modelo en la ruta crítica es marketing. Nuestro código es determinista, nuestro sistema no. Lo que hemos conseguido es que el fallo esté localizado, registrado y se pueda medir, que no es poco, pero es una afirmación mucho más modesta.

Hay además un daño que se hace uno solo. Piensa en un formulario de papel con una casilla obligatoria de «nombre del cónyuge»: si la persona está soltera, alguien acabará escribiendo algo ahí. 

Con un modelo pasa igual, porque un campo obligatorio que el mensaje no puede rellenar le obliga a poner algo. Y lo que pone se lo inventa. Por eso casi ningún campo debería ser obligatorio, hasta el punto de que poder dejarlo vacío acaba siendo la decisión de diseño que más veces salva el sistema.

Conviene además distinguir «vacío» de «no preguntado». No es lo mismo que la persona no tenga fecha nueva a que nadie se la haya pedido. Esa diferencia es la que separa un olvido de una invención. Los dos riesgos son opuestos y se arreglan distinto.

Contra eso solo hay una defensa, que es medir con el mismo examen tantas veces como haga falta. En el asistente de planta que mantenemos, la primera medición del enrutado sobre 118 consultas reales dio un 72,8 % de acierto. Algo más de una de cada cuatro preguntas acababa en el agente equivocado. Con esas mismas 118 subió después a 89,3 % y más tarde a 91,5 %.

**Lo que importa ahí no es el número final, es que el examen no cambió entre rondas.** El techo que asumimos ronda el 92 %, porque perseguir el cien acaba moldeando el examen a la medida del sistema. Las tres mediciones están en [el caso del asistente industrial](/casos/industrial).

La posición que sostenemos, dicha sin adornos: la invención no ha desaparecido, se ha movido. Ha pasado de «qué he hecho» a «qué he entendido». Lo segundo está acotado, se puede contrastar contra la base de datos y por sí solo no cambia nada en el mundo. Lo primero, no.

## El oído, no el cerebro

**La IA no es el cerebro de tu sistema, es el oído.** Es la pieza que convierte el mundo real, ambiguo y desordenado, en algo con lo que tu código puede trabajar. Es extraordinariamente buena en eso. Y como cualquier sentido, lo que percibe hay que contrastarlo antes de actuar.

Un oído no te dice que ha hecho el trabajo. Solo te dice lo que ha escuchado.

Así que la pregunta para la próxima reunión con quien te venda un agente no es cuántas tareas resuelve, es esta otra: *cuando tu sistema dice que algo está hecho, ¿quién lo está diciendo, el modelo o la base de datos?*

Si construimos algo para ti, esa respuesta está escrita en el [desarrollo del agente](/servicios/desarrollo-de-agentes-de-ia) desde el primer día.
