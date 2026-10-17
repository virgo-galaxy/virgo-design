import { Timeline } from '@virgo-design/primitives';
import { useTranslation } from 'react-i18next';

export function TimelineExample() {
  const { t } = useTranslation();

  return (
    <Timeline data-docs-primitive="timeline">
      <Timeline.Item>
        <Timeline.Time dateTime="2026-10-01">2026-10-01</Timeline.Time>
        <Timeline.Title>{t('examples.timeline.copy.created')}</Timeline.Title>
      </Timeline.Item>
      <Timeline.Item>
        <Timeline.Title>{t('examples.timeline.copy.review')}</Timeline.Title>
      </Timeline.Item>
    </Timeline>
  );
}
