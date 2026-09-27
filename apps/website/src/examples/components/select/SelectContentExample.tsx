import { Select } from '@virgo-design/ui';

import styles from './SelectContentExample.module.scss';

export default function App() {
  return (
    <div className={styles.root!}>
      <Select>
        <Select.Trigger aria-label="Choose project" placeholder="Choose a project" />
        <Select.Content>
          <Select.Option value="design">Virgo Design</Select.Option>
          <Select.Option value="docs">Cloud Docs</Select.Option>
          <Select.Option value="runtime">Runtime</Select.Option>
        </Select.Content>
      </Select>
      <Select defaultValue="docs">
        <Select.Trigger aria-label="Selected project" />
        <Select.Content>
          <Select.Option value="design">Virgo Design</Select.Option>
          <Select.Option value="docs">Cloud Docs</Select.Option>
          <Select.Option value="runtime">Runtime</Select.Option>
        </Select.Content>
      </Select>
    </div>
  );
}
