import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import { componentRoutes } from './app/componentRoutes';
import { UIPlayground } from './UIPlayground';

describe('UI Playground integration', () => {
  it('keeps every copied component route and its local theme control', async () => {
    vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/playground/ui/components/button']}>
        <Routes>
          <Route path="/playground/ui/*" element={<UIPlayground />} />
        </Routes>
      </MemoryRouter>,
    );

    const navigation = screen.getByRole('navigation', { name: 'Component navigation' });
    expect(within(navigation).getAllByRole('link')).toHaveLength(componentRoutes.length);
    expect(screen.getByRole('heading', { level: 1, name: 'Button' })).toBeInTheDocument();

    await user.click(screen.getByRole('link', { name: /Surface/ }));
    expect(screen.getByRole('heading', { level: 1, name: 'Surface' })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'dark' }));
    expect(document.querySelector('.playground-shell')).toHaveAttribute('data-theme', 'dark');
  });
});
