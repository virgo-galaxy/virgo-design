import '@/i18n';

import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { TypographyPage } from './TypographyPage';

describe('TypographyPage', () => {
  it('keeps Foundations / Typography limited to Foundation materials', () => {
    render(
      <MemoryRouter>
        <TypographyPage />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { level: 1, name: 'Typography' })).toBeTruthy();
    expect(screen.getByRole('heading', { level: 2, name: 'Font Family' })).toBeTruthy();
    expect(screen.queryByText('Document and UI semantic typography')).toBeNull();
    expect(screen.queryByText('Typography in context')).toBeNull();
  });
});
