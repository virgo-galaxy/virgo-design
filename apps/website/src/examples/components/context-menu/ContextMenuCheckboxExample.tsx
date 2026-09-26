import { ContextMenu } from '@virgo-design/ui';
import { useState } from 'react';

export default function App() {
  const [snap, setSnap] = useState(true);
  return (
    <div style={{ display: 'grid', gap: 16, width: '100%', maxWidth: 360 }}>
      <ContextMenu>
        <ContextMenu.Trigger
          aria-label="Canvas preferences"
          style={{
            display: 'grid',
            justifyItems: 'center',
            alignContent: 'center',
            gap: 12,
            minHeight: 160,
            padding: 24,
            width: '100%',
            border: '1px dashed var(--vd-border-default)',
            borderRadius: 'var(--vd-radius-8)',
            background: 'var(--vd-surface-secondary)',
          }}
        >
          Canvas preferences · Right-click
        </ContextMenu.Trigger>
        <ContextMenu.Content aria-label="Canvas preferences">
          <ContextMenu.CheckboxItem checked={snap} onCheckedChange={setSnap}>
            Snap to grid
          </ContextMenu.CheckboxItem>
          <ContextMenu.CheckboxItem>Show guides</ContextMenu.CheckboxItem>
        </ContextMenu.Content>
      </ContextMenu>
      <span role="status">Snap to grid {snap ? 'on' : 'off'}</span>
    </div>
  );
}
