import { Select } from '@virgo-design/ui';

import styles from './SelectSizesExample.module.scss';

export default function App() {
  return (
    <div className={styles.root!}>
      {(['mini', 'small', 'medium', 'large'] as const).map((size) => (
        <Select key={size} defaultValue="design" size={size}>
          <Select.Trigger aria-label={`${size} project`} />
          <Select.Content>
            <Select.Option value="design">Virgo Design</Select.Option>
            <Select.Option value="docs">Cloud Docs</Select.Option>
            <Select.Option value="runtime">Runtime</Select.Option>
          </Select.Content>
        </Select>
      ))}
    </div>
  );
}
