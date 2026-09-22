import { Checkbox as CheckboxRoot } from './Checkbox';
import { CheckboxGroup } from './CheckboxGroup';

export const Checkbox = Object.assign(CheckboxRoot, {
  Group: CheckboxGroup,
});

export type { CheckboxGroupProps, CheckboxProps } from './Checkbox.types';
