import type {
  SelectContentProps as PrimitiveSelectContentProps,
  SelectMultipleProps as PrimitiveSelectMultipleProps,
  SelectOptionProps as PrimitiveSelectOptionProps,
  SelectProps as PrimitiveSelectProps,
  SelectTriggerProps as PrimitiveSelectTriggerProps,
} from '@virgo-design/primitives';
import type { AriaAttributes, ReactNode } from 'react';

import type { TagIntent } from '../Tag/Tag.types';

export type SelectSize = 'mini' | 'small' | 'medium' | 'large';

export interface SelectProps extends Omit<PrimitiveSelectProps, 'children' | 'className'> {
  children: ReactNode;
  size?: SelectSize | undefined;
  invalid?: boolean | undefined;
  className?: string | undefined;
}

export interface SelectMultipleProps extends Omit<
  PrimitiveSelectMultipleProps,
  'children' | 'className'
> {
  children: ReactNode;
  size?: SelectSize | undefined;
  invalid?: boolean | undefined;
  className?: string | undefined;
}

export interface SelectTriggerProps extends Omit<PrimitiveSelectTriggerProps, 'children'> {
  children?: ReactNode;
  placeholder?: ReactNode;
  /** Render the selected value without changing option labels or keyboard behavior. */
  renderValue?: (value: string | undefined, label: ReactNode) => ReactNode;
  /** Custom decorative indicator; null hides it. */
  indicator?: ReactNode;
  'aria-invalid'?: AriaAttributes['aria-invalid'] | undefined;
}

export interface SelectContentProps extends Omit<PrimitiveSelectContentProps, 'children'> {
  children: ReactNode;
}

export interface SelectOptionProps extends Omit<PrimitiveSelectOptionProps, 'children'> {
  children: ReactNode;
  /** Semantic color for the selected value and removable selected tag; dropdown rows stay neutral. */
  intent?: TagIntent | undefined;
}
