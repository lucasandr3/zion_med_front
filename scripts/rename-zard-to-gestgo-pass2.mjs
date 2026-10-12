/**
 * Pass 2: atributos HTML z-* → g-*, Zard embutido em camelCase (onZard*), leftovers.
 */
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('src');
const exts = new Set(['.ts', '.html', '.css', '.scss']);
const files = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === 'dist') continue;
      walk(full);
    } else if (exts.has(path.extname(entry.name))) {
      files.push(full);
    }
  }
}
walk(root);

function escapeRe(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const ATTRS = [
  'z-tab-group',
  'z-avatar-group',
  'z-dropdown-menu-label',
  'z-menu-shortcut',
  'z-menu-content',
  'z-menu-label',
  'z-menu-item',
  'z-context-menu',
  'z-skeleton',
  'z-avatar',
  'z-badge',
  'z-empty',
  'z-card',
  'z-menu',
  'z-tab',
];

let changed = 0;

for (const file of files) {
  const original = fs.readFileSync(file, 'utf8');
  let s = original;

  // onZardTabChange → onGestgoTabChange (Zard as camelCase segment)
  s = s.replace(/Zard/g, 'Gestgo');

  for (const from of ATTRS) {
    const to = 'g' + from.slice(1); // z-foo → g-foo
    // bare attribute / selector token (not already g-)
    s = s.replace(new RegExp(`(?<![A-Za-z0-9_-])${escapeRe(from)}(?![A-Za-z0-9_-])`, 'g'), to);
  }

  if (s !== original) {
    fs.writeFileSync(file, s, 'utf8');
    changed++;
  }
}

console.log(`Pass2 updated ${changed} files`);
