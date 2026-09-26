import { Tooltip } from '@virgo-design/ui';
import { useEffect, useState } from 'react';

export default function App() {
  const [open, setOpen] = useState(false);
  const [detailed, setDetailed] = useState(false);
  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(() => setDetailed(true), 900);
    return () => clearTimeout(timer);
  }, [open]);
  return (
    <Tooltip
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) setDetailed(false);
      }}
    >
      <Tooltip.Trigger>Changing description</Tooltip.Trigger>
      <Tooltip.Content placement="topRight">
        {detailed
          ? 'Workspace details are ready. The tooltip keeps its arrow connected as this description becomes longer.'
          : 'Workspace details'}
      </Tooltip.Content>
    </Tooltip>
  );
}
