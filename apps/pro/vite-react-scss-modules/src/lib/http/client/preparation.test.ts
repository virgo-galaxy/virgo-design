import { afterEach, expect, it, vi } from 'vitest';

import { http } from './client';
import { setHttpPreparation } from './preparation';

afterEach(() => setHttpPreparation());

it('waits for transport activation before sending the request', async () => {
  let ready!: () => void;
  setHttpPreparation(
    () =>
      new Promise<void>((resolve) => {
        ready = resolve;
      }),
  );
  const adapter = vi.fn(async (config) => ({
    config,
    status: 200,
    statusText: 'OK',
    headers: {},
    data: { code: 0, msg: 'success', data: ['task'] },
  }));
  const request = http.get('/tasks', { adapter });
  expect(adapter).not.toHaveBeenCalled();
  ready();
  await expect(request).resolves.toEqual(['task']);
  expect(adapter).toHaveBeenCalledTimes(1);
});

it('does not send a mutation or retry it when activation fails', async () => {
  setHttpPreparation(() => Promise.reject(new Error('Mock unavailable')));
  const adapter = vi.fn();
  await expect(http.post('/tasks', { title: 'Task' }, { adapter })).rejects.toThrow(
    'Mock unavailable',
  );
  expect(adapter).not.toHaveBeenCalled();
});
