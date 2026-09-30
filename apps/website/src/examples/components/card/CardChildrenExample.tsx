import { Avatar, Card, Tag } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './CardChildrenExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  return (
    <Card className={styles.root!}>
      <Avatar fallback="VD" />
      <Card.Title as="h3">{t('examples.card.copy.virgoDesignCore')}</Card.Title>
      <Tag intent="brand">{t('examples.card.copy.coveragePass')}</Tag>
      <p className={styles.text!}>
        {t('examples.card.copy.directChildrenParticipateInTheCardSStructuralFlow')}
      </p>
    </Card>
  );
}
