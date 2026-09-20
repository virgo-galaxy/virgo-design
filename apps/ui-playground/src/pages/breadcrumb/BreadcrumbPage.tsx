import { SearchIcon, SettingsIcon, UserIcon } from '@virgo-design/icons';
import { Breadcrumb, BreadcrumbItem } from '@virgo-design/ui';

import { ReviewSection } from '../../components/ReviewSection';

function BasicBreadcrumb() {
  return (
    <Breadcrumb>
      <BreadcrumbItem href="#home">Home</BreadcrumbItem>
      <BreadcrumbItem href="#application-center">Application Center</BreadcrumbItem>
      <BreadcrumbItem href="#application-list">Application List</BreadcrumbItem>
      <BreadcrumbItem>An Application</BreadcrumbItem>
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
            <span>Component 09</span>
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
            <BreadcrumbItem icon={<UserIcon />} href="#home">
              Home
            </BreadcrumbItem>
            <BreadcrumbItem icon={<SettingsIcon />} href="#application-center">
              Application Center
            </BreadcrumbItem>
            <BreadcrumbItem icon={<SearchIcon />} href="#application-list">
              Application List
            </BreadcrumbItem>
            <BreadcrumbItem>An Application</BreadcrumbItem>
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
            <BreadcrumbItem href="#home">Home</BreadcrumbItem>
            <BreadcrumbItem href="#application-center">Application Center</BreadcrumbItem>
            <BreadcrumbItem href="#application-list">Application List</BreadcrumbItem>
            <BreadcrumbItem>An Application</BreadcrumbItem>
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
            <BreadcrumbItem href="#users">Users</BreadcrumbItem>
            <BreadcrumbItem>{userId}</BreadcrumbItem>
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
