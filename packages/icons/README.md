# @virgo-design/icons

`@virgo-design/icons` is the icon system of Virgo Design.

Virgo Icons are built around a solid geometric visual language with a restrained cyber-geometric character. The system is designed for production interfaces: clear at small sizes, visually consistent as a family, and distinctive without relying on decorative effects.

## Architecture

Canonical icon assets live in:

```text
packages/icons/icons/
```

These SVG files are the source of truth.

React components are generated from the canonical SVG assets:

```text
canonical SVG
        ↓
pnpm gen:icons
        ↓
generated React components
        ↓
@virgo-design/icons
```

Generated components live in:

```text
packages/icons/src/generated/
```

The package entry point is generated from the available canonical icons.

Applications, UI components, documentation, and the Icons Catalogue consume `@virgo-design/icons`. They do not own canonical icon geometry.

Every metadata record uses the same fields: id, family, variant, category, tags, aliases, status, description, and
`animated: boolean`. The flag indicates implemented animation support; it does not start playback.
The 34 animated families (46 icon variants) use their own authored motion while sharing the same public import path.

## Canonical SVG

Every Virgo Icon is designed on a canonical:

```text
24 × 24
```

coordinate system.

Canonical SVGs use:

```svg
viewBox="0 0 24 24"
```

Presentation width and height are controlled by the consumer rather than hard-coded into the source asset.

Virgo Icons primarily use:

```svg
fill="currentColor"
```

The system is fill-first rather than stroke-first.

Filled geometry is a construction method, not a goal of making icons visually heavy. Complex icons should preserve intentional negative space and maintain a perceived visual density reasonably close to the established family references.

A canonical icon may contain one or multiple meaningful paths depending on its geometry.

## Visual Language

Virgo Icons use a:

> **Solid Geometric / Light Cyber-Geometric**

visual language.

The character of the system is:

- precise
- geometric
- clean
- restrained
- slightly sharp
- technical
- production-oriented
- subtly futuristic

The cyber-geometric character comes primarily from structure:

- proportion
- terminal treatment
- controlled chamfers
- negative space
- directional geometry
- optical balance

It does not depend on decorative sci-fi details.

Virgo Icons should remain immediately understandable as familiar interface symbols before their stylistic character becomes noticeable.

## Geometry

The canonical canvas is a coordinate system, not a box that must be filled.

Icons may use different visual footprints depending on their semantic shape.

Simple stems generally use a visual weight around:

```text
2 units
```

This describes perceived geometry rather than an SVG `stroke-width`.

Integer and half-unit coordinates are preferred:

```text
4
4.5
5
```

Other values may be used when optical correction requires them.

Mechanical consistency is useful, but optical balance has higher priority.

A mathematically centered icon may still require a small optical adjustment to appear centered at real UI sizes.

## Negative Space and Density

Negative space is a first-class part of Virgo Icon geometry.

A fill-first icon should not become a large solid silhouette simply because its shape is complex.

As icon complexity increases, internal space becomes increasingly important for preserving clarity and family consistency.

The intended relationship is:

```text
solid geometry
+
intentional negative space
=
clear visual skeleton
```

Icons such as Settings, Trash, User, and other structurally complex symbols should retain enough open space to remain visually balanced beside simpler icons such as Plus, Minus, Check, and Chevron.

Perceived weight matters more than total filled area or path complexity.

## Chamfers and Terminals

Controlled chamfers are one of the geometric signatures of Virgo Icons.

The accepted `plus.svg` demonstrates the initial reference treatment:

- small
- restrained
- geometric
- integrated into the structure

A typical chamfer may be around:

```text
0.5 unit
```

where appropriate.

Chamfers are not a decoration applied uniformly to every icon. Their shape and presence depend on the object being represented.

Different icons may express Virgo character through different structural features.

## Curves

Virgo Icons are geometric, but they are not restricted to straight lines.

Natural curves are appropriate for symbols such as:

- Search
- User
- Info
- Eye
- Globe
- circular controls
- mechanical rings

A naturally curved object should remain naturally curved.

The design system does not force circles, human forms, or other organic structures into polygons merely for visual consistency.

Rounded geometry is intentional rather than automatic.

## Optical Balance

Every icon should feel stable at real interface sizes.

The main visual priorities are:

1. Recognition
2. Optical balance
3. Family consistency
4. Virgo character
5. Decorative expression

Recognition always comes first.

Family consistency is achieved through shared visual weight, proportion, spacing, negative-space discipline, and geometric restraint rather than by repeating the same motif on every icon.

## Reference Icons

### Plus

`icons/plus.svg` is the first canonical family reference.

It establishes an initial baseline for:

- visual weight
- overall proportion
- terminal treatment
- chamfer restraint
- geometric sharpness
- fill-based construction

New icons should feel related to Plus without copying its geometry mechanically.

### Search

Search demonstrates how curved geometry can coexist with the Virgo visual language.

Its circular structure is semantically natural and therefore remains curved while still following the same family principles of weight, spacing, and restraint.

### Settings

Settings demonstrates intentional brand-coded geometry within a familiar interface symbol.

Certain unusual rotations, offsets, or asymmetries may be deliberate parts of canonical icon geometry. When present, their design intent is documented directly in the corresponding SVG source.

## Real-Size Review

Canonical geometry is designed on the 24×24 canvas and should remain clear at real interface sizes.

The primary reference size is:

```text
24px
```

Common UI usage around:

```text
20px
```

is also important when evaluating visual density, negative space, and recognizability.

Large Detail previews are useful for inspecting geometry, but the final judgment belongs to the real rendered size.

Details that only work when heavily magnified are not part of the intended visual language.

Small structural signatures may use optical compensation so they remain perceptible at real UI sizes.

## Naming

Icons use an explicit Outline / Filled family contract:

- `sun.svg` → `SunIcon`: outline / regular (`family: 'sun'`, `variant: 'outline'`).
- `sun-filled.svg` → `SunFilledIcon`: filled (`family: 'sun'`, `variant: 'filled'`).

Both visual variants use closed `currentColor` fill paths. Outline is a visual treatment,
not an SVG stroke API; the existing viewBox, weight, chamfers, curves, negative-space and
optical-size rules apply to both. There is no runtime `<Icon variant="">` abstraction.
The generator validates family membership and variant naming before writing components.

Only these 36 families have a Filled variant:

```text
bell, bot, briefcase, calendar,
circle-check, circle-info, circle-x, triangle-alert,
dashboard, database, form, gauge, home, layers, layout, widgets,
eye, eye-closed, lock, unlock, pin, unpin, microphone, monitor,
sun, moon, play, pause, stop,
palette, receipt, settings, shapes, studio-tools, trash, user
```

Other icons retain their existing single regular shape and record `variant: 'outline'`;
this includes semantic marks and brand silhouettes whose geometry is inherently solid.
Do not add a Filled counterpart solely to increase coverage.

Before V1, the former solid Sun, Moon, Play, Pause and Stop geometry moved intact to
`SunFilledIcon`, `MoonFilledIcon`, `PlayFilledIcon`, `PauseFilledIcon` and `StopFilledIcon`.
Their default exports now use outline geometry. Update imports to the Filled names to
keep the previous solid appearance. Animation support belongs to the family: both members of the 12 animated pairs expose
the same optional `animated` playback prop. The other pairs remain static. Filled Gauge
animates its transparent needle contour while preserving the fixed dial.

The Website catalogue is a flat grid: every actual export occupies one equal-width,
equal-height grid cell. Family expresses a relationship and never changes layout or
card width. Sort by family A–Z, with Outline followed immediately by Filled; siblings
may naturally wrap across rows. Cards show `Family: name · Outline / Filled` and retain
independent detail links, TSX examples and SVG downloads for each export.
Search covers family, variant, inherited family aliases and localized terms. Animation
and category filters show only matching variants. Detail links between both family members.

Canonical SVG files use lowercase kebab-case:

```text
plus.svg
minus.svg
chevron-down.svg
search.svg
settings.svg
```

Generated React components use PascalCase with the `Icon` suffix:

```text
PlusIcon
MinusIcon
ChevronDownIcon
SearchIcon
SettingsIcon
```

## Generation

### Product navigation symbols

`BriefcaseIcon` represents work/projects with a chamfered case, clipped handle and
central latch. `DatabaseIcon` represents data with naturally curved cylinder ends,
three compact tiers and two-unit side rails. `FormIcon` represents forms with a
chamfered sheet, short heading and two label/input pairs.

These static icons use the same 24-unit, fill-first, currentColor contract as the
family. Their restrained cyber character comes from open geometry, clipped terminals
and structural rhythm. They remain readable at 16, 20 and 24px. Virgo Pro uses them
for Work, Data and Form; Layout, Layers and Type retain their foundation meanings.

### Foundation symbols

The Website uses `PaletteIcon` for Colors, `TypeIcon` for Typography, `LayoutIcon` for Layout,
`LayersIcon` for Shape & Depth, `SplineIcon` for Motion, and `ShapesIcon` for Icons.

`LayoutIcon` replaces the former `WorkspaceIcon` export without changing its geometry.
Consumers should update their imports to `LayoutIcon` (and `LayoutIconProps` for its props).

After changing or adding a canonical SVG, regenerate the React package with:

```bash
pnpm gen:icons
```

The generator validates all canonical sources and metadata before updating React components, public exports, the metadata manifest, the opt-in React registry, and canonical SVG strings. `pnpm check:icons` validates sources and rejects stale generated output without writing files. Both `pnpm all` and the generator tests enforce this contract.

The normal repository validation command is:

```bash
pnpm all
```

## Usage

### Cursor Arrow

`cursor-arrow.svg` exports `CursorArrowIcon` and `CursorArrowIconProps`. Its single closed
silhouette has a softened northwest tip, broad shoulders, and a short, narrow southeast tail
with rounded ends and smooth joins into the body,
with proportions intended for 16, 20, and 24px rendering.

The icon supplies geometry and `currentColor` only. The Cursor component owns the
translucent light fill, cool tint, soft edge, highlights, and shadow. Keep these material
effects out of the canonical SVG. Its southeast tail provides the visual direction for a
pointer-follow Tooltip to extend behind the cursor.

```tsx
import { PlusIcon, SearchIcon } from '@virgo-design/icons';

export function Example() {
  return (
    <>
      <PlusIcon />
      <SearchIcon size={20} />
    </>
  );
}
```

Icons inherit their color from the surrounding interface through `currentColor`.

This allows icon color to follow component state, semantic color tokens, and normal CSS without embedding presentation-specific colors into canonical assets.

## Package entrypoints

```tsx
import { SettingsIcon } from '@virgo-design/icons';
import { iconManifest, searchIcons } from '@virgo-design/icons/metadata';
import { getIconSvg, iconSvgSources } from '@virgo-design/icons/assets';
import { validateIconSvg, createIconSource } from '@virgo-design/icons/tooling';

<SettingsIcon size={20} style={{ color: '#7060ff' }} />;
<SettingsIcon aria-label="Settings" role="img" />;
searchIcons(iconManifest, 'cog');
```

Components default to 24px and `currentColor`; unlabeled icons are decorative (`aria-hidden`).
Consumers can provide `aria-label` / `aria-labelledby`, className, style, events, and a React ref.
`size` owns width and height. Geometry props (`viewBox`, fill, children, stroke settings) are excluded
from the public type. The package is ESM, supports React 18+, and requires no Virgo UI or token package.
`sideEffects: false` and the pure root barrel preserve tree-shaking.

The root exports the shared `IconProps`, individual components, and their `XxxIconProps`.
`IconProps` contains the supported SVG props plus optional `size`, with canonical geometry and
dimensions excluded. Most static icon props alias `IconProps`; `SortIcon` adds the direction and active-color props described below. Animated icon props extend it with
optional `animated`. Custom icon previews and Studio-generated TSX use the same public type.
Studio's generated code imports `IconProps` as a type only; its runtime requires React.
Metadata, SVG sources, tooling,
and the full React registry are separate opt-in entrypoints; normal icon imports do not pull them in.
`@virgo-design/icons/registry` exposes `iconComponents` keyed by canonical id, for catalogues.
Raw assets are exported as `@virgo-design/icons/svg/settings.svg` (bundler asset handling applies).
The published package includes declarations, canonical SVGs, this guide, and third-party notices.

## Metadata and search

`metadata.json` is the authored English-only metadata registry. Each canonical SVG requires exactly
one id, family, variant, category, tags, aliases, status, description, and animated record. The generated manifest
also includes the React component name; `IconId`, `IconCategory`, `IconMetadata`, and
`IconManifestEntry` are available from `/metadata`.

Canonical ids and aliases are globally unique. Aliases cannot shadow any canonical id, including
icons later in the registry. Metadata terms are normalized lowercase English; Chinese vocabulary
belongs to the Website feature. Search matches canonical id, component name, alias, tag, and
category, with case-insensitive NFKC normalization, partial matching, AND query tokens, and optional
category filtering. Consumers can pass their own `keywords` dictionary without changing core metadata.

## Optional animation

The four arrows, four single chevrons, four double chevrons, Bell, Bot, Check, Close, Code, Copy,
Cybertruck, Download, External Link, Eye, Gauge, Globe, Layers, Lock, Moon, Pin, Search, Settings,
Shapes, Sun, Trash, and Upload support one additional prop: `animated`.
The Filled members of Bell, Bot, Eye, Gauge, Layers, Lock, Moon, Pin, Settings, Shapes,
Sun and Trash share their family motion and support the same prop. No animation-type or
stroke API is added.

```tsx
import { CodeIcon } from '@virgo-design/icons';

<CodeIcon />; // Static canonical geometry.
<CodeIcon animated />; // Play once, then rest in the canonical pose.
<CodeIcon animated={3} />; // Play three complete cycles.
<CodeIcon animated="always" />; // Loop until disabled or unmounted.
```

Omitted / false, zero, negative, fractional, and non-finite counts stay static. Supported props
use the exported `IconAnimation` type. Play and Pause are ordinary static icons.
Motion settles in the canonical pose; drawing animations reveal the filled shape and hold it. Chevrons fold by path interpolation; double chevrons
nudge and rebound; Code separates the brackets while fading its slash; Trash opens its lid;
Copy separates its sheets; transfer arrows move relative to their tray; Settings turns its gear.
Globe turns its meridian rather than spinning the entire flat symbol. Layers spread and fold;
Lock lifts its shackle; Eye blinks; Bot sways its antenna; Gauge sweeps its needle. Search magnifies,
Sun turns its rays, Moon and Pin sway, Cybertruck bounces on its suspension, and Shapes cycle positions.
Check and Close draw their filled polygons in sequence, with no stroke-based public API.
External Link flexes its two open frame terminals as its arrow draws back and launches outward.

Playback uses native SVG animation without a third-party runtime or animation stylesheet.
Static icons without animation support do not import the playback helper; supported icons retain
their small animation definitions even when used statically. Static rendering creates no
animation elements or motion listeners. Canonical source files remain static geometry.
Server rendering and `prefers-reduced-motion` use the canonical resting pose. Active playback
responds to changes in the reduced-motion preference and cleans up its subscription on unmount.
Timing inherits `--vd-easing-standard` when available; a CSS `--virgo-icon-duration` override can
reference external motion tokens, for example `--virgo-icon-duration: var(--vd-duration-1120)`.
The package also supplies standalone timing defaults and does not require Virgo tokens.

The opt-in `/assets` entrypoint also exports `getIconSvg(id, animated?)`. It uses the same
authored animation definitions as the React components. Omit `animated` for the canonical
static SVG; pass `true`, a positive integer, or `'always'` to include native `<animate>` /
`<animateTransform>` elements that start automatically, without React or JavaScript:

```ts
getIconSvg('code'); // Static SVG.
getIconSvg('code', 3); // Standalone SVG with three animation cycles.
getIconSvg('code', 'always'); // Standalone looping SVG.
```

Standalone exports include their own timing and easing defaults and a reduced-motion media
query with canonical resting geometry. Icons without animation support always export static
geometry. Website Detail's SVG code, copy, and download follow its selected playback mode.
The canonical `/svg/*` files and `iconSvgSources` remain static authoring sources; derived
animated exports are not canonical input for the path-only custom-icon validator.

## Validation and custom icons

The browser-safe `/tooling` entrypoint exports `validateIconSvg`, `IconValidationError`,
`IconDefinition`, `IconPath`, `serializeIconSvg`, `iconComponentName`, and `createIconSource`.
It has no React or DOM dependency. Validation rejects wrong viewBoxes, fixed colors, dimensions,
unknown/duplicate attributes, strokes, transforms, styles, external references, scripts, entities,
unsupported shapes, malformed geometry, non-finite coordinates, and oversized input.
Only self-closing paths are supported in this first version; convert rects, circles, and groups to
paths before importing. Negative space uses path winding or `fill-rule="evenodd"`.
Validation preserves canonical precision and intentional optical corrections.

```ts
const definition = validateIconSvg(svgText); // throws a typed error with a stable code
const svg = serializeIconSvg(definition);
const react = createIconSource('custom-star', svg); // standalone React component source
```

Generated custom code uses the same fill-first props contract. Copy the source into your project;
Studio does not write custom artwork into the official icon collection. To contribute a canonical
icon locally: author one SVG, add its metadata, review at 20/24px on both backgrounds, run
`pnpm gen:icons`, then `pnpm all`. A validator pass is not an optical-quality approval.

## Website catalogue, detail, and Studio

`CalendarIcon` and `ClockIcon` use the same fill-first geometry and shared `IconProps`.
UI DatePicker uses Calendar in its default trigger; TimePicker uses Clock beside its native
time segments. Both are decorative in those controls: the button or input owns the accessible
name. TimePicker preserves the browser's native picker hit target beneath the Virgo icon.

- `/foundations/icons`: grid, English / Chinese search, categories, URL-persisted filtering.
- `/foundations/icons/:id`: metadata, related icons, TSX / SVG source and copy, download SVG,
  enlarged geometry, actual 16/20/24/32px previews, external Website appearance, a current-background readout, color, size, grid, UI preview.
- `/foundations/icons/studio`: paste SVG, validate, reuse Detail previews, copy standalone React / SVG,
  and download canonical SVG. Editing input invalidates the previous validated output.

`IconsExplorer` supplies the shared geometry-review surface. Its appearance follows the external
Website theme; it has no independent theme state or mode selector. Review colors use shared Virgo
semantic tokens. Its current background is displayed as read-only text; there are no separate
light/dark comparison cards. Website-local search terms and
`icons.*` locales own Chinese search and translated interface labels; canonical identifiers remain
unchanged in both languages. Canonical source remains `packages/icons/icons/`.

### Result receipt

`receipt.svg` exports `ReceiptIcon` and `ReceiptIconProps`. Its clipped top, two
record lines and short zigzag tear edge express a neutral result or acknowledgement.
Virgo Pro uses it for Result navigation; success/error content keeps its semantic
check/cross icons. Receipt is static, fill-first and inherits `currentColor` through
the shared `IconProps` contract. English `receipt`/`result` and Chinese 回执/结果
search terms lead to its catalogue entry.

### Sort indicator

`sort.svg` exports `SortIcon` and `SortIconProps` from `@virgo-design/icons`. It contains
a pair of filled upward/downward triangles. Both remain visible; inactive triangles
inherit `currentColor` at 65% opacity above and 45% below. `direction` defaults to
`'none'` and also accepts `'ascending'` or `'descending'`. The active triangle uses
full opacity and `activeColor`, which defaults to `'currentColor'`.

```tsx
<SortIcon size={16} direction="ascending" color="gray" activeColor="var(--vd-brand-link)" />
```

The icon only displays state. `Table.SortButton` owns clicks, keyboard input, the
three-state cycle and the next-action tooltip; `Table.Head` owns `aria-sort`.

### System appearance

`monitor.svg` exports `MonitorIcon` and `MonitorIconProps`. The open display frame,
clipped corners and compact stand follow the 24-unit, fill-first family geometry.
Virgo Pro uses it for System appearance beside Sun and Moon at 16px. Search the
Icons catalogue for monitor, system, 显示器 or 跟随系统.

### Notifications

`bell.svg` exports `BellIcon` and `BellIconProps`. Its open rounded dome, clipped
rim and compact clapper follow the canonical fill-first geometry. The existing
`animated` API adds a gentle side-to-side ring about the top of the bell: true
plays once, a positive integer specifies repetitions, and "always" loops. It
respects reduced motion and supports SVG export. Virgo Pro keeps the bell static
and composes it with the existing `Badge dot` for its notification button. Search the
catalogue for bell, notification, 铃铛 or 通知.

```tsx
<BellIcon />
<BellIcon animated />
<BellIcon animated={3} />
<BellIcon animated="always" />
```
