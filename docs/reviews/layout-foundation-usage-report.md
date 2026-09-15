# Layout Foundation Usage Report

This report records observed Spacing and Sizing usage across the Virgo Design repository.
It provides evidence for future Foundation and Semantic decisions but does not define tokens by itself.

- Date: 2026-09-15
- Scope: `apps/website`, `apps/primitives-playground`, `apps/ui-playground`, `packages/ui`
- Excluded: `packages/fonts`, build output, dependencies, and the Layout Scale Preview styles themselves

## Method

- Scanned CSS, SCSS, Sass, and Less files that can emit visual styles.
- Inspected TS/TSX inline styles separately. Existing numeric inline styles are color preview data, percentage-based charts, motion values, or Foundation demonstrations, so they do not add literal Layout usage evidence here.
- Converted `rem` to px with the repository's 16px root-size baseline.
- Counted each numeric value occurrence in a declaration. Repeated values in a shorthand are counted repeatedly; `width` and `height` declarations are counted separately in raw evidence.
- Unitless `0` is normalized to `0px`. Keywords such as `auto`, percentages, viewport units, and values that cannot resolve to one deterministic px value are excluded from numeric totals.
- Margin is included as usage evidence, not as a recommendation to prefer margin.
- Sizing classification is reviewed by selector and context. Page, container, sidebar, chart, viewport, and other structural dimensions are not treated as reusable Sizing evidence.

## Spacing Usage

The scan found 596 reliably normalized numeric occurrences: 411 from gap/padding properties and 185 from margin properties. Of these, 343 occurrences use a value that currently exists in the Spacing Foundation. This is coverage evidence, not a quality score.

| Value | Count | Main usages                                          | Current Foundation | Notes                                                    |
| ----: | ----: | ---------------------------------------------------- | :----------------: | -------------------------------------------------------- |
|  -9px |     1 | Overlapping color preview                            |         No         | One-off optical offset                                   |
|  -6px |     1 | Overlapping color preview                            |         No         | One-off optical offset                                   |
|  -1px |     1 | Palette scale overlap                                |         No         | One-off seam correction                                  |
|   0px |   119 | Reset margins and padding; zero-gap states           | Yes, `spacing[0]`  | High-frequency reset value, not positive rhythm evidence |
|   1px |     3 | Fine offsets and a palette inset                     |         No         | Low-frequency optical value                              |
|   2px |    14 | Color ramps, micro gaps, compact metadata            | Yes, `spacing[2]`  | Repeated micro spacing                                   |
|   3px |    16 | Data-preview chips, color controls, compact labels   |         No         | Repeated dense UI value                                  |
|   4px |    26 | Status/data rows, compact controls, metadata         | Yes, `spacing[4]`  | High-frequency compact spacing                           |
|   5px |    20 | Semantic preview groups and color controls           |         No         | Repeated dense UI value                                  |
|   6px |    19 | Chips, compact controls, inline padding              | Yes, `spacing[6]`  | Repeated compact spacing                                 |
|   7px |    23 | Buttons, color controls, preview rows                |         No         | High-frequency local value                               |
|   8px |    37 | Card gaps, navigation, controls, form rows           | Yes, `spacing[8]`  | High-frequency                                           |
|   9px |    25 | Toast, picker, semantic preview, metadata            |         No         | High-frequency local value                               |
|  10px |    27 | Control padding, cards, picker and preview rows      |         No         | High-frequency local value                               |
|  11px |    10 | Typography tables, picker and preview padding        |         No         | Repeated but concentrated                                |
|  12px |    18 | Button padding, card gaps, content groups            | Yes, `spacing[12]` | Repeated regular spacing                                 |
|  13px |     8 | Toast and compact card padding                       |         No         | Concentrated component value                             |
|  14px |    21 | Medium button padding, cards, responsive pages       |         No         | High-frequency local value                               |
|  15px |     3 | Semantic and Foundation preview padding              |         No         | Low-frequency                                            |
|  16px |    29 | Form/card padding, section groups, playgrounds       | Yes, `spacing[16]` | High-frequency                                           |
|  17px |     2 | International Sans preview padding                   |         No         | One component                                            |
|  18px |    23 | Foundation cards, semantic panels, typography tables |         No         | High-frequency local value                               |
|  19px |     1 | Local vertical offset                                |         No         | One-off                                                  |
|  20px |    18 | Section/card padding and larger gaps                 | Yes, `spacing[20]` | Repeated regular spacing                                 |
|  22px |    19 | Typography cards, page sections, semantic panels     |         No         | High-frequency local value                               |
|  24px |    34 | Major cards, composition previews, section gaps      | Yes, `spacing[24]` | High-frequency                                           |
|  26px |     3 | Page and panel spacing                               |         No         | Low-frequency                                            |
|  28px |    13 | Responsive page padding and large section gaps       |         No         | Repeated structural spacing                              |
|  30px |     5 | Card and semantic-preview padding                    |         No         | Concentrated local value                                 |
|  32px |    15 | Playground padding, sections, larger layout gaps     | Yes, `spacing[32]` | Repeated large spacing                                   |
|  34px |     3 | Overview and page padding                            |         No         | Low-frequency structural value                           |
|  36px |     4 | Overview and builder layout gaps                     |         No         | Low-frequency structural value                           |
|  38px |     1 | Local section offset                                 |         No         | One-off                                                  |
|  40px |     3 | Section padding and gallery spacing                  | Yes, `spacing[40]` | Low usage                                                |
|  42px |     5 | Responsive page/hero padding                         |         No         | Structural page value                                    |
|  44px |     1 | One layout gap                                       |         No         | One-off                                                  |
|  46px |     1 | One vertical offset                                  |         No         | One-off                                                  |
|  48px |     8 | Page/section separation and builder padding          | Yes, `spacing[48]` | Moderate large-spacing evidence                          |
|  52px |     2 | Overview and responsive section padding              |         No         | Low-frequency structural value                           |
|  54px |     2 | Theme-builder page padding                           |         No         | One page                                                 |
|  56px |     1 | One margin declaration                               |         No         | One-off                                                  |
|  64px |     2 | Large vertical section margins                       | Yes, `spacing[64]` | Low usage; margin-only evidence                          |
|  72px |     7 | Color Semantic page and hero spacing                 |         No         | Repeated, but page-scale and concentrated                |
|  80px |     0 | —                                                    | Yes, `spacing[80]` | No usage evidence in scope                               |
|  96px |     1 | Color Semantic page bottom padding                   | Yes, `spacing[96]` | One page-scale use                                       |
| 112px |     1 | Foundation page bottom padding                       |         No         | One-off page structure                                   |

### CSS variables and non-deterministic values

| Declaration              | Usage                                 | Known values                  | Counting treatment                                      |
| ------------------------ | ------------------------------------- | ----------------------------- | ------------------------------------------------------- |
| `--layout-header-height` | `padding-top` in `layout.module.scss` | 76px desktop, 68px responsive | Listed separately; not assigned to either numeric count |

No other spacing declaration in scope resolves through a CSS variable to one deterministic px value. Keyword values such as `auto` are valid layout behavior but are not scale values and are not included in the table.

## Sizing Usage

Counts below describe reviewed usage sites. A square object with matching `width` and `height` is one site; responsive variants or separate selectors remain separate sites.

### Heights and interactive rows

| Value | Count | Main usages                                                             | Category         | Current Foundation | Notes                                    |
| ----: | ----: | ----------------------------------------------------------------------- | ---------------- | :----------------: | ---------------------------------------- |
|  26px |     2 | Icon action, compact family input                                       | Height           |         No         | Compact special cases                    |
|  28px |     8 | Reset, channel input, family input, copy/naming controls                | Height           | Yes, `sizing[28]`  | Most repeated control height             |
|  30px |     6 | Compact hex/swatch control, theme select, semantic step, global control | Height           |         No         | Repeated across several Website features |
|  31px |     1 | Segmented control button                                                | Height           |         No         | One-off                                  |
|  32px |     1 | Package UI small Button                                                 | Height           | Yes, `sizing[32]`  | Public component evidence                |
|  34px |     3 | Input, brand action, identity input                                     | Height           |         No         | Repeated form value                      |
|  36px |     3 | Hex input, swatch button, package UI medium Button                      | Height           | Yes, `sizing[36]`  | Mixed Website and package evidence       |
|  38px |     1 | Copy toast minimum height                                               | Feedback surface |         No         | Not a generic control                    |
|  39px |     1 | Family editor row                                                       | Interactive row  |         No         | One feature                              |
|  40px |     1 | Package UI large Button                                                 | Height           | Yes, `sizing[40]`  | Public component evidence                |
|  42px |     2 | Fill item and family editor rows                                        | Interactive row  |         No         | Row height rather than object size       |
|  43px |     1 | Family editor row                                                       | Interactive row  |         No         | One feature                              |
|  44px |     0 | —                                                                       | Height           | Yes, `sizing[44]`  | No real control usage evidence in scope  |

### Icons, indicators, handles, and repeated small objects

|   Value | Count | Main usages                                     | Category                 | Current Foundation | Notes                                       |
| ------: | ----: | ----------------------------------------------- | ------------------------ | :----------------: | ------------------------------------------- |
|     6px |     1 | Live dot                                        | Indicator                |         No         | Micro status object                         |
|     8px |     1 | Source dot                                      | Indicator                |         No         | Micro status object                         |
|    10px |     1 | Total-color preview dot                         | Indicator/swatch         |         No         | Preview-specific                            |
|    11px |     1 | Compact theme swatch                            | Swatch                   |         No         | Compact special case                        |
|    12px |     3 | Theme chevron, toast glyph, hue track thickness | Icon/control detail      | Yes, `sizing[12]`  | Mixed semantics                             |
|    13px |     3 | Palette dot, theme swatch, theme check          | Indicator/swatch/icon    |         No         | Repeated in theme/palette UI                |
|    14px |     2 | Semantic preview icons                          | Icon-like                |         No         | Same feature family                         |
|    16px |     2 | Fill icon, color-picker handle                  | Icon/handle              | Yes, `sizing[16]`  | Reusable small-object evidence              |
| 17×30px |     1 | Overview color preview                          | Unclear composite object |      Partial       | Width and height intentionally differ       |
|    18px |     1 | Toast icon container                            | Icon container           |         No         | Container, not glyph size                   |
|    22px |     2 | Status icon, Motion preview object              | Icon/preview object      |         No         | Mixed production and documentation evidence |
|    24px |     2 | Family editor color marks                       | Swatch                   | Yes, `sizing[24]`  | Repeated variants                           |
|    25px |     1 | Neutral color preview                           | Swatch                   |         No         | Optical preview size                        |
|    26px |     1 | Product brand mark                              | Brand object             |         No         | Feature-specific                            |
|    28px |     2 | Picker preview, family editor color             | Swatch                   | Yes, `sizing[28]`  | Repeated preview object                     |
|    30px |     3 | Semantic swatch and two composite previews      | Swatch/unclear           |         No         | Some sites pair with a different width      |
|    34px |     2 | Brand preview and compact composite swatch      | Swatch/unclear           |         No         | Optical preview sizes                       |
|    38px |     1 | Theme mark                                      | Brand/theme object       |         No         | Feature-specific                            |
|    42px |     3 | Color swatch, overview preview, workspace mark  | Mixed object             |         No         | Same number, different semantics            |
| 32×46px |     1 | Scroll cue glyph                                | Decorative icon          |      Partial       | Decorative, not general icon evidence       |

### Specialized preview and layout dimensions

These values exist in visual styles but are separated from reusable Sizing evidence:

| Values                                         | Main usages                                                   | Classification            | Notes                                                     |
| ---------------------------------------------- | ------------------------------------------------------------- | ------------------------- | --------------------------------------------------------- |
| 56px, 70px, 72px, 82px, 86px, 88px, 92px, 96px | Color surfaces, palette blocks, Foundation demonstrations     | Specialized visual object | Evidence for those previews, not a generic UI object role |
| 54px, 64px, 68px, 72px, 74px, 76px, 82px, 84px | Input/button minimum widths and carousel item widths          | Component/layout width    | Width is content/layout-driven                            |
| 136px–176px                                    | Metric cards, surfaces, color-picker canvas                   | Component composition     | Not a small reusable object size                          |
| 218px–340px                                    | Popovers, menus, editor panels, text measures                 | Component/container width | Explicitly excluded from Sizing evidence                  |
| 320px                                          | Application minimum viewport width                            | Page constraint           | Page/layout special case                                  |
| 420px–880px                                    | Code panels, page compositions, workspaces, document measures | Page/container dimension  | Explicitly excluded from Sizing evidence                  |
| 68px / 76px                                    | Responsive global header height                               | Layout shell dimension    | Multi-valued CSS variable; not a generic object size      |

## Observations

- The most frequent positive spacing values are 8px, 24px, 16px, 10px, 4px, 9px, 7px, 18px, 14px, and 5px. `0px` is more frequent than all of them but mostly represents resets.
- Repeated spacing values not covered by the current Foundation include 3px, 5px, 7px, 9px, 10px, 11px, 14px, 18px, 22px, and 28px. Their contexts range from optical micro-spacing to page structure, so frequency alone does not establish a shared token role.
- `spacing[80]` has no usage evidence in scope. `spacing[64]` has two margin-only sites, while `spacing[96]` has one page-level site. `spacing[40]` has three sites.
- Negative spacing values and 1px, 19px, 38px, 44px, 46px, 52px, 54px, 56px, 96px, and 112px are clearly low-frequency or one-off evidence in this snapshot.
- Observed heights cluster around 28–40px. The repeated values are 28px, 30px, 34px, and 36px; package UI Buttons specifically use 32px, 36px, and 40px.
- Icon/indicator/swatch evidence is concentrated between 6px and 42px, but the same numeric size often represents different semantics. The strongest existing-Foundation evidence is at 12px, 16px, 24px, and 28px.
- Large page, container, preview-canvas, chart, and text-measure dimensions were deliberately separated. Their recurrence does not make them general Sizing Foundation evidence.
