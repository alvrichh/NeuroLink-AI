import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const paths = ['/', '/es/', '/experiments/', '/inner-speech/', '/dreams/', '/es/experimentos/', '/es/habla-interna/', '/es/suenos/'];
const base = (process.env.NEXT_PUBLIC_BASE_PATH ?? '').replace(/\/$/, '');
const output = resolve('out');
function htmlFor(path) {
  const file = resolve(output, `.${path}`, 'index.html');
  assert.ok(file.startsWith(`${output}/`));
  assert.ok(existsSync(file), `Missing export: ${path}`);
  return readFileSync(file, 'utf8');
}
for (const path of paths) {
  const html = htmlFor(path);
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1, `${path}: one h1`);
  assert.ok(html.includes(`lang="${path.startsWith('/es/') ? 'es' : 'en'}"`), `${path}: document language`);
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
  assert.equal(ids.length, new Set(ids).size, `${path}: duplicate IDs`);
  for (const match of html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)) {
    const href = match[1];
    if (!href.startsWith('/') && !href.startsWith('#')) continue;
    const url = new URL(href, `https://local.invalid${base}${path}`);
    const local = base && url.pathname.startsWith(`${base}/`) ? url.pathname.slice(base.length) : url.pathname;
    const target = htmlFor(local);
    if (url.hash) assert.ok(target.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`), `${path}: broken anchor ${href}`);
  }
}
console.log(`PASS: ${paths.length} bilingual pages, headings, unique IDs and internal links/anchors.`);
