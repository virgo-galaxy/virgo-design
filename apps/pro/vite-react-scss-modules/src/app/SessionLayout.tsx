import { Navigate, Outlet, useOutletContext } from 'react-router';

import { saveAgentMode } from '@/components/ai-workspace/agent-mode';
import { useAgentMode } from '@/components/ai-workspace/use-agent-mode';
import { LoginPage, SessionContext, useSessionState } from '@/features/auth';
import { HandoffSessionProvider } from '@/features/handoff';
import { userDetailsCache } from '@/features/users';
import { resetAppLocale } from '@/i18n/runtime';
import { isAdmin } from '@/lib/auth/permissions';
import { proRouteConfig } from '@/routing';
import { RemoteState } from '@/shared/async/RemoteState';

import { AppShell } from './AppShell';
import { ProResourcesProvider } from './ProResourcesProvider';

const endSession = () => {
  saveAgentMode(false);
  userDetailsCache.clear();
};
const startSession = () => userDetailsCache.clear();
type SessionState = ReturnType<typeof useSessionState>;

/** Composition owns identity-scoped product resources; Auth owns session lifecycle. */
export function SessionLayout() {
  const state = useSessionState({
    onSessionEnd: endSession,
    onSessionStart: startSession,
    onDemoReset: resetAppLocale,
  });
  if (!state.current)
    return (
      <RemoteState
        loading={state.resource.loading}
        error={state.resource.error}
        retry={state.resource.retry}
      />
    );
  if (!state.current.authenticated || !state.current.user) return <Outlet context={state} />;
  return (
    <SessionContext
      value={{ user: state.current.user, signOut: state.signOut, resetDemo: state.resetDemo }}
    >
      <ProResourcesProvider key={state.current.user.id}>
        <HandoffSessionProvider>
          <Outlet context={state} />
        </HandoffSessionProvider>
      </ProResourcesProvider>
    </SessionContext>
  );
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
