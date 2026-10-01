import { Field, TimePicker } from '@virgo-design/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './TimePickerControlledExample.module.scss';
export default function App() {
  const { t } = useTranslation();
  const [value, setValue] = useState('09:30');
  return (
    <div className={styles.root}>
      <Field>
        <Field.Label>{t('examples.timePicker.copy.label')}</Field.Label>
        <TimePicker
          value={value}
          onValueChange={setValue}
          min="09:00"
          max="18:00"
          step={900}
          name="start"
        />
        <Field.Description>
          {t('examples.timePicker.copy.hint')}: {value || '—'}
        </Field.Description>
      </Field>
    </div>
  );
}
