import { Checkbox as CheckboxRoot } from './Checkbox';
import { CheckboxGroup } from './CheckboxGroup';

export const Checkbox = Object.assign(CheckboxRoot, {
  Group: CheckboxGroup,
});

export type { CheckboxProps } from './Checkbox.types';
export type { CheckboxGroupProps } from './CheckboxGroup.types';
