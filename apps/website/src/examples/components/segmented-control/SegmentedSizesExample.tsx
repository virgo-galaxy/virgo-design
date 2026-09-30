import { SegmentedControl } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import { translateExampleText } from '@/i18n/translate-example-text';

import styles from './SegmentedSizesExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  return (
    <div className={styles.root!}>
      {(['mini', 'small', 'medium', 'large'] as const).map((size) => (
        <SegmentedControl
          key={size}
          size={size}
          variant="solid"
          defaultValue="light"
          aria-label={t('examples.segmentedControl.details.valueTheme', {
            v0: translateExampleText(t, 'segmentedControl', String(size)),
          })}
        >
          <SegmentedControl.Item value="light">
            {t('examples.segmentedControl.copy.light')}
          </SegmentedControl.Item>
          <SegmentedControl.Item value="dark">
            {t('examples.segmentedControl.copy.dark')}
          </SegmentedControl.Item>
        </SegmentedControl>
      ))}
    </div>
  );
}
