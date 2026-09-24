import { Select, type SelectProps, type SelectSize } from '@virgo-design/ui';

import { ReviewSection } from '../../components/ReviewSection';

const sizes = [
  { value: 'mini', label: 'Mini', height: '24' },
  { value: 'small', label: 'Small', height: '28' },
  { value: 'medium', label: 'Medium', height: '36' },
  { value: 'large', label: 'Large', height: '44' },
] as const satisfies ReadonlyArray<{ value: SelectSize; label: string; height: string }>;

type DemoOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

const projectOptions = [
  { value: 'design', label: 'Virgo Design' },
  { value: 'docs', label: 'Virgo Cloud Docs' },
  { value: 'nsh', label: 'Neural Semantic Highlighting' },
  { value: 'retro', label: 'Virgo Retro' },
] as const satisfies ReadonlyArray<DemoOption>;

const environmentOptions = [
  { value: 'local', label: 'Local development' },
  { value: 'homelab', label: 'Homelab' },
  { value: 'preview', label: 'Preview environment' },
  { value: 'production', label: 'Production', disabled: true },
] as const satisfies ReadonlyArray<DemoOption>;

const longOptions = [
  { value: 'short', label: 'Virgo Design' },
  {
    value: 'long',
    label: 'Virgo Cloud Docs — personal local-first workspace for long-form knowledge and tooling',
  },
  { value: 'semantic', label: 'Neural Semantic Highlighting runtime and model workspace' },
] as const satisfies ReadonlyArray<DemoOption>;

type DemoSelectProps = Omit<SelectProps, 'children'> & {
  'aria-label': string;
  options: readonly DemoOption[];
  placeholder?: string;
};

function DemoSelect({ options, placeholder, 'aria-label': ariaLabel, ...props }: DemoSelectProps) {
  return (
    <Select {...props}>
      <Select.Trigger aria-label={ariaLabel} placeholder={placeholder} />
      <Select.Content>
        {options.map((option) => (
          <Select.Option disabled={option.disabled} key={option.value} value={option.value}>
            {option.label}
          </Select.Option>
        ))}
      </Select.Content>
    </Select>
  );
}

export function SelectPage() {
  return (
    <div className="review-board" id="select-review">
      <section className="overview" id="overview" data-review-section="overview">
        <div className="overview-copy">
          <div className="eyebrow-row">
            <span>Component 13</span>
            <span className="version-badge">STABLE · V1.0.0</span>
          </div>
          <h1>Select</h1>
          <p>
            Single-value selection through a custom Virgo listbox. The control keeps the Input
            family sizing and state language while owning disclosure, option, and keyboard behavior.
          </p>

          <dl className="component-facts">
            <div>
              <dt>Mode</dt>
              <dd>01</dd>
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
            <code>select · medium</code>
          </div>
          <div className="hero-stage">
            <div className="select-demo-width select-demo-width--hero">
              <DemoSelect
                aria-label="Reference project"
                defaultValue="design"
                options={projectOptions}
              />
            </div>
          </div>
          <div className="specimen-caption">
            <span>36px trigger</span>
            <span>Body Medium</span>
            <span>Radius 8</span>
          </div>
        </div>
      </section>

      <ReviewSection
        id="select-sizes"
        index="01"
        title="Sizes"
        description="Four trigger heights aligned with Input and Button while the dropdown follows the same density."
      >
        <div className="select-size-list">
          {sizes.map((size) => (
            <article className="select-size-row" key={size.value}>
              <div className="size-name">
                <strong>{size.label}</strong>
                <code>{size.height}px</code>
              </div>
              <div className="select-size-guide">
                <span className="guide-line" aria-hidden="true" />
                <div className="select-demo-width">
                  <DemoSelect
                    aria-label={`${size.label} project`}
                    defaultValue="design"
                    options={projectOptions}
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
        id="select-content"
        index="02"
        title="Content"
        description="Placeholder and selected value share the trigger while the selected option remains the source of display text."
      >
        <div className="select-card-grid select-card-grid--two">
          <article className="select-specimen-card">
            <div className="cell-meta">
              <strong>Placeholder</strong>
              <span>No current value</span>
            </div>
            <div className="select-component-stage">
              <div className="select-demo-width">
                <DemoSelect
                  aria-label="Choose project"
                  options={projectOptions}
                  placeholder="Choose a project"
                />
              </div>
            </div>
            <code>placeholder=&quot;Choose a project&quot;</code>
          </article>

          <article className="select-specimen-card">
            <div className="cell-meta">
              <strong>Selected value</strong>
              <span>Uncontrolled default selection</span>
            </div>
            <div className="select-component-stage">
              <div className="select-demo-width">
                <DemoSelect
                  aria-label="Selected project"
                  defaultValue="docs"
                  options={projectOptions}
                />
              </div>
            </div>
            <code>defaultValue=&quot;docs&quot;</code>
          </article>
        </div>
      </ReviewSection>

      <ReviewSection
        id="select-states"
        index="03"
        title="States"
        description="Hover and focus remain live; open keeps the trigger highlighted while disabled and invalid use semantic state colors."
      >
        <div className="select-state-grid">
          <article className="select-state-card">
            <div className="cell-meta">
              <strong>Default</strong>
              <span>Interactive single selection</span>
            </div>
            <div className="select-component-stage">
              <div className="select-demo-width">
                <DemoSelect
                  aria-label="Default project"
                  options={projectOptions}
                  placeholder="Project"
                />
              </div>
            </div>
            <code>default</code>
          </article>

          <article className="select-state-card">
            <div className="cell-meta">
              <strong>Disabled</strong>
              <span>Unavailable control</span>
            </div>
            <div className="select-component-stage">
              <div className="select-demo-width">
                <DemoSelect
                  disabled
                  aria-label="Disabled project"
                  defaultValue="design"
                  options={projectOptions}
                />
              </div>
            </div>
            <code>disabled</code>
          </article>

          <article className="select-state-card">
            <div className="cell-meta">
              <strong>Invalid</strong>
              <span>Semantic danger boundary</span>
            </div>
            <div className="select-component-stage">
              <div className="select-demo-width">
                <DemoSelect
                  invalid
                  aria-label="Invalid environment"
                  options={environmentOptions}
                  placeholder="Choose environment"
                />
              </div>
            </div>
            <code>invalid</code>
          </article>

          <article className="select-state-card">
            <div className="cell-meta">
              <strong>Open</strong>
              <span>Click to inspect listbox and selected option</span>
            </div>
            <div className="select-component-stage">
              <div className="select-demo-width">
                <DemoSelect
                  aria-label="Open project"
                  defaultValue="design"
                  options={projectOptions}
                />
              </div>
            </div>
            <code>click to inspect open</code>
          </article>
        </div>
      </ReviewSection>

      <ReviewSection
        id="select-options"
        index="04"
        title="Options & behavior"
        description="Options support selected, disabled, long-content, pointer, and keyboard interaction without changing the public single-value model."
      >
        <div className="select-card-grid">
          <article className="select-specimen-card">
            <div className="cell-meta">
              <strong>Disabled option</strong>
              <span>Production cannot be selected</span>
            </div>
            <div className="select-component-stage">
              <div className="select-demo-width">
                <DemoSelect
                  aria-label="Environment"
                  defaultValue="homelab"
                  options={environmentOptions}
                />
              </div>
            </div>
            <code>disabled: true</code>
          </article>

          <article className="select-specimen-card">
            <div className="cell-meta">
              <strong>Long content</strong>
              <span>Trigger and options preserve layout</span>
            </div>
            <div className="select-component-stage">
              <div className="select-demo-width select-demo-width--narrow">
                <DemoSelect aria-label="Long project" defaultValue="long" options={longOptions} />
              </div>
            </div>
            <code>text-overflow</code>
          </article>

          <article className="select-specimen-card">
            <div className="cell-meta">
              <strong>Keyboard</strong>
              <span>Arrow keys · Home/End · Enter · Escape</span>
            </div>
            <div className="select-component-stage">
              <div className="select-demo-width">
                <DemoSelect
                  aria-label="Keyboard project"
                  options={projectOptions}
                  placeholder="Focus, then use ArrowDown"
                />
              </div>
            </div>
            <code>listbox keyboard model</code>
          </article>
        </div>
      </ReviewSection>

      <footer className="review-footer">
        <span>Virgo Design UI · Select V1.0.0</span>
        <span>Primitive · Tokens · Icons · Metadata</span>
      </footer>
    </div>
  );
}
