import { Spinner } from '@virgo-design/ui';

import styles from './SpinnerSizesExample.module.scss';

export default function App() {
  return (
    <div className={styles.root!}>
      <Spinner size="sm" intent="neutral" aria-label="Small loading indicator" />
      <Spinner size="md" intent="brand" aria-label="Medium loading indicator" />
      <Spinner size="lg" aria-label="Large loading indicator" />
    </div>
  );
}
