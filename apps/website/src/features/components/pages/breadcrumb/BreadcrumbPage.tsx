import { Breadcrumb } from '@virgo-design/ui';

import { ArticleSection } from '@/components/docs/ArticleSection';
import {
  ComponentExample,
  ComponentExampleRuntimeControl,
  ComponentExampleRuntimeProvider,
} from '@/components/docs/ComponentExample';
import { breadcrumbExamples } from '@/examples/components/breadcrumb/examples';

import { ComponentPageMetadata } from '../../components/ComponentPageMetadata';

function BasicBreadcrumb() {
  return (
    <Breadcrumb>
      <Breadcrumb.Item href="#home">Home</Breadcrumb.Item>
      <Breadcrumb.Item href="#application-center">Application Center</Breadcrumb.Item>
      <Breadcrumb.Item href="#application-list">Application List</Breadcrumb.Item>
      <Breadcrumb.Item>An Application</Breadcrumb.Item>
    </Breadcrumb>
  );
}

export function BreadcrumbPage() {
  return (
    <ComponentExampleRuntimeProvider>
      <div className="review-board" id="breadcrumb-review">
        <section className="overview" id="overview" data-review-section="overview">
          <div className="overview-copy">
            <ComponentPageMetadata />
            <h1>Breadcrumb</h1>
            <p>
              Communicates the current location within a hierarchy using native links, ordered-list
              semantics, and a clearly identified current page.
            </p>
            <dl className="component-facts">
              <div>
                <dt>Items</dt>
                <dd>ReactNode</dd>
              </div>
              <div>
                <dt>Separator</dt>
                <dd>Custom</dd>
              </div>
              <div>
                <dt>Semantics</dt>
                <dd>Native</dd>
              </div>
            </dl>
          </div>
          <div className="hero-specimen breadcrumb-hero-specimen">
            <div className="specimen-toolbar">
              <span>Reference specimen</span>
              <code>basic · slash</code>
            </div>
            <div className="hero-stage breadcrumb-hero-stage">
              <BasicBreadcrumb />
            </div>
            <div className="specimen-caption">
              <span>Native links</span>
              <span>Ordered path</span>
              <span>Current page</span>
              <ComponentExampleRuntimeControl />
            </div>
          </div>
        </section>
        <ArticleSection
          id={'breadcrumb-basic'}
          index={'01'}
          title={'Basic'}
          description={
            'Previous hierarchy levels are native links while the final item identifies the current page.'
          }
        >
          <ComponentExample example={breadcrumbExamples.breadcrumbBasic} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'breadcrumb-icons'}
          index={'02'}
          title={'Icons'}
          description={
            'Decorative icons can accompany item labels without changing the default separator or link semantics.'
          }
        >
          <ComponentExample example={breadcrumbExamples.breadcrumbIcons} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'breadcrumb-separator'}
          index={'03'}
          title={'Separator'}
          description={
            'Only the decorative separator changes; item content and hierarchy remain identical.'
          }
        >
          <ComponentExample example={breadcrumbExamples.breadcrumbSeparator} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'breadcrumb-dynamic-value'}
          index={'04'}
          title={'Dynamic Value'}
          description={
            'Runtime values render naturally through ReactNode item content without router integration.'
          }
        >
          <ComponentExample example={breadcrumbExamples.breadcrumbDynamic} showCaption={false} />
        </ArticleSection>
      </div>
    </ComponentExampleRuntimeProvider>
  );
}
