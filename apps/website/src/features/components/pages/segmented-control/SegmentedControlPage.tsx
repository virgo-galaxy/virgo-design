import { SegmentedControl } from '@virgo-design/ui';

import { ArticleSection } from '@/components/docs/ArticleSection';
import {
  ComponentExample,
  ComponentExampleRuntimeControl,
  ComponentExampleRuntimeProvider,
} from '@/components/docs/ComponentExample';
import { segmentedControlExamples } from '@/examples/components/segmented-control/examples';

export function SegmentedControlPage() {
  return (
    <ComponentExampleRuntimeProvider>
      <div className="review-board" id="segmented-control-review">
        <section className="overview" id="overview" data-review-section="overview">
          <div className="overview-copy">
            <div className="eyebrow-row">
              <span>Component 14</span>
              <span className="version-badge">STABLE · V1.0.0</span>
            </div>
            <h1>Segmented Control</h1>
            <p>
              Compact single-selection control for switching between a small set of mutually
              exclusive modes or views.
            </p>
            <dl className="component-facts">
              <div>
                <dt>Variants</dt>
                <dd>03</dd>
              </div>
              <div>
                <dt>Sizes</dt>
                <dd>04</dd>
              </div>
              <div>
                <dt>Motion</dt>
                <dd>02</dd>
              </div>
            </dl>
          </div>
          <div className="hero-specimen">
            <div className="specimen-toolbar">
              <span>Reference specimen</span>
              <code>soft · small · slide</code>
            </div>
            <div className="hero-stage">
              <SegmentedControl
                variant="soft"
                size="small"
                motion="slide"
                defaultValue="light"
                aria-label="Theme"
              >
                <SegmentedControl.Item value="light">Light</SegmentedControl.Item>
                <SegmentedControl.Item value="dark">Dark</SegmentedControl.Item>
              </SegmentedControl>
            </div>
            <div className="specimen-caption">
              <span>28px height</span>
              <span>Label Small</span>
              <span>Sliding indicator</span>
              <ComponentExampleRuntimeControl />
            </div>
          </div>
        </section>
        <ArticleSection
          id={'segmented-variants'}
          index={'01'}
          title={'Variants'}
          description={
            'Only the visual treatment changes; size, motion, content, and selected value remain identical.'
          }
        >
          <ComponentExample
            example={segmentedControlExamples.segmentedVariants}
            showCaption={false}
          />
        </ArticleSection>
        <ArticleSection
          id={'segmented-motion'}
          index={'02'}
          title={'Motion'}
          description={'For each visual variant, only the selected-indicator motion changes.'}
        >
          <ComponentExample
            example={segmentedControlExamples.segmentedMotion}
            showCaption={false}
          />
        </ArticleSection>
        <ArticleSection
          id={'segmented-sizes'}
          index={'03'}
          title={'Sizes'}
          description={'Only the control size changes; all other properties use their defaults.'}
        >
          <ComponentExample example={segmentedControlExamples.segmentedSizes} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'segmented-content'}
          index={'04'}
          title={'Content'}
          description={
            'Only the option content changes; visual treatment, size, and motion use their defaults.'
          }
        >
          <ComponentExample example={segmentedControlExamples.segmentedContent} />
          <ComponentExample example={segmentedControlExamples.segmentedDisabled} />
        </ArticleSection>
        <footer className="review-footer">
          <span>Virgo Design UI · Segmented Control V1.0.0</span>
          <span>Radio Primitive · Tokens · Motion · Metadata</span>
        </footer>
      </div>
    </ComponentExampleRuntimeProvider>
  );
}
