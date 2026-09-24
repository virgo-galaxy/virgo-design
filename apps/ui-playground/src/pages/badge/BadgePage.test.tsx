import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import { App } from '../../App';

describe('Badge Playground', () => {
  it('renders count examples and keeps a wrapped button interactive', async () => {
    const user = userEvent.setup();
    vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
    render(
      <MemoryRouter initialEntries={['/components/badge']}>
        <App />
      </MemoryRouter>,
    );
    expect(screen.getByRole('heading', { name: 'Badge', level: 1 })).toBeInTheDocument();
    expect(screen.getByText('99+')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Online' })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Inbox' }));
    expect(screen.getByRole('status')).toHaveTextContent('Inbox opened: 1');
  });
});
