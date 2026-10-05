# Button and Button.Group

Button triggers an action. Its icon and label can change when application state changes.
Button.Group groups related independent actions; every button remains a normal Tab stop.
It has no selected value and is not a SegmentedControl.

```tsx
<Button.Group aria-label="Form actions" align="between">
  <Button variant="outline">Restore defaults</Button>
  <Button>Done</Button>
</Button.Group>

<Button.Group aria-label="Editing actions" variant="attached" size="small">
  <Button variant="outline">Copy</Button>
  <Button variant="outline">Paste</Button>
</Button.Group>
```

Spaced groups allow arbitrary trigger wrappers. Attached groups accept direct Button children.
An explicit Button size overrides the inherited group size. Use `layout="custom"` to keep an
existing layout unchanged, including consumer CSS and direct-child selectors. `render` allows
reusing a Surface, Dialog.Footer or another div-based root without an extra wrapper.
