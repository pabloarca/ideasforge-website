---
title: 'Antes que el prompt, los datos'
description: 'El mercado entero vende ingeniería de instrucciones. Nuestra experiencia en producción dice otra cosa: se gana más ordenando los datos que puliendo el prompt.'
lang: 'es'
pubDate: 2026-08-11
translationId: 'data-before-prompt'
tags: ['Datos', 'Arquitectura', 'Agentes']
---

Hay una industria entera vendiendo cursos de ingeniería de prompts y entendemos por qué: tocar el prompt es barato, rápido y da sensación de control. Nuestra experiencia manteniendo sistemas de IA en producción apunta en otra dirección: cuando algo va mal, el prompt casi nunca es el sitio donde más se gana. Los datos, casi siempre.

La lógica es sencilla. Un modelo de lenguaje trabaja con lo que le das. Si los datos que recupera están limpios, ordenados y son legibles, el modelo va bien con instrucciones mediocres. Si los datos son ambiguos o están mal estructurados, ningún párrafo de instrucciones lo compensa: estarás pidiéndole educadamente que adivine.

## Un caso real: el umbral que no detectaba nada

En uno de nuestros asistentes documentales, la primera batería de pruebas dejó un hallazgo incómodo: cinco de seis preguntas «fuera de la documentación» no se detectaban como tales. La búsqueda siempre encontraba algún fragmento parecido, porque en un corpus amplio casi cualquier frase supera el umbral de similitud.

La tentación clásica habría sido tocar las instrucciones: pedirle al modelo, con más énfasis, que reconociera cuándo no había evidencia. Lo que funcionó fue trabajar la capa de datos y la de código: escuchar el veredicto de «sin coincidencia» del propio agente, rediseñar el despachador para aceptarlo y dejar auditado cada reetiquetado. El prompt apenas cambió.

## Otro: el aislamiento que dejó de depender de acordarse

En otro de nuestros sistemas, la separación entre clientes dependía al principio de un filtro en cada consulta. Funcionaba, pero la seguridad entera colgaba de una condición que alguien podía olvidar añadir. La mejora real no fue una instrucción más estricta ni una comprobación más: fue reorganizar los datos, con un esquema por cliente en el almacén. El aislamiento pasó de ser un predicado que recordar a ser la forma misma de los datos. Una clase entera de fallos dejó de existir.

Ese es el patrón que se repite: la solución robusta casi nunca vive en el texto que le pasas al modelo. Vive en cómo están organizados los datos que el modelo consume y en el código que decide qué puede tocar.

## Qué significa esto si vas a comprar IA

Que la pregunta de calidad para un proveedor no es «¿qué modelo usáis?» ni «¿cómo escribís los prompts?». Es «¿qué vais a hacer con mis datos para que el modelo trabaje bien?». Limpiar catálogos, unificar identificadores, decidir qué se indexa y cómo se trocea, definir qué campos existen y cuáles no se exponen. Es trabajo menos vistoso que un prompt ingenioso y es donde se decide si el sistema aguanta.

Nuestro lema interno lo resume: el juicio vive en el código, la interpretación del mundo vive en el modelo y el conocimiento vive en los datos. Cada pieza en su sitio.

Por eso nuestros proyectos de [automatización de procesos](/servicios/automatizacion-de-procesos-con-ia) empiezan mirando los datos antes que el modelo. Y si estás construyendo criterio para decidir, la [guía de agentes de IA](/agentes-de-ia) es el mejor punto de partida.
