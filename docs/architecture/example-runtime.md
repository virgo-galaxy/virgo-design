# Website Example Runtime

## Ownership

An example is one understandable use case, not an entire documentation page and not necessarily
one individual control. Button variants belong together in a short example. Icon-only controls are
a separate example. Dialog sizes and a controlled form are separate examples.

All 37 component pages use this model. The current runtime contains 209 executable
examples across 159 article sections, including Textarea inside the Input family. The existing
chapter anchors and every hero/reference specimen are preserved.

Each page is an assembly of documentation and imported examples. State, event handlers, fixtures,
providers, and demonstration layout belong to the example that needs them, not to its page.
A section can contain several independent use cases: for example, Input clearability and password
visibility, Tag icons and removable collections, or inline and dialog command palettes.

The page structure is an article:

```text
ArticleSection
  h2 + subtle visual numbering + description
  ComponentExample (one or more)
    optional h3 + description, OUTSIDE the frame
    frame
      live preview — plain background, no coordinate grid
      Open-in-new-window + Code actions in the lower-right corner + small Tooltips
    source panel — hidden initially, BELOW the preview frame
      header: React / SCSS tabs on the left, Copy on the right
      exact active raw file in pre/code
    visually hidden copy announcement
```

`ArticleSection` and `ComponentExample` are Website-local documentation infrastructure, not
public `@virgo-design/ui` components. The toolbar uses the real Virgo `Button`, `Tooltip`,
`ExternalLinkIcon`, `CodeIcon`, `CopyIcon` and `CheckIcon`. Source tabs use the local
`react-logo.svg` and `sass-logo.svg` assets supplied for the Website; these framework marks are not
added to the public icon package. No controls nest buttons.

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

## One executable example, two exact source files

A complete example owns one React file and one neighboring SCSS file:

```tsx
import styles from './Example.module.scss';

import { Button } from '@virgo-design/ui';

export default function App() {
  return <Button className={styles.action}>Save changes</Button>;
}
```

```scss
.action {
  margin-inline: auto;
}
```

The Website manifest imports the executable React module plus both files as raw source:

```ts
import Example from './Example';
import styleSource from './Example.module.scss?raw';
import source from './Example.tsx?raw';
```

The normal TSX import executes the demo and its CSS Module import applies the exact companion
stylesheet. Raw imports supply the two source tabs and Copy action. The runtime never reconstructs
JSX or CSS, calls `toString()`, evaluates text, extracts AST nodes in the browser, or maintains a
second handwritten snippet. Rendering, viewing, and copying therefore stay tied to the real files.
Vite resolves both raw imports at development/build time; no browser file-system access is used.

Every example uses `export default function App()`, real required imports, and only the state/helpers
needed to demonstrate the subject. Example presentation belongs in the companion SCSS file rather
than React `style` attributes. React stays responsible for structure, state, component props, and
semantic class names. Truly component-owned styling remains inside `@virgo-design/ui`; an example
SCSS file may therefore contain only a short explanatory comment when no example-specific rule is
needed.

Website-only `ArticleSection`, `ReviewSection`, metadata, cards, measurements and documentation
helpers stay outside examples. Every migrated UI metadata entry, including Textarea, keeps
`examples: []`; the public metadata shape is unchanged. The Website's `examples.ts` manifests own
titles, descriptions, executable imports, and exact React / SCSS raw-source bindings.

Examples may use public React, Virgo UI, and Virgo Icons imports. Required helpers stay in the same
TSX module. They do not depend on Website aliases or page-owned SCSS. The consumer still needs the
normal Virgo UI installation and stylesheet/token setup; an example does not reinstall or globally
configure the design system.

Surface image examples keep repository-owned decorative data in their companion SCSS so the copied
React structure is not polluted by presentation data. Those fixtures remain local examples rather
than public components or image-loading services.

## Interaction contract

- Source starts collapsed. Open-in-new-window and Code buttons remain at the preview's lower-right corner.
  The standalone action opens `/examples/:exampleId?theme=light|dark` in a new window and renders the
  exact registered executable example without Website navigation, documentation chrome, source UI,
  or theme controls. The current document theme is encoded in the URL; the standalone route uses that
  theme for the page and portalled UI such as Tooltip, Popover, Dialog, and Toast.
- The Code button
  toggles `aria-expanded` and `aria-controls`. `useId` keeps panel IDs distinct even when the
  same example renders twice. Copy is not shown in the preview. The page-level runtime provider
  owns disclosure state when present; standalone `ComponentExample` usage keeps the same local
  fallback behavior. The provider registry is keyed by the mounted React instance ID, not the
  semantic `example.id`. Two copies of one definition therefore get independent disclosure state
  and DOM IDs. Unmounting one cannot unregister the other. A newly mounted example starts closed;
  removing the last instance disables the bulk action. Stale updates cannot recreate removed entries.
- The text-only hero action is synchronized with every registered example. If none, one, or only
  some sources are open it reads `Expand all` and opens every source. Once all sources are open—
  whether through that action or individual Code buttons—it reads `Collapse all` and closes them
  together on activation. No icon is used for this page-level action. Bulk source disclosure never
  opens menus, dialogs, drawers, popovers, or notifications. Each page owns a separate provider;
  navigating to another page starts with its source panels closed.
- The source panel header places two accessible file tabs on the left—`React` and `SCSS`—with Copy
  aligned to the right. React uses the supplied cyan React mark; SCSS uses the supplied Sass mark.
  The active tab changes only the exact raw file shown and copied; it never remounts the running
  preview. React maps to `data-language="tsx"`, SCSS maps to `data-language="scss"`, and both share
  one inset token (16px desktop, 12px compact). Source disclosure remains exclusively on the
  persistent Code button in the preview's lower-right corner.
- The running example stays mounted while source opens/closes. In-progress forms are not reset.
  Source disclosure uses a 240ms emphasized grid/margin transition with a shorter 180ms opacity
  transition in both directions, replacing the previous 120ms enter-only animation. Reduced-motion
  preferences still disable the transition.
- Actions are real `type="button"` controls with accessible English labels and existing Virgo
  icons. They support Enter/Space and visible keyboard focus. The icon-only `variant="text"`
  Button uses its public `shape="circle"` and neutral hover/pressed fills. The preview actions and Copy
  all use the small icon-button size so their centers share one right-edge control axis.
  The React / SCSS source labels are tabs rather than disclosure actions. No permanent visible border
  is added beyond the active-tab indicator. Expanded source actions retain full opacity even when the pointer is elsewhere, so a
  bulk expansion keeps the light/dark inverse state visible. The preview reserves a bottom safe
  area from the same inset, the small action's sizing token, and a spacing token; the source action
  cannot cover the final row of a full-width example.
- Copy is available in the expanded source header. It writes the full raw file of the active React
  or SCSS tab, not selected text or tab metadata. Repeated clicks during a pending write are ignored.
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
- The preview actions and Copy Tooltips opt into `closeOnClick={false}` so repeated activation
  updates their existing panels rather than dismissing/reopening them. Both runtime Tooltips also
  set `arrow={false}` for this compact source-control treatment; Tooltip itself keeps `arrow=true`
  as its public default. Header controls are unmounted when source closes, so no portalled Tooltip
  survives its hidden trigger. Escape still dismisses a Tooltip rather than closing the source.
- Source is plain escaped `<pre><code>` text. Long lines wrap inside the source area without
  widening the page. The code is focusable when visible for keyboard selection.

No Shiki, Prism, highlight.js, editor or syntax-highlighting dependency is introduced. A future
Virgo highlighter can replace the code renderer without changing where the source comes from.
No new global theme state is introduced; the docs and portalled Tooltips use the existing theme.

## Example inventory

All manifests live at `apps/website/src/examples/components/<component>/examples.ts`.
Each entry imports a neighboring `*Example.tsx` normally and as `?raw`, plus the matching
`*Example.module.scss?virgo-raw`. Every executable example imports that same SCSS file for its actual rendering.

| Component family    | Executable examples |
| ------------------- | ------------------: |
| `accordion`         |                   4 |
| `alert`             |                   5 |
| `avatar`            |                   5 |
| `badge`             |                   5 |
| `breadcrumb`        |                   4 |
| `button`            |                   5 |
| `card`              |                   6 |
| `checkbox`          |                   4 |
| `command`           |                   3 |
| `context-menu`      |                   3 |
| `cursor`            |                   7 |
| `dialog`            |                   2 |
| `drawer`            |                   5 |
| `dropdown`          |                   9 |
| `dock`              |                   5 |
| `empty`             |                   3 |
| `floating-action`   |                   4 |
| `input`             |                   8 |
| `layout`            |                  16 |
| `menu`              |                   4 |
| `menubar`           |                   1 |
| `navigation-menu`   |                   7 |
| `pagination`        |                  12 |
| `popover`           |                   7 |
| `progress`          |                   3 |
| `radio`             |                   4 |
| `segmented-control` |                   5 |
| `select`            |                   6 |
| `separator`         |                   4 |
| `skeleton`          |                   3 |
| `spinner`           |                   4 |
| `surface`           |                  11 |
| `switch`            |                   6 |
| `tabs`              |                   7 |
| `tag`               |                   5 |
| `toast`             |                   4 |
| `tooltip`           |                  13 |

There is no extra bottom-of-page `Examples` section. Relationships remain outside the page content
at the existing end-of-document location. Hero specimens remain compact component introductions,
not registered code examples.

## Scoped interactive environments

- Command palettes bind the demonstration shortcut on their own React subtree, not on `document`.
  Focus that example before pressing Meta/Ctrl+K. Two mounted examples cannot open two palettes
  from one global keystroke. The button works independently of the shortcut.
- Toast examples own separate providers, local preview viewports, notification IDs, timers, and
  action state. They opt out of the provider's document-wide F8 shortcut with `hotkey={[]}` because
  several independent notification demos share a page. The public Toast defaults are unchanged.
  The placement example uses a positioned local canvas for the six viewport positions.
- Forms use local state and `useId` for external submit relationships. Native radio/checkbox group
  names are local to their example. Menu selections and editable tabs do not mutate neighboring
  examples or the hero.
- Layout examples include their own canvas dimensions, scroll containers, controls, and composition.
  Floating actions stay within Layout.Content while actual overlay components retain their public
  portal/focus/dismissal behavior.

## Cleanup

All 136 legacy `ReviewSection` call sites have been replaced by article sections containing actual
source-backed examples. The unused `ReviewSection` and `PlacementCompass` helpers are removed.
Layout's old page-owned example modules are removed after their use cases move to executable
sources. The retained Layout hero is still a page-owned specimen.

Dead review-card, measurement, demo-form, grid, and page-layout styles have been removed. Remaining
page SCSS styles the hero and documentation shell only; it is not a hidden dependency of copied
examples. The empty FloatingAction page stylesheet is removed together with its import.
The legacy hard-coded Surface `<details>` source block and 105 duplicate metadata snippets are gone.

## Verification

Repository tests cover article structure, exact paired React / SCSS raw sources, disclosure semantics,
unique panel IDs, keyboard disclosure actions, source-tab switching, the synchronized Expand all /
Collapse all runtime control, real Virgo icons/Tooltip, copy-to-check feedback, clipboard
success/failure/pending/retry/unmount behavior, stateful Dialog integration, duplicate instance registration/unregistration, all 37 pages in both
themes, and representative independent form/menu/tab/notification examples. Manifest tests pair
all executable modules with their exact raw source and check public dependency boundaries.
The root `pnpm all`
remains the final workspace gate.

Run `pnpm all` from the repository root with its locked dependencies before committing. Isolated
browser or syntax checks are supplementary and do not replace this workspace validation.

Reference behavior: Vite static asset raw imports, WAI-ARIA Disclosure pattern, and the browser
Clipboard `writeText` API. Clipboard access is subject to the browser's secure-context/permission rules.
