'use client';

import type { ReactNode } from 'react';

import { useAppSession } from '@/features/auth/context/app-session-context';
import { CatalogProvider } from '@/features/catalog';
import { ProfileIdentityProvider } from '@/features/profile';
import { AppLayout } from '@/layout';
import { DemoResetAction } from '@/mock/react';
import { RouteRedirect } from '@/routes/navigation';

export function ProtectedLayout({ children }: { children: ReactNode }) {
  const state = useAppSession();
  if (!state.current?.authenticated) return <RouteRedirect to="/login" replace />;
  return (
    <CatalogProvider>
      <ProfileIdentityProvider>
        <AppLayout
          settingsActions={
            process.env.NEXT_PUBLIC_API_MOCKING === 'true' ? <DemoResetAction /> : null
          }
        >
          {children}
        </AppLayout>
      </ProfileIdentityProvider>
    </CatalogProvider>
  );
}
