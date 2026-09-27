import { Textarea } from '@virgo-design/ui';

import styles from './TextareaSizesExample.module.scss';

export default function App() {
  return (
    <div className={styles.root!}>
      {(['mini', 'small', 'medium', 'large'] as const).map((size) => (
        <Textarea
          key={size}
          aria-label={`${size} textarea`}
          placeholder={`${size} multiline input`}
          rows={3}
          size={size}
        />
      ))}
    </div>
  );
}
