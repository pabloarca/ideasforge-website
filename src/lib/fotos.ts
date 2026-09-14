import type { ImageMetadata } from 'astro';

/*
  Resuelve la ruta de una fotografía, tal como se escribe en el contenido, al
  fichero que Astro va a optimizar.

  Por qué existe. Las fotos vivían en `public/`, que Astro copia tal cual y no
  puede tocar: sin `srcset`, sin `sizes`, sin AVIF ni WebP, y servidas a 1280 px
  a un teléfono que las pinta a 340. El 14 sep 2026 se movieron a `src/assets/`
  para que el compilador las procese.

  Lo que este módulo evita es la consecuencia fea de esa mudanza. La ruta de la
  foto se escribe en dos sitios que son CONTENIDO y no código: `ui.ts` para las
  fichas de caso y el frontmatter de cada post para su portada. Obligarles a
  importar el fichero habría metido `import` en el contenido y, en el caso del
  blog, habría cambiado el tipo del campo y tocado dieciséis frontmatters. Aquí
  la cadena sigue siendo una cadena y la traducción ocurre en un solo sitio.

  `eager: true` porque la resolución pasa en tiempo de compilación: no hay nada
  que diferir en una página estática.

  Si una ruta no existe, se rompe el build con el nombre delante. Es a
  propósito: antes una foto mal escrita daba un 404 silencioso que solo se veía
  entrando en la página. Vale más un fallo ruidoso al compilar.
*/
const ficheros = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/**/*.{jpg,jpeg,png,webp,avif}',
  { eager: true }
);

/** Índice por la ruta pública antigua: `/blog/x.jpg` → el fichero de `src/assets/blog/x.jpg`. */
const porRuta = new Map<string, ImageMetadata>();
for (const [camino, modulo] of Object.entries(ficheros)) {
  porRuta.set(camino.replace('../assets', ''), modulo.default);
}

export function foto(ruta: string): ImageMetadata {
  const encontrada = porRuta.get(ruta);
  if (!encontrada) {
    throw new Error(
      `No encuentro la fotografía «${ruta}» en src/assets. ` +
        `Disponibles: ${[...porRuta.keys()].sort().join(', ')}`
    );
  }
  return encontrada;
}
