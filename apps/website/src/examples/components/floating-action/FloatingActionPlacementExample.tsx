import { SettingsIcon } from '@virgo-design/icons';
import { FloatingAction } from '@virgo-design/ui';

export default function App() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
        width: '100%',
        gap: 16,
      }}
    >
      {(['top', 'right', 'bottom', 'left'] as const).map((placement) => (
        <div
          key={placement}
          style={{
            minHeight: 220,
            display: 'grid',
            alignContent: 'center',
            justifyItems: 'center',
            gap: 24,
          }}
        >
          <FloatingAction.Group>
            <FloatingAction.Trigger aria-label={`Toggle ${placement} actions`} />
            <FloatingAction.Content placement={placement} aria-label={`${placement} actions`}>
              <FloatingAction aria-label={`${placement} settings`}>
                <SettingsIcon />
              </FloatingAction>
            </FloatingAction.Content>
          </FloatingAction.Group>
          <span>{placement}</span>
        </div>
      ))}
    </div>
  );
}
