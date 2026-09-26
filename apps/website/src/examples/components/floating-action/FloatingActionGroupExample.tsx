import { CircleInfoIcon, DashboardIcon } from '@virgo-design/icons';
import { FloatingAction } from '@virgo-design/ui';
import { useState } from 'react';

export default function App() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState('Choose an action.');
  const select = (action: string) => {
    setStatus(action);
    setOpen(false);
  };
  return (
    <div style={{ display: 'grid', gap: 16, justifyItems: 'start', padding: '80px 48px' }}>
      <FloatingAction.Group open={open} onOpenChange={setOpen}>
        <FloatingAction.Trigger aria-label="Quick actions" />
        <FloatingAction.Content aria-label="Quick actions">
          <FloatingAction aria-label="Open dashboard" onClick={() => select('Dashboard')}>
            <DashboardIcon />
          </FloatingAction>
          <FloatingAction aria-label="Show help" onClick={() => select('Help')}>
            <CircleInfoIcon />
          </FloatingAction>
        </FloatingAction.Content>
      </FloatingAction.Group>
      <span role="status">{status}</span>
    </div>
  );
}
