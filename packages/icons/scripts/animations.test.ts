import { readFile } from 'node:fs/promises';

import { describe, expect, it } from 'vitest';

import type { IconAnimationDefinition } from '../src/animation-contract';
import { iconManifest } from '../src/metadata';
import { validateIconSvg } from '../src/tooling';
import { createIconAnimation, validateIconAnimation } from './animations';

describe('generated animation definitions', () => {
  it.each(iconManifest.filter((icon) => icon.variant === 'filled'))(
    '$family shares animation capability, duration and playback timing across its variants',
    async (icon) => {
      const outline = iconManifest.find((item) => item.id === icon.family)!;
      expect(icon.animated).toBe(outline.animated);
      const motion = async (id: string) =>
        createIconAnimation(
          id,
          validateIconSvg(await readFile(`packages/icons/icons/${id}.svg`, 'utf8')),
        );
      const regular = await motion(outline.id);
      const filled = await motion(icon.id);
      expect(filled?.duration).toBe(regular?.duration);
      expect(filled?.tracks.map((track) => track.times)).toEqual(
        regular?.tracks.map((track) => track.times),
      );
      if (icon.family !== 'gauge') expect(filled).toEqual(regular);
      else {
        expect(filled?.tracks[0]?.attribute).toBe('d');
        const dial = validateIconSvg(
          await readFile('packages/icons/icons/gauge-filled.svg', 'utf8'),
        ).paths[0]!.d.split(' M16.75')[0]!;
        for (const pose of filled!.tracks[0]!.values) expect(pose).toContain(dial);
        expect(new Set(filled!.tracks[0]!.values).size).toBeGreaterThan(1);
      }
    },
  );
  it.each(iconManifest)('$id animation capability agrees with implementation', async (icon) => {
    const definition = validateIconSvg(
      await readFile(`packages/icons/icons/${icon.id}.svg`, 'utf8'),
    );
    const animation = createIconAnimation(icon.id, definition);
    expect(Boolean(animation)).toBe(icon.animated);
    if (animation) expect(() => validateIconAnimation(animation, definition)).not.toThrow();
    for (const track of animation?.tracks ?? []) {
      if (track.attribute !== 'd' || !icon.id.startsWith('chevron-')) continue;
      const first = track.values[0]!.match(/-?\d+(?:\.\d+)?/g)!.map(Number);
      const opposite = track.values[1]!.match(/-?\d+(?:\.\d+)?/g)!.map(Number);
      const signedArea = (points: number[]) =>
        points.reduce(
          (sum, value, index) =>
            index % 2
              ? sum
              : sum +
                value * points[(index + 3) % points.length]! -
                points[(index + 2) % points.length]! * points[index + 1]!,
          0,
        ) / 2;
      const originalArea = signedArea(first);
      // Every intermediate fold preserves winding, nonzero visual weight, and canvas bounds.
      for (let step = 0; step <= 20; step++) {
        const pose = first.map((value, index) => value + ((opposite[index]! - value) * step) / 20);
        expect(Math.sign(signedArea(pose))).toBe(Math.sign(originalArea));
        expect(Math.abs(signedArea(pose))).toBeGreaterThan(Math.abs(originalArea) * 0.3);
        expect(pose.every((value) => value >= 0 && value <= 24)).toBe(true);
      }
    }
  });
  it('rejects invalid timing, path references, duplicates, values and morph topology', () => {
    const definition = validateIconSvg(
      '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 4h16v16H4z" /></svg>',
    );
    const valid = {
      duration: 1200,
      tracks: [{ path: 0, attribute: 'opacity', values: ['1', '0', '1', '1'] }],
    } as const;
    const invalid: IconAnimationDefinition[] = [
      { ...valid, duration: NaN },
      { ...valid, duration: 0 },
      { ...valid, tracks: [{ ...valid.tracks[0], path: 1 }] },
      { ...valid, tracks: [valid.tracks[0], valid.tracks[0]] },
      { ...valid, tracks: [{ ...valid.tracks[0], values: ['1', '2', '1', '1'] }] },
      { ...valid, tracks: [{ ...valid.tracks[0], times: [0, 0.5, 0.4, 1] }] },
      {
        ...valid,
        tracks: [
          {
            path: 0,
            attribute: 'd',
            values: ['M4 4L20 4Z', 'M4 4H20Z', 'M4 4L20 4Z', 'M4 4L20 4Z'],
          },
        ],
      },
    ];
    for (const animation of invalid)
      expect(() => validateIconAnimation(animation, definition)).toThrow();
  });
});
