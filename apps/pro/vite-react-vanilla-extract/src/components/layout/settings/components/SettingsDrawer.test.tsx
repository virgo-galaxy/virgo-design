// @vitest-environment jsdom
import { fireEvent, render, screen } from '@testing-library/react';
import { Drawer } from '@virgo-design/ui';
import { useState } from 'react';
import { expect, it, vi } from 'vitest';

import { defaultPreferences, sidebarWidthRanges } from '@/preferences';

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

function EditableSettings() {
  const [settings, setSettings] = useState(defaultPreferences);

  return (
    <Drawer.Root defaultOpen>
      <SettingsDrawer
        settings={settings}
        theme="light"
        storageAvailable
        onChange={(patch) => setSettings((current) => ({ ...current, ...patch }))}
        onReset={() => setSettings(defaultPreferences)}
        onHeaderChange={() => {}}
        onCloseAutoFocus={() => {}}
      />
    </Drawer.Root>
  );
}

it('clamps sidebar width on blur and lets Escape cancel an unfinished edit', () => {
  render(<EditableSettings />);
  const width = screen.getByLabelText(
    defaultPreferences.sidebarMode === 'collapsed' ? 'Rail width' : 'Expanded width',
    { selector: 'input' },
  );
  const maximum = sidebarWidthRanges[defaultPreferences.sidebarMode].max;

  fireEvent.change(width, { target: { value: '9999' } });
  fireEvent.blur(width);
  expect(width).toHaveValue(String(maximum));

  fireEvent.change(width, { target: { value: '' } });
  fireEvent.keyDown(width, { key: 'Escape' });
  expect(width).toHaveValue(String(maximum));
});
