import { SegmentedControl } from '@virgo-design/ui';

import styles from './SegmentedContentExample.module.scss';

export default function App() {
  return (
    <div className={styles.root!}>
      <SegmentedControl defaultValue="code" aria-label="View mode">
        <SegmentedControl.Item value="code">Code</SegmentedControl.Item>
        <SegmentedControl.Item value="preview">Preview</SegmentedControl.Item>
      </SegmentedControl>
      <SegmentedControl defaultValue="week" aria-label="Period">
        <SegmentedControl.Item value="day">Day</SegmentedControl.Item>
        <SegmentedControl.Item value="week">Week</SegmentedControl.Item>
        <SegmentedControl.Item value="month">Month</SegmentedControl.Item>
      </SegmentedControl>
    </div>
  );
}
