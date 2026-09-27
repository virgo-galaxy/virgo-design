import { Switch } from '@virgo-design/ui';

import styles from './SwitchAppearancesExample.module.scss';

export default function App() {
  return (
    <div className={styles.root!}>
      {(['toggle', 'fader'] as const).map((appearance) => (
        <div key={appearance} className={styles.stage!}>
          <span>{appearance}</span>
          <Switch aria-label={`${appearance} off`} appearance={appearance} />
          <Switch aria-label={`${appearance} on`} appearance={appearance} defaultChecked />
        </div>
      ))}
    </div>
  );
}
