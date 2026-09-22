import { describe, expect, it } from 'vitest';

import * as primitives from './index';

describe('@virgo-design/primitives public API', () => {
  it('keeps overlay infrastructure and implementation subpaths private', () => {
    expect(Object.keys(primitives).sort()).toEqual(
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
        'Select',
        'Switch',
        'Tabs',
        'Textarea',
      ].sort(),
    );
    for (const part of ['Trigger', 'Content', 'Close'])
      expect(primitives.Popover).toHaveProperty(part);
  });
  it('exposes composite anatomy only through family roots', () => {
    for (const part of ['Trigger', 'Content', 'Item', 'Separator'])
      expect(primitives.Dropdown).toHaveProperty(part);
    expect(primitives).not.toHaveProperty('DropdownTrigger');
    expect(primitives.Breadcrumb).toHaveProperty('Item');
    expect(primitives.Pagination).toHaveProperty('Item');
    expect(primitives).not.toHaveProperty('PaginationItem');
    expect(primitives.Checkbox).toHaveProperty('Group');
    expect(primitives).toHaveProperty('Layout');
    expect(primitives.Layout).toHaveProperty('Header');
    expect(primitives.Layout).toHaveProperty('Sider');
    expect(primitives.Layout).toHaveProperty('Content');
    expect(primitives.Layout).toHaveProperty('Footer');
    expect(primitives.Radio).toHaveProperty('Group');
    expect(primitives.Select).toHaveProperty('Trigger');
    expect(primitives.Select).toHaveProperty('Content');
    expect(primitives.Select).toHaveProperty('Option');
    expect(primitives.Tabs).toHaveProperty('List');
    expect(primitives.Tabs).toHaveProperty('Tab');
    expect(primitives.Tabs).toHaveProperty('Panel');
    expect(primitives).not.toHaveProperty('BreadcrumbItem');
    expect(primitives).not.toHaveProperty('CheckboxGroup');
    expect(primitives).not.toHaveProperty('LayoutHeader');
    expect(primitives).not.toHaveProperty('LayoutSider');
    expect(primitives).not.toHaveProperty('LayoutContent');
    expect(primitives).not.toHaveProperty('LayoutFooter');
    expect(primitives).not.toHaveProperty('RadioGroup');
    expect(primitives).not.toHaveProperty('SelectTrigger');
    expect(primitives).not.toHaveProperty('SelectContent');
    expect(primitives).not.toHaveProperty('SelectOption');
    expect(primitives).not.toHaveProperty('TabList');
    expect(primitives).not.toHaveProperty('Tab');
    expect(primitives).not.toHaveProperty('TabPanel');
  });
});
