import { Alert, Button } from '@virgo-design/ui';
import { useState } from 'react';

export default function App() {
  const [visible, setVisible] = useState(true);
  return (
    <div style={{ width: '100%', maxWidth: 640 }}>
      {visible ? (
        <Alert intent="info">
          <Alert.Icon />
          <Alert.Content>
            <Alert.Title>Review requested</Alert.Title>
            <Alert.Description>A teammate requested feedback on this workspace.</Alert.Description>
          </Alert.Content>
          <Alert.Close onClick={() => setVisible(false)} />
        </Alert>
      ) : (
        <Button size="small" variant="outline" onClick={() => setVisible(true)}>
          Restore alert
        </Button>
      )}
    </div>
  );
}
