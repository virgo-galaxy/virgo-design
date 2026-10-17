import './SpinnerPage.scss';

import { Button, Spinner } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import { ArticleSection } from '@/components/docs/ArticleSection';
import {
  ComponentExample,
  ComponentExampleRuntimeControl,
  ComponentExampleRuntimeProvider,
} from '@/components/docs/ComponentExample';
import { ReferenceSpecimen } from '@/components/docs/ReferenceSpecimen';
import { spinnerExamples } from '@/examples/components/spinner/examples';

import { ComponentPageMetadata } from '../../components/ComponentPageMetadata';

export function SpinnerPage() {
  const { t } = useTranslation();

  return (
    <ComponentExampleRuntimeProvider>
      <div className="component-page spinner-page">
        <section className="overview" id="overview" data-docs-section="overview">
          <div className="overview-copy">
            <ComponentPageMetadata />
            <h1>Spinner</h1>
            <p>{t('components.spinner.overview.description')}</p>
            <dl className="component-facts">
              <div>
                <dt>{t('components.spinner.facts.state')}</dt>
                <dd>{t('components.spinner.facts.indeterminate')}</dd>
              </div>
              <div>
                <dt>{t('components.spinner.facts.sizes')}</dt>
                <dd>03</dd>
              </div>
              <div>
                <dt>{t('components.spinner.facts.intent')}</dt>
                <dd>{t('components.spinner.facts.brandAware')}</dd>
              </div>
            </dl>
          </div>
          <ReferenceSpecimen>
            <ReferenceSpecimen.Toolbar>
              <span>{t('components.spinner.specimen.referenceSpecimen')}</span>
              <code>inline · button · currentColor</code>
            </ReferenceSpecimen.Toolbar>
            <ReferenceSpecimen.Stage>
              <div className="spinner-stage">
                <span className="spinner-inline">
                  <Spinner size="sm" /> {t('examples.spinner.copy.syncingChanges')}
                </span>
                <Button leadingIcon={<Spinner size="sm" />}>
                  {t('examples.spinner.copy.saving')}
                </Button>
                <Spinner
                  size="lg"
                  intent="brand"
                  aria-label={t('examples.spinner.copy.loadingAccountData')}
                />
              </div>
            </ReferenceSpecimen.Stage>
            <ReferenceSpecimen.Caption>
              <span>{t('components.spinner.specimen.inlineFeedback')}</span>
              <span>{t('components.spinner.specimen.composable')}</span>
              <span>{t('components.spinner.specimen.themeAwareColor')}</span>
              <ComponentExampleRuntimeControl />
            </ReferenceSpecimen.Caption>
          </ReferenceSpecimen>
        </section>

        <ArticleSection
          id="spinner-sizes"
          index="01"
          title={t('components.spinner.sizes.title')}
          description={t('components.spinner.sizes.description')}
        >
          <ComponentExample example={spinnerExamples.spinnerSizes} showCaption={false} />
        </ArticleSection>

        <ArticleSection
          id="spinner-composition"
          index="02"
          title={t('components.spinner.composition.title')}
          description={t('components.spinner.composition.description')}
        >
          <ComponentExample example={spinnerExamples.spinnerInline} />
          <ComponentExample example={spinnerExamples.spinnerButton} />
        </ArticleSection>

        <ArticleSection
          id="spinner-environments"
          index="03"
          title={t('components.spinner.environments.title')}
          description={t('components.spinner.environments.description')}
        >
          <ComponentExample example={spinnerExamples.spinnerThemes} showCaption={false} />
        </ArticleSection>
      </div>
    </ComponentExampleRuntimeProvider>
  );
}
