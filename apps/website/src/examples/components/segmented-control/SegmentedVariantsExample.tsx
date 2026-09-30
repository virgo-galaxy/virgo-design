import { SegmentedControl } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import { translateExampleText } from '@/i18n/translate-example-text';

import styles from './SegmentedVariantsExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  return (
    <div className={styles.root!}>
      {(['outline', 'solid', 'soft'] as const).map((variant) => (
        <SegmentedControl
          key={variant}
          variant={variant}
          defaultValue="pear"
          aria-label={t('examples.segmentedControl.details.valueFruit', {
            v0: translateExampleText(t, 'segmentedControl', String(variant)),
          })}
        >
          <SegmentedControl.Item value="apple">
            {t('examples.segmentedControl.copy.apple')}
          </SegmentedControl.Item>
          <SegmentedControl.Item value="pear">
            {t('examples.segmentedControl.copy.pear')}
          </SegmentedControl.Item>
          <SegmentedControl.Item value="orange">
            {t('examples.segmentedControl.copy.orange')}
          </SegmentedControl.Item>
        </SegmentedControl>
      ))}
    </div>
  );
}
