import { DatePicker, type DateRange, Field } from '@virgo-design/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './DatePickerRangeExample.module.scss';

export default function App() {
  const { t } = useTranslation();
  const [value, setValue] = useState<DateRange>(['2026-08-05', '2026-09-28']);

  return (
    <div className={styles.root}>
      <Field>
        <Field.Label>{t('examples.datePicker.copy.rangeLabel')}</Field.Label>
        <DatePicker.Range
          value={value}
          onValueChange={setValue}
          names={['createdFrom', 'createdTo']}
        >
          <DatePicker.RangeInput edge="start" placeholder="YYYY-MM-DD" />
          <span aria-hidden="true">–</span>
          <DatePicker.RangeInput
            edge="end"
            aria-label={t('examples.datePicker.copy.endDate')}
            placeholder="YYYY-MM-DD"
          />
          <DatePicker.Trigger aria-label={t('examples.datePicker.copy.rangeLabel')} />
          <DatePicker.Content
            aria-label={t('examples.datePicker.copy.rangeLabel')}
            placement="bottomStart"
          >
            <DatePicker.RangeCalendar weekStartsOn={1} />
          </DatePicker.Content>
        </DatePicker.Range>
        <Field.Description>{t('examples.datePicker.copy.rangeHint')}</Field.Description>
      </Field>
    </div>
  );
}
