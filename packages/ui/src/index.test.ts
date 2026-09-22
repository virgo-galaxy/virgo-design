import { describe, expect, it } from 'vitest';

import * as ui from './index';

describe('@virgo-design/ui public API', () => {
  it('keeps internal helpers private and exposes only component families', () => {
    expect(Object.keys(ui).sort()).toEqual(
      [
        'Breadcrumb',
        'Button',
        'Checkbox',
        'Dropdown',
        'Input',
        'Layout',
        'Pagination',
        'Popover',
        'Radio',
        'SegmentedControl',
        'Select',
        'Surface',
        'Switch',
        'Tabs',
        'Textarea',
      ].sort(),
    );
    expect(
      Object.keys(ui.Popover)
        .filter((key) => ['Trigger', 'Content', 'Close'].includes(key))
        .sort(),
    ).toEqual(['Close', 'Content', 'Trigger']);
  });
  it('exposes runtime UI without metadata', () => {
    for (const part of ['Trigger', 'Content', 'Item', 'Separator', 'Button'])
      expect(ui.Dropdown).toHaveProperty(part);
    expect(ui).not.toHaveProperty('DropdownTrigger');
    expect(ui).not.toHaveProperty('dropdownMetadata');
    expect(ui).toHaveProperty('Button');
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
    expect(ui).toHaveProperty('Layout');
    expect(ui.Layout).toHaveProperty('Header');
    expect(ui.Layout).toHaveProperty('Sider');
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
    expect(ui).not.toHaveProperty('breadcrumbMetadata');
    expect(ui).not.toHaveProperty('checkboxMetadata');
    expect(ui).not.toHaveProperty('inputMetadata');
    expect(ui).not.toHaveProperty('layoutMetadata');
    expect(ui).not.toHaveProperty('radioMetadata');
    expect(ui).not.toHaveProperty('segmentedControlMetadata');
    expect(ui).not.toHaveProperty('textareaMetadata');
    expect(ui).not.toHaveProperty('selectMetadata');
    expect(ui).not.toHaveProperty('switchMetadata');
    expect(ui).not.toHaveProperty('tabsMetadata');
    expect(ui).not.toHaveProperty('componentMetadataRegistry');
  });
});
