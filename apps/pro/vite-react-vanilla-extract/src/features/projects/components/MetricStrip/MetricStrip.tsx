import { Statistic, Surface } from '@virgo-design/ui';
import type { ReactNode } from 'react';

import * as styles from './MetricStrip.css';

interface MetricStripProps {
  items: Array<{ label: string; value: ReactNode; note?: string }>;
  note?: string;
  className?: string;
}

export function MetricStrip({ items, note, className }: MetricStripProps) {
  return (
    <Surface border="default" radius={8} className={`${styles.metrics} ${className ?? ''}`}>
      <div className={styles.metricGrid}>
        {items.map((item) => (
          <Statistic
            animation
            key={item.label}
            label={item.label}
            value={item.value}
            description={item.note}
          />
        ))}
      </div>
      {note ? <span className={styles.caption}>{note}</span> : null}
    </Surface>
  );
}
