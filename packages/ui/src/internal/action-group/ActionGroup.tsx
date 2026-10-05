import { type CSSProperties, forwardRef, useContext } from 'react';

import styles from './ActionGroup.module.scss';
import type { ActionGroupProps } from './ActionGroup.types';
import { ActionGroupSizeContext } from './ActionGroupContext';

export const ActionGroup = forwardRef<HTMLDivElement, ActionGroupProps>(function ActionGroup(
  {
    size,
    layout = 'default',
    orientation = 'horizontal',
    align = 'start',
    gap = 8,
    render,
    children,
    className,
    style,
    ...props
  },
  ref,
) {
  const inheritedSize = useContext(ActionGroupSizeContext);
  const rootProps = {
    ...props,
    ref,
    className: [styles.root, className].filter(Boolean).join(' '),
    'data-layout': layout,
    'data-orientation': orientation,
    'data-align': align,
    // Custom layout injects no CSS properties into an existing consumer's root.
    style:
      layout === 'custom'
        ? style
        : ({
            '--action-group-gap': gap === 0 ? '0px' : `var(--vd-spacing-${gap})`,
            ...style,
          } as CSSProperties),
    children,
  };
  return (
    <ActionGroupSizeContext.Provider value={size ?? inheritedSize}>
      {render ? render(rootProps) : <div {...rootProps} />}
    </ActionGroupSizeContext.Provider>
  );
});
