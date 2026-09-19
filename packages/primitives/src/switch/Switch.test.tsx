import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { Switch } from './Switch';

describe('Switch primitive', () => {
  it('renders a native checkbox with switch semantics and forwards refs/native props', () => {
    const ref = createRef<HTMLInputElement>();

    render(<Switch ref={ref} aria-label="Sync" name="sync" value="enabled" />);

    const control = screen.getByRole('switch', { name: 'Sync' });
    expect(ref.current).toBe(control);
    expect(control).toHaveAttribute('type', 'checkbox');
    expect(control).toHaveAttribute('name', 'sync');
    expect(control).toHaveAttribute('value', 'enabled');
  });

  it('supports native default checked behavior and onCheckedChange', async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();

    render(<Switch aria-label="Sync" defaultChecked onCheckedChange={onCheckedChange} />);

    const control = screen.getByRole('switch', { name: 'Sync' });
    expect(control).toBeChecked();

    await user.click(control);

    expect(control).not.toBeChecked();
    expect(onCheckedChange).toHaveBeenLastCalledWith(false);
  });

  it('supports a controlled checked state', async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();

    render(<Switch aria-label="Sync" checked onCheckedChange={onCheckedChange} readOnly />);

    const control = screen.getByRole('switch', { name: 'Sync' });
    expect(control).toBeChecked();

    await user.click(control);

    expect(control).toBeChecked();
    expect(onCheckedChange).toHaveBeenCalled();
  });

  it('supports disabled state', () => {
    render(<Switch aria-label="Sync" disabled />);

    expect(screen.getByRole('switch', { name: 'Sync' })).toBeDisabled();
  });
});
