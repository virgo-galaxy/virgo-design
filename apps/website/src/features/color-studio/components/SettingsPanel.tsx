import type { ColorModel } from '@virgo-design/colors';
import { useTranslation } from 'react-i18next';

import type { ChromaticMode } from '../model/types';
import styles from '../styles/color-studio.module.scss';
import { ChromaticModeControl } from './controls/ChromaticModeControl';
import { ColorModelControl } from './controls/ColorModelControl';
import { HueControls } from './controls/HueControls';
import { PaletteAnchorControl } from './controls/PaletteAnchorControl';

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
    <aside className={styles.settingsPanel}>
      <div className={styles.panelHeading}>
        <div>
          <span className={styles.panelEyebrow}>{t('settings.eyebrow')}</span>
          <h2>{t('settings.title')}</h2>
        </div>

        <button className={styles.resetButton} type="button" onClick={onReset}>
          {t('common.reset')}
        </button>
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
        <strong>{t(`settings.mode${mode.charAt(0).toUpperCase()}${mode.slice(1)}Note`)}</strong>
        <span>
          {t(`settings.mode${mode.charAt(0).toUpperCase()}${mode.slice(1)}NoteDescription`)}
        </span>
      </div>
    </aside>
  );
}
