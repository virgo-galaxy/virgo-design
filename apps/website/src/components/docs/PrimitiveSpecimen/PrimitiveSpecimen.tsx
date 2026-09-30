import { Card } from '@virgo-design/ui';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './primitive-specimen.module.scss';

export interface PrimitiveSpecimenProps {
  children: ReactNode;
}

export function PrimitiveSpecimen({ children }: PrimitiveSpecimenProps) {
  const { t } = useTranslation();

  return (
    <Card variant="outlined" className={styles.shell} data-testid="primitive-specimen-shell">
      <Card.Header>
        <Card.Title as="h2">{t('docs.primitiveSpecimen.title')}</Card.Title>
        <Card.Description>{t('docs.primitiveSpecimen.description')}</Card.Description>
      </Card.Header>
      <Card.Body>
        <div className={styles.boundary} data-primitive-specimen="">
          {children}
        </div>
      </Card.Body>
    </Card>
  );
}
