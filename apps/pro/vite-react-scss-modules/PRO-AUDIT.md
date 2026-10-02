# Virgo Design Pro — Product audit

Current product pages: `/dashboard/workplace` and `/work/tasks`. Eleven other
destinations remain placeholders. The phase records below preserve their original
scope and findings; the Tasks phase adds no changes outside this Pro app.

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

Carousel arrows and playback use Virgo Button plus existing ChevronLeft, ChevronRight, Play and Pause icons. Pro's photographs, sizing, placement and deterministic image data are product composition; no generic carousel is implemented in Pro. Photograph credits and source licenses are retained in `public/images/workplace/CREDITS.md`.

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
