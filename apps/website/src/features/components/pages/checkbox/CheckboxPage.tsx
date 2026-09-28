import { Checkbox } from '@virgo-design/ui';

import { ArticleSection } from '@/components/docs/ArticleSection';
import {
  ComponentExample,
  ComponentExampleRuntimeControl,
  ComponentExampleRuntimeProvider,
} from '@/components/docs/ComponentExample';
import { checkboxExamples } from '@/examples/components/checkbox/examples';

export function CheckboxPage() {
  return (
    <ComponentExampleRuntimeProvider>
      <div className="review-board" id="checkbox-review">
        <section className="overview" id="overview" data-review-section="overview">
          <div className="overview-copy">
            <div className="eyebrow-row">
              <span>Component 11</span>
              <span className="version-badge">STABLE · V1.0.0</span>
            </div>
            <h1>Checkbox</h1>
            <p>
              Boolean and multi-selection control with a single standard geometry. Built on the
              native checkbox and extended with mixed and grouped selection.
            </p>
            <dl className="component-facts">
              <div>
                <dt>Selection</dt>
                <dd>03</dd>
              </div>
              <div>
                <dt>Disabled</dt>
                <dd>03</dd>
              </div>
              <div>
                <dt>Group</dt>
                <dd>Yes</dd>
              </div>
            </dl>
          </div>
          <div className="hero-specimen">
            <div className="specimen-toolbar">
              <span>Reference specimen</span>
              <code>checked</code>
            </div>
            <div className="hero-stage">
              <Checkbox defaultChecked>Sync changes</Checkbox>
            </div>
            <div className="specimen-caption">
              <span>16px control</span>
              <span>Body Medium</span>
              <span>Radius 4</span>
              <ComponentExampleRuntimeControl />
            </div>
          </div>
        </section>
        <ArticleSection
          id={'checkbox-basic'}
          index={'01'}
          title={'Basic'}
          description={
            'Checkbox uses one standard visual size across unchecked, checked, and mixed selection.'
          }
        >
          <ComponentExample example={checkboxExamples.checkboxBasic} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'checkbox-disabled'}
          index={'02'}
          title={'Disabled'}
          description={
            'Disabled preserves unchecked, checked, and mixed selection without introducing a separate visual variant.'
          }
        >
          <ComponentExample example={checkboxExamples.checkboxDisabled} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'checkbox-group'}
          index={'03'}
          title={'Group'}
          description={
            'Checkbox.Group coordinates multiple values while each checkbox keeps native form semantics.'
          }
        >
          <ComponentExample example={checkboxExamples.checkboxGroup} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'checkbox-check-all'}
          index={'04'}
          title={'Check all'}
          description={'Indeterminate naturally represents a partially selected group.'}
        >
          <ComponentExample example={checkboxExamples.checkboxCheckAll} showCaption={false} />
        </ArticleSection>
        <footer className="review-footer">
          <span>Virgo Design UI · Checkbox V1.0.0</span>
          <span>Primitive · Tokens · Icons · Metadata</span>
        </footer>
      </div>
    </ComponentExampleRuntimeProvider>
  );
}
