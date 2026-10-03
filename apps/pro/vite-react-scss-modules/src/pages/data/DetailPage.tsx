import { Button, Empty, Progress, Surface, Tag, Timeline } from '@virgo-design/ui';
import type { Dispatch } from 'react';
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
import { healthIntent } from '@/pages/projects/project-presentation';
import { FilterSelect, MetricStrip, Panel, Person } from '@/pages/shared/ProPage';
import shared from '@/pages/shared/ProPage.module.scss';
import { useTaskEditor } from '@/pages/shared/use-task-editor';
import { taskPriorityIntent, taskStatusIntent } from '@/pages/tasks/task-presentation';

import styles from './DetailPage.module.scss';

export function DetailPage({
  state,
  dispatch,
}: {
  state: TaskState;
  dispatch: Dispatch<TaskAction>;
}) {
  const [params, setParams] = useSearchParams();
  const project = projects.find((item) => item.id === (params.get('project') ?? 'workspace'));
  const editor = useTaskEditor(state, dispatch, (task) => task.project === project?.name);
  if (!project)
    return (
      <div className={shared.page}>
        <Empty size="md">
          <Empty.Title>Project not found</Empty.Title>
          <Empty.Description>
            Choose a project from the portfolio to view its record.
          </Empty.Description>
          <Empty.Action>
            <Link className={shared.link} to="/work/projects">
              Back to projects →
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
              {project.health}
            </Tag>
            <span className={shared.mono}>OCTOBER CYCLE</span>
            <span className={shared.caption}>Task snapshot · {taskReferenceDate}</span>
          </div>
          <div className={styles.recordControls}>
            <div className={styles.projectPicker}>
              <FilterSelect
                label="Project record"
                value={project.id}
                onChange={(id) => setParams({ project: id })}
                options={projects.map((item) => ({ value: item.id, label: item.name }))}
              />
            </div>
            <Link className={shared.link} to="/work/projects">
              ← Project portfolio
            </Link>
          </div>
        </div>
        <MetricStrip
          className={styles.summaryMetrics!}
          items={[
            {
              label: 'Task completion',
              value: `${summary.progress}%`,
              note: `${summary.completed} of ${summary.total} tasks done`,
            },
            { label: 'Open work', value: summary.open, note: `${summary.review} awaiting review` },
            { label: 'Estimated effort', value: `${summary.hours}h`, note: 'all linked tasks' },
            { label: 'Overdue tasks', value: summary.overdue, note: 'open work past its due date' },
          ]}
        />
      </Surface>
      <div className={shared.twoColumns}>
        <div className={shared.stack}>
          <Panel title="Project brief" description="The outcome this team is working toward">
            <div className={shared.body}>
              <span className={shared.eyebrow}>OBJECTIVE</span>
              <p className={styles.objective}>{project.objective}</p>
              <div className={styles.acceptance}>
                <h3>Release acceptance</h3>
                <ul>
                  <li>Every task has a clear owner and a documented next step.</li>
                  <li>Review requests include acceptance notes before the October checkpoint.</li>
                  <li>Open risks are handed to the project lead before release.</li>
                </ul>
              </div>
              <div className={styles.progress}>
                <div>
                  <strong>Delivery progress</strong>
                  <span>
                    {summary.completed} completed · {summary.open} remaining
                  </span>
                </div>
                <Progress size="sm" value={summary.progress} aria-label="Project task completion" />
              </div>
            </div>
          </Panel>
          <Panel
            title="Linked tasks"
            description="Live records from the shared task register"
            actions={
              <Link className={shared.link} to={projectQueryPath(project)}>
                Query all tasks →
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
                      {task.estimateHours}h estimate ·{' '}
                      {task.dueDate ? `Due ${formatDueDate(task.dueDate)}` : 'Unscheduled'}
                    </span>
                  </div>
                  <div className={styles.taskTags}>
                    <Tag size="sm" intent={taskStatusIntent[task.status]}>
                      {task.status}
                    </Tag>
                    <Tag size="sm" intent={taskPriorityIntent[task.priority]} variant="outline">
                      {task.priority}
                    </Tag>
                  </div>
                </li>
              ))}
            </ul>
            {!summary.total ? (
              <p className={shared.body}>No tasks are linked to this project.</p>
            ) : null}
            <div className={shared.footer}>
              <span role="status">
                {editor.feedback || 'Open a task to review or update its details.'}
              </span>
            </div>
          </Panel>
          <Panel title="Milestones" description="Project schedule and handoff points">
            <div className={shared.body}>
              <Timeline size="small" aria-label={`${project.name} milestone schedule`}>
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
                      {formatDueDate(milestone.date)}, 2026
                    </Timeline.Time>
                  </Timeline.Item>
                ))}
              </Timeline>
            </div>
          </Panel>
        </div>
        <div className={shared.stack}>
          <Panel title="Record information">
            <dl className={styles.metadata}>
              <div>
                <dt>Project ID</dt>
                <dd className={shared.mono}>{project.code}</dd>
              </div>
              <div>
                <dt>Project lead</dt>
                <dd>
                  <Person id={project.owner} />
                </dd>
              </div>
              <div>
                <dt>Workspace</dt>
                <dd>Virgo Studio</dd>
              </div>
              <div>
                <dt>Started</dt>
                <dd>
                  <time dateTime={project.start}>{formatDueDate(project.start)}, 2026</time>
                </dd>
              </div>
              <div>
                <dt>Target date</dt>
                <dd>
                  <time dateTime={project.due}>{formatDueDate(project.due)}, 2026</time>
                </dd>
              </div>
              <div>
                <dt>Visibility</dt>
                <dd>Team workspace</dd>
              </div>
              <div>
                <dt>Health assessment</dt>
                <dd>
                  <Tag size="sm" intent={healthIntent[project.health]}>
                    {project.health}
                  </Tag>
                </dd>
              </div>
            </dl>
          </Panel>
          <Panel title="Project team" description="Lead and task owners in this project">
            <ul className={styles.team}>
              {summary.members.map((member) => (
                <li key={member.id}>
                  <Person id={member.id} />
                  <span>
                    {member.id === project.owner
                      ? 'Lead'
                      : `${summary.tasks.filter((task) => task.assignee === member.id).length} tasks`}
                  </span>
                </li>
              ))}
            </ul>
          </Panel>
          <Panel title="Recorded activity" description="Team activity from the October 1 snapshot">
            <div className={shared.body}>
              {events.length ? (
                <Timeline size="small" aria-label="Project team activity">
                  {events.map((event) => (
                    <Timeline.Item key={event.id} status={event.status}>
                      <Timeline.Title>{event.name}</Timeline.Title>
                      <Timeline.Description>{event.action}</Timeline.Description>
                      <Timeline.Time dateTime={event.dateTime}>Oct 1 · {event.time}</Timeline.Time>
                    </Timeline.Item>
                  ))}
                </Timeline>
              ) : (
                <p className={shared.caption}>
                  No team activity recorded for this project in the October 1 snapshot.
                </p>
              )}
            </div>
          </Panel>
          <Panel title="Related focus areas">
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
