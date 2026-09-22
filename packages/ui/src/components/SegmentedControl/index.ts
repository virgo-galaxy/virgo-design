import { SegmentedControl as SegmentedControlRoot } from './SegmentedControl';
import { SegmentedControlItem } from './SegmentedControlItem';

export const SegmentedControl = Object.assign(SegmentedControlRoot, {
  Item: SegmentedControlItem,
});

export type {
  SegmentedControlItemProps,
  SegmentedControlMotion,
  SegmentedControlProps,
  SegmentedControlSize,
  SegmentedControlVariant,
} from './SegmentedControl.types';
