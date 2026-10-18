import type { ColorModel } from '@virgo-design/colors';
import { Button } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import { chromaticModeTranslationKeys } from '../color-studio-i18n';
import type { ChromaticMode } from '../model/types';
import { ChromaticModeControl } from './controls/ChromaticModeControl';
import { ColorModelControl } from './controls/ColorModelControl';
import { HueControls } from './controls/HueControls';
import { PaletteAnchorControl } from './controls/PaletteAnchorControl';

import styles from '../styles/color-studio.module.scss';

interface SettingsPanelProps {
  mode: ChromaticMode;
  anchor: string;
  model: ColorModel;
  hueSpread: number;
  distributionCurve: number;
  onModeChange: (value: ChromaticMode) => void;
  onAnchorChange: (value: string) => void;
  onModelChange: (value: ColorModel) => void;
  onHueSpreadChange: (value: number) => void;
  onDistributionCurveChange: (value: number) => void;
  onReset: () => void;
}

export function SettingsPanel({
  mode,
  anchor,
  model,
  hueSpread,
  distributionCurve,
  onModeChange,
  onAnchorChange,
  onModelChange,
  onHueSpreadChange,
  onDistributionCurveChange,
  onReset,
}: SettingsPanelProps) {
  const { t } = useTranslation();

  return (
    <aside
      className={styles.settingsPanel}
      aria-label={t('foundations.colorStudio.settings.title')}
    >
      <div className={styles.panelHeading}>
        <div>
          <span className={styles.panelEyebrow}>
            {t('foundations.colorStudio.settings.eyebrow')}
          </span>
          <h2>{t('foundations.colorStudio.settings.title')}</h2>
        </div>

        <Button variant="text" className={styles.resetButton} type="button" onClick={onReset}>
          {t('foundations.colorStudio.actions.reset')}
        </Button>
      </div>

      <ChromaticModeControl value={mode} onChange={onModeChange} />

      {mode === 'linked' ? <PaletteAnchorControl value={anchor} onChange={onAnchorChange} /> : null}

      <ColorModelControl
        value={mode === 'official' ? 'oklch' : model}
        disabled={mode === 'official'}
        onChange={onModelChange}
      />

      <HueControls
        mode={mode}
        hueSpread={hueSpread}
        distributionCurve={distributionCurve}
        onHueSpreadChange={onHueSpreadChange}
        onDistributionCurveChange={onDistributionCurveChange}
      />

      <div className={styles.engineNote}>
        <strong>{t(chromaticModeTranslationKeys[mode].note)}</strong>
        <span>{t(chromaticModeTranslationKeys[mode].noteDescription)}</span>
      </div>
    </aside>
  );
}
