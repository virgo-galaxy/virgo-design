import './ProgressPage.scss';

import { Progress } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import { ArticleSection } from '@/components/docs/ArticleSection';
import {
  ComponentExample,
  ComponentExampleRuntimeControl,
  ComponentExampleRuntimeProvider,
} from '@/components/docs/ComponentExample';
import { ReferenceSpecimen } from '@/components/docs/ReferenceSpecimen';
import { progressExamples } from '@/examples/components/progress/examples';

import { ComponentPageMetadata } from '../../components/ComponentPageMetadata';

export function ProgressPage() {
  const { t } = useTranslation();

  return (
    <ComponentExampleRuntimeProvider>
      <div className="component-page progress-page">
        <section className="overview" id="overview" data-docs-section="overview">
          <div className="overview-copy">
            <ComponentPageMetadata />
            <h1>Progress</h1>
            <p>{t('components.progress.overview.description')}</p>
            <dl className="component-facts">
              <div>
                <dt>{t('components.progress.facts.state')}</dt>
                <dd>{t('components.progress.facts.determinate')}</dd>
              </div>
              <div>
                <dt>{t('components.progress.facts.sizes')}</dt>
                <dd>03</dd>
              </div>
              <div>
                <dt>{t('components.progress.facts.intents')}</dt>
                <dd>04</dd>
              </div>
            </dl>
          </div>
          <ReferenceSpecimen>
            <ReferenceSpecimen.Toolbar>
              <span>{t('components.progress.specimen.referenceSpecimen')}</span>
              <code>value · label · showValue</code>
            </ReferenceSpecimen.Toolbar>
            <ReferenceSpecimen.Stage>
              <div className="progress-stack">
                <Progress
                  value={72}
                  label={t('examples.progress.copy.deployingDesignTokens')}
                  showValue
                />
                <Progress
                  value={3}
                  max={4}
                  intent="success"
                  label={t('examples.progress.copy.threeOfFourChecks')}
                  showValue
                />
              </div>
            </ReferenceSpecimen.Stage>
            <ReferenceSpecimen.Caption>
              <span>{t('components.progress.specimen.clampedValues')}</span>
              <span>{t('components.progress.specimen.visibleStatus')}</span>
              <span>{t('components.progress.specimen.semanticIntent')}</span>
              <ComponentExampleRuntimeControl />
            </ReferenceSpecimen.Caption>
          </ReferenceSpecimen>
        </section>

        <ArticleSection
          id="progress-values"
          index="01"
          title={t('components.progress.values.title')}
          description={t('components.progress.values.description')}
        >
          <ComponentExample example={progressExamples.progressValues} showCaption={false} />
        </ArticleSection>

        <ArticleSection
          id="progress-sizes"
          index="02"
          title={t('components.progress.sizes.title')}
          description={t('components.progress.sizes.description')}
        >
          <ComponentExample example={progressExamples.progressSizes} showCaption={false} />
        </ArticleSection>

        <ArticleSection
          id="progress-intents"
          index="03"
          title={t('components.progress.intents.title')}
          description={t('components.progress.intents.description')}
        >
          <ComponentExample example={progressExamples.progressIntents} showCaption={false} />
        </ArticleSection>
      </div>
    </ComponentExampleRuntimeProvider>
  );
}
