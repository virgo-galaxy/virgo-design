import { ColorPicker } from '@virgo-design/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './ColorPickerPanelExample.module.scss';

export default function App() {
  const { t } = useTranslation();
  const [value, setValue] = useState('#1664f9');

  return (
    <div className={styles.root}>
      {(['value', 'swatch'] as const).map((variant) => (
        <ColorPicker key={variant} value={value} onValueChange={setValue}>
          <ColorPicker.Trigger
            variant={variant}
            aria-label={t(`examples.colorPicker.copy.${variant}`)}
          />
          <ColorPicker.Panel alpha aria-label={t('examples.colorPicker.copy.panel')} />
        </ColorPicker>
      ))}
    </div>
  );
}
