import { buttonMetadata } from '../button/Button.meta';
import { inputMetadata } from '../input/Input.meta';
import { textareaMetadata } from '../input/Textarea.meta';

export { buttonMetadata, inputMetadata, textareaMetadata };

export const componentMetadataRegistry = {
  button: buttonMetadata,
  input: inputMetadata,
  textarea: textareaMetadata,
} as const;

export type {
  ComponentMetadata,
  ComponentMetadataExample,
  ComponentMetadataOption,
} from './ComponentMetadata';
