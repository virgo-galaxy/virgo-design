import { describe, expect, it } from 'vitest';

import { createIconAnimation } from '../scripts/animations';
import { createAnimatedSvg } from '../scripts/svg-animation';
import { getIconSvg, iconSvgSources } from './assets';
import { iconManifest } from './metadata';
import { validateIconSvg } from './tooling';

describe('standalone SVG exports', () => {
  it.each(iconManifest)(
    '$id preserves canonical geometry or exports its authored playback',
    (icon) => {
      const source = iconSvgSources[icon.id];
      const definition = validateIconSvg(source);
      expect(getIconSvg(icon.id)).toBe(source);
      for (const disabled of [false, 0, -1, 0.5, Infinity, NaN])
        expect(getIconSvg(icon.id, disabled)).toBe(source);
      const animation = createIconAnimation(icon.id, definition);
      if (!animation) {
        for (const mode of [true, 3, 'always'] as const)
          expect(getIconSvg(icon.id, mode)).toBe(source);
        return;
      }
      expect(getIconSvg(icon.id, 'always')).toBe(createAnimatedSvg(definition, animation));
      for (const [mode, repeat] of [
        [true, '1'],
        [3, '3'],
        ['always', 'indefinite'],
      ] as const) {
        const svg = new DOMParser().parseFromString(getIconSvg(icon.id, mode), 'image/svg+xml');
        expect(svg.querySelector('parsererror')).toBeNull();
        expect(svg.documentElement.getAttribute('viewBox')).toBe('0 0 24 24');
        expect(svg.documentElement.getAttribute('fill')).toBe('currentColor');
        expect(svg.querySelector('script, foreignObject, use')).toBeNull();
        const tracks = [...svg.querySelectorAll('animate, animateTransform')];
        expect(tracks).toHaveLength(animation.tracks.length);
        for (const track of animation.tracks) {
          const node = tracks.find(
            (item) => item.getAttribute('values') === track.values.join(';'),
          );
          expect(node?.getAttribute('attributeName')).toBe(track.attribute);
          expect(node?.getAttribute('type')).toBe(track.transform ?? null);
          expect(node?.getAttribute('dur')).toBe(`${animation.duration}ms`);
          expect(node?.getAttribute('repeatCount')).toBe(repeat);
          expect(node?.getAttribute('begin')).toBe('0s');
          expect(node?.getAttribute('keyTimes')).toBe(
            (track.times ?? [0, 0.35, 0.75, 1]).join(';'),
          );
        }
        const resting = [...svg.querySelectorAll('[data-virgo-rest] > path')];
        expect(resting.map((path) => path.getAttribute('d'))).toEqual(
          definition.paths.map((path) => path.d),
        );
        expect(resting.map((path) => path.getAttribute('fill-rule'))).toEqual(
          definition.paths.map((path) => path.fillRule ?? null),
        );
        expect(svg.querySelector('style')?.textContent).toContain('prefers-reduced-motion:reduce');
      }
    },
  );
  it('keeps scale transforms centered and draw animations in filled geometry', () => {
    const search = new DOMParser().parseFromString(getIconSvg('search', true), 'image/svg+xml');
    const scale = search.querySelector('animateTransform[type="scale"]');
    expect(scale?.parentElement?.parentElement?.getAttribute('transform')).toBe('translate(12 12)');
    expect(scale?.nextElementSibling?.getAttribute('transform')).toBe('translate(-12 -12)');
    for (const id of ['check', 'close'] as const) {
      const source = getIconSvg(id, true);
      expect(source).toContain('attributeName="d"');
      expect(source).not.toMatch(/stroke|strokeWidth/);
    }
  });
});
