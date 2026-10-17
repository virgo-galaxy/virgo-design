import { Skeleton } from '@virgo-design/ui';
import { type ComponentType, lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate } from 'react-router';

import { useCurrentUser } from '@/features/auth';
import type { ResolvedProRoute } from '@/routes';
import { canAccessRoute, proRouteConfig, proRouting } from '@/routes';

const pageModules = import.meta.glob<{ default: ComponentType }>('/src/pages/**/index.tsx');

function createPage(path: string) {
  const directory = path === '*' ? '/not-found' : path.replace(/:([^/]+)/g, '[$1]');
  const load = pageModules[`/src/pages${directory}/index.tsx`];

  if (!load) throw new Error(`No page entry for route "${path}".`);

  return lazy(load);
}

const pages = new Map(proRouting.routes.map((route) => [route.page, createPage(route.path)]));
const LoginPage = createPage(proRouteConfig.loginPath);
const ForbiddenPage = pages.get('exception-403')!;

export function RouteLoading() {
  const { t } = useTranslation();

  return (
    <div
      role="status"
      aria-label={t('app.loadingPage')}
      style={{ padding: 'var(--vd-spacing-24)', display: 'grid', gap: 'var(--vd-spacing-16)' }}
    >
      <Skeleton variant="text" style={{ width: '40%' }} />
      <Skeleton style={{ height: 'var(--vd-sizing-80)' }} />
      <Skeleton style={{ height: 'var(--vd-sizing-80)' }} />
    </div>
  );
}

export function PageRoute({ route }: { route: ResolvedProRoute }) {
  const user = useCurrentUser();
  const Page = pages.get(route.page)!;

  return (
    <Suspense key={route.id} fallback={<RouteLoading />}>
      {!canAccessRoute(user, route) ? (
        route.deniedDestination === 'home' ? (
          <Navigate to={proRouteConfig.homePath} replace />
        ) : (
          <ForbiddenPage />
        )
      ) : (
        <Page />
      )}
    </Suspense>
  );
}

export function LoginRoute() {
  return (
    <Suspense fallback={<RouteLoading />}>
      <LoginPage />
    </Suspense>
  );
}
