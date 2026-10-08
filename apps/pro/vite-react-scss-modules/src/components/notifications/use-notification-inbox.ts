import { useEffect } from 'react';

import { getNotifications } from '@/api/notifications';
import { useRemoteData } from '@/application/use-remote-data';
import { demoDataStorageKey, tasksChangedEvent } from '@/lib/data-events';
export function useNotificationInbox() {
  const resource = useRemoteData(getNotifications);
  const { retry } = resource;
  useEffect(() => {
    const refresh = () => retry();
    const visibility = () => {
      if (document.visibilityState === 'visible') refresh();
    };
    const storage = (event: StorageEvent) => {
      if (event.key === demoDataStorageKey) refresh();
    };
    window.addEventListener(tasksChangedEvent, refresh);
    window.addEventListener('focus', refresh);
    window.addEventListener('storage', storage);
    document.addEventListener('visibilitychange', visibility);
    return () => {
      window.removeEventListener(tasksChangedEvent, refresh);
      window.removeEventListener('focus', refresh);
      window.removeEventListener('storage', storage);
      document.removeEventListener('visibilitychange', visibility);
    };
  }, [retry]);
  return resource;
}
