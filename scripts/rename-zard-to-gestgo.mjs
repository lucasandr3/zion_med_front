/**
 * Renomeia residual Zard → Gestgo (identificadores, seletores shell z-* → g-*, CSS).
 * Não move arquivos; atualiza conteúdo in-place.
 */
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('src');
const exts = new Set(['.ts', '.html', '.css', '.scss', '.md']);

/** @type {string[]} */
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

/** Seletores shell custom (ordem: mais longos primeiro). */
const SELECTOR_MAP = [
  ['z-tab-group', 'g-tab-group'],
  ['z-avatar-group', 'g-avatar-group'],
  ['z-dropdown-menu-label', 'g-dropdown-menu-label'],
  ['z-menu-shortcut', 'g-menu-shortcut'],
  ['z-menu-content', 'g-menu-content'],
  ['z-menu-label', 'g-menu-label'],
  ['z-menu-item', 'g-menu-item'],
  ['z-context-menu', 'g-context-menu'],
  ['z-skeleton', 'g-skeleton'],
  ['z-avatar', 'g-avatar'],
  ['z-badge', 'g-badge'],
  ['z-empty', 'g-empty'],
  ['z-card', 'g-card'],
  ['z-menu', 'g-menu'],
  ['z-tab', 'g-tab'],
];

/**
 * Renomeia seletores z-foo → g-foo em selectors Angular e templates HTML.
 * Evita tocar em nord-* / zTooltip / zType / etc.
 */
function renameSelectors(content) {
  let s = content;

  for (const [from, to] of SELECTOR_MAP) {
    // Angular selector strings: 'z-card', "z-card", 'z-card, [z-card]', etc.
    s = s.replace(new RegExp(`(['"])${escapeRe(from)}\\b`, 'g'), `$1${to}`);
    s = s.replace(new RegExp(`\\[${escapeRe(from)}\\]`, 'g'), `[${to}]`);

    // HTML tags <z-card ...> </z-card>
    s = s.replace(new RegExp(`<${escapeRe(from)}(\\s|>|/)`, 'g'), `<${to}$1`);
    s = s.replace(new RegExp(`</${escapeRe(from)}>`, 'g'), `</${to}>`);

    // Attribute usage without brackets already handled via [z-menu]; also bare attrs in HTML
    // class lists / host selectors that mention the tag as element
  }

  // exportAs: 'zCard' → 'gCard' for renamed shells (cosmetic, keeps consistency)
  const exportAsMap = {
    zCard: 'gCard',
    zBadge: 'gBadge',
    zAvatar: 'gAvatar',
    zEmpty: 'gEmpty',
    zSkeleton: 'gSkeleton',
    zTab: 'gTab',
    zTabGroup: 'gTabGroup',
  };
  for (const [from, to] of Object.entries(exportAsMap)) {
    s = s.replace(new RegExp(`(['"])${from}\\1`, 'g'), `$1${to}$1`);
  }

  return s;
}

function escapeRe(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Zard/zard → Gestgo/gestgo com limites de palavra seguros.
 */
function renameIdentifiers(content) {
  let s = content;
  // Prefix-safe: ZardFoo → GestgoFoo, zardSheet → gestgoSheet, config-zard-tabs → config-gestgo-tabs
  s = s.replace(/\bZard/g, 'Gestgo');
  s = s.replace(/\bzard/g, 'gestgo');
  return s;
}

let changedFiles = 0;
const changedPaths = [];

for (const file of files) {
  const original = fs.readFileSync(file, 'utf8');
  let next = original;
  next = renameIdentifiers(next);
  next = renameSelectors(next);

  if (next !== original) {
    fs.writeFileSync(file, next, 'utf8');
    changedFiles++;
    changedPaths.push(path.relative(process.cwd(), file));
  }
}

console.log(`Updated ${changedFiles} files`);
console.log(changedPaths.slice(0, 30).join('\n'));
if (changedPaths.length > 30) console.log(`... and ${changedPaths.length - 30} more`);
