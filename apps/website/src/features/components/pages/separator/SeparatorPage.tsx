import './SeparatorPage.scss';

import { Separator } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import { ArticleSection } from '@/components/docs/ArticleSection';
import {
  ComponentExample,
  ComponentExampleRuntimeControl,
  ComponentExampleRuntimeProvider,
} from '@/components/docs/ComponentExample';
import { ReferenceSpecimen } from '@/components/docs/ReferenceSpecimen';
import { separatorExamples } from '@/examples/components/separator/examples';

import { ComponentPageMetadata } from '../../components/ComponentPageMetadata';

export function SeparatorPage() {
  const { t } = useTranslation();

  return (
    <ComponentExampleRuntimeProvider>
      <div className="component-page separator-page">
        <section className="overview" id="overview" data-docs-section="overview">
          <div className="overview-copy">
            <ComponentPageMetadata />
            <h1>Separator</h1>
            <p>{t('components.separator.overview.description')}</p>
            <dl className="component-facts">
              <div>
                <dt>{t('components.separator.facts.orientations')}</dt>
                <dd>02</dd>
              </div>
              <div>
                <dt>{t('components.separator.facts.semantics')}</dt>
                <dd>{t('examples.separator.copy.aria')}</dd>
              </div>
              <div>
                <dt>{t('components.separator.facts.decorative')}</dt>
                <dd>{t('components.separator.facts.optional')}</dd>
              </div>
            </dl>
          </div>
          <ReferenceSpecimen>
            <ReferenceSpecimen.Toolbar>
              <span>{t('components.separator.specimen.referenceSpecimen')}</span>
              <code>horizontal · semantic</code>
            </ReferenceSpecimen.Toolbar>
            <ReferenceSpecimen.Stage>
              <div className="separator-stack">
                <span>{t('examples.separator.copy.accountDetails')}</span>
                <Separator />
                <span>{t('examples.separator.copy.billing')}</span>
              </div>
            </ReferenceSpecimen.Stage>
            <ReferenceSpecimen.Caption>
              <span>{t('components.separator.specimen.ruleBasedRhythm')}</span>
              <span>{t('components.separator.specimen.horizontalByDefault')}</span>
              <span>{t('components.separator.specimen.decorativeOrSemantic')}</span>
              <ComponentExampleRuntimeControl />
            </ReferenceSpecimen.Caption>
          </ReferenceSpecimen>
        </section>

        <ArticleSection
          id="separator-horizontal"
          index="01"
          title={t('components.separator.horizontal.title')}
          description={t('components.separator.horizontal.description')}
        >
          <ComponentExample example={separatorExamples.separatorHorizontal} showCaption={false} />
        </ArticleSection>

        <ArticleSection
          id="separator-label"
          index="02"
          title={t('components.separator.label.title')}
          description={t('components.separator.label.description')}
        >
          <ComponentExample example={separatorExamples.separatorLabel} showCaption={false} />
        </ArticleSection>

        <ArticleSection
          id="separator-vertical"
          index="03"
          title={t('components.separator.vertical.title')}
          description={t('components.separator.vertical.description')}
        >
          <ComponentExample example={separatorExamples.separatorVertical} showCaption={false} />
        </ArticleSection>

        <ArticleSection
          id="separator-decorative"
          index="04"
          title={t('components.separator.decorative.title')}
          description={t('components.separator.decorative.description')}
        >
          <ComponentExample example={separatorExamples.separatorDecorative} showCaption={false} />
        </ArticleSection>
      </div>
    </ComponentExampleRuntimeProvider>
  );
}
