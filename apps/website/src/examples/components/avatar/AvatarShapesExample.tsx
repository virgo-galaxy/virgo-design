import { Avatar } from '@virgo-design/ui';

import styles from './AvatarShapesExample.module.scss';

export default function App() {
  return (
    <div className={styles.root!}>
      <Avatar shape="circle" fallback="PK" aria-label="Person" />
      <Avatar shape="square" fallback="VD" aria-label="Workspace" />
    </div>
  );
}
