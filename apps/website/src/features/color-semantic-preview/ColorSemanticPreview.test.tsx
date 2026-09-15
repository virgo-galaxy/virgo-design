import '../../i18n';

import { render, screen } from '@testing-library/react';
import { themes } from '@virgo-design/tokens';
import { describe, expect, it } from 'vitest';

import { ColorSemanticPreview } from './ColorSemanticPreview';

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
});
