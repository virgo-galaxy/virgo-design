import {
  initializeTheme,
  resolveThemeId,
  type ThemeStorage,
  themeStorageKey,
} from '@virgo-design/themes';

import { demoResetCompleteEvent } from '@/lib/demo/reset';
import { localStorageAccess } from '@/lib/storage';

import {
  defaultProSettings,
  parseProSettings,
  serializeProSettings,
  settingsStorageKey,
} from '../model/settings';

const storage: ThemeStorage = {
  key: settingsStorageKey,
  parse: (raw) => parseProSettings(raw).theme,
  serialize: (theme, raw) => serializeProSettings({ ...parseProSettings(raw), theme }),
};

/** Pro keeps theme, appearance and layout in one settings record. */
export function initializeProTheme() {
  // Settings owns theme restoration; the demo storage utility only publishes lifecycle events.
  window.removeEventListener(demoResetCompleteEvent, initializeProTheme);
  window.addEventListener(demoResetCompleteEvent, initializeProTheme);
  try {
    const raw = localStorageAccess.get(settingsStorageKey).value;
    let record;
    try {
      record = raw ? JSON.parse(raw) : null;
    } catch {
      record = null;
    }
    const saved = record?.version === 1 ? resolveThemeId(record.theme) : undefined;
    const legacy = resolveThemeId(localStorageAccess.get(themeStorageKey).value);
    const theme = saved ?? legacy;
    if (theme && record?.theme !== theme) {
      if (!localStorageAccess.set(settingsStorageKey, storage.serialize(theme, raw)))
        return initializeTheme({ defaultTheme: defaultProSettings.theme, storage });
    }
    localStorageAccess.remove(themeStorageKey);
  } catch {
    // A damaged record or denied storage must not prevent the workspace opening.
  }
  return initializeTheme({ defaultTheme: defaultProSettings.theme, storage });
}
