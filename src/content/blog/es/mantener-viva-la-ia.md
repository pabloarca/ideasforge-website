---
title: 'Empezar un proyecto de IA es fácil. Mantenerlo vivo, casi imposible'
description: 'Los proyectos de IA geniales se estrenan bien y mueren pronto. Los rentables son fáciles de empezar y fáciles de mantener. La diferencia se decide antes de escribir código.'
lang: 'es'
pubDate: 2026-07-28
translationId: 'keeping-ai-alive'
tags: ['Mantenimiento', 'Observabilidad', 'Negocio']
---

Es fácil iniciar proyectos de IA geniales. La demostración sale bien, el vídeo circula, todo el mundo aplaude. Lo que es casi imposible es mantener ese proyecto con vida seis meses. ¿Proyectos de IA rentables? Fáciles de empezar y fáciles de mantener. Esa asimetría es el filtro con el que decidimos qué construir.

No es una opinión rara. [Gartner estima](https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027) que más del 40 % de los proyectos de IA agéntica se cancelarán antes de que acabe 2027. La mortalidad no está en arrancar, está en sobrevivir.

## Lo que mata a los proyectos no es el modelo

Operamos nuestro propio producto, un asistente de citas por WhatsApp que trata datos de salud y eso nos ha enseñado dónde muere de verdad un sistema. Nunca es el gran fallo cinematográfico, es la degradación que nadie mira. Nuestro peor incidente lo cuenta bien. Una alerta mal calibrada empezó a disparar sobre un estado que no era un fallo real. En pocos días emitió miles de eventos y agotó la cuota mensual del sistema de avisos. La monitorización entera quedó ciega. Seis días después fallaron trece recordatorios reales de una clínica y la alarma correspondiente disparó trece veces sin que ninguna saliera de la máquina. Nos lo contó la clienta, no el sistema.

De ahí salieron reglas que hoy aplicamos a todo: cada alerta lleva su propio límite, ninguna puede agotar el presupuesto de las demás y el silencio también se vigila, porque cero avisos en 24 horas no significa que todo vaya bien.

## Mantener vivo es un sistema, no una intención

La diferencia entre el proyecto genial y el rentable no es el talento ni el modelo. Es que el rentable se diseñó para ser mantenido. En la práctica, eso son piezas concretas:

**Una batería de pruebas que corre antes de cada cambio.** Con componentes no deterministas, cualquier retoque puede romper lo que ayer funcionaba sin que nada «falle». Si la calidad baja, el cambio no se publica.

**Un registro que permite reconstruir cada decisión.** Cuando llega la queja, la pregunta útil no es «qué línea falló» sino «por qué el sistema creyó que eso era lo correcto». Sin registro, esa pregunta no tiene respuesta.

**Alarmas que se prueban provocando el fallo.** Una defensa que nunca has visto saltar no es una defensa. Cada centinela se verifica rompiendo a propósito lo que vigila.

**Y una prueba de fuego real, periódica.** En nuestro producto, una prueba semanal crea una cita de verdad, envía un mensaje de verdad y lo limpia todo después. Cuesta céntimos y descubre lo que ningún simulacro descubre.

## La pregunta incómoda para tu proveedor

Si estás evaluando un proyecto de IA, la pregunta que más información te dará no es sobre el modelo ni sobre la demostración. ¿Qué pasa el día 180? ¿Quién mira las alarmas, quién ejecuta las pruebas, quién se entera si el sistema empeora en silencio?

Nosotros respondemos con lo que llamamos observabilidad por defecto y está en el centro de cómo hacemos [desarrollo de agentes de IA](/servicios/desarrollo-de-agentes-de-ia). Si prefieres empezar por el mapa general, está en la [guía de agentes](/agentes-de-ia).
