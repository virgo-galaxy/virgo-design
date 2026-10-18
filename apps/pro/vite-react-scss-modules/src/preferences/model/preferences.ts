import { getThemePreset, resolveThemeId } from '@virgo-design/themes';
import type { LayoutSidebarDisplayState } from '@virgo-design/ui';

import configuredDefaults from '@/config/settings.json';
import { isRecord } from '@/lib/validation/is-record';

export type Appearance = 'light' | 'dark' | 'system';
export type SidebarStyle = 'collapsible' | 'labels';
export type HeaderMaterial = 'solid' | 'glass';

export function getFixedHeaderMaterial(theme: string): HeaderMaterial | undefined {
  if (theme === 'glass') return 'glass';
  if (theme === 'retro' || theme === 'contrast') return 'solid';

  return undefined;
}

export type NotificationIndicator = 'dot' | 'count' | 'none';
export const headerHeightRange = {
  min: 48,
  max: 96,
  default: configuredDefaults.headerHeight,
} as const;

export const sidebarWidthRanges = {
  expanded: { min: 200, max: 320, default: configuredDefaults.sidebarWidth },
  collapsed: { min: 48, max: 80, default: configuredDefaults.sidebarRailWidth },
} as const;

export interface AppPreferences {
  theme: string;
  appearance: Appearance;
  headerHeight: number;
  headerMaterial: HeaderMaterial;
  sidebarState: LayoutSidebarDisplayState;
  sidebarMode: Exclude<LayoutSidebarDisplayState, 'hidden'>;
  sidebarStyle: SidebarStyle;
  sidebarWidth: number;
  sidebarRailWidth: number;
  sidebarResizable: boolean;
  sidebarSnap: boolean;
  showSubmenuHeader: boolean;
  showBreadcrumb: boolean;
  showHeader: boolean;
  showFooter: boolean;
  showOverlayArrows: boolean;
  breathe: boolean;
  notificationIndicator: NotificationIndicator;
}

export const preferencesStorageKey = 'virgo-pro:settings';

function readDefaultPreferences(): AppPreferences {
  const {
    theme,
    appearance,
    headerMaterial,
    sidebarState,
    sidebarMode,
    sidebarStyle,
    notificationIndicator,
  } = configuredDefaults;

  if (
    !getThemePreset(theme) ||
    (appearance !== 'light' && appearance !== 'dark' && appearance !== 'system') ||
    (headerMaterial !== 'solid' && headerMaterial !== 'glass') ||
    (sidebarState !== 'expanded' && sidebarState !== 'collapsed' && sidebarState !== 'hidden') ||
    (sidebarMode !== 'expanded' && sidebarMode !== 'collapsed') ||
    (sidebarStyle !== 'collapsible' && sidebarStyle !== 'labels') ||
    (notificationIndicator !== 'dot' &&
      notificationIndicator !== 'count' &&
      notificationIndicator !== 'none')
  )
    throw new Error('Invalid option in config/settings.json');

  for (const [key, range] of [
    ['headerHeight', headerHeightRange],
    ['sidebarWidth', sidebarWidthRanges.expanded],
    ['sidebarRailWidth', sidebarWidthRanges.collapsed],
  ] as const) {
    const value = configuredDefaults[key];

    if (!Number.isInteger(value) || value < range.min || value > range.max)
      throw new Error(`Invalid ${key} in config/settings.json`);
  }

  return {
    ...configuredDefaults,
    theme,
    appearance,
    headerMaterial,
    sidebarState,
    sidebarMode,
    sidebarStyle,
    notificationIndicator,
  };
}

export const defaultPreferences = readDefaultPreferences();

export function parsePreferences(raw: string | null): AppPreferences {
  const settings = { ...defaultPreferences };

  try {
    const record: unknown = raw ? JSON.parse(raw) : null;

    if (!isRecord(record)) return settings;

    settings.theme = resolveThemeId(record.theme) ?? settings.theme;
    if (
      record.appearance === 'light' ||
      record.appearance === 'dark' ||
      record.appearance === 'system'
    )
      settings.appearance = record.appearance;
    if (
      record.sidebarState === 'expanded' ||
      record.sidebarState === 'collapsed' ||
      record.sidebarState === 'hidden'
    )
      settings.sidebarState = record.sidebarState;
    settings.sidebarMode =
      settings.sidebarState === 'hidden'
        ? record.sidebarMode === 'collapsed' || record.sidebarMode === 'expanded'
          ? record.sidebarMode
          : defaultPreferences.sidebarMode
        : settings.sidebarState;
    if (record.sidebarStyle === 'collapsible' || record.sidebarStyle === 'labels')
      settings.sidebarStyle = record.sidebarStyle;
    if (record.headerMaterial === 'solid' || record.headerMaterial === 'glass')
      settings.headerMaterial = record.headerMaterial;
    if (
      record.notificationIndicator === 'dot' ||
      record.notificationIndicator === 'count' ||
      record.notificationIndicator === 'none'
    )
      settings.notificationIndicator = record.notificationIndicator;

    for (const [key, range] of [
      ['headerHeight', headerHeightRange],
      ['sidebarWidth', sidebarWidthRanges.expanded],
      ['sidebarRailWidth', sidebarWidthRanges.collapsed],
    ] as const) {
      const width = record[key];

      if (typeof width === 'number' && Number.isFinite(width))
        settings[key] = Math.min(range.max, Math.max(range.min, Math.round(width)));
    }

    for (const key of [
      'sidebarResizable',
      'sidebarSnap',
      'showSubmenuHeader',
      'showBreadcrumb',
      'showHeader',
      'showFooter',
      'showOverlayArrows',
      'breathe',
    ] as const)
      if (typeof record[key] === 'boolean') settings[key] = record[key];
  } catch {}

  return settings;
}

export function serializePreferences(settings: AppPreferences) {
  return JSON.stringify(settings);
}
