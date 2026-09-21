import { SegmentedControl } from '@virgo-design/ui';

import { ReviewSection } from '../../components/ReviewSection';

const sizes = [
  { value: 'mini', label: 'Mini', height: '24px' },
  { value: 'small', label: 'Small', height: '28px' },
  { value: 'medium', label: 'Medium', height: '36px' },
  { value: 'large', label: 'Large', height: '44px' },
] as const;

const motionVariants = [
  { value: 'outline', label: 'Outline' },
  { value: 'solid', label: 'Solid' },
  { value: 'soft', label: 'Soft' },
] as const;

export function SegmentedControlPage() {
  return (
    <div className="review-board" id="segmented-control-review">
      <section className="overview" id="overview" data-review-section="overview">
        <div className="overview-copy">
          <div className="eyebrow-row">
            <span>Component 11</span>
            <span className="version-badge">Stable · V1</span>
          </div>

          <h1>Segmented Control</h1>

          <p>
            Compact single-selection control for switching between a small set of mutually exclusive
            modes or views.
          </p>

          <dl className="component-facts">
            <div>
              <dt>Variants</dt>
              <dd>03</dd>
            </div>

            <div>
              <dt>Sizes</dt>
              <dd>04</dd>
            </div>

            <div>
              <dt>Motion</dt>
              <dd>02</dd>
            </div>
          </dl>
        </div>

        <div className="hero-specimen">
          <div className="specimen-toolbar">
            <span>Reference specimen</span>
            <code>soft · small · slide</code>
          </div>

          <div className="hero-stage">
            <SegmentedControl
              variant="soft"
              size="small"
              motion="slide"
              defaultValue="light"
              aria-label="Theme"
            >
              <SegmentedControl.Item value="light">Light</SegmentedControl.Item>
              <SegmentedControl.Item value="dark">Dark</SegmentedControl.Item>
            </SegmentedControl>
          </div>

          <div className="specimen-caption">
            <span>28px height</span>
            <span>Label Small</span>
            <span>Sliding indicator</span>
          </div>
        </div>
      </section>

      <ReviewSection
        id="segmented-variants"
        index="01"
        title="Variants"
        description="Only the visual treatment changes; size, motion, content, and selected value remain identical."
      >
        <div className="segmented-variant-grid">
          <article className="segmented-specimen-card">
            <div className="cell-meta">
              <strong>Outline</strong>
              <span>Brand boundary defines the selected segment</span>
            </div>

            <div className="segmented-stage">
              <SegmentedControl variant="outline" defaultValue="pear" aria-label="Outline fruit">
                <SegmentedControl.Item value="apple">Apple</SegmentedControl.Item>
                <SegmentedControl.Item value="pear">Pear</SegmentedControl.Item>
                <SegmentedControl.Item value="orange">Orange</SegmentedControl.Item>
              </SegmentedControl>
            </div>

            <code>variant=&quot;outline&quot;</code>
          </article>

          <article className="segmented-specimen-card">
            <div className="cell-meta">
              <strong>Solid</strong>
              <span>Brand fill defines the selected segment</span>
            </div>

            <div className="segmented-stage">
              <SegmentedControl variant="solid" defaultValue="pear" aria-label="Solid fruit">
                <SegmentedControl.Item value="apple">Apple</SegmentedControl.Item>
                <SegmentedControl.Item value="pear">Pear</SegmentedControl.Item>
                <SegmentedControl.Item value="orange">Orange</SegmentedControl.Item>
              </SegmentedControl>
            </div>

            <code>variant=&quot;solid&quot;</code>
          </article>

          <article className="segmented-specimen-card">
            <div className="cell-meta">
              <strong>Soft</strong>
              <span>Elevated surface defines the selected segment</span>
            </div>

            <div className="segmented-stage">
              <SegmentedControl variant="soft" defaultValue="pear" aria-label="Soft fruit">
                <SegmentedControl.Item value="apple">Apple</SegmentedControl.Item>
                <SegmentedControl.Item value="pear">Pear</SegmentedControl.Item>
                <SegmentedControl.Item value="orange">Orange</SegmentedControl.Item>
              </SegmentedControl>
            </div>

            <code>variant=&quot;soft&quot;</code>
          </article>
        </div>
      </ReviewSection>

      <ReviewSection
        id="segmented-motion"
        index="02"
        title="Motion"
        description="For each visual variant, only the selected-indicator motion changes."
      >
        <div className="segmented-motion-list">
          {motionVariants.map((variant) => (
            <article className="segmented-motion-row" key={variant.value}>
              <div className="segmented-motion-label">
                <strong>{variant.label}</strong>
                <code>variant=&quot;{variant.value}&quot;</code>
              </div>

              <div className="segmented-motion-comparison">
                <div className="segmented-motion-cell">
                  <span>Static</span>

                  <div className="segmented-stage">
                    <SegmentedControl
                      variant={variant.value}
                      motion="none"
                      defaultValue="code"
                      aria-label={`${variant.label} static motion`}
                    >
                      <SegmentedControl.Item value="code">Code</SegmentedControl.Item>
                      <SegmentedControl.Item value="preview">Preview</SegmentedControl.Item>
                    </SegmentedControl>
                  </div>

                  <code>motion=&quot;none&quot;</code>
                </div>

                <div className="segmented-motion-cell">
                  <span>Sliding</span>

                  <div className="segmented-stage">
                    <SegmentedControl
                      variant={variant.value}
                      motion="slide"
                      defaultValue="code"
                      aria-label={`${variant.label} sliding motion`}
                    >
                      <SegmentedControl.Item value="code">Code</SegmentedControl.Item>
                      <SegmentedControl.Item value="preview">Preview</SegmentedControl.Item>
                    </SegmentedControl>
                  </div>

                  <code>motion=&quot;slide&quot;</code>
                </div>
              </div>
            </article>
          ))}
        </div>
      </ReviewSection>

      <ReviewSection
        id="segmented-sizes"
        index="03"
        title="Sizes"
        description="Only the control size changes; all other properties use their defaults."
      >
        <div className="segmented-size-list">
          {sizes.map((size) => (
            <article className="segmented-size-row" key={size.value}>
              <div className="size-name">
                <strong>{size.label}</strong>
                <code>{size.height}</code>
              </div>

              <div className="segmented-size-guide">
                <span className="guide-line" aria-hidden="true" />

                <SegmentedControl
                  variant="solid"
                  size={size.value}
                  defaultValue="light"
                  aria-label={`${size.label} theme`}
                >
                  <SegmentedControl.Item value="light">Light</SegmentedControl.Item>
                  <SegmentedControl.Item value="dark">Dark</SegmentedControl.Item>
                </SegmentedControl>

                <span className="guide-line" aria-hidden="true" />
              </div>

              <code>size=&quot;{size.value}&quot;</code>
            </article>
          ))}
        </div>
      </ReviewSection>

      <ReviewSection
        id="segmented-content"
        index="04"
        title="Content"
        description="Only the option content changes; visual treatment, size, and motion use their defaults."
      >
        <div className="segmented-content-grid">
          <article className="segmented-specimen-card">
            <div className="cell-meta">
              <strong>Two options</strong>
              <span>Compact mutually exclusive choice</span>
            </div>

            <div className="segmented-stage">
              <SegmentedControl defaultValue="code" aria-label="View mode">
                <SegmentedControl.Item value="code">Code</SegmentedControl.Item>
                <SegmentedControl.Item value="preview">Preview</SegmentedControl.Item>
              </SegmentedControl>
            </div>
          </article>

          <article className="segmented-specimen-card">
            <div className="cell-meta">
              <strong>Three options</strong>
              <span>Short categorical choice</span>
            </div>

            <div className="segmented-stage">
              <SegmentedControl defaultValue="week" aria-label="Period">
                <SegmentedControl.Item value="day">Day</SegmentedControl.Item>
                <SegmentedControl.Item value="week">Week</SegmentedControl.Item>
                <SegmentedControl.Item value="month">Month</SegmentedControl.Item>
              </SegmentedControl>
            </div>
          </article>
          <article className="segmented-specimen-card">
            <div className="cell-meta">
              <strong>Disabled option</strong>
              <span>Unavailable choices remain visible in context</span>
            </div>

            <div className="segmented-stage">
              <SegmentedControl defaultValue="pear" aria-label="Fruit with disabled option">
                <SegmentedControl.Item value="apple">Apple</SegmentedControl.Item>
                <SegmentedControl.Item value="pear">Pear</SegmentedControl.Item>
                <SegmentedControl.Item value="orange" disabled>
                  Orange
                </SegmentedControl.Item>
              </SegmentedControl>
            </div>
          </article>
        </div>
      </ReviewSection>

      <footer className="review-footer">
        <span>Virgo Design UI · Segmented Control V1</span>
        <span>Radio Primitive · Tokens · Motion · Metadata</span>
      </footer>
    </div>
  );
}
