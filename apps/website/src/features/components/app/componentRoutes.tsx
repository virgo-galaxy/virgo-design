import { type ComponentType, lazy } from 'react';

import type { ComponentPageMetadataValue } from '../components/ComponentPageMetadata';

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
    | 'steps'
    | 'collapsible'
    | 'carousel'
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
    | 'toolbar'
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
    | 'statistic'
    | 'result'
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
    Component: lazy(() =>
      import('../pages/button/ButtonPage').then((module) => ({ default: module.ButtonPage })),
    ),
  },
  {
    id: 'surface',
    group: 'general',
    index: '02',
    name: 'Surface',
    category: 'Appearance',
    path: '/components/surface',
    Component: lazy(() =>
      import('../pages/surface/SurfacePage').then((module) => ({ default: module.SurfacePage })),
    ),
  },
  {
    id: 'dock',
    group: 'layout',
    index: '03',
    name: 'Dock',
    category: 'Layout',
    path: '/components/dock',
    Component: lazy(() =>
      import('../pages/dock/DockPage').then((module) => ({ default: module.DockPage })),
    ),
  },
  {
    id: 'layout',
    group: 'layout',
    index: '04',
    name: 'Layout',
    category: 'Structure',
    path: '/components/layout',
    Component: lazy(() =>
      import('../pages/layout/LayoutPage').then((module) => ({ default: module.LayoutPage })),
    ),
  },
  {
    id: 'separator',
    group: 'layout',
    index: '05',
    name: 'Separator',
    category: 'Layout',
    path: '/components/separator',
    Component: lazy(() =>
      import('../pages/separator/SeparatorPage').then((module) => ({
        default: module.SeparatorPage,
      })),
    ),
  },
  {
    id: 'breadcrumb',
    group: 'navigation',
    index: '06',
    name: 'Breadcrumb',
    category: 'Navigation',
    path: '/components/breadcrumb',
    Component: lazy(() =>
      import('../pages/breadcrumb/BreadcrumbPage').then((module) => ({
        default: module.BreadcrumbPage,
      })),
    ),
  },
  {
    id: 'dropdown',
    group: 'navigation',
    index: '07',
    name: 'Dropdown',
    category: 'Navigation',
    path: '/components/dropdown',
    Component: lazy(() =>
      import('../pages/dropdown/DropdownPage').then((module) => ({ default: module.DropdownPage })),
    ),
  },
  {
    id: 'navigation-menu',
    group: 'navigation',
    index: '08',
    name: 'NavigationMenu',
    category: 'Navigation',
    path: '/components/navigation-menu',
    Component: lazy(() =>
      import('../pages/navigation-menu/NavigationMenuPage').then((module) => ({
        default: module.NavigationMenuPage,
      })),
    ),
  },
  {
    id: 'pagination',
    group: 'navigation',
    index: '09',
    name: 'Pagination',
    category: 'Navigation',
    path: '/components/pagination',
    Component: lazy(() =>
      import('../pages/pagination/PaginationPage').then((module) => ({
        default: module.PaginationPage,
      })),
    ),
  },
  {
    id: 'steps',
    group: 'navigation',
    index: '10',
    name: 'Steps',
    category: 'Navigation',
    path: '/components/steps',
    Component: lazy(() =>
      import('../pages/steps/StepsPage').then((module) => ({ default: module.StepsPage })),
    ),
  },
  {
    id: 'tabs',
    group: 'navigation',
    index: '11',
    name: 'Tabs',
    category: 'Navigation',
    path: '/components/tabs',
    Component: lazy(() =>
      import('../pages/tabs/TabsPage').then((module) => ({ default: module.TabsPage })),
    ),
  },
  {
    id: 'tree',
    group: 'navigation',
    index: '12',
    name: 'Tree',
    category: 'Navigation',
    path: '/components/tree',
    Component: lazy(() =>
      import('../pages/tree/TreePage').then((module) => ({ default: module.TreePage })),
    ),
  },
  {
    id: 'calendar',
    group: 'data-entry',
    index: '13',
    name: 'Calendar',
    category: 'Forms',
    path: '/components/calendar',
    Component: lazy(() =>
      import('../pages/calendar/CalendarPage').then((module) => ({ default: module.CalendarPage })),
    ),
  },
  {
    id: 'checkbox',
    group: 'data-entry',
    index: '14',
    name: 'Checkbox',
    category: 'Forms',
    path: '/components/checkbox',
    Component: lazy(() =>
      import('../pages/checkbox/CheckboxPage').then((module) => ({ default: module.CheckboxPage })),
    ),
  },
  {
    id: 'color-picker',
    group: 'data-entry',
    index: '15',
    name: 'ColorPicker',
    category: 'Forms',
    path: '/components/color-picker',
    Component: lazy(() =>
      import('../pages/color-picker/ColorPickerPage').then((module) => ({
        default: module.ColorPickerPage,
      })),
    ),
  },
  {
    id: 'combobox',
    group: 'data-entry',
    index: '16',
    name: 'Combobox',
    category: 'Forms',
    path: '/components/combobox',
    Component: lazy(() =>
      import('../pages/combobox/ComboboxPage').then((module) => ({ default: module.ComboboxPage })),
    ),
  },
  {
    id: 'date-picker',
    group: 'data-entry',
    index: '17',
    name: 'DatePicker',
    category: 'Forms',
    path: '/components/date-picker',
    Component: lazy(() =>
      import('../pages/date-picker/DatePickerPage').then((module) => ({
        default: module.DatePickerPage,
      })),
    ),
  },
  {
    id: 'field',
    group: 'data-entry',
    index: '18',
    name: 'Field',
    category: 'Forms',
    path: '/components/field',
    Component: lazy(() =>
      import('../pages/field/FieldPage').then((module) => ({ default: module.FieldPage })),
    ),
  },
  {
    id: 'form',
    group: 'data-entry',
    index: '19',
    name: 'Form',
    category: 'Forms',
    path: '/components/form',
    Component: lazy(() =>
      import('../pages/form/FormPage').then((module) => ({ default: module.FormPage })),
    ),
  },
  {
    id: 'input',
    group: 'data-entry',
    index: '20',
    name: 'Input',
    category: 'Forms',
    path: '/components/input',
    Component: lazy(() =>
      import('../pages/input/InputPage').then((module) => ({ default: module.InputPage })),
    ),
  },
  {
    id: 'radio',
    group: 'data-entry',
    index: '21',
    name: 'Radio',
    category: 'Forms',
    path: '/components/radio',
    Component: lazy(() =>
      import('../pages/radio/RadioPage').then((module) => ({ default: module.RadioPage })),
    ),
  },
  {
    id: 'segmented-control',
    group: 'data-entry',
    index: '22',
    name: 'Segmented Control',
    category: 'Forms',
    path: '/components/segmented-control',
    Component: lazy(() =>
      import('../pages/segmented-control/SegmentedControlPage').then((module) => ({
        default: module.SegmentedControlPage,
      })),
    ),
  },
  {
    id: 'select',
    group: 'data-entry',
    index: '23',
    name: 'Select',
    category: 'Forms',
    path: '/components/select',
    Component: lazy(() =>
      import('../pages/select/SelectPage').then((module) => ({ default: module.SelectPage })),
    ),
  },
  {
    id: 'slider',
    group: 'data-entry',
    index: '24',
    name: 'Slider',
    category: 'Forms',
    path: '/components/slider',
    Component: lazy(() =>
      import('../pages/slider/SliderPage').then((module) => ({ default: module.SliderPage })),
    ),
  },
  {
    id: 'switch',
    group: 'data-entry',
    index: '25',
    name: 'Switch',
    category: 'Forms',
    path: '/components/switch',
    Component: lazy(() =>
      import('../pages/switch/SwitchPage').then((module) => ({ default: module.SwitchPage })),
    ),
  },
  {
    id: 'time-picker',
    group: 'data-entry',
    index: '26',
    name: 'TimePicker',
    category: 'Forms',
    path: '/components/time-picker',
    Component: lazy(() =>
      import('../pages/time-picker/TimePickerPage').then((module) => ({
        default: module.TimePickerPage,
      })),
    ),
  },
  {
    id: 'collapsible',
    group: 'interaction',
    index: '27',
    name: 'Collapsible',
    category: 'Interaction',
    path: '/components/collapsible',
    Component: lazy(() =>
      import('../pages/collapsible/CollapsiblePage').then((module) => ({
        default: module.CollapsiblePage,
      })),
    ),
  },
  {
    id: 'cursor',
    group: 'interaction',
    index: '28',
    name: 'Cursor',
    category: 'Interaction',
    path: '/components/cursor',
    Component: lazy(() =>
      import('../pages/cursor/CursorPage').then((module) => ({ default: module.CursorPage })),
    ),
  },
  {
    id: 'accordion',
    group: 'data-display',
    index: '29',
    name: 'Accordion',
    category: 'Data Display',
    path: '/components/accordion',
    Component: lazy(() =>
      import('../pages/accordion/AccordionPage').then((module) => ({
        default: module.AccordionPage,
      })),
    ),
  },
  {
    id: 'avatar',
    group: 'data-display',
    index: '30',
    name: 'Avatar',
    category: 'Data Display',
    path: '/components/avatar',
    Component: lazy(() =>
      import('../pages/avatar/AvatarPage').then((module) => ({ default: module.AvatarPage })),
    ),
  },
  {
    id: 'badge',
    group: 'data-display',
    index: '31',
    name: 'Badge',
    category: 'Data Display',
    path: '/components/badge',
    Component: lazy(() =>
      import('../pages/badge/BadgePage').then((module) => ({ default: module.BadgePage })),
    ),
  },
  {
    id: 'card',
    group: 'data-display',
    index: '32',
    name: 'Card',
    category: 'Data Display',
    path: '/components/card',
    Component: lazy(() =>
      import('../pages/card/CardPage').then((module) => ({ default: module.CardPage })),
    ),
  },

  {
    id: 'carousel',
    group: 'data-display',
    index: '51',
    name: 'Carousel',
    category: 'Data Display',
    path: '/components/carousel',
    Component: lazy(() =>
      import('../pages/carousel/CarouselPage').then((module) => ({ default: module.CarouselPage })),
    ),
  },
  {
    id: 'empty',
    group: 'data-display',
    index: '33',
    name: 'Empty',
    category: 'Data Display',
    path: '/components/empty',
    Component: lazy(() =>
      import('../pages/empty/EmptyPage').then((module) => ({ default: module.EmptyPage })),
    ),
  },
  {
    id: 'popover',
    group: 'data-display',
    index: '34',
    name: 'Popover',
    category: 'Data Display',
    path: '/components/popover',
    Component: lazy(() =>
      import('../pages/popover/PopoverPage').then((module) => ({ default: module.PopoverPage })),
    ),
  },
  {
    id: 'statistic',
    group: 'data-display',
    index: '52',
    name: 'Statistic',
    category: 'Data Display',
    path: '/components/statistic',
    Component: lazy(() =>
      import('../pages/statistic/StatisticPage').then((module) => ({
        default: module.StatisticPage,
      })),
    ),
  },
  {
    id: 'table',
    group: 'data-display',
    index: '35',
    name: 'Table',
    category: 'Data Display',
    path: '/components/table',
    Component: lazy(() =>
      import('../pages/table/TablePage').then((module) => ({ default: module.TablePage })),
    ),
  },
  {
    id: 'tag',
    group: 'data-display',
    index: '36',
    name: 'Tag',
    category: 'Data Display',
    path: '/components/tag',
    Component: lazy(() =>
      import('../pages/tag/TagPage').then((module) => ({ default: module.TagPage })),
    ),
  },
  {
    id: 'timeline',
    group: 'data-display',
    index: '37',
    name: 'Timeline',
    category: 'Data Display',
    path: '/components/timeline',
    Component: lazy(() =>
      import('../pages/timeline/TimelinePage').then((module) => ({ default: module.TimelinePage })),
    ),
  },
  {
    id: 'tooltip',
    group: 'data-display',
    index: '38',
    name: 'Tooltip',
    category: 'Data Display',
    path: '/components/tooltip',
    Component: lazy(() =>
      import('../pages/tooltip/TooltipPage').then((module) => ({ default: module.TooltipPage })),
    ),
  },
  {
    id: 'alert',
    group: 'feedback',
    index: '39',
    name: 'Alert',
    category: 'Feedback',
    path: '/components/alert',
    Component: lazy(() =>
      import('../pages/alert/AlertPage').then((module) => ({ default: module.AlertPage })),
    ),
  },
  {
    id: 'dialog',
    group: 'feedback',
    index: '40',
    name: 'Dialog',
    category: 'Feedback',
    path: '/components/dialog',
    Component: lazy(() =>
      import('../pages/dialog/DialogPage').then((module) => ({ default: module.DialogPage })),
    ),
  },
  {
    id: 'drawer',
    group: 'feedback',
    index: '41',
    name: 'Drawer',
    category: 'Feedback',
    path: '/components/drawer',
    Component: lazy(() =>
      import('../pages/drawer/DrawerPage').then((module) => ({ default: module.DrawerPage })),
    ),
  },
  {
    id: 'progress',
    group: 'feedback',
    index: '42',
    name: 'Progress',
    category: 'Feedback',
    path: '/components/progress',
    Component: lazy(() =>
      import('../pages/progress/ProgressPage').then((module) => ({ default: module.ProgressPage })),
    ),
  },
  {
    id: 'result',
    group: 'feedback',
    index: '53',
    name: 'Result',
    category: 'Feedback',
    path: '/components/result',
    Component: lazy(() =>
      import('../pages/result/ResultPage').then((module) => ({ default: module.ResultPage })),
    ),
  },
  {
    id: 'skeleton',
    group: 'feedback',
    index: '43',
    name: 'Skeleton',
    category: 'Feedback',
    path: '/components/skeleton',
    Component: lazy(() =>
      import('../pages/skeleton/SkeletonPage').then((module) => ({ default: module.SkeletonPage })),
    ),
  },
  {
    id: 'spinner',
    group: 'feedback',
    index: '44',
    name: 'Spinner',
    category: 'Feedback',
    path: '/components/spinner',
    Component: lazy(() =>
      import('../pages/spinner/SpinnerPage').then((module) => ({ default: module.SpinnerPage })),
    ),
  },
  {
    id: 'toast',
    group: 'feedback',
    index: '45',
    name: 'Toast',
    category: 'Feedback',
    path: '/components/toast',
    Component: lazy(() =>
      import('../pages/toast/ToastPage').then((module) => ({ default: module.ToastPage })),
    ),
  },
  {
    id: 'command',
    group: 'actions',
    index: '46',
    name: 'Command',
    category: 'Actions',
    path: '/components/command',
    Component: lazy(() =>
      import('../pages/command/CommandPage').then((module) => ({ default: module.CommandPage })),
    ),
  },
  {
    id: 'context-menu',
    group: 'actions',
    index: '47',
    name: 'ContextMenu',
    category: 'Actions',
    path: '/components/context-menu',
    Component: lazy(() =>
      import('../pages/menu-system/MenuSystemPages').then((module) => ({
        default: module.ContextMenuPage,
      })),
    ),
  },
  {
    id: 'floating-action',
    group: 'actions',
    index: '48',
    name: 'FloatingAction',
    category: 'Actions',
    path: '/components/floating-action',
    Component: lazy(() =>
      import('../pages/floating-action/FloatingActionPage').then((module) => ({
        default: module.FloatingActionPage,
      })),
    ),
  },
  {
    id: 'menu',
    group: 'actions',
    index: '49',
    name: 'Menu',
    category: 'Actions',
    path: '/components/menu',
    Component: lazy(() =>
      import('../pages/menu-system/MenuSystemPages').then((module) => ({
        default: module.MenuPage,
      })),
    ),
  },
  {
    id: 'menubar',
    group: 'actions',
    index: '50',
    name: 'Menubar',
    category: 'Actions',
    path: '/components/menubar',
    Component: lazy(() =>
      import('../pages/menu-system/MenuSystemPages').then((module) => ({
        default: module.MenubarPage,
      })),
    ),
  },
  {
    id: 'toolbar',
    group: 'actions',
    index: '54',
    name: 'Toolbar',
    category: 'Actions',
    path: '/components/toolbar',
    Component: lazy(() =>
      import('../pages/toolbar/ToolbarPage').then((module) => ({ default: module.ToolbarPage })),
    ),
  },
] as const satisfies ReadonlyArray<ComponentRoute>;

export type ComponentSlug = (typeof componentRoutes)[number]['id'];
