import { Popover } from '@virgo-design/ui';

import styles from './PopoverPlacementExample.module.scss';

const placements = [
  'topLeft',
  'top',
  'topRight',
  'leftTop',
  'left',
  'leftBottom',
  'rightTop',
  'right',
  'rightBottom',
  'bottomLeft',
  'bottom',
  'bottomRight',
] as const;

export default function App() {
  return (
    <div className={styles.root!}>
      <div className={styles.placements!} role="group" aria-label="Twelve popover placements">
        {placements.map((placement) => (
          <Popover key={placement} className={styles[placement]!}>
            <Popover.Trigger size="small">{placement}</Popover.Trigger>
            <Popover.Content placement={placement} offset={12} arrow>
              <div className={styles.stage!}>
                <strong>{placement}</strong>
                <p className={styles.text!}>
                  Scroll or resize to see the panel follow its trigger.
                </p>
                <Popover.Close />
              </div>
            </Popover.Content>
          </Popover>
        ))}
      </div>
    </div>
  );
}
