---
title: 'El cero silencioso: cuando «no hay datos» es una alarma'
description: 'Un cero no es una respuesta neutra: es una alarma sin clasificar. Las tres causas de un «no hay datos» y por qué la tercera es la más traicionera.'
lang: 'es'
pubDate: 2026-08-04
translationId: 'silent-zero'
tags: ['Observabilidad', 'Datos', 'Agentes']
---

Cuando un asistente de datos responde «no hay resultados para ese periodo», casi todo el mundo lo lee como una respuesta más. Nosotros aprendimos a leerlo de otra manera: un cero no es una respuesta neutra, es una alarma que hay que clasificar.

Lo aprendimos manteniendo uno de nuestros asistentes en producción. Tres situaciones completamente distintas producían el mismo «no hay datos» y desde fuera eran indistinguibles.

## Las tres causas de un cero

**La primera es el cero verdadero.** No se registró actividad. La respuesta es correcta y no hay nada que arreglar. Este es el único cero inocente y el problema es que los otros dos se disfrazan de él.

**La segunda es la consulta mal hecha.** El sistema consultó, pero consultó mal. Nos pasó con un rango de fechas que incluía un día de más, por confundir una fecha exclusiva con una inclusiva. Y nos pasó con una regresión donde un identificador cambió de significado y todos los filtros por responsable empezaron a devolver vacío. En ambos casos había datos. El sistema no los encontraba.

**La tercera es la más traicionera: no se consultó en absoluto.** En una consulta que agrupaba varias fuentes, la fuente sin filas sencillamente desaparecía del resultado. El usuario veía una tabla, la tabla estaba bien formada y una de sus empresas no aparecía. Sin error, sin aviso, sin registro en rojo. El sistema funcionaba. La respuesta era incompleta y parecía completa.

## Por qué la tercera no la detecta nadie

Los dos primeros ceros se acaban encontrando: alguien pregunta por un dato que sabe que existe y el vacío lo delata. El tercero no, porque no hay vacío que ver. Una fila ausente no llama la atención de nadie y menos en una tabla con veinte filas correctas.

De ahí sacamos una regla que aplicamos a todo lo que construimos: una cifra incompleta que parece completa hace más daño que un error. Un error se ve y se arregla. Una omisión silenciosa se propaga a las decisiones que se toman con ella.

## Qué hacemos con los ceros

Dos cosas y ninguna es un filtro mágico.

La primera: el sistema declara lo que ha hecho. Cada respuesta abre diciendo qué periodo se ha consultado, porque descubrimos que «el último mes» significaba cosas distintas según quién preguntara. Y si una fuente no está disponible, el sistema responde con las que sí y dice en voz alta cuál se ha omitido. La transparencia convierte el tercer cero en el primero.

La segunda: clasificamos. Cada conversación que termina sin datos queda etiquetada con su causa y esas etiquetas forman colas de trabajo distintas. Un cero verdadero no necesita nada. Una consulta mal hecha es un fallo que corregir. Una fuente omitida es un agujero de diseño. Tratarlas igual es no tratar ninguna. La otra mitad de la disciplina es no fiarse de las cifras que sí llegan, que es justo el trabajo de [el auditor que no se fía](/blog/el-auditor-que-no-se-fia).

Este tipo de disciplina es lo que separa un asistente que funciona en la demostración de uno que aguanta meses de producción. Contamos cómo la aplicamos en [desarrollo de agentes de IA](/servicios/desarrollo-de-agentes-de-ia) y si vienes desde cero, la [guía de agentes](/agentes-de-ia) es el mejor punto de partida.
