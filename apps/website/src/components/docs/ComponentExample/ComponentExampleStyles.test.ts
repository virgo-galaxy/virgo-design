// @vitest-environment node

import { readFileSync } from 'node:fs';

import { compileString } from 'sass';
import { describe, expect, it } from 'vitest';

const css = compileString(
  readFileSync(new URL('./component-example.module.scss', import.meta.url), 'utf8'),
).css;

describe('ComponentExample shared preview geometry', () => {
  it('reserves room for preview actions without changing the shared control inset', () => {
    expect(css).toContain('--component-example-inset: var(--vd-spacing-16)');
    expect(css).toContain('--component-example-inset: var(--vd-spacing-12)');
    expect(css).toContain(
      'padding-block-end: calc(var(--component-example-inset) + var(--vd-sizing-24) + var(--vd-spacing-12))',
    );
    expect(css).toContain('padding-inline: var(--vd-spacing-16)');
    expect(css).toContain('inset-inline-end: var(--component-example-inset)');
    expect(css).toContain('inset-block-end: var(--component-example-inset)');
    expect(css).toContain('gap: var(--vd-spacing-4)');
  });

  it('keeps expanded actions visible and theme-inverse, with semantic copy success', () => {
    expect(css).toMatch(
      /\.toolbar:has\(\[data-example-action=['"]?source['"]?\]\[aria-expanded=['"]?true['"]?\]\)\s*\{\s*opacity: 1;/,
    );
    expect(css).toContain('--button-background: var(--vd-text-primary)');
    expect(css).toContain('--button-foreground: var(--vd-text-inverse)');
    expect(css).toContain('--button-foreground: var(--vd-status-success-accent)');
    expect(css).toContain('@media (prefers-reduced-motion: reduce)');
  });
});
