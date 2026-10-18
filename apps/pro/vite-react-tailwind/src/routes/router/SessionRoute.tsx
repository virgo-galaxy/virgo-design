import { lazy, type ReactNode, Suspense } from 'react';
import { Navigate, Outlet, useOutletContext } from 'react-router';

import { RemoteState } from '@/components/feedback/remote-state';
import { SessionContext, useSessionState } from '@/features/auth';
import { CatalogProvider } from '@/features/catalog';
import { ProfileIdentityProvider } from '@/features/profile';
import { userDetailsCache } from '@/features/users';
import { clearStoredSessionState, SessionStoreProvider } from '@/store';
import type { ResourceSubscriber } from '@/store/resources';

import { routePath } from '../definitions/paths';
import { proRouteConfig } from '../definitions/routes.config';
import { RouteLoading } from './RouteViews';

const AppLayout = lazy(() => import('@/layout').then((module) => ({ default: module.AppLayout })));

type SessionState = ReturnType<typeof useSessionState>;

function clearSessionState() {
  clearStoredSessionState();
  userDetailsCache.clear();
}

export function SessionRoute({
  subscribeToChanges,
}: {
  subscribeToChanges?: ResourceSubscriber | undefined;
}) {
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
      <SessionStoreProvider user={state.current.user} subscribeToChanges={subscribeToChanges}>
        {outlet}
      </SessionStoreProvider>
    </SessionContext>
  );
}

export function ProtectedRoute({ settingsActions }: { settingsActions?: ReactNode }) {
  const state = useOutletContext<SessionState>();

  if (!state.current?.authenticated || !state.current.user) {
    return <Navigate to={routePath(proRouteConfig.login)} replace />;
  }

  return (
    <Suspense fallback={<RouteLoading />}>
      <CatalogProvider>
        <ProfileIdentityProvider>
          <AppLayout settingsActions={settingsActions} />
        </ProfileIdentityProvider>
      </CatalogProvider>
    </Suspense>
  );
}
