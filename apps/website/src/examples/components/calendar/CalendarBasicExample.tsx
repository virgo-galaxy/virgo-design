import { Calendar } from '@virgo-design/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './CalendarBasicExample.module.scss';

export default function App() {
  const { t } = useTranslation();
  const [value, setValue] = useState('2026-10-06');

  return (
    <div className={styles.root}>
      <Calendar value={value} onValueChange={setValue} defaultMonth="2026-10" weekStartsOn={1} />
      <p role="status">
        {t('examples.calendar.copy.selected')}: {value || '—'}
      </p>
    </div>
  );
}
