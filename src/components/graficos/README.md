# Componentes de gráficos — Astro

Copia la carpeta a `src/components/graficos/`. Sin dependencias, sin imágenes: el degradado y el grano son CSS + SVG inline.

## Componentes

**`GrainFrame.astro`** — el contenedor base: fondo degradado, capa de grano, marco fino con puntos en las esquinas, y `<slot />` para el contenido. El `title` va dentro, arriba a la izquierda; el `label` va **fuera del marco, abajo a la derecha**, como el pie de plancha de un libro.

```astro
<GrainFrame height="420px" label="FIG. 03" title="Arquitectura">
  <p>cualquier contenido, siempre en blanco</p>
</GrainFrame>
```

| prop | por defecto | notas |
| --- | --- | --- |
| `height` | `560px` | cualquier longitud CSS |
| `radius` | `var(--radius-card)` | 15px de tu kit |
| `grain` | `0.16` | 0–0.35 |
| `inset` | `16px` | margen del marco respecto al fondo |
| `pad` | `36px` | aire entre la línea del marco y el contenido. El diagrama nunca toca la línea |
| `grid` | `true` | cuadrícula tenue dentro del marco, detrás del contenido |
| `gridSeed` | `7` | cambia el sorteo de la cuadrícula sin dejar de ser reproducible |
| `dots` | `true` | puntos en las esquinas |
| `fondo` | `azul` | familia del catálogo, ver abajo |
| `background` | — | valor de `background` libre, tiene prioridad sobre `fondo` |
| `tinta` | la de la familia | `clara` · `oscura`, solo hace falta junto a `background` |
| `title` | — | título dentro del marco, arriba a la izquierda |
| `label` | — | numeración fuera del marco, abajo a la derecha |

**`GridBackdrop.astro`** — la cuadrícula del fondo, generada en el build. Cada
celda recibe una intensidad distinta y cada vértice puede llevar punto o no,
pero el azar va **con semilla**: la misma `seed` da siempre el mismo dibujo, así
que dos compilaciones seguidas no producen diferencias. No hay imágenes ni
JavaScript. Las líneas van en un `<pattern>` y solo se emiten las celdas y los
puntos que se ven, de modo que el SVG entero pesa ~1,4 KB comprimido.

`GrainFrame` ya lo incluye con `grid` (activado por defecto), así que rara vez
hace falta usarlo suelto. Props: `cell`, `width`, `height`, `seed`,
`fillChance`, `fillMin`, `fillMax`, `dotChance`, `dotOpacity`, `lineOpacity`.

**`DiagramCanvas.astro`** — lienzo de coordenadas fijas (`width × height`) que se escala con `ResizeObserver` para no recortarse nunca en móvil. Dibujas en píxeles absolutos; el componente hace el resto.

**`DiagramNode.astro`** — nodo posicionado (`x`, `y`, `w`, `h`) en tres formas: `caja`, `rombo`, `cilindro`.

**`EdgeLabel.astro`** — etiqueta monoespaciada para las flechas.

Las flechas son `<path slot="edges">` dentro de `DiagramCanvas`; usa `marker-end="url(#dg-arrow)"` para la punta. El trazo y el grosor ya vienen aplicados.

**`EjemploFlujo.astro`** — el flowchart de validación completo, listo para copiar como plantilla.

## Fondos

Cada familia declara **fondo y tinta**. La tinta es el color con el que se
dibuja todo lo que va encima (marco, rótulos, cuadrícula, nodos del diagrama),
y por eso hay familias claras sin que el gráfico se quede en blanco sobre
blanco.

| Familia | Tinta | Para qué |
| --- | --- | --- |
| `azul` | clara | El de siempre, el acento de marca |
| `noche` | clara | Azul apagado, cuando el azul compite con algo |
| `teal` | clara | Fuera de la familia azul |
| `prisma` | clara | Diamante, reflejo cian |
| `iris` | clara | Diamante, reflejo magenta |
| `espectro` | clara | Diamante, reflejo cálido |
| `hielo` | oscura | Claro con un velo azul |
| `papel` | oscura | Claro cálido, sin azul |
| `lienzo` | oscura | Gris plano del sitio, sin degradado |

```astro
<GrainFrame fondo="hielo" label="FIG. 02" title="Arquitectura">…</GrainFrame>
```

Para algo que no está en el catálogo, `background` acepta cualquier valor y
`tinta` dice con qué color dibujar encima:

```astro
<GrainFrame background="#1b0033" tinta="clara">…</GrainFrame>
```

Añadir una familia es **una sola edición** en `gradients.ts`: el tipo sale del
propio objeto, así que el componente la acepta sin tocar nada más.

## Tipografía

Sin configuración adicional: los componentes leen los tokens que ya tienes en `global.css` — `--font-sans`, `--font-mono`, `--radius-card` y `--color-glow` — con Space Grotesk como reserva. El degradado `azul` parte de tu acento `#002dfd`.

## Contenedores ocultos

`DiagramCanvas` se mide a sí mismo para escalarse. Dentro de algo oculto (un
`<dialog>` cerrado, una pestaña) el ancho es 0, así que no toca nada y espera al
`ResizeObserver`. Si necesitas forzar el reajuste al mostrarlo:

```js
document.dispatchEvent(new Event('dg:refit'));
```

## Nota

`DiagramCanvas` define el marcador de flecha con un `id` fijo (`dg-arrow`). Si hay varios lienzos en la misma página, el navegador resuelve al primero — al ser idénticos, el resultado es el mismo.
