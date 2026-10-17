import { Navigate, Outlet, useOutletContext } from 'react-router';

import { RemoteState } from '@/components/remote-state/RemoteState';
import { useAgentMode } from '@/features/ai-workspace/store';
import type { useSessionState } from '@/features/auth';
import { LoginPage } from '@/features/auth/routes';
import { proRouteConfig } from '@/routes';

import { AppShell } from '../shell/AppShell';

type SessionState = ReturnType<typeof useSessionState>;

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
  const { agentMode, setAgentMode } = useAgentMode();

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
