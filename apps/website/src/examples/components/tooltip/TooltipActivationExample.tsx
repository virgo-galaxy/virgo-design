import { Tooltip } from '@virgo-design/ui';
import { useId, useState } from 'react';

export default function App() {
  const detailsId = useId();
  const [expanded, setExpanded] = useState(false);
  return (
    <div style={{ display: 'grid', justifyItems: 'start', gap: 16 }}>
      <Tooltip closeOnClick={false}>
        <Tooltip.Trigger
          aria-expanded={expanded}
          aria-controls={detailsId}
          onClick={() => setExpanded((value) => !value)}
        >
          Toggle details
        </Tooltip.Trigger>
        <Tooltip.Content size="small">{expanded ? 'Hide details' : 'Show details'}</Tooltip.Content>
      </Tooltip>
      <span id={detailsId} hidden={!expanded}>
        The description changes without closing the tooltip.
      </span>
    </div>
  );
}
