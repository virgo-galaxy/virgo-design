import { act, cleanup, render, renderHook, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';

import CardActionsExample from '@/examples/components/card/CardActionsExample';
import { componentExampleRegistry } from '@/examples/components/example-registry';
import { useCopyToast } from '@/shared/hooks/use-copy-toast';

import { i18nInstance, setAppLocale } from './runtime';

vi.mock('@/shared/lib/clipboard', () => ({
  copyTextToClipboard: vi.fn().mockResolvedValue(undefined),
}));

afterEach(async () => {
  cleanup();
  await setAppLocale('en-US');
});

describe('B8 translation audit regressions', () => {
  it('keeps every example caption out of the English fallback path in Chinese', async () => {
    await setAppLocale('zh-CN');
    expect(componentExampleRegistry.size).toBe(209);
    for (const example of componentExampleRegistry.values()) {
      for (const [key, fallback] of [
        [example.titleTranslationKey, example.title],
        [example.descriptionTranslationKey, example.description],
      ] as const) {
        expect(key, example.id).toBeTruthy();
        expect(i18nInstance.exists(key!, { lng: 'zh-CN', fallbackLng: false }), example.id).toBe(
          true,
        );
        expect(i18nInstance.t(key!), example.id).not.toBe(fallback);
      }
    }
  });

  it('switches the existing Card initial and action feedback in both directions', async () => {
    await setAppLocale('zh-CN');
    render(<CardActionsExample />);
    expect(screen.getByText('邀请协作者加入此工作区。')).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: '邀请' }));
    expect(screen.getByText('邀请已准备。这是本地演示。')).toBeInTheDocument();
    await act(() => setAppLocale('en-US'));
    expect(screen.getByText('Invitation prepared. This is a local demo.')).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    await act(() => setAppLocale('zh-CN'));
    expect(screen.getByText('邀请已取消。')).toBeInTheDocument();
  });

  it('updates an already-visible color copy toast without copying again', async () => {
    await setAppLocale('en-US');
    const { result } = renderHook(() => useCopyToast());
    const values = { token: '@blue-6', value: '#1664F9' };
    await act(() => result.current.copy('#1664F9', 'foundations.colors.colorCopied', values));
    const id = result.current.toast!.id;
    expect(result.current.toast!.message).toBe(
      i18nInstance.t('foundations.colors.colorCopied', values),
    );
    await act(() => setAppLocale('zh-CN'));
    expect(result.current.toast!.id).toBe(id);
    expect(result.current.toast!.message).toBe(
      i18nInstance.t('foundations.colors.colorCopied', values),
    );
  });
});
