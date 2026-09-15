# Depth Foundation Usage Report

This report records observed Elevation and Opacity usage across the Virgo Design repository. It provides evidence for future Foundation and Semantic decisions but does not define tokens by itself.

## Decision Note

The standalone Opacity Foundation was removed after review because observed alpha usage is context-dependent and does not form a stable cross-product scale.

## Dark Elevation Decision

Dark Elevation V1 is finalized. The Dark theme uses the reviewed shadow-plus-subtle-rim treatment for stable Levels 0–5, while preserving the same offset, blur, and spread geometry as Light Elevation. The comparison data and Website review UI were removed after this decision.

## Scope and counting method

The audit covers visual source in `apps/website`, `apps/primitives-playground`, `apps/ui-playground`, and `packages/ui`. It excludes Token data, fonts, generated output, and packages without visual styles.

- The snapshot contains 26 stylesheet files: 23 in `apps/website`, one in each playground, and one in `packages/ui`.
- A shadow count represents one authored `box-shadow` declaration. A comma-separated multi-layer value remains one declaration.
- `box-shadow` transition properties are not values and are excluded. `text-shadow` is out of scope; no `text-shadow` or `filter: drop-shadow(...)` declaration exists in the scanned source.
- `rgba(...)` and `color-mix(..., transparent)` are recorded as local alpha evidence. A numeric coincidence with the former Opacity Foundation is not treated as a Foundation consumer.
- At the time of the audit, the Shape & Depth token display and Depth Scale Preview deliberately rendered Foundation values. They were Foundation demonstrations, not independent product evidence.

## Elevation Usage

The scan found 53 authored `box-shadow` declarations: 19 outer or multi-layer shadow values, five variable references, 12 ring-style values, 14 inset values, and three `none` resets. The table records every distinct declared value; theme-variable definitions are resolved in the next table.

| Value                                                                                   | Count | Main usages                                     | Category                 | Historical Foundation match   | Notes                                                                                                             |
| --------------------------------------------------------------------------------------- | ----: | ----------------------------------------------- | ------------------------ | ----------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `0 8px 30px rgba(20, 25, 35, 0.07)`                                                     |     1 | Light global controls                           | surface / card-like      | No                            | Light-only authored surface shadow.                                                                               |
| `0 12px 36px rgba(0, 0, 0, 0.28)`                                                       |     1 | Dark global controls                            | surface / card-like      | No                            | Dark override of the global-controls surface.                                                                     |
| `0 1px 5px rgba(0, 0, 0, 0.09)`                                                         |     1 | Active global-control option                    | focus / interaction-like | No                            | Selected-state feedback; not Elevation evidence.                                                                  |
| `0 18px 48px rgba(20, 25, 35, 0.06)`                                                    |     1 | Colors metric surfaces                          | surface / card-like      | No                            | Broad, low-alpha card-like shadow.                                                                                |
| `0 2px 7px rgba(15, 18, 23, 0.08)`                                                      |     1 | Overlapping color bars                          | decorative / preview     | No                            | Optical separation for a color specimen.                                                                          |
| `0 1px 4px rgba(22, 100, 249, 0.16)`                                                    |     1 | Total-color dots                                | decorative / preview     | No                            | Brand-colored dot halo.                                                                                           |
| `0 12px 38px rgba(18, 24, 35, 0.14), 0 2px 8px rgba(18, 24, 35, 0.06)`                  |     1 | Light copy toast                                | modal / floating-like    | Approximate to 3              | Two-layer floating treatment; geometry and color differ.                                                          |
| `0 12px 38px rgba(0, 0, 0, 0.34), 0 2px 8px rgba(0, 0, 0, 0.2)`                         |     1 | Dark copy toast                                 | modal / floating-like    | No                            | Theme-specific dark treatment, materially darker than the Foundation values.                                      |
| `0 2px 8px rgba(15, 18, 23, 0.08)`                                                      |     1 | Selected language option                        | focus / interaction-like | Approximate to 1              | Selection feedback, not a general surface role.                                                                   |
| `0 1px 4px rgba(15, 18, 23, 0.08)`                                                      |     1 | Active Foundation navigation item               | focus / interaction-like | Approximate to 1              | Selection feedback, not a general surface role.                                                                   |
| `0 14px 44px rgba(20, 25, 35, 0.045)`                                                   |     1 | Foundation sections                             | surface / card-like      | No                            | Broad but intentionally faint documentation surface.                                                              |
| `0 16px 42px rgba(20, 26, 38, 0.16), 0 3px 10px rgba(20, 26, 38, 0.08)`                 |     1 | Theme-select menu                               | dropdown / popover-like  | Approximate to 4              | Floating menu; both layers differ from one Foundation value.                                                      |
| `0 10px 30px rgba(20, 25, 35, 0.04)`                                                    |     1 | Palette family cards                            | surface / card-like      | Approximate to 3              | Similar geometry to level 3's first layer, but much lighter and single-layer.                                     |
| `0 18px 50px rgba(18, 24, 35, 0.16), 0 3px 12px rgba(18, 24, 35, 0.08)`                 |     1 | Color-picker panel                              | dropdown / popover-like  | Approximate to 4              | Floating picker; similar scale but not an exact token value.                                                      |
| `0 1px 4px rgba(0, 0, 0, 0.18)`                                                         |     1 | Color-picker pointer                            | decorative / preview     | No                            | Optical pointer outline.                                                                                          |
| `0 8px 22px rgba(18, 24, 35, 0.09)`                                                     |     2 | Hovered color-scale cells                       | focus / interaction-like | Approximate to 2              | Hover lift feedback; Interaction candidate.                                                                       |
| `0 1px 4px rgba(0, 0, 0, 0.08)`                                                         |     2 | Active segmented options                        | focus / interaction-like | Approximate to 1              | Selected-state feedback; not a surface role.                                                                      |
| `var(--shadow)`                                                                         |     1 | Theme Builder panels                            | surface / card-like      | No                            | Resolves to separate light and dark authored values below.                                                        |
| `var(--gallery-shadow)`                                                                 |     2 | Active family card and detail panel             | surface / card-like      | No                            | Resolves to separate light and dark authored values below.                                                        |
| `var(--semantic-elevation)`                                                             |     2 | Light/Dark semantic theme frame and its popover | modal / floating-like    | Historical: 3 light, 5 dark   | The audited implementation selected different levels by theme; it now resolves theme-owned Level 3 in both modes. |
| `none`                                                                                  |     3 | Collapsed Color Studio panel states             | unclear                  | Value match: 0                | Literal reset equivalent to Level 0; it is not an imported token use.                                             |
| `0 0 0 2px rgba(22, 100, 249, 0.1)`                                                     |     6 | Input and select focus states                   | focus / interaction-like | Interaction / Focus candidate | Ring geometry, excluded from Elevation evidence.                                                                  |
| `0 0 0 3px rgba(22, 100, 249, 0.12)`                                                    |     2 | Hex field and swatch focus states               | focus / interaction-like | Interaction / Focus candidate | Ring geometry, excluded from Elevation evidence.                                                                  |
| `0 0 0 4px rgba(51, 197, 104, 0.1)`                                                     |     1 | Live status dot                                 | decorative / preview     | Interaction / Focus candidate | Halo around a status marker, not an elevated surface.                                                             |
| `0 0 0 5px color-mix(in srgb, var(--tokens-page-brand) 10%, transparent)`               |     1 | Tokens-page source dot                          | decorative / preview     | Interaction / Focus candidate | Decorative halo; not Elevation.                                                                                   |
| `0 0 0 3px color-mix(in srgb, var(--semantic-brand-focus) 20%, transparent)`            |     1 | Semantic input focus                            | focus / interaction-like | Interaction / Focus candidate | Focus ring, excluded from Elevation evidence.                                                                     |
| `0 0 0 1px var(--gallery-line)`                                                         |     1 | Detail color dot                                | decorative / preview     | No                            | Small optical outline around a dot.                                                                               |
| `inset 0 0 0 1px rgba(255, 255, 255, 0.14)`                                             |     3 | Picker and Color Studio swatches                | decorative / preview     | No                            | Inset highlight, not outward depth.                                                                               |
| `inset 0 0 0 1px rgba(255, 255, 255, 0.12)`                                             |     2 | Theme swatches                                  | decorative / preview     | No                            | Inset highlight, not outward depth.                                                                               |
| `inset 0 0 0 1px color-mix(in srgb, var(--foundation-accent) 28%, transparent)`         |     1 | Layout gap specimen                             | decorative / preview     | No                            | Specimen boundary.                                                                                                |
| `inset 0 0 0 1px var(--foundation-line)`                                                |     1 | Layout combination specimen                     | decorative / preview     | No                            | Specimen boundary.                                                                                                |
| `inset 0 0 0 1px color-mix(in srgb, var(--foundation-accent) 32%, transparent)`         |     1 | Layout size specimen                            | decorative / preview     | No                            | Specimen boundary.                                                                                                |
| `inset 0 0 0 1px color-mix(in srgb, var(--semantic-brand-foreground) 16%, transparent)` |     1 | Semantic theme mark                             | decorative / preview     | No                            | Mark highlight.                                                                                                   |
| `inset 0 0 0 1px var(--semantic-border-subtle)`                                         |     1 | Data-token strip                                | decorative / preview     | No                            | Specimen boundary.                                                                                                |
| `inset 0 0 0 1px rgba(0, 0, 0, 0.045)`                                                  |     1 | Color Studio swatch                             | decorative / preview     | No                            | Optical swatch edge.                                                                                              |
| `inset 0 0 0 1px rgba(255, 255, 255, 0.16), inset 0 -10px 30px rgba(0, 0, 0, 0.025)`    |     1 | Palette family color block                      | decorative / preview     | No                            | Highlight and internal gradient cue.                                                                              |
| `inset 0 0 0 1px rgba(255, 255, 255, 0.14), inset 0 0 0 1.5px rgba(0, 0, 0, 0.035)`     |     1 | Color Studio swatch                             | decorative / preview     | No                            | Paired optical swatch edge.                                                                                       |
| `inset 2px 0 0 var(--accent)`                                                           |     1 | Selected family row                             | focus / interaction-like | Interaction / Focus candidate | Selection marker, not outward elevation.                                                                          |

### Theme-variable resolution

| Variable               | Resolved value                              | Consumers                            | Category              | Historical Foundation match | Notes                                               |
| ---------------------- | ------------------------------------------- | ------------------------------------ | --------------------- | --------------------------- | --------------------------------------------------- |
| `--shadow`             | Light: `0 24px 70px rgba(25, 31, 43, 0.08)` | Theme Builder panels                 | surface / card-like   | No                          | Directly authored light shadow.                     |
| `--shadow`             | Dark: `0 28px 90px rgba(0, 0, 0, 0.35)`     | Theme Builder panels                 | surface / card-like   | No                          | Directly authored dark shadow.                      |
| `--gallery-shadow`     | Light: `0 28px 80px rgba(29, 35, 48, 0.1)`  | Active palette card and detail panel | surface / card-like   | No                          | Directly authored light shadow.                     |
| `--gallery-shadow`     | Dark: `0 34px 100px rgba(0, 0, 0, 0.38)`    | Active palette card and detail panel | surface / card-like   | No                          | Directly authored dark shadow.                      |
| `--semantic-elevation` | Light: Level 3                              | Semantic frame and popover           | modal / floating-like | Historical direct use       | The audited preview selected Level 3 in Light Mode. |
| `--semantic-elevation` | Dark: Level 5                               | Semantic frame and popover           | modal / floating-like | Historical direct use       | The audited preview selected Level 5 in Dark Mode.  |

### Foundation evidence

| Foundation | Direct source use outside Foundation displays | Closest real CSS evidence                          | Observation                                                                     |
| ---------- | --------------------------------------------- | -------------------------------------------------- | ------------------------------------------------------------------------------- |
| Level 0    | None                                          | Three literal `box-shadow: none` resets            | Equivalent behavior, but not an imported Foundation use.                        |
| Level 1    | None                                          | Low selected-state shadows such as `0 1px 4px ...` | Approximate geometry only; these are interaction feedback.                      |
| Level 2    | None                                          | Hover lift `0 8px 22px ...`                        | Not an exact match and belongs to Interaction.                                  |
| Level 3    | `SemanticThemePreview` in light mode          | `0 10px 30px ...` on palette cards                 | Historical direct Foundation use; the preview now resolves theme-owned Level 3. |
| Level 4    | None                                          | Picker and menu multi-layer shadows                | Similar broad range, no exact Foundation value.                                 |
| Level 5    | `SemanticThemePreview` in dark mode           | Dark panel shadows are larger and darker           | Historical direct Foundation use before the theme-aware migration.              |

The Shape & Depth page continues to render all six levels using the active theme. The Depth Scale Preview also renders all six and its layered `1 / 3 / 5` comparison from the active theme; neither is independent component evidence.

## Interaction / Ring Exceptions

The 12 `0 0 0 …` shadows are ring-shaped values. They are intentionally excluded from Elevation evidence.

- Eight focus rings are blue input/select feedback: six 2px rings and two 3px rings.
- One 3px semantic focus ring uses a transparent `color-mix` brand color.
- One 4px green live-status halo and one 5px source-dot halo are decorative markers.
- The selected-family row uses an inset 2px accent marker; the detail dot uses a 1px optical ring.
- The active global control, active Foundation navigation item, selected language option, active segmented options, and scale-item hover shadows are interaction feedback. They are recorded above for completeness, but do not establish Elevation roles.

## Light / Dark Observations

Light Elevation retains its existing values. Dark Elevation is now theme-aware: `darkTheme.elevation[0–5]` is the finalized V1 baseline and uses the reviewed shadow-plus-subtle-rim treatment.

| Theme | Observation from the Foundation scale preview                                                                                                                                                                                                                                                                                        | Current Foundation evidence                                                                                                                                                   |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Light | Level 0 has no shadow. Levels 1 and 2 are subtle, 3 and 4 separate the neutral surface more clearly, and 5 is the strongest while remaining readable in the scale. The layered 1/3/5 comparison has a visible progression.                                                                                                           | The current ordering reads as a usable visual ladder on the light Foundation page.                                                                                            |
| Dark  | Before finalization, the original fixed near-black shadow was close to the dark page and surface colors: Levels 1 and 2 were nearly indistinguishable, 3–5 remained subdued, and the layered comparison had less visible separation than in Light Mode. The finalized scale uses the reviewed treatment to restore a clearer ladder. | This historical result established the need for theme-aware Elevation. The finalized Dark Levels 0–5 are the V1 baseline; they do not define a Light/Dark Elevation Semantic. |

The visual checks used the Shape & Depth page's light and dark controls. They informed the finalized Dark Foundation treatment; no component Semantic is defined by these observations.

## Opacity Usage

The historical tables below retain the original audit counts and classification. Their former-Foundation references describe the snapshot and do not indicate a current public API.

### Element opacity

There are 38 element `opacity` declarations in scanned styles. Static values, keyframe endpoints, and dynamic motion variables are separated below. Counts are declarations, not runtime frames.

| Value                             | Count | Main usages                                                 | Category                               | Historical Foundation match | Notes                                                       |
| --------------------------------- | ----: | ----------------------------------------------------------- | -------------------------------------- | --------------------------- | ----------------------------------------------------------- |
| `1`                               |    11 | Animation endpoints, visible gallery/menu states            | animation / transient alpha            | Former numeric 100          | Endpoint value, not an imported Foundation use.             |
| `1 !important`                    |     4 | Reduced-motion overrides                                    | animation / transient alpha            | Numerically 100             | Accessibility override, not a Foundation consumer.          |
| `0`                               |     8 | Animation starts and hidden expandable states               | animation / transient alpha            | No former level 0           | Visibility choreography, not a content-opacity scale value. |
| `0.55`                            |     4 | Disabled Color Studio fields and reset controls; scroll cue | disabled-like alpha / decorative alpha | No                          | Repeated but outside the former Foundation values.          |
| `0.5`                             |     1 | Disabled package Button                                     | disabled-like alpha                    | No                          | A real disabled treatment; deferred to Interaction.         |
| `0.43`                            |     1 | Disabled Color Studio controls                              | disabled-like alpha                    | No                          | Local disabled-state treatment.                             |
| `0.6`                             |     1 | Live-status pulse keyframe                                  | animation / transient alpha            | No                          | Transient animation endpoint.                               |
| `0.18`                            |     1 | Scroll-cue breathing keyframe                               | animation / transient alpha            | No                          | Decorative animation endpoint.                              |
| `var(--studio-footer-opacity, 1)` |     2 | Pager hint and indicator                                    | animation / transient alpha            | Dynamic                     | Runtime value is derived from section presence.             |
| `var(--studio-motion-opacity, 1)` |     1 | Color Studio shell                                          | animation / transient alpha            | Dynamic                     | Runtime range is calculated in TypeScript.                  |
| `var(--studio-header-opacity, 1)` |     1 | Color Studio header                                         | animation / transient alpha            | Dynamic                     | Runtime range is calculated in TypeScript.                  |
| `var(--studio-panel-opacity, 1)`  |     1 | Color Studio panels                                         | animation / transient alpha            | Dynamic                     | Runtime range is calculated in TypeScript.                  |
| `var(--theme-hero-opacity, 1)`    |     1 | Theme Builder hero                                          | animation / transient alpha            | Dynamic                     | Runtime range is calculated in TypeScript.                  |
| `var(--theme-panel-opacity, 1)`   |     1 | Theme Builder panels                                        | animation / transient alpha            | Dynamic                     | Runtime range is calculated in TypeScript.                  |

At the time of the audit, the Shape & Depth token display and the preview demonstrated every former opacity value. Those Foundation-specific displays were removed with the Foundation.

### Local color alpha

The scan found 137 `rgba` alpha occurrences and 14 `color-mix(..., transparent)` occurrences. The counts below combine those syntax forms where they express the same numeric alpha. They are local color/overlay/shadow inputs, not element-opacity consumers.

| Value   | Count | Main usages                                         | Category                         | Historical Foundation match                   | Notes                                                  |
| ------- | ----: | --------------------------------------------------- | -------------------------------- | --------------------------------------------- | ------------------------------------------------------ |
| `0.08`  |    17 | Shadow layers, borders, gradients, page accents     | rgba / color alpha               | Former numeric 8                              | Frequent local alpha; not a direct Foundation use.     |
| `0.10`  |    14 | Focus rings, borders, shadow layers                 | rgba / color alpha               | No                                            | Common local color alpha.                              |
| `0.09`  |    12 | Interface lines and hover shadows                   | rgba / color alpha               | No                                            | Common local color alpha.                              |
| `0.16`  |    10 | Brand details, inset edges, picker/menu shadows     | rgba / color alpha               | Numeric 16                                    | Local color alpha, not a Foundation import.            |
| `0.14`  |     9 | Swatch edges, shadows, dark surfaces                | rgba / color alpha               | No                                            | Common local color alpha.                              |
| `0.055` |     8 | Control fills and page accents                      | rgba / color alpha               | No                                            | Local fractional alpha.                                |
| `0.12`  |     7 | Focus rings and swatch highlights                   | rgba / color alpha               | No                                            | Mostly interaction/optical usage.                      |
| `0.06`  |     6 | Control fills and shadow layers                     | rgba / color alpha               | No                                            | Local color alpha.                                     |
| `0.55`  |     5 | Focus border colors                                 | rgba / color alpha               | No                                            | Interaction color alpha, separate from element `0.55`. |
| `0.18`  |     4 | Foundation line/gradient details and picker shadows | rgba / color alpha               | No                                            | Includes one `color-mix` specimen value.               |
| `0.28`  |     4 | Surface fills, specimen outlines, dark controls     | rgba / color alpha               | No                                            | Local overlay/optical alpha.                           |
| `0.82`  |     4 | Translucent controls and semantic/source surfaces   | rgba / color alpha               | No                                            | Surface material alpha.                                |
| `0.86`  |     3 | Header and Theme Builder surfaces                   | rgba / color alpha               | No                                            | Surface material alpha.                                |
| `0.15`  |     3 | Strong interface lines                              | rgba / color alpha               | No                                            | Local border alpha.                                    |
| `0.60`  |     3 | Focus outlines                                      | rgba / color alpha               | No                                            | Repeated Interaction value.                            |
| `0.65`  |     3 | Focus borders and outlines                          | rgba / color alpha               | No                                            | Repeated Interaction value.                            |
| `0.045` |     3 | Foundation muted fills and specimen edges           | rgba / color alpha               | No                                            | Decorative/surface material alpha.                     |
| `0.025` |     2 | Pale/dark overlay detail                            | overlay alpha                    | No                                            | Palette and Colors overview overlays.                  |
| `0.07`  |     2 | Background accent and light control shadow          | rgba / color alpha               | No                                            | Local color alpha.                                     |
| `0.075` |     2 | Foundation and typography background accents        | decorative alpha                 | No                                            | Decorative gradients/fills.                            |
| `0.20`  |     2 | Dark toast layer and semantic focus ring            | rgba / color alpha               | No                                            | Floating/focus values have unrelated intent.           |
| `0.22`  |     2 | Typography border and semantic focus outline        | rgba / color alpha               | No                                            | One structural, one interaction use.                   |
| `0.24`  |     2 | Foundation visual specimens                         | decorative alpha                 | No                                            | Specimen-only alpha.                                   |
| `0.35`  |     2 | Dark Color Studio and Theme Builder shadows         | rgba / color alpha               | No                                            | Dark floating-shadow alpha.                            |
| `0.50`  |     2 | Color Studio focus border and black overlay         | overlay alpha / interaction-like | No                                            | Also appears once as disabled element opacity.         |
| `0.90`  |     2 | Dark Theme Builder and Gallery translucent surfaces | rgba / color alpha               | No                                            | Repeated surface-material alpha.                       |
| `0.34`  |     1 | Dark toast shadow                                   | rgba / color alpha               | No                                            | Floating-only value.                                   |
| `0.32`  |     1 | Layout scale inset outline                          | decorative alpha                 | Numeric 32                                    | Numeric match only; specimen outline.                  |
| `0.48`  |     1 | Colors focus outline                                | focus / interaction-like         | Numeric 48                                    | Numeric match only; outline alpha.                     |
| `0.80`  |     1 | Light Foundation surface                            | rgba / color alpha               | Numeric 80                                    | Surface material alpha, not element opacity.           |
| `0.76`  |     1 | Colors journey text                                 | rgba / color alpha               | No                                            | Local text color alpha.                                |
| `0.46`  |     1 | Brand/neutral base badge overlay                    | overlay alpha                    | No                                            | Local black overlay.                                   |
| `0.45`  |     1 | Palette selection border                            | focus / interaction-like         | No                                            | Selection feedback.                                    |
| `0.38`  |     1 | Dark palette shadow                                 | rgba / color alpha               | No                                            | Dark floating-shadow alpha.                            |
| `0.17`  |     1 | Dark Foundation strong line                         | rgba / color alpha               | No                                            | Local border alpha.                                    |
| `0.13`  |     1 | Dark Color Studio accent gradient                   | decorative alpha                 | No                                            | Decorative background.                                 |
| `0.085` |     1 | Light Color Studio hover fill                       | rgba / color alpha               | No                                            | Local control fill alpha.                              |
| `0.04`  |     1 | Palette family-card shadow                          | rgba / color alpha               | No                                            | Shadow-specific alpha.                                 |
| `0.035` |     1 | Color Studio swatch edge                            | decorative alpha                 | No                                            | Optical edge.                                          |
| `0.88`  |     1 | Light palette surface                               | rgba / color alpha               | No                                            | Surface material alpha.                                |
| `0.84`  |     2 | Color Studio translucent surfaces                   | rgba / color alpha               | No                                            | Surface material alpha.                                |
| `0.64`  |     0 | —                                                   | —                                | Former level 64 has no local alpha occurrence | No literal evidence in this scan.                      |

## Special Cases

- `opacity: 0`, `opacity: 1`, and the dynamic opacity custom properties are animation and visibility choreography. They should not be converted into Foundation or Semantic evidence.
- The repeated element values `0.5`, `0.55`, and `0.43` are disabled-like treatments. They are intentionally deferred with other disabled-state decisions to Interaction.
- `0.6` appears once as element opacity and three times as local outline alpha; all are transient or interaction usage. `0.7` and `0.75` do not occur as static element-opacity declarations or local alpha syntax. The Color Studio motion interpolation uses `0.7` as a calculation multiplier, rather than as an authored opacity value. `0.9` occurs twice as a dark translucent surface alpha, not as element opacity.
- `rgba(0, 0, 0, 0.5)` and `rgba(0, 0, 0, 0.46)` are local overlay values. They show real overlay strength choices, but neither is a formal Overlay Foundation or Semantic decision.
- Alpha inside shadows and outlines belongs to the authored visual effect. It is evidence about the local color treatment, not direct consumption of the former Opacity Foundation.

## Observations

- Real outer shadows are concentrated in documentation surfaces, menus, pickers, toast feedback, and palette panels. There is no single literal shadow that dominates across those contexts.
- At audit time, the only non-display direct Elevation use was the semantic color-preview implementation: Level 3 in Light Mode and Level 5 in Dark Mode. It now resolves theme-owned Level 3 in both modes; Levels 0, 1, 2, and 4 had no independent direct source use.
- Ring and focus shadows account for 12 declarations. They are Interaction / Focus candidates and must not be promoted as Elevation evidence.
- The original fixed dark shadow color produced a weaker depth ladder in Dark Mode. Elevation is now theme-aware, and the finalized Dark Elevation 0–5 uses the reviewed shadow-plus-subtle-rim treatment while preserving the same stable elevation levels.
- Element opacity is mainly animation/transient state. Local alpha is common in surface, border, shadow, overlay, and decorative color construction, so numerical matches to `opacity` values do not by themselves establish Foundation consumers.
- Repeated values that were outside the former Opacity Foundation include `0.5`, `0.55`, `0.6`, and `0.9`; their observed meanings differ. The Decision Note records the resulting removal of the standalone Opacity Foundation; no Semantic API is created here.
