import { Skeleton } from '@virgo-design/ui';
import { lazy, type ReactElement, Suspense, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';

import { prepareHandoff as prepareRemoteHandoff } from '@/api/workflows';
import { AppShell } from '@/app/AppShell';
import { type ProPageKey, proRouteConfig } from '@/app/routes.config';
import { proRouting } from '@/app/routing';
import { useProData } from '@/application/pro-data-context';
import { TaskCollectionBoundary } from '@/application/TaskCollectionBoundary';
import {
  handoffFromReceipt,
  initialHandoff,
  initialWorkRequest,
  type WorkflowReceipt,
  type WorkRequest,
  workRequestTask,
} from '@/data/pro-workflows';
const AnalyticsPage = lazy(() =>
  import('@/pages/analytics/AnalyticsPage').then((module) => ({ default: module.AnalyticsPage })),
);
const DataListPage = lazy(() =>
  import('@/pages/data/DataListPage').then((module) => ({ default: module.DataListPage })),
);
const DetailPage = lazy(() =>
  import('@/pages/data/DetailPage').then((module) => ({ default: module.DetailPage })),
);
const ExceptionPage = lazy(() =>
  import('@/pages/exceptions/ExceptionPage').then((module) => ({ default: module.ExceptionPage })),
);
const BasicFormPage = lazy(() =>
  import('@/pages/forms/BasicFormPage').then((module) => ({ default: module.BasicFormPage })),
);
const StepFormPage = lazy(() =>
  import('@/pages/forms/StepFormPage').then((module) => ({ default: module.StepFormPage })),
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
export function App() {
  const {
    state: tasks,
    dispatch,
    profile,
    saveProfile: setProfile,
    projects,
    workflows,
  } = useProData();
  const [request, setRequest] = useState({ ...initialWorkRequest });
  const [handoff, setHandoff] = useState({ ...initialHandoff });
  const [stage, setStage] = useState(0);
  const [success, setSuccess] = useState<WorkflowReceipt>(workflows.success);
  const [error, setError] = useState<WorkflowReceipt>(workflows.error);
  const createRequest = async (draft: WorkRequest) => {
    const task = await dispatch({
      type: 'create',
      draft: workRequestTask(draft),
    });
    setSuccess({
      outcome: 'success',
      kind: 'task',
      reference: task.id,
      message: 'workRequest',
      projectId: projects.find((item) => item.name === task.project)?.id ?? '',
      taskIds: [task.id],
      recordedAt: task.createdAt,
      requester: profile.name,
      audience: 'team',
    });
  };
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
  const pages = {
    workplace: <WorkplacePage />,
    analytics: <AnalyticsPage state={tasks} />,
    tasks: <TasksPage dispatch={dispatch} />,
    projects: <ProjectsPage state={tasks} />,
    'data-list': <DataListPage state={tasks} dispatch={dispatch} />,
    detail: <DetailPage state={tasks} dispatch={dispatch} />,
    'basic-form': <BasicFormPage draft={request} setDraft={setRequest} onCreate={createRequest} />,
    'step-form': (
      <StepFormPage
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
  } satisfies Record<ProPageKey, ReactElement>;

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell profile={profile} />}>
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
                  {[
                    'analytics',
                    'projects',
                    'data-list',
                    'detail',
                    'step-form',
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
    </BrowserRouter>
  );
}
