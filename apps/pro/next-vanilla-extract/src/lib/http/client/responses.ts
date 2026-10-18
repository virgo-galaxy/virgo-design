import type { AxiosResponse } from 'axios';

const listeners = new Set<(response: AxiosResponse<unknown>) => void>();

export function subscribeToHttpResponses(listener: (response: AxiosResponse<unknown>) => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function notifyHttpResponse(response: AxiosResponse<unknown>) {
  for (const listener of listeners) listener(response);
}
