import { useTranslation } from 'react-i18next';

import type { ChromaticMode } from '../../model/types';
import styles from '../../styles/color-studio.module.scss';

interface ChromaticModeControlProps {
  value: ChromaticMode;
  onChange: (value: ChromaticMode) => void;
}

const modes: readonly ChromaticMode[] = ['official', 'linked', 'custom'];

export function ChromaticModeControl({ value, onChange }: ChromaticModeControlProps) {
  const { t } = useTranslation();

  return (
    <section className={styles.controlGroup}>
      <span className={styles.controlLabel}>{t('settings.paletteMode')}</span>

      <div className={styles.segmented}>
        {modes.map((mode) => (
          <button
            key={mode}
            className={value === mode ? styles.segmentedActive : ''}
            type="button"
            onClick={() => onChange(mode)}
          >
            {t(`settings.mode${mode.charAt(0).toUpperCase()}${mode.slice(1)}`)}
          </button>
        ))}
      </div>

      <p className={styles.controlHint}>
        {t(`settings.mode${value.charAt(0).toUpperCase()}${value.slice(1)}Description`)}
      </p>
    </section>
  );
}
