import { Radio as PrimitiveRadio } from '@virgo-design/primitives';
import { forwardRef, useId, useRef, useState } from 'react';

import { Tooltip } from '../Tooltip';
import styles from './SegmentedControl.module.scss';
import type { SegmentedControlItemProps } from './SegmentedControl.types';

function joinClassNames(...classNames: Array<string | false | null | undefined>) {
  return classNames.filter(Boolean).join(' ');
}

export const SegmentedControlItem = forwardRef<HTMLInputElement, SegmentedControlItemProps>(
  function SegmentedControlItem(
    {
      children,
      className,
      disabled,
      value,
      tooltip,
      onFocus,
      onBlur,
      'aria-describedby': describedBy,
      ...props
    },
    forwardedRef,
  ) {
    const anchorRef = useRef<HTMLLabelElement>(null);
    const [hintOpen, setHintOpen] = useState(false);
    const [hintMounted, setHintMounted] = useState(false);
    const hintId = useId();
    const hasHint = tooltip !== undefined && tooltip !== false && tooltip !== null;
    const suppressed = useRef(false);
    const showHint = () => {
      // Mount after the label ref is attached so overlay handoff can register its anchor.
      setHintMounted(true);
      setHintOpen(true);
    };
    return (
      <label
        ref={anchorRef}
        className={joinClassNames(styles.item, className)}
        data-disabled={disabled || undefined}
        data-segment-value={value}
        onPointerEnter={(event) => {
          if (
            hasHint &&
            event.pointerType !== 'touch' &&
            !event.currentTarget.querySelector('input')?.disabled &&
            !suppressed.current
          )
            showHint();
        }}
        onPointerLeave={() => {
          suppressed.current = false;
          setHintOpen(false);
        }}
        onPointerDown={() => {
          suppressed.current = true;
          setHintOpen(false);
        }}
      >
        <PrimitiveRadio
          {...props}
          ref={forwardedRef}
          className={styles.native}
          disabled={disabled}
          value={value}
          aria-describedby={
            [describedBy, hasHint && hintOpen ? hintId : undefined].filter(Boolean).join(' ') ||
            undefined
          }
          onFocus={(event) => {
            onFocus?.(event);
            if (hasHint && !event.defaultPrevented && !suppressed.current) showHint();
          }}
          onBlur={(event) => {
            onBlur?.(event);
            if (!event.defaultPrevented) {
              suppressed.current = false;
              setHintOpen(false);
            }
          }}
        />
        <span className={styles.label} data-slot="label">
          {children}
        </span>
        {hasHint && hintMounted ? (
          <Tooltip
            anchorRef={anchorRef}
            open={hintOpen}
            onOpenChange={setHintOpen}
            disabled={disabled ?? false}
          >
            <Tooltip.Content size="small">
              <span id={hintId}>{tooltip}</span>
            </Tooltip.Content>
          </Tooltip>
        ) : null}
      </label>
    );
  },
);

SegmentedControlItem.displayName = 'SegmentedControl.Item';
