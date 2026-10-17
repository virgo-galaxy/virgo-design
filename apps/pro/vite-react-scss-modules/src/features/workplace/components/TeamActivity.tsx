import { Tag, Timeline } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import { getActivity } from '@/api/analytics';
import type { ActivityDto } from '@/api/analytics/types';
import { ResourceContent } from '@/components/resource-content/ResourceContent';
import { CatalogBoundary, projectName, useTaskCatalog } from '@/features/catalog';
import { useTaskDependentQuery } from '@/features/tasks';
import { businessLabel } from '@/lib/demo/labels';

import styles from '../styles/workplace.module.scss';

function TeamActivityView({ activity }: { activity: ActivityDto[] }) {
  const { projects } = useTaskCatalog();
  const { t, i18n } = useTranslation();

  return (
    <>
      <Tag size="md" variant="outline" className={styles.activityDate}>
        {t('workplace.today')}
      </Tag>
      <Timeline size="medium" aria-label={t('workplace.recentTeamActivity')}>
        {activity.map((event) => (
          <Timeline.Item key={event.id} status={event.status}>
            <Timeline.Title className={styles.activityTitle}>
              {businessLabel(event.name, i18n.language)}
            </Timeline.Title>
            <Timeline.Description className={styles.activityDescription}>
              {event.taskTitle && event.action
                ? t(`workplace.activityActions.${event.action}`, {
                    title: businessLabel(event.taskTitle, i18n.language),
                  })
                : t('workplace.activityUpdated')}
            </Timeline.Description>
            <Timeline.Time dateTime={event.dateTime} className={styles.activityTime}>
              {event.time} · {businessLabel(projectName(event.project, projects), i18n.language)}
            </Timeline.Time>
          </Timeline.Item>
        ))}
      </Timeline>
    </>
  );
}

export function TeamActivity() {
  const resource = useTaskDependentQuery(getActivity);

  return (
    <ResourceContent resource={resource}>
      {(activity) => (
        <CatalogBoundary>
          <TeamActivityView activity={activity} />
        </CatalogBoundary>
      )}
    </ResourceContent>
  );
}
