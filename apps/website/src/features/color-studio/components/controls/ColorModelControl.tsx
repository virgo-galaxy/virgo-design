import type { ColorModel } from '@virgo-design/colors';
import { SegmentedControl } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from '../../styles/color-studio.module.scss';

interface ColorModelControlProps {
  value: ColorModel;
  disabled?: boolean;
  onChange: (value: ColorModel) => void;
}

const models: Array<{ id: ColorModel; label: string }> = [
  { id: 'oklch', label: 'OKLCH' },
  { id: 'hsl', label: 'HSL' },
  { id: 'hsv', label: 'HSV' },
];

export function ColorModelControl({ value, disabled = false, onChange }: ColorModelControlProps) {
  const { t } = useTranslation();

  return (
    <section className={`${styles.controlGroup!} ${disabled ? styles.controlDisabled! : ''}`}>
      <div className={styles.controlLabelRow!}>
        <span className={styles.controlLabel!}>
          {t('foundations.colorStudio.settings.colorModel')}
        </span>
        <span className={styles.recommended!}>
          {t('foundations.colorStudio.settings.recommended')}
        </span>
      </div>

      <SegmentedControl
        className={styles.segmented!}
        value={value}
        onValueChange={(next) => onChange(next as ColorModel)}
        aria-label={t('foundations.colorStudio.settings.colorModel')}
        disabled={disabled}
      >
        {models.map((model) => (
          <SegmentedControl.Item
            key={model.id}
            value={model.id}
            className={value === model.id ? styles.segmentedActive! : ''}
          >
            {model.label}
          </SegmentedControl.Item>
        ))}
      </SegmentedControl>
    </section>
  );
}
