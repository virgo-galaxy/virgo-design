# Slider

`Slider` keeps the existing native single-value API. `Slider.Range` supports two or more ordered values using the same numeric `min`, `max` and `step` domain.

```tsx
<Slider.Range
  aria-label="Column width"
  min={24}
  max={3000}
  value={[minimum, current, maximum]}
  thumbLabels={['Minimum width', 'Current width', 'Maximum width']}
  getValueText={(value) => `${value} px`}
  onValueChange={([minimum, current, maximum]) => {
    // Store all three values together.
  }}
/>
```

Use two values for an ordinary interval. Three values can model a current value within editable bounds; the component itself does not assign business meaning to the values. Values are normalized to the domain and step. A thumb cannot cross either neighbor. Equal values are allowed, and tab order remains stable when thumbs coincide.

Each thumb has its own accessible name, current value and neighbor-dependent ARIA bounds. Arrow keys edit one step, Page Up/Down edit ten steps, and Home/End reach the thumb's permitted bounds. Horizontal arrow and pointer direction follow RTL layout. Clicking the track edits the nearest thumb. Pointer cancellation restores the values from the start of the drag.

`onThumbFocus(index)` identifies the focused thumb for linked controls such as a precise numeric input. It also runs when a pointer interaction focuses the nearest thumb; indices follow the value order and start at zero.

Controlled values remain authoritative. `defaultValue` enables uncontrolled use; form reset restores its initial values. `disabled` and `readOnly` inherit from Field/Form. With `name`, hidden inputs submit repeated, ordered values through native FormData. Disabled values are excluded.

The public primitive owns behavior; the styled component uses existing sizing, border, surface, text and brand tokens. Consumers may style the `track`, `range`, `thumb` and `value` data slots.
