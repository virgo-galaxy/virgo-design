import { Field, TimePicker } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './TimePickerStatesExample.module.scss';
export default function App() {
  const { t } = useTranslation();
  return (
    <div className={styles.root}>
      <>
        <Field>
          <Field.Label>{t('examples.timePicker.copy.seconds')}</Field.Label>
          <TimePicker step={1} defaultValue="12:30:15" size="small" />
        </Field>
        <Field readOnly>
          <Field.Label>{t('examples.timePicker.copy.readonly')}</Field.Label>
          <TimePicker defaultValue="14:00" />
        </Field>
        <Field disabled>
          <Field.Label>{t('examples.timePicker.copy.disabled')}</Field.Label>
          <TimePicker size="large" />
        </Field>
      </>
    </div>
  );
}
