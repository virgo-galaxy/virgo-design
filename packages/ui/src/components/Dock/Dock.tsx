import { LockIcon, PinIcon, UnlockIcon, UnpinIcon } from '@virgo-design/icons';
import { Dock as PrimitiveDock, type DockState } from '@virgo-design/primitives';
import { forwardRef } from 'react';

import { useControlLabels } from '../../shared/control-labels';
import { Button } from '../Button';
import { Tooltip } from '../Tooltip';
import { useTooltipPresentation } from '../Tooltip/TooltipContext';
import styles from './Dock.module.scss';
import type {
  DockBoundaryProps,
  DockContentProps,
  DockHandleProps,
  DockRootProps,
} from './Dock.types';

function classes(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(' ');
}

const Boundary = forwardRef<HTMLDivElement, DockBoundaryProps>(function DockBoundary(
  { className, ...props },
  forwardedRef,
) {
  return (
    <PrimitiveDock.Boundary
      {...props}
      ref={forwardedRef}
      className={classes(styles.boundary, className)}
    />
  );
});
Boundary.displayName = 'Dock.Boundary';

const Root = forwardRef<HTMLDivElement, DockRootProps>(function DockRoot(
  { className, chromeVisibility = 'interaction', children, ...props },
  forwardedRef,
) {
  return (
    <PrimitiveDock.Root
      {...props}
      ref={forwardedRef}
      className={classes(styles.root, className)}
      data-chrome-visibility={chromeVisibility}
    >
      {(state) => (
        <>
          {typeof children === 'function' ? children(state) : children}
          <DockControls state={state} disabled={props.disabled} />
        </>
      )}
    </PrimitiveDock.Root>
  );
});
Root.displayName = 'Dock';

function DockControls({ state, disabled }: { state: DockState; disabled: boolean | undefined }) {
  const labels = useControlLabels();
  const tooltipPresentation = useTooltipPresentation();
  const { locked, pinned, setLocked, setPinned } = state;
  const actions = [
    {
      id: 'lock',
      label: locked ? labels.unlockDock : labels.lockDock,
      hint: locked ? labels.unlockMovement : labels.lockMovement,
      active: locked,
      Icon: locked ? UnlockIcon : LockIcon,
      onClick: () => setLocked(!locked),
    },
    {
      id: 'pin',
      label: pinned ? labels.unpinDock : labels.pinDock,
      hint: pinned ? labels.unpinViewport : labels.pinViewport,
      active: pinned,
      Icon: pinned ? UnpinIcon : PinIcon,
      onClick: () => setPinned(!pinned),
    },
  ];
  return (
    <div className={styles.controls} role="group" aria-label={labels.dockControls}>
      {actions.map(({ id, label, hint, active, Icon, onClick }) => (
        <Tooltip key={id} disabled={disabled ?? false} closeOnClick={false}>
          <Tooltip.Trigger
            disabled={disabled}
            aria-label={label}
            aria-pressed={active}
            onClick={onClick}
            render={(triggerProps) => (
              <Button {...triggerProps} iconOnly variant="text" size="small" aria-label={label}>
                <Icon aria-hidden="true" />
              </Button>
            )}
          />
          <Tooltip.Content
            size={tooltipPresentation.size ?? 'small'}
            arrow={tooltipPresentation.arrow ?? false}
          >
            {hint}
          </Tooltip.Content>
        </Tooltip>
      ))}
    </div>
  );
}

const Handle = forwardRef<HTMLButtonElement, DockHandleProps>(function DockHandle(
  { className, children, ...props },
  forwardedRef,
) {
  return (
    <PrimitiveDock.Handle
      {...props}
      ref={forwardedRef}
      className={classes(styles.handle, className)}
    >
      {children ?? <span className={styles.grip} aria-hidden="true" />}
    </PrimitiveDock.Handle>
  );
});
Handle.displayName = 'Dock.Handle';

const Content = forwardRef<HTMLDivElement, DockContentProps>(function DockContent(
  { className, ...props },
  forwardedRef,
) {
  return (
    <PrimitiveDock.Content
      {...props}
      ref={forwardedRef}
      className={classes(styles.content, className)}
    />
  );
});
Content.displayName = 'Dock.Content';

export const Dock = Object.assign(Root, { Root, Boundary, Handle, Content });
