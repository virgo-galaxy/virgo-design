import '../../../i18n';

import { render, screen } from '@testing-library/react';
import { fontFamilyRole } from '@virgo-design/tokens';
import { describe, expect, it } from 'vitest';

import { FontFamilyPreview } from './FontFamilyPreview';

describe('FontFamilyPreview', () => {
  it('renders the official Sans and Mono roles from tokens', () => {
    render(<FontFamilyPreview />);

    for (const definition of Object.values(fontFamilyRole)) {
      const card = screen.getByRole('heading', { name: definition.name }).closest('article');

      expect(card?.style.getPropertyValue('--family-preview-font')).toBe(definition.family);
      expect(screen.getByText(definition.family)).toBeTruthy();
    }

    expect(screen.getByText(/Virgo Design\s+Build tools that feel inevitable\./)).toBeTruthy();
    expect(screen.queryByText(/设计系统/)).toBeNull();
    expect(screen.getByText(/192\.168\.1\.10:6300/)).toBeTruthy();
  });
});
