import { createBrowserRouter, Navigate, type RouteObject } from 'react-router';

import { CatalogBoundary } from '@/features/catalog';
import { proRouteConfig, proRouting } from '@/routing';

import { LegacyRedirect, PageRoute } from './RouteViews';
import { LoginRoute, ProtectedLayout, SessionLayout } from './SessionLayout';
export function createAppRoutes(): RouteObject[] {
  return [
    {
      element: <SessionLayout />,
      children: [
        { path: proRouteConfig.loginPath, element: <LoginRoute /> },
        {
          element: <ProtectedLayout />,
          children: [
            ...proRouteConfig.redirects.map((redirect) => ({
              path: redirect.path,
              element:
                'legacy' in redirect ? (
                  <CatalogBoundary>
                    <LegacyRedirect kind={redirect.legacy} />
                  </CatalogBoundary>
                ) : (
                  <Navigate to={redirect.to} replace />
                ),
            })),
            ...proRouting.routes.map((route) => ({
              id: route.id,
              path: route.path,
              element: <PageRoute route={route} />,
            })),
          ],
        },
      ],
    },
  ];
}
export const createAppRouter = () => createBrowserRouter(createAppRoutes());
