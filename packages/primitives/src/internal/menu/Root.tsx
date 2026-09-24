import {
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import { useControllableState } from '../hooks/useControllableState';
import { useDismiss } from '../overlay/dismiss';
import { returnFocus } from '../overlay/focus';
import {
  containsFocusInLayerContentTree,
  LayerScope,
  useLayerRegistration,
  useOverlayLayer,
} from '../overlay/layers';
import { useHoverIntent } from '../overlay/useHoverIntent';
import { focusEntry, type FocusIntent, useMenuCollection } from './collection';
import { MenuContext, type MenuContextValue } from './context';
import type { MenuRootProps } from './types';

type ScopeProps = MenuRootProps & {
  mode?: MenuContextValue['mode'];
  bar?: MenuContextValue['bar'];
  barValue?: string;
};
export const MenuScope = forwardRef<HTMLDivElement, ScopeProps>(function MenuScope(
  {
    mode = 'menu',
    bar = null,
    barValue,
    open: controlled,
    defaultOpen = false,
    onOpenChange,
    disabled = false,
    children,
    ...props
  },
  ref,
) {
  const ancestor = useContext(MenuContext);
  const parent = mode === 'submenu' ? ancestor : null;
  const id = useId();
  const [state, setState, reset] = useControllableState(controlled, defaultOpen, onOpenChange);
  const [activeChild, updateChild] = useState<string | null>(null);
  const [point, setPoint] = useState<MenuContextValue['point']>();
  const triggerRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const intentRef = useRef<FocusIntent>('first');
  const collection = useMenuCollection();
  const childrenRef = useRef(new Map<string, () => void>());
  const layer = useOverlayLayer(triggerRef, contentRef);
  const open =
    !disabled && Boolean(state) && (!parent || (parent.open && parent.activeChild === id));
  useLayerRegistration(layer, open);
  const setActiveChild = useCallback((next: string | null) => {
    updateChild(next);
    for (const [childId, close] of childrenRef.current) if (childId !== next) close();
  }, []);
  const registerChild = useCallback((childId: string, close: () => void) => {
    childrenRef.current.set(childId, close);
    return () => {
      childrenRef.current.delete(childId);
    };
  }, []);
  const close = (restore = false) => {
    if (restore) returnFocus(triggerRef.current, contentRef.current, true);
    setActiveChild(null);
    setState(false);
  };
  const { cancelClose, scheduleClose } = useHoverIntent(
    mode === 'submenu',
    () =>
      close(
        containsFocusInLayerContentTree(
          layer,
          contentRef.current?.ownerDocument.activeElement ?? null,
        ),
      ),
    180,
  );
  const parentSetChild = parent?.setActiveChild;
  const parentRegister = parent?.registerChild;
  const parentOpen = parent?.open;
  useLayoutEffect(
    () => parentRegister?.(id, () => setState(false)),
    [parentRegister, id, setState],
  );
  useLayoutEffect(() => {
    if (state && parentOpen) parentSetChild?.(id);
  }, [state, parentOpen, parentSetChild, id]);
  useEffect(() => {
    if (disabled) reset(false);
    if (!open) {
      setActiveChild(null);
      cancelClose();
    }
  }, [disabled, reset, open, setActiveChild, cancelClose]);
  // Remember ownership before React removes portalled content during an external close.
  useLayoutEffect(() => {
    if (!open) return;
    const trigger = triggerRef.current;
    const content = contentRef.current;
    const doc = trigger?.ownerDocument;
    if (!doc) return;
    let ownedFocus = containsFocusInLayerContentTree(layer, doc.activeElement);
    const track = () => {
      ownedFocus = containsFocusInLayerContentTree(layer, doc.activeElement);
    };
    doc.addEventListener('focusin', track);
    return () => {
      doc.removeEventListener('focusin', track);
      if (
        ownedFocus &&
        (doc.activeElement === doc.body ||
          containsFocusInLayerContentTree(layer, doc.activeElement))
      )
        returnFocus(trigger, content, true);
    };
  }, [open, layer]);
  useDismiss({
    open,
    layer,
    onDismiss: (reason) => {
      cancelClose();
      close(reason === 'escape');
    },
  });
  const requestOpen = (intent: FocusIntent) => {
    if (disabled || triggerRef.current?.getAttribute('aria-disabled') === 'true') return;
    cancelClose();
    parent?.cancelClose();
    parentSetChild?.(id);
    intentRef.current = intent;
    setState(true);
    if (open) focusEntry(collection, intent, contentRef.current);
  };
  const context: MenuContextValue = {
    id,
    open,
    disabled,
    mode,
    triggerId: `${id}-trigger`,
    contentId: `${id}-content`,
    triggerRef,
    contentRef,
    intentRef,
    collection,
    layer,
    parent,
    bar: parent?.bar ?? bar,
    barValue: parent?.barValue ?? barValue,
    activeChild,
    setActiveChild,
    registerChild,
    requestOpen,
    close,
    closeAll: parent ? parent.closeAll : close,
    cancelClose: () => {
      cancelClose();
      parent?.cancelClose();
    },
    scheduleClose: () => {
      scheduleClose();
      parent?.scheduleClose();
    },
    point,
    setPoint,
  };
  return (
    <MenuContext.Provider value={context}>
      <LayerScope.Provider value={layer}>
        <div
          {...props}
          ref={ref}
          role={mode === 'submenu' || mode === 'menubar' ? 'none' : props.role}
          data-state={open ? 'open' : 'closed'}
          data-disabled={disabled || undefined}
        >
          {children}
        </div>
      </LayerScope.Provider>
    </MenuContext.Provider>
  );
});
export const MenuRoot = forwardRef<HTMLDivElement, MenuRootProps>(function MenuRoot(props, ref) {
  return <MenuScope {...props} ref={ref} />;
});
export const MenuSubmenu = forwardRef<HTMLDivElement, MenuRootProps>(
  function MenuSubmenu(props, ref) {
    const context = useContext(MenuContext);
    if (!context) throw new Error('Submenu must be used inside a menu.');
    return <MenuScope {...props} ref={ref} mode="submenu" />;
  },
);
