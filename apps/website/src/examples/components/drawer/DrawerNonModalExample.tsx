import { Button, Drawer } from '@virgo-design/ui';
import { useState } from 'react';

export default function App() {
  const [clicks, setClicks] = useState(0);
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 16 }}>
      <Drawer.Root modal={false}>
        <Drawer.Trigger>Open non-modal inspector</Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Content placement="right" size="sm">
            <Drawer.Header>
              <Drawer.Title>Inspector</Drawer.Title>
              <Drawer.Description>
                The canvas remains available behind this panel.
              </Drawer.Description>
            </Drawer.Header>
            <Drawer.Body>Inspect the selection without a modal overlay.</Drawer.Body>
            <Drawer.Close />
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
      <Button variant="outline" onClick={() => setClicks((n) => n + 1)}>
        Canvas action
      </Button>
      <span role="status">Canvas actions: {clicks}</span>
    </div>
  );
}
