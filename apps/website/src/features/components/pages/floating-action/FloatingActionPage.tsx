import { CircleInfoIcon } from '@virgo-design/icons';
import { FloatingAction } from '@virgo-design/ui';
import { floatingActionMetadata } from '@virgo-design/ui/metadata';
import { useTranslation } from 'react-i18next';

import { ArticleSection } from '@/components/docs/ArticleSection';
import {
  ComponentExample,
  ComponentExampleRuntimeControl,
  ComponentExampleRuntimeProvider,
} from '@/components/docs/ComponentExample';
import { floatingActionExamples } from '@/examples/components/floating-action/examples';

import { ComponentPageMetadata } from '../../components/ComponentPageMetadata';

export function FloatingActionPage() {
  const { t } = useTranslation();

  return (
    <ComponentExampleRuntimeProvider>
      <div className="review-board floating-action-review" id="floating-action-review">
        <section className="overview" id="overview" data-review-section="overview">
          <div className="overview-copy">
            <ComponentPageMetadata />
            <h1>{floatingActionMetadata.name}</h1>
            <p>{t('components.floatingAction.overview.description')}</p>
            <dl className="component-facts">
              <div>
                <dt>{t('components.floatingAction.facts.parts')}</dt>
                <dd>{String(floatingActionMetadata.anatomy.length).padStart(2, '0')}</dd>
              </div>
              <div>
                <dt>{t('components.floatingAction.facts.states')}</dt>
                <dd>{String(floatingActionMetadata.states.length).padStart(2, '0')}</dd>
              </div>
              <div>
                <dt>{t('components.floatingAction.facts.patterns')}</dt>
                <dd>{String(Object.keys(floatingActionExamples).length).padStart(2, '0')}</dd>
              </div>
            </dl>
          </div>
          <div className="hero-specimen">
            <div className="specimen-toolbar">
              <span>{t('components.floatingAction.specimen.referenceSpecimen')}</span>
              <code>standalone · primary</code>
            </div>
            <div className="hero-stage">
              <FloatingAction variant="primary" aria-label={t('examples.floatingAction.copy.help')}>
                <CircleInfoIcon />
              </FloatingAction>
            </div>
            <div className="specimen-caption">
              <span>{t('components.floatingAction.specimen.buttonSemantics')}</span>
              <span>{t('components.floatingAction.specimen.circularShape')}</span>
              <span>{t('components.floatingAction.specimen.tokenElevation')}</span>
              <ComponentExampleRuntimeControl />
            </div>
          </div>
        </section>
        <ArticleSection
          id={'floating-action-basic'}
          index={'01'}
          title={t('components.floatingAction.basic.title')}
          description={t('components.floatingAction.basic.description')}
        >
          <ComponentExample example={floatingActionExamples.floatingActionVariants} />
          <ComponentExample example={floatingActionExamples.floatingActionDisabled} />
        </ArticleSection>
        <ArticleSection
          id={'floating-action-group'}
          index={'02'}
          title={t('components.floatingAction.group.title')}
          description={t('components.floatingAction.group.description')}
        >
          <ComponentExample
            example={floatingActionExamples.floatingActionGroup}
            showCaption={false}
          />
        </ArticleSection>
        <ArticleSection
          id={'floating-action-placement'}
          index={'03'}
          title={t('components.floatingAction.placement.title')}
          description={t('components.floatingAction.placement.description')}
        >
          <ComponentExample
            example={floatingActionExamples.floatingActionPlacement}
            showCaption={false}
          />
        </ArticleSection>
      </div>
    </ComponentExampleRuntimeProvider>
  );
}
