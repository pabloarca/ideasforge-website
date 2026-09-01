---
title: 'Un agente de IA para inmobiliarias, contado desde dentro'
metaTitle: 'Un agente de IA para inmobiliarias, por dentro'
description: 'Decenas de mensajes de WhatsApp al día, cinco a diez minutos por consulta y un equipo desbordado. Esto es lo que hace el agente que los filtra.'
lang: 'es'
pubDate: 2025-06-15
updatedDate: 2026-08-31
translationId: 'real-estate-agent'
tags: ['Agentes', 'Inmobiliarias', 'Automatización']
heroImage: '/blog/inmo.jpg'
---

Barceloneta Premium, una agencia de Barcelona, recibía decenas de mensajes de WhatsApp al día de personas interesadas en alquilar. Cada consulta exigía entre cinco y diez minutos de comprobación manual antes de saber si valía la pena seguir. Multiplica esos minutos por decenas de mensajes y sale la cuenta que se comía al equipo, varias horas al día repartidas en interrupciones de diez minutos.

**La respuesta obvia habría sido contratar a alguien para hacer triaje. La respuesta interesante fue quitar el triaje de en medio.**

## Qué hace el agente, paso a paso

El agente recibe cada mensaje y mantiene la conversación necesaria para extraer tres cosas, el motivo de la consulta, el presupuesto y la documentación disponible. No suelta un formulario, pregunta como preguntaría una persona del equipo.

Con la información completa, el agente no decide a solas ni deja la conversación en el aire. Envía al equipo un resumen por correo con un veredicto de apto o no apto y un párrafo que justifica el porqué. La persona de la agencia abre el correo, lee tres líneas y decide si programa la visita. **El criterio sigue siendo suyo. Lo que desaparece son los diez minutos de comprobaciones para llegar a ese criterio.**

## El resultado, en horas y no en promesas

Más de tres horas al día ahorradas solo en gestionar solicitudes entrantes. El equipo pasó de hacer triaje a concertar visitas, que es la parte del trabajo que produce ingresos. Y las personas interesadas reciben respuesta inmediata a cualquier hora, incluidos los picos de demanda de alquiler en los que antes se enfriaban esperando.

Ese es además el criterio con el que medimos si un proyecto de IA merece existir, **que mueva una cifra de negocio y no una sensación**. Lo contamos en [medir la IA por las ganancias](/blog/medir-la-ia-por-las-ganancias).

## «Se enfría» no es una sensación, tiene números

Lo de que el interesado se enfría suena a intuición de comercial. Está medido.

El estudio clásico sobre la vida de un contacto entrante lo publicó Harvard Business Review en 2011, con 1,25 millones de consultas recibidas por 42 empresas estadounidenses. Las que intentaban el contacto en la primera hora multiplicaban casi por siete la probabilidad de conseguir una conversación útil frente a las que lo intentaban una hora más tarde. Frente a las que dejaban pasar un día, la multiplicaban por más de sesenta.

¿Y cuántas empresas contestan a esa velocidad? El mismo artículo auditó a 2.241 con una consulta de prueba. El 37 % respondió dentro de la primera hora. El 23 % no respondió nunca.

El estudio tiene sus años y medía llamadas de teléfono, así que conviene no estirarlo. Lo que no ha caducado es el mecanismo. Quien busca piso no te escribe solo a ti, escribe a la vez a todos los anuncios que le encajan. **La conversación se la queda el primero que contesta con algo útil.** Un agente contesta con algo útil a medianoche de un domingo.

El canal tampoco lo elegimos nosotros. Según el Panel de Hogares de la CNMC, con datos del cuarto trimestre de 2025, el 94,6 % de los internautas españoles usa WhatsApp habitualmente. La segunda aplicación de mensajería es Instagram y se queda en el 27,6 %. La conversación ocurre donde la gente ya está. Un canal que nadie tiene que instalarse es media batalla ganada.

## Lo que hace falta para que no sea una demo

Un agente así toca datos personales, calendario y reputación, así que **la parte invisible pesa más que la visible.** La conversación deja rastro completo, cada solicitud queda registrada con su veredicto y su justificación. El filtro que decide qué se escala no vive en las instrucciones del modelo, vive en código que se ejecuta siempre. Son las mismas reglas de construcción que aplicamos a todos nuestros [agentes conversacionales](/servicios/agentes-conversacionales), estén atendiendo una inmobiliaria o una clínica.

Y hay una razón de fondo para que el veredicto lo firme una persona, además del sentido común. El reglamento europeo de protección de datos reserva en su artículo 22 el derecho a no quedar sometido a decisiones basadas únicamente en un tratamiento automatizado cuando tienen efectos jurídicos o consecuencias igual de serias. Quedarse sin la vivienda que se pide entra en esa clase.

Como aquí la decisión la toma alguien de la agencia con el resumen delante, nunca es únicamente automatizada. **Lo que parece cortesía con el cliente es también la línea que la ley pide no cruzar.** Ese terreno completo está contado en [IA y RGPD](/ia-y-rgpd).

## Lo que hubo que tirar primero

Este agente que hoy suena tan razonable no nació así. La primera versión seguía el patrón con el que se construye casi todo lo que hoy se vende como agente, un modelo con herramientas a su disposición y la instrucción de usarlas cuando hicieran falta.

**Muchas veces no las usaba.** No fallaba nada que se pudiera mirar en un registro. El modelo decidía que podía responder sin consultar, así que o inventaba la respuesta o le decía a la persona que no se podía avanzar cuando sí se podía.

La reconstruimos al revés, con el estado de la conversación llevado en código y el modelo interpretando dentro de ese estado. Esa historia entera, con la arquitectura que quedó y lo que el sistema no hace a propósito, está en [la página del caso](/casos/barceloneta).

## Y después del alquiler, lo demás

La señal de que un sistema funciona es lo que pasa después. La agencia está ampliando el agente a la venta de viviendas y a procesos internos, sobre la misma base que ya filtra el alquiler. **Empezar por un proceso doloroso y crecer desde ahí es el patrón que vemos repetirse en los proyectos que sobreviven.**

La cuenta que hicimos aquí puedes hacerla tú esta tarde. *¿Cuántos minutos cuesta cada consulta que entra y cuántas entran al día?* Multiplica. Ese número ya lo estás pagando, solo que sin factura.

Si tu agencia se parece a esto, el vertical de [IA para inmobiliarias](/inmobiliarias) explica el sistema completo con su prueba en producción. Y si lo tuyo es otro sector con el mismo cuello de botella, la conversación empieza igual, contándonos dónde se van las horas.
