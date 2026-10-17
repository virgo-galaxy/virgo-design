# @virgo-design/primitives

Unstyled React components for interaction, state and accessibility behavior.
Applications provide visual styles, business data and visible text.

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

## Entries

- `@virgo-design/primitives`: component families, public types and `PortalProvider`.
- Compound components expose their parts on the family object, such as `Dialog.Content`.
- Internal hooks and implementation subpaths are private; no package stylesheet is needed.

Requires React and ReactDOM 18 or later. Detailed APIs and examples live in the Website.
