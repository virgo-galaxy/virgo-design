import { Calendar } from '@virgo-design/ui';
import { useState } from 'react';

import styles from './CalendarPanelExample.module.scss';

export default function App() {
  const [value, setValue] = useState('2026-10-06');

  return (
    <div className={styles.root}>
      <Calendar
        fullscreen
        value={value}
        onValueChange={setValue}
        defaultMonth="2026-10"
        weekStartsOn={1}
      />
    </div>
  );
}
