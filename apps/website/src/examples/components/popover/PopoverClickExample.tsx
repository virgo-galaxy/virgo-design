import { Input, Popover } from '@virgo-design/ui';

import styles from './PopoverClickExample.module.scss';

export default function App() {
  return (
    <Popover trigger="click">
      <Popover.Trigger>Click for details</Popover.Trigger>
      <Popover.Content arrow>
        <div className={styles.root!}>
          <strong>Project notes</strong>
          <p className={styles.text!}>Use Tab to move through controls and Escape to return.</p>
          <Input aria-label="Preview note" placeholder="Add a note" />
          <Popover.Close>Done</Popover.Close>
        </div>
      </Popover.Content>
    </Popover>
  );
}
