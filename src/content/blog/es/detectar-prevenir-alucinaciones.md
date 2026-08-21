---
title: 'Detectar y prevenir alucinaciones de la IA es arquitectura'
description: 'Una alucinación es una respuesta bien redactada y falsa. Los cuatro mecanismos con los que nuestros sistemas las acorralan en producción, con sus números y sus cicatrices.'
lang: 'es'
pubDate: 2025-09-20
updatedDate: 2026-08-21
translationId: 'hallucinations'
tags: ['Agentes', 'Calidad', 'Observabilidad']
heroImage: '/blog/hallucinations.jpg'
---

Una alucinación es una respuesta que parece correcta, está bien redactada y es falsa. Un dato inventado, una cita que no existe, una cifra que el sistema no consultó. El oficio de construir agentes de IA consiste en buena parte en esto, en distinguir una respuesta correcta de una respuesta que solo lo parece. Y esa distinción no la hace un truco de prompt. La hace la arquitectura.

Las alucinaciones que vemos en producción tienen casi siempre uno de dos orígenes. El modelo responde desde su memoria de la conversación, ignorando la instrucción de consultar los datos. O el contexto que le llega está mal construido y el modelo rellena los huecos con lo que suena probable. Ninguno de los dos se arregla pidiéndole al modelo que no alucine. Los dos se arreglan quitándole la oportunidad.

## El contexto manda

Un modelo solo es tan bueno como lo que puede leer mientras responde. Si la búsqueda que lo alimenta devuelve fragmentos irrelevantes o viejos, el modelo completará con probabilidad lo que debería salir de un documento. Por eso, antes de pulir una sola instrucción, ordenamos los datos y las herramientas. Lo contamos en [antes que el prompt, los datos](/blog/antes-que-el-prompt-los-datos). Es la parte del trabajo que casi nadie ve porque no sale en la demostración.

## Cada cifra, de una consulta fresca

En el agente que construimos para Savian, un segundo modelo actúa de auditor y desconfía por oficio. No acepta ninguna cifra que venga del contexto conversacional, aunque esté a tres mensajes de distancia. Y fuerza una consulta nueva a la base de datos para cada número que se entrega. La ventana de memoria es corta a propósito. Recordar menos es alucinar menos, porque la materia prima del error ni siquiera está disponible. El auditor tiene [su propio artículo](/blog/el-auditor-que-no-se-fia), con el detalle de cómo se le quita a un modelo la tentación de responder de memoria.

## La métrica que delata la memoria

Detectar es tan importante como prevenir. Nuestra métrica favorita para esto compara dos cosas que deberían coincidir siempre, la herramienta que la conversación pedía usar y la herramienta que el modelo usó de verdad. Cuando divergen, el modelo respondió de memoria en lugar de consultar. Esa divergencia es medible turno a turno, deja rastro en los registros y convierte «creo que a veces se lo inventa» en una cifra que se vigila cada semana. Lo que no se mide se discute. Lo que se mide se arregla.

## El texto que lee el usuario no lo escribe el modelo

En uno de nuestros asistentes de planta dimos un paso más. Para las respuestas que tienen que ser exactas, el modelo no devuelve el texto final, devuelve una clave, un identificador. Es el código quien recupera el texto canónico al que esa clave apunta. Lo que la persona lee es literalmente lo aprobado, palabra por palabra, diga lo que diga el modelo alrededor. La interpretación queda en el modelo y el contenido queda fuera de su alcance, que es donde una alucinación no puede tocarlo.

## Cuando el «no lo sé» también alucina

Hay una alucinación de la que casi nadie habla, la del sistema que dice «no tengo esa información» sin haber buscado bien. O la del que responde con seguridad algo que su documentación no respalda. En una de nuestras primeras baterías, cinco de seis casos «fuera de documentación» pasaban desapercibidos para el umbral de similitud. La salida no fue ajustar el umbral, fue escuchar otra señal y auditar cada reetiquetado. Esa historia, con los dos tipos de «no» que un asistente serio debe distinguir, está en [dos «no» que no son el mismo](/blog/dos-noes-que-no-son-el-mismo).

## Qué preguntar si estás comprando

Si evalúas un asistente y te preocupan las respuestas inventadas, tres preguntas separan el folleto de la ingeniería. De dónde sale cada cifra que muestra, de una consulta fresca o de la memoria de la conversación. Qué métrica delata al modelo cuando responde sin consultar y quién la mira. Y qué pasa cuando la documentación no tiene la respuesta, un «no» honesto con rastro o un relleno con buena redacción.

Reducir alucinaciones no es suerte ni magia. Es contexto bien construido, verificación que no se fía y contenido crítico fuera del alcance del modelo, todo medido en producción. Así lo hacemos en [desarrollo de agentes de IA](/servicios/desarrollo-de-agentes-de-ia). Si estás situando el concepto desde el principio, empieza por la [guía de agentes de IA](/agentes-de-ia).
