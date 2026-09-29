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
          id="cursor-lifecycle"
          index="08"
          title="Lifecycle"
          description="Cursor owns tracking and visuals. Consumers subscribe to the nearest scope."
        >
          <p className={styles.lifecycleNote}>
            Mouse coordinates are coalesced once per animation frame. Leaving the scope, scrolling,
            window blur, visibility changes, cancellation, route resets and unmount all clear
            pointer-follow feedback. Touch and pen keep native input behavior, while keyboard
            Tooltips retain their element anchor and description relationship.
          </p>
        </ArticleSection>
      </div>
    </ComponentExampleRuntimeProvider>
  );
}
