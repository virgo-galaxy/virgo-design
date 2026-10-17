import { createBrowserRouter, Navigate, type RouteObject } from 'react-router';

import { ProtectedLayout } from '@/layout';
import { proRouteConfig, proRouting, routePath } from '@/routes';

import { SessionProvider } from '../composition/providers/SessionProvider';
import { RouteError } from './RouteError';
import { LoginRoute, PageRoute } from './RouteViews';

export function createAppRoutes(): RouteObject[] {
  return [
    {
      element: <SessionProvider />,
      errorElement: <RouteError />,
      children: [
        { path: routePath(proRouteConfig.login), element: <LoginRoute /> },
        {
          element: <ProtectedLayout />,
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
