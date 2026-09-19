import { buttonMetadata } from '../button/Button.meta';
import { checkboxMetadata } from '../checkbox/Checkbox.meta';
import { inputMetadata } from '../input/Input.meta';
import { textareaMetadata } from '../input/Textarea.meta';
import { selectMetadata } from '../select/Select.meta';

export { buttonMetadata, checkboxMetadata, inputMetadata, selectMetadata, textareaMetadata };

export const componentMetadataRegistry = {
  button: buttonMetadata,
  checkbox: checkboxMetadata,
  input: inputMetadata,
  select: selectMetadata,
  textarea: textareaMetadata,
} as const;

export type {
  ComponentMetadata,
  ComponentMetadataExample,
  ComponentMetadataOption,
} from './ComponentMetadata';
