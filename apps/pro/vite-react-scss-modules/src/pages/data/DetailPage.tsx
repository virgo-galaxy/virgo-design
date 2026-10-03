import { Button, Empty, Progress, Surface, Tag, Timeline } from '@virgo-design/ui';
import type { Dispatch } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useSearchParams } from 'react-router';

import {
  projectActivity,
  projectDetailPath,
  projectQueryPath,
  projects,
  projectSummary,
} from '@/data/projects';
import type { TaskAction, TaskState } from '@/data/tasks';
import { taskReferenceDate } from '@/data/tasks.seed';
import { formatDueDate } from '@/data/workplace';
import { getProjectHealthLabel } from '@/pages/projects/project-presentation';
import { healthIntent } from '@/pages/projects/project-presentation';
import { FilterSelect, MetricStrip, Panel, Person } from '@/pages/shared/ProPage';
import shared from '@/pages/shared/ProPage.module.scss';
import { useTaskEditor } from '@/pages/shared/use-task-editor';
import { getTaskPriorityLabel, getTaskStatusLabel } from '@/pages/tasks/task-presentation';
import { taskPriorityIntent, taskStatusIntent } from '@/pages/tasks/task-presentation';

import styles from './DetailPage.module.scss';

export function DetailPage({
  state,
  dispatch,
}: {
  state: TaskState;
  dispatch: Dispatch<TaskAction>;
}) {
  const { t, i18n } = useTranslation();
  const [params, setParams] = useSearchParams();
  const project = projects.find((item) => item.id === (params.get('project') ?? 'workspace'));
  const editor = useTaskEditor(state, dispatch, (task) => task.project === project?.name);
  if (!project)
    return (
      <div className={shared.page}>
        <Empty size="md">
          <Empty.Title>{t('data.projectNotFound')}</Empty.Title>
          <Empty.Description>{t('data.chooseAProjectFromThePortfolioToViewIts')}</Empty.Description>
          <Empty.Action>
            <Link className={shared.link} to="/work/projects">
              {t('data.backToProjects')}
            </Link>
          </Empty.Action>
        </Empty>
      </div>
    );
  const summary = projectSummary(project, state.tasks);
  const events = projectActivity(project);
  return (
    <div className={shared.page}>
      <Surface border="default" radius={8} className={styles.recordSummary}>
        <div className={styles.recordBar}>
          <div>
            <Tag size="sm" intent={healthIntent[project.health]}>
              {getProjectHealthLabel(t, project.health)}
            </Tag>
            <span className={shared.mono}>{t('data.octoberCycle')}</span>
            <span className={shared.caption}>
              {t('data.taskSnapshotValue', { v0: taskReferenceDate })}
            </span>
          </div>
          <div className={styles.recordControls}>
            <div className={styles.projectPicker}>
              <FilterSelect
                label={t('data.projectRecord')}
                value={project.id}
                onChange={(id) => setParams({ project: id })}
                options={projects.map((item) => ({ value: item.id, label: item.name }))}
              />
            </div>
            <Link className={shared.link} to="/work/projects">
              {t('data.projectPortfolio')}
            </Link>
          </div>
        </div>
        <MetricStrip
          className={styles.summaryMetrics!}
          items={[
            {
              label: t('data.taskCompletion'),
              value: `${summary.progress}%`,
              note: t('data.tasksCompleted', {
                completed: summary.completed,
                total: summary.total,
              }),
            },
            {
              label: t('data.openWork'),
              value: summary.open,
              note: t('data.awaitingReviewCount', { count: summary.review }),
            },
            {
              label: t('data.estimatedEffort'),
              value: `${summary.hours}h`,
              note: t('data.allLinkedTasks'),
            },
            {
              label: t('data.overdueTasks'),
              value: summary.overdue,
              note: t('data.openWorkPastItsDueDate'),
            },
          ]}
        />
      </Surface>
      <div className={shared.twoColumns}>
        <div className={shared.stack}>
          <Panel
            title={t('data.projectBrief')}
            description={t('data.theOutcomeThisTeamIsWorkingToward')}
          >
            <div className={shared.body}>
              <span className={shared.eyebrow}>{t('data.objective')}</span>
              <p className={styles.objective}>{project.objective}</p>
              <div className={styles.acceptance}>
                <h3>{t('data.releaseAcceptance')}</h3>
                <ul>
                  <li>{t('data.everyTaskHasAClearOwnerAndADocumented')}</li>
                  <li>
                    {t('data.reviewRequestsIncludeAcceptanceNotesBeforeTheOctoberCheckpoint')}
                  </li>
                  <li>{t('data.openRisksAreHandedToTheProjectLeadBefore')}</li>
                </ul>
              </div>
              <div className={styles.progress}>
                <div>
                  <strong>{t('data.deliveryProgress')}</strong>
                  <span>
                    {t('data.valueCompletedValueRemaining', {
                      v0: summary.completed,
                      v1: summary.open,
                    })}
                  </span>
                </div>
                <Progress
                  size="sm"
                  value={summary.progress}
                  aria-label={t('data.projectTaskCompletion')}
                />
              </div>
            </div>
          </Panel>
          <Panel
            title={t('data.linkedTasks')}
            description={t('data.liveRecordsFromTheSharedTaskRegister')}
            actions={
              <Link className={shared.link} to={projectQueryPath(project)}>
                {t('data.queryAllTasks')}
              </Link>
            }
          >
            <ul className={styles.taskList}>
              {summary.tasks.map((task) => (
                <li key={task.id}>
                  <div>
                    <span className={shared.mono}>{task.id}</span>
                    <Button
                      size="small"
                      variant="text"
                      className={styles.taskButton}
                      onClick={(event) => editor.open(task, event.currentTarget)}
                    >
                      {task.title}
                    </Button>
                    <span className={shared.caption}>
                      {t('data.valueHEstimateValue', {
                        v0: task.estimateHours,
                        v1: task.dueDate
                          ? t('data.dueValue', { v0: formatDueDate(task.dueDate, i18n.language) })
                          : t('data.unscheduled'),
                      })}
                    </span>
                  </div>
                  <div className={styles.taskTags}>
                    <Tag size="sm" intent={taskStatusIntent[task.status]}>
                      {getTaskStatusLabel(t, task.status)}
                    </Tag>
                    <Tag size="sm" intent={taskPriorityIntent[task.priority]} variant="outline">
                      {getTaskPriorityLabel(t, task.priority)}
                    </Tag>
                  </div>
                </li>
              ))}
            </ul>
            {!summary.total ? (
              <p className={shared.body}>{t('data.noTasksAreLinkedToThisProject')}</p>
            ) : null}
            <div className={shared.footer}>
              <span role="status">
                {editor.feedback || t('data.openATaskToReviewOrUpdateItsDetails')}
              </span>
            </div>
          </Panel>
          <Panel
            title={t('data.milestones')}
            description={t('data.projectScheduleAndHandoffPoints')}
          >
            <div className={shared.body}>
              <Timeline
                size="small"
                aria-label={t('data.valueMilestoneSchedule', { v0: project.name })}
              >
                {project.milestones.map((milestone, index) => (
                  <Timeline.Item
                    key={milestone.title}
                    status={
                      milestone.date < taskReferenceDate
                        ? 'complete'
                        : index === 0 || milestone.date === taskReferenceDate
                          ? 'active'
                          : 'pending'
                    }
                  >
                    <Timeline.Title>{milestone.title}</Timeline.Title>
                    <Timeline.Description>{milestone.note}</Timeline.Description>
                    <Timeline.Time dateTime={milestone.date}>
                      {formatDueDate(milestone.date, i18n.language)}
                    </Timeline.Time>
                  </Timeline.Item>
                ))}
              </Timeline>
            </div>
          </Panel>
        </div>
        <div className={shared.stack}>
          <Panel title={t('data.recordInformation')}>
            <dl className={styles.metadata}>
              <div>
                <dt>{t('data.projectId')}</dt>
                <dd className={shared.mono}>{project.code}</dd>
              </div>
              <div>
                <dt>{t('data.projectLead')}</dt>
                <dd>
                  <Person id={project.owner} />
                </dd>
              </div>
              <div>
                <dt>{t('data.workspace')}</dt>
                <dd>{t('data.virgoStudio')}</dd>
              </div>
              <div>
                <dt>{t('data.started')}</dt>
                <dd>
                  <time dateTime={project.start}>
                    {formatDueDate(project.start, i18n.language)}
                  </time>
                </dd>
              </div>
              <div>
                <dt>{t('data.targetDate')}</dt>
                <dd>
                  <time dateTime={project.due}>{formatDueDate(project.due, i18n.language)}</time>
                </dd>
              </div>
              <div>
                <dt>{t('data.visibility')}</dt>
                <dd>{t('data.teamWorkspace')}</dd>
              </div>
              <div>
                <dt>{t('data.healthAssessment')}</dt>
                <dd>
                  <Tag size="sm" intent={healthIntent[project.health]}>
                    {getProjectHealthLabel(t, project.health)}
                  </Tag>
                </dd>
              </div>
            </dl>
          </Panel>
          <Panel
            title={t('data.projectTeam')}
            description={t('data.leadAndTaskOwnersInThisProject')}
          >
            <ul className={styles.team}>
              {summary.members.map((member) => (
                <li key={member.id}>
                  <Person id={member.id} />
                  <span>
                    {member.id === project.owner
                      ? t('data.lead')
                      : t('data.valueTasks', {
                          v0: summary.tasks.filter((task) => task.assignee === member.id).length,
                        })}
                  </span>
                </li>
              ))}
            </ul>
          </Panel>
          <Panel
            title={t('data.recordedActivity')}
            description={t('data.teamActivityFromTheOctober1Snapshot')}
          >
            <div className={shared.body}>
              {events.length ? (
                <Timeline size="small" aria-label={t('data.projectTeamActivity')}>
                  {events.map((event) => (
                    <Timeline.Item key={event.id} status={event.status}>
                      <Timeline.Title>{event.name}</Timeline.Title>
                      <Timeline.Description>
                        {t(`workplace.activityActions.${event.id}`)}
                      </Timeline.Description>
                      <Timeline.Time dateTime={event.dateTime}>
                        {t('data.oct1Value', { v0: event.time })}
                      </Timeline.Time>
                    </Timeline.Item>
                  ))}
                </Timeline>
              ) : (
                <p className={shared.caption}>
                  {t('data.noTeamActivityRecordedForThisProjectInThe')}
                </p>
              )}
            </div>
          </Panel>
          <Panel title={t('data.relatedFocusAreas')}>
            <ul className={styles.related}>
              {projects
                .filter((item) => item.id !== project.id)
                .map((item) => (
                  <li key={item.id}>
                    <Link className={shared.link} to={projectDetailPath(item)}>
                      {item.name}
                      <span aria-hidden="true">↗</span>
                    </Link>
                    <span className={shared.caption}>{item.summary}</span>
                  </li>
                ))}
            </ul>
          </Panel>
        </div>
      </div>
      {editor.editor}
    </div>
  );
}
