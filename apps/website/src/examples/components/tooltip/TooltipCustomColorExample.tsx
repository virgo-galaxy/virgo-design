import { Tooltip } from '@virgo-design/ui';
import { type CSSProperties } from 'react';

const customTone = {
  '--tooltip-background': 'var(--vd-purple-6)',
  '--tooltip-foreground': 'var(--vd-neutral-1)',
} as CSSProperties;

export default function App() {
  return (
    <Tooltip>
      <Tooltip.Trigger size="small">Custom violet</Tooltip.Trigger>
      <Tooltip.Content style={customTone}>Custom background and foreground.</Tooltip.Content>
    </Tooltip>
  );
}
