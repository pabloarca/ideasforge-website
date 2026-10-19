---
title: 'El cero silencioso'
description: 'Un cero no es una respuesta neutra, es una alarma sin clasificar. Las tres causas de un «no hay datos» y por qué la tercera es la más traicionera.'
lang: 'es'
pubDate: 2026-08-04
updatedDate: 2026-08-31
translationId: 'silent-zero'
tags: ['Observabilidad', 'Datos', 'Agentes']
draft: true
---

Cuando un asistente de datos responde *«no hay resultados para ese periodo»*, casi todo el mundo lo lee como una respuesta más. Nosotros aprendimos a leerlo de otra manera. **Un cero no es una respuesta neutra, es una alarma que hay que clasificar.**

Lo aprendimos manteniendo uno de nuestros asistentes en producción. Tres situaciones completamente distintas producían el mismo «no hay datos» y desde fuera eran indistinguibles.

## Las tres causas de un cero

**La primera es el cero verdadero.** No se registró actividad. La respuesta es correcta y no hay nada que arreglar. Este es el único cero inocente y el problema es que los otros dos se disfrazan de él.

**La segunda es la consulta mal hecha.** El sistema consultó, pero consultó mal. Nos pasó con un rango de fechas que incluía un día de más, por contar el último día cuando no tocaba. Y nos pasó al revés, cuando un cambio nuestro alteró lo que significaba un código interno y una familia entera de filtros empezó a devolver vacío. En ambos casos había datos. El sistema no los encontraba.

**La tercera es la más traicionera, no se consultó en absoluto.** En una consulta que agrupaba varias fuentes, la que no tenía filas sencillamente desaparecía del resultado. El usuario veía una tabla, la tabla estaba bien formada y le faltaba un trozo. Sin error, sin aviso y sin nada que saltara en ningún sitio. El sistema funcionaba. La respuesta era incompleta y parecía completa.

## Por qué la tercera no la detecta nadie

Los dos primeros ceros se acaban encontrando. Alguien pregunta por un dato que sabe que existe y el vacío lo delata. El tercero no, porque no hay vacío que ver. Una fila ausente no llama la atención de nadie y menos en una tabla con veinte filas correctas.

De ahí sacamos una regla que aplicamos a todo lo que construimos. **Una cifra incompleta que parece completa hace más daño que un error.** Un error se ve y se arregla. Una omisión silenciosa se propaga a las decisiones que se toman con ella.

## Qué hacemos con los ceros

Dos cosas y ninguna es un filtro mágico.

La primera es que el sistema dice lo que ha hecho. Cada respuesta abre declarando el periodo que se ha consultado, porque descubrimos que *«el último mes»* significaba cosas distintas según quién preguntara. Y si una fuente no está disponible, el sistema responde con las que sí y dice en voz alta cuál se ha omitido. **La transparencia convierte el tercer cero en el primero.**

La segunda es que clasificamos. Cada conversación que termina sin datos queda etiquetada con su causa y esas etiquetas forman colas de trabajo distintas. Un cero verdadero no necesita nada. Una consulta mal hecha es un fallo que corregir. Una fuente omitida es un agujero de diseño. Tratarlas igual es no tratar ninguna.

La otra mitad de la disciplina es no fiarse de las cifras que sí llegan, que es justo el trabajo de [el auditor que no se fía](/blog/el-auditor-que-no-se-fia).

La prueba del tercer cero se monta en cinco minutos. Pide un total que cruce varias fuentes y, antes, apaga una. *¿El sistema avisó de lo que faltaba o entregó el total como si nada?* Ese como-si-nada es el cero que nadie clasifica.

Este tipo de disciplina es lo que separa un asistente que funciona en la demostración de uno que aguanta meses de producción. Contamos cómo la aplicamos en [desarrollo de agentes de IA](/servicios/desarrollo-de-agentes-de-ia) y si vienes desde cero, la [guía de agentes](/agentes-de-ia) es el mejor punto de partida.
