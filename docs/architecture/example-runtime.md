# Website Example Runtime

## Ownership

An example is one understandable use case, not an entire documentation page and not necessarily
one individual control. Button variants belong together in a short example. Icon-only controls are
a separate example. Dialog sizes and a controlled form are separate examples.

The Website currently uses this model on Button and Dialog. Other component pages retain their
existing review presentation; this change does not bulk-migrate them.

The page structure is an article:

```text
ArticleSection
  h2 + subtle visual numbering + description
  ComponentExample (one or more)
    optional h3 + description, OUTSIDE the frame
    frame
      live preview — plain background, no coordinate grid
      right-aligned borderless Code / Copy actions + small Tooltip
      raw source — hidden initially, expands inside the same frame
```

`ArticleSection` and `ComponentExample` are Website-local documentation infrastructure, not
public `@virgo-design/ui` components. The toolbar uses the real Virgo `Button`, `Tooltip`,
`CodeIcon` and `CopyIcon`; it does not draw its own glyphs or nest buttons.

The page hero/reference specimen may keep its existing grid. Ordinary example previews do not
use a grid, and headings/descriptions are not enclosed in a second review card.

For a section with one example, use `showCaption={false}` to avoid repeating the introduction.
For a section with several examples, the default caption renders each example's h3 and description
above its own frame. Example metadata supplies these captions, not the executable TSX file.

## One executable source

A complete example is maintained in one file:

```tsx
import { Button } from '@virgo-design/ui';

export default function App() {
  return <Button>Save changes</Button>;
}
```

The Website's example manifest imports that same file in two forms:

```ts
import Example from './Example';
import source from './Example.tsx?raw';
```

The normal import executes the demo. The raw import supplies the displayed and copied code. The
runtime does not reconstruct JSX, call `toString()`, evaluate text, extract AST nodes, or maintain
another source string. Both rendering and copying receive the exact `source`, including its final
newline. Vite performs the raw import at development/build time, not with browser file-system access.

Each example uses `export default function App()`, real required imports, and only the state/helpers
needed to demonstrate the subject. Simple native layout is allowed. Website-only `ArticleSection`,
`ReviewSection`, metadata, cards, measurements and documentation helpers stay outside it.

Button/Dialog migrated metadata keep `examples: []`; do not reintroduce duplicate `code` snippets.
Other components' metadata are out of this change's scope.

## Interaction contract

- Source starts collapsed. A single Code button toggles it and updates `aria-expanded` and
  `aria-controls`. `useId` keeps panel IDs distinct even when the same example renders twice.
- The running example stays mounted while source opens/closes. In-progress forms are not reset.
- Actions are real `type="button"` controls with accessible labels. They support Enter/Space and
  visible keyboard focus. Use the existing icon-only `variant="text"` Button; no circle or visible
  border is added. Each has a `Tooltip.Content size="small"`, available on hover and keyboard focus.
- Copy is available while source is collapsed. It writes the full raw file, not the selected text
  and not just the JSX. Repeated clicks while a write is pending are ignored.
- Success is reported only after `writeText` resolves. The Tooltip says `Copied`, then resets to
  `Copy source` after two seconds without closing. A visually hidden polite live region announces
  copy feedback for screen readers; no success/error text occupies the left side of the toolbar.
- Missing/denied clipboard access never reports success and never rejects out of the event handler.
  The source opens for manual copying. Failure text stays in the Tooltip with a non-visual live
  announcement; the user may retry.
- Timers are cleaned up on unmount, and resolved clipboard work never sets state after unmount.
- Both action Tooltips opt into `closeOnClick={false}`. Pointerdown, click and keyboard activation
  update text in the existing panel rather than dismissing/reopening it. Escape still closes the
  Tooltip, not the example; outside interaction and leaving hover/focus also retain normal dismissal.
  This is a shared primitive behavior option, not a Website-local open-state workaround. Other
  Tooltip consumers retain the default `closeOnClick={true}` behavior.
- Source is plain escaped `<pre><code>` text. Long lines scroll inside the source area; the page
  does not widen. Source is focusable when visible for keyboard scrolling and selection.

No Shiki, Prism, highlight.js, editor or syntax-highlighting dependency is introduced. A future
Virgo highlighter can replace the code renderer without changing where the source comes from.
No new global theme state is introduced; the docs and portalled Tooltips use the existing theme.

## Button and Dialog inventory

Button has four article sections and five source-backed examples:

- Variants → `ButtonVariantsExample.tsx`
- Sizes → `ButtonSizesExample.tsx`
- Icons → `ButtonIconsExample.tsx`, `ButtonIconOnlyExample.tsx`
- States → `ButtonStatesExample.tsx`

Dialog has two article sections and two source-backed examples:

- Sizes → `DialogSizesExample.tsx`
- Form dialog → `DialogFormExample.tsx`

There is no extra bottom-of-page `Examples` section. Relationships remain outside the page content
at the existing end-of-document location.

## Cleanup

Replaced the old `details`/`summary` source UI, the in-frame caption row and textual Copy/TSX row.
Removed preview grid rules, the extra `component-example-list` wrapper/padding, and stale Dialog
review-card/form-demo styles. Button and Dialog no longer use the old `ReviewSection` cards.
`ReviewSection` itself remains because other, not-yet-migrated pages still use it.

Old Phase-1 demo files are removed by the installer only when they match the known supplied version.
Unknown local edits stop installation rather than being silently overwritten or deleted.

## Verification

Repository tests cover article structure, exact raw source, disclosure semantics, unique panel IDs,
keyboard actions, real Virgo icons/Tooltip, clipboard success/failure/pending/unmount behavior,
and stateful Dialog integration. The root `pnpm all` remains the final workspace gate.

The delivery environment could not install this project's locked dependencies. An isolated Chromium
harness exercised the real TypeScript-transpiled project components and generated token values with
an available React 18.2.0 runtime; this is supplementary, not a substitute for the project's locked
React 19/Vite/Vitest suite. Clipboard results were simulated in that harness. The user must run
`verify.sh`/`pnpm all` in the real repository before committing.

Reference behavior: Vite static asset raw imports, WAI-ARIA Disclosure pattern, and the browser
Clipboard `writeText` API. Clipboard access is subject to the browser's secure-context/permission rules.
