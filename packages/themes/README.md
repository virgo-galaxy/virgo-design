# @virgo-design/themes

Theme presets and runtime switching for the token contract. Official themes are
`virgo`, `minimal`, `soft`, `glass`, `retro` and `contrast`, each with light and dark appearances.

## Usage

```ts
import '@virgo-design/tokens/styles.css';
import '@virgo-design/themes/styles.css';
import { initializeTheme, setTheme } from '@virgo-design/themes';

initializeTheme();
setTheme('soft');
```

## Entries

- `@virgo-design/themes`: theme runtime, registry, CSS generation and first-paint setup.
- `/styles.css`: all six official themes.
- `/<theme>.css`: one official theme, such as `/soft.css`.
- Theme scopes use `data-virgo-theme` for the preset and `data-theme` for appearance.

Initialize the browser runtime before rendering. Applications choose appearance and
configure preference storage. See [theme architecture](../../docs/architecture/theme-system.md)
for first-paint, nested scope and server-rendering setup.
