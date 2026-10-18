import { useRef, useState } from 'react';

import { useOverlayTooltip } from '@/hooks/overlay/use-overlay-tooltip';
import type { AppPreferences } from '@/preferences';

export function useSettingsDrawer(updatePreferences: (patch: Partial<AppPreferences>) => void) {
  const [open, setOpen] = useState(false);
  const tooltip = useOverlayTooltip(open);
  const [anchorY, setAnchorY] = useState(58);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const restoringFocus = useRef(false);

  function onOpenChange(nextOpen: boolean) {
    restoringFocus.current = !nextOpen;
    tooltip.suppress();
    setOpen(nextOpen);
  }

  function onHeaderChange(showHeader: boolean, nextAnchorY: number) {
    updatePreferences({ showHeader });

    if (!showHeader) {
      restoringFocus.current = true;
      tooltip.suppress();
      setAnchorY(nextAnchorY);
      setOpen(false);
    }
  }

  function onCloseAutoFocus(event: Event) {
    event.preventDefault();

    queueMicrotask(() => {
      restoringFocus.current = true;
      triggerRef.current?.focus({ preventScroll: true });
      restoringFocus.current = false;
    });
  }

  const triggerProps = {
    ref: triggerRef,
    tooltipOpen: tooltip.tooltipProps.open,
    onTooltipOpenChange: tooltip.tooltipProps.onOpenChange,
    onTooltipInteraction: () => {
      if (!restoringFocus.current) tooltip.resumeOnInteraction();
    },
  };

  return { open, anchorY, triggerProps, onOpenChange, onHeaderChange, onCloseAutoFocus };
}
