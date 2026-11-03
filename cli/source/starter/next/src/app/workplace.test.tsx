import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';

import { initializeLocale } from '@/i18n/locale';

import WorkplacePage from './dashboard/workplace/page';

it('renders the Workplace page from its App Router entry point', async () => {
  await initializeLocale('en-US');
  render(<WorkplacePage />);
  expect(screen.getByRole('heading', { name: 'Workplace' })).toBeTruthy();
});
