import { Button, Surface, Tag } from '@virgo-design/ui';
import type { ReactNode } from 'react';

import * as classes from '@/styles/classes';

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
      className={
        variant === 'integrated'
          ? `${classes.heading} ${classes.headingIntegrated}`
          : classes.heading
      }
      data-slot="page-heading"
    >
      <div className={classes.headingBody}>
        <div className={classes.headingTitleRow}>
          <h1 className={classes.headingTitle}>{title}</h1>
          {count !== undefined ? (
            <Tag size="md" variant="outline">
              {count}
            </Tag>
          ) : null}
        </div>
        <p className={classes.headingDescription}>{description}</p>
      </div>
      {actions ? (
        <Button.Group layout="custom" className={classes.headingActions}>
          {actions}
        </Button.Group>
      ) : null}
    </header>
  );

  return variant === 'integrated' ? (
    heading
  ) : (
    <Surface border="default" radius={8} className={classes.headingSurface}>
      {heading}
    </Surface>
  );
}
