import { PlusIcon, SettingsIcon } from '@virgo-design/icons';
import { Button } from '@virgo-design/ui';

import styles from './ButtonIconOnlyExample.module.scss';

export default function App() {
  return (
    <div className={styles.root!}>
      <Button iconOnly aria-label="Add item">
        <PlusIcon />
      </Button>
      <Button iconOnly shape="circle" aria-label="Settings">
        <SettingsIcon />
      </Button>
      <Button iconOnly variant="secondary" aria-label="Secondary settings">
        <SettingsIcon />
      </Button>
      <Button iconOnly variant="outline" aria-label="Outlined settings">
        <SettingsIcon />
      </Button>
    </div>
  );
}
