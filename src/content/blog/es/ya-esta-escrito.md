---
title: 'Tu equipo pregunta cosas que ya están escritas'
metaTitle: 'Base de conocimiento con IA, qué falla de verdad'
description: 'Poner un modelo encima de tus documentos parece la solución obvia. Un banco de pruebas de 2026 dice que el buscador de toda la vida gana a la búsqueda por vectores.'
lang: 'es'
pubDate: 2026-09-01
translationId: 'already-written'
tags: ['Conocimiento', 'Arquitectura', 'Método']
---

Pasa en todas las empresas que pasan de cierto tamaño. Alguien pregunta por el canal interno algo que está escrito. Está en un procedimiento, en un correo de hace ocho meses o en la wiki que se montó con toda la ilusión y que ya nadie abre.

Y no es pereza, es aritmética. **Preguntar a un compañero se resuelve en un mensaje. Buscarlo uno mismo se lleva un rato largo**, con el riesgo añadido de dar con la versión vieja del documento y no enterarse. Mientras la cuenta salga así, la gente va a seguir preguntando. Y hace bien.

De ahí sale el proyecto que casi todas las empresas se plantean tarde o temprano. **Poner un modelo de lenguaje encima de la documentación** para que conteste en lugar del compañero.

Es buena idea. Lo que falla casi siempre es la parte que nadie discute.

## El resultado que descoloca

En mayo de 2026 se publicó **EnterpriseRAG-Bench**, un banco de pruebas hecho a propósito para esto. No usa páginas web ni artículos de Wikipedia, que es de donde salían casi todas las mediciones anteriores. Usa **medio millón de documentos de empresa** repartidos en nueve fuentes de las que cualquiera reconoce: Slack, Gmail, Drive, Jira, Confluence, GitHub.

Y hace algo que agradecemos mucho. **Mete ruido a propósito**: documentos archivados donde no tocaba, casi duplicados y versiones que se contradicen entre sí.

Conviene decir lo que es antes de apoyarse en ello. **Ese corpus está generado, no son los documentos reales de ninguna empresa.** Eso limita lo que se puede concluir de las notas absolutas. Lo que sí sostiene, porque los tres sistemas compiten sobre el mismo material, es el orden entre ellos. Y el orden sorprende.

Sobre ese corpus midieron tres formas de buscar. El resultado principal es este.

**La búsqueda por palabras clave de toda la vida acertó un 68,8 %. La búsqueda por vectores, la que va con modelos de incrustación y que todo el mundo vende como «búsqueda semántica», se quedó en un 51,4 %.**

Diecisiete puntos por debajo. Y perdiendo contra una técnica que se publicó en 1994.

## Y donde peor sale es justo donde debería ganar

Lo anterior admite una réplica razonable. Las palabras clave ganarán en preguntas literales. Los vectores existen para las preguntas que se formulan con otras palabras.

El banco de pruebas separa esas preguntas en su propia categoría. **La búsqueda por vectores saca un 32,8 % en ellas.** Es su terreno y es su peor nota.

Los autores apuntan a una explicación que encaja con lo que vemos en producción: los modelos de incrustación aprendieron con texto de internet y **tu empresa no habla como internet**. Tenéis siglas propias, nombres de proyecto que no significan nada fuera y una palabra concreta para esa cosa que en el sector se llama de otra manera. El modelo no ha visto nunca ese vocabulario, así que coloca vuestros documentos en un mapa que no es el vuestro.

## Lo que de verdad no sabe hacer ninguno

Hay un dato de ese estudio peor que los anteriores y que casi nadie menciona.

Cuando la pregunta pide **todo**, del tipo «dame todas las incidencias de este cliente» o «qué proveedores tenemos homologados para esto», **los tres sistemas se quedan entre el 35 % y el 40 %**.

Y esa es exactamente la pregunta que hace alguien que trabaja. Nadie pide un documento, pide estar seguro de que no se le escapa ninguno. Un sistema que acierta el 40 % ahí no es que sea flojo, es que **da una lista incompleta con toda la seguridad del mundo**, que es peor que no dar ninguna.

## Una cosa que ese estudio no demuestra

Aquí conviene frenar, porque el mismo estudio trae un dato que parece bueno y no lo es.

En la categoría de preguntas cuya respuesta no está en ningún documento, los tres sistemas aciertan el 100 %. Suena a que saben decir «no lo sé». **Los propios autores avisan de que esa categoría es demasiado fácil** y de que ese 100 % no mide lo que parece.

Lo decimos porque la tentación de usar ese número a nuestro favor era grande y sería tramposa. Saber callarse sigue sin estar medido.

## Cómo montamos una base de conocimiento que sí responde

La lectura que sacamos no es «los vectores no sirven». Es que **un solo buscador sobre todo el conocimiento de una empresa es la arquitectura equivocada**, gane el que gane la comparación.

En el asistente de planta que llevamos en producción para una empresa industrial no hay un buscador, hay un orquestador que reparte cada pregunta entre media docena de especialistas. Y el trabajo que movió el resultado no fue cambiar de modelo.

**Fue calibrar a quién se le manda cada pregunta. El acierto del reparto pasó del 72,8 % al 91,5 % sobre 118 consultas reales**, las que hacía la gente de verdad, no las que se nos ocurrían a nosotros.

Por el camino probamos un modelo más barato. Perdía diez puntos globales. En los casos donde dos especialistas podían encajar **se desplomaba del 89 % al 44 %**. Esa es la clase de cosa que un banco de pruebas público no te va a decir de tu empresa.

## La pregunta con la que quedarte

Cuando alguien te ofrezca un asistente sobre vuestra documentación, la demostración va a funcionar. Siempre funciona, porque quien la prepara elige las preguntas.

**Pide otra cosa: que lo midan con vuestras preguntas reales y que os enseñen el número.** Cien consultas de las que vuestro equipo hace de verdad, con la respuesta correcta anotada al lado. Y el porcentaje de acierto encima de la mesa.

Si no hay número, no hay sistema. Hay una demostración, que es otra cosa y se nota a los quince días.

Es la misma idea que contamos en [antes que el prompt, los datos](/blog/antes-que-el-prompt-los-datos). La manera de construirlo está en [el asistente sobre tu documentación interna](/servicios/conocimiento-corporativo).
