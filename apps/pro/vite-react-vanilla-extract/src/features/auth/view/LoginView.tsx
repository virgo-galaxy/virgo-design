import type { ReactNode } from 'react';
import { Navigate, useOutletContext } from 'react-router';

import type { LoginRequest } from '@/api/auth/types';
import { proRouteConfig, routePath } from '@/routes';

import type { useSessionState } from '../hooks/use-session-state';
import { LoginForm } from './LoginForm';

export function LoginView({
  defaultCredentials,
  children,
}: {
  defaultCredentials?: LoginRequest | undefined;
  children?: ReactNode;
}) {
  const state = useOutletContext<ReturnType<typeof useSessionState>>();

  return state.current?.authenticated ? (
    <Navigate to={routePath(proRouteConfig.home)} replace />
  ) : (
    <LoginForm
      expired={state.expired}
      onLogin={state.onLogin}
      defaultCredentials={defaultCredentials}
    >
      {children}
    </LoginForm>
  );
}
