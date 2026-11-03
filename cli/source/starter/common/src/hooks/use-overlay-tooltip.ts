import { useRef, useState } from 'react';

export function useOverlayTooltip(overlayOpen: boolean) {
  const [open, setOpen] = useState(false);
  const suppressed = useRef(false);

  return {
    suppress() {
      suppressed.current = true;
      setOpen(false);
    },
    resumeOnInteraction() {
      if (!overlayOpen && suppressed.current) {
        suppressed.current = false;
        setOpen(true);
      }
    },
    tooltipProps: {
      open: !overlayOpen && open,
      onOpenChange(next: boolean) {
        setOpen(next && !overlayOpen && !suppressed.current);
      },
    },
    triggerProps: {
      onPointerEnter() {
        if (!overlayOpen) suppressed.current = false;
      },
      onBlur() {
        if (!overlayOpen) suppressed.current = false;

        setOpen(false);
      },
    },
  };
}
