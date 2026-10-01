import {
  Field as FieldRoot,
  FieldControl,
  FieldDescription,
  FieldLabel,
  FieldMessage,
} from './Field';
export const Field = Object.assign(FieldRoot, {
  Root: FieldRoot,
  Label: FieldLabel,
  Control: FieldControl,
  Description: FieldDescription,
  Message: FieldMessage,
});
export type {
  FieldControlAttributes,
  FieldControlProps,
  FieldDescriptionProps,
  FieldLabelProps,
  FieldMessageProps,
  FieldProps,
} from './Field.types';
