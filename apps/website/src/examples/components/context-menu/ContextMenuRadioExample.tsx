import { ContextMenu } from '@virgo-design/ui';
import { useState } from 'react';

export default function App() {
  const [units, setUnits] = useState('pixels');
  return (
    <div style={{ display: 'grid', gap: 16, width: '100%', maxWidth: 360 }}>
      <ContextMenu>
        <ContextMenu.Trigger
          aria-label="Canvas units"
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
          Canvas units · Right-click
        </ContextMenu.Trigger>
        <ContextMenu.Content aria-label="Canvas units">
          <ContextMenu.RadioGroup value={units} onValueChange={setUnits} aria-label="Units">
            <ContextMenu.RadioItem value="pixels">Pixels</ContextMenu.RadioItem>
            <ContextMenu.RadioItem value="points">Points</ContextMenu.RadioItem>
          </ContextMenu.RadioGroup>
        </ContextMenu.Content>
      </ContextMenu>
      <span role="status">Units: {units}</span>
    </div>
  );
}
