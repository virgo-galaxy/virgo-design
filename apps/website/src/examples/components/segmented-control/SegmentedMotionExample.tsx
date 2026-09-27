import { SegmentedControl } from '@virgo-design/ui';

import styles from './SegmentedMotionExample.module.scss';

export default function App() {
  return (
    <div className={styles.root!}>
      {(['outline', 'solid', 'soft'] as const).map((variant) => (
        <div key={variant} className={styles.stage!}>
          {(['none', 'slide'] as const).map((motion) => (
            <div key={motion} className={styles.stage2!}>
              <span>
                {variant} · {motion}
              </span>
              <SegmentedControl
                variant={variant}
                motion={motion}
                defaultValue="code"
                aria-label={`${variant} ${motion} motion`}
              >
                <SegmentedControl.Item value="code">Code</SegmentedControl.Item>
                <SegmentedControl.Item value="preview">Preview</SegmentedControl.Item>
              </SegmentedControl>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
