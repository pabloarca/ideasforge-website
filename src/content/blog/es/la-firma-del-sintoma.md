---
title: 'La firma del síntoma vale más que el arreglo'
description: 'Documentar cómo se reconoce un fallo desde fuera rinde más que documentar cómo se arregló. Tres firmas reales de un asistente de IA en producción.'
lang: 'es'
pubDate: 2026-07-21
translationId: 'symptom-signature'
tags: ['Observabilidad', 'Mantenimiento', 'Agentes']
---

Cuando un sistema falla, casi todos los equipos documentan lo mismo: qué se rompió y cómo se arregló. Nosotros documentamos otra cosa primero: cómo se reconoce ese fallo desde fuera, antes de saber qué lo causa. Lo llamamos la firma del síntoma y es uno de los activos menos visibles y más útiles que mantenemos en nuestros sistemas.

La razón es simple. El arreglo se aplica una vez. La firma se reutiliza cada vez que el sistema vuelve a comportarse raro y con componentes no deterministas eso pasa más de lo que a nadie le gustaría admitir.

## Tres firmas reales

Estas tres salen del catálogo de uno de nuestros asistentes en producción, un sistema con un orquestador y varios agentes especializados detrás.

**Todo cae en «sin candidatos» con puntuación nula.** El instinto dice: el modelo se ha roto o el prompt o los umbrales. La firma dice otra cosa: son vectores sin generar. Alguien añadió ejemplos nuevos al catálogo sin relanzar la ingesta y la búsqueda descarta todo lo que no tiene vector. Del susto salió un procedimiento: tras cualquier alta en el catálogo, ejecutar la ingesta y verificar que quedan cero pendientes antes de tocar nada más.

**Todo lo que pasa por el modelo devuelve nulo, pero las continuaciones funcionan.** Las continuaciones son el único camino del sistema que no invoca al modelo. Si ellas viven y lo demás no, el diagnóstico es inmediato: el problema está en la conexión con el modelo, no en las instrucciones. Aquella vez apuntaba a un despliegue inexistente tras un cambio manual. Veinte minutos de diagnóstico convertidos en dos.

**Funciona en producción y falla en las pruebas o al revés.** La firma más incómoda, porque nadie quiere mirarla. El mensaje llegaba en un campo de la petición distinto del que leía el código. No era un fallo del banco de pruebas: era un fallo latente que también afectaba a producción si el sistema de origen cambiaba de campo. Lo detectó una persona leyendo con atención, no una alarma. También eso es un dato: hay firmas que todavía no sabemos automatizar.

## Por qué esto le importa a quien compra IA

Porque el mantenimiento es donde los proyectos de IA viven o mueren y el mantenimiento va exactamente a la velocidad del diagnóstico. Un catálogo de firmas convierte el «se comporta raro» en una lista corta de comprobaciones que cualquiera del equipo puede ejecutar, incluida la persona que llegue dentro de dos años y no estuviera en ninguna reunión.

Por eso, cuando entregamos un sistema, el catálogo de incidencias que acompaña al repositorio no cuenta solo cómo se arregló cada problema. Cuenta cómo se reconoce. Es una de las piezas del traspaso que más agradecen los equipos técnicos de nuestros clientes y una de las que casi nadie pide porque casi nadie sabe que existe. El catálogo tiene además un pariente en tiempo real, el disyuntor que decide qué pasa mientras una herramienta está caída. Le dedicamos [su propio artículo](/blog/cuando-una-herramienta-se-cae).

Si quieres entender qué más hace falta para que un asistente aguante producción, sigue por la [guía de agentes de IA](/agentes-de-ia) o mira cómo trabajamos el [desarrollo de agentes a medida](/servicios/desarrollo-de-agentes-de-ia).
