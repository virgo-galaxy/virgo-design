import { Button, Surface, Tag } from '@virgo-design/ui';
import type { ReactNode } from 'react';

interface PageHeadingProps {
  title: ReactNode;
  description: string;
  count?: number;
  actions?: ReactNode;
  variant?: 'surface' | 'integrated';
}

export function PageHeading({
  title,
  description,
  count,
  actions,
  variant = 'surface',
}: PageHeadingProps) {
  const heading = (
    <header
      className={[
        'flex items-center justify-between gap-20 p-20',
        'viewport-max-640:items-start viewport-max-640:flex-col viewport-max-640:gap-12 viewport-max-640:p-16',
        variant === 'integrated'
          ? '[border-bottom:var(--vd-stroke-width,var(--vd-border-width-1))_solid_var(--vd-border-subtle)]'
          : '',
      ].join(' ')}
      data-slot="page-heading"
    >
      <div className="[flex:1] min-w-0 [overflow-wrap:anywhere]">
        <div className="flex items-center gap-12">
          <h1
            className={[
              'm-0 text-(length:--vd-typography-ui-display-small-font-size) [font-weight:var(--vd-typography-ui-display-small-font-weight)]',
              '[line-height:var(--vd-typography-ui-display-small-line-height)] tracking-[-0.6px]',
              'viewport-max-640:text-(length:--vd-font-size-24) viewport-max-640:leading-[1.3]',
            ].join(' ')}
          >
            {title}
          </h1>
          {count !== undefined ? (
            <Tag size="md" variant="outline">
              {count}
            </Tag>
          ) : null}
        </div>
        <p className="[margin:var(--vd-spacing-8)_0_0] text-text-secondary text-(length:--vd-font-size-13) leading-[1.7]">
          {description}
        </p>
      </div>
      {actions ? (
        <Button.Group
          layout="custom"
          className="flex items-center flex-wrap gap-8 flex-none max-w-full text-(length:--vd-font-size-12) viewport-max-640:w-full"
        >
          {actions}
        </Button.Group>
      ) : null}
    </header>
  );

  return variant === 'integrated' ? (
    heading
  ) : (
    <Surface border="default" radius={8} className="min-w-0">
      {heading}
    </Surface>
  );
}
