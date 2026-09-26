import { CircleInfoIcon, DashboardIcon } from '@virgo-design/icons';
import { FloatingAction, Layout } from '@virgo-design/ui';
import { useState } from 'react';

export default function App() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState('Choose an action in the lower-right corner.');
  const select = (message: string) => {
    setStatus(message);
    setOpen(false);
  };
  return (
    <div
      style={{
        width: '100%',
        border: '1px solid var(--vd-border-subtle)',
        borderRadius: 12,
        overflow: 'hidden',
      }}
    >
      <Layout>
        <Layout.Header
          logo={<strong>Virgo</strong>}
          surface={{ tone: 'default', border: 'subtle' }}
          style={{ flexWrap: 'wrap', gap: 12, padding: '12px 16px' }}
        >
          Content actions
        </Layout.Header>
        <Layout.Content padding={24} surface={{ tone: 'secondary' }} style={{ minHeight: 320 }}>
          <strong>Tools within reach</strong>
          <p role="status">{status}</p>
          <Layout.Floating offset={16}>
            <FloatingAction
              variant="primary"
              aria-label="Help"
              onClick={() => setStatus('Help selected.')}
            >
              <CircleInfoIcon />
            </FloatingAction>
            <FloatingAction.Group open={open} onOpenChange={setOpen}>
              <FloatingAction.Trigger
                aria-label={open ? 'Close quick actions' : 'Open quick actions'}
              />
              <FloatingAction.Content aria-label="Content actions">
                <FloatingAction
                  aria-label="Inspect layout"
                  onClick={() => select('Layout inspection selected.')}
                >
                  <DashboardIcon />
                </FloatingAction>
                <FloatingAction
                  aria-label="Show tips"
                  onClick={() => select('Tips enabled for this canvas.')}
                >
                  <CircleInfoIcon />
                </FloatingAction>
              </FloatingAction.Content>
            </FloatingAction.Group>
          </Layout.Floating>
        </Layout.Content>
      </Layout>
    </div>
  );
}
