import { Timeline } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './TimelineBasicExample.module.scss';
export default function App() {
  const { t } = useTranslation();
  return (
    <div className={styles.root}>
      <Timeline>
        <Timeline.Item status="complete">
          <Timeline.Time dateTime="2026-10-01T09:00">09:00</Timeline.Time>
          <Timeline.Title>{t('examples.timeline.copy.created')}</Timeline.Title>
          <Timeline.Description>{t('examples.timeline.copy.createdHint')}</Timeline.Description>
        </Timeline.Item>
        <Timeline.Item status="active" aria-current="true">
          <Timeline.Time dateTime="2026-10-01T10:30">10:30</Timeline.Time>
          <Timeline.Title>{t('examples.timeline.copy.review')}</Timeline.Title>
          <Timeline.Description>{t('examples.timeline.copy.reviewHint')}</Timeline.Description>
        </Timeline.Item>
        <Timeline.Item>
          <Timeline.Time dateTime="2026-10-01T14:00">14:00</Timeline.Time>
          <Timeline.Title>{t('examples.timeline.copy.release')}</Timeline.Title>
        </Timeline.Item>
      </Timeline>
    </div>
  );
}
