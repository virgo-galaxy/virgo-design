import { lazy, type ReactNode, Suspense } from 'react';
import { Navigate, Outlet, useOutletContext } from 'react-router';

import { RemoteState } from '@/components/remote-state/RemoteState';
import { SessionContext, useSessionState } from '@/features/auth';
import { userDetailsCache } from '@/features/users';
import { clearStoredSessionState, SessionStoreProvider } from '@/store';
import type { ResourceSubscriber } from '@/store/resources';

import { routePath } from '../definitions/paths';
import { proRouteConfig } from '../definitions/routes.config';
import { RouteLoading } from './RouteViews';

const MainLayout = lazy(() =>
  import('@/layout').then((module) => ({ default: module.MainLayout })),
);

type SessionState = ReturnType<typeof useSessionState>;

function clearSessionState() {
  clearStoredSessionState();
  userDetailsCache.clear();
}

export function SessionRoute() {
  const state = useSessionState({
    onSessionEnd: clearSessionState,
    onSessionStart: clearSessionState,
  });

  if (!state.current) {
    return (
      <RemoteState
        loading={state.resource.loading}
        error={state.resource.error}
        retry={state.resource.retry}
      />
    );
  }

  const outlet = <Outlet context={state} />;

  if (!state.current.authenticated || !state.current.user) return outlet;

  return (
    <SessionContext
      value={{ user: state.current.user, signOut: state.signOut, endSession: state.endSession }}
    >
      <SessionStoreProvider user={state.current.user}>{outlet}</SessionStoreProvider>
    </SessionContext>
  );
}

export function ProtectedRoute({
  settingsActions,
  subscribeToChanges,
}: {
  settingsActions?: ReactNode;
  subscribeToChanges?: ResourceSubscriber | undefined;
}) {
  const state = useOutletContext<SessionState>();

  if (!state.current?.authenticated || !state.current.user) {
    return <Navigate to={routePath(proRouteConfig.login)} replace />;
  }

  return (
    <Suspense fallback={<RouteLoading />}>
      <MainLayout settingsActions={settingsActions} subscribeToChanges={subscribeToChanges} />
    </Suspense>
  );
}
