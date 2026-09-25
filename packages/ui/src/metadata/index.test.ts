import { describe, expect, it } from 'vitest';

import {
  accordionMetadata,
  alertMetadata,
  avatarMetadata,
  badgeMetadata,
  breadcrumbMetadata,
  buttonMetadata,
  checkboxMetadata,
  commandMetadata,
  componentMetadataRegistry,
  dialogMetadata,
  drawerMetadata,
  dropdownMetadata,
  floatingActionMetadata,
  inputMetadata,
  layoutMetadata,
  navigationMenuMetadata,
  paginationMetadata,
  popoverMetadata,
  radioMetadata,
  segmentedControlMetadata,
  selectMetadata,
  surfaceMetadata,
  switchMetadata,
  tabsMetadata,
  tagMetadata,
  textareaMetadata,
  toastMetadata,
  tooltipMetadata,
} from './index';

describe('componentMetadataRegistry', () => {
  it('registers Avatar as a UI-only identity display', () => {
    expect(componentMetadataRegistry.avatar).toBe(avatarMetadata);
    expect(avatarMetadata.sizes.map(({ name }) => name)).toEqual(['sm', 'md', 'lg']);
    expect(avatarMetadata.capabilities).toMatchObject({
      imageErrorFallback: true,
      group: true,
      status: false,
    });
  });

  it('registers Alert as persistent inline feedback', () => {
    expect(componentMetadataRegistry.alert).toBe(alertMetadata);
    expect(alertMetadata.intents.map(({ name }) => name)).toEqual([
      'default',
      'info',
      'success',
      'warning',
      'error',
    ]);
    expect(alertMetadata.variants.map(({ name }) => name)).toEqual(['soft', 'outline']);
    expect(alertMetadata.capabilities).toMatchObject({
      persistent: true,
      inline: true,
      selfRemoving: false,
      portal: false,
      autoDismiss: false,
    });
  });
  it('registers Tag as a UI-only standalone display semantic', () => {
    expect(componentMetadataRegistry.tag).toBe(tagMetadata);
    expect(tagMetadata.variants.map(({ name }) => name)).toEqual(['soft', 'solid', 'outline']);
    expect(tagMetadata.capabilities).toMatchObject({ closable: true, selfRemoving: false });
  });

  it('registers Badge as a UI-only attached display semantic', () => {
    expect(componentMetadataRegistry.badge).toBe(badgeMetadata);
    expect(badgeMetadata.capabilities).toMatchObject({
      maxCount: true,
      dot: true,
      standalone: true,
      overlayEngine: false,
    });
  });
  it('registers Command and Toast as independent interaction systems', () => {
    expect(componentMetadataRegistry.command).toBe(commandMetadata);
    expect(commandMetadata.capabilities).toMatchObject({
      controlledSearch: true,
      dialogComposition: true,
      shortcutBinding: false,
    });
    expect(componentMetadataRegistry.toast).toBe(toastMetadata);
    expect(toastMetadata.capabilities).toMatchObject({
      autoDismiss: true,
      pauseOnHover: true,
      stacking: true,
    });
  });
  it('registers three action menu families separately from navigation', () => {
    for (const key of ['menu', 'contextMenu', 'menubar'] as const) {
      const metadata = componentMetadataRegistry[key];
      expect(metadata.category).toBe('Actions');
      expect(metadata.capabilities).toMatchObject({
        submenu: true,
        shortcutDisplay: true,
        shortcutBinding: false,
        routing: false,
      });
      expect(metadata.anatomy.some((part) => part.name.endsWith('.CheckboxItem'))).toBe(true);
    }
  });
  it('registers floating actions independently from Layout and NavigationMenu', () => {
    expect(componentMetadataRegistry.floatingAction).toBe(floatingActionMetadata);
    expect(floatingActionMetadata.capabilities).toMatchObject({ portal: true, navigation: false });
    expect(layoutMetadata.capabilities).toMatchObject({
      floatingSidebar: true,
      localFloatingControls: true,
    });
  });
  it('registers Accordion with its variants and interaction modes', () => {
    expect(componentMetadataRegistry.accordion).toBe(accordionMetadata);
    expect(accordionMetadata.variants.map(({ name }) => name)).toEqual([
      'default',
      'bordered',
      'ghost',
    ]);
    expect(accordionMetadata.capabilities).toMatchObject({
      single: true,
      multiple: true,
      keyboardNavigation: true,
    });
  });
  it('registers NavigationMenu with navigation-only capabilities', () => {
    expect(componentMetadataRegistry.navigationMenu).toBe(navigationMenuMetadata);
    expect(navigationMenuMetadata.category).toBe('Navigation');
    expect(navigationMenuMetadata.capabilities).toMatchObject({
      horizontal: true,
      vertical: true,
      nested: true,
      inlineSubmenu: true,
      popoverSubmenu: true,
      routerIntegration: false,
      collapse: false,
    });
  });
  it('registers Dialog with its modal anatomy and size variants', () => {
    expect(componentMetadataRegistry.dialog).toBe(dialogMetadata);
    expect(dialogMetadata.sizes.map(({ name }) => name)).toEqual(['sm', 'md', 'lg']);
    expect(dialogMetadata.capabilities).toMatchObject({
      modal: true,
      nonModal: true,
      focusTrap: true,
      animation: false,
    });
  });
  it('registers Drawer as a Dialog-powered edge panel', () => {
    expect(componentMetadataRegistry.drawer).toBe(drawerMetadata);
    expect(drawerMetadata.placements.map(({ name }) => name)).toEqual([
      'left',
      'right',
      'top',
      'bottom',
    ]);
    expect(drawerMetadata.sizes.map(({ name }) => name)).toEqual(['sm', 'md', 'lg']);
    expect(drawerMetadata.capabilities).toMatchObject({
      modal: true,
      nonModal: true,
      controlled: true,
      uncontrolled: true,
      dismissible: true,
      focusManaged: true,
      scrollableBody: true,
    });
  });
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
