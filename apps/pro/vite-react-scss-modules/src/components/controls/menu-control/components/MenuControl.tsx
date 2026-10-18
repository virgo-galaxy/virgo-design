import { Dropdown, Tooltip } from '@virgo-design/ui';
import { type ReactNode, useState } from 'react';

import { useOverlayTooltip } from '@/hooks/overlay/use-overlay-tooltip';

interface MenuControlProps {
  label: string;
  icon: ReactNode;
  children: ReactNode;
}

export function MenuControl({ label, icon, children }: MenuControlProps) {
  const [open, setOpen] = useState(false);
  const tooltip = useOverlayTooltip(open);

  return (
    <Dropdown
      trigger="click"
      open={open}
      onOpenChange={(next) => {
        tooltip.suppress();
        setOpen(next);
      }}
    >
      <Tooltip {...tooltip.tooltipProps}>
        <Tooltip.Trigger
          {...tooltip.triggerProps}
          render={(triggerProps) => (
            <Dropdown.Trigger {...triggerProps} iconOnly variant="text" aria-label={label}>
              {icon}
            </Dropdown.Trigger>
          )}
        />
        <Tooltip.Content placement="bottom">{label}</Tooltip.Content>
      </Tooltip>
      {children}
    </Dropdown>
  );
}
