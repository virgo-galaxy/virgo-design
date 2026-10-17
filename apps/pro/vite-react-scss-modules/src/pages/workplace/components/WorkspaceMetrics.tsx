import { Statistic, Surface } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import { getWorkspaceSummary } from '@/api/workspace';
import checkBadgeArtwork from '@/assets/illustrations/check-badge.svg';
import clipboardCheckArtwork from '@/assets/illustrations/clipboard-check.svg';
import folderDocumentArtwork from '@/assets/illustrations/folder-document.svg';
import usersArtwork from '@/assets/illustrations/users.svg';
import { ResourceContent } from '@/components/resource-content/ResourceContent';
import { useTaskDependentQuery } from '@/features/tasks';

import styles from '../styles/workplace.module.scss';

const metricArtwork = {
  projects: folderDocumentArtwork,
  tasks: clipboardCheckArtwork,
  members: usersArtwork,
  completion: checkBadgeArtwork,
};

const completionValue = (value: number) => `${Math.round(value)}%`;

export function WorkspaceMetrics() {
  const resource = useTaskDependentQuery(getWorkspaceSummary);
  const { t } = useTranslation();

  return (
    <ResourceContent resource={resource}>
      {(snapshot) => {
        const metrics = [
          { icon: 'projects', value: snapshot.activeProjects },
          { icon: 'tasks', value: snapshot.openTasks },
          { icon: 'members', value: snapshot.teamMembers },
          { icon: 'completion', value: snapshot.completionRate },
        ] as const;

        return (
          <Surface border="default" radius={12} className={styles.metrics}>
            {metrics.map((metric) => (
              <div key={metric.icon} className={styles.metric}>
                <img
                  className={styles.metricArtwork}
                  src={metricArtwork[metric.icon]}
                  alt=""
                  width={56}
                  height={56}
                  aria-hidden="true"
                />
                <Statistic
                  className={styles.metricContent}
                  value={metric.icon === 'completion' ? snapshot.completionRate : metric.value}
                  {...(metric.icon === 'completion' ? { formatter: completionValue } : {})}
                  animation
                  label={t(`workplace.metrics.${metric.icon}.label`)}
                  trend={t(`workplace.metrics.${metric.icon}.change`)}
                  description={t(`workplace.metrics.${metric.icon}.detail`)}
                />
              </div>
            ))}
          </Surface>
        );
      }}
    </ResourceContent>
  );
}
