import {
  initializeTheme,
  resolveThemeId,
  type ThemeStorage,
  themeStorageKey,
} from '@virgo-design/themes';

import {
  defaultProSettings,
  parseProSettings,
  serializeProSettings,
  settingsStorageKey,
} from '@/application/settings/model';

const storage: ThemeStorage = {
  key: settingsStorageKey,
  parse: (raw) => parseProSettings(raw).theme,
  serialize: (theme, raw) => serializeProSettings({ ...parseProSettings(raw), theme }),
};

/** Pro keeps theme, appearance and layout in one settings record. */
export function initializeProTheme() {
  try {
    const raw = localStorage.getItem(settingsStorageKey);
    let record;
    try {
      record = raw ? JSON.parse(raw) : null;
    } catch {
      record = null;
    }
    const saved = record?.version === 1 ? resolveThemeId(record.theme) : undefined;
    const legacy = resolveThemeId(localStorage.getItem(themeStorageKey));
    const theme = saved ?? legacy;
    if (theme && record?.theme !== theme) {
      localStorage.setItem(settingsStorageKey, storage.serialize(theme, raw));
    }
    localStorage.removeItem(themeStorageKey);
  } catch {
    // A damaged record or denied storage must not prevent the workspace opening.
  }
  return initializeTheme({ defaultTheme: defaultProSettings.theme, storage });
}
