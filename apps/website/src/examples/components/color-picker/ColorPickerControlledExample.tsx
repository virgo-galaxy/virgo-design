import { ColorPicker, Field } from '@virgo-design/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './ColorPickerControlledExample.module.scss';

export default function App() {
  const { t } = useTranslation();
  const [value, setValue] = useState('#1a5cff');

  return (
    <div className={styles.root}>
      <Field>
        <Field.Label>
          {t('examples.colorPicker.copy.label')}: {value}
        </Field.Label>
        <ColorPicker value={value} onValueChange={setValue} name="accent">
          <ColorPicker.Trigger variant="value" aria-label={t('examples.colorPicker.copy.open')} />
          <ColorPicker.Panel alpha aria-label={t('examples.colorPicker.copy.panel')} />
          <div className={styles.swatches}>
            {['#1a5cff', '#16a34a', '#dc2626', '#9333ea'].map((color) => (
              <ColorPicker.Swatch key={color} value={color} />
            ))}
          </div>
        </ColorPicker>
        <Field.Description>{t('examples.colorPicker.copy.hint')}</Field.Description>
      </Field>
    </div>
  );
}
