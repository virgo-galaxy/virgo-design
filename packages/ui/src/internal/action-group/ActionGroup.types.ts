import type { HTMLAttributes, ReactElement, Ref } from 'react';

import type { ButtonSize } from '../../components/Button/Button.types';

export interface ActionGroupProps extends HTMLAttributes<HTMLDivElement> {
  /** Shared button size. An explicit Button size takes precedence. */
  size?: ButtonSize;
  /** Use custom to keep the consumer's existing layout completely unchanged. @default 'default' */
  layout?: 'default' | 'custom';
  /** Direction of the controls. @default 'horizontal' */
  orientation?: 'horizontal' | 'vertical';
  /** Main-axis alignment. @default 'start' */
  align?: 'start' | 'center' | 'end' | 'between';
  /** Spacing token between controls. @default 8 */
  gap?: 0 | 2 | 4 | 8 | 12 | 16 | 20 | 24;
  /** Render the same root through a Surface or another div-based component without adding a wrapper. */
  render?: (props: HTMLAttributes<HTMLDivElement> & { ref: Ref<HTMLDivElement> }) => ReactElement;
}
