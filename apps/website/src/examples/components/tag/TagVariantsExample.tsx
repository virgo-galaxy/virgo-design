import { Tag } from '@virgo-design/ui';

import styles from './TagVariantsExample.module.scss';

export default function App() {
  return (
    <div className={styles.root!}>
      {(['soft', 'solid', 'outline'] as const).map((variant) => (
        <Tag key={variant} variant={variant} intent="brand">
          {variant}
        </Tag>
      ))}
    </div>
  );
}
