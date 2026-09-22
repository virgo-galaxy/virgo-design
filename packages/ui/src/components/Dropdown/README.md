# Dropdown

Navigation menu following Primitive → UI → Metadata → Playground → Tests. The primitive owns state, menu semantics, keyboard navigation and viewport positioning; UI reuses Virgo Button, icons and existing tokens. No loading state.

Portal, positioning, observation, theme/direction inheritance, dismissal and focus return now use the same private overlay infrastructure as Popover. Menu-specific keyboard behavior remains in Dropdown; its public API and immediate closing behavior are unchanged. See [internal architecture](../../../../../docs/architecture/components-and-internal.md).

```tsx
<Dropdown trigger="click">
  <Dropdown.Trigger>Actions</Dropdown.Trigger>
  <Dropdown.Content placement="bottomLeft" arrow>
    <Dropdown.Item onSelect={edit}>Edit</Dropdown.Item>
    <Dropdown.Item disabled>Unavailable</Dropdown.Item>
    <Dropdown.Separator />
    <Dropdown.Item danger onSelect={remove}>
      Delete
    </Dropdown.Item>
  </Dropdown.Content>
</Dropdown>
```

| Part      | Props                                                                                                                                                       |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Root      | `trigger="click"` (default) or `"hover"`; `open`, `defaultOpen`, `onOpenChange`, `disabled`, `size` (mini/small/medium/large; default medium)               |
| Trigger   | Native button props; `variant` (default outline), `indicator` (default Virgo ChevronDown, false hides it), `danger`                                         |
| Content   | `placement` (default bottomLeft), `offset` (default 8px), `arrow` (default false), native div props                                                         |
| Item      | Native button props; `icon`, `disabled`, `danger`, `onSelect`; optional `checked` produces a radio menu item                                                |
| Separator | Native div props                                                                                                                                            |
| Button    | Split button; native props apply to the main action. Required `menuLabel`, optional `menuIcon` (Virgo Ellipsis by default), `variant`, `danger`, `disabled` |

Placements: bottomLeft, bottom, bottomRight, topLeft, top, topRight, leftTop, left, leftBottom, rightTop, right, rightBottom. These are physical placements; menus flip when the opposite side has more room and shift inside the viewport. The arrow follows the trigger. Content portals to the document body to escape overflow clipping and inherits the nearest `data-theme` and direction. Page-local custom CSS variables should be set on Content or a global theme if needed across the portal.

`Dropdown.Button` is used instead of `Dropdown.Trigger`, inside a Root. The main action never opens the menu; the adjacent labelled button does. Custom trigger content and icons are supported without nesting interactive elements. Native `title` may supply a simple browser tooltip; no separate Tooltip component is introduced.

Hover opening does not move focus, allows a 150ms crossing delay, and supports touch click. Keyboard works with either trigger mode: Down/Up opens at first/last item; Enter/Space opens at the checked or first item; arrows wrap and skip disabled items, Home/End and typeahead navigate. Escape and selection restore focus unless an action has deliberately focused another element; Tab closes and proceeds in document order. Outside pointer/focus dismisses. `onSelect(event)` can prevent default to keep the menu open. Controlled state requires the caller to honor `onOpenChange`.

Pagination uses a click Dropdown with checked page-size items; selecting a size resets to page one. Its quick jumper still uses Input. Metadata is exported only from `@virgo-design/ui/metadata`. Review at `/components/dropdown`.
