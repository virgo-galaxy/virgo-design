import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { Switch } from './Switch';

describe('Switch', () => {
  it('renders the default toggle appearance and visible label', () => {
    render(<Switch>Sync changes</Switch>);

    const control = screen.getByRole('switch', { name: 'Sync changes' });
    expect(control.closest('label')).toHaveAttribute('data-appearance', 'toggle');
    expect(control.closest('label')).toHaveAttribute('data-size', 'default');
  });

  it('supports small and fader appearances', () => {
    render(
      <>
        <Switch aria-label="Small" size="small" />
        <Switch aria-label="Fader" appearance="fader" />
      </>,
    );

    expect(screen.getByRole('switch', { name: 'Small' }).closest('label')).toHaveAttribute(
      'data-size',
      'small',
    );
    expect(screen.getByRole('switch', { name: 'Fader' }).closest('label')).toHaveAttribute(
      'data-appearance',
      'fader',
    );
  });

  it('supports decorative checked and unchecked content', () => {
    render(<Switch aria-label="Power" checkedContent="On" uncheckedContent="Off" defaultChecked />);

    expect(screen.getByText('On')).toBeInTheDocument();
    expect(screen.getByText('Off')).toBeInTheDocument();
    expect(screen.getByRole('switch', { name: 'Power' }).closest('label')).toHaveAttribute(
      'data-has-content',
      'true',
    );
  });

  it('forwards refs and checked-change behavior', async () => {
    const user = userEvent.setup();
    const ref = createRef<HTMLInputElement>();
    const onCheckedChange = vi.fn();

    render(<Switch ref={ref} aria-label="Sync" onCheckedChange={onCheckedChange} />);

    const control = screen.getByRole('switch', { name: 'Sync' });
    expect(ref.current).toBe(control);

    await user.click(control);

    expect(control).toBeChecked();
    expect(onCheckedChange).toHaveBeenLastCalledWith(true);
  });

  it('supports disabled state', () => {
    render(<Switch aria-label="Disabled" disabled />);

    expect(screen.getByRole('switch', { name: 'Disabled' })).toBeDisabled();
  });
});
