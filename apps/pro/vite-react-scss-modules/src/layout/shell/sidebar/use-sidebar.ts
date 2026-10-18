import type { LayoutSidebarDisplayState } from '@virgo-design/ui';
import { type KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router';

import { useMediaQuery } from '@/hooks/browser/use-media-query';
import type { AppPreferences } from '@/preferences';

export function useSidebar({
  preferences,
  updatePreferences,
  canCustomize,
}: {
  preferences: AppPreferences;
  updatePreferences: (patch: Partial<AppPreferences>) => void;
  canCustomize: boolean;
}) {
  const { pathname } = useLocation();
  const narrow = useMediaQuery('(max-width: 1080px)');
  const [override, setOverride] = useState<LayoutSidebarDisplayState | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const state =
    preferences.sidebarState === 'hidden'
      ? 'hidden'
      : (override ?? (narrow ? 'collapsed' : preferences.sidebarState));

  const setState = useCallback(
    (sidebarState: LayoutSidebarDisplayState) => {
      if (canCustomize && !narrow) updatePreferences({ sidebarState });
      else setOverride(sidebarState);
    },
    [canCustomize, narrow, updatePreferences],
  );

  const setWidth = useCallback(
    (sidebarWidth: number) => updatePreferences({ sidebarWidth }),
    [updatePreferences],
  );

  const mobilePath = narrow ? pathname : null;

  useEffect(() => {
    setOverride(null);
  }, [mobilePath]);

  function onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape' && narrow && state === 'expanded' && !event.defaultPrevented) {
      setState('collapsed');
      toggleRef.current?.focus();
    }
  }

  return { narrow, state, setState, setWidth, toggleRef, onKeyDown };
}
