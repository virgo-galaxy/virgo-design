import { Button, Card } from '@virgo-design/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { translateExampleText } from '@/i18n/translate-example-text';

import styles from './CardActionsExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  const [message, setMessage] = useState('Invite collaborators to this workspace.');
  return (
    <Card className={styles.root!}>
      <Card.Header>
        <Card.Title as="h3">{t('examples.card.copy.projectAccess')}</Card.Title>
        <Card.Description>{translateExampleText(t, 'card', message)}</Card.Description>
      </Card.Header>
      <Card.Footer>
        <Button variant="text" onClick={() => setMessage('Invitation cancelled.')}>
          {t('examples.card.copy.cancel')}
        </Button>
        <Button onClick={() => setMessage('Invitation prepared. This is a local demo.')}>
          {t('examples.card.copy.invite')}
        </Button>
      </Card.Footer>
    </Card>
  );
}
