import { CheckIcon, SearchIcon, UserIcon } from '@virgo-design/icons';
import { Input, type InputSize } from '@virgo-design/ui';

import { ReviewSection } from '../../components/ReviewSection';

const sizes = [
  { value: 'mini', label: 'Mini', height: '24' },
  { value: 'small', label: 'Small', height: '28' },
  { value: 'medium', label: 'Medium', height: '36' },
  { value: 'large', label: 'Large', height: '44' },
] as const satisfies ReadonlyArray<{ value: InputSize; label: string; height: string }>;

export function InputPage() {
  return (
    <main className="review-board" id="input-review">
      <section className="overview" id="overview" data-review-section="overview">
        <div className="overview-copy">
          <div className="eyebrow-row">
            <span>Component 02</span>
            <span className="version-badge">Review · V1</span>
          </div>
          <h1>Input</h1>
          <p>
            Accepts a single line of text. Built on the native Virgo primitive and calibrated
            against the same sizing, typography, color, motion, and icon foundations as Button.
          </p>

          <dl className="component-facts">
            <div>
              <dt>Sizes</dt>
              <dd>04</dd>
            </div>
            <div>
              <dt>States</dt>
              <dd>06</dd>
            </div>
            <div>
              <dt>Icon slots</dt>
              <dd>02</dd>
            </div>
          </dl>
        </div>

        <div className="hero-specimen">
          <div className="specimen-toolbar">
            <span>Reference specimen</span>
            <code>default · medium</code>
          </div>
          <div className="hero-stage">
            <div className="input-demo-width input-demo-width--hero">
              <Input
                aria-label="Search components"
                leadingIcon={<SearchIcon />}
                placeholder="Search components"
              />
            </div>
          </div>
          <div className="specimen-caption">
            <span>36px height</span>
            <span>Body Medium</span>
            <span>Radius 8</span>
          </div>
        </div>
      </section>

      <ReviewSection
        id="input-sizes"
        index="01"
        title="Sizes"
        description={
          'Four control heights aligned with the Virgo sizing foundation and Button scale.'
        }
      >
        <div className="input-size-list">
          {sizes.map((size) => (
            <article className="input-size-row" key={size.value}>
              <div className="size-name">
                <strong>{size.label}</strong>
                <code>{size.height}px</code>
              </div>
              <div className="input-size-guide">
                <span className="guide-line" aria-hidden="true" />
                <div className="input-demo-width">
                  <Input
                    aria-label={`${size.label} input`}
                    placeholder={`${size.label} input`}
                    size={size.value}
                  />
                </div>
                <span className="guide-line" aria-hidden="true" />
              </div>
              <code>size=&quot;{size.value}&quot;</code>
            </article>
          ))}
        </div>
      </ReviewSection>

      <ReviewSection
        id="input-content"
        index="02"
        title="Content"
        description={
          'Placeholder and entered value use native input semantics and Virgo body typography.'
        }
      >
        <div className="input-card-grid input-card-grid--two">
          <article className="input-specimen-card">
            <div className="cell-meta">
              <strong>Placeholder</strong>
              <span>Empty text-entry control</span>
            </div>
            <div className="input-component-stage">
              <div className="input-demo-width">
                <Input aria-label="Project name" placeholder="Untitled project" />
              </div>
            </div>
            <code>placeholder=&quot;Untitled project&quot;</code>
          </article>

          <article className="input-specimen-card">
            <div className="cell-meta">
              <strong>Value</strong>
              <span>Native editable content</span>
            </div>
            <div className="input-component-stage">
              <div className="input-demo-width">
                <Input aria-label="Workspace name" defaultValue="Virgo Design" />
              </div>
            </div>
            <code>defaultValue=&quot;Virgo Design&quot;</code>
          </article>
        </div>
      </ReviewSection>

      <ReviewSection
        id="input-icons"
        index="03"
        title="Icons"
        description={
          'Decorative leading and trailing slots inherit currentColor and Input owns their size.'
        }
      >
        <div className="input-card-grid">
          <article className="input-specimen-card">
            <div className="cell-meta">
              <strong>Leading icon</strong>
              <span>Search or field context</span>
            </div>
            <div className="input-component-stage">
              <div className="input-demo-width">
                <Input
                  aria-label="Search"
                  leadingIcon={<SearchIcon />}
                  placeholder="Search components"
                />
              </div>
            </div>
            <code>leadingIcon</code>
          </article>

          <article className="input-specimen-card">
            <div className="cell-meta">
              <strong>Trailing icon</strong>
              <span>Decorative completion cue</span>
            </div>
            <div className="input-component-stage">
              <div className="input-demo-width">
                <Input
                  aria-label="Approved name"
                  defaultValue="Virgo"
                  trailingIcon={<CheckIcon />}
                />
              </div>
            </div>
            <code>trailingIcon</code>
          </article>

          <article className="input-specimen-card">
            <div className="cell-meta">
              <strong>Leading + trailing</strong>
              <span>Two contextual cues</span>
            </div>
            <div className="input-component-stage">
              <div className="input-demo-width">
                <Input
                  aria-label="Account"
                  defaultValue="mystic"
                  leadingIcon={<UserIcon />}
                  trailingIcon={<CheckIcon />}
                />
              </div>
            </div>
            <code>leadingIcon · trailingIcon</code>
          </article>
        </div>
      </ReviewSection>

      <ReviewSection
        id="input-states"
        index="04"
        title="States"
        description={
          'Hover and focus remain live; use Tab or click a field to inspect the focus treatment.'
        }
      >
        <div className="input-state-grid">
          <article className="input-state-card">
            <div className="cell-meta">
              <strong>Default</strong>
              <span>Interactive text entry</span>
            </div>
            <div className="input-component-stage">
              <div className="input-demo-width">
                <Input aria-label="Default input" placeholder="Type something" />
              </div>
            </div>
            <code>default</code>
          </article>

          <article className="input-state-card">
            <div className="cell-meta">
              <strong>Disabled</strong>
              <span>Unavailable control</span>
            </div>
            <div className="input-component-stage">
              <div className="input-demo-width">
                <Input disabled aria-label="Disabled input" defaultValue="Unavailable" />
              </div>
            </div>
            <code>disabled</code>
          </article>

          <article className="input-state-card">
            <div className="cell-meta">
              <strong>Read only</strong>
              <span>Focusable, selectable content</span>
            </div>
            <div className="input-component-stage">
              <div className="input-demo-width">
                <Input readOnly aria-label="Read-only input" defaultValue="virgo-galaxy" />
              </div>
            </div>
            <code>readOnly</code>
          </article>

          <article className="input-state-card">
            <div className="cell-meta">
              <strong>Invalid</strong>
              <span>Semantic danger boundary</span>
            </div>
            <div className="input-component-stage">
              <div className="input-demo-width">
                <Input invalid aria-label="Invalid input" defaultValue="virgo design" />
              </div>
            </div>
            <code>invalid</code>
          </article>
        </div>
      </ReviewSection>

      <footer className="review-footer">
        <span>Virgo Design UI · Input V1</span>
        <span>Primitive · Tokens · Icons · Metadata</span>
      </footer>
    </main>
  );
}
