import { Cursor, Tooltip } from '@virgo-design/ui';

import { ArticleSection } from '@/components/docs/ArticleSection';
import {
  ComponentExample,
  ComponentExampleRuntimeControl,
  ComponentExampleRuntimeProvider,
} from '@/components/docs/ComponentExample';
import { cursorExamples } from '@/examples/components/cursor/examples';

import { ComponentPageMetadata } from '../../components/ComponentPageMetadata';
import styles from './CursorPage.module.scss';

export function CursorPage() {
  return (
    <ComponentExampleRuntimeProvider>
      <div className="review-board cursor-review" id="cursor-review">
        <section className="overview" id="overview" data-review-section="overview">
          <div className="overview-copy">
            <ComponentPageMetadata />
            <h1>Cursor</h1>
            <p>
              A small glass pointer, with context close behind. Scope it to a canvas, an editor, or
              an entire application.
            </p>
            <dl className="component-facts">
              <div>
                <dt>Input</dt>
                <dd>Mouse aware</dd>
              </div>
              <div>
                <dt>Visual</dt>
                <dd>Yours or Virgo</dd>
              </div>
              <div>
                <dt>Feedback</dt>
                <dd>Pointer follow</dd>
              </div>
            </dl>
          </div>
          <div className="hero-specimen">
            <div className="specimen-toolbar">
              <span>Reference specimen</span>
              <code>context in motion</code>
            </div>
            <Cursor.Provider follow={{ tooltip: true }} className="hero-stage">
              <Tooltip>
                <Tooltip.Trigger>Follow your curiosity</Tooltip.Trigger>
                <Tooltip.Content>A little context, close behind.</Tooltip.Content>
              </Tooltip>
            </Cursor.Provider>
            <div className="specimen-caption">
              <span>Scoped input</span>
              <span>Custom visuals</span>
              <span>Keyboard ready</span>
              <ComponentExampleRuntimeControl />
            </div>
          </div>
        </section>
        {Object.values(cursorExamples).map((example, index) => (
          <ArticleSection
            key={example.id}
            id={example.id}
            index={String(index + 1).padStart(2, '0')}
            title={example.title}
            description={example.description}
          >
            <ComponentExample example={example} showCaption={false} />
          </ArticleSection>
        ))}
        <ArticleSection
          id="cursor-api"
          index="08"
          title="API & lifecycle"
          description="Cursor owns tracking and visuals. Consumers subscribe to the nearest scope."
        >
          <div
            className={styles.apiViewport}
            role="region"
            aria-label="Scrollable Cursor API reference"
            tabIndex={0}
          >
            <table className={styles.apiTable} aria-label="Cursor API reference">
              <thead>
                <tr>
                  <th scope="col">API</th>
                  <th scope="col">Behavior</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">
                    <code>Cursor.Provider</code>
                  </th>
                  <td>
                    A div scope. Defaults to <code>Cursor.Visual</code>; <code>cursor</code> accepts
                    a React node, or <code>null</code> to retain the native cursor.{' '}
                    <code>disabled</code> stops tracking. Nested providers own their regions.
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    <code>follow</code>
                  </th>
                  <td>
                    Set <code>{'follow={{ tooltip: true }}'}</code> to opt ordinary Tooltips into
                    mouse follow. Defaults to <code>false</code>. Keyboard focus keeps element
                    positioning, placement and offset.
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    <code>size</code>
                  </th>
                  <td>
                    <code>sm</code> = 16px, <code>md</code> = 20px (default), <code>lg</code> =
                    24px. Sizes the default Virgo visual; custom cursor nodes keep their own
                    dimensions.
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    <code>hotspot</code>
                  </th>
                  <td>
                    Pixel offset within the visual. Automatically scales to keep the Virgo arrow tip
                    aligned at every size. Custom visuals default to the origin; pass their hotspot
                    explicitly.
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    <code>resetKey</code>
                  </th>
                  <td>
                    Pass your router location key to reset on SPA navigation. Native link
                    activation, popstate, hashchange, scroll, blur and unmount reset automatically.
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    <code>Cursor.Visual</code>
                  </th>
                  <td>
                    Default translucent arrow with sm / md / lg sizing; md is 20px. It inherits
                    Virgo Theme / Appearance: darker in light mode, brighter in dark mode. Semantic
                    tokens control the fill, edge and shadow across the portal; no theme prop is
                    needed.
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    <code>Cursor.Follower</code>
                  </th>
                  <td>
                    Decorative portal with viewport flip/shift. <code>placement</code> defaults to{' '}
                    <code>bottomLeft</code>, <code>offset</code> to 18 and <code>offsetX</code> to
                    12 pixels. Its entire layer ignores pointer events.
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    <code>Cursor.usePointer()</code>
                  </th>
                  <td>
                    Returns a stable store, or <code>null</code>. <code>getSnapshot()</code> reads
                    x, y, active, visible, pointerType and buttons. <code>subscribe(listener)</code>{' '}
                    returns cleanup; <code>reset()</code> clears feedback. Subscribe in an effect
                    for coordinates without per-move React renders.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className={styles.lifecycleNote}>
            Mouse coordinates are coalesced once per animation frame. Touch and pen keep native
            input behavior. Cursor visuals are decorative; use accessible text for essential
            feedback. Tooltip keeps its description relationship and Escape behavior.
          </p>
        </ArticleSection>
      </div>
    </ComponentExampleRuntimeProvider>
  );
}
