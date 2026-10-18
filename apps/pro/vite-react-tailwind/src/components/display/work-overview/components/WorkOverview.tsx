import { Statistic, Surface } from '@virgo-design/ui';
import type { ReactNode } from 'react';

interface WorkOverviewProps {
  items: Array<{ label: string; value: ReactNode; note: string; artwork: string }>;
  loading?: boolean;
}

export function WorkOverview({ items, loading = false }: WorkOverviewProps) {
  return (
    <div className="min-w-0 [container-type:inline-size]">
      <Surface
        border="default"
        radius={12}
        className="grid grid-cols-4 overflow-hidden container-max-1000:grid-cols-2 container-max-480:grid-cols-1"
        data-slot="work-overview"
      >
        {items.map((item) => (
          <div
            key={item.label}
            className={[
              "after:content-[''] after:absolute after:[inset-inline-end:0] after:[top:50%]",
              'after:[width:var(--vd-stroke-width,_var(--vd-border-width-1))] after:[height:64px] after:[background:var(--vd-border-subtle)]',
              'after:[transform:translateY(-50%)] [&:last-child::after]:hidden',
              'container-max-1000:[&:nth-child(2)::after]:hidden',
              'container-max-1000:[&:nth-child(-n_+_2)]:[border-bottom:var(--vd-stroke-width,_var(--vd-border-width-1))_solid_var(--vd-border-subtle)]',
              'container-max-480:[min-height:120px] container-max-480:[padding:var(--vd-spacing-16)_var(--vd-spacing-24)] container-max-480:gap-20',
              'container-max-480:after:hidden',
              'container-max-480:[&:not(:last-child)]:[border-bottom:var(--vd-stroke-width,_var(--vd-border-width-1))_solid_var(--vd-border-subtle)]',
              'relative flex items-center gap-24 min-w-0 [min-height:148px] [padding:var(--vd-spacing-24)_var(--vd-spacing-32)]',
            ].join(' ')}
          >
            <img
              className="container-max-480:[width:48px] container-max-480:[height:48px] block [width:56px] [height:56px] flex-none"
              src={item.artwork}
              width={56}
              height={56}
              alt=""
            />
            <Statistic
              className="min-w-0 wrap-anywhere [&_[data-slot='description']]:leading-[1.5]"
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
