import { buttonMetadata } from '../button/Button.meta';
import { checkboxMetadata } from '../checkbox/Checkbox.meta';
import { inputMetadata } from '../input/Input.meta';
import { textareaMetadata } from '../input/Textarea.meta';
import { radioMetadata } from '../radio/Radio.meta';
import { selectMetadata } from '../select/Select.meta';

export {
  buttonMetadata,
  checkboxMetadata,
  inputMetadata,
  radioMetadata,
  selectMetadata,
  textareaMetadata,
};

export const componentMetadataRegistry = {
  button: buttonMetadata,
  checkbox: checkboxMetadata,
  input: inputMetadata,
  radio: radioMetadata,
  select: selectMetadata,
  textarea: textareaMetadata,
} as const;

export type {
  ComponentMetadata,
  ComponentMetadataExample,
  ComponentMetadataOption,
} from './ComponentMetadata';
