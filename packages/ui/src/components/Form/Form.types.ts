import type { FormProps as PrimitiveFormProps } from '@virgo-design/primitives';
export interface FormProps extends PrimitiveFormProps {
  /** Field label/control arrangement. @default 'vertical' */
  layout?: 'vertical' | 'horizontal' | undefined;
  /** Spacing between fields. @default 'medium' */
  size?: 'small' | 'medium' | 'large' | undefined;
}
