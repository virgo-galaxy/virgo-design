import { Select } from '@virgo-design/ui';

import styles from './SelectDisabledOptionExample.module.scss';

export default function App() {
  return (
    <div className={styles.root!}>
      <Select defaultValue="homelab">
        <Select.Trigger aria-label="Environment" />
        <Select.Content>
          <Select.Option value="local">Local</Select.Option>
          <Select.Option value="homelab">Home Lab</Select.Option>
          <Select.Option value="production" disabled>
            Production
          </Select.Option>
        </Select.Content>
      </Select>
    </div>
  );
}
