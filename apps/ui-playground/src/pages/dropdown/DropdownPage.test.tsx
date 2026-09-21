import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { App } from '../../App';

describe('Dropdown Playground', () => {
  it('is reachable in Navigation and demonstrates placements, actions, themes and pagination reuse', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={['/components/dropdown']}>
        <App />
      </MemoryRouter>,
    );
    expect(screen.getByRole('heading', { name: 'Dropdown', level: 1 })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Dropdown/ })).toHaveAttribute('aria-current', 'page');
    for (const placement of [
      'bottomLeft',
      'bottom',
      'bottomRight',
      'topLeft',
      'top',
      'topRight',
      'leftTop',
      'left',
      'leftBottom',
      'rightTop',
      'right',
      'rightBottom',
    ]) {
      expect(screen.getByRole('button', { name: placement })).toBeInTheDocument();
    }
    await user.click(screen.getByRole('button', { name: 'Click me' }));
    await user.click(screen.getByRole('menuitem', { name: 'Settings' }));
    expect(screen.getByRole('status')).toHaveTextContent('Settings selected');
    await user.click(screen.getByRole('button', { name: 'dark' }));
    await user.click(screen.getByRole('button', { name: 'top' }));
    expect(screen.getByRole('menu')).toHaveAttribute('data-theme', 'dark');
    await user.keyboard('{Escape}');
    await user.click(screen.getByRole('link', { name: /Pagination/ }));
    const pagination = screen.getByRole('navigation', { name: 'All options pagination' });
    await user.click(within(pagination).getByRole('button', { name: 'Page 3' }));
    await user.click(within(pagination).getByRole('button', { name: 'Items per page' }));
    await user.click(screen.getByRole('menuitemradio', { name: '20 / page' }));
    expect(screen.getByRole('status')).toHaveTextContent('Page 1 · 20 items per page');
    expect(within(pagination).getByRole('textbox', { name: 'Go to page' })).toBeInTheDocument();
  });
});
