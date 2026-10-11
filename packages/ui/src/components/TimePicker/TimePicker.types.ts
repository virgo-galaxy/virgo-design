import type { TimePickerProps as PrimitiveProps } from '@virgo-design/primitives';
export interface TimePickerProps extends PrimitiveProps {
  /** Wrap keyboard navigation between enabled options and wheel scrolling at list edges. @default false */
  loop?: boolean | undefined;
  /** Show the seconds column; when true, step defaults to 1 second. When omitted, infer from value or step precision. */
  showSeconds?: boolean | undefined;
  /** Show the clear action; required fields cannot be cleared. @default false */
  showClear?: boolean | undefined;
  /** Show a close action. Values still update immediately when selected. @default false */
  showConfirm?: boolean | undefined;
  /** Visual density. @default 'medium' */
  size?: 'small' | 'medium' | 'large' | undefined;
}
