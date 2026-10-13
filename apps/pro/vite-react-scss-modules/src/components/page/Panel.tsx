import { Button, Surface } from '@virgo-design/ui';
import type { ReactNode } from 'react';

import styles from './Panel.module.scss';

export function Panel({
  title,
  description,
  actions,
  children,
  className,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Surface
      role="region"
      border="default"
      radius={12}
      className={`${styles.panel} ${className ?? ''}`}
      aria-label={title}
    >
      <div className={styles.panelHeading}>
        <div>
          <h2>{title}</h2>
          {description ? <p>{description}</p> : null}
        </div>
        {actions ? (
          <Button.Group layout="custom" className={styles.actions}>
            {actions}
          </Button.Group>
        ) : null}
      </div>
      {children}
    </Surface>
  );
}
