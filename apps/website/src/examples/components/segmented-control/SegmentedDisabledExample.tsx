import './SegmentedDisabledExample.module.scss';

import { SegmentedControl } from '@virgo-design/ui';

export default function App() {
  return (
    <SegmentedControl defaultValue="code" aria-label="Available views">
      <SegmentedControl.Item value="code">Code</SegmentedControl.Item>
      <SegmentedControl.Item value="preview">Preview</SegmentedControl.Item>
      <SegmentedControl.Item value="deploy" disabled>
        Deploy
      </SegmentedControl.Item>
    </SegmentedControl>
  );
}
