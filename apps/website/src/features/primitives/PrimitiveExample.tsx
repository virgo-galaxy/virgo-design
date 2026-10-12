import { useCarouselState } from '@virgo-design/primitives';
import {
  Accordion,
  Breadcrumb,
  Button,
  Calendar,
  Carousel,
  Checkbox,
  Collapsible,
  ColorPicker,
  Combobox,
  Command,
  ContextMenu,
  Cursor,
  DatePicker,
  Dialog,
  Dock,
  Dropdown,
  Field,
  Form,
  Input,
  Layout,
  Menu,
  Menubar,
  NavigationMenu,
  Pagination,
  Popover,
  Radio,
  Select,
  Slider,
  Switch,
  Table,
  Tabs,
  Textarea,
  Timeline,
  TimePicker,
  Toast,
  Tooltip,
  Tree,
} from '@virgo-design/primitives';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppLocale } from '@/i18n';

import type { PrimitiveSlug } from './primitiveDocs';

const portalProps = { 'data-primitive-specimen-portal': '' } as const;

function AccordionExample() {
  const { t } = useTranslation();

  return (
    <Accordion type="single" defaultValue="overview" data-docs-primitive="accordion">
      <Accordion.Item value="overview">
        <Accordion.Trigger>{t('primitives.examples.overview')}</Accordion.Trigger>
        <Accordion.Content>
          {t('primitives.examples.accordionContentIsDisclosedByItsTrigger')}
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="details">
        <Accordion.Trigger>{t('primitives.examples.details')}</Accordion.Trigger>
        <Accordion.Content>
          {t('primitives.examples.aSecondIndependentlyAddressableSection')}
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
}

function BreadcrumbExample() {
  const { t } = useTranslation();

  return (
    <Breadcrumb data-docs-primitive="breadcrumb">
      <Breadcrumb.Item href="#primitives">{t('primitives.examples.primitives')}</Breadcrumb.Item>
      <Breadcrumb.Item href="#navigation">{t('primitives.examples.navigation')}</Breadcrumb.Item>
      <Breadcrumb.Item>{t('primitives.examples.breadcrumb')}</Breadcrumb.Item>
    </Breadcrumb>
  );
}

function CheckboxExample() {
  const { t } = useTranslation();

  return (
    <Checkbox.Group
      defaultValue={['weekly']}
      name="primitive-frequency"
      aria-label={t('primitives.examples.frequency')}
      data-docs-primitive="checkbox"
    >
      <label>
        <Checkbox value="daily" /> {t('primitives.examples.daily')}
      </label>{' '}
      <label>
        <Checkbox value="weekly" /> {t('primitives.examples.weekly')}
      </label>
    </Checkbox.Group>
  );
}

function CarouselExample() {
  const { t } = useTranslation();
  return (
    <Carousel
      count={2}
      aria-label={t('primitives.catalogue.names.carousel')}
      data-docs-primitive="carousel"
    >
      <Carousel.Viewport>
        <Carousel.Track>
          <Carousel.Item index={0}>{t('primitives.examples.headlessByDefault')}</Carousel.Item>
          <Carousel.Item index={1}>{t('primitives.examples.projectName')}</Carousel.Item>
        </Carousel.Track>
      </Carousel.Viewport>
      <CarouselNavigation />
    </Carousel>
  );
}
function CarouselNavigation() {
  const state = useCarouselState();
  const { t } = useTranslation();
  return (
    <>
      <button type="button" disabled={!state.canPrevious} onClick={state.previous}>
        {t('shared.controls.previousSlide')}
      </button>
      <button type="button" disabled={!state.canNext} onClick={state.next}>
        {t('shared.controls.nextSlide')}
      </button>
    </>
  );
}

function CollapsibleExample() {
  const { t } = useTranslation();

  return (
    <Collapsible defaultOpen data-docs-primitive="collapsible">
      <Collapsible.Trigger>{t('primitives.examples.projectDetails')}</Collapsible.Trigger>
      <Collapsible.Content>
        {t('primitives.examples.createdWithATriggerAndADisclosureRegion')}
      </Collapsible.Content>
    </Collapsible>
  );
}

function CommandExample() {
  const { t } = useTranslation();

  return (
    <Command data-docs-primitive="command">
      <Command.Input
        aria-label={t('primitives.examples.findACommand')}
        placeholder={t('primitives.examples.searchCommands')}
      />
      <Command.List>
        <Command.Empty>{t('primitives.examples.noMatchingCommand')}</Command.Empty>
        <Command.Group heading={t('primitives.examples.actions')}>
          <Command.Item value="new-file">{t('primitives.examples.newFile')}</Command.Item>
          <Command.Item value="open-settings">{t('primitives.examples.openSettings')}</Command.Item>
        </Command.Group>
      </Command.List>
    </Command>
  );
}

function ContextMenuExample() {
  const { t } = useTranslation();

  return (
    <ContextMenu data-docs-primitive="context-menu">
      <ContextMenu.Trigger>{t('primitives.examples.rightClickThisFile')}</ContextMenu.Trigger>
      <ContextMenu.Content {...portalProps}>
        <ContextMenu.Item>{t('primitives.examples.rename')}</ContextMenu.Item>
        <ContextMenu.Item>{t('primitives.examples.duplicate')}</ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu>
  );
}

function DialogExample() {
  const { t } = useTranslation();

  return (
    <Dialog data-docs-primitive="dialog">
      <Dialog.Trigger>{t('primitives.examples.editProfile')}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay {...portalProps} />
        <Dialog.Content {...portalProps}>
          <Dialog.Title>{t('primitives.examples.profile')}</Dialog.Title>
          <Dialog.Description>
            {t('primitives.examples.updateYourPublicDetails')}
          </Dialog.Description>
          <label>
            {t('primitives.examples.displayName')}
            <input defaultValue="Example" />
          </label>{' '}
          <Dialog.Close>{t('primitives.examples.done')}</Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
}

function DropdownExample() {
  const { t } = useTranslation();

  return (
    <Dropdown data-docs-primitive="dropdown">
      <Dropdown.Trigger>{t('primitives.examples.actions')}</Dropdown.Trigger>
      <Dropdown.Content {...portalProps}>
        <Dropdown.Item>{t('primitives.examples.rename')}</Dropdown.Item>
        <Dropdown.Item>{t('primitives.examples.duplicate')}</Dropdown.Item>
        <Dropdown.Separator />
        <Dropdown.Item>{t('primitives.examples.archive')}</Dropdown.Item>
      </Dropdown.Content>
    </Dropdown>
  );
}

function DockExample() {
  const { t } = useTranslation();

  return (
    <Dock.Boundary data-docs-primitive="dock">
      <Dock.Root defaultPlacement={{ edge: 'top', position: 0.5 }}>
        {({ orientation }) => (
          <>
            <Dock.Handle aria-label={t('primitives.examples.movePrimitiveDock')} />
            <Dock.Content>
              {orientation} {t('primitives.examples.dock')}
            </Dock.Content>
          </>
        )}
      </Dock.Root>
    </Dock.Boundary>
  );
}

function LayoutExample() {
  const { t } = useTranslation();

  return (
    <Layout data-docs-primitive="layout">
      <Layout.Header>{t('primitives.examples.header')}</Layout.Header>
      <Layout.Lane direction="horizontal">
        <Layout.Sidebar defaultCollapsed={false}>
          <Layout.SidebarTrigger aria-label={t('primitives.examples.toggleSidebar')}>
            {t('primitives.examples.toggleSidebar')}
          </Layout.SidebarTrigger>
          <nav aria-label={t('primitives.examples.exampleSidebar')}>
            {t('primitives.examples.sidebar')}
          </nav>
        </Layout.Sidebar>
        <Layout.Content as="div">{t('primitives.examples.mainContent')}</Layout.Content>
      </Layout.Lane>
      <Layout.Footer>{t('primitives.examples.footer')}</Layout.Footer>
    </Layout>
  );
}

function MenuExample() {
  const { t } = useTranslation();

  return (
    <Menu data-docs-primitive="menu">
      <Menu.Trigger>{t('primitives.examples.openMenu')}</Menu.Trigger>
      <Menu.Content {...portalProps}>
        <Menu.Item>{t('primitives.examples.copy')}</Menu.Item>
        <Menu.Item>{t('primitives.examples.paste')}</Menu.Item>
        <Menu.Submenu>
          <Menu.SubmenuTrigger>{t('primitives.examples.export')}</Menu.SubmenuTrigger>
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
  const { t } = useTranslation();

  return (
    <Menubar aria-label={t('primitives.examples.exampleApplication')} data-docs-primitive="menubar">
      <Menubar.Menu value="file">
        <Menubar.Trigger>{t('primitives.examples.file')}</Menubar.Trigger>
        <Menubar.Content {...portalProps}>
          <Menubar.Item>{t('primitives.examples.new')}</Menubar.Item>
          <Menubar.Item>{t('primitives.examples.save')}</Menubar.Item>
        </Menubar.Content>
      </Menubar.Menu>
      <Menubar.Menu value="edit">
        <Menubar.Trigger>{t('primitives.examples.edit')}</Menubar.Trigger>
        <Menubar.Content {...portalProps}>
          <Menubar.Item>{t('primitives.examples.undo')}</Menubar.Item>
          <Menubar.Item>{t('primitives.examples.redo')}</Menubar.Item>
        </Menubar.Content>
      </Menubar.Menu>
    </Menubar>
  );
}

function NavigationMenuExample() {
  const { t } = useTranslation();

  return (
    <NavigationMenu
      aria-label={t('primitives.examples.exampleNavigation')}
      data-docs-primitive="navigation-menu"
    >
      <NavigationMenu.List>
        <NavigationMenu.Item value="overview">
          <NavigationMenu.Link href="#overview">
            {t('primitives.examples.overview')}
          </NavigationMenu.Link>
        </NavigationMenu.Item>
        <NavigationMenu.Item value="learn">
          <NavigationMenu.Trigger>{t('primitives.examples.learn')}</NavigationMenu.Trigger>
          <NavigationMenu.Content>
            <li>
              <a href="#guides">{t('primitives.examples.guides')}</a>
            </li>
            <li>
              <a href="#examples">{t('primitives.examples.examples')}</a>
            </li>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu>
  );
}

function PaginationExample() {
  const { t } = useTranslation();

  return (
    <Pagination total={72} defaultPage={2} pageSize={10} data-docs-primitive="pagination">
      {(state) => (
        <>
          <Pagination.Item page={state.page - 1} disabled={state.page === 1}>
            {t('primitives.examples.previous')}
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
            {t('primitives.examples.next')}
          </Pagination.Item>
        </>
      )}
    </Pagination>
  );
}

function PopoverExample() {
  const { t } = useTranslation();

  return (
    <Popover data-docs-primitive="popover">
      <Popover.Trigger>{t('primitives.examples.openPopover')}</Popover.Trigger>
      <Popover.Content {...portalProps}>
        <p>{t('primitives.examples.thisPanelIsPositionedRelativeToItsTrigger')}</p>
        <Popover.Close>{t('primitives.examples.close')}</Popover.Close>
      </Popover.Content>
    </Popover>
  );
}

function RadioExample() {
  const { t } = useTranslation();

  return (
    <Radio.Group
      defaultValue="comfortable"
      name="primitive-density"
      aria-label={t('primitives.examples.density')}
      data-docs-primitive="radio"
    >
      <label>
        <Radio value="compact" /> {t('primitives.examples.compact')}
      </label>{' '}
      <label>
        <Radio value="comfortable" /> {t('primitives.examples.comfortable')}
      </label>
    </Radio.Group>
  );
}

function SelectExample() {
  const { t } = useTranslation();

  return (
    <Select defaultValue="design" name="project" data-docs-primitive="select">
      <Select.Trigger aria-label={t('primitives.examples.project')}>
        {t('primitives.examples.chooseProject')}
      </Select.Trigger>
      <Select.Content {...portalProps}>
        <Select.Option value="design">Item A</Select.Option>
        <Select.Option value="docs">{t('primitives.examples.virgoDocs')}</Select.Option>
      </Select.Content>
    </Select>
  );
}

function TabsExample() {
  const { t } = useTranslation();

  return (
    <Tabs defaultValue="overview" data-docs-primitive="tabs">
      <Tabs.List aria-label={t('primitives.examples.primitiveInformation')}>
        <Tabs.Tab value="overview">{t('primitives.examples.overview')}</Tabs.Tab>
        <Tabs.Tab value="api">API</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="overview">{t('primitives.examples.aHeadlessTabPanel')}</Tabs.Panel>
      <Tabs.Panel value="api">
        {t('primitives.examples.composableRootListTabAndPanelParts')}
      </Tabs.Panel>
    </Tabs>
  );
}

function ToastExample() {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);

  return (
    <Toast.Provider>
      <button type="button" onClick={() => setOpen(true)} data-docs-primitive="toast">
        {t('primitives.examples.showToast')}
      </button>
      <Toast.Root open={open} onOpenChange={setOpen} duration={0}>
        <Toast.Title>{t('primitives.examples.saved')}</Toast.Title>
        <Toast.Description>{t('primitives.examples.yourChangesAreReady')}</Toast.Description>
        <Toast.Action>{t('primitives.examples.undo')}</Toast.Action>
        <Toast.Close>{t('primitives.examples.dismiss')}</Toast.Close>
      </Toast.Root>
      <Toast.Viewport {...portalProps} />
    </Toast.Provider>
  );
}

function TooltipExample() {
  const { t } = useTranslation();

  return (
    <Tooltip openDelay={100} data-docs-primitive="tooltip">
      <Tooltip.Trigger>{t('primitives.examples.hoverOrFocus')}</Tooltip.Trigger>
      <Tooltip.Content {...portalProps}>{t('primitives.examples.helpfulContext')}</Tooltip.Content>
    </Tooltip>
  );
}

export function PrimitiveExample({ slug }: { slug: PrimitiveSlug }) {
  const locale = useAppLocale();
  const { t } = useTranslation();

  switch (slug) {
    case 'slider':
      return (
        <Slider
          data-docs-primitive="slider"
          aria-label={t('examples.slider.copy.label')}
          defaultValue={40}
        />
      );
    case 'color-picker':
      return (
        <ColorPicker data-docs-primitive="color-picker">
          <ColorPicker.Input aria-label={t('examples.colorPicker.copy.label')} />
          <ColorPicker.Swatch value="#1a5cff" />
        </ColorPicker>
      );
    case 'time-picker':
      return (
        <TimePicker
          data-docs-primitive="time-picker"
          aria-label={t('examples.timePicker.copy.label')}
          defaultValue="09:30"
        />
      );
    case 'calendar':
      return (
        <Calendar
          previousMonthLabel={t('shared.controls.previousMonth')}
          nextMonthLabel={t('shared.controls.nextMonth')}
          data-docs-primitive="calendar"
          locale={locale}
          defaultMonth="2026-10"
        />
      );
    case 'date-picker':
      return (
        <DatePicker data-docs-primitive="date-picker" defaultValue="2026-10-06">
          <DatePicker.Input aria-label={t('examples.datePicker.copy.label')} />
          <DatePicker.Trigger>{t('shared.controls.chooseDate')}</DatePicker.Trigger>
          <DatePicker.Content {...portalProps}>
            <DatePicker.Calendar
              previousMonthLabel={t('shared.controls.previousMonth')}
              nextMonthLabel={t('shared.controls.nextMonth')}
              locale={locale}
            />
          </DatePicker.Content>
        </DatePicker>
      );
    case 'timeline':
      return (
        <Timeline data-docs-primitive="timeline">
          <Timeline.Item>
            <Timeline.Time dateTime="2026-10-01">2026-10-01</Timeline.Time>
            <Timeline.Title>{t('examples.timeline.copy.created')}</Timeline.Title>
          </Timeline.Item>
          <Timeline.Item>
            <Timeline.Title>{t('examples.timeline.copy.review')}</Timeline.Title>
          </Timeline.Item>
        </Timeline>
      );

    case 'form':
      return (
        <Form data-docs-primitive="form" onSubmit={(event) => event.preventDefault()}>
          <Field>
            <Field.Label>{t('primitives.examples.displayName')}</Field.Label>
            <Input />
          </Field>
          <button type="submit">{t('primitives.examples.save')}</button>
        </Form>
      );
    case 'field':
      return (
        <Field data-docs-primitive="field" required>
          <Field.Label>{t('primitives.examples.displayName')}</Field.Label>
          <Input />
          <Field.Description>{t('primitives.examples.headlessByDefault')}</Field.Description>
        </Field>
      );
    case 'table':
      return (
        <Table data-docs-primitive="table">
          <Table.Caption>{t('primitives.examples.displayName')}</Table.Caption>
          <Table.Header>
            <Table.Row>
              <Table.Head>{t('primitives.examples.file')}</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>README.md</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      );
    case 'tree':
      return (
        <Tree data-docs-primitive="tree" aria-label={t('primitives.examples.file')}>
          <Tree.Item value="src" branch>
            <Tree.Label>
              <Tree.Toggle>{t('primitives.examples.file')}</Tree.Toggle>src
            </Tree.Label>
            <Tree.Group>
              <Tree.Item value="readme">
                <Tree.Label>README.md</Tree.Label>
              </Tree.Item>
            </Tree.Group>
          </Tree.Item>
        </Tree>
      );
    case 'combobox':
      return (
        <Combobox data-docs-primitive="combobox">
          <Combobox.Input aria-label={t('primitives.examples.displayName')} />
          <Combobox.Content {...portalProps}>
            <Combobox.Option value="virgo" textValue="Example">
              Example
            </Combobox.Option>
            <Combobox.Option value="design" textValue="Design">
              Design
            </Combobox.Option>
          </Combobox.Content>
        </Combobox>
      );

    case 'accordion':
      return <AccordionExample />;
    case 'breadcrumb':
      return <BreadcrumbExample />;
    case 'button':
      return <Button data-docs-primitive="button">{t('primitives.examples.nativeButton')}</Button>;
    case 'checkbox':
      return <CheckboxExample />;
    case 'carousel':
      return <CarouselExample />;
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
          {t('primitives.examples.projectName')}
          <Input data-docs-primitive="input" defaultValue="Item A" />
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
          <Switch data-docs-primitive="switch" defaultChecked />{' '}
          {t('primitives.examples.notifications')}
        </label>
      );
    case 'tabs':
      return <TabsExample />;
    case 'textarea':
      return (
        <label>
          {t('primitives.examples.notes')}{' '}
          <Textarea
            data-docs-primitive="textarea"
            defaultValue={t('primitives.examples.headlessByDefault')}
            rows={3}
          />
        </label>
      );
    case 'toast':
      return <ToastExample />;
    case 'cursor':
      return (
        <Cursor.Provider data-docs-primitive="cursor">
          <button type="button">{t('primitives.examples.moveYourMouseHere')}</button>
          <Cursor.Follower {...portalProps}>
            {t('primitives.examples.pointerFeedback')}
          </Cursor.Follower>
        </Cursor.Provider>
      );
    case 'tooltip':
      return <TooltipExample />;
  }
}
