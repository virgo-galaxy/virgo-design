# Tokens and themes architecture

Tokens define the shared visual contract; Themes implement it; UI, Charts and applications
consume it. Package entry points and installation examples live in the
[Tokens README](../../packages/tokens/README.md) and [Themes README](../../packages/themes/README.md).

## Ownership

| Concern                                   | Owner                                      | Rule                                                                                                  |
| ----------------------------------------- | ------------------------------------------ | ----------------------------------------------------------------------------------------------------- |
| Reference scales, palettes and font data  | Tokens foundations                         | Keep raw values independent of a particular theme or application.                                     |
| Shared visual purposes                    | Tokens semantic roles                      | Share a role because its purpose is shared, not just because values happen to match.                  |
| Component-specific presentation           | Tokens component roles                     | Add a role only when the existing foundation and semantic roles cannot express a real component need. |
| A visual language's concrete values       | Themes                                     | Implement the contract without introducing business selectors or component structure.                 |
| Per-instance dimensions and configuration | Component props and local styling surfaces | Keep layout widths, placement and instance overrides local.                                           |
| Product composition and business settings | Applications                               | Keep Pro window controls, Website decoration and page geometry outside the public theme contract.     |

The canonical data lives in [Tokens source](../../packages/tokens/src/source.ts),
[the catalog](../../packages/tokens/src/catalog.ts) and
[the presentation contract](../../packages/tokens/src/theme-contract.ts).
CSS, SCSS, Tailwind and vanilla-extract integrations derive from that data; do not maintain
parallel token values or edit generated `dist` files. UI and Charts do not import an official theme.

## Contract and validation

`tokenCatalog` records each role's layer, required state and light/dark fallback.
`tokenVars` supplies typed CSS references. `themeContractRoles` defines the roles a theme may
implement; `themeContract` contains the current presentation roles.

Validate theme declarations with `validateThemeContract`, rather than validating computed styles
that may already have inherited a fallback. Contract-version mismatches, missing required roles,
unknown roles, invalid declarations and variable cycles reject a theme. Missing optional roles
are reported but use their documented fallback. Coverage measures explicit valid declarations,
not how different a theme looks.

Theme authors may explicitly start from `getDefaultThemeTokens()` and override the needed roles.
Foundation values are not theme-overridable contract roles. Component-local variables remain
local styling APIs rather than requirements for every theme.

`THEME_CONTRACT_VERSION` identifies the breaking CSS contract major. An additive optional role
with a fallback does not require a new major. The current unpublished project does not retain
legacy theme IDs, deprecated variable aliases or a migration layer. Unknown saved IDs fall back
to the configured default without rewriting storage merely because it was read.

## Theme, appearance and styles

Theme selects a visual language through `data-virgo-theme`; appearance selects light/dark through
`data-theme` and `color-scheme`. Applications own the light/dark/system preference. Changing a
theme does not itself change that preference. Use `getThemeAttributes` for resolved scopes.

Load styles in this order: Tokens, Themes, UI, then application styles. The Themes JavaScript
entry does not load CSS implicitly. Consumers load all official themes or the required theme
stylesheet explicitly. Custom theme registration also does not insert its CSS: generate it with
`getThemeCss` and include it in the consuming application.

Portalled UI follows the nearest theme, appearance and direction scope, including changes while
open. Use `PortalProvider` when a local container must preserve arbitrary inherited CSS variables;
copying theme attributes alone cannot preserve every inline override. Component behavior,
semantics and business data stay independent of the chosen theme. Motion consumers retain
`prefers-reduced-motion` handling; a single zero-duration token is not a complete substitute.

## Browser persistence and first paint

The browser convenience runtime uses `virgo-design.theme-style.v1` by default. Applications can
supply their own storage adapter. All Pro variants own an unversioned `virgo-pro:settings` record
with `theme` and `appearance` fields, using defaults from their `src/config/settings.json`.
Runtime hydration, the initial script and cross-tab synchronization must read that same format.

`getInitialThemeScript` runs synchronously before styles and application modules. Vite consumers
use [the shared bootstrap plugin](../../config/theme-bootstrap-plugin.ts); Next consumers embed
the script in their root layout. Match the runtime's storage key, fields, defaults and registry;
do not add a version requirement to an unversioned record. Denied or malformed storage falls back
to defaults. Attach the application's CSP nonce when required.

When server-resolved attributes are authoritative, use `respectServerAttributes` so the initial
script preserves them. Otherwise, use the script to restore browser-owned preferences before
paint. Theme CSS must already be available; the script does not download it.

## SSR and custom registries

Create a `createThemeRegistry()` and `createThemeRuntime()` per server request. Without an explicit
`window`, the runtime does not access browser storage or the DOM. Do not put request preferences
in a module-global mutable instance. Browser convenience APIs belong to their Window.

Resolve the server state with `resolveTheme`, render its attributes with `getThemeAttributes`, and
hydrate a stable client runtime from the same snapshot. `getServerTheme` preserves the hydration
snapshot while `getTheme` tracks later changes; React consumers subscribe with
`useSyncExternalStore`. Dispose owned runtime listeners when their owner is removed.

Register a custom theme with metadata and actual light/dark declarations on each environment's
registry before resolving state or generating bootstrap. Server, bootstrap and client need the
same registry definition, not the same mutable instance. Official IDs cannot be replaced.
`themePresets` is the official selector list; `listThemes()` also includes registered extensions.
Applications own selector labels and translations.

Use the implementation and its tests for detailed behavior:
[registry](../../packages/themes/src/registry.ts),
[runtime](../../packages/themes/src/runtime.ts),
[resolution](../../packages/themes/src/resolution.ts) and
[bootstrap](../../packages/themes/src/bootstrap.ts).
