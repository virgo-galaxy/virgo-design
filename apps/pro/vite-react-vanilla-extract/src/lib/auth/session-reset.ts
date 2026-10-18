import { localStorageAccess } from '@/lib/storage';

export const sessionResetKey = 'virgo-pro.auth-reset';

export function getSessionResetId() {
  return localStorageAccess.get(sessionResetKey).value;
}

function resetChannel() {
  try {
    return typeof window.BroadcastChannel === 'function'
      ? new window.BroadcastChannel(sessionResetKey)
      : undefined;
  } catch {
    return undefined;
  }
}

export function publishSessionReset() {
  const id = crypto.randomUUID();
  localStorageAccess.set(sessionResetKey, id);
  const channel = resetChannel();
  try {
    channel?.postMessage(id);
  } catch {
  } finally {
    channel?.close();
  }
}

export function subscribeToSessionReset(listener: () => void) {
  let previous = getSessionResetId();
  const receive = (id: unknown) => {
    if (typeof id !== 'string' || !id || id === previous) return;
    previous = id;
    listener();
  };
  const storage = (event: StorageEvent) => {
    if (event.key === sessionResetKey && localStorageAccess.matchesEvent(event))
      receive(event.newValue);
  };
  const resume = () => receive(getSessionResetId());
  const channel = resetChannel();
  if (channel) channel.onmessage = (event: MessageEvent<unknown>) => receive(event.data);
  window.addEventListener('storage', storage);
  window.addEventListener('pageshow', resume);
  return () => {
    window.removeEventListener('storage', storage);
    window.removeEventListener('pageshow', resume);
    channel?.close();
  };
}
