import { Progress } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import { getProjectDistribution } from '@/api/projects';
import { ResourceContent } from '@/components/feedback/resource-content';
import { useTaskDependentQuery } from '@/features/tasks';
import { businessLabel } from '@/lib/formatting/business-labels';

export function ProjectDistribution() {
  const resource = useTaskDependentQuery(getProjectDistribution);
  const { t, i18n } = useTranslation();

  return (
    <ResourceContent resource={resource}>
      {(projectDistribution) => {
        const openTasks = projectDistribution.reduce((sum, project) => sum + project.count, 0);

        return (
          <>
            <div
              className={[
                '[&_strong]:font-mono [&_strong]:text-(length:--vd-font-size-40) [&_strong]:[line-height:var(--vd-line-height-1)]',
                '[&_strong]:[font-weight:var(--vd-font-weight-500)] [&_strong]:[letter-spacing:-1px] [&_span]:text-(length:--vd-font-size-11)',
                '[&_span]:[line-height:var(--vd-line-height-4)] [&_span]:text-text-tertiary',
                'flex items-center gap-12 [margin-block-end:var(--vd-spacing-20)]',
              ].join(' ')}
            >
              <strong>{openTasks}</strong>
              <span>
                {t('workplace.openTasks')}
                <br />
                {t('workplace.across4FocusAreas', { count: projectDistribution.length })}
              </span>
            </div>
            <div
              className="[border-radius:var(--vd-shape-radius-4,_var(--vd-radius-4))] flex [gap:3px] [height:var(--vd-spacing-8)] overflow-hidden [margin-block-end:var(--vd-spacing-24)]"
              aria-hidden="true"
            >
              {projectDistribution.map((project) => (
                <span
                  key={project.name}
                  style={{
                    flexGrow: project.count,
                    background: `var(--vd-data-categorical-${project.color})`,
                  }}
                />
              ))}
            </div>
            <div className="grid gap-16">
              {projectDistribution.map((project) => (
                <div key={project.name}>
                  <div
                    className={[
                      '[&_span]:flex [&_span]:gap-8 [&_span]:items-center [&_i]:[width:6px] [&_i]:[height:6px]',
                      '[&_i]:[border-radius:var(--vd-shape-radius-4,_var(--vd-radius-4))] [&_strong]:font-mono',
                      '[&_strong]:[font-weight:var(--vd-font-weight-500)]',
                      'flex justify-between items-center gap-8 [margin-block-end:var(--vd-spacing-8)] [font-size:var(--vd-font-size-12)]',
                    ].join(' ')}
                  >
                    <span>
                      <i style={{ background: `var(--vd-data-categorical-${project.color})` }} />
                      {businessLabel(project.name, i18n.language)}
                    </span>
                    <strong>{project.count}</strong>
                  </div>
                  <Progress
                    size="md"
                    value={project.count}
                    max={openTasks}
                    aria-label={t('workplace.valueValueOfValueOpenTasks', {
                      v0: businessLabel(project.name, i18n.language),
                      v1: project.count,
                      v2: openTasks,
                    })}
                    className={[
                      'data-[series=1]:[--progress-indicator:var(--vd-data-categorical-1)] data-[series=2]:[--progress-indicator:var(--vd-data-categorical-2)]',
                      'data-[series=3]:[--progress-indicator:var(--vd-data-categorical-3)] data-[series=4]:[--progress-indicator:var(--vd-data-categorical-4)]',
                    ].join(' ')}
                    data-series={project.color}
                  />
                  <span className="block [margin-block-start:var(--vd-spacing-4)] text-text-tertiary [font-size:var(--vd-font-size-10)]">
                    {t('workplace.valueOfOpenTasks', { v0: project.share })}
                  </span>
                </div>
              ))}
            </div>
          </>
        );
      }}
    </ResourceContent>
  );
}
