import { Empty, Progress, Surface, Tag, Timeline } from '@virgo-design/ui';
import { useParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';

import { FilterSelect } from '@/components/controls/filter-select';
import { PageHeading } from '@/components/display/page-heading';
import { Panel } from '@/components/display/panel';
import { ResourceContent } from '@/components/feedback/resource-content';
import { useCurrentUser } from '@/features/auth';
import { CatalogBoundary, moduleFilterKey, Person, useTaskCatalog } from '@/features/catalog';
import { canManageProject } from '@/lib/auth/permissions';
import { businessLabel } from '@/lib/formatting/business-labels';
import { routePath } from '@/routes';
import { AppLink, useAppNavigation, useQueryParams } from '@/routes/navigation';

import { MetricStrip } from '../components/MetricStrip/MetricStrip';
import { ProjectActivityPanel } from '../components/ProjectActivityPanel/ProjectActivityPanel';
import { ProjectTaskPanel } from '../components/ProjectTaskPanel/ProjectTaskPanel';
import { useProjectResources } from '../hooks/use-project-resources';
import {
  formatProjectDate,
  healthIntent,
  projectHealthLabelNames,
} from '../presentation/project-presentation';
import { projectDetailPath, projectHandoffPath, projectTasksPath } from '../routes/navigation';

function ProjectDetailContent({
  resources,
}: {
  resources: ReturnType<typeof useProjectResources>;
}) {
  const { projects, metadata } = useTaskCatalog();
  const { members: taskAssignees, referenceDate: taskReferenceDate } = metadata;

  const { t, i18n } = useTranslation();
  const user = useCurrentUser()!;
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useAppNavigation();
  const [params] = useQueryParams();

  const candidate = params.get('returnTo');
  const portfolioPath =
    candidate && new RegExp('^' + routePath('work.projects') + '(?:\\?[^#]*)?$').test(candidate)
      ? candidate
      : routePath('work.projects');
  const project = projects.find((item) => item.id === projectId);

  if (!project)
    return (
      <div className="grid gap-20 min-w-0">
        <h1 className="absolute [width:1px] [height:1px] [margin:-1px] overflow-hidden [clip-path:inset(50%)] whitespace-nowrap">
          {t('tasks.workspace.projectDetails')}
        </h1>
        <Empty size="md">
          <Empty.Title>{t('projectDetails.projectNotFound')}</Empty.Title>
          <Empty.Description>
            {t('projectDetails.chooseAProjectFromThePortfolioToViewIts')}
          </Empty.Description>
          <Empty.Action>
            <AppLink
              className={[
                'text-brand-link no-underline',
                'hover:underline hover:[text-underline-offset:3px] focus-visible:[outline:2px_solid_var(--vd-brand-link)]',
                'focus-visible:[outline-offset:4px] focus-visible:[border-radius:2px]',
              ].join(' ')}
              href={portfolioPath}
            >
              {t('projectDetails.backToProjects')}
            </AppLink>
          </Empty.Action>
        </Empty>
      </div>
    );

  const members = taskAssignees.filter((member) => project.memberIds.includes(member.id));

  return (
    <div className="grid gap-20 min-w-0">
      <Surface border="default" radius={8} className="min-w-0">
        <div
          className={[
            '[&_>_div]:flex [&_>_div]:items-center [&_>_div]:gap-12 [&_>_div]:flex-wrap',
            'viewport-max-640:[padding:var(--vd-spacing-16)_var(--vd-spacing-16)_0]',
            'flex flex-wrap items-center justify-between gap-12 [padding:var(--vd-spacing-20)_var(--vd-spacing-20)_0]',
            '[font-size:var(--vd-font-size-12)]',
          ].join(' ')}
        >
          <div>
            <Tag size="md" intent={healthIntent[project.health]}>
              {t(`projects.${projectHealthLabelNames[project.health]}`)}
            </Tag>
            <span className="[font-family:var(--vd-font-family-mono)] [font-size:var(--vd-font-size-11)] text-text-tertiary">
              {project.code}
            </span>
            <span className="text-text-tertiary [font-size:var(--vd-font-size-11)]">
              {t('projectDetails.taskSnapshotValue', { v0: taskReferenceDate })}
            </span>
          </div>
          <div className="justify-end [max-width:100%]">
            <div className="[width:220px] [max-width:100%]">
              <FilterSelect
                label={t('projectDetails.projectRecord')}
                value={project.id}
                onChange={(id) =>
                  navigate(
                    routePath('work.projects.[projectId]', { projectId: id }) +
                      '?returnTo=' +
                      encodeURIComponent(portfolioPath),
                  )
                }
                options={projects.map((item) => ({
                  value: item.id,
                  label: businessLabel(item.name, i18n.language),
                }))}
              />
            </div>
            {canManageProject(user, project.id) ? (
              <AppLink
                className={[
                  'text-brand-link no-underline',
                  'hover:underline hover:[text-underline-offset:3px] focus-visible:[outline:2px_solid_var(--vd-brand-link)]',
                  'focus-visible:[outline-offset:4px] focus-visible:[border-radius:2px]',
                ].join(' ')}
                href={projectHandoffPath(project.id)}
              >
                {t('tasks.workspace.handoff')}
              </AppLink>
            ) : null}
            <AppLink
              className={[
                'text-brand-link no-underline',
                'hover:underline hover:[text-underline-offset:3px] focus-visible:[outline:2px_solid_var(--vd-brand-link)]',
                'focus-visible:[outline-offset:4px] focus-visible:[border-radius:2px]',
              ].join(' ')}
              href={portfolioPath}
            >
              {t('projectDetails.projectPortfolio')}
            </AppLink>
          </div>
        </div>
        <PageHeading
          variant="integrated"
          title={businessLabel(project.name, i18n.language)}
          description={t(
            user.role === 'member' ? 'projects.personalScope' : 'projects.portfolioScope',
          )}
        />
        <ResourceContent resource={resources.summary}>
          {(summary) => (
            <MetricStrip
              className="data-[border=default]:[border:0] data-[border=default]:[background:transparent]"
              items={[
                {
                  label: t('projectDetails.taskCompletion'),
                  value: `${summary.progress}%`,
                  note: t('projectDetails.tasksCompleted', {
                    completed: summary.completed,
                    total: summary.total,
                  }),
                },
                {
                  label: t('projectDetails.openWork'),
                  value: (
                    <AppLink
                      className={[
                        'text-brand-link no-underline',
                        'hover:underline hover:[text-underline-offset:3px] focus-visible:[outline:2px_solid_var(--vd-brand-link)]',
                        'focus-visible:[outline-offset:4px] focus-visible:[border-radius:2px]',
                      ].join(' ')}
                      href={
                        projectTasksPath(project) +
                        '&status=backlog&status=todo&status=in_progress&status=in_review'
                      }
                    >
                      {summary.open}
                    </AppLink>
                  ),
                  note: t('projectDetails.awaitingReviewCount', { count: summary.review }),
                },
                {
                  label: t('projectDetails.estimatedEffort'),
                  value: `${summary.hours}h`,
                  note: t('projectDetails.allLinkedTasks'),
                },
                {
                  label: t('projectDetails.overdueTasks'),
                  value: (
                    <AppLink
                      className={[
                        'text-brand-link no-underline',
                        'hover:underline hover:[text-underline-offset:3px] focus-visible:[outline:2px_solid_var(--vd-brand-link)]',
                        'focus-visible:[outline-offset:4px] focus-visible:[border-radius:2px]',
                      ].join(' ')}
                      href={projectTasksPath(project) + '&due=overdue'}
                    >
                      {summary.overdue}
                    </AppLink>
                  ),
                  note: t('projectDetails.openWorkPastItsDueDate'),
                },
              ]}
            />
          )}
        </ResourceContent>
      </Surface>
      <div className="viewport-max-1050:grid-cols-1 grid [grid-template-columns:minmax(0,_1.8fr)_minmax(280px,_1fr)] gap-20 [align-items:start]">
        <div className="grid gap-20 min-w-0">
          <Panel
            title={t('projectDetails.projectBrief')}
            description={t('projectDetails.theOutcomeThisTeamIsWorkingToward')}
          >
            <div className="viewport-max-640:p-16 p-20">
              <span className="text-text-tertiary [font:var(--vd-font-size-10)_var(--vd-font-family-mono)] [letter-spacing:1px]">
                {t('projectDetails.objective')}
              </span>
              <p className="text-text-secondary [margin:var(--vd-spacing-12)_0_var(--vd-spacing-24)] [font-size:var(--vd-font-size-13)] [line-height:1.8]">
                {businessLabel(project.objective, i18n.language)}
              </p>
              <div
                className={[
                  '[border:1px_solid_var(--vd-border-subtle)] [border-radius:var(--vd-shape-radius-8,_var(--vd-radius-8))] bg-surface-secondary',
                  '[&_h3]:[margin:0_0_var(--vd-spacing-12)] [&_h3]:text-(length:--vd-font-size-12) [&_h3]:font-[600] [&_ul]:m-0 [&_ul]:pl-16 [&_ul]:grid',
                  '[&_ul]:gap-8 [&_ul]:text-text-secondary [&_ul]:text-(length:--vd-font-size-12)',
                  'p-16',
                ].join(' ')}
              >
                <h3>{t('projectDetails.releaseAcceptance')}</h3>
                <ul>
                  <li>{t('projectDetails.everyTaskHasAClearOwnerAndADocumented')}</li>
                  <li>
                    {t(
                      'projectDetails.reviewRequestsIncludeAcceptanceNotesBeforeTheOctoberCheckpoint',
                    )}
                  </li>
                  <li>{t('projectDetails.openRisksAreHandedToTheProjectLeadBefore')}</li>
                </ul>
              </div>
              <ResourceContent resource={resources.summary}>
                {(summary) => (
                  <div
                    className={[
                      '[&_>_div:first-child]:flex [&_>_div:first-child]:justify-between [&_>_div:first-child]:gap-12 [&_>_div:first-child]:flex-wrap',
                      '[&_>_div:first-child]:text-(length:--vd-font-size-11) [&_>_div:first-child_span]:text-text-tertiary',
                      'mt-24 grid gap-12',
                    ].join(' ')}
                  >
                    <div>
                      <strong>{t('projectDetails.deliveryProgress')}</strong>
                      <span>
                        {t('projectDetails.valueCompletedValueRemaining', {
                          v0: summary.completed,
                          v1: summary.open,
                        })}
                      </span>
                    </div>
                    <Progress
                      size="md"
                      value={summary.progress}
                      aria-label={t('projectDetails.projectTaskCompletion')}
                    />
                  </div>
                )}
              </ResourceContent>
            </div>
          </Panel>
          <Panel title={t('tasks.module')} description={t('projects.moduleProgress')}>
            <ResourceContent resource={resources.modules}>
              {(modules) => (
                <div className="viewport-max-640:[grid-template-columns:1fr] viewport-max-640:p-16 grid [grid-template-columns:repeat(2,_minmax(0,_1fr))] gap-12 p-20">
                  {project.modules.map((module) => {
                    const count = modules.find((item) => item.id === module.id);
                    const total = count?.total ?? 0;
                    const done = count?.completed ?? 0;

                    return (
                      <AppLink
                        key={module.id}
                        className={[
                          'grid gap-12 min-w-0 p-16 [border:1px_solid_var(--vd-border-subtle)] [border-radius:var(--vd-shape-radius-8,_var(--vd-radius-8))]',
                          'text-text-primary no-underline text-(length:--vd-font-size-13)',
                          '[&_span]:text-text-secondary [&_span]:text-(length:--vd-font-size-12) hover:bg-surface-secondary',
                          'focus-visible:[outline:2px_solid_var(--vd-brand-primary)] focus-visible:[outline-offset:2px]',
                        ].join(' ')}
                        href={
                          projectTasksPath(project) +
                          '&module=' +
                          encodeURIComponent(moduleFilterKey(project.id, module.id))
                        }
                      >
                        <strong>{businessLabel(module.name, i18n.language)}</strong>
                        <span>{t('projects.completedOfTotal', { completed: done, total })}</span>
                        <Progress
                          value={total ? Math.round((done / total) * 100) : 0}
                          size="sm"
                          aria-label={businessLabel(module.name, i18n.language)}
                        />
                      </AppLink>
                    );
                  })}
                </div>
              )}
            </ResourceContent>
          </Panel>
          <ProjectTaskPanel project={project} resource={resources.tasks} />
          <Panel
            title={t('projectDetails.milestones')}
            description={t('projectDetails.projectScheduleAndHandoffPoints')}
          >
            <div className="viewport-max-640:p-16 p-20">
              <Timeline
                size="medium"
                aria-label={t('projectDetails.valueMilestoneSchedule', {
                  v0: businessLabel(project.name, i18n.language),
                })}
              >
                {project.milestones.map((milestone, index) => (
                  <Timeline.Item
                    key={milestone.title}
                    status={
                      milestone.date < taskReferenceDate
                        ? 'complete'
                        : index ===
                            project.milestones.findIndex((item) => item.date >= taskReferenceDate)
                          ? 'active'
                          : 'pending'
                    }
                  >
                    <Timeline.Title>{businessLabel(milestone.title, i18n.language)}</Timeline.Title>
                    <Timeline.Description>
                      {businessLabel(milestone.note, i18n.language)}
                    </Timeline.Description>
                    <Timeline.Time dateTime={milestone.date}>
                      {formatProjectDate(milestone.date, i18n.language)}
                    </Timeline.Time>
                  </Timeline.Item>
                ))}
              </Timeline>
            </div>
          </Panel>
        </div>
        <div className="grid gap-20 min-w-0">
          <Panel title={t('projectDetails.recordInformation')}>
            <dl
              className={[
                '[&_>_div]:grid [&_>_div]:[grid-template-columns:110px_minmax(0,_1fr)] [&_>_div]:gap-12 [&_>_div]:items-center [&_dt]:text-text-tertiary',
                '[&_dt]:text-(length:--vd-font-size-11) [&_dd]:m-0 [&_dd]:text-(length:--vd-font-size-12)',
                'viewport-max-640:p-16 viewport-max-640:[&_>_div]:[grid-template-columns:90px_minmax(0,_1fr)]',
                'p-20 m-0 grid gap-20',
              ].join(' ')}
            >
              <div>
                <dt>{t('projectDetails.projectId')}</dt>
                <dd className="[font-family:var(--vd-font-family-mono)] [font-size:var(--vd-font-size-11)] text-text-tertiary">
                  {project.code}
                </dd>
              </div>
              <div>
                <dt>{t('projectDetails.projectLead')}</dt>
                <dd>
                  <Person id={project.owner} />
                </dd>
              </div>
              <div>
                <dt>{t('projectDetails.workspace')}</dt>
                <dd>{t('projectDetails.virgoStudio')}</dd>
              </div>
              <div>
                <dt>{t('projectDetails.started')}</dt>
                <dd>
                  <time dateTime={project.start}>
                    {formatProjectDate(project.start, i18n.language)}
                  </time>
                </dd>
              </div>
              <div>
                <dt>{t('projectDetails.targetDate')}</dt>
                <dd>
                  <time dateTime={project.due}>
                    {formatProjectDate(project.due, i18n.language)}
                  </time>
                </dd>
              </div>
              <div>
                <dt>{t('projectDetails.visibility')}</dt>
                <dd>{t('projectDetails.teamWorkspace')}</dd>
              </div>
              <div>
                <dt>{t('projectDetails.healthAssessment')}</dt>
                <dd>
                  <Tag size="md" intent={healthIntent[project.health]}>
                    {t(`projects.${projectHealthLabelNames[project.health]}`)}
                  </Tag>
                </dd>
              </div>
            </dl>
          </Panel>
          <Panel
            title={t('projectDetails.projectTeam')}
            description={t('projectDetails.leadAndTaskOwnersInThisProject')}
          >
            <ResourceContent resource={resources.members}>
              {(counts) => (
                <ul
                  className={[
                    '[&_li]:flex [&_li]:justify-between [&_li]:items-center [&_li]:gap-12 [&_li_>_span:last-child]:text-(length:--vd-font-size-10)',
                    '[&_li_>_span:last-child]:text-text-tertiary',
                    '[list-style:none] p-20 m-0 grid gap-16',
                  ].join(' ')}
                >
                  {members.map((member) => (
                    <li key={member.id}>
                      <Person id={member.id} />
                      <span>
                        {member.id === project.owner
                          ? t('projectDetails.lead')
                          : t('projectDetails.valueTasks', {
                              v0: counts.find((entry) => entry.memberId === member.id)?.count ?? 0,
                            })}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </ResourceContent>
          </Panel>
          <ProjectActivityPanel resource={resources.activity} />
          <Panel title={t('projectDetails.relatedFocusAreas')}>
            <ul className="[&_li]:grid [&_li]:gap-6 [&_a]:flex [&_a]:justify-between [&_a]:text-(length:--vd-font-size-12) p-20 m-0 [list-style:none] grid gap-20">
              {projects
                .filter((item) => item.id !== project.id)
                .map((item) => (
                  <li key={item.id}>
                    <AppLink
                      className={[
                        'text-brand-link no-underline',
                        'hover:underline hover:[text-underline-offset:3px] focus-visible:[outline:2px_solid_var(--vd-brand-link)]',
                        'focus-visible:[outline-offset:4px] focus-visible:[border-radius:2px]',
                      ].join(' ')}
                      href={projectDetailPath(item)}
                    >
                      {businessLabel(item.name, i18n.language)}
                      <span aria-hidden="true">↗</span>
                    </AppLink>
                    <span className="text-text-tertiary [font-size:var(--vd-font-size-11)]">
                      {businessLabel(item.summary, i18n.language)}
                    </span>
                  </li>
                ))}
            </ul>
          </Panel>
        </div>
      </div>
    </div>
  );
}

function ProjectDetailResource() {
  const { projectId = '' } = useParams<{ projectId: string }>();
  const resources = useProjectResources(projectId);

  return <ProjectDetailContent resources={resources} />;
}

export function ProjectDetailView() {
  return (
    <CatalogBoundary>
      <ProjectDetailResource />
    </CatalogBoundary>
  );
}
