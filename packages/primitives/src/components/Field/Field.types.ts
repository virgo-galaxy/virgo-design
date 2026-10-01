import type { HTMLAttributes, LabelHTMLAttributes, ReactNode } from 'react';
export interface FieldProps extends HTMLAttributes<HTMLDivElement> {
  /** ID for the field's single control. Generated when omitted. */
  controlId?: string | undefined;
  /** Default disabled state for the control. */
  disabled?: boolean | undefined;
  /** Prevents editing while retaining focus and form submission. */
  readOnly?: boolean | undefined;
  /** Marks the control required and shows the label indicator. */
  required?: boolean | undefined;
  /** Consumer-owned validation state; Field never validates data. */
  invalid?: boolean | undefined;
}
export type FieldLabelProps = LabelHTMLAttributes<HTMLLabelElement>;
export type FieldDescriptionProps = HTMLAttributes<HTMLDivElement>;
export type FieldMessageProps = HTMLAttributes<HTMLDivElement>;
export interface FieldControlProps {
  /** Render a custom control with the field's semantic attributes. */
  render: (props: FieldControlAttributes) => ReactNode;
}
export interface FieldControlAttributes {
  id?: string | undefined;
  disabled?: boolean | undefined;
  readOnly?: boolean | undefined;
  required?: boolean | undefined;
  'aria-describedby'?: string | undefined;
  'aria-invalid'?: boolean | 'true' | 'false' | 'grammar' | 'spelling' | undefined;
  'aria-required'?: boolean | 'true' | 'false' | undefined;
}
