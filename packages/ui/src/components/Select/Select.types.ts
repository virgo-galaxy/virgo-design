import type {
  SelectContentProps as PrimitiveSelectContentProps,
  SelectOptionProps as PrimitiveSelectOptionProps,
  SelectProps as PrimitiveSelectProps,
  SelectTriggerProps as PrimitiveSelectTriggerProps,
} from '@virgo-design/primitives';
import type { AriaAttributes, ReactNode } from 'react';

export type SelectSize = 'mini' | 'small' | 'medium' | 'large';

export interface SelectProps extends Omit<PrimitiveSelectProps, 'children' | 'className'> {
  children: ReactNode;
  size?: SelectSize | undefined;
  invalid?: boolean | undefined;
  className?: string | undefined;
}

export interface SelectTriggerProps extends Omit<PrimitiveSelectTriggerProps, 'children'> {
  children?: ReactNode;
  placeholder?: ReactNode;
  'aria-invalid'?: AriaAttributes['aria-invalid'] | undefined;
}

export interface SelectContentProps extends Omit<PrimitiveSelectContentProps, 'children'> {
  children: ReactNode;
}

export interface SelectOptionProps extends Omit<PrimitiveSelectOptionProps, 'children'> {
  children: ReactNode;
}
