# Virgo Design Pro — current product audit

Updated October 8, 2026. Scope: `packages/*`, public Website documentation, and
`apps/pro/vite-react-scss-modules` (Golden Pro). The other five Pro variants are not
part of this pass. This document replaces the historical phase-by-phase issue log
with the current capability and delivery boundaries.

## Resolved

### Golden Pro product closure — October 8

- Projects, Tasks, workplace reports and handoffs consume the same authenticated HTTP
  register. Portfolio search (including Chinese labels), health and actual project-manager
  filters compose together and live in the URL. Returning from project details retains
  the portfolio filters. Open/review/overdue counts link to the matching task query.
- Project details show live completion, open/review/overdue work, module-level progress,
  a bounded linked-task preview, the full task register, team and dated milestones.
  Cross-year project dates include the year. Health remains an explicitly labelled
  project-manager assessment, separate from calculated overdue work.
- Managers see their managed projects; members see participating projects with counts
  and progress calculated from their own assigned tasks. Personal scope is stated on
  the page. Handoff is available only to Admin and the managing project manager.
  Its API checks project scope, unique task IDs and valid dates after project start;
  manager receipts stay inline, while Admin can use the Result showcase routes.
- Login uses Virgo Form/Input/Button/Progress and the shared theme/surface typography.
  Account Menu shows the current name, actual role, department and account. Every role
  can edit its own profile and preferences; profiles persist by user ID across logout,
  reload and account switches. Global/table settings and reset remain Admin-only.
- Session bootstrap reports invalid saved tokens as expired. An idle-session timer
  returns to Login at expiry; protected 401 responses do the same. A late response
  carrying a previous token cannot expire a newly signed-in account.
- Shared Toast feedback aligns the title, status icon and close control on one row
  without reserving an empty description row. Website's Toast specimens explicitly
  use inline viewports; notifications remain in their preview canvases rather than
  inheriting the global portal placement.
- Success/Error and 403/404/500 use public Result, semantic Surface/Button styles,
  consistent heading sizes and the actual Result spacing variables. Sample receipts
  now demonstrate project handoff, including a real project manager and linked work.
  Result previews at most four linked tasks, opens their dedicated details with a return link and
  retains the complete scope in CSV export; bulk handoffs do not create an unbounded
  result page.
- Deleted DataListPage, BasicFormPage, TaskDialog, TaskDetailsDialog, use-task-editor
  and the obsolete WorkRequest helpers. ProjectDetailPage and ProjectHandoffPage now
  own their styles/locales under Projects. Old data/form URLs remain compatibility
  redirects only; no production navigation or component import uses the old pages.

### Production raw-control audit

Scan: `src/**/*.{tsx,jsx}` excluding tests. **5 raw buttons remain; 0 raw input,
select, textarea, details or summary controls.** Notification rows and the AI preview
return action now use public Virgo Button.

| Remaining location          | Reason                                                                                                                                                      |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| TokenUsageHeatmap           | Tooltip render-prop trigger forwards public trigger props/ref onto a compact calendar cell; cell geometry, intensity and date interaction are domain-owned. |
| TokenUsageCalendar          | Same public Tooltip trigger adapter for full-calendar day cells.                                                                                            |
| TaskAssigneeCard            | Public Popover/Tooltip render adapter for a composed person trigger; the primitive owns overlay, keyboard and ARIA behaviour.                               |
| AiWorkspace — resize handle | Public Tooltip trigger adapter wraps the pointer/keyboard resize handle; domain geometry is not a standard action-button layout.                            |
| AiWorkspace — drag handle   | Public Tooltip trigger adapter wraps the pointer/keyboard drag handle for the workspace canvas.                                                             |

These adapters do not duplicate public Button action controls or public overlay logic.

### Charts engine migration

- `@virgo-design/charts` retains the existing Virgo compound React API over Apache
  ECharts **6.1.0**. A compiler maps declarations into engine options. ECharts owns
  scales, axes, ticks, line/area/bar/pie geometry, stacking, animation and interaction.
  The retired ordinary SVG math and GSAP engine are removed.
- The modular `echarts/core` entry registers Line/Bar/Pie, Grid/Tooltip/Legend,
  Dataset/Transform, LabelLayout/UniversalTransition and SVG/Canvas. SVG is the
  default; Root/Responsive accept `renderer="canvas"`. React manages init/setOption,
  ResizeObserver, theme/data updates, renderer replacement and disposal.
- Root/Responsive/Cartesian/Grid/XAxis/YAxis/Line/Area/Bar/Pie/Donut/Tooltip/Legend
  preserve category/time/linear axes, grouped/diverging stacks, zero/negative values,
  missing intervals, formatting and empty states. Stable series IDs preserve engine
  diff and update transitions. Line/Area reveal on first visibility.
- Virgo retains the shared-x HTML Tooltip, native legend buttons, active dots,
  axis pointer, bar emphasis, outward polar selection, keyboard inspection and data
  disclosure. Reduced motion disables engine transitions and is observed live.
- The engine-neutral theme contract resolves the current `--chart-*` CSS variables
  and Virgo tokens. Light/dark updates preserve the instance; Classic is not hardcoded
  in the adapter. Desktop/Retro visual certification remains separate work.
- Sparkline stays lightweight native SVG, with no ECharts or GSAP imports. Both
  `Chart.Sparkline` and `@virgo-design/charts/sparkline` avoid requesting the engine.
- `@virgo-design/charts/echarts` offers EChartsChart, full EChartsOption, onReady and
  map/theme registration helpers for native advanced chart types. The ordinary API
  never imports that entry. Website presents Radar and calendar Heatmap alongside
  chart families; their full runtime loads automatically when that preview approaches
  the viewport. Engine & Advanced Usage documents both entry points in English/Chinese.
- Website keeps the Charts top-level navigation and the existing families, animation,
  theme, resize, data updates and negative/zero/missing examples. Its theme preview
  also demonstrates switching between SVG and Canvas without changing declarations.

### Pro migration and shared UI

- Workplace DeliveryTrend and Analytics delivery/distribution consume Charts.
  Their local SVG geometry, axes, point inspection and pie drawing are removed.
  Business period selection, calculations, CSV export and exact-value reports remain
  product composition. Project workload Progress and task completion indicators
  retain their existing business meaning.
- UI Statistic supplies metric label/value/affixes/trend/description/loading and
  compound slots. MetricStrip, Workplace and Tasks use it; grids remain product-owned.
- UI Result supplies success/error/warning/info/403/404/500, custom artwork, titles,
  descriptions, recovery actions and extra content. Pro receipt and exception pages
  now consume it. Website includes executable examples and generated API references
  for both new components.
- Breadcrumb.Item has a native-link render adapter that forwards attributes, children
  and ref. The shell breadcrumb starts with the navigation group and current page.
- Select.Content uses a portal, preferred placement and viewport collision handling,
  with theme/direction and size propagation. Tasks no longer forces an upward popup
  with local CSS.
- ColorPicker.Content consumes the shared overlay surface and layer depth contract.
  Profile's local `z-index: 101` override is removed. A nested color popup sits above
  its containing Dialog; Escape closes the inner layer first.
- Combobox.Input supports decorative prefix/leadingIcon without losing its native
  input/ref semantics. Header Search uses this API; its absolute icon and compensating
  left padding are removed. Input already supplies its public prefix capability.

### Product consistency and navigation

- Shared headers, metric grids, section/toolbar/form spacing and radii consume the
  existing token scale. Chart/metric/result presentation shares the public semantic
  styles. Obsolete local chart/metric styles and duplicate static chart legends are
  removed.
- Content-first pages expose a screen-reader page heading. Existing visual page
  hierarchy and workflow composition remain intact. English and Chinese resources
  stay beside their business domains; locale types derive from English.
- Business routes use React.lazy/Suspense with a localized Virgo Skeleton fallback.
  App Shell and the editable task/profile/workflow state stay above the lazy route
  boundary, preserving in-session navigation state. Each route keys its Suspense
  boundary so transitions display the loading placeholder instead of keeping the
  previous page visible while its replacement chunk loads.

## New findings and V1 boundaries

- Dashboard fixtures are validated with SVG and Canvas; large real-world datasets
  still need workload-specific measurement. Zoom/brush/multi-axis and advanced types
  are available through the full EChartsOption entry rather than ordinary Virgo presets.
  ECharts handles polar label collision avoidance. Small containers may still need
  consumer label choices; Tooltip/Legend/data table remain available.
- Numeric/time x input should be in drawing order. Unknown keys/missing values are
  handled, but there is no typed dataset schema validator or generic dataKey inference.
- Native data disclosure includes the union of record fields and localized series
  names/values. Arbitrary field headings retain dataset keys; products needing fully
  localized column schemas can compose their own accessible Table, as Analytics does.
- Missing values compile to null with connectNulls disabled; ECharts controls transition
  behavior across changes in topology without Virgo synthesizing observations.
- Mock is an MSW v2 HTTP backend behind `src/api` and `src/lib/http` (Axios).
  Tasks, per-user profiles, handoffs, task activity/Token records and notifications
  persist in Pro-owned localStorage (versioned snapshots with an in-memory fallback).
  Opaque session tokens live in sessionStorage; Admin reset clears only Pro-owned keys.
  Reports derive from the same scoped task/activity records across 2025–2026.
  Set `VITE_API_MOCKING=false` to use the same APIs against a Gateway. See `API.md`.

## Leave to Interface Audit

- Audit the Classic light/dark semantic contract for chart/text/grid contrast,
  Tooltip density, active treatment and small screens alongside all UI components.
  Semantic overrides are available; Desktop/Retro interfaces are not claimed as
  implemented or verified by this pass.
- Evaluate denser/longer real labels, tiny pie slices, extended palettes and precision
  formatters with representative product datasets. Choose additional chart behavior
  from actual consumer needs, including the large-data boundary above.
- Existing nonblocking composition friction remains: Table.SortButton + a sibling
  information Tooltip for sortable header help; consumer-owned Table query/selection
  controllers; consumer-owned Tree group/cascade selection. No private component
  imports or copied public controls are required.
- Review all public part attributes, custom variables, focus rings, motion and
  overlay nesting as one interface contract. The Golden Pro is ready to provide
  concrete consumer coverage for that audit.

## Leave to Release / Packaging

- Charts publishes ESM, declarations, source maps and an explicit stylesheet.
  React/ReactDOM/ECharts/zrender remain external in its library build; ECharts 6.1.0 is
  the declared engine dependency. Check a packed-package consumer (React 18 and 19), CSS import
  instructions and package exports before a registry release.
- The compound Chart object retains the family implementation when consumed. There
  are no advertised per-part JS/CSS entrypoints. CSS is a marked side effect; do not
  promise per-series CSS elimination.
- UI source-barrel imports still retain unused component CSS. Route splitting does
  not solve that packaging concern. Pro initial UI CSS is about 230 KB before gzip;
  the initial token/font plus UI styles together are about 393 KB. Interface themes
  and public package styles need a separate delivery/entrypoint audit.
- Pro's main entry is about 557 KB before gzip; route and shared UI dependencies
  remain separate lazy chunks. This does not describe the complete first-page cost.
- The modular ECharts adapter/runtime chunk is about 618 KB (212 KB gzip), requested
  by chart routes. It now crosses Vite's 500 KB warning threshold; this is documented
  rather than hiding the warning. Website's advanced entry adds about 514 KB (166 KB
  gzip) and is lazy. The translations chunk remains about 584 KB, a separate delivery
  concern. Native Sparkline has no ECharts request.

## Validation and readiness

- Full repository tests: **233 files / 2,607 tests passed**. Typecheck and lint passed;
  generated API and icon consistency checks passed. Production builds passed for
  packages, Website and Golden Pro.
- ECharts migration browser validation covers production renderer registration,
  shared-x Tooltip/active dots/guideline, keyboard inspection, data updates, native
  legend selection, polar lift/label lines, SVG/Canvas, nested light/dark, advanced
  Radar/Heatmap and Pro's English/Chinese date formatting. Runtime tests verify live
  reduced-motion/theme updates, instance reuse, resize and cleanup.
- Earlier product validation also sampled nested ColorPicker dismissal/layering and
  paused route loading with a persistent shell and localized Skeleton.
- Golden Pro closure browser validation: **16 formal routes × English/Chinese ×
  light/dark × 1440/390 px = 128 loaded-page checks**. No missing business-page
  heading, untranslated resource key, runtime page error or page-wide horizontal
  overflow was found. Tables retain local horizontal scrolling. Login, project
  detail, Result, Exception and Profile were also inspected visually.
- Business checks cover portfolio filters and return links, project/module → task
  queries, member submission → manager completion, per-person notifications,
  personal profile persistence, Account Menu → Profile → Sign out → another Demo
  login, and expired-session recovery. API integration tests additionally exercise
  handoff validation/permissions and late-401 account-switch isolation.
- Toast regression checks cover local viewport containment, undo, individual dismissal,
  stacking and reopening after dismissal. Browser checks verified all six placements
  at 1440/390 px, Chinese dark-mode interaction and aligned Pro preference feedback.
- **No remaining blocker for step ⑦ within Golden Pro's local Mock scope.** Backend
  deployment/authentication, cross-device collaboration and release/packaging remain
  separate boundaries. Desktop, Retro and Interface Audit were not started.
