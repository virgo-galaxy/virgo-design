import * as styles from './classes';
import { Counter } from './Counter';

export function App() {
  return (
    <main className={styles.page}>
      <h1 className={styles.heading}>Hello Virgo</h1>
      <Counter />
    </main>
  );
}
