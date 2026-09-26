import { Input, Popover } from '@virgo-design/ui';

export default function App() {
  return (
    <Popover trigger="click">
      <Popover.Trigger>Click for details</Popover.Trigger>
      <Popover.Content arrow>
        <div style={{ display: 'grid', gap: 12, maxWidth: 260 }}>
          <strong>Project notes</strong>
          <p style={{ margin: 0 }}>Use Tab to move through controls and Escape to return.</p>
          <Input aria-label="Preview note" placeholder="Add a note" />
          <Popover.Close>Done</Popover.Close>
        </div>
      </Popover.Content>
    </Popover>
  );
}
