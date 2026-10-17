# @virgo-design/tokens

Foundation values, semantic roles and component presentation tokens. Theme packages
implement this contract; UI and chart packages consume it.

## Usage

```ts
import '@virgo-design/tokens/styles.css';
import { getDefaultThemeTokens, tokenVars, validateThemeContract } from '@virgo-design/tokens';

const textColor = tokenVars['--vd-text-primary'];
const validation = validateThemeContract({
  contractVersion: 1,
  tokens: getDefaultThemeTokens(),
});
```

## Entries

- `@virgo-design/tokens`: typed values, CSS references, the catalog and validation APIs.
- `/styles.css`, `/foundations.css` and `/semantic-typography.css`: token stylesheets.
- `/catalog`, `/validation` and `/theme-contract`: focused data and validation entries.
- `/scss`, `/tailwind`, `/tailwind.css` and `/vanilla-extract`: styling integrations.

See [token architecture](../../docs/architecture/token-system.md) for ownership and
contract rules. Official theme implementations live in `@virgo-design/themes`.
