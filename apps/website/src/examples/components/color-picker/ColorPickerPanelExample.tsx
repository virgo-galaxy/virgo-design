import { ColorPicker } from '@virgo-design/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './ColorPickerPanelExample.module.scss';
export default function App() {
  const { t } = useTranslation();
  const [value, setValue] = useState('#1664f9');
  const labels = {
    saturation: t('examples.colorPicker.copy.saturation'),
    brightness: t('examples.colorPicker.copy.brightness'),
    hue: t('examples.colorPicker.copy.hue'),
    opacity: t('examples.colorPicker.copy.opacity'),
    format: t('examples.colorPicker.copy.format'),
    hex: t('examples.colorPicker.copy.hex'),
    red: t('examples.colorPicker.copy.red'),
    green: t('examples.colorPicker.copy.green'),
    blue: t('examples.colorPicker.copy.blue'),
  };
  return (
    <div className={styles.root}>
      {(['value', 'swatch'] as const).map((variant) => (
        <ColorPicker key={variant} value={value} onValueChange={setValue}>
          <ColorPicker.Trigger
            variant={variant}
            aria-label={t(`examples.colorPicker.copy.${variant}`)}
          />
          <ColorPicker.Panel
            alpha
            labels={labels}
            aria-label={t('examples.colorPicker.copy.panel')}
          />
        </ColorPicker>
      ))}
    </div>
  );
}
