import { Menu } from '@virgo-design/ui';
import { useState } from 'react';

import styles from './MenuRadioExample.module.scss';

export default function App() {
  const [zoom, setZoom] = useState('100');
  return (
    <div className={styles.root!}>
      <Menu>
        <Menu.Trigger>Zoom options</Menu.Trigger>
        <Menu.Content>
          <Menu.Group label="Zoom">
            <Menu.RadioGroup value={zoom} onValueChange={setZoom} aria-label="Zoom">
              {['50', '100', '200'].map((value) => (
                <Menu.RadioItem key={value} value={value}>
                  {value}%
                </Menu.RadioItem>
              ))}
            </Menu.RadioGroup>
          </Menu.Group>
        </Menu.Content>
      </Menu>
      <span role="status">Zoom {zoom}%</span>
    </div>
  );
}
