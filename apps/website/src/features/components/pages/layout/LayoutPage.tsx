import './LayoutPage.scss';

import { Layout } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import { ArticleSection } from '@/components/docs/ArticleSection';
import {
  ComponentExample,
  ComponentExampleRuntimeControl,
  ComponentExampleRuntimeProvider,
} from '@/components/docs/ComponentExample';
import { ReferenceSpecimen } from '@/components/docs/ReferenceSpecimen';
import { layoutExamples } from '@/examples/components/layout/examples';

import { ComponentPageMetadata } from '../../components/ComponentPageMetadata';

function HeroLayout() {
  const { t } = useTranslation();

  return (
    <Layout className="layout-demo">
      <Layout.Header className="layout-demo-region layout-demo-header">
        {t('examples.layout.copy.header')}
      </Layout.Header>
      <Layout.Lane>
        <Layout direction="horizontal">
          <Layout.Sidebar
            className="layout-demo-region layout-demo-sidebar"
            width="25%"
            surface={{
              border: 'none',
              background: { type: 'color', value: 'var(--vd-brand-6)' },
            }}
          >
            {t('examples.layout.copy.sidebar')}
          </Layout.Sidebar>
          <Layout.Content as="div" className="layout-demo-region layout-demo-content">
            {t('examples.layout.copy.content')}
          </Layout.Content>
        </Layout>
      </Layout.Lane>
      <Layout.Footer className="layout-demo-region layout-demo-footer">
        {t('examples.layout.copy.footer')}
      </Layout.Footer>
    </Layout>
  );
}

export function LayoutPage() {
  const { t } = useTranslation();

  return (
    <ComponentExampleRuntimeProvider>
      <div className="component-page layout-system-page" id="layout-page">
        <section className="overview" id="overview" data-docs-section="overview">
          <div className="overview-copy">
            <ComponentPageMetadata />
            <h1>Layout</h1>
            <p>{t('components.layout.overview.description')}</p>
            <dl className="component-facts">
              <div>
                <dt>{t('components.layout.facts.directions')}</dt>
                <dd>2</dd>
              </div>
              <div>
                <dt>{t('components.layout.facts.structures')}</dt>
                <dd>5</dd>
              </div>
              <div>
                <dt>{t('components.layout.facts.composition')}</dt>
                <dd>{t('components.layout.facts.nested')}</dd>
              </div>
            </dl>
          </div>
          <ReferenceSpecimen>
            <ReferenceSpecimen.Toolbar>
              <span>{t('components.layout.specimen.referenceSpecimen')}</span>
              <code>header · lane · sidebar · content · footer</code>
            </ReferenceSpecimen.Toolbar>
            <ReferenceSpecimen.Stage className="layout-hero-stage">
              <div className="layout-hero-frame layout-page-card">
                <HeroLayout />
              </div>
            </ReferenceSpecimen.Stage>
            <ReferenceSpecimen.Caption>
              <span>{t('components.layout.specimen.verticalComposition')}</span>
              <span>{t('components.layout.specimen.laneOwnedBodyRegion')}</span>
              <span>{t('components.layout.specimen.semanticPageSkeleton')}</span>
              <ComponentExampleRuntimeControl />
            </ReferenceSpecimen.Caption>
          </ReferenceSpecimen>
        </section>
        <ArticleSection
          id={'layout-structures'}
          index={'01'}
          title={t('components.layout.structures.title')}
          description={t('components.layout.structures.description')}
        >
          <ComponentExample example={layoutExamples.layoutBasic} />
          <ComponentExample example={layoutExamples.layoutLeftSidebar} />
          <ComponentExample example={layoutExamples.layoutRightSidebar} />
          <ComponentExample example={layoutExamples.layoutRailSidebar} />
          <ComponentExample example={layoutExamples.layoutFullHeightSidebar} />
        </ArticleSection>
        <ArticleSection
          id={'layout-behaviors'}
          index={'02'}
          title={t('components.layout.behaviors.title')}
          description={t('components.layout.behaviors.description')}
        >
          <ComponentExample example={layoutExamples.layoutSurfaceRegions} />
          <ComponentExample example={layoutExamples.layoutResizableSidebar} />
          <ComponentExample example={layoutExamples.layoutStickyHeader} />
          <ComponentExample example={layoutExamples.layoutLane} />
        </ArticleSection>
        <section
          className="layout-examples-intro"
          id="layout-examples"
          aria-labelledby="layout-examples-title"
        >
          <span className="eyebrow">{t('examples.layout.copy.composition')}</span>
          <h2 id="layout-examples-title">{t('examples.layout.copy.typicalExamples')}</h2>
          <p>{t('components.layout.behaviors.note')}</p>
        </section>
        <ArticleSection
          id={'layout-header'}
          index={'03'}
          title={t('components.layout.header.title')}
          description={t('components.layout.header.description')}
        >
          <ComponentExample example={layoutExamples.layoutHeader} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'layout-sidebar'}
          index={'04'}
          title={t('components.layout.sidebar.title')}
          description={t('components.layout.sidebar.description')}
        >
          <ComponentExample example={layoutExamples.layoutSidebar} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'layout-controlled'}
          index={'05'}
          title={t('components.layout.controlled.title')}
          description={t('components.layout.controlled.description')}
        >
          <ComponentExample example={layoutExamples.layoutControlledSidebar} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'layout-overlay'}
          index={'06'}
          title={t('components.layout.overlay.title')}
          description={t('components.layout.overlay.description')}
        >
          <ComponentExample example={layoutExamples.layoutOverlaySidebar} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'layout-floating-sidebar'}
          index={'07'}
          title={t('components.layout.floatingSidebar.title')}
          description={t('components.layout.floatingSidebar.description')}
        >
          <ComponentExample example={layoutExamples.layoutFloatingSidebar} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'layout-floating-actions'}
          index={'08'}
          title={t('components.layout.floatingActions.title')}
          description={t('components.layout.floatingActions.description')}
        >
          <ComponentExample example={layoutExamples.layoutFloatingActions} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id="layout-grouped-sidebar"
          index="09"
          title={t('components.layout.groupedSidebar.title')}
          description={t('components.layout.groupedSidebar.description')}
        >
          <ComponentExample example={layoutExamples.layoutGroupedSidebar} />
        </ArticleSection>
      </div>
    </ComponentExampleRuntimeProvider>
  );
}
