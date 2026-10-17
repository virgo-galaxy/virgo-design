import { useTranslation } from 'react-i18next';

import { ArticleSection } from '@/components/docs/ArticleSection';
import {
  ComponentExample,
  ComponentExampleRuntimeControl,
  ComponentExampleRuntimeProvider,
} from '@/components/docs/ComponentExample';
import { ReferenceSpecimen } from '@/components/docs/ReferenceSpecimen';
import { collapsibleExamples } from '@/examples/components/collapsible/examples';

import { ComponentPageMetadata } from '../../components/ComponentPageMetadata';

export function CollapsiblePage() {
  const { t } = useTranslation();
  const Reference = collapsibleExamples.example0.Component;

  return (
    <ComponentExampleRuntimeProvider>
      <div className="component-page">
        <section className="overview" id="overview" data-docs-section="overview">
          <div className="overview-copy">
            <ComponentPageMetadata />
            <h1>Collapsible</h1>
            <p>{t('components.collapsible.overview.description')}</p>
          </div>
          <ReferenceSpecimen>
            <ReferenceSpecimen.Toolbar>
              <span>{t('components.collapsible.specimen.referenceSpecimen')}</span>
              <code>Collapsible</code>
            </ReferenceSpecimen.Toolbar>
            <ReferenceSpecimen.Stage>
              <div className="hero-content">
                <Reference />
              </div>
            </ReferenceSpecimen.Stage>
            <ReferenceSpecimen.Caption>
              <span>{t('components.collapsible.specimen.contract')}</span>
              <ComponentExampleRuntimeControl />
            </ReferenceSpecimen.Caption>
          </ReferenceSpecimen>
        </section>
        <ArticleSection
          id="collapsible-1"
          index="01"
          title={t('examples.collapsible.copy.title0')}
          description={t('examples.collapsible.copy.description0')}
        >
          <ComponentExample example={collapsibleExamples.example0} showCaption={false} />
        </ArticleSection>
      </div>
    </ComponentExampleRuntimeProvider>
  );
}
