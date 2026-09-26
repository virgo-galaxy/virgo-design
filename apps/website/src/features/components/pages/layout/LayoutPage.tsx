import './LayoutPage.scss';

import { Layout } from '@virgo-design/ui';

import { ArticleSection } from '@/components/docs/ArticleSection';
import {
  ComponentExample,
  ComponentExampleRuntimeControl,
  ComponentExampleRuntimeProvider,
} from '@/components/docs/ComponentExample';
import { layoutExamples } from '@/examples/components/layout/examples';

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

export function LayoutPage() {
  return (
    <ComponentExampleRuntimeProvider>
      <div className="review-board layout-system-review" id="layout-review">
        <section className="overview" id="overview" data-review-section="overview">
          <div className="overview-copy">
            <div className="eyebrow-row">
              <span>Component 03</span>
              <span className="version-badge">STABLE · V1.0.0</span>
            </div>
            <h1>Layout</h1>
            <p>
              Provides the page-level skeleton for semantic header, side, content, and footer
              regions through vertical, horizontal, and nested composition.
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
              <ComponentExampleRuntimeControl />
            </div>
          </div>
        </section>
        <ArticleSection
          id={'layout-structures'}
          index={'01'}
          title={'Layout structures'}
          description={'Four compositions of Header, Sidebar, Content, and Footer.'}
        >
          <ComponentExample example={layoutExamples.layoutBasic} />
          <ComponentExample example={layoutExamples.layoutLeftSidebar} />
          <ComponentExample example={layoutExamples.layoutRightSidebar} />
          <ComponentExample example={layoutExamples.layoutFullHeightSidebar} />
        </ArticleSection>
        <section
          className="layout-examples-intro"
          id="layout-examples"
          aria-labelledby="layout-examples-title"
        >
          <span className="eyebrow">COMPOSITION</span>
          <h2 id="layout-examples-title">Typical examples</h2>
          <p>Compose the structures above with navigation, surfaces, and interactive controls.</p>
        </section>
        <ArticleSection
          id={'layout-header'}
          index={'02'}
          title={'Header composition'}
          description={
            'Logo, horizontal NavigationMenu, and actions share a Header. Surface provides the background.'
          }
        >
          <ComponentExample example={layoutExamples.layoutHeader} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'layout-sidebar'}
          index={'03'}
          title={'Collapsible sidebar'}
          description={
            'Use the bottom control to switch between full navigation and an icon rail. The width control changes the expanded width.'
          }
        >
          <ComponentExample example={layoutExamples.layoutSidebar} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'layout-controlled'}
          index={'04'}
          title={'Header trigger'}
          description={
            'A controlled Sidebar lets its toggle live in the Header. Both controls share one collapsed state.'
          }
        >
          <ComponentExample example={layoutExamples.layoutControlledSidebar} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'layout-overlay'}
          index={'05'}
          title={'Overlay sidebar'}
          description={
            'A zero-width collapsed Sidebar opens over the content. The external Header control stays available.'
          }
        >
          <ComponentExample example={layoutExamples.layoutOverlaySidebar} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'layout-responsive'}
          index={'06'}
          title={'Responsive sidebar'}
          description={
            'Crossing the viewport threshold requests collapse. Returning to a wider viewport restores the previous preference.'
          }
        >
          <ComponentExample example={layoutExamples.layoutResponsiveSidebar} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'layout-sticky'}
          index={'07'}
          title={'Sticky header'}
          description={
            'Scroll inside this frame. The Header stays at the top of its scroll area and remains in document flow.'
          }
        >
          <ComponentExample example={layoutExamples.layoutStickyHeader} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'layout-floating-sidebar'}
          index={'08'}
          title={'Floating sidebar'}
          description={
            'A detached sidebar sits inside full-width Content. Collapse it into a capsule, or open Projects to explore its submenu.'
          }
        >
          <ComponentExample example={layoutExamples.layoutFloatingSidebar} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'layout-floating-actions'}
          index={'09'}
          title={'Floating actions'}
          description={
            "A standalone action and an expandable action group sit in Content's lower-right corner. Try the buttons, Escape, and outside clicks."
          }
        >
          <ComponentExample example={layoutExamples.layoutFloatingActions} showCaption={false} />
        </ArticleSection>
        <footer className="review-footer">
          <span>Virgo Design UI · Layout</span>
          <span>Structure · Surface · Independent navigation</span>
        </footer>
      </div>
    </ComponentExampleRuntimeProvider>
  );
}
