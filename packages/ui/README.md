# @virgo-design/ui

Virgo Design's styled React components, built on primitives, icons and the shared
token/theme contract. Applications own business state and translation resources.

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

## Entries

- `@virgo-design/ui`: components, public types, `LocaleProvider` and `PortalProvider`.
- `/locale`: built-in `enUS` and `zhCN` packs and the complete `UILocale` contract.
- `/metadata`: component metadata for documentation and tooling.
- `/styles.css`: compiled component styles; load after token and theme styles.

Requires React and ReactDOM 18 or later. Applications initialize themes and connect
their current language to `LocaleProvider`. Detailed APIs and examples live in the Website.
