// @vitest-environment jsdom
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { setAppLocalePreference } from '@/i18n/runtime';

import { LanguageControl } from './LanguageControl';

beforeEach(async () => {
  await setAppLocalePreference('en-US');
});
afterEach(cleanup);

describe('language control', () => {
  it('shows only a tooltip on hover and opens the menu on click', async () => {
    const user = userEvent.setup();
    render(<LanguageControl />);
    const trigger = screen.getByRole('button', { name: 'Language' });
    await user.hover(trigger);
    expect(await screen.findByRole('tooltip')).toHaveTextContent('Language');
    expect(screen.queryByRole('menu')).toBeNull();
    await user.click(trigger);
    expect(await screen.findByRole('menu')).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByRole('tooltip')).toBeNull());
    expect(trigger).not.toBeDisabled();
    await user.click(trigger);
    await waitFor(() => expect(screen.queryByRole('menu')).toBeNull());
  });

  it('switches languages and restores focus without reopening the tooltip', async () => {
    const user = userEvent.setup();
    render(<LanguageControl />);
    await user.click(screen.getByRole('button', { name: 'Language' }));
    await user.click(await screen.findByRole('menuitemradio', { name: '简体中文' }));
    await waitFor(() => expect(screen.queryByRole('menu')).toBeNull());
    expect(screen.getByRole('button', { name: '语言' })).toHaveFocus();
    expect(screen.queryByRole('tooltip')).toBeNull();
    await user.unhover(screen.getByRole('button', { name: '语言' }));
    await user.hover(screen.getByRole('button', { name: '语言' }));
    expect(await screen.findByRole('tooltip')).toHaveTextContent('语言');
  });

  it('keeps keyboard activation and Escape focus restoration', async () => {
    const user = userEvent.setup();
    render(<LanguageControl />);
    await user.tab();
    expect(await screen.findByRole('tooltip')).toHaveTextContent('Language');
    await user.keyboard('{ArrowDown}');
    expect(
      await screen.findByRole('menuitemradio', { name: 'Automatically detect' }),
    ).toHaveFocus();
    await user.keyboard('{Escape}');
    await waitFor(() => expect(screen.queryByRole('menu')).toBeNull());
    expect(screen.getByRole('button', { name: 'Language' })).toHaveFocus();
    await waitFor(() => expect(screen.queryByRole('tooltip')).toBeNull());
  });
});
