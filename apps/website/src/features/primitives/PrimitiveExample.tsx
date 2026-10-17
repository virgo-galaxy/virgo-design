import type { ComponentType } from 'react';

import { AccordionExample } from './examples/AccordionExample';
import { BreadcrumbExample } from './examples/BreadcrumbExample';
import { ButtonExample } from './examples/ButtonExample';
import { CalendarExample } from './examples/CalendarExample';
import { CarouselExample } from './examples/CarouselExample';
import { CheckboxExample } from './examples/CheckboxExample';
import { CollapsibleExample } from './examples/CollapsibleExample';
import { ColorPickerExample } from './examples/ColorPickerExample';
import { ComboboxExample } from './examples/ComboboxExample';
import { CommandExample } from './examples/CommandExample';
import { ContextMenuExample } from './examples/ContextMenuExample';
import { CursorExample } from './examples/CursorExample';
import { DatePickerExample } from './examples/DatePickerExample';
import { DialogExample } from './examples/DialogExample';
import { DockExample } from './examples/DockExample';
import { DropdownExample } from './examples/DropdownExample';
import { FieldExample } from './examples/FieldExample';
import { FormExample } from './examples/FormExample';
import { InputExample } from './examples/InputExample';
import { LayoutExample } from './examples/LayoutExample';
import { MenubarExample } from './examples/MenubarExample';
import { MenuExample } from './examples/MenuExample';
import { NavigationMenuExample } from './examples/NavigationMenuExample';
import { PaginationExample } from './examples/PaginationExample';
import { PopoverExample } from './examples/PopoverExample';
import { RadioExample } from './examples/RadioExample';
import { SelectExample } from './examples/SelectExample';
import { SliderExample } from './examples/SliderExample';
import { SwitchExample } from './examples/SwitchExample';
import { TableExample } from './examples/TableExample';
import { TabsExample } from './examples/TabsExample';
import { TextareaExample } from './examples/TextareaExample';
import { TimelineExample } from './examples/TimelineExample';
import { TimePickerExample } from './examples/TimePickerExample';
import { ToastExample } from './examples/ToastExample';
import { TooltipExample } from './examples/TooltipExample';
import { TreeExample } from './examples/TreeExample';
import type { PrimitiveSlug } from './primitiveDocs';

const examples = {
  accordion: AccordionExample,
  breadcrumb: BreadcrumbExample,
  button: ButtonExample,
  calendar: CalendarExample,
  carousel: CarouselExample,
  checkbox: CheckboxExample,
  collapsible: CollapsibleExample,
  'color-picker': ColorPickerExample,
  combobox: ComboboxExample,
  command: CommandExample,
  'context-menu': ContextMenuExample,
  cursor: CursorExample,
  'date-picker': DatePickerExample,
  dialog: DialogExample,
  dock: DockExample,
  dropdown: DropdownExample,
  field: FieldExample,
  form: FormExample,
  input: InputExample,
  layout: LayoutExample,
  menu: MenuExample,
  menubar: MenubarExample,
  'navigation-menu': NavigationMenuExample,
  pagination: PaginationExample,
  popover: PopoverExample,
  radio: RadioExample,
  select: SelectExample,
  slider: SliderExample,
  switch: SwitchExample,
  table: TableExample,
  tabs: TabsExample,
  textarea: TextareaExample,
  'time-picker': TimePickerExample,
  timeline: TimelineExample,
  toast: ToastExample,
  tooltip: TooltipExample,
  tree: TreeExample,
} satisfies Record<PrimitiveSlug, ComponentType>;

export function PrimitiveExample({ slug }: { slug: PrimitiveSlug }) {
  const Example = examples[slug];

  return <Example />;
}
