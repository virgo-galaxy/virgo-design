import { Progress } from '@virgo-design/ui';

import styles from './ProgressIntentsExample.module.scss';

export default function App() {
  return (
    <div className={styles.root!}>
      {(['default', 'success', 'warning', 'error'] as const).map((intent) => (
        <Progress key={intent} value={70} intent={intent} label={intent} showValue />
      ))}
    </div>
  );
}
