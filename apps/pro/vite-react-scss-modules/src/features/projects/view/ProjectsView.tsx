import { SearchIcon } from '@virgo-design/icons';
import { Button, Input, Progress, Surface, Tag } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';
import { Link, useSearchParams } from 'react-router';

import { getProjectSummaries } from '@/api/projects';
import type { ProjectSummaryDto } from '@/api/projects/types';
import clipboardListArtwork from '@/assets/illustrations/clipboard-list.svg';
import documentMagnifierArtwork from '@/assets/illustrations/document-magnifier.svg';
import folderTargetArtwork from '@/assets/illustrations/folder-target.svg';
import triangleAlertArtwork from '@/assets/illustrations/triangle-alert.svg';
import { MultiFilterSelect } from '@/components/multi-filter-select/MultiFilterSelect';
import { NoResults } from '@/components/no-results/NoResults';
import { Panel } from '@/components/panel/Panel';
import { RemoteState } from '@/components/remote-state/RemoteState';
import { WorkOverview } from '@/components/work-overview/WorkOverview';
import { useCurrentUser } from '@/features/auth';
import { CatalogBoundary, Person, useTaskCatalog } from '@/features/catalog';
import { useTaskDependentQuery } from '@/features/tasks';
import { canManageProject } from '@/lib/auth/permissions';
import { businessLabel } from '@/lib/demo/labels';
import { routePath, routeWithQuery } from '@/routes';
import shared from '@/styles/product-layout.module.scss';

import { filterProjects, type Project } from '../model/project';
import {
  formatProjectDate,
  healthIntent,
  projectHealthLabelNames,
} from '../presentation/project-presentation';
import { projectDetailPath, projectHandoffPath, projectTasksPath } from '../routes/navigation';
import styles from './ProjectsView.module.scss';

function ProjectCard({
  project,
  summary,
  returnTo,
}: {
  project: Project;
  summary: ProjectSummaryDto;
  returnTo: string;
}) {
  const user = useCurrentUser()!;
  const { t, i18n } = useTranslation();

  const tasksPath = projectTasksPath(project);
  const detailsPath = `${projectDetailPath(project)}?returnTo=${encodeURIComponent(returnTo)}`;

  return (
    <Surface border="subtle" radius={8} className={styles.projectCard}>
      <div className={styles.cardHeading}>
        <span className={styles.projectCode}>
          <i style={{ background: `var(--vd-data-categorical-${project.color})` }} />
          {project.code}
        </span>
        <Tag size="md" intent={healthIntent[project.health]}>
          {t(`projects.${projectHealthLabelNames[project.health]}`)}
        </Tag>
      </div>
      <h3>
        <Link className={shared.link} to={detailsPath}>
          {businessLabel(project.name, i18n.language)}
        </Link>
      </h3>
      <p>{businessLabel(project.summary, i18n.language)}</p>
      <div className={styles.owner}>
        <Person id={project.owner} />
        <span className={shared.caption}>{t('projects.projectLead')}</span>
      </div>
      <div className={styles.progressLabel}>
        <span>
          {t(user.role === 'member' ? 'projects.yourCompletion' : 'projects.taskCompletion')}
        </span>
        <strong>{summary.progress}%</strong>
      </div>
      <Progress
        value={summary.progress}
        size="md"
        aria-label={t('projects.valueTaskCompletion', {
          v0: businessLabel(project.name, i18n.language),
        })}
      />
      <p className={styles.completion}>
        {t('projects.completedOfTotal', { completed: summary.completed, total: summary.total })}
      </p>
      <dl className={styles.projectStats}>
        {[
          {
            label: t('projects.openTasks'),
            value: summary.open,
            query: '&status=backlog&status=todo&status=in_progress&status=in_review',
          },
          { label: t('projects.review'), value: summary.review, query: '&status=in_review' },
          { label: t('projects.overdue'), value: summary.overdue, query: '&due=overdue' },
        ].map((metric) => (
          <div key={metric.label}>
            <dt>{metric.label}</dt>
            <dd>
              <Link
                className={shared.link}
                to={tasksPath + metric.query}
                aria-label={`${metric.label} · ${businessLabel(project.name, i18n.language)} · ${metric.value}`}
              >
                {metric.value}
              </Link>
            </dd>
          </div>
        ))}
      </dl>
      <div className={styles.schedule}>
        <span>
          {formatProjectDate(project.start, i18n.language)} —{' '}
          {formatProjectDate(project.due, i18n.language)}
        </span>
        <span>{t('projects.moduleCount', { count: project.modules.length })}</span>
      </div>
      <div className={styles.cardActions}>
        <Link className={shared.link} to={detailsPath}>
          {t('projects.openProjectDetails')}
        </Link>
        <Link className={shared.link} to={tasksPath}>
          {t('projects.viewTasks')}
        </Link>
        {canManageProject(user, project.id) ? (
          <Link className={shared.link} to={projectHandoffPath(project.id)}>
            {t('projects.prepareHandoff')}
          </Link>
        ) : null}
      </div>
    </Surface>
  );
}

function ProjectsContent({ summaries }: { summaries: ProjectSummaryDto[] }) {
  const { projects, metadata } = useTaskCatalog();
  const { members: taskAssignees } = metadata;
  const user = useCurrentUser()!;
  const { t, i18n } = useTranslation();
  const [params, setParams] = useSearchParams();

  const search = params.get('search') ?? '';
  const health = params.getAll('health');
  const owner = params.getAll('lead');

  const update = (key: string, values: string[]) =>
    setParams(
      (previous) => {
        const next = new URLSearchParams(previous);
        next.delete(key);

        for (const value of values.filter(Boolean)) next.append(key, value);

        return next;
      },
      { replace: true },
    );
  const reset = () => setParams({}, { replace: true });

  const visible = filterProjects(projects, taskAssignees, { search, health, leads: owner });
  const leads = taskAssignees.filter((member) =>
    projects.some((project) => project.owner === member.id),
  );
  const personal = user.role === 'member';

  return (
    <div className={shared.page}>
      <h1 className={shared.srOnly}>{t('app.projects')}</h1>
      <WorkOverview
        items={[
          {
            label: t('projects.focusAreas'),
            value: projects.length,
            note: t('projects.sharedWithTheTaskRegister'),
            artwork: folderTargetArtwork,
          },
          {
            label: t(personal ? 'projects.yourOpenTasks' : 'projects.openTasks'),
            value: summaries.reduce((sum, item) => sum + item.open, 0),
            note: t(personal ? 'projects.assignedToYou' : 'projects.acrossAllProjects'),
            artwork: clipboardListArtwork,
          },
          {
            label: t('projects.awaitingReview'),
            value: summaries.reduce((sum, item) => sum + item.review, 0),
            note: t('projects.readyForAcceptance'),
            artwork: documentMagnifierArtwork,
          },
          {
            label: t('projects.atRisk'),
            value: projects.filter((project) => project.health === 'At risk').length,
            note: t('projects.projectLeadAssessment'),
            artwork: triangleAlertArtwork,
          },
        ]}
      />
      <Panel
        title={t('projects.activePortfolio')}
        description={t(personal ? 'projects.personalScope' : 'projects.portfolioScope')}
        actions={
          <Link className={shared.link} to={routePath('tasks')}>
            {t('projects.openTaskQueue')}
          </Link>
        }
      >
        <div className={shared.toolbar}>
          <Input
            size="medium"
            aria-label={t('projects.searchProjects')}
            placeholder={t('projects.searchProjectsLeadsOrIds')}
            prefix={<SearchIcon />}
            value={search}
            clearable
            rootClassName={shared.search!}
            onChange={(event) => update('search', [event.target.value])}
          />
          <span className={shared.count} aria-live="polite">
            {t('projects.valueProjectsMatch', { v0: visible.length })}
          </span>
          <Button
            size="medium"
            variant="text"
            disabled={!search && !health.length && !owner.length}
            onClick={reset}
          >
            {t('projects.resetFilters')}
          </Button>
        </div>
        <div className={styles.filters}>
          <MultiFilterSelect
            label={t('projects.projectHealth')}
            placeholder={t('projects.allHealthStates')}
            value={health}
            onChange={(values) => update('health', values)}
            options={(['On track', 'At risk', 'Planning'] as const).map((value) => ({
              value,
              label: t(`projects.${projectHealthLabelNames[value]}`),
            }))}
          />
          <MultiFilterSelect
            label={t('projects.projectLead')}
            placeholder={t('projects.allLeads')}
            value={owner}
            onChange={(values) => update('lead', values)}
            options={leads.map((member) => ({
              value: member.id,
              label: businessLabel(member.name, i18n.language),
            }))}
          />
        </div>
        {visible.length ? (
          <div className={styles.projectGrid}>
            {visible.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                summary={summaries.find((item) => item.projectId === project.id)!}
                returnTo={routeWithQuery(routePath('projects'), params)}
              />
            ))}
          </div>
        ) : (
          <NoResults title={t('projects.noProjectsMatchYourFilters')} onReset={reset} />
        )}
        <div className={shared.footer}>
          <span>{t('projects.completionIsCalculatedFromSavedTaskStatusHealthIs')}</span>
          <Tag size="md" variant="outline">
            {t(personal ? 'projects.yourWork' : 'projects.sharedRegister')}
          </Tag>
        </div>
      </Panel>
    </div>
  );
}

const loadProjectSummaries = (signal: AbortSignal) => getProjectSummaries(undefined, signal);

function ProjectsResource() {
  const resource = useTaskDependentQuery(loadProjectSummaries);

  if (!resource.data) return <RemoteState {...resource} />;

  return (
    <>
      {resource.error ? <RemoteState error={resource.error} retry={resource.retry} /> : null}
      <ProjectsContent summaries={resource.data} />
    </>
  );
}

export function ProjectsView() {
  return (
    <CatalogBoundary>
      <ProjectsResource />
    </CatalogBoundary>
  );
}
