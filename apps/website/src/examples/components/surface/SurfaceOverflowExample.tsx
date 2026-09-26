import { Button, Surface } from '@virgo-design/ui';
import { useId, useState } from 'react';

export default function App() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  return (
    <div style={{ width: '100%', padding: '24px 12px 100px' }}>
      <Surface
        material="glass"
        radius={24}
        border="default"
        style={{ position: 'relative', padding: 24 }}
      >
        <span
          style={{
            position: 'absolute',
            top: -12,
            right: 20,
            padding: '4px 12px',
            borderRadius: 999,
            background: 'var(--vd-brand-primary)',
            color: 'var(--vd-brand-foreground)',
          }}
        >
          Outside the edge
        </span>
        <p>Only the decorative material is rounded. Children may extend beyond it.</p>
        <Button
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? 'Hide content' : 'Show floating content'}
        </Button>
        {open ? (
          <Surface
            id={panelId}
            tone="elevated"
            radius={12}
            elevation={3}
            border="subtle"
            style={{
              position: 'absolute',
              top: 'calc(100% + 12px)',
              insetInline: 0,
              padding: 16,
              zIndex: 1,
            }}
          >
            Floating content stays outside the rounded panel.
          </Surface>
        ) : null}
      </Surface>
    </div>
  );
}
