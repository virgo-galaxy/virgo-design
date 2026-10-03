import { SearchIcon } from '@virgo-design/icons';
import { Button, Collapsible, Input, Progress, Surface, Tag } from '@virgo-design/ui';
import { useState } from 'react';
import { Link } from 'react-router';

import { type Project, projectDetailPath, projects, projectSummary } from '@/data/projects';
import type { TaskState } from '@/data/tasks';
import { taskAssignees } from '@/data/tasks.seed';
import { formatDueDate } from '@/data/workplace';
import { FilterSelect, MetricStrip, NoResults, Panel, Person } from '@/pages/shared/ProPage';
import shared from '@/pages/shared/ProPage.module.scss';
import { taskStatusIntent } from '@/pages/tasks/task-presentation';

import { healthIntent } from './project-presentation';
import styles from './ProjectsPage.module.scss';

function ProjectCard({ project, state }: { project: Project; state: TaskState }) {
  const summary = projectSummary(project, state.tasks);
  return (
    <Surface border="subtle" radius={8} className={styles.projectCard}>
      <div className={styles.cardHeading}>
        <span className={styles.projectCode}>
          <i style={{ background: `var(--vd-data-categorical-${project.color})` }} />
          {project.code}
        </span>
        <Tag size="sm" intent={healthIntent[project.health]}>
          {project.health}
        </Tag>
      </div>
      <h3>
        <Link className={shared.link} to={projectDetailPath(project)}>
          {project.name}
        </Link>
      </h3>
      <p>{project.summary}</p>
      <div className={styles.owner}>
        <Person id={project.owner} />
        <span className={shared.caption}>Project lead</span>
      </div>
      <div className={styles.progressLabel}>
        <span>Task completion</span>
        <strong>{summary.progress}%</strong>
      </div>
      <Progress value={summary.progress} size="sm" aria-label={`${project.name} task completion`} />
      <dl className={styles.projectStats}>
        <div>
          <dt>Tasks</dt>
          <dd>
            {summary.completed}
            <span> / {summary.total} done</span>
          </dd>
        </div>
        <div>
          <dt>Estimate</dt>
          <dd>
            {summary.hours}
            <span>h</span>
          </dd>
        </div>
        <div>
          <dt>Review</dt>
          <dd>{summary.review}</dd>
        </div>
      </dl>
      <div className={styles.schedule}>
        <span>
          {formatDueDate(project.start)} — {formatDueDate(project.due)}
        </span>
        <span>{summary.overdue ? `${summary.overdue} overdue` : `${summary.open} open tasks`}</span>
      </div>
      <Collapsible className={styles.expansion}>
        <Collapsible.Trigger className={styles.expandTrigger}>
          Related work · {summary.total} tasks
        </Collapsible.Trigger>
        <Collapsible.Content>
          <ul className={styles.relatedList}>
            {summary.tasks.map((task) => (
              <li key={task.id}>
                <span>
                  <span className={shared.mono}>{task.id}</span>
                  {task.title}
                </span>
                <Tag size="sm" intent={taskStatusIntent[task.status]}>
                  {task.status}
                </Tag>
              </li>
            ))}
          </ul>
          <Link className={shared.link} to={projectDetailPath(project)}>
            Open project details →
          </Link>
        </Collapsible.Content>
      </Collapsible>
    </Surface>
  );
}

export function ProjectsPage({ state }: { state: TaskState }) {
  const [search, setSearch] = useState('');
  const [health, setHealth] = useState('all');
  const [owner, setOwner] = useState('all');
  const reset = () => {
    setSearch('');
    setHealth('all');
    setOwner('all');
  };
  const query = search.trim().toLowerCase();
  const visible = projects.filter(
    (project) =>
      (health === 'all' || project.health === health) &&
      (owner === 'all' || project.owner === owner) &&
      [
        project.name,
        project.code,
        project.summary,
        taskAssignees.find((member) => member.id === project.owner)?.name,
      ]
        .join(' ')
        .toLowerCase()
        .includes(query),
  );
  const summaries = projects.map((project) => projectSummary(project, state.tasks));
  return (
    <div className={shared.page}>
      <MetricStrip
        items={[
          { label: 'Focus areas', value: projects.length, note: 'shared with the task register' },
          {
            label: 'Open tasks',
            value: summaries.reduce((sum, item) => sum + item.open, 0),
            note: 'across all projects',
          },
          {
            label: 'Awaiting review',
            value: summaries.reduce((sum, item) => sum + item.review, 0),
            note: 'ready for acceptance',
          },
          {
            label: 'At risk',
            value: projects.filter((project) => project.health === 'At risk').length,
            note: 'project lead assessment',
          },
        ]}
      />
      <Panel
        title="Active portfolio"
        description="Four focus areas. One shared delivery plan."
        actions={
          <Link className={shared.link} to="/work/tasks">
            Open task queue →
          </Link>
        }
      >
        <div className={shared.toolbar}>
          <Input
            size="small"
            aria-label="Search projects"
            placeholder="Search projects, leads or IDs…"
            prefix={<SearchIcon />}
            value={search}
            clearable
            rootClassName={shared.search!}
            onChange={(event) => setSearch(event.target.value)}
          />
          <span className={shared.count} aria-live="polite">
            {visible.length} projects match
          </span>
          <Button
            size="small"
            variant="text"
            disabled={!search && health === 'all' && owner === 'all'}
            onClick={reset}
          >
            Reset filters
          </Button>
        </div>
        <div className={styles.filters}>
          <FilterSelect
            label="Project health"
            value={health}
            onChange={setHealth}
            options={[
              { value: 'all', label: 'All health states' },
              ...['On track', 'At risk', 'Planning'].map((value) => ({ value, label: value })),
            ]}
          />
          <FilterSelect
            label="Project lead"
            value={owner}
            onChange={setOwner}
            options={[
              { value: 'all', label: 'All leads' },
              ...taskAssignees.map((member) => ({ value: member.id, label: member.name })),
            ]}
          />
        </div>
        {visible.length ? (
          <div className={styles.projectGrid}>
            {visible.map((project) => (
              <ProjectCard key={project.id} project={project} state={state} />
            ))}
          </div>
        ) : (
          <NoResults title="No projects match your filters" onReset={reset} />
        )}
        <div className={shared.footer}>
          <span>
            Completion is calculated from saved task status. Health is the project lead’s
            assessment.
          </span>
          <Tag size="sm" variant="outline">
            OCTOBER CYCLE
          </Tag>
        </div>
      </Panel>
    </div>
  );
}
