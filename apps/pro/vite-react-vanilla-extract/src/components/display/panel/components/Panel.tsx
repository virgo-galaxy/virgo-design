import { Button, Surface } from '@virgo-design/ui';
import type { ReactNode } from 'react';

import * as styles from './Panel.css';

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
