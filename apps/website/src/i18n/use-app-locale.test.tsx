import { act, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { setAppLocale } from './runtime';
import { useAppLocale } from './use-app-locale';

function LocaleProbe() {
  return <output>{useAppLocale()}</output>;
}

describe('useAppLocale', () => {
  afterEach(async () => {
    await setAppLocale('en-US');
  });

  it('reacts to language changes and returns a normalized AppLocale', async () => {
    await setAppLocale('en-US');
    render(<LocaleProbe />);

    expect(screen.getByText('en-US')).toBeInTheDocument();

    await act(async () => {
      await setAppLocale('zh-CN');
    });

    expect(screen.getByText('zh-CN')).toBeInTheDocument();
  });
});
