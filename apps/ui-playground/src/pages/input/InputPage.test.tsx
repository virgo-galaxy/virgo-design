import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { InputPage } from './InputPage';

describe('InputPage', () => {
  it('shows interactive clearable and password examples', async () => {
    const user = userEvent.setup();

    render(<InputPage />);

    expect(screen.getByRole('heading', { name: 'Actions' })).toBeInTheDocument();

    const clearableInput = screen.getByLabelText('Clearable project name');
    await user.click(screen.getByRole('button', { name: 'Clear input' }));
    expect(clearableInput).toHaveValue('');

    const passwordInput = screen.getByLabelText('Current password');
    await user.click(screen.getByRole('button', { name: 'Show password' }));
    expect(passwordInput).toHaveAttribute('type', 'text');
    expect(passwordInput).toHaveValue('virgo-password');
  });
});
