import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import { en } from "./en.ts";
import { es } from "./es.ts";
import { repoPaths } from "./links.ts";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../../../..");

/** Flatten a dictionary to `path → string`, so structure can be compared. */
function flatten(value: unknown, path = "", out = new Map<string, string>()) {
  if (typeof value === "string") out.set(path, value);
  else if (Array.isArray(value)) value.forEach((item, i) => flatten(item, `${path}[${i}]`, out));
  else if (value && typeof value === "object") {
    for (const [key, item] of Object.entries(value)) flatten(item, path ? `${path}.${key}` : key, out);
  }
  return out;
}

test("English and Spanish dictionaries have identical structure", () => {
  const a = flatten(en);
  const b = flatten(es);
  assert.deepEqual([...b.keys()].sort(), [...a.keys()].sort());
});

test("no translation is left empty", () => {
  for (const [name, dict] of [["en", en], ["es", es]] as const) {
    for (const [path, text] of flatten(dict)) {
      assert.ok(text.trim().length > 0, `${name}:${path} is empty`);
    }
  }
});

test("Spanish is actually translated (long strings differ from English)", () => {
  const a = flatten(en);
  const same = [...flatten(es)].filter(([path, text]) => text.length > 40 && a.get(path) === text);
  assert.deepEqual(same.map(([path]) => path), []);
});

test("every repository document linked from the site exists", () => {
  for (const [key, paths] of Object.entries(repoPaths)) {
    for (const [locale, path] of Object.entries(paths)) {
      assert.ok(existsSync(resolve(repoRoot, path)), `${key}.${locale} → ${path} is missing`);
    }
  }
});
