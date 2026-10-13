import { Statistic, Surface } from '@virgo-design/ui';
import type { ReactNode } from 'react';

import styles from './MetricStrip.module.scss';

export function MetricStrip({
  items,
  note,
  className,
}: {
  items: Array<{ label: string; value: ReactNode; note?: string }>;
  note?: string;
  className?: string;
}) {
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
