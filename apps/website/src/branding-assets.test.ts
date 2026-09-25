import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { describe, expect, it } from 'vitest';

const websiteRoot = process.cwd().endsWith('apps/website')
  ? process.cwd()
  : resolve(process.cwd(), 'apps/website');

describe('Website branding assets', () => {
  it('references the official favicon explicitly', () => {
    const html = readFileSync(resolve(websiteRoot, 'index.html'), 'utf8');

    expect(html).toContain('<link rel="icon" href="/favicon.ico" />');
    expect(html).not.toContain('/logo.svg');
    expect(existsSync(resolve(websiteRoot, 'public/favicon.ico'))).toBe(true);
  });

  it('keeps a single official Website logo asset', () => {
    expect(existsSync(resolve(websiteRoot, 'public/virgo-design.svg'))).toBe(true);
    expect(existsSync(resolve(websiteRoot, 'public/logo.svg'))).toBe(false);
  });
});
