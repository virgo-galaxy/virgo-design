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
      one Code toggle in the lower-right corner + small Tooltip
    source panel — hidden initially, BELOW the preview frame
      header: static React logo + React framework label on the left, Copy on the right
      exact raw source in pre/code
    visually hidden copy announcement
```

`ArticleSection` and `ComponentExample` are Website-local documentation infrastructure, not
public `@virgo-design/ui` components. The toolbar uses the real Virgo `Button`, `Tooltip`,
`CodeIcon`, `CopyIcon` and `CheckIcon`. The React framework label uses the local
`react-logo.svg` asset supplied for the Website; it is not added to the public icon package.
No controls nest buttons.

The page hero/reference specimen may keep its existing grid. Pages using this runtime wrap their
examples in `ComponentExampleRuntimeProvider` and place `ComponentExampleRuntimeControl` at the
right edge of the hero specimen caption. The control is text-only: `Expand all` while any example
is collapsed, and `Collapse all` only when every registered example is open. Individual source
toggles feed the same state, so manually opening the final collapsed example updates the hero
control immediately. Ordinary example previews do not use a grid, and headings/descriptions are
not enclosed in a second review card.

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

- Source starts collapsed. One Code button remains at the preview's lower-right corner and
  toggles `aria-expanded` and `aria-controls`. `useId` keeps panel IDs distinct even when the
  same example renders twice. Copy is not shown in the preview. The page-level runtime provider
  owns disclosure state when present; standalone `ComponentExample` usage keeps the same local
  fallback behavior.
- The text-only hero action is synchronized with every registered example. If none, one, or only
  some sources are open it reads `Expand all` and opens every source. Once all sources are open—
  whether through that action or individual Code buttons—it reads `Collapse all` and closes them
  together on activation. No icon is used for this page-level action.
- The source panel header places a static React-logo-and-`React` framework label on the left,
  with Copy aligned to the right. The preview disclosure, source header, code body, and Copy action
  share one inset token (16px desktop, 12px compact), so the React logo aligns with source text and
  the disclosure/Copy controls share one vertical axis. The supplied logo stays cyan (`#61DAFB`) at 16px, while the
  text keeps its neutral color. The framework label is presentational only: it is not a button,
  has no hover/focus state, and does not own a Tooltip. Source disclosure remains exclusively on
  the persistent Code button in the preview's lower-right corner.
  `React` is the display label; the source remains TSX (`data-language="tsx"`) and the raw file is
  unchanged. This documentation metadata is never included in the displayed or copied source.
- The running example stays mounted while source opens/closes. In-progress forms are not reset.
  Source disclosure uses a 240ms emphasized grid/margin transition with a shorter 180ms opacity
  transition in both directions, replacing the previous 120ms enter-only animation. Reduced-motion
  preferences still disable the transition.
- Actions are real `type="button"` controls with accessible English labels and existing Virgo
  icons. They support Enter/Space and visible keyboard focus. The icon-only `variant="text"`
  Button uses its public `shape="circle"` and neutral hover/pressed fills. The preview and Copy
  actions both use the small icon-button size so their centers share one right-edge control axis.
  The React framework label is static metadata rather than an action. No permanent visible border
  is added.
- Copy is available in the expanded source header. It writes the full raw file, not the selected
  text, the `React` header, or just the JSX. Repeated clicks during a pending write are ignored.
- Success is reported only after `writeText` resolves: CopyIcon becomes CheckIcon using the shared
  `--vd-status-success-accent` semantic token, and the Tooltip says `Copied`. Both reset after two
  seconds without dismissing the Tooltip or moving the button.
  A new copy clears the previous reset timer. Pending and failed writes never show a success icon.
- A visually hidden polite live region outside both panels announces copy feedback. No status text
  displaces the header's controls or its language label.
- Missing/denied clipboard access never reports success and never rejects out of the event handler.
  Failure text stays in the Tooltip with a non-visual announcement; the user may retry or select
  the visible code manually. A delayed failure does not reopen a panel deliberately collapsed
  while the clipboard request was pending.
- Timers are cleaned up on unmount, and resolved clipboard work never sets state after unmount.
- The preview toggle and Copy Tooltips opt into `closeOnClick={false}` so repeated activation
  updates their existing panels rather than dismissing/reopening them. Both runtime Tooltips also
  set `arrow={false}` for this compact source-control treatment; Tooltip itself keeps `arrow=true`
  as its public default. Header controls are unmounted when source closes, so no portalled Tooltip
  survives its hidden trigger. Escape still dismisses a Tooltip rather than closing the source.
- Source is plain escaped `<pre><code>` text. Long lines wrap inside the source area without
  widening the page. The code is focusable when visible for keyboard selection.

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

Replaced the old `details`/`summary` source UI and the in-frame caption row. The React-labelled
source header belongs to the separate source panel as static framework metadata, not to the preview;
the code language is TSX.
Removed preview grid rules, the extra `component-example-list` wrapper/padding, and stale Dialog
review-card/form-demo styles. Button and Dialog no longer use the old `ReviewSection` cards.
`ReviewSection` itself remains because other, not-yet-migrated pages still use it.

Old Phase-1 demo files are removed by the installer only when they match the known supplied version.
Unknown local edits stop installation rather than being silently overwritten or deleted.

## Verification

Repository tests cover article structure, exact raw source, disclosure semantics, unique panel IDs,
keyboard disclosure actions, static React framework metadata, the synchronized Expand all / Collapse
all runtime control, real Virgo icons/Tooltip, copy-to-check feedback, clipboard
success/failure/pending/retry/unmount behavior, and stateful Dialog integration. The root `pnpm all`
remains the final workspace gate.

Run `pnpm all` from the repository root with its locked dependencies before committing. Isolated
browser or syntax checks are supplementary and do not replace this workspace validation.

Reference behavior: Vite static asset raw imports, WAI-ARIA Disclosure pattern, and the browser
Clipboard `writeText` API. Clipboard access is subject to the browser's secure-context/permission rules.
