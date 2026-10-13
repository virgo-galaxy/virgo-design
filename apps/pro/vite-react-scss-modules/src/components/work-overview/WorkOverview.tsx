import { Statistic, Surface } from '@virgo-design/ui';
import type { ReactNode } from 'react';

import styles from '@/components/work-overview/WorkOverview.module.scss';

export function WorkOverview({
  items,
  loading = false,
}: {
  items: Array<{ label: string; value: ReactNode; note: string; artwork: string }>;
  loading?: boolean;
}) {
  return (
    <div className={styles.container}>
      <Surface border="default" radius={12} className={styles.grid} data-slot="work-overview">
        {items.map((item) => (
          <div key={item.label} className={styles.metric}>
            <img className={styles.artwork} src={item.artwork} width={56} height={56} alt="" />
            <Statistic
              className={styles.content}
              label={item.label}
              value={item.value}
              animation
              loading={loading}
              description={item.note}
            />
          </div>
        ))}
      </Surface>
    </div>
  );
}
