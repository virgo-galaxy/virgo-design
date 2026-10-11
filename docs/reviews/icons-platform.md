# Virgo Icon Platform review — 2026-10-01

The platform contains 63 reviewed canonical icons: the existing 51 plus twelve hand-authored icons
(`upload`, `download`, `studio-tools`, `arrow-left`, `arrow-right`, `arrow-up`, `arrow-down`,
`arrow-return`, `play`, `pause`, `stop`, `microphone`). Existing path coordinates and documented optical corrections are
preserved. The Plus source's ineffective stroke-linecap, stroke-linejoin, and stroke-width attributes
were removed. There is no strokeWidth API and no alternate icon family.

## Core and generation

`metadata.json` uses one uniform record structure: id, category, tags, aliases, lifecycle status,
description, and `animated: boolean` for every source.
The generated manifest also provides the component name. Components, metadata, raw SVG strings,
full React registry, and browser-safe custom tooling have independent package entrypoints.

Generation validates the entire batch before mutating output. It rejects missing metadata, duplicate
ids / aliases / React names, incorrect names, viewBox, colors, dimensions, unsafe structure,
unsupported attributes, and malformed paths. `pnpm check:icons` rejects stale output and extra
obsolete generated files; normal generation removes obsolete generated files. Both the test suite
and `pnpm all` enforce validation and freshness.

## Optical review

The optical review compared each icon at **20px (left) / 24px (right)** on
light and dark backgrounds. [Bounds inventory](./icons-platform.bounds.json) records all 63 browser
SVG bounds and path counts. No geometry exceeds the canonical canvas. Bounds do not substitute
for optical judgment; the contact sheet was visually inspected for recognition, visual weight,
negative space, margins, center, corner/terminal treatment, and complexity.

- Actions and directional icons retain the established approximately two-unit geometric weight.
  Filled paths remain clear at 20px; paired chevrons retain distinct gaps and consistent direction.
- Rings, search, palette, user, and eye retain natural curvature. No polygonization was introduced.
- Status glyphs preserve ring / internal symbol separation. Settings retains its intentionally
  rotated tooth geometry and large central negative space rather than mechanically centering teeth.
- Layout, layers, shapes, and spline use more internal geometry; their essential blocks / spaces
  remain identifiable at 20px. Their large previews are reused for precision inspection.
- Upload and download use two-unit stems, directional arrowheads, an open tray, and restrained
  one-unit chamfers. Their 20/24px silhouettes match the existing action family without extra detail.
- The four straight arrows share the same clipped head, two-unit stem, and quarter-turn geometry.
  `arrow-back` was replaced with the proper directional names. Chevron aliases now use `caret-*`
  so `arrow-left/right/up/down` resolve to the actual stemmed arrows.
- Arrow Return follows a left-facing head into a rounded right bend and a long lower tail. It is
  used on return-to-catalogue links, separately from the four directional arrows.
- Studio Tools uses an open artboard, a diamond specimen with a clear central cutout, and a
  separate creation mark. The new glyphs were reviewed at 20/24px on light and dark backgrounds.
- GitHub retains licensed brand geometry and its larger, denser footprint; Cybertruck retains its
  product silhouette. Their proportions are not used as the baseline for general UI glyphs.
- 16px is included as a diagnostic preview; 20/24px remain the primary review sizes.

## Website organization and dogfooding

Catalogue, Detail, and Studio live under `/foundations/icons`. Catalogue filters persist in URL
parameters; category, alias, and tag links on Detail enter filtered Catalogue results. Detail reuses
`IconsExplorer` for grid, actual sizes, color / size controls, and UI previews. The review surface
follows the external Website appearance and shared semantic tokens, with no local theme state or
mode controls. The current external background is shown as a localized read-only value; redundant
light/dark comparison cards were removed. Selected category buttons use the shared brand-primary
button treatment. The review surface uses a unified two-column workspace: the large canvas on
the left, controls and real-size / UI samples in the right rail. Small screens stack these sections. Related icons
use shared category / tags. Search covers canonical id, React component name, alias, tag, category,
and Website-owned Chinese keywords (including translated categories), with AND token matching.
The catalogue, category-filtered lists, search results, and preview selector use canonical-name
A–Z ordering in both locales. Related icons are selected by shared category / tags, then the
selected cards are displayed in the same A–Z order.

The catalogue has Animated / Non-animated filter buttons backed by `animated: boolean`.
Animated shows 33 implemented motions: four arrows, four single chevrons, four double chevrons,
Bot, Check, Close, Code, Copy, Cybertruck, Download, External Link, Eye, Gauge, Globe, Layers, Lock,
Moon, Pin, Search, Settings, Shapes, Sun, Trash, and Upload. The other 30 icons remain static. The filter combines with category and search,
persists as `animation=true/false` in the URL, and clears when its selected button is pressed again.
Its native looping previews can be stopped and restarted with a static Pause / Play icon button
and localized Tooltip. Detail offers static, once, three times, and continuous preview playback,
through one selector in the right-hand Preview controls sidebar; the copied TSX reflects the
selected `animated` prop value. The large canvas owns no playback selector, and the workspace
allows inline Select popups to extend beyond its boundary without clipping.

The generator emits per-icon motion definitions and validates metadata / implementation parity,
path references, morph topology, timing, finite values, duplicate tracks, and return-to-rest poses.
Only supported icons import the small shared native-SVG playback helper. There is no animation
library or global animation stylesheet. Canonical SVGs stay static. Independent parts in Code, Bot, Layers, Gauge, Shapes, and Close
were separated into paths; Check was normalized to absolute polygon commands. Their resting
silhouettes are preserved. The shared player supports centered scale and filled path reveals
without adding a stroke API. Drawing starts hidden, reveals the shape in sequence, and holds
the canonical terminal pose. External Link bends its open terminals while the arrow retracts
and launches diagonally.
Rendering without `animated` uses the original geometry and creates no motion elements / listeners.
Browser sampling of 21 phases for all 33 motions confirms visible movement inside the 24 × 24
canvas. Reduced motion is respected, including changes during playback. Server rendering remains static.
Animation easing and duration can inherit external motion tokens, with standalone defaults.
Play, Pause, Stop, and Microphone explicitly have `animated: false` and expose no animation prop.
NavigationMenu uses a static ChevronDownIcon for disclosure. Its UI indicator rotates clockwise
180 degrees on expansion with the existing external duration and easing tokens, and rotates back
on collapse. Side-opening submenus retain a static right arrow. Reduced motion removes the
rotation transition. Icons expose only the unified optional `animated` playback capability;
there is no direction override, controlled progress, or partial-playback API.

| Previous general UI SVG                                   | Canonical replacement         |
| --------------------------------------------------------- | ----------------------------- |
| CopyToast's handwritten stroked check                     | CheckIcon                     |
| NavigationMenu's handwritten disclosure strokes           | ChevronDownIcon (UI rotation) |
| ScrollCue's handwritten stacked chevrons                  | ChevronsDownIcon              |
| SemanticThemePreview's handwritten settings/filter symbol | SettingsIcon                  |

The `packages/ui` implementation already consumes the icon package; remaining SVG markup there
is test fixture content. Website brand artwork, landscape / avatar illustration specimens, and
Motion easing charts remain local because their geometry belongs to their respective features.
UploadIcon and DownloadIcon extend common transfer coverage; DownloadIcon is used by platform
export actions. No universal UI icon SVG remains inline in the scanned implementation files.

## Studio and quality

Studio accepts one path-only SVG with the canonical fill-first contract, validates before rendering,
then provides canonical / real-size previews in the current Website theme and standalone React / SVG export.
Validated geometry is rendered as React paths, without injecting arbitrary SVG markup. Editing
source or name removes stale preview/export; errors and copy / download feedback use live `icons.*`
translations. A single source panel switches between complete usage (`Example.tsx`, import plus
render) and standalone SVG. Detail's SVG output follows preview playback: static geometry when
disabled, or the same authored native animation tracks with automatic startup and the selected
repeat count. Copy and download include that animation, without requiring React or JavaScript.
Reduced-motion exports show duplicated canonical resting geometry through a scoped media query.
Canonical source assets and Studio exports remain static. Studio exposes its generated TSX source in the same panel. Switching
mode only changes visible code; the toolbar copies exactly that code, with download available
only in SVG mode. The source-copy hook, button, and Tooltip feedback are shared with component
examples; pending writes are deduplicated and stale feedback is discarded after a mode change.
Icon actions no longer produce top-center toasts. Foundation copy feedback continues to use the
UI Toast's `appearance="compact"`; panel notifications remain available as the default appearance.
Related icons use glyph/name cards with blue hover/focus links, and the review workspace aligns
with the source panel at full content width while preserving actual glyph sizes.
It is a local authoring utility, not a drawing editor or contribution service.

Regression coverage includes SVG validator cases, metadata completeness / collisions, geometry
preservation, transactional validation, generated freshness, package exports, an actual single-icon
bundle, English / Chinese search, category / alias filtering, deep links, detail rendering, preview
controls, clipboard success / failure, download cleanup, custom validation / source output, and
language switching. Browser review verifies actual 16/20/24/32px dimensions, size/color/grid/theme
controls, Chinese search, Studio 20px, and 390px layout without horizontal overflow or page errors.

Deferred: SVG drawing / shape conversion, automated optical comparison across rasterizers,
font-like hinting, richer related-icon ranking, public contribution workflow, other frameworks,
Figma tooling, alternate families, and mass icon generation. Adding an icon still requires manual
small-size review; passing validation alone never grants stable visual quality.
