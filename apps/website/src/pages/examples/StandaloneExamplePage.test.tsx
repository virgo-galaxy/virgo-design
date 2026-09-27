import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { AppearanceContext } from '@/shared/theme/appearance-context';
import type { Appearance } from '@/shared/theme/types';

import { StandaloneExamplePage } from './StandaloneExamplePage';

function renderStandalone(path: string, appearance: Appearance = 'light') {
  return render(
    <AppearanceContext.Provider value={{ appearance, setAppearance: () => {} }}>
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route path="/examples/:exampleId" element={<StandaloneExamplePage />} />
        </Routes>
      </MemoryRouter>
    </AppearanceContext.Provider>,
  );
}

describe('StandaloneExamplePage', () => {
  it('renders the registered example without documentation chrome and honors the requested theme', () => {
    const { container } = renderStandalone('/examples/button-variants?theme=dark');
    const standalone = container.querySelector('[data-standalone-example="button-variants"]');

    expect(standalone).toHaveAttribute('data-theme', 'dark');
    expect(screen.getByRole('button', { name: 'Primary Button' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Secondary Button' })).toBeInTheDocument();
    expect(
      screen.queryByRole('navigation', { name: 'Component navigation' }),
    ).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /View source/ })).not.toBeInTheDocument();
  });

  it('uses the current appearance when a direct standalone URL has no theme query', () => {
    const { container } = renderStandalone('/examples/button-variants', 'dark');

    expect(container.querySelector('[data-standalone-example="button-variants"]')).toHaveAttribute(
      'data-theme',
      'dark',
    );
  });
});
