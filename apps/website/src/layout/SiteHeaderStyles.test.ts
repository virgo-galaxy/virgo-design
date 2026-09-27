// @vitest-environment node

import { readFileSync } from 'node:fs';

import { compileString } from 'sass';
import { describe, expect, it } from 'vitest';

const source = readFileSync(new URL('./layout.module.scss', import.meta.url), 'utf8');
const css = compileString(source).css;

describe('SiteHeader responsive composition', () => {
  it('keeps the header viewport-fluid instead of restoring a centered max-width shell', () => {
    expect(source).not.toContain('headerInner');
    expect(source).not.toContain('1480px');
    expect(css).toContain('.header');
    expect(css).toContain('height: var(--layout-header-height)');
  });

  it('keeps primary navigation available in the compact two-row header', () => {
    expect(css).toContain('@media (max-width: 760px)');
    expect(css).toContain('flex-wrap: wrap');
    expect(source).toContain("[data-slot='header-content']");
    expect(css).toContain('overflow-x: auto');
    expect(css).toContain('flex: 0 0 100%');
    expect(source).not.toMatch(/\.navigation\s*\{[^}]*display:\s*none/s);
  });

  it('uses site-specific active underline without bringing back NavigationMenu fills', () => {
    expect(source).toContain("[data-vd-navigation-menu-control][data-active='true']::after");
    expect(css).toContain('background: transparent');
    expect(css).toContain('color: var(--layout-accent)');
  });
});
