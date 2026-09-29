# Components and internal capabilities

`packages/primitives/src/components/` contains the unstyled public component families. `packages/ui/src/components/` contains their styled public counterparts (including UI-only Surface and SegmentedControl). Each family keeps its implementation, public types, tests and index together; UI metadata and Sass remain beside the component.

Both package root indexes export only component families and their documented types. `ui/src/metadata/` remains a separate public metadata entry for compatibility. No runtime helpers are exported from either package root, and package `exports` allow only the existing root, UI metadata and stylesheet paths. Internal declaration files may be emitted as dependencies of public types; that does not create a supported subpath export.

## Website import boundaries

Within `apps/website/src`, `@` always resolves to the `src/` directory. Imports that cross a
top-level source domain use that alias, for example `@/shared/...`, `@/i18n`, `@/components/...`,
or `@/features/...`. They must not climb across domains with paths such as
`../../../shared/...` or `../../../i18n`.

Dependencies that stay inside a feature or module remain relative. Imports such as `./Foo` and
`../components/Foo` communicate local ownership and should not be mechanically rewritten as
`@/features/...`. A deep relative path is therefore reviewed by the boundary it crosses, not by
depth alone.

An `index.ts` is reserved for a real module public API, such as `DocumentationSidebar`,
`DocumentationCatalogue`, `DocumentationDetailShell`, or `ApiReference`. External consumers use
that public API instead of importing the module's private implementation files. Private feature
hooks, utilities, and components stay directly imported with local relative paths; do not add a
barrel to every directory for uniformity.

Every retained `index.ts` is a pure barrel containing only exports or re-exports. Runtime setup,
state, helpers, and side effects live in responsibility-named implementation files. Tests follow
those implementation files (`runtime.test.ts`, `locale.test.ts`, and so on); do not create
`index.test.ts` or `index.test.tsx` files or test a barrel itself.

Generated sources follow the same boundaries. When a generated import changes, update the
generator and regenerate the output rather than editing the generated file directly.

## Website i18n ownership

The Website keeps one default i18next `translation` tree and always calls
`useTranslation()` without namespaces, `keyPrefix`, or business-owned generics. Keys include their
top-level product domain, such as `app.*`, `foundations.*`, `tokens.*`, `components.*`,
`primitives.*`, `docs.*`, or `icons.*`.

Locale text is owned beside the business that renders it. Each participating layout, page, feature,
component, or docs module keeps matching `locales/en-US.ts` and `locales/zh-CN.ts` files. English is the
canonical schema; every Chinese fragment must satisfy `LocaleOf<typeof englishFragment>` so missing
or extra keys fail TypeScript. `apps/website/src/i18n/registry.ts` is the explicit composition root
that assembles those fragments into the single runtime tree.

`apps/website/src/i18n/` owns only initialization, registry composition, language persistence and
switching, font application, shared typing, parity infrastructure, and translation bridges. It is
not a central store for feature copy.

Business components use `useTranslation()` only for `t` and use `useAppLocale()` when they need the
normalized current `AppLocale`. Direct reads from the i18next instance are confined to i18n
infrastructure. The public `@/i18n` barrel intentionally does not expose that instance.

## Shared behavior

`primitives/src/internal/` owns behavior used by more than one component:

- `utils/composeRefs.ts`: forwarding DOM refs while retaining the internal ref, used by Checkbox, Select, Dropdown and Popover.
- `hooks/useControllableState.ts`: undefined distinguishes controlled from uncontrolled state; identical values do not emit change callbacks. Select, Dropdown and Popover share it. Its silent local reset supports disabled lifecycle changes.
- `overlay/Portal.tsx`: document-body portal, safe to render without a document.
- `overlay/positioning.ts` and `useFloatingPosition.ts`: physical/logical placement, offset, viewport flip/shift, arrow coordinates, scroll/resize observation and portal theme/direction synchronization. Dropdown and Popover use these.
- `overlay/dismiss.ts`: outside pointer/focus and Escape with a small parent/child layer stack. Nested portalled children dismiss before their parent. Select participates while retaining its existing outside-focus and Escape behavior.
- `overlay/focus.ts`: focus entry and conditional focus return. Menus keep their own roving item navigation and typeahead; arbitrary Popover content keeps normal Tab navigation.
- `overlay/useHoverIntent.ts`: crossing delay and timer cleanup. Components choose whether focus should hold the panel open.
- `overlay/usePresence.ts`: Popover's exit lifetime reads the actual CSS animation duration, making reduced-motion and unstyled content immediate.

`ui/src/internal/overlay/_panel.scss` shares the existing Classic UI surface and arrow treatment. It adds no tokens or public Overlay component. Dropdown keeps its previous styling and immediate unmount behavior; Popover opts into entry/exit motion.

Select only extracts refs, controllable state and outside dismissal in this pass. Its inline listbox, sizing and keyboard behavior remain intact. Checkbox only shares ref composition: native input state and group notification semantics remain unchanged. Tabs registration and Pagination's coupled page/size clamping are intentionally component-owned.

New overlay consumers should first reuse these small capabilities. Do not export internal utilities, invent a public Overlay API or generalize component-specific keyboard semantics into the positioning layer.

## Migration and verification

Source directories now use PascalCase family names. Root imports such as `import { Button, Dropdown, Popover } from '@virgo-design/ui'` remain stable, as do the existing metadata and CSS entry points. Apps resolve those entry points rather than component file paths. Old flat directories and Dropdown-local positioning code are removed; documentation links follow their new paths.

Verification covers the existing component suites, public export boundaries, shared positioning/listener lifecycle, nested overlays, Popover focus/controlled state/motion/theme/RTL, Playground integration and `pnpm all` (including the website and all playground builds).
