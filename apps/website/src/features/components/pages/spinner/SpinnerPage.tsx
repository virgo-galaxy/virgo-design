import './SpinnerPage.scss';

import { Button, Spinner } from '@virgo-design/ui';

import { ArticleSection } from '@/components/docs/ArticleSection';
import {
  ComponentExample,
  ComponentExampleRuntimeControl,
  ComponentExampleRuntimeProvider,
} from '@/components/docs/ComponentExample';
import { spinnerExamples } from '@/examples/components/spinner/examples';

export function SpinnerPage() {
  return (
    <ComponentExampleRuntimeProvider>
      <div className="review-board spinner-review">
        <section className="overview" id="overview" data-review-section="overview">
          <div className="overview-copy">
            <div className="eyebrow-row">
              <span>Component 30</span>
              <span className="version-badge">STABLE · V1.0.0</span>
            </div>
            <h1>Spinner</h1>
            <p>Indeterminate loading feedback that composes through currentColor.</p>
            <dl className="component-facts">
              <div>
                <dt>State</dt>
                <dd>Indeterminate</dd>
              </div>
              <div>
                <dt>Sizes</dt>
                <dd>03</dd>
              </div>
              <div>
                <dt>Intent</dt>
                <dd>Brand-aware</dd>
              </div>
            </dl>
          </div>
          <div className="hero-specimen">
            <div className="specimen-toolbar">
              <span>Reference specimen</span>
              <code>inline · button · currentColor</code>
            </div>
            <div className="hero-stage">
              <div className="spinner-stage">
                <span className="spinner-inline">
                  <Spinner size="sm" /> Syncing changes
                </span>
                <Button leadingIcon={<Spinner size="sm" />}>Saving</Button>
                <Spinner size="lg" intent="brand" aria-label="Loading account data" />
              </div>
            </div>
            <div className="specimen-caption">
              <span>Inline feedback</span>
              <span>Composable</span>
              <span>Theme-aware color</span>
              <ComponentExampleRuntimeControl />
            </div>
          </div>
        </section>
        <ArticleSection
          id={'spinner-sizes'}
          index={'01'}
          title={'Sizes and intents'}
          description={
            'Three token sizes and a small semantic color surface cover inline loading needs.'
          }
        >
          <ComponentExample example={spinnerExamples.spinnerSizes} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'spinner-composition'}
          index={'02'}
          title={'Inline and Button composition'}
          description={'Spinner owns no async state and can be composed into existing controls.'}
        >
          <ComponentExample example={spinnerExamples.spinnerInline} />
          <ComponentExample example={spinnerExamples.spinnerButton} />
        </ArticleSection>
        <ArticleSection
          id={'spinner-environments'}
          index={'03'}
          title={'Light and dark environments'}
          description={'Current and semantic colors stay theme-aware in both environments.'}
        >
          <ComponentExample example={spinnerExamples.spinnerThemes} showCaption={false} />
        </ArticleSection>
        <footer className="review-footer">
          <span>Virgo Design UI · Spinner V1.0.0</span>
          <span>Indeterminate · CurrentColor · Reduced motion</span>
        </footer>
      </div>
    </ComponentExampleRuntimeProvider>
  );
}
