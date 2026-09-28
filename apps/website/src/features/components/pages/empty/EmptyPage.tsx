import './EmptyPage.scss';

import { LayoutIcon } from '@virgo-design/icons';
import { Button, Empty } from '@virgo-design/ui';

import { ArticleSection } from '@/components/docs/ArticleSection';
import {
  ComponentExample,
  ComponentExampleRuntimeControl,
  ComponentExampleRuntimeProvider,
} from '@/components/docs/ComponentExample';
import { emptyExamples } from '@/examples/components/empty/examples';

export function EmptyPage() {
  return (
    <ComponentExampleRuntimeProvider>
      <div className="review-board empty-review">
        <section className="overview" id="overview" data-review-section="overview">
          <div className="overview-copy">
            <div className="eyebrow-row">
              <span>Component 21</span>
              <span className="version-badge">STABLE · V1.0.0</span>
            </div>
            <h1>Empty</h1>
            <p>Application-owned empty-content messaging with semantic, composable anatomy.</p>
            <dl className="component-facts">
              <div>
                <dt>Slots</dt>
                <dd>Icon · Title · Description · Action</dd>
              </div>
              <div>
                <dt>Sizes</dt>
                <dd>02</dd>
              </div>
              <div>
                <dt>Intent</dt>
                <dd>Neutral</dd>
              </div>
            </dl>
          </div>
          <div className="hero-specimen">
            <div className="specimen-toolbar">
              <span>Reference specimen</span>
              <code>icon · message · action</code>
            </div>
            <div className="hero-stage">
              <div className="empty-hero-frame">
                <Empty aria-label="Empty documents hero state">
                  <Empty.Icon>
                    <LayoutIcon />
                  </Empty.Icon>
                  <Empty.Title>No documents</Empty.Title>
                  <Empty.Description>Create your first document to get started.</Empty.Description>
                  <Empty.Action>
                    <Button>Create document</Button>
                  </Empty.Action>
                </Empty>
              </div>
            </div>
            <div className="specimen-caption">
              <span>Consumer copy</span>
              <span>Composable slots</span>
              <span>Neutral guidance</span>
              <ComponentExampleRuntimeControl />
            </div>
          </div>
        </section>
        <ArticleSection
          id={'empty-basic'}
          index={'01'}
          title={'Basic and described'}
          description={
            'Consumers own every word; Empty supplies only stable structure and presentation.'
          }
        >
          <ComponentExample example={emptyExamples.emptyBasic} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'empty-complete'}
          index={'02'}
          title={'Icon, description, and action'}
          description={
            'Optional slots compose existing icons and controls without adding business logic.'
          }
        >
          <ComponentExample example={emptyExamples.emptyAction} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'empty-search-compact'}
          index={'03'}
          title={'Search and compact states'}
          description={'The small size fits constrained surfaces while retaining the same anatomy.'}
        >
          <ComponentExample example={emptyExamples.emptySearch} showCaption={false} />
        </ArticleSection>
        <footer className="review-footer">
          <span>Virgo Design UI · Empty V1.0.0</span>
          <span>Consumer copy · Compound anatomy · Not an error</span>
        </footer>
      </div>
    </ComponentExampleRuntimeProvider>
  );
}
