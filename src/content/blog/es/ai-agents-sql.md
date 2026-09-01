---
title: 'El agente que consulta tus datos no escribe SQL'
description: 'El patrón text-to-SQL promete que el modelo escribirá las consultas. Lo construimos para Savian con la decisión contraria, que es la que lo hace seguro.'
lang: 'es'
pubDate: 2025-08-12
updatedDate: 2026-08-31
translationId: 'ai-agents-sql'
tags: ['Datos', 'Agentes', 'Seguridad']
heroImage: '/blog/portada-sql.jpg'
---

El patrón text-to-SQL es una de las promesas más repetidas del sector. Preguntas en lenguaje natural, *«¿cuántos pedidos cerramos el mes pasado?»*. Un modelo escribe la consulta, la ejecuta y te devuelve la cifra. Nosotros construimos exactamente eso para Savian, un agente con el que dueños y responsables de planta consultan sus datos de producción sin esperar a llegar a la oficina. Y la decisión central del diseño fue la contraria a la que el nombre del patrón sugiere. **Nuestro modelo no escribe SQL.**

## Por qué no dejamos que lo escriba

**Una consulta generada por un modelo es texto libre con acceso a una base de datos y el texto libre no se puede validar del todo.** Puedes revisar mil consultas bien escritas sin ver la forma mil una de equivocarse, la tabla equivocada con nombre parecido, el filtro que falta, la suma que cruza lo que no debía cruzarse. Con datos de varias empresas en el mismo almacén, ese margen de error no es un detalle cosmético, es que un cliente vea la facturación de otro. Es el riesgo entero del proyecto.

## ¿Y si el modelo ya acierta casi siempre?

Como la nuestra es la postura incómoda, conviene mirar los números de la contraria.

El examen de referencia se llama Spider 2.0, un trabajo académico de finales de 2024 que reunió 632 tareas reales de consulta sobre bases de datos de empresa, con sus miles de columnas y sus dialectos. Los mismos modelos que rondaban el 90 % en los exámenes académicos anteriores se quedaron entre el 10 y el 21 % ahí. La distancia entre la demo y tu almacén de datos, medida.

Desde entonces los sistemas especializados han ido escalando esa clasificación y los mejores superan hoy el 90 % en parte de la prueba. El problema parecía de puntería y la puntería mejora cada trimestre.

¿Cambia eso nuestra decisión? No, porque la objeción nunca fue la puntería. Un examen de acierto mide si la consulta devuelve la cifra correcta y no mide qué hace la consulta equivocada. **La consulta que falla también se ejecuta.** Con datos de varias empresas en el mismo almacén, el precio de ese fallo no se parece en nada al de una respuesta mal redactada.

Hay además algo que ningún examen de acierto mide, la seguridad. OWASP, la referencia del sector en seguridad de aplicaciones, dedica una categoría entera de su lista para aplicaciones con modelos de lenguaje al manejo indebido de la salida, que consiste en pasar lo que el modelo genera a otro sistema sin validarlo.

Su ejemplo de manual es exactamente este, la consulta generada que llega a la base de datos sin que nadie la escrute. **Nuestro contrato cerrado no es una manía de la casa, es la respuesta de diseño a esa categoría.**

## Lo que entrega en su lugar

El modelo entiende la pregunta y rellena un formulario de campos fijos, lo que llamamos un contrato, con el periodo, el ámbito, los filtros, la métrica y las agrupaciones. Nada más. Un código determinista, que ante el mismo contrato produce siempre la misma consulta, lo valida y construye la consulta, con los valores pasados como parámetros y los nombres de columna sacados de una lista cerrada que definimos nosotros. Ningún nombre de tabla ni de columna se arma con texto que haya escrito el modelo.

La diferencia práctica cabe en una frase. **Un contrato con cinco campos conocidos se puede validar entero antes de ejecutar nada. Una consulta libre, no.** **El modelo hace lo que sabe hacer, entender la pregunta. El código hace lo que exige garantías, tocar los datos.**

## Lo que esa decisión compra

Compra seguridad demostrable, porque los permisos se aplican sobre el contrato validado y la consulta final lleva su filtro por empresa que se aplica siempre, la última de las cuatro capas que separan los datos de cada empresa de los de la de al lado. Y compra el resultado de negocio que justifica el proyecto, la espera por una cifra pasó de horas a segundos, sin abrir la puerta que el patrón ingenuo deja entornada. Cómo quedó montado por dentro, con lo que hubo que quitarle al modelo por el camino, está en [la página del caso](/casos/savian).

## Decir lo que falta también se diseña

Dos detalles del agente de Savian enseñan el resto del criterio. Cada respuesta abre declarando el periodo que se ha consultado, para que nadie tome una cifra de marzo por una de abril. Y cuando el sistema trabaja en modo degradado, con alguna fuente caída, lo dice y avisa de qué datos pueden faltar, en lugar de entregar **un total incompleto con cara de completo**.

Las cifras, además, nunca salen de la memoria de la conversación. Una comprobación previa a cada respuesta fuerza una consulta fresca para cada número que se entrega.

En tu próxima demo de este patrón, pregunta una sola cosa. *¿Quién escribe la consulta que toca mis datos?* Si la respuesta es el modelo, ya conoces el margen de error. Si es un código que valida un contrato cerrado, tienes delante algo que aguanta.

Si tu equipo espera horas por cada cifra, este patrón bien construido tiene un retorno difícil de igualar. Así lo trabajamos en [desarrollo de agentes de IA](/servicios/desarrollo-de-agentes-de-ia), con el contrato, las capas y el auditor puestos desde el primer día.
