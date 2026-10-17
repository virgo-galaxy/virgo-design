import { Button, Surface, Tag } from '@virgo-design/ui';
import type { ReactNode } from 'react';

import styles from './PageHeading.module.scss';

export function PageHeading({
  title,
  description,
  count,
  actions,
  variant = 'surface',
}: {
  title: ReactNode;
  description: string;
  count?: number;
  actions?: ReactNode;
  variant?: 'surface' | 'integrated';
}) {
  const heading = (
    <header
      className={`${styles.heading} ${variant === 'integrated' ? styles.integratedHeading : ''}`}
      data-slot="page-heading"
    >
      <div className={styles.headingCopy}>
        <div className={styles.titleLine}>
          <h1>{title}</h1>
          {count !== undefined ? (
            <Tag size="md" variant="outline">
              {count}
            </Tag>
          ) : null}
        </div>
        <p>{description}</p>
      </div>
      {actions ? (
        <Button.Group layout="custom" className={styles.headingActions}>
          {actions}
        </Button.Group>
      ) : null}
    </header>
  );

  return variant === 'integrated' ? (
    heading
  ) : (
    <Surface border="default" radius={8} className={styles.headingSurface}>
      {heading}
    </Surface>
  );
}
