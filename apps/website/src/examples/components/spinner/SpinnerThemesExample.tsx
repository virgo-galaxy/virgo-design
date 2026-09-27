import { Spinner } from '@virgo-design/ui';

import styles from './SpinnerThemesExample.module.scss';

export default function App() {
  return (
    <div className={styles.root!}>
      {(['light', 'dark'] as const).map((theme) => (
        <div key={theme} data-theme={theme} className={styles.stage!}>
          <Spinner intent="neutral" aria-label={`Loading in ${theme} theme`} />
        </div>
      ))}
    </div>
  );
}
