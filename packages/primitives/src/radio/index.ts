import { Radio as RadioRoot } from './Radio';
import { RadioGroup } from './RadioGroup';

export const Radio = Object.assign(RadioRoot, {
  Group: RadioGroup,
});

export type { RadioProps } from './Radio.types';
export type { RadioGroupOrientation, RadioGroupProps } from './RadioGroup.types';
