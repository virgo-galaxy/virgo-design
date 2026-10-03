import { DownloadIcon } from '@virgo-design/icons';
import { Accordion, Alert, Button, Result, Separator, Steps, Surface, Tag } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router';

import { MutationFeedback } from '@/application/MutationFeedback';
import { useProData } from '@/application/pro-data-context';
import { useMutation } from '@/application/use-mutation';
import type { WorkflowReceipt } from '@/data/pro-workflows';
import { projectDetailPath } from '@/data/projects';
import type { TaskState } from '@/data/tasks';
import { createTasksCsv } from '@/data/tasks.export';
import { downloadCsv } from '@/pages/shared/download';
import shared from '@/pages/shared/ProPage.module.scss';
import { getTaskExportLabels, getTaskStatusLabel } from '@/pages/tasks/task-presentation';
import { taskStatusIntent } from '@/pages/tasks/task-presentation';

import styles from './ResultPage.module.scss';

export function ResultPage({
  receipt,
  state,
  onRecover,
  onRetry,
}: {
  receipt: WorkflowReceipt;
  state: TaskState;
  onRecover?: () => void;
  onRetry?: () => Promise<WorkflowReceipt>;
}) {
  const { taskAssignees, projects } = useProData();

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
    <div className={shared.page}>
      <MutationFeedback pending={mutation.pending} error={mutation.error} />
      <Surface border="default" radius={12} className={styles.result}>
        <Result.Root
          status={receipt.outcome}
          className={styles.resultHero}
          aria-labelledby="receipt-result-title"
        >
          <Result.Icon />
          <Tag size="sm" variant="outline">
            {receipt.reference}
          </Tag>
          <Result.Title as="h1" id="receipt-result-title">
            {t(`results.receipts.${receipt.message}.title`)}
          </Result.Title>
          <Result.Description>
            {t(`results.receipts.${receipt.message}.description`)}
          </Result.Description>
          <Result.Actions className={styles.primaryActions}>
            {success ? (
              <>
                <Button size="small" onClick={() => navigate(projectDetailPath(project))}>
                  {t('results.viewProject')}
                </Button>
                <Button
                  size="small"
                  variant="outline"
                  leadingIcon={<DownloadIcon />}
                  disabled={!tasks.length}
                  onClick={() =>
                    downloadCsv(
                      createTasksCsv(tasks, taskAssignees, getTaskExportLabels(t)),
                      `virgo-${receipt.reference.toLowerCase()}-scope.csv`,
                    )
                  }
                >
                  {t('results.downloadTaskScope')}
                </Button>
              </>
            ) : (
              <>
                <Button
                  size="small"
                  onClick={() => {
                    onRecover?.();
                    navigate('/form/step');
                  }}
                >
                  {t('results.reviewHandoffSettings')}
                </Button>
                <Button
                  size="small"
                  variant="outline"
                  disabled={mutation.pending}
                  onClick={() => {
                    void mutation.run(async () => {
                      const next = await onRetry?.();
                      navigate(next ? '/result/success' : '/form/step');
                    });
                  }}
                >
                  {t('results.prepareForTeamInstead')}
                </Button>
              </>
            )}
          </Result.Actions>
        </Result.Root>
        <Separator decorative />
        <div className={styles.receiptBody}>
          <dl className={styles.receiptMetadata}>
            <div>
              <dt>{t('results.project')}</dt>
              <dd>
                <Link className={shared.link} to={projectDetailPath(project)}>
                  {project.name}
                </Link>
              </dd>
            </div>
            <div>
              <dt>{t('results.preparedBy')}</dt>
              <dd>{receipt.requester}</dd>
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
                <dd>{receipt.handoffTitle}</dd>
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
              <dd>{t('results.linkedCount', { count: tasks.length })}</dd>
            </div>
          </dl>
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
              <Link className={shared.link} to="/work/tasks">
                {t('results.openTaskQueue')}
              </Link>
            </div>
          ) : (
            <div className={styles.recovery}>
              <Alert intent="error">
                <Alert.Title>{t('results.permissionPolicyWsExport01')}</Alert.Title>
                <Alert.Description>
                  {t('results.theWorkspacePacketCanBePreparedForTeamReview')}
                </Alert.Description>
              </Alert>
              <Accordion type="single" variant="ghost" size="sm">
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
              <Link className={shared.link} to="/data/search-table?search=VD-126">
                {t('results.reviewThePermissionTask')}
              </Link>
            </div>
          )}
        </div>
        <div className={styles.scopeSection}>
          <div>
            <h3>{t('results.linkedWork')}</h3>
            <span className={shared.caption}>{t('results.currentTaskRecordsForThisResult')}</span>
          </div>
          <ul>
            {tasks.map((task) => (
              <li key={task.id}>
                <div>
                  <span className={shared.mono}>{task.id}</span>
                  <Link className={shared.link} to={`/data/search-table?search=${task.id}`}>
                    {task.title}
                  </Link>
                </div>
                <Tag size="sm" intent={taskStatusIntent[task.status]}>
                  {getTaskStatusLabel(t, task.status)}
                </Tag>
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
            {t('results.virgoStudioValue', { v0: success ? 'RECORDED' : t('results.draftKept') })}
          </span>
          <Link className={shared.link} to={success ? '/form/basic' : '/work/projects'}>
            {success ? t('results.createAnotherRequest') : t('results.backToProjects')}
          </Link>
        </div>
      </Surface>
    </div>
  );
}
