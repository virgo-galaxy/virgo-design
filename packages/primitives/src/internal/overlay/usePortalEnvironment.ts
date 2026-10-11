import { type RefObject, useLayoutEffect, useState } from 'react';

import {
  observePortalEnvironment,
  type PortalEnvironment,
  readPortalEnvironment,
  samePortalEnvironment,
} from './portalEnvironment';

export function usePortalEnvironment(anchorRef: RefObject<HTMLElement | null>, active: boolean) {
  const [environment, setEnvironment] = useState<PortalEnvironment>({
    theme: undefined,
    themeStyle: undefined,
    direction: 'ltr',
  });
  useLayoutEffect(() => {
    const anchor = anchorRef.current;
    if (!active || !anchor) return;
    const update = () => {
      const next = readPortalEnvironment(anchor);
      setEnvironment((previous) => (samePortalEnvironment(previous, next) ? previous : next));
    };
    update();
    return observePortalEnvironment(anchor, update);
  }, [anchorRef, active]);
  return environment;
}
