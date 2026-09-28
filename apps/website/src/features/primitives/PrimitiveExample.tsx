import {
  Accordion,
  Breadcrumb,
  Button,
  Checkbox,
  Collapsible,
  Command,
  ContextMenu,
  Cursor,
  Dialog,
  Dock,
  Dropdown,
  Input,
  Layout,
  Menu,
  Menubar,
  NavigationMenu,
  Pagination,
  Popover,
  Radio,
  Select,
  Switch,
  Tabs,
  Textarea,
  Toast,
  Tooltip,
} from '@virgo-design/primitives';
import { useState } from 'react';

import type { PrimitiveSlug } from './primitiveDocs';

const portalProps = { 'data-primitive-specimen-portal': '' } as const;

function AccordionExample() {
  return (
    <Accordion type="single" defaultValue="overview" data-docs-primitive="accordion">
      <Accordion.Item value="overview">
        <Accordion.Trigger>Overview</Accordion.Trigger>
        <Accordion.Content>Accordion content is disclosed by its trigger.</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="details">
        <Accordion.Trigger>Details</Accordion.Trigger>
        <Accordion.Content>A second independently addressable section.</Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
}

function BreadcrumbExample() {
  return (
    <Breadcrumb data-docs-primitive="breadcrumb">
      <Breadcrumb.Item href="#primitives">Primitives</Breadcrumb.Item>
      <Breadcrumb.Item href="#navigation">Navigation</Breadcrumb.Item>
      <Breadcrumb.Item>Breadcrumb</Breadcrumb.Item>
    </Breadcrumb>
  );
}

function CheckboxExample() {
  return (
    <Checkbox.Group
      defaultValue={['weekly']}
      name="primitive-frequency"
      aria-label="Frequency"
      data-docs-primitive="checkbox"
    >
      <label>
        <Checkbox value="daily" /> Daily
      </label>{' '}
      <label>
        <Checkbox value="weekly" /> Weekly
      </label>
    </Checkbox.Group>
  );
}

function CollapsibleExample() {
  return (
    <Collapsible defaultOpen data-docs-primitive="collapsible">
      <Collapsible.Trigger>Project details</Collapsible.Trigger>
      <Collapsible.Content>Created with a trigger and a disclosure region.</Collapsible.Content>
    </Collapsible>
  );
}

function CommandExample() {
  return (
    <Command data-docs-primitive="command">
      <Command.Input aria-label="Find a command" placeholder="Search commands" />
      <Command.List>
        <Command.Empty>No matching command.</Command.Empty>
        <Command.Group heading="Actions">
          <Command.Item value="new-file">New file</Command.Item>
          <Command.Item value="open-settings">Open settings</Command.Item>
        </Command.Group>
      </Command.List>
    </Command>
  );
}

function ContextMenuExample() {
  return (
    <ContextMenu data-docs-primitive="context-menu">
      <ContextMenu.Trigger>Right-click this file</ContextMenu.Trigger>
      <ContextMenu.Content {...portalProps}>
        <ContextMenu.Item>Rename</ContextMenu.Item>
        <ContextMenu.Item>Duplicate</ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu>
  );
}

function DialogExample() {
  return (
    <Dialog data-docs-primitive="dialog">
      <Dialog.Trigger>Edit profile</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay {...portalProps} />
        <Dialog.Content {...portalProps}>
          <Dialog.Title>Profile</Dialog.Title>
          <Dialog.Description>Update your public details.</Dialog.Description>
          <label>
            Display name <input defaultValue="Virgo" />
          </label>{' '}
          <Dialog.Close>Done</Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
}

function DropdownExample() {
  return (
    <Dropdown data-docs-primitive="dropdown">
      <Dropdown.Trigger>Actions</Dropdown.Trigger>
      <Dropdown.Content {...portalProps}>
        <Dropdown.Item>Rename</Dropdown.Item>
        <Dropdown.Item>Duplicate</Dropdown.Item>
        <Dropdown.Separator />
        <Dropdown.Item>Archive</Dropdown.Item>
      </Dropdown.Content>
    </Dropdown>
  );
}

function DockExample() {
  return (
    <Dock.Boundary data-docs-primitive="dock">
      <Dock.Root defaultPlacement={{ edge: 'top', position: 0.5 }}>
        {({ orientation }) => (
          <>
            <Dock.Handle aria-label="Move primitive dock" />
            <Dock.Content>{orientation} dock</Dock.Content>
          </>
        )}
      </Dock.Root>
    </Dock.Boundary>
  );
}

function LayoutExample() {
  return (
    <Layout data-docs-primitive="layout">
      <Layout.Header>Header</Layout.Header>
      <Layout.Lane direction="horizontal">
        <Layout.Sidebar defaultCollapsed={false}>
          <Layout.SidebarTrigger>Toggle sidebar</Layout.SidebarTrigger>
          <nav aria-label="Example sidebar">Sidebar</nav>
        </Layout.Sidebar>
        <Layout.Content>Main content</Layout.Content>
      </Layout.Lane>
      <Layout.Footer>Footer</Layout.Footer>
    </Layout>
  );
}

function MenuExample() {
  return (
    <Menu data-docs-primitive="menu">
      <Menu.Trigger>Open menu</Menu.Trigger>
      <Menu.Content {...portalProps}>
        <Menu.Item>Copy</Menu.Item>
        <Menu.Item>Paste</Menu.Item>
        <Menu.Submenu>
          <Menu.SubmenuTrigger>Export</Menu.SubmenuTrigger>
          <Menu.SubmenuContent {...portalProps}>
            <Menu.Item>PDF</Menu.Item>
            <Menu.Item>SVG</Menu.Item>
          </Menu.SubmenuContent>
        </Menu.Submenu>
      </Menu.Content>
    </Menu>
  );
}

function MenubarExample() {
  return (
    <Menubar aria-label="Example application" data-docs-primitive="menubar">
      <Menubar.Menu value="file">
        <Menubar.Trigger>File</Menubar.Trigger>
        <Menubar.Content {...portalProps}>
          <Menubar.Item>New</Menubar.Item>
          <Menubar.Item>Save</Menubar.Item>
        </Menubar.Content>
      </Menubar.Menu>
      <Menubar.Menu value="edit">
        <Menubar.Trigger>Edit</Menubar.Trigger>
        <Menubar.Content {...portalProps}>
          <Menubar.Item>Undo</Menubar.Item>
          <Menubar.Item>Redo</Menubar.Item>
        </Menubar.Content>
      </Menubar.Menu>
    </Menubar>
  );
}

function NavigationMenuExample() {
  return (
    <NavigationMenu aria-label="Example navigation" data-docs-primitive="navigation-menu">
      <NavigationMenu.List>
        <NavigationMenu.Item value="overview">
          <NavigationMenu.Link href="#overview">Overview</NavigationMenu.Link>
        </NavigationMenu.Item>
        <NavigationMenu.Item value="learn">
          <NavigationMenu.Trigger>Learn</NavigationMenu.Trigger>
          <NavigationMenu.Content>
            <li>
              <a href="#guides">Guides</a>
            </li>
            <li>
              <a href="#examples">Examples</a>
            </li>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu>
  );
}

function PaginationExample() {
  return (
    <Pagination total={72} defaultPage={2} pageSize={10} data-docs-primitive="pagination">
      {(state) => (
        <>
          <Pagination.Item page={state.page - 1} disabled={state.page === 1}>
            Previous
          </Pagination.Item>{' '}
          {state.items.map((item) =>
            typeof item === 'number' ? (
              <Pagination.Item key={item} page={item} current={item === state.page}>
                {item}
              </Pagination.Item>
            ) : (
              <span key={item}> … </span>
            ),
          )}{' '}
          <Pagination.Item page={state.page + 1} disabled={state.page === state.pageCount}>
            Next
          </Pagination.Item>
        </>
      )}
    </Pagination>
  );
}

function PopoverExample() {
  return (
    <Popover data-docs-primitive="popover">
      <Popover.Trigger>Open popover</Popover.Trigger>
      <Popover.Content {...portalProps}>
        <p>This panel is positioned relative to its trigger.</p>
        <Popover.Close>Close</Popover.Close>
      </Popover.Content>
    </Popover>
  );
}

function RadioExample() {
  return (
    <Radio.Group
      defaultValue="comfortable"
      name="primitive-density"
      aria-label="Density"
      data-docs-primitive="radio"
    >
      <label>
        <Radio value="compact" /> Compact
      </label>{' '}
      <label>
        <Radio value="comfortable" /> Comfortable
      </label>
    </Radio.Group>
  );
}

function SelectExample() {
  return (
    <Select defaultValue="design" name="project" data-docs-primitive="select">
      <Select.Trigger aria-label="Project">Choose project</Select.Trigger>
      <Select.Content {...portalProps}>
        <Select.Option value="design">Virgo Design</Select.Option>
        <Select.Option value="docs">Virgo Docs</Select.Option>
      </Select.Content>
    </Select>
  );
}

function TabsExample() {
  return (
    <Tabs defaultValue="overview" data-docs-primitive="tabs">
      <Tabs.List aria-label="Primitive information">
        <Tabs.Tab value="overview">Overview</Tabs.Tab>
        <Tabs.Tab value="api">API</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="overview">A headless tab panel.</Tabs.Panel>
      <Tabs.Panel value="api">Composable root, list, tab, and panel parts.</Tabs.Panel>
    </Tabs>
  );
}

function ToastExample() {
  const [open, setOpen] = useState(false);

  return (
    <Toast.Provider>
      <button type="button" onClick={() => setOpen(true)} data-docs-primitive="toast">
        Show toast
      </button>
      <Toast.Root open={open} onOpenChange={setOpen} duration={0}>
        <Toast.Title>Saved</Toast.Title>
        <Toast.Description>Your changes are ready.</Toast.Description>
        <Toast.Action>Undo</Toast.Action>
        <Toast.Close>Dismiss</Toast.Close>
      </Toast.Root>
      <Toast.Viewport {...portalProps} />
    </Toast.Provider>
  );
}

function TooltipExample() {
  return (
    <Tooltip openDelay={100} data-docs-primitive="tooltip">
      <Tooltip.Trigger>Hover or focus</Tooltip.Trigger>
      <Tooltip.Content {...portalProps}>Helpful context</Tooltip.Content>
    </Tooltip>
  );
}

export function PrimitiveExample({ slug }: { slug: PrimitiveSlug }) {
  switch (slug) {
    case 'accordion':
      return <AccordionExample />;
    case 'breadcrumb':
      return <BreadcrumbExample />;
    case 'button':
      return <Button data-docs-primitive="button">Native button</Button>;
    case 'checkbox':
      return <CheckboxExample />;
    case 'collapsible':
      return <CollapsibleExample />;
    case 'command':
      return <CommandExample />;
    case 'context-menu':
      return <ContextMenuExample />;
    case 'dialog':
      return <DialogExample />;
    case 'dropdown':
      return <DropdownExample />;
    case 'dock':
      return <DockExample />;
    case 'input':
      return (
        <label>
          Project name <Input data-docs-primitive="input" defaultValue="Virgo Design" />
        </label>
      );
    case 'layout':
      return <LayoutExample />;
    case 'menu':
      return <MenuExample />;
    case 'menubar':
      return <MenubarExample />;
    case 'navigation-menu':
      return <NavigationMenuExample />;
    case 'pagination':
      return <PaginationExample />;
    case 'popover':
      return <PopoverExample />;
    case 'radio':
      return <RadioExample />;
    case 'select':
      return <SelectExample />;
    case 'switch':
      return (
        <label>
          <Switch data-docs-primitive="switch" defaultChecked /> Notifications
        </label>
      );
    case 'tabs':
      return <TabsExample />;
    case 'textarea':
      return (
        <label>
          Notes{' '}
          <Textarea data-docs-primitive="textarea" defaultValue="Headless by default." rows={3} />
        </label>
      );
    case 'toast':
      return <ToastExample />;
    case 'cursor':
      return (
        <Cursor.Provider data-docs-primitive="cursor">
          <button type="button">Move your mouse here</button>
          <Cursor.Follower {...portalProps}>Pointer feedback</Cursor.Follower>
        </Cursor.Provider>
      );
    case 'tooltip':
      return <TooltipExample />;
  }
}
