import { Skeleton } from '@virgo-design/ui';
import { lazy, type ReactElement, Suspense, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  createBrowserRouter,
  Navigate,
  Route,
  RouterProvider,
  Routes,
  useSearchParams,
} from 'react-router';

import { prepareHandoff as prepareRemoteHandoff } from '@/api/workflows';
import { AppShell } from '@/app/AppShell';
import { type ProPageKey, proRouteConfig } from '@/app/routes.config';
import { proRouting } from '@/app/routing';
import { useProData } from '@/application/pro-data-context';
import { useCurrentUser } from '@/application/session-context';
import { TaskCollectionBoundary } from '@/application/TaskCollectionBoundary';
import { useAgentMode } from '@/application/use-agent-mode';
import {
  type HandoffDraft,
  handoffFromReceipt,
  initialHandoff,
  type WorkflowReceipt,
} from '@/data/pro-workflows';
import { canVisitPage, isAdmin, isAdminShowcasePage } from '@/lib/auth/permissions';
const AnalyticsPage = lazy(() =>
  import('@/pages/analytics/AnalyticsPage').then((module) => ({ default: module.AnalyticsPage })),
);
const ProjectDetailPage = lazy(() =>
  import('@/pages/projects/ProjectDetailPage').then((module) => ({
    default: module.ProjectDetailPage,
  })),
);
const ExceptionPage = lazy(() =>
  import('@/pages/exceptions/ExceptionPage').then((module) => ({ default: module.ExceptionPage })),
);
const ProjectHandoffPage = lazy(() =>
  import('@/pages/projects/ProjectHandoffPage').then((module) => ({
    default: module.ProjectHandoffPage,
  })),
);
const NotFoundPage = lazy(() =>
  import('@/pages/NotFoundPage').then((module) => ({ default: module.NotFoundPage })),
);
const ProfilePage = lazy(() =>
  import('@/pages/profile/ProfilePage').then((module) => ({ default: module.ProfilePage })),
);
const ProjectsPage = lazy(() =>
  import('@/pages/projects/ProjectsPage').then((module) => ({ default: module.ProjectsPage })),
);
const ResultPage = lazy(() =>
  import('@/pages/results/ResultPage').then((module) => ({ default: module.ResultPage })),
);
const TaskWorkspacePage = lazy(() =>
  import('@/pages/tasks/TaskWorkspacePage').then((module) => ({
    default: module.TaskWorkspacePage,
  })),
);
const TaskCardsPage = lazy(() =>
  import('@/pages/tasks/TaskCardsPage').then((module) => ({ default: module.TaskCardsPage })),
);
const TasksPage = lazy(() =>
  import('@/pages/tasks/TasksPage').then((module) => ({ default: module.TasksPage })),
);
const WorkplacePage = lazy(() =>
  import('@/pages/workplace/WorkplacePage').then((module) => ({ default: module.WorkplacePage })),
);

function RouteLoading() {
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
function ApplicationRoutes() {
  const user = useCurrentUser();
  const { agentMode, setAgentMode } = useAgentMode(isAdmin(user));
  const {
    state: tasks,
    dispatch,
    profile,
    saveProfile: setProfile,
    projects,
    workflows,
    taskReferenceDate,
  } = useProData();
  const [handoff, setHandoff] = useState<HandoffDraft>(() => ({
    ...initialHandoff,
    projectId: projects[0]?.id ?? initialHandoff.projectId,
    taskIds: [],
    date: taskReferenceDate,
  }));
  const [stage, setStage] = useState(0);
  const [success, setSuccess] = useState<WorkflowReceipt>(workflows.success);
  const [error, setError] = useState<WorkflowReceipt>(workflows.error);
  const prepare = async (draft = handoff) => {
    const receipt = await prepareRemoteHandoff(draft);
    if (receipt.outcome === 'success') setSuccess(receipt);
    else setError(receipt);
    return receipt;
  };
  const recover = () => {
    setHandoff(handoffFromReceipt(error));
    setStage(1);
  };
  const retry = async () => {
    const draft = { ...handoffFromReceipt(error), audience: 'team' as const, confirmed: true };
    setHandoff(draft);
    const receipt = await prepare(draft);
    setStage(receipt ? 2 : 1);
    return receipt;
  };
  const pages: Record<ProPageKey, ReactElement> = {
    workplace: <WorkplacePage />,
    analytics: <AnalyticsPage state={tasks} />,
    tasks: <TasksPage dispatch={dispatch} />,
    'task-cards': <TaskCardsPage />,
    'task-create': <TaskWorkspacePage mode="create" />,
    'task-edit': <TaskWorkspacePage mode="edit" />,
    'task-details': <TaskWorkspacePage mode="details" />,
    projects: <ProjectsPage state={tasks} />,
    'project-detail': <ProjectDetailPage state={tasks} />,
    'project-handoff': (
      <ProjectHandoffPage
        draft={handoff}
        setDraft={setHandoff}
        state={tasks}
        stage={stage}
        setStage={setStage}
        onPrepare={() => prepare()}
      />
    ),
    success: <ResultPage receipt={success} state={tasks} />,
    error: <ResultPage receipt={error} state={tasks} onRecover={recover} onRetry={retry} />,
    'exception-403': <ExceptionPage code="403" />,
    'exception-404': <ExceptionPage code="404" />,
    'exception-500': <ExceptionPage code="500" />,
    profile: <ProfilePage profile={profile} setProfile={setProfile} state={tasks} />,
    'not-found': <NotFoundPage />,
  };

  return (
    <Routes>
      <Route
        element={
          <AppShell profile={profile} agentMode={agentMode} onAgentModeChange={setAgentMode} />
        }
      >
        <Route path="/data/list" element={<LegacyRedirect kind="tasks" />} />
        <Route path="/data/detail" element={<LegacyRedirect kind="project" />} />
        <Route path="/form/step" element={<LegacyRedirect kind="handoff" />} />
        {proRouteConfig.redirects.map((redirect) => (
          <Route
            key={`redirect:${redirect.path}`}
            path={redirect.path}
            element={<Navigate to={redirect.to} replace />}
          />
        ))}
        {proRouting.routes.map((route) => (
          <Route
            key={route.id}
            path={route.path}
            element={
              <Suspense key={route.id} fallback={<RouteLoading />}>
                {!canVisitPage(user, route.page) ? (
                  isAdminShowcasePage(route.page) ? (
                    <Navigate to={proRouteConfig.homePath} replace />
                  ) : (
                    <ExceptionPage code="403" />
                  )
                ) : [
                    'analytics',
                    'projects',
                    'project-detail',
                    'project-handoff',
                    'success',
                    'error',
                    'profile',
                  ].includes(route.page) ? (
                  <TaskCollectionBoundary>{pages[route.page]}</TaskCollectionBoundary>
                ) : (
                  pages[route.page]
                )}
              </Suspense>
            }
          />
        ))}
      </Route>
    </Routes>
  );
}

function LegacyRedirect({ kind }: { kind: 'tasks' | 'project' | 'handoff' }) {
  const [params] = useSearchParams();
  const { projects } = useProData();
  if (kind === 'tasks') {
    const next = new URLSearchParams(params);
    next.delete('view');
    return <Navigate to={`/work/task-cards${next.size ? '?' + next.toString() : ''}`} replace />;
  }
  const project = projects.find((p) => p.id === params.get('project')) ?? projects[0];
  return (
    <Navigate
      to={
        project
          ? `/work/projects/${encodeURIComponent(project.id)}${kind === 'handoff' ? '/handoff' : ''}`
          : '/work/projects'
      }
      replace
    />
  );
}
export function App() {
  const [router, setRouter] = useState<ReturnType<typeof createBrowserRouter> | null>(null);
  useEffect(() => {
    const instance = createBrowserRouter([{ path: '*', element: <ApplicationRoutes /> }]);
    setRouter(instance);
    return () => instance.dispose();
  }, []);
  return router ? <RouterProvider router={router} /> : <RouteLoading />;
}
