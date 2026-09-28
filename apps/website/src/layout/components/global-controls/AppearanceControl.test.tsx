import '@/i18n';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { AppearanceControl } from './AppearanceControl';

describe('AppearanceControl', () => {
  it('shows the current appearance icon and exposes the target action in a tooltip', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();

    const { rerender } = render(<AppearanceControl value="light" onChange={onChange} />);

    const button = screen.getByRole('button', { name: 'Switch to dark mode' });
    expect(screen.getAllByRole('button')).toHaveLength(1);
    expect(button.querySelector('svg')).toHaveAttribute('viewBox', '0 0 24 24');
    expect(button.querySelector('svg')).toHaveAttribute('fill', 'currentColor');
    expect(button.querySelectorAll('path')).toHaveLength(1);

    await user.tab();
    expect(screen.getByRole('tooltip')).toHaveTextContent('Switch to dark mode');

    await user.click(button);
    expect(onChange).toHaveBeenCalledWith('dark');

    rerender(<AppearanceControl value="dark" onChange={onChange} />);
    expect(screen.getByRole('button', { name: 'Switch to light mode' })).toBe(button);
    expect(button.querySelectorAll('path')).toHaveLength(2);
    expect(screen.getByRole('tooltip')).toHaveTextContent('Switch to light mode');
  });
});
