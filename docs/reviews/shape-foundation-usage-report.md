# Shape Foundation Usage Report

This report records observed Border and Radius usage across the Virgo Design repository.
It provides evidence for future Foundation and Semantic decisions but does not define tokens by itself.

- Date: 2026-09-15
- Source snapshot: `9b0d5a0`
- Scope: `apps/website`, `apps/primitives-playground`, `apps/ui-playground`, `packages/ui`
- Excluded: `packages/fonts`, dependencies, build output, tests, and the Shape Scale Preview added alongside this report
- Source inventory: 24 SCSS files; the two playground stylesheets contain no Border/Radius declarations, while package UI contributes its Button styles

> Historical scope note: the two standalone playground paths above existed in this audit snapshot and have since been retired. Their rows below remain as audit evidence, not links to current source.

## Method

- Parsed stylesheet declarations with PostCSS, including nested rules and responsive/state variants. Border shorthands were tokenized at top-level whitespace so values inside color functions are not mistaken for widths.
- Included physical and logical border shorthands, width/style longhands, `border-radius`, physical corner radius longhands, and logical corner radius longhands. There are no explicit corner longhands in this snapshot; corner variation appears in shorthands.
- Counted source value occurrences, not rendered objects, selectors in a comma-separated list, or final cascade/computed values. State/responsive declarations count separately. These counts do not establish how often a selector is mounted at runtime.
- Converted `rem` using the 16px browser-root baseline; the stylesheet roots do not set another font size. The package Button's `0.5rem` radius therefore contributes one 8px occurrence.
- Normalized unitless `0` to `0px`. A repeated value in a multi-value width/radius shorthand counts repeatedly: `8px 8px 0 0` contributes two 8px and two 0px radius components.
- Kept percentages, inherited keywords, and runtime-dependent expressions separate from numeric values. Color `var()` expressions do not make an explicitly declared border width/style dynamic.
- Inspected TS/TSX property assignments. The only applied Border/Radius inline styles in this snapshot are the existing Shape Foundation demonstrations, which iterate package values. They are documented separately and are not added as hardcoded usage counts. Other matches are translation keys or Semantic Color export data, not visual border declarations.
- Ordinary UI evidence includes controls, navigation, feedback, panels, and realistic UI/document preview containers. Actual specimen glyphs, swatches, chart cells/bars, and decorative shapes are separated. Existing scale demonstrations are not evidence of a formal component assignment.
- Excluded Border Color, SVG strokes, outlines/focus rings, inset shadow strokes, background-image rules, and decorative pseudo-element widths from Border Width/Style counts.

## Border Width Usage

There are 152 reliably normalized width occurrences and one runtime-dependent width expression. All 152 literal occurrences use the existing Foundation's 0/1/2px values. Nonzero literal borders are 116 occurrences at 1px and five at 2px.

| Value | Count | Main usages                                                                                  | Current Foundation    | Notes                                               |
| ----: | ----: | -------------------------------------------------------------------------------------------- | --------------------- | --------------------------------------------------- |
|   0px |    31 | Borderless actions, color metric dots, removed panel/row edges and responsive edge resets    | Yes, `borderWidth[0]` | Reset evidence, not a visible boundary              |
|   1px |   116 | Navigation, forms, panel/specimen boundaries, tables, chart baselines and package Button     | Yes, `borderWidth[1]` | Dominant visible literal width                      |
|   2px |     5 | Color metric marks, color-picker pointer, theme mark, selected family overlay and detail dot | Yes, `borderWidth[2]` | Concentrated selection/optical/preview evidence     |
| 0.5px |     0 | —                                                                                            | No                    | No literal evidence in scope                        |
|   3px |     0 | —                                                                                            | No                    | A 3px outline exists, but it is not Border evidence |

No literal width outside 0/1/2px, `thin/medium/thick` CSS width keyword, or unresolved standalone width `var()` appears in scope.

### Dynamic width

| Declaration                                | Count | Source                                                                                                                    | Treatment                                                                         |
| ------------------------------------------ | ----: | ------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| `max(1px, calc(var(--preview-size) / 10))` |     1 | [Layout preview icon specimen](../../apps/website/src/pages/foundations/components/layout-scale-preview.module.scss#L220) | Runtime-dependent object-size expression; not guessed or counted as a 1px literal |

The expression's `solid` style is deterministic and is included in Border Style Usage. Its color variable is outside this report's audit dimensions.

## Border Style Usage

Explicit style occurrences and shorthand resets are separated to avoid inventing an authored `none` keyword where the source only says `border: 0`.

| Style                                    | Explicit count | Main usages                                                                         | Current Foundation        | Notes                                                                                    |
| ---------------------------------------- | -------------: | ----------------------------------------------------------------------------------- | ------------------------- | ---------------------------------------------------------------------------------------- |
| solid                                    |            122 | UI/specimen boundaries, separators, tables, package Button, optical preview borders | Yes, `borderStyle.solid`  | Includes one style longhand and the dynamic-width specimen                               |
| dashed                                   |              0 | —                                                                                   | Yes, `borderStyle.dashed` | Available in existing Foundation demonstrations; no literal application-style occurrence |
| dotted                                   |              0 | —                                                                                   | No                        | No evidence in scope                                                                     |
| double                                   |              0 | —                                                                                   | No                        | No evidence in scope                                                                     |
| none                                     |              0 | —                                                                                   | No                        | See implicit shorthand reset count below                                                 |
| hidden / groove / ridge / inset / outset |              0 | —                                                                                   | No                        | No border-style keyword evidence in scope                                                |

There are also **31 implicit `none` resets** from zero-width border shorthands. These shorthands reset omitted style to `none`; they are not 31 explicit style declarations and do not establish a new style token. No unresolved border-style expression appears in scope.

## Radius Usage

141 radius declarations produce 147 authored radius components: 135 px-normalized components, 11 percentage components, and one inherited keyword. Categories below are mutually exclusive.

### Ordinary UI radius

90 numeric components belong to ordinary UI boundaries, including documentation/realistic composition containers. This is not a formal component-role mapping.

| Value | Count | Main usages                                                                   | Current Foundation | Notes                    |
| ----: | ----: | ----------------------------------------------------------------------------- | ------------------ | ------------------------ |
|   0px |     5 | Color Studio panel and family-editor corner resets                            | Yes, `radius[0]`   | Limited source evidence  |
|   4px |     1 | Base badge                                                                    | Yes, `radius[4]`   | Single source occurrence |
|   6px |     3 | Export/naming tabs, popover action and token tag                              | Yes, `radius[6]`   | Limited source evidence  |
|   7px |     8 | Segmented/global/theme options, editor inputs and icon actions                | No                 | Repeated source evidence |
|   8px |    10 | Package Button, reset actions, navigation, inputs and disabled-row surface    | Yes, `radius[8]`   | Repeated source evidence |
|   9px |    11 | Hex fields, navigation items, buttons, fill rows, derived aliases and tabs    | No                 | Repeated source evidence |
|  10px |     6 | Toast, segmented boundary, locale/menu options and form fields                | Yes, `radius[10]`  | Repeated source evidence |
|  11px |     6 | Engine note, family item and secondary/strong/overlay/popover surfaces        | No                 | Repeated source evidence |
|  12px |     3 | Foundation navigation, scale container and access status                      | Yes, `radius[12]`  | Limited source evidence  |
|  13px |     5 | Global controls, color picker, code block, status message and scale container | No                 | Limited source evidence  |
|  14px |     6 | Locale selector, token specimen/document/chart containers and source note     | No                 | Repeated source evidence |
|  15px |     1 | Brand scene container                                                         | No                 | Single source occurrence |
|  16px |     8 | Foundation containers, settings/summary surfaces and comparison frame         | Yes, `radius[16]`  | Repeated source evidence |
|  17px |     1 | Responsive Foundation section                                                 | No                 | Single source occurrence |
|  18px |     6 | Font specimens, Document/UI preview frames, product shell and family cards    | No                 | Repeated source evidence |
|  20px |     4 | Metric container and Colors journey selector                                  | Yes, `radius[20]`  | Limited source evidence  |
|  22px |     4 | Foundation section and builder/export/detail/editor panels                    | No                 | Limited source evidence  |
|  28px |     1 | Colors journey rail                                                           | No                 | Single source occurrence |
|  30px |     1 | Light/Dark semantic preview frame                                             | No                 | Single source occurrence |

### Full / pill radius

| Value  | Count | Main usages                                                                                                   | Current Foundation                                              | Notes                                                                                         |
| ------ | ----: | ------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| 999px  |     6 | Builder badge, paging indicator, picker hue track, motion/easing track, height specimen mark and status badge | No exact value; `radius.full` provides fully rounded capability | Large-radius/pill implementations, not circles                                                |
| 9999px |     0 | —                                                                                                             | Yes, `radius.full`                                              | Existing package-driven Foundation demo uses it; no independent literal stylesheet occurrence |

These six authored values remain recorded as 999px, not rewritten to 9999px. Pill behavior depends on object geometry, so implementation evidence and Foundation mapping are distinct.

### Circle

| Value | Count | Main usages                                                                                                            | Current Foundation         | Notes                                                    |
| ----- | ----: | ---------------------------------------------------------------------------------------------------------------------- | -------------------------- | -------------------------------------------------------- |
| 50%   |     9 | Total-color dots, toast glyph background, picker preview, live/source dots, theme/detail dot and round scale specimens | No direct percentage token | Circle/ellipse geometry; not automatically `radius.full` |

A square object's `50%` radius creates a circle. A nonsquare object's `50%` produces an ellipse, which is different from a pill with fully rounded ends.

### Special visual / preview radius

39 px-normalized components and two percentage components belong to specimen glyphs, swatches, chart bars/cells, and other visual shapes.

| Value | Count | Main usages                                                                    | Current Foundation | Notes                    |
| ----: | ----: | ------------------------------------------------------------------------------ | ------------------ | ------------------------ |
|   0px |     2 | Color picker saturation lower corners                                          | Yes, `radius[0]`   | Visual/specimen-specific |
|   1px |     2 | Bar-chart lower corners                                                        | No                 | Visual/specimen-specific |
|   2px |     1 | Data-token strip                                                               | No                 | Visual/specimen-specific |
|   4px |     3 | Theme swatches and bar-chart upper corners                                     | Yes, `radius[4]`   | Visual/specimen-specific |
|   5px |     3 | Sizing specimen, scale badge and diverging-chart bars                          | No                 | Visual/specimen-specific |
|   6px |     7 | Color metric/swatch marks, gap/combination specimens and heatmap cells         | Yes, `radius[6]`   | Visual/specimen-specific |
|   7px |     5 | Brand/neutral color metrics, family color marks and status glyph background    | No                 | Visual/specimen-specific |
|   8px |     5 | Color picker upper corners, padding specimen, semantic swatch and product mark | Yes, `radius[8]`   | Visual/specimen-specific |
|   9px |     2 | Sizing/opacity specimen stages                                                 | No                 | Visual/specimen-specific |
|  11px |     2 | Family card color and detail color specimens                                   | No                 | Visual/specimen-specific |
|  12px |     5 | Layout specimen stages, workspace mark and theme mark                          | Yes, `radius[12]`  | Visual/specimen-specific |
|  13px |     1 | Anchor color specimen                                                          | No                 | Visual/specimen-specific |
|  15px |     1 | Large color specimen                                                           | No                 | Visual/specimen-specific |

| Value | Count | Main usages                                                                 | Current Foundation | Notes                                                       |
| ----- | ----: | --------------------------------------------------------------------------- | ------------------ | ----------------------------------------------------------- |
| 28%   |     2 | Rotated icon specimen and rounded-square object specimens in Layout preview | No                 | Geometry-relative specimen curvature; not a fixed UI radius |

Comma-separated object selectors count as one declaration, not one occurrence per selector.

### Dynamic / inherited radius

| Value                     | Count | Main usages            | Current Foundation             | Notes                                                                                                              |
| ------------------------- | ----: | ---------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| inherit                   |     1 | Paging indicator thumb | No independent numeric mapping | Inherits the parent indicator's authored 999px; kept as inherited behavior instead of adding another literal count |
| Unresolved `var()/calc()` |     0 | —                      | —                              | No Radius expression of this kind in the scanned source                                                            |

### Foundation values with limited independent evidence

| Foundation    |  Value | All numeric source components | Ordinary UI components | Notes                                                                                       |
| ------------- | -----: | ----------------------------: | ---------------------: | ------------------------------------------------------------------------------------------- |
| `radius[4]`   |    4px |                             4 |                      1 | Most occurrences are swatches/chart corners                                                 |
| `radius[6]`   |    6px |                            10 |                      3 | More specimen/swatch occurrences than UI boundaries                                         |
| `radius[12]`  |   12px |                             8 |                      3 | Most occurrences are specimen stages or marks                                               |
| `radius[20]`  |   20px |                             4 |                      4 | Limited to Colors overview UI                                                               |
| `radius[24]`  |   24px |                             0 |                      0 | Package-driven Foundation demonstration exists, but no independent literal use              |
| `radius.full` | 9999px |                             0 |                      0 | Six 999px pill implementations are related capability evidence, not exact-value occurrences |

## Special / Optical Cases

- The five 2px borders are [color metric marks](../../apps/website/src/pages/colors/colors-overview.module.scss#L40), [picker pointer](../../apps/website/src/features/color-studio/components/controls/color-picker-popover.module.scss#L54), [theme dot](../../apps/website/src/features/color-semantic-preview/styles/color-semantic-preview.module.scss#L175), [selected family overlay](../../apps/website/src/features/palette-gallery/styles/palette-gallery.module.scss#L140), and [detail dot](../../apps/website/src/features/palette-gallery/styles/palette-gallery.module.scss#L221). These are not broad evidence of a generic control border.
- The [bar-chart shorthand](../../apps/website/src/features/color-semantic-preview/styles/color-semantic-preview.module.scss#L772) uses `4px 4px 1px 1px`. Its two 1px corners are chart geometry, not general surface-rounding evidence.
- The [color-picker saturation plane](../../apps/website/src/features/color-studio/components/controls/color-picker-popover.module.scss#L41) uses `8px 8px 0 0` to join its lower boundary to the adjoining controls.
- The 17px radius is a responsive Foundation-section value; 28px is the Colors journey rail; 30px is the Light/Dark semantic preview frame. These are isolated composition contexts.
- Outlines are excluded: six 2px focus-outline declarations, one 3px focus-outline declaration, nine `outline: none` resets, and one `outline: 0` reset. This includes [package Button focus](../../packages/ui/src/components/Button/Button.module.scss#L30) and [Semantic Color focus preview](../../apps/website/src/features/color-semantic-preview/styles/color-semantic-preview.module.scss#L653). Focus appearance belongs to Interaction/Focus, not this Border scale.
- Some specimen boundaries use inset shadows or gradient rules rather than CSS Border. They remain optical/visual implementations, not extra width/style occurrences.
- Existing [Shape Foundation inline demonstrations](../../apps/website/src/pages/foundations/ShapeDepthPage.tsx) render `borderWidth`, `borderStyle`, and `radius` directly from the package. Their full-scale coverage is distinct from independent stylesheet usage.

## Source Inventory

The inventory makes the source-level counting boundary explicit. Width literals exclude the dynamic-width declaration; radius components include percentages/inheritance and repeated shorthand components.

| Source                                                                                                                                                                                  | Border width literals | Explicit border styles | Radius components |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------: | ---------------------: | ----------------: |
| `apps/primitives-playground/src/styles.scss` (legacy, removed)                                                                                                                          |                     0 |                      0 |                 0 |
| `apps/ui-playground/src/styles.scss` (legacy, removed)                                                                                                                                  |                     0 |                      0 |                 0 |
| [ui/button/Button.module.scss](../../packages/ui/src/components/Button/Button.module.scss)                                                                                              |                     1 |                      1 |                 1 |
| [website/pages/placeholder/placeholder-page.module.scss](../../apps/website/src/pages/placeholder/placeholder-page.module.scss)                                                         |                     0 |                      0 |                 0 |
| [website/pages/colors/colors-overview.module.scss](../../apps/website/src/pages/colors/colors-overview.module.scss)                                                                     |                     9 |                      6 |                 8 |
| [website/shared/ui/copy-toast/copy-toast.module.scss](../../apps/website/src/shared/ui/copy-toast/copy-toast.module.scss)                                                               |                     1 |                      1 |                 2 |
| [website/shared/ui/scroll-cue/scroll-cue.module.scss](../../apps/website/src/shared/ui/scroll-cue/scroll-cue.module.scss)                                                               |                     1 |                      0 |                 0 |
| [website/pages/foundations/components/international-sans-preview.module.scss](../../apps/website/src/pages/foundations/components/international-sans-preview.module.scss)               |                    12 |                      8 |                 3 |
| [website/pages/foundations/components/font-family-preview.module.scss](../../apps/website/src/pages/foundations/components/font-family-preview.module.scss)                             |                     3 |                      3 |                 1 |
| [website/pages/foundations/components/layout-scale-preview.module.scss](../../apps/website/src/pages/foundations/components/layout-scale-preview.module.scss)                           |                     5 |                      6 |                11 |
| [website/pages/foundations/foundation-tokens.module.scss](../../apps/website/src/pages/foundations/foundation-tokens.module.scss)                                                       |                    11 |                     11 |                13 |
| [website/pages/foundations/components/typography-composition-preview.module.scss](../../apps/website/src/pages/foundations/components/typography-composition-preview.module.scss)       |                    17 |                     14 |                 8 |
| [website/pages/foundations/components/semantic-typography-tables.module.scss](../../apps/website/src/pages/foundations/components/semantic-typography-tables.module.scss)               |                     4 |                      3 |                 1 |
| [website/features/color-studio/components/controls/color-picker-popover.module.scss](../../apps/website/src/features/color-studio/components/controls/color-picker-popover.module.scss) |                     6 |                      4 |                 9 |
| [website/features/theme-builder/theme-builder.module.scss](../../apps/website/src/features/theme-builder/theme-builder.module.scss)                                                     |                    12 |                     11 |                10 |
| [website/features/color-studio/styles/foundation-pager.module.scss](../../apps/website/src/features/color-studio/styles/foundation-pager.module.scss)                                   |                     0 |                      0 |                 2 |
| [website/features/color-studio/styles/color-studio.module.scss](../../apps/website/src/features/color-studio/styles/color-studio.module.scss)                                           |                    22 |                     16 |                28 |
| [website/features/color-studio/styles/foundation-extensions.module.scss](../../apps/website/src/features/color-studio/styles/foundation-extensions.module.scss)                         |                     3 |                      2 |                 3 |
| [website/features/theme-builder/components/theme-select.module.scss](../../apps/website/src/features/theme-builder/components/theme-select.module.scss)                                 |                     4 |                      3 |                 4 |
| [website/layout/layout.module.scss](../../apps/website/src/layout/layout.module.scss)                                                                                                   |                     1 |                      1 |                 0 |
| [website/styles.scss](../../apps/website/src/styles.scss)                                                                                                                               |                     0 |                      0 |                 0 |
| [website/features/color-semantic-preview/styles/color-semantic-preview.module.scss](../../apps/website/src/features/color-semantic-preview/styles/color-semantic-preview.module.scss)   |                    28 |                     23 |                32 |
| [website/layout/components/global-controls/global-controls.module.scss](../../apps/website/src/layout/components/global-controls/global-controls.module.scss)                           |                     2 |                      1 |                 3 |
| [website/features/palette-gallery/styles/palette-gallery.module.scss](../../apps/website/src/features/palette-gallery/styles/palette-gallery.module.scss)                               |                    10 |                      8 |                 8 |

## Observations

- All determinate literal Border Width usage is covered by 0/1/2px. 1px dominates visible borders; 2px is concentrated in selection/optical/visual cases. There is no 0.5px or 3px border evidence.
- Explicit Border Style usage is exclusively solid. Dashed currently has no independent literal application-style evidence, although it exists in the package and Foundation demo. Zero-width shorthand resets do not imply a missing `none` style token.
- Across all px-normalized Radius components, the most frequent values are 8px (15), 7px (13), 9px (13), 6px (10), and 11px/12px/16px (8 each). Ordinary UI evidence is led by 9px (11), 8px (10), 7px/16px (8 each), and 10px/11px/14px/18px (6 each).
- Repeated ordinary UI values outside the current exact Foundation scale include 7px, 9px, 11px, 13px, 14px, 18px, and 22px. Their contexts differ; repetition alone does not justify adding or renaming tokens.
- 24px and exact 9999px have no independent literal stylesheet evidence in this snapshot. 4px, 6px, and 12px are used more often by visual specimens than ordinary boundaries. The existing Foundation demos still render all of these package tokens.
- Nine 50% occurrences, six 999px occurrences, two 28% occurrences, and the inherited paging thumb are separate geometry/behavior evidence. Circle, pill and rounded-square implementations are not interchangeable numeric aliases.
- The 1px/2px/5px radius cases are data/specimen geometry; 17px/28px/30px are isolated section/frame contexts. These records do not establish a new general radius role.
- Component and Interaction decisions may later use the ordinary-boundary, selection, and focus evidence. This report makes no token addition/removal/renaming decision and establishes no Semantic API.
