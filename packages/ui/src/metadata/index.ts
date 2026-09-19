import { buttonMetadata } from '../button/Button.meta';
import { inputMetadata } from '../input/Input.meta';
import { textareaMetadata } from '../input/Textarea.meta';
import { selectMetadata } from '../select/Select.meta';

export { buttonMetadata, inputMetadata, selectMetadata, textareaMetadata };

export const componentMetadataRegistry = {
  button: buttonMetadata,
  input: inputMetadata,
  select: selectMetadata,
  textarea: textareaMetadata,
} as const;

export type {
  ComponentMetadata,
  ComponentMetadataExample,
  ComponentMetadataOption,
} from './ComponentMetadata';
