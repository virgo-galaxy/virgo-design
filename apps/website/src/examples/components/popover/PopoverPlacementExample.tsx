import { Popover } from '@virgo-design/ui';

const placements = [
  'topLeft',
  'top',
  'topRight',
  'leftTop',
  'left',
  'leftBottom',
  'rightTop',
  'right',
  'rightBottom',
  'bottomLeft',
  'bottom',
  'bottomRight',
] as const;

export default function App() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12 }}>
      {placements.map((placement) => (
        <Popover key={placement}>
          <Popover.Trigger size="small">{placement}</Popover.Trigger>
          <Popover.Content placement={placement} offset={12} arrow>
            <div style={{ display: 'grid', gap: 12, maxWidth: 240 }}>
              <strong>{placement}</strong>
              <p style={{ margin: 0 }}>Scroll or resize to see the panel follow its trigger.</p>
              <Popover.Close />
            </div>
          </Popover.Content>
        </Popover>
      ))}
    </div>
  );
}
