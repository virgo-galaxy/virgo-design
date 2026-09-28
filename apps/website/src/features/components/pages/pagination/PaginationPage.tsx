import './PaginationPage.scss';

import { Pagination } from '@virgo-design/ui';

import { ArticleSection } from '@/components/docs/ArticleSection';
import {
  ComponentExample,
  ComponentExampleRuntimeControl,
  ComponentExampleRuntimeProvider,
} from '@/components/docs/ComponentExample';
import { paginationExamples } from '@/examples/components/pagination/examples';

import { ComponentPageMetadata } from '../../components/ComponentPageMetadata';

export function PaginationPage() {
  return (
    <ComponentExampleRuntimeProvider>
      <div className="review-board pagination-review" id="pagination-review">
        <section className="overview" id="overview" data-review-section="overview">
          <div className="overview-copy">
            <ComponentPageMetadata />
            <h1>Pagination</h1>
            <p>
              Move through a collection at your own pace. Clear page positions, focused navigation,
              and optional controls that fit the task.
            </p>
            <dl className="component-facts">
              <div>
                <dt>Alignment</dt>
                <dd>3 positions</dd>
              </div>
              <div>
                <dt>Options</dt>
                <dd>3 controls</dd>
              </div>
              <div>
                <dt>State</dt>
                <dd>Both modes</dd>
              </div>
            </dl>
          </div>
          <div className="hero-specimen pagination-hero">
            <div className="specimen-toolbar">
              <span>Reference specimen</span>
              <code>page navigation</code>
            </div>
            <div className="hero-stage pagination-hero-stage">
              <Pagination
                total={500}
                defaultPage={6}
                align="center"
                aria-label="Reference pagination"
              />
            </div>
            <div className="specimen-caption">
              <span>Current page</span>
              <span>Bounded pages</span>
              <span>Quick navigation</span>
              <ComponentExampleRuntimeControl />
            </div>
          </div>
        </section>
        <ArticleSection
          id={'pagination-basic'}
          index={'01'}
          title={'Basic'}
          description={
            'Five pages, native buttons, and disabled navigation at the first and last page.'
          }
        >
          <ComponentExample example={paginationExamples.paginationBasic} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'pagination-more'}
          index={'02'}
          title={'More pages'}
          description={
            'The first and last pages stay visible. Hover or focus an ellipsis to reveal the five-page jump action.'
          }
        >
          <ComponentExample example={paginationExamples.paginationMore} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'pagination-size'}
          index={'03'}
          title={'Page size'}
          description={
            'Show the size menu independently. Virgo Dropdown marks the current size and supports keyboard navigation; changing size returns to page one.'
          }
        >
          <ComponentExample example={paginationExamples.paginationPageSize} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'pagination-jump'}
          index={'04'}
          title={'Quick jump'}
          description={
            'Enter a page number and press Enter. Out-of-range or nonnumeric input is marked invalid; Escape clears the draft.'
          }
        >
          <ComponentExample example={paginationExamples.paginationQuickJump} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'pagination-total'}
          index={'05'}
          title={'Total & range'}
          description={
            'Display the count by itself, or render the visible item range with the total callback.'
          }
        >
          <ComponentExample example={paginationExamples.paginationTotal} />
          <ComponentExample example={paginationExamples.paginationRange} />
        </ArticleSection>
        <ArticleSection
          id={'pagination-all'}
          index={'06'}
          title={'All options'}
          description={
            'showAll enables total, page size and jump together. Each can be overridden independently; this example owns both page and page size.'
          }
        >
          <ComponentExample example={paginationExamples.paginationControlled} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'pagination-align'}
          index={'07'}
          title={'Alignment'}
          description={
            'Align the whole pagination group to the left, center or right of its container.'
          }
        >
          <ComponentExample example={paginationExamples.paginationAlignment} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'pagination-labels'}
          index={'08'}
          title={'Navigation labels'}
          description={
            'Replace arrow icons with text, or localize the controls and their accessible names.'
          }
        >
          <ComponentExample example={paginationExamples.paginationTextLabels} />
          <ComponentExample example={paginationExamples.paginationLocalization} />
        </ArticleSection>
        <ArticleSection
          id={'pagination-states'}
          index={'09'}
          title={'Disabled & empty'}
          description={
            'All controls honor the disabled state. Empty collections keep a stable page-one layout with a zero item range.'
          }
        >
          <ComponentExample example={paginationExamples.paginationDisabled} />
          <ComponentExample example={paginationExamples.paginationEmpty} />
        </ArticleSection>
      </div>
    </ComponentExampleRuntimeProvider>
  );
}
