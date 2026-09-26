import { Popover } from '@virgo-design/ui';

export default function App() {
  return (
    <Popover>
      <Popover.Trigger
        aria-label="Workspace profile"
        render={(props) => (
          <button
            {...props}
            style={{
              width: 40,
              height: 40,
              borderRadius: 'var(--vd-radius-full)',
              border: '1px solid var(--vd-border-default)',
              background: 'var(--vd-brand-subtle)',
              color: 'var(--vd-brand-link)',
              cursor: 'pointer',
            }}
          >
            <span aria-hidden="true">VD</span>
          </button>
        )}
      />
      <Popover.Content arrow>
        <div style={{ display: 'grid', gap: 12, maxWidth: 260 }}>
          <strong>Workspace profile</strong>
          <p style={{ margin: 0 }}>A custom avatar trigger rendered without Virgo Button.</p>
          <Popover.Close>Done</Popover.Close>
        </div>
      </Popover.Content>
    </Popover>
  );
}
