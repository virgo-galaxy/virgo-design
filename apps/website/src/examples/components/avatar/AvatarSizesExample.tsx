import { Avatar } from '@virgo-design/ui';

import styles from './AvatarSizesExample.module.scss';

export default function App() {
  return (
    <div className={styles.root!}>
      <Avatar size="sm" fallback="S" aria-label="Small avatar" />
      <Avatar size="md" fallback="M" aria-label="Medium avatar" />
      <Avatar size="lg" fallback="L" aria-label="Large avatar" />
    </div>
  );
}
