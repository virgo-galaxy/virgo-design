import '@/i18n';

import { render, screen, within } from '@testing-library/react';
import { internationalSans } from '@virgo-design/tokens';
import { describe, expect, it } from 'vitest';

import { SemanticTypographyTables } from './SemanticTypographyTables';

describe('SemanticTypographyTables', () => {
  it('shows the official Document and UI semantic role mappings', () => {
    render(<SemanticTypographyTables />);

    const documentTable = screen.getByRole('table', { name: 'Document Typography' });
    const uiTable = screen.getByRole('table', { name: 'UI Typography' });
    const codeTable = screen.getByRole('table', { name: 'Code Typography' });
    expect(within(codeTable).getAllByRole('row')).toHaveLength(3);
    expect(within(codeTable).getByText('code.body').closest('tr')?.textContent).toContain(
      'JetBrains Mono',
    );
    expect(within(codeTable).getByRole('columnheader', { name: 'Letter Spacing' })).toBeTruthy();

    expect(within(documentTable).getAllByRole('row')).toHaveLength(13);
    expect(within(uiTable).getAllByRole('row')).toHaveLength(13);
    expect(
      within(documentTable).getByRole('columnheader', { name: 'Semantic Token' }),
    ).toBeTruthy();
    expect(within(documentTable).getByRole('columnheader', { name: 'Font Family' })).toBeTruthy();

    const documentTitle = within(documentTable).getByText('document.title.large').closest('tr');
    const documentBody = within(documentTable).getByText('document.body.medium').closest('tr');
    const uiDisplay = within(uiTable).getByText('ui.display.large').closest('tr');
    const uiMeta = within(uiTable).getByText('ui.meta').closest('tr');

    for (const row of [documentTitle, documentBody, uiDisplay, uiMeta]) {
      expect(row?.textContent).toContain(internationalSans.latin.family);
    }
    expect(documentTitle?.textContent).toContain('64px');
    expect(documentBody?.textContent).toContain('1.60');
    expect(uiDisplay?.textContent).toContain('40px');
    expect(uiMeta?.textContent).toContain('12px');
  });
});
