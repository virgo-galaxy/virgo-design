import { ArrowLeftIcon, ArrowRightIcon } from '@virgo-design/icons';
import { Button, Empty, Steps, Tag, Timeline } from '@virgo-design/ui';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, Navigate, useNavigate, useParams, useSearchParams } from 'react-router';

import { getTask, getTaskHistory } from '@/api/tasks';
import { MutationFeedback } from '@/application/MutationFeedback';
import { useProData } from '@/application/pro-data-context';
import { RemoteState } from '@/application/RemoteState';
import { useCurrentUser } from '@/application/session-context';
import { useMutation } from '@/application/use-mutation';
import { useRemoteData } from '@/application/use-remote-data';
import { projectDetailPath } from '@/data/projects';
import { moduleName } from '@/data/task-catalog';
import { type Task } from '@/data/tasks';
import { canCreateTask, canEditTask, isAdmin, taskStatusChoices } from '@/lib/auth/permissions';
import { businessLabel } from '@/lib/demo/labels';
import { FilterSelect, PageHeading, Panel, Person } from '@/pages/shared/ProPage';

import { taskDetailsPath, taskReturnPath } from './task-navigation';
import {
  getTaskPriorityLabel,
  getTaskStatusLabel,
  taskPriorityIntent,
  taskStatusIntent,
} from './task-presentation';
import { TaskForm } from './TaskForm';
import styles from './TaskWorkspace.module.scss';
const stages = ['backlog', 'todo', 'in_progress', 'in_review', 'done'] as const;
export function TaskWorkspacePage({ mode }: { mode: 'create' | 'edit' | 'details' }) {
  const { id = '' } = useParams();
  const [params] = useSearchParams();
  const returnTo = taskReturnPath(params.get('returnTo'));
  const { revision } = useProData();
  const load = useCallback(
    async (signal: AbortSignal) => {
      void revision;
      if (mode === 'create') return null;
      return getTask(id, signal);
    },
    [id, mode, revision],
  );
  const resource = useRemoteData(load);
  const user = useCurrentUser();
  if (mode === 'create')
    return canCreateTask(user) ? (
      <TaskEditor returnTo={returnTo} />
    ) : (
      <Navigate to={returnTo} replace />
    );
  if (resource.error || !resource.data || resource.data.id !== id)
    return (
      <div className={styles.page}>
        <BackLink to={returnTo} />
        <RemoteState loading={resource.loading} error={resource.error} retry={resource.retry} />
      </div>
    );
  if (mode === 'edit')
    return canEditTask(user, resource.data) ? (
      <TaskEditor key={id} task={resource.data} returnTo={returnTo} />
    ) : (
      <Navigate to={taskDetailsPath(id, returnTo)} replace />
    );
  return <TaskDetails task={resource.data} returnTo={returnTo} refreshing={resource.loading} />;
}
function BackLink({ to }: { to: string }) {
  const { t } = useTranslation();
  return (
    <Link className={styles.back} to={to}>
      <ArrowLeftIcon />
      {t(
        to.startsWith('/result/')
          ? 'tasks.workspace.backToResult'
          : to.startsWith('/work/task-cards')
            ? 'tasks.workspace.backToCards'
            : to.startsWith('/work/projects/')
              ? 'tasks.workspace.backToProject'
              : to.startsWith('/work/projects')
                ? 'projectDetails.backToProjects'
                : 'tasks.workspace.backToList',
      )}
    </Link>
  );
}
function TaskEditor({ task, returnTo }: { task?: Task | undefined; returnTo: string }) {
  const { t, i18n } = useTranslation();
  const { dispatch } = useProData();
  const navigate = useNavigate();
  const cancel = () => navigate(task ? taskDetailsPath(task.id, returnTo) : returnTo);
  return (
    <div className={styles.page}>
      <PageHeading
        title={t(task ? 'tasks.editTask' : 'tasks.newTask')}
        description={t('tasks.workspace.editorDescription')}
      />
      <Panel title={t('tasks.workspace.basicInformation')}>
        <div className={styles.body}>
          <TaskForm
            task={task}
            onCancel={cancel}
            onSave={async (draft) => {
              const saved = await dispatch(
                task ? { type: 'edit', id: task.id, draft } : { type: 'create', draft },
              );
              navigate(taskDetailsPath(saved.id, returnTo), {
                replace: true,
                state: { saved: true },
              });
            }}
          />
        </div>
      </Panel>
      <p className={styles.note}>
        {task ? businessLabel(task.title, i18n.language) : t('tasks.workspace.createHint')}
      </p>
    </div>
  );
}
function TaskDetails({
  task,
  returnTo,
  refreshing,
}: {
  task: Task;
  returnTo: string;
  refreshing: boolean;
}) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { projects, dispatch, revision } = useProData();
  const user = useCurrentUser();
  const mutation = useMutation();
  const load = useCallback(
    (signal: AbortSignal) => {
      void revision;
      return getTaskHistory(task.id, signal);
    },
    [task.id, revision],
  );
  const history = useRemoteData(load);
  const project = projects.find((p) => p.name === task.project);
  const allowed = taskStatusChoices(user, task).filter((status) => status !== task.status);
  const actionName = (status: Task['status']) =>
    status === 'done'
      ? 'approve'
      : status === 'in_review'
        ? 'submit'
        : task.status === 'in_review'
          ? 'return'
          : status === 'in_progress'
            ? 'start'
            : status === 'todo'
              ? 'publish'
              : 'plan';
  const normalNext: Partial<Record<Task['status'], Task['status'][]>> = {
    backlog: ['todo'],
    todo: ['in_progress'],
    in_progress: ['in_review'],
    in_review: ['done', 'in_progress'],
  };
  const actions = allowed.filter(
    (status) => !isAdmin(user) || normalNext[task.status]?.includes(status),
  );
  const date = (value: string) =>
    new Intl.DateTimeFormat(i18n.language, { dateStyle: 'medium', timeStyle: 'short' }).format(
      new Date(value),
    );
  return (
    <div className={styles.page}>
      <BackLink to={returnTo} />
      <PageHeading
        title={businessLabel(task.title, i18n.language)}
        description={task.id}
        actions={
          <>
            <Tag intent={taskStatusIntent[task.status]}>{getTaskStatusLabel(t, task.status)}</Tag>
            {canEditTask(user, task) ? (
              <Button
                variant="outline"
                onClick={() =>
                  navigate(
                    `/work/tasks/${encodeURIComponent(task.id)}/edit?returnTo=${encodeURIComponent(returnTo)}`,
                  )
                }
              >
                {t('tasks.editTask')}
              </Button>
            ) : null}
          </>
        }
      />
      <MutationFeedback pending={mutation.pending} error={mutation.error} />
      <Panel title={t('tasks.workspace.progress')}>
        <div className={styles.body}>
          <div className={styles.stepsViewport}>
            <Steps className={styles.progressSteps} aria-label={t('tasks.workspace.progress')}>
              {stages.map((status, index) => (
                <Steps.Item
                  key={status}
                  status={
                    index < stages.indexOf(task.status)
                      ? 'complete'
                      : status === task.status
                        ? 'current'
                        : 'upcoming'
                  }
                >
                  <Steps.Indicator>{index + 1}</Steps.Indicator>
                  <Steps.Title>{getTaskStatusLabel(t, status)}</Steps.Title>
                </Steps.Item>
              ))}
            </Steps>
          </div>
          <div className={styles.workflowActions}>
            <p>{t(`tasks.workspace.hints.${task.status}`)}</p>
            <Button.Group>
              {actions.map((status) => (
                <Button
                  key={status}
                  variant={
                    status === 'in_progress' && task.status === 'in_review' ? 'outline' : 'primary'
                  }
                  disabled={mutation.pending || refreshing}
                  trailingIcon={<ArrowRightIcon />}
                  onClick={() =>
                    void mutation.run(async () => {
                      await dispatch({ type: 'status', id: task.id, status });
                    })
                  }
                >
                  {t(`tasks.workspace.actions.${actionName(status)}`)}
                </Button>
              ))}
            </Button.Group>
          </div>
          {isAdmin(user) ? (
            <div className={styles.adminStatus}>
              <FilterSelect
                label={t('tasks.workspace.adjustStatus')}
                value={task.status}
                options={stages.map((status) => ({
                  value: status,
                  label: getTaskStatusLabel(t, status),
                }))}
                onChange={(status) => {
                  if (
                    stages.some((item) => item === status) &&
                    status !== task.status &&
                    !mutation.pending &&
                    !refreshing
                  )
                    void mutation.run(async () => {
                      await dispatch({
                        type: 'status',
                        id: task.id,
                        status: status as Task['status'],
                      });
                    });
                }}
              />
            </div>
          ) : null}
        </div>
      </Panel>
      <div className={styles.columns}>
        <div className={styles.stack}>
          <Panel title={t('tasks.description')}>
            <div className={styles.description}>
              {businessLabel(task.description, i18n.language) || '—'}
            </div>
          </Panel>
          <Panel title={t('tasks.workspace.history')}>
            <div className={styles.body}>
              {history.error || !history.data ? (
                <RemoteState
                  loading={history.loading}
                  error={history.error}
                  retry={history.retry}
                />
              ) : history.data.length ? (
                <Timeline aria-label={t('tasks.workspace.history')}>
                  {history.data.map((record, index) => (
                    <Timeline.Item key={record.id} status={index === 0 ? 'active' : 'complete'}>
                      <Timeline.Indicator />
                      <Timeline.Title>
                        {businessLabel(record.actorName, i18n.language)} ·{' '}
                        {t(`app.inbox.kinds.${record.kind}`)}
                      </Timeline.Title>
                      <Timeline.Time>{date(record.recordedAt)}</Timeline.Time>
                      {record.fromStatus &&
                      record.toStatus &&
                      record.fromStatus !== record.toStatus ? (
                        <Timeline.Description>
                          {getTaskStatusLabel(t, record.fromStatus)} →{' '}
                          {getTaskStatusLabel(t, record.toStatus)}
                        </Timeline.Description>
                      ) : null}
                    </Timeline.Item>
                  ))}
                </Timeline>
              ) : (
                <Empty>
                  <Empty.Description>{t('tasks.workspace.noHistory')}</Empty.Description>
                </Empty>
              )}
            </div>
          </Panel>
        </div>
        <Panel title={t('tasks.workspace.context')}>
          <dl className={styles.metadata}>
            <div>
              <dt>{t('tasks.project')}</dt>
              <dd>
                {project ? (
                  <Link to={projectDetailPath(project)}>
                    {businessLabel(task.project, i18n.language)}
                  </Link>
                ) : (
                  businessLabel(task.project, i18n.language)
                )}
              </dd>
            </div>
            <div>
              <dt>{t('tasks.module')}</dt>
              <dd>{businessLabel(moduleName(task.module, projects), i18n.language)}</dd>
            </div>
            <div>
              <dt>{t('tasks.assignee')}</dt>
              <dd>
                <Person id={task.assignee} />
              </dd>
            </div>
            <div>
              <dt>{t('projects.projectLead')}</dt>
              <dd>{project ? <Person id={project.owner} /> : '—'}</dd>
            </div>
            <div>
              <dt>{t('tasks.priority')}</dt>
              <dd>
                <Tag variant="outline" intent={taskPriorityIntent[task.priority]}>
                  {getTaskPriorityLabel(t, task.priority)}
                </Tag>
              </dd>
            </div>
            <div>
              <dt>{t('tasks.estimatedHours')}</dt>
              <dd>
                {task.estimateHours} {t('tasks.h')}
              </dd>
            </div>
            <div>
              <dt>{t('tasks.dueDate')}</dt>
              <dd>{task.dueDate || t('tasks.noDueDate')}</dd>
            </div>
            <div>
              <dt>{t('tasks.createdAt')}</dt>
              <dd>{date(task.createdAt)}</dd>
            </div>
            {task.completedAt ? (
              <div>
                <dt>{t('tasks.completedAt')}</dt>
                <dd>{date(task.completedAt)}</dd>
              </div>
            ) : null}
          </dl>
        </Panel>
      </div>
    </div>
  );
}
