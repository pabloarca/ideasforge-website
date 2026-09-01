/**
 * Revisión en frío de una página o un post: la juzga un Claude que no sabe
 * nada de este proyecto.
 *
 *   npm run frio -- servicios/agentes-conversacionales     prepara el fichero
 *   npm run frio -- blog/el-falso-exito --auto             además lo revisa
 *   npm run frio -- src/content/blog/es/el-falso-exito.md --auto
 *   npm run frio -- . --auto --modelo sonnet
 *
 * Escribe en `revisiones/`, que no se versiona: ficheros de usar y tirar,
 * regenerables con un comando.
 *
 * QUÉ ES ESTO
 *
 * La revisión más útil que ha recibido este sitio la hizo un Claude sin
 * contexto: sin CLAUDE.md, sin la base editorial, sin saber qué vendemos ni
 * qué decisiones hay cerradas. Encontró incoherencias que quien conoce las
 * reglas ya no ve, porque las justifica.
 *
 * El 25 ago 2026 se comprobó que un subagente NO puede hacer ese papel:
 * hereda el CLAUDE.md entero, la memoria persistente del propietario, el
 * catálogo de skills y hasta las rutas de otros proyectos abiertos. Es
 * aislamiento de mensajes, no de contexto.
 *
 * `--auto` (1 sep 2026) sí lo consigue, lanzando un proceso `claude` aparte
 * con cuatro cierres a la vez: se ejecuta en un directorio temporal vacío
 * (no encuentra CLAUDE.md), sin herramientas (no puede leer el disco), con
 * un settings.json vacío (ignora la configuración del propietario) y sin
 * mensaje de sistema. Se auditó el 1 sep 2026 preguntándole qué contexto
 * tenía: solo el correo del propietario y la fecha. Nada del proyecto.
 *
 * El juicio sigue sin aplicarse solo: la salida se lee y se triangula contra
 * el banco de hechos. El lector frío no conoce las decisiones cerradas, así
 * que acierta en la forma y puede equivocarse en el fondo.
 *
 * Las rutas de página leen de `dist/` («lo que se revisa es lo que se
 * publica»), así que requieren `npx astro build` reciente. Una ruta a un
 * `.md` lee la fuente, para revisar un post que aún no se ha compilado.
 */
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

/* El prompt por defecto es literal y no se toca sin motivo (decisión del
   25 ago 2026). Su fuerza está en lo que NO pide: no pide versiones
   alternativas, no pide ajustarse a un estilo y no da contexto que el
   revisor pueda usar para justificar lo que lee. `--prompt` lo sustituye
   para una pasada suelta, sin tocar la decisión. */
const PROMPT_POR_DEFECTO = `Ahora analiza la página entera. Dame correcciones o apuntes bloque por bloque, no me des varias versiones, solo anotaciones de cosas que no te cuadran, que tienen poca coherencia o que no son veraces. Justifica esas anotaciones y lo que harías en su lugar:`;

/* Argumentos: la ruta es el primer suelto; el resto son banderas con valor. */
const args = process.argv.slice(2);
const bandera = (nombre, pordefecto) => {
  const i = args.indexOf(`--${nombre}`);
  return i >= 0 && args[i + 1] ? args[i + 1] : pordefecto;
};
const auto = args.includes('--auto');
const modelo = bandera('modelo', 'opus');
const prompt = bandera('prompt', PROMPT_POR_DEFECTO);
const consumidos = new Set();
for (const n of ['modelo', 'prompt']) {
  const i = args.indexOf(`--${n}`);
  if (i >= 0) { consumidos.add(i); consumidos.add(i + 1); }
}
const ruta = args.find((a, i) => !a.startsWith('--') && !consumidos.has(i));

if (!ruta) {
  console.error('Uso: npm run frio -- <ruta> [--auto] [--modelo opus] [--prompt "..."]');
  console.error('     <ruta> es una ruta publicada (servicios/agentes-conversacionales, blog/el-falso-exito, .)');
  console.error('     o un fichero .md del repositorio.');
  process.exit(1);
}

/* Un .md se lee de la fuente: sirve para revisar un post antes de compilar.
   Del frontmatter solo sobreviven título y descripción, que también son texto
   visible (pestaña del navegador y resultado de búsqueda). */
function desdeMarkdown(fichero) {
  const crudo = readFileSync(fichero, 'utf8').replace(/\r/g, '');
  const m = crudo.match(/^---\n([\s\S]*?)\n---\n/);
  const cuerpo = m ? crudo.slice(m[0].length) : crudo;
  const campo = (nombre) => {
    const c = (m?.[1] ?? '').match(new RegExp(`^${nombre}:[ ]*['"]?(.*?)['"]?[ ]*$`, 'm'));
    return c?.[1] ?? '';
  };
  const titulo = campo('title');
  const descripcion = campo('description');
  return [titulo && `# ${titulo}`, descripcion && `_${descripcion}_`, cuerpo.trim()]
    .filter(Boolean)
    .join('\n\n');
}

const esFichero = ruta.endsWith('.md') && existsSync(ruta);
let texto;
if (esFichero) {
  texto = desdeMarkdown(ruta);
} else {
  try {
    texto = execFileSync(process.execPath, ['scripts/pagina-a-texto.mjs', ruta], { encoding: 'utf8' });
  } catch {
    process.exit(1);
  }
}
texto = texto.trim();

const limpia = ruta.replace(/^\/+|\/+$/g, '').replace(/\.md$/, '') || 'home';
const nombre = limpia.replace(/[/\\]/g, '-');
mkdirSync(resolve('revisiones'), { recursive: true });
const destino = resolve('revisiones', `${nombre}.md`);
writeFileSync(destino, `${prompt}\n\n${texto}\n`, 'utf8');

const palabras = texto.split(/\s+/).length;

if (!auto) {
  console.log(`\nListo. Arrastra este fichero a una conversacion NUEVA de claude.ai:\n`);
  console.log(`   ${destino}\n`);
  console.log(`   ${palabras} palabras. El prompt ya va dentro, no hace falta escribir nada mas.`);
  console.log(`   O lanza la revision aqui mismo anadiendo --auto.\n`);
  process.exit(0);
}

/* El aislamiento vive en estas cuatro banderas y en el cwd. Cambiar
   cualquiera de ellas devuelve al revisor parte del contexto que lo
   inutiliza; si se tocan, hay que volver a auditarlo preguntandole que
   contexto tiene. */
const jaula = mkdtempSync(join(tmpdir(), 'frio-'));
writeFileSync(join(jaula, 'settings.json'), '{}', 'utf8');

console.error(`Revision en frio de ${limpia} (${palabras} palabras, modelo ${modelo})...`);

let salida;
try {
  salida = execFileSync(
    process.platform === 'win32' ? 'claude.exe' : 'claude',
    [
      '-p',
      '--model', modelo,
      '--tools', '',                                  // sin acceso al disco
      '--system-prompt', '',                          // sin mensaje de sistema
      '--exclude-dynamic-system-prompt-sections',
      '--settings', join(jaula, 'settings.json'),     // ignora la config del propietario
    ],
    {
      cwd: jaula,                                     // no hay CLAUDE.md que encontrar
      input: `${prompt}\n\n${texto}\n`,               // por stdin: los posts no caben en argv
      encoding: 'utf8',
      maxBuffer: 32 * 1024 * 1024,
    },
  );
} catch (e) {
  console.error(`\nFallo la llamada: ${e.stderr?.trim() || e.message}`);
  console.error(`El fichero sigue preparado en ${destino} para hacerlo a mano.`);
  rmSync(jaula, { recursive: true, force: true });
  process.exit(1);
}
rmSync(jaula, { recursive: true, force: true });

const informe = resolve('revisiones', `${nombre}-lectura.md`);
writeFileSync(informe, `# Lectura en frio de ${limpia}\n\nModelo: ${modelo}. ${new Date().toISOString().slice(0, 10)}.\nPrompt: ${prompt}\n\n---\n\n${salida.trim()}\n`, 'utf8');

console.log(salida.trim());
console.error(`\n---\nGuardado en ${informe}`);
