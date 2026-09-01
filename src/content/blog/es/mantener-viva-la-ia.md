---
title: 'Empezar un proyecto de IA es fácil. Mantenerlo vivo, casi imposible'
metaTitle: 'Por qué mueren los proyectos de IA que van bien'
description: 'Los proyectos de IA geniales se estrenan bien y mueren pronto. Los rentables son fáciles de empezar y de mantener. La diferencia se decide antes de escribir código.'
lang: 'es'
pubDate: 2026-07-28
updatedDate: 2026-08-31
translationId: 'keeping-ai-alive'
tags: ['Mantenimiento', 'Observabilidad', 'Negocio']
---

Es fácil iniciar proyectos de IA geniales. La demostración sale bien, el vídeo circula, todo el mundo aplaude. Lo que es casi imposible es mantener ese proyecto con vida seis meses. Los proyectos de IA rentables son fáciles de empezar y fáciles de mantener. Esa asimetría es el filtro con el que decidimos qué construir.

No es una opinión rara. [Gartner estima](https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027) que más del 40 % de los proyectos de IA agéntica se cancelarán antes de que acabe 2027. **La mortalidad no está en arrancar, está en sobrevivir.**

## Lo que mata a los proyectos no es el modelo

Operamos [nuestro propio producto](/casos/wazzy), un asistente de citas por WhatsApp que trata datos de salud y eso nos ha enseñado dónde muere de verdad un sistema. **Nunca es el gran fallo cinematográfico, es la degradación que nadie mira.** Nuestro peor incidente lo cuenta bien. Una alerta mal calibrada empezó a disparar sobre un estado que no era un fallo real. En pocos días emitió 5.667 eventos y agotó la cuota mensual del sistema de avisos. La monitorización entera quedó ciega.

Seis días después fallaron trece recordatorios reales de una clínica y la alarma correspondiente disparó trece veces sin que ninguna saliera de la máquina. Nos lo contó la clínica, no el sistema.

De ahí salieron reglas que hoy aplicamos a todo: cada alerta lleva su propio límite, ninguna puede agotar el presupuesto de las demás y el silencio también se vigila, porque **cero avisos en 24 horas no significa que todo vaya bien**.

## Esto tiene nombre desde hace una década

La asimetría no la descubrimos nosotros. En 2015, un equipo de Google publicó «Hidden Technical Debt in Machine Learning Systems», el trabajo de referencia sobre la deuda técnica oculta de estos sistemas, con una estimación que hizo carrera. Un sistema maduro puede ser un 5 % de código de aprendizaje automático y un 95 % de todo lo demás, los datos, la infraestructura, la monitorización y el pegamento entre piezas.

El aviso venía de un artículo anterior de los mismos autores, que llamaba al aprendizaje automático la tarjeta de crédito de la deuda técnica, la que se estrena fácil y se paga con intereses. Lo decía uno de los operadores más grandes del mundo, un año antes de que la mayoría del sector tocara un modelo.

Una década después, con la IA generativa, la deuda es la misma y los intereses han subido. El componente central ya ni siquiera se comporta igual dos veces, así que todo lo que rodea al modelo pesa más, no menos. **La demo enseña el 5 %. El día 180 se vive en el otro 95.**

## Mantener vivo es un sistema, no una intención

La diferencia entre el proyecto genial y el rentable no es el talento ni el modelo. Es que el rentable se diseñó para ser mantenido. En la práctica, eso son piezas concretas:

**Una batería de pruebas que corre antes de cada cambio.** Con componentes no deterministas, cualquier retoque puede romper lo que ayer funcionaba sin que nada «falle». Si la calidad baja, el cambio no se publica.

**Un registro que permite reconstruir cada decisión.** Cuando llega la queja, la pregunta útil no es «qué línea falló» sino «por qué el sistema creyó que eso era lo correcto». Sin registro, esa pregunta no tiene respuesta.

**Alarmas que se prueban provocando el fallo.** Una defensa que nunca has visto saltar no es una defensa. Cada centinela se verifica rompiendo a propósito lo que vigila.

**Y una prueba de fuego real, periódica.** En nuestro producto, una prueba semanal crea una cita de verdad, envía un mensaje de verdad y lo limpia todo después. Descubre lo que ningún simulacro descubre.

## La pregunta incómoda para tu proveedor

Si estás evaluando un proyecto de IA, la pregunta que más información te dará no es sobre el modelo ni sobre la demostración. *¿Qué pasa el día 180?* ¿Quién mira las alarmas, quién ejecuta las pruebas, quién se entera si el sistema empeora en silencio? Un proyecto genial no sabe responder. Uno rentable responde con nombres. Cómo se ve eso por dentro, con los números y la cicatriz de un sistema propio, está en [la página de Wazzy](/casos/wazzy).

Nosotros respondemos con lo que llamamos observabilidad por defecto y está en el centro de cómo hacemos [desarrollo de agentes de IA](/servicios/desarrollo-de-agentes-de-ia). Si prefieres empezar por el mapa general, está en la [guía de agentes](/agentes-de-ia). Mantener también tiene precio y lo que mueve esa cuota mensual está desglosado en la [guía de coste](/cuanto-cuesta-un-agente-de-ia).
