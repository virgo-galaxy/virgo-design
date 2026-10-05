# Tooltip

Tooltip provides a short, non-interactive description. Use Popover for forms, links and actions.

```tsx
<Tooltip openDelay={100}>
  <Tooltip.Trigger>Hover or focus</Tooltip.Trigger>
  <Tooltip.Content placement="top" arrow>
    Helpful context
  </Tooltip.Content>
</Tooltip>
```

Root supports `open`, `defaultOpen`, `onOpenChange`, `disabled`, `openDelay` (100ms), `closeOnClick` (true), native div props and ref. Pointer leave uses a 100ms crossing delay. Keyboard focus opens immediately; Escape or activation dismisses without stealing focus or blocking the trigger's action. Pointer entry after dismissal, or a fresh keyboard focus, can open it again. Touch hover is ignored.

Set `closeOnClick={false}` on Tooltip to keep its currently open description visible when the trigger is pressed or clicked. This includes keyboard activation. Update `Tooltip.Content` children for state feedback without remounting it. Pointer activation keeps the panel open only while the trigger or content remains hovered; its incidental native focus does not pin the panel after pointer leave. Keyboard focus still retains the panel normally. Escape, outside interaction and blur without hover dismiss it. Both pointerdown and click use the same option; no preventDefault workaround is needed.

```tsx
<Tooltip closeOnClick={false}>
  <Tooltip.Trigger onClick={() => setExpanded((value) => !value)}>Toggle</Tooltip.Trigger>
  <Tooltip.Content size="small">{expanded ? 'Hide source' : 'View source'}</Tooltip.Content>
</Tooltip>
```

Trigger defaults to Virgo Button (`variant="outline"`, `size="medium"`). Its `render` callback follows the existing Popover button contract: forward all supplied native button props and the HTMLButtonElement ref. Pass handlers, className, style and ARIA on Trigger so they compose correctly. Existing `aria-describedby` IDs are preserved; icon-only buttons still need their own accessible name. `Tooltip.Trigger disabled` keeps the native button disabled while allowing its tooltip to explain the reason on hover. Root `Tooltip disabled` disables the tooltip itself. Disabled native controls do not receive keyboard focus; put essential explanations in visible text.

Content supports `placement="top"`, `offset={8}`, `arrow={true}` and `tone="default"`, plus `size="small" | "medium"` (default `medium`). Content size is independent of Trigger button size. Small uses 12px text, 4px vertical / 8px horizontal padding and a proportional 8px arrow; medium retains the existing presentation. Twelve physical placements match Dropdown; logical `topStart`, `topEnd`, `bottomStart`, `bottomEnd` follow RTL. The arrow tracks the trigger's center after flip/shift. Tone options are `default`, `brand`, `success`, `warning`, `danger`, `info`, using existing theme tokens. Status tones (`success`, `warning`, `danger`, `info`) use the dedicated semantic `solid` / `onSolid` pair: strong colored backgrounds with light content and at least 4.5:1 normal-text contrast in both themes. Custom background/foreground can be supplied as `--tooltip-background` and `--tooltip-foreground` CSS variables via className; specify both for readable contrast. Content must not contain focusable controls.

Pass `anchorRef` to Content to position the panel and arrow against a smaller element inside the trigger, such as a table's sorting indicator. Hover, keyboard focus, click handling and the accessible description remain on the full Trigger.

For controlled hints on existing non-button controls, supply `anchorRef` on the Root and omit Trigger. The consumer manages `open`, pointer/focus handlers and the control's accessible description. The external anchor participates in positioning, overlay dismissal and tooltip handoff. `SegmentedControl.Item tooltip={label}` uses this path while preserving its native radio semantics.

Content portals to the document body, inherits the nearest data-theme and direction, and repositions on scroll, resize and content resize. CSS motion respects reduced motion. During exit, content is inert and aria-hidden and the description is removed from Trigger.

Use `Tooltip.Provider` to share presentation defaults across an application:

```tsx
<Tooltip.Provider size="small" arrow={showArrows}>
  <App />
</Tooltip.Provider>
```

Defaults apply through portals, including built-in Table sort and Dock control hints.
Nested providers inherit omitted options; explicit `Tooltip.Content` options take
precedence. Updating `arrow` changes open panels immediately without remounting.

When its trigger scrolls completely outside the viewport, the tooltip is hidden until the trigger returns, rather than remaining pinned to a screen edge.

`smoothTransition` defaults to `false`. Ordinary tooltips each use their own `openDelay` and gently scale/fade at their own trigger; they do not move from another tooltip's position or inherit its warm hover state.

Opt in with `<Tooltip smoothTransition>` on each participating tooltip. Between opted-in tooltips, the first hover uses `openDelay`; subsequent triggers open immediately while a smooth tooltip is active or within 300ms of its closing. The replacement starts at the previous panel's visual position and moves to its new anchor over the existing 120ms motion token, with no repeated fade-in. Rapid handoffs use the current in-flight position. Reduced motion skips the movement. Switching to or from an ordinary tooltip uses the ordinary delay and fade instead. Only the smooth-transition documentation example enables this option.

Only one tooltip is presented per document. Opening another cancels pending hover timers and closes the old panel without moving focus; ordinary panels finish their exit animation in place, while opted-in smooth handoffs remove the old panel immediately. Controlled tooltips receive `onOpenChange(false)` on handoff; a stale `open` value cannot keep the superseded panel visible. A new trigger interaction or a subsequent false-to-true open change can present it again. Ordinary dismissal still uses the exit animation.

The shared internal overlay remains private. The presentation provider is optional.
Documentation: `/components/tooltip`.
