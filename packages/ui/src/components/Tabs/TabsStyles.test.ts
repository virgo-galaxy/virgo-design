/// <reference types="node" />

// @vitest-environment node

import { readFileSync } from 'node:fs';

import { compileString } from 'sass';
import { describe, expect, it } from 'vitest';

const source = readFileSync(new URL('./Tabs.module.scss', import.meta.url), 'utf8');

describe('Tabs visual variants', () => {
  it('keeps the plain variant separator-based with hover-only surfaces and color-only selection', () => {
    expect(() => compileString(source)).not.toThrow();
    expect(source).toContain(".list[data-variant='plain'] .indicator");
    expect(source).toContain(".list[data-variant='plain'] .item + .item::before");
    expect(source).toContain('background: var(--vd-border-subtle)');
    expect(source).toMatch(
      /\.list\[data-variant='plain'\] \.tab\[aria-selected='true'\] \{[\s\S]*color: var\(--vd-brand-primary\);[\s\S]*background: transparent;/,
    );
    expect(source).toMatch(
      /\.list\[data-variant='plain'\] \.tab:hover:not\(:disabled\) \{[\s\S]*background: var\(--vd-fill-hover\);/,
    );
  });
});
