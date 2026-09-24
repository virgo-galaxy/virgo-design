import { ContextMenu as PrimitiveContextMenu } from '@virgo-design/primitives';
import { forwardRef } from 'react';

import { MenuSizeContext } from '../../internal/menu/context';
import { menuUIParts } from '../../internal/menu/parts';
import type { ContextMenuProps } from './ContextMenu.types';
const Root = forwardRef<HTMLDivElement, ContextMenuProps>(function ContextMenuRoot(
  { size = 'medium', ...props },
  ref,
) {
  return (
    <MenuSizeContext.Provider value={size}>
      <PrimitiveContextMenu.Root {...props} ref={ref} />
    </MenuSizeContext.Provider>
  );
});
export const ContextMenu = Object.assign(Root, {
  Root,
  Trigger: PrimitiveContextMenu.Trigger,
  ...menuUIParts,
});
