import { Button, Toast } from '@virgo-design/ui';
import { useState } from 'react';

export default function App() {
  const [open, setOpen] = useState(false);
  const [archived, setArchived] = useState(false);
  return (
    <Toast.Provider hotkey={[]}>
      <div style={{ display: 'grid', justifyItems: 'center', gap: 24, width: '100%' }}>
        <Button
          onClick={() => {
            setArchived(true);
            setOpen(true);
          }}
        >
          Archive with Undo
        </Button>
        <span role="status">
          {archived ? 'Document is archived.' : 'Document is in your workspace.'}
        </span>
        <Toast.Viewport
          aria-label="Archive notifications"
          style={{
            position: 'relative',
            inset: 'auto',
            transform: 'none',
            width: '100%',
            maxWidth: 320,
            maxHeight: 'none',
            zIndex: 'auto',
          }}
        />
      </div>
      <Toast.Root open={open} onOpenChange={setOpen} intent="success" duration={5000}>
        <Toast.Title>Document archived</Toast.Title>
        <Toast.Description>You can undo this action.</Toast.Description>
        <Toast.Action onClick={() => setArchived(false)}>Undo</Toast.Action>
        <Toast.Close />
      </Toast.Root>
    </Toast.Provider>
  );
}
