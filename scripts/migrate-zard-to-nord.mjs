/**
 * Migra templates/imports Zard → Nord Design System.
 * z-button → nord-button, z-checkbox → nord-checkbox, z-switch → nord-toggle, remove z-input.
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

function mapButtonType(zType) {
  const v = (zType || 'default').replace(/['"]/g, '');
  switch (v) {
    case 'destructive':
      return 'danger';
    case 'ghost':
    case 'link':
      return 'plain';
    case 'outline':
    case 'secondary':
      return 'default';
    case 'default':
      return 'primary';
    default:
      return 'primary';
  }
}

function mapButtonSize(zSize) {
  const v = (zSize || 'default').replace(/['"]/g, '');
  if (['xs', 'sm', 'icon-xs', 'icon-sm'].includes(v)) return 's';
  if (['lg', 'icon-lg'].includes(v)) return 'l';
  return 'm';
}

function isIconSize(zSize) {
  const v = (zSize || '').replace(/['"]/g, '');
  return ['icon', 'icon-xs', 'icon-sm', 'icon-lg'].includes(v);
}

function transformButtonOpenTag(attrs) {
  let a = attrs;

  // zType="..." or [zType]="expr"
  a = a.replace(/\bzType="([^"]*)"/g, (_, v) => `variant="${mapButtonType(v)}"`);
  a = a.replace(/\[zType\]="([^"]*)"/g, (_, expr) => {
    // best-effort: common patterns
    if (expr.includes('destructive')) {
      return `[attr.variant]="(${expr}) === 'destructive' || (${expr}) === true ? 'danger' : (${expr}) === 'outline' || (${expr}) === 'secondary' ? 'default' : (${expr}) === 'ghost' || (${expr}) === 'link' ? 'plain' : 'primary'"`;
    }
    return `[attr.variant]="(${expr}) === 'destructive' ? 'danger' : (${expr}) === 'outline' || (${expr}) === 'secondary' ? 'default' : (${expr}) === 'ghost' || (${expr}) === 'link' ? 'plain' : 'primary'"`;
  });

  let sizeLiteral = null;
  a = a.replace(/\bzSize="([^"]*)"/g, (_, v) => {
    sizeLiteral = v;
    return `size="${mapButtonSize(v)}"`;
  });
  a = a.replace(/\[zSize\]="([^"]*)"/g, (_, expr) => `[attr.size]="['xs','sm','icon-xs','icon-sm'].includes(${expr}) ? 's' : ['lg','icon-lg'].includes(${expr}) ? 'l' : 'm'"`);

  if (sizeLiteral && isIconSize(sizeLiteral)) {
    a += ' square';
  }

  a = a.replace(/\bzFull\b(?!=)/g, 'expand');
  a = a.replace(/\[zFull\]="/g, '[attr.expand]="');
  a = a.replace(/\[zLoading\]="/g, '[attr.loading]="');
  a = a.replace(/\[zDisabled\]="/g, '[attr.disabled]="');
  a = a.replace(/\[disabled\]="/g, '[attr.disabled]="');
  a = a.replace(/\bzDisabled\b(?!=)/g, 'disabled');
  a = a.replace(/\bzLoading\b(?!=)/g, 'loading');

  // remove leftover zard-only attrs
  a = a.replace(/\bzShape="[^"]*"/g, '');
  a = a.replace(/\[zShape\]="[^"]*"/g, '');
  a = a.replace(/\bzTooltip="[^"]*"/g, '');
  a = a.replace(/\[zTooltip\]="[^"]*"/g, '');
  a = a.replace(/\bzPopover\b/g, '');
  a = a.replace(/\[zContent\]="[^"]*"/g, '');
  a = a.replace(/\[zMatchTriggerWidth\]="[^"]*"/g, '');
  a = a.replace(/\(zVisibleChange\)="[^"]*"/g, '');
  a = a.replace(/#popoverTrigger\b/g, '');
  a = a.replace(/\s+/g, ' ').trim();
  return a ? ' ' + a : '';
}

function transformHtml(content) {
  let s = content;

  // <z-button ...>...</z-button>
  s = s.replace(/<z-button(\s[^>]*)?>([\s\S]*?)<\/z-button>/gi, (_, attrs = '', body) => {
    return `<nord-button${transformButtonOpenTag(attrs)}>${body}</nord-button>`;
  });

  // self-closing unlikely

  // a[z-button] → plain anchor (keep routerLink), strip z-* button attrs
  s = s.replace(/<a(\s[^>]*?\bz-button\b[^>]*)>/gi, (_, attrs) => {
    let a = attrs
      .replace(/\bz-button\b/g, '')
      .replace(/\bzType="[^"]*"/g, '')
      .replace(/\[zType\]="[^"]*"/g, '')
      .replace(/\bzSize="[^"]*"/g, '')
      .replace(/\[zSize\]="[^"]*"/g, '')
      .replace(/\bzShape="[^"]*"/g, '')
      .replace(/\[zDisabled\]="[^"]*"/g, '')
      .replace(/\[disabled\]="([^"]*)"/g, '[attr.aria-disabled]="$1"')
      .replace(/\bzTooltip="[^"]*"/g, '')
      .replace(/\[zTooltip\]="[^"]*"/g, '')
      .replace(/\s+/g, ' ')
      .trim();
    return `<a${a ? ' ' + a : ''}>`;
  });

  // <z-checkbox ...> → <nord-checkbox>
  s = s.replace(/<z-checkbox(\s[^>]*)?>([\s\S]*?)<\/z-checkbox>/gi, (_, attrs = '', body) => {
    let a = (attrs || '')
      .replace(/\[zDisabled\]="/g, '[attr.disabled]="')
      .replace(/\bzDisabled\b/g, 'disabled')
      .replace(/\bzType="[^"]*"/g, '')
      .replace(/\bzSize="[^"]*"/g, '')
      .replace(/\bzShape="[^"]*"/g, '')
      .replace(/\s+/g, ' ')
      .trim();
    return `<nord-checkbox${a ? ' ' + a : ''}>${body}</nord-checkbox>`;
  });

  // <z-switch ...> → <nord-toggle>
  s = s.replace(/<z-switch(\s[^>]*)?>([\s\S]*?)<\/z-switch>/gi, (_, attrs = '', body) => {
    let a = (attrs || '')
      .replace(/\[zChecked\]="/g, '[checked]="')
      .replace(/\bzChecked\b/g, 'checked')
      .replace(/\[zDisabled\]="/g, '[attr.disabled]="')
      .replace(/\bzDisabled\b/g, 'disabled')
      .replace(/\bzSize="([^"]*)"/g, (_, v) => `size="${v === 'sm' ? 's' : v === 'lg' ? 'l' : 'm'}"`)
      .replace(/\bzType="[^"]*"/g, '')
      .replace(/\[zId\]="[^"]*"/g, '')
      .replace(/\bzId="[^"]*"/g, '')
      .replace(/\s+/g, ' ')
      .trim();
    return `<nord-toggle${a ? ' ' + a : ''}>${body}</nord-toggle>`;
  });

  // remove z-input directive from native inputs
  s = s.replace(/\s+z-input\b/g, '');
  s = s.replace(/\s+\[zStatus\]="[^"]*"/g, '');
  s = s.replace(/\s+zStatus="[^"]*"/g, '');
  s = s.replace(/\s+\[zSize\]="[^"]*"/g, '');
  s = s.replace(/\s+zSize="[^"]*"/g, '');
  s = s.replace(/\s+\[zBorderless\]="[^"]*"/g, '');
  s = s.replace(/\s+zBorderless\b/g, '');

  // z-menu-label → span
  s = s.replace(/<span([^>]*?)\bz-menu-label\b([^>]*)>/gi, '<span$1$2>');

  // zTooltip directive leftovers on other elements
  s = s.replace(/\s+zTooltip="[^"]*"/g, '');
  s = s.replace(/\s+\[zTooltip\]="[^"]*"/g, '');

  return s;
}

function transformTs(content, filePath) {
  let s = content;

  // Remove Zard component imports used for UI primitives
  s = s.replace(
    /import\s*\{[^}]*ZardButtonComponent[^}]*\}\s*from\s*['"][^'"]+['"];?\n?/g,
    (m) => {
      // if import only had ZardButton, drop entirely; else strip the symbol
      if (/^import\s*\{\s*ZardButtonComponent\s*\}\s*from/.test(m.trim())) return '';
      return m
        .replace(/,?\s*ZardButtonComponent\s*,?/g, (x) => (x.startsWith(',') && x.endsWith(',') ? ',' : ''))
        .replace(/\{\s*,/g, '{')
        .replace(/,\s*\}/g, '}')
        .replace(/import\s*\{\s*\}\s*from\s*['"][^'"]+['"];?\n?/, '');
    },
  );
  s = s.replace(
    /import\s*\{[^}]*ZardCheckboxComponent[^}]*\}\s*from\s*['"][^'"]+['"];?\n?/g,
    (m) => {
      if (/^import\s*\{\s*ZardCheckboxComponent\s*\}\s*from/.test(m.trim())) return '';
      return m
        .replace(/,?\s*ZardCheckboxComponent\s*,?/g, (x) => (x.startsWith(',') && x.endsWith(',') ? ',' : ''))
        .replace(/\{\s*,/g, '{')
        .replace(/,\s*\}/g, '}')
        .replace(/import\s*\{\s*\}\s*from\s*['"][^'"]+['"];?\n?/, '');
    },
  );
  s = s.replace(
    /import\s*\{[^}]*ZardSwitchComponent[^}]*\}\s*from\s*['"][^'"]+['"];?\n?/g,
    (m) => {
      if (/^import\s*\{\s*ZardSwitchComponent\s*\}\s*from/.test(m.trim())) return '';
      return m
        .replace(/,?\s*ZardSwitchComponent\s*,?/g, (x) => (x.startsWith(',') && x.endsWith(',') ? ',' : ''))
        .replace(/\{\s*,/g, '{')
        .replace(/,\s*\}/g, '}')
        .replace(/import\s*\{\s*\}\s*from\s*['"][^'"]+['"];?\n?/, '');
    },
  );
  s = s.replace(
    /import\s*\{[^}]*ZardInputDirective[^}]*\}\s*from\s*['"][^'"]+['"];?\n?/g,
    (m) => {
      if (/^import\s*\{\s*ZardInputDirective\s*\}\s*from/.test(m.trim())) return '';
      return m
        .replace(/,?\s*ZardInputDirective\s*,?/g, (x) => (x.startsWith(',') && x.endsWith(',') ? ',' : ''))
        .replace(/\{\s*,/g, '{')
        .replace(/,\s*\}/g, '}')
        .replace(/import\s*\{\s*\}\s*from\s*['"][^'"]+['"];?\n?/, '');
    },
  );
  s = s.replace(
    /import\s*\{\s*\.\.\.ZardTooltipImports\s*\}\s*from\s*['"][^'"]+['"];?\n?/g,
    '',
  );
  s = s.replace(
    /import\s*\{[^}]*ZardTooltipImports[^}]*\}\s*from\s*['"][^'"]+['"];?\n?/g,
    (m) => {
      if (/ZardTooltipImports/.test(m) && !/[^,\s{]Zard/.test(m.replace('ZardTooltipImports', ''))) {
        // keep if other symbols - strip tooltip
      }
      return m
        .replace(/,?\s*ZardTooltipImports\s*,?/g, (x) => (x.startsWith(',') && x.endsWith(',') ? ',' : ''))
        .replace(/\{\s*,/g, '{')
        .replace(/,\s*\}/g, '}')
        .replace(/import\s*\{\s*\}\s*from\s*['"][^'"]+['"];?\n?/, '');
    },
  );

  // Remove from imports arrays
  s = s.replace(/,?\s*ZardButtonComponent\s*,?/g, (x) => (x.includes(',') && x.trim() !== ',' ? '' : ''));
  s = s.replace(/,?\s*ZardCheckboxComponent\s*,?/g, '');
  s = s.replace(/,?\s*ZardSwitchComponent\s*,?/g, '');
  s = s.replace(/,?\s*ZardInputDirective\s*,?/g, '');
  s = s.replace(/,?\s*\.\.\.ZardTooltipImports\s*,?/g, '');
  s = s.replace(/\[\s*,/g, '[');
  s = s.replace(/,\s*,/g, ',');
  s = s.replace(/,\s*\]/g, ']');

  // Ensure CUSTOM_ELEMENTS_SCHEMA when nord- used in template of same component
  const htmlPath = filePath.replace(/\.ts$/, '.html');
  let usesNord = /nord-(button|checkbox|toggle|input|card|banner|stack)/.test(s);
  if (fs.existsSync(htmlPath)) {
    const html = fs.readFileSync(htmlPath, 'utf8');
    usesNord = usesNord || /nord-(button|checkbox|toggle|input|card|banner|stack)/.test(html);
  }
  // also if we just transformed inline template
  if (/nord-(button|checkbox|toggle)/.test(s) || usesNord) {
    if (!/CUSTOM_ELEMENTS_SCHEMA/.test(s) && /@Component\(/.test(s)) {
      if (/from '@angular\/core'/.test(s)) {
        s = s.replace(
          /import\s*\{([^}]*)\}\s*from\s*'@angular\/core'/,
          (m, inner) => {
            if (inner.includes('CUSTOM_ELEMENTS_SCHEMA')) return m;
            return `import {${inner.replace(/\s*$/, '')}, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'`;
          },
        );
      } else {
        s = `import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';\n` + s;
      }
      s = s.replace(/@Component\(\{/, '@Component({\n  schemas: [CUSTOM_ELEMENTS_SCHEMA],');
      // avoid duplicate schemas
      s = s.replace(/schemas:\s*\[CUSTOM_ELEMENTS_SCHEMA\],\s*schemas:\s*\[CUSTOM_ELEMENTS_SCHEMA\],/, 'schemas: [CUSTOM_ELEMENTS_SCHEMA],');
    }
  }

  // Transform inline templates in .ts
  s = s.replace(/template:\s*`([\s\S]*?)`/g, (m, tpl) => {
    const next = transformHtml(tpl);
    return `template: \`${next}\``;
  });

  return s;
}

let changed = 0;
for (const file of files) {
  // skip the zard component implementations themselves for now (deleted later)
  if (file.includes(`${path.sep}shared${path.sep}components${path.sep}button${path.sep}`)) continue;
  if (file.includes(`${path.sep}shared${path.sep}components${path.sep}checkbox${path.sep}`)) continue;
  if (file.includes(`${path.sep}shared${path.sep}components${path.sep}switch${path.sep}`)) continue;
  if (file.includes(`${path.sep}shared${path.sep}components${path.sep}input${path.sep}`)) continue;

  const original = fs.readFileSync(file, 'utf8');
  let next = original;
  if (file.endsWith('.html')) next = transformHtml(next);
  else next = transformTs(next, file);

  if (next !== original) {
    fs.writeFileSync(file, next);
    changed++;
    console.log(path.relative(process.cwd(), file));
  }
}

console.log(`\nUpdated ${changed} files.`);
