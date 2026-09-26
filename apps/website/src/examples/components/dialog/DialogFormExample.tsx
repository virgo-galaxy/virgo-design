import { Button, Dialog, Input } from '@virgo-design/ui';
import { useState } from 'react';

export default function App() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('Virgo workspace');

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>Edit workspace</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setOpen(false);
            }}
          >
            <Dialog.Header>
              <Dialog.Title>Workspace settings</Dialog.Title>
              <Dialog.Description>
                Update the name shown throughout Virgo Design.
              </Dialog.Description>
            </Dialog.Header>
            <Dialog.Body>
              <Input
                aria-label="Workspace name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.Close>Cancel</Dialog.Close>
              <Button type="submit">Save changes</Button>
            </Dialog.Footer>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
