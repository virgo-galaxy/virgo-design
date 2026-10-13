import { getUser, type UserDetailsDto } from '@/api/users';

const ttl = 5 * 60 * 1000;
const maxEntries = 100;

export function createUserDetailsCache(load = getUser) {
  const entries = new Map<string, { data: UserDetailsDto; expiresAt: number }>();
  const pending = new Map<string, Promise<UserDetailsDto>>();
  let generation = 0;

  function peek(id: string): UserDetailsDto | undefined {
    const entry = entries.get(id);
    if (!entry) return undefined;
    if (entry.expiresAt <= Date.now()) {
      entries.delete(id);
      return undefined;
    }
    return entry.data;
  }

  function get(id: string): Promise<UserDetailsDto> {
    const cached = peek(id);
    if (cached) return Promise.resolve(cached);
    const inFlight = pending.get(id);
    if (inFlight) return inFlight;
    const requestGeneration = generation;
    const request = load(id)
      .then((data) => {
        if (requestGeneration === generation) {
          entries.delete(id);
          entries.set(id, { data, expiresAt: Date.now() + ttl });
          if (entries.size > maxEntries) entries.delete(entries.keys().next().value!);
        }
        return data;
      })
      .finally(() => {
        if (pending.get(id) === request) pending.delete(id);
      });
    pending.set(id, request);
    return request;
  }

  return {
    get,
    peek,
    clear() {
      generation += 1;
      entries.clear();
      pending.clear();
    },
  };
}

// Browser-only Pro app: shared across rows and routes, discarded on page reload.
export const userDetailsCache = createUserDetailsCache();
