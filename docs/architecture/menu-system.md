# Menu System

Menu offers actions; ContextMenu offers actions for the invoking object; Menubar coordinates application action groups. NavigationMenu remains a separate destination/navigation protocol. No routing, permissions, command registration or App Shell behavior is introduced.

## Shared protocol

`packages/primitives/src/internal/menu` owns the item collection, keyboard movement/typeahead, menu context, active child relationship, and shared item implementations. Menu, ContextMenu and Menubar export the same Item, CheckboxItem, RadioItem, RadioGroup, Group, Separator and Submenu parts, rather than copies. Dropdown retains its existing API; this addition does not migrate Dropdown consumers.

All popup levels reuse existing overlay Portal, useFloatingPosition, useDismiss and LayerScope. A virtual anchor rectangle extends the position hook for ContextMenu while the actual target still supplies document, direction and theme. No additional overlay manager is installed. Submenu siblings are coordinated so only one is visible, and pointer travel has a short existing hover-intent close grace period. Panels unmount immediately on close, avoiding overlapping exit ghosts.

## Public composition

```tsx
<Menu.Root open={open} onOpenChange={setOpen}>
  <Menu.Trigger render={(props) => <button {...props} />}>Actions</Menu.Trigger>
  <Menu.Content>
    <Menu.Group label="Actions">
      <Menu.Item onSelect={rename} shortcut="F2">
        Rename
      </Menu.Item>
    </Menu.Group>
    <Menu.Submenu>
      <Menu.SubmenuTrigger>Export</Menu.SubmenuTrigger>
      <Menu.SubmenuContent>
        <Menu.Item onSelect={exportPDF}>PDF</Menu.Item>
      </Menu.SubmenuContent>
    </Menu.Submenu>
    <Menu.Separator />
    <Menu.CheckboxItem checked={grid} onCheckedChange={setGrid}>
      Grid
    </Menu.CheckboxItem>
    <Menu.RadioGroup value={zoom} onValueChange={setZoom} aria-label="Zoom">
      <Menu.RadioItem value="100">100%</Menu.RadioItem>
      <Menu.RadioItem value="200">200%</Menu.RadioItem>
    </Menu.RadioGroup>
  </Menu.Content>
</Menu.Root>
```

Root open/defaultOpen/onOpenChange support controlled and uncontrolled menus. Submenu uses the same state props; parent closure and sibling coordination govern its effective visibility. CheckboxItem supports checked/defaultChecked/onCheckedChange, including a controlled `mixed` state; activating mixed requests true. RadioGroup supports value/defaultValue/onValueChange. Selection is cancelable with event.preventDefault(). Item closes its menu tree by default; checkbox and radio items stay open by default. `closeOnSelect` overrides that behavior. The UI adds icon, danger and shortcut display, plus mini/small/medium/large density inherited through nested menus.

ContextMenu replaces only the trigger and root entry mode. Its focusable target responds to right click, ContextMenu key, or Shift+F10. Pointer invocation uses viewport coordinates; keyboard invocation uses the target rectangle. It supports render(props) for a custom target that forwards its props and ref. No long-press behavior is added.

Menubar.Root supports value/defaultValue/onValueChange for the open top-level menu (`null` closes it). Each Menubar.Menu may supply a stable value; otherwise it receives an instance ID. Trigger and Content live inside Menu. Exactly one top-level menu opens at a time; the bar maintains one tab stop, remembers the focused trigger, and supports horizontal arrows, Home/End and character search. Hover switches groups once a menu is open.

## Keyboard and accessibility

Behavior follows the [WAI-ARIA Menu and Menubar pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/) and [Menu Button pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/). Menu buttons use aria-haspopup, aria-expanded and aria-controls. Popup content uses role=menu and a trigger relationship or explicit accessible label. UI group labels are optional; primitive groups accept aria-label/aria-labelledby.

Arrow Up/Down moves within the current collection; Home/End selects its edges. Disabled entries remain focusable but cannot activate. Enter/Space activates. Arrow Right enters a submenu and Arrow Left returns; these directions reverse in RTL. Escape closes only the top layer and returns focus to its trigger. Tab closes the entire menu tree and continues from the invoking control in natural tab order. External closure restores focus only when it belonged to the closing tree; outside interactions retain their new focus. Letter search ignores UI shortcut decoration; textValue supports custom rich labels.

Shortcut is decorative text, not a key binding or command system. Menus do not trap focus, make the rest of the page inert or implement modal isolation. Nested Dialog/Popover layers continue to use the existing shared layer ordering.

## UI and Playground

UI item visuals and panel styles live in `packages/ui/src/internal/menu`. They reuse Virgo's overlay surface mixin, tokens and icons. ContextMenu and Menubar reference those same visual parts. Light/dark mode follows the trigger's theme through the portal. There is no new animation system.

Playground routes: `/components/menu`, `/components/context-menu`, `/components/menubar`. They demonstrate action feedback, three-level submenus, hover switching, disabled actions, checkboxes, radio groups, sizes, pointer positioning and application menu keyboard navigation. The displayed shortcuts deliberately do not execute actions.
