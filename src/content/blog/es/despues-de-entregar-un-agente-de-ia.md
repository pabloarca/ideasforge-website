---
title: 'Qué pasa después de entregar un chatbot o agente de IA'
metaTitle: 'Mantenimiento de un chatbot de IA tras la entrega'
description: 'Así mantenemos un chatbot de IA después de entregarlo: un golden dataset con conversaciones reales, monitorización, alarmas y resultados cada semana.'
lang: 'es'
pubDate: 2026-10-05
translationId: 'after-delivering-an-ai-agent'
tags: ['Agentes', 'Fiabilidad']
faq:
  - q: '¿Qué incluye el mantenimiento de un chatbot de IA?'
    a:
      - 'Cinco cosas: vigilarlo con trazas y alarmas, medirlo cada semana con un golden dataset, repetir las pruebas antes de cada cambio, ajustarlo con las preguntas que no supo contestar y probar cada modelo nuevo antes de cambiarlo.'
      - 'Además recibes el panel de Phoenix, los resultados de cada semana, la lista de preguntas sin respuesta y, si lo necesitas, un informe semanal.'
  - q: '¿Cada cuánto se revisa el chatbot?'
    a: 'El golden dataset se ejecuta cada semana contra el modelo real, y las pruebas automáticas se repiten antes de cada cambio. Entre medias, las trazas se pueden consultar en el panel en cualquier momento y las alarmas avisan en cuanto algo se sale de lo esperado.'
  - q: '¿Qué es un golden dataset?'
    a: 'Es la batería de pruebas del chatbot: conversaciones reales de tu negocio, cada una con la respuesta correcta anotada y revisada por una persona. Sirve de referencia para saber si el chatbot sigue acertando cada semana y después de cada cambio.'
  - q: '¿Quién decide cuál es la respuesta correcta?'
    a: 'Lo ideal es que la valide alguien de tu equipo que conozca el negocio, y es lo que te pediremos. Los casos escritos a mano y sin validar contra el sistema real no sirven. Lo aprendimos con nuestro propio asistente de citas.'
  - q: '¿Qué es Arize Phoenix?'
    a: 'Es una herramienta de la empresa Arize para ver por dentro lo que hace un agente de IA. Cada conversación deja una traza con lo que le llegó, lo que hizo paso a paso, cuánto costó, cuánto tardó y qué modelo respondió. También sirve para comparar dos versiones con los mismos casos.'
  - q: '¿Dónde se guardan las trazas de las conversaciones?'
    a: 'No salen a la nube de un tercero. En los proyectos a medida, Phoenix va instalado en tu propio servidor, igual que el resto de la infraestructura, que está a tu nombre desde el primer día.'
  - q: '¿Puedo ver yo lo que hace el chatbot?'
    a: 'Sí. Te entregamos el panel de Phoenix, con las trazas, el gasto y la comparación entre versiones, y los resultados de cada ejecución semanal del golden dataset. Si lo necesitas, también un informe semanal que lo resume.'
  - q: '¿Qué pasa si el chatbot se equivoca delante de un cliente?'
    a: 'Lo vemos en la traza, buscamos la causa y el caso entra en las pruebas para que no vuelva a pasar sin que lo veamos. Si tu equipo lo detecta antes, nos lo cuenta y seguimos el mismo camino.'
  - q: '¿Qué pasa con las preguntas que el chatbot no sabe contestar?'
    a: 'Te entregamos la lista y la revisamos contigo. En cada caso decidimos si basta con añadir un término al glosario, si hay que cambiar las instrucciones del modelo (el prompt) o si hay que cambiar el diseño. Cuando queda resuelta, la pregunta entra en el golden dataset.'
  - q: '¿Qué pasa cuando el proveedor saca un modelo nuevo?'
    a: 'La versión del modelo está fijada, así que una versión nueva no llega sola a producción. Antes de cambiar, el modelo nuevo pasa el mismo golden dataset y comparamos las dos versiones caso a caso. Si acierta menos, no se cambia, aunque sea más barato.'
  - q: '¿Cómo se evita que un cambio rompa lo que ya funcionaba?'
    a: 'Ningún cambio llega a producción si no pasa la batería de pruebas. En nuestro asistente de citas son ya casi 5.000 pruebas automáticas. Antes de aplicar el cambio se hace una copia de la base de datos y, si después el servicio no responde, el sistema vuelve automáticamente a la versión anterior.'
  - q: '¿Cuánto cuesta el mantenimiento y hay permanencia?'
    a:
      - 'Va en una cuota mensual que paga la vigilancia y el mantenimiento, sin permanencia. Los precios están en nuestra guía de cuánto cuesta un agente de IA.'
      - 'Si dejas la cuota, el chatbot no se apaga. El código y la infraestructura están a tu nombre desde el primer día.'
---

**Después de entregar un chatbot de IA empieza su mantenimiento: lo vigilamos con trazas y alarmas, lo medimos cada semana con un golden dataset de conversaciones reales y lo ajustamos con las preguntas que no supo contestar.** Hace falta porque cambian las preguntas de tus clientes, cambian tus reglas y el proveedor del modelo saca versiones nuevas.

La duda de quien lo contrata casi siempre es la misma: ¿y si se equivoca delante de mis clientes? Es razonable. Un modelo de lenguaje puede fallar, y nadie serio debería prometerte lo contrario. Aquí te contamos qué hacemos para verlo a tiempo y qué recibe tu empresa.

## Cómo evaluamos un chatbot: el golden dataset (batería de pruebas)

Para saber si un chatbot sigue funcionando bien hace falta una referencia. **Esa referencia es un golden dataset (batería de pruebas): conversaciones reales de tu negocio, cada una con la respuesta correcta anotada y revisada por una persona.** Lo ideal es que esa persona sea alguien de tu equipo que conozca el negocio.

Los casos que valen salen de conversaciones reales. Lo aprendimos con nuestro propio producto, un asistente de citas para clínicas. Los primeros casos de prueba los escribimos a mano y no sirvieron, porque nunca llegaron a validarse contra el sistema real.

También hace falta un listón claro. En ese asistente, el chatbot tiene que entender bien qué pide el paciente en al menos el 85 % del total de casos y en el 70 % de cada tipo de petición.

## Cómo vemos lo que hace el chatbot cada día

**Cada vez que el chatbot trabaja queda una traza en Arize Phoenix: qué le llegó, qué hizo paso a paso, cuánto costó, cuánto tardó y qué modelo respondió de verdad.** Phoenix es una herramienta de la empresa Arize para ver por dentro lo que hace un agente de IA. La usamos en los chatbots y agentes que mantenemos, también en nuestro asistente de citas.

Las trazas no salen a la nube de un tercero. En los proyectos a medida, Phoenix va instalado en tu propio servidor, como contamos en la [guía de IA y RGPD](/ia-y-rgpd).

Con las trazas se ve qué cuesta el chatbot y si algo se está ralentizando. También se ve si el proveedor ha contestado con un modelo de respaldo sin avisar. En el asistente de citas, un control revisa este punto y no ha encontrado ningún modelo de respaldo en 29.041 llamadas.

## Pruebas antes de cada cambio y revisión semanal

**El chatbot vuelve a pasar sus pruebas en dos momentos: antes de cada cambio y una vez por semana.** Cada cambio es un riesgo, aunque parezca pequeño.

En el asistente de citas, ningún cambio llega a producción si no pasa las pruebas automáticas, que ya son casi 5.000. Antes de aplicar el cambio se hace una copia de la base de datos y, si después el servicio no responde, el sistema vuelve automáticamente a la versión anterior.

<div data-pizarra="cambioSeguro"></div>

Además, una vez por semana el golden dataset se ejecuta contra el modelo real. Esas pruebas cuestan dinero en cada pasada, así que no corren a todas horas. Corren cada semana y cada vez que cambia algo importante, y sus resultados quedan en Phoenix para comparar una semana con otra.

## Qué hacemos con las preguntas que no sabe contestar

**Las preguntas que el chatbot no supo contestar son la mejor lista de tareas que hay.** Las revisamos contigo y decidimos qué hace falta en cada caso: añadir un término al glosario, cambiar las instrucciones del modelo (el prompt) o cambiar el diseño del chatbot. Cuando queda resuelta, la pregunta entra en el golden dataset y se comprueba cada semana.

<div data-pizarra="cicloDespues"></div>

Lo mismo pasa con los errores. Si alguien pedía cita «el 11 de enero» en pleno junio, el asistente lo entendía como un enero ya pasado. Desde que lo detectamos, el año lo calcula el código y no el modelo, y ese caso se vuelve a comprobar en cada cambio.

Y las personas tienen la última palabra. Las clínicas pueden marcar una conversación como problemática, y esos reportes los revisamos uno a uno. Es una señal que ninguna prueba automática puede sustituir.

## Alarmas para los fallos que nadie ve

**También vigilamos que las alarmas funcionen, porque un fallo sin aviso puede pasar días sin que nadie lo vea.** En el asistente de citas hay un centenar de comprobaciones dentro del propio código que avisan en cuanto algo se sale de lo esperado. Una de ellas nos avisó de que las citas creadas a mano desde el panel no actualizaban la ficha del cliente, y dejamos una prueba que lo cubre.

Las alarmas también fallan. Una vez, una alarma que saltaba demasiadas veces agotó la cuota del servicio de avisos, y 13 recordatorios de citas se perdieron sin ningún aviso. Nos lo dijo la clínica. Desde entonces cada alarma tiene un tope diario, y una prueba comprueba que ese tope se respeta.

## Cuando sale un modelo nuevo: ¿cambiar o no?

**Un modelo nuevo o más barato no entra porque sí. Primero pasa el mismo golden dataset, y en Phoenix comparamos las dos versiones caso a caso.** Si el nuevo acierta menos, no se cambia, aunque sea más barato.

La versión del modelo, además, está fijada. Actualizarla es una decisión nuestra y pasa las pruebas como cualquier otro cambio, así que una versión nueva del proveedor no llega sola a producción.

## Qué recibe tu empresa cada semana

**Todo lo que vemos nosotros lo ves tú también.** Te entregamos:

- **El panel de Phoenix**, con las trazas, el gasto y la comparación entre versiones.
- **Los resultados de cada ejecución semanal** del golden dataset.
- **Las preguntas que el chatbot no supo contestar**, para decidir juntos qué ajustar.
- **Un informe semanal que lo resume**, si lo necesitas.

En los proyectos a medida, el código y la infraestructura quedan a tu nombre desde el primer día. El mantenimiento va en una cuota mensual sin permanencia, y los precios están en la guía [cuánto cuesta un agente de IA](/cuanto-cuesta-un-agente-de-ia).

No vas a tener un chatbot que nunca se equivoque, porque eso no existe. **Vas a tener uno que se mide cada semana, que se prueba antes de cada cambio y que mejora con lo que no supo responder.**

