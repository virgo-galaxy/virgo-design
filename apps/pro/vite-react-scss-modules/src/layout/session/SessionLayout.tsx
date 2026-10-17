import { Navigate, Outlet, useOutletContext } from 'react-router';

import { RemoteState } from '@/components/remote-state/RemoteState';
import { useAgentMode } from '@/features/ai-workspace/store';
import type { useSessionState } from '@/features/auth';
import { proRouteConfig, routePath } from '@/routes';

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

function AuthenticatedShell() {
  const { agentMode, setAgentMode } = useAgentMode();

  return <AppShell agentMode={agentMode} onAgentModeChange={setAgentMode} />;
}

export function ProtectedLayout() {
  const state = useOutletContext<SessionState>();

  return state.current?.authenticated && state.current.user ? (
    <AuthenticatedShell />
  ) : (
    <Navigate to={routePath(proRouteConfig.login)} replace />
  );
}
