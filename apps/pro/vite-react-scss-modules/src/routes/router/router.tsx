import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate, type RouteObject } from 'react-router';

import { routePath } from '../definitions/paths';
import { proRouteConfig } from '../definitions/routes.config';
import { proRouting } from '../matching/match';
import { RouteError } from './RouteError';
import { LoginRoute, PageRoute } from './RouteViews';
import { ProtectedRoute, SessionRoute } from './SessionRoute';

const demo = import.meta.env.VITE_API_MOCKING === 'true' ? await import('@/mock') : undefined;

const DemoLoginPage = demo
  ? lazy(() => import('@/mock/react').then((module) => ({ default: module.DemoLoginPage })))
  : null;
const DemoResetAction = demo
  ? lazy(() => import('@/mock/react').then((module) => ({ default: module.DemoResetAction })))
  : null;

export function createAppRoutes(): RouteObject[] {
  return [
    {
      element: <SessionRoute subscribeToChanges={demo?.subscribeToDemoChanges} />,
      errorElement: <RouteError />,
      children: [
        {
          path: routePath(proRouteConfig.login),
          element: <LoginRoute>{DemoLoginPage ? <DemoLoginPage /> : null}</LoginRoute>,
        },
        {
          element: (
            <ProtectedRoute
              settingsActions={
                DemoResetAction ? (
                  <Suspense fallback={null}>
                    <DemoResetAction />
                  </Suspense>
                ) : null
              }
            />
          ),
          children: [
            ...proRouteConfig.redirects.map((redirect) => ({
              path: redirect.path,
              element: <Navigate to={routePath(redirect.to)} replace />,
            })),
            ...proRouting.routes.map((route) => ({
              id: route.key,
              path: route.path,
              element: <PageRoute route={route} />,
              errorElement: <RouteError />,
            })),
          ],
        },
      ],
    },
  ];
}

export const createAppRouter = () => createBrowserRouter(createAppRoutes());
