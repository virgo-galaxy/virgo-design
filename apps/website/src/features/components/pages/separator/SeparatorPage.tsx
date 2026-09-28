import './SeparatorPage.scss';

import { Separator } from '@virgo-design/ui';

import { ArticleSection } from '@/components/docs/ArticleSection';
import {
  ComponentExample,
  ComponentExampleRuntimeControl,
  ComponentExampleRuntimeProvider,
} from '@/components/docs/ComponentExample';
import { separatorExamples } from '@/examples/components/separator/examples';

export function SeparatorPage() {
  return (
    <ComponentExampleRuntimeProvider>
      <div className="review-board separator-review">
        <section className="overview" id="overview" data-review-section="overview">
          <div className="overview-copy">
            <div className="eyebrow-row">
              <span>Component 05</span>
              <span className="version-badge">STABLE · V1.0.0</span>
            </div>
            <h1>Separator</h1>
            <p>A token-based rule for visual and semantic separation in general layouts.</p>
            <dl className="component-facts">
              <div>
                <dt>Orientations</dt>
                <dd>02</dd>
              </div>
              <div>
                <dt>Semantics</dt>
                <dd>ARIA</dd>
              </div>
              <div>
                <dt>Decorative</dt>
                <dd>Optional</dd>
              </div>
            </dl>
          </div>
          <div className="hero-specimen">
            <div className="specimen-toolbar">
              <span>Reference specimen</span>
              <code>horizontal · semantic</code>
            </div>
            <div className="hero-stage">
              <div className="separator-stack">
                <span>Account details</span>
                <Separator />
                <span>Billing</span>
              </div>
            </div>
            <div className="specimen-caption">
              <span>Rule-based rhythm</span>
              <span>Horizontal by default</span>
              <span>Decorative or semantic</span>
              <ComponentExampleRuntimeControl />
            </div>
          </div>
        </section>
        <ArticleSection
          id={'separator-horizontal'}
          index={'01'}
          title={'Horizontal'}
          description={'The default orientation separates stacked content with explicit semantics.'}
        >
          <ComponentExample example={separatorExamples.separatorHorizontal} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'separator-vertical'}
          index={'02'}
          title={'Vertical'}
          description={'Vertical separators stretch naturally between adjacent inline items.'}
        >
          <ComponentExample example={separatorExamples.separatorVertical} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'separator-decorative'}
          index={'03'}
          title={'Decorative between content blocks'}
          description={
            'Decorative rules remain visual-only when existing structure already conveys separation.'
          }
        >
          <ComponentExample example={separatorExamples.separatorDecorative} showCaption={false} />
        </ArticleSection>
        <footer className="review-footer">
          <span>Virgo Design UI · Separator V1.0.0</span>
          <span>Horizontal · Vertical · Decorative</span>
        </footer>
      </div>
    </ComponentExampleRuntimeProvider>
  );
}
