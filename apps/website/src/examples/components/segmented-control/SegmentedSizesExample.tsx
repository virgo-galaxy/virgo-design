import { SegmentedControl } from '@virgo-design/ui';

import styles from './SegmentedSizesExample.module.scss';

export default function App() {
  return (
    <div className={styles.root!}>
      {(['mini', 'small', 'medium', 'large'] as const).map((size) => (
        <SegmentedControl
          key={size}
          size={size}
          variant="solid"
          defaultValue="light"
          aria-label={`${size} theme`}
        >
          <SegmentedControl.Item value="light">Light</SegmentedControl.Item>
          <SegmentedControl.Item value="dark">Dark</SegmentedControl.Item>
        </SegmentedControl>
      ))}
    </div>
  );
}
