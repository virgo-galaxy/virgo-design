import { Select } from '@virgo-design/ui';

import styles from './SelectKeyboardExample.module.scss';

export default function App() {
  return (
    <div className={styles.root!}>
      <Select>
        <Select.Trigger aria-label="Keyboard project" placeholder="Focus, then use ArrowDown" />
        <Select.Content>
          <Select.Option value="design">Virgo Design</Select.Option>
          <Select.Option value="docs">Cloud Docs</Select.Option>
          <Select.Option value="runtime">Runtime</Select.Option>
        </Select.Content>
      </Select>
    </div>
  );
}
