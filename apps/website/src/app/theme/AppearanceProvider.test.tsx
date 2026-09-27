import { render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { useAppearance } from '@/shared/theme/use-appearance';

import { AppearanceProvider } from './AppearanceProvider';

function AppearanceProbe() {
  const { appearance } = useAppearance();
  return <output>{appearance}</output>;
}

afterEach(() => {
  window.history.replaceState({}, '', '/');
  window.localStorage.clear();
  delete document.documentElement.dataset.theme;
});

describe('AppearanceProvider standalone examples', () => {
  it('uses the theme encoded by a standalone example URL without replacing the saved Website theme', async () => {
    window.localStorage.setItem('virgo-design-appearance', 'light');
    window.history.replaceState({}, '', '/examples/button-variants?theme=dark');

    render(
      <AppearanceProvider>
        <AppearanceProbe />
      </AppearanceProvider>,
    );

    expect(screen.getByText('dark')).toBeInTheDocument();
    await waitFor(() => expect(document.documentElement.dataset.theme).toBe('dark'));
    expect(window.localStorage.getItem('virgo-design-appearance')).toBe('light');
  });
});
