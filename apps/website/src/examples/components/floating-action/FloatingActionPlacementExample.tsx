import { SettingsIcon } from '@virgo-design/icons';
import { FloatingAction } from '@virgo-design/ui';

import styles from './FloatingActionPlacementExample.module.scss';

export default function App() {
  return (
    <div className={styles.root!}>
      {(['top', 'right', 'bottom', 'left'] as const).map((placement) => (
        <div key={placement} className={styles.stage!}>
          <FloatingAction.Group>
            <FloatingAction.Trigger aria-label={`Toggle ${placement} actions`} />
            <FloatingAction.Content placement={placement} aria-label={`${placement} actions`}>
              <FloatingAction aria-label={`${placement} settings`}>
                <SettingsIcon />
              </FloatingAction>
            </FloatingAction.Content>
          </FloatingAction.Group>
          <span>{placement}</span>
        </div>
      ))}
    </div>
  );
}
