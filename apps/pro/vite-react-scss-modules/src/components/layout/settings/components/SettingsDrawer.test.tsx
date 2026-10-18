// @vitest-environment jsdom
import { fireEvent, render, screen } from '@testing-library/react';
import { Drawer } from '@virgo-design/ui';
import { expect, it, vi } from 'vitest';

import { defaultPreferences } from '@/preferences';

import { SettingsDrawer } from './SettingsDrawer';

const onReset = vi.fn();

function renderSettings() {
  return render(
    <Drawer.Root defaultOpen>
      <SettingsDrawer
        settings={defaultPreferences}
        theme="light"
        storageAvailable
        onChange={vi.fn()}
        onReset={onReset}
        onHeaderChange={vi.fn()}
        onCloseAutoFocus={vi.fn()}
      />
    </Drawer.Root>,
  );
}

it('restores settings without closing the drawer or including demo actions', () => {
  renderSettings();
  fireEvent.click(screen.getByRole('button', { name: 'Restore default settings' }));

  expect(onReset).toHaveBeenCalledOnce();
  expect(screen.getByRole('dialog', { name: 'Settings' })).toBeVisible();
  expect(screen.queryByRole('button', { name: 'Reset demo data' })).toBeNull();
});
