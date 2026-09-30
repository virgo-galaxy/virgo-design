import { SegmentedControl } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import { translateExampleText } from '@/i18n/translate-example-text';

import styles from './SegmentedMotionExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  return (
    <div className={styles.root!}>
      {(['outline', 'solid', 'soft'] as const).map((variant) => (
        <div key={variant} className={styles.stage!}>
          {(['none', 'slide'] as const).map((motion) => (
            <div key={motion} className={styles.stage2!}>
              <span>
                {variant} · {motion}
              </span>
              <SegmentedControl
                variant={variant}
                motion={motion}
                defaultValue="code"
                aria-label={t('examples.segmentedControl.details.valueValueMotion', {
                  v0: translateExampleText(t, 'segmentedControl', String(variant)),
                  v1: translateExampleText(t, 'segmentedControl', String(motion)),
                })}
              >
                <SegmentedControl.Item value="code">
                  {t('examples.segmentedControl.copy.code')}
                </SegmentedControl.Item>
                <SegmentedControl.Item value="preview">
                  {t('examples.segmentedControl.copy.preview')}
                </SegmentedControl.Item>
              </SegmentedControl>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
