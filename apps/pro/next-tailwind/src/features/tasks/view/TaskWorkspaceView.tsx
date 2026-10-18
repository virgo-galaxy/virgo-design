import { ArrowLeftIcon, ArrowRightIcon } from '@virgo-design/icons';
import { Button, Empty, Steps, Tag, Timeline } from '@virgo-design/ui';
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { getTask, getTaskHistory } from '@/api/tasks';
import { FilterSelect } from '@/components/controls/filter-select';
import { PageHeading } from '@/components/display/page-heading';
import { Panel } from '@/components/display/panel';
import { MutationFeedback } from '@/components/feedback/mutation-feedback';
import { RemoteState } from '@/components/feedback/remote-state';
import { useCurrentUser } from '@/features/auth';
import {
  CatalogBoundary,
  moduleName,
  Person,
  projectName,
  useTaskCatalog,
} from '@/features/catalog';
import { useMutation } from '@/hooks/async/use-mutation';
import { useRemoteData } from '@/hooks/async/use-remote-data';
import { canCreateTask, canEditTask, isAdmin, taskStatusChoices } from '@/lib/auth/permissions';
import { businessLabel } from '@/lib/formatting/business-labels';
import { routePath } from '@/routes';
import { AppLink, RouteRedirect, useAppNavigation, useQueryParams } from '@/routes/navigation';
import { useResourceRevision } from '@/store/resources';

import { TaskForm } from '../components/TaskForm/TaskForm';
import { useTaskOperations } from '../hooks/use-task-operations';
import { type Task } from '../model/task';
import {
  taskPriorityIntent,
  taskStatusIntent,
  taskStatusLabelNames,
} from '../presentation/task-presentation';
import { taskDetailsPath, taskEditPath, taskReturnPath } from '../routes/navigation';

const stages = ['backlog', 'todo', 'in_progress', 'in_review', 'done'] as const;

function TaskWorkspaceContent({ mode }: { mode: 'create' | 'edit' | 'details' }) {
  const { id = '' } = useParams<{ id: string }>();
  const [params] = useQueryParams();
  const returnTo = taskReturnPath(params.get('returnTo'));
  const revision = useResourceRevision('tasks');

  const load = useCallback(
    async (signal: AbortSignal) => {
      if (mode === 'create') return null;

      return getTask(id, signal);
    },
    [id, mode],
  );
  const resource = useRemoteData(load, { key: `${mode}:${id}`, revision });
  const user = useCurrentUser();

  if (mode === 'create')
    return canCreateTask(user) ? (
      <TaskEditor returnTo={returnTo} />
    ) : (
      <RouteRedirect to={returnTo} replace />
    );

  if (!resource.data || resource.data.id !== id)
    return (
      <div className="grid [gap:20px] min-w-0">
        <BackLink to={returnTo} />
        <RemoteState loading={resource.loading} error={resource.error} retry={resource.retry} />
      </div>
    );

  if (mode === 'edit')
    return canEditTask(user, resource.data) ? (
      <>
        {resource.error ? <RemoteState error={resource.error} retry={resource.retry} /> : null}
        <TaskEditor key={id} task={resource.data} returnTo={returnTo} />
      </>
    ) : (
      <RouteRedirect to={taskDetailsPath(id, returnTo)} replace />
    );

  return (
    <>
      {resource.error ? <RemoteState error={resource.error} retry={resource.retry} /> : null}
      <TaskDetails task={resource.data} returnTo={returnTo} refreshing={resource.loading} />
    </>
  );
}

function BackLink({ to }: { to: string }) {
  const { t } = useTranslation();

  return (
    <AppLink
      className="inline-flex items-center [gap:8px] text-brand-primary [font-size:13px] no-underline w-fit [&_svg]:[width:16px] [&_svg]:[height:16px]"
      href={to}
    >
      <ArrowLeftIcon />
      {t(
        [routePath('result.success'), routePath('result.error')].includes(to)
          ? 'tasks.workspace.backToResult'
          : to.startsWith(routePath('work.task-cards'))
            ? 'tasks.workspace.backToCards'
            : to.startsWith(routePath('work.projects') + '/')
              ? 'tasks.workspace.backToProject'
              : to.startsWith(routePath('work.projects'))
                ? 'projectDetails.backToProjects'
                : 'tasks.workspace.backToList',
      )}
    </AppLink>
  );
}

function TaskEditor({ task, returnTo }: { task?: Task | undefined; returnTo: string }) {
  const { t, i18n } = useTranslation();
  const { dispatch } = useTaskOperations();
  const navigate = useAppNavigation();
  const active = useRef(true);
  useEffect(() => {
    active.current = true;
    return () => {
      active.current = false;
    };
  }, []);
  const cancel = () => navigate(task ? taskDetailsPath(task.id, returnTo) : returnTo);

  return (
    <div className="grid [gap:20px] min-w-0">
      <PageHeading
        title={t(task ? 'tasks.editTask' : 'tasks.newTask')}
        description={t('tasks.workspace.editorDescription')}
      />
      <Panel title={t('tasks.workspace.basicInformation')}>
        <div className="viewport-max-1000:[padding:20px] [padding:24px]">
          <TaskForm
            task={task}
            onCancel={cancel}
            onSave={async (draft) => {
              const saved = await dispatch(
                task ? { type: 'edit', id: task.id, draft } : { type: 'create', draft },
              );
              if (!active.current) return;

              navigate(taskDetailsPath(saved.id, returnTo), {
                replace: true,
              });
            }}
          />
        </div>
      </Panel>
      <p className="[font-size:12px] text-text-tertiary m-0">
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
  const navigate = useAppNavigation();
  const { projects } = useTaskCatalog();
  const { dispatch } = useTaskOperations();
  const revision = useResourceRevision('tasks');
  const user = useCurrentUser();
  const mutation = useMutation();

  const load = useCallback((signal: AbortSignal) => getTaskHistory(task.id, signal), [task.id]);
  const history = useRemoteData(load, { key: task.id, revision });

  const project = projects.find((p) => p.id === task.project);
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
    <div className="grid [gap:20px] min-w-0">
      <BackLink to={returnTo} />
      <PageHeading
        title={businessLabel(task.title, i18n.language)}
        description={task.id}
        actions={
          <>
            <Tag intent={taskStatusIntent[task.status]}>
              {t(`tasks.statusLabels.${taskStatusLabelNames[task.status]}`)}
            </Tag>
            {canEditTask(user, task) ? (
              <Button variant="outline" onClick={() => navigate(taskEditPath(task.id, returnTo))}>
                {t('tasks.editTask')}
              </Button>
            ) : null}
          </>
        }
      />
      <MutationFeedback pending={mutation.pending} error={mutation.error} />
      <Panel title={t('tasks.workspace.progress')}>
        <div className="viewport-max-1000:[padding:20px] [padding:24px]">
          <div className="overflow-x-auto">
            <Steps
              className={[
                '[min-width:550px]',
                "[&_>_[data-slot='item']]:relative [&_>_[data-slot='item']]:[font-size:13px] [&_[data-slot='indicator']]:grid",
                "[&_[data-slot='indicator']]:[place-items:center] [&_[data-slot='indicator']]:[width:28px] [&_[data-slot='indicator']]:[height:28px]",
                "[&_[data-slot='indicator']]:[border-radius:50%] [&_[data-slot='indicator']]:bg-surface-secondary",
                "[&_[data-slot='indicator']]:[border:1px_solid_var(--vd-border-default)]",
                "[&_[data-status='current']_[data-slot='indicator']]:text-brand-foreground",
                "[&_[data-status='current']_[data-slot='indicator']]:bg-brand-primary",
                "[&_[data-status='current']_[data-slot='indicator']]:border-brand-primary",
                "[&_[data-status='complete']_[data-slot='indicator']]:text-brand-foreground",
                "[&_[data-status='complete']_[data-slot='indicator']]:bg-brand-primary",
                "[&_[data-status='complete']_[data-slot='indicator']]:border-brand-primary [&_>_[data-slot='item']:not(:last-child)::after]:content-['']",
                "[&_>_[data-slot='item']:not(:last-child)::after]:absolute [&_>_[data-slot='item']:not(:last-child)::after]:[top:14px]",
                "[&_>_[data-slot='item']:not(:last-child)::after]:[left:40px] [&_>_[data-slot='item']:not(:last-child)::after]:[right:8px]",
                "[&_>_[data-slot='item']:not(:last-child)::after]:[height:1px]",
                "[&_>_[data-slot='item']:not(:last-child)::after]:[background:var(--vd-border-default)]",
              ].join(' ')}
              aria-label={t('tasks.workspace.progress')}
            >
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
                  <Steps.Title>
                    {t(`tasks.statusLabels.${taskStatusLabelNames[status]}`)}
                  </Steps.Title>
                </Steps.Item>
              ))}
            </Steps>
          </div>
          <div
            className={[
              '[&_p]:m-0 [&_p]:text-text-secondary [&_p]:[font-size:13px]',
              'viewport-max-1000:[align-items:start] viewport-max-1000:flex-col',
              '[margin-top:24px] flex justify-between items-center [gap:16px]',
            ].join(' ')}
          >
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
            <div className="[margin-top:20px] [max-width:240px]">
              <FilterSelect
                label={t('tasks.workspace.adjustStatus')}
                value={task.status}
                options={stages.map((status) => ({
                  value: status,
                  label: t(`tasks.statusLabels.${taskStatusLabelNames[status]}`),
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
      <div className="viewport-max-1000:[grid-template-columns:1fr] grid [grid-template-columns:minmax(0,_1.8fr)_minmax(280px,_1fr)] [gap:20px] [align-items:start]">
        <div className="grid [gap:20px] min-w-0">
          <Panel title={t('tasks.description')}>
            <div className="whitespace-pre-wrap [overflow-wrap:anywhere] [padding:24px] [font-size:14px] [line-height:1.8]">
              {businessLabel(task.description, i18n.language) || '—'}
            </div>
          </Panel>
          <Panel title={t('tasks.workspace.history')}>
            <div className="viewport-max-1000:[padding:20px] [padding:24px]">
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
                        {t(`notifications.inbox.kinds.${record.kind}`)}
                      </Timeline.Title>
                      <Timeline.Time>{date(record.recordedAt)}</Timeline.Time>
                      {record.fromStatus &&
                      record.toStatus &&
                      record.fromStatus !== record.toStatus ? (
                        <Timeline.Description>
                          {t(`tasks.statusLabels.${taskStatusLabelNames[record.fromStatus]}`)} →{' '}
                          {t(`tasks.statusLabels.${taskStatusLabelNames[record.toStatus]}`)}
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
          <dl
            className={[
              '[&_div]:grid [&_div]:[gap:8px] [&_dt]:[font-size:12px] [&_dt]:text-text-tertiary [&_dd]:[font-size:13px] [&_dd]:m-0 [&_dd]:wrap-anywhere',
              '[&_a]:text-brand-primary',
              'grid [gap:20px] [padding:24px] m-0',
            ].join(' ')}
          >
            <div>
              <dt>{t('tasks.project')}</dt>
              <dd>
                {project ? (
                  <AppLink href={routePath('work.projects.[projectId]', { projectId: project.id })}>
                    {businessLabel(projectName(task.project, projects), i18n.language)}
                  </AppLink>
                ) : (
                  businessLabel(projectName(task.project, projects), i18n.language)
                )}
              </dd>
            </div>
            <div>
              <dt>{t('tasks.module')}</dt>
              <dd>
                {businessLabel(moduleName(task.project, task.module, projects), i18n.language)}
              </dd>
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
                  {t(`tasks.priorityLabels.${task.priority}`)}
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

export function TaskWorkspaceView(props: { mode: 'create' | 'edit' | 'details' }) {
  return (
    <CatalogBoundary>
      <TaskWorkspaceContent {...props} />
    </CatalogBoundary>
  );
}
