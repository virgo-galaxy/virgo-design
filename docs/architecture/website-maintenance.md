# Website maintenance

The Website consumes Virgo's public packages and owns documentation structure, examples,
localization and page composition. This guide covers maintenance conventions; component behavior
belongs to [the component layer](component-system.md), while public API facts follow
[the API generation workflow](api-documentation.md).

## Ownership and composition

| Concern                                                            | Owner                                                                       |
| ------------------------------------------------------------------ | --------------------------------------------------------------------------- |
| Catalogues and ordinary page landmarks                             | AppLayout                                                                   |
| Component and Primitive detail shell, navigation and main landmark | DocumentationDetailShell                                                    |
| Standalone example route and its main landmark                     | StandaloneExamplePage, outside AppLayout                                    |
| Documentation sections, captions and source controls               | ArticleSection and ComponentExample                                         |
| Shared visual and interactive capabilities                         | Public Layout, Surface, Table, Dock, NavigationMenu and other UI components |
| Local geometry, typography, specimen backgrounds and overflow      | Website composition styles                                                  |

Keep one main landmark, including during loading. Embedded Layout examples use
`Layout.Content as="div"`. Preserve the `website-main` skip target where the Website shell supplies
skip navigation. Decorative mockup regions do not introduce extra page landmarks.

Use public UI components for product controls and customize them through supported classes,
slots, props and CSS variables. Add missing shared behavior to its owning package. Headless
component documentation and token specimens can use primitives or native controls to demonstrate
their behavior or raw visual values.

## Imports and module APIs

Within `apps/website/src`, `@` resolves to `src`. Imports crossing top-level domains use `@/`;
imports inside the same feature or module remain relative. Use a module's public API when one
exists instead of importing its private files.

An `index.ts` represents a real public module boundary and contains exports only. Keep runtime
setup, state, helpers and side effects in responsibility-named implementation files, with tests
beside those implementations. Do not add a barrel to every private directory.

## Localization

The Website uses one default i18next `translation` tree and `useTranslation()` without namespaces,
`keyPrefix` or business-owned generics. Keys include their product domain. Copy lives beside its
owning layout, page, feature, component or example in matching `locales/en-US.ts` and
`locales/zh-CN.ts` files. English defines the schema; Chinese fragments satisfy
`LocaleOf<typeof englishFragment>`.

[The i18n registry](../../apps/website/src/i18n/registry.ts) explicitly composes those fragments.
The i18n module owns initialization, language persistence, fonts and typing, not all feature text.
Business components use `useAppLocale()` for normalized language and `useTranslation()` for text;
the public i18n barrel does not expose the engine instance. The application `LocaleProvider`
connects this language to UI's built-in packs. Generated API descriptions follow their separate
[localization contract](api-documentation.md#localization).

## Executable examples and source

An example is one understandable use case, with its state, fixtures and handlers owned locally.
Pages assemble sections and examples rather than owning every demonstration's interaction.
Use neutral fixtures with matching English/Chinese text.

Keep an example under `src/examples/components/<component>/` with:

- `*Example.tsx`: a default `App` component using public React/Virgo APIs and its companion styles.
- `*Example.module.scss`: presentation belonging to that example, independent of page-owned styles.
- `examples.ts`: stable IDs, captions, locale keys, executable imports and paired source imports.

The manifest imports TSX normally to execute it and with `?raw` to obtain its source. The SCSS
source uses `?virgo-raw`, handled by
[the raw SCSS plugin](../../config/raw-scss-source-plugin.ts).
[createExampleSource](../../apps/website/src/examples/components/create-example-source.ts)
derives portable English React source by removing or resolving Website localization dependencies.
ComponentExample normalizes the companion stylesheet import for consumers and omits the SCSS tab
when the file has no meaningful rules. Do not maintain a second handwritten snippet, reconstruct
JSX from the DOM or execute copied source text.

Use the existing [Button manifest](../../apps/website/src/examples/components/button/examples.ts)
as a reference. Public installation requirements stay in package READMEs instead of being repeated
in every example. Changing source normalization belongs in the shared transformer and its tests.

## Runtime isolation and interaction

`ComponentExample` owns source disclosure, tabs and copy feedback. Opening source keeps the live
example mounted. Copy writes the active source and reports success only after the clipboard write
resolves; denied access offers failure feedback and retry. Preserve accessible action labels,
disclosure relationships, unique IDs, announcements and cleanup of pending work.

`ComponentExampleRuntimeProvider` coordinates a page's Expand all/Collapse all control. Disclosure
belongs to each mounted instance, so rendering one definition twice does not merge state or IDs.
Removing an instance must remove its registration. Bulk disclosure changes source-panel visibility
without changing the live examples' menus, dialogs or notifications.

Keep shortcuts, form names, notification providers and timers local to an example so several
examples can run independently on one page. Use the existing shared runtime rather than adding a
second documentation framework.

Standalone examples reuse the same executable modules through
[the lazy registry](../../apps/website/src/examples/components/standalone-example-registry.ts).
`/examples/:exampleId?theme=light|dark` selects the example's light/dark appearance. The route omits
Website navigation and source controls. Keep IDs aligned with the registry's filename convention.

## Loading and verification

Component route metadata and the standalone registry keep example modules lazy. Initial i18n
imports API description strings rather than full declaration registries. Preserve shell, sidebar
and skip-target ownership across Suspense boundaries. Use Skeleton/Spinner components and
localized accessible status while content loads.

Relevant checks live beside ComponentExample, the example manifests, source normalization,
StandaloneExamplePage, i18n and the affected page or component. For behavioral changes, verify
paired sources, English/Chinese copy, independent instances, keyboard/focus behavior, clipboard
failure/retry, lazy loading and the page's landmarks as applicable. `pnpm all` is the full workspace
validation command; API changes also require the [generation check](api-documentation.md#workflow).
