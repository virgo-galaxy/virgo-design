import { getServerTheme, getTheme, setTheme, subscribeTheme } from '@virgo-design/themes';
import { useSyncExternalStore } from 'react';

export function useThemeStyle() {
  const theme = useSyncExternalStore(subscribeTheme, getTheme, getServerTheme);
  return { theme, setTheme };
}
