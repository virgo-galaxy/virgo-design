import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { AppearanceContext } from '@/shared/theme/appearance-context';

import { App } from './App';

afterEach(() => {
  window.history.replaceState({}, '', '/');
});

describe('App standalone examples', () => {
  it('bypasses the Website layout for standalone example routes', async () => {
    window.history.replaceState({}, '', '/examples/button-variants?theme=light');

    render(
      <AppearanceContext.Provider value={{ appearance: 'light', setAppearance: () => {} }}>
        <App />
      </AppearanceContext.Provider>,
    );

    expect(await screen.findByRole('button', { name: 'Primary Button' })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Virgo Design' })).not.toBeInTheDocument();
    expect(
      screen.queryByRole('navigation', { name: 'Component navigation' }),
    ).not.toBeInTheDocument();
  });
});
