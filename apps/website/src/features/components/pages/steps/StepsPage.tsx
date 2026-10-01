import { useTranslation } from 'react-i18next';

import { ArticleSection } from '@/components/docs/ArticleSection';
import {
  ComponentExample,
  ComponentExampleRuntimeControl,
  ComponentExampleRuntimeProvider,
} from '@/components/docs/ComponentExample';
import { ReferenceSpecimen } from '@/components/docs/ReferenceSpecimen';
import { stepsExamples } from '@/examples/components/steps/examples';

import { ComponentPageMetadata } from '../../components/ComponentPageMetadata';

export function StepsPage() {
  const { t } = useTranslation();
  const Reference = stepsExamples.example0.Component;
  return (
    <ComponentExampleRuntimeProvider>
      <div className="component-page">
        <section className="overview" id="overview" data-docs-section="overview">
          <div className="overview-copy">
            <ComponentPageMetadata />
            <h1>Steps</h1>
            <p>{t('components.steps.overview.description')}</p>
          </div>
          <ReferenceSpecimen>
            <ReferenceSpecimen.Toolbar>
              <span>{t('components.steps.specimen.referenceSpecimen')}</span>
              <code>Steps</code>
            </ReferenceSpecimen.Toolbar>
            <ReferenceSpecimen.Stage>
              <div className="hero-content">
                <Reference />
              </div>
            </ReferenceSpecimen.Stage>
            <ReferenceSpecimen.Caption>
              <span>{t('components.steps.specimen.contract')}</span>
              <ComponentExampleRuntimeControl />
            </ReferenceSpecimen.Caption>
          </ReferenceSpecimen>
        </section>
        <ArticleSection
          id="steps-1"
          index="01"
          title={t('examples.steps.copy.title0')}
          description={t('examples.steps.copy.description0')}
        >
          <ComponentExample example={stepsExamples.example0} showCaption={false} />
        </ArticleSection>
      </div>
    </ComponentExampleRuntimeProvider>
  );
}
