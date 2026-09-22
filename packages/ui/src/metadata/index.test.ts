import { describe, expect, it } from 'vitest';

import {
  breadcrumbMetadata,
  buttonMetadata,
  checkboxMetadata,
  componentMetadataRegistry,
  dropdownMetadata,
  inputMetadata,
  layoutMetadata,
  paginationMetadata,
  popoverMetadata,
  radioMetadata,
  segmentedControlMetadata,
  selectMetadata,
  surfaceMetadata,
  switchMetadata,
  tabsMetadata,
  textareaMetadata,
  tooltipMetadata,
} from './index';

describe('componentMetadataRegistry', () => {
  it('registers Tooltip as Data Display with non-interactive content', () => {
    expect(componentMetadataRegistry.tooltip).toBe(tooltipMetadata);
    expect(tooltipMetadata.category).toBe('Data Display');
    expect(tooltipMetadata.capabilities.interactiveContent).toBe(false);
  });
  it('registers Popover in the existing metadata schema', () => {
    expect(componentMetadataRegistry.popover).toBe(popoverMetadata);
    expect(popoverMetadata.category).toBe('Data Display');
    expect(popoverMetadata.capabilities).toMatchObject({
      portal: true,
      rtl: true,
      reducedMotion: true,
      modal: false,
    });
  });
  it('registers Dropdown as Navigation without loading', () => {
    expect(componentMetadataRegistry.dropdown).toBe(dropdownMetadata);
    expect(dropdownMetadata.category).toBe('Navigation');
    expect(dropdownMetadata.capabilities.loading).toBe(false);
  });
  it('registers Pagination as Navigation', () => {
    expect(componentMetadataRegistry.pagination).toBe(paginationMetadata);
    expect(paginationMetadata.category).toBe('Navigation');
  });
  it('registers the exported Surface metadata without creating a copy', () => {
    expect(componentMetadataRegistry.surface).toBe(surfaceMetadata);
    expect(surfaceMetadata.name).toBe('Surface');
    expect(surfaceMetadata.category).toBe('General');
  });

  it('registers the exported Button metadata without creating a copy', () => {
    expect(componentMetadataRegistry.button).toBe(buttonMetadata);
    expect(buttonMetadata.name).toBe('Button');
  });

  it('registers the exported Breadcrumb metadata without creating a copy', () => {
    expect(componentMetadataRegistry.breadcrumb).toBe(breadcrumbMetadata);
    expect(breadcrumbMetadata.name).toBe('Breadcrumb');
  });

  it('registers the exported Checkbox metadata without creating a copy', () => {
    expect(componentMetadataRegistry.checkbox).toBe(checkboxMetadata);
    expect(checkboxMetadata.name).toBe('Checkbox');
  });

  it('registers the exported Input metadata without creating a copy', () => {
    expect(componentMetadataRegistry.input).toBe(inputMetadata);
    expect(inputMetadata.name).toBe('Input');
  });

  it('registers the exported Layout metadata without creating a copy', () => {
    expect(componentMetadataRegistry.layout).toBe(layoutMetadata);
    expect(layoutMetadata.name).toBe('Layout');
  });

  it('registers the exported Radio metadata without creating a copy', () => {
    expect(componentMetadataRegistry.radio).toBe(radioMetadata);
    expect(radioMetadata.name).toBe('Radio');
  });

  it('registers the exported Select metadata without creating a copy', () => {
    expect(componentMetadataRegistry.select).toBe(selectMetadata);
    expect(selectMetadata.name).toBe('Select');
  });

  it('registers the exported SegmentedControl metadata without creating a copy', () => {
    expect(componentMetadataRegistry.segmentedControl).toBe(segmentedControlMetadata);
    expect(segmentedControlMetadata.name).toBe('SegmentedControl');
  });

  it('registers the exported Switch metadata without creating a copy', () => {
    expect(componentMetadataRegistry.switch).toBe(switchMetadata);
    expect(switchMetadata.name).toBe('Switch');
  });

  it('registers the exported Textarea metadata without creating a copy', () => {
    expect(componentMetadataRegistry.textarea).toBe(textareaMetadata);
    expect(textareaMetadata.name).toBe('Textarea');
  });

  it('registers the exported Tabs metadata without creating a copy', () => {
    expect(componentMetadataRegistry.tabs).toBe(tabsMetadata);
    expect(tabsMetadata.name).toBe('Tabs');
  });
});
