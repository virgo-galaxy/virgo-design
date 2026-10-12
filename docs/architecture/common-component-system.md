# Common component system

Form, Field, Table, Tree, Combobox, Slider, ColorPicker, TimePicker, DatePicker, Calendar
and Timeline provide shared form and data-presentation capabilities. Public package roots,
metadata, generated API references, executable examples and co-located locales describe their
contracts. Component-owned README files document detailed composition behavior.

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
UI adds four densities, logical alignment, none/rows/separators/all borders, stripes, row hover, selected-row
presentation and sticky headers inside a constrained viewport. Empty and summary content compose
through native spanning cells and Footer. Selection is presentation, not a grid interaction model.

Table supplies controlled sorting/filter/search controls, page-key selection, column resizing
and fixed-column presentation. Consumers own data ordering, filtering, pagination, visibility,
reordering and persistence; Table does not become a virtualized grid. See the
[Table composition contract](../../packages/ui/src/components/Table/README.md). The
Website's generated API reference composes Surface frames with Table without changing the generated
data model. The UI-only `separators` border mode divides adjacent rows within and across nonempty
table sections, leaving outer edges unbordered. It also supports headerless tables; `rows` retains
its existing bottom-border behavior. Container framing belongs to Surface, not Table or a docs variant.

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

Slider is a native single-value range control. `Slider.Range` supports ordered multiple values,
neighbor-constrained thumbs, pointer cancellation, RTL and keyboard adjustment. Both share
controlled/uncontrolled state, Field/Form defaults and native submission; numeric domains and
business meaning remain consumer-owned. See the
[Slider contract](../../packages/ui/src/components/Slider/README.md).

ColorPicker shares controlled or uncontrolled sRGB values in `#rrggbb` or `#rrggbbaa` form.
Input retains the browser's native color dialog; Trigger and Content compose a custom editor
with Area, Hue, Opacity, HexField, ChannelField, AlphaField and Preview. Area includes named
saturation and brightness ranges for keyboard access. RGB/HSV conversion, draft commit/reset,
form submission, Field association and disabled/read-only guards belong to the primitive.
UI `ColorPicker.Panel` provides full HEX/RGB and simple HEX editors; opacity is enabled by
default in the full panel and can be configured independently. The value Trigger has a stable
width. Part classes, data slots and CSS variables customize presentation without duplicating
editor behavior. Wide-gamut output remains outside this sRGB contract.

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
come from the existing overlay infrastructure. `DatePicker.Range` composes paired date inputs
and the shared calendar for a civil-date interval; time-zone conversion stays consumer-owned.
The UI Trigger defaults to a decorative Calendar icon; consumers can still replace its children.

## Timeline

Timeline preserves ordered-list reading order with Item, Title, Description, Time and decorative
Indicator parts. UI supplies three densities, connectors and pending/active/complete status.
Consumers own chronological data and valid time dateTime values. This is a semantic event list;
interactive scheduling and Gantt editing need a different, demonstrated consumer contract.

## Documentation and adoption

Styled and headless documentation use the existing catalogue/sidebar/detail infrastructure
and stable component routes. Executable examples belong to their component manifests.
Generated public API descriptions and co-located English/Chinese locales follow the existing schema.
Construction relationships remain factual; a separately labeled composition list explains common
combinations without claiming runtime dependencies.

API reference dogfoods Table. Icon Studio dogfoods Form, Field and Textarea. Icon Catalogue search
uses Combobox with consumer-owned search matching. Website navigation stays NavigationMenu: no
existing interactive explorer requires Tree. HueControls and IconsExplorer use Slider for hue and
icon preview size. Calendar is reused directly by DatePicker rather than maintaining another date
navigation implementation.

## DataTable and later stages

DataTable remains a separate potential abstraction. Pro currently composes public Table controls
with its API-owned queries and product-owned selection, column and preference state. A shared
DataTable needs repeated consumer requirements for client/server ownership, stable row/column IDs,
loading, paging, large-data constraints and accessible interaction before defining a public API.

Tree virtualization, asynchronous Combobox protocols and scheduling editors likewise require
concrete consumers. Existing local geometry and composition variables do not imply a new global
component-token architecture.

## Website self-hosting

The current Website ownership, deliberate native fixtures, landmark policy and loading boundaries
are specified in [Website self-hosting](website-selfhosting.md). Typography tables use Table with their
local composition styles; Layout.Content exposes the general main/div semantic choice.

## Consumer composition contracts

Steps and UI Collapsible are public families with co-located types, styles, metadata, tests,
generated API, bilingual documentation and executable examples. Steps is an ordered presentation
pattern with optional Button actions; progress and navigation stay consumer-owned. Collapsible
reuses the existing Primitive and UI Button.
ColorPicker composes its shared editor panel while retaining the native Input API. Select exposes
selected-value/indicator customization and stable part slots; Tabs exposes native-button/label
classes; Input exposes frame className independently of the native control. These are general
consumer capabilities, not Website-only variants. See website-selfhosting.md for strict boundaries.
