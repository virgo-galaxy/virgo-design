import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import { App } from '../../App';

describe('Tag Playground', () => {
  it('renders the Tag catalogue and lets the owner remove a closable tag', async () => {
    const user = userEvent.setup();
    vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
    render(
      <MemoryRouter initialEntries={['/components/tag']}>
        <App />
      </MemoryRouter>,
    );
    expect(screen.getByRole('heading', { name: 'Tag', level: 1 })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Remove TypeScript' }));
    expect(screen.queryByRole('button', { name: 'Remove TypeScript' })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Remove tag' })).toBeDisabled();
  });
});
