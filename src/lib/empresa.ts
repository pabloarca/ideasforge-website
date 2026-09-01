/*
  Datos del responsable del tratamiento, en un solo sitio.

  Van aquí y no escritos dentro de cada política porque aparecen en cuatro
  páginas (privacidad y cookies, en dos idiomas) y un NIF copiado cuatro veces
  se corrige tres. Es el mismo criterio que las medidas de imagen: derivar
  antes que duplicar.

  **Los campos vacíos rompen el build a propósito.** `check:seo` comprueba que
  ninguno lo esté, así que la web no puede publicarse con un «pendiente» en su
  política de privacidad. Un documento legal con un hueco es peor que uno
  incompleto: parece completo.

  Lo que falta lo tiene que dar el propietario. Nada de esto se puede deducir
  ni aproximar: un NIF o un domicilio inventados dejarían la política sin
  valor, porque nadie podría ejercer sus derechos contra una identidad falsa.
*/

export interface Empresa {
  /** Nombre comercial, el que ve el visitante. */
  marca: string;
  /** Razón social completa, con su forma jurídica si la tiene. */
  razonSocial: string;
  /**
   * NIF o CIF. Opcional en el código porque el propietario decidió el 1 sep
   * 2026 no publicarlo.
   *
   * Que conste el matiz para quien lo revise: el RGPD se conforma con
   * identidad y datos de contacto, que aquí están, pero el artículo 10 de la
   * LSSI sí pide el NIF a quien presta servicios por medios electrónicos. Es
   * decisión suya y queda anotada, no es un descuido.
   */
  nif?: string;
  /** Domicilio completo: vía, número, código postal y localidad. */
  domicilio: string;
  /** Correo al que se dirigen las solicitudes de derechos. */
  correo: string;
  /**
   * Quién firma lo que se publica. Un artículo firmado por una organización
   * no tiene autor a ojos de un buscador, y la experiencia de quien escribe es
   * parte de lo que se evalúa. Con nombre, los veinte posts dejan de ser
   * anónimos.
   */
  autor: string;
  /**
   * Perfiles oficiales. Alimentan `sameAs` del dato estructurado, que es como
   * un buscador ata la web a una entidad conocida, y el icono del pie. Hasta
   * el 1 sep 2026 el pie apuntaba a linkedin.com a secas, que no decía nada.
   */
  perfiles: string[];
}

export const EMPRESA: Empresa = {
  marca: 'Ideasforge',
  razonSocial: 'Ideasforge',
  domicilio: 'Calle Camino Viejo de Vélez 18, 1.º P, 29730 Torre de Benagalbón, Málaga',
  correo: 'pablo@ideasforge.io',
  autor: 'Pablo Arca',
  perfiles: ['https://www.linkedin.com/company/105676583'],
};

/** Los campos que no pueden quedar vacíos si la web se publica. */
/* El NIF queda fuera de la lista por la decisión de arriba. Los otros tres no
   son negociables: sin ellos nadie puede ejercer sus derechos. */
export const OBLIGATORIOS: (keyof Empresa)[] = ['razonSocial', 'domicilio', 'correo'];

/** True cuando el bloque del responsable se puede pintar entero. */
export const empresaCompleta = OBLIGATORIOS.every((k) => {
  const v = EMPRESA[k];
  return typeof v === 'string' && v.trim().length > 0;
});
