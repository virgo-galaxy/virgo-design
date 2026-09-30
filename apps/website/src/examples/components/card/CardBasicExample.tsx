import { Card } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './CardBasicExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  return (
    <Card className={styles.root!}>
      <Card.Body>{t('examples.card.copy.aCompactGroupOfRelatedProjectInformation')}</Card.Body>
    </Card>
  );
}
