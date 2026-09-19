import { buttonMetadata } from '../button/Button.meta';
import { inputMetadata } from '../input/Input.meta';

export { buttonMetadata, inputMetadata };

export const componentMetadataRegistry = {
  button: buttonMetadata,
  input: inputMetadata,
} as const;

export type {
  ComponentMetadata,
  ComponentMetadataExample,
  ComponentMetadataOption,
} from './ComponentMetadata';
