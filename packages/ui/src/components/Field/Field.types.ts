import type { FieldProps as PrimitiveFieldProps } from '@virgo-design/primitives';
export interface FieldProps extends PrimitiveFieldProps {
  /** Local label/control arrangement; inherits Form layout when omitted. */
  layout?: 'vertical' | 'horizontal' | undefined;
}
export type {
  FieldControlAttributes,
  FieldControlProps,
  FieldDescriptionProps,
  FieldLabelProps,
  FieldMessageProps,
} from '@virgo-design/primitives';
