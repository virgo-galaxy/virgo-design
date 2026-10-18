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
import { MultiFilterSelect } from '@/components/controls/multi-filter-select';
import { Panel } from '@/components/display/panel';
import { WorkOverview } from '@/components/display/work-overview';
import { NoResults } from '@/components/feedback/no-results';
import { RemoteState } from '@/components/feedback/remote-state';
import { useCurrentUser } from '@/features/auth';
import { CatalogBoundary, Person, useTaskCatalog } from '@/features/catalog';
import { useTaskDependentQuery } from '@/features/tasks';
import { canManageProject } from '@/lib/auth/permissions';
import { businessLabel } from '@/lib/formatting/business-labels';
import { routePath, routeWithQuery } from '@/routes';

import { filterProjects, type Project } from '../model/project';
import {
  formatProjectDate,
  healthIntent,
  projectHealthLabelNames,
} from '../presentation/project-presentation';
import { projectDetailPath, projectHandoffPath, projectTasksPath } from '../routes/navigation';

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
    <Surface
      border="subtle"
      radius={8}
      className={[
        'p-20 flex flex-col min-w-0',
        '[transition:box-shadow_var(--vd-motion-interaction-duration,_var(--vd-duration-120))_var(--vd-motion-easing-standard,_var(--vd-easing-standard))]',
        'hover:[box-shadow:var(--vd-elevation-1)] [&:focus-within]:[box-shadow:var(--vd-elevation-1)]',
        '[&_h3]:[margin:var(--vd-spacing-16)_0_var(--vd-spacing-6)] [&_h3]:text-(length:--vd-font-size-20) [&_h3]:font-[600]',
        '[&_h3_a]:text-text-primary [&_>_p]:m-0 [&_>_p]:text-(length:--vd-font-size-12) [&_>_p]:text-text-secondary',
        'viewport-max-640:p-16',
        'motion-reduce:[transition:none]',
      ].join(' ')}
    >
      <div className="flex justify-between items-center gap-12">
        <span className="[&_i]:[width:8px] [&_i]:[height:8px] [&_i]:[border-radius:2px] flex items-center gap-8 text-text-tertiary [font:var(--vd-font-size-10)_var(--vd-font-family-mono)]">
          <i style={{ background: `var(--vd-data-categorical-${project.color})` }} />
          {project.code}
        </span>
        <Tag size="md" intent={healthIntent[project.health]}>
          {t(`projects.${projectHealthLabelNames[project.health]}`)}
        </Tag>
      </div>
      <h3>
        <Link
          className={[
            'text-brand-link no-underline',
            'hover:underline hover:[text-underline-offset:3px] focus-visible:[outline:2px_solid_var(--vd-brand-link)]',
            'focus-visible:[outline-offset:4px] focus-visible:[border-radius:2px]',
          ].join(' ')}
          to={detailsPath}
        >
          {businessLabel(project.name, i18n.language)}
        </Link>
      </h3>
      <p>{businessLabel(project.summary, i18n.language)}</p>
      <div className="viewport-max-640:[&_>_span:last-child]:hidden flex items-center justify-between [margin:var(--vd-spacing-20)_0] gap-12">
        <Person id={project.owner} />
        <span className="text-text-tertiary [font-size:var(--vd-font-size-11)]">
          {t('projects.projectLead')}
        </span>
      </div>
      <div className="[&_strong]:font-mono [&_strong]:text-text-primary flex justify-between [font-size:var(--vd-font-size-11)] mb-8 text-text-secondary">
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
      <p className="pt-8">
        {t('projects.completedOfTotal', { completed: summary.completed, total: summary.total })}
      </p>
      <dl
        className={[
          '[&_dt]:text-(length:--vd-font-size-11) [&_dt]:text-text-tertiary [&_dd]:[margin:var(--vd-spacing-4)_0_0]',
          '[&_dd]:[font:var(--vd-font-size-20)_var(--vd-font-family-mono)] [&_dd_span]:text-(length:--vd-font-size-10)',
          '[&_dd_span]:text-text-tertiary',
          'grid [grid-template-columns:repeat(3,_minmax(0,_1fr))] [margin:var(--vd-spacing-20)_0] gap-12',
        ].join(' ')}
      >
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
                className={[
                  'text-brand-link no-underline',
                  'hover:underline hover:[text-underline-offset:3px] focus-visible:[outline:2px_solid_var(--vd-brand-link)]',
                  'focus-visible:[outline-offset:4px] focus-visible:[border-radius:2px]',
                ].join(' ')}
                to={tasksPath + metric.query}
                aria-label={`${metric.label} · ${businessLabel(project.name, i18n.language)} · ${metric.value}`}
              >
                {metric.value}
              </Link>
            </dd>
          </div>
        ))}
      </dl>
      <div className="flex justify-between gap-12 [font-size:var(--vd-font-size-11)] text-text-secondary">
        <span>
          {formatProjectDate(project.start, i18n.language)} —{' '}
          {formatProjectDate(project.due, i18n.language)}
        </span>
        <span>{t('projects.moduleCount', { count: project.modules.length })}</span>
      </div>
      <div className="[border-top:1px_solid_var(--vd-border-subtle)] flex flex-wrap gap-16 pt-16 mt-16 [font-size:var(--vd-font-size-12)]">
        <Link
          className={[
            'text-brand-link no-underline',
            'hover:underline hover:[text-underline-offset:3px] focus-visible:[outline:2px_solid_var(--vd-brand-link)]',
            'focus-visible:[outline-offset:4px] focus-visible:[border-radius:2px]',
          ].join(' ')}
          to={detailsPath}
        >
          {t('projects.openProjectDetails')}
        </Link>
        <Link
          className={[
            'text-brand-link no-underline',
            'hover:underline hover:[text-underline-offset:3px] focus-visible:[outline:2px_solid_var(--vd-brand-link)]',
            'focus-visible:[outline-offset:4px] focus-visible:[border-radius:2px]',
          ].join(' ')}
          to={tasksPath}
        >
          {t('projects.viewTasks')}
        </Link>
        {canManageProject(user, project.id) ? (
          <Link
            className={[
              'text-brand-link no-underline',
              'hover:underline hover:[text-underline-offset:3px] focus-visible:[outline:2px_solid_var(--vd-brand-link)]',
              'focus-visible:[outline-offset:4px] focus-visible:[border-radius:2px]',
            ].join(' ')}
            to={projectHandoffPath(project.id)}
          >
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
    <div className="grid gap-20 min-w-0">
      <h1 className="absolute [width:1px] [height:1px] [margin:-1px] overflow-hidden [clip-path:inset(50%)] whitespace-nowrap">
        {t('app.projects')}
      </h1>
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
          <Link
            className={[
              'text-brand-link no-underline',
              'hover:underline hover:[text-underline-offset:3px] focus-visible:[outline:2px_solid_var(--vd-brand-link)]',
              'focus-visible:[outline-offset:4px] focus-visible:[border-radius:2px]',
            ].join(' ')}
            to={routePath('work.tasks')}
          >
            {t('projects.openTaskQueue')}
          </Link>
        }
      >
        <div className="viewport-max-640:p-16 flex flex-wrap items-center gap-12 [padding:var(--vd-spacing-16)_var(--vd-spacing-20)]">
          <Input
            size="medium"
            aria-label={t('projects.searchProjects')}
            placeholder={t('projects.searchProjectsLeadsOrIds')}
            prefix={<SearchIcon />}
            value={search}
            clearable
            rootClassName={'w-full [max-width:370px] viewport-max-640:[max-width:none]'}
            onChange={(event) => update('search', [event.target.value])}
          />
          <span
            className="viewport-max-640:ms-0 [margin-inline-start:auto] text-text-tertiary [font:var(--vd-font-size-11)_var(--vd-font-family-mono)]"
            aria-live="polite"
          >
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
        <div
          className={[
            'viewport-max-640:[padding:0_var(--vd-spacing-16)_var(--vd-spacing-16)] viewport-max-640:grid-cols-2 viewport-max-480:grid-cols-1',
            'grid [grid-template-columns:repeat(2,_minmax(0,_230px))] gap-16 [padding:0_var(--vd-spacing-20)_var(--vd-spacing-20)]',
          ].join(' ')}
        >
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
          <div
            className={[
              'viewport-max-760:grid-cols-1 viewport-max-640:[padding:0_var(--vd-spacing-16)_var(--vd-spacing-16)]',
              'grid [grid-template-columns:repeat(2,_minmax(0,_1fr))] gap-20 [padding:0_var(--vd-spacing-20)_var(--vd-spacing-20)] items-stretch',
            ].join(' ')}
          >
            {visible.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                summary={summaries.find((item) => item.projectId === project.id)!}
                returnTo={routeWithQuery(routePath('work.projects'), params)}
              />
            ))}
          </div>
        ) : (
          <NoResults title={t('projects.noProjectsMatchYourFilters')} onReset={reset} />
        )}
        <div
          className={[
            '[border-top:1px_solid_var(--vd-border-subtle)]',
            'viewport-max-640:p-16',
            'flex items-center justify-between gap-12 flex-wrap [padding:var(--vd-spacing-16)_var(--vd-spacing-20)]',
            '[font-size:var(--vd-font-size-11)] text-text-tertiary',
          ].join(' ')}
        >
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
