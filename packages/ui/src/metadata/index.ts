import { buttonMetadata } from '../button/Button.meta';

export { buttonMetadata };

export const componentMetadataRegistry = {
  button: buttonMetadata,
} as const;

export type {
  ComponentMetadata,
  ComponentMetadataExample,
  ComponentMetadataOption,
} from './ComponentMetadata';
