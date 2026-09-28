import { Radio } from '@virgo-design/ui';

import { ArticleSection } from '@/components/docs/ArticleSection';
import {
  ComponentExample,
  ComponentExampleRuntimeControl,
  ComponentExampleRuntimeProvider,
} from '@/components/docs/ComponentExample';
import { radioExamples } from '@/examples/components/radio/examples';

export function RadioPage() {
  return (
    <ComponentExampleRuntimeProvider>
      <div className="review-board" id="radio-review">
        <section className="overview" id="overview" data-review-section="overview">
          <div className="overview-copy">
            <div className="eyebrow-row">
              <span>Component 13</span>
              <span className="version-badge">STABLE · V1.0.0</span>
            </div>
            <h1>Radio</h1>
            <p>
              Single-selection control for mutually exclusive choices using standard circular radio
              controls.
            </p>
            <dl className="component-facts">
              <div>
                <dt>Orientation</dt>
                <dd>02</dd>
              </div>
              <div>
                <dt>States</dt>
                <dd>03</dd>
              </div>
              <div>
                <dt>Selection</dt>
                <dd>Single</dd>
              </div>
            </dl>
          </div>
          <div className="hero-specimen">
            <div className="specimen-toolbar">
              <span>Reference specimen</span>
              <code>horizontal · standard</code>
            </div>
            <div className="hero-stage">
              <Radio.Group defaultValue="pear" aria-label="Fruit">
                <Radio value="apple">Apple</Radio>
                <Radio value="pear">Pear</Radio>
                <Radio value="orange">Orange</Radio>
              </Radio.Group>
            </div>
            <div className="specimen-caption">
              <span>16px control</span>
              <span>Body Medium</span>
              <span>Single selection</span>
              <ComponentExampleRuntimeControl />
            </div>
          </div>
        </section>
        <ArticleSection
          id={'radio-basic'}
          index={'01'}
          title={'Basic'}
          description={
            'Standard radio controls express one selected value among mutually exclusive choices.'
          }
        >
          <ComponentExample example={radioExamples.radioBasic} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'radio-orientation'}
          index={'02'}
          title={'Orientation'}
          description={
            'Radio.Group supports horizontal and vertical option layouts without changing selection semantics.'
          }
        >
          <ComponentExample example={radioExamples.radioHorizontal} />
          <ComponentExample example={radioExamples.radioVertical} />
        </ArticleSection>
        <ArticleSection
          id={'radio-disabled'}
          index={'03'}
          title={'Disabled'}
          description={
            'Disabled preserves both unselected and selected state without adding another visual mode.'
          }
        >
          <ComponentExample example={radioExamples.radioDisabled} showCaption={false} />
        </ArticleSection>
        <footer className="review-footer">
          <span>Virgo Design UI · Radio V1.0.0</span>
          <span>Primitive · Tokens · Metadata</span>
        </footer>
      </div>
    </ComponentExampleRuntimeProvider>
  );
}
