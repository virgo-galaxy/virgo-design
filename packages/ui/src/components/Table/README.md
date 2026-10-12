# Table

Compose native table sections and cells with optional sorting, filters, resizing and selection controls. Data ordering, filtering and selected row styling remain consumer-owned.

Headings retain the density's header height when controls are enabled. Labels truncate before the fixed-size controls; exceptionally narrow columns let the controls scroll horizontally. Header padding reserves room for the 24px controls; `--table-header-padding-block` can override it. Custom taller content can still grow naturally.

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

Sorting hints anchor to the sort indicator while the full heading remains clickable and keyboard accessible. `Table.Filter` supplies a generic localized “Filter” tooltip. Filter and search hints stay hidden while their popover is open and when closing restores trigger focus; a fresh pointer entry or keyboard focus shows them again. The column label names the accessible trigger and popover; it does not appear in the default visual hint. Pass `tooltip` to customize the hint, or `tooltip={false}` to omit it.

## Configurable columns

`Table.Head.controls` configures a fixed-order group: sorting, filter, search.
Omit a control or pass `false` to hide it. `controls.layout="separate"` (default)
keeps the title at the start and uses `controls.align` to position the controls in
the remaining space. `controls.layout="joined"` aligns the title and controls as
one group. Both modes use the same `start`, `center` or `end` alignment; with all
controls hidden, joined mode still aligns the title. Controls always follow the
title in sorting, filter, search order.

```tsx
<Table.Head
  controls={{
    layout: 'joined',
    align: 'center',
    sort: { mode: 'both', direction, onDirectionChange: setDirection },
    filter: { options, value: filters, onValueChange: setFilters },
    search: { value: query, onValueChange: setQuery },
  }}
>
  Item
</Table.Head>
```

`controls.sort.mode` and the standalone `Table.SortButton.sortMode` accept
`"both" | "ascending" | "descending"`.
Both cycles none → ascending → descending → none. A single direction renders one
triangle and toggles that direction → none. `directions` on SortButton can specify
an ordered subset directly. Sorting always remains controlled by the consumer.
`controls.sort.enabled={false}` hides the sorting control while retaining its mode.
The header supplies filter/search accessible labels from its column name. Filter
applies checkbox choices on Confirm; search applies text on submit. The standalone
`Table.Filter` and `Table.Search` remain available for other compositions.

`Table.Search.actionSize` overrides the action button size independently of the
input size; omitting it keeps both using `size`.

`columnWidths` and `onColumnWidthsChange` keep widths in visible column order. The
consumer maps widths to stable column IDs when hiding or reordering columns. Widths
remain effective with `resizable={false}`. `minColumnWidth` / `maxColumnWidth` provide
default resize limits; Head's `minWidth` / `maxWidth` override them per column.
Resizing is enabled or disabled for the whole table through `Table.resizable`.
Pointer and keyboard changes respect both
limits; Home jumps to minimum and End to a finite maximum.

Head and Cell accept `fixed="start" | "end"` and `stickyOffset`. Group fixed columns
at their respective edges and pass the cumulative width of the preceding fixed
columns. Use Table.Viewport as the scrolling region. Fixed body cells inherit row
hover/selection backgrounds; fixed headings layer above body cells and work with
stickyHeader. A full-height vertical separator and a continuous gradient shadow mark the inner edge of each fixed
group even when header dividers and row borders are disabled;
`--table-fixed-separator-color` and `--table-fixed-shadow-color` control their colors. Native drag handlers may be composed on heads and rows; the consumer
owns reorder state, keyboard alternatives and persistence.

`size="mini"` / `density="mini"` adds a fourth density. Pagination also supports
`size="mini"`. Tasks in Pro demonstrates a single size setting shared by toolbar,
table and pagination, a settings Dialog, column visibility/order,
selection-menu composition and complete-list loading when pagination is hidden.
The business region and task API remain in Pro; Table retains native semantics.
Task table preferences are saved in browser storage with versioning and validation;
unavailable storage falls back to session state without disabling configuration.
