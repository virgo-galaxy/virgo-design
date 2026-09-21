import { CheckIcon, SearchIcon, UserIcon } from '@virgo-design/icons';
import { Input, type InputSize, Textarea, type TextareaSize } from '@virgo-design/ui';

import { ReviewSection } from '../../components/ReviewSection';

const sizes = [
  { value: 'mini', label: 'Mini', height: '24' },
  { value: 'small', label: 'Small', height: '28' },
  { value: 'medium', label: 'Medium', height: '36' },
  { value: 'large', label: 'Large', height: '44' },
] as const satisfies ReadonlyArray<{ value: InputSize; label: string; height: string }>;

const textareaSizes = [
  { value: 'mini', label: 'Mini', minHeight: '56' },
  { value: 'small', label: 'Small', minHeight: '64' },
  { value: 'medium', label: 'Medium', minHeight: '80' },
  { value: 'large', label: 'Large', minHeight: '96' },
] as const satisfies ReadonlyArray<{
  value: TextareaSize;
  label: string;
  minHeight: string;
}>;

export function InputPage() {
  return (
    <div className="review-board" id="input-review">
      <section className="overview" id="overview" data-review-section="overview">
        <div className="overview-copy">
          <div className="eyebrow-row">
            <span>Component 05</span>
            <span className="version-badge">Stable · V1</span>
          </div>
          <h1>Input</h1>
          <p>
            Text-entry family for single-line and multiline content. Built on native Virgo
            primitives and calibrated against the same sizing, typography, color, and motion
            foundations as Button.
          </p>

          <dl className="component-facts">
            <div>
              <dt>Controls</dt>
              <dd>02</dd>
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

      <ReviewSection
        id="input-textarea"
        index="05"
        title="Textarea"
        description={
          'Multiline text entry shares the Input family state language while keeping native textarea semantics.'
        }
      >
        <div className="textarea-review">
          <section className="textarea-subsection" aria-labelledby="textarea-sizes-title">
            <div className="subsection-heading">
              <div>
                <h3 id="textarea-sizes-title">Sizes</h3>
                <p>Size controls density and minimum height; native rows still describe content.</p>
              </div>
              <code>mini · small · medium · large</code>
            </div>

            <div className="textarea-size-grid">
              {textareaSizes.map((size) => (
                <article className="textarea-specimen-card" key={size.value}>
                  <div className="cell-meta">
                    <strong>{size.label}</strong>
                    <span>{size.minHeight}px minimum height</span>
                  </div>
                  <div className="textarea-component-stage">
                    <Textarea
                      aria-label={`${size.label} textarea`}
                      placeholder={`${size.label} multiline input`}
                      rows={3}
                      size={size.value}
                    />
                  </div>
                  <code>size=&quot;{size.value}&quot;</code>
                </article>
              ))}
            </div>
          </section>

          <section className="textarea-subsection" aria-labelledby="textarea-states-title">
            <div className="subsection-heading">
              <div>
                <h3 id="textarea-states-title">States</h3>
                <p>Textarea reuses the same semantic state language as single-line Input.</p>
              </div>
              <code>default · disabled · readOnly · invalid</code>
            </div>

            <div className="textarea-state-grid">
              <article className="textarea-specimen-card">
                <div className="cell-meta">
                  <strong>Default</strong>
                  <span>Resizable multiline entry</span>
                </div>
                <div className="textarea-component-stage">
                  <Textarea
                    aria-label="Default textarea"
                    placeholder="Describe the project"
                    rows={4}
                  />
                </div>
                <code>default</code>
              </article>

              <article className="textarea-specimen-card">
                <div className="cell-meta">
                  <strong>Disabled</strong>
                  <span>Unavailable multiline control</span>
                </div>
                <div className="textarea-component-stage">
                  <Textarea
                    disabled
                    aria-label="Disabled textarea"
                    defaultValue="This content is unavailable."
                    rows={4}
                  />
                </div>
                <code>disabled</code>
              </article>

              <article className="textarea-specimen-card">
                <div className="cell-meta">
                  <strong>Read only</strong>
                  <span>Focusable, selectable multiline content</span>
                </div>
                <div className="textarea-component-stage">
                  <Textarea
                    readOnly
                    aria-label="Read-only textarea"
                    defaultValue="Virgo Design keeps canonical UI assets close to their source of truth."
                    rows={4}
                  />
                </div>
                <code>readOnly</code>
              </article>

              <article className="textarea-specimen-card">
                <div className="cell-meta">
                  <strong>Invalid</strong>
                  <span>Semantic danger boundary</span>
                </div>
                <div className="textarea-component-stage">
                  <Textarea
                    invalid
                    aria-label="Invalid textarea"
                    defaultValue="Needs revision"
                    rows={4}
                  />
                </div>
                <code>invalid</code>
              </article>
            </div>
          </section>
        </div>
      </ReviewSection>

      <footer className="review-footer">
        <span>Virgo Design UI · Input Family V1</span>
        <span>Input · Textarea · Primitive · Tokens · Metadata</span>
      </footer>
    </div>
  );
}
