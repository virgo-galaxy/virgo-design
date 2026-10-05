import { useRef, useState } from 'react';

// Returning focus from a column popover is not a new request for its tooltip.
export function useColumnControlTooltip(popoverOpen: boolean, enabled: boolean) {
  const [open, setOpen] = useState(false);
  const suppressed = useRef(false);
  return {
    dismiss() {
      suppressed.current = true;
      setOpen(false);
    },
    tooltipProps: {
      open: enabled && !popoverOpen && open,
      onOpenChange(next: boolean) {
        setOpen(next && enabled && !popoverOpen && !suppressed.current);
      },
    },
    triggerProps: {
      onPointerEnter() {
        if (!popoverOpen) suppressed.current = false;
      },
      onBlur() {
        if (!popoverOpen) suppressed.current = false;
        setOpen(false);
      },
    },
  };
}
