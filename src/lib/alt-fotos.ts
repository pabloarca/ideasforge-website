import type { Lang } from '../i18n/ui';

/*
  Texto alternativo de cada fotografía de contenido, por su ruta (19 oct
  2026). Hasta ese día todas iban con `alt=""`, como decorativas: Google
  Imágenes no tenía qué leer y un lector de pantalla se las saltaba.

  Vive aquí y no en `ui.ts` ni en el frontmatter porque la misma foto sale en
  varios sitios (la portada de un post, su ficha en el blog, la tarjeta de
  recursos de la portada) y su descripción no cambia con el sitio. Describe
  lo que se ve, sin interpretarlo: la idea que ilustra ya la dice el texto
  de al lado.

  Las fotos que el diseño marca con `aria-hidden` (la banda de los sectores,
  el selector de sectores de la portada) siguen sin texto, a propósito.
  Una ruta que no esté aquí devuelve cadena vacía, que es lo de antes.
*/
const ALT: Record<string, Record<Lang, string>> = {
  '/home/seguridad.jpg': {
    es: 'Vestíbulo blanco con columnas y tornos de cristal; una persona cruza uno de los tornos',
    en: 'White lobby with columns and glass security gates; one person walks through a gate',
  },
  '/home/nosotros.jpg': {
    es: 'Escalera de caracol blanca vista desde abajo, hacia un lucernario',
    en: 'White spiral staircase seen from below, rising toward a skylight',
  },
  '/case-studies/industrial.jpg': {
    es: 'Un técnico con tableta en una nave industrial blanca y vacía',
    en: 'A technician holding a tablet in an empty white industrial hall',
  },
  '/case-studies/harvest.jpg': {
    es: 'Una persona consulta el móvil en medio de un gran invernadero',
    en: 'A person checks a phone in the middle of a large greenhouse',
  },
  '/case-studies/stanton.jpg': {
    es: 'Facturas impresas sobre una mesa blanca, junto a un portátil y un café',
    en: 'Printed invoices on a white desk next to a laptop and a coffee',
  },
  '/case-studies/barceloneta.jpg': {
    es: 'Piso vacío y luminoso con cortinas blancas y un móvil en el alféizar',
    en: 'Bright empty flat with white curtains and a phone on the windowsill',
  },
  '/case-studies/dentist.jpg': {
    es: 'Mostrador de recepción de una clínica con un móvil encima',
    en: 'Clinic reception counter with a phone resting on it',
  },
  '/guias/agentes.jpg': {
    es: 'Una mano señala una cortina de hilos de luz en una sala blanca',
    en: 'A hand points at a curtain of light threads in a white room',
  },
  '/guias/coste.jpg': {
    es: 'Tres sobres blancos separados sobre una mesa, vistos desde arriba',
    en: 'Three separate white envelopes on a desk, seen from above',
  },
  '/guias/que-automatizar-pizarra.jpg': {
    es: 'Una mujer, de espaldas, señala una de las hojas en blanco clavadas en la pared de una oficina',
    en: 'A woman, seen from behind, points at one of the blank sheets pinned to an office wall',
  },
  '/guias/rgpd.jpg': {
    es: 'Sala de reuniones con cristal esmerilado; dentro se adivinan cuatro personas',
    en: 'Meeting room behind frosted glass, with four people barely visible inside',
  },
  '/guias/reglamento.jpg': {
    es: 'Edificio institucional blanco con una columnata larga y personas caminando',
    en: 'White institutional building with a long colonnade and people walking',
  },
  '/blog/blog-inmobiliaria.jpg': {
    es: 'Escalera de un edificio de viviendas; al fondo, una persona en la puerta de un piso vacío',
    en: 'Stairwell of an apartment building; in the background, a person at the door of an empty flat',
  },
  '/blog/blog-sql.jpg': {
    es: 'Archivo con estanterías blancas llenas de cajas iguales y una persona al fondo del pasillo',
    en: 'Archive with white shelving full of identical boxes and a person at the end of the aisle',
  },
  '/blog/blog-datos.jpg': {
    es: 'Dos mesas largas: en una, papeles revueltos; en la otra, los mismos ordenados en montones',
    en: 'Two long tables: one with scattered papers, the other with the same papers sorted into stacks',
  },
  '/blog/blog-facturas.jpg': {
    es: 'Pasillo de oficina con una pared de casilleros de correo y una persona que se aleja',
    en: 'Office corridor with a wall of mail pigeonholes and a person walking away',
  },
  '/blog/blog-herramienta-cae.jpg': {
    es: 'Una persona cruza una plaza bajo la lluvia con un paraguas claro',
    en: 'A person crosses a square in the rain under a pale umbrella',
  },
  '/blog/blog-mantenimiento.jpg': {
    es: 'Un jardinero poda un seto en un jardín cuidado junto a un edificio blanco',
    en: 'A gardener trims a hedge in a well-kept garden next to a white building',
  },
  '/blog/blog-juguete.jpg': {
    es: 'Dos personas miran desde la acera un aparato reluciente expuesto en un escaparate',
    en: 'Two people on the pavement look at a shiny gadget displayed in a shop window',
  },
  '/blog/blog-reglamento.jpg': {
    es: 'Interior de un edificio institucional con balcones curvos y un lucernario',
    en: 'Interior of an institutional building with curved balconies and a skylight',
  },
  '/blog/blog-firma-sintoma.jpg': {
    es: 'Un rastro de huellas en la nieve y una persona agachada que lo examina',
    en: 'A trail of footprints in the snow and a person crouching to examine it',
  },
  '/blog/blog-mantener-viva.jpg': {
    es: 'Alguien riega una planta pequeña en un escritorio, junto a un portátil',
    en: 'Someone waters a small plant on a desk next to a laptop',
  },
  '/blog/blog-ganancias.jpg': {
    es: 'Un hombre de espaldas mira la ciudad desde la ventana de una oficina alta',
    en: 'A man seen from behind looks over the city from a high office window',
  },
  '/blog/blog-agentes-tren.jpg': {
    es: 'Vía de tren que se divide en dos, vista desde arriba entre la niebla',
    en: 'Railway track splitting in two, seen from above through mist',
  },
  '/blog/blog-falso-exito.jpg': {
    es: 'Un hombre mira con duda una pared de pantallas en una sala de operaciones',
    en: 'A man looks doubtfully at a wall of screens in an operations room',
  },
};

export function altFoto(ruta: string | undefined, lang: Lang): string {
  return (ruta && ALT[ruta]?.[lang]) || '';
}
