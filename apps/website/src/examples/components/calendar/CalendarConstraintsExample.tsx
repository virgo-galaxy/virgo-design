import { Calendar } from '@virgo-design/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './CalendarConstraintsExample.module.scss';

export default function App() {
  const { t } = useTranslation();
  const [month, setMonth] = useState('2026-10');

  return (
    <div className={styles.root}>
      <Calendar
        month={month}
        onMonthChange={setMonth}
        min="2026-10-01"
        max="2026-11-30"
        isDateUnavailable={(date) => [0, 6].includes(new Date(date + 'T12:00:00Z').getUTCDay())}
      />
      <p role="status">
        {t('examples.calendar.copy.month')}: {month}
      </p>
    </div>
  );
}
