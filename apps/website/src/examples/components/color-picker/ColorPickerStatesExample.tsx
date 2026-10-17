import { ColorPicker, Field } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './ColorPickerStatesExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  return (
    <div className={styles.root}>
      <Field readOnly>
        <Field.Label>{t('examples.colorPicker.copy.readonly')}</Field.Label>
        <ColorPicker defaultValue="#16a34a" size="small">
          <ColorPicker.Input />
          <ColorPicker.Swatch value="#16a34a" />
        </ColorPicker>
      </Field>
      <Field disabled>
        <Field.Label>{t('examples.colorPicker.copy.disabled')}</Field.Label>
        <ColorPicker size="large">
          <ColorPicker.Input />
          <ColorPicker.Swatch value="#1a5cff" />
        </ColorPicker>
      </Field>
    </div>
  );
}
