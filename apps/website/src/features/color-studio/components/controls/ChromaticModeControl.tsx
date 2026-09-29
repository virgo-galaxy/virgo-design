import { useTranslation } from 'react-i18next';

import { chromaticModeTranslationKeys } from '../../color-studio-i18n';
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
      <span className={styles.controlLabel}>
        {t('foundations.colorStudio.settings.paletteMode')}
      </span>

      <div className={styles.segmented}>
        {modes.map((mode) => (
          <button
            key={mode}
            className={value === mode ? styles.segmentedActive : ''}
            type="button"
            onClick={() => onChange(mode)}
          >
            {t(chromaticModeTranslationKeys[mode].label)}
          </button>
        ))}
      </div>

      <p className={styles.controlHint}>{t(chromaticModeTranslationKeys[value].description)}</p>
    </section>
  );
}
