import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { App } from './App';
import { componentRoutes } from './app/componentRoutes';

afterEach(() => {
  vi.restoreAllMocks();
});

describe('UI Playground navigation', () => {
  it('resets the page scroll immediately when switching components', async () => {
    const scrollTo = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/components/button']}>
        <App />
      </MemoryRouter>,
    );

    expect(scrollTo).not.toHaveBeenCalled();
    const navigation = screen.getByRole('navigation', { name: 'Component navigation' });
    expect(within(navigation).getAllByText('1.0.0')).toHaveLength(componentRoutes.length);
    expect(within(navigation).queryByText('V1.0.0')).not.toBeInTheDocument();
    expect(within(navigation).queryByText(/stable/i)).not.toBeInTheDocument();
    expect(screen.getByText('STABLE · V1.0.0')).toBeInTheDocument();

    await user.click(screen.getByRole('link', { name: /Surface/ }));

    expect(screen.getByRole('heading', { name: 'Surface', level: 1 })).toBeInTheDocument();
    expect(screen.getByText('STABLE · V1.0.0')).toBeInTheDocument();
    expect(scrollTo).toHaveBeenCalledExactlyOnceWith({ top: 0, left: 0, behavior: 'instant' });

    await user.click(screen.getByRole('button', { name: 'dark' }));
    expect(scrollTo).toHaveBeenCalledTimes(1);
  });
});
