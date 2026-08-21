---
title: 'Qué hace tu asistente cuando una herramienta se cae'
description: 'Un asistente conversacional depende de sistemas que fallan. El disyuntor que protege al usuario y las tres lecciones que nos dio mantenerlo en producción.'
lang: 'es'
pubDate: 2026-06-23
translationId: 'tool-goes-down'
tags: ['Agentes', 'Fiabilidad', 'Mantenimiento']
---

Un asistente conversacional serio no vive solo: consulta bases de datos, sistemas internos y servicios de terceros. Cada una de esas piezas puede caerse y se caerá. La pregunta que define la calidad del asistente no es si sus herramientas fallan. Es qué ve el usuario cuando fallan.

La respuesta barata es una traza técnica: «connection refused», un objeto a medio serializar, un error 500 con pinta de accidente. Para quien está delante, eso significa «esto no funciona» y la confianza en el sistema entero se resiente por el fallo de una sola pieza.

## El disyuntor

En uno de nuestros asistentes de planta, cada herramienta tiene una ficha de estado: un contador de fallos, el último error y su fecha. Un validador inspecciona la salida de cada agente y reconoce los patrones de rotura: respuestas vacías, trazas de conexión, objetos mal serializados, flujos inactivos. Si una herramienta encadena fallos dentro de una ventana de tiempo, el sistema la desactiva.

Lo que ve el usuario entonces no es un error técnico. Es un mensaje de degradación amable y específico: esa funcionalidad concreta no está disponible, el resto del asistente sigue en pie. La avería de una pieza deja de contaminar al conjunto y de paso ninguna traza interna, con sus nombres de servidor y sus rutas, viaja a la pantalla de nadie.

## Tres lecciones que nos dio producción

**Un contador que solo sube, miente.** Sin decaimiento temporal, una herramienta perfectamente sana arrastra el contador alto de un incidente de hace meses. Parece enferma y está curada. Toda lectura del contador se cruza ahora con la fecha del último fallo, porque un número sin fecha es un rumor.

**No hay recuperación automática gratis.** Abrir el disyuntor es fácil. Decidir cuándo cerrarlo exige criterio. Optamos por reactivación manual y consciente y lo dejamos escrito, porque lo peligroso no es la decisión sino el silencio: una herramienta caída que nadie recuerda es peor que una caída ruidosa.

**«Habilitado» no significa «alcanzable».** El hallazgo más incómodo. Una auditoría reveló una herramienta que figuraba sana y operativa en su tabla de estado mientras el enrutador no tenía forma de llegar a ella: faltaba en las reglas de entrada. La salud declarada y la alcanzabilidad real son propiedades distintas y solo una prueba de extremo a extremo las verifica a la vez.

## La fiabilidad se diseña antes del fallo

Nada de esto se improvisa el día que un servicio de terceros se cae a las once de la mañana. El disyuntor, los mensajes de degradación y las pruebas de alcanzabilidad se construyen antes, cuando todo funciona, que es exactamente cuando parecen innecesarios. Cada caída que sí ocurre deja además su huella en el catálogo de incidencias, la pieza que contamos en [la firma del síntoma](/blog/la-firma-del-sintoma).

Si estás pensando en un asistente que dependa de tus sistemas reales, esto es parte de lo que llamamos [agentes conversacionales](/servicios/agentes-conversacionales). Y si quieres el mapa completo antes de decidir, empieza por la [guía de agentes de IA](/agentes-de-ia).
