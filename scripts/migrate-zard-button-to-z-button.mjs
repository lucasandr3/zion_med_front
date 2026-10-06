/**
 * Converte <button … z-button …>…</button> → <z-button …>…</z-button>
 * Mantém a[z-button] intactos (routerLink).
 */
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('src');
const files = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith('.html')) files.push(full);
  }
}

walk(root);

let changedFiles = 0;
let replacements = 0;

const re = /<button(\s[^>]*?\bz-button\b[^>]*)>([\s\S]*?)<\/button>/gi;

for (const file of files) {
  const original = fs.readFileSync(file, 'utf8');
  let count = 0;
  const next = original.replace(re, (_m, attrs, body) => {
    count += 1;
    let a = attrs
      .replace(/\bz-button\b/g, '')
      .replace(/\s+/g, ' ')
      .trim();
    // type="submit" etc. vira atributo do z-button
    return `<z-button${a ? ' ' + a : ''}>${body}</z-button>`;
  });
  if (count > 0 && next !== original) {
    fs.writeFileSync(file, next);
    changedFiles += 1;
    replacements += count;
    console.log(`${path.relative(process.cwd(), file)} (+${count})`);
  }
}

console.log(`\nDone: ${replacements} buttons in ${changedFiles} files.`);
