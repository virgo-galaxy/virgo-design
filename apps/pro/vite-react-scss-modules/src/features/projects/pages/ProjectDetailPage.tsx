import { Empty, Progress, Surface, Tag, Timeline } from '@virgo-design/ui';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router';

import { getProjectOverviews } from '@/api/projects';
import { FilterSelect } from '@/components/filters/FilterSelect';
import { MetricStrip } from '@/components/page/MetricStrip';
import { PageHeading } from '@/components/page/PageHeading';
import { Panel } from '@/components/page/Panel';
import type { ProjectOverviewDto } from '@/contracts/projects';
import { useCurrentUser } from '@/features/auth';
import { Person } from '@/features/catalog';
import { CatalogBoundary, moduleFilterKey, useTaskCatalog } from '@/features/catalog';
import {
  taskDetailsPath,
  taskPriorityIntent,
  taskStatusIntent,
  taskStatusLabelNames,
  useTaskDependentQuery,
} from '@/features/tasks';
import { canManageProject } from '@/lib/auth/permissions';
import { businessLabel } from '@/lib/demo/labels';
import { formatDueDate } from '@/lib/formatting/format-due-date';
import { routePath } from '@/routes';
import { RemoteState } from '@/shared/async/RemoteState';
import shared from '@/styles/product-layout.module.scss';

import {
  formatProjectDate,
  healthIntent,
  projectHealthLabelNames,
} from '../presentation/project-presentation';
import { projectDetailPath, projectHandoffPath, projectTasksPath } from '../routes/navigation';
import styles from './ProjectDetailPage.module.scss';

function ProjectDetailPageView({ overview }: { overview: ProjectOverviewDto | undefined }) {
  const { projects, metadata } = useTaskCatalog();
  const { members: taskAssignees, referenceDate: taskReferenceDate } = metadata;

  const { t, i18n } = useTranslation();
  const user = useCurrentUser()!;
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const candidate = params.get('returnTo');
  const portfolioPath =
    candidate && new RegExp('^' + routePath('projects') + '(?:\\?[^#]*)?$').test(candidate)
      ? candidate
      : routePath('projects');
  const project = projects.find((item) => item.id === projectId);
  if (!project || !overview)
    return (
      <div className={shared.page}>
        <h1 className={shared.srOnly}>{t('tasks.workspace.projectDetails')}</h1>
        <Empty size="md">
          <Empty.Title>{t('projectDetails.projectNotFound')}</Empty.Title>
          <Empty.Description>
            {t('projectDetails.chooseAProjectFromThePortfolioToViewIts')}
          </Empty.Description>
          <Empty.Action>
            <Link className={shared.link} to={portfolioPath}>
              {t('projectDetails.backToProjects')}
            </Link>
          </Empty.Action>
        </Empty>
      </div>
    );
  const summary = overview;
  const members = taskAssignees.filter((member) => project.memberIds.includes(member.id));
  const events = summary.activity;
  return (
    <div className={shared.page}>
      <Surface border="default" radius={8} className={styles.recordSummary}>
        <div className={styles.recordBar}>
          <div>
            <Tag size="md" intent={healthIntent[project.health]}>
              {t(`projects.${projectHealthLabelNames[project.health]}`)}
            </Tag>
            <span className={shared.mono}>{project.code}</span>
            <span className={shared.caption}>
              {t('projectDetails.taskSnapshotValue', { v0: taskReferenceDate })}
            </span>
          </div>
          <div className={styles.recordControls}>
            <div className={styles.projectPicker}>
              <FilterSelect
                label={t('projectDetails.projectRecord')}
                value={project.id}
                onChange={(id) =>
                  navigate(
                    routePath('project-detail', { projectId: id }) +
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
              <Link className={shared.link} to={projectHandoffPath(project.id)}>
                {t('tasks.workspace.handoff')}
              </Link>
            ) : null}
            <Link className={shared.link} to={portfolioPath}>
              {t('projectDetails.projectPortfolio')}
            </Link>
          </div>
        </div>
        <PageHeading
          variant="integrated"
          title={businessLabel(project.name, i18n.language)}
          description={t(
            user.role === 'member' ? 'projects.personalScope' : 'projects.portfolioScope',
          )}
        />
        <MetricStrip
          className={styles.summaryMetrics!}
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
                <Link
                  className={shared.link}
                  to={
                    projectTasksPath(project) +
                    '&status=backlog&status=todo&status=in_progress&status=in_review'
                  }
                >
                  {summary.open}
                </Link>
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
                <Link className={shared.link} to={projectTasksPath(project) + '&due=overdue'}>
                  {summary.overdue}
                </Link>
              ),
              note: t('projectDetails.openWorkPastItsDueDate'),
            },
          ]}
        />
      </Surface>
      <div className={shared.twoColumns}>
        <div className={shared.stack}>
          <Panel
            title={t('projectDetails.projectBrief')}
            description={t('projectDetails.theOutcomeThisTeamIsWorkingToward')}
          >
            <div className={shared.body}>
              <span className={shared.eyebrow}>{t('projectDetails.objective')}</span>
              <p className={styles.objective}>{businessLabel(project.objective, i18n.language)}</p>
              <div className={styles.acceptance}>
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
              <div className={styles.progress}>
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
            </div>
          </Panel>
          <Panel title={t('tasks.module')} description={t('projects.moduleProgress')}>
            <div className={styles.moduleGrid}>
              {project.modules.map((module) => {
                const count = summary.modules.find((item) => item.id === module.id);
                const total = count?.total ?? 0;
                const done = count?.completed ?? 0;
                return (
                  <Link
                    key={module.id}
                    className={styles.moduleCard}
                    to={
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
                  </Link>
                );
              })}
            </div>
          </Panel>
          <Panel
            title={t('projectDetails.linkedTasks')}
            description={t('projectDetails.liveRecordsFromTheSharedTaskRegister')}
            actions={
              <Link className={shared.link} to={projectTasksPath(project)}>
                {t('projectDetails.openTaskRegister')}
              </Link>
            }
          >
            <ul className={styles.taskList}>
              {summary.tasks.slice(0, 8).map((task) => (
                <li key={task.id}>
                  <div>
                    <span className={shared.mono}>{task.id}</span>
                    <Link
                      className={styles.taskButton}
                      to={taskDetailsPath(task.id, projectDetailPath(project))}
                    >
                      {businessLabel(task.title, i18n.language)}
                    </Link>
                    <span className={shared.caption}>
                      {t('projectDetails.valueHEstimateValue', {
                        v0: task.estimateHours,
                        v1: task.dueDate
                          ? t('projectDetails.dueValue', {
                              v0: formatDueDate(task.dueDate, i18n.language),
                            })
                          : t('projectDetails.unscheduled'),
                      })}
                    </span>
                  </div>
                  <div className={styles.taskTags}>
                    <Tag size="md" intent={taskStatusIntent[task.status]}>
                      {t(`tasks.statusLabels.${taskStatusLabelNames[task.status]}`)}
                    </Tag>
                    <Tag size="md" intent={taskPriorityIntent[task.priority]} variant="outline">
                      {t(`tasks.priorityLabels.${task.priority}`)}
                    </Tag>
                  </div>
                </li>
              ))}
            </ul>
            {!summary.total ? (
              <p className={shared.body}>{t('projectDetails.noTasksAreLinkedToThisProject')}</p>
            ) : null}
            <div className={shared.footer}>
              <span role="status">
                {t('projects.taskPreview', {
                  count: Math.min(summary.total, 8),
                  total: summary.total,
                })}
              </span>
              <Link className={shared.link} to={projectTasksPath(project)}>
                {t('projects.viewTasks')}
              </Link>
            </div>
          </Panel>
          <Panel
            title={t('projectDetails.milestones')}
            description={t('projectDetails.projectScheduleAndHandoffPoints')}
          >
            <div className={shared.body}>
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
        <div className={shared.stack}>
          <Panel title={t('projectDetails.recordInformation')}>
            <dl className={styles.metadata}>
              <div>
                <dt>{t('projectDetails.projectId')}</dt>
                <dd className={shared.mono}>{project.code}</dd>
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
            <ul className={styles.team}>
              {members.map((member) => (
                <li key={member.id}>
                  <Person id={member.id} />
                  <span>
                    {member.id === project.owner
                      ? t('projectDetails.lead')
                      : t('projectDetails.valueTasks', {
                          v0: summary.memberTaskCounts[member.id] ?? 0,
                        })}
                  </span>
                </li>
              ))}
            </ul>
          </Panel>
          <Panel
            title={t('projectDetails.recordedActivity')}
            description={t('projects.recentProjectActivity')}
          >
            <div className={shared.body}>
              {events.length ? (
                <Timeline size="medium" aria-label={t('projectDetails.projectTeamActivity')}>
                  {events.map((event) => (
                    <Timeline.Item key={event.id} status={event.status}>
                      <Timeline.Title>{businessLabel(event.name, i18n.language)}</Timeline.Title>
                      <Timeline.Description>
                        {event.taskTitle && event.action
                          ? t(`workplace.activityActions.${event.action}`, {
                              title: businessLabel(event.taskTitle, i18n.language),
                            })
                          : t('workplace.activityUpdated')}
                      </Timeline.Description>
                      <Timeline.Time dateTime={event.dateTime}>
                        {new Intl.DateTimeFormat(i18n.language, {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        }).format(new Date(event.dateTime))}
                      </Timeline.Time>
                    </Timeline.Item>
                  ))}
                </Timeline>
              ) : (
                <p className={shared.caption}>
                  {t('projectDetails.noTeamActivityRecordedForThisProjectInThe')}
                </p>
              )}
            </div>
          </Panel>
          <Panel title={t('projectDetails.relatedFocusAreas')}>
            <ul className={styles.related}>
              {projects
                .filter((item) => item.id !== project.id)
                .map((item) => (
                  <li key={item.id}>
                    <Link className={shared.link} to={projectDetailPath(item)}>
                      {businessLabel(item.name, i18n.language)}
                      <span aria-hidden="true">↗</span>
                    </Link>
                    <span className={shared.caption}>
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
  const { projectId } = useParams();
  const load = useCallback(
    (signal: AbortSignal) => getProjectOverviews(projectId, signal),
    [projectId],
  );
  const resource = useTaskDependentQuery(load);
  if (!resource.data) return <RemoteState {...resource} />;
  return (
    <>
      {resource.error ? <RemoteState error={resource.error} retry={resource.retry} /> : null}
      <ProjectDetailPageView
        overview={resource.data.find((item) => item.projectId === projectId)}
      />
    </>
  );
}
export function ProjectDetailPage() {
  return (
    <CatalogBoundary>
      <ProjectDetailResource />
    </CatalogBoundary>
  );
}
