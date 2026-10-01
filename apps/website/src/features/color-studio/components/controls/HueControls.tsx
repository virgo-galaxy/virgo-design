import { Slider } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import type { ChromaticMode } from '../../model/types';
import styles from '../../styles/color-studio.module.scss';

interface HueControlsProps {
  mode: ChromaticMode;
  hueSpread: number;
  distributionCurve: number;
  onHueSpreadChange: (value: number) => void;
  onDistributionCurveChange: (value: number) => void;
}

export function HueControls({
  mode,
  hueSpread,
  distributionCurve,
  onHueSpreadChange,
  onDistributionCurveChange,
}: HueControlsProps) {
  const { t } = useTranslation();
  const disabled = mode !== 'linked';

  return (
    <section className={`${styles.controlGroup} ${disabled ? styles.controlDisabled : ''}`}>
      <div className={styles.rangeControl}>
        <div className={styles.controlLabelRow}>
          <span className={styles.controlLabel}>
            {t('foundations.colorStudio.settings.hueSpread')}
          </span>
          <code>{hueSpread.toFixed(2)}</code>
        </div>

        <Slider
          aria-label={t('foundations.colorStudio.settings.hueSpread')}
          min="0.6"
          max="1.2"
          step="0.01"
          value={hueSpread}
          disabled={disabled}
          onValueChange={onHueSpreadChange}
        />
      </div>

      <div className={styles.rangeControl}>
        <div className={styles.controlLabelRow}>
          <span className={styles.controlLabel}>
            {t('foundations.colorStudio.settings.distributionCurve')}
          </span>
          <code>{distributionCurve.toFixed(2)}</code>
        </div>

        <Slider
          aria-label={t('foundations.colorStudio.settings.distributionCurve')}
          min="0.5"
          max="2"
          step="0.01"
          value={distributionCurve}
          disabled={disabled}
          onValueChange={onDistributionCurveChange}
        />
      </div>

      {disabled ? (
        <p className={styles.independentHint}>
          {t(
            mode === 'official'
              ? 'foundations.colorStudio.settings.officialControlsHint'
              : 'foundations.colorStudio.settings.customControlsHint',
          )}
        </p>
      ) : null}
    </section>
  );
}
