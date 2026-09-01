---
title: 'Qué hace tu asistente cuando una herramienta se cae'
metaTitle: 'Qué hace tu asistente si una herramienta se cae'
description: 'Un asistente conversacional depende de sistemas que fallan. El disyuntor que protege al usuario y las tres lecciones que nos dio mantenerlo en producción.'
lang: 'es'
pubDate: 2026-06-23
updatedDate: 2026-08-31
translationId: 'tool-goes-down'
tags: ['Agentes', 'Fiabilidad', 'Mantenimiento']
---

Un asistente conversacional serio no vive solo. Consulta bases de datos, sistemas internos y servicios de terceros. Cada una de esas piezas puede caerse y se caerá. **La pregunta que define la calidad del asistente no es si sus herramientas fallan. Es qué ve el usuario cuando fallan.**

La respuesta barata es una traza técnica, un mensaje en inglés con un número de error dentro, de esos que solo significan algo para quien programó el sistema. Para quien está delante, eso significa *«esto no funciona»* y la confianza en el sistema entero se resiente por el fallo de una sola pieza.

## El disyuntor

El patrón tiene nombre y dos décadas de servicio. Lo bautizó Michael Nygard en 2007 en «Release It!», el libro de referencia sobre software en producción, tomando la imagen del disyuntor eléctrico que corta la corriente antes de que el fallo se propague.

Los grandes sistemas distribuidos lo llevan de serie desde entonces. Lo que casi nadie ha hecho todavía es aplicárselo a las herramientas de un asistente con IA, que fallan igual que cualquier servicio y encima fallan delante de una persona en mitad de una frase.

En nuestro asistente de planta, cada herramienta tiene una ficha de estado: un contador de fallos, el último error y su fecha. Una pieza vigila lo que devuelve cada agente y reconoce las formas típicas de que algo se ha roto, desde una respuesta vacía hasta un error de conexión o un flujo que se ha quedado parado. Si una herramienta encadena fallos dentro de una ventana de tiempo, el sistema la desactiva.

Lo que ve el usuario entonces no es un error técnico. Es un mensaje de degradación amable y específico. Esa funcionalidad concreta no está disponible, el resto del asistente sigue en pie. La avería de una pieza deja de contaminar al conjunto y de paso ninguna traza interna, con sus nombres de servidor y sus rutas, viaja a la pantalla de nadie.

## Tres lecciones que nos dio producción

**Un contador que solo sube, miente.** Si nadie lo baja con el tiempo, una herramienta perfectamente sana arrastra el contador alto de un incidente de hace meses. Parece enferma y está curada. Toda lectura del contador se cruza ahora con la fecha del último fallo, porque un número sin fecha es un rumor.

**No hay recuperación automática gratis.** Abrir el disyuntor es fácil. Decidir cuándo cerrarlo exige criterio. Optamos por reactivación manual y consciente y lo dejamos escrito, porque lo peligroso no es la decisión sino el silencio. Una herramienta caída que nadie recuerda es peor que una caída ruidosa.

**«Habilitado» no significa «alcanzable».** El hallazgo más incómodo. Una auditoría reveló una herramienta que figuraba sana y operativa en su tabla de estado mientras el enrutador no tenía forma de llegar a ella, porque faltaba en las reglas de entrada. La salud declarada y el poder llegar de verdad a ella son propiedades distintas y solo una prueba de extremo a extremo las verifica a la vez.

## La fiabilidad se diseña antes del fallo

Nada de esto se improvisa el día que un servicio de terceros se cae a las once de la mañana. **El disyuntor, los mensajes de degradación y las pruebas de que se puede llegar a cada pieza se construyen antes, cuando todo funciona, que es exactamente cuando parecen innecesarios.** Cada caída que sí ocurre deja además su huella en el catálogo de incidencias, la pieza que contamos en [la firma del síntoma](/blog/la-firma-del-sintoma).

Hay una prueba que puedes hacer esta semana. Apaga a propósito una herramienta de tu asistente en un entorno de pruebas y mira la pantalla del usuario. *¿Un rastro técnico o una degradación amable?* Lo que veas es tu respuesta a la pregunta con la que abría este artículo.

Si estás pensando en un asistente que dependa de tus sistemas reales, esto es parte de lo que llamamos [agentes conversacionales](/servicios/agentes-conversacionales). Y si quieres el mapa completo antes de decidir, empieza por la [guía de agentes de IA](/agentes-de-ia).
