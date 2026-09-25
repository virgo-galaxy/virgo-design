import '@/i18n';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { AppearanceControl } from './AppearanceControl';

describe('AppearanceControl', () => {
  it('uses Virgo Sun and Moon icons for the global appearance actions', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();

    render(<AppearanceControl value="light" onChange={onChange} />);

    const lightButton = screen.getByRole('button', { name: 'Light mode' });
    const darkButton = screen.getByRole('button', { name: 'Dark mode' });

    for (const button of [lightButton, darkButton]) {
      expect(button.querySelector('svg')).toHaveAttribute('viewBox', '0 0 24 24');
      expect(button.querySelector('svg')).toHaveAttribute('fill', 'currentColor');
    }
    expect(lightButton).not.toHaveTextContent('☀');
    expect(darkButton).not.toHaveTextContent('☾');

    await user.click(darkButton);
    expect(onChange).toHaveBeenCalledWith('dark');
  });
});
