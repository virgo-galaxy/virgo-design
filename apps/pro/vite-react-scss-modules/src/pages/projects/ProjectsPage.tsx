import { SearchIcon } from '@virgo-design/icons';
import { Button, Collapsible, Input, Progress, Surface, Tag } from '@virgo-design/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

import { type Project, projectDetailPath, projects, projectSummary } from '@/data/projects';
import type { TaskState } from '@/data/tasks';
import { taskAssignees } from '@/data/tasks.seed';
import { formatDueDate } from '@/data/workplace';
import { getProjectHealthLabel } from '@/pages/projects/project-presentation';
import { FilterSelect, MetricStrip, NoResults, Panel, Person } from '@/pages/shared/ProPage';
import shared from '@/pages/shared/ProPage.module.scss';
import { getTaskStatusLabel } from '@/pages/tasks/task-presentation';
import { taskStatusIntent } from '@/pages/tasks/task-presentation';

import { healthIntent } from './project-presentation';
import styles from './ProjectsPage.module.scss';

function ProjectCard({ project, state }: { project: Project; state: TaskState }) {
  const { t, i18n } = useTranslation();
  const summary = projectSummary(project, state.tasks);
  return (
    <Surface border="subtle" radius={8} className={styles.projectCard}>
      <div className={styles.cardHeading}>
        <span className={styles.projectCode}>
          <i style={{ background: `var(--vd-data-categorical-${project.color})` }} />
          {project.code}
        </span>
        <Tag size="sm" intent={healthIntent[project.health]}>
          {getProjectHealthLabel(t, project.health)}
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
        <span className={shared.caption}>{t('projects.projectLead')}</span>
      </div>
      <div className={styles.progressLabel}>
        <span>{t('projects.taskCompletion')}</span>
        <strong>{summary.progress}%</strong>
      </div>
      <Progress
        value={summary.progress}
        size="sm"
        aria-label={t('projects.valueTaskCompletion', { v0: project.name })}
      />
      <dl className={styles.projectStats}>
        <div>
          <dt>{t('projects.tasks')}</dt>
          <dd>
            {summary.completed}
            <span>{t('projects.valueDone', { v0: summary.total })}</span>
          </dd>
        </div>
        <div>
          <dt>{t('projects.estimate')}</dt>
          <dd>
            {summary.hours}
            <span>{t('projects.h')}</span>
          </dd>
        </div>
        <div>
          <dt>{t('projects.review')}</dt>
          <dd>{summary.review}</dd>
        </div>
      </dl>
      <div className={styles.schedule}>
        <span>
          {formatDueDate(project.start, i18n.language)} —{' '}
          {formatDueDate(project.due, i18n.language)}
        </span>
        <span>
          {summary.overdue
            ? t('projects.overdueCount', { count: summary.overdue })
            : t('projects.openTaskCount', { count: summary.open })}
        </span>
      </div>
      <Collapsible className={styles.expansion}>
        <Collapsible.Trigger className={styles.expandTrigger}>
          {t('projects.relatedWorkValueTasks', { v0: summary.total })}
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
                  {getTaskStatusLabel(t, task.status)}
                </Tag>
              </li>
            ))}
          </ul>
          <Link className={shared.link} to={projectDetailPath(project)}>
            {t('projects.openProjectDetails')}
          </Link>
        </Collapsible.Content>
      </Collapsible>
    </Surface>
  );
}

export function ProjectsPage({ state }: { state: TaskState }) {
  const { t } = useTranslation();
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
      <h1 className={shared.srOnly}>{t('app.projects')}</h1>
      <MetricStrip
        items={[
          {
            label: t('projects.focusAreas'),
            value: projects.length,
            note: t('projects.sharedWithTheTaskRegister'),
          },
          {
            label: t('projects.openTasks'),
            value: summaries.reduce((sum, item) => sum + item.open, 0),
            note: t('projects.acrossAllProjects'),
          },
          {
            label: t('projects.awaitingReview'),
            value: summaries.reduce((sum, item) => sum + item.review, 0),
            note: t('projects.readyForAcceptance'),
          },
          {
            label: t('projects.atRisk'),
            value: projects.filter((project) => project.health === 'At risk').length,
            note: t('projects.projectLeadAssessment'),
          },
        ]}
      />
      <Panel
        title={t('projects.activePortfolio')}
        description={t('projects.fourFocusAreasOneSharedDeliveryPlan')}
        actions={
          <Link className={shared.link} to="/work/tasks">
            {t('projects.openTaskQueue')}
          </Link>
        }
      >
        <div className={shared.toolbar}>
          <Input
            size="small"
            aria-label={t('projects.searchProjects')}
            placeholder={t('projects.searchProjectsLeadsOrIds')}
            prefix={<SearchIcon />}
            value={search}
            clearable
            rootClassName={shared.search!}
            onChange={(event) => setSearch(event.target.value)}
          />
          <span className={shared.count} aria-live="polite">
            {t('projects.valueProjectsMatch', { v0: visible.length })}
          </span>
          <Button
            size="small"
            variant="text"
            disabled={!search && health === 'all' && owner === 'all'}
            onClick={reset}
          >
            {t('projects.resetFilters')}
          </Button>
        </div>
        <div className={styles.filters}>
          <FilterSelect
            label={t('projects.projectHealth')}
            value={health}
            onChange={setHealth}
            options={[
              { value: 'all', label: t('projects.allHealthStates') },
              ...(['On track', 'At risk', 'Planning'] as const).map((value) => ({
                value,
                label: getProjectHealthLabel(t, value),
              })),
            ]}
          />
          <FilterSelect
            label={t('projects.projectLead')}
            value={owner}
            onChange={setOwner}
            options={[
              { value: 'all', label: t('projects.allLeads') },
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
          <NoResults title={t('projects.noProjectsMatchYourFilters')} onReset={reset} />
        )}
        <div className={shared.footer}>
          <span>{t('projects.completionIsCalculatedFromSavedTaskStatusHealthIs')}</span>
          <Tag size="sm" variant="outline">
            {t('projects.octoberCycle')}
          </Tag>
        </div>
      </Panel>
    </div>
  );
}
