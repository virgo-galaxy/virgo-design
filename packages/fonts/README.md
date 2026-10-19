# @virgo-design/fonts

Shared font stylesheets and font metadata. Applications choose the families to load
and apply them through their own styles or theme.

## Installation

```sh
pnpm add @virgo-design/fonts
```

## Usage

```ts
import '@virgo-design/fonts/sans/inter.css';
import '@virgo-design/fonts/sans/noto-sans-sc.css';
import '@virgo-design/fonts/mono/jetbrains-mono.css';
import { monoFonts, sansFonts } from '@virgo-design/fonts';

const bodyFamily = sansFonts.inter.cssFamily;
const codeFamily = monoFonts.jetbrainsMono.cssFamily;
```

The CSS imports define `@font-face` rules. Apply the selected families through `font-family` in
your application styles, using the metadata's `cssFamily` values or the declared font names.

## Package exports

- `@virgo-design/fonts`: `sansFonts`, `monoFonts` and their public types.
- `/default.css`: Inter, the five Noto Sans regional families and JetBrains Mono.
- `/sans.css` and `/mono.css`: all families in the corresponding category.
- `/sans/<family>.css` and `/mono/<family>.css`: one selected family.

Metadata imports do not load stylesheets. Font assets come from the package's
`@fontsource-variable` dependencies and are served by the consuming application.
