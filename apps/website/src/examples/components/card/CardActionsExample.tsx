import { Button, Card } from '@virgo-design/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { translateExampleText } from '@/i18n/translate-example-text';

import styles from './CardActionsExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  const [message, setMessage] = useState('Use the footer actions below.');
  return (
    <Card className={styles.root!}>
      <Card.Header>
        <Card.Title as="h3">{t('examples.card.copy.exampleActions')}</Card.Title>
        <Card.Description>{translateExampleText(t, 'card', message)}</Card.Description>
      </Card.Header>
      <Button.Group layout="custom" render={(groupProps) => <Card.Footer {...groupProps} />}>
        <Button variant="text" onClick={() => setMessage('Action cancelled.')}>
          {t('examples.card.copy.cancel')}
        </Button>
        <Button onClick={() => setMessage('Action completed.')}>
          {t('examples.card.copy.confirm')}
        </Button>
      </Button.Group>
    </Card>
  );
}
