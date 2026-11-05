import '@/i18n';
import '@testing-library/jest-dom/vitest';

import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { statusColorFamilies, themes } from '@virgo-design/tokens';
import { useState } from 'react';
import { describe, expect, it } from 'vitest';

import { i18nInstance } from '@/i18n/runtime';
import { AppearanceControl } from '@/layout/components/global-controls/AppearanceControl';
import { AppearanceContext } from '@/shared/theme/appearance-context';
import type { Appearance } from '@/shared/theme/types';

import { ColorSemanticPreview } from './ColorSemanticPreview';
import { StatusColorReview } from './components/StatusColorReview';
import { contrastRatio } from './contrast';

function renderPreview(appearance: Appearance = 'light') {
  return render(
    <AppearanceContext.Provider value={{ appearance, setAppearance: () => {} }}>
      <ColorSemanticPreview />
    </AppearanceContext.Provider>,
  );
}

function AppearancePreview() {
  const [appearance, setAppearance] = useState<Appearance>('light');

  return (
    <AppearanceContext.Provider value={{ appearance, setAppearance }}>
      <AppearanceControl value={appearance} onChange={setAppearance} />
      <ColorSemanticPreview />
    </AppearanceContext.Provider>
  );
}

describe('ColorSemanticPreview', () => {
  it.each(['light', 'dark'] as const)('defaults to the current %s appearance', (appearance) => {
    renderPreview(appearance);

    const page = screen.getByTestId('semantic-color-preview');

    expect(page.style.getPropertyValue('--tokens-page-brand')).toBe(
      themes.light.color.brand.primary,
    );
    expect(screen.queryByText(/Website type preview|网站字体预览/)).toBeNull();
    expect(document.querySelectorAll('[data-semantic-theme]')).toHaveLength(1);
    expect(document.querySelector('[data-semantic-theme]')).toHaveAttribute(
      'data-semantic-theme',
      appearance,
    );
    expect(screen.getByRole('switch', { name: 'Compare light and dark' })).not.toBeChecked();
  });

  it('follows the appearance control and returns to its latest mode after comparison', async () => {
    const user = userEvent.setup();
    render(<AppearancePreview />);

    await user.click(screen.getByRole('button', { name: 'Switch to dark mode' }));
    expect(document.querySelectorAll('[data-semantic-theme]')).toHaveLength(1);
    expect(document.querySelector('[data-semantic-theme]')).toHaveAttribute(
      'data-semantic-theme',
      'dark',
    );

    const comparisonSwitch = screen.getByRole('switch', { name: 'Compare light and dark' });
    await user.click(comparisonSwitch);
    expect(comparisonSwitch).toBeChecked();
    expect(
      [...document.querySelectorAll('[data-semantic-theme]')].map((node) =>
        node.getAttribute('data-semantic-theme'),
      ),
    ).toEqual(['light', 'dark']);

    await user.click(screen.getByRole('button', { name: 'Switch to light mode' }));
    expect(comparisonSwitch).toBeChecked();
    expect(document.querySelectorAll('[data-semantic-theme]')).toHaveLength(2);

    await user.click(comparisonSwitch);
    expect(comparisonSwitch).not.toBeChecked();
    expect(document.querySelectorAll('[data-semantic-theme]')).toHaveLength(1);
    expect(document.querySelector('[data-semantic-theme]')).toHaveAttribute(
      'data-semantic-theme',
      'light',
    );
  });

  it('shows real Solid/Subtle tokens, swatches and measured contrast for all eight theme/status combinations', async () => {
    const user = userEvent.setup();
    renderPreview();
    await user.click(screen.getByRole('switch', { name: 'Compare light and dark' }));
    for (const theme of Object.values(themes)) {
      for (const family of statusColorFamilies) {
        const card = screen.getByRole('region', {
          name: `${i18nInstance.t(`tokens.colors.${theme.mode}.title`)} ${i18nInstance.t(`tokens.colors.statusReview.families.${family}`)}`,
        });
        const status = theme.color.status[family];
        for (const role of ['solid', 'onSolid', 'subtle', 'border', 'text'] as const) {
          expect(within(card).getByText(`status.${family}.${role}`)).toBeInTheDocument();
          expect(within(card).getAllByText(status[role]).length).toBeGreaterThan(0);
        }
        expect(card.querySelector('[data-status-sample="solid"]')).toHaveStyle({
          background: status.solid,
          color: status.onSolid,
        });
        expect(card.querySelector('[data-status-sample="subtle"]')).toHaveStyle({
          background: status.subtle,
          color: status.text,
          borderColor: status.border,
        });
        expect(card.querySelector('[data-contrast-result="pass"]')).toHaveTextContent(
          `${contrastRatio(status.solid, status.onSolid)?.toFixed(2)}:1`,
        );
        expect(card.querySelectorAll('dl dt > span')).toHaveLength(7);
      }
    }
  });
  it('reports a failing pair when token values change instead of displaying a fixed passing label', () => {
    const theme = {
      ...themes.light,
      color: {
        ...themes.light.color,
        status: {
          ...themes.light.color.status,
          warning: {
            ...themes.light.color.status.warning,
            solid: themes.light.color.status.warning.onSolid,
          },
        },
      },
    };
    render(<StatusColorReview theme={theme} />);
    const card = screen.getByRole('region', { name: 'Light Warning' });
    expect(card.querySelector('[data-contrast-result="fail"]')).toHaveTextContent('1.00:1');
  });
});
