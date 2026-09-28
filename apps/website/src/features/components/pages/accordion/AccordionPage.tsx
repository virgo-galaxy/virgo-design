import './AccordionPage.scss';

import { Accordion } from '@virgo-design/ui';

import { ArticleSection } from '@/components/docs/ArticleSection';
import {
  ComponentExample,
  ComponentExampleRuntimeControl,
  ComponentExampleRuntimeProvider,
} from '@/components/docs/ComponentExample';
import { accordionExamples } from '@/examples/components/accordion/examples';

import { ComponentPageMetadata } from '../../components/ComponentPageMetadata';

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
    <ComponentExampleRuntimeProvider>
      <div className="review-board accordion-review" id="accordion-review">
        <section className="overview" id="overview" data-review-section="overview">
          <div className="overview-copy">
            <ComponentPageMetadata />
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
              <ComponentExampleRuntimeControl />
            </div>
          </div>
        </section>
        <ArticleSection
          id={'accordion-variants'}
          index={'01'}
          title={'Variants'}
          description={
            'Default uses separators, bordered groups items into one surface, and ghost removes visual dividers.'
          }
        >
          <ComponentExample example={accordionExamples.accordionVariants} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'accordion-sizes'}
          index={'02'}
          title={'Sizes'}
          description={
            'Size adjusts heading height, type, icon, and content spacing as one density decision.'
          }
        >
          <ComponentExample example={accordionExamples.accordionSizes} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'accordion-modes'}
          index={'03'}
          title={'Selection modes'}
          description={
            'Single mode keeps at most one section open; multiple mode lets each section change independently.'
          }
        >
          <ComponentExample example={accordionExamples.accordionSingle} />
          <ComponentExample example={accordionExamples.accordionMultiple} />
        </ArticleSection>
      </div>
    </ComponentExampleRuntimeProvider>
  );
}
