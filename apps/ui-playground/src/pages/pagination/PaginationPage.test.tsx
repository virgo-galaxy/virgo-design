import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { App } from '../../App';

describe('Pagination Playground', () => {
  it('opens through Navigation and exercises independent options, alignment and theme', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={['/components/pagination']}>
        <App />
      </MemoryRouter>,
    );
    expect(screen.getByRole('heading', { name: 'Pagination', level: 1 })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Pagination/ })).toHaveAttribute(
      'aria-current',
      'page',
    );
    const all = screen.getByRole('navigation', { name: 'All options pagination' });
    await user.click(within(all).getByRole('button', { name: 'Page 2' }));
    expect(screen.getByRole('status')).toHaveTextContent('Page 2 · 10 items per page');
    await user.click(screen.getByRole('switch', { name: 'Total' }));
    expect(within(all).queryByText('Total 85 items')).not.toBeInTheDocument();
    expect(within(all).getByRole('button', { name: 'Items per page' })).toBeInTheDocument();
    await user.click(screen.getByRole('switch', { name: 'Page size' }));
    expect(within(all).queryByRole('button', { name: 'Items per page' })).not.toBeInTheDocument();
    await user.click(screen.getByRole('switch', { name: 'Quick jump' }));
    expect(within(all).queryByRole('textbox')).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Pagination alignment' }));
    await user.click(screen.getByRole('option', { name: 'Right' }));
    expect(all).toHaveAttribute('data-align', 'right');
    await user.click(screen.getByRole('button', { name: 'dark' }));
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
  });
});
