import { Avatar, Badge, Card } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './CardProfileExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  return (
    <Card variant="outlined" className={styles.root!}>
      <div className={styles.stage!}>
        <Avatar fallback="PK" size="lg" />
        <div className={styles.stage2!}>
          <Card.Title as="h3">{t('examples.card.copy.pokeya')}</Card.Title>
          <Card.Description>{t('examples.card.copy.designSystemMaintainer')}</Card.Description>
        </div>
        <Badge count="Online" intent="success" />
      </div>
    </Card>
  );
}
