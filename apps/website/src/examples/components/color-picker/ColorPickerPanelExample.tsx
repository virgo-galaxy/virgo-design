import { ColorPicker } from '@virgo-design/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './ColorPickerPanelExample.module.scss';
export default function App() {
  const { t } = useTranslation();
  const [value, setValue] = useState('#1664f9');
  return (
    <ColorPicker className={styles.root} value={value} onValueChange={setValue}>
      <ColorPicker.Trigger aria-label={t('examples.colorPicker.copy.open')}>
        <ColorPicker.Preview />
      </ColorPicker.Trigger>
      <ColorPicker.HexField aria-label={t('examples.colorPicker.copy.hex')} />
      <ColorPicker.Content
        className={styles.panel}
        aria-label={t('examples.colorPicker.copy.panel')}
      >
        <ColorPicker.Area
          saturationLabel={t('examples.colorPicker.copy.saturation')}
          brightnessLabel={t('examples.colorPicker.copy.brightness')}
        />
        <ColorPicker.Hue aria-label={t('examples.colorPicker.copy.hue')} />
        <div className={styles.fields}>
          <ColorPicker.HexField aria-label={t('examples.colorPicker.copy.hex')} />
          {(['r', 'g', 'b'] as const).map((channel) => (
            <label key={channel}>
              {channel.toUpperCase()}
              <ColorPicker.ChannelField channel={channel} />
            </label>
          ))}
        </div>
      </ColorPicker.Content>
    </ColorPicker>
  );
}
