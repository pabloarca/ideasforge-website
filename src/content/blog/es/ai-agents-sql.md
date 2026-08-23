---
title: 'El agente que consulta tus datos no escribe SQL'
description: 'El patrón text-to-SQL promete que el modelo escriba consultas. Nosotros lo construimos para Savian con la decisión contraria. Esa decisión es la que lo hace seguro.'
lang: 'es'
pubDate: 2025-08-12
updatedDate: 2026-08-23
translationId: 'ai-agents-sql'
tags: ['Datos', 'Agentes', 'Seguridad']
heroImage: '/blog/portada-sql.jpg'
---

El patrón text-to-SQL es una de las promesas más repetidas del sector. Preguntas en lenguaje natural, *«¿cuántos pedidos cerramos el mes pasado?»*. Un modelo escribe la consulta, la ejecuta y te devuelve la cifra. Nosotros construimos exactamente eso para Savian, un agente por el que dueños y responsables consultan sus datos de producción sin esperar a analítica. Y la decisión central del diseño fue la contraria a la que el nombre del patrón sugiere. **Nuestro modelo no escribe SQL.**

## Por qué no dejamos que lo escriba

**Una consulta generada por un modelo es texto libre con acceso a una base de datos y el texto libre no se puede validar del todo.** Puedes revisar mil consultas bien escritas sin ver la forma mil uno de equivocarse, la tabla equivocada con nombre parecido, el filtro que falta, la suma que cruza lo que no debía cruzarse. Con datos de varias empresas en el mismo almacén, ese margen de error no es un defecto estético. Es el riesgo entero del proyecto.

## Lo que entrega en su lugar

El modelo entiende la pregunta y entrega un contrato en JSON con un esquema cerrado, el periodo, el ámbito, los filtros, la métrica y las agrupaciones. Nada más. Un código determinista valida ese contrato y construye la consulta con parámetros, con las columnas salidas de una lista cerrada que definimos nosotros. Ningún identificador se interpola desde texto del modelo, jamás.

La diferencia práctica cabe en una frase. **Un contrato con cinco campos conocidos se puede validar entero antes de ejecutar nada. Una consulta libre, no.** **El modelo hace lo que sabe hacer, entender la pregunta. El código hace lo que exige garantías, tocar los datos.**

## Lo que esa decisión compra

Compra seguridad demostrable, porque los permisos se aplican sobre el contrato validado y la consulta final lleva su filtro incondicional, la última de las [cuatro capas de aislamiento](/blog/cuatro-capas-de-aislamiento) que contamos aparte. Y compra el resultado de negocio que justifica el proyecto, la espera por una cifra pasó de horas a segundos, sin abrir la puerta que el patrón ingenuo deja entornada.

## La honestidad también se diseña

Dos detalles del agente de Savian enseñan el resto del criterio. Cada respuesta abre declarando el periodo que se ha consultado, para que nadie tome una cifra de marzo por una de abril. Y cuando el sistema trabaja en modo degradado, con alguna fuente caída, lo dice y avisa de qué datos pueden faltar, en lugar de entregar **un total incompleto con cara de completo**.

Las cifras, además, nunca salen de la memoria de la conversación. Un auditor interno fuerza una consulta fresca para cada número que se entrega. Esa pieza tiene [su propio artículo](/blog/el-auditor-que-no-se-fia).

En tu próxima demo de este patrón, pregunta una sola cosa. *¿Quién escribe la consulta que toca mis datos?* Si la respuesta es el modelo, ya conoces el margen de error. Si es un código que valida un contrato cerrado, sigue mirando.

Si tu equipo espera horas por cada cifra, este patrón bien construido es de lo más rentable que existe. Así lo trabajamos en [desarrollo de agentes de IA](/servicios/desarrollo-de-agentes-de-ia), con el contrato, las capas y el auditor puestos desde el primer día.
