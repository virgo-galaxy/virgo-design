# @virgo-design/themes

Theme presets and runtime switching for the token contract. Official themes are
`virgo`, `minimal`, `soft`, `glass`, `retro` and `contrast`, each with light and dark appearances.

## Installation

```sh
pnpm add @virgo-design/themes @virgo-design/tokens
```

## Usage

```ts
import '@virgo-design/tokens/styles.css';
import '@virgo-design/themes/styles.css';
import { initializeTheme, setTheme } from '@virgo-design/themes';

initializeTheme({ defaultTheme: 'virgo' });

export function selectSoftTheme() {
  setTheme('soft');
}
```

Call `initializeTheme` in the browser before rendering, and `setTheme` from your theme selector.
Initialization restores a saved theme or uses the configured default. Light/dark appearance is
managed separately through the `data-theme` attribute on the theme scope.

## Package exports

- `@virgo-design/themes`: theme runtime, registry, CSS generation and first-paint setup.
- `/styles.css`: all six official themes.
- `/<theme>.css`: one official theme, such as `/soft.css`.
- Theme scopes use `data-virgo-theme` for the preset and `data-theme` for appearance.

Applications configure preference storage and load the required stylesheets explicitly.
See [token and theme architecture](../../docs/architecture/token-system.md) for first-paint,
nested scope, custom themes and server-rendering setup.
