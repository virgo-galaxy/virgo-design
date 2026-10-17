import { DownloadIcon } from '@virgo-design/icons';
import { Accordion, Alert, Button, Result, Steps, Surface, Tag } from '@virgo-design/ui';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router';

import { getTasks } from '@/api/tasks';
import { getLatestWorkflow } from '@/api/workflows';
import { Person } from '@/features/catalog';
import { CatalogBoundary, moduleName, projectName, useTaskCatalog } from '@/features/catalog';
import type { WorkflowReceipt } from '@/features/handoff';
import { useHandoffSession, useWorkflowRevision } from '@/features/handoff';
import { projectDetailPath, projectHandoffPath, projectTasksPath } from '@/features/projects';
import type { TaskState } from '@/features/tasks';
import {
  createTasksCsv,
  getAllTasks,
  taskDetailsPath,
  taskStatusIntent,
  taskStatusLabelNames,
  useTaskDependentQuery,
} from '@/features/tasks';
import { downloadCsv } from '@/lib/browser/download';
import { businessLabel } from '@/lib/demo/labels';
import { routePath } from '@/routes';
import { MutationFeedback } from '@/shared/async/MutationFeedback';
import { RemoteState } from '@/shared/async/RemoteState';
import { useMutation } from '@/shared/async/use-mutation';
import { useRemoteData } from '@/shared/async/use-remote-data';
import shared from '@/styles/product-layout.module.scss';

import styles from './ResultPage.module.scss';

function ResultPageView({
  receipt,
  state,
  scopeCount,
  onRecover,
  onRetry,
}: {
  receipt: WorkflowReceipt;
  state: TaskState;
  scopeCount: number;
  onRecover?: () => void;
  onRetry?: () => Promise<WorkflowReceipt>;
}) {
  const { projects, metadata } = useTaskCatalog();
  const { members: taskAssignees } = metadata;

  const mutation = useMutation();
  const { t, i18n } = useTranslation();
  const receiptTime = new Intl.DateTimeFormat(i18n.language, {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Shanghai',
  });
  const success = receipt.outcome === 'success';
  const navigate = useNavigate();
  const project = projects.find((item) => item.id === receipt.projectId)!;
  const tasks = state.tasks.filter((task) => receipt.taskIds.includes(task.id));
  return (
    <div className={styles.page}>
      <MutationFeedback pending={mutation.pending} error={mutation.error} />
      <Surface
        border="default"
        radius={12}
        className={styles.result}
        data-outcome={receipt.outcome}
      >
        <Result.Root
          status={receipt.outcome}
          className={styles.resultHero}
          aria-labelledby="receipt-result-title"
        >
          <Result.Icon />
          <div className={styles.heroCopy}>
            <Tag size="md" variant="outline">
              {receipt.reference}
            </Tag>
            <Result.Title as="h1" id="receipt-result-title">
              {t(`results.receipts.${receipt.message}.title`)}
            </Result.Title>
            <Result.Description>
              {t(`results.receipts.${receipt.message}.description`)}
            </Result.Description>
          </div>
          <Button.Group
            layout="custom"
            render={(groupProps) => (
              <Result.Actions {...groupProps} className={styles.primaryActions} />
            )}
          >
            {success ? (
              <>
                <Button size="medium" onClick={() => navigate(projectDetailPath(project))}>
                  {t('results.viewProject')}
                </Button>
                <Button
                  size="medium"
                  variant="outline"
                  leadingIcon={<DownloadIcon />}
                  disabled={!tasks.length}
                  onClick={() =>
                    void mutation.run(async () => {
                      const fullScope = await getAllTasks({ ids: receipt.taskIds });
                      downloadCsv(
                        createTasksCsv(fullScope, taskAssignees, {
                          status: (code) => t(`tasks.statusLabels.${taskStatusLabelNames[code]}`),
                          priority: (code) => t(`tasks.priorityLabels.${code}`),
                          project: (id) => businessLabel(projectName(id, projects), i18n.language),
                          module: (projectId, id) =>
                            businessLabel(moduleName(projectId, id, projects), i18n.language),
                        }),
                        `virgo-${receipt.reference.toLowerCase()}-scope.csv`,
                      );
                    })
                  }
                >
                  {t('results.downloadTaskScope')}
                </Button>
              </>
            ) : (
              <>
                <Button
                  size="medium"
                  onClick={() => {
                    onRecover?.();
                    navigate(projectHandoffPath(project.id));
                  }}
                >
                  {t('results.reviewHandoffSettings')}
                </Button>
                <Button
                  size="medium"
                  variant="outline"
                  disabled={mutation.pending}
                  onClick={() => {
                    void mutation.run(async () => {
                      const next = await onRetry?.();
                      navigate(next ? routePath(next.outcome) : projectHandoffPath(project.id));
                    });
                  }}
                >
                  {t('results.prepareForTeamInstead')}
                </Button>
              </>
            )}
          </Button.Group>
        </Result.Root>
        <div className={styles.receiptBody}>
          <section className={styles.metadataPanel} aria-labelledby="receipt-record-title">
            <h2 id="receipt-record-title">{t('results.recordDetails')}</h2>
            <dl className={styles.receiptMetadata}>
              <div>
                <dt>{t('results.project')}</dt>
                <dd>
                  <Link className={shared.link} to={projectDetailPath(project)}>
                    {businessLabel(project.name, i18n.language)}
                  </Link>
                </dd>
              </div>
              <div>
                <dt>{t('results.preparedBy')}</dt>
                <dd>{businessLabel(receipt.requester, i18n.language)}</dd>
              </div>
              <div>
                <dt>{t('results.recordedUtc0800')}</dt>
                <dd>
                  <time dateTime={receipt.recordedAt}>
                    {receiptTime.format(new Date(receipt.recordedAt))}
                  </time>
                </dd>
              </div>
              <div>
                <dt>{t('results.audience')}</dt>
                <dd>
                  {receipt.audience === 'team'
                    ? t('results.teamWorkspace')
                    : t('results.externalCollaborators')}
                </dd>
              </div>
              {receipt.handoffTitle ? (
                <div>
                  <dt>{t('results.handoff')}</dt>
                  <dd>{businessLabel(receipt.handoffTitle, i18n.language)}</dd>
                </div>
              ) : null}
              {receipt.schedule ? (
                <div>
                  <dt>{t('results.handoffSchedule')}</dt>
                  <dd>
                    <time dateTime={receipt.schedule}>
                      {receiptTime.format(new Date(receipt.schedule))}
                    </time>
                  </dd>
                </div>
              ) : null}
              <div>
                <dt>{t('results.scope')}</dt>
                <dd>{t('results.linkedCount', { count: scopeCount })}</dd>
              </div>
            </dl>
          </section>
          {success ? (
            <div className={styles.nextSteps}>
              <h3>
                {receipt.kind === 'task'
                  ? t('results.keepTheWorkMoving')
                  : t('results.bringThisToTheCheckpoint')}
              </h3>
              <Steps orientation="vertical" aria-label={t('results.nextSteps')}>
                <Steps.Item status="complete">
                  <Steps.Indicator>01</Steps.Indicator>
                  <Steps.Title>
                    {receipt.kind === 'task'
                      ? t('results.workRecorded')
                      : t('results.scopePrepared')}
                  </Steps.Title>
                  <Steps.Description>
                    {t('results.theProjectAndLinkedTaskRecordsAreAvailable')}
                  </Steps.Description>
                </Steps.Item>
                <Steps.Item status="current">
                  <Steps.Indicator>02</Steps.Indicator>
                  <Steps.Title>
                    {receipt.kind === 'task'
                      ? t('results.reviewTheNextStep')
                      : t('results.reviewWithTheTeam')}
                  </Steps.Title>
                  <Steps.Description>
                    {t('results.keepTheOwnerAndAcceptanceCriteriaVisible')}
                  </Steps.Description>
                </Steps.Item>
                <Steps.Item>
                  <Steps.Indicator>03</Steps.Indicator>
                  <Steps.Title>{t('results.followThrough')}</Steps.Title>
                  <Steps.Description>
                    {t('results.useTheTaskQueueToTrackTheNextDelivery')}
                  </Steps.Description>
                </Steps.Item>
              </Steps>
              <Link className={shared.link} to={routePath('tasks')}>
                {t('results.openTaskQueue')}
              </Link>
            </div>
          ) : (
            <div className={styles.recovery}>
              <Alert intent="error">
                <Alert.Content>
                  <Alert.Title>{t('results.permissionPolicyWsExport01')}</Alert.Title>
                  <Alert.Description>
                    {t('results.theWorkspacePacketCanBePreparedForTeamReview')}
                  </Alert.Description>
                </Alert.Content>
              </Alert>
              <Accordion type="multiple" defaultValue={['why', 'draft']} variant="ghost" size="md">
                <Accordion.Item value="why">
                  <Accordion.Trigger icon>{t('results.whyDidThisFail')}</Accordion.Trigger>
                  <Accordion.Content>
                    {t('results.workspaceSExportPermissionStatesAreStillUnderReview')}
                  </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item value="draft">
                  <Accordion.Trigger icon>{t('results.whatHappensToMyDraft')}</Accordion.Trigger>
                  <Accordion.Content>
                    {t('results.yourScopeScheduleAndNotesAreKeptReviewThe')}
                  </Accordion.Content>
                </Accordion.Item>
              </Accordion>
              <Link className={shared.link} to={projectTasksPath(project)}>
                {t('results.openTaskQueue')}
              </Link>
            </div>
          )}
        </div>
        <div className={styles.scopeSection}>
          <div>
            <h3>{t('results.linkedWork')}</h3>
            <span className={shared.caption}>
              {scopeCount > 4
                ? t('results.scopePreview', { shown: 4, total: scopeCount })
                : t('results.currentTaskRecordsForThisResult')}
            </span>
          </div>
          <ul>
            {tasks.slice(0, 4).map((task) => (
              <li key={task.id}>
                <div className={styles.taskHeading}>
                  <span className={shared.mono}>{task.id}</span>
                  <Tag size="md" intent={taskStatusIntent[task.status]}>
                    {t(`tasks.statusLabels.${taskStatusLabelNames[task.status]}`)}
                  </Tag>
                </div>
                <Link
                  className={styles.taskTitle}
                  to={taskDetailsPath(task.id, routePath(receipt.outcome))}
                >
                  {businessLabel(task.title, i18n.language)}
                </Link>
                <p className={styles.taskDescription}>
                  {businessLabel(task.description, i18n.language)}
                </p>
                <div className={styles.taskContext}>
                  <span>
                    {businessLabel(moduleName(task.project, task.module, projects), i18n.language)}
                  </span>
                  <Person id={task.assignee} />
                </div>
              </li>
            ))}
          </ul>
          {!tasks.length ? (
            <p className={shared.caption}>
              {t('results.theseTasksHaveMovedOutOfTheCurrentRegister')}
            </p>
          ) : null}
        </div>
        <div className={styles.resultFooter}>
          <span className={shared.mono}>
            {t('results.virgoStudioValue', {
              v0: success ? t('results.recorded') : t('results.draftKept'),
            })}
          </span>
          <Link
            className={shared.link}
            to={success ? routePath('task-create') : routePath('projects')}
          >
            {success ? t('results.createAnotherRequest') : t('results.backToProjects')}
          </Link>
        </div>
      </Surface>
    </div>
  );
}

function ResultTasks({ receipt }: { receipt: WorkflowReceipt }) {
  const session = useHandoffSession();
  const load = useCallback(
    async (signal: AbortSignal) =>
      receipt.taskIds.length
        ? getTasks({ ids: receipt.taskIds, pageSize: 4 }, signal)
        : { items: [], total: 0 },
    [receipt.taskIds],
  );
  const resource = useTaskDependentQuery(load, receipt.reference);
  if (!resource.data) return <RemoteState {...resource} />;
  return (
    <>
      {resource.error ? <RemoteState error={resource.error} retry={resource.retry} /> : null}
      <ResultPageView
        receipt={receipt}
        state={{ tasks: resource.data.items }}
        scopeCount={resource.data.total}
        onRecover={() => session.recover(receipt)}
        onRetry={() => session.retry(receipt)}
      />
    </>
  );
}
function ResultResource({ outcome }: { outcome: 'success' | 'error' }) {
  const revision = useWorkflowRevision();
  const load = useCallback(
    async (signal: AbortSignal) => {
      return getLatestWorkflow(outcome, signal);
    },
    [outcome],
  );
  const resource = useRemoteData(load, { key: outcome, revision });
  if (!resource.data) return <RemoteState {...resource} />;
  return (
    <>
      {resource.error ? <RemoteState error={resource.error} retry={resource.retry} /> : null}
      <ResultTasks receipt={resource.data} />
    </>
  );
}
export function ResultPage({ outcome }: { outcome: 'success' | 'error' }) {
  return (
    <CatalogBoundary>
      <ResultResource key={outcome} outcome={outcome} />
    </CatalogBoundary>
  );
}
