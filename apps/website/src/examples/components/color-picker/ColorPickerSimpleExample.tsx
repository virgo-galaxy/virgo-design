import { ColorPicker } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './ColorPickerSimpleExample.module.scss';

export default function App() {
  const { t } = useTranslation();
  return (
    <div className={styles.root}>
      <ColorPicker defaultValue="#549c89">
        <ColorPicker.Trigger variant="value" aria-label={t('examples.colorPicker.copy.simple')} />
        <ColorPicker.Panel
          variant="simple"
          aria-label={t('examples.colorPicker.copy.panel')}
          labels={{
            saturation: t('examples.colorPicker.copy.saturation'),
            brightness: t('examples.colorPicker.copy.brightness'),
            hue: t('examples.colorPicker.copy.hue'),
            opacity: t('examples.colorPicker.copy.opacity'),
            format: t('examples.colorPicker.copy.format'),
            hex: t('examples.colorPicker.copy.hex'),
            red: t('examples.colorPicker.copy.red'),
            green: t('examples.colorPicker.copy.green'),
            blue: t('examples.colorPicker.copy.blue'),
          }}
        />
      </ColorPicker>
    </div>
  );
}
