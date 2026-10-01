import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, expectTypeOf, it } from 'vitest';

import {
  BotIcon,
  CalendarIcon,
  type CheckIconProps,
  ChevronsDownIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  ChevronsUpIcon,
  CircleCheckIcon,
  CircleInfoIcon,
  CircleXIcon,
  ClockIcon,
  CodeIcon,
  CopyIcon,
  DashboardIcon,
  EllipsisIcon,
  EllipsisVerticalIcon,
  ExternalLinkIcon,
  EyeClosedIcon,
  EyeIcon,
  GaugeIcon,
  GithubIcon,
  GlobeIcon,
  HomeIcon,
  type IconAnimation,
  type IconProps,
  LanguageEnIcon,
  LanguageZhIcon,
  LayersIcon,
  LayoutIcon,
  LockIcon,
  MicrophoneIcon,
  MoonIcon,
  PaletteIcon,
  PauseIcon,
  PinIcon,
  PlayIcon,
  PlusIcon,
  type PlusIconProps,
  ShapesIcon,
  SidebarCollapseIcon,
  SidebarExpandIcon,
  SplineIcon,
  StopIcon,
  SunIcon,
  TriangleAlertIcon,
  TypeIcon,
  UnlockIcon,
  UnpinIcon,
} from './index';

const addedIcons = [
  ['calendar', CalendarIcon],
  ['clock', ClockIcon],
  ['stop', StopIcon],
  ['microphone', MicrophoneIcon],
  ['play', PlayIcon],
  ['pause', PauseIcon],
  ['github', GithubIcon],
  ['code', CodeIcon],
  ['copy', CopyIcon],
  ['circle-check', CircleCheckIcon],
  ['circle-info', CircleInfoIcon],
  ['circle-x', CircleXIcon],
  ['triangle-alert', TriangleAlertIcon],
  ['sidebar-collapse', SidebarCollapseIcon],
  ['sidebar-expand', SidebarExpandIcon],
  ['ellipsis', EllipsisIcon],
  ['ellipsis-vertical', EllipsisVerticalIcon],
  ['external-link', ExternalLinkIcon],
  ['layout', LayoutIcon],
  ['palette', PaletteIcon],
  ['type', TypeIcon],
  ['layers', LayersIcon],
  ['spline', SplineIcon],
  ['shapes', ShapesIcon],
  ['home', HomeIcon],
  ['moon', MoonIcon],
  ['eye', EyeIcon],
  ['eye-closed', EyeClosedIcon],
  ['dashboard', DashboardIcon],
  ['gauge', GaugeIcon],
  ['globe', GlobeIcon],
  ['bot', BotIcon],
  ['chevrons-left', ChevronsLeftIcon],
  ['chevrons-right', ChevronsRightIcon],
  ['chevrons-up', ChevronsUpIcon],
  ['chevrons-down', ChevronsDownIcon],
  ['sun', SunIcon],
  ['language-en', LanguageEnIcon],
  ['language-zh', LanguageZhIcon],
  ['lock', LockIcon],
  ['unlock', UnlockIcon],
  ['pin', PinIcon],
  ['unpin', UnpinIcon],
] as const;

describe('@virgo-design/icons', () => {
  it('exports shared IconProps and adds playback only to supported icon props', () => {
    expectTypeOf<PlusIconProps>().toEqualTypeOf<IconProps>();
    expectTypeOf<CheckIconProps>().toEqualTypeOf<IconProps & { animated?: IconAnimation }>();
    expectTypeOf<IconProps['size']>().toEqualTypeOf<number | undefined>();
    expectTypeOf<IconProps>().toHaveProperty('aria-label');
    expectTypeOf<IconProps>().toHaveProperty('className');
    expectTypeOf<IconProps>().toHaveProperty('style');
    expectTypeOf<IconProps>().toHaveProperty('onClick');
    expectTypeOf<IconProps>().not.toHaveProperty('animated');
    expectTypeOf<IconProps>().not.toHaveProperty('strokeWidth');
    expectTypeOf<IconProps>().not.toHaveProperty('fill');
    expectTypeOf<IconProps>().not.toHaveProperty('viewBox');
    expectTypeOf<IconProps>().not.toHaveProperty('width');
    expectTypeOf<IconProps>().not.toHaveProperty('height');
    expectTypeOf<IconProps>().not.toHaveProperty('children');
    expectTypeOf<IconProps>().not.toHaveProperty('ref');
  });

  it('uses Node-compatible ESM specifiers in the generated public index', async () => {
    const indexSource = await readFile(resolve('packages/icons/src/index.ts'), 'utf8');

    expect(indexSource).toContain("from './generated/ChevronDownIcon.js';");
    expect(indexSource).toContain("from './generated/ChevronLeftIcon.js';");
    expect(indexSource).toContain("from './generated/ChevronRightIcon.js';");
    expect(indexSource).toContain("from './generated/ChevronUpIcon.js';");
    expect(indexSource).toContain("from './generated/CheckIcon.js';");
    expect(indexSource).toContain("from './generated/CybertruckIcon.js';");
    expect(indexSource).toContain("from './generated/CloseIcon.js';");
    expect(indexSource).toContain("from './generated/MinusIcon.js';");
    expect(indexSource).toContain("from './generated/PlusIcon.js';");
    expect(indexSource).toContain("from './generated/SearchIcon.js';");
    expect(indexSource).toContain("from './generated/SettingsIcon.js';");
    expect(indexSource).toContain("from './generated/TrashIcon.js';");
    expect(indexSource).toContain("from './generated/UserIcon.js';");
    for (const [, Icon] of addedIcons) {
      expect(indexSource).toContain(`from './generated/${Icon.displayName}.js';`);
    }
    // Kebab-case filename order differs from the case-insensitive public export order.
    expect(indexSource.indexOf("from './generated/ChevronsUpIcon.js';")).toBeLessThan(
      indexSource.indexOf("from './generated/ChevronUpIcon.js';"),
    );
  });

  it.each(addedIcons)(
    'exports %s with its canonical geometry at 24px and 20px',
    async (id, Icon) => {
      const source = await readFile(resolve(`packages/icons/icons/${id}.svg`), 'utf8');
      const canonical = new DOMParser().parseFromString(source, 'image/svg+xml');
      const { rerender } = render(<Icon data-testid="icon" />);

      for (const size of [24, 20]) {
        if (size === 20) rerender(<Icon data-testid="icon" size={20} />);
        const icon = screen.getByTestId('icon');
        expect(icon).toHaveAttribute('viewBox', '0 0 24 24');
        expect(icon).toHaveAttribute('fill', 'currentColor');
        expect(icon).toHaveAttribute('width', String(size));
        expect(icon).toHaveAttribute('height', String(size));
        expect(icon).not.toHaveAttribute('stroke');
        expect(icon).not.toHaveAttribute('stroke-width');
        expect(icon.querySelector('[stroke], [stroke-width], [transform]')).toBeNull();
        const paths = [...icon.querySelectorAll('path')];
        const canonicalPaths = [...canonical.querySelectorAll('path')];
        expect(paths).toHaveLength(canonicalPaths.length);
        paths.forEach((path, index) => {
          expect(path.getAttribute('d')).toBe(canonicalPaths[index]?.getAttribute('d'));
          expect(path.getAttribute('fill-rule')).toBe(
            canonicalPaths[index]?.getAttribute('fill-rule'),
          );
        });
      }
    },
  );

  it.each([
    ['code', CodeIcon],
    ['copy', CopyIcon],
  ] as const)('supports small toolbar sizes and accessible SVG props for %s', (_id, Icon) => {
    const { rerender } = render(<Icon data-testid="toolbar-icon" aria-hidden="true" />);

    for (const size of [14, 16, 20, 24, 32]) {
      rerender(
        <Icon
          data-testid="toolbar-icon"
          size={size}
          className="toolbar-glyph"
          aria-hidden="true"
        />,
      );
      const icon = screen.getByTestId('toolbar-icon');
      expect(icon).toHaveAttribute('width', String(size));
      expect(icon).toHaveAttribute('height', String(size));
      expect(icon).toHaveAttribute('aria-hidden', 'true');
      expect(icon).toHaveClass('toolbar-glyph');
      expect(icon).not.toHaveAttribute('tabindex');
    }

    rerender(<Icon data-testid="toolbar-icon" role="img" aria-label="Documentation action" />);
    expect(screen.getByRole('img', { name: 'Documentation action' })).toBeInTheDocument();
  });

  it('exports PlusIcon with canonical SVG defaults', () => {
    render(<PlusIcon data-testid="plus-icon" />);

    const icon = screen.getByTestId('plus-icon');
    expect(icon).toHaveAttribute('fill', 'currentColor');
    expect(icon).toHaveAttribute('stroke', 'none');
    expect(icon).not.toHaveAttribute('stroke-linecap');
    expect(icon).not.toHaveAttribute('stroke-width');
    expect(icon).toHaveAttribute('viewBox', '0 0 24 24');
    expect(icon).toHaveAttribute('width', '24');
    expect(icon).toHaveAttribute('height', '24');
    expect(icon.querySelector('path')).toHaveAttribute('d', expect.stringContaining('M11.5 3.5'));
  });

  it('accepts size and standard SVG props', () => {
    render(<PlusIcon aria-label="Add" className="custom-plus" data-testid="plus-icon" size={20} />);

    const icon = screen.getByTestId('plus-icon');
    expect(icon).toHaveAccessibleName('Add');
    expect(icon).toHaveClass('custom-plus');
    expect(icon).toHaveAttribute('width', '20');
    expect(icon).toHaveAttribute('height', '20');
  });

  it('forwards a React ref to the SVG element', () => {
    const ref = createRef<SVGSVGElement>();
    render(<PlusIcon ref={ref} data-testid="ref-icon" />);
    expect(ref.current).toBe(screen.getByTestId('ref-icon'));
  });

  it('does not expose strokeWidth for fill-only icons', () => {
    // @ts-expect-error Fill-only icons do not support strokeWidth.
    const icon = <PlusIcon strokeWidth={1.5} />;

    expect(icon).toBeDefined();
  });
});
