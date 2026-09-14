/**
 * IndexNow: avisar a los buscadores de que unas URL han cambiado.
 *
 *   npm run indexnow -- --que-haria     enseña qué enviaría, sin enviar nada
 *   npm run indexnow                    envía las URL cambiadas
 *   npm run indexnow -- --todo          envía el sitemap entero
 *   npm run indexnow -- /blog/una-url   envía solo esas
 *
 * QUÉ ES Y QUÉ NO
 *
 * Un aviso, no una petición de indexación. Lo leen Bing, Yandex, Seznam y
 * Naver, y desde 2025 también lo alimenta Cloudflare. **Google NO lo usa**, y
 * conviene saberlo antes de esperar nada: para Google sigue mandando el
 * sitemap. Aquí vale la pena igualmente porque los asistentes que citan
 * páginas se apoyan en el índice de Bing más de lo que parece.
 *
 * POR QUÉ NO SE DISPARA SOLO EN EL BUILD
 *
 * Porque el build ocurre ANTES del despliegue. Avisar de una URL que todavía
 * no está en línea es pedirle al rastreador que se encuentre un 404, y un
 * buscador que se come varios de esos deja de hacer caso. Esto se ejecuta a
 * mano después de publicar, o desde el despliegue si algún día se automatiza.
 *
 * QUÉ URL ENVÍA
 *
 * Por defecto, solo las que han cambiado desde el último aviso. La marca
 * anterior vive en `.indexnow-estado.json`, que no se versiona: guarda el
 * `lastmod` con el que se avisó de cada URL. Una URL sin `lastmod` en el
 * sitemap (las páginas fijas no lo llevan) se envía solo la primera vez y
 * cuando se la nombra a mano, porque no hay forma de saber si cambió.
 *
 * LA CLAVE
 *
 * `public/<clave>.txt` contiene la propia clave y es pública por diseño: es
 * como el protocolo comprueba que quien avisa manda en el dominio. No es un
 * secreto y no tiene por qué estar fuera del repositorio.
 */
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const HOST = 'ideasforge.io';
const ESTADO = '.indexnow-estado.json';
const PUBLIC = 'public';

const args = process.argv.slice(2);
const simulacro = args.includes('--que-haria');
const todo = args.includes('--todo');
const sueltas = args.filter((a) => a.startsWith('/'));

/* La clave es el nombre del fichero `.txt` de `public/` cuyo contenido es su
   propio nombre. Se descubre en vez de escribirse aquí para que rotar la clave
   sea cambiar un fichero y nada más. */
function claveDelProyecto() {
  for (const f of readdirSync(PUBLIC).filter((f) => /^[0-9a-f]{8,128}\.txt$/.test(f))) {
    const esperado = f.replace(/\.txt$/, '');
    if (readFileSync(join(PUBLIC, f), 'utf8').trim() === esperado) return esperado;
  }
  return null;
}

const clave = claveDelProyecto();
if (!clave) {
  console.error(
    `No encuentro la clave. Tiene que haber un fichero en ${PUBLIC}/ llamado ` +
      `<clave>.txt cuyo contenido sea exactamente esa misma clave.`
  );
  process.exit(1);
}

/* Del sitemap compilado, que es la lista de lo que de verdad se publica. */
function delSitemap() {
  const f = 'dist/sitemap-0.xml';
  if (!existsSync(f)) {
    console.error('No hay dist/sitemap-0.xml. Compila antes: npx astro build');
    process.exit(1);
  }
  const xml = readFileSync(f, 'utf8');
  const urls = [];
  for (const m of xml.matchAll(/<url>(.*?)<\/url>/gs)) {
    const loc = (m[1].match(/<loc>([^<]+)<\/loc>/) || [])[1];
    if (!loc) continue;
    urls.push({ loc, lastmod: (m[1].match(/<lastmod>([^<]+)<\/lastmod>/) || [])[1] || '' });
  }
  return urls;
}

const previo = existsSync(ESTADO) ? JSON.parse(readFileSync(ESTADO, 'utf8')) : {};
const urls = delSitemap();

let aEnviar;
if (sueltas.length) {
  aEnviar = sueltas.map((r) => `https://${HOST}${r}`);
} else if (todo) {
  aEnviar = urls.map((u) => u.loc);
} else {
  aEnviar = urls.filter((u) => previo[u.loc] !== (u.lastmod || 'sin-fecha')).map((u) => u.loc);
}

if (!aEnviar.length) {
  console.log('Nada que avisar: ninguna URL ha cambiado desde el último aviso.');
  process.exit(0);
}

console.log(`${aEnviar.length} URL:`);
for (const u of aEnviar) console.log(`  ${u}`);

if (simulacro) {
  console.log('\n--que-haria: no se ha enviado nada.');
  process.exit(0);
}

/* El protocolo acepta hasta 10.000 por petición; aquí nunca habrá tantas. */
const cuerpo = {
  host: HOST,
  key: clave,
  keyLocation: `https://${HOST}/${clave}.txt`,
  urlList: aEnviar,
};

const r = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify(cuerpo),
});

/* 200 y 202 son los dos éxitos del protocolo: 202 significa aceptado y
   pendiente de comprobar la clave. */
if (r.status !== 200 && r.status !== 202) {
  console.error(`\nIndexNow respondió ${r.status} ${r.statusText}. No se guarda la marca.`);
  console.error(await r.text().catch(() => ''));
  process.exit(1);
}

const nuevo = { ...previo };
for (const u of urls) {
  if (aEnviar.includes(u.loc)) nuevo[u.loc] = u.lastmod || 'sin-fecha';
}
writeFileSync(ESTADO, JSON.stringify(nuevo, null, 2), 'utf8');
console.log(`\nIndexNow respondió ${r.status}. Marca guardada en ${ESTADO}.`);
