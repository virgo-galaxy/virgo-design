import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { PlusIcon } from './index';

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

  it('does not expose strokeWidth for fill-only icons', () => {
    // @ts-expect-error Fill-only icons do not support strokeWidth.
    const icon = <PlusIcon strokeWidth={1.5} />;

    expect(icon).toBeDefined();
  });
});
