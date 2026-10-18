// @vitest-environment jsdom
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it } from 'vitest';

import { LanguageControl } from '@/components/language-control';

import { ThemeStyleControl } from './ThemeStyleControl';

it('changes the theme while keeping the language menu and restored-focus tooltip closed', async () => {
  const user = userEvent.setup();

  render(
    <>
      <ThemeStyleControl />
      <LanguageControl />
    </>,
  );

  const trigger = screen.getByRole('button', { name: 'Theme' });
  const language = screen.getByRole('button', { name: 'Language' });

  await user.hover(trigger);
  expect(await screen.findByRole('tooltip')).toHaveTextContent('Theme');

  await user.click(trigger);
  expect(await screen.findByRole('menuitemradio', { name: 'Virgo (default)' })).toHaveAttribute(
    'aria-checked',
    'true',
  );
  expect(language).toHaveAttribute('aria-expanded', 'false');

  await user.click(screen.getByRole('menuitemradio', { name: 'Soft' }));
  await waitFor(() => expect(screen.queryByRole('menu')).toBeNull());

  expect(trigger).toHaveFocus();
  expect(screen.queryByRole('tooltip')).toBeNull();
  expect(language).toHaveAttribute('aria-expanded', 'false');

  await user.click(trigger);
  expect(await screen.findByRole('menuitemradio', { name: 'Soft' })).toHaveAttribute(
    'aria-checked',
    'true',
  );
  expect(screen.getByRole('menuitemradio', { name: 'Virgo (default)' })).toHaveAttribute(
    'aria-checked',
    'false',
  );
});
