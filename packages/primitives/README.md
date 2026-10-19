# @virgo-design/primitives

Unstyled React components for interaction, state and accessibility behavior.
Applications provide visual styles, business data and visible text.

## Installation

Requires React and ReactDOM 18 or later in the consuming application.

```sh
pnpm add @virgo-design/primitives
```

## Usage

```tsx
import { Dialog } from '@virgo-design/primitives';

export function Example() {
  return (
    <Dialog.Root>
      <Dialog.Trigger>Open details</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay" />
        <Dialog.Content className="dialog-content">
          <Dialog.Title>Project details</Dialog.Title>
          <Dialog.Description>Review the project before continuing.</Dialog.Description>
          <Dialog.Close>Close</Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
```

Style the dialog parts through the supplied classes. Primitives handle interaction and
accessibility; the example's overlay, content layout and visual treatment belong to the application.

## Package exports

- `@virgo-design/primitives`: component families, public types and `PortalProvider`.
- Compound components expose their parts on the family object, such as `Dialog.Content`.
- Internal hooks and implementation subpaths are private; no package stylesheet is needed.

Component APIs are documented in the Virgo Design website's Primitives section.
