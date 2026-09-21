import { Radio as PrimitiveRadio } from '@virgo-design/primitives';
import { forwardRef, useCallback, useLayoutEffect, useRef, useState } from 'react';

import styles from './SegmentedControl.module.scss';
import type { SegmentedControlProps } from './SegmentedControl.types';

function joinClassNames(...classNames: Array<string | false | null | undefined>) {
  return classNames.filter(Boolean).join(' ');
}

export const SegmentedControl = forwardRef<HTMLDivElement, SegmentedControlProps>(
  function SegmentedControl(
    {
      variant = 'outline',
      size = 'medium',
      motion = 'none',
      value,
      defaultValue,
      onValueChange,
      children,
      className,
      ...props
    },
    forwardedRef,
  ) {
    const rootRef = useRef<HTMLDivElement | null>(null);
    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = useState(defaultValue ?? '');
    const selectedValue = isControlled ? value : internalValue;

    const setRootRef = useCallback(
      (node: HTMLDivElement | null) => {
        rootRef.current = node;

        if (typeof forwardedRef === 'function') {
          forwardedRef(node);
        } else if (forwardedRef) {
          forwardedRef.current = node;
        }
      },
      [forwardedRef],
    );

    const updateIndicator = useCallback(() => {
      const root = rootRef.current;

      if (!root || !selectedValue) {
        root?.removeAttribute('data-indicator-ready');
        return;
      }

      const items = Array.from(root.querySelectorAll<HTMLElement>('[data-segment-value]'));
      const selectedIndex = items.findIndex(
        (candidate) => candidate.dataset.segmentValue === selectedValue,
      );
      const selectedItem = items[selectedIndex];

      if (!selectedItem) {
        root.removeAttribute('data-indicator-ready');
        return;
      }

      const rootRect = root.getBoundingClientRect();
      const itemRect = selectedItem.getBoundingClientRect();
      const position =
        items.length === 1
          ? 'only'
          : selectedIndex === 0
            ? 'first'
            : selectedIndex === items.length - 1
              ? 'last'
              : 'middle';

      root.style.setProperty('--segmented-indicator-x', `${itemRect.left - rootRect.left}px`);
      root.style.setProperty('--segmented-indicator-width', `${itemRect.width}px`);
      root.dataset.indicatorPosition = position;
      root.dataset.indicatorReady = 'true';
    }, [selectedValue]);

    useLayoutEffect(() => {
      updateIndicator();

      const root = rootRef.current;
      if (!root) {
        return undefined;
      }

      const handleResize = () => updateIndicator();
      window.addEventListener('resize', handleResize);

      if (typeof ResizeObserver === 'undefined') {
        return () => window.removeEventListener('resize', handleResize);
      }

      const observer = new ResizeObserver(handleResize);
      observer.observe(root);
      root.querySelectorAll<HTMLElement>('[data-segment-value]').forEach((item) => {
        observer.observe(item);
      });

      return () => {
        observer.disconnect();
        window.removeEventListener('resize', handleResize);
      };
    }, [updateIndicator, size, variant]);

    return (
      <PrimitiveRadio.Group
        {...props}
        ref={setRootRef}
        className={joinClassNames(styles.root, className)}
        orientation="horizontal"
        value={selectedValue}
        onValueChange={(nextValue) => {
          if (!isControlled) {
            setInternalValue(nextValue);
          }

          onValueChange?.(nextValue);
        }}
        data-motion={motion}
        data-size={size}
        data-variant={variant}
      >
        <span aria-hidden="true" className={styles.indicator} data-slot="indicator" />
        {children}
      </PrimitiveRadio.Group>
    );
  },
);

SegmentedControl.displayName = 'SegmentedControl';
