/**
 * Prepara la revisión en frío de una página y la deja en un fichero suelto,
 * listo para arrastrar a una conversación nueva de claude.ai.
 *
 *   npm run frio -- servicios/agentes-conversacionales
 *   npm run frio -- en/services/conversational-ai
 *   npm run frio -- .                       (la home)
 *
 * Escribe en `revisiones/`, que no se versiona: son ficheros de usar y tirar,
 * regenerables con un comando. El fichero lleva el prompt dentro, así que se
 * adjunta y ya está, sin tener que escribir nada más.
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
 * fichero preparado y ahí acaba su trabajo. Se automatiza la preparación, no
 * el juicio.
 *
 * Requiere haber compilado antes (`npx astro build`), porque lee de `dist/`:
 * lo que se revisa es lo que se publica.
 */
import { execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const ruta = process.argv[2];
if (!ruta) {
  console.error('Uso: npm run frio -- <ruta>   (p. ej. servicios/agentes-conversacionales)');
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

const limpia = ruta.replace(/^\/+|\/+$/g, '') || 'home';
const nombre = `${limpia.replace(/\//g, '-')}.md`;
const destino = resolve('revisiones', nombre);

mkdirSync(resolve('revisiones'), { recursive: true });
writeFileSync(destino, `${PROMPT}\n\n${texto.trim()}\n`, 'utf8');

const palabras = texto.trim().split(/\s+/).length;
console.log(`\nListo. Arrastra este fichero a una conversacion NUEVA de claude.ai:\n`);
console.log(`   ${destino}\n`);
console.log(`   ${palabras} palabras. El prompt ya va dentro, no hace falta escribir nada mas.\n`);
