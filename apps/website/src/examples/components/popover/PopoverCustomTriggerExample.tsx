import { Popover } from '@virgo-design/ui';

import styles from './PopoverCustomTriggerExample.module.scss';

export default function App() {
  return (
    <Popover>
      <Popover.Trigger
        aria-label="Workspace profile"
        render={(props) => (
          <button {...props} className={styles.root!}>
            <span aria-hidden="true">VD</span>
          </button>
        )}
      />
      <Popover.Content arrow>
        <div className={styles.stage!}>
          <strong>Workspace profile</strong>
          <p className={styles.text!}>A custom avatar trigger rendered without Virgo Button.</p>
          <Popover.Close>Done</Popover.Close>
        </div>
      </Popover.Content>
    </Popover>
  );
}
