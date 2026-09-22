import { Radio } from '@virgo-design/ui';

import { ReviewSection } from '../../components/ReviewSection';

export function RadioPage() {
  return (
    <div className="review-board" id="radio-review">
      <section className="overview" id="overview" data-review-section="overview">
        <div className="overview-copy">
          <div className="eyebrow-row">
            <span>Component 10</span>
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
        description="Radio.Group supports horizontal and vertical option layouts without changing selection semantics."
      >
        <div className="radio-orientation-grid">
          <article className="radio-group-card">
            <div className="cell-meta">
              <strong>Horizontal</strong>
              <span>Compact choices on one line</span>
            </div>
            <div className="radio-group-stage">
              <Radio.Group defaultValue="pear" aria-label="Horizontal fruit">
                <Radio value="apple">Apple</Radio>
                <Radio value="pear">Pear</Radio>
                <Radio value="orange">Orange</Radio>
              </Radio.Group>
            </div>
            <code>orientation=&quot;horizontal&quot;</code>
          </article>

          <article className="radio-group-card">
            <div className="cell-meta">
              <strong>Vertical</strong>
              <span>Stacked options for longer labels</span>
            </div>
            <div className="radio-group-stage radio-group-stage--vertical">
              <Radio.Group defaultValue="pear" orientation="vertical" aria-label="Vertical fruit">
                <Radio value="apple">Apple</Radio>
                <Radio value="pear">Pear</Radio>
                <Radio value="orange">Orange</Radio>
              </Radio.Group>
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

      <footer className="review-footer">
        <span>Virgo Design UI · Radio V1.0.0</span>
        <span>Primitive · Tokens · Metadata</span>
      </footer>
    </div>
  );
}
