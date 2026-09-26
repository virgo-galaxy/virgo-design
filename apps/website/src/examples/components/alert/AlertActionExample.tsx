import { Alert, Button } from '@virgo-design/ui';
import { useState } from 'react';

export default function App() {
  const [retries, setRetries] = useState(0);
  return (
    <div style={{ display: 'grid', gap: 16, width: '100%', maxWidth: 640 }}>
      <Alert intent="error">
        <Alert.Icon />
        <Alert.Content>
          <Alert.Title>Deployment failed</Alert.Title>
          <Alert.Description>Retry after checking the service connection.</Alert.Description>
        </Alert.Content>
        <Alert.Action>
          <Button size="small" variant="outline" onClick={() => setRetries((n) => n + 1)}>
            Retry
          </Button>
        </Alert.Action>
      </Alert>
      <span role="status">Retry requests: {retries}</span>
    </div>
  );
}
