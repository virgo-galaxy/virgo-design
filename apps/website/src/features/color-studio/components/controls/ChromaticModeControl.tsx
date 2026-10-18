import { SegmentedControl } from '@virgo-design/ui';
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
    <section className={styles.controlGroup!}>
      <span className={styles.controlLabel!}>
        {t('foundations.colorStudio.settings.paletteMode')}
      </span>

      <SegmentedControl
        className={styles.segmented!}
        value={value}
        onValueChange={(next) => onChange(next as ChromaticMode)}
        aria-label={t('foundations.colorStudio.settings.paletteMode')}
      >
        {modes.map((mode) => (
          <SegmentedControl.Item
            key={mode}
            value={mode}
            className={value === mode ? styles.segmentedActive! : ''}
          >
            {t(chromaticModeTranslationKeys[mode].label)}
          </SegmentedControl.Item>
        ))}
      </SegmentedControl>

      <p className={styles.controlHint!}>{t(chromaticModeTranslationKeys[value].description)}</p>
    </section>
  );
}
