import { type ReactElement, useReducer, useRef, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';

import { AppShell } from '@/app/AppShell';
import { type ProPageKey, proRouteConfig } from '@/app/routes.config';
import { proRouting } from '@/app/routing';
import {
  handoffFromReceipt,
  initialHandoff,
  initialProfile,
  initialWorkRequest,
  prepareHandoff,
  sampleError,
  sampleSuccess,
  type WorkflowReceipt,
  type WorkRequest,
  workRequestTask,
} from '@/data/pro-workflows';
import { projects } from '@/data/projects';
import { tasksReducer } from '@/data/tasks';
import { initialTaskState } from '@/data/tasks.seed';
import { AnalyticsPage } from '@/pages/analytics/AnalyticsPage';
import { DataListPage } from '@/pages/data/DataListPage';
import { DetailPage } from '@/pages/data/DetailPage';
import { SearchTablePage } from '@/pages/data/SearchTablePage';
import { ExceptionPage } from '@/pages/exceptions/ExceptionPage';
import { BasicFormPage } from '@/pages/forms/BasicFormPage';
import { StepFormPage } from '@/pages/forms/StepFormPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ProfilePage } from '@/pages/profile/ProfilePage';
import { ProjectsPage } from '@/pages/projects/ProjectsPage';
import { ResultPage } from '@/pages/results/ResultPage';
import { TasksPage } from '@/pages/tasks/TasksPage';
import { WorkplacePage } from '@/pages/workplace/WorkplacePage';

export function App() {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTaskState);
  const [request, setRequest] = useState({ ...initialWorkRequest });
  const [handoff, setHandoff] = useState({ ...initialHandoff });
  const [stage, setStage] = useState(0);
  const [profile, setProfile] = useState({ ...initialProfile });
  const [success, setSuccess] = useState<WorkflowReceipt>(sampleSuccess);
  const [error, setError] = useState<WorkflowReceipt>(sampleError);
  const handoffSequence = useRef(101);
  const createRequest = (draft: WorkRequest) => {
    const task = workRequestTask(draft);
    const id = `VD-${tasks.nextId}`;
    const recordedAt = new Date().toISOString();
    dispatch({ type: 'create', draft: task, createdAt: recordedAt });
    setSuccess({
      outcome: 'success',
      kind: 'task',
      reference: `REQ-${tasks.nextId}`,
      title: 'Work request accepted',
      description:
        'Your brief is now a Todo task with a clear owner. It is ready for the team’s next delivery.',
      projectId: projects.find((item) => item.name === task.project)!.id,
      taskIds: [id],
      recordedAt,
      requester: profile.name,
      audience: 'team',
    });
  };
  const prepare = (draft = handoff) => {
    const receipt = prepareHandoff(
      draft,
      tasks.tasks,
      `HOF-${handoffSequence.current}`,
      profile.name,
      new Date().toISOString(),
    );
    if (!receipt) return null;
    handoffSequence.current++;
    if (receipt.outcome === 'success') setSuccess(receipt);
    else setError(receipt);
    return receipt;
  };
  const recover = () => {
    setHandoff(handoffFromReceipt(error));
    setStage(1);
  };
  const retry = () => {
    const draft = { ...handoffFromReceipt(error), audience: 'team' as const, confirmed: true };
    setHandoff(draft);
    const receipt = prepare(draft);
    setStage(receipt ? 2 : 1);
    return receipt;
  };
  const pages = {
    workplace: <WorkplacePage />,
    analytics: <AnalyticsPage state={tasks} />,
    tasks: <TasksPage state={tasks} dispatch={dispatch} />,
    projects: <ProjectsPage state={tasks} />,
    'search-table': <SearchTablePage state={tasks} dispatch={dispatch} />,
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
            <Route key={route.id} path={route.path} element={pages[route.page]} />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
