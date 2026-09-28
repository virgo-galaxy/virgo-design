import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import i18n from '@/i18n';

import { LanguageControl } from './LanguageControl';

beforeEach(async () => {
  window.localStorage.clear();
  await i18n.changeLanguage('en');
});

afterEach(async () => {
  await i18n.changeLanguage('en');
  window.localStorage.clear();
});

describe('LanguageControl', () => {
  it('toggles locale, icon, action label, tooltip, and persisted preference', async () => {
    const user = userEvent.setup();
    render(<LanguageControl />);

    const button = screen.getByRole('button', { name: 'Switch to Chinese' });
    expect(screen.getAllByRole('button')).toHaveLength(1);
    expect(button.querySelector('svg')).toHaveAttribute('viewBox', '0 0 24 24');
    expect(button.querySelectorAll('path')).toHaveLength(3);

    await user.tab();
    expect(screen.getByRole('tooltip')).toHaveTextContent('Switch to Chinese');

    await user.click(button);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: '切换到英文' })).toBe(button);
    });
    expect(button.querySelectorAll('path')).toHaveLength(2);
    expect(screen.getByRole('tooltip')).toHaveTextContent('切换到英文');
    expect(window.localStorage.getItem('virgo-design-locale')).toBe('zh-CN');
  });
});
