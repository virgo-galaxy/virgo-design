import { Radio, RadioGroup } from '@virgo-design/ui';

import { ReviewSection } from '../../components/ReviewSection';

export function RadioPage() {
  return (
    <main className="review-board" id="radio-review">
      <section className="overview" id="overview" data-review-section="overview">
        <div className="overview-copy">
          <div className="eyebrow-row">
            <span>Component 05</span>
            <span className="version-badge">Stable · V1</span>
          </div>
          <h1>Radio</h1>
          <p>
            Single-selection control for mutually exclusive choices, with standard radio and
            segmented button-style presentations.
          </p>

          <dl className="component-facts">
            <div>
              <dt>Orientation</dt>
              <dd>02</dd>
            </div>
            <div>
              <dt>Button styles</dt>
              <dd>02</dd>
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
            <RadioGroup defaultValue="pear" aria-label="Fruit">
              <Radio value="apple">Apple</Radio>
              <Radio value="pear">Pear</Radio>
              <Radio value="orange">Orange</Radio>
            </RadioGroup>
          </div>
          <div className="specimen-caption">
            <span>16px control</span>
            <span>Body Medium</span>
            <span>Single selection</span>
          </div>
        </div>
      </section>

      <ReviewSection
        id="radio-basic"
        index="01"
        title="Basic"
        description="Standard radio controls express one selected value among mutually exclusive choices."
      >
        <div className="radio-demo-grid">
          <article className="radio-specimen-card">
            <div className="cell-meta">
              <strong>Unchecked</strong>
              <span>Available option</span>
            </div>
            <div className="radio-component-stage">
              <Radio name="standalone-basic">Apple</Radio>
            </div>
            <code>unchecked</code>
          </article>

          <article className="radio-specimen-card">
            <div className="cell-meta">
              <strong>Checked</strong>
              <span>Selected option</span>
            </div>
            <div className="radio-component-stage">
              <Radio defaultChecked name="standalone-selected">
                Pear
              </Radio>
            </div>
            <code>defaultChecked</code>
          </article>
        </div>
      </ReviewSection>

      <ReviewSection
        id="radio-orientation"
        index="02"
        title="Orientation"
        description="RadioGroup supports horizontal and vertical option layouts without changing selection semantics."
      >
        <div className="radio-orientation-grid">
          <article className="radio-group-card">
            <div className="cell-meta">
              <strong>Horizontal</strong>
              <span>Compact choices on one line</span>
            </div>
            <div className="radio-group-stage">
              <RadioGroup defaultValue="pear" aria-label="Horizontal fruit">
                <Radio value="apple">Apple</Radio>
                <Radio value="pear">Pear</Radio>
                <Radio value="orange">Orange</Radio>
              </RadioGroup>
            </div>
            <code>orientation=&quot;horizontal&quot;</code>
          </article>

          <article className="radio-group-card">
            <div className="cell-meta">
              <strong>Vertical</strong>
              <span>Stacked options for longer labels</span>
            </div>
            <div className="radio-group-stage radio-group-stage--vertical">
              <RadioGroup defaultValue="pear" orientation="vertical" aria-label="Vertical fruit">
                <Radio value="apple">Apple</Radio>
                <Radio value="pear">Pear</Radio>
                <Radio value="orange">Orange</Radio>
              </RadioGroup>
            </div>
            <code>orientation=&quot;vertical&quot;</code>
          </article>
        </div>
      </ReviewSection>

      <ReviewSection
        id="radio-disabled"
        index="03"
        title="Disabled"
        description="Disabled preserves both unselected and selected state without adding another visual mode."
      >
        <div className="radio-inline-panel">
          <Radio disabled name="disabled-unchecked">
            Disabled
          </Radio>
          <Radio defaultChecked disabled name="disabled-checked">
            Disabled
          </Radio>
        </div>
      </ReviewSection>

      <ReviewSection
        id="radio-button"
        index="04"
        title="Button group"
        description="Segmented radio options keep single-selection semantics while presenting choices as connected buttons."
      >
        <div className="radio-button-grid">
          <article className="radio-button-card">
            <div className="cell-meta">
              <strong>Outline</strong>
              <span>Selected option uses brand boundary and text</span>
            </div>
            <div className="radio-button-stage">
              <RadioGroup
                appearance="button"
                buttonStyle="outline"
                defaultValue="pear"
                aria-label="Outline fruit"
              >
                <Radio value="apple">Apple</Radio>
                <Radio value="pear">Pear</Radio>
                <Radio value="orange">Orange</Radio>
              </RadioGroup>
            </div>
            <code>appearance=&quot;button&quot; · buttonStyle=&quot;outline&quot;</code>
          </article>

          <article className="radio-button-card">
            <div className="cell-meta">
              <strong>Solid</strong>
              <span>Selected option uses brand fill; disabled options remain visible</span>
            </div>
            <div className="radio-button-stage">
              <RadioGroup
                appearance="button"
                buttonStyle="solid"
                defaultValue="apple"
                aria-label="Solid fruit"
              >
                <Radio value="apple">Apple</Radio>
                <Radio value="pear">Pear</Radio>
                <Radio disabled value="orange">
                  Orange
                </Radio>
              </RadioGroup>
            </div>
            <code>appearance=&quot;button&quot; · buttonStyle=&quot;solid&quot;</code>
          </article>
        </div>
      </ReviewSection>

      <footer className="review-footer">
        <span>Virgo Design UI · Radio V1</span>
        <span>Primitive · Tokens · Metadata</span>
      </footer>
    </main>
  );
}
