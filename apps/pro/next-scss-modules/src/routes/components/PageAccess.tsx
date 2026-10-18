'use client';

import type { ReactNode } from 'react';

import { ExceptionState } from '@/components/feedback/exception-state';
import { useCurrentUser } from '@/features/auth';
import { canAccessRoute, proRouteConfig, proRouting, routePath } from '@/routes';
import { RouteRedirect } from '@/routes/navigation';

export function PageAccess({ routeKey, children }: { routeKey: string; children: ReactNode }) {
  const user = useCurrentUser();
  const route = proRouting.routes.find((entry) => entry.key === routeKey);
  if (route && !canAccessRoute(user, route))
    return route.deniedDestination === 'home' ? (
      <RouteRedirect to={routePath(proRouteConfig.home)} replace />
    ) : (
      <ExceptionState code="403" />
    );
  return children;
}
