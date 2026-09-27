import { Separator } from '@virgo-design/ui';

import styles from './SeparatorDecorativeExample.module.scss';

export default function App() {
  return (
    <div className={styles.root!}>
      <article>
        <h3 className={styles.h3!}>Design systems</h3>
        <p className={styles.text!}>Shared tokens and components keep product surfaces coherent.</p>
      </article>
      <Separator decorative />
      <article>
        <h3 className={styles.h3!}>Coverage pass</h3>
        <p className={styles.text!}>Small stable APIs complete the component map.</p>
      </article>
    </div>
  );
}
