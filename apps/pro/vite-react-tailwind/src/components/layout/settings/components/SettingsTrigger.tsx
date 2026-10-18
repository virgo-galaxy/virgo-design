import { SettingsIcon } from '@virgo-design/icons';
import { Button, Drawer, Tooltip } from '@virgo-design/ui';
import { type CSSProperties, forwardRef } from 'react';
import { useTranslation } from 'react-i18next';

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
                      className:
                        "fixed [top:clamp(_var(--vd-spacing-8),_var(--settings-anchor-y)_-_var(--vd-sizing-36)_/_2,_100dvh_-_var(--vd-sizing-36)_-_var(--vd-spacing-8)_)] [right:0] [z-index:5] [width:var(--vd-sizing-36)] [height:var(--vd-sizing-36)] [border-radius:var(--vd-shape-radius-4,_var(--vd-radius-4))_0_0_var(--vd-shape-radius-4,_var(--vd-radius-4))] [&_>_[data-slot='icon']]:[--button-icon-size:var(--vd-sizing-28)] focus-visible:[outline-offset:-3px]",
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
