import { Button, Drawer, Input } from '@virgo-design/ui';
import { useId, useState } from 'react';

export default function App() {
  const formId = useId();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('Virgo workspace');
  const [savedName, setSavedName] = useState(name);
  return (
    <div style={{ display: 'grid', justifyItems: 'start', gap: 16 }}>
      <Drawer.Root open={open} onOpenChange={setOpen}>
        <Drawer.Trigger>Edit workspace</Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Overlay />
          <Drawer.Content size="lg">
            <Drawer.Header>
              <Drawer.Title>Workspace details</Drawer.Title>
              <Drawer.Description>
                Update the name shown throughout the workspace.
              </Drawer.Description>
            </Drawer.Header>
            <Drawer.Body>
              <form
                id={formId}
                onSubmit={(event) => {
                  event.preventDefault();
                  setSavedName(name);
                  setOpen(false);
                }}
              >
                <label style={{ display: 'grid', gap: 8 }}>
                  Workspace name
                  <Input value={name} onChange={(event) => setName(event.target.value)} />
                </label>
              </form>
            </Drawer.Body>
            <Drawer.Footer>
              <Drawer.Close>Cancel</Drawer.Close>
              <Button type="submit" form={formId}>
                Save changes
              </Button>
            </Drawer.Footer>
            <Drawer.Close />
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
      <span role="status">Workspace: {savedName}</span>
    </div>
  );
}
