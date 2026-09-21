import { describe, expect, it } from 'vitest';

import * as ui from './index';

describe('@virgo-design/ui public API', () => {
  it('exposes runtime UI without metadata', () => {
    expect(ui).toHaveProperty('Button');
    expect(ui).toHaveProperty('Breadcrumb');
    expect(ui).toHaveProperty('BreadcrumbItem');
    expect(ui).toHaveProperty('Checkbox');
    expect(ui).toHaveProperty('CheckboxGroup');
    expect(ui).toHaveProperty('Input');
    expect(ui).toHaveProperty('Layout');
    expect(ui).toHaveProperty('LayoutHeader');
    expect(ui).toHaveProperty('LayoutSider');
    expect(ui).toHaveProperty('LayoutContent');
    expect(ui).toHaveProperty('LayoutFooter');
    expect(ui).not.toHaveProperty('Header');
    expect(ui).not.toHaveProperty('Sider');
    expect(ui).not.toHaveProperty('Content');
    expect(ui).not.toHaveProperty('Footer');
    expect(ui).toHaveProperty('Radio');
    expect(ui).toHaveProperty('RadioGroup');
    expect(ui).toHaveProperty('SegmentedControl');
    expect(ui).toHaveProperty('SegmentedControlItem');
    expect(ui).toHaveProperty('Textarea');
    expect(ui).toHaveProperty('Select');
    expect(ui).toHaveProperty('Switch');
    expect(ui).toHaveProperty('Tabs');
    expect(ui).toHaveProperty('TabList');
    expect(ui).toHaveProperty('Tab');
    expect(ui).toHaveProperty('TabPanel');
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
