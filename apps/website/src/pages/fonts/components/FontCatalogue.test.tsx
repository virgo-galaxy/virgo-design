import '@/i18n';

import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { monoFonts, sansFonts } from '@virgo-design/fonts';
import { expect, it, vi } from 'vitest';

import { copyTextToClipboard } from '@/shared/lib/clipboard';

import { FontCatalogue } from './FontCatalogue';

vi.mock('@/shared/lib/clipboard', () => ({
  copyTextToClipboard: vi.fn().mockResolvedValue(undefined),
}));

it('previews the package font families and copies an import for the selected family', async () => {
  const user = userEvent.setup();
  render(<FontCatalogue />);

  for (const font of Object.values(sansFonts)) {
    expect(screen.getByRole('article', { name: font.name })).toBeInTheDocument();
  }
  await user.type(screen.getByRole('textbox', { name: 'Preview text' }), 'Hello Virgo');
  const instrument = screen.getByRole('article', { name: 'Instrument Sans' });
  expect(within(instrument).getByText('Hello Virgo').style.fontFamily).toContain(
    'Instrument Sans Variable',
  );
  await user.click(within(instrument).getByRole('button', { name: 'Copy Instrument Sans import' }));
  expect(copyTextToClipboard).toHaveBeenLastCalledWith(
    "import '@virgo-design/fonts/sans/instrument-sans.css';",
  );

  await user.click(screen.getByRole('tab', { name: 'Mono (6)' }));
  expect(screen.queryByRole('article', { name: 'Instrument Sans' })).toBeNull();
  for (const font of Object.values(monoFonts)) {
    const card = screen.getByRole('article', { name: font.name });
    expect(within(card).getByText('Hello Virgo')).toBeInTheDocument();
  }
  await user.click(screen.getByRole('button', { name: 'Copy Google Sans Code import' }));
  expect(copyTextToClipboard).toHaveBeenLastCalledWith(
    "import '@virgo-design/fonts/mono/google-sans-code.css';",
  );
});
