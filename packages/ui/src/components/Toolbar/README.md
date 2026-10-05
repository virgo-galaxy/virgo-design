# Toolbar

Use a labelled Toolbar for three or more independent actions, including dropdown or popover triggers.
Tab enters and exits the toolbar; arrow keys, Home and End move focus. Disabled controls are skipped.
Inputs and open popup triggers retain their own keyboard behavior. Prefer buttons and triggers over
controls that need the same arrow keys for editing.

```tsx
<Toolbar aria-label="Document actions" size="small" gap={8}>
  <Button>Save</Button>
  <Button variant="outline">Export</Button>
  <Dropdown>{/* trigger and menu */}</Dropdown>
</Toolbar>
```

Use `layout="custom"` with the existing className to preserve a consumer's current UI. This mode
adds no layout styling or spacing variables. Use `render` to reuse an existing Surface root without
adding an extra DOM wrapper. Set size only when intentionally changing the descendant button sizes.
Toolbar manages focus, not application state or selection. Use SegmentedControl for a single selected value.
