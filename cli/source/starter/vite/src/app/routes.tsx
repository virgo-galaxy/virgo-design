import { Outlet, redirect, type RouteObject } from 'react-router';

import { AppShell } from '@/layout/AppShell';
import { WorkplacePage } from '@/views/dashboard/workplace';
import { RouteErrorPage } from '@/views/RouteErrorPage';

import { workplacePath } from './paths';
import { RouteErrorBoundary } from './RouteErrorBoundary';

export const routes: RouteObject[] = [
  {
    element: (
      <AppShell>
        <Outlet />
      </AppShell>
    ),
    children: [
      {
        errorElement: <RouteErrorBoundary />,
        children: [
          { index: true, loader: () => redirect(workplacePath) },
          { path: workplacePath, element: <WorkplacePage /> },
          { path: '*', element: <RouteErrorPage notFound /> },
        ],
      },
    ],
  },
];
