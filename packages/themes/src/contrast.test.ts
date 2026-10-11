import { resolve } from 'node:path';

import { themeContract, tokenValues } from '@virgo-design/tokens';
import { compile } from 'sass';
import { describe, expect, it } from 'vitest';

import { themePresets } from './registry';

type RGBA = readonly [number, number, number, number];
function parts(text: string): string[] {
  let depth = 0,
    start = 0;
  const values: string[] = [];
  for (let i = 0; i < text.length; i++) {
    if (text[i] === '(') depth++;
    if (text[i] === ')') depth--;
    if (text[i] === ',' && !depth) {
      values.push(text.slice(start, i).trim());
      start = i + 1;
    }
  }
  return [...values, text.slice(start).trim()];
}
function resolveVars(text: string, values: Record<string, string>, seen: string[] = []): string {
  let start = text.indexOf('var(');
  while (start >= 0) {
    let end = start + 4,
      depth = 1;
    while (depth && end < text.length) {
      if (text[end] === '(') depth++;
      if (text[end] === ')') depth--;
      end++;
    }
    const [key, ...fallback] = parts(text.slice(start + 4, end - 1));
    if (seen.includes(key!)) throw new Error(`Cyclic token: ${key}`);
    const value = values[key!] && values[key!] !== 'initial' ? values[key!]! : fallback.join(',');
    if (!value) throw new Error(`Missing color: ${key}`);
    text = text.slice(0, start) + resolveVars(value, values, [...seen, key!]) + text.slice(end);
    start = text.indexOf('var(');
  }
  return text.trim();
}
function color(value: string): RGBA {
  if (value === 'transparent') return [0, 0, 0, 0];
  if (value === 'white') return [255, 255, 255, 1];
  if (value === 'black') return [0, 0, 0, 1];
  if (value.startsWith('#')) {
    let hex = value.slice(1);
    if (hex.length === 3 || hex.length === 4) hex = [...hex].map((x) => x + x).join('');
    return [
      parseInt(hex.slice(0, 2), 16),
      parseInt(hex.slice(2, 4), 16),
      parseInt(hex.slice(4, 6), 16),
      hex.length === 8 ? parseInt(hex.slice(6, 8), 16) / 255 : 1,
    ];
  }
  if (/^rgba?\(/.test(value)) {
    const numbers = value
      .slice(value.indexOf('(') + 1, -1)
      .replace(/[,/]/g, ' ')
      .trim()
      .split(/\s+/);
    const rgb = numbers.slice(0, 3).map((x) => parseFloat(x) * (x.endsWith('%') ? 2.55 : 1));
    const alpha = numbers[3] ? parseFloat(numbers[3]) * (numbers[3].endsWith('%') ? 0.01 : 1) : 1;
    return [rgb[0]!, rgb[1]!, rgb[2]!, alpha];
  }
  if (value.startsWith('color-mix(')) {
    const [space, left, right] = parts(value.slice(10, -1));
    if (space !== 'in srgb') throw new Error(`Unsupported color space: ${space}`);
    const weighted = (text: string) => {
      const match = /\s+([\d.]+)%$/.exec(text);
      return {
        color: color(match ? text.slice(0, match.index) : text),
        weight: match ? Number(match[1]) / 100 : undefined,
      };
    };
    const a = weighted(left!),
      b = weighted(right!),
      wa = a.weight ?? (b.weight === undefined ? 0.5 : 1 - b.weight),
      wb = b.weight ?? 1 - wa;
    const alpha = a.color[3] * wa + b.color[3] * wb;
    return [0, 1, 2]
      .map((i) =>
        alpha ? (a.color[i]! * a.color[3] * wa + b.color[i]! * b.color[3] * wb) / alpha : 0,
      )
      .concat(alpha) as unknown as RGBA;
  }
  throw new Error(`Unsupported resolved color: ${value}`);
}
function composite(a: RGBA, b: RGBA): RGBA {
  const alpha = a[3] + b[3] * (1 - a[3]);
  return [0, 1, 2]
    .map((i) => (a[i]! * a[3] + b[i]! * b[3] * (1 - a[3])) / alpha)
    .concat(alpha) as unknown as RGBA;
}
function luminance(rgb: RGBA) {
  const linear = rgb.slice(0, 3).map((x) => {
    const c = x / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return linear[0]! * 0.2126 + linear[1]! * 0.7152 + linear[2]! * 0.0722;
}
function ratio(foreground: RGBA, background: RGBA) {
  const a = luminance(composite(foreground, background)),
    b = luminance(background);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

it('uses WCAG sRGB contrast with alpha compositing and premultiplied CSS mixing', () => {
  expect(ratio(color('#fff'), color('#000'))).toBe(21);
  expect(ratio(color('#000'), color('#fff'))).toBe(21);
  expect(color('color-mix(in srgb, rgba(255, 0, 0, .5) 50%, #000)')).toEqual([85, 0, 0, 0.75]);
});

for (const { id } of themePresets) {
  const css = compile(resolve('packages/themes/src/themes', `${id}.scss`)).css;
  const firstBlock = css.slice(css.indexOf('{') + 1, css.indexOf('}'));
  const declarations = Object.fromEntries(
    [...firstBlock.matchAll(/(--vd-[\w-]+):\s*([^;]+);/g)].map((m) => [m[1]!, m[2]!.trim()]),
  );
  describe(`${id} semantic contrast`, () => {
    it.each(['light', 'dark'] as const)(
      '%s meets text, interaction and status pair thresholds',
      (appearance) => {
        const values: Record<string, string> = { ...tokenValues[appearance], ...themeContract };
        for (const [name, value] of Object.entries(declarations)) {
          if (name.startsWith(`--vd-theme-${appearance}-`))
            values[name.replace(`--vd-theme-${appearance}-`, '--vd-')] = value;
          else if (!name.startsWith('--vd-theme-')) values[name] = value;
        }
        const paint = (text: string) => color(resolveVars(text, values));
        const canvas = composite(
          paint('var(--vd-surface-background)'),
          color(appearance === 'light' ? '#fff' : '#000'),
        );
        const surface = composite(paint('var(--vd-surface-default)'), canvas);
        const check = (name: string, foreground: string, background: string, minimum = 4.5) => {
          const actual = ratio(paint(foreground), composite(paint(background), surface));
          expect(
            actual,
            `${id}/${appearance}/${name}: ${actual.toFixed(3)}:1`,
          ).toBeGreaterThanOrEqual(minimum);
        };
        check('text/background', 'var(--vd-text-primary)', 'var(--vd-surface-background)');
        check('muted/surface', 'var(--vd-text-secondary)', 'var(--vd-surface-default)');
        check('primary/foreground', 'var(--vd-brand-foreground)', 'var(--vd-brand-primary)');
        check('selected/foreground', 'var(--vd-text-primary)', 'var(--vd-fill-selected)');
        for (const state of ['hover', 'selected'])
          check(
            `option-${state}`,
            `var(--vd-option-${state}-foreground,var(--vd-text-primary))`,
            `var(--vd-option-${state}-background,var(--vd-control-hover-background,color-mix(in srgb,var(--vd-text-primary) 3%,var(--vd-surface-elevated))))`,
          );
        check('focus/surface', 'var(--vd-border-focus)', 'var(--vd-surface-default)', 3);
        expect(parseFloat(values['--vd-focus-width']!)).toBeGreaterThanOrEqual(2);
        for (const status of ['success', 'warning', 'danger', 'info']) {
          check(
            `${status}-solid`,
            `var(--vd-status-${status}-on-solid)`,
            `var(--vd-status-${status}-solid)`,
          );
          check(
            `${status}-subtle`,
            `var(--vd-status-${status}-text)`,
            `var(--vd-status-${status}-subtle)`,
          );
        }
      },
    );
  });
}
