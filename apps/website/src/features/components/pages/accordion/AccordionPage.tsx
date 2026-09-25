import './AccordionPage.scss';

import { Accordion, type AccordionSize, type AccordionVariant } from '@virgo-design/ui';

import { ReviewSection } from '../../components/ReviewSection';

const sizes = ['sm', 'md', 'lg'] as const satisfies readonly AccordionSize[];
const variants = ['default', 'bordered', 'ghost'] as const satisfies readonly AccordionVariant[];

function DemoItems({ prefix }: { prefix: string }) {
  return (
    <>
      <Accordion.Item value={`${prefix}-anatomy`}>
        <Accordion.Trigger icon>Anatomy</Accordion.Trigger>
        <Accordion.Content>
          Root coordinates Item, Trigger, and Content without owning application content.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value={`${prefix}-behavior`}>
        <Accordion.Trigger icon>Behavior</Accordion.Trigger>
        <Accordion.Content>
          State can be controlled or uncontrolled, with one or several items open.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value={`${prefix}-keyboard`}>
        <Accordion.Trigger icon>Keyboard</Accordion.Trigger>
        <Accordion.Content>
          Arrow keys, Home, and End move focus between enabled headings.
        </Accordion.Content>
      </Accordion.Item>
    </>
  );
}

export function AccordionPage() {
  return (
    <div className="review-board accordion-review" id="accordion-review">
      <section className="overview" id="overview" data-review-section="overview">
        <div className="overview-copy">
          <div className="eyebrow-row">
            <span>Component 16</span>
            <span className="version-badge">STABLE · V1.0.0</span>
          </div>
          <h1>Accordion</h1>
          <p>
            Progressive disclosure for related sections, built from accessible heading buttons and
            labelled content regions.
          </p>
          <dl className="component-facts">
            <div>
              <dt>Modes</dt>
              <dd>02</dd>
            </div>
            <div>
              <dt>Sizes</dt>
              <dd>03</dd>
            </div>
            <div>
              <dt>Variants</dt>
              <dd>03</dd>
            </div>
          </dl>
        </div>

        <div className="hero-specimen">
          <div className="specimen-toolbar">
            <span>Reference specimen</span>
            <code>single · bordered · md</code>
          </div>
          <div className="hero-stage accordion-hero-stage">
            <Accordion.Root
              type="single"
              variant="bordered"
              defaultValue="hero-anatomy"
              className="accordion-demo"
            >
              <DemoItems prefix="hero" />
            </Accordion.Root>
          </div>
          <div className="specimen-caption">
            <span>ARIA headings</span>
            <span>Arrow navigation</span>
            <span>Classic style</span>
          </div>
        </div>
      </section>

      <ReviewSection
        id="accordion-variants"
        index="01"
        title="Variants"
        description="Default uses separators, bordered groups items into one surface, and ghost removes visual dividers."
      >
        <div className="accordion-demo-grid">
          {variants.map((variant) => (
            <article className="accordion-demo-card" key={variant}>
              <div className="cell-meta">
                <strong>{variant}</strong>
                <span>Classic {variant} treatment</span>
              </div>
              <Accordion.Root
                type="single"
                variant={variant}
                defaultValue={`${variant}-anatomy`}
                className="accordion-demo"
              >
                <DemoItems prefix={variant} />
              </Accordion.Root>
              <code>variant=&quot;{variant}&quot;</code>
            </article>
          ))}
        </div>
      </ReviewSection>

      <ReviewSection
        id="accordion-sizes"
        index="02"
        title="Sizes"
        description="Size adjusts heading height, type, icon, and content spacing as one density decision."
      >
        <div className="accordion-demo-grid">
          {sizes.map((size) => (
            <article className="accordion-demo-card" key={size}>
              <div className="cell-meta">
                <strong>{size.toUpperCase()}</strong>
                <span>{size} density</span>
              </div>
              <Accordion.Root
                type="single"
                size={size}
                variant="bordered"
                defaultValue={`${size}-anatomy`}
                className="accordion-demo"
              >
                <DemoItems prefix={size} />
              </Accordion.Root>
              <code>size=&quot;{size}&quot;</code>
            </article>
          ))}
        </div>
      </ReviewSection>

      <ReviewSection
        id="accordion-modes"
        index="03"
        title="Selection modes"
        description="Single mode keeps at most one section open; multiple mode lets each section change independently."
      >
        <div className="accordion-mode-grid">
          <article className="accordion-demo-card">
            <div className="cell-meta">
              <strong>Single</strong>
              <span>One open item at a time</span>
            </div>
            <Accordion.Root type="single" variant="bordered" className="accordion-demo">
              <DemoItems prefix="single" />
            </Accordion.Root>
            <code>type=&quot;single&quot;</code>
          </article>

          <article className="accordion-demo-card">
            <div className="cell-meta">
              <strong>Multiple</strong>
              <span>Independent open items</span>
            </div>
            <Accordion.Root
              type="multiple"
              variant="bordered"
              defaultValue={['multiple-anatomy', 'multiple-keyboard']}
              className="accordion-demo"
            >
              <DemoItems prefix="multiple" />
            </Accordion.Root>
            <code>type=&quot;multiple&quot;</code>
          </article>
        </div>
      </ReviewSection>

      <footer className="review-footer">
        <span>Virgo Design UI · Accordion V1.0.0</span>
        <span>Primitive · Tokens · Metadata · Accessibility</span>
      </footer>
    </div>
  );
}
