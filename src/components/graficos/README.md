# Componentes de gráficos — Astro

Copia la carpeta a `src/components/graficos/`. Sin dependencias, sin imágenes: el degradado y el grano son CSS + SVG inline.

## Componentes

**`GrainFrame.astro`** — el contenedor base: fondo degradado, capa de grano, marco fino con puntos en las esquinas, y `<slot />` para el contenido.

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
| `dots` | `true` | puntos en las esquinas |
| `gradient` | `azul` | `azul` · `noche` · `teal` |
| `label` / `title` | — | cabecera opcional |

**`DiagramCanvas.astro`** — lienzo de coordenadas fijas (`width × height`) que se escala con `ResizeObserver` para no recortarse nunca en móvil. Dibujas en píxeles absolutos; el componente hace el resto.

**`DiagramNode.astro`** — nodo posicionado (`x`, `y`, `w`, `h`) en tres formas: `caja`, `rombo`, `cilindro`.

**`EdgeLabel.astro`** — etiqueta monoespaciada para las flechas.

Las flechas son `<path slot="edges">` dentro de `DiagramCanvas`; usa `marker-end="url(#dg-arrow)"` para la punta. El trazo y el grosor ya vienen aplicados.

**`EjemploFlujo.astro`** — el flowchart de validación completo, listo para copiar como plantilla.

## Tipografía

Sin configuración adicional: los componentes leen los tokens que ya tienes en `global.css` — `--font-sans`, `--font-mono`, `--radius-card` y `--color-glow` — con Space Grotesk como reserva. El degradado `azul` parte de tu acento `#002dfd`.

## Nota

`DiagramCanvas` define el marcador de flecha con un `id` fijo (`dg-arrow`). Si hay varios lienzos en la misma página, el navegador resuelve al primero — al ser idénticos, el resultado es el mismo.
