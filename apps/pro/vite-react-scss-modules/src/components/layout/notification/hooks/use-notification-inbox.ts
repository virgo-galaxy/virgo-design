import { useEffect } from 'react';

import { getNotifications } from '@/api/notifications';
import { useRemoteData } from '@/hooks/async/use-remote-data';
import { useResourceRevision } from '@/store/resources';

export function useNotificationInbox() {
  const revision = useResourceRevision('notifications');
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
