import { CheckIcon, LayoutIcon, SettingsIcon } from '@virgo-design/icons';
import { Tag } from '@virgo-design/ui';

import styles from './TagIconsExample.module.scss';

export default function App() {
  return (
    <div className={styles.root!}>
      <Tag icon={<LayoutIcon />} intent="info">
        Workspace
      </Tag>
      <Tag icon={<CheckIcon />} intent="success" variant="outline">
        Stable
      </Tag>
      <Tag icon={<SettingsIcon />} intent="warning">
        Configuration
      </Tag>
    </div>
  );
}
