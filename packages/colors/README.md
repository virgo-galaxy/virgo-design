# @virgo-design/colors

Color conversion, ten-step tonal scales and palette generation. Semantic roles and
CSS variables belong to `@virgo-design/tokens`.

## Installation

```sh
pnpm add @virgo-design/colors
```

## Usage

```ts
import { generateColorPalette, generateColorScale } from '@virgo-design/colors';

const scale = generateColorScale('#1664f9');
const palette = generateColorPalette({
  linked: true,
  anchor: '#1664f9',
  anchorFamily: 'blue',
  model: 'oklch',
});
```

## API

Import generators, color conversion functions, Virgo presets and public types from
`@virgo-design/colors`. The package does not require React or a browser.

Scales use steps 1–10. `generateColorScale` returns hex colors and preserves the normalized base
color at step 6. Palette generation supports `oklch`, `hsl` and `hsv`.
