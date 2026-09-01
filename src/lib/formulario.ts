/**
 * Clave de acceso de Web3Forms, compartida por los dos formularios del sitio.
 *
 * Es pública por diseño: viaja dentro del HTML porque el navegador tiene que
 * mandarla al enviar, y cualquiera que mire el código fuente de la página la
 * ve. Aun así vive en una variable de entorno y no escrita aquí, por dos
 * razones. El repositorio es público, así que una clave puesta en el código
 * queda en el historial de git para siempre; y rotarla, el día que alguien
 * abuse del formulario, pasa a ser cambiar un valor en el panel de despliegue
 * en vez de hacer un commit.
 *
 * Dónde se define:
 *   - en local, en `.env` (ya ignorado por git), copiando `.env.example`
 *   - en producción, en las variables de entorno del proyecto de Cloudflare Pages
 *
 * Si falta, los formularios se compilan sin clave y Web3Forms rechaza el envío,
 * así que el aviso de abajo sale en cada compilación hasta que se configure.
 * Es deliberado: un formulario que no envía nada tiene que doler en el build y
 * no descubrirse por un cliente que escribió y nunca recibió respuesta.
 */
export const CLAVE_WEB3FORMS = import.meta.env.PUBLIC_WEB3FORMS_KEY ?? '';

if (!CLAVE_WEB3FORMS) {
  console.warn(
    '\n  ⚠  PUBLIC_WEB3FORMS_KEY sin definir: los formularios NO envían nada.' +
      '\n     Pide la clave gratis en https://web3forms.com y ponla en .env' +
      '\n     (hay una plantilla en .env.example).\n'
  );
}

/**
 * Adónde aterriza quien envía un formulario, por idioma.
 *
 * Sin esto, Web3Forms enseña su propia página de confirmación, que es de ellos
 * y saca al visitante del sitio justo en el momento en que más confía. El campo
 * oculto `redirect` del formulario lo evita, y pide una URL absoluta.
 *
 * **Sigue siendo un mapa parcial a propósito**, aunque hoy estén los dos: un
 * `redirect` a una ruta que no está compilada manda al visitante a un 404, que
 * es peor que la página de Web3Forms. Un idioma nuevo entra aquí el día que su
 * acuse existe, no antes.
 */
export const RUTA_GRACIAS: Partial<Record<'es' | 'en', string>> = {
  es: '/gracias',
  en: '/en/thank-you',
};
