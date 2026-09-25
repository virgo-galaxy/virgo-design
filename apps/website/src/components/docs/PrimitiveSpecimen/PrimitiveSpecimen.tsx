import { Card } from '@virgo-design/ui';
import type { ReactNode } from 'react';

import styles from './primitive-specimen.module.scss';

export interface PrimitiveSpecimenProps {
  children: ReactNode;
}

export function PrimitiveSpecimen({ children }: PrimitiveSpecimenProps) {
  return (
    <Card variant="outlined" className={styles.shell} data-testid="primitive-specimen-shell">
      <Card.Header>
        <Card.Title as="h2">Basic example</Card.Title>
        <Card.Description>
          The primitive is rendered directly, without Virgo UI styling.
        </Card.Description>
      </Card.Header>
      <Card.Body>
        <div className={styles.boundary} data-primitive-specimen="">
          {children}
        </div>
      </Card.Body>
    </Card>
  );
}
