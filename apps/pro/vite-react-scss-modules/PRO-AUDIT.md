# Virgo Design Pro — Workplace audit

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
other five Pro directories was introduced. Work stops at this phase.
