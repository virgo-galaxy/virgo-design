import type { SelectProps as PrimitiveSelectProps } from '@virgo-design/primitives';
import type { AriaAttributes, CSSProperties } from 'react';

export type SelectSize = 'mini' | 'small' | 'medium' | 'large';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean | undefined;
}

export interface SelectProps extends Pick<
  PrimitiveSelectProps,
  | 'defaultOpen'
  | 'defaultValue'
  | 'disabled'
  | 'id'
  | 'name'
  | 'onOpenChange'
  | 'onValueChange'
  | 'open'
  | 'value'
> {
  options: readonly SelectOption[];
  placeholder?: string | undefined;
  size?: SelectSize | undefined;
  invalid?: boolean | undefined;
  className?: string | undefined;
  style?: CSSProperties | undefined;
  'aria-label'?: string | undefined;
  'aria-labelledby'?: string | undefined;
  'aria-describedby'?: string | undefined;
  'aria-invalid'?: AriaAttributes['aria-invalid'] | undefined;
}
