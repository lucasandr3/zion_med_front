/**
 * Corrige artefatos da migração Zard → Nord:
 * - [attr.variant] mangled
 * - vírgulas removidas em arrays imports
 * - CUSTOM_ELEMENTS_SCHEMA onde há nord-*
 */
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('src');
const files = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (/\.(html|ts)$/.test(entry.name)) files.push(full);
  }
}
walk(root);

function mapZardTypeLiteralsToNord(expr) {
  return expr
    .replace(/'destructive'/g, "'__NORD_DANGER__'")
    .replace(/'ghost'/g, "'__NORD_PLAIN__'")
    .replace(/'link'/g, "'__NORD_PLAIN__'")
    .replace(/'outline'/g, "'__NORD_DEFAULT__'")
    .replace(/'secondary'/g, "'__NORD_DEFAULT__'")
    .replace(/'default'/g, "'__NORD_PRIMARY__'")
    .replace(/'__NORD_DANGER__'/g, "'danger'")
    .replace(/'__NORD_PLAIN__'/g, "'plain'")
    .replace(/'__NORD_DEFAULT__'/g, "'default'")
    .replace(/'__NORD_PRIMARY__'/g, "'primary'");
}

/** Desfaz o ternário gigante gerado por [zType]="expr". */
function fixMangledVariantBindings(content) {
  // Pattern with optional `|| (expr) === true`
  const re =
    /\[attr\.variant\]="\(([\s\S]+?)\) === 'destructive'(?: \|\| \(\1\) === true)? \? 'danger' : \(\1\) === 'outline' \|\| \(\1\) === 'secondary' \? 'default' : \(\1\) === 'ghost' \|\| \(\1\) === 'link' \? 'plain' : 'primary'"/g;

  return content.replace(re, (_, expr) => {
    const mapped = mapZardTypeLiteralsToNord(expr.trim());
    return `[attr.variant]="${mapped}"`;
  });
}

/** Insere vírgulas faltando entre identificadores PascalCase em imports: [...]. */
function fixMissingCommasInImports(content) {
  return content.replace(/imports:\s*\[([\s\S]*?)\]/g, (full, inner) => {
    let next = inner;
    // Identifier Identifier → Identifier, Identifier (avoid string templates)
    next = next.replace(
      /\b([A-Z][A-Za-z0-9_]*)\s+([A-Z][A-Za-z0-9_]*)\b/g,
      '$1, $2',
    );
    // ...Spread Identifier
    next = next.replace(/(\.\.\.[A-Za-z0-9_]+)\s+([A-Z][A-Za-z0-9_]*)\b/g, '$1, $2');
    // Identifier ...Spread
    next = next.replace(/\b([A-Z][A-Za-z0-9_]*)\s+(\.\.\.[A-Za-z0-9_]+)/g, '$1, $2');
    // Module, Identifier without comma after known modules ending
    next = next.replace(
      /\b(OverlayModule|PortalModule|RouterLink|FormsModule|ReactiveFormsModule|CommonModule|NgIcon|NgTemplateOutlet)\s+([A-Z][A-Za-z0-9_]*)\b/g,
      '$1, $2',
    );
    return `imports: [${next}]`;
  });
}

function ensureCustomElementsSchema(tsContent, filePath) {
  const htmlPath = filePath.replace(/\.ts$/, '.html');
  let usesNord = /<(nord-[a-z0-9-]+)/.test(tsContent);
  if (fs.existsSync(htmlPath)) {
    usesNord = usesNord || /<(nord-[a-z0-9-]+)/.test(fs.readFileSync(htmlPath, 'utf8'));
  }
  if (!usesNord || !/@Component\(/.test(tsContent)) return tsContent;

  let s = tsContent;
  if (!/CUSTOM_ELEMENTS_SCHEMA/.test(s)) {
    if (/from '@angular\/core'/.test(s)) {
      s = s.replace(/import\s*\{([^}]*)\}\s*from\s*'@angular\/core'/, (m, inner) => {
        if (inner.includes('CUSTOM_ELEMENTS_SCHEMA')) return m;
        const cleaned = inner.replace(/,\s*$/, '').trimEnd();
        return `import {${cleaned}, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'`;
      });
    } else {
      s = `import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';\n` + s;
    }
  }
  if (!/schemas:\s*\[[^\]]*CUSTOM_ELEMENTS_SCHEMA/.test(s)) {
    s = s.replace(/@Component\(\{/, '@Component({\n  schemas: [CUSTOM_ELEMENTS_SCHEMA],');
  }
  return s;
}

let changed = 0;
for (const file of files) {
  const original = fs.readFileSync(file, 'utf8');
  let next = fixMangledVariantBindings(original);
  if (file.endsWith('.ts')) {
    next = fixMissingCommasInImports(next);
    next = ensureCustomElementsSchema(next, file);
  }
  if (next !== original) {
    fs.writeFileSync(file, next);
    changed++;
    console.log(path.relative(process.cwd(), file));
  }
}

console.log(`\nFixed ${changed} files.`);
