import { forwardRef } from 'react';

import { ActionGroup } from '../../internal/action-group/ActionGroup';
import type { ButtonGroupProps } from './Button.types';

export const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(function ButtonGroup(
  { variant = 'spaced', ...props },
  ref,
) {
  return <ActionGroup {...props} ref={ref} role="group" data-variant={variant} />;
});
ButtonGroup.displayName = 'Button.Group';
