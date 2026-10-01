import { ColorPicker } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './color-picker-popover.module.scss';

export function ColorPickerPopover() {
  const { t } = useTranslation();
  return (
    <ColorPicker.Content
      className={styles.popover}
      aria-label={t('foundations.colorStudio.picker.title')}
    >
      <div className={styles.canvas}>
        <ColorPicker.Area
          className={styles.area}
          saturationLabel={t('foundations.colorStudio.picker.saturation')}
          brightnessLabel={t('foundations.colorStudio.picker.brightness')}
        />
        <ColorPicker.Hue aria-label={t('foundations.colorStudio.picker.hue')} />
      </div>
      <div className={styles.hexRow}>
        <ColorPicker.Preview className={styles.preview} />
        <ColorPicker.HexField
          aria-label={t('foundations.colorStudio.picker.hex')}
          className={styles.hexInput}
          letterCase="upper"
        />
      </div>
      <div className={styles.channels}>
        {(['r', 'g', 'b'] as const).map((channel) => (
          <label className={styles.channel} key={channel}>
            <ColorPicker.ChannelField channel={channel} /> <span>{channel.toUpperCase()}</span>
          </label>
        ))}
      </div>
    </ColorPicker.Content>
  );
}
