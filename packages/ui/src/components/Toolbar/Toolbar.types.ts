import type { ActionGroupProps } from '../../internal/action-group/ActionGroup.types';

/** A labelled set of independent controls with one Tab stop and arrow-key navigation. */
export interface ToolbarProps extends ActionGroupProps {
  /** Wrap arrow-key focus from the last enabled control to the first. @default true */
  loop?: boolean;
}
