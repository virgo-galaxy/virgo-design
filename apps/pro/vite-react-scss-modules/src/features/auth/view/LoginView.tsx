import { Navigate, useOutletContext } from 'react-router';

import { proRouteConfig, routePath } from '@/routes';

import type { useSessionState } from '../hooks/use-session-state';
import { LoginForm } from './LoginForm';

export function LoginView() {
  const state = useOutletContext<ReturnType<typeof useSessionState>>();

  return state.current?.authenticated ? (
    <Navigate to={routePath(proRouteConfig.home)} replace />
  ) : (
    <LoginForm expired={state.expired} onLogin={state.onLogin} />
  );
}
