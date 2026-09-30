import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from '../../styles/color-studio.module.scss';
import { ColorPickerPopover } from './ColorPickerPopover';

interface HexColorFieldProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  compact?: boolean;
  disabled?: boolean;
}

const HEX_PATTERN = /^#[0-9a-fA-F]{6}$/;

export function HexColorField({
  label,
  value,
  onChange,
  compact = false,
  disabled = false,
}: HexColorFieldProps) {
  const { t } = useTranslation();
  const [draft, setDraft] = useState(value);
  const [pickerOpen, setPickerOpen] = useState(false);

  const swatchRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setDraft(value);
  }, [value]);

  useEffect(() => {
    if (disabled) {
      setPickerOpen(false);
    }
  }, [disabled]);

  const commit = () => {
    if (disabled) {
      setDraft(value);
      return;
    }

    if (HEX_PATTERN.test(draft)) {
      onChange(draft.toUpperCase());
      return;
    }

    setDraft(value);
  };

  return (
    <label
      className={`${styles.hexField} ${compact ? styles.hexFieldCompact : ''} ${
        disabled ? styles.hexFieldDisabled : ''
      }`}
    >
      {label ? <span className={styles.controlLabel}>{label}</span> : null}

      <div className={styles.hexFieldBody}>
        <button
          ref={swatchRef}
          className={styles.colorSwatchButton}
          type="button"
          aria-label={t('foundations.colorStudio.picker.open')}
          aria-expanded={pickerOpen}
          disabled={disabled}
          onClick={() => setPickerOpen((current) => !current)}
        >
          <span className={styles.colorSwatch} style={{ backgroundColor: value }} />
        </button>

        <input
          className={styles.hexInput}
          value={draft}
          spellCheck={false}
          disabled={disabled}
          onChange={(event) => setDraft(event.target.value)}
          onBlur={commit}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.currentTarget.blur();
            }
          }}
        />

        {pickerOpen && !disabled ? (
          <ColorPickerPopover
            value={value}
            anchorRef={swatchRef}
            onChange={onChange}
            onClose={() => setPickerOpen(false)}
          />
        ) : null}
      </div>
    </label>
  );
}
