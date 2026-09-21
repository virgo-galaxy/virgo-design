import { SearchIcon, SettingsIcon, UserIcon } from '@virgo-design/icons';
import { Breadcrumb } from '@virgo-design/ui';

import { ReviewSection } from '../../components/ReviewSection';

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
  const userId = 1;

  return (
    <main className="review-board" id="breadcrumb-review">
      <section className="overview" id="overview" data-review-section="overview">
        <div className="overview-copy">
          <div className="eyebrow-row">
            <span>Component 04</span>
            <span className="version-badge">Stable · V1</span>
          </div>
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
          </div>
        </div>
      </section>

      <ReviewSection
        id="breadcrumb-basic"
        index="01"
        title="Basic"
        description="Previous hierarchy levels are native links while the final item identifies the current page."
      >
        <div className="breadcrumb-review-card">
          <BasicBreadcrumb />
        </div>
      </ReviewSection>

      <ReviewSection
        id="breadcrumb-icons"
        index="02"
        title="Icons"
        description="Decorative icons can accompany item labels without changing the default separator or link semantics."
      >
        <div className="breadcrumb-review-card">
          <Breadcrumb>
            <Breadcrumb.Item icon={<UserIcon />} href="#home">
              Home
            </Breadcrumb.Item>
            <Breadcrumb.Item icon={<SettingsIcon />} href="#application-center">
              Application Center
            </Breadcrumb.Item>
            <Breadcrumb.Item icon={<SearchIcon />} href="#application-list">
              Application List
            </Breadcrumb.Item>
            <Breadcrumb.Item>An Application</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </ReviewSection>

      <ReviewSection
        id="breadcrumb-separator"
        index="03"
        title="Separator"
        description="Only the decorative separator changes; item content and hierarchy remain identical."
      >
        <div className="breadcrumb-review-card">
          <Breadcrumb separator=">">
            <Breadcrumb.Item href="#home">Home</Breadcrumb.Item>
            <Breadcrumb.Item href="#application-center">Application Center</Breadcrumb.Item>
            <Breadcrumb.Item href="#application-list">Application List</Breadcrumb.Item>
            <Breadcrumb.Item>An Application</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </ReviewSection>

      <ReviewSection
        id="breadcrumb-dynamic-value"
        index="04"
        title="Dynamic Value"
        description="Runtime values render naturally through ReactNode item content without router integration."
      >
        <div className="breadcrumb-review-card">
          <Breadcrumb>
            <Breadcrumb.Item href="#users">Users</Breadcrumb.Item>
            <Breadcrumb.Item>{userId}</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </ReviewSection>

      <footer className="review-footer">
        <span>Virgo Design UI · Breadcrumb V1</span>
        <span>Primitive · Tokens · Icons · Metadata · Accessibility</span>
      </footer>
    </main>
  );
}
