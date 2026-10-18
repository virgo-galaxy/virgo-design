'use client';

import { useEffect } from 'react';

import { useAppNavigation } from './use-app-navigation';

export function RouteRedirect({ to, replace = false }: { to: string; replace?: boolean }) {
  const navigate = useAppNavigation();
  useEffect(() => {
    navigate(to, { replace });
  }, [navigate, to, replace]);
  return null;
}
