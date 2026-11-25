import { render } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';

import { iconSvgSources } from './assets';
import * as exports from './index';
import { iconManifest, type IconMetadata, searchIcons, validateIconMetadata } from './metadata';
import { iconComponents } from './registry';
import { iconComponentName, validateIconSvg } from './tooling';

const dualFamilies = [
  'bell',
  'bot',
  'briefcase',
  'calendar',
  'clock',
  'cloud',
  'circle-check',
  'circle-info',
  'circle-x',
  'triangle-alert',
  'dashboard',
  'database',
  'file-text',
  'folder',
  'filter',
  'form',
  'gauge',
  'home',
  'layers',
  'layout',
  'widgets',
  'eye',
  'eye-closed',
  'lock',
  'unlock',
  'mail',
  'mail-open',
  'pin',
  'unpin',
  'microphone',
  'monitor',
  'monitor-plug',
  'network-neighborhood',
  'sun',
  'moon',
  'play',
  'pause',
  'stop',
  'palette',
  'receipt',
  'settings',
  'shapes',
  'shirt',
  'studio-tools',
  'trash',
  'user',
  'users',
] as const;

const filledDefaults = ['apple', 'linux', 'twitter', 'windows', 'x-twitter'];

describe('Outline / Filled families', () => {
  it('provides the intended paired variants and canonical filled icons', () => {
    expect(
      iconManifest
        .filter((icon) => icon.variant === 'filled' && icon.id !== icon.family)
        .map((icon) => icon.family)
        .sort(),
    ).toEqual([...dualFamilies].sort());
    expect(
      iconManifest
        .filter((icon) => icon.variant === 'filled' && icon.id === icon.family)
        .map((icon) => icon.id)
        .sort(),
    ).toEqual(filledDefaults);
    for (const icon of iconManifest) {
      const variants = iconManifest.filter((item) => item.family === icon.family);
      expect(variants).toHaveLength(dualFamilies.some((family) => family === icon.family) ? 2 : 1);
      expect(variants.find((item) => item.id === icon.family)?.variant).toBe(
        filledDefaults.includes(icon.family) ? 'filled' : 'outline',
      );
    }
  });

  it.each(dualFamilies)(
    'exports distinct canonical geometry for %s with explicit React names',
    (family) => {
      const filledId = `${family}-filled` as const;
      const name = iconComponentName(family);
      const filledName = iconComponentName(filledId);
      expect(exports).toHaveProperty(name, iconComponents[family]);
      expect(exports).toHaveProperty(filledName, iconComponents[filledId]);
      expect(validateIconSvg(iconSvgSources[family]).paths).not.toEqual(
        validateIconSvg(iconSvgSources[filledId]).paths,
      );
      const FilledIcon = iconComponents[filledId];
      const ref = createRef<SVGSVGElement>();
      const { container } = render(<FilledIcon size={20} aria-label={filledName} ref={ref} />);
      expect(ref.current).toBe(container.querySelector('svg'));
      expect(ref.current).toHaveAttribute('viewBox', '0 0 24 24');
      expect(ref.current).toHaveAttribute('fill', 'currentColor');
      expect(ref.current).not.toHaveAttribute('aria-hidden');
      expect(ref.current).toHaveAttribute('width', '20');
      expect(ref.current?.querySelector('animate, animateTransform')).toBeNull();
      expect(exports).not.toHaveProperty('Icon');
    },
  );

  it.each([
    ['sun', 'M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Z'],
    ['play', 'M8 4.25h1l11 7.25v1L9 19.75H8l-.5-.5v-14z'],
    ['stop', 'M6 5h12l1 1v12l-1 1H6l-1-1V6z'],
  ] as const)('preserves the old %s solid silhouette in its Filled variant', (family, d) => {
    expect(validateIconSvg(iconSvgSources[`${family}-filled`]).paths[0]?.d).toBe(d);
    const outline = validateIconSvg(iconSvgSources[family]).paths[0]!;
    expect(outline.fillRule).toBe('evenodd');
    expect(outline.d.toLowerCase().match(/m/g)).toHaveLength(2);
  });

  it.each(['moon', 'pause'] as const)('keeps the %s outer contour across variants', (family) => {
    const outline = validateIconSvg(iconSvgSources[family]).paths[0]!;
    const filled = validateIconSvg(iconSvgSources[`${family}-filled`]).paths[0]!;
    expect(outline.fillRule).toBe('evenodd');
    expect(outline.d.startsWith(filled.d + ' M')).toBe(true);
  });

  it.each([
    { family: undefined },
    { family: 'Bad_Name' },
    { family: 'missing' },
    { family: 'sun' },
    { variant: 'regular' },
    { variant: 'filled' },
  ])('rejects invalid family relationships before generation: %j', (change) => {
    const records = iconManifest.map((icon) =>
      icon.id === 'bell' ? { ...icon, ...change } : icon,
    ) as IconMetadata[];
    expect(() =>
      validateIconMetadata(
        records,
        iconManifest.map((icon) => icon.id),
      ),
    ).toThrow('family / variant');
  });

  it('searches family terms and inherited aliases while respecting variant queries', () => {
    expect(searchIcons(iconManifest, 'cog').map((icon) => icon.id)).toEqual([
      'settings',
      'settings-filled',
    ]);
    expect(searchIcons(iconManifest, 'sun outline').map((icon) => icon.id)).toEqual(['sun']);
    expect(searchIcons(iconManifest, 'sun filled').map((icon) => icon.id)).toEqual(['sun-filled']);
  });
  it('rejects animation metadata that splits a family into animated and static variants', () => {
    const records = iconManifest.map((icon) =>
      icon.id === 'sun-filled' ? { ...icon, animated: false } : icon,
    );
    expect(() =>
      validateIconMetadata(
        records,
        iconManifest.map((icon) => icon.id),
      ),
    ).toThrow('Animation metadata must agree within family: sun');
  });
});
