# Gráfico pizarra

Gráficos que parecen hechos en una pizarra blanca magnética: alguien
explicando en la pared con fichas de papel sujetas con imanes y un rotulador.
Nacen el 2 oct 2026 para acompañar texto largo con algo más cercano que los
diagramas técnicos de `../graficos/`. Conviven con ellos: aquellos son plano de
ingeniero, estos son pizarra.

## Piezas

| Archivo | Qué es |
| --- | --- |
| `Pizarra.astro` | El tablero: blanco, marco de aluminio y bandeja de rotuladores. Recibe dos SVG en los slots `ancho` (escritorio) y `estrecho` (móvil, por debajo de `lg`) |
| `PizarraDefs.astro` | Sombra de papel y brillo de los imanes. Va dentro de cada SVG con un prefijo propio (`pre`) |
| `Ficha.astro` | Una ficha de papel con imán: icono, título y una línea pequeña opcional. Vertical (icono arriba) u horizontal (icono a la izquierda, para listas y móvil). Puede ir algo torcida. El imán va arriba en el centro; `imanX` lo mueve a lo ancho |
| `Nota.astro` | Texto escrito a rotulador sobre la pizarra, sin ficha: rótulos de fila y conclusiones. Admite varias líneas |
| `Circulo.astro` | Un círculo a rotulador con velo de color, para conjuntos que se cruzan |
| `PizarraPorNombre.astro` | Elige el gráfico por su nombre; es lo que llama `LongFormPage` |
| `Trazo.astro` | Una flecha de rotulador, curva, con punta de dos trazos y etiqueta opcional |
| `iconos.ts` | Iconos de Material Symbols en SVG |
| `colores.ts` | Tinta, gris, azul y rojo |
| `Pizarra*.astro` | Un gráfico cada uno. Los ocho primeros, en la página de automatización de procesos: Frontera, Facturas, Validacion, Cifras, Circuito, Sistemas, Montaje y Condiciones. Facturas sustituyó el 2 oct 2026 al último diagrama técnico de esa página. Los cuatro siguientes, en la de agentes conversacionales: Guion, Dependencias, Respuestas y Contadores |

## Reglas

1. **Dos dibujos por gráfico, siempre.** Uno apaisado de unos 800 de ancho para
   escritorio y uno vertical de 360 para el móvil. Un SVG apaisado en un
   teléfono se encoge hasta no leerse.
2. **El azul es del modelo.** Como en el resto de la casa: tinta para lo que
   hace el código o la persona, azul `#002dfd` para lo que hace el modelo.
   **El rojo, solo para el fallo**, y en una ficha o una flecha por gráfico.
3. **Letra Inter**, servida desde el propio sitio. Títulos de ficha a 16-22 en
   escritorio y 14-18 en móvil. Las líneas pequeñas y los rótulos grises, a 13-15
   en escritorio y nunca por debajo de 12,5 en el móvil, que en pantalla queda
   en unos 11,5 px.
4. **Fichas torcidas, pero poco**: entre -3° y 3°. Más parece descuido.
5. **Imanes de colores para dar vida**, sin significado. El azul se reserva para
   la ficha del modelo.
6. **Iconos de Material Symbols en línea, nunca la fuente de Google.** Cargarla
   desde Google Fonts mandaría la IP de cada visita a Google. Para añadir uno,
   ver la cabecera de `iconos.ts`.
7. **Que el imán no tape nada.** Va en el borde de arriba de la ficha. En una
   cadena vertical del móvil, donde la flecha entra por el centro, y en las
   fichas bajas de una sola línea, donde taparía el texto, se pasa a la derecha
   con `imanX={0.86}`.
8. **Prefijo distinto en cada SVG** (`pre="pza"` en el ancho, `pre="pze"` en el
   estrecho). Con el mismo `id` el navegador usa el de la versión oculta y
   fichas e imanes desaparecen.
9. **El texto va en `ui.ts`**, en un bloque por gráfico y por idioma, con un
   `label` que describe el dibujo para lectores de pantalla.

## Cómo se coloca en una página

En la sección de `ui.ts`, `pizarra: { grafico: 'frontera', tras: 1 }` lo pinta
justo debajo del párrafo número `tras` (contando desde 0). Un gráfico nuevo
son tres cosas: su bloque de textos en `content[lang].pizarras` (con su tipo en
`PizarrasContent`), su componente `Pizarra<Nombre>.astro` y su entrada en
`PizarraPorNombre.astro`.

## Cómo revisarlo

En escritorio y a 390 px. El marco de prueba (una página dentro de un
<iframe> de 390 px) se pierde cada vez que el servidor recarga, así que
conviene terminar los cambios antes de revisar el móvil.

Los textos que se salen de su ficha no siempre se ven en una captura. Se miden
mejor desde la consola, con `getBBox()` de cada `<text>` contra el ancho del
`<rect>` de su ficha, en las cuatro variantes: escritorio y móvil, español e
inglés. El inglés suele ser el más largo.
