import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import { AppearanceContext } from '@/shared/theme/appearance-context';

import { componentRoutes } from './app/componentRoutes';
import { UIPlayground } from './UIPlayground';

describe('UI Playground integration', () => {
  it('keeps every copied component route and follows the Website appearance', async () => {
    vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
    const user = userEvent.setup();

    function AppearanceHarness() {
      const [appearance, setAppearance] = useState<'light' | 'dark'>('light');

      return (
        <AppearanceContext.Provider value={{ appearance, setAppearance }}>
          <button type="button" onClick={() => setAppearance('dark')}>
            Set Website dark
          </button>
          <MemoryRouter initialEntries={['/playground/ui/components/button']}>
            <Routes>
              <Route path="/playground/ui/*" element={<UIPlayground />} />
            </Routes>
          </MemoryRouter>
        </AppearanceContext.Provider>
      );
    }

    render(<AppearanceHarness />);

    const navigation = screen.getByRole('navigation', { name: 'Component navigation' });
    expect(within(navigation).getAllByRole('link')).toHaveLength(componentRoutes.length);
    expect(screen.getByRole('heading', { level: 1, name: 'Button' })).toBeInTheDocument();
    expect(document.querySelector('.playground-shell')).toHaveAttribute('data-theme', 'light');
    expect(screen.queryByRole('group', { name: 'Preview theme' })).not.toBeInTheDocument();

    await user.click(screen.getByRole('link', { name: /Surface/ }));
    expect(screen.getByRole('heading', { level: 1, name: 'Surface' })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Set Website dark' }));
    expect(document.querySelector('.playground-shell')).toHaveAttribute('data-theme', 'dark');
  });
});
