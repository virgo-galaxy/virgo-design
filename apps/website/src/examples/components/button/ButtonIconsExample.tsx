import { CheckIcon, ChevronDownIcon, PlusIcon } from '@virgo-design/icons';
import { Button } from '@virgo-design/ui';

import styles from './ButtonIconsExample.module.scss';

export default function App() {
  return (
    <div className={styles.root!}>
      <Button leadingIcon={<PlusIcon />}>Create</Button>
      <Button variant="secondary" trailingIcon={<ChevronDownIcon />}>
        Options
      </Button>
      <Button variant="outline" leadingIcon={<CheckIcon />} trailingIcon={<ChevronDownIcon />}>
        Approved
      </Button>
    </div>
  );
}
