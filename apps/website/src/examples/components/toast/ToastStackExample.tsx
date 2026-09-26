import { Button, Toast } from '@virgo-design/ui';
import { useRef, useState } from 'react';

export default function App() {
  const [toasts, setToasts] = useState<number[]>([]);
  const nextId = useRef(1);
  return (
    <Toast.Provider hotkey={[]}>
      <div style={{ display: 'grid', justifyItems: 'center', gap: 24, width: '100%' }}>
        <Button
          onClick={() => {
            const first = nextId.current;
            nextId.current += 2;
            setToasts((current) => [...current, first, first + 1]);
          }}
        >
          Add two toasts
        </Button>
        <Toast.Viewport
          aria-label="Stacked notifications"
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
      {toasts.map((id) => (
        <Toast.Root
          key={id}
          intent={id % 2 ? 'info' : 'warning'}
          duration={5000}
          onOpenChange={(open) => {
            if (!open) setToasts((current) => current.filter((value) => value !== id));
          }}
        >
          <Toast.Title>Notification #{id}</Toast.Title>
          <Toast.Description>Hover or focus to pause its timer.</Toast.Description>
          <Toast.Close />
        </Toast.Root>
      ))}
    </Toast.Provider>
  );
}
