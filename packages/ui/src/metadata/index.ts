import { buttonMetadata } from '../button/Button.meta';
import { checkboxMetadata } from '../checkbox/Checkbox.meta';
import { inputMetadata } from '../input/Input.meta';
import { textareaMetadata } from '../input/Textarea.meta';
import { radioMetadata } from '../radio/Radio.meta';
import { segmentedControlMetadata } from '../segmented-control/SegmentedControl.meta';
import { selectMetadata } from '../select/Select.meta';
import { switchMetadata } from '../switch/Switch.meta';

export {
  buttonMetadata,
  checkboxMetadata,
  inputMetadata,
  radioMetadata,
  segmentedControlMetadata,
  selectMetadata,
  switchMetadata,
  textareaMetadata,
};

export const componentMetadataRegistry = {
  button: buttonMetadata,
  checkbox: checkboxMetadata,
  input: inputMetadata,
  radio: radioMetadata,
  segmentedControl: segmentedControlMetadata,
  select: selectMetadata,
  switch: switchMetadata,
  textarea: textareaMetadata,
} as const;

export type {
  ComponentMetadata,
  ComponentMetadataExample,
  ComponentMetadataOption,
} from './ComponentMetadata';
