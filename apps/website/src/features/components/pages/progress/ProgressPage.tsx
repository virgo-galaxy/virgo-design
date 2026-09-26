import './ProgressPage.scss';

import { Progress } from '@virgo-design/ui';

import { ArticleSection } from '@/components/docs/ArticleSection';
import {
  ComponentExample,
  ComponentExampleRuntimeControl,
  ComponentExampleRuntimeProvider,
} from '@/components/docs/ComponentExample';
import { progressExamples } from '@/examples/components/progress/examples';

export function ProgressPage() {
  return (
    <ComponentExampleRuntimeProvider>
      <div className="review-board progress-review">
        <section className="overview" id="overview" data-review-section="overview">
          <div className="overview-copy">
            <div className="eyebrow-row">
              <span>Component 25</span>
              <span className="version-badge">STABLE · V1.0.0</span>
            </div>
            <h1>Progress</h1>
            <p>Determinate progress for tasks with a known completion amount.</p>
            <dl className="component-facts">
              <div>
                <dt>State</dt>
                <dd>Determinate</dd>
              </div>
              <div>
                <dt>Sizes</dt>
                <dd>03</dd>
              </div>
              <div>
                <dt>Intents</dt>
                <dd>04</dd>
              </div>
            </dl>
          </div>
          <div className="hero-specimen">
            <div className="specimen-toolbar">
              <span>Reference specimen</span>
              <code>value · label · showValue</code>
            </div>
            <div className="hero-stage">
              <div className="progress-stack">
                <Progress value={72} label="Deploying design tokens" showValue />
                <Progress
                  value={3}
                  max={4}
                  intent="success"
                  label="Three of four checks"
                  showValue
                />
              </div>
            </div>
            <div className="specimen-caption">
              <span>Clamped values</span>
              <span>Visible status</span>
              <span>Semantic intent</span>
              <ComponentExampleRuntimeControl />
            </div>
          </div>
        </section>
        <ArticleSection
          id={'progress-values'}
          index={'01'}
          title={'Values and boundaries'}
          description={
            'Values are normalized against max and remain honest at empty and complete boundaries.'
          }
        >
          <ComponentExample example={progressExamples.progressValues} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'progress-sizes'}
          index={'02'}
          title={'Sizes'}
          description={'Size changes track thickness without changing the semantic value.'}
        >
          <ComponentExample example={progressExamples.progressSizes} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'progress-intents'}
          index={'03'}
          title={'Semantic intents'}
          description={'Intent uses Virgo semantic status colors for meaningful task outcomes.'}
        >
          <ComponentExample example={progressExamples.progressIntents} showCaption={false} />
        </ArticleSection>
        <footer className="review-footer">
          <span>Virgo Design UI · Progress V1.0.0</span>
          <span>Determinate · Clamped · Accessible</span>
        </footer>
      </div>
    </ComponentExampleRuntimeProvider>
  );
}
