import { Button, Toast, type ToastPlacement } from '@virgo-design/ui';
import { useState } from 'react';

const placements = [
  'top-start',
  'top-center',
  'top-end',
  'bottom-start',
  'bottom-center',
  'bottom-end',
] as const;

export default function App() {
  const [placement, setPlacement] = useState<ToastPlacement>('bottom-end');
  const [open, setOpen] = useState(false);
  return (
    <Toast.Provider hotkey={[]}>
      <div style={{ display: 'grid', gap: 24, width: '100%' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          {placements.map((value) => (
            <Button
              key={value}
              size="small"
              variant={placement === value ? 'primary' : 'outline'}
              onClick={() => {
                setPlacement(value);
                setOpen(true);
              }}
            >
              {value}
            </Button>
          ))}
        </div>
        <div
          style={{
            position: 'relative',
            minHeight: 300,
            border: '1px solid var(--vd-border-subtle)',
            borderRadius: 'var(--vd-radius-12)',
            background: 'var(--vd-surface-secondary)',
          }}
        >
          <Toast.Viewport
            placement={placement}
            aria-label="Positioned notifications"
            style={{
              position: 'absolute',
              width: 'min(320px, calc(100% - 32px))',
              maxHeight: 'calc(100% - 32px)',
              zIndex: 1,
            }}
          />
        </div>
      </div>
      <Toast.Root open={open} onOpenChange={setOpen} intent="info" duration={0}>
        <Toast.Title>{placement}</Toast.Title>
        <Toast.Description>
          This example positions its viewport inside the canvas.
        </Toast.Description>
        <Toast.Close />
      </Toast.Root>
    </Toast.Provider>
  );
}
