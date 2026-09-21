import { Checkbox } from '@virgo-design/ui';
import { useState } from 'react';

import { ReviewSection } from '../../components/ReviewSection';

const fruitValues = ['apple', 'pear', 'orange'] as const;

export function CheckboxPage() {
  const [selectedFruit, setSelectedFruit] = useState<string[]>(['apple', 'orange']);
  const allChecked = selectedFruit.length === fruitValues.length;
  const partiallyChecked = selectedFruit.length > 0 && !allChecked;

  return (
    <div className="review-board" id="checkbox-review">
      <section className="overview" id="overview" data-review-section="overview">
        <div className="overview-copy">
          <div className="eyebrow-row">
            <span>Component 07</span>
            <span className="version-badge">Stable · V1</span>
          </div>
          <h1>Checkbox</h1>
          <p>
            Boolean and multi-selection control with a single standard geometry. Built on the native
            checkbox and extended with mixed and grouped selection.
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
          </div>
        </div>
      </section>

      <ReviewSection
        id="checkbox-basic"
        index="01"
        title="Basic"
        description="Checkbox uses one standard visual size across unchecked, checked, and mixed selection."
      >
        <div className="checkbox-demo-grid">
          <article className="checkbox-specimen-card">
            <div className="cell-meta">
              <strong>Unchecked</strong>
              <span>Available independent choice</span>
            </div>
            <div className="checkbox-component-stage">
              <Checkbox>Sync changes</Checkbox>
            </div>
            <code>default</code>
          </article>

          <article className="checkbox-specimen-card">
            <div className="cell-meta">
              <strong>Checked</strong>
              <span>Selected independent choice</span>
            </div>
            <div className="checkbox-component-stage">
              <Checkbox defaultChecked>Sync changes</Checkbox>
            </div>
            <code>defaultChecked</code>
          </article>

          <article className="checkbox-specimen-card">
            <div className="cell-meta">
              <strong>Indeterminate</strong>
              <span>Partial selection state</span>
            </div>
            <div className="checkbox-component-stage">
              <Checkbox indeterminate>Check all</Checkbox>
            </div>
            <code>indeterminate</code>
          </article>
        </div>
      </ReviewSection>

      <ReviewSection
        id="checkbox-disabled"
        index="02"
        title="Disabled"
        description="Disabled preserves unchecked, checked, and mixed selection without introducing a separate visual variant."
      >
        <div className="checkbox-inline-panel">
          <Checkbox disabled>Unchecked</Checkbox>
          <Checkbox defaultChecked disabled>
            Checked
          </Checkbox>
          <Checkbox indeterminate disabled>
            Indeterminate
          </Checkbox>
        </div>
      </ReviewSection>

      <ReviewSection
        id="checkbox-group"
        index="03"
        title="Group"
        description="Checkbox.Group coordinates multiple values while each checkbox keeps native form semantics."
      >
        <div className="checkbox-group-card">
          <div className="cell-meta">
            <strong>Fruit</strong>
            <span>Multiple independent values</span>
          </div>
          <div className="checkbox-group-stage">
            <Checkbox.Group defaultValue={['pear', 'orange']} name="fruit" aria-label="Fruit">
              <Checkbox value="apple">Apple</Checkbox>
              <Checkbox value="pear">Pear</Checkbox>
              <Checkbox value="orange">Orange</Checkbox>
            </Checkbox.Group>
          </div>
          <code>Checkbox.Group</code>
        </div>
      </ReviewSection>

      <ReviewSection
        id="checkbox-check-all"
        index="04"
        title="Check all"
        description="Indeterminate naturally represents a partially selected group."
      >
        <div className="checkbox-check-all-card">
          <Checkbox
            checked={allChecked}
            indeterminate={partiallyChecked}
            onChange={(event) => {
              setSelectedFruit(event.currentTarget.checked ? [...fruitValues] : []);
            }}
          >
            Check all
          </Checkbox>

          <div className="checkbox-check-all-divider" />

          <Checkbox.Group
            value={selectedFruit}
            onValueChange={setSelectedFruit}
            name="check-all-fruit"
            aria-label="Check all fruit"
          >
            <Checkbox value="apple">Apple</Checkbox>
            <Checkbox value="pear">Pear</Checkbox>
            <Checkbox value="orange">Orange</Checkbox>
          </Checkbox.Group>
        </div>
      </ReviewSection>

      <footer className="review-footer">
        <span>Virgo Design UI · Checkbox V1</span>
        <span>Primitive · Tokens · Icons · Metadata</span>
      </footer>
    </div>
  );
}
