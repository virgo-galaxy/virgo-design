import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react';

export type DockEdge = 'top' | 'right' | 'bottom' | 'left';
export type DockOrientation = 'horizontal' | 'vertical';
export type DockHandlePosition = 'start' | 'end';
export type DockPersistenceStorage = 'local' | 'session';
export type DockSnapDivisions = number | false;

export interface DockPersistOptions {
  /** Stable consumer-owned identity used inside Virgo Design's storage namespace. */
  key: string;

  /** Browser storage lifetime used for uncontrolled placement persistence. */
  storage: DockPersistenceStorage;
}

export interface DockPlacement {
  /** Edge of the containing Dock.Boundary. */
  edge: DockEdge;

  /** Normalized position along the active edge, from 0 to 1. */
  position: number;
}

export interface DockState {
  placement: DockPlacement;
  orientation: DockOrientation;
  dragging: boolean;
  locked: boolean;
  pinned: boolean;
  setLocked: (locked: boolean) => void;
  setPinned: (pinned: boolean) => void;
  setPlacement: (placement: DockPlacement) => void;
}

interface DockRootSharedProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  children?: ReactNode | ((state: DockState) => ReactNode);

  /** Called whenever pointer or keyboard interaction changes placement. */
  onPlacementChange?: ((placement: DockPlacement) => void) | undefined;

  /** Edges available to placement and repositioning. @default ['top', 'right', 'bottom', 'left'] */
  allowedEdges?: readonly DockEdge[] | undefined;

  /** Number of equal snap intervals along each edge, or false for continuous free positioning. @default 12 */
  snapDivisions?: DockSnapDivisions | undefined;

  /** Disables drag and keyboard repositioning. @default false */
  disabled?: boolean | undefined;

  /** Prevents pointer and keyboard movement without changing positioning mode. */
  locked?: boolean | undefined;
  /** Initial uncontrolled movement lock. @default false */
  defaultLocked?: boolean | undefined;
  onLockedChange?: ((locked: boolean) => void) | undefined;

  /** Fixes the current docking frame in the viewport without jumping; movement remains enabled unless locked or disabled. */
  pinned?: boolean | undefined;
  /** Initial uncontrolled fixed positioning. @default false */
  defaultPinned?: boolean | undefined;
  onPinnedChange?: ((pinned: boolean) => void) | undefined;
}

interface DockRootControlledProps extends DockRootSharedProps {
  /** Controlled edge placement. */
  placement: DockPlacement;

  /** Controlled placement owns initialization. */
  defaultPlacement?: never;

  /** Persistence belongs to the external state owner in controlled mode. */
  persist?: never;
}

interface DockRootUncontrolledProps extends DockRootSharedProps {
  placement?: undefined;

  /** Initial placement when no persisted value exists. @default { edge: 'top', position: 0 } */
  defaultPlacement?: DockPlacement | undefined;

  /** Persist uncontrolled placement across reloads using browser storage. */
  persist?: DockPersistOptions | undefined;
}

export type DockRootProps = DockRootControlledProps | DockRootUncontrolledProps;

export type DockBoundaryProps = HTMLAttributes<HTMLDivElement>;
export type DockContentProps = HTMLAttributes<HTMLDivElement>;
export type DockHandleProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Logical position of the movement handle within Dock.Root. @default 'start' */
  position?: DockHandlePosition | undefined;
};
