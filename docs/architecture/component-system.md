# Component architecture

Primitives own React interaction and accessibility behavior. UI adds Virgo presentation and
built-in component text. Applications own business state, data access and product composition.
Public usage belongs in the [UI README](../../packages/ui/README.md),
[Primitives README](../../packages/primitives/README.md) and Website API reference. This guide
defines package responsibilities, shared behavior and component maintenance.

## Ownership and public boundaries

| Layer            | Owns                                                                                                            | Does not own                                                           |
| ---------------- | --------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| Primitives       | State protocols, keyboard and pointer behavior, focus, native semantics and accessibility relationships         | Theme recipes, application routing or business validation              |
| UI               | Component styling, visual variants, density and built-in locale text, composed over primitives where applicable | Application data, permissions or product workflows                     |
| Internal modules | Capabilities shared by multiple components in their package                                                     | Supported consumer imports or unrelated component-specific behavior    |
| Applications     | Queries, mutations, routing, permissions, translations, layout composition and unsaved drafts                   | A second implementation of an available public component's interaction |

Keep implementation, public `*.types.ts`, tests and the family index together under each package's
`src/components/<Family>`. UI styles and metadata stay with their component. UI-only components
are valid when no reusable headless behavior is needed.

Consumers use the package root or declared subpaths. UI also exposes `/locale`, `/metadata` and
`/styles.css`. Shared providers such as `PortalProvider`, and UI's `LocaleProvider`, are public
capabilities. Private hooks and helpers remain internal; an emitted declaration dependency is
not a supported deep import. The package `exports` maps define the actual entry points.

## Shared behavior

Reuse the existing [primitive internal capabilities](../../packages/primitives/src/internal)
for controlled state, refs, portals, positioning, dismissal, focus, modal isolation and presence.
Keep component-specific selection, keyboard and value protocols in their owning family.

Menus share collection, item and submenu behavior through the internal menu modules. Action menus
and destination navigation have different semantics: Menu, ContextMenu and Menubar do not become
routers or permission systems, and NavigationMenu remains destination-oriented. A displayed
shortcut is not an application key binding.

Overlay consumers reuse the existing layer stack and theme/direction propagation. Nested
portalled children must participate in dismissal and focus ordering. Each component still chooses
its own modal behavior and lifetime; sharing positioning does not imply sharing every keyboard
rule or closing animation.

## Consumer styling and localization

Preserve `className`, `style`, refs, native attributes and semantic behavior on the documented
root, control and compound parts. When a wrapper needs customization, expose a named slot or
part prop instead of requiring positional selectors. Prefer an existing styling surface over
adding a product-specific variant to the public component.

UI owns built-in text through its complete `UILocale` packs in `@virgo-design/ui/locale`.
`LocaleProvider` selects or scopes a pack; English is the default. Applications extend a full pack
for wording overrides and connect their language setting to the provider. Business copy and
application translation keys stay outside UI and Primitives.

Forms and data controls preserve native semantics where possible. Applications own submission,
business validation, data ordering, filtering, paging and persistence. Presentation or selection
controls alone do not make Table a virtualized data grid. Add shared abstractions when multiple
components need the same behavior.

## Layout and surfaces

Layout owns region semantics and sidebar state. UI Layout adds composition, dimensions and
responsive behavior; Surface owns fills, materials, borders, radii and elevation. NavigationMenu
owns navigation interaction. The application supplies destinations, logo, settings, permissions,
compact labels and scroll ownership.

Keep one main landmark per page. `Layout.Content` defaults to `main`; use `as="div"` for nested
regions and embedded examples. Keep accessible labels when visually reducing navigation to icons.
Collapsed regions preserve their intended state while hidden/inert, and a reachable trigger must
remain available when their width is zero.

`collapseBelow` observes the viewport, not a demonstration frame. Sidebar overlay/floating modes
are local layout capabilities; they do not supply modal navigation, background isolation or a
focus trap. Compose an application-level Dialog when those behaviors are required. Local floating
actions and viewport-fixed controls also have different scroll ownership.

## Changing a component

Repair a missing reusable capability in its owning layer, then adopt it in consumers. Verify the
actual contract: controlled/uncontrolled updates, disabled/read-only behavior, keyboard and focus,
native forms, refs and styling props, portal scopes and reduced motion where relevant. Preserve
existing contracts when composing one family from another.

Update canonical public types/JSDoc, metadata, executable examples and co-located Website locales
when the public contract changes. Regenerate the [API reference](api-documentation.md) rather than
maintaining a handwritten prop table here. Website-specific ownership and example conventions
are covered by [Website maintenance](website-maintenance.md).
