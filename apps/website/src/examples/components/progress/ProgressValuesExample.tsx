import { Progress } from '@virgo-design/ui';

import styles from './ProgressValuesExample.module.scss';

export default function App() {
  return (
    <div className={styles.root!}>
      {[0, 25, 80, 100].map((value) => (
        <Progress key={value} value={value} label={`${value} of 100`} showValue />
      ))}
      <Progress value={3} max={4} label="Three of four" showValue />
    </div>
  );
}
