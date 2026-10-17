import {
  type PointerEvent as ReactPointerEvent,
  type RefObject,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import { useLocale } from '../../locale/context/locale-context';
import styles from './Layout.module.scss';
import type {
  LayoutLength,
  LayoutSidebarDisplayState,
  LayoutSidebarProps,
  LayoutSidebarState,
} from './Layout.types';

type Props = {
  [Key in 'minWidth' | 'maxWidth' | 'resizeSnap' | 'onResizeEnd' | 'side']?:
    LayoutSidebarProps[Key] | undefined;
} & {
  sidebarRef: RefObject<HTMLElement | null>;
  sidebarState: LayoutSidebarState;
  expandedWidth: LayoutLength;
  collapsedWidth: LayoutLength;
  onWidthChange: (width: number) => void;
  onResizingChange: (resizing: boolean) => void;
};

export function SidebarResizeHandle(props: Props) {
  const labels = useLocale().layout;
  const latest = useRef(props);
  const cleanup = useRef<(() => void) | null>(null);
  const keyboardWidth = useRef<number | null>(null);
  const [dragging, setDragging] = useState(false);
  useLayoutEffect(() => {
    latest.current = props;
  });
  useEffect(() => () => cleanup.current?.(), []);

  const clamp = (width: number) =>
    Math.min(props.maxWidth ?? Infinity, Math.max(props.minWidth ?? 0, width));
  const readWidth = (length: LayoutLength) => {
    if (typeof length === 'number') return length;
    const sidebar = props.sidebarRef.current;
    if (!sidebar) return clamp(240);
    // Resolve token/calc widths in the Sidebar's own inherited token context.
    const probe = document.createElement('div');
    probe.style.cssText = 'position:absolute;visibility:hidden;pointer-events:none;height:0';
    probe.style.width = length;
    sidebar.append(probe);
    const width = probe.getBoundingClientRect().width;
    probe.remove();
    return width || 240;
  };
  const readExpandedWidth = () => clamp(readWidth(props.expandedWidth));
  const direction = () => {
    const rtl =
      props.sidebarRef.current && getComputedStyle(props.sidebarRef.current).direction === 'rtl';
    return (props.side === 'end' ? -1 : 1) * (rtl ? -1 : 1);
  };
  const resolveState = (
    rawWidth: number,
    previous: LayoutSidebarDisplayState,
  ): LayoutSidebarDisplayState => {
    const snap = props.resizeSnap;
    if (!snap) return 'expanded';
    const hysteresis = Math.max(0, snap.hysteresis ?? 16);
    const hideAt =
      snap.hideAt !== undefined && snap.hideAt < snap.collapseAt ? snap.hideAt : undefined;
    if (previous === 'hidden' && hideAt !== undefined && rawWidth < hideAt + hysteresis)
      return 'hidden';
    if (hideAt !== undefined && rawWidth <= hideAt) return 'hidden';
    if (previous !== 'expanded' && rawWidth < snap.collapseAt + hysteresis) return 'collapsed';
    return rawWidth <= snap.collapseAt ? 'collapsed' : 'expanded';
  };

  const startResize = (event: ReactPointerEvent<HTMLDivElement>) => {
    const sidebar = props.sidebarRef.current;
    if (event.button !== 0 || !sidebar) return;
    cleanup.current?.();
    const startX = event.clientX;
    const startWidth = sidebar.getBoundingClientRect().width;
    const startState = props.sidebarState.state;
    const rememberedWidth = readExpandedWidth();
    const sign = direction();
    const pointerId = event.pointerId;
    let requestedState = startState;
    let expandedWidth = rememberedWidth;
    let previousX = startX;
    let finished = false;
    const cursor = document.body.style.cursor;
    const userSelect = document.body.style.userSelect;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
    keyboardWidth.current = null;
    setDragging(true);
    props.onResizingChange(true);

    const move = (pointer: PointerEvent) => {
      if (pointer.pointerId !== undefined && pointer.pointerId !== pointerId) return;
      if (pointer.clientX === previousX) return;
      previousX = pointer.clientX;
      const rawWidth = startWidth + (pointer.clientX - startX) * sign;
      const next = resolveState(rawWidth, requestedState);
      if (next !== requestedState) {
        requestedState = next;
        latest.current.sidebarState.setState(next);
      }
      if (next === 'expanded') {
        const width = clamp(rawWidth);
        if (width !== expandedWidth) {
          expandedWidth = width;
          latest.current.onWidthChange(width);
        }
      }
    };
    const detach = () => {
      if (finished) return;
      finished = true;
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', release);
      window.removeEventListener('pointercancel', cancel);
      window.removeEventListener('blur', cancel);
      document.body.style.cursor = cursor;
      document.body.style.userSelect = userSelect;
      cleanup.current = null;
    };
    const finish = (cancelled: boolean) => {
      if (finished) return;
      detach();
      setDragging(false);
      latest.current.onResizingChange(false);
      if (cancelled) {
        latest.current.sidebarState.setState(startState);
        latest.current.onWidthChange(rememberedWidth);
      }
      latest.current.onResizeEnd?.({
        width: cancelled ? rememberedWidth : expandedWidth,
        state: cancelled ? startState : requestedState,
        cancelled,
      });
    };
    const release = (pointer: PointerEvent) => {
      if (pointer.pointerId !== undefined && pointer.pointerId !== pointerId) return;
      finish(false);
    };
    const cancel = (cancelEvent: Event) => {
      if ('pointerId' in cancelEvent && cancelEvent.pointerId !== pointerId) return;
      finish(true);
    };
    cleanup.current = detach;
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', release);
    window.addEventListener('pointercancel', cancel);
    window.addEventListener('blur', cancel);
    event.currentTarget.focus();
    event.preventDefault();
  };

  const state = props.sidebarState.state;
  // Keep this component mounted through snap/hide; window listeners own the
  // entire gesture even when the rail or hidden state changes its visible width.
  if (!dragging && (state === 'hidden' || (state === 'collapsed' && !props.resizeSnap)))
    return null;
  const expandedWidth =
    typeof props.expandedWidth === 'number' ? clamp(props.expandedWidth) : undefined;
  return (
    <div
      role="separator"
      aria-label={labels.resizeSidebar}
      aria-orientation="vertical"
      aria-valuemin={props.resizeSnap ? 0 : props.minWidth}
      aria-valuemax={props.maxWidth}
      aria-valuenow={
        state === 'hidden'
          ? 0
          : state === 'collapsed'
            ? typeof props.collapsedWidth === 'number'
              ? props.collapsedWidth
              : undefined
            : expandedWidth
      }
      tabIndex={state === 'hidden' ? -1 : 0}
      className={styles.sidebarResizeHandle}
      data-side={props.side}
      data-slot="sidebar-resize-handle"
      onPointerDown={startResize}
      onBlur={() => {
        keyboardWidth.current = null;
      }}
      onKeyDown={(event) => {
        const sidebar = props.sidebarRef.current;
        if (!sidebar) return;
        const currentWidth = sidebar.getBoundingClientRect().width;
        let rawWidth: number | undefined;
        const sign = direction();
        if (event.key === 'ArrowLeft')
          rawWidth = (keyboardWidth.current ?? currentWidth) - 8 * sign;
        if (event.key === 'ArrowRight')
          rawWidth = (keyboardWidth.current ?? currentWidth) + 8 * sign;
        if (event.key === 'Home' && props.minWidth !== undefined) rawWidth = props.minWidth;
        if (event.key === 'End' && props.maxWidth !== undefined) rawWidth = props.maxWidth;
        if (rawWidth === undefined) return;
        event.preventDefault();
        const next =
          event.key === 'Home' || event.key === 'End' ? 'expanded' : resolveState(rawWidth, state);
        let width = readExpandedWidth();
        if (next === 'expanded') {
          width = clamp(rawWidth);
          props.onWidthChange(width);
        }
        if (next !== state) {
          props.sidebarState.setState(next);
          keyboardWidth.current =
            next === 'expanded' ? width : next === 'hidden' ? 0 : readWidth(props.collapsedWidth);
        } else keyboardWidth.current = Math.min(props.maxWidth ?? Infinity, Math.max(0, rawWidth));
        props.onResizeEnd?.({ width, state: next, cancelled: false });
      }}
    />
  );
}
