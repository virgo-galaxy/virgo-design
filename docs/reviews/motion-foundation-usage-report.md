# Motion Foundation Usage Report

This report records observed Duration and Easing usage across the Virgo Design repository. It provides evidence for future Foundation and Semantic decisions but does not define tokens by itself.

## Scope and counting method

The audit covers visual source in `apps/website`, `apps/primitives-playground`, `apps/ui-playground`, and `packages/ui`. It excludes Token data, fonts, generated output, and packages without visual styles.

- The snapshot contains 26 authored stylesheet files: 23 in `apps/website`, one in each playground, and one in `packages/ui`.
- It found 49 timing declarations: 34 `transition` declarations and 15 `animation` declarations. No `transition-duration`, `transition-timing-function`, `animation-duration`, or `animation-timing-function` longhand declaration is authored in scope.
- `transition: none` and `animation: none` appear 17 times, primarily in reduced-motion media queries. They are accessibility overrides and are excluded from duration and easing value totals.
- Counts below are timing terms in non-`none` shorthand declarations. A shorthand delay is counted as an observed timing value, but is not inferred to be a duration Foundation consumer.
- No direct `duration.*` or `easing.*` property reference exists outside the Foundation Preview. No Motion CSS variable map or generated `--vd-duration-*` / `--vd-easing-*` variable exists in the repository.

## Duration Usage

| Value     | Count | Main usages                                              | Foundation match            | Notes                                                       |
| --------- | ----: | -------------------------------------------------------- | --------------------------- | ----------------------------------------------------------- |
| `0ms`     |     3 | Color Studio visibility handoffs                         | `duration[0]` value match   | All are shorthand timing terms; no Foundation import.       |
| `100ms`   |     1 | Color Studio opacity delay                               | No                          | Delay evidence only.                                        |
| `120ms`   |     4 | `packages/ui` Button state transitions                   | `duration[120]` value match | Repeated component interaction timing; no direct token use. |
| `140ms`   |    28 | Website controls, entry animations, Color Studio details | No                          | Most frequent observed value.                               |
| `160ms`   |     4 | Layout, theme selector, color overview                   | No                          | Local interaction and color-change transitions.             |
| `180ms`   |     8 | Global controls, palette gallery, copy toast             | `duration[180]` value match | Includes the copy-toast entry animation.                    |
| `220ms`   |     1 | Color Studio panel opacity                               | No                          | Local layout transition.                                    |
| `240ms`   |     2 | Color Studio layout transitions                          | `duration[240]` value match | No direct token use.                                        |
| `260ms`   |     6 | Color Studio panel geometry                              | No                          | Local layout transition.                                    |
| `280ms`   |     1 | Scroll-cue animation delay                               | No                          | Delay evidence only.                                        |
| `300ms`   |     1 | Scroll-cue opacity transition                            | No                          | Local visual feedback.                                      |
| `320ms`   |     1 | Color Studio panel opacity                               | No                          | Local layout transition.                                    |
| `400ms`   |     2 | Color Studio transform / size transition                 | No                          | Local layout transition.                                    |
| `420ms`   |     2 | Palette tonal burst and scroll cue                       | No                          | Animation and emphasis feedback.                            |
| `560ms`   |    11 | Color Studio panel geometry and visibility handoffs      | `duration[560]` value match | Repeated layout choreography; no direct token use.          |
| `620ms`   |     2 | Foundation pager transforms                              | No                          | Local navigation transition.                                |
| `1800ms`  |     3 | Scroll-cue breathing loop                                | No                          | Repeating decorative animation.                             |
| `2200ms`  |     1 | Color Studio live-status pulse                           | No                          | Repeating status animation.                                 |
| `30000ms` |     1 | Color Studio family carousel loop                        | No                          | Long-running decorative loop.                               |

`duration[360]` has no literal source evidence in this snapshot. The Duration Foundation values remain a stable scale; a literal match alone is not a direct Foundation consumption.

## Easing Usage

| Value                            | Count | Main usages                                                   | Foundation match                | Notes                                                             |
| -------------------------------- | ----: | ------------------------------------------------------------- | ------------------------------- | ----------------------------------------------------------------- |
| `ease`                           |    51 | Buttons, controls, color and layout transitions               | No                              | Browser keyword used for local transitions.                       |
| `cubic-bezier(0.22, 1, 0.36, 1)` |    19 | Popovers, pagers, entry animations, palette and copy feedback | `easing.emphasized` value match | Repeated value, but no direct token property reference.           |
| `ease-in-out`                    |     4 | Scroll-cue and live-status looping animations                 | No                              | Looping / status motion.                                          |
| `linear`                         |     3 | Carousel loop and Color Studio visibility handoffs            | `easing.linear` value match     | Includes generic CSS use; it does not establish a component role. |

The exact `standard`, `decelerate`, and `accelerate` cubic-bezier values have no authored source match outside the Foundation Preview. `decelerate` and `accelerate` replace the former directional API names while preserving their values.

## Transition / Interaction-like Cases

Most short transitions are local interaction feedback: Button state changes use `120ms ease`; Website controls and entry surfaces commonly use `140ms` or `180ms`; Color Studio combines values from `140ms` through `560ms` for layout changes. These are observed implementation choices, not Motion Semantic tokens.

The 19 authored uses of the emphasized cubic-bezier value appear in popover entry, copy feedback, paging, palette feedback, and Color Studio transitions. They provide Foundation-value evidence only. Hover, focus, selected, and active behavior stays for a later Interaction review.

## Animation / Looping Cases

The source includes local animation names such as `enter`, `livePulse`, `tonalBurst`, `breathe`, and `familyCarouselLoop`. These names are animation identifiers, not Easing Foundation keys; the historical CSS `enter` identifier remains intentionally unrelated to the renamed `easing.decelerate` key.

- One-shot entry and feedback animations use `140ms`, `180ms`, or `420ms`, most often with the emphasized cubic-bezier value.
- Repeating `breathe` and `livePulse` effects use `1800ms` and `2200ms` with `ease-in-out`.
- The family carousel uses a `30000ms linear` infinite loop.
- Reduced-motion styles disable applicable transitions and animations with `none`; they are not scale values.

## Foundation Coverage

| Foundation member   | Direct source consumption outside preview | Literal timing evidence | Observation                                 |
| ------------------- | ----------------------------------------- | ----------------------- | ------------------------------------------- |
| `duration[0]`       | None                                      | 3 occurrences           | Visibility-handoff timing terms.            |
| `duration[120]`     | None                                      | 4 occurrences           | Button transitions.                         |
| `duration[180]`     | None                                      | 8 occurrences           | Controls and copy feedback.                 |
| `duration[240]`     | None                                      | 2 occurrences           | Color Studio layout.                        |
| `duration[360]`     | None                                      | None                    | No source literal in this snapshot.         |
| `duration[560]`     | None                                      | 11 occurrences          | Color Studio layout choreography.           |
| `easing.linear`     | None                                      | 3 occurrences           | Generic loop and visibility timing.         |
| `easing.standard`   | None                                      | None                    | No exact cubic-bezier source value.         |
| `easing.decelerate` | None                                      | None                    | No exact cubic-bezier source value.         |
| `easing.accelerate` | None                                      | None                    | No exact cubic-bezier source value.         |
| `easing.emphasized` | None                                      | 19 occurrences          | Popover, pager, entry, and feedback motion. |

The Website Motion Preview consumes the Foundation objects directly to display the complete Duration scale and Easing curves. It is documentation of the scale, not product-component evidence.

## Observations

The V1 Duration API uses stable numeric keys (`0`, `120`, `180`, `240`, `360`, `560`) and preserves the existing millisecond values. The V1 Easing API preserves its curve values and uses non-directional keys `decelerate` and `accelerate` in place of `enter` and `exit`.

The source contains several high-frequency local values outside the Foundation scale, particularly `140ms`, `160ms`, `260ms`, and `400ms`, plus looping values from `1800ms` to `30000ms`. These observations do not automatically expand the Foundation.

No Motion Semantic token is defined by this report. Future Component and Interaction work can use this evidence when an explicit shared need is established.
