import { Button, Card } from '@virgo-design/ui';
import { useState } from 'react';

export default function App() {
  const [message, setMessage] = useState('Invite collaborators to this workspace.');
  return (
    <Card style={{ width: '100%', maxWidth: 360 }}>
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
