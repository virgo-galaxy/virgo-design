import { BellIcon } from '@virgo-design/icons';
import { Badge, Button, Popover, Tooltip } from '@virgo-design/ui';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useOverlayTooltip } from '@/hooks/overlay/use-overlay-tooltip';

import { useNotificationInbox } from '../hooks/use-notification-inbox';
import { NotificationInbox } from './NotificationInbox';

export function NotificationControl({
  showOverlayArrows,
  indicator,
}: {
  showOverlayArrows: boolean;
  indicator: 'dot' | 'count' | 'none';
}) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const inbox = useNotificationInbox();
  const tooltip = useOverlayTooltip(open);
  const restoringFocus = useRef(false);

  const showFreshTooltip = () => {
    if (!restoringFocus.current) tooltip.resumeOnInteraction();
  };

  return (
    <Popover
      open={open}
      onOpenChange={(next) => {
        tooltip.suppress();
        restoringFocus.current = !next;
        setOpen(next);

        if (next) inbox.retry();
        if (!next)
          queueMicrotask(() => {
            restoringFocus.current = false;
          });
      }}
    >
      <Tooltip {...tooltip.tooltipProps}>
        <Tooltip.Trigger
          onFocus={showFreshTooltip}
          onPointerMove={(event) => {
            if (event.pointerType === 'mouse' && (event.movementX !== 0 || event.movementY !== 0))
              showFreshTooltip();
          }}
          render={(tooltipProps) => (
            <Popover.Trigger
              {...tooltipProps}
              render={(props) => (
                <Button {...props} iconOnly variant="text" aria-label={t('notifications.title')}>
                  <Badge
                    dot={indicator === 'dot' && Boolean(inbox.data?.unreadCount)}
                    {...(indicator === 'count' ? { count: inbox.data?.unreadCount ?? 0 } : {})}
                    intent="danger"
                    className={[
                      'w-full h-full',
                      '[&_>_[data-intent]:not([data-dot])]:[min-width:calc(var(--vd-sizing-12)_+_var(--vd-spacing-2))]',
                      '[&_>_[data-intent]:not([data-dot])]:[height:calc(var(--vd-sizing-12)_+_var(--vd-spacing-2))] [&_>_[data-intent]:not([data-dot])]:px-2',
                      '[&_>_[data-intent]:not([data-dot])]:[border-width:var(--vd-stroke-width,_var(--vd-border-width-1))]',
                      '[&_>_[data-intent]:not([data-dot])]:text-(length:--vd-font-size-10)',
                      '[&_>_[data-intent]:not([data-dot])]:[line-height:var(--vd-sizing-12)] [&_>_svg]:w-full [&_>_svg]:h-full',
                    ].join(' ')}
                  >
                    <BellIcon />
                  </Badge>
                </Button>
              )}
            />
          )}
        />
        <Tooltip.Content placement="bottom">{t('notifications.title')}</Tooltip.Content>
      </Tooltip>
      <Popover.Content
        className="[width:min(380px,_100vw_-_24px)] [font-size:13px]"
        placement="bottomEnd"
        aria-label={t('notifications.title')}
        arrow={showOverlayArrows}
      >
        <NotificationInbox inbox={inbox} onNavigate={() => setOpen(false)} />
      </Popover.Content>
    </Popover>
  );
}
