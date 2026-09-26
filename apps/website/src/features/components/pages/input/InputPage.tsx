import { SearchIcon } from '@virgo-design/icons';
import { Input } from '@virgo-design/ui';

import { ArticleSection } from '@/components/docs/ArticleSection';
import {
  ComponentExample,
  ComponentExampleRuntimeControl,
  ComponentExampleRuntimeProvider,
} from '@/components/docs/ComponentExample';
import { inputExamples } from '@/examples/components/input/examples';

export function InputPage() {
  return (
    <ComponentExampleRuntimeProvider>
      <div className="review-board" id="input-review">
        <section className="overview" id="overview" data-review-section="overview">
          <div className="overview-copy">
            <div className="eyebrow-row">
              <span>Component 11</span>
              <span className="version-badge">STABLE · V1.0.0</span>
            </div>
            <h1>Input</h1>
            <p>
              Text-entry family for single-line and multiline content. Built on native Virgo
              primitives, with decorative content, clearable values, and password reveal calibrated
              against the same sizing, typography, color, and motion foundations as Button.
            </p>
            <dl className="component-facts">
              <div>
                <dt>Controls</dt>
                <dd>03</dd>
              </div>
              <div>
                <dt>Sizes</dt>
                <dd>04</dd>
              </div>
              <div>
                <dt>States</dt>
                <dd>06</dd>
              </div>
            </dl>
          </div>
          <div className="hero-specimen">
            <div className="specimen-toolbar">
              <span>Reference specimen</span>
              <code>input · medium</code>
            </div>
            <div className="hero-stage">
              <div className="input-demo-width input-demo-width--hero">
                <Input
                  aria-label="Search components"
                  prefix={<SearchIcon />}
                  placeholder="Search components"
                  clearable
                />
              </div>
            </div>
            <div className="specimen-caption">
              <span>36px height</span>
              <span>Body Medium</span>
              <span>Radius 8</span>
              <ComponentExampleRuntimeControl />
            </div>
          </div>
        </section>
        <ArticleSection
          id={'input-sizes'}
          index={'01'}
          title={'Sizes'}
          description={
            'Four control heights aligned with the Virgo sizing foundation and Button scale.'
          }
        >
          <ComponentExample example={inputExamples.inputSizes} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'input-content'}
          index={'02'}
          title={'Content'}
          description={
            'Placeholder and entered value use native input semantics and Virgo body typography.'
          }
        >
          <ComponentExample example={inputExamples.inputContent} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'input-icons'}
          index={'03'}
          title={'Prefix and suffix'}
          description={
            'Decorative prefix and suffix slots inherit currentColor, remain outside the tab order, and let Input own their size.'
          }
        >
          <ComponentExample example={inputExamples.inputDecorations} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'input-actions'}
          index={'04'}
          title={'Actions'}
          description={
            'Clearable and password inputs add small, keyboard-accessible actions without changing native input behavior.'
          }
        >
          <ComponentExample example={inputExamples.inputClearable} />
          <ComponentExample example={inputExamples.inputPassword} />
        </ArticleSection>
        <ArticleSection
          id={'input-states'}
          index={'05'}
          title={'States'}
          description={
            'Hover and focus remain live; use Tab or click a field to inspect the focus treatment.'
          }
        >
          <ComponentExample example={inputExamples.inputStates} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'input-textarea'}
          index={'06'}
          title={'Textarea'}
          description={
            'Multiline text entry shares the Input family state language while keeping native textarea semantics.'
          }
        >
          <ComponentExample example={inputExamples.textareaSizes} />
          <ComponentExample example={inputExamples.textareaStates} />
        </ArticleSection>
        <footer className="review-footer">
          <span>Virgo Design UI · Input Family V1.0.0</span>
          <span>Input · Textarea · Primitive · Tokens · Metadata</span>
        </footer>
      </div>
    </ComponentExampleRuntimeProvider>
  );
}
