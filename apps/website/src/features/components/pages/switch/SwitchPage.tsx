import { Switch } from '@virgo-design/ui';

import { ArticleSection } from '@/components/docs/ArticleSection';
import {
  ComponentExample,
  ComponentExampleRuntimeControl,
  ComponentExampleRuntimeProvider,
} from '@/components/docs/ComponentExample';
import { switchExamples } from '@/examples/components/switch/examples';

export function SwitchPage() {
  return (
    <ComponentExampleRuntimeProvider>
      <div className="review-board" id="switch-review">
        <section className="overview" id="overview" data-review-section="overview">
          <div className="overview-copy">
            <div className="eyebrow-row">
              <span>Component 15</span>
              <span className="version-badge">STABLE · V1.0.0</span>
            </div>
            <h1>Switch</h1>
            <p>
              Toggles an immediate binary state with a familiar pill control or a more technical
              console-style fader appearance.
            </p>
            <dl className="component-facts">
              <div>
                <dt>Appearances</dt>
                <dd>02</dd>
              </div>
              <div>
                <dt>Sizes</dt>
                <dd>02</dd>
              </div>
              <div>
                <dt>States</dt>
                <dd>03</dd>
              </div>
            </dl>
          </div>
          <div className="hero-specimen">
            <div className="specimen-toolbar">
              <span>Reference specimen</span>
              <code>toggle · default</code>
            </div>
            <div className="hero-stage">
              <Switch defaultChecked>Sync changes</Switch>
            </div>
            <div className="specimen-caption">
              <span>44 × 24px</span>
              <span>Body Medium</span>
              <span>Native switch semantics</span>
              <ComponentExampleRuntimeControl />
            </div>
          </div>
        </section>
        <ArticleSection
          id={'switch-basic'}
          index={'01'}
          title={'Basic'}
          description={
            'The standard pill switch communicates off and on state through thumb position and brand fill.'
          }
        >
          <ComponentExample example={switchExamples.switchBasic} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'switch-sizes'}
          index={'02'}
          title={'Sizes'}
          description={
            'Switch keeps a focused two-size scale: default for normal interfaces and small for dense controls.'
          }
        >
          <ComponentExample example={switchExamples.switchSizes} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'switch-content'}
          index={'03'}
          title={'Content'}
          description={
            'Toggle appearance can carry compact decorative cues without changing the accessible switch state.'
          }
        >
          <ComponentExample example={switchExamples.switchText} />
          <ComponentExample example={switchExamples.switchIcons} />
        </ArticleSection>
        <ArticleSection
          id={'switch-appearances'}
          index={'04'}
          title={'Appearance'}
          description={
            'The fader keeps native switch semantics while using a thin console rail and a compact sliding control block.'
          }
        >
          <ComponentExample example={switchExamples.switchAppearances} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'switch-disabled'}
          index={'05'}
          title={'Disabled'}
          description={
            'Disabled preserves off and on state in both visual appearances without introducing another semantic mode.'
          }
        >
          <ComponentExample example={switchExamples.switchDisabled} showCaption={false} />
        </ArticleSection>
        <footer className="review-footer">
          <span>Virgo Design UI · Switch V1.0.0</span>
          <span>Primitive · Tokens · Metadata</span>
        </footer>
      </div>
    </ComponentExampleRuntimeProvider>
  );
}
