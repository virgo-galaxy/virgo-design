import { Breadcrumb } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import { ArticleSection } from '@/components/docs/ArticleSection';
import {
  ComponentExample,
  ComponentExampleRuntimeControl,
  ComponentExampleRuntimeProvider,
} from '@/components/docs/ComponentExample';
import { ReferenceSpecimen } from '@/components/docs/ReferenceSpecimen';
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
      <div className="component-page" id="breadcrumb-page">
        <section className="overview" id="overview" data-docs-section="overview">
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
          <ReferenceSpecimen className="breadcrumb-hero-specimen">
            <ReferenceSpecimen.Toolbar>
              <span>{t('components.breadcrumb.specimen.referenceSpecimen')}</span>
              <code>basic · slash</code>
            </ReferenceSpecimen.Toolbar>
            <ReferenceSpecimen.Stage className="breadcrumb-hero-stage">
              <BasicBreadcrumb />
            </ReferenceSpecimen.Stage>
            <ReferenceSpecimen.Caption>
              <span>{t('components.breadcrumb.specimen.nativeLinks')}</span>
              <span>{t('components.breadcrumb.specimen.orderedPath')}</span>
              <span>{t('components.breadcrumb.specimen.currentPage')}</span>
              <ComponentExampleRuntimeControl />
            </ReferenceSpecimen.Caption>
          </ReferenceSpecimen>
        </section>
        <ArticleSection
          id="breadcrumb-basic"
          index="01"
          title={t('components.breadcrumb.basic.title')}
          description={t('components.breadcrumb.basic.description')}
        >
          <ComponentExample example={breadcrumbExamples.breadcrumbBasic} showCaption={false} />
        </ArticleSection>

        <ArticleSection
          id="breadcrumb-icons"
          index="02"
          title={t('components.breadcrumb.icons.title')}
          description={t('components.breadcrumb.icons.description')}
        >
          <ComponentExample example={breadcrumbExamples.breadcrumbIcons} showCaption={false} />
        </ArticleSection>

        <ArticleSection
          id="breadcrumb-separator"
          index="03"
          title={t('components.breadcrumb.separator.title')}
          description={t('components.breadcrumb.separator.description')}
        >
          <ComponentExample example={breadcrumbExamples.breadcrumbSeparator} showCaption={false} />
        </ArticleSection>

        <ArticleSection
          id="breadcrumb-dynamic-value"
          index="04"
          title={t('components.breadcrumb.dynamicValue.title')}
          description={t('components.breadcrumb.dynamicValue.description')}
        >
          <ComponentExample example={breadcrumbExamples.breadcrumbDynamic} showCaption={false} />
        </ArticleSection>
      </div>
    </ComponentExampleRuntimeProvider>
  );
}
