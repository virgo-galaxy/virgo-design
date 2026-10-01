# Common component system

The next component layer adds Form, Field, Table, Tree, Combobox, Slider,
ColorPicker, TimePicker, DatePicker, Calendar and Timeline to both public packages. The
existing package roots, metadata entry, generated API reference, example runtime and locale registry
remain the integration points. Calendar and Clock icons are added for the date and time controls;
no dependencies, themes or global tokens are added.

## Form and Field

`Form` is a native form plus disabled/read-only defaults. Submission, business values, validation,
pending state and feedback belong to the consumer. `Field` describes one control and exposes
`Field.Label`, `Field.Description`, `Field.Message` and `Field.Control`. Label is a compound part,
not another public family. Use native fieldset/legend to name a group of radios or checkboxes, then
use a Field for each individually labeled control.

The private field context combines external `aria-describedby` with registered descriptions and
messages, supplies an ID, and tracks an explicit control ID. Input, Textarea, Select, Checkbox,
Radio, Switch, Combobox.Input, Slider, ColorPicker.Input, TimePicker and DatePicker.Input
participate. Explicit control state overrides inherited defaults;
Select and Combobox root state governs their whole interaction. Native controls retain browser
validation; Select's trigger exposes `aria-required`, while validation of its chosen value stays
consumer-owned. Read-only choice controls remain focusable but cannot change.

UI Form offers vertical/horizontal layout, three spacing sizes and a narrow-screen stacked layout.
UI Field owns label, hint and message presentation. For a custom control, pass the attributes from
`Field.Control` to that control. A Field expects a single control; it does not invent group semantics.
Description registration and explicit ID discovery complete during layout effects. Server-rendered
consumers that require associations before hydration should pass an explicit `controlId` and
`aria-describedby` with explicit description/message IDs.

## Table

Table retains native table semantics: Caption, Header, Body, Footer, Row, Head and Cell. Head defaults
to column scope; consumers can set row scope. Viewport is a named, keyboard-scrollable region.
UI adds three densities, logical alignment, none/rows/all borders, stripes, row hover, selected-row
presentation and sticky headers inside a constrained viewport. Empty and summary content compose
through native spanning cells and Footer. Selection is presentation, not a grid interaction model.

Sorting, filtering, paging, visibility, resizing and virtualization remain outside Table. The
Website's generated API reference now uses Table without changing the generated data model.

## Tree

Tree has independently controlled/uncontrolled expanded and selected value arrays. Selection modes
are single (default), modifier-free multiple (Space/Enter toggles), and none. Focus does not select.
There is one tab stop among visible enabled items. Up/Down move in DOM hierarchy order, Home/End
reach its endpoints, logical Right expands or enters a branch, and logical Left collapses or reaches
the parent. RTL reverses disclosure keys. Enter/Space selects; printable typeahead wraps with a
500 ms reset. Tab retains browser behavior. Collapsing an externally controlled branch restores
focus to the nearest visible ancestor. Disabled branches disable their descendants.

Items expose treeitem semantics, labeled by Tree.Label; branches expose aria-expanded. Tree.Group
is hidden when collapsed. The Toggle provides pointer disclosure independently of selection. Values
must be unique and stable within a Tree. Lazy data loading, virtualization, drag/drop, range selection
and editable labels wait for real explorer requirements.

## Combobox and autocomplete

Combobox owns three independent controlled/uncontrolled channels: selected value, input text and
popup open state. Typing does not erase or commit selection; choosing fills the text and closes the
popup. Empty string means no selection. Name submits the selected value through a hidden native
control. Clear resets both text and selection.

Input keeps DOM focus and uses aria-activedescendant for the active enabled option. Up/Down navigate,
Enter commits, Escape closes, and Tab leaves without committing. Home/End and horizontal arrows keep
native text editing. Composition events, native composing and legacy key code 229 guard IME keys.
Options require a plain text value for filtering and input display; additional keywords are optional.
Case-insensitive substring filtering is built in; a filter callback or shouldFilter=false supports
consumer-owned results. Selected labels are discovered from mounted options during layout effects.

Content reuses the internal floating position, portal, direction/theme synchronization, dismissal
and overlay layer stack. UI shares the existing panel surface and existing chevron/close icons.
Autocomplete is an example of this same core with consumer-owned suggestions, not a second component.
Remote cancellation, debounce, loading/error handling and creation of new values stay consumer-owned.

## Slider, color and time input

Slider is one native numeric range control. The browser owns pointer and keyboard movement;
Virgo supplies controlled/uncontrolled numeric state, field association, read-only guards, three
sizes, existing focus/color tokens and RTL-compatible native behavior. It submits through its
native name/value. Multi-thumb ranges await a concrete consumer contract.

ColorPicker composes Input (native color dialog), Swatch and Preview around a shared controlled
or uncontrolled value. Values are canonical opaque sRGB #rrggbb. Named submission uses a hidden
native input; disabled state excludes it. Swatches expose pressed state and an accessible color
name. The browser/OS owns the picker dialog. Alpha, HSV editing and wide-gamut color are future
work rather than implicit support in this first API.

TimePicker uses native time segments and validation with a controlled/uncontrolled string,
min/max/step, name, required and inherited field state. Values are local HH:mm or HH:mm:ss;
time zones and appointment/business rules remain consumer-owned. Native time and color dialog
appearance varies by browser/OS; the Virgo control surface uses the shared existing tokens.
UI displays a decorative Clock icon while preserving the native picker hit target and input ref.

## Calendar and DatePicker

Calendar selects one civil YYYY-MM-DD date and independently controls the displayed YYYY-MM.
Private UTC date-only arithmetic avoids DST shifts and supports years 0001–9999, clamped month
and year movement, leap days, min/max and a consumer-owned unavailable-date predicate. Locale
formatting uses Intl; weekStartsOn is explicit. The grid has a single day tab stop; focus and
selection are independent. Logical horizontal arrows respect RTL, vertical arrows move a week,
Home/End reach week boundaries, PageUp/PageDown move a month, and Shift adds year movement.
Enter/Space selects through native buttons. Month navigation is available in read-only mode;
selection is prevented. Disabled dates cannot be focused or selected.

DatePicker composes a native date Input, Trigger and nonmodal Popover Content containing that
same Calendar. Selection and constraints are shared; input keeps native name/required validation.
Opening focuses the selected available day, choosing closes, and Popover returns focus to Trigger.
Escape, outside dismissal, portal, collision positioning, layer registration and theme/RTL context
come from the existing overlay infrastructure. Date ranges and time-zone conversion are deferred.
The UI Trigger defaults to a decorative Calendar icon; consumers can still replace its children.

## Timeline

Timeline preserves ordered-list reading order with Item, Title, Description, Time and decorative
Indicator parts. UI supplies three densities, connectors and pending/active/complete status.
Consumers own chronological data and valid time dateTime values. This is a semantic event list;
interactive scheduling and Gantt editing need a different, demonstrated consumer contract.

## Documentation and adoption

Eleven styled pages and eleven headless pages use existing catalogue/sidebar/detail infrastructure.
Twenty-eight added examples bring the component runtime to 237 examples across 48 component pages
and 36 primitive pages. Catalogue/sidebar ordinals are continuous 01–48 using the existing group
order and formal component names. Existing URLs remain stable.
Generated public API descriptions and co-located English/Chinese locales follow the existing schema.
Construction relationships remain factual; a separately labeled composition list explains common
combinations without claiming runtime dependencies.

API reference dogfoods Table. Icon Studio dogfoods Form, Field and Textarea. Icon Catalogue search
uses Combobox with consumer-owned search matching. Website navigation stays NavigationMenu: no
existing interactive explorer requires Tree. HueControls and IconsExplorer use Slider for hue and
icon preview size. Calendar is reused directly by DatePicker rather than maintaining another date
navigation implementation.

## DataTable and later stages

DataTable is deliberately deferred. API documentation is a static semantic table, and the current
Website has no repeated data-management screen needing a shared sort/filter/selection/page contract.
The new Table foundation alone is not evidence for inventing that contract. Revisit after Virgo
Design Pro has at least two real screens, such as a project/file list and member/audit management,
with overlapping toolbar, sort/filter, row selection, paging and loading/empty behavior. Compare
client/server ownership, stable row/column IDs, large-data constraints and accessible interaction
before choosing the public abstraction.

Pro should exercise Tree with deep/lazy explorer data and Combobox with remote/large result sets
before adding virtualization or asynchronous APIs. Theme/Token audit can then compare the existing
local row-height, form-gap, label-width and popup-surface variables across real use. This stage does
not establish a new component-token architecture or platform-themed interface.

## Validation record

See [component-system-review.md](component-system-review.md) for the final verification matrix,
visual review findings and follow-up boundaries. No Git commit is made by this implementation.
