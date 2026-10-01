import type { ComponentType } from 'react';

import type { ComponentPageMetadataValue } from '../components/ComponentPageMetadata';
import { AccordionPage } from '../pages/accordion/AccordionPage';
import { AlertPage } from '../pages/alert/AlertPage';
import { AvatarPage } from '../pages/avatar/AvatarPage';
import { BadgePage } from '../pages/badge/BadgePage';
import { BreadcrumbPage } from '../pages/breadcrumb/BreadcrumbPage';
import { ButtonPage } from '../pages/button/ButtonPage';
import { CalendarPage } from '../pages/calendar/CalendarPage';
import { CardPage } from '../pages/card/CardPage';
import { CheckboxPage } from '../pages/checkbox/CheckboxPage';
import { ColorPickerPage } from '../pages/color-picker/ColorPickerPage';
import { ComboboxPage } from '../pages/combobox/ComboboxPage';
import { CommandPage } from '../pages/command/CommandPage';
import { CursorPage } from '../pages/cursor/CursorPage';
import { DatePickerPage } from '../pages/date-picker/DatePickerPage';
import { DialogPage } from '../pages/dialog/DialogPage';
import { DockPage } from '../pages/dock/DockPage';
import { DrawerPage } from '../pages/drawer/DrawerPage';
import { DropdownPage } from '../pages/dropdown/DropdownPage';
import { EmptyPage } from '../pages/empty/EmptyPage';
import { FieldPage } from '../pages/field/FieldPage';
import { FloatingActionPage } from '../pages/floating-action/FloatingActionPage';
import { FormPage } from '../pages/form/FormPage';
import { InputPage } from '../pages/input/InputPage';
import { LayoutPage } from '../pages/layout/LayoutPage';
import { ContextMenuPage, MenubarPage, MenuPage } from '../pages/menu-system/MenuSystemPages';
import { NavigationMenuPage } from '../pages/navigation-menu/NavigationMenuPage';
import { PaginationPage } from '../pages/pagination/PaginationPage';
import { PopoverPage } from '../pages/popover/PopoverPage';
import { ProgressPage } from '../pages/progress/ProgressPage';
import { RadioPage } from '../pages/radio/RadioPage';
import { SegmentedControlPage } from '../pages/segmented-control/SegmentedControlPage';
import { SelectPage } from '../pages/select/SelectPage';
import { SeparatorPage } from '../pages/separator/SeparatorPage';
import { SkeletonPage } from '../pages/skeleton/SkeletonPage';
import { SliderPage } from '../pages/slider/SliderPage';
import { SpinnerPage } from '../pages/spinner/SpinnerPage';
import { SurfacePage } from '../pages/surface/SurfacePage';
import { SwitchPage } from '../pages/switch/SwitchPage';
import { TablePage } from '../pages/table/TablePage';
import { TabsPage } from '../pages/tabs/TabsPage';
import { TagPage } from '../pages/tag/TagPage';
import { TimePickerPage } from '../pages/time-picker/TimePickerPage';
import { TimelinePage } from '../pages/timeline/TimelinePage';
import { ToastPage } from '../pages/toast/ToastPage';
import { TooltipPage } from '../pages/tooltip/TooltipPage';
import { TreePage } from '../pages/tree/TreePage';

export type ComponentGroupId =
  | 'general'
  | 'layout'
  | 'navigation'
  | 'data-entry'
  | 'interaction'
  | 'data-display'
  | 'feedback'
  | 'actions';

export const componentGroups = [
  {
    id: 'general',
    label: 'General',
  },
  {
    id: 'layout',
    label: 'Layout',
  },
  {
    id: 'navigation',
    label: 'Navigation',
  },
  {
    id: 'data-entry',
    label: 'Data Entry',
  },
  {
    id: 'interaction',
    label: 'Interaction',
  },
  {
    id: 'data-display',
    label: 'Data Display',
  },
  {
    id: 'feedback',
    label: 'Feedback',
  },
  { id: 'actions', label: 'Actions' },
] as const satisfies ReadonlyArray<{
  id: ComponentGroupId;
  label: string;
}>;

export type ComponentRoute = ComponentPageMetadataValue & {
  group: ComponentGroupId;
  id:
    | 'timeline'
    | 'calendar'
    | 'date-picker'
    | 'time-picker'
    | 'color-picker'
    | 'slider'
    | 'form'
    | 'field'
    | 'table'
    | 'tree'
    | 'combobox'
    | 'menu'
    | 'context-menu'
    | 'menubar'
    | 'accordion'
    | 'alert'
    | 'avatar'
    | 'badge'
    | 'button'
    | 'card'
    | 'surface'
    | 'layout'
    | 'navigation-menu'
    | 'input'
    | 'select'
    | 'separator'
    | 'skeleton'
    | 'spinner'
    | 'checkbox'
    | 'command'
    | 'cursor'
    | 'dialog'
    | 'drawer'
    | 'dock'
    | 'radio'
    | 'switch'
    | 'segmented-control'
    | 'tabs'
    | 'tag'
    | 'pagination'
    | 'popover'
    | 'progress'
    | 'tooltip'
    | 'toast'
    | 'dropdown'
    | 'empty'
    | 'floating-action'
    | 'breadcrumb';
  name: string;
  category: string;
  path: string;
  Component: ComponentType;
};

export const componentRoutes = [
  {
    id: 'button',
    group: 'general',
    index: '01',
    name: 'Button',
    category: 'Actions',
    path: '/components/button',
    status: 'stable',
    version: 'V1.0.0',
    Component: ButtonPage,
  },
  {
    id: 'surface',
    group: 'general',
    index: '02',
    name: 'Surface',
    category: 'Appearance',
    path: '/components/surface',
    status: 'stable',
    version: 'V1.0.0',
    Component: SurfacePage,
  },
  {
    id: 'dock',
    group: 'layout',
    index: '03',
    name: 'Dock',
    category: 'Layout',
    path: '/components/dock',
    status: 'stable',
    version: 'V1.0.0',
    Component: DockPage,
  },
  {
    id: 'layout',
    group: 'layout',
    index: '04',
    name: 'Layout',
    category: 'Structure',
    path: '/components/layout',
    status: 'stable',
    version: 'V1.0.0',
    Component: LayoutPage,
  },
  {
    id: 'separator',
    group: 'layout',
    index: '05',
    name: 'Separator',
    category: 'Layout',
    path: '/components/separator',
    status: 'stable',
    version: 'V1.0.0',
    Component: SeparatorPage,
  },
  {
    id: 'breadcrumb',
    group: 'navigation',
    index: '06',
    name: 'Breadcrumb',
    category: 'Navigation',
    path: '/components/breadcrumb',
    status: 'stable',
    version: 'V1.0.0',
    Component: BreadcrumbPage,
  },
  {
    id: 'dropdown',
    group: 'navigation',
    index: '07',
    name: 'Dropdown',
    category: 'Navigation',
    path: '/components/dropdown',
    status: 'stable',
    version: 'V1.0.0',
    Component: DropdownPage,
  },
  {
    id: 'navigation-menu',
    group: 'navigation',
    index: '08',
    name: 'NavigationMenu',
    category: 'Navigation',
    path: '/components/navigation-menu',
    status: 'stable',
    version: 'V1.0.0',
    Component: NavigationMenuPage,
  },
  {
    id: 'pagination',
    group: 'navigation',
    index: '09',
    name: 'Pagination',
    category: 'Navigation',
    path: '/components/pagination',
    status: 'stable',
    version: 'V1.0.0',
    Component: PaginationPage,
  },
  {
    id: 'tabs',
    group: 'navigation',
    index: '10',
    name: 'Tabs',
    category: 'Navigation',
    path: '/components/tabs',
    status: 'stable',
    version: 'V1.0.0',
    Component: TabsPage,
  },
  {
    id: 'tree',
    group: 'navigation',
    index: '11',
    name: 'Tree',
    category: 'Navigation',
    path: '/components/tree',
    status: 'stable',
    version: 'V1.0.0',
    Component: TreePage,
  },
  {
    id: 'calendar',
    group: 'data-entry',
    index: '12',
    name: 'Calendar',
    category: 'Forms',
    path: '/components/calendar',
    status: 'stable',
    version: 'V1.0.0',
    Component: CalendarPage,
  },
  {
    id: 'checkbox',
    group: 'data-entry',
    index: '13',
    name: 'Checkbox',
    category: 'Forms',
    path: '/components/checkbox',
    status: 'stable',
    version: 'V1.0.0',
    Component: CheckboxPage,
  },
  {
    id: 'color-picker',
    group: 'data-entry',
    index: '14',
    name: 'ColorPicker',
    category: 'Forms',
    path: '/components/color-picker',
    status: 'stable',
    version: 'V1.0.0',
    Component: ColorPickerPage,
  },
  {
    id: 'combobox',
    group: 'data-entry',
    index: '15',
    name: 'Combobox',
    category: 'Forms',
    path: '/components/combobox',
    status: 'stable',
    version: 'V1.0.0',
    Component: ComboboxPage,
  },
  {
    id: 'date-picker',
    group: 'data-entry',
    index: '16',
    name: 'DatePicker',
    category: 'Forms',
    path: '/components/date-picker',
    status: 'stable',
    version: 'V1.0.0',
    Component: DatePickerPage,
  },
  {
    id: 'field',
    group: 'data-entry',
    index: '17',
    name: 'Field',
    category: 'Forms',
    path: '/components/field',
    status: 'stable',
    version: 'V1.0.0',
    Component: FieldPage,
  },
  {
    id: 'form',
    group: 'data-entry',
    index: '18',
    name: 'Form',
    category: 'Forms',
    path: '/components/form',
    status: 'stable',
    version: 'V1.0.0',
    Component: FormPage,
  },
  {
    id: 'input',
    group: 'data-entry',
    index: '19',
    name: 'Input',
    category: 'Forms',
    path: '/components/input',
    status: 'stable',
    version: 'V1.0.0',
    Component: InputPage,
  },
  {
    id: 'radio',
    group: 'data-entry',
    index: '20',
    name: 'Radio',
    category: 'Forms',
    path: '/components/radio',
    status: 'stable',
    version: 'V1.0.0',
    Component: RadioPage,
  },
  {
    id: 'segmented-control',
    group: 'data-entry',
    index: '21',
    name: 'Segmented Control',
    category: 'Forms',
    path: '/components/segmented-control',
    status: 'stable',
    version: 'V1.0.0',
    Component: SegmentedControlPage,
  },
  {
    id: 'select',
    group: 'data-entry',
    index: '22',
    name: 'Select',
    category: 'Forms',
    path: '/components/select',
    status: 'stable',
    version: 'V1.0.0',
    Component: SelectPage,
  },
  {
    id: 'slider',
    group: 'data-entry',
    index: '23',
    name: 'Slider',
    category: 'Forms',
    path: '/components/slider',
    status: 'stable',
    version: 'V1.0.0',
    Component: SliderPage,
  },
  {
    id: 'switch',
    group: 'data-entry',
    index: '24',
    name: 'Switch',
    category: 'Forms',
    path: '/components/switch',
    status: 'stable',
    version: 'V1.0.0',
    Component: SwitchPage,
  },
  {
    id: 'time-picker',
    group: 'data-entry',
    index: '25',
    name: 'TimePicker',
    category: 'Forms',
    path: '/components/time-picker',
    status: 'stable',
    version: 'V1.0.0',
    Component: TimePickerPage,
  },
  {
    id: 'cursor',
    group: 'interaction',
    index: '26',
    name: 'Cursor',
    category: 'Interaction',
    path: '/components/cursor',
    status: 'stable',
    version: 'V1.0.0',
    Component: CursorPage,
  },
  {
    id: 'accordion',
    group: 'data-display',
    index: '27',
    name: 'Accordion',
    category: 'Data Display',
    path: '/components/accordion',
    status: 'stable',
    version: 'V1.0.0',
    Component: AccordionPage,
  },
  {
    id: 'avatar',
    group: 'data-display',
    index: '28',
    name: 'Avatar',
    category: 'Data Display',
    path: '/components/avatar',
    status: 'stable',
    version: 'V1.0.0',
    Component: AvatarPage,
  },
  {
    id: 'badge',
    group: 'data-display',
    index: '29',
    name: 'Badge',
    category: 'Data Display',
    path: '/components/badge',
    status: 'stable',
    version: 'V1.0.0',
    Component: BadgePage,
  },
  {
    id: 'card',
    group: 'data-display',
    index: '30',
    name: 'Card',
    category: 'Data Display',
    path: '/components/card',
    status: 'stable',
    version: 'V1.0.0',
    Component: CardPage,
  },
  {
    id: 'empty',
    group: 'data-display',
    index: '31',
    name: 'Empty',
    category: 'Data Display',
    path: '/components/empty',
    status: 'stable',
    version: 'V1.0.0',
    Component: EmptyPage,
  },
  {
    id: 'popover',
    group: 'data-display',
    index: '32',
    name: 'Popover',
    category: 'Data Display',
    path: '/components/popover',
    status: 'stable',
    version: 'V1.0.0',
    Component: PopoverPage,
  },
  {
    id: 'table',
    group: 'data-display',
    index: '33',
    name: 'Table',
    category: 'Data Display',
    path: '/components/table',
    status: 'stable',
    version: 'V1.0.0',
    Component: TablePage,
  },
  {
    id: 'tag',
    group: 'data-display',
    index: '34',
    name: 'Tag',
    category: 'Data Display',
    path: '/components/tag',
    status: 'stable',
    version: 'V1.0.0',
    Component: TagPage,
  },
  {
    id: 'timeline',
    group: 'data-display',
    index: '35',
    name: 'Timeline',
    category: 'Data Display',
    path: '/components/timeline',
    status: 'stable',
    version: 'V1.0.0',
    Component: TimelinePage,
  },
  {
    id: 'tooltip',
    group: 'data-display',
    index: '36',
    name: 'Tooltip',
    category: 'Data Display',
    path: '/components/tooltip',
    status: 'stable',
    version: 'V1.0.0',
    Component: TooltipPage,
  },
  {
    id: 'alert',
    group: 'feedback',
    index: '37',
    name: 'Alert',
    category: 'Feedback',
    path: '/components/alert',
    status: 'stable',
    version: 'V1.0.0',
    Component: AlertPage,
  },
  {
    id: 'dialog',
    group: 'feedback',
    index: '38',
    name: 'Dialog',
    category: 'Feedback',
    path: '/components/dialog',
    status: 'stable',
    version: 'V1.0.0',
    Component: DialogPage,
  },
  {
    id: 'drawer',
    group: 'feedback',
    index: '39',
    name: 'Drawer',
    category: 'Feedback',
    path: '/components/drawer',
    status: 'stable',
    version: 'V1.0.0',
    Component: DrawerPage,
  },
  {
    id: 'progress',
    group: 'feedback',
    index: '40',
    name: 'Progress',
    category: 'Feedback',
    path: '/components/progress',
    status: 'stable',
    version: 'V1.0.0',
    Component: ProgressPage,
  },
  {
    id: 'skeleton',
    group: 'feedback',
    index: '41',
    name: 'Skeleton',
    category: 'Feedback',
    path: '/components/skeleton',
    status: 'stable',
    version: 'V1.0.0',
    Component: SkeletonPage,
  },
  {
    id: 'spinner',
    group: 'feedback',
    index: '42',
    name: 'Spinner',
    category: 'Feedback',
    path: '/components/spinner',
    status: 'stable',
    version: 'V1.0.0',
    Component: SpinnerPage,
  },
  {
    id: 'toast',
    group: 'feedback',
    index: '43',
    name: 'Toast',
    category: 'Feedback',
    path: '/components/toast',
    status: 'stable',
    version: 'V1.0.0',
    Component: ToastPage,
  },
  {
    id: 'command',
    group: 'actions',
    index: '44',
    name: 'Command',
    category: 'Actions',
    path: '/components/command',
    status: 'stable',
    version: 'V1.0.0',
    Component: CommandPage,
  },
  {
    id: 'context-menu',
    group: 'actions',
    index: '45',
    name: 'ContextMenu',
    category: 'Actions',
    path: '/components/context-menu',
    status: 'stable',
    version: 'V1.0.0',
    Component: ContextMenuPage,
  },
  {
    id: 'floating-action',
    group: 'actions',
    index: '46',
    name: 'FloatingAction',
    category: 'Actions',
    path: '/components/floating-action',
    status: 'stable',
    version: 'V1.0.0',
    Component: FloatingActionPage,
  },
  {
    id: 'menu',
    group: 'actions',
    index: '47',
    name: 'Menu',
    category: 'Actions',
    path: '/components/menu',
    status: 'stable',
    version: 'V1.0.0',
    Component: MenuPage,
  },
  {
    id: 'menubar',
    group: 'actions',
    index: '48',
    name: 'Menubar',
    category: 'Actions',
    path: '/components/menubar',
    status: 'stable',
    version: 'V1.0.0',
    Component: MenubarPage,
  },
] as const satisfies ReadonlyArray<ComponentRoute>;

export type ComponentSlug = (typeof componentRoutes)[number]['id'];
