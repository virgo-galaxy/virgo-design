import { DownloadIcon } from '@virgo-design/icons';
import { Accordion, Alert, Button, Result, Steps, Surface, Tag } from '@virgo-design/ui';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router';

import { getTasks } from '@/api/tasks';
import { getLatestWorkflow } from '@/api/workflows';
import { MutationFeedback } from '@/components/feedback/mutation-feedback';
import { RemoteState } from '@/components/feedback/remote-state';
import {
  CatalogBoundary,
  moduleName,
  Person,
  projectName,
  useTaskCatalog,
} from '@/features/catalog';
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
import { useMutation } from '@/hooks/async/use-mutation';
import { useRemoteData } from '@/hooks/async/use-remote-data';
import { downloadCsv } from '@/lib/browser/download';
import { businessLabel } from '@/lib/formatting/business-labels';
import { routePath } from '@/routes';
import { useResourceRevision } from '@/store/resources';

import { useHandoffSession } from '../hooks/use-handoff-session';
import type { WorkflowReceipt } from '../model/handoff';

function ResultContent({
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
    <div className="flex flex-col [gap:20px] min-w-0">
      <MutationFeedback pending={mutation.pending} error={mutation.error} />
      <Surface
        border="default"
        radius={12}
        className={[
          '[--result-accent:var(--vd-status-success-accent)] flex [flex:1] flex-col min-w-0 w-full',
          '[box-shadow:var(--vd-panel-shadow,_0_4px_18px_color-mix(in_srgb,_var(--vd-text-primary)_4%,_transparent)_)]',
          'data-[outcome=error]:[--result-accent:var(--vd-status-danger-accent)]',
        ].join(' ')}
        data-outcome={receipt.outcome}
      >
        <Result.Root
          status={receipt.outcome}
          className={[
            'grid [grid-template-columns:72px_minmax(0,_1fr)_auto] items-center [gap:24px] [padding:36px_32px] text-start',
            '[border-bottom:1px_solid_var(--vd-border-subtle)]',
            '[background:linear-gradient(_110deg,_color-mix(in_srgb,_var(--result-accent)_5%,_transparent),_transparent_65%_)]',
            '[border-radius:12px_12px_0_0]',
            "[&_>_[data-slot='icon']]:[width:72px] [&_>_[data-slot='icon']]:[height:72px] [&_>_[data-slot='icon']]:[border-radius:20px]",
            "[&_>_[data-slot='icon']]:[background:color-mix(in_srgb,_var(--result-accent)_9%,_var(--vd-surface-default))]",
            "[&_>_[data-slot='icon']_svg]:[width:40px] [&_>_[data-slot='icon']_svg]:[height:40px] [&_h1]:m-0 [&_h1]:text-(length:--vd-font-size-24)",
            '[&_h1]:[letter-spacing:-0.5px] [&_p]:m-0 [&_p]:[max-width:70ch] [&_p]:text-text-secondary [&_p]:[font-size:14px] [&_p]:leading-[1.8]',
            'viewport-max-1200:[grid-template-columns:72px_minmax(0,_1fr)] viewport-max-640:[grid-template-columns:1fr]',
            'viewport-max-640:[padding:24px_20px] viewport-max-640:[gap:20px] viewport-max-640:[&_h1]:text-(length:--vd-font-size-20)',
          ].join(' ')}
          aria-labelledby="receipt-result-title"
        >
          <Result.Icon />
          <div className="grid [gap:12px] [justify-items:start] min-w-0">
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
              <Result.Actions
                {...groupProps}
                className="flex flex-wrap [justify-content:start] [gap:12px] m-0 viewport-max-1200:[grid-column:2] viewport-max-640:[grid-column:1]"
              />
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
                      navigate(
                        next ? routePath(`result.${next.outcome}`) : projectHandoffPath(project.id),
                      );
                    });
                  }}
                >
                  {t('results.prepareForTeamInstead')}
                </Button>
              </>
            )}
          </Button.Group>
        </Result.Root>
        <div
          className={[
            'viewport-max-900:[grid-template-columns:1fr] viewport-max-640:[padding:20px] viewport-max-640:[gap:20px]',
            'grid [flex:1] [grid-template-columns:minmax(0,_1fr)_minmax(0,_1fr)] [gap:24px] [padding:32px]',
          ].join(' ')}
        >
          <section
            className={[
              'min-w-0 [padding:24px] [border:1px_solid_var(--vd-border-subtle)] [border-radius:12px]',
              '[background:color-mix(in_srgb,_var(--vd-surface-secondary)_30%,_var(--vd-surface-default))]',
              '[&_h2]:m-0 [&_h2]:[font-size:16px] [&_h2]:font-[600] [&_h3]:m-0 [&_h3]:[font-size:16px] [&_h3]:font-[600]',
              'flex flex-col [gap:24px]',
              'viewport-max-640:[padding:20px]',
            ].join(' ')}
            aria-labelledby="receipt-record-title"
          >
            <h2 id="receipt-record-title">{t('results.recordDetails')}</h2>
            <dl
              className={[
                '[&_>_div]:grid [&_>_div]:[gap:8px] [&_>_div]:[align-content:start] [&_dt]:[font-size:13px] [&_dt]:text-text-tertiary [&_dd]:m-0',
                '[&_dd]:[font-size:14px] [&_dd]:leading-[1.7] [&_dd]:wrap-anywhere',
                'viewport-max-640:[grid-template-columns:1fr] viewport-max-640:[gap:20px]',
                'm-0 grid [flex:1] [grid-template-columns:repeat(2,_minmax(0,_1fr))] [gap:24px] [align-content:space-between]',
              ].join(' ')}
            >
              <div>
                <dt>{t('results.project')}</dt>
                <dd>
                  <Link
                    className={[
                      'text-brand-link no-underline',
                      'hover:underline hover:[text-underline-offset:3px] focus-visible:[outline:2px_solid_var(--vd-brand-link)]',
                      'focus-visible:[outline-offset:4px] focus-visible:[border-radius:2px]',
                    ].join(' ')}
                    to={projectDetailPath(project)}
                  >
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
            <div
              className={[
                'min-w-0 [padding:24px] [border:1px_solid_var(--vd-border-subtle)] [border-radius:12px]',
                '[background:color-mix(in_srgb,_var(--vd-surface-secondary)_30%,_var(--vd-surface-default))]',
                '[&_h2]:m-0 [&_h2]:[font-size:16px] [&_h2]:font-[600] [&_h3]:m-0 [&_h3]:[font-size:16px] [&_h3]:font-[600]',
                'grid [grid-template-rows:auto_1fr_auto] [gap:24px]',
                "[&_>_a]:[font-size:13px] [&_[data-slot='item']]:[grid-template-columns:36px_minmax(0,_1fr)]",
                "[&_[data-slot='item']]:[grid-template-rows:auto_auto] [&_[data-slot='item']]:[align-content:start] [&_[data-slot='item']]:[gap:8px_16px]",
                "[&_[data-slot='item']]:[padding-block:8px] [&_[data-slot='indicator']]:[grid-row:1/3] [&_[data-slot='indicator']]:grid",
                "[&_[data-slot='indicator']]:[place-items:center] [&_[data-slot='indicator']]:[align-self:start] [&_[data-slot='indicator']]:[width:36px]",
                "[&_[data-slot='indicator']]:[height:36px] [&_[data-slot='indicator']]:[border-radius:10px]",
                "[&_[data-slot='indicator']]:bg-surface-secondary [&_[data-slot='indicator']]:[font:13px_var(--vd-font-family-mono)]",
                "[&_[data-status='complete']_[data-slot='indicator']]:[background:color-mix(in_srgb,_var(--vd-brand-primary)_8%,_var(--vd-surface-default))]",
                "[&_[data-status='complete']_[data-slot='indicator']]:text-brand-primary",
                "[&_[data-status='current']_[data-slot='indicator']]:[background:color-mix(in_srgb,_var(--vd-brand-primary)_8%,_var(--vd-surface-default))]",
                "[&_[data-status='current']_[data-slot='indicator']]:text-brand-primary [&_[data-slot='title']]:[font-size:14px]",
                "[&_[data-slot='description']]:[font-size:13px] [&_[data-slot='description']]:leading-[1.8]",
                'viewport-max-640:[padding:20px]',
              ].join(' ')}
            >
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
              <Link
                className={[
                  'text-brand-link no-underline',
                  'hover:underline hover:[text-underline-offset:3px] focus-visible:[outline:2px_solid_var(--vd-brand-link)]',
                  'focus-visible:[outline-offset:4px] focus-visible:[border-radius:2px]',
                ].join(' ')}
                to={routePath('work.tasks')}
              >
                {t('results.openTaskQueue')}
              </Link>
            </div>
          ) : (
            <div
              className={[
                'min-w-0 [padding:24px] [border:1px_solid_var(--vd-border-subtle)] [border-radius:12px]',
                '[background:color-mix(in_srgb,_var(--vd-surface-secondary)_30%,_var(--vd-surface-default))]',
                '[&_h2]:m-0 [&_h2]:[font-size:16px] [&_h2]:font-[600] [&_h3]:m-0 [&_h3]:[font-size:16px] [&_h3]:font-[600]',
                'grid [align-content:start] [gap:20px]',
                "[&_>_a]:[font-size:13px] [&_[data-slot='content']]:[font-size:14px] [&_[data-slot='content']]:leading-[1.8]",
                'viewport-max-640:[padding:20px]',
              ].join(' ')}
            >
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
              <Link
                className={[
                  'text-brand-link no-underline',
                  'hover:underline hover:[text-underline-offset:3px] focus-visible:[outline:2px_solid_var(--vd-brand-link)]',
                  'focus-visible:[outline-offset:4px] focus-visible:[border-radius:2px]',
                ].join(' ')}
                to={projectTasksPath(project)}
              >
                {t('results.openTaskQueue')}
              </Link>
            </div>
          )}
        </div>
        <div
          className={[
            '[border-top:1px_solid_var(--vd-border-subtle)]',
            '[&_h3]:[margin:0_0_8px] [&_h3]:[font-size:16px] [&_ul]:[list-style:none] [&_ul]:[margin:20px_0_0] [&_ul]:p-0 [&_ul]:grid',
            '[&_ul]:grid-cols-2 [&_ul]:[gap:20px] [&_li]:grid [&_li]:[gap:16px] [&_li]:[padding:24px] [&_li]:min-w-0',
            '[&_li]:[border:1px_solid_var(--vd-border-default)] [&_li]:[border-radius:12px] [&_li]:bg-surface-default [&_li]:[font-size:14px]',
            '[&_li:only-child]:[grid-column:1/-1]',
            'viewport-max-900:[&_ul]:[grid-template-columns:1fr] viewport-max-640:[margin-inline:20px] viewport-max-640:[padding-block:20px]',
            'viewport-max-640:[&_li]:[padding:20px]',
            '[margin-inline:32px] [padding:24px_0_32px]',
          ].join(' ')}
        >
          <div>
            <h3>{t('results.linkedWork')}</h3>
            <span className="text-text-tertiary [font-size:var(--vd-font-size-11)]">
              {scopeCount > 4
                ? t('results.scopePreview', { shown: 4, total: scopeCount })
                : t('results.currentTaskRecordsForThisResult')}
            </span>
          </div>
          <ul>
            {tasks.slice(0, 4).map((task) => (
              <li key={task.id}>
                <div className="flex flex-wrap items-center justify-between [gap:12px]">
                  <span className="[font-family:var(--vd-font-family-mono)] [font-size:var(--vd-font-size-11)] text-text-tertiary">
                    {task.id}
                  </span>
                  <Tag size="md" intent={taskStatusIntent[task.status]}>
                    {t(`tasks.statusLabels.${taskStatusLabelNames[task.status]}`)}
                  </Tag>
                </div>
                <Link
                  className="w-fit text-brand-primary no-underline [font-size:15px] font-[600] leading-[1.6] hover:underline"
                  to={taskDetailsPath(task.id, routePath(`result.${receipt.outcome}`))}
                >
                  {businessLabel(task.title, i18n.language)}
                </Link>
                <p className="m-0 text-text-secondary [font-size:13px] [line-height:1.8] [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical] overflow-hidden">
                  {businessLabel(task.description, i18n.language)}
                </p>
                <div className="flex flex-wrap items-center justify-between [gap:12px] mt-auto [padding-top:16px] [border-top:1px_solid_var(--vd-border-subtle)] text-text-secondary [font-size:13px]">
                  <span>
                    {businessLabel(moduleName(task.project, task.module, projects), i18n.language)}
                  </span>
                  <Person id={task.assignee} />
                </div>
              </li>
            ))}
          </ul>
          {!tasks.length ? (
            <p className="text-text-tertiary [font-size:var(--vd-font-size-11)]">
              {t('results.theseTasksHaveMovedOutOfTheCurrentRegister')}
            </p>
          ) : null}
        </div>
        <div
          className={[
            '[border-top:1px_solid_var(--vd-border-subtle)]',
            '[&_>_a]:[font-size:13px]',
            'viewport-max-640:[padding:20px]',
            '[padding:20px_32px] flex items-center flex-wrap [gap:12px] justify-between',
          ].join(' ')}
        >
          <span className="[font-family:var(--vd-font-family-mono)] [font-size:var(--vd-font-size-11)] text-text-tertiary">
            {t('results.virgoStudioValue', {
              v0: success ? t('results.recorded') : t('results.draftKept'),
            })}
          </span>
          <Link
            className={[
              'text-brand-link no-underline',
              'hover:underline hover:[text-underline-offset:3px] focus-visible:[outline:2px_solid_var(--vd-brand-link)]',
              'focus-visible:[outline-offset:4px] focus-visible:[border-radius:2px]',
            ].join(' ')}
            to={success ? routePath('work.tasks.new') : routePath('work.projects')}
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
      <ResultContent
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
  const revision = useResourceRevision('workflows');
  const load = useCallback((signal: AbortSignal) => getLatestWorkflow(outcome, signal), [outcome]);
  const resource = useRemoteData(load, { key: outcome, revision });

  if (!resource.data) return <RemoteState {...resource} />;

  return (
    <>
      {resource.error ? <RemoteState error={resource.error} retry={resource.retry} /> : null}
      <ResultTasks receipt={resource.data} />
    </>
  );
}

export function WorkflowResultView({ outcome }: { outcome: 'success' | 'error' }) {
  return (
    <CatalogBoundary>
      <ResultResource key={outcome} outcome={outcome} />
    </CatalogBoundary>
  );
}
