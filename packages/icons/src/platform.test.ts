import { readFile } from 'node:fs/promises';

import { describe, expect, it } from 'vitest';

import { iconSvgSources } from './assets';
import {
  iconCategories,
  iconManifest,
  type IconMetadata,
  searchIcons,
  validateIconMetadata,
} from './metadata';
import { iconComponents } from './registry';
import { createIconSource, iconComponentName, serializeIconSvg, validateIconSvg } from './tooling';

const valid = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 4h16v16H4z" /></svg>';
describe('canonical platform contract', () => {
  it.each([
    valid.replace('24 24', '20 20'),
    valid.replace('currentColor', '#000'),
    valid.replace('currentColor', 'white'),
    valid.replace('<svg ', '<svg width="24" '),
    valid.replace('<path ', '<path fill="#fff" '),
    valid.replace('<path ', '<path onclick="alert(1)" '),
    valid.replace('<path ', '<path transform="translate(1 1)" '),
    valid.replace('<path ', '<path style="fill:red" '),
    valid.replace('<path ', '<path stroke-width="2" '),
    valid.replace('<path ', '<path d="M0 0" '),
    valid.replace('M4 4h16v16H4z', 'M4 4L1'),
    valid.replace('M4 4h16v16H4z', 'M0 0A2 2 0 2 0 1 1'),
    valid.replace('M4 4h16v16H4z', 'M1e999 0H20'),
    valid.replace('<path ', '<script>alert(1)</script><path '),
    valid.replace('<path ', '<foreignObject /><path '),
    valid.replace('<path ', '<use href="https://example.test" /><path '),
    valid.replace('<path ', '<g><path ').replace('</svg>', '</g></svg>'),
    valid.replace('<path ', '<path clip-path="url(#x)" '),
    valid.replace('M4 4h16v16H4z', '&quot;'),
  ])('rejects invalid or unsafe input: %s', (source) =>
    expect(() => validateIconSvg(source)).toThrow(),
  );
  it('round trips safe geometry without precision loss', () => {
    const source = valid
      .replace('M4 4h16v16H4z', 'M4.123456 4h16v16H4z')
      .replace('<path ', '<path fill-rule="evenodd" ');
    const definition = validateIconSvg(source);
    expect(validateIconSvg(serializeIconSvg(definition))).toEqual(definition);
    const react = createIconSource('custom-square', source);
    expect(react).toContain('CustomSquareIcon');
    expect(react).toContain("import type { IconProps } from '@virgo-design/icons';");
    expect(react).toContain('export type CustomSquareIconProps = IconProps;');
    expect(react).toContain('4.123456');
    expect(react).not.toContain('strokeWidth?:');
    expect(() => iconComponentName('Bad_Name')).toThrow('kebab-case');
    expect(() => createIconSource('bad name', valid)).toThrow('kebab-case');
  });
  it('completes every registry and canonical source with English metadata', () => {
    const ids = Object.keys(iconSvgSources);
    validateIconMetadata(iconManifest, ids);
    expect(Object.keys(iconComponents).sort()).toEqual(ids.sort());
    for (const icon of iconManifest) {
      expect(icon.componentName).toBe(iconComponents[icon.id].displayName);
      expect(iconCategories).toContain(icon.category);
      expect(validateIconSvg(iconSvgSources[icon.id]).paths.length).toBeGreaterThan(0);
    }
    expect(() => validateIconMetadata(iconManifest.slice(1), ids)).toThrow('Missing metadata');
    expect(() => validateIconMetadata([...iconManifest, iconManifest[0]!], ids)).toThrow(
      'duplicate',
    );
    expect(() =>
      validateIconMetadata(
        [{ ...iconManifest[0]!, aliases: ['settings'] }, ...iconManifest.slice(1)],
        ids,
      ),
    ).toThrow('conflict');
    expect(() =>
      validateIconMetadata(
        [{ ...iconManifest[0]!, tags: ['中文'] }, ...iconManifest.slice(1)],
        ids,
      ),
    ).toThrow('English');
    expect(() =>
      validateIconMetadata(
        [{ ...iconManifest[0]!, aliases: ['gear'] }, ...iconManifest.slice(1)],
        ids,
      ),
    ).toThrow('conflict');
  });
  it('searches canonical names, component names, aliases, categories, and tags with AND tokens', () => {
    for (const query of [
      'settings',
      'SettingsIcon',
      'gear',
      'cog',
      'preferences',
      'system preferences',
    ])
      expect(searchIcons(iconManifest, query).map((icon) => icon.id)).toContain('settings');
    expect(searchIcons(iconManifest, 'settings', { category: 'actions' })).toEqual([]);
    expect(searchIcons(iconManifest, '  ＣＯＧ  ').map((icon) => icon.id)).toEqual([
      'settings',
      'settings-filled',
    ]);
    expect(searchIcons(iconManifest, 'nonsense')).toEqual([]);
  });
  it('validates a uniform metadata shape and implemented animation support', () => {
    const candidates = iconManifest.filter((icon) => icon.animated);
    expect(candidates.filter((icon) => icon.variant === 'outline').map((icon) => icon.id)).toEqual([
      'arrow-down',
      'arrow-left',
      'arrow-right',
      'arrow-up',
      'bell',
      'bot',
      'check',
      'chevron-down',
      'chevron-left',
      'chevron-right',
      'chevron-up',
      'chevrons-down',
      'chevrons-left',
      'chevrons-right',
      'chevrons-up',
      'close',
      'code',
      'copy',
      'cybertruck',
      'download',
      'external-link',
      'eye',
      'gauge',
      'globe',
      'layers',
      'lock',
      'moon',
      'pin',
      'search',
      'settings',
      'shapes',
      'sun',
      'trash',
      'upload',
    ]);
    expect(
      candidates.filter((icon) => icon.variant === 'filled').map((icon) => icon.family),
    ).toEqual([
      'bell',
      'bot',
      'eye',
      'gauge',
      'layers',
      'lock',
      'moon',
      'pin',
      'settings',
      'shapes',
      'sun',
      'trash',
    ]);
    expect(iconManifest.every((icon) => typeof icon.animated === 'boolean')).toBe(true);
    for (const icon of iconManifest)
      expect(Object.keys(icon)).toEqual(Object.keys(iconManifest[0]!));
    const invalid = { ...iconManifest[0]!, animated: 'true' } as unknown as IconMetadata;
    expect(() =>
      validateIconMetadata(
        [invalid, ...iconManifest.slice(1)],
        iconManifest.map((icon) => icon.id),
      ),
    ).toThrow('Invalid metadata');
  });
  it('keeps the manifest and filtered results in canonical A–Z order without mutating input', () => {
    const sortedIds = (records: readonly { id: string }[]) =>
      records
        .map((icon) => icon.id)
        .sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base', numeric: true }));
    expect(iconManifest.map((icon) => icon.id)).toEqual(sortedIds(iconManifest));
    const reversed = [...iconManifest].reverse();
    const original = [...reversed];
    expect(searchIcons(reversed, '').map((icon) => icon.id)).toEqual(sortedIds(iconManifest));
    for (const category of iconCategories) {
      const expected = sortedIds(iconManifest.filter((icon) => icon.category === category));
      expect(searchIcons(reversed, '', { category }).map((icon) => icon.id)).toEqual(expected);
    }
    const arrows = searchIcons(reversed, 'arrow');
    expect(arrows.length).toBeGreaterThan(1);
    expect(arrows.map((icon) => icon.id)).toEqual(sortedIds(arrows));
    expect(reversed).toEqual(original);
  });
  it('exposes independent package entrypoints and keeps sideEffects false', async () => {
    const pkg = JSON.parse(await readFile('packages/icons/package.json', 'utf8'));
    expect(pkg.sideEffects).toBe(false);
    for (const entry of ['.', './metadata', './assets', './registry', './tooling'])
      expect(pkg.exports[entry].import).toMatch(/^\.\/dist\/.*\.js$/);
    expect(pkg.exports['./svg/*']).toBe('./icons/*');
    expect(await readFile('packages/icons/src/index.ts', 'utf8')).not.toMatch(
      /manifest|registry|tooling|assets/,
    );
  });
});
