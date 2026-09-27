import { Input } from '@virgo-design/ui';

import styles from './InputContentExample.module.scss';

export default function App() {
  return (
    <div className={styles.root!}>
      <Input aria-label="Project name" placeholder="Untitled project" />
      <Input aria-label="Workspace name" defaultValue="Virgo Design" />
    </div>
  );
}
