import {
  createContext,
  type CSSProperties,
  forwardRef,
  type MutableRefObject,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { useControllableState } from '../../internal/hooks/useControllableState';
import { composeRefs } from '../../internal/utils/composeRefs';
import type {
  DockBoundaryProps,
  DockContentProps,
  DockEdge,
  DockHandleProps,
  DockOrientation,
  DockPersistOptions,
  DockPlacement,
  DockRootProps,
  DockSnapDivisions,
  DockState,
} from './Dock.types';

const DEFAULT_PLACEMENT: DockPlacement = { edge: 'top', position: 0 };
const DEFAULT_ALLOWED_EDGES = [
  'top',
  'right',
  'bottom',
  'left',
] as const satisfies readonly DockEdge[];
const DEFAULT_SNAP_DIVISIONS = 12;
const DOCK_PERSISTENCE_PREFIX = 'vd:dock';
const DOCK_PERSISTENCE_VERSION = 'v1';
const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

function orientationForEdge(edge: DockEdge): DockOrientation {
  return edge === 'top' || edge === 'bottom' ? 'horizontal' : 'vertical';
}

function normalizeSnapDivisions(value: DockSnapDivisions | undefined): DockSnapDivisions {
  if (value === false) return false;
  if (value === undefined || !Number.isFinite(value)) return DEFAULT_SNAP_DIVISIONS;
  return Math.max(1, Math.round(value));
}

function normalizePlacement(placement: DockPlacement): DockPlacement {
  const position = Number.isFinite(placement.position) ? placement.position : 0;
  return {
    edge: placement.edge,
    position: Math.min(1, Math.max(0, position)),
  };
}

function isDockEdge(value: unknown): value is DockEdge {
  return value === 'top' || value === 'right' || value === 'bottom' || value === 'left';
}

function persistenceKey(options: DockPersistOptions) {
  const key = options.key.trim();
  return key ? `${DOCK_PERSISTENCE_PREFIX}:${key}:${DOCK_PERSISTENCE_VERSION}` : null;
}

function persistenceStorage(options: DockPersistOptions): Storage | null {
  if (typeof window === 'undefined') return null;
  try {
    return options.storage === 'local' ? window.localStorage : window.sessionStorage;
  } catch {
    return null;
  }
}

function readPersistedPlacement(options: DockPersistOptions): DockPlacement | undefined {
  const key = persistenceKey(options);
  const storage = persistenceStorage(options);
  if (!key || !storage) return undefined;

  try {
    const rawValue = storage.getItem(key);
    if (!rawValue) return undefined;
    const value = JSON.parse(rawValue) as unknown;
    if (!value || typeof value !== 'object') return undefined;

    const candidate = value as Partial<Record<keyof DockPlacement, unknown>>;
    if (!isDockEdge(candidate.edge) || typeof candidate.position !== 'number') return undefined;
    return normalizePlacement({ edge: candidate.edge, position: candidate.position });
  } catch {
    return undefined;
  }
}

function writePersistedPlacement(options: DockPersistOptions, placement: DockPlacement) {
  const key = persistenceKey(options);
  const storage = persistenceStorage(options);
  if (!key || !storage) return;

  try {
    storage.setItem(key, JSON.stringify(placement));
  } catch {
    // Persistence is progressive enhancement. Storage access can be unavailable or quota-limited.
  }
}

function normalizeAllowedEdges(allowedEdges: readonly DockEdge[] | undefined): DockEdge[] {
  const source = allowedEdges?.length ? allowedEdges : DEFAULT_ALLOWED_EDGES;
  return source.filter((edge, index) => source.indexOf(edge) === index);
}

function constrainPlacement(
  placement: DockPlacement,
  allowedEdges: readonly DockEdge[],
): DockPlacement {
  const normalized = normalizePlacement(placement);
  return allowedEdges.includes(normalized.edge)
    ? normalized
    : { ...normalized, edge: allowedEdges[0] ?? DEFAULT_PLACEMENT.edge };
}

function positionForSnapMode(position: number, divisions: DockSnapDivisions) {
  const normalizedPosition = Math.min(1, Math.max(0, position));
  return divisions === false
    ? normalizedPosition
    : Math.round(normalizedPosition * divisions) / divisions;
}

function placementFromPoint(
  clientX: number,
  clientY: number,
  rect: DOMRect,
  divisions: DockSnapDivisions,
  allowedEdges: readonly DockEdge[],
) {
  const x = Math.min(rect.right, Math.max(rect.left, clientX));
  const y = Math.min(rect.bottom, Math.max(rect.top, clientY));
  const distances = [
    { edge: 'top' as const, distance: Math.abs(y - rect.top) },
    { edge: 'right' as const, distance: Math.abs(rect.right - x) },
    { edge: 'bottom' as const, distance: Math.abs(rect.bottom - y) },
    { edge: 'left' as const, distance: Math.abs(x - rect.left) },
  ].filter(({ edge }) => allowedEdges.includes(edge));
  const edge = distances.reduce((closest, candidate) =>
    candidate.distance < closest.distance ? candidate : closest,
  ).edge;
  const rawPosition =
    edge === 'top' || edge === 'bottom'
      ? rect.width > 0
        ? (x - rect.left) / rect.width
        : 0
      : rect.height > 0
        ? (y - rect.top) / rect.height
        : 0;

  return { edge, position: positionForSnapMode(rawPosition, divisions) } satisfies DockPlacement;
}

const DockBoundaryContext = createContext<MutableRefObject<HTMLDivElement | null> | null>(null);

type DockPinnedInsets = { top: number; right: number; bottom: number; left: number };

// Fixed docks use the viewport unless an ancestor establishes a CSS fixed containing block.
// This also lets embedded previews scope a real fixed dock without changing its behavior.
function fixedPlacementRect(root: HTMLDivElement): DOMRect {
  const view = root.ownerDocument.defaultView!;
  for (let ancestor = root.parentElement; ancestor; ancestor = ancestor.parentElement) {
    const style = view.getComputedStyle(ancestor);
    const hasTransform = [
      style.transform,
      style.perspective,
      style.filter,
      style.backdropFilter,
      style.translate,
      style.rotate,
      style.scale,
    ].some((value) => value && value !== 'none');
    if (
      hasTransform ||
      /\b(layout|paint|strict|content)\b/.test(style.contain) ||
      /\b(transform|perspective|filter)\b/.test(style.willChange) ||
      style.contentVisibility === 'auto'
    ) {
      const rect = ancestor.getBoundingClientRect();
      return new DOMRect(
        rect.left + ancestor.clientLeft,
        rect.top + ancestor.clientTop,
        ancestor.clientWidth,
        ancestor.clientHeight,
      );
    }
  }
  return new DOMRect(
    0,
    0,
    root.ownerDocument.documentElement.clientWidth || view.innerWidth,
    root.ownerDocument.documentElement.clientHeight || view.innerHeight,
  );
}

type DockRootContextValue = {
  boundaryRef: MutableRefObject<HTMLDivElement | null> | null;
  rootRef: MutableRefObject<HTMLDivElement | null>;
  placement: DockPlacement;
  orientation: DockOrientation;
  snapDivisions: DockSnapDivisions;
  allowedEdges: readonly DockEdge[];
  disabled: boolean;
  locked: boolean;
  pinned: boolean;
  pinnedInsets: DockPinnedInsets | null;
  dragging: boolean;
  setDragging: (dragging: boolean) => void;
  setPlacement: (placement: DockPlacement) => void;
};

const DockRootContext = createContext<DockRootContextValue | null>(null);

function useDockRootContext(componentName: string) {
  const context = useContext(DockRootContext);
  if (!context) throw new Error(`${componentName} must be used inside Dock.Root.`);
  return context;
}

export const DockBoundary = forwardRef<HTMLDivElement, DockBoundaryProps>(
  function DockBoundary(props, forwardedRef) {
    const boundaryRef = useRef<HTMLDivElement | null>(null);

    return (
      <DockBoundaryContext.Provider value={boundaryRef}>
        <div {...props} ref={composeRefs(forwardedRef, boundaryRef)} data-vd-dock-boundary="" />
      </DockBoundaryContext.Provider>
    );
  },
);

DockBoundary.displayName = 'Dock.Boundary';

export const DockRoot = forwardRef<HTMLDivElement, DockRootProps>(function DockRoot(
  {
    placement: controlledPlacement,
    defaultPlacement = DEFAULT_PLACEMENT,
    onPlacementChange,
    persist,
    allowedEdges: allowedEdgesProp,
    snapDivisions: snapDivisionsProp,
    disabled = false,
    locked: controlledLocked,
    defaultLocked = false,
    onLockedChange,
    pinned: controlledPinned,
    defaultPinned = false,
    onPinnedChange,
    children,
    style,
    ...props
  },
  forwardedRef,
) {
  const boundaryRef = useContext(DockBoundaryContext);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [dragging, setDragging] = useState(false);
  const [locked = false, setLocked] = useControllableState(
    controlledLocked,
    defaultLocked,
    onLockedChange,
  );
  const [pinned = false, setPinned] = useControllableState(
    controlledPinned,
    defaultPinned,
    onPinnedChange,
  );
  const [pinnedInsets, setPinnedInsets] = useState<DockPinnedInsets | null>(null);
  const [hydratedPersistenceIdentity, setHydratedPersistenceIdentity] = useState<string | null>(
    null,
  );

  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current;
    if (!pinned || !root) {
      setPinnedInsets(null);
      return;
    }
    const boundary = boundaryRef?.current ?? root.parentElement;
    const boundaryRect = boundary?.getBoundingClientRect();
    if (!boundaryRect?.width || !boundaryRect.height) return;
    const fixedRect = fixedPlacementRect(root);
    // Freeze the local docking frame in fixed coordinates. Switching positioning modes
    // must not move a dock underneath a page header or to a different viewport edge.
    setPinnedInsets({
      top: boundaryRect.top - fixedRect.top,
      right: fixedRect.right - boundaryRect.right,
      bottom: fixedRect.bottom - boundaryRect.bottom,
      left: boundaryRect.left - fixedRect.left,
    });
  }, [pinned, boundaryRef]);

  const allowedEdges = useMemo(() => normalizeAllowedEdges(allowedEdgesProp), [allowedEdgesProp]);
  const [rawPlacement, setRawPlacement, setUncontrolledPlacement] = useControllableState(
    controlledPlacement,
    constrainPlacement(defaultPlacement, allowedEdges),
    onPlacementChange,
  );
  const placement = constrainPlacement(rawPlacement ?? DEFAULT_PLACEMENT, allowedEdges);
  const snapDivisions = normalizeSnapDivisions(snapDivisionsProp);
  const orientation = orientationForEdge(placement.edge);
  const setPlacement = useCallback(
    (nextPlacement: DockPlacement) =>
      setRawPlacement(constrainPlacement(nextPlacement, allowedEdges)),
    [allowedEdges, setRawPlacement],
  );
  const state = useMemo<DockState>(
    () => ({
      placement,
      orientation,
      dragging,
      locked,
      pinned,
      setLocked,
      setPinned,
      setPlacement,
    }),
    [dragging, orientation, placement, locked, pinned, setLocked, setPinned, setPlacement],
  );
  const context = useMemo<DockRootContextValue>(
    () => ({
      boundaryRef,
      rootRef,
      placement,
      orientation,
      snapDivisions,
      allowedEdges,
      disabled,
      locked,
      pinned,
      pinnedInsets,
      dragging,
      setDragging,
      setPlacement,
    }),
    [
      allowedEdges,
      boundaryRef,
      disabled,
      locked,
      pinned,
      pinnedInsets,
      dragging,
      orientation,
      placement,
      setPlacement,
      snapDivisions,
    ],
  );
  const positionPercent = `${placement.position * 100}%`;
  const shiftPercent = `${placement.position * -100}%`;
  const persistKey = persist?.key.trim();
  const persistStorageType = persist?.storage;
  const persistenceIdentity =
    persistKey && persistStorageType ? `${persistStorageType}:${persistKey}` : null;
  const persistedEdge = placement.edge;
  const persistedPosition = placement.position;

  useIsomorphicLayoutEffect(() => {
    if (
      controlledPlacement !== undefined ||
      !persistKey ||
      !persistStorageType ||
      !persistenceIdentity
    ) {
      setHydratedPersistenceIdentity(null);
      return;
    }

    const persistedPlacement = readPersistedPlacement({
      key: persistKey,
      storage: persistStorageType,
    });
    setUncontrolledPlacement(
      constrainPlacement(persistedPlacement ?? defaultPlacement, allowedEdges),
    );
    setHydratedPersistenceIdentity(persistenceIdentity);
  }, [
    allowedEdges,
    controlledPlacement,
    defaultPlacement,
    persistKey,
    persistStorageType,
    persistenceIdentity,
    setUncontrolledPlacement,
  ]);

  useEffect(() => {
    if (
      controlledPlacement !== undefined ||
      !persistKey ||
      !persistStorageType ||
      !persistenceIdentity ||
      hydratedPersistenceIdentity !== persistenceIdentity
    ) {
      return;
    }
    writePersistedPlacement(
      { key: persistKey, storage: persistStorageType },
      { edge: persistedEdge, position: persistedPosition },
    );
  }, [
    controlledPlacement,
    hydratedPersistenceIdentity,
    persistKey,
    persistStorageType,
    persistenceIdentity,
    persistedEdge,
    persistedPosition,
  ]);

  return (
    <DockRootContext.Provider value={context}>
      <div
        {...props}
        ref={composeRefs(forwardedRef, rootRef)}
        data-vd-dock-root=""
        data-edge={placement.edge}
        data-orientation={orientation}
        data-dragging={dragging || undefined}
        data-disabled={disabled || undefined}
        data-locked={locked || undefined}
        data-pinned={pinned || undefined}
        data-position={placement.position}
        data-allowed-edges={allowedEdges.join(' ')}
        data-positioning={snapDivisions === false ? 'free' : 'snap'}
        data-snap-divisions={snapDivisions === false ? undefined : snapDivisions}
        style={
          {
            ...style,
            '--vd-dock-position': positionPercent,
            '--vd-dock-shift': shiftPercent,
            ...(pinned && pinnedInsets
              ? {
                  '--vd-dock-fixed-top': `${pinnedInsets.top}px`,
                  '--vd-dock-fixed-right': `${pinnedInsets.right}px`,
                  '--vd-dock-fixed-bottom': `${pinnedInsets.bottom}px`,
                  '--vd-dock-fixed-left': `${pinnedInsets.left}px`,
                  '--vd-dock-fixed-x': `calc(${positionPercent} + ${pinnedInsets.left * (1 - placement.position) - pinnedInsets.right * placement.position}px)`,
                  '--vd-dock-fixed-y': `calc(${positionPercent} + ${pinnedInsets.top * (1 - placement.position) - pinnedInsets.bottom * placement.position}px)`,
                }
              : {}),
          } as CSSProperties
        }
      >
        {typeof children === 'function' ? children(state) : children}
      </div>
    </DockRootContext.Provider>
  );
});

DockRoot.displayName = 'Dock.Root';

export const DockHandle = forwardRef<HTMLButtonElement, DockHandleProps>(function DockHandle(
  {
    type = 'button',
    'aria-label': ariaLabel = 'Move dock',
    disabled: handleDisabled = false,
    position = 'start',
    onPointerDown,
    onKeyDown,
    ...props
  },
  forwardedRef,
) {
  const context = useDockRootContext('Dock.Handle');
  const cleanupRef = useRef<(() => void) | null>(null);
  const disabled = context.disabled || context.locked || handleDisabled;

  useEffect(() => {
    if (disabled) cleanupRef.current?.();
    return () => cleanupRef.current?.();
  }, [disabled, context.pinned]);

  const updateFromPoint = (clientX: number, clientY: number) => {
    const boundary = context.boundaryRef?.current ?? context.rootRef.current?.parentElement;
    const root = context.rootRef.current;
    if (!root || (!context.pinned && !boundary)) return;
    let movementRect = context.pinned
      ? fixedPlacementRect(root)
      : boundary!.getBoundingClientRect();
    if (context.pinned && context.pinnedInsets) {
      const { top, right, bottom, left } = context.pinnedInsets;
      movementRect = new DOMRect(
        movementRect.left + left,
        movementRect.top + top,
        Math.max(0, movementRect.width - left - right),
        Math.max(0, movementRect.height - top - bottom),
      );
    }
    context.setPlacement(
      placementFromPoint(
        clientX,
        clientY,
        movementRect,
        context.snapDivisions,
        context.allowedEdges,
      ),
    );
  };

  return (
    <button
      {...props}
      ref={forwardedRef}
      type={type}
      aria-label={ariaLabel}
      aria-keyshortcuts={[
        'Home',
        'End',
        'ArrowLeft',
        'ArrowRight',
        'ArrowUp',
        'ArrowDown',
        context.allowedEdges.includes('left') ? 'Alt+ArrowLeft' : null,
        context.allowedEdges.includes('right') ? 'Alt+ArrowRight' : null,
        context.allowedEdges.includes('top') ? 'Alt+ArrowUp' : null,
        context.allowedEdges.includes('bottom') ? 'Alt+ArrowDown' : null,
      ]
        .filter(Boolean)
        .join(' ')}
      disabled={disabled}
      data-vd-dock-handle=""
      data-position={position}
      data-edge={context.placement.edge}
      data-orientation={context.orientation}
      data-dragging={context.dragging || undefined}
      data-locked={context.locked || undefined}
      onPointerDown={(event) => {
        onPointerDown?.(event);
        if (event.defaultPrevented || disabled || event.button !== 0) return;

        cleanupRef.current?.();
        context.setDragging(true);

        const move = (pointerEvent: PointerEvent) =>
          updateFromPoint(pointerEvent.clientX, pointerEvent.clientY);
        const stop = () => {
          window.removeEventListener('pointermove', move);
          window.removeEventListener('pointerup', stop);
          window.removeEventListener('pointercancel', stop);
          cleanupRef.current = null;
          context.setDragging(false);
        };

        cleanupRef.current = stop;
        window.addEventListener('pointermove', move);
        window.addEventListener('pointerup', stop);
        window.addEventListener('pointercancel', stop);
        event.preventDefault();
      }}
      onKeyDown={(event) => {
        onKeyDown?.(event);
        if (event.defaultPrevented || disabled) return;

        const step = context.snapDivisions === false ? 0.01 : 1 / context.snapDivisions;
        let nextPlacement: DockPlacement | undefined;

        if (event.altKey) {
          const edgeByKey: Partial<Record<string, DockEdge>> = {
            ArrowUp: 'top',
            ArrowRight: 'right',
            ArrowDown: 'bottom',
            ArrowLeft: 'left',
          };
          const nextEdge = edgeByKey[event.key];
          if (!nextEdge) return;
          if (!context.allowedEdges.includes(nextEdge)) return;
          nextPlacement = { edge: nextEdge, position: context.placement.position };
        } else if (event.key === 'Home') {
          nextPlacement = { ...context.placement, position: 0 };
        } else if (event.key === 'End') {
          nextPlacement = { ...context.placement, position: 1 };
        } else if (context.orientation === 'horizontal' && event.key === 'ArrowLeft') {
          nextPlacement = { ...context.placement, position: context.placement.position - step };
        } else if (context.orientation === 'horizontal' && event.key === 'ArrowRight') {
          nextPlacement = { ...context.placement, position: context.placement.position + step };
        } else if (context.orientation === 'vertical' && event.key === 'ArrowUp') {
          nextPlacement = { ...context.placement, position: context.placement.position - step };
        } else if (context.orientation === 'vertical' && event.key === 'ArrowDown') {
          nextPlacement = { ...context.placement, position: context.placement.position + step };
        }

        if (!nextPlacement) return;
        event.preventDefault();
        context.setPlacement({
          ...nextPlacement,
          position: positionForSnapMode(nextPlacement.position, context.snapDivisions),
        });
      }}
    />
  );
});

DockHandle.displayName = 'Dock.Handle';

export const DockContent = forwardRef<HTMLDivElement, DockContentProps>(
  function DockContent(props, forwardedRef) {
    const context = useDockRootContext('Dock.Content');
    return (
      <div
        {...props}
        ref={forwardedRef}
        data-vd-dock-content=""
        data-edge={context.placement.edge}
        data-orientation={context.orientation}
      />
    );
  },
);

DockContent.displayName = 'Dock.Content';
