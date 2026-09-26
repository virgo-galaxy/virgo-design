// @vitest-environment node

import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { compileString } from 'sass';
import { describe, expect, it } from 'vitest';

const css = compileString(readFileSync(new URL('./styles.scss', import.meta.url), 'utf8')).css;
const pagesDirectory = fileURLToPath(new URL('./pages/', import.meta.url));
const pageStyles = readdirSync(pagesDirectory, { recursive: true })
  .map((path) => path.toString())
  .filter((path) => path.endsWith('.scss'))
  .sort();

function declarationsFor(selector: string) {
  const rule = `${selector} {`;
  const start = css.indexOf(rule);

  if (start === -1) {
    throw new Error(`Missing overview style rule: ${selector}`);
  }

  const declarations = css.slice(start + rule.length, css.indexOf('}', start));

  return Object.fromEntries(
    declarations
      .split(';')
      .filter((declaration) => declaration.trim())
      .map((declaration) => {
        const separator = declaration.indexOf(':');
        return [declaration.slice(0, separator).trim(), declaration.slice(separator + 1).trim()];
      }),
  );
}

describe('Component overview style ownership', () => {
  it('keeps horizontal alignment and spacing in the shared overview', () => {
    expect(declarationsFor('.components-documentation .overview')).toMatchObject({
      display: 'grid',
      padding: '0 0 var(--vd-spacing-48)',
    });
    expect(declarationsFor('.components-documentation .overview-copy')).toMatchObject({
      'min-width': '0',
      padding: 'var(--vd-spacing-24) 0',
    });
    expect(declarationsFor('.components-documentation .overview--single')).toEqual({
      'grid-template-columns': 'minmax(0, 1fr)',
      'align-items': 'start',
    });
  });

  it('uses the same title and description tokens for both layouts', () => {
    expect(declarationsFor('.components-documentation .overview h1')).toMatchObject({
      margin: '0',
      'font-size': 'var(--vd-typography-ui-display-medium-font-size)',
      'line-height': 'var(--vd-typography-ui-display-medium-line-height)',
      'overflow-wrap': 'anywhere',
    });
    expect(declarationsFor('.components-documentation .overview-copy > p')).toMatchObject({
      margin: 'var(--vd-spacing-16) 0 0',
      'font-size': 'var(--vd-typography-ui-body-large-font-size)',
      'line-height': 'var(--vd-typography-ui-body-large-line-height)',
    });
    expect(declarationsFor('.components-documentation .eyebrow-row')).toMatchObject({
      'flex-wrap': 'wrap',
    });
    expect(declarationsFor('.components-documentation .component-facts')).toMatchObject({
      'flex-wrap': 'wrap',
    });
  });

  it.each(pageStyles)('keeps %s free of retired intro and shared overview overrides', (path) => {
    const pageCss = compileString(readFileSync(join(pagesDirectory, path), 'utf8')).css;

    // Layout's "Typical examples" heading is not the page overview.
    expect(pageCss).not.toMatch(/\.(?!layout-examples-intro\b)[\w-]+-intro\b/);
    expect(pageCss).not.toContain('.layout-structure-overview');
    expect(pageCss).not.toMatch(/\.(?:overview(?:--single|-copy)?|eyebrow-row|component-facts)\b/);
  });
});
