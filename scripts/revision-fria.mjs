/**
 * Prepara la revisión en frío de una página, lista para pegar.
 *
 *   npm run frio -- agentes-de-ia
 *   npm run frio -- en/ai-agents
 *   npm run frio -- agentes-de-ia | clip     (Windows: al portapapeles)
 *
 * QUÉ ES ESTO Y POR QUÉ NO LO HACE UNA MÁQUINA SOLA
 *
 * La revisión más útil que ha recibido este sitio la hizo un Claude sin
 * contexto: sin CLAUDE.md, sin la base editorial, sin saber qué vendemos ni
 * qué decisiones hay cerradas. Encontró incoherencias que quien conoce las
 * reglas ya no ve, porque las justifica.
 *
 * El 25 ago 2026 se comprobó si un subagente podía hacer ese papel dentro de
 * Claude Code. NO puede: hereda el CLAUDE.md entero del proyecto, la memoria
 * persistente del propietario, el catálogo de skills y hasta las rutas de
 * otros proyectos abiertos. Es aislamiento de mensajes, no de contexto.
 *
 * Así que el lector frío sigue siendo humano en el bucle: este script deja el
 * bloque listo para pegar en una conversación nueva y limpia, y ahí es donde
 * vive el valor. Lo que se automatiza es la preparación, no el juicio.
 *
 * Requiere haber compilado antes (`npx astro build`), porque lee de `dist/`:
 * lo que se revisa es lo que se publica.
 */
import { execFileSync } from 'node:child_process';

const ruta = process.argv[2];
if (!ruta) {
  console.error('Uso: npm run frio -- <ruta>   (p. ej. agentes-de-ia, en/ai-agents)');
  process.exit(1);
}

/* El prompt es literal y no se toca sin motivo. Su fuerza está en lo que NO
   pide: no pide versiones alternativas, no pide que se ajuste a un estilo y
   no da contexto que el revisor pueda usar para justificar lo que lee. */
const PROMPT = `Ahora analiza la página entera. Dame correcciones o apuntes bloque por bloque, no me des varias versiones, solo anotaciones de cosas que no te cuadran, que tienen poca coherencia o que no son veraces. Justifica esas anotaciones y lo que harías en su lugar:`;

let texto;
try {
  texto = execFileSync(process.execPath, ['scripts/pagina-a-texto.mjs', ruta], {
    encoding: 'utf8',
  });
} catch {
  process.exit(1);
}

console.log(PROMPT);
console.log();
console.log(texto.trim());
