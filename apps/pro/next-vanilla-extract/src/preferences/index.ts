export { disposePreferences, initializePreferences } from './bootstrap/initialize-preferences';
export { useAppPreferences } from './hooks/use-app-preferences';
export type {
  Appearance,
  AppPreferences,
  HeaderMaterial,
  NotificationIndicator,
  SidebarStyle,
} from './model/preferences';
export {
  defaultPreferences,
  getFixedHeaderMaterial,
  headerHeightRange,
  parsePreferences,
  preferencesStorageKey,
  serializePreferences,
  sidebarWidthRanges,
} from './model/preferences';
export { usePreferencesStore } from './store';
