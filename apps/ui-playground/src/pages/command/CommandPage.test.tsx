import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import { App } from '../../App';

describe('Command Playground', () => {
  it('filters inline commands and opens the dialog from the documented shortcut', async () => {
    const user = userEvent.setup();
    vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
    render(
      <MemoryRouter initialEntries={['/components/command']}>
        <App />
      </MemoryRouter>,
    );
    const inline = screen.getByRole('combobox', { name: 'Search inline commands' });
    await user.type(inline, 'home');
    expect(screen.getByRole('option', { name: /Open dashboard/ })).toBeVisible();
    await user.keyboard('{Meta>}k{/Meta}');
    expect(screen.getByRole('dialog', { name: 'Command palette' })).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: 'Search command palette' })).toHaveFocus();
  });
});
