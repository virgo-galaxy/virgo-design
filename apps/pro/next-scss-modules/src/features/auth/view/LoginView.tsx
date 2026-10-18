import type { ReactNode } from 'react';

import type { LoginRequest } from '@/api/auth/types';
import { proRouteConfig, routePath } from '@/routes';
import { RouteRedirect } from '@/routes/navigation';

import { useAppSession } from '../context/app-session-context';
import { LoginForm } from './LoginForm';

export function LoginView({
  defaultCredentials,
  children,
}: {
  defaultCredentials?: LoginRequest | undefined;
  children?: ReactNode;
}) {
  const state = useAppSession();

  return state.current?.authenticated ? (
    <RouteRedirect to={routePath(proRouteConfig.home)} replace />
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
