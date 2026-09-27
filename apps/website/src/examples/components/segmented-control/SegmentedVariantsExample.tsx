import { SegmentedControl } from '@virgo-design/ui';

import styles from './SegmentedVariantsExample.module.scss';

export default function App() {
  return (
    <div className={styles.root!}>
      {(['outline', 'solid', 'soft'] as const).map((variant) => (
        <SegmentedControl
          key={variant}
          variant={variant}
          defaultValue="pear"
          aria-label={`${variant} fruit`}
        >
          <SegmentedControl.Item value="apple">Apple</SegmentedControl.Item>
          <SegmentedControl.Item value="pear">Pear</SegmentedControl.Item>
          <SegmentedControl.Item value="orange">Orange</SegmentedControl.Item>
        </SegmentedControl>
      ))}
    </div>
  );
}
