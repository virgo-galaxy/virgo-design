import { Card } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './CardVariantsExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  return (
    <div className={styles.root!}>
      <Card variant="outlined" size="sm" className={styles.card!}>
        <Card.Title as="h3">{t('examples.card.copy.outlined')}</Card.Title>
        <Card.Body>{t('examples.card.copy.subtleBorderAndSmallStructuralSpacing')}</Card.Body>
      </Card>
      <Card variant="elevated" size="lg" className={styles.card!}>
        <Card.Title as="h3">{t('examples.card.copy.elevated')}</Card.Title>
        <Card.Body>{t('examples.card.copy.elevatedSurfaceAndLargeStructuralSpacing')}</Card.Body>
      </Card>
    </div>
  );
}
