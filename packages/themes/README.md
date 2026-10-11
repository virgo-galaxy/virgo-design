# Virgo Theme System

`@virgo-design/themes` implements the public contract in `@virgo-design/tokens`.
It depends only on Tokens. UI and Charts consume variables and never import a preset.

```sh
pnpm add @virgo-design/tokens @virgo-design/themes @virgo-design/ui
```

```ts
import '@virgo-design/tokens/styles.css';
import '@virgo-design/themes/styles.css';
import '@virgo-design/ui/styles.css';
import { initializeTheme, setTheme } from '@virgo-design/themes';

initializeTheme(); // before rendering
setTheme('soft');
```

Official `ThemeId`s are `virgo`, `minimal`, `soft`, `glass`, `retro`,
`bold`. The default is `virgo`. `themePresets` is an ordered immutable
list; `themeRegistry` maps the IDs to `ThemePreset` metadata including contract
version and `['light', 'dark']` appearances.

The runtime sets `html[data-virgo-theme]`, persists by default under
`virgo-design.theme-style.v1`, synchronizes storage events between tabs, and
continues in memory if storage is blocked. It never changes `data-theme`,
`color-scheme`, or an appearance preference. Consumers retain their existing
light/dark/auto state. Pro's existing name for auto is `system`.

`initializeTheme({ defaultTheme, storage })` accepts a `ThemeStorage` codec with
`key`, `parse(raw)` and `serialize(id, raw)` to store a theme inside an existing
settings record. Pro uses this to persist `theme` with appearance and layout in
`virgo-pro:settings:v1`, with defaults from `src/config/settings.json`. It migrates
and removes the former standalone theme key. Saved `utility` and `high-contrast`
IDs migrate to `retro` and `bold`; new selections use the new IDs. Restoring Pro
settings restores the configured theme; resetting demo data also clears the saved
record and restores the live theme before returning to login.

```tsx
import { useSyncExternalStore } from 'react';
import { getTheme, getServerTheme, setTheme, subscribeTheme } from '@virgo-design/themes';

const theme = useSyncExternalStore(subscribeTheme, getTheme, getServerTheme);
```

For SSR, `getServerTheme` returns the configured default (Virgo unless specified). Render the preference in the initial
HTML and initialize before hydration if avoiding a first-paint difference is
required. This package does not invent a server-side preference source.

## Presentation contract

Foundation scales stay immutable. `themeContract` and
`THEME_CONTRACT_VERSION` in Tokens describe the presentation surface:

- `--vd-theme-light-*` / `--vd-theme-dark-*`: all semantic color and elevation
  roles, including status and categorical chart colors. The existing Tokens CSS
  resolves the appropriate set on every `data-theme` appearance scope. Virgo
  values are retained as exact fallbacks.
- `--vd-shape-radius-*`, `--vd-control-{mini,small,medium,large}-*`: shape and
  control geometry; foundation radius and spacing specimens remain accurate.
- `--vd-stroke-width`, `--vd-focus-*`, `--vd-control-*`, `--vd-action-*`,
  `--vd-disabled-*`: borders, focus, elevation and pressed/disabled presentation.
- `--vd-panel-*`, `--vd-overlay-*`, `--vd-tooltip-*`, `--vd-surface-*`,
  `--vd-glass-*`: ordinary and translucent surfaces, overlays and highlights.
- `--vd-navigation-selected-*`, `--vd-table-*`: hierarchy and selected states.
- `--vd-motion-*`: duration and easing, still respecting reduced motion.
- `--vd-chart-*`: grid, axes, tooltip, legend, series and interaction geometry.
- `--vd-tag-*`, `--vd-select-tag-radius`: shared tag borders, material, shadows
  and geometry for standalone tags and removable selected values. Business pages
  choose semantic intents, including `accent`, without repainting these surfaces.
- `--vd-page-background`, `--vd-chrome-*`: consumer shell presentation, without
  controlling route structure, layout, sidebar dimensions or business behavior.

Each `data-virgo-theme` scope resets optional overrides. An `initial` value means
the component's Virgo fallback applies. A preset only supplies variable values;
its stylesheet has no component-class or business-page selectors. Public
per-component variables and inline styles remain available for deliberate
instance customization.

## Third-party CSS

```ts
import './studio.css'; // after official styles
import { registerTheme, initializeTheme } from '@virgo-design/themes';

registerTheme({
  id: 'studio',
  name: 'Studio',
  descriptionKey: 'studio',
  contractVersion: 1,
  appearances: ['light', 'dark'],
});
initializeTheme(); // register before restoring a saved custom preference
```

```css
[data-virgo-theme='studio'] {
  --vd-control-medium-radius: 10px;
  --vd-theme-light-brand-primary: #2252ad;
  --vd-theme-light-brand-foreground: #fff;
  --vd-theme-dark-brand-primary: #9dbfff;
  --vd-theme-dark-brand-foreground: #10203a;
}
```

Complete hover, active, focus, disabled, status, surface and chart roles in both
appearances. Official IDs cannot be replaced. Theme installation does not alter
component APIs or copy component implementations.

## Audit

Website `/themes` supplies one live specimen composition in six isolated scopes,
including actual Dialog and Tooltip portals through the public `PortalProvider`.
Normal applications put the theme on HTML so body portals inherit it directly.
Inspect both appearances, focus, selection, disabled controls, keyboard behavior,
reduced motion, narrow layouts and live ECharts updates. Explicit per-instance
colors and branded/media artwork remain consumer-owned.

Reference directions: [Vercel neutral color system](https://vercel.com/geist/colors),
[Apple Liquid Glass](https://developer.apple.com/documentation/technologyoverviews/liquid-glass),
and [Windows contrast themes](https://learn.microsoft.com/en-us/windows/apps/design/accessibility/high-contrast-themes).
The presets express these broad visual directions within Virgo's existing layout.

### Glass material

Text-dense popups use a separate neutral material: 88% coverage and 24px blur,
so underlying form labels do not interfere with menu options. Cards and large
surfaces retain their clear glass recipe. Window controls consume semantic
presentation variables for filled red/yellow dots and hover/focus symbols.

Glass uses neutral translucent white/black; blue is reserved for accent and
interactive states. Material uses CSS backdrop blur without SVG displacement.
Each glass Surface applies the blur only on its material layer. Chart tooltips
use their own 78% coverage and 8px blur, independent of the surrounding panel;
`--vd-chart-tooltip-backdrop-filter` controls that single layer. No-blur and
reduced-transparency modes use opaque neutral surfaces.
The website comparison includes identical artwork under each Surface so the
material can be inspected directly. This is a Web implementation inspired by
[Apple's latest Liquid Glass refinements](https://developer.apple.com/videos/play/wwdc2026/102/).
