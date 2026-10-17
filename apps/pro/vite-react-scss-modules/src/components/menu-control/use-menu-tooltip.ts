import { useRef, useState } from 'react';

export function useMenuTooltip() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const tooltipSuppressed = useRef(false);

  function onMenuOpenChange(open: boolean) {
    tooltipSuppressed.current = true;
    setTooltipOpen(false);
    setMenuOpen(open);
  }

  function onTooltipOpenChange(open: boolean) {
    setTooltipOpen(open && !menuOpen && !tooltipSuppressed.current);
  }

  function onTriggerPointerEnter() {
    if (!menuOpen) tooltipSuppressed.current = false;
  }

  function onTriggerBlur() {
    if (!menuOpen) tooltipSuppressed.current = false;

    setTooltipOpen(false);
  }

  return {
    menuOpen,
    tooltipOpen: !menuOpen && tooltipOpen,
    onMenuOpenChange,
    onTooltipOpenChange,
    onTriggerPointerEnter,
    onTriggerBlur,
  };
}
