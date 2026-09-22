# Popover

A non-modal panel for arbitrary UI content. It follows the same primitive, styled compound component, metadata, Playground and test layers as the existing components.

```tsx
import { Input, Popover } from '@virgo-design/ui';

<Popover>
  <Popover.Trigger>Edit workspace</Popover.Trigger>
  <Popover.Content aria-label="Workspace settings" arrow>
    <Input aria-label="Workspace name" defaultValue="Virgo" />
    <Popover.Close>Done</Popover.Close>
  </Popover.Content>
</Popover>;
```

| Part    | Props and defaults                                                                                                      |
| ------- | ----------------------------------------------------------------------------------------------------------------------- |
| Popover | `open`, `defaultOpen=false`, `onOpenChange`, `trigger="click"` or `"hover"`, `disabled=false`; native div props and ref |
| Trigger | Native button props and ref; Virgo Button `variant="outline"`, `size="medium"`                                          |
| Content | Native div props and ref; `placement="bottomStart"`, `offset=8` pixels, `arrow=false`                                   |
| Close   | Native button props and ref; optional children (default `Close`)                                                        |

`className` and `style` always target the element represented by the part. Content positioning owns `position`, `left`, `top`, viewport constraints and visibility; custom width and content styling remain available. Content supplies `role="dialog"` and is labelled by Trigger, or by the caller's `aria-label` / `aria-labelledby`. It is not modal and does not lock scrolling or trap focus. Avoid nesting interactive elements inside Trigger; use its button content or the primitive's button-render callback.

Click/Enter/Space focuses the first enabled control, or Content for plain text. Hover opens without focus movement, allows crossing the gap, and remains open while an input inside owns focus. Tab traverses the panel's controls, then continues after the trigger; Shift+Tab from the first control returns to the trigger. Escape dismisses the topmost overlay. A menu inside a Popover remains a separate keyboard scope. Outside pointer/focus closes without taking focus away from the user's destination. Close and external controlled closing restore trigger focus when it is still inside the panel. Actions which deliberately move focus elsewhere retain that destination.

Content portals to `document.body`, escaping ancestor overflow clipping. Its nearest `data-theme` and computed direction are synchronized while mounted. Put custom token overrides on Content or the global theme when they must cross the portal. `bottomStart`, `bottomEnd`, `topStart` and `topEnd` mirror in RTL; the twelve Dropdown-style physical placements (`bottomLeft`, `bottom`, `bottomRight`, etc.) stay physical. Viewport collisions flip/shift the panel; scroll, resize and ResizeObserver update placement. The arrow tracks the trigger after adjustments.

UI uses a short opacity enter/exit animation from existing motion tokens, disabled by reduced motion. Closed content is immediately inert and aria-hidden, then unmounts after its CSS exit duration. The unstyled primitive has no animation delay unless given animated CSS.

The styled content viewport scrolls when constrained. Nested floating controls should portal their popup, as Dropdown does. Select still uses its existing inline listbox in this release and can be clipped by this scrolling viewport; its overlay migration is deferred.

## Custom trigger

Without `render`, Trigger remains a Virgo Button. Supplying `render` delegates directly to the primitive's existing callback and types, without a Virgo Button wrapper or trigger styles:

```tsx
<Popover>
  <Popover.Trigger
    aria-label="Profile"
    className="avatar-trigger"
    render={(props) => <button {...props}>VD</button>}
  />
  <Popover.Content>Profile details</Popover.Content>
</Popover>
```

The existing primitive contract supplies native **button** props and an `HTMLButtonElement` ref. A custom avatar, icon or card trigger should forward all supplied props and ref to its button element; this preserves click/keyboard handlers, ARIA, positioning and focus return. For React 18 custom components, use `forwardRef`. Pass user handlers, `className` and `style` to Trigger so the primitive can compose behavior; do not overwrite the supplied handlers or ref in the renderer. `variant` and `size` style only the default Virgo Button, not custom rendering.

Metadata: `@virgo-design/ui/metadata`. Interactive examples: `/components/popover`.
