# @virgo-design/ui

Virgo Design's styled React components, built on primitives, icons and the shared
token/theme contract. Applications own business state and translation resources.

## Installation

Requires React and ReactDOM 18 or later in the consuming application. To use the official themes:

```sh
pnpm add @virgo-design/ui @virgo-design/tokens @virgo-design/themes
```

## Usage

```tsx
import '@virgo-design/tokens/styles.css';
import '@virgo-design/themes/styles.css';
import '@virgo-design/ui/styles.css';
import { Button, LocaleProvider } from '@virgo-design/ui';
import { enUS } from '@virgo-design/ui/locale';

export function Example() {
  return (
    <div data-virgo-theme="virgo" data-theme="light">
      <LocaleProvider locale={enUS}>
        <Button type="button">Save changes</Button>
      </LocaleProvider>
    </div>
  );
}
```

Load styles once in this order: Tokens, Themes, UI, then application styles. The example sets a
local Virgo/light scope; applications can also set theme attributes on the document root and use
`@virgo-design/themes` to manage theme switching. `LocaleProvider` supplies built-in component
text; application copy is managed by the application's translation system.

## Package exports

- `@virgo-design/ui`: components, public types, `LocaleProvider` and `PortalProvider`.
- `/locale`: built-in `enUS` and `zhCN` packs and the complete `UILocale` contract.
- `/metadata`: component metadata for documentation and tooling.
- `/styles.css`: compiled component styles; load after token and theme styles.

Connect the application's language to `LocaleProvider` using `enUS`, `zhCN` or a complete custom
`UILocale` pack. Component APIs are documented in the Virgo Design website's Components section.
