import { Dropdown, Switch } from '@virgo-design/ui';
import { useState } from 'react';

import styles from './DropdownPlacementExample.module.scss';

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
  const [arrow, setArrow] = useState(true);
  const [action, setAction] = useState('Choose a positioned action.');
  return (
    <div className={styles.root!}>
      <Switch checked={arrow} onCheckedChange={setArrow}>
        Show arrow
      </Switch>
      <div className={styles.stage!} role="group" aria-label="Twelve placements">
        {placements.map((placement) => (
          <Dropdown key={placement} size="small">
            <Dropdown.Trigger indicator={false}>{placement}</Dropdown.Trigger>
            <Dropdown.Content placement={placement} arrow={arrow}>
              <Dropdown.Item onSelect={() => setAction(`${placement}: first item selected`)}>
                First menu item
              </Dropdown.Item>
              <Dropdown.Item onSelect={() => setAction(`${placement}: second item selected`)}>
                Second menu item
              </Dropdown.Item>
              <Dropdown.Item onSelect={() => setAction(`${placement}: third item selected`)}>
                Third menu item
              </Dropdown.Item>
            </Dropdown.Content>
          </Dropdown>
        ))}
      </div>
      <span role="status">{action}</span>
    </div>
  );
}
