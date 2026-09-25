import type { ComponentType } from 'react';

import { AccordionPage } from '../pages/accordion/AccordionPage';
import { BadgePage } from '../pages/badge/BadgePage';
import { BreadcrumbPage } from '../pages/breadcrumb/BreadcrumbPage';
import { ButtonPage } from '../pages/button/ButtonPage';
import { CheckboxPage } from '../pages/checkbox/CheckboxPage';
import { CommandPage } from '../pages/command/CommandPage';
import { DialogPage } from '../pages/dialog/DialogPage';
import { DrawerPage } from '../pages/drawer/DrawerPage';
import { DropdownPage } from '../pages/dropdown/DropdownPage';
import { InputPage } from '../pages/input/InputPage';
import { LayoutPage } from '../pages/layout/LayoutPage';
import { ContextMenuPage, MenubarPage, MenuPage } from '../pages/menu-system/MenuSystemPages';
import { NavigationMenuPage } from '../pages/navigation-menu/NavigationMenuPage';
import { PaginationPage } from '../pages/pagination/PaginationPage';
import { PopoverPage } from '../pages/popover/PopoverPage';
import { RadioPage } from '../pages/radio/RadioPage';
import { SegmentedControlPage } from '../pages/segmented-control/SegmentedControlPage';
import { SelectPage } from '../pages/select/SelectPage';
import { SurfacePage } from '../pages/surface/SurfacePage';
import { SwitchPage } from '../pages/switch/SwitchPage';
import { TabsPage } from '../pages/tabs/TabsPage';
import { TagPage } from '../pages/tag/TagPage';
import { ToastPage } from '../pages/toast/ToastPage';
import { TooltipPage } from '../pages/tooltip/TooltipPage';

export type ComponentGroupId =
  'general' | 'layout' | 'navigation' | 'data-entry' | 'data-display' | 'actions';

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
    id: 'data-display',
    label: 'Data Display',
  },
  { id: 'actions', label: 'Actions' },
] as const satisfies ReadonlyArray<{
  id: ComponentGroupId;
  label: string;
}>;

export type ComponentRoute = {
  group: ComponentGroupId;
  id:
    | 'menu'
    | 'context-menu'
    | 'menubar'
    | 'accordion'
    | 'badge'
    | 'button'
    | 'surface'
    | 'layout'
    | 'navigation-menu'
    | 'input'
    | 'select'
    | 'checkbox'
    | 'command'
    | 'dialog'
    | 'drawer'
    | 'radio'
    | 'switch'
    | 'segmented-control'
    | 'tabs'
    | 'tag'
    | 'pagination'
    | 'popover'
    | 'tooltip'
    | 'toast'
    | 'dropdown'
    | 'breadcrumb';
  index: string;
  name: string;
  category: string;
  path: string;
  status: 'stable' | 'review';
  version: string;
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
    id: 'layout',
    group: 'layout',
    index: '03',
    name: 'Layout',
    category: 'Structure',
    path: '/components/layout',
    status: 'stable',
    version: 'V1.0.0',
    Component: LayoutPage,
  },
  {
    id: 'breadcrumb',
    group: 'navigation',
    index: '04',
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
    index: '05',
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
    index: '06',
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
    index: '07',
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
    index: '08',
    name: 'Tabs',
    category: 'Navigation',
    path: '/components/tabs',
    status: 'stable',
    version: 'V1.0.0',
    Component: TabsPage,
  },
  {
    id: 'checkbox',
    group: 'data-entry',
    index: '09',
    name: 'Checkbox',
    category: 'Forms',
    path: '/components/checkbox',
    status: 'stable',
    version: 'V1.0.0',
    Component: CheckboxPage,
  },
  {
    id: 'input',
    group: 'data-entry',
    index: '10',
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
    index: '11',
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
    index: '12',
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
    index: '13',
    name: 'Select',
    category: 'Forms',
    path: '/components/select',
    status: 'stable',
    version: 'V1.0.0',
    Component: SelectPage,
  },
  {
    id: 'switch',
    group: 'data-entry',
    index: '14',
    name: 'Switch',
    category: 'Forms',
    path: '/components/switch',
    status: 'stable',
    version: 'V1.0.0',
    Component: SwitchPage,
  },
  {
    id: 'accordion',
    group: 'data-display',
    index: '15',
    name: 'Accordion',
    category: 'Data Display',
    path: '/components/accordion',
    status: 'stable',
    version: 'V1.0.0',
    Component: AccordionPage,
  },
  {
    id: 'badge',
    group: 'data-display',
    index: '16',
    name: 'Badge',
    category: 'Data Display',
    path: '/components/badge',
    status: 'stable',
    version: 'V1.0.0',
    Component: BadgePage,
  },
  {
    id: 'dialog',
    group: 'data-display',
    index: '17',
    name: 'Dialog',
    category: 'Feedback',
    path: '/components/dialog',
    status: 'stable',
    version: 'V1.0.0',
    Component: DialogPage,
  },
  {
    id: 'drawer',
    group: 'data-display',
    index: '18',
    name: 'Drawer',
    category: 'Feedback',
    path: '/components/drawer',
    status: 'stable',
    version: 'V1.0.0',
    Component: DrawerPage,
  },
  {
    id: 'popover',
    group: 'data-display',
    index: '19',
    name: 'Popover',
    category: 'Data Display',
    path: '/components/popover',
    status: 'stable',
    version: 'V1.0.0',
    Component: PopoverPage,
  },
  {
    id: 'tag',
    group: 'data-display',
    index: '20',
    name: 'Tag',
    category: 'Data Display',
    path: '/components/tag',
    status: 'stable',
    version: 'V1.0.0',
    Component: TagPage,
  },
  {
    id: 'toast',
    group: 'data-display',
    index: '21',
    name: 'Toast',
    category: 'Feedback',
    path: '/components/toast',
    status: 'stable',
    version: 'V1.0.0',
    Component: ToastPage,
  },
  {
    id: 'tooltip',
    group: 'data-display',
    index: '22',
    name: 'Tooltip',
    category: 'Data Display',
    path: '/components/tooltip',
    status: 'stable',
    version: 'V1.0.0',
    Component: TooltipPage,
  },
  {
    id: 'command',
    group: 'actions',
    index: '23',
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
    index: '24',
    name: 'ContextMenu',
    category: 'Actions',
    path: '/components/context-menu',
    status: 'stable',
    version: 'V1.0.0',
    Component: ContextMenuPage,
  },
  {
    id: 'menu',
    group: 'actions',
    index: '25',
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
    index: '26',
    name: 'Menubar',
    category: 'Actions',
    path: '/components/menubar',
    status: 'stable',
    version: 'V1.0.0',
    Component: MenubarPage,
  },
] as const satisfies ReadonlyArray<ComponentRoute>;
