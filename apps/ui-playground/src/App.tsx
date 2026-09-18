import { CheckIcon, ChevronDownIcon, PlusIcon, SettingsIcon } from '@virgo-design/icons';
import { Button, type ButtonSize, type ButtonVariant } from '@virgo-design/ui';
import { useEffect, useState } from 'react';

type PlaygroundTheme = 'light' | 'dark';

const variants = [
  { value: 'primary', label: 'Primary', description: 'Highest emphasis' },
  { value: 'secondary', label: 'Secondary', description: 'Supporting action' },
  { value: 'outline', label: 'Outline', description: 'Defined boundary' },
  { value: 'text', label: 'Text', description: 'Lowest emphasis' },
] as const satisfies ReadonlyArray<{
  value: ButtonVariant;
  label: string;
  description: string;
}>;

const sizes = [
  { value: 'mini', label: 'Mini', height: '24' },
  { value: 'small', label: 'Small', height: '28' },
  { value: 'medium', label: 'Medium', height: '36' },
  { value: 'large', label: 'Large', height: '44' },
] as const satisfies ReadonlyArray<{ value: ButtonSize; label: string; height: string }>;

function ReviewSection({
  id,
  index,
  title,
  description,
  children,
}: {
  id: string;
  index: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="review-section" id={id} data-review-section={id}>
      <header className="section-header">
        <div className="section-index">{index}</div>
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </header>
      {children}
    </section>
  );
}

export function App() {
  const [theme, setTheme] = useState<PlaygroundTheme>('light');

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <div className="playground-shell" data-theme={theme}>
      <aside className="component-navigation">
        <div className="brand-lockup">
          <div className="brand-mark" aria-hidden="true">
            V
          </div>
          <div>
            <strong>Virgo Design</strong>
            <span>UI Laboratory</span>
          </div>
        </div>

        <nav aria-label="Component navigation">
          <p className="navigation-label">Components</p>
          <a className="component-link" href="#button-review" aria-current="page">
            <span className="component-number">01</span>
            <span>
              <strong>Button</strong>
              <small>Actions</small>
            </span>
            <span className="component-status">V1</span>
          </a>
        </nav>

        <div className="navigation-note">
          <span className="status-light" />
          <div>
            <strong>Review build</strong>
            <span>Tokens connected</span>
          </div>
        </div>
      </aside>

      <div className="workspace">
        <header className="workspace-header">
          <div className="breadcrumb" aria-label="Breadcrumb">
            <span>Components</span>
            <span aria-hidden="true">/</span>
            <strong>Button</strong>
          </div>

          <div className="theme-control" role="group" aria-label="Preview theme">
            {(['light', 'dark'] as const).map((candidate) => (
              <button
                key={candidate}
                type="button"
                aria-pressed={theme === candidate}
                onClick={() => setTheme(candidate)}
              >
                {candidate}
              </button>
            ))}
          </div>
        </header>

        <main className="review-board" id="button-review">
          <section className="overview" id="overview" data-review-section="overview">
            <div className="overview-copy">
              <div className="eyebrow-row">
                <span>Component 01</span>
                <span className="version-badge">Stable · V1</span>
              </div>
              <h1>Button</h1>
              <p>
                Triggers an immediate action. Built on the native Virgo primitive and calibrated
                against the complete token foundation.
              </p>

              <dl className="component-facts">
                <div>
                  <dt>Variants</dt>
                  <dd>04</dd>
                </div>
                <div>
                  <dt>Sizes</dt>
                  <dd>04</dd>
                </div>
                <div>
                  <dt>States</dt>
                  <dd>05</dd>
                </div>
              </dl>
            </div>

            <div className="hero-specimen">
              <div className="specimen-toolbar">
                <span>Reference specimen</span>
                <code>primary · medium</code>
              </div>
              <div className="hero-stage">
                <Button leadingIcon={<PlusIcon />}>Create project</Button>
              </div>
              <div className="specimen-caption">
                <span>36px height</span>
                <span>Label Medium</span>
                <span>Radius 8</span>
              </div>
            </div>
          </section>

          <ReviewSection
            id="variants"
            index="01"
            title="Variants"
            description="A four-step emphasis hierarchy for common product actions."
          >
            <div className="variant-grid">
              {variants.map((variant) => (
                <article className="specimen-cell" key={variant.value}>
                  <div className="cell-meta">
                    <strong>{variant.label}</strong>
                    <span>{variant.description}</span>
                  </div>
                  <div className="component-stage">
                    <Button variant={variant.value}>Button label</Button>
                  </div>
                  <code>variant=&quot;{variant.value}&quot;</code>
                </article>
              ))}
            </div>
          </ReviewSection>

          <ReviewSection
            id="sizes"
            index="02"
            title="Sizes"
            description="Four heights mapped directly to the Virgo sizing foundation."
          >
            <div className="size-list">
              {sizes.map((size) => (
                <article className="size-row" key={size.value}>
                  <div className="size-name">
                    <strong>{size.label}</strong>
                    <code>{size.height}px</code>
                  </div>
                  <div className="size-guide">
                    <span className="guide-line" aria-hidden="true" />
                    <Button size={size.value}>Button label</Button>
                    <span className="guide-line" aria-hidden="true" />
                  </div>
                  <code>size=&quot;{size.value}&quot;</code>
                </article>
              ))}
            </div>
          </ReviewSection>

          <ReviewSection
            id="icons"
            index="03"
            title="Icons"
            description="Icons inherit currentColor while Button owns their size and spacing."
          >
            <div className="icon-review">
              <section className="icon-subsection" aria-labelledby="text-icon-title">
                <div className="subsection-heading">
                  <div>
                    <h3 id="text-icon-title">Text buttons with icons</h3>
                    <p>Decorative icons can lead, trail, or frame a visible action label.</p>
                  </div>
                  <code>leadingIcon · trailingIcon</code>
                </div>

                <div className="icon-grid">
                  <article className="icon-specimen">
                    <div className="component-stage">
                      <Button leadingIcon={<PlusIcon />}>Create</Button>
                    </div>
                    <div className="cell-meta">
                      <strong>Leading icon</strong>
                      <span>Action reinforcement</span>
                    </div>
                  </article>

                  <article className="icon-specimen">
                    <div className="component-stage">
                      <Button variant="secondary" trailingIcon={<ChevronDownIcon />}>
                        Options
                      </Button>
                    </div>
                    <div className="cell-meta">
                      <strong>Trailing icon</strong>
                      <span>Direction or disclosure</span>
                    </div>
                  </article>

                  <article className="icon-specimen">
                    <div className="component-stage">
                      <Button
                        variant="outline"
                        leadingIcon={<CheckIcon />}
                        trailingIcon={<ChevronDownIcon />}
                      >
                        Approved
                      </Button>
                    </div>
                    <div className="cell-meta">
                      <strong>Leading + trailing</strong>
                      <span>Dual contextual cues</span>
                    </div>
                  </article>
                </div>
              </section>

              <section className="icon-subsection" aria-labelledby="icon-only-title">
                <div className="subsection-heading">
                  <div>
                    <h3 id="icon-only-title">Icon-only buttons</h3>
                    <p>Square is the default; circle is available for round action affordances.</p>
                  </div>
                  <code>iconOnly · aria-label</code>
                </div>

                <div className="icon-only-grid">
                  <article className="icon-only-card" data-icon-only-card="square">
                    <div className="icon-card-heading">
                      <div className="cell-meta">
                        <strong>Square</strong>
                        <span>Size-specific radius</span>
                      </div>
                      <code>shape=&quot;square&quot;</code>
                    </div>
                    <div className="icon-size-set">
                      {sizes.map((size) => (
                        <div className="icon-size-specimen" key={size.value}>
                          <Button iconOnly size={size.value} aria-label={`Add ${size.label}`}>
                            <PlusIcon />
                          </Button>
                          <span>{size.label}</span>
                          <code>{size.height}px</code>
                        </div>
                      ))}
                    </div>
                  </article>

                  <article className="icon-only-card" data-icon-only-card="circle">
                    <div className="icon-card-heading">
                      <div className="cell-meta">
                        <strong>Circle</strong>
                        <span>Full-radius geometry</span>
                      </div>
                      <code>shape=&quot;circle&quot;</code>
                    </div>
                    <div className="icon-size-set">
                      {sizes.map((size) => (
                        <div className="icon-size-specimen" key={size.value}>
                          <Button
                            iconOnly
                            shape="circle"
                            size={size.value}
                            aria-label={`${size.label} settings`}
                          >
                            <SettingsIcon />
                          </Button>
                          <span>{size.label}</span>
                          <code>{size.height}px</code>
                        </div>
                      ))}
                    </div>
                  </article>
                </div>
              </section>

              <section className="icon-subsection" aria-labelledby="icon-variant-title">
                <div className="subsection-heading">
                  <div>
                    <h3 id="icon-variant-title">Icon-only variant review</h3>
                    <p>Medium square controls across the complete emphasis hierarchy.</p>
                  </div>
                  <code>medium · square</code>
                </div>

                <div className="icon-variant-grid" data-icon-only-variants>
                  {variants.map((variant) => (
                    <div className="icon-variant-specimen" key={variant.value}>
                      <Button
                        iconOnly
                        variant={variant.value}
                        aria-label={`${variant.label} settings`}
                      >
                        <SettingsIcon />
                      </Button>
                      <span>{variant.label}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </ReviewSection>

          <ReviewSection
            id="states"
            index="04"
            title="States"
            description="Hover and active remain live; use Tab to inspect the focus-visible ring."
          >
            <div className="state-table">
              <div className="state-heading" aria-hidden="true">
                <span>Variant</span>
                <span>Default</span>
                <span>Disabled</span>
              </div>
              {variants.map((variant) => (
                <div className="state-row" key={variant.value}>
                  <div className="state-name">
                    <span>{variant.label}</span>
                    <code>{variant.value}</code>
                  </div>
                  <div className="state-stage">
                    <Button variant={variant.value}>Button label</Button>
                  </div>
                  <div className="state-stage">
                    <Button variant={variant.value} disabled>
                      Button label
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </ReviewSection>

          <footer className="review-footer">
            <span>Virgo Design UI · Button V1</span>
            <span>Primitive · Tokens · Icons</span>
          </footer>
        </main>
      </div>
    </div>
  );
}
