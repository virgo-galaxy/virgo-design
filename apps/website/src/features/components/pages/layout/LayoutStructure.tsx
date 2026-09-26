import { Layout } from '@virgo-design/ui';

import { ReviewSection } from '../../components/ReviewSection';

function BasicLayout() {
  return (
    <Layout className="layout-demo">
      <Layout.Header className="layout-demo-region layout-demo-header">Header</Layout.Header>
      <Layout.Content className="layout-demo-region layout-demo-content">Content</Layout.Content>
      <Layout.Footer className="layout-demo-region layout-demo-footer">Footer</Layout.Footer>
    </Layout>
  );
}

function HeroLayout() {
  return (
    <Layout className="layout-demo">
      <Layout.Header className="layout-demo-region layout-demo-header">Header</Layout.Header>
      <Layout direction="horizontal">
        <Layout.Sidebar
          className="layout-demo-region layout-demo-sidebar"
          width="25%"
          surface={{
            border: 'none',
            background: { type: 'color', value: 'var(--vd-brand-6)' },
          }}
        >
          Sidebar
        </Layout.Sidebar>
        <Layout.Content className="layout-demo-region layout-demo-content">Content</Layout.Content>
      </Layout>
      <Layout.Footer className="layout-demo-region layout-demo-footer">Footer</Layout.Footer>
    </Layout>
  );
}

export function LayoutStructure() {
  return (
    <>
      <section className="overview" id="overview" data-review-section="overview">
        <div className="overview-copy">
          <div className="eyebrow-row">
            <span>Component 03</span>
            <span className="version-badge">STABLE · V1.0.0</span>
          </div>
          <h1>Layout</h1>
          <p>
            Provides the page-level skeleton for semantic header, side, content, and footer regions
            through vertical, horizontal, and nested composition.
          </p>

          <dl className="component-facts">
            <div>
              <dt>Directions</dt>
              <dd>2</dd>
            </div>
            <div>
              <dt>Regions</dt>
              <dd>4</dd>
            </div>
            <div>
              <dt>Composition</dt>
              <dd>Nested</dd>
            </div>
          </dl>
        </div>

        <div className="hero-specimen">
          <div className="specimen-toolbar">
            <span>Reference specimen</span>
            <code>header · sidebar · content · footer</code>
          </div>
          <div className="hero-stage layout-hero-stage">
            <div className="layout-hero-frame layout-review-card">
              <HeroLayout />
            </div>
          </div>
          <div className="specimen-caption">
            <span>Vertical composition</span>
            <span>Nested horizontal region</span>
            <span>Semantic page skeleton</span>
          </div>
        </div>
      </section>

      <ReviewSection
        id="layout-structures"
        index="01"
        title="Layout structures"
        description="Four compositions of Header, Sidebar, Content, and Footer."
      >
        <div className="layout-structure-grid">
          <section
            id="layout-basic"
            className="layout-review-card"
            aria-labelledby="layout-basic-title"
          >
            <h3 id="layout-basic-title" className="layout-sr-only">
              Basic
            </h3>
            <BasicLayout />
          </section>
          <section
            id="layout-left-sidebar"
            className="layout-review-card"
            aria-labelledby="layout-left-sidebar-title"
          >
            <h3 id="layout-left-sidebar-title" className="layout-sr-only">
              Left Sidebar
            </h3>
            <HeroLayout />
          </section>
          <section
            id="layout-right-sidebar"
            className="layout-review-card"
            aria-labelledby="layout-right-sidebar-title"
          >
            <h3 id="layout-right-sidebar-title" className="layout-sr-only">
              Right Sidebar
            </h3>
            <Layout className="layout-demo">
              <Layout.Header className="layout-demo-region layout-demo-header">
                Header
              </Layout.Header>
              <Layout direction="horizontal">
                <Layout.Content className="layout-demo-region layout-demo-content">
                  Content
                </Layout.Content>
                <Layout.Sidebar
                  className="layout-demo-region layout-demo-sidebar"
                  width="25%"
                  surface={{
                    border: 'none',
                    background: { type: 'color', value: 'var(--vd-brand-6)' },
                  }}
                >
                  Sidebar
                </Layout.Sidebar>
              </Layout>
              <Layout.Footer className="layout-demo-region layout-demo-footer">
                Footer
              </Layout.Footer>
            </Layout>
          </section>
          <section
            id="layout-full-height-sidebar"
            className="layout-review-card"
            aria-labelledby="layout-full-height-sidebar-title"
          >
            <h3 id="layout-full-height-sidebar-title" className="layout-sr-only">
              Full-height Sidebar
            </h3>
            <Layout className="layout-demo" direction="horizontal">
              <Layout.Sidebar
                className="layout-demo-region layout-demo-sidebar"
                width="25%"
                surface={{
                  border: 'none',
                  background: { type: 'color', value: 'var(--vd-brand-6)' },
                }}
              >
                Sidebar
              </Layout.Sidebar>
              <Layout>
                <Layout.Header className="layout-demo-region layout-demo-header">
                  Header
                </Layout.Header>
                <Layout.Content className="layout-demo-region layout-demo-content">
                  Content
                </Layout.Content>
                <Layout.Footer className="layout-demo-region layout-demo-footer">
                  Footer
                </Layout.Footer>
              </Layout>
            </Layout>
          </section>
        </div>
      </ReviewSection>
    </>
  );
}
