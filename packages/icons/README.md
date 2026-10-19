# @virgo-design/icons

Virgo's SVG icon assets and generated React components. Icons inherit `currentColor`
and support consumer-controlled sizing.

## Installation

Requires React 18 or later for the React components.

```sh
pnpm add @virgo-design/icons
```

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

Unlabeled icons are decorative and hidden from assistive technology. For a standalone meaningful
icon, supply `role="img"` and an accessible label. For an icon-only button, label the button and
leave the icon decorative.

## Package exports

- `@virgo-design/icons`: React icons and public props; unlabeled icons are decorative.
- `/metadata` and `/registry`: searchable metadata and the complete component registry.
- `/assets` and `/svg/*`: SVG source helpers and canonical SVG files.
- `/brands` and `/artwork`: colored brand resources and artwork.
- `/tooling`: SVG validation and custom icon source generation.

## Development

Edit canonical SVGs under this package's `icons/`, `brands/` or `artwork/` directory, then run
`pnpm gen:icons` from the repository root. Run `pnpm check:icons` to verify generated output.

Asset sources and licenses: [Third-party notices](./THIRD_PARTY_NOTICES.md).
