import { Navigate, Outlet, useOutletContext } from 'react-router';

import { useAgentMode } from '@/features/ai-workspace';
import type { useSessionState } from '@/features/auth';
import { LoginPage } from '@/features/auth/routes';
import { isAdmin } from '@/lib/auth/permissions';
import { proRouteConfig } from '@/routing';
import { RemoteState } from '@/shared/async/RemoteState';

import { AppShell } from './AppShell';

type SessionState = ReturnType<typeof useSessionState>;

/** Route layout owns loading presentation and the outlet's session context. */
export function SessionLayout({ state }: { state: SessionState }) {
  if (!state.current)
    return (
      <RemoteState
        loading={state.resource.loading}
        error={state.resource.error}
        retry={state.resource.retry}
      />
    );
  return <Outlet context={state} />;
}
export function LoginRoute() {
  const state = useOutletContext<SessionState>();
  return state.current?.authenticated ? (
    <Navigate to={proRouteConfig.homePath} replace />
  ) : (
    <LoginPage expired={state.expired} onLogin={state.onLogin} />
  );
}
function AuthenticatedShell() {
  const state = useOutletContext<SessionState>();
  const { agentMode, setAgentMode } = useAgentMode(isAdmin(state.current?.user));
  return <AppShell agentMode={agentMode} onAgentModeChange={setAgentMode} />;
}
export function ProtectedLayout() {
  const state = useOutletContext<SessionState>();
  return state.current?.authenticated && state.current.user ? (
    <AuthenticatedShell />
  ) : (
    <Navigate to={proRouteConfig.loginPath} replace />
  );
}
