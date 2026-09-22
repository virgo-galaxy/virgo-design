import { Radio as RadioRoot } from './Radio';
import { RadioGroup } from './RadioGroup';

export const Radio = Object.assign(RadioRoot, {
  Group: RadioGroup,
});

export type { RadioGroupProps, RadioProps } from './Radio.types';
