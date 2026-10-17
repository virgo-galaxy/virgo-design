import { Button, Result } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import { ArticleSection } from '@/components/docs/ArticleSection';
import {
  ComponentExample,
  ComponentExampleRuntimeControl,
  ComponentExampleRuntimeProvider,
} from '@/components/docs/ComponentExample';
import { ReferenceSpecimen } from '@/components/docs/ReferenceSpecimen';
import { resultExamples } from '@/examples/components/result/examples';

import { ComponentPageMetadata } from '../../components/ComponentPageMetadata';
export function ResultPage() {
  const { t } = useTranslation();
  return (
    <ComponentExampleRuntimeProvider>
      <div className="component-page">
        <section className="overview" id="overview" data-docs-section="overview">
          <div className="overview-copy">
            <ComponentPageMetadata />
            <h1>Result</h1>
            <p>{t('components.result.description')}</p>
          </div>
          <ReferenceSpecimen>
            <ReferenceSpecimen.Toolbar>
              <span>{t('components.result.specimen')}</span>
              <code>Result.Root</code>
            </ReferenceSpecimen.Toolbar>
            <ReferenceSpecimen.Stage>
              <Result
                status="success"
                title={t('components.result.title')}
                description={t('components.result.support')}
                primaryAction={<Button>{t('components.result.primary')}</Button>}
              />
            </ReferenceSpecimen.Stage>
            <ReferenceSpecimen.Caption>
              <span>{t('components.result.caption')}</span>
              <ComponentExampleRuntimeControl />
            </ReferenceSpecimen.Caption>
          </ReferenceSpecimen>
        </section>

        <ArticleSection
          id="result-variants"
          index="01"
          title={t('components.result.variants')}
          description={t('components.result.variantDescription')}
        >
          <ComponentExample example={resultExamples.variants} showCaption={false} />
        </ArticleSection>

        <ArticleSection
          id="result-composition"
          index="02"
          title={t('components.result.composition')}
          description={t('components.result.compositionDescription')}
        >
          <ComponentExample example={resultExamples.composition} showCaption={false} />
        </ArticleSection>
      </div>
    </ComponentExampleRuntimeProvider>
  );
}
