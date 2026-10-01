import { describe, expect, it } from 'vitest';

import * as ui from './index';

describe('@virgo-design/ui public API', () => {
  it('keeps internal helpers private and exposes component families and host label configuration', () => {
    expect(Object.keys(ui).sort()).toEqual(
      [
        'Slider',
        'ColorPicker',
        'TimePicker',
        'DatePicker',
        'Calendar',
        'Timeline',
        'Combobox',
        'Field',
        'Form',
        'Table',
        'Tree',
        'Accordion',
        'Alert',
        'Avatar',
        'Badge',
        'Breadcrumb',
        'Button',
        'Card',
        'Checkbox',
        'Command',
        'Cursor',
        'Dialog',
        'Drawer',
        'Dropdown',
        'Dock',
        'Empty',
        'FloatingAction',
        'Input',
        'Layout',
        'Menu',
        'ContextMenu',
        'Menubar',
        'NavigationMenu',
        'Pagination',
        'Popover',
        'Progress',
        'Radio',
        'SegmentedControl',
        'Select',
        'Separator',
        'Skeleton',
        'Spinner',
        'Surface',
        'Switch',
        'Tag',
        'Tabs',
        'Textarea',
        'Tooltip',
        'Toast',
        'UIControlLabelsProvider',
      ].sort(),
    );
    expect(
      Object.keys(ui.Popover)
        .filter((key) => ['Trigger', 'Content', 'Close'].includes(key))
        .sort(),
    ).toEqual(['Close', 'Content', 'Trigger']);
    for (const part of [
      'Root',
      'Trigger',
      'Portal',
      'Overlay',
      'Content',
      'Header',
      'Body',
      'Footer',
      'Title',
      'Description',
      'Close',
    ])
      expect(ui.Dialog).toHaveProperty(part);
    expect(ui.Dialog.Root).toBe(ui.Dialog);
    for (const part of ['Root', 'Icon', 'Content', 'Title', 'Description', 'Action', 'Close'])
      expect(ui.Alert).toHaveProperty(part);
    expect(ui.Alert.Root).toBe(ui.Alert);
    expect(ui.Avatar.Root).toBe(ui.Avatar);
    expect(ui.Avatar).toHaveProperty('Group');
    for (const part of ['Root', 'Header', 'Body', 'Footer', 'Title', 'Description'])
      expect(ui.Card).toHaveProperty(part);
    expect(ui.Card.Root).toBe(ui.Card);
    for (const part of ['Root', 'Icon', 'Title', 'Description', 'Action'])
      expect(ui.Empty).toHaveProperty(part);
    expect(ui.Empty.Root).toBe(ui.Empty);
    for (const part of [
      'Root',
      'Trigger',
      'Portal',
      'Overlay',
      'Content',
      'Header',
      'Body',
      'Footer',
      'Title',
      'Description',
      'Close',
    ])
      expect(ui.Drawer).toHaveProperty(part);
    expect(ui.Drawer.Root).toBe(ui.Drawer);
    for (const part of ['Root', 'Item', 'Trigger', 'Content'])
      expect(ui.Accordion).toHaveProperty(part);
    expect(ui.Accordion.Root).toBe(ui.Accordion);
    for (const part of ['Root', 'Boundary', 'Handle', 'Content'])
      expect(ui.Dock).toHaveProperty(part);
    expect(ui.Dock.Root).toBe(ui.Dock);
    for (const part of ['Root', 'List', 'Item', 'Link', 'Separator', 'Trigger', 'Content'])
      expect(ui.NavigationMenu).toHaveProperty(part);
    expect(ui.NavigationMenu.Root).toBe(ui.NavigationMenu);
    expect(ui).toHaveProperty('Badge');
    expect(ui).toHaveProperty('Tag');
    for (const part of ['Root', 'Dialog', 'Input', 'List', 'Empty', 'Group', 'Item', 'Separator'])
      expect(ui.Command).toHaveProperty(part);
    for (const part of ['Provider', 'Root', 'Title', 'Description', 'Action', 'Close', 'Viewport'])
      expect(ui.Toast).toHaveProperty(part);
  });
  it('exposes one shared action item family across all menu entry points', () => {
    for (const part of [
      'Item',
      'CheckboxItem',
      'RadioItem',
      'RadioGroup',
      'Group',
      'Separator',
      'Submenu',
      'SubmenuTrigger',
      'SubmenuContent',
    ] as const) {
      expect(ui.ContextMenu[part]).toBe(ui.Menu[part]);
      expect(ui.Menubar[part]).toBe(ui.Menu[part]);
    }
  });
  it('exposes runtime UI without metadata', () => {
    for (const part of ['Trigger', 'Content', 'Item', 'Separator', 'Button'])
      expect(ui.Dropdown).toHaveProperty(part);
    expect(ui).not.toHaveProperty('DropdownTrigger');
    expect(ui).not.toHaveProperty('dropdownMetadata');
    expect(ui).toHaveProperty('Button');
    expect(ui).toHaveProperty('Accordion');
    expect(ui).toHaveProperty('Pagination');
    expect(ui).not.toHaveProperty('paginationMetadata');
    expect(ui).toHaveProperty('Surface');
    expect(ui.Layout).not.toHaveProperty('Surface');
    expect(ui).not.toHaveProperty('surfaceMetadata');
    expect(ui).toHaveProperty('Breadcrumb');
    expect(ui.Breadcrumb).toHaveProperty('Item');
    expect(ui).toHaveProperty('Checkbox');
    expect(ui.Checkbox).toHaveProperty('Group');
    expect(ui).toHaveProperty('Input');
    expect(ui.Input).toHaveProperty('Password');
    expect(ui).toHaveProperty('Layout');
    expect(ui).toHaveProperty('Dock');
    expect(ui).toHaveProperty('NavigationMenu');
    expect(ui.Layout).toHaveProperty('Header');
    expect(ui.Layout).toHaveProperty('Root');
    expect(ui.Layout).toHaveProperty('Floating');
    for (const part of ['Group', 'Trigger', 'Content'])
      expect(ui.FloatingAction).toHaveProperty(part);
    expect(ui.Layout).toHaveProperty('Sidebar');
    expect(ui.Layout).toHaveProperty('SidebarTrigger');
    expect(ui.Layout).not.toHaveProperty('Sider');
    expect(ui.Layout).toHaveProperty('Content');
    expect(ui.Layout).toHaveProperty('Footer');
    expect(ui).toHaveProperty('Radio');
    expect(ui.Radio).toHaveProperty('Group');
    expect(ui).toHaveProperty('SegmentedControl');
    expect(ui.SegmentedControl).toHaveProperty('Item');
    expect(ui).toHaveProperty('Textarea');
    expect(ui).toHaveProperty('Select');
    expect(ui.Select).toHaveProperty('Trigger');
    expect(ui.Select).toHaveProperty('Content');
    expect(ui.Select).toHaveProperty('Option');
    expect(ui).toHaveProperty('Switch');
    expect(ui).toHaveProperty('Tabs');
    expect(ui.Tabs).toHaveProperty('List');
    expect(ui.Tabs).toHaveProperty('Tab');
    expect(ui.Tabs).toHaveProperty('Panel');
    expect(ui).not.toHaveProperty('BreadcrumbItem');
    expect(ui).not.toHaveProperty('CheckboxGroup');
    expect(ui).not.toHaveProperty('LayoutHeader');
    expect(ui).not.toHaveProperty('LayoutSider');
    expect(ui).not.toHaveProperty('LayoutContent');
    expect(ui).not.toHaveProperty('LayoutFooter');
    expect(ui).not.toHaveProperty('RadioGroup');
    expect(ui).not.toHaveProperty('SegmentedControlItem');
    expect(ui).not.toHaveProperty('SelectTrigger');
    expect(ui).not.toHaveProperty('SelectContent');
    expect(ui).not.toHaveProperty('SelectOption');
    expect(ui).not.toHaveProperty('TabList');
    expect(ui).not.toHaveProperty('Tab');
    expect(ui).not.toHaveProperty('TabPanel');
    expect(ui).not.toHaveProperty('buttonMetadata');
    expect(ui).not.toHaveProperty('accordionMetadata');
    expect(ui).not.toHaveProperty('breadcrumbMetadata');
    expect(ui).not.toHaveProperty('checkboxMetadata');
    expect(ui).not.toHaveProperty('inputMetadata');
    expect(ui).not.toHaveProperty('layoutMetadata');
    expect(ui).not.toHaveProperty('navigationMenuMetadata');
    expect(ui).not.toHaveProperty('radioMetadata');
    expect(ui).not.toHaveProperty('segmentedControlMetadata');
    expect(ui).not.toHaveProperty('textareaMetadata');
    expect(ui).not.toHaveProperty('selectMetadata');
    expect(ui).not.toHaveProperty('switchMetadata');
    expect(ui).not.toHaveProperty('tabsMetadata');
    expect(ui).not.toHaveProperty('componentMetadataRegistry');
  });
});
