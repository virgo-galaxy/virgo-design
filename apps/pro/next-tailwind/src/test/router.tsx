import { Navigate, Outlet, type RouteObject } from 'react-router';

import Page4 from '@/app/(pro)/dashboard/workplace/page';
import Page14 from '@/app/(pro)/exception/403/page';
import Page15 from '@/app/(pro)/exception/404/page';
import Page13 from '@/app/(pro)/exception/500/page';
import Page0 from '@/app/(pro)/profile/page';
import Page3 from '@/app/(pro)/result/error/page';
import Page2 from '@/app/(pro)/result/success/page';
import Page1 from '@/app/(pro)/visualization/analytics/page';
import Page12 from '@/app/(pro)/work/projects/[projectId]/handoff/page';
import Page11 from '@/app/(pro)/work/projects/[projectId]/page';
import Page6 from '@/app/(pro)/work/projects/page';
import Page7 from '@/app/(pro)/work/task-cards/page';
import Page10 from '@/app/(pro)/work/tasks/[id]/edit/page';
import Page9 from '@/app/(pro)/work/tasks/[id]/page';
import Page8 from '@/app/(pro)/work/tasks/new/page';
import Page5 from '@/app/(pro)/work/tasks/page';
import LoginPage from '@/app/login/page';
import { ExceptionState } from '@/components/feedback/exception-state';
import { AppSessionProvider } from '@/features/auth/context/AppSessionProvider';
import { proRouting } from '@/routes';
import { PageAccess } from '@/routes/components/PageAccess';
import { ProtectedLayout } from '@/routes/components/ProtectedLayout';
import { RouteError } from '@/routes/components/RouteError';
const pages = [
  { key: 'profile', Page: Page0 },
  { key: 'visualization.analytics', Page: Page1 },
  { key: 'result.success', Page: Page2 },
  { key: 'result.error', Page: Page3 },
  { key: 'dashboard.workplace', Page: Page4 },
  { key: 'work.tasks', Page: Page5 },
  { key: 'work.projects', Page: Page6 },
  { key: 'work.task-cards', Page: Page7 },
  { key: 'work.tasks.new', Page: Page8 },
  { key: 'work.tasks.[id]', Page: Page9 },
  { key: 'work.tasks.[id].edit', Page: Page10 },
  { key: 'work.projects.[projectId]', Page: Page11 },
  { key: 'work.projects.[projectId].handoff', Page: Page12 },
  { key: 'exception.500', Page: Page13 },
  { key: 'exception.403', Page: Page14 },
  { key: 'exception.404', Page: Page15 },
];
export function createAppRoutes(): RouteObject[] {
  return [
    {
      element: (
        <AppSessionProvider>
          <Outlet />
        </AppSessionProvider>
      ),
      errorElement: <RouteError />,
      children: [
        { path: '/login', element: <LoginPage /> },
        {
          element: (
            <ProtectedLayout>
              <Outlet />
            </ProtectedLayout>
          ),
          children: [
            { path: '/', element: <Navigate to="/dashboard/workplace" replace /> },
            ...pages.map(({ key, Page }) => ({
              path: proRouting.routes.find((route) => route.key === key)!.path,
              element: (
                <PageAccess routeKey={key}>
                  <Page />
                </PageAccess>
              ),
              errorElement: <RouteError />,
            })),
            { path: '*', element: <ExceptionState code="404" /> },
          ],
        },
      ],
    },
  ];
}
