import { Progress } from '@virgo-design/ui';

import styles from './ProgressSizesExample.module.scss';

export default function App() {
  return (
    <div className={styles.root!}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <Progress key={size} value={60} size={size} label={size.toUpperCase()} />
      ))}
    </div>
  );
}
