import { DatePicker, Field } from '@virgo-design/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './DatePickerBasicExample.module.scss';

export default function App() {
  const { t } = useTranslation();
  const [value, setValue] = useState('2026-10-06');

  return (
    <div className={styles.root}>
      <Field>
        <Field.Label>{t('examples.datePicker.copy.label')}</Field.Label>
        <DatePicker
          value={value}
          onValueChange={setValue}
          name="due"
          min="2026-10-01"
          max="2026-12-31"
        >
          <DatePicker.Input />
          <DatePicker.Trigger />
          <DatePicker.Content aria-label={t('examples.datePicker.copy.label')}>
            <DatePicker.Calendar weekStartsOn={1} />
          </DatePicker.Content>
        </DatePicker>
        <Field.Description>
          {t('examples.datePicker.copy.hint')}: {value || '—'}
        </Field.Description>
      </Field>
    </div>
  );
}
