import { SegmentedControl } from '@virgo-design/ui';

export default function App() {
  return (
    <div style={{ display: 'grid', gap: 24 }}>
      {(['outline', 'solid', 'soft'] as const).map((variant) => (
        <div key={variant} style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
          {(['none', 'slide'] as const).map((motion) => (
            <div key={motion} style={{ display: 'grid', gap: 8 }}>
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
