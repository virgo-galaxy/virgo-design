import { CheckIcon } from '@virgo-design/icons';
import { Timeline } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './TimelineIndicatorsExample.module.scss';
export default function App() {
  const { t } = useTranslation();
  return (
    <div className={styles.root}>
      <Timeline size="small">
        <Timeline.Item status="complete">
          <Timeline.Indicator>
            <CheckIcon size={16} />
          </Timeline.Indicator>
          <Timeline.Title>{t('examples.timeline.copy.created')}</Timeline.Title>
        </Timeline.Item>
        <Timeline.Item status="active">
          <Timeline.Title>{t('examples.timeline.copy.review')}</Timeline.Title>
        </Timeline.Item>
        <Timeline.Item>
          <Timeline.Title>{t('examples.timeline.copy.release')}</Timeline.Title>
        </Timeline.Item>
      </Timeline>
    </div>
  );
}
