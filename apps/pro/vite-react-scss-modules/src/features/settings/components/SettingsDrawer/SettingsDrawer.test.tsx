// @vitest-environment jsdom
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { Drawer } from '@virgo-design/ui';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { defaultProSettings } from '../../model/settings';
import { SettingsDrawer } from './SettingsDrawer';

const { resetDemo, onReset } = vi.hoisted(() => ({ resetDemo: vi.fn(), onReset: vi.fn() }));

function renderSettings() {
  return render(
    <Drawer.Root defaultOpen>
      <SettingsDrawer
        settings={defaultProSettings}
        theme="light"
        storageAvailable
        onChange={vi.fn()}
        onReset={onReset}
        onResetDemo={resetDemo}
        onHeaderChange={vi.fn()}
        onCloseAutoFocus={vi.fn()}
      />
    </Drawer.Root>,
  );
}

async function openReset() {
  fireEvent.click(screen.getByRole('button', { name: 'Reset demo data' }));
  return screen.findByRole('dialog', { name: 'Restore the initial demo?' });
}

beforeEach(() => {
  vi.resetAllMocks();
  vi.stubEnv('VITE_API_MOCKING', 'true');
});
afterEach(() => vi.unstubAllEnvs());

describe('settings reset actions', () => {
  it('restores only settings without requesting a demo reset or closing settings', async () => {
    renderSettings();
    fireEvent.click(screen.getByRole('button', { name: 'Restore default settings' }));
    expect(onReset).toHaveBeenCalledOnce();
    expect(resetDemo).not.toHaveBeenCalled();
    expect(screen.getByRole('dialog', { name: 'Settings' })).toBeVisible();
  });

  it('requires confirmation and allows cancellation without changing data', async () => {
    renderSettings();
    const dialog = await openReset();
    expect(dialog).toHaveTextContent('Local changes and the current session will be cleared.');
    expect(resetDemo).not.toHaveBeenCalled();
    fireEvent.click(within(dialog).getByRole('button', { name: 'Cancel' }));
    await waitFor(() =>
      expect(screen.queryByRole('dialog', { name: 'Restore the initial demo?' })).toBeNull(),
    );
    expect(screen.getByRole('dialog', { name: 'Settings' })).toBeVisible();
    expect(resetDemo).not.toHaveBeenCalled();
    expect(onReset).not.toHaveBeenCalled();
  });

  it('blocks cancellation and duplicate submissions while resetting', async () => {
    resetDemo.mockReturnValue(new Promise(() => {}));
    renderSettings();
    const dialog = await openReset();
    fireEvent.click(within(dialog).getByRole('button', { name: 'Reset demo data' }));
    const confirm = within(dialog).getByRole('button', { name: 'Resetting…' });
    expect(confirm).toBeDisabled();
    expect(confirm).toHaveAttribute('aria-busy', 'true');
    expect(within(dialog).getByRole('button', { name: 'Cancel' })).toBeDisabled();
    fireEvent.click(confirm);
    fireEvent.keyDown(dialog, { key: 'Escape' });
    expect(resetDemo).toHaveBeenCalledOnce();
    expect(dialog).toBeVisible();
    expect(onReset).not.toHaveBeenCalled();
  });

  it('shows reset failures and permits retry', async () => {
    resetDemo
      .mockRejectedValueOnce(new Error('Network failed'))
      .mockReturnValueOnce(new Promise(() => {}));
    renderSettings();
    const dialog = await openReset();
    fireEvent.click(within(dialog).getByRole('button', { name: 'Reset demo data' }));
    expect(await within(dialog).findByRole('alert')).toHaveTextContent('Unable to reset demo data');
    expect(within(dialog).getByRole('button', { name: 'Cancel' })).not.toBeDisabled();
    fireEvent.click(within(dialog).getByRole('button', { name: 'Reset demo data' }));
    expect(resetDemo).toHaveBeenCalledTimes(2);
    expect(within(dialog).queryByRole('alert')).toBeNull();
  });

  it('keeps demo reset unavailable when using the real API', () => {
    vi.stubEnv('VITE_API_MOCKING', 'false');
    renderSettings();
    expect(screen.getByRole('button', { name: 'Restore default settings' })).toBeVisible();
    expect(screen.queryByRole('button', { name: 'Reset demo data' })).toBeNull();
  });
});
