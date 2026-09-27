import { Tag } from '@virgo-design/ui';

import styles from './TagSizesExample.module.scss';

export default function App() {
  return (
    <div className={styles.root!}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <Tag key={size} size={size}>
          {size.toUpperCase()}
        </Tag>
      ))}
    </div>
  );
}
