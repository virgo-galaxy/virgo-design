import { DatePicker, Field } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './DatePickerStatesExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  return (
    <div className={styles.root}>
      <Field readOnly>
        <Field.Label>{t('examples.datePicker.copy.readonly')}</Field.Label>
        <DatePicker defaultValue="2026-10-06" size="small">
          <DatePicker.Input />
          <DatePicker.Trigger />
          <DatePicker.Content>
            <DatePicker.Calendar />
          </DatePicker.Content>
        </DatePicker>
      </Field>
      <Field disabled>
        <Field.Label>{t('examples.datePicker.copy.disabled')}</Field.Label>
        <DatePicker size="large">
          <DatePicker.Input />
          <DatePicker.Trigger />
          <DatePicker.Content>
            <DatePicker.Calendar />
          </DatePicker.Content>
        </DatePicker>
      </Field>
    </div>
  );
}
