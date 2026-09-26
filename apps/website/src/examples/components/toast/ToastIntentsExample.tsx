import { Button, Toast, type ToastIntent } from '@virgo-design/ui';
import { useRef, useState } from 'react';

export default function App() {
  const [toasts, setToasts] = useState<Array<{ id: number; intent: ToastIntent }>>([]);
  const nextId = useRef(1);
  const addToast = (intent: ToastIntent) => {
    const id = nextId.current++;
    setToasts((current) => [...current, { id, intent }]);
  };
  // This local demo opts out of the document-wide F8 shortcut.
  return (
    <Toast.Provider hotkey={[]}>
      <div style={{ display: 'grid', gap: 24, width: '100%', justifyItems: 'center' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          {(['default', 'success', 'warning', 'error', 'info'] as const).map((intent) => (
            <Button key={intent} variant="outline" onClick={() => addToast(intent)}>
              Show {intent}
            </Button>
          ))}
        </div>
        <Toast.Viewport
          aria-label="Status notifications"
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
      {toasts.map((toast) => (
        <Toast.Root
          key={toast.id}
          intent={toast.intent}
          duration={5000}
          onOpenChange={(open) => {
            if (!open) setToasts((current) => current.filter((item) => item.id !== toast.id));
          }}
        >
          <Toast.Title>{toast.intent === 'default' ? 'Notification' : toast.intent}</Toast.Title>
          <Toast.Description>
            Notification #{toast.id} uses semantic status tokens.
          </Toast.Description>
          <Toast.Close />
        </Toast.Root>
      ))}
    </Toast.Provider>
  );
}
