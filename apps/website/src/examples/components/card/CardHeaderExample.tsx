import { Card } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './CardHeaderExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  return (
    <Card className={styles.root!}>
      <Card.Header>
        <Card.Title as="h3">Virgo Design</Card.Title>
        <Card.Description>
          {t('examples.card.copy.sharedUiComponentsAndDesignTokens')}
        </Card.Description>
      </Card.Header>
      <Card.Body>{t('examples.card.copy.aConsistentFoundationForYourProduct')}</Card.Body>
    </Card>
  );
}
