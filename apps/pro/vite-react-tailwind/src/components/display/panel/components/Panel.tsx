import { Button, Surface } from '@virgo-design/ui';
import type { ReactNode } from 'react';

interface PanelProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function Panel({ title, description, actions, children, className }: PanelProps) {
  return (
    <Surface
      role="region"
      border="default"
      radius={12}
      className={`min-w-0 ${className ?? ''}`}
      aria-label={title}
    >
      <div
        className={[
          '[border-bottom:1px_solid_var(--vd-border-subtle)]',
          '[&_h2]:m-0 [&_h2]:text-(length:--vd-font-size-14) [&_h2]:font-[600] [&_p]:[margin:var(--vd-spacing-4)_0_0]',
          '[&_p]:text-(length:--vd-font-size-12) [&_p]:text-text-tertiary',
          'viewport-max-640:items-start viewport-max-640:flex-col viewport-max-640:gap-12 viewport-max-640:p-16',
          'flex items-center justify-between gap-16 p-20',
        ].join(' ')}
      >
        <div>
          <h2>{title}</h2>
          {description ? <p>{description}</p> : null}
        </div>
        {actions ? (
          <Button.Group layout="custom" className="flex items-center flex-wrap gap-8">
            {actions}
          </Button.Group>
        ) : null}
      </div>
      {children}
    </Surface>
  );
}
