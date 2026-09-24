import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import {
  BotIcon,
  ChevronsDownIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  ChevronsUpIcon,
  DashboardIcon,
  EllipsisIcon,
  EllipsisVerticalIcon,
  EyeClosedIcon,
  EyeIcon,
  GaugeIcon,
  GlobeIcon,
  HomeIcon,
  PlusIcon,
  SidebarCollapseIcon,
  SidebarExpandIcon,
  WorkspaceIcon,
} from './index';

const addedIcons = [
  ['sidebar-collapse', SidebarCollapseIcon],
  ['sidebar-expand', SidebarExpandIcon],
  ['ellipsis', EllipsisIcon],
  ['ellipsis-vertical', EllipsisVerticalIcon],
  ['workspace', WorkspaceIcon],
  ['home', HomeIcon],
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
] as const;

describe('@virgo-design/icons', () => {
  it('uses Node-compatible ESM specifiers in the generated public index', async () => {
    const indexSource = await readFile(resolve('packages/icons/src/index.ts'), 'utf8');

    expect(indexSource).toContain("from './generated/ChevronDownIcon.js';");
    expect(indexSource).toContain("from './generated/ChevronLeftIcon.js';");
    expect(indexSource).toContain("from './generated/ChevronRightIcon.js';");
    expect(indexSource).toContain("from './generated/ChevronUpIcon.js';");
    expect(indexSource).toContain("from './generated/CheckIcon.js';");
    expect(indexSource).toContain("from './generated/CybertruckIcon.js';");
    expect(indexSource).toContain("from './generated/InfoIcon.js';");
    expect(indexSource).toContain("from './generated/CloseIcon.js';");
    expect(indexSource).toContain("from './generated/MinusIcon.js';");
    expect(indexSource).toContain("from './generated/PlusIcon.js';");
    expect(indexSource).toContain("from './generated/SearchIcon.js';");
    expect(indexSource).toContain("from './generated/SettingsIcon.js';");
    expect(indexSource).toContain("from './generated/TrashIcon.js';");
    expect(indexSource).toContain("from './generated/UserIcon.js';");
    for (const [, Icon] of addedIcons) {
      expect(indexSource).toContain(`from './generated/${Icon.name}.js';`);
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

  it('does not expose strokeWidth for fill-only icons', () => {
    // @ts-expect-error Fill-only icons do not support strokeWidth.
    const icon = <PlusIcon strokeWidth={1.5} />;

    expect(icon).toBeDefined();
  });
});
