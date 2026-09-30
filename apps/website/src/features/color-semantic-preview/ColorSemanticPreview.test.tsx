import '@/i18n';
import '@testing-library/jest-dom/vitest';

import { render, screen, within } from '@testing-library/react';
import { statusColorFamilies, themes } from '@virgo-design/tokens';
import { describe, expect, it } from 'vitest';

import { i18nInstance } from '@/i18n/runtime';

import { ColorSemanticPreview } from './ColorSemanticPreview';
import { StatusColorReview } from './components/StatusColorReview';
import { contrastRatio } from './contrast';

describe('ColorSemanticPreview', () => {
  it('renders both token-owned color themes', () => {
    render(<ColorSemanticPreview />);

    const page = screen.getByTestId('semantic-color-preview');

    expect(page.style.getPropertyValue('--tokens-page-brand')).toBe(
      themes.light.color.brand.primary,
    );
    expect(screen.queryByText(/Website type preview|网站字体预览/)).toBeNull();
    expect(document.querySelectorAll('[data-semantic-theme]')).toHaveLength(2);
  });
  it('shows real Solid/Subtle tokens, swatches and measured contrast for all eight theme/status combinations', () => {
    render(<ColorSemanticPreview />);
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
