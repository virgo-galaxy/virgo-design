import { CheckIcon, SearchIcon, UserIcon } from '@virgo-design/icons';
import { Input } from '@virgo-design/ui';

import styles from './InputDecorationsExample.module.scss';

export default function App() {
  return (
    <div className={styles.root!}>
      <Input aria-label="Search" prefix={<SearchIcon />} placeholder="Search components" />
      <Input aria-label="Approved name" defaultValue="Virgo" suffix={<CheckIcon />} />
      <Input
        aria-label="Account"
        defaultValue="mystic"
        prefix={<UserIcon />}
        suffix={<CheckIcon />}
      />
    </div>
  );
}
