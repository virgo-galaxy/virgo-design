import type { SessionUser } from '@/api/auth/types';

import { proRouting, type ResolvedProRoute } from './match';

export function canAccessRoute(user: SessionUser | undefined, route: ResolvedProRoute) {
  if (route.access === 'admin') return user?.role === 'admin';
  if (route.access === 'manage') return user?.role === 'admin' || user?.role === 'manager';

  return true;
}

export function canVisitRoute(user: SessionUser | undefined, key: string) {
  const route = proRouting.routes.find((route) => route.key === key);

  return route ? canAccessRoute(user, route) : false;
}
