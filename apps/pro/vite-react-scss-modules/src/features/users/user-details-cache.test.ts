import { afterEach, describe, expect, it, vi } from 'vitest';

import type { UserDetailsDto } from '@/api/users';
import { createUserDetailsCache } from '@/features/users/user-details-cache';
import { users } from '@/mock/fixtures/users';

afterEach(() => vi.restoreAllMocks());
const nina = users.find((user) => user.id === 'nina')!;

describe('user details memory cache', () => {
  it('deduplicates concurrent requests and reuses profiles across rows', async () => {
    let complete!: (user: UserDetailsDto) => void;
    const load = vi.fn(
      () =>
        new Promise<UserDetailsDto>((resolve) => {
          complete = resolve;
        }),
    );
    const cache = createUserDetailsCache(load);
    const first = cache.get('nina');
    const second = cache.get('nina');
    expect(second).toBe(first);
    expect(load).toHaveBeenCalledTimes(1);
    complete(nina);
    await expect(first).resolves.toEqual(nina);
    await expect(cache.get('nina')).resolves.toEqual(nina);
    expect(load).toHaveBeenCalledTimes(1);
  });

  it('refetches after five minutes and keeps different users separate', async () => {
    let now = 1000;
    vi.spyOn(Date, 'now').mockImplementation(() => now);
    const load = vi.fn(async (id: string) => users.find((user) => user.id === id)!);
    const cache = createUserDetailsCache(load);
    await cache.get('nina');
    await cache.get('leo');
    now += 5 * 60 * 1000;
    expect(cache.peek('nina')).toBeUndefined();
    await cache.get('nina');
    expect(load.mock.calls.map(([id]) => id)).toEqual(['nina', 'leo', 'nina']);
  });

  it('does not cache failures, so the next request can retry', async () => {
    const load = vi.fn().mockRejectedValueOnce(new Error('Unavailable')).mockResolvedValue(nina);
    const cache = createUserDetailsCache(load);
    await expect(cache.get('nina')).rejects.toThrow('Unavailable');
    expect(cache.peek('nina')).toBeUndefined();
    await expect(cache.get('nina')).resolves.toEqual(nina);
    expect(load).toHaveBeenCalledTimes(2);
  });

  it('prevents a cleared in-flight request from repopulating the cache', async () => {
    let complete!: (user: UserDetailsDto) => void;
    const cache = createUserDetailsCache(
      () =>
        new Promise((resolve) => {
          complete = resolve;
        }),
    );
    const request = cache.get('nina');
    cache.clear();
    complete(nina);
    await request;
    expect(cache.peek('nina')).toBeUndefined();
  });

  it('bounds retained profiles instead of growing indefinitely', async () => {
    const cache = createUserDetailsCache(async (id) => ({ ...nina, id }));
    for (let index = 0; index <= 100; index++) await cache.get(String(index));
    expect(cache.peek('0')).toBeUndefined();
    expect(cache.peek('100')).toMatchObject({ id: '100' });
  });
});
