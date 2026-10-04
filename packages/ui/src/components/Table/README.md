# Table

Compose native table sections and cells with optional sorting, filters, resizing and selection controls. Data ordering, filtering and selected row styling remain consumer-owned.

## Selection menu

Place `Table.Selection` inside the selection-column heading. Pass `rowKeys` for selectable rows on the current page and `value` / `onValueChange` for the selected keys across pages. Exclude disabled row keys. The checkbox derives empty, mixed and checked states from those keys.

`selections` defaults to `false`, which omits the arrow. Use `true` for the built-in `all`, `invert` and `none` actions, or an array to reorder them and add custom options. An empty array also omits the arrow. The arrow darkens and opens the menu on hover; click, touch and keyboard activation also work.

```tsx
<Table.Selection
  rowKeys={pageRows.map((row) => row.id)}
  value={selectedKeys}
  onValueChange={setSelectedKeys}
  selections={[
    'all',
    'invert',
    'none',
    {
      key: 'odd',
      label: 'Select odd rows',
      onSelect: (pageKeys, selected) => [
        ...selected.filter((key) => !pageKeys.includes(key)),
        ...pageKeys.filter((_, index) => index % 2 === 0),
      ],
    },
  ]}
/>
```

The checkbox, `all` and `invert` operate on the supplied page keys and preserve selections from other pages. `none` clears the full selection. Custom `onSelect` returns the next selected keys; duplicates are removed before `onValueChange`. Custom options may be disabled. Labels for built-in actions come from `UIControlLabelsProvider`; `label` and `menuLabel` override accessible control names.

## Control hints

Sorting hints anchor to the sort indicator while the full heading remains clickable and keyboard accessible. `Table.Filter` supplies a generic localized “Filter” tooltip, and hides the hint while the filter popover is open. The column label names the accessible trigger and popover; it does not appear in the default visual hint. Pass `tooltip` to customize the hint, or `tooltip={false}` to omit it.
