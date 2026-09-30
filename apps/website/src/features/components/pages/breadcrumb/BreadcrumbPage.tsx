import { Breadcrumb } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import { ArticleSection } from '@/components/docs/ArticleSection';
import {
  ComponentExample,
  ComponentExampleRuntimeControl,
  ComponentExampleRuntimeProvider,
} from '@/components/docs/ComponentExample';
import { breadcrumbExamples } from '@/examples/components/breadcrumb/examples';

import { ComponentPageMetadata } from '../../components/ComponentPageMetadata';

function BasicBreadcrumb() {
  const { t } = useTranslation();

  return (
    <Breadcrumb>
      <Breadcrumb.Item href="#home">{t('examples.breadcrumb.copy.home')}</Breadcrumb.Item>
      <Breadcrumb.Item href="#application-center">
        {t('examples.breadcrumb.copy.applicationCenter')}
      </Breadcrumb.Item>
      <Breadcrumb.Item href="#application-list">
        {t('examples.breadcrumb.copy.applicationList')}
      </Breadcrumb.Item>
      <Breadcrumb.Item>{t('examples.breadcrumb.copy.anApplication')}</Breadcrumb.Item>
    </Breadcrumb>
  );
}

export function BreadcrumbPage() {
  const { t } = useTranslation();

  return (
    <ComponentExampleRuntimeProvider>
      <div className="review-board" id="breadcrumb-review">
        <section className="overview" id="overview" data-review-section="overview">
          <div className="overview-copy">
            <ComponentPageMetadata />
            <h1>Breadcrumb</h1>
            <p>{t('components.breadcrumb.overview.description')}</p>
            <dl className="component-facts">
              <div>
                <dt>{t('components.breadcrumb.facts.items')}</dt>
                <dd>ReactNode</dd>
              </div>
              <div>
                <dt>{t('components.breadcrumb.facts.separator')}</dt>
                <dd>{t('components.breadcrumb.facts.custom')}</dd>
              </div>
              <div>
                <dt>{t('components.breadcrumb.facts.semantics')}</dt>
                <dd>{t('components.breadcrumb.facts.native')}</dd>
              </div>
            </dl>
          </div>
          <div className="hero-specimen breadcrumb-hero-specimen">
            <div className="specimen-toolbar">
              <span>{t('components.breadcrumb.specimen.referenceSpecimen')}</span>
              <code>basic · slash</code>
            </div>
            <div className="hero-stage breadcrumb-hero-stage">
              <BasicBreadcrumb />
            </div>
            <div className="specimen-caption">
              <span>{t('components.breadcrumb.specimen.nativeLinks')}</span>
              <span>{t('components.breadcrumb.specimen.orderedPath')}</span>
              <span>{t('components.breadcrumb.specimen.currentPage')}</span>
              <ComponentExampleRuntimeControl />
            </div>
          </div>
        </section>
        <ArticleSection
          id={'breadcrumb-basic'}
          index={'01'}
          title={t('components.breadcrumb.basic.title')}
          description={t('components.breadcrumb.basic.description')}
        >
          <ComponentExample example={breadcrumbExamples.breadcrumbBasic} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'breadcrumb-icons'}
          index={'02'}
          title={t('components.breadcrumb.icons.title')}
          description={t('components.breadcrumb.icons.description')}
        >
          <ComponentExample example={breadcrumbExamples.breadcrumbIcons} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'breadcrumb-separator'}
          index={'03'}
          title={t('components.breadcrumb.separator.title')}
          description={t('components.breadcrumb.separator.description')}
        >
          <ComponentExample example={breadcrumbExamples.breadcrumbSeparator} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'breadcrumb-dynamic-value'}
          index={'04'}
          title={t('components.breadcrumb.dynamicValue.title')}
          description={t('components.breadcrumb.dynamicValue.description')}
        >
          <ComponentExample example={breadcrumbExamples.breadcrumbDynamic} showCaption={false} />
        </ArticleSection>
      </div>
    </ComponentExampleRuntimeProvider>
  );
}
