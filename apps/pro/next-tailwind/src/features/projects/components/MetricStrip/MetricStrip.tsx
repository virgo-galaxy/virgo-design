import { Statistic, Surface } from '@virgo-design/ui';
import type { ReactNode } from 'react';

interface MetricStripProps {
  items: Array<{ label: string; value: ReactNode; note?: string }>;
  note?: string;
  className?: string;
}

export function MetricStrip({ items, note, className }: MetricStripProps) {
  return (
    <Surface
      border="default"
      radius={8}
      className={`pro-metric-strip-metrics p-20 flex items-center justify-between gap-24 viewport-max-1050:gap-16 viewport-max-640:p-16 ${className ?? ''}`}
    >
      <div className="viewport-max-760:grid-cols-2 viewport-max-760:gap-20 grid [grid-template-columns:repeat(4,_minmax(0,_1fr))] gap-32 w-full">
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
      {note ? (
        <span className="viewport-max-1050:[.pro-metric-strip-metrics_>_&]:hidden text-text-tertiary [font-size:var(--vd-font-size-11)]">
          {note}
        </span>
      ) : null}
    </Surface>
  );
}
