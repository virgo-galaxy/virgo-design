import './CardPage.scss';

import { Button, Card } from '@virgo-design/ui';

import { ArticleSection } from '@/components/docs/ArticleSection';
import {
  ComponentExample,
  ComponentExampleRuntimeControl,
  ComponentExampleRuntimeProvider,
} from '@/components/docs/ComponentExample';
import { cardExamples } from '@/examples/components/card/examples';

import { ComponentPageMetadata } from '../../components/ComponentPageMetadata';

export function CardPage() {
  return (
    <ComponentExampleRuntimeProvider>
      <div className="review-board card-review">
        <section className="overview" id="overview" data-review-section="overview">
          <div className="overview-copy">
            <ComponentPageMetadata />
            <h1>Card</h1>
            <p>Content structure backed by Surface tokens, without implicit interaction.</p>
            <dl className="component-facts">
              <div>
                <dt>Variants</dt>
                <dd>02</dd>
              </div>
              <div>
                <dt>Sizes</dt>
                <dd>03</dd>
              </div>
              <div>
                <dt>Slots</dt>
                <dd>Header · Body · Footer</dd>
              </div>
            </dl>
          </div>
          <div className="hero-specimen">
            <div className="specimen-toolbar">
              <span>Reference specimen</span>
              <code>header · body · footer</code>
            </div>
            <div className="hero-stage card-hero-stage">
              <div className="card-hero-card">
                <Card variant="outlined">
                  <Card.Header>
                    <Card.Title as="h3">Virgo Design</Card.Title>
                    <Card.Description>
                      Structure a small, related block of content.
                    </Card.Description>
                  </Card.Header>
                  <Card.Body>Cards inherit Surface tokens and keep actions explicit.</Card.Body>
                  <Card.Footer>
                    <Button variant="text">Cancel</Button>
                    <Button>Review</Button>
                  </Card.Footer>
                </Card>
              </div>
            </div>
            <div className="specimen-caption">
              <span>Surface-backed</span>
              <span>Consumer-owned content</span>
              <span>Explicit actions</span>
              <ComponentExampleRuntimeControl />
            </div>
          </div>
        </section>
        <ArticleSection
          id={'card-structure'}
          index={'01'}
          title={'Basic and header'}
          description={
            'Card organizes related content; consumers choose the document heading level.'
          }
        >
          <ComponentExample example={cardExamples.cardBasic} />
          <ComponentExample example={cardExamples.cardHeader} />
        </ArticleSection>
        <ArticleSection
          id={'card-actions'}
          index={'02'}
          title={'Footer actions'}
          description={'Actions remain explicit controls composed into the Footer slot.'}
        >
          <ComponentExample example={cardExamples.cardActions} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'card-variants'}
          index={'03'}
          title={'Outlined and elevated'}
          description={
            'Variants map directly to existing Surface border, tone, radius, and elevation tokens.'
          }
        >
          <ComponentExample example={cardExamples.cardVariants} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'card-composition'}
          index={'04'}
          title={'Avatar, Badge, and arbitrary composition'}
          description={
            'Card accepts normal children and does not constrain content to its own anatomy.'
          }
        >
          <ComponentExample example={cardExamples.cardProfile} />
          <ComponentExample example={cardExamples.cardChildren} />
        </ArticleSection>
      </div>
    </ComponentExampleRuntimeProvider>
  );
}
