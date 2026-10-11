# Virgo Design Tokens

Foundations come from the existing Virgo palette. Semantic roles are resolved by `themes.light` and `themes.dark`; `pnpm build:tokens` generates the CSS bridge from those same values.

## Status colors

Each of `success`, `warning`, `danger`, and `info` has these roles:

| Role         | Purpose                                                                                                                                                                                                        |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `solid`      | Strong, opaque status surfaces: Tooltip, solid Badge/Tag, status Pill and strong Toast regions.                                                                                                                |
| `onSolid`    | Text and icons on `solid`. Light foreground in both themes, with at least 4.5:1 contrast for normal text. Always use the pair together.                                                                        |
| `subtle`     | Low-emphasis status backgrounds, including Alert and status cards. May contain alpha in Dark.                                                                                                                  |
| `border`     | Status outlines, paired with subtle backgrounds or validation controls.                                                                                                                                        |
| `text`       | Status text on subtle or ordinary theme surfaces.                                                                                                                                                              |
| `accent`     | Theme-adaptive attention color for indicator dots, icons, validation focus borders and danger actions. Dark themes can resolve to brighter palette steps. Not the background of a text-bearing strong surface. |
| `foreground` | Foreground paired specifically with `accent` for compact filled indicators. May be dark. It is not a substitute for `onSolid`.                                                                                 |

`accent` and `foreground` remain independent roles with their existing resolutions, not aliases for `solid` and `onSolid`. The usage audit found accent consumers in Input/Textarea and Select validation borders, Dropdown danger actions, and the Playground build indicator. They keep the existing semantics. Tooltip and Website's strong status specimens now consume `solid` / `onSolid`; subtle surfaces are unchanged.

### Solid palette selection

Both themes intentionally resolve the solid pairs to the same existing palette steps:

| Status  | Solid foundation | On-solid foundation | Contrast (approx.) |
| ------- | ---------------- | ------------------- | ------------------ |
| Success | `green[8]`       | `neutral[1]`        | 4.66:1             |
| Warning | `amber[8]`       | `neutral[1]`        | 4.69:1             |
| Danger  | `red[7]`         | `neutral[1]`        | 5.07:1             |
| Info    | `blue[7]`        | `neutral[1]`        | 5.10:1             |

Contrast uses WCAG sRGB relative luminance and the actual off-white token, not an assumed pure white. Tests enforce the 4.5:1 minimum in both themes. Website → Tokens → Colors calculates live ratios from the resolved tokens and shows pass/fail alongside the solid and subtle specimens, token names, values and swatches. Expand the indicator pair to inspect `accent` / `foreground` separately.

```ts
import { statusColorTokens, themes } from '@virgo-design/tokens';

statusColorTokens.success.onSolid; // 'status.success.onSolid'
themes.dark.color.status.success.solid;
```

```css
.success-surface {
  background: var(--vd-status-success-solid);
  color: var(--vd-status-success-on-solid);
}
```

JavaScript role `onSolid` exports as CSS `on-solid`. Package CSS and Website's CSS export use the same naming convention. No legacy role is removed or silently remapped.

## Theme System

Tokens owns `themeContract` and `THEME_CONTRACT_VERSION`, with Virgo fallbacks
and appearance-aware semantic variable bridges. Official style implementations
live in `@virgo-design/themes`. `themes.light` / `themes.dark` remain the
backward-compatible Virgo appearance data; they are not the six style presets.
Theme presentation uses separate `--vd-shape-*`, `--vd-control-*`, `--vd-motion-*`
and component roles, so Foundation color/spacing/radius/motion scales stay intact.
See [the theme package](../themes/README.md) and Website `/themes`.
