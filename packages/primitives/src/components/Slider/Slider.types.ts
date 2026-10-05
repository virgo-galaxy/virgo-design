import type { HTMLAttributes, InputHTMLAttributes } from 'react';
export interface SliderProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'value' | 'defaultValue' | 'size'
> {
  /** Controlled numeric value, constrained by min/max/step. */
  value?: number | undefined;
  /** Initial value. Defaults to the midpoint of min and max. */
  defaultValue?: number | undefined;
  /** Called for native pointer and keyboard value changes. */
  onValueChange?: ((value: number) => void) | undefined;
}
export interface SliderRangeProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'defaultValue' | 'onChange' | 'children'
> {
  /** Ordered controlled thumb values. Thumbs cannot cross their neighbors. */
  value?: readonly number[] | undefined;
  /** Initial thumb values. @default [min, max] */
  defaultValue?: readonly number[] | undefined;
  /** Lower bound shared by all thumbs. @default 0 */
  min?: number | undefined;
  /** Upper bound shared by all thumbs. @default 100 */
  max?: number | undefined;
  /** Numeric increment from min. @default 1 */
  step?: number | undefined;
  /** Accessible name for each thumb, in value order. */
  thumbLabels?: readonly string[] | undefined;
  /** Formats each thumb's accessible value text and visible value hint. */
  getValueText?: ((value: number, index: number) => string) | undefined;
  /** Called with ordered values for pointer or keyboard changes. */
  onValueChange?: ((value: number[]) => void) | undefined;
  /** Called with the zero-based index when a thumb receives focus. */
  onThumbFocus?: ((index: number) => void) | undefined;
  /** Repeated field name used by hidden inputs for native form submission. */
  name?: string | undefined;
  /** Prevents interaction and excludes values from form submission. */
  disabled?: boolean | undefined;
  /** Prevents editing while retaining focus and form values. */
  readOnly?: boolean | undefined;
  /** Marks the field as required for shared field semantics. */
  required?: boolean | undefined;
}
