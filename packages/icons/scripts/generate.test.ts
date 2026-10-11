import { readdir, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { format } from 'prettier';
import { describe, expect, it } from 'vitest';

import { generateIconComponent } from './generate';

describe('icons generator', () => {
  it('generates all canonical SVG assets without losing geometry', async () => {
    const iconDirectory = resolve('packages/icons/icons');
    const files = (await readdir(iconDirectory))
      .filter((fileName) => fileName.endsWith('.svg'))
      .sort();

    const regularFiles = [
      'ai.svg',
      'align-center.svg',
      'align-left.svg',
      'align-right.svg',
      'arrow-down.svg',
      'arrow-enter.svg',
      'arrow-left.svg',
      'arrow-return.svg',
      'arrow-right.svg',
      'arrow-up.svg',
      'bell.svg',
      'bot.svg',
      'briefcase.svg',
      'calendar.svg',
      'chart-line.svg',
      'check.svg',
      'chevron-down.svg',
      'chevron-left.svg',
      'chevron-right.svg',
      'chevron-up.svg',
      'chevrons-down.svg',
      'chevrons-left.svg',
      'chevrons-right.svg',
      'chevrons-up.svg',
      'circle-check.svg',
      'circle-info.svg',
      'circle-x.svg',
      'clock.svg',
      'close.svg',
      'code.svg',
      'copy.svg',
      'cursor-arrow.svg',
      'cybertruck.svg',
      'dashboard.svg',
      'database.svg',
      'download.svg',
      'edit.svg',
      'ellipsis-vertical.svg',
      'ellipsis.svg',
      'external-link.svg',
      'eye-closed.svg',
      'eye.svg',
      'file-text.svg',
      'filter.svg',
      'form.svg',
      'gauge.svg',
      'github.svg',
      'globe.svg',
      'grip.svg',
      'home.svg',
      'language-en.svg',
      'language-zh.svg',
      'language.svg',
      'layers.svg',
      'layout.svg',
      'lock.svg',
      'log-out.svg',
      'maximize.svg',
      'microphone.svg',
      'minus.svg',
      'monitor.svg',
      'moon.svg',
      'move.svg',
      'palette.svg',
      'pause.svg',
      'pin.svg',
      'play.svg',
      'plus.svg',
      'receipt.svg',
      'reset.svg',
      'resize-corner-bottom-left.svg',
      'resize-corner-bottom-right.svg',
      'resize-corner-top-left.svg',
      'resize-corner-top-right.svg',
      'search.svg',
      'settings.svg',
      'shapes.svg',
      'shirt.svg',
      'sidebar-collapse.svg',
      'sidebar-expand.svg',
      'sort.svg',
      'sparkles.svg',
      'spline.svg',
      'stop.svg',
      'studio-tools.svg',
      'sun.svg',
      'trash.svg',
      'triangle-alert.svg',
      'type.svg',
      'unlock.svg',
      'unpin.svg',
      'upload.svg',
      'user.svg',
      'virgo-design.svg',
      'widgets.svg',
      'window-move.svg',
    ];
    const filledFamilies =
      'bell bot briefcase calendar circle-check circle-info circle-x triangle-alert dashboard database filter form gauge home layers layout widgets eye eye-closed lock unlock pin unpin microphone monitor sun moon play pause stop palette receipt settings shapes shirt studio-tools trash user'.split(
        ' ',
      );
    expect(files).toEqual(
      [...regularFiles, ...filledFamilies.map((id) => `${id}-filled.svg`)].sort(),
    );

    await Promise.all(
      files.map(async (fileName) => {
        const source = await readFile(resolve(iconDirectory, fileName), 'utf8');

        expect(source).toContain('fill="currentColor"');
        expect(source).toContain('viewBox="0 0 24 24"');
        expect(source).not.toMatch(/\s(?:width|height)="/);
        expect(source).not.toMatch(/\sstroke="(?!none")/);
        expect(source).not.toMatch(/\stransform=/);

        const output = generateIconComponent(fileName, source);
        expect(output).toContain("import type { IconProps } from '../icon-props.js';");
        expect(output).toMatch(/export type \w+IconProps = IconProps(?: &|;)/);
        expect(output).not.toContain('SVGProps<SVGSVGElement>');
        const paths = [...source.matchAll(/<path\s+([^>]+)\/>/g)];
        expect(paths.length).toBeGreaterThan(0);
        expect(output.match(/<path\s/g)).toHaveLength(paths.length);
        for (const [, attributes] of paths) {
          expect(attributes).toMatch(/^\s*(?:(?:d|fill-rule)="[^"]*"\s*)+$/);
          const geometry = attributes?.match(/\bd="([^"]+)"/)?.[1];
          expect(output).toContain(geometry);
        }
        expect(output).not.toContain('strokeWidth={strokeWidth}');
        expect(output.match(/fillRule="evenodd"/g)?.length ?? 0).toBe(
          source.match(/fill-rule="evenodd"/g)?.length ?? 0,
        );
      }),
    );
  });

  it.each([
    ['code.svg', 'CodeIcon'],
    ['copy.svg', 'CopyIcon'],
  ])(
    'keeps the committed %s React component in sync with its canonical SVG',
    async (fileName, componentName) => {
      const source = await readFile(resolve('packages/icons/icons', fileName), 'utf8');
      const generated = await readFile(
        resolve('packages/icons/src/generated', `${componentName}.tsx`),
        'utf8',
      );

      expect(generated).toBe(
        await format(generateIconComponent(fileName, source), {
          parser: 'typescript',
          singleQuote: true,
          printWidth: 100,
          trailingComma: 'all',
        }),
      );
    },
  );

  it('keeps both ellipses centered with identical regular hexagons and equal spacing', async () => {
    let referenceShape: number[][] | undefined;

    for (const fileName of ['ellipsis.svg', 'ellipsis-vertical.svg']) {
      const source = await readFile(resolve('packages/icons/icons', fileName), 'utf8');
      const paths = [...source.matchAll(/<path d="([^"]+)"/g)];
      expect(paths).toHaveLength(3);

      paths.forEach(([, geometry], index) => {
        const coordinates = geometry?.match(/-?\d+(?:\.\d+)?/g)?.map(Number) ?? [];
        expect(coordinates).toHaveLength(12);
        const points = Array.from({ length: 6 }, (_, vertex) => [
          coordinates[vertex * 2]!,
          coordinates[vertex * 2 + 1]!,
        ]);
        const center = [0, 1].map(
          (axis) => points.reduce((sum, point) => sum + point[axis]!, 0) / points.length,
        );
        const expectedCenter =
          fileName === 'ellipsis.svg' ? [5 + index * 7, 12] : [12, 5 + index * 7];
        center.forEach((coordinate, axis) =>
          expect(coordinate).toBeCloseTo(expectedCenter[axis]!, 6),
        );
        const shape = points.map((point) =>
          point.map((coordinate, axis) => Number((coordinate - center[axis]!).toFixed(3))),
        );
        referenceShape ??= shape;
        expect(shape).toEqual(referenceShape);
        points.forEach((point, vertex) => {
          const next = points[(vertex + 1) % points.length]!;
          expect(Math.hypot(next[0]! - point[0]!, next[1]! - point[1]!)).toBeCloseTo(2, 3);
          expect(Math.hypot(point[0]! - center[0]!, point[1]! - center[1]!)).toBeCloseTo(2, 3);
        });
      });
    }
  });

  it('generates a fill-only Plus React layer from the canonical SVG asset', async () => {
    const source = await readFile(resolve('packages/icons/icons/plus.svg'), 'utf8');
    const output = generateIconComponent('plus.svg', source);

    expect(output).toContain('export const PlusIcon');
    expect(output).toContain('fill="currentColor"');
    expect(output).toContain('stroke="none"');
    expect(output).toContain('viewBox="0 0 24 24"');
    expect(output).not.toContain('strokeLinecap=');
    expect(output).not.toContain('strokeLinejoin=');
    expect(output).not.toContain('strokeWidth={strokeWidth}');
    expect(output).not.toContain('strokeWidth?: number;');
    expect(output).toContain('d={');
    expect(output).toContain('M11.5 3.5');
  });

  it('accepts fill-only SVGs without stroke attributes and preserves multiple paths', () => {
    const output = generateIconComponent(
      'filled-sample.svg',
      '<svg fill="currentColor" viewBox="0 0 24 24"><path d="M4 4h6v6H4z" /><path d="M14 14h6v6h-6z" /></svg>',
    );

    expect(output).toContain('export const FilledSampleIcon');
    expect(output).toContain("<path d={'M4 4h6v6H4z'} />");
    expect(output).toContain("<path d={'M14 14h6v6h-6z'} />");
    expect(output).not.toContain('strokeWidth?: number;');
    expect(output).not.toContain('strokeWidth={strokeWidth}');
  });

  it('allows XML comments around canonical path geometry', () => {
    const output = generateIconComponent(
      'commented-sample.svg',
      `<svg fill="currentColor" viewBox="0 0 24 24">
        <!-- Preserve this intentional optical correction. -->
        <path d="M4 4h6v6H4z" />
        <!-- A comment may also appear between paths. -->
        <path d="M14 14h6v6h-6z" />
      </svg>`,
    );

    expect(output).toContain("<path d={'M4 4h6v6H4z'} />");
    expect(output).toContain("<path d={'M14 14h6v6h-6z'} />");
    expect(output).not.toContain('Preserve this intentional optical correction.');
  });

  it('still rejects unsupported SVG child elements', () => {
    expect(() =>
      generateIconComponent(
        'unsupported-sample.svg',
        '<svg fill="currentColor" viewBox="0 0 24 24"><path d="M4 4h6v6H4z" /><circle cx="12" cy="12" r="2" /></svg>',
      ),
    ).toThrow('Only self-closing <path> geometry is supported');
  });

  it('preserves path fill rules for canonical negative-space geometry', () => {
    const output = generateIconComponent(
      'negative-space.svg',
      '<svg fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M2 2h20v20H2z M8 8h8v8H8z" /></svg>',
    );

    expect(output).toContain('fillRule="evenodd"');
    expect(output).toContain("d={'M2 2h20v20H2z M8 8h8v8H8z'}");
  });

  it('rejects stroke-first sources rather than publishing strokeWidth API', () => {
    expect(() =>
      generateIconComponent(
        'stroke-sample.svg',
        '<svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M4 12h16" /></svg>',
      ),
    ).toThrow('currentColor');
  });
});
