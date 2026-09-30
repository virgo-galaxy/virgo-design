import { SegmentedControl } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './SegmentedContentExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  return (
    <div className={styles.root!}>
      <SegmentedControl
        defaultValue="code"
        aria-label={t('examples.segmentedControl.copy.viewMode')}
      >
        <SegmentedControl.Item value="code">
          {t('examples.segmentedControl.copy.code')}
        </SegmentedControl.Item>
        <SegmentedControl.Item value="preview">
          {t('examples.segmentedControl.copy.preview')}
        </SegmentedControl.Item>
      </SegmentedControl>
      <SegmentedControl defaultValue="week" aria-label={t('examples.segmentedControl.copy.period')}>
        <SegmentedControl.Item value="day">
          {t('examples.segmentedControl.copy.day')}
        </SegmentedControl.Item>
        <SegmentedControl.Item value="week">
          {t('examples.segmentedControl.copy.week')}
        </SegmentedControl.Item>
        <SegmentedControl.Item value="month">
          {t('examples.segmentedControl.copy.month')}
        </SegmentedControl.Item>
      </SegmentedControl>
    </div>
  );
}
