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
| `PizarraPorNombre.astro` | Elige el gráfico por su nombre; es lo que llaman `LongFormPage` y `CuerpoDePost` |
| `CuerpoDePost.astro` | Pinta el HTML de un post y cambia cada marcador `<div data-pizarra="nombre"></div>` por su gráfico |
| `Trazo.astro` | Una flecha de rotulador, curva, con punta de dos trazos y etiqueta opcional |
| `iconos.ts` | Iconos de Material Symbols en SVG |
| `colores.ts` | Tinta, gris, azul y rojo. Cada uno con su papel de ficha (`tono`) |
| `Pizarra*.astro` | Un gráfico cada uno. El inventario por página va en la sección siguiente |

## Dónde está cada uno

Servicios:

- **Automatización de procesos:** Frontera, Facturas, Validacion, Cifras, Circuito, Sistemas, Montaje y Condiciones. Facturas sustituyó el 2 oct 2026 al último diagrama técnico de esa página.
- **Agentes conversacionales:** Guion, Dependencias, Respuestas y Contadores.
- **Desarrollo de agentes:** EntradaSucia, Peldanos, CuatroCapas, ContratoCerca y SinSupervision. CuatroCapas sustituyó el 5 oct 2026 a `CapasDiagram` y lee sus textos de `content[lang].capasDiagram`.
- **Conocimiento corporativo:** DiezDocumentos, DosFuentes, Orquestador, DosNoes y MismaPregunta. Nombres de dominio y fuente genéricos a propósito: es la página del caso industrial.

Guías. El 2 oct 2026 sustituyeron a `FormasDiagram` y a `FlowDiagram`:

- **Qué es un agente de IA:** Bucle, EscribeActua, AprendeSolo, Formas, DosRelojes, Metodo, Criba y Capas.
- **Cuánto cuesta:** TresHuchas, Suscripcion, Formula y Reguladores. Suscripcion y Formula solo salen en español, porque la guía inglesa no tiene esas secciones. Sus textos ingleses ya están en `ui.ts`.
- **IA y RGPD:** NosotrosNo, MapaDatos, Sobre, TresPuertas, TresLlaves, AntesDespues y Autoridad.
- **Reglamento europeo de IA:** Piramide, Calendario, DosSillas, PuertasProveedor, AnexoIII, PuertaEstrecha y DeberesIngenieria.

Blog, mismo gráfico en el post español y en su traducción:

- **Agente para inmobiliarias:** Cualifica.
- **Agentes de IA y SQL:** DiezConsultas y Contrato.
- **Antes que el prompt, los datos:** SeisPreguntas e IcebergPrompt.
- **Automatización de facturas:** OcrModelo.
- **El falso éxito:** EscalaDetector y QuienDiceHecho.
- **El juguete brillante:** TresSenales y ArdeHumea.
- **El reglamento también es tuyo:** Aplazamiento.
- **La firma del síntoma:** CausaSintoma.
- **Mantener viva la IA:** IcebergDemo.
- **Medir la IA por las ganancias:** NubeNumero e InformeMit.
- **No me gustan los agentes de IA:** CadenaPasos, TresIngredientes y Escalera.
- **La transición que no existe** (solo español, sin espejo inglés del post): Cajero y TransicionNoExiste.
- **Cuando una herramienta se cae:** Disyuntor, con reactivación manual y sin estado semiabierto, porque así funciona el sistema del que habla el post.

IcebergPrompt e IcebergDemo son dos envoltorios de `PizarraIceberg`, que dibuja y recibe los textos.

## Reglas

1. **Dos dibujos por gráfico, siempre.** Uno apaisado de unos 800 de ancho para
   escritorio y uno vertical de 360 para el móvil. Un SVG apaisado en un
   teléfono se encoge hasta no leerse.
2. **El azul es del modelo.** Como en el resto de la casa: tinta para lo que
   hace el código o la persona, azul `#002dfd` para lo que hace el modelo.
   **El rojo, solo para el fallo**, y en una ficha o una flecha por gráfico.
   **El gris, para lo que queda fuera**: lo comprado, lo que no se usa, lo
   que no decide.
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
10. **Ficha vertical con línea pequeña: alto de al menos 52 más el icono más
    8.** Con menos, el icono pisa el título.
11. **Etiquetas lejos de las líneas.** Una etiqueta junto a una curva o una
    flecha se comprueba en la captura: la medición no ve que la pise.
12. **Sin hueco abajo.** El `viewBox` termina a unos 10 por debajo de lo
    último que se dibuja. El hueco sobrante se nota mucho en el móvil.

## Cómo se coloca en una página

En la sección de `ui.ts`, `pizarra: { grafico: 'frontera', tras: 1 }` lo pinta
justo debajo del párrafo número `tras` (contando desde 0). Un gráfico nuevo
son tres cosas: su bloque de textos en `content[lang].pizarras` (con su tipo en
`PizarrasContent`), su componente `Pizarra<Nombre>.astro` y su entrada en
`PizarraPorNombre.astro`.

## Cómo se coloca en un post

En el `.md`, una línea sola con el marcador, entre dos párrafos:

```html
<div data-pizarra="escalera"></div>
```

`CuerpoDePost` parte el HTML del post por los marcadores y pinta cada gráfico
fuera de la tipografía del artículo (`not-prose`). Un nombre que no existe en
`content[lang].pizarras` rompe la compilación a propósito. El marcador no
llega a `llms-full.txt` ni al HTML final.

## Cómo revisarlo

En escritorio y a 390 px. El marco de prueba (una página dentro de un
<iframe> de 390 px) se pierde cada vez que el servidor recarga, así que
conviene terminar los cambios antes de revisar el móvil.

Los textos que se salen de su ficha no siempre se ven en una captura. Se miden
mejor desde la consola, con `getBBox()` de cada `<text>` contra el ancho del
`<rect>` de su ficha, en las cuatro variantes: escritorio y móvil, español e
inglés. El inglés suele ser el más largo.

La medición no lo ve todo. Una `<Nota>` que se sale del `viewBox` (no de una
ficha) y una etiqueta encima de una curva solo se ven en la captura. Por eso
cada gráfico se mira además dibujado suelto, con sus dos versiones juntas.

Un trazo con arcos se escribe `M x,y A … A …`, sin repetir el punto de llegada
antes de cada `A`. Repetido, el navegador deja de leer el trazo tras el primer
arco y la figura desaparece sin dar error. Le pasó a la nube de NubeNumero.
