import { ColorPicker } from '@virgo-design/ui';
import { useId } from 'react';
import { useTranslation } from 'react-i18next';

import { ColorPickerPopover } from './ColorPickerPopover';

import styles from '../../styles/color-studio.module.scss';

interface HexColorFieldProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  compact?: boolean;
  disabled?: boolean;
}
export function HexColorField({
  label,
  value,
  onChange,
  compact = false,
  disabled = false,
}: HexColorFieldProps) {
  const { t } = useTranslation();
  const inputId = useId();
  return (
    <ColorPicker
      value={value}
      onValueChange={(next) => onChange(next.toUpperCase())}
      disabled={disabled}
      className={`${styles.hexField} ${compact ? styles.hexFieldCompact : ''} ${disabled ? styles.hexFieldDisabled : ''}`}
    >
      {label ? (
        <label className={styles.controlLabel} htmlFor={inputId}>
          {label}
        </label>
      ) : null}
      <div className={styles.hexFieldBody}>
        <ColorPicker.Trigger
          className={styles.colorSwatchButton}
          aria-label={t('foundations.colorStudio.picker.open')}
        >
          <ColorPicker.Preview className={styles.colorSwatch} />
        </ColorPicker.Trigger>
        <ColorPicker.HexField
          id={inputId}
          aria-label={label ? undefined : t('foundations.colorStudio.picker.hex')}
          className={styles.hexInput}
          letterCase="upper"
        />
        <ColorPickerPopover />
      </div>
    </ColorPicker>
  );
}
