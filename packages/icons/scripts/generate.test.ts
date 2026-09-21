import { readdir, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { describe, expect, it } from 'vitest';

import { generateIconComponent } from './generate';

describe('icons generator', () => {
  it('generates all twenty-six canonical SVG assets without losing geometry', async () => {
    const iconDirectory = resolve('packages/icons/icons');
    const files = (await readdir(iconDirectory))
      .filter((fileName) => fileName.endsWith('.svg'))
      .sort();

    expect(files).toEqual([
      'bot.svg',
      'check.svg',
      'chevron-down.svg',
      'chevron-left.svg',
      'chevron-right.svg',
      'chevron-up.svg',
      'chevrons-down.svg',
      'chevrons-left.svg',
      'chevrons-right.svg',
      'chevrons-up.svg',
      'close.svg',
      'cybertruck.svg',
      'dashboard.svg',
      'eye-closed.svg',
      'eye.svg',
      'gauge.svg',
      'globe.svg',
      'home.svg',
      'info.svg',
      'minus.svg',
      'plus.svg',
      'search.svg',
      'settings.svg',
      'trash.svg',
      'user.svg',
      'workspace.svg',
    ]);

    await Promise.all(
      files.map(async (fileName) => {
        const source = await readFile(resolve(iconDirectory, fileName), 'utf8');

        expect(source).toContain('fill="currentColor"');
        expect(source).toContain('viewBox="0 0 24 24"');
        expect(source).not.toMatch(/\s(?:width|height)="/);
        expect(source).not.toMatch(/\sstroke="(?!none")/);
        expect(source).not.toMatch(/\stransform=/);

        const output = generateIconComponent(fileName, source);
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

  it('generates a fill-only Plus React layer from the canonical SVG asset', async () => {
    const source = await readFile(resolve('packages/icons/icons/plus.svg'), 'utf8');
    const output = generateIconComponent('plus.svg', source);

    expect(output).toContain('export function PlusIcon');
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

    expect(output).toContain('export function FilledSampleIcon');
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

  it('retains controlled stroke width for stroked icons', () => {
    const output = generateIconComponent(
      'stroke-sample.svg',
      '<svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24"><path d="M4 12h16" /></svg>',
    );

    expect(output).toContain('export function StrokeSampleIcon');
    expect(output).toContain('strokeLinecap="round"');
    expect(output).toContain('strokeLinejoin="round"');
    expect(output).toContain('strokeWidth?: number;');
    expect(output).toContain('strokeWidth={strokeWidth}');
    expect(output).toContain('strokeWidth = 1.5');
  });
});
