import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import { App } from '../../App';

describe('Toast Playground', () => {
  it('creates status toasts, stacks them and updates viewport placement', async () => {
    const user = userEvent.setup();
    vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
    render(
      <MemoryRouter initialEntries={['/components/toast']}>
        <App />
      </MemoryRouter>,
    );
    await user.click(screen.getByRole('button', { name: 'Show success' }));
    expect(screen.getByRole('status', { name: 'Success' })).toHaveAttribute(
      'data-intent',
      'success',
    );
    await user.click(screen.getByRole('button', { name: 'Add two toasts' }));
    expect(screen.getAllByRole('status')).toHaveLength(3);
    expect(screen.getByText(/Toast #2/)).toBeInTheDocument();
    expect(screen.getByText(/Toast #3/)).toBeInTheDocument();
    await user.click(screen.getAllByRole('button', { name: 'Dismiss notification' })[0]!);
    expect(screen.getAllByRole('status')).toHaveLength(2);
    expect(screen.queryByText(/Toast #1/)).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'top-start' }));
    expect(screen.getByRole('region', { name: 'Notifications' })).toHaveAttribute(
      'data-placement',
      'top-start',
    );
  });
});
