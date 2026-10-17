# @virgo-design/colors

Color conversion, ten-step tonal scales and palette generation. Semantic roles and
CSS variables belong to `@virgo-design/tokens`.

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

## Entries

- `@virgo-design/colors`: generators, color conversion, Virgo presets and public types.
- Scales use steps 1–10; `generateColorScale` preserves the base at step 6.
- Palette generation supports `oklch`, `hsl` and `hsv`.
