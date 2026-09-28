import './SeparatorPage.scss';

import { Separator } from '@virgo-design/ui';

import { ArticleSection } from '@/components/docs/ArticleSection';
import {
  ComponentExample,
  ComponentExampleRuntimeControl,
  ComponentExampleRuntimeProvider,
} from '@/components/docs/ComponentExample';
import { separatorExamples } from '@/examples/components/separator/examples';

import { ComponentPageMetadata } from '../../components/ComponentPageMetadata';

export function SeparatorPage() {
  return (
    <ComponentExampleRuntimeProvider>
      <div className="review-board separator-review">
        <section className="overview" id="overview" data-review-section="overview">
          <div className="overview-copy">
            <ComponentPageMetadata />
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
          id={'separator-label'}
          index={'02'}
          title={'A pause with a purpose'}
          description={
            'Give a horizontal rule a short label through children. labelAlign accepts start, center (the default), or end; start and end follow the reading direction. orientation still controls whether the rule is horizontal or vertical.'
          }
        >
          <ComponentExample example={separatorExamples.separatorLabel} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'separator-vertical'}
          index={'03'}
          title={'Vertical'}
          description={'Vertical separators stretch naturally between adjacent inline items.'}
        >
          <ComponentExample example={separatorExamples.separatorVertical} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'separator-decorative'}
          index={'04'}
          title={'Decorative between content blocks'}
          description={
            'Decorative rules remain visual-only when existing structure already conveys separation.'
          }
        >
          <ComponentExample example={separatorExamples.separatorDecorative} showCaption={false} />
        </ArticleSection>
      </div>
    </ComponentExampleRuntimeProvider>
  );
}
