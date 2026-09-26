import { SegmentedControl } from '@virgo-design/ui';

export default function App() {
  return (
    <div style={{ display: 'grid', justifyItems: 'start', gap: 24 }}>
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
