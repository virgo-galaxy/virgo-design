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
  'circle-check',
  'circle-info',
  'circle-x',
  'triangle-alert',
  'dashboard',
  'database',
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
  'pin',
  'unpin',
  'microphone',
  'monitor',
  'sun',
  'moon',
  'play',
  'pause',
  'stop',
  'palette',
  'receipt',
  'settings',
  'shapes',
  'studio-tools',
  'trash',
  'user',
] as const;

describe('Outline / Filled families', () => {
  it('provides exactly the intended 37 pairs and keeps every other family single', () => {
    expect(
      iconManifest
        .filter((icon) => icon.variant === 'filled')
        .map((icon) => icon.family)
        .sort(),
    ).toEqual([...dualFamilies].sort());
    for (const icon of iconManifest) {
      const variants = iconManifest.filter((item) => item.family === icon.family);
      expect(variants).toHaveLength(dualFamilies.some((family) => family === icon.family) ? 2 : 1);
      expect(variants.filter((item) => item.variant === 'outline')).toHaveLength(1);
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
    ['moon', 'M8.648 3.648A9 9 0 1 0 20.352 15.352 9 9 0 0 1 8.648 3.648Z'],
    ['play', 'M8 4.25h1l11 7.25v1L9 19.75H8l-.5-.5v-14z'],
    ['pause', 'M7 4.5h2l.5.5v14l-.5.5H7l-.5-.5V5z M15 4.5h2l.5.5v14l-.5.5h-2l-.5-.5V5z'],
    ['stop', 'M6 5h12l1 1v12l-1 1H6l-1-1V6z'],
  ] as const)('preserves the old %s solid silhouette in its Filled variant', (family, d) => {
    expect(validateIconSvg(iconSvgSources[`${family}-filled`]).paths[0]?.d).toBe(d);
    const outline = validateIconSvg(iconSvgSources[family]).paths[0]!;
    expect(outline.fillRule).toBe('evenodd');
    expect(outline.d.toLowerCase().match(/m/g)).toHaveLength(family === 'pause' ? 4 : 2);
  });

  it.each([
    { family: undefined },
    { family: 'Bad_Name' },
    { family: 'missing' },
    { family: 'bell' },
    { variant: 'regular' },
    { variant: 'filled' },
  ])('rejects invalid family relationships before generation: %j', (change) => {
    const records = [
      { ...iconManifest[0]!, ...change },
      ...iconManifest.slice(1),
    ] as IconMetadata[];
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
