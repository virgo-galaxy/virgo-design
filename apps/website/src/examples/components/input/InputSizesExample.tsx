import { Input } from '@virgo-design/ui';

import styles from './InputSizesExample.module.scss';

export default function App() {
  return (
    <div className={styles.root!}>
      {(['mini', 'small', 'medium', 'large'] as const).map((size) => (
        <Input key={size} aria-label={`${size} input`} placeholder={`${size} input`} size={size} />
      ))}
    </div>
  );
}
