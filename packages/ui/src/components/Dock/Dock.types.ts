import type {
  DockBoundaryProps as PrimitiveDockBoundaryProps,
  DockContentProps as PrimitiveDockContentProps,
  DockHandleProps as PrimitiveDockHandleProps,
  DockRootProps as PrimitiveDockRootProps,
} from '@virgo-design/primitives';

export type DockChromeVisibility = 'interaction' | 'always';

export type DockRootProps = PrimitiveDockRootProps & {
  /** When the shell, movement handle, and built-in lock/pin controls are revealed. @default 'interaction' */
  chromeVisibility?: DockChromeVisibility;
};

export type DockBoundaryProps = PrimitiveDockBoundaryProps;
export type DockHandleProps = PrimitiveDockHandleProps;
export type DockContentProps = PrimitiveDockContentProps;

export type {
  DockEdge,
  DockHandlePosition,
  DockOrientation,
  DockPersistenceStorage,
  DockPersistOptions,
  DockPlacement,
  DockSnapDivisions,
  DockState,
} from '@virgo-design/primitives';
