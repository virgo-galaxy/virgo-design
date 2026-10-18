import { Statistic, Surface } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import { getWorkspaceSummary } from '@/api/workspace';
import checkBadgeArtworkAsset from '@/assets/illustrations/check-badge.svg';
import clipboardCheckArtworkAsset from '@/assets/illustrations/clipboard-check.svg';
import folderDocumentArtworkAsset from '@/assets/illustrations/folder-document.svg';
import usersArtworkAsset from '@/assets/illustrations/users.svg';
import { ResourceContent } from '@/components/feedback/resource-content';
import { useTaskDependentQuery } from '@/features/tasks';

const checkBadgeArtwork = checkBadgeArtworkAsset.src;
const clipboardCheckArtwork = clipboardCheckArtworkAsset.src;
const folderDocumentArtwork = folderDocumentArtworkAsset.src;
const usersArtwork = usersArtworkAsset.src;

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
          <Surface
            border="default"
            radius={12}
            className="grid grid-cols-4 overflow-hidden container-max-1000:grid-cols-2 container-max-480:grid-cols-1"
          >
            {metrics.map((metric) => (
              <div
                key={metric.icon}
                className={[
                  "after:content-[''] after:absolute after:[inset-inline-end:0] after:[top:50%]",
                  'after:[width:var(--vd-stroke-width,_var(--vd-border-width-1))] after:[height:64px] after:[max-height:calc(100%_-_48px)]',
                  'after:[background:var(--vd-border-subtle)] after:[transform:translateY(-50%)] last:[border:0] [&:last-child::after]:hidden',
                  'container-max-1000:[&:nth-child(2)::after]:hidden',
                  'container-max-1000:[&:nth-child(-n_+_2)]:[border-bottom:var(--vd-stroke-width,_var(--vd-border-width-1))_solid_var(--vd-border-subtle)]',
                  'container-max-480:after:hidden',
                  'container-max-480:[&:not(:last-child)]:[border-bottom:var(--vd-stroke-width,_var(--vd-border-width-1))_solid_var(--vd-border-subtle)]',
                  'viewport-max-640:p-16 viewport-max-640:gap-12',
                  'relative flex items-center gap-24 min-w-0 [padding:var(--vd-spacing-24)_var(--vd-spacing-32)]',
                ].join(' ')}
              >
                <img
                  className="viewport-max-640:[width:40px] viewport-max-640:[height:40px] block [width:56px] [height:56px] flex-none"
                  src={metricArtwork[metric.icon]}
                  alt=""
                  width={56}
                  height={56}
                  aria-hidden="true"
                />
                <Statistic
                  className="min-w-0 wrap-anywhere"
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
