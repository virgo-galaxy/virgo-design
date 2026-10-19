# @virgo-design/tokens

Foundation values, semantic roles and component presentation tokens. Theme packages
implement this contract; UI and chart packages consume it.

## Installation

```sh
pnpm add @virgo-design/tokens
```

## Usage

```ts
import '@virgo-design/tokens/styles.css';
import {
  getDefaultThemeTokens,
  THEME_CONTRACT_VERSION,
  tokenVars,
  validateThemeContract,
} from '@virgo-design/tokens';

const textColor = tokenVars['--vd-text-primary'];
const validation = validateThemeContract({
  contractVersion: THEME_CONTRACT_VERSION,
  tokens: getDefaultThemeTokens(),
});
```

Import token styles once in the application's global entry. JavaScript imports do not load CSS.
`tokenVars` contains CSS variable references; `getDefaultThemeTokens()` provides light and dark
declarations for custom theme authors.

## Package exports

- `@virgo-design/tokens`: typed values, CSS references, the catalog and validation APIs.
- `/foundations`, `/semantic`, `/semantic/color`, `/semantic/typography` and `/themes`: token data.
- `/styles.css`, `/foundations.css` and `/semantic-typography.css`: token stylesheets.
- `/themes.css`: default presentation token declarations.
- `/catalog`, `/validation` and `/theme-contract`: focused data and validation entries.
- `/scss`, `/tailwind`, `/tailwind.css` and `/vanilla-extract`: styling integrations.

See [token and theme architecture](../../docs/architecture/token-system.md) for ownership and
contract rules. Official theme implementations live in `@virgo-design/themes`.
