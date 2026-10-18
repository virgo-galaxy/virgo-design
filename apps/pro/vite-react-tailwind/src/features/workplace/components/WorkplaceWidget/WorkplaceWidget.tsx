import { CloseIcon, MaximizeIcon, MinusIcon } from '@virgo-design/icons';
import { Button, Card, Collapsible, Tooltip } from '@virgo-design/ui';
import { type ReactNode, type Ref, useEffect, useId, useRef } from 'react';
import { useTranslation } from 'react-i18next';

const widgetControlClassName = [
  'data-[variant=text]:relative data-[variant=text]:[--button-height:var(--vd-sizing-24)]',
  'data-[variant=text]:[width:var(--button-height)] data-[variant=text]:[height:var(--button-height)] data-[variant=text]:p-0',
  'data-[variant=text]:[--button-foreground:var(--vd-icon-secondary)]',
  'data-[variant=text]:[--button-icon-size:var(--pro-window-control-icon-size,_var(--vd-sizing-12))]',
  'data-[variant=text]:[--window-control-background:var(--pro-window-control-collapse-background,_transparent)]',
  "[&[data-variant='text'][data-window-action='collapse']]:[color:var(--pro-window-control-collapse-foreground,_var(--vd-text-primary))]",
  "[&[data-variant='text'][data-window-action='close']]:[--window-control-background:var(--pro-window-control-close-background,_transparent)]",
  "[&[data-variant='text'][data-window-action='close']]:[color:var(--pro-window-control-close-foreground,_var(--vd-icon-secondary))]",
  "[&[data-variant='text']::before]:absolute [&[data-variant='text']::before]:[width:var(--pro-window-control-size)]",
  "[&[data-variant='text']::before]:[height:var(--pro-window-control-size)] [&[data-variant='text']::before]:box-border",
  "[&[data-variant='text']::before]:[border:1px_solid_var(--pro-window-control-border,_transparent)]",
  "[&[data-variant='text']::before]:[border-radius:var(--vd-radius-full)]",
  "[&[data-variant='text']::before]:[background:var(--window-control-background)]",
  "[&[data-variant='text']::before]:[box-shadow:var(--pro-window-control-shadow,_none)]",
  "[&[data-variant='text']::before]:[content:var(--pro-window-control-content)]",
  "[&[data-variant='text']::before]:pointer-events-none [&[data-variant='text']_>_[data-slot='icon']]:relative",
  "[&[data-variant='text']_>_[data-slot='icon']]:[opacity:var(--pro-window-control-symbol-opacity)]",
  "[&[data-variant='text']:focus-visible_>_[data-slot='icon']]:opacity-100",
  "[.pro-workplace-widget-widget-actions:hover_&_>_[data-slot='icon']]:opacity-100",
  "[.pro-workplace-widget-widget-actions:focus-within_&_>_[data-slot='icon']]:opacity-100",
].join(' ');

export type WorkplaceWidgetState = 'expanded' | 'minimized' | 'removing' | 'removed';

export function WorkplaceWidget({
  title,
  description,
  state,
  toggleRef,
  onToggle,
  onRemove,
  onRemoved,
  children,
}: {
  title: string;
  description?: string;
  state: WorkplaceWidgetState;
  toggleRef: Ref<HTMLButtonElement>;
  onToggle: (open: boolean) => void;
  onRemove: () => void;
  onRemoved: () => void;
  children: ReactNode;
}) {
  const { t } = useTranslation();
  const titleId = useId();
  const presenceRef = useRef<HTMLDivElement>(null);
  const open = state === 'expanded';
  const visible = state !== 'removing';
  const toggleLabel = t(open ? 'workplace.minimizeValue' : 'workplace.expandValue', { v0: title });

  useEffect(() => {
    if (visible || !presenceRef.current) return;

    const duration = Math.max(
      ...getComputedStyle(presenceRef.current)
        .transitionDuration.split(',')
        .map((value) =>
          value.trim().endsWith('ms') ? Number.parseFloat(value) : Number.parseFloat(value) * 1000,
        ),
    );

    const timer = window.setTimeout(onRemoved, duration ? duration + 32 : 0);

    return () => window.clearTimeout(timer);
  }, [visible, onRemoved]);

  return (
    <Collapsible
      open={visible}
      className={[
        '[--pro-window-control-content:none] [--pro-window-control-size:14px] [--pro-window-control-collapse-background:initial]',
        '[--pro-window-control-close-background:initial] [--pro-window-control-collapse-foreground:initial]',
        '[--pro-window-control-close-foreground:initial] [--pro-window-control-border:initial] [--pro-window-control-shadow:initial]',
        '[--pro-window-control-symbol-opacity:1] [--pro-window-control-icon-size:initial]',
        "[[data-virgo-theme='glass']_&]:[--pro-window-control-content:'']",
        "[[data-virgo-theme='glass']_&]:[--pro-window-control-collapse-background:linear-gradient(#ffd85d,_#ffbd2e)]",
        "[[data-virgo-theme='glass']_&]:[--pro-window-control-close-background:linear-gradient(#ff827c,_#ff5f57)]",
        "[[data-virgo-theme='glass']_&]:[--pro-window-control-collapse-foreground:#825500]",
        "[[data-virgo-theme='glass']_&]:[--pro-window-control-close-foreground:#8c1813]",
        "[[data-virgo-theme='glass']_&]:[--pro-window-control-border:rgb(0_0_0_/_15%)]",
        "[[data-virgo-theme='glass']_&]:[--pro-window-control-shadow:inset_0_1px_0_rgb(255_255_255_/_25%),_0_1px_2px_rgb(0_0_0_/_12%)]",
        "[[data-virgo-theme='glass']_&]:[--pro-window-control-symbol-opacity:0]",
        "[[data-virgo-theme='glass']_&]:[--pro-window-control-icon-size:10px]",
        '[border:0] rounded-none min-w-0',
      ].join(' ')}
    >
      <Collapsible.Content
        ref={presenceRef}
        motion="collapse"
        aria-labelledby={titleId}
        className="[--collapsible-content-padding:0]"
        onTransitionEnd={(event) => {
          if (
            !visible &&
            event.target === event.currentTarget &&
            event.propertyName === 'opacity'
          ) {
            onRemoved();
          }
        }}
      >
        <div className="[padding-block-end:var(--vd-spacing-20)]">
          <Card
            variant="outlined"
            className={[
              'data-[size=md]:[align-content:start] data-[size=md]:[--card-padding:var(--vd-spacing-20)]',
              'data-[size=md]:[--card-title-font-size:var(--vd-font-size-14)] data-[size=md]:[--card-gap:var(--vd-spacing-20)]',
            ].join(' ')}
          >
            <Collapsible
              open={open}
              onOpenChange={onToggle}
              className="[border:0] rounded-none min-w-0"
            >
              <Card.Header className="flex items-center justify-between gap-8">
                <Card.Title as="h2" id={titleId}>
                  {title}
                </Card.Title>
                <Button.Group
                  layout="custom"
                  className="pro-workplace-widget-widget-actions flex flex-none gap-2"
                >
                  <Tooltip>
                    <Collapsible.Trigger
                      ref={toggleRef}
                      indicator={null}
                      aria-label={toggleLabel}
                      render={(triggerProps) => (
                        <Tooltip.Trigger
                          {...triggerProps}
                          render={(tooltipProps) => (
                            <Button
                              {...tooltipProps}
                              aria-label={toggleLabel}
                              variant="text"
                              size="mini"
                              iconOnly
                              data-window-action="collapse"
                              className={[tooltipProps.className, widgetControlClassName]
                                .filter(Boolean)
                                .join(' ')}
                            >
                              {open ? <MinusIcon /> : <MaximizeIcon />}
                            </Button>
                          )}
                        />
                      )}
                    />
                    <Tooltip.Content placement="top">
                      {open ? t('workplace.minimize') : t('workplace.expand')}
                    </Tooltip.Content>
                  </Tooltip>
                  <Tooltip>
                    <Tooltip.Trigger
                      aria-label={t('workplace.removeValue', { v0: title })}
                      onClick={onRemove}
                      render={(props) => (
                        <Button
                          {...props}
                          aria-label={t('workplace.removeValue', { v0: title })}
                          variant="text"
                          size="mini"
                          iconOnly
                          data-window-action="close"
                          className={widgetControlClassName}
                        >
                          <CloseIcon />
                        </Button>
                      )}
                    />
                    <Tooltip.Content placement="top">
                      {t('workplace.removeFromWorkplace')}
                    </Tooltip.Content>
                  </Tooltip>
                </Button.Group>
              </Card.Header>
              <Collapsible.Content
                motion="collapse"
                aria-labelledby={titleId}
                className="[--collapsible-content-padding:0]"
              >
                <Card.Body className="pt-16 [&_>_p]:mb-16">
                  {description ? <Card.Description>{description}</Card.Description> : null}
                  {children}
                </Card.Body>
              </Collapsible.Content>
            </Collapsible>
          </Card>
        </div>
      </Collapsible.Content>
    </Collapsible>
  );
}
