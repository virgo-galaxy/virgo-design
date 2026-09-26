import { PlusIcon } from '@virgo-design/icons';
import { Button } from '@virgo-design/ui';

import { ArticleSection } from '@/components/docs/ArticleSection';
import { ComponentExample } from '@/components/docs/ComponentExample';
import { buttonExamples } from '@/examples/components/button/examples';

export function ButtonPage() {
  return (
    <article className="review-board" id="button-review">
      <section className="overview" id="overview" data-review-section="overview">
        <div className="overview-copy">
          <div className="eyebrow-row">
            <span>Component 01</span>
            <span className="version-badge">STABLE · V1.0.0</span>
          </div>
          <h1>Button</h1>
          <p>
            Triggers an immediate action. Built on the native Virgo primitive and calibrated against
            the complete token foundation.
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

      <ArticleSection
        id="variants"
        index="01"
        title="Variants"
        description="A four-step emphasis hierarchy for common product actions."
      >
        <ComponentExample example={buttonExamples.variants} showCaption={false} />
      </ArticleSection>

      <ArticleSection
        id="sizes"
        index="02"
        title="Sizes"
        description="Four heights mapped directly to the Virgo sizing foundation."
      >
        <ComponentExample example={buttonExamples.sizes} showCaption={false} />
      </ArticleSection>

      <ArticleSection
        id="icons"
        index="03"
        title="Icons"
        description="Icons inherit currentColor while Button owns their size and spacing."
      >
        <ComponentExample example={buttonExamples.icons} />
        <ComponentExample example={buttonExamples.iconOnly} />
      </ArticleSection>

      <ArticleSection
        id="states"
        index="04"
        title="States"
        description="Hover and active remain live; use Tab to inspect the focus-visible ring."
      >
        <ComponentExample example={buttonExamples.states} showCaption={false} />
      </ArticleSection>

      <footer className="review-footer">
        <span>Virgo Design UI · Button V1.0.0</span>
        <span>Primitive · Tokens · Icons</span>
      </footer>
    </article>
  );
}
