import { useCallback, useEffect } from 'react';

import { getNotifications } from '@/api/notifications';
import { useRemoteData } from '@/shared/async/use-remote-data';

import { useNotificationRevision } from '../context/revision';
export function useNotificationInbox() {
  const revision = useNotificationRevision();
  const load = useCallback(
    (signal: AbortSignal) => {
      void revision;
      return getNotifications(signal);
    },
    [revision],
  );
  const resource = useRemoteData(load);
  const { retry } = resource;
  useEffect(() => {
    const refresh = () => retry();
    const visibility = () => {
      if (document.visibilityState === 'visible') refresh();
    };
    window.addEventListener('focus', refresh);
    document.addEventListener('visibilitychange', visibility);
    return () => {
      window.removeEventListener('focus', refresh);
      document.removeEventListener('visibilitychange', visibility);
    };
  }, [retry]);
  return resource;
}
