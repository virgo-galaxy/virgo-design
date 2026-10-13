import { Skeleton } from '@virgo-design/ui';
import { lazy, type ReactElement, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate, useSearchParams } from 'react-router';

import { legacyProjectIds } from '@/api/projects/legacy-project-ids';
import { loadAnalyticsPage } from '@/features/analytics/routes';
import { useCurrentUser } from '@/features/auth';
import { useTaskCatalog } from '@/features/catalog';
import { loadProjectHandoffPage } from '@/features/handoff/routes';
import { loadProfilePage } from '@/features/profile/routes';
import { loadProjectDetailPage, loadProjectsPage } from '@/features/projects/routes';
import { loadTaskCardsPage, loadTasksPage, loadTaskWorkspacePage } from '@/features/tasks/routes';
import {
  canAccessRoute,
  type ProPageKey,
  proRouteConfig,
  routePath,
  routeWithQuery,
} from '@/routing';
import type { ResolvedProRoute } from '@/routing/match';

const AnalyticsPage = lazy(loadAnalyticsPage);
const ProjectDetailPage = lazy(loadProjectDetailPage);
const ExceptionPage = lazy(() =>
  import('@/pages/exceptions/ExceptionPage').then((module) => ({ default: module.ExceptionPage })),
);
const ProjectHandoffPage = lazy(loadProjectHandoffPage);
const NotFoundPage = lazy(() =>
  import('@/pages/NotFoundPage').then((module) => ({ default: module.NotFoundPage })),
);
const ProfilePage = lazy(loadProfilePage);
const ProjectsPage = lazy(loadProjectsPage);
const ResultPage = lazy(() =>
  import('@/pages/results/ResultPage').then((module) => ({ default: module.ResultPage })),
);
const TaskWorkspacePage = lazy(loadTaskWorkspacePage);
const TaskCardsPage = lazy(loadTaskCardsPage);
const TasksPage = lazy(loadTasksPage);
const WorkplacePage = lazy(() =>
  import('@/pages/workplace/WorkplacePage').then((module) => ({ default: module.WorkplacePage })),
);

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
  const pages: Record<ProPageKey, ReactElement> = {
    workplace: <WorkplacePage />,
    analytics: <AnalyticsPage />,
    tasks: <TasksPage />,
    'task-cards': <TaskCardsPage />,
    'task-create': <TaskWorkspacePage mode="create" />,
    'task-edit': <TaskWorkspacePage mode="edit" />,
    'task-details': <TaskWorkspacePage mode="details" />,
    projects: <ProjectsPage />,
    'project-detail': <ProjectDetailPage />,
    'project-handoff': <ProjectHandoffPage />,
    success: <ResultPage outcome="success" />,
    error: <ResultPage outcome="error" />,
    'exception-403': <ExceptionPage code="403" />,
    'exception-404': <ExceptionPage code="404" />,
    'exception-500': <ExceptionPage code="500" />,
    profile: <ProfilePage />,
    'not-found': <NotFoundPage />,
  };

  return (
    <Suspense key={route.id} fallback={<RouteLoading />}>
      {!canAccessRoute(user, route) ? (
        route.deniedDestination === 'home' ? (
          <Navigate to={proRouteConfig.homePath} replace />
        ) : (
          <ExceptionPage code="403" />
        )
      ) : (
        pages[route.page]
      )}
    </Suspense>
  );
}

export function LegacyRedirect({ kind }: { kind: 'tasks' | 'project' | 'handoff' }) {
  const [params] = useSearchParams();
  const { projects } = useTaskCatalog();
  if (kind === 'tasks') {
    const next = new URLSearchParams(params);
    next.delete('view');
    return <Navigate to={routeWithQuery(routePath('task-cards'), next)} replace />;
  }
  const legacyId = legacyProjectIds[params.get('project') ?? ''];
  const project =
    projects.find(
      (p) => p.id === (legacyId ?? params.get('project')) || p.name === params.get('project'),
    ) ?? projects[0];
  return (
    <Navigate
      to={
        project
          ? routePath(kind === 'handoff' ? 'project-handoff' : 'project-detail', {
              projectId: project.id,
            })
          : routePath('projects')
      }
      replace
    />
  );
}
