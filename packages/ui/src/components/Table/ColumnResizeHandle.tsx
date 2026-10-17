import {
  createContext,
  type PointerEvent,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import { useLocale } from '../../locale/context/locale-context';
import styles from './Table.module.scss';

type ColumnResizeContext = {
  enabled: boolean;
  minimum: number;
  maximum: number;
  widths: readonly number[] | null;
  setWidths: (widths: number[]) => void;
};

export const ResizeContext = createContext<ColumnResizeContext | null>(null);

export function ColumnResizeHandle({
  label,
  minimum,
  maximum,
}: {
  label: string;
  minimum?: number | undefined;
  maximum?: number | undefined;
}) {
  const context = useContext(ResizeContext);
  const labels = useLocale().table;
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [measuredWidth, setMeasuredWidth] = useState(80);
  const drag = useRef<{ x: number; index: number; widths: number[]; direction: number } | null>(
    null,
  );

  useLayoutEffect(() => {
    const head = buttonRef.current?.closest('th');
    if (head) setMeasuredWidth(Math.round(head.getBoundingClientRect().width));
  }, [context?.widths]);

  if (!context?.enabled) return null;

  const min = Math.max(24, minimum ?? context.minimum);
  const max = Math.max(min, maximum ?? context.maximum);

  const capture = (button: HTMLButtonElement) => {
    const head = button.closest('th');
    const row = head?.parentElement;

    if (!head || !row || !head.closest('thead')) return null;

    const heads = Array.from(row.children) as HTMLTableCellElement[];

    if (heads.some((cell) => cell.colSpan !== 1)) return null;

    return {
      index: head.cellIndex,
      widths: heads.map((cell) => cell.getBoundingClientRect().width),
      direction: getComputedStyle(head).direction === 'rtl' ? -1 : 1,
    };
  };

  const update = (snapshot: { index: number; widths: number[] }, width: number) => {
    const widths = [...snapshot.widths];
    widths[snapshot.index] = Math.max(min, Math.min(max, width));
    context.setWidths(widths);
  };

  const finish = (event: PointerEvent<HTMLButtonElement>, cancel: boolean) => {
    if (cancel && drag.current) context.setWidths(drag.current.widths);
    drag.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId))
      event.currentTarget.releasePointerCapture(event.pointerId);
  };

  return (
    <button
      type="button"
      ref={buttonRef}
      role="separator"
      aria-valuenow={measuredWidth}
      aria-orientation="vertical"
      aria-label={labels.resizeColumn(label)}
      aria-valuemin={min}
      aria-valuemax={Number.isFinite(max) ? max : undefined}
      className={styles.resizeHandle}
      data-slot="column-resize-handle"
      onFocus={(event) => {
        const head = event.currentTarget.closest('th');
        if (head) setMeasuredWidth(Math.round(head.getBoundingClientRect().width));
      }}
      onPointerDown={(event) => {
        if (event.button !== 0) return;
        const snapshot = capture(event.currentTarget);
        if (!snapshot) return;
        event.preventDefault();
        event.currentTarget.focus();
        drag.current = { ...snapshot, x: event.clientX };
        event.currentTarget.setPointerCapture(event.pointerId);
      }}
      onPointerMove={(event) => {
        const snapshot = drag.current;
        if (snapshot)
          update(
            snapshot,
            snapshot.widths[snapshot.index]! + (event.clientX - snapshot.x) * snapshot.direction,
          );
      }}
      onPointerUp={(event) => finish(event, false)}
      onPointerCancel={(event) => finish(event, true)}
      onLostPointerCapture={() => {
        drag.current = null;
      }}
      onKeyDown={(event) => {
        if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
        const snapshot = capture(event.currentTarget);
        if (!snapshot) return;
        event.preventDefault();
        update(
          snapshot,
          event.key === 'Home'
            ? min
            : event.key === 'End' && Number.isFinite(max)
              ? max
              : snapshot.widths[snapshot.index]! +
                (event.key === 'ArrowRight' ? 10 : -10) * snapshot.direction,
        );
      }}
    />
  );
}
