import { SettingsIcon } from '@virgo-design/icons';
import { Button, Drawer, Tooltip } from '@virgo-design/ui';
import { type CSSProperties, forwardRef } from 'react';
import { useTranslation } from 'react-i18next';

import * as styles from './SettingsDrawer.css';

export const SettingsTrigger = forwardRef<
  HTMLButtonElement,
  {
    anchorY?: number;
    tooltipOpen: boolean;
    onTooltipOpenChange: (open: boolean) => void;
    onTooltipInteraction: () => void;
  }
>(function SettingsTrigger(
  { anchorY, tooltipOpen, onTooltipOpenChange, onTooltipInteraction },
  ref,
) {
  const { t } = useTranslation();
  const docked = anchorY !== undefined;

  return (
    <Tooltip open={tooltipOpen} onOpenChange={onTooltipOpenChange}>
      <Tooltip.Trigger
        ref={ref}
        onFocus={onTooltipInteraction}
        onPointerMove={(event) => {
          if (event.pointerType === 'mouse' && (event.movementX !== 0 || event.movementY !== 0))
            onTooltipInteraction();
        }}
        render={(tooltipProps) => (
          <Drawer.Trigger
            {...tooltipProps}
            render={(props) => (
              <Button
                {...props}
                iconOnly
                size="medium"
                variant={docked ? 'primary' : 'text'}
                aria-label={t('settings.settings')}
                {...(docked
                  ? {
                      className: styles.edgeTrigger,
                      style: { '--settings-anchor-y': `${anchorY}px` } as CSSProperties,
                    }
                  : {})}
              >
                <SettingsIcon animated={docked ? 'always' : false} />
              </Button>
            )}
          />
        )}
      />
      <Tooltip.Content placement={docked ? 'left' : 'bottom'}>
        {t('settings.settings')}
      </Tooltip.Content>
    </Tooltip>
  );
});
