import { Layout, LayoutContent, LayoutFooter, LayoutHeader, LayoutSider } from '@virgo-design/ui';

import { ReviewSection } from '../../components/ReviewSection';

function BasicLayout() {
  return (
    <Layout className="layout-demo">
      <LayoutHeader className="layout-demo-region layout-demo-header">Header</LayoutHeader>
      <LayoutContent className="layout-demo-region layout-demo-content">Content</LayoutContent>
      <LayoutFooter className="layout-demo-region layout-demo-footer">Footer</LayoutFooter>
    </Layout>
  );
}

export function LayoutPage() {
  return (
    <div className="review-board" id="layout-review">
      <section className="overview" id="overview" data-review-section="overview">
        <div className="overview-copy">
          <div className="eyebrow-row">
            <span>Component 02</span>
            <span className="version-badge">Stable · V1</span>
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

        <div className="hero-specimen layout-hero-specimen">
          <div className="specimen-toolbar">
            <span>Reference specimen</span>
            <code>vertical · semantic</code>
          </div>
          <div className="hero-stage layout-hero-stage">
            <div className="layout-hero-canvas">
              <BasicLayout />
            </div>
          </div>
          <div className="specimen-caption">
            <span>Page skeleton</span>
            <span>Flexible content</span>
            <span>Native regions</span>
          </div>
        </div>
      </section>

      <ReviewSection
        id="layout-basic"
        index="01"
        title="Basic"
        description="The default vertical direction stacks Header, Content, and Footer in document order."
      >
        <div className="layout-review-card">
          <BasicLayout />
        </div>
      </ReviewSection>

      <ReviewSection
        id="layout-left-sider"
        index="02"
        title="Left Sider"
        description="A horizontal nested Layout places Sider before the flexible Content region."
      >
        <div className="layout-review-card">
          <Layout className="layout-demo">
            <LayoutHeader className="layout-demo-region layout-demo-header">Header</LayoutHeader>
            <Layout direction="horizontal">
              <LayoutSider className="layout-demo-region layout-demo-sider" width={136}>
                Sider
              </LayoutSider>
              <LayoutContent className="layout-demo-region layout-demo-content">
                Content
              </LayoutContent>
            </Layout>
            <LayoutFooter className="layout-demo-region layout-demo-footer">Footer</LayoutFooter>
          </Layout>
        </div>
      </ReviewSection>

      <ReviewSection
        id="layout-right-sider"
        index="03"
        title="Right Sider"
        description="Reversing the child order moves Sider to the right without a position variant."
      >
        <div className="layout-review-card">
          <Layout className="layout-demo">
            <LayoutHeader className="layout-demo-region layout-demo-header">Header</LayoutHeader>
            <Layout direction="horizontal">
              <LayoutContent className="layout-demo-region layout-demo-content">
                Content
              </LayoutContent>
              <LayoutSider className="layout-demo-region layout-demo-sider" width={136}>
                Sider
              </LayoutSider>
            </Layout>
            <LayoutFooter className="layout-demo-region layout-demo-footer">Footer</LayoutFooter>
          </Layout>
        </div>
      </ReviewSection>

      <ReviewSection
        id="layout-full-height-sider"
        index="04"
        title="Full-height Sider"
        description="An outer horizontal Layout keeps Sider full-height beside a nested vertical page skeleton."
      >
        <div className="layout-review-card">
          <Layout className="layout-demo" direction="horizontal">
            <LayoutSider className="layout-demo-region layout-demo-sider" width={136}>
              Sider
            </LayoutSider>
            <Layout>
              <LayoutHeader className="layout-demo-region layout-demo-header">Header</LayoutHeader>
              <LayoutContent className="layout-demo-region layout-demo-content">
                Content
              </LayoutContent>
              <LayoutFooter className="layout-demo-region layout-demo-footer">Footer</LayoutFooter>
            </Layout>
          </Layout>
        </div>
      </ReviewSection>

      <footer className="review-footer">
        <span>Virgo Design UI · Layout V1</span>
        <span>Primitive · Tokens · Metadata · Semantics · Composition</span>
      </footer>
    </div>
  );
}
