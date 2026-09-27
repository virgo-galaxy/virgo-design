import { Switch } from '@virgo-design/ui';

import styles from './SwitchDisabledExample.module.scss';

export default function App() {
  return (
    <div className={styles.root!}>
      {(['toggle', 'fader'] as const).map((appearance) => (
        <div key={appearance} className={styles.stage!}>
          <span>{appearance}</span>
          <Switch aria-label={`Disabled ${appearance} off`} appearance={appearance} disabled />
          <Switch
            aria-label={`Disabled ${appearance} on`}
            appearance={appearance}
            defaultChecked
            disabled
          />
        </div>
      ))}
    </div>
  );
}
