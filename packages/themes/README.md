# Virgo Theme System

`@virgo-design/themes` implements the contract in `@virgo-design/tokens`. UI and Charts consume variables, independently of a preset. Official IDs are `virgo`, `minimal`, `soft`, `glass`, `retro`, `contrast`; all support Light/Dark.

```ts
import '@virgo-design/tokens/styles.css';
import '@virgo-design/themes/styles.css'; // all six
// Or import '@virgo-design/themes/virgo.css'; for Virgo alone.
import '@virgo-design/ui/styles.css';
import { initializeTheme, setTheme } from '@virgo-design/themes';
initializeTheme(); // before the SPA's first render
setTheme('soft');
```

The JS root is CSS-free and imports directly in Node/SSR. CSS exports include `styles.css` and all six single-theme `virgo.css/minimal.css/soft.css/glass.css/retro.css/contrast.css` files. A single file contains only that preset's scopes and contract-major-1 compatibility values.

Each CSS entry compiles its Theme SCSS source plus the selected compatibility mixin. No compiled CSS blocks are extracted; `@supports`, `@media`, selector scope and declaration order are retained. The aggregate retains its original source order.

## SPA runtime

`getTheme/getServerTheme/subscribeTheme` work with React `useSyncExternalStore`. Each browser Window owns its runtime and registry; switching persists under `virgo-design.theme-style.v1`, synchronizes storage events, and works in memory if storage is denied. An external root `data-virgo-theme` change also synchronizes subscribed consumers. `initializeTheme({ defaultTheme, storage })` supports an existing versioned settings record through the `ThemeStorage` codec. Theme switching leaves Appearance in the consumer's existing state.

## First paint and SSR

`getInitialThemeScript(options)` provides a synchronous head bootstrap. Place it after charset and before styles/application modules, with your CSP nonce. It restores Theme + Appearance, supports independent keys or a versioned JSON record, recognizes auto/system and saved-value migrations, and sets color-scheme before rendering. Website and Golden Pro use the same Vite integration.

For SSR, use a request-owned `createThemeRegistry()` and `createThemeRuntime({ registry, initialTheme })`. The factory does not access browser state unless you pass `window`. `resolveTheme()` is pure; `getThemeAttributes()` supplies both scope attributes. Render the server preference, pass that state to the client, and `hydrateTheme(state)` on a stable client instance. Its `getServerTheme()` remains the hydration snapshot after later switches. If cookies are authoritative, bootstrap can use `respectServerAttributes: true`.

The SPA convenience functions do not store mutable server preferences. Server `getTheme/getServerTheme` return Virgo; server `initializeTheme` returns only that call's result. Server `setTheme/registerTheme` require a request instance. Never use them as a Next.js request store.

## Third-party themes

```ts
import { getDefaultThemeTokens, validateThemeContract } from '@virgo-design/tokens';
import { getThemeCss, registerTheme, listThemes } from '@virgo-design/themes';
const base = getDefaultThemeTokens();
const tokens = {
  light: { ...base.light, '--vd-brand-primary': '#2252ad' },
  dark: { ...base.dark, '--vd-brand-primary': '#9dbfff', '--vd-brand-foreground': '#10203a' },
};
const result = validateThemeContract({ contractVersion: 1, tokens });
// Build/import studio.css from getThemeCss('studio', tokens).
registerTheme(
  {
    id: 'studio',
    name: 'Studio',
    contractVersion: 1,
    appearances: ['light', 'dark'],
  },
  tokens,
);
listThemes(); // official + registered
```

Both registry and browser convenience APIs require `registerTheme(theme: ThemePreset, tokens: ThemeTokens): void`. On the server, call the method on your request registry. Registration validates actual declarations: version, required omissions, unknown/deprecated roles, invalid values and CSS alias cycles. All 94 semantic colors and 6 elevation values are required in both appearances; presentation/typography have optional fallbacks. `getDefaultThemeTokens` is an explicit author choice, not automatic registry filling. TypeScript rejects metadata-only registration; JavaScript misuse still reports missing roles.

Validation returns `missingOptionalRoles.light/dark` without making a partial theme invalid. `completeness.required/optional/overall` each reports `{ implemented, total, percentage }`: one role in one appearance is one slot (200 required + 708 optional = 908 overall). Unknown/deprecated/invalid values do not increase coverage. Only-required implementations remain valid; omitted optional roles are visibly listed as shared baseline/component fallbacks.

`ThemePreset` contains only `id`, `name`, `contractVersion` and `appearances`. It has no consumer translation keys. Website/Pro maintain their own localized labels and descriptions keyed by official ID; third-party authors supply a generic display name.

### Third-party first paint

```ts
import { getDefaultThemeTokens } from '@virgo-design/tokens';
import {
  createThemeRegistry,
  createThemeRuntime,
  getInitialThemeScript,
  getThemeAttributes,
  resolveTheme,
} from '@virgo-design/themes';

// Share this definition between build, server and client, not its mutable instance.
export function createAppThemeRegistry() {
  const registry = createThemeRegistry();
  registry.registerTheme(
    {
      id: 'studio',
      name: 'Studio',
      contractVersion: 1,
      appearances: ['light', 'dark'],
    },
    getDefaultThemeTokens(),
  ); // Supply the same authored tokens in every environment.
  return registry;
}
const serverRegistry = createAppThemeRegistry();
const state = resolveTheme({ theme: 'studio', appearance: 'dark' }, serverRegistry);
const attributes = getThemeAttributes(state, serverRegistry);
const script = getInitialThemeScript({
  registry: serverRegistry,
  defaultTheme: 'studio',
  defaultAppearance: 'dark',
  respectServerAttributes: true,
}); // Put synchronously before CSS; render attributes and serialize state.
const clientRegistry = createAppThemeRegistry();
const runtime = createThemeRuntime({ registry: clientRegistry, initialTheme: state.theme, window });
runtime.hydrateTheme(state); // Before rendering; retain this stable client instance.
```

For saved SPA preferences, generate the script with the same full registry and the relevant storage keys. Its first attribute write recognizes registered third-party IDs. It preserves an existing `dir`; language direction belongs to the consumer. Load the custom CSS at first paint as well: registration/bootstrap do not download a stylesheet. See the architecture example for server/client snapshot boundaries.

Official and migration IDs are reserved; duplicate IDs throw. `themePresets/themeRegistry` remain immutable official-only data. Existing Website/Pro selectors intentionally list those six; custom selectors use `listThemes` and own their labels/translations. Registration does not install CSS.

Local scopes carry **both** `data-virgo-theme` and `data-theme`; use `getThemeAttributes`. Portals propagate Theme/Appearance/direction, including pointer-follow paths and live ancestor changes. `PortalProvider` handles arbitrary local CSS variable overrides by placing the real portal in that container.

## Contract and compatibility

`THEME_CONTRACT_VERSION` is a breaking CSS-contract major. Optional additions do not increase it. `tokenCatalog/themeContractRoles` describe current layers/required/fallback; `themeContract` retains major-1 compatibility keys. Foundation scales stay stable, while Semantic/Component roles express visual differences. Runtime behavior changes and the CSS-free JS root require package migration notes independently of the CSS major.

The complete ownership rules, typography, density, motion, Chart presentation, SSR and multi-stack examples are in [Token architecture](../../docs/architecture/token-system.md). Saved ID and deprecated role rules are separate in [Compatibility policy](../../docs/architecture/theme-compatibility.md).

## Glass material

Glass's dense popups use 88% neutral coverage / 24px blur; cards retain the larger-surface recipe. Chart tooltips use separate 78% coverage / 8px blur. Each surface applies blur to its own material layer; no-blur/reduced-transparency modes use opaque neutral surfaces. Window controls are a Pro widget composition, not a public Theme role. Contrast retains black/white option selection and explicit focus/boundaries.
