import { Dropdown, Tooltip } from '@virgo-design/ui';
import type { ReactNode } from 'react';

import { useMenuTooltip } from './use-menu-tooltip';

interface MenuControlProps {
  label: string;
  icon: ReactNode;
  children: ReactNode;
}

export function MenuControl({ label, icon, children }: MenuControlProps) {
  const interaction = useMenuTooltip();

  return (
    <Dropdown
      trigger="click"
      open={interaction.menuOpen}
      onOpenChange={interaction.onMenuOpenChange}
    >
      <Tooltip open={interaction.tooltipOpen} onOpenChange={interaction.onTooltipOpenChange}>
        <Tooltip.Trigger
          onPointerEnter={interaction.onTriggerPointerEnter}
          onBlur={interaction.onTriggerBlur}
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
