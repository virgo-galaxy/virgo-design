import { Button, Checkbox, Input, Popover } from '@virgo-design/ui';
import { useState } from 'react';

export default function App() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('Virgo workspace');
  const [savedName, setSavedName] = useState(name);
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 16 }}>
      <Popover open={open} onOpenChange={setOpen}>
        <Popover.Trigger>Edit workspace</Popover.Trigger>
        <Popover.Content aria-label="Edit workspace settings" arrow>
          <form
            style={{ display: 'grid', gap: 16, maxWidth: 280 }}
            onSubmit={(event) => {
              event.preventDefault();
              setSavedName(name);
              setOpen(false);
            }}
          >
            <strong>Workspace settings</strong>
            <label style={{ display: 'grid', gap: 8 }}>
              Workspace name
              <Input value={name} onChange={(event) => setName(event.target.value)} />
            </label>
            <Checkbox defaultChecked>Notify workspace members</Checkbox>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
              <Popover.Close>Cancel</Popover.Close>
              <Button type="submit" size="small">
                Save changes
              </Button>
            </div>
          </form>
        </Popover.Content>
      </Popover>
      <span role="status">Workspace: {savedName}</span>
      <Button variant="text" size="small">
        Next control
      </Button>
    </div>
  );
}
