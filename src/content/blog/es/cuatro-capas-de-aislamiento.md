---
title: 'Cuatro capas entre tu empresa y la de al lado'
description: 'Un mismo asistente responde a varias empresas y ninguna puede ver a la otra. Las cuatro capas que lo garantizan, una lección sobre los permisos y el rediseño que borró la clase entera de fallos.'
lang: 'es'
pubDate: 2026-08-21
updatedDate: 2026-08-31
translationId: 'four-layers-isolation'
tags: ['Seguridad', 'Arquitectura', 'Agentes']
draft: true
---

Uno de nuestros asistentes responde preguntas de negocio a varias empresas de un mismo grupo, cada una con sus datos. El mismo software, los mismos modelos y la información de todas conviviendo en el mismo almacén de datos. Desde el primer día lleva encima la pregunta que cualquier responsable de datos hace con toda la razón. Qué impide, exactamente, que la respuesta de una empresa lleve dentro números de otra.

Ya contamos en [por qué no nos gustan las arquitecturas agénticas](/blog/no-me-gustan-los-agentes-de-ia) cómo heredamos un filtro que vivía en las instrucciones del modelo y por qué lo retiramos. **Una instrucción no es una garantía.** Este artículo cuenta lo que construimos después, cuatro capas pensadas para que cada una aguante el fallo de la anterior y un final en el que el aislamiento dejó de ser un filtro para convertirse en la forma misma de los datos.

## El asistente es ciego por diseño

El contexto de un modelo es todo lo que puede leer mientras responde. En este asistente, el contexto de cada conversación contiene únicamente los centros de trabajo de la persona que pregunta, las instalaciones de las que esa persona responde y ninguna más. **El asistente no decide callarse sobre las demás empresas. Sencillamente no existen para él**, así que nadie puede sonsacarle un dato que nunca tuvo delante. El aislamiento empieza antes que la conversación.

Esta familia de amenazas tiene nombre propio en la lista OWASP para aplicaciones con modelos de lenguaje, la referencia del sector. La inyección de instrucciones abre esa lista y la fuga de información sensible va justo detrás. Nuestra respuesta a las dos empieza en el mismo sitio. **Lo que no está en el contexto no se puede sonsacar**, por muy ingenioso que sea el mensaje que lo intenta.

## Un error de tecleo no cruza la valla

La segunda capa protege el caso más humano que existe, el nombre escrito a medias o con una letra bailada. El asistente corrige nombres de centros para que la gente no tenga que teclear denominaciones exactas, pero esa corrección busca solo dentro de los centros autorizados de quien escribe. Un parecido razonable con el centro de otra empresa no llega ni a candidato. **La comodidad de corregir no abre puertas, se mueve entera dentro del perímetro de cada uno.**

## Una lista blanca tiene la última palabra

Antes de construir ninguna consulta, un código valida la petición contra una lista blanca, una lista cerrada con los valores permitidos para ese usuario. El modelo puede haber entendido lo que quiera. Si un identificador no está en la lista de esa persona, la consulta no llega a existir. La interpretación queda en manos del modelo, que es lo suyo. La decisión queda en manos de un código que se ejecuta siempre igual.

## Si la lista llega vacía, la respuesta es nada

La última capa vive dentro de la propia consulta y desconfía de las tres anteriores. Cada consulta lleva un filtro incondicional. Si la lista de permisos llega vacía por el fallo que sea, la condición resultante no casa con ninguna fila y el sistema devuelve el vacío. **Falla cerrando la puerta, nunca abriéndola.** La seguridad debe sostenerse aunque el modelo falle. Y también aunque fallemos nosotros.

## La lección que nos dieron los permisos

Por el camino nos llevamos una lección que no estaba en el plano. Al construir el asistente dedujimos los permisos de una tabla que ya existía para otra cosa, en vez de darles un sitio propio desde el principio. Funcionaba casi siempre, que es la peor manera de funcionar, porque los fallos aparecen tarde y sin patrón.

La corrección de fondo no fue parchear esa deducción, fue darles a los permisos entidad propia, con una lista escrita de qué persona ve qué centro. **Los permisos son un concepto propio, no un subproducto de otra tabla.** Cada sistema que los trata como subproducto está incubando su incidente.

## Y entonces movimos el suelo

Las cuatro capas protegen un diseño en el que los datos de todas las empresas conviven y un filtro decide. El paso definitivo fue cambiar ese diseño. Cada empresa pasó a vivir en su propio esquema, su compartimento sellado dentro del almacén de datos. Cuando hace falta ver todo junto, el sistema lo compone sobre la marcha, con el nombre de la empresa pegado a cada fila.

**Sumar dos empresas en una misma cifra dejó de ser un fallo que las capas debían atrapar y pasó a ser una consulta que no se puede escribir.**

El efecto se notó en la lista de preocupaciones. Una comparación poco estricta de nombres que nos había tenido en vilo dejó de importar el mismo día, porque ya no quedaba valla que un parecido pudiera saltar. **Arreglar la arquitectura mata la clase entera de fallos, no un caso suelto.** Desde entonces esa es la vara con la que medimos cualquier protección nueva, cuántos fallos vuelve imposibles en lugar de cuántos promete atrapar.

Si estás evaluando un asistente que va a tocar datos de verdad, hay una sola pregunta que lo destapa. *¿Qué pasa cuando la lista de permisos llega vacía?* Quien construyó bien contesta en una frase, la puerta se cierra. Quien no, empieza a hablarte del prompt.

Así construimos en [desarrollo de agentes de IA](/servicios/desarrollo-de-agentes-de-ia), la historia larga de los datos, los registros y la soberanía vive en [IA conforme al RGPD](/ia-y-rgpd) y las dos salen de los mismos sistemas. Si prefieres empezar por el terreno completo, la [guía de agentes de IA](/agentes-de-ia) lo recorre entero.
