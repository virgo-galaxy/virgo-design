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
          defaultValue="option-b"
          aria-label={t('examples.segmentedControl.details.valueOptions', {
            v0: translateExampleText(t, 'segmentedControl', String(variant)),
          })}
        >
          <SegmentedControl.Item value="option-a">
            {t('examples.segmentedControl.copy.optionA')}
          </SegmentedControl.Item>
          <SegmentedControl.Item value="option-b">
            {t('examples.segmentedControl.copy.optionB')}
          </SegmentedControl.Item>
          <SegmentedControl.Item value="option-c">
            {t('examples.segmentedControl.copy.optionC')}
          </SegmentedControl.Item>
        </SegmentedControl>
      ))}
    </div>
  );
}
