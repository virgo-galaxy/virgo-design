import { Button, Card } from '@virgo-design/ui';
import { useState } from 'react';

import styles from './CardActionsExample.module.scss';

export default function App() {
  const [message, setMessage] = useState('Invite collaborators to this workspace.');
  return (
    <Card className={styles.root!}>
      <Card.Header>
        <Card.Title as="h3">Project access</Card.Title>
        <Card.Description>{message}</Card.Description>
      </Card.Header>
      <Card.Footer>
        <Button variant="text" onClick={() => setMessage('Invitation cancelled.')}>
          Cancel
        </Button>
        <Button onClick={() => setMessage('Invitation prepared. This is a local demo.')}>
          Invite
        </Button>
      </Card.Footer>
    </Card>
  );
}
