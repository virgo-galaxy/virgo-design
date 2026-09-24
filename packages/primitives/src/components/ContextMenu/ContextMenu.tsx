import { forwardRef } from 'react';

import { menuParts } from '../../internal/menu/parts';
import { MenuScope } from '../../internal/menu/Root';
import { ContextTrigger } from '../../internal/menu/Trigger';
import type { MenuRootProps } from '../../internal/menu/types';
const Root = forwardRef<HTMLDivElement, MenuRootProps>(function ContextMenuRoot(props, ref) {
  return <MenuScope {...props} ref={ref} mode="context" />;
});
export const ContextMenu = Object.assign(Root, { Root, Trigger: ContextTrigger, ...menuParts });
