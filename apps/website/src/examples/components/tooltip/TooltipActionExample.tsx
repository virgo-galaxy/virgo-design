import { SettingsIcon } from '@virgo-design/icons';
import { Tooltip } from '@virgo-design/ui';
import { useState } from 'react';

export default function App() {
  const [actions, setActions] = useState(0);
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 16 }}>
      <Tooltip>
        <Tooltip.Trigger aria-label="Workspace settings" onClick={() => setActions((n) => n + 1)}>
          <SettingsIcon size={20} />
        </Tooltip.Trigger>
        <Tooltip.Content>Open workspace settings</Tooltip.Content>
      </Tooltip>
      <span role="status">Settings opened: {actions}</span>
    </div>
  );
}
