# Website self-hosting

The Website uses Virgo public packages for reusable interaction and presentation. Website-owned
composition defines document geometry and typography; public components own state, keyboard,
focus and semantic behavior.

## Ownership

| Responsibility                                                | Owner                                         |
| ------------------------------------------------------------- | --------------------------------------------- |
| Main landmark for catalogues, Foundations, Tokens and Icons   | AppLayout                                     |
| Main landmark for Component and Primitive detail routes       | DocumentationDetailShell                      |
| Main landmark for standalone examples                         | StandaloneExamplePage, outside AppLayout      |
| Embedded content and Layout demonstration regions             | Layout.Content with `as="div"`                |
| Header, navigation dock, detail lanes and collapsible sidebar | Virgo Layout, Dock and NavigationMenu         |
| Documentation headings, examples, API data and relationships  | Existing Website documentation infrastructure |
| API declaration / public-type fill, border and radius         | Virgo Surface                                 |
| API table semantics, scroll viewport and internal row rules   | Virgo Table                                   |
| Public API facts and English descriptions                     | Public types/JSDoc and the API generator      |
| Local geometry, typography and color presentation             | Website composition styles                    |

Product mockup sidebars and decorative navigation rows remain ordinary composition regions,
not extra Website navigation/complementary landmarks. Actual Color Studio side tools are named.
Each finished page has one main landmark. The Website skip link is the first keyboard stop and
points to the focusable `website-main` region. Sticky header offsets are Website-owned. Sidebar
navigation retains its collapse/inert protocol and route focus behavior. Footers stay outside main.

## Reuse and deliberate native content

API declaration and public-type frames use Surface's existing tone/border/radius capabilities,
with consumer-provided named regions. The table uses `border="separators"` for internal row rules;
the frame owns the outer edge. Website retains content layout, clipping, code typography, column
ratios and dividers between different content regions. Card's prescribed padding/grid is not needed
for this full-width document composition.

API references and semantic typography tables use Virgo Table. Typography tables retain their
original widths, padding, transparent surfaces, tabular numerals, heading weight and local border
rules. Named Table.Viewport regions permit keyboard horizontal scrolling on narrow screens.
International font previews use UI Tabs for keyboard movement, activation and associated
panels. Consumer classes style the native tab, item and label separately without changing their
relationships. Icon selection uses UI Select with `renderValue`, `indicator` and stable value,
option-label, check and viewport slots; it retains the existing glyph/text layout.

Color Studio consumes UI ColorPicker's compound editor for its opaque sRGB palette. The primitive
owns RGB/HSV conversion, draft commit/reset, read-only/disabled state, native submission and
Popover behavior. Area supplies named saturation and brightness keyboard ranges and a pointer
plane. UI owns styling and exposes panel/area/hue/thumb CSS variables. Other consumers can use
alpha values and the built-in full or simple Panel without maintaining a second editor.
Wide-gamut and OKLCH output remain outside the component contract.

Palette mode, color model, export format and scale naming use SegmentedControl. Reset, copy, scroll,
family selection and color-step actions use UI Button with consumer classes and the named label/icon
slots. Family editor text fields use UI Input with separate rootClassName and control className.
The create/explore/export journey uses UI Steps; its ordered items and optional triggers retain
consumer-owned progress/navigation. Metrics use Surface. Status-color supplementary values use UI
Collapsible, composed from the existing headless behavior and Button.

Copy feedback continues to use useSourceCopy, including pending, success, failure, retry and cleanup.
Family Editor is inert while hidden. Native links retain real href navigation or download semantics.

## Strict consumer boundary

1. When UI has the required behavior, Website must consume `@virgo-design/ui` and customize its
   visual presentation with className, style, named slots or CSS variables.
2. A missing public styling/behavior capability is repaired in the owning component with contract
   coverage; it is not a reason to fall back to headless or raw HTML controls.
3. A reusable pattern absent from UI becomes a public component, as with Steps and Collapsible.
4. Native/domain implementations need a narrow, explicit reason in their owning source or contract.
   “Different style”, “editorial” or “Website composition” alone are insufficient.

Production modules have no direct Primitive imports. Primitive documentation and intentional
custom-render/headless examples remain explicit demonstration consumers. The two remaining native
control fixture modules are SemanticThemePreview and TypographyCompositionPreview: their purpose
is to compare individual token recipes and explicit hover/active values, not to execute product
commands. They keep the measured values visible without a component's own state recipes. The
regression test names exactly those modules; it does not whitelist whole product directories.

Color data calculation, swatch geometry, palette visualization, typography specimens and motion
containers remain domain presentation. Their ordinary buttons/inputs still consume UI. Three native
links retain actual href/rel/download semantics. Family-row pointer/focus capture selects the color
identity associated with its Input; it is not a separate unlabeled keyboard action. Carousel enter/
leave/focus capture pauses its local motion; these containers do not implement separate controls.

Tree, Calendar, DatePicker, TimePicker and Timeline are demonstrated in their documentation without
inventing an unrelated Website workflow. General component APIs remain driven by an actual consumer.

## API feedback

The added `Layout.Content as="main" | "div"` capability belongs to the primitive's semantic
contract. The default remains main, UI inherits the choice, and both layers verify semantic DOM,
refs and class/native prop forwarding. Callback ref stability and React ref cleanup are also tested.
Generated API references and co-located Chinese description overrides document the capability.
There are no docs/Website-specific component props.

UI Table adds `border="separators"` for tables inside framed containers. It divides adjacent rows
within and across nonempty sections, including headerless tables, and does not draw outer edges.
Existing `none`, `rows` and `all` behavior is unchanged. Generated English JSDoc, the Chinese API
override and the density/border example document the option. No Surface API is added because its
existing border/radius/tone and native attributes already supply the required frame contract.

## Documentation and module boundaries

Component documents use `component-page`, family-specific `*-page` anchors, `data-docs-section`
and existing ArticleSection infrastructure. Component sidebar links retain formal English identifiers. Their second line shows a short purpose
in English and the family name in Chinese. Primitive sidebar links retain `Headless` in English and
show the family name in Chinese. Icon geometry uses `icon-specimen`; genuine geometry
and semantic-color review controls retain review terminology. No second documentation framework
or large directory migration is introduced.

Cross-domain imports use `@/`; local module imports remain relative. Public package imports use
root/official subpath exports. Website index files remain export-only barrels. Business locales
remain co-located and English remains the canonical schema. API English text remains canonical
JSDoc; technical identifiers, token names, formats and brand names stay intact.

## Loading boundaries

The API generator writes separate UI facts, primitive facts, lean English description resources
and a compatibility barrel. Initial i18n imports the lean text, not full declaration/type metadata.
Detail features import their own registry. Component metadata holds lazy page components; the
catalogue does not load all detail examples or their consumer source. The standalone example glob
continues to lazy-load one example. Initial route and standalone pending states compose public
Skeleton and Surface into Website-owned page, catalogue, document, example and section placeholders.
The local Components content boundary uses public Spinner with a localized accessible label; its
status has no visible text. Skeleton feedback retains a clipped live status outside the busy
decorative region. Neither language renders visible loading text. The existing Header/Dock remain mounted. Component content and relationship modules have
local boundaries so they do not replace the document shell or sidebar. Initial detail placeholders
provide their own main/skip target; other routes retain AppLayout's main. Existing Skeleton animation
and reduced-motion behavior are reused. These states follow actual pending work with no artificial
delay, progress percentage or new public Skeleton API.

Framework, i18n engine, motion and translation resources have explicit cacheable chunk groups.
This preserves synchronous locale registration and avoids per-key/per-example dynamic imports.
The implementation uses the installed bundler's [code splitting groups](https://rolldown.rs/reference/OutputOptions.codeSplitting);
chunk warning thresholds are unchanged.

## Reference compositions and remaining controls

All component reference heroes use the Website-owned ReferenceSpecimen composition. Surface owns
its outer tone, border, radius and elevation; shared Website styles own geometry, toolbar/caption,
background grid and specimen-specific arrangements. Interactive content and special Dock/Surface
stages retain their own public behavior. Version metadata and sidebar status use Tag; local styles
only retain typography where the document requires it.

DocumentationSidebar delegates its native trigger, collapsed state, ARIA relationships and action
labels to Layout.SidebarTrigger and the UI LocaleProvider. It supplies the edge
placement and chevron presentation. Dock selection examples compose SegmentedControl; overlay form
examples compose Form/Field while retaining native form submission and external footer submit buttons.

API declarations and alias frames remain Surface compositions, with Table owning row separators
and scroll behavior. Kind labels use Tag. Card is used for the Primitive public API summary panel;
the surrounding aside owns sticky positioning and its landmark. The full TypeScript API heading
is co-located locale copy. No new public package API is required for these compositions. Drawer creates its own Root before
attaching compound parts; reusing Dialog.Root as an Object.assign target would overwrite Dialog
parts. It reuses Dialog behavior through composition, preserving native props and refs. Dock owns
intrinsic frame sizing independently from its normalized anchor position; when pinned, its maximum
dimensions use the existing captured insets so constraints still refer to the original Boundary.

## Product boundaries

Website self-hosting defines the Website consumer boundary. Shared visual ownership is described
in [Token architecture](token-system.md). DataTable and release delivery need their own consumer
requirements. Multilingual font CSS and eagerly registered bilingual text remain performance
considerations for Website loading.
