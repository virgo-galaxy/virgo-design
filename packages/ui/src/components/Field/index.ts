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
  Description: FieldDescription,
  Message: FieldMessage,
  Control: FieldControl,
});
export type {
  FieldControlAttributes,
  FieldControlProps,
  FieldDescriptionProps,
  FieldLabelProps,
  FieldMessageProps,
  FieldProps,
} from './Field.types';
