import '../../../i18n';

import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { SemanticTypographyTables } from './SemanticTypographyTables';

describe('SemanticTypographyTables', () => {
  it('shows the official Document and UI semantic role mappings', () => {
    render(<SemanticTypographyTables />);

    const documentTable = screen.getByRole('table', { name: 'Document Typography' });
    const uiTable = screen.getByRole('table', { name: 'UI Typography' });

    expect(within(documentTable).getAllByRole('row')).toHaveLength(13);
    expect(within(uiTable).getAllByRole('row')).toHaveLength(13);
    expect(
      within(documentTable).getByRole('row', { name: 'Title Large 64px 700 1.10' }),
    ).toBeTruthy();
    expect(
      within(documentTable).getByRole('row', { name: 'Heading 1 48px 600 1.10' }),
    ).toBeTruthy();
    expect(
      within(documentTable).getByRole('row', { name: 'Body Medium 14px 400 1.60' }),
    ).toBeTruthy();
    expect(within(documentTable).getByRole('row', { name: 'Caption 12px 400 1.40' })).toBeTruthy();
    expect(within(uiTable).getByRole('row', { name: 'Display Large 40px 700 1.10' })).toBeTruthy();
    expect(within(uiTable).getByRole('row', { name: 'Body Medium 14px 400 1.40' })).toBeTruthy();
    expect(within(uiTable).getByRole('row', { name: 'Label Medium 14px 500 1.25' })).toBeTruthy();
    expect(within(uiTable).getByRole('row', { name: 'Meta 12px 400 1.40' })).toBeTruthy();
  });
});
