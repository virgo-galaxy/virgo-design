import { Progress } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import { getProjectDistribution } from '@/api/projects';
import { ResourceContent } from '@/components/resource-content/ResourceContent';
import { useTaskDependentQuery } from '@/features/tasks';
import { businessLabel } from '@/lib/demo/labels';

import styles from '../styles/workplace.module.scss';

export function ProjectDistribution() {
  const resource = useTaskDependentQuery(getProjectDistribution);
  const { t, i18n } = useTranslation();

  return (
    <ResourceContent resource={resource}>
      {(projectDistribution) => {
        const openTasks = projectDistribution.reduce((sum, project) => sum + project.count, 0);

        return (
          <>
            <div className={styles.distributionSummary}>
              <strong>{openTasks}</strong>
              <span>
                {t('workplace.openTasks')}
                <br />
                {t('workplace.across4FocusAreas', { count: projectDistribution.length })}
              </span>
            </div>
            <div className={styles.distributionBar} aria-hidden="true">
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
            <div className={styles.distributionList}>
              {projectDistribution.map((project) => (
                <div key={project.name}>
                  <div className={styles.distributionLabel}>
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
                    className={styles.distributionProgress}
                    data-series={project.color}
                  />
                  <span className={styles.distributionShare}>
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
