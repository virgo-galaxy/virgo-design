# Virgo Design Pro — Product audit

All twelve navigation destinations now have product content: Workplace, Analytics,
Tasks, Projects, Search Table, Data List, Detail, Basic Form, Step Form, Success, Error
and Profile. The records below retain each phase's original scope and findings.
All routes share the existing Classic-Cyber App Shell and the Virgo Studio mock domain.
The page breadth passes change this Pro app. The subsequent approved navigation-icon
pass adds three public canonical icons and switches their Pro consumers.

# Phase 1 — Workplace

Scope: `apps/pro/vite-react-scss-modules`, App Shell + information architecture +
`/dashboard/workplace`. Only Workplace has product content. Twelve other destinations
have a title and “Coming later”; unknown addresses have a recovery link.

## Missing Component

- **Chart:** the current UI public entry has no Chart family. Delivery pulse uses a
  page-owned SVG, Virgo tokens, a text summary and an accessible Virgo Table with daily
  values. The period switch uses SegmentedControl. This is the explicitly permitted
  first-stage visualization, not a new general chart component or library.

## Missing API

- **Breadcrumb.Item router adapter:** unlike NavigationMenu.Link, Breadcrumb.Item
  accepts `href` but has no `render` adapter for a React Router Link. The Pro home
  breadcrumb uses its existing `onClick` with `navigate`; modified clicks keep native
  link behavior. This is nonblocking. No package API was changed.

## Styling limitation

- No blocking styling limitation found. Card density, NavigationMenu active/compact
  treatment, Button label/icon composition, Avatar fallback size and Progress colors
  use className, public part attributes and existing CSS variables. No copied component
  implementation or private component import was needed.

## Composition friction

- **UI source root imports retain unused component CSS.** The app's existing Vite alias
  resolves `@virgo-design/ui` to the source root. The production CSS contains
  `--color-picker-*`, `--calendar-*`, `--slider-*`, `--tree-*` and `--drawer-*` declarations
  although this app uses none of those families. The final stylesheet is approximately
  214 kB before gzip (32 kB gzip). This records the observed entrypoint cost; Pro continues
  to use the supported package root instead of deep-importing private files. No packaging
  change was made in this phase.

## No issue / solved by existing API

- Layout supplies Header, Sidebar, Content, independent collapse state and responsive
  collapse/restoration. The app owns the viewport and main-content scrolling boundary.
- NavigationMenu.Link's `render` forwards native attributes/ref to React Router Link;
  pathname controls selection, including reload and browser history.
- Non-link Breadcrumb.Item defaults to `aria-current="page"`. The intermediate category
  explicitly uses `aria-current={false}`; exactly one breadcrumb marks the current page.
- Combobox supplies page discovery, filtering and keyboard selection. A page change resets
  its local query. Input supplies the recent-task filter and clear action.
- Popover and Tooltip supply dismissal, focus and portal theme inheritance. Appearance
  switches only between the existing Classic light/dark tokens.
- Table + Tag + Avatar cover recent-task presentation; filtering is page-owned. No
  DataTable abstraction or task mutation workflow was necessary.
- Progress and categorical color tokens cover workload distribution. Timeline covers
  team activity. Surface and Card supply the actual panel surfaces.
- The initial `fonts/default.css` import pulled in all CJK families, producing roughly
  24 MB of build output. Existing public Inter / JetBrains Mono CSS entries reduced
  output to approximately 1 MB for this English product fixture. No fonts package change
  was needed; build output size is not the browser's actual transfer size.

## Product data and local composition

`src/data/workplace.ts` is the deterministic v1 fixture and domain type source. It has
no React/style dependency. Snapshot date: **2026-10-01**, independent of the system clock.
Members and recent tasks are representative subsets, not the full workspace datasets.
The seven-day chart totals 84 delivered / 100 planned; the fourteen-day view totals
146 / 188. Project workload counts total 42, matching the open-task overview.

Greeting, metric grouping, dashboard grid, SVG, task filtering, CSV snapshot export,
shortcuts and announcement placement are local product composition. The twelve future
destinations do not implement Tasks, Projects, Settings or other business workflows.

## Validation

- App-scoped typecheck, lint and production build pass; source formatting passes.
- Browser checks pass for all 13 navigation destinations, default redirect, deep-link
  reload, browser back, unknown-page recovery, active navigation and a single main/current
  breadcrumb.
- Period selection, task status/assignee filtering, empty-result recovery, CSV download,
  page-search keyboard selection, account navigation, sidebar collapse/restoration,
  appearance switching and portalled theme inheritance pass.
- Layout checked at 1440, 1280, 1024, 768 and 390 px; no document/main horizontal overflow.
  Narrow task tables and charts scroll inside their own containers. Light/dark desktop
  screenshots and narrow-screen rendering were inspected. No browser runtime errors.

Only third-party dependency added: `react-router@8.4.0` (stable release), for the
requested client-side routing. Its installation also updates the workspace lockfile.
No chart dependency, shared Pro package, Website/package source change, or file in the
other five Pro directories was introduced in phase 1.

# Phase 2 — Work / Tasks

Scope: `/work/tasks` only, using the established Shell and Classic appearance. No new
business page, package source change or third-party dependency was added. Earlier
authorized Logo/favicon changes remain separate from this phase.

## Missing Component

- None found for this workflow. Table, form controls, Drawer, dates and feedback are
  supplied by the existing UI package. No local generic UI component was created.

## Missing API / Composition friction

- **Select popup placement in a scrolling Drawer:** Select.Content is an inline,
  downward-positioned listbox. Its public API has no portal, placement or collision
  adjustment. At 1280 × 720, the assignee popup's bottom edge measured 649 px while
  Drawer.Body ended at 647 px, visibly clipping its border/shadow. Project/assignee
  contents now use their public `className` to open upward with logical insets; the
  complete popup fits inside the Body. Selection, keyboard dismissal and scrolling
  remain handled by Virgo. Nonblocking; a future automatic-placement API would remove
  this consumer-specific adjustment. No primitive import or package change was used.

## Styling limitation

- No blocking limitation. Dense rows, task-title Button styling, Avatar sizing,
  two-column form composition and Drawer width/padding use SCSS Modules, public
  attributes and CSS variables. The short-window Select adjustment above uses the
  existing styling surface.

## Packaging / integration friction

- The source-root CSS retention recorded in phase 1 remains. Drawer and Calendar are
  now used; unrelated families still ship with the root stylesheet. Tasks raises the
  production CSS to approximately 221 kB (33 kB gzip), and the single JS entry to
  510 kB (145 kB gzip). Vite reports its 500 kB chunk-size advisory; build succeeds.
  No warning threshold was raised and no private entrypoint was imported.
- The Pro test config uses the workspace's existing Vitest with a Node environment
  for domain tests. The repository-wide config points `@` at Website and loads its
  setup; an app-local config keeps these product tests independent. No new test
  dependency or root config change was necessary.

## Solved cleanly by existing API

- **Table / dense layout:** Table.Viewport contains horizontal scrolling. Table
  supplies semantic headers/caption, hover and selected treatment. Task titles are
  Virgo Buttons, giving mouse and keyboard the same detail action. Status and priority
  Tags include text; Avatar is paired with the assignee name.
- **Form / Field:** Field registers control IDs and associates labels, descriptions
  and validation messages for Input, Textarea, Select and DatePicker. Submission focuses
  the first invalid control; no raw controls or custom label plumbing was required.
- **Drawer:** a controlled Root hosts create/edit, with Header/Body/Footer and Close.
  `onOpenAutoFocus` targets the title; `onCloseAutoFocus` restores the clicked title,
  falling back to New Task when filtering removes that row. Focus trapping and nested
  Select/DatePicker dismissal use existing behavior. Unsaved-discard confirmation is
  a task-owned Alert + Button composition inside the same Drawer.
- **Select:** labeled status, priority, project and assignee filters/editors are real
  controlled UI Selects. The app owns query/facet semantics, not a copied Select or
  DataTable implementation.
- **Date-related control:** DatePicker supplies its civil-date input, trigger,
  portalled calendar and keyboard behavior. Input editing and calendar day selection
  update the same due date; first Escape closes the calendar without closing the editor.
  No third-party date picker or local substitute was needed.
- **Feedback:** Toast reports create/save/status changes. Creating outside the active
  filters preserves them and offers an explicit Show all tasks action. A selected task
  that becomes excluded stays open, with a Virgo Alert explaining that it is saved.
  The editor also announces its unsaved/saved state.
- Existing light/dark tokens propagate to Drawer and the calendar portal.

## Product data and local composition

- `src/data/tasks.ts`: domain types, draft validation, reducer, AND filters, due-date
  calculations and state progression. `tasks.seed.ts`: 16 deterministic tasks, stable
  IDs/copy/ownership and four projects; reuses the existing four-member fixture.
- Reference date: **2026-10-02**. Due soon includes unfinished tasks from this date
  through October 9; overdue and unscheduled tasks are excluded. Initial summary:
  **16 total / 4 in progress / 10 due soon / 3 completed**. New IDs start at VD-139;
  newly created records receive the real creation timestamp.
- React `useReducer` at the App boundary preserves task edits across SPA navigation;
  reloading restores the fixture. Filters and draft state are local to Tasks. There is
  no server, database or persistence layer.
- Summary composition, filter semantics, task editor, unsaved confirmation, feedback
  copy, workflow buttons and responsive grids belong to this product. Quick advancement
  is disabled while a draft is dirty; save/discard handles the draft before advancement.
  Saved mutations immediately update Table, summary, current filters and selected detail.

## Validation

- App-scoped **typecheck / lint / build pass**; formatting and diff whitespace pass.
- **20 domain tests pass:** combined filters and reset, creation/IDs/normalization,
  all-field edit and identity preservation, the full status chain and reversal,
  summary synchronization, validation, leap days, due boundaries and fixture integrity.
- Browser flows pass: all five filters, filtered-empty recovery, form error association
  and first-error focus, create, seven-field edit, Todo → In Progress → In Review → Done,
  summary/list/detail synchronization, active-filter exclusion, explicit recovery,
  unsaved keep/discard, keyboard title activation, focus trapping/restoration/fallback,
  nested Select/calendar Escape, calendar day selection and in-app state retention.
  Invalid edits are rejected; reload restores the deterministic fixture.
- Layout and create controls checked at **1440, 1280, 1024, 768 and 390 px**; no document
  or main-content horizontal overflow. The table scrolls inside its own Viewport.
  Short 1280 × 720 editor placement and light/dark portal rendering were checked.
  Desktop, tablet and narrow screenshots were visually inspected. No runtime console
  errors on the fresh verification server.

This phase stops at Tasks. Projects, Analytics, Data, Forms, Settings and the other
five Pro implementations remain outside its scope.

# Table density follow-up

The user explicitly authorized fixing this issue in `@virgo-design/ui` and updating
its Website documentation.

## Composition friction / resolved in UI

- The earlier Table exposed a size-based padding shorthand but no complete header/row
  geometry contract. Pro also overrode cell inline padding and cleared the first/last
  edges. This left the two task tables visibly cramped. All Pro th/td padding overrides
  and extra task-identity block padding are removed.
- Table now exposes `density="compact" | "default" | "comfortable"`, with
  `data-density`. The density controls header/body cell padding and minimum header/body
  row heights. Native rows grow for wrapped content. Legacy `size` maps to density;
  explicit density takes precedence.
- Public metrics: `--table-cell-padding-inline`, `--table-cell-padding-block`,
  `--table-header-height`, `--table-row-height`, `--table-cell-vertical-align`.
  The existing `--table-padding` override remains supported. Density selectors use
  `:where` so a consumer class can override metrics without additional specificity.
- Compact: 12 px inline / 8 px block, 36 px header / 40 px minimum body row.
  Default: 16 / 12 px, 44 / 48 px. Comfortable: 20 / 16 px, 52 / 56 px.
- Workplace Recent Tasks uses compact; Tasks uses default. Padding at both outer cell
  edges is supplied by the component. No new Pro geometry workaround was added.
- The existing Website density example compares all three values on identical data and
  lists the styling variables. English/Chinese copy and generated API references are
  updated. No third-party dependency or primitive implementation change was needed.

## Validation

- UI, Website and Pro typecheck/build pass; changed-source lint passes.
- Table UI/primitive tests: 12 pass. Website example/translation tests: 17 pass.
  Generated API checks pass.
- Browser inspection confirms shared th/td padding for all three densities, complete
  first/last cell insets in both Pro tables, and centered vertical alignment. The
  comparison clearly distinguishes density while preserving native table semantics.
- Existing Pro JS chunk-size advisory remains unrelated to this geometry fix.

# Table hierarchy, pagination and shell width

## Styling limitation / resolved in UI

- Header and hover previously shared an 8% neutral fill. Table now supplies separate
  opaque, theme-aware body/header/footer/striped/hover/selected layers. Header uses a
  restrained 5% neutral step; hover uses a 3% brand tint. Header foreground and weight
  are also public variables. Sticky headers share the same header layer.
- Removed Pro header color/weight/font-size overrides and its focus-row fill override.
  UI owns the hierarchy and keyboard focus treatment; Pro supplies no cell padding.
- Color surfaces: `--table-body-background`, `--table-header-background`,
  `--table-header-foreground`, `--table-header-font-weight`, `--table-footer-background`,
  `--table-row-striped-background`, `--table-row-hover-background`,
  `--table-row-selected-background`, `--table-row-selected-hover-background`.

## No issue / solved by existing API

- Existing Pagination supplies page controls, size selection and controlled callbacks.
  Tasks filters all records before pagination; 16 records produce pages of 10 and 6.
  Filters/size changes reset the page, mutations clamp obsolete pages, and a visible
  created task opens page one. Editing on page two keeps that page and updates its row.
- Layout.Content and its primitive already fill the available width. The actual gutter
  cause was Pro Shell's 1800 px cap and centering. Removed that global Shell constraint.
  At 2560 px, content now fills all 2336 px after the expanded sidebar, with 32 px insets;
  a collapsed sidebar releases 2496 px. No Layout or Table width workaround is needed.
- The meaningless sidebar status message and its dot were removed.

# Workplace card controls and motion

## Missing API / resolved in primitives and UI

- Collapsible.Content previously hid immediately on close. Primitive `keepMounted`
  retains rendered content for animation while closed content is inert and aria-hidden.
  Explicit region labels/headings now work independently of the action label.
- UI `Collapsible.Content motion="collapse"` transitions intrinsic content height and
  opacity in both directions. The default `motion="none"` preserves earlier behavior.
  Public variables control padding, duration and easing. Reduced motion disables transitions.
  The Website disclosure example, bilingual descriptions and generated API docs are updated.

## Missing Component / icon resolved

- Existing MinusIcon and CloseIcon cover minimize/remove; there was no window-shaped
  restore icon. Added MaximizeIcon through the icons SVG/metadata/generation pipeline,
  including registry/export/assets and Website Chinese search keywords.

## No issue / solved by existing API and product composition

- The three Workplace widgets compose Card, Collapsible, Button and Tooltip. Minimize
  preserves only the heading/action row; the action becomes a square restore icon.
  Removal contracts/fades the card and its spacing before unmounting. Focus moves to a
  surviving widget control, or Export snapshot after the last removal.
- Tooltip uses existing `size="small"` and `arrow={false}`. SegmentedControl uses its
  existing `motion="slide"`; selecting 7/14 days still changes the actual chart data.
- Widget visibility, header/action layout and the dashboard's column transition are
  product composition. When all widgets are removed, the secondary column and gap
  transition to zero so the main section continuously expands to the full width.
- No motion library, additional dependency, generic Pro UI system or other Pro app was added.

## Validation

- Browser checks cover both appearances, all three minimize/restore/remove actions,
  small arrowless tooltips, keyboard controls, closed-content inertness, focus transfer,
  DOM cleanup, reduced motion, and 7/14-day data switching. Frame sampling confirms
  intermediate heights and widths, including the final 844 → 1152 px main-area expansion.
- Shell width checked at 2560, 1920, 1440, 1280, 768 and 390 px on both implemented pages;
  content fills the available width without document/main horizontal overflow.
- Tasks pagination checked with page/size/filter changes, second-page edit, first-page
  creation visibility, totals/ranges and narrow viewports. Domain tests now total 23.

## Carousel: image highlights and complete workspaces

### Missing Component — resolved in Virgo

There was no content-agnostic Carousel in Virgo. The Website Color Studio had a private two-page wheel handler and animated track, while Pro needed image slides. Added the shared headless Carousel and its Virgo UI composition, with `count`, controlled `index` / `onIndexChange`, `loop`, `autoPlay`, `interval`, `draggable`, `wheel`, `layout`, `motion`, `arrows`, `stackBelow`, and indicator `placement`. Content remains arbitrary children.

- Pro composes five local, credited Pexels landscape photographs inside the Quick access widget. Its carousel loops every six seconds, supports pointer dragging and hover/focus circular arrows, and provides a single segmented indicator bar inside the photograph. Hover/focus pauses playback; Pro intentionally omits visible playback buttons. It remains part of the existing three removable widgets.
- Color Studio consumes the same Carousel for its two complete editing pages, with wheel navigation and responsive stacking below 900px. Removed its private `useFoundationPager` hook and track transition implementation. The separate continuous color-family strip remains unchanged.
- Inactive slides stay mounted to preserve edits but are inert and hidden from assistive technology. Embedded controls retain their keyboard interaction. Autoplay pauses during hover, focus, dragging, hidden documents and reduced motion.
- Public styling includes `data-slot`, `data-index`, `data-layout`, `data-motion`, `data-arrows`, `data-playing`, `--carousel-duration`, `--carousel-easing`, `--carousel-control-background`, `--carousel-control-background-hover`, `--carousel-control-border`, `--carousel-control-foreground`, `--carousel-indicator-color`, `--carousel-indicator-background`, `--carousel-indicator-width`, and `--carousel-stack-gap`.
- Added bilingual component/primitive documentation, executable examples and API descriptions. No new dependencies.

### No issue / solved by existing API

Carousel arrows and playback use Virgo Button plus existing ChevronLeft, ChevronRight, Play and Pause icons. Pro's photographs, sizing, placement and deterministic image data are product composition; no generic carousel is implemented in Pro. Photographs live in `src/assets` and use Vite asset imports.

Photo arrows retain circular outline geometry, with consumer-provided translucent dark backgrounds and white borders/icons through public Carousel variables for contrast over both bright ice and dark night scenes.

## Tasks editor — solved by existing Dialog API

Task creation, details and editing now use the existing centered Virgo Dialog with Header, Body, Footer, Close, and portal/overlay behavior. Validation, unsaved-change confirmation, status transitions and focus restoration remain intact. No shared component/API gap was found.

The New Task action now sits in a list toolbar between filters and the table; placement, responsive form columns and compact dialog spacing are local product composition through SCSS Modules and public Dialog variables.

Validated centered light/dark dialogs at 1440×1000, 1280×720 and 390×844, required-field focus, nested Select/DatePicker, unsaved close/Escape handling, cancel/outside dismissal, opener focus restoration and page-two edit/create pagination. Pro typecheck, lint, build, formatting and 23 domain tests pass. The build retains its existing advisory for the JavaScript chunk exceeding 500 kB.

## Table visual refinement — Styling limitation resolved in Virgo

Native `th` elements retained the browser's 700 font weight despite Table.Header declaring 500. Apply `--table-header-font-weight` directly to heading cells. Header color now uses primary text over a quieter 3% neutral layer, with 6px logical top corner radii. Separate, zero-spaced borders allow rounded heading cells; `border="all"` retains collapsed single-line grids. Density and public cell geometry remain unchanged.

Added `--table-header-radius` and `--table-separator-color` alongside the existing header color/weight variables, documented in the Website example. No Pro cell styling workaround or dependency was added.

## Task list toolbar and footer — local product composition

Removed the full-panel filter/footer dividers and the redundant fixed-date footer note. The list toolbar now uses Virgo Button with the existing DownloadIcon instead of the session note. Download exports all current matching tasks, independently of pagination, as UTF-8 CSV with readable assignee names, correctly quoted multiline fields and formula-like text preserved as text. Empty matches disable export. No shared component/API gap or dependency was needed.

The shared app footer now contains only the centered Virgo Design Pro title. Verified both implemented pages at desktop and mobile widths. Final checks: workspace typecheck/lint, UI/Website/Pro builds, 254 relevant shared/documentation tests and 26 Pro domain/export tests passed; browser checks cover both appearances, density, corner geometry, CSS overrides, fully bordered treatment, pagination, actual all-results/filtered CSV downloads and responsive footer alignment.

## Sidebar hierarchy — solved by existing NavigationMenu and Layout APIs

Replaced static group labels and flat icon links with six icon-bearing disclosure categories and text-only page links. Existing NavigationMenu.Item / Trigger / Content support inline expansion; `submenu="popover"` provides compact-mode submenus. Route changes, page search and browser history reveal the destination category while preserving manual expansion choices. Settings was removed from the navigation model, search and generated placeholder routes at the user's request.

Layout.Sidebar's public `collapsedWidth`, controlled collapse state, `trigger` slot and SidebarTrigger place a fixed 28px square toggle in the bottom control area. Existing Tooltip supports small, arrowless, right-side hints for both Expand sidebar and Collapse sidebar. The compact rail is 48px; public sidebar data slots align the first navigation row's center with the breadcrumb across desktop and narrow viewports. Active children retain their Virgo highlight on hover and inside portalled submenus.

No component or API gap was found; all new behavior is local product composition through existing components and SCSS Modules. No packages, dependencies or other Pro apps were changed for this sidebar work. Pro typecheck, lint and build pass; 35 shared navigation tests pass. Browser validation covers hierarchy, icons, disclosure keyboard controls, routing/history/search, compact hover/click/Escape, mobile submenu fit, both tooltip states and theme appearances, 48px/28px geometry, bottom anchoring and breadcrumb alignment (less than 1px difference).

## Sidebar submenu pointer — NavigationMenu API gap resolved

NavigationMenu.Content now exposes an opt-in `arrow` boolean (default false, ignored for inline submenus). It uses the shared Popover positioning and panel arrow geometry, clipped to the outward half so the pointer cannot cover a menu row or cut into its selection background. Pro enables it only for compact sidebar popovers; the Website example and bilingual API documentation demonstrate the same public API.

Added canonical WidgetsIcon to the icons package: three outlined squares and a slightly offset upper-right square rotated 45 degrees. The generated component, registry, metadata, SVG assets and Website search all include it.

UI/Website/Pro builds, icons/UI/Website/Pro typechecks, relevant lint, formatting and generator consistency checks pass. All 45 navigation/Popover tests pass, including arrow opt-in, inline behavior and content refs/native props; icon and Website documentation/translation tests pass. Browser checks confirm the external triangle, shared light/dark surface colors, hover entry, route dismissal and actual WidgetsIcon catalogue preview.

## Sorting and carousel visibility — shared APIs completed

Table.SortButton supports controlled/uncontrolled none → ascending → descending → none cycling and native keyboard, disabled, ref and cancellation behavior. Table.Head exposes sortDirection / onSortChange, composes the shared button and declares aria-sort. UI consumes the shared SortIcon and adds a small arrowless tooltip describing the next action; shared control labels support Website localization. Website includes an executable sorting example and bilingual API descriptions.

Pro exposes sorting only for estimated hours, creation time and due date. It sorts all matching tasks before pagination, resets to page one when sorting changes, compares hours numerically and creation timestamps chronologically, preserves equal-value order and leaves undated tasks last in either direction. Cancelling restores the original task order; CSV follows the current matching order.

Carousel's existing arrows API now defaults to none, removing arrow controls from the DOM. Pro explicitly retains hover arrows; Color Studio uses the hidden default while keeping swipe/wheel navigation and indicators. No dependency was added.

Validated three-state clicks, keyboard activation, global date ordering across pages, filtering, cancellation, light/dark triangle colors and actual 8×5px geometry, Website sorting, Color Studio default visibility, and Pro hover arrows. Relevant shared/docs tests (378), API translation/generation tests (6) and Pro domain tests (30) pass, alongside typecheck, lint and builds. Pro retains its existing bundle-size advisory.

## Shared sorting icon and focused task columns

Added canonical `sort.svg` and generated public `SortIcon` / `SortIconProps` to the Icons package, including the manifest, registry, SVG assets and Website search. `direction` supports none/ascending/descending, with a darker inactive upper triangle and lighter lower triangle; `activeColor` sets the active full-opacity triangle. Table.SortButton now renders this shared icon; private CSS triangles were removed.

Pro adds Created at and Estimate (h), with numeric estimates on all 16 fixture tasks (1–24 hours). Only the two time columns and estimate column offer sorting. Whole-hour estimates (0–999, 0 means unestimated) can be edited and downloaded alongside creation timestamps. Existing in-memory demo records missing the new field are backfilled by task ID without losing edits or replacing explicit zero estimates.

Validated the numeric three-state cycle before pagination, creation timestamp ordering, populated values on both pages, edited estimate persistence, actual CSV download and light/dark shared SVG rendering. Icons/Table/Website icon tests (378) and Pro domain tests (39) pass. Generator consistency, typecheck, targeted lint, formatting and Icons/UI/Website/Pro builds pass.

# Breadth pass — five product pages (October 3, 2026)

## Scope and product continuity

Replaced exactly the five requested placeholders. All five remain under the existing
App Shell, navigation, appearance switch and Classic-Cyber tokens. App-local
PageHeading, Panel, MetricStrip, FilterSelect and Person compositions reuse the
Workplace/Tasks heading scale, mono context labels, compact controls, 8/12px Surface
frames, section rules and 20px spacing. Workplace and Tasks were not refined again;
no public packages, dependencies, generated API files or other Pro apps were changed.

| Route                  | Product behavior                                                                                                                                                                                                                                                                          |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/dashboard/analytics` | Delivery KPIs, 7/14-day range, planned/delivered trend, focusable daily inspection, exact-value table, period CSV export, task-status distribution, project workload, ownership estimates and attention signals.                                                                          |
| `/work/projects`       | Four project records with lead, health, dates, live task counts, estimated effort and completion. Search, lead/health filters, empty recovery, related-work disclosure and identified detail links.                                                                                       |
| `/data/search-table`   | Applied queries combining search, project, status, priority, assignee, inclusive UTC creation dates, due condition and minimum estimate. Sort before pagination, column descriptions and visibility, page size, selection across pages, selected/matching CSV export and bulk completion. |
| `/data/list`           | Task briefs expressed with native list/article composition, Virgo tags, people and controls. List/card layouts, open/review/done/all views, search, project/owner filters, ordering, pagination, review queue and task editing. No Table is used for this page's data presentation.       |
| `/data/detail`         | Identified project record with objective, acceptance focus, status, metadata, lead/team, live progress, editable linked tasks, milestone Timeline, recorded team activity and related project links. Supports project switching and missing-record recovery.                              |

## Shared mock domain and data semantics

- The four projects are the existing Tasks focus areas: Workspace, Design system,
  Onboarding and Discovery. Leads use existing Workplace members. Project briefs,
  milestones and dates add context to those same focus areas, including the existing
  October 6 release checkpoint.
- App's existing tasksReducer remains the only editable task register. All new pages
  receive that state; Search Table, Data List and Detail reuse the existing TaskDialog
  and dispatch. Editing or completing tasks updates counts, project progress,
  estimates, ownership and current-register analytics immediately across navigation.
  Moving a task moves its project association and effort as well.
- Project completion is completed tasks / linked tasks, with a defined 0% for an empty
  project. Project health is a frozen lead assessment, explicitly distinguished from
  computed completion. Current due/overdue conditions use the existing reference date
  `2026-10-02`, independent of the device clock.
- Analytics' historical delivery uses the **same** trendPoints as Workplace, ending
  October 1. Period KPIs and exported rows change together. Momentum compares equal
  numbers of days in the first and last halves; the middle day of a seven-day period
  is excluded. The historical team totals are distinct from the smaller 16-task
  editable register. Their scope and dates are labeled in the relevant sections.
- Recorded project activity is filtered from Workplace's October 1 activity; it is
  labeled historical and does not imply a persisted audit log of subsequent edits.
  Mock changes retain the existing in-memory session behavior and reset on reload.

## Missing Component — Chart demand becomes concrete

The public UI entry still has no Chart family. Analytics now demonstrates repeated
requirements beyond the original Workplace pulse:

- a shared time-series composition with axes, grid, planned/actual legends, area/line
  treatments and a common domain for both series;
- categorical status distribution with exact counts and zero-data handling;
- coherent range selection, aggregated KPI calculations and period-specific exports;
- point inspection available by focus as well as pointer, accessible titles/summaries,
  exact-value data presentation, responsive axis labels and local overflow handling;
- theme-aware series colors from the existing data categorical tokens.

These remain page-owned SVG/data compositions, Progress and an exact-value Virgo
Table. On narrow screens the trend has a focusable local scrolling region so axis
labels remain readable without overflowing the page. A public Chart design should
address series/axes, inspection, responsive layout and accessible data together. This
pass adds no speculative Chart API, library or private component import.

## Public API / composition findings

- **Table header information beside sorting:** Table.Head with onSortChange places
  all children inside its SortButton. A column-description tooltip therefore needs
  manual sibling composition using the already-public Table.SortButton, while Head
  supplies sortDirection / aria-sort. This avoids nested buttons and gives information
  and sorting independent keyboard actions. Nonblocking composition friction; a future
  separate header information/action slot could simplify it, but no API was changed.
- **Data operations are consumer-owned:** Table, Checkbox, Pagination, Select, Input,
  Tag, Tooltip and Popover cover the query register's visual/semantic needs. Pro owns
  filter application, URL serialization/history, sorting, row selection, visibility
  and bulk dispatch. Selection operates only on matching records, survives pagination
  and is cleared when applied conditions change; hidden records cannot be exported or
  completed by a bulk operation. No data-grid behavior is attributed to native Table.
  This is a concrete higher-level data-controller composition demand, not a blocking
  missing low-level Table API.
- **List composition works:** native ul/li/article with public Virgo parts expresses
  structured records, readable context, metadata and actions without a Table or a
  copied private list implementation. No mandatory new List family was found.
- **Detail composition works:** Surface named regions, Timeline, Progress, Tag, Person
  (Avatar composition), Select and the existing TaskDialog cover the complete record.
  Surface remains a div; region semantics and headings supply section grouping.
- **Form validation:** applied query state is separate from the draft. Reset also
  clears an unapplied draft. Inverted/impossible dates and invalid estimates are
  rejected. URL reads validate enum, member, project, date and estimate values; defaults
  are omitted from generated query URLs. No missing validation API was found.

## Verification and retained limitation

- Pro typecheck, lint, formatting and production build pass. All **54 domain tests**
  pass (the existing 39 plus 15 breadth tests), including project/task linkage,
  mutation-derived progress/estimates, query conjunction and date boundaries, URL
  round trips and invalid values, sorting before pagination and range calculations.
- **26 browser interaction checks** pass: period KPIs/data/export; project filters,
  empty state and disclosure; detail selection/deep links/editing; progress and brief
  synchronization; list/card and status views; draft reset, combined queries/history,
  date validation, column visibility, accessible sorting, cross-page selection,
  selected export, bulk completion and analytics distribution after those changes.
  Downloaded CSVs were read back: 7 daily rows in the 7-day report and 10 full task
  rows in the selected export, in descending estimate order.
- **30 browser viewport/appearance combinations** were checked: all five pages at
  1440, 768 and 375px in light and dark. No page-level horizontal overflow, nested
  buttons or runtime errors. Table and chart overflow stays within named local
  regions; screenshots were inspected for product consistency and narrow layouts.
- The existing source-root UI CSS/bundle advisory remains. This build outputs about
  251.76 kB CSS (37.44 kB gzip) and 577.81 kB JavaScript (163.68 kB gzip); Vite reports
  the existing >500 kB chunk advisory. Packaging/route splitting was not expanded into
  this breadth pass.

The pass stops at these five pages. Form, Result and Profile destinations remain for
later work.

# Remaining-page breadth pass (October 3, 2026)

The user's subsequent instruction expands the earlier five-page stopping point to
all remaining destinations. Basic Form, Step Form, Success, Error and Profile now
replace the final five placeholders. The obsolete placeholder component is removed;
unknown URLs retain a dedicated NotFoundPage recovery route. Workplace and Tasks
remain the existing benchmark pages.

## Distinct jobs and public component coverage

| Destination       | Product job                                                          | Capability demonstrated                                                                                                                                                                                                                                                                                                    |
| ----------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/form/basic`     | Create a work request that becomes a shared Todo task                | Full-page Form/Field sections; searchable project and person Combobox; Radio priorities; optional DatePicker; keyboard-operable Slider effort; Checkbox readiness; validation messages and first-error focus; contextual Surface sections and Alert.                                                                       |
| `/form/step`      | Prepare the October project handoff                                  | Navigable horizontal Steps with validation before advancing; DatePicker/TimePicker schedule; a multiple-selection Tree grouping actual project tasks by delivery state; group/leaf selection, select-all/clear; Radio audience; retained Textarea notes; review and confirmation.                                          |
| `/result/success` | Show a recorded task or prepared handoff, with next actions          | Token-colored green circle with a white check; actual receipt metadata, linked work, scoped CSV download, project link and vertical Steps for follow-through.                                                                                                                                                              |
| `/result/error`   | Explain a restricted external Workspace handoff and recover          | Token-colored red circle with a white cross; policy Alert, Accordion explanations, retained scope/schedule/notes, return to settings and preparation of the same scope for team access.                                                                                                                                    |
| `/profile`        | View identity, choose workspace preferences and edit a saved profile | Avatar/Badge identity; Tabs for overview/preferences/activity; Select focus project, two Switch appearances, TimePicker and Radio spacing; Drawer edit flow with dirty-draft protection; ColorPicker swatches/HEX/area/hue inside the drawer; photo preview, actual file-reading Spinner, Field errors and Toast feedback. |

A source import inventory covers **41 of the 51 public UI families**, plus Textarea
from Input. The coverage includes the existing Workplace Card/Carousel, shell
Layout/NavigationMenu/Breadcrumb/Popover and the earlier task/query/list/detail
compositions, rather than adding a repeated gallery to each route. DatePicker's
calendar composition exercises calendar behavior as well. These product routes do
not establish exhaustive coverage of every prop or variant.

Command, Menu, Dropdown, ContextMenu, Menubar, Dock, FloatingAction and Cursor are
not artificially inserted into these workflows. Skeleton would imply a remote
loading state that this synchronous register does not have; Spinner instead tracks
real asynchronous image decoding. Further family coverage belongs in a relevant
product flow or the component documentation, not an invented loading screen or
redundant navigation.

## Same product world and operational semantics

- Work requests use the existing projects, members, task validation and tasksReducer.
  Submission strips workflow-only readiness metadata and creates the next task id.
  The receipt links to that exact task; Tasks, Projects, Analytics, Data List, Search
  Table and Detail derive from the same edited register across route navigation.
- Handoff scope is derived from the selected project's current tasks. Changing the
  project clears scope and confirmation. Validation rejects stale task membership,
  impossible/past dates, invalid times and missing final confirmation. Handoff dates
  start at the October 3 mock baseline; schedule values explicitly use UTC+08:00.
- The mock Workspace external-access rule is grounded in the existing VD-126 export
  permission task. This is a local product scenario, not a call to a sharing service.
  A failed attempt retains the custom title, task ids, audience, schedule and notes.
  Recovery copies that receipt into the form; preparing for the team validates the
  current scope again and creates a new success receipt. No tasks are silently
  completed by preparing a packet.
- Direct result URLs show explicitly dated seeded records, while form submissions
  replace them with receipts for actual session operations. Linked work always shows
  current task state; historical receipt times remain unchanged.
- Profile preferences and identity share App-owned state. Saving a focus project
  changes the overview; activity spacing changes the actual Timeline gap; disabling
  digest disables its time control. Reminder/digest choices are saved preferences,
  not a claimed notification delivery service. Name/photo/color changes update the
  shell account immediately, including an accessible account name on compact screens.
- Photos are validated as PNG/JPEG/WebP up to 2 MB, read and decoded before preview,
  and kept locally in the session. Unsupported or corrupt files show errors. Revision
  guards prevent older reads from overwriting a newer choice or removed image.
  Edits can be saved, kept open or discarded; drawer closure restores trigger focus.
- Requests, handoffs, receipts and preferences retain the existing in-memory mock
  persistence model: navigation keeps them; browser reload restores seed data.

## Concrete public capability findings

- **Result family:** no Result component is exported. Both result routes repeat a
  recognizable status mark, title/description, primary/recovery actions, metadata and
  linked-record grouping. This is now a concrete reusable Result composition demand.
  Current implementation uses public Surface/Button/Steps/Alert/Accordion/Separator/
  Tag and existing Virgo icons, with page-owned status-circle layout. No speculative
  package API is added.
- **Upload family:** no Upload family is exported. Profile shows a real native file
  Input with validation, preview, remove action, reading state and asynchronous
  failure handling. A future public Upload capability should consider these states,
  accepted types/size and accessible feedback together. Native file-button wording
  follows the browser locale. No backend upload or progress percentage is simulated.
- **Tree group selection:** Tree provides multiple selection and hierarchical keyboard
  navigation. Pro owns the domain rule that selecting a group includes its task
  leaves, recomputes group state after leaf changes and stores only valid task ids.
  The existing public API supports this composition; a checked/partial group-selection
  recipe would help consumers. No unsupported cascade behavior is attributed to Tree.
- **Steps orchestration:** stage validation, draft retention, review and submission are
  consumer-owned. Public current/complete/upcoming status and Trigger composition are
  sufficient. This is a complete workflow rather than an animated progress demo.
- **ColorPicker overlay styling gap:** its Content delegates to primitive Popover but
  omits the shared UI overlay layer. In the Profile Drawer it portals to body with
  `z-index: auto`, behind Drawer/Overlay at 100. A DOM-visible popup and programmatic
  input update alone did not expose the problem; screenshot inspection and pointer
  hit testing did. Pro sets a local `z-index: 101` via the public Content className.
  The public family should apply the same overlay surface/layer contract as Popover.
  No private import or package patch is used. After the workaround, pointer interaction,
  HEX commit on Enter/blur, and Escape closing only the picker are verified.
- **Tabs responsive composition:** line indicators assume a single tab row. Profile
  uses a concise Activity label and smaller tab spacing on narrow screens, preserving
  a single row and correct selected indication rather than wrapping the indicator.
- **Chart demand remains open:** the previous Analytics finding is unchanged. Real
  historical and current-register analysis still uses the permitted SVG compositions.

## Verification

- **68 domain tests pass**, including 14 new request/handoff/profile tests: metadata
  stripping, shared-register creation, stage/date/time validation, stale project scope,
  branch and leaf selection, external restriction/team recovery, retained custom title,
  immutable receipt scope, profile validation, initials/contrast and file constraints.
- **24 end-to-end browser assertions pass** across request creation/actual scoped
  export/shared register, step validation and keyboard branch selection, retained draft,
  external error and recovery, saved preferences, disabled digest time, compact Timeline,
  profile validation, nested color picker, image preview, shell synchronization, dirty
  close/discard and route persistence. Calendar opening, select-all/clear and unsupported/
  corrupt photo feedback are additionally exercised in that flow. The downloaded CSV
  was read back: VD-139, Todo, High, Workspace, Ava Chen and 9 estimated hours.
- **10 additional focused checks pass** for nested picker visibility, HEX commit,
  saved shell color, Escape closure, restored editor-trigger focus, single-row tabs,
  320px layout, named photo account on compact screens, handoff metadata and unknown-URL
  recovery. Long names were also checked at all three widths without shell overflow.
  After the ColorPicker layer workaround, popup hit testing and real pointer interaction
  with HEX/hue controls pass at 1440px light and 375px dark; screenshots show the panel
  above the Drawer.
- The five new routes were checked at **1440/768/375px in light and dark** (30 route/
  viewport/theme combinations), plus narrow scope/review/preference states and drawer/
  picker screenshots. No document/main horizontal overflow, duplicate h1, unnamed
  visible button or application runtime error was found. Screenshots were inspected;
  Profile tab spacing was corrected from that inspection.
- Pro typecheck, lint, formatting and production build pass. Final build size is about
  264.08 kB CSS (39.52 kB gzip), 624.00 kB JS (175.52 kB gzip); the existing Vite
  > 500 kB chunk advisory remains. Route splitting/packaging is outside this page pass.

The remaining-page pass stops here. The later approved navigation-icon work is
recorded below.

# Approved A navigation icons (October 3, 2026)

The user approved A and reiterated the existing restrained cyber flavor. Added
BriefcaseIcon, DatabaseIcon and FormIcon to the public icons package, replacing
LayersIcon / LayoutIcon / TypeIcon for the Work / Data / Form navigation groups.
Breadcrumbs use the same group icons automatically; the original foundation icons
retain their geometry and exports.

Canonical SVGs use 24x24 coordinates, currentColor fills, open interiors and the
existing visual weight. Briefcase uses a clipped handle, chamfered body and central
latch. Database retains familiar curved cylinder ends with three compact tiers.
Form uses a chamfered sheet and two label/input pairs. No glow, color or decoration
is embedded in the geometry.

Metadata, static React exports, canonical SVG strings and the opt-in registry are
regenerated from those sources. The existing catalogue consumes their metadata
without a page-specific icon implementation; its required Chinese keyword map now
includes 公文包 / 数据库 / 表单 and related terms. Canonical source/public rendering is
checked at 16, 20 and 24px, with real-size previews on light and dark backgrounds.

Verification: 377 icon/generator/Website-icon tests pass, including Chinese discovery
for the new symbols. Icon and Pro typecheck, Website typecheck, scoped lint, generated
source checks and formatting pass; icon package and Pro production builds pass.
Browser checks confirm canonical public geometry in navigation and breadcrumbs at
1440px and 375px, in light and dark. Real-size previews at 16/20/24px were inspected
alongside the existing Dashboard/Result/Profile references. Pro keeps its existing
chunk-size advisory (624.78 kB JS, 175.79 kB gzip after this icon change).

# Shell account and page heading cleanup (October 3, 2026)

The header account previously combined a 28px Avatar with a 28px default trigger;
its chevron sat inside the label, so the intended direct-child icon size rule did
not apply. Recompose with the public Popover.Trigger render adapter and Button
trailingIcon slot: 36px trigger, 24px Avatar, 12px chevron. Resting background is
transparent; hover/open uses restrained brand tint and border. Open-state chevron
rotation respects reduced motion. The header fallback now uses one initial (M for
Mystic), avoiding the clipped two-initial label. Profile images remain supported.
This is a consumer composition correction, with no new public API gap.

The user also requested removal of the small uppercase label above each page title.
Removed that field from the shared PageHeading API and every caller, as well as the
Workplace and Tasks heading labels. Removed their top title margins so no empty
label spacing remains. Structured metadata inside panels and dialogs retains its
existing role.

Verification: account alignment/rest/hover/open, Escape focus restoration, Enter
activation and profile navigation pass at 1440/768/375px in light and dark. All 12
routes pass desktop/narrow light/dark heading checks (48 combinations): no heading
label, no top title margin, no horizontal overflow, and an unclipped M avatar.
Screenshots were inspected. Pro typecheck, lint, formatting and production build
pass; the existing Vite chunk-size advisory remains.

The later header cleanup removes the green dot and Virgo Studio / Team workspace
identity block, its responsive styles and unused snapshot import. Search keeps its
existing alignment. Header checks pass at 1440/768/375px in light and dark with no
overflow; scoped typecheck, lint and formatting pass.

PRO remains the public Virgo Tag, now using brand intent and the soft variant with
a faint brand border. Light/dark screenshots and 1440/375px checks confirm the
palette; scoped lint and formatting pass. No Tag API gap was needed for this change.

# Contained page headings (October 3, 2026)

The approved direction leaves the breadcrumb outside the business content and
contains the title, description, count and right-side actions in one restrained
surface. All twelve formal routes now use the same local PageHeading composition:
public Virgo Surface, 8px radius, default border, no elevation, 20px padding (16px
on narrow screens), existing heading typography and responsive action wrapping.
Workplace and Tasks now share this composition with the remaining routes.

Standalone headings keep dashboard/list modules independently grouped. Analytics
joins the time-range/context row to its heading surface. Basic Form joins the
heading and both form sections in one main surface, while project context remains
in a separate aside. Step Form joins its heading, centered steps and stage form;
inner section dividers replace repeated card outlines. Detail joins the project
heading, record status and summary metrics. Success/Error join their heading and
receipt content in one surface, retaining the green check/red cross treatment and
readable content width. Narrow wizard fields use the same inset as the page heading.

This is local product composition using public Surface, Tag, Button, Form, Steps
and existing controls. Surface supports the required border/radius/theme treatment;
no new public API blocker was found. No chart-family gap or prior audit finding is
closed by this layout change.

Verification: all 12 routes pass at 1440/768/375px in light and dark (72
combinations), with one h1, enclosed headings/actions, breadcrumbs outside, no
removed heading slogans and no document/main horizontal overflow or runtime error.
Screenshots were inspected after finite theme animations settled. Basic Form date
selection, assignee selection, confirmation and request submission; Detail project
selection; and Step Form date selection, task scope, review and success navigation
pass through real pointer interactions at 1440px light and 375px dark. Pro
formatting, lint, typecheck and production build pass. Build is 265.44 kB CSS
(39.76 kB gzip), 624.96 kB JS (175.78 kB gzip); the existing chunk-size advisory
remains.

The user subsequently rejected Profile's standalone title surface. Removed that
heading and its introductory description entirely. The identity card is now the
first business content below the breadcrumb; its existing name becomes the h1
with the same visual styling. Other routes retain their current treatment pending
page-by-page feedback. Scoped lint and formatting pass.

Success and Error subsequently return to their earlier centered result surface
(1080px maximum width, 12px radius), with the standalone title/description removed
entirely. Result content starts with its status icon; the receipt title becomes the
h1 with its existing visual styling. Profile, Success and Error pass settled
1440/375px light/dark checks (12 combinations): no intro heading, one h1, no
horizontal overflow, and centered result geometry. Pro typecheck and scoped lint /
formatting pass. This supersedes the three routes' contained-heading treatment.

# Content-first pages and Workplace layout (October 3, 2026)

The user subsequently requested removal of every generic page title and introductory
description except Workplace's welcome. Removed the remaining PageHeading callers
from Tasks, Analytics, Projects, Search Table, Data List, Detail, Basic Form and Step
Form. Profile and results already omit them. Business section headings, record names,
result receipts and breadcrumbs retain their roles. Functional actions now live in
their corresponding toolbars: analytics range/export, portfolio task link, brief
register link and Detail project selector. This supersedes the contained-heading
treatment above for every route except Workplace.

Search Table now uses one public Surface for query conditions, results, the table,
pagination and feedback. Semantic sections and a subtle divider group the content;
the previous separately outlined query/results panels are removed. The task editor
remains an independent dialog. Surface's existing API supports this composition.

All 12 routes pass 1440/768/375px light/dark checks (72 combinations): only Workplace
has a generic page heading, breadcrumbs remain, relocated controls are present, no
horizontal overflow or runtime errors. Real Search Table pagination, sorting, column
visibility, combined query, empty/reset, selection, CSV export, bulk completion and
task dialog flows pass at 1440px light and 375px dark. Relocated analytics time range
and export, Detail selection, Projects task link and Data List register link also
pass pointer-driven checks at both widths.

Workplace's welcome and metrics now occupy the primary column together with Delivery
pulse and recent tasks. The aside starts level with the welcome surface. Narrow
layouts stack the aside below the main column. Workspace inspiration is an independent
WorkplaceWidget using public Card, Collapsible and Carousel, with its own disclosure,
removal state and focus handoff; removing Quick access no longer removes the carousel.
Removing all four widgets expands the entire primary column. Settled checks pass at
2339/1440/768/375px in both themes, including alignment, overflow, carousel indicators
and arrows, collapse/expand, independent removal and full-width restoration.

Quick access hover cleanup belongs to the page's list composition: its text Button
rows previously set zero horizontal padding and combined row gap with Button's
leading-icon margin. Rows now have 8px padding on all sides, zero added leading-icon
margin and a shrinkable text slot. Icons, text and arrows sit inside the hover fill
with consistent spacing. Public Button has no box shadow here; no shared Button API
change is required. This does not close any earlier public capability gap.

The user's follow-up requests visible blue hover feedback: Quick access uses
brand-subtle-hover for the row hover (brand-subtle was too faint), a 24% brand mix
for pressed fill, a 14% brand tint for the icon, and brand-link for hovered/focused
icons and arrows. Focus uses an inset outline so Collapsible's
necessary animation clipping cannot cut its lateral edges. Desktop/narrow light/dark
checks verify equal 9px icon/arrow insets (8px padding plus border), no shadow,
brand-token hover fill, keyboard focus and navigation. Screenshots were inspected.
Pro typecheck, lint, formatting and production build pass; the existing Vite
chunk-size advisory remains.

# Exception routes, status motion and Result icon (October 3, 2026)

Added /exception/403, /exception/404 and /exception/500 under one Exception navigation
group; page search and breadcrumbs use the same route registry. Each uses public
Surface, Empty and Button in a full content canvas, with a compact centered SVG,
status-specific explanation and Workplace recovery. 404/500 additionally reload
the current address on Retry. Unknown addresses reuse the 404 composition. These
are inspectable exception states in the mock app, not simulated backend recovery.
There is no standalone page title/description surface; a visually hidden h1 names
the state for assistive technology.

The three illustrations are original, repo-native SVG sources in pages/exceptions/art:
access terminal/lock, missing page/search lens, and server/warning. They share clipped
geometry, subtle circuit accents and semantic theme colors, contain no scripts,
external resources or fonts, and total 5.1 kB. Static bundled raw imports inline the
SVG so existing theme tokens can color them. No external illustration licence or
runtime request is needed. Public Empty's composition API supports the custom art;
the previously recorded reusable Result-family demand remains open.

Exception checks pass at 1440/768/375px in both themes (18 combinations): centered
art/content, one SVG, no visible intro heading or horizontal overflow, correct
document title/breadcrumb/actions. Sidebar and page-search navigation, Retry reload,
Workplace recovery and unknown-address 404 pass on desktop and narrow layouts.

The breadcrumb environment marker now uses public Badge dot intent="success" instead
of a hand-drawn span. Real Pro usage drove a public BadgeAnimation API:
animation="none" (default) or "breathe". Opt-in dot breathing changes opacity and
fades/scales a separate ring without changing layout or the attached badge's position;
counts never animate. Reduced-motion preference disables both animations and hides
the ring. Website examples compare static/breathing dots; generated API reference,
English/Chinese copy and metadata describe the capability. Unit tests cover the
default, prop changes, counts and accessible interactive hosts. This closes the
specific missing dot-motion capability rather than adding page-local animation.

The approved ReceiptIcon is a new canonical public fill-first icon: clipped top,
two record lines and a zigzag tear edge, expressing results/acknowledgements without
implying success alone. It replaces the Result navigation check icon. Status icons
inside Success/Error retain their semantic check/cross treatment. Receipt includes
metadata, generated exports/registry/assets, catalogue/detail, and English/Chinese
search; its canonical source remains packages/icons/icons/receipt.svg.

Shell divider inspection found an extra inner frame: Layout.Sidebar defaults its
Surface layer to border="subtle", while Pro separately owns the outer inline-end
divider. Pro now explicitly uses surface.border="none" so the sidebar has no top,
start or bottom frame and its end edge is drawn once. Header/end dividers use the
existing 1px border-subtle token. This is a Pro composition correction supported by
the current API, not a missing Layout capability or a global border-token change.
Browser checks inspect both the outer container and inner Surface: all four inner
borders are 0px, outer dividers are 1px with no shadows, and collapse/expand works at
1440/768/375px in both themes without overflow or runtime errors.

Badge browser checks verify actual breathing opacity/ring animation, static counts,
reduced-motion disabling and English/Chinese docs. Receipt is verified at real
16/20/24px sizes in both themes and on Result navigation. The new Badge example
brings the translated example registry to 243; the translation audit expectation
is updated accordingly.

Final repository validation passes pnpm all: icon/API generation consistency,
all workspace typechecks, ESLint, formatting, 186 test files / 1,993 tests and
production builds. The existing Pro bundle-size advisory remains unchanged.

Collapsed Pro navigation popovers now use existing NavigationMenu.Group/GroupLabel,
with a stable aria-labelledby association and a nested List for destinations. A
600-weight brand-color title, blue group icon and public decorative Separator
give the title a distinct visual level. Expanded navigation does not repeat the
label. This uses current composition APIs without adding another title prop.
All seven groups pass 1440/375px light/dark checks: label/list alignment and valid
list markup, hover, click, ArrowRight/ArrowDown/Escape, focus return, navigation and
expanded disclosure. Screenshots were inspected; Pro typecheck, scoped lint,
formatting and production build pass.

## Sidebar resize, snap and hidden-state implementation

Real Pro usage required three distinct sidebar states: expanded, collapsed icon
rail, and hidden. Public Layout now provides SidebarProvider and the controlled /
uncontrolled state/defaultState/onStateChange API. Existing collapsed consumers
remain compatible. Provider-scoped SidebarTrigger controls work outside the sidebar
with explicit toggle/expand/collapse/hide actions, stable aria-controls, and focus
recovery when hidden content leaves the keyboard order.

Layout.Sidebar adds resizeSnap (collapseAt, optional hideAt, hysteresis) and
onResizeEnd (remembered expanded width, requested state, cancellation). Expanded
min/max bounds are separate from rail/hidden widths. A pointer gesture continues
through both snap boundaries, filters unrelated pointer events, and cleans up
listeners, cursor and selection state on release, cancellation, blur or unmount.
Cancellation restores the initial state/width. Arrow keys resize in the logical
side direction, Home/End select expanded bounds, and RTL/end-side drags are covered.

Pro uses expanded bounds of 200–320px, a 48px rail, and 0px hidden width. Thresholds
are 160px/24px with 16px hysteresis. The header logo always accepts clicks: only
when fully hidden does it show hover feedback and restore the default expanded
state plus 224px width, retaining the current route. In expanded/rail states it
has no visual hover feedback and goes home without resetting the sidebar. These
logo/navigation policies belong to Pro, not the public provider. Narrow screens
use the existing overlay mode for expanded navigation, preserving content width;
outside activation and Escape return to the icon rail with focus on its toggle.

The complete bilingual resizable-sidebar example demonstrates the provider,
external trigger restoring defaults, width bounds, both snap transitions, keyboard
controls and resize-end results. Public API docs, translations and component
metadata describe all new capabilities. The generic example's external trigger
remains available in every state so consumers can inspect the reusable action API.

Browser checks cover continuous drag, min/max bounds, hysteresis, rail-to-hidden
gestures, hidden focus recovery, keyboard resizing and default restoration in
light/dark Pro and documentation. Logo checks distinguish hidden restoration from
ordinary home navigation, and verify hover is absent in expanded/rail states.

The public breathing Badge environment marker now lives in the sidebar footer.
The workspace label is centered in the remaining area before the separate
right-aligned collapse button, and is omitted in the icon rail. The footer uses
normal-flow grid columns so the button retains its height and stays visible.
At mobile widths the brand wordmark is omitted to keep the header search and
appearance/account controls from overlapping.

Footer tooltip inspection caught a Pro composition error: supplying a separate
ref on the rendered SidebarTrigger overwrote Tooltip.Trigger's anchor ref.
The consumer focus ref now attaches to Tooltip.Trigger itself, which composes
it with the positioning ref before forwarding both to SidebarTrigger. No public
Tooltip API change is needed. Mouse and keyboard tooltips for expanded/collapsed
controls pass desktop/mobile checks in light and dark themes.

Sidebar feature validation passes pnpm all: icon/API consistency, workspace
TypeScript, lint, formatting, 186 test files / 2,000 tests and production builds.
The final Pro-only tooltip ref correction also passes Pro typecheck, scoped lint,
production build and browser checks. Existing bundle-size advisories remain.

## Workspace settings drawer

A header SettingsIcon opens the public Drawer with grouped appearance, sidebar
and page-display controls. Public SegmentedControl, Slider, Switch, Separator,
Button and Tooltip provide the interactions; groups are separated by headings
and rules rather than nested cards. The drawer has a fixed header/footer and
independently scrolling body. Its width and icon/text alignment are Pro styles.

Settings control actual Shell state: light/dark/system appearance synchronized
with the header shortcut, expanded/rail/hidden sidebar, 200–320px expanded width,
drag resizing and magnetic snap, and header/breadcrumb/page-footer visibility.
The workspace Badge remains in the expanded sidebar with breathing enabled.
Disabling drag resizing disables its dependent magnetic-snap toggle
without losing the preference. Restore defaults resets all settings; the hidden
logo shortcut still restores only the 224px expanded sidebar without navigation.

Versioned browser-local preferences validate enum/boolean fields and constrain
stored widths. Removed workspace-indicator/breathing flags from older records
are discarded while the supported preferences are retained. New visibility flags
default to visible. Invalid or incompatible data falls back to defaults. Persistence
is debounced during dragging and flushed on pagehide. Storage failure keeps the
controls usable and changes the drawer's persistence description to session-only.
System appearance follows OS changes live. These preferences and persistence
belong to Pro; existing public component APIs suffice, with no new capability gap.

The former disabled-width policy has been superseded by the independent Sidebar
layout and visibility settings documented below. Width and behavior preferences
are editable in every display mode.

Validation passes Pro typecheck, lint, formatting, 8 test files / 73 tests and
production build. Browser checks cover reload and immediate-pagehide persistence,
blocked storage fallback, live system theme, header/drag synchronization, real
visibility/resizing toggles, default recovery and original logo policy. Drawer
layout, modal focus, Escape/focus return pass at 1440/768/375/320px in both themes.
Disabled Slider checks cover both modes/themes, retained width, pointer/focus
exclusion, public disabled styling and re-enabling. Screenshots were inspected;
no runtime errors were observed.

The earlier header-logo migration behavior has been removed. Header visibility
now follows the edge-settings policy documented below; no brand is relocated into
the expanded sidebar, icon rail or a floating top-left recovery slot.

## Configuration-driven Pro routing and Exception fill layout

routes.config.ts is now the source of route paths, redirects/home destination,
page keys, group/page labels, icon IDs and visibility/layout rules. App's typed
page registry keeps stateful workflow props/callbacks in Pro and generates Route
entries from the configuration. Public components remain unaware of business
routes. routing.ts compiles page > group > default display inheritance once and
uses React Router matching for ranked static/parameter/wildcard paths. Hidden
menu entries remain routable; empty groups and unresolved parameter/wildcard
links are omitted from the fixed sidebar and page search.

Navigation, current-group selection, page search, browser titles and breadcrumbs
share these descriptors. Parent and optional child icon IDs resolve through the
public icon registry; an absent child icon stays absent rather than inheriting
its parent. NavigationMenu.Item's existing icon API renders child icons in both
inline and popover menus, and Breadcrumb.Item receives a configured page icon.
Pro's Vite and TypeScript aliases include the registry/metadata subpaths.

Result and Exception disable breadcrumbs at group level. The global Settings
switch can hide permitted breadcrumbs but cannot override the route policy.
The wildcard fallback renders the 404 state with the same hidden-breadcrumb
and fill-layout policy. All current regular pages retain their breadcrumb policy.

Exception's contentLayout: fill allocates all available main height after shell
padding, optional breadcrumbs and optional footer. A Pro shell flex container
provides the sizing, while the Exception canvas keeps a natural content minimum
and centers its illustration/actions. This replaces the fixed viewport subtraction
and also reclaims space when Header/Footer are hidden. Small viewports retain
natural scrolling when needed; current tested viewport sizes have no horizontal
overflow.

Validation passes Pro typecheck, lint, formatting, 9 test files / 80 tests and
production build. Browser checks cover all 15 configured routes, redirects,
fallback, global breadcrumb settings, search/history, rail flyouts and Header
recovery. Temporary configuration probes verify child icons in expanded/rail
menus and breadcrumbs plus a generated parameter route, then restore the
unconfigured child-icon menu. Fill/centering checks cover 403/404/500 at 1440x900,
900x600, 375x800 and 320x568, plus Header/Footer recovery and light/dark screenshots.
A real request submission reaches Result and the shared Tasks queue correctly.

## Header visibility and edge settings recovery

Pro owns a controlled Drawer root independently of Layout.Header. Disabling the
Header switch hides the header and closes the drawer in the same state update.
A 36px blue Settings button replaces the header trigger at the right viewport
edge, centered on the pointer height of that switch/label click. Keyboard changes
use the switch center. CSS clamps its position to an 8px viewport inset on resize;
a persisted hidden header starts with the tab at 40px from the top after reload.
No logo moves to the sidebar/rail or floats above the content, and no obsolete
brand-recovery padding remains.

The edge gear reopens the same settings drawer, even when the sidebar is hidden.
Enabling Header or restoring defaults returns the trigger to the header. Existing
Drawer open/onOpenChange, Trigger, Portal and close-auto-focus APIs plus Button,
Switch native events and Tooltip provide the behavior. Focus returns to whichever
gear survives after modal isolation releases. The visible-header logo retains
its home-navigation and hidden-sidebar recovery policy. This interaction belongs
to the Pro shell; no new public Components or Layout API is needed.

Validation: Pro typecheck, lint, formatting, 9 test files / 80 tests and production
build pass. Browser checks cover switch/label pointer alignment, keyboard center
fallback, drawer close/reopen and focus return, both regions hidden, reload
recovery, smaller-viewport clamping, light/dark, mobile rail, 36px tab geometry,
visible-header logo behavior and Exception content reclaiming header height.

## Independent sidebar settings, submenu headers and setting tooltips

Settings sections now read Appearance, Display, Sidebar. Display contains the
Header, Sidebar, Breadcrumb and Page footer visibility switches. Sidebar has only
Expanded and Icon rail choices. A persisted sidebarMode remembers that layout
while sidebarState is hidden; old v1 preferences migrate without changing their
visibility, and visible states remain the authority for the remembered mode.
Selecting a mode while hidden keeps navigation hidden. Revealing it restores the
chosen mode. Expanded width, drag-to-resize and magnetic snap stay configurable
in all modes; the width applies when expanded. Snap can also be preconfigured
while drag-to-resize is off.

Appearance and Sidebar use SegmentedControl's existing motion="slide" API. The
shared reduced-motion selector now matches the slide selector's specificity, so
an OS reduced-motion preference actually overrides the indicator duration.
No new public motion API or animation dependency is needed.

Submenu header is a default-on Pro preference (showSubmenuHeader). It removes the
icon/name and adjacent decorative divider together from all icon-rail flyouts.
NavigationMenu.GroupLabel and Separator remain ordinary composed children.
The title-less Group receives aria-label instead of a missing aria-labelledby;
destinations and their configured icons continue to come from routes.config.ts.
Presentation preferences live in src/components/global-settings/settings.ts rather than the business routes.

The shell controls its Settings Tooltip alongside the Drawer: opening/closing the
drawer dismisses the hint; restoring focus or removing the overlay under a parked
pointer cannot reopen it. A fresh mouse movement over the trigger or fresh keyboard
focus can show the hint again. The same rule applies to the edge recovery gear.
Existing controlled Tooltip and Drawer APIs suffice; accessible focus return stays
intact.

Validation: Pro typecheck, lint, formatting, 9 files / 81 tests and production
build, plus 13 existing SegmentedControl tests. Browser checks cover hidden/rail
configuration, persistence and reveal, all drawer dismissal paths, fresh mouse
and keyboard tooltips, both moving indicators and reduced motion, mobile dark
settings and submenu header removal/restoration across all seven menu groups.

## Optional fixed-label sidebar style

Fixed group labels toggles the Pro sidebarStyle preference between collapsible
and labels. Expanded navigation composes NavigationMenu.Group, GroupLabel and
List so every destination appears under a static first-level label. All seven
configured group icons remain beside those labels; only the disclosure behavior
and chevrons change. Child links retain their original indentation, optional
configured icons, current-route treatment and routing. Switching back retains
the destination group's disclosure state.

The icon rail continues to use its original group triggers and flyouts, with the
independent Submenu header preference. A hidden sidebar can still preconfigure
its style; preferences persist and older settings keep the collapsible default.
This is Pro composition of existing components, with no new public API.

Browser checks cover all seven labels and icons, all 15 destinations, navigation,
reload, restoration of the collapsible menu, icon-rail independence, both themes
and scroll/navigation in the mobile overlay. Pro typecheck, lint, 81 tests and
build remain passing.

## Shared navigation states and identical group geometry

Selected leaf styling previously lived only under .subnavigation, so fixed-label
lists fell back to the public default selected fill. Pro now scopes one shared
leaf selection rule to .navigation and .subnavigation, including rail portals.
Ordinary hover, pressed and keyboard-focus treatment remains shared through the
public NavigationMenu controls. Current-group labels and their original icons
also use the same brand foreground.

Both collapsible and fixed group headings now use the same primary foreground,
13px inherited Inter font, 600 weight, 36px row, inline padding, 16px icon and 8px
icon gap. Fixed groups reuse the standard 4px submenu gap and remove the extra
bottom padding; no alternate font size or label-height offset remains. The sole
mode difference is disclosure: collapsible groups show chevrons and can close,
while fixed groups remain open without a chevron. Fixed labels retain the same
hover fill and corner geometry as their collapsible counterparts.

Browser comparison measures all seven headings (including font weight and icon
rects) and all 15 child links and confirms equal positions, padding, typography,
foregrounds and fills when the collapsible groups are open. Light/dark comparison
also checks normal, selected, hover, pressed and keyboard focus states, including
current-group foreground and icon color. This fixes a Pro composition/style-scope
issue; no component API or business route configuration changes are needed.

## Editable width, system icon and docked settings motion

Expanded width now uses the public mini Input with suffix="px" in an 80 by 24px
frame. Valid widths update the slider immediately; partial typing remains intact,
Enter/blur clamps integer entries to 200–320px, empty/invalid input restores the
current width, and Escape cancels a draft without closing Settings. Slider changes,
rail/hidden configuration, reload persistence and Restore defaults stay in sync.
The unit and bounds are included in the accessible description.

Input already exposes ReactNode prefix/suffix. Its adornment styling now measures
text naturally instead of constraining RMB or other units to an icon-sized box;
SVG and action sizes remain unchanged. Website examples show icons, ¥/RMB, disabled
currency input and a compact px field, with English/Chinese documentation.

The new canonical MonitorIcon is registered in the public icon package and
searchable catalogue, and appears at 16px beside Sun/Moon for System appearance.
The docked 36px Settings button uses a 28px gear with animated="always"; the
existing native SVG animation API honors reduced motion. Header gear sizing and
playback remain unchanged.

Browser checks cover input editing, clamp/cancel, slider synchronization, hidden
and rail states, persistence, reset, light/dark and mobile layouts; currency text
width, disabled examples and unchanged 20px input icons; System icon size; final
28px docked gear, animation movement and reduced motion. Pro tests: 9 files / 81
passed. Icon/API generation checks, workspace typecheck, lint, formatting and
production builds pass. The first full run hit an asynchronous Surface-route
assertion timeout; the documentation file passed all 105 tests in isolation and
the full rerun with four workers passed 188 files / 2018 tests.

## Header information and Settings close tooltips

Display uses the shorter Footer label. The header notification button composes Tooltip
with its existing Popover trigger. Opening/closing the notification panel clears
the hint; focus restoration and an unmoved pointer cannot bring it back until a
fresh hover movement or keyboard focus. Settings' existing Drawer.Close also
uses Tooltip, with Close settings placed on the left to fit the viewport edge.
Both changes use existing render/ref composition APIs.

BellIcon is a new canonical 24-unit, static notification symbol with a rounded
open dome, clipped rim and separate clapper. Public exports, generated assets,
registry, metadata, documentation and bilingual catalogue search are updated.
The header renders it at 16px and composes the existing Badge dot with danger
intent; its 8px dot remains visible, as requested, without depending on a count.
The Tooltip and accessible button label read Notifications.

A tooltip opened during Drawer entrance could retain an off-viewport anchor
position because a translated ancestor does not trigger ResizeObserver. Floating
positioning now updates after ancestor animationend/transitionend and removes
the listeners on close; unrelated motion does not reposition it. Two regression
cases cover both event types, alongside the existing lifecycle checks (4 passed).
Browser checks confirm notification hover/focus, click/Escape/backdrop cleanup,
focus restoration, fresh re-entry and Settings close hover/focus/click/backdrop
cleanup without lingering settings hints.

Bell also supports the existing opt-in animated contract: true, positive integer
counts or always. Its dome and clapper ring together around the top hinge, then
return upright; metadata, React generation, native SVG export and the catalogue
playback example all advertise the capability. Pro deliberately omits animated
and keeps its permanent Badge dot. English/Chinese animation descriptions are
provided. Icon and catalogue tests pass (10 files / 343 tests).

Browser playback checks confirm both bell paths move, once/3/always repetition
counts, reduced-motion fallback and static mode restoration. The Pro button
remains static with its dot on. The notification dot measures 8px at the upper
right of the 16px bell; dark theme and narrow-screen interaction also pass.

Sidebar settings order is layout, expanded width, drag to resize, magnetic snap,
fixed group labels, submenu header. Width controls stay together before menu
presentation controls. Browser checks confirm the label order and unchanged
width when toggling fixed labels.

Final validation passes: generated icon/API checks, workspace typecheck, lint,
formatting, all 188 test files / 2026 tests, and all production builds. Pro's
separate suite also passes 9 files / 81 tests.

## Width controls follow the chosen sidebar layout

Settings switches its input label, slider value, limits and accessible description
between Expanded width (200–320px, default 224) and Rail width (48–80px, default
52), according to sidebarMode. Both remain editable while navigation is hidden.
The widths use independent sidebarWidth and sidebarRailWidth preferences; mode
changes preserve each value, including reload and hidden layout selection.
Old stored preferences initialize the rail to 52px, rather than reusing expanded
width. Both stored values validate numeric types, round and clamp independently.
Ranges and defaults are defined together in src/components/global-settings/settings.ts.

The Pro shell passes sidebarRailWidth to the existing public Layout.Sidebar
collapsedWidth prop. No new component API is needed. Magnetic collapse, reveal
and rail flyouts use the configured width; Restore defaults resets both widths.
The compact px input keeps partial entry, commit clamping and Escape cancellation
for either range, and its draft resets when switching modes.

Validation: Pro typecheck, lint, formatting, 9 files / 83 tests and production
build pass. Browser checks cover live expanded/rail sizes, numeric entry and
slider synchronization, bounds, independent values, hidden configuration, reload,
reveal, magnetic collapse, custom-width flyouts, light/dark and mobile layouts,
and restoration of both defaults without browser errors.

## Rail icons scale above 64px without moving their anchors

Rail widths of 48–64px use 16px icons; widths above 64px use 20px icons for
the seven navigation groups and the footer expand button. Pro derives the
size from sidebarRailWidth, with no extra preference or public component API.
Only SVG artwork grows inside the existing centered 16px navigation slots.
Navigation rows remain 36px high and the footer button remains 28px square.
Expanded navigation and portal flyout icons retain their original size.

Validation: Pro typecheck, lint, formatting, 9 files / 83 tests and production
build pass. All 35 browser checks pass at 48, 64, 65, 72 and 80px. Measurements
confirm identical row and slot geometry before/after artwork enlargement at
each larger width, unchanged center coordinates and vertical positions, and
zero horizontal offset from the rail center. Flyout anchoring, expanded mode,
light/dark themes and narrow screens pass without browser errors.

## Solid sun and moon artwork

The canonical SunIcon center is now a filled disk and MoonIcon has a filled
crescent body. Their existing outer contours, viewBox, dimensions and colors
are retained. Regenerated React components and static/animated SVG exports
share the same artwork; the sun ray and moon rocking animation tracks retain
their path indices and timing. Settings and header controls use these shared
icons directly.

All 18 browser checks pass for light/dark settings, both header appearance
buttons and narrow screens. Native SVG fill tests confirm the sun center and
crescent body are filled while the crescent cutout stays open. Both settings
icons remain 16px with no browser errors. Generated icon/API checks, workspace
typecheck, lint, formatting, all 188 test files / 2028 tests and all production
builds pass. Pro's separate suite also passes 9 files / 83 tests.

## Header height, glass material and larger numeric step buttons

Settings now orders Appearance, Display, Header and Sidebar. Header offers only
Height and material (Opaque / Frosted glass), stored as headerHeight and
headerMaterial. Height defaults to 64px, supports 48–96px, and clamps on commit.
Existing preferences migrate to 64px/glass; invalid values and materials fall
back safely. Hidden headers retain these choices and Restore defaults resets
both. Layout.Header receives its existing height and Surface material API.

The header overlays the main scroll region so glass can blur actual content
beneath it. The main's initial padding and the sidebar's top margin reserve the
configured height; hiding the header releases both. Initial content positions,
sidebar overlays and fill-page sizing are preserved. Native Surface glass
provides a theme-aware tint and 16px backdrop blur; a striped background probe
visually confirms blur/transparency, while Opaque fully covers the same probe.

The Header number field is 120×36px with two 24×17px targets using existing
ChevronUpIcon/ChevronDownIcon assets. Public Input exposes opt-in steppers for
type="number", replacing native spinners while retaining min/max/step, native
events, keyboard arrows, suffixes, focus and disabled/read-only behavior. Width
can be customized with --input-stepper-width. Its stepperRepeat defaults to true
and accepts false or { delay, interval }; default timing is 400ms/80ms. Each
press takes one immediate step, then repeats until release, pointer exit/cancel,
window blur, bounds, disabling or unmount. Keyboard activation remains a normal
single step. Timers and global release listeners are removed on cancellation.

Public API docs, metadata, English/Chinese control labels and the numeric docs
example are updated. Input's 31 tests cover controlled/uncontrolled updates,
fractional steps, empty values, focus, bounds, localization, ordinary clicks,
repeat timing, repetition opt-out and cancellation. All 31 Header browser
checks and 16 custom-stepper browser checks pass, including persistence, hidden
restoration, real glass rendering, mobile controls, hold/release and both limits.
403/404/500 still fill their available space without extra scroll, and the mobile
expanded sidebar remains below the header.

Input also exposes stepperReverse (default false). Header height enables it:
the upper button decreases height and moves the header's bottom edge upward;
the lower button increases height and moves that edge downward. Held repetition,
keyboard arrows, accessible labels and disabled bounds follow the same mapping.
Consumer key handlers can prevent stepping, and changing direction cancels an
active hold. Three additional regressions pass (34 Input tests total), alongside
13 browser checks for reversed clicks, physical header movement, keyboard and
held actions, bounds and mobile behavior. The generic Input defaults retain the
normal up-increase/down-decrease mapping.

Final validation passes: generated API checks, workspace typecheck/lint/format,
all production builds, 10 relevant test files / 188 tests (Input, metadata,
documentation and localization), and Pro's 9 files / 85 tests. The broader
workspace suite also passed 188 files / 2044 tests before the final reverse option
was added; its three new reverse cases are included in the final targeted run.

## Header row sizing above 64px

The Pro header derives its scale from headerHeight: 48–64px keeps the original
row sizes; 65–96px enlarges the logo, brand text, PRO badge, search field and
icon, action buttons, separator, avatar and account by one step. No additional
stored preference is needed. All items share the same vertical center. The
vertical separator explicitly uses align-self: center, correcting the stretch
alignment that previously placed its fixed-height line at the top of the row.
Narrow-screen sizing keeps the search and action controls from overlapping.

All 48 browser checks pass at heights 48, 64, 65, 80 and 96px, including exact
dimensions and center coordinates, light/dark geometry, notification interaction,
375px and 320px screens, defaults restoration and no browser errors. Pro
typecheck, lint, formatting, its 9 files / 85 tests and production build pass.

## Shared tooltip presentation, Display controls and JSON defaults

Pro wraps its shell and settings drawer in Tooltip.Provider with size="small".
Every hint shares 12px text, 4px/8px padding, a 4px radius and an 8px arrow.
The previous per-control small/medium and arrowless overrides are removed.
Public Tooltip.Provider supplies inherited size/arrow defaults through portals;
explicit content props still override them. Nested providers inherit omitted
options, and built-in Table sorting and Dock hints also respect these defaults
without changing their existing presentation outside a provider. API metadata,
generated documentation and English/Chinese descriptions include the provider.

Settings now orders Appearance, Display, Layout, Header and Sidebar. Display
contains Overlay arrows, Breathing indicator and Notification indicator. Layout
contains Header, Sidebar, Breadcrumb and Footer visibility. Overlay arrows
defaults on and controls tooltips, rail submenus, header popovers and the column
popover. Breathing defaults on and controls the sidebar workspace status dot
without hiding it. Notifications offer Dot, Number and None; Dot is the default.
Number uses the existing Badge with a single sample notification and a compact
14px indicator with 10px text. None hides the indicator while preserving the bell.
All three choices persist and reset with the other workspace preferences.

All defaults now come from src/config/settings.json, ordered to match
the settings sections and controls. src/components/global-settings/settings.ts imports it directly, validates
enum/range defaults and derives numeric range defaults from the same values.
Initialization, missing-field migration and Restore defaults share this source.
Rail width defaults to 52px; valid saved user preferences retain precedence.

Validation: 40 tooltip browser checks and 28 Display/defaults checks pass,
including shared geometry/colors, all reported controls, arrows on/off and reload,
submenus and built-in table hints, 52px rail rendering, breathing persistence,
all notification modes, 14px badge size, setting groups and narrow screens.
No browser errors occur. The relevant Tooltip/Table/Dock suite passes 35 tests,
metadata/documentation/localization pass 40 tests, and Pro passes 9 files / 86
tests. Workspace typecheck/lint/API generation checks and production builds pass.
