import { Button } from '@virgo-design/ui';

import styles from './ButtonSizesExample.module.scss';

export default function App() {
  return (
    <div className={styles.root!}>
      <Button size="mini">Mini</Button>
      <Button size="small">Small</Button>
      <Button size="medium">Medium</Button>
      <Button size="large">Large</Button>
    </div>
  );
}
