import { Statistic } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import { ArticleSection } from '@/components/docs/ArticleSection';
import {
  ComponentExample,
  ComponentExampleRuntimeControl,
  ComponentExampleRuntimeProvider,
} from '@/components/docs/ComponentExample';
import { ReferenceSpecimen } from '@/components/docs/ReferenceSpecimen';
import { statisticExamples } from '@/examples/components/statistic/examples';

import { ComponentPageMetadata } from '../../components/ComponentPageMetadata';
export function StatisticPage() {
  const { t } = useTranslation();
  return (
    <ComponentExampleRuntimeProvider>
      <div className="component-page">
        <section className="overview" id="overview" data-docs-section="overview">
          <div className="overview-copy">
            <ComponentPageMetadata />
            <h1>Statistic</h1>
            <p>{t('components.statistic.description')}</p>
          </div>
          <ReferenceSpecimen>
            <ReferenceSpecimen.Toolbar>
              <span>{t('components.statistic.specimen')}</span>
              <code>Statistic.Root</code>
            </ReferenceSpecimen.Toolbar>
            <ReferenceSpecimen.Stage>
              <Statistic
                label={t('components.statistic.label')}
                value="12,840"
                prefix="$"
                trend={
                  <Statistic.Trend direction="up" intent="positive">
                    12.8%
                  </Statistic.Trend>
                }
                description={t('components.statistic.support')}
              />
            </ReferenceSpecimen.Stage>
            <ReferenceSpecimen.Caption>
              <span>{t('components.statistic.caption')}</span>
              <ComponentExampleRuntimeControl />
            </ReferenceSpecimen.Caption>
          </ReferenceSpecimen>
        </section>
        <ArticleSection
          id="statistic-variants"
          index="01"
          title={t('components.statistic.variants')}
          description={t('components.statistic.variantDescription')}
        >
          <ComponentExample example={statisticExamples.variants} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id="statistic-animation"
          index="02"
          title={t('components.statistic.animation')}
          description={t('components.statistic.animationDescription')}
        >
          <ComponentExample example={statisticExamples.animation} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id="statistic-composition"
          index="03"
          title={t('components.statistic.composition')}
          description={t('components.statistic.compositionDescription')}
        >
          <ComponentExample example={statisticExamples.composition} showCaption={false} />
        </ArticleSection>
      </div>
    </ComponentExampleRuntimeProvider>
  );
}
