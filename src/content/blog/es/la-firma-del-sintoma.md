---
title: 'La firma del síntoma vale más que el arreglo'
description: 'Documentar cómo se reconoce un fallo desde fuera rinde más que documentar cómo se arregló. Tres firmas reales de un asistente de IA en producción.'
lang: 'es'
pubDate: 2026-07-21
updatedDate: 2026-08-31
translationId: 'symptom-signature'
tags: ['Observabilidad', 'Mantenimiento', 'Agentes']
---

Cuando un sistema falla, casi todos los equipos documentan lo mismo, qué se rompió y cómo se arregló. Nosotros documentamos otra cosa primero. Cómo se reconoce ese fallo desde fuera, antes de saber qué lo causa. Lo llamamos la firma del síntoma y es uno de los activos menos visibles y más útiles que mantenemos en nuestros sistemas.

La razón es simple. **El arreglo se aplica una vez. La firma se reutiliza cada vez que el sistema vuelve a comportarse raro** y con componentes no deterministas eso pasa más de lo que nos gustaría admitir.

## No es la base de errores conocidos de toda la vida

La gestión de servicios de TI lleva décadas manteniendo algo parecido. En ITIL, el marco de referencia del sector, se llama base de datos de errores conocidos y guarda cada problema con su causa raíz, su apaño temporal y el estado de su arreglo.

Nuestro catálogo de incidencias se le parece en casi todo y se diferencia en el orden. Una base de errores conocidos se organiza por causas, porque en el software clásico la causa es estable y el síntoma varía. **Con componentes no deterministas pasa lo contrario, el síntoma se repite y la causa cambia.**

El mismo «no responde nada» puede venir hoy de una conexión caída y mañana de un cambio que alguien publicó, así que lo valioso no es archivar la causa de ayer. Es reconocer el síntoma de hoy y tener la lista corta de causas que lo han producido antes.

Por eso la entrada de nuestro catálogo empieza por cómo se ve el fallo desde fuera y no por su causa. La tradición sirve. Al orden hay que darle la vuelta.

## Tres firmas reales

Estas tres salen del catálogo de uno de nuestros asistentes en producción, un sistema con un orquestador y varios agentes especializados detrás.

**El asistente no encuentra nada, pregunte lo que le pregunten.** El primer impulso culpa al modelo o a sus instrucciones. La firma dice otra cosa. Alguien añadió documentos nuevos y nadie los pasó por el proceso de indexado, el que los deja buscables, así que para la búsqueda es como si no existieran. Del susto salió un procedimiento. Después de cada alta, ejecutar ese proceso y comprobar que no queda ninguno pendiente antes de tocar nada más.

**El asistente se queda mudo en todo menos en los mensajes de seguir la conversación.** Son el único camino que no pasa por el modelo. Si esos funcionan y el resto no, el diagnóstico es inmediato. El problema está en la conexión con el modelo, no en lo que le hemos escrito. Aquella vez el sistema llamaba a una dirección que ya no existía, tras un cambio de configuración hecho a mano y sin registrar. Veinte minutos de diagnóstico convertidos en dos.

**Funciona en producción y falla en las pruebas o al revés.** La firma más incómoda, porque nadie quiere mirarla. El texto del usuario llegaba en un campo y el código lo leía de otro. No era un fallo del entorno de pruebas, era una bomba de relojería. El día que el sistema de origen cambiara de sitio, producción se habría roto igual. Lo detectó una persona leyendo con atención, no una alarma. También eso es un dato. Hay firmas que todavía no sabemos detectar solos.

## Por qué esto le importa a quien compra IA

Porque **el mantenimiento es donde los proyectos de IA viven o mueren y el mantenimiento va exactamente a la velocidad del diagnóstico**. Un catálogo de firmas convierte el *«se comporta raro»* en una lista corta de comprobaciones que cualquiera del equipo puede ejecutar, incluida la persona que llegue dentro de dos años y no haya estado en ninguna reunión.

Por eso, cuando entregamos un sistema, el catálogo de incidencias que acompaña al repositorio no cuenta solo cómo se arregló cada problema. Cuenta cómo se reconoce. Es una de las piezas del traspaso que más agradecen los equipos técnicos de nuestros clientes y una de las que casi nadie pide porque casi nadie sabe que existe. El catálogo tiene además un pariente en tiempo real, el disyuntor que decide qué pasa mientras una herramienta está caída. Le dedicamos [su propio artículo](/blog/cuando-una-herramienta-se-cae).

Empieza tu catálogo hoy, con una sola entrada. La próxima vez que el sistema haga algo raro, escribe primero cómo lo reconociste, antes de saber la causa y antes de arreglarlo. Esa página se reutiliza. El arreglo, no.

Si quieres entender qué más hace falta para que un asistente aguante producción, sigue por la [guía de agentes de IA](/agentes-de-ia) o mira cómo trabajamos el [desarrollo de agentes a medida](/servicios/desarrollo-de-agentes-de-ia).
