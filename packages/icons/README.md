# @virgo-design/icons

Virgo's SVG icon assets and generated React components. Icons inherit `currentColor`
and support consumer-controlled sizing.

## Usage

```tsx
import { PlusIcon, SearchIcon } from '@virgo-design/icons';

export function Example() {
  return (
    <>
      <PlusIcon size={20} />
      <SearchIcon size={20} role="img" aria-label="Search" />
    </>
  );
}
```

## Entries

- `@virgo-design/icons`: React icons and public props; unlabeled icons are decorative.
- `/metadata` and `/registry`: searchable metadata and the complete component registry.
- `/assets` and `/svg/*`: SVG source helpers and canonical SVG files.
- `/brands` and `/artwork`: colored brand resources and artwork.
- `/tooling`: SVG validation and custom icon source generation.

Requires React 18 or later. Edit canonical SVGs in `icons/` and run `pnpm gen:icons`
from the repository root. Run `pnpm check:icons` to check generated output.

Asset sources and licenses: [Third-party notices](./THIRD_PARTY_NOTICES.md).
