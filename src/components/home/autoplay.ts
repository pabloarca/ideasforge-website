/*
  El patrón de carrusel de la portada, compartido por Soluciones, Casos,
  Sectores y Recursos. Lo describe el handoff del diseño de octubre de 2026:

  - Un `setInterval` por bloque y una bandera de ratón que lo PAUSA sin
    reiniciarlo. Mientras el puntero está dentro no se avanza; al salir, el
    siguiente tic del mismo temporizador vuelve a avanzar.
  - Con `prefers-reduced-motion` no hay avance automático: el bloque se queda
    donde está y solo se mueve si alguien lo pide.
  - La barra de progreso tiene un segmento por posición. El activo se rellena
    en lo que dura el intervalo, los anteriores quedan llenos y los siguientes
    vacíos. Pulsar un segmento salta a esa posición.

  Quien lo usa pasa `pintar`, que recibe la posición nueva y cambia las clases
  de su propio bloque. Aquí no se toca nada que no sea la barra.
*/

export interface Carrusel {
  ir(i: number): void;
  siguiente(): void;
  anterior(): void;
  actual(): number;
  /** Cambia cuántas posiciones hay, para los bloques que dependen del ancho. */
  redimensionar(total: number): void;
}

interface Opciones {
  /** El bloque cuyo ratón pausa el avance. */
  raiz: HTMLElement;
  total: number;
  /** Milisegundos entre avances. */
  intervalo: number;
  pintar(i: number): void;
  /** Contenedor de los segmentos `.progress`, si el bloque lleva barra. */
  barra?: HTMLElement | null;
}

const sinMovimiento = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function carrusel({ raiz, total, intervalo, pintar, barra }: Opciones): Carrusel {
  let i = 0;
  let n = total;
  let encima = false;

  const segmentos = () =>
    barra ? Array.from(barra.querySelectorAll<HTMLElement>('.progress')) : [];

  function pintarBarra() {
    segmentos().forEach((seg, k) => {
      seg.hidden = k >= n;
      seg.style.setProperty('--interval', `${intervalo}ms`);
      seg.classList.remove('is-active', 'is-done');
      if (k < i) seg.classList.add('is-done');
      if (k === i) {
        if (sinMovimiento()) {
          seg.classList.add('is-done');
        } else {
          // Leer una medida obliga al navegador a aplicar el estado vacío
          // antes de volver a llenarlo: sin esto la transición no rearranca.
          void seg.offsetWidth;
          seg.classList.add('is-active');
        }
      }
      seg.setAttribute('aria-current', k === i ? 'true' : 'false');
    });
  }

  function ir(k: number) {
    i = ((k % n) + n) % n;
    pintar(i);
    pintarBarra();
  }

  raiz.addEventListener('mouseenter', () => {
    encima = true;
  });
  raiz.addEventListener('mouseleave', () => {
    encima = false;
  });

  segmentos().forEach((seg, k) => seg.addEventListener('click', () => ir(k)));

  if (!sinMovimiento()) {
    window.setInterval(() => {
      // Con la pestaña oculta el navegador sigue contando tics, y al volver
      // el carrusel habría saltado varias posiciones sin que nadie las viera.
      if (!encima && !document.hidden) ir(i + 1);
    }, intervalo);
  }

  ir(0);

  return {
    ir,
    siguiente: () => ir(i + 1),
    anterior: () => ir(i - 1),
    actual: () => i,
    redimensionar(nuevo: number) {
      n = Math.max(1, nuevo);
      ir(Math.min(i, n - 1));
    },
  };
}
