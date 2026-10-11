import { Tag } from '@virgo-design/ui';

import styles from './TagIntentsExample.module.scss';

export default function App() {
  return (
    <div className={styles.root!}>
      {(['neutral', 'brand', 'accent', 'success', 'warning', 'danger', 'info'] as const).map(
        (intent) => (
          <Tag key={intent} intent={intent}>
            {intent}
          </Tag>
        ),
      )}
    </div>
  );
}
