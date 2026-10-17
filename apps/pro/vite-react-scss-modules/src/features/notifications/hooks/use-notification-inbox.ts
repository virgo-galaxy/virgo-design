import { useEffect } from 'react';

import { getNotifications } from '@/api/notifications';
import { useRemoteData } from '@/hooks/use-remote-data';

import { useNotificationRevision } from '../context/revision';

export function useNotificationInbox() {
  const revision = useNotificationRevision();
  const resource = useRemoteData(getNotifications, { revision });
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
