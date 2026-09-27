import { Select } from '@virgo-design/ui';

import styles from './SelectLongContentExample.module.scss';

export default function App() {
  return (
    <div className={styles.root!}>
      <Select defaultValue="long">
        <Select.Trigger aria-label="Long project" />
        <Select.Content>
          <Select.Option value="short">Short name</Select.Option>
          <Select.Option value="long">
            A very long project name that should not widen the page
          </Select.Option>
          <Select.Option value="other">Another project</Select.Option>
        </Select.Content>
      </Select>
    </div>
  );
}
