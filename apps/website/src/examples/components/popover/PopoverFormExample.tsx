import { Button, Checkbox, Input, Popover } from '@virgo-design/ui';
import { useState } from 'react';

import styles from './PopoverFormExample.module.scss';

export default function App() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('Virgo workspace');
  const [savedName, setSavedName] = useState(name);
  return (
    <div className={styles.root!}>
      <Popover open={open} onOpenChange={setOpen}>
        <Popover.Trigger>Edit workspace</Popover.Trigger>
        <Popover.Content aria-label="Edit workspace settings" arrow>
          <form
            className={styles.form!}
            onSubmit={(event) => {
              event.preventDefault();
              setSavedName(name);
              setOpen(false);
            }}
          >
            <strong>Workspace settings</strong>
            <label className={styles.label!}>
              Workspace name
              <Input value={name} onChange={(event) => setName(event.target.value)} />
            </label>
            <Checkbox defaultChecked>Notify workspace members</Checkbox>
            <div className={styles.stage!}>
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
