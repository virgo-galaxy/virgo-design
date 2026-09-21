# Segmented Control verification

This is a separate development-only browser fixture. It is not registered in the
Playground router or sidebar, and is not imported by the production entry point.

Start the existing UI Playground development server with `pnpm dev:ui`, then open
`http://127.0.0.1:6302/segmented-control-check.html` and click **Run all checks**.
The controls can also be used to inspect individual cases manually.

## Browser matrix

The fixture imports the actual public `SegmentedControl` with the repository's
fonts and tokens. It renders 48 combinations: two themes × three variants × four
sizes × two motion modes. Component instances stay mounted while content, width,
selected value, fonts, and scale change.

The full run performs 5,760 group-state checks:

- 3,168 content checks: short/long Chinese, unequal-width English, mixed scripts
  and emoji, 80-character unbroken strings, RTL Arabic, ReactNode/icon content,
  and a single item. Each option is selected at intrinsic width, 180.5px, and
  320px. The first option deliberately uses an empty string value.
- 2,592 font/scale checks: design fonts, a system serif fallback, and an on-demand
  web monospace font, with 90% / 100% / 125% ancestor CSS `zoom` and `transform`
  scaling. Font loading and transitions settle before measurement.

Checks compare all four indicator edges against the actual selected item, with
a 0.08 CSS-pixel tolerance for browser layout quantization. They also check item
containment, outline/solid full-height coverage, native frame borders, and the
absence of a separately transformed indicator layer. Fixed-width long labels use
the existing ellipsis treatment; they do not enlarge or break the frame.

These are real browser geometry/paint-style checks, not screenshot-diff tests.
Inspect rendered edges, hover, keyboard focus, and moving indicators manually as
well. Native border antialiasing on curves and scaling applied to the entire page
must not be confused with content-dependent indicator drift or doubled borders.

## Automated regression tests

Run `pnpm exec vitest run packages/ui/src/segmented-control/SegmentedControl.test.tsx`.
The tests cover empty values, absence of a default selection, fractional widths
inside scaled ancestors, resize/font notifications, and replacing text or adding
items while preserving the selected value, alongside the existing interaction
tests. They are part of `pnpm all`; jsdom tests do not claim to verify pixels.

No content-specific widths or locale-specific branches are used by the component.
