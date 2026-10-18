import { Timeline } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import { Panel } from '@/components/display/panel';
import { ResourceContent } from '@/components/feedback/resource-content';
import { businessLabel } from '@/lib/formatting/business-labels';

import type { useProjectResources } from '../../hooks/use-project-resources';

import shared from '@/styles/product-layout.module.scss';

export function ProjectActivityPanel({
  resource,
}: {
  resource: ReturnType<typeof useProjectResources>['activity'];
}) {
  const { t, i18n } = useTranslation();
  const dateFormatter = new Intl.DateTimeFormat(i18n.language, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <Panel
      title={t('projectDetails.recordedActivity')}
      description={t('projects.recentProjectActivity')}
    >
      <ResourceContent resource={resource}>
        {(events) => (
          <div className={shared.body}>
            {events.length ? (
              <Timeline size="medium" aria-label={t('projectDetails.projectTeamActivity')}>
                {events.map((event) => (
                  <Timeline.Item key={event.id} status={event.status}>
                    <Timeline.Title>{businessLabel(event.name, i18n.language)}</Timeline.Title>
                    <Timeline.Description>
                      {event.taskTitle && event.action
                        ? t(`workplace.activityActions.${event.action}`, {
                            title: businessLabel(event.taskTitle, i18n.language),
                          })
                        : t('workplace.activityUpdated')}
                    </Timeline.Description>
                    <Timeline.Time dateTime={event.dateTime}>
                      {dateFormatter.format(new Date(event.dateTime))}
                    </Timeline.Time>
                  </Timeline.Item>
                ))}
              </Timeline>
            ) : (
              <p className={shared.caption}>
                {t('projectDetails.noTeamActivityRecordedForThisProjectInThe')}
              </p>
            )}
          </div>
        )}
      </ResourceContent>
    </Panel>
  );
}
