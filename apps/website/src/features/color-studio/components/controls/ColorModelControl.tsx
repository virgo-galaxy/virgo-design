import type { ColorModel } from '@virgo-design/colors';
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
    <section className={`${styles.controlGroup} ${disabled ? styles.controlDisabled : ''}`}>
      <div className={styles.controlLabelRow}>
        <span className={styles.controlLabel}>{t('settings.colorModel')}</span>
        <span className={styles.recommended}>{t('settings.recommended')}</span>
      </div>

      <div className={styles.segmented}>
        {models.map((model) => (
          <button
            key={model.id}
            className={value === model.id ? styles.segmentedActive : ''}
            type="button"
            disabled={disabled}
            onClick={() => onChange(model.id)}
          >
            {model.label}
          </button>
        ))}
      </div>
    </section>
  );
}
