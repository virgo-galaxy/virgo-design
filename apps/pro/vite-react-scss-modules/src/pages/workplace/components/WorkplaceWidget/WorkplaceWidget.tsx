import { CloseIcon, MaximizeIcon, MinusIcon } from '@virgo-design/icons';
import { Button, Card, Collapsible, Tooltip } from '@virgo-design/ui';
import { type ReactNode, type Ref, useEffect, useId, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './WorkplaceWidget.module.scss';

export type WorkplaceWidgetState = 'expanded' | 'minimized' | 'removing' | 'removed';

// Workplace composition: Card supplies the surface, Collapsible owns disclosure and motion.
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
  const toggleLabel = `${open ? 'Minimize' : 'Expand'} ${title}`;

  useEffect(() => {
    if (visible || !presenceRef.current) return;
    // Also finish removal when reduced motion or a cancelled transition emits no end event.
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
    <Collapsible open={visible} className={styles.widgetShell}>
      <Collapsible.Content
        ref={presenceRef}
        motion="collapse"
        aria-labelledby={titleId}
        className={styles.widgetPresence}
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
        <div className={styles.widgetSpacing}>
          <Card variant="outlined" className={styles.widgetCard}>
            <Collapsible open={open} onOpenChange={onToggle} className={styles.widgetDisclosure}>
              <Card.Header className={styles.widgetHeader}>
                <Card.Title as="h2" id={titleId}>
                  {title}
                </Card.Title>
                <Button.Group layout="custom" className={styles.widgetActions}>
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
                              className={[tooltipProps.className, styles.widgetControl]
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
                          className={styles.widgetControl}
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
                className={styles.widgetBody}
              >
                <Card.Body className={styles.widgetBodyInner}>
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
