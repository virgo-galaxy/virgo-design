import './TooltipPage.scss';

import { Tooltip } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import { ArticleSection } from '@/components/docs/ArticleSection';
import {
  ComponentExample,
  ComponentExampleRuntimeControl,
  ComponentExampleRuntimeProvider,
} from '@/components/docs/ComponentExample';
import { tooltipExamples } from '@/examples/components/tooltip/examples';

import { ComponentPageMetadata } from '../../components/ComponentPageMetadata';

export function TooltipPage() {
  const { t } = useTranslation();

  return (
    <ComponentExampleRuntimeProvider>
      <div className="review-board tooltip-review" id="tooltip-review">
        <section className="overview" id="overview" data-review-section="overview">
          <div className="overview-copy">
            <ComponentPageMetadata />
            <h1>Tooltip</h1>
            <p>{t('components.tooltip.overview.description')}</p>
            <dl className="component-facts">
              <div>
                <dt>{t('components.tooltip.facts.placement')}</dt>
                <dd>{t('components.tooltip.facts.12Positions')}</dd>
              </div>
              <div>
                <dt>{t('components.tooltip.facts.trigger')}</dt>
                <dd>{t('components.tooltip.facts.hoverFocus')}</dd>
              </div>
              <div>
                <dt>{t('components.tooltip.facts.content')}</dt>
                <dd>{t('components.tooltip.facts.descriptive')}</dd>
              </div>
            </dl>
          </div>
          <div className="hero-specimen">
            <div className="specimen-toolbar">
              <span>{t('components.tooltip.specimen.referenceSpecimen')}</span>
              <code>{t('components.tooltip.specimen.summary')}</code>
            </div>
            <div className="hero-stage tooltip-hero-stage">
              <Tooltip>
                <Tooltip.Trigger>{t('examples.tooltip.copy.hoverOrFocusMe')}</Tooltip.Trigger>
                <Tooltip.Content>
                  {t('examples.tooltip.copy.smallDetailsRightWhereYouNeedThem')}
                </Tooltip.Content>
              </Tooltip>
            </div>
            <div className="specimen-caption">
              <span>{t('components.tooltip.specimen.nativeActions')}</span>
              <span>{t('components.tooltip.specimen.keyboardReady')}</span>
              <span>{t('components.tooltip.specimen.themeAware')}</span>
              <ComponentExampleRuntimeControl />
            </div>
          </div>
        </section>
        <ArticleSection
          id={'tooltip-basic'}
          index={'01'}
          title={t('components.tooltip.basic.title')}
          description={t('components.tooltip.basic.description')}
        >
          <ComponentExample example={tooltipExamples.tooltipBasic} />
          <ComponentExample example={tooltipExamples.tooltipInstant} />
          <ComponentExample example={tooltipExamples.tooltipDisabled} />
        </ArticleSection>
        <ArticleSection
          id={'tooltip-smooth-transition'}
          index={'02'}
          title={t('components.tooltip.smoothTransition.title')}
          description={t('components.tooltip.smoothTransition.description')}
        >
          <ComponentExample example={tooltipExamples.tooltipSmooth} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'tooltip-placement'}
          index={'03'}
          title={t('components.tooltip.placement.title')}
          description={t('components.tooltip.placement.description')}
        >
          <ComponentExample example={tooltipExamples.tooltipPlacement} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'tooltip-tone'}
          index={'04'}
          title={t('components.tooltip.tone.title')}
          description={t('components.tooltip.tone.description')}
        >
          <ComponentExample example={tooltipExamples.tooltipTones} />
          <ComponentExample example={tooltipExamples.tooltipCustomColor} />
        </ArticleSection>
        <ArticleSection
          id={'tooltip-actions'}
          index={'05'}
          title={t('components.tooltip.actions.title')}
          description={t('components.tooltip.actions.description')}
        >
          <ComponentExample example={tooltipExamples.tooltipAction} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'tooltip-dynamic'}
          index={'06'}
          title={t('components.tooltip.dynamic.title')}
          description={t('components.tooltip.dynamic.description')}
        >
          <ComponentExample example={tooltipExamples.tooltipDynamic} />
          <ComponentExample example={tooltipExamples.tooltipDirection} />
        </ArticleSection>
        <ArticleSection
          id={'tooltip-sizes'}
          index={'07'}
          title={t('components.tooltip.sizes.title')}
          description={t('components.tooltip.sizes.description')}
        >
          <ComponentExample example={tooltipExamples.tooltipSizes} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'tooltip-activation'}
          index={'08'}
          title={t('components.tooltip.activation.title')}
          description={t('components.tooltip.activation.description')}
        >
          <ComponentExample example={tooltipExamples.tooltipActivation} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id="tooltip-cursor"
          index="09"
          title={t('components.tooltip.cursor.title')}
          description={t('components.tooltip.cursor.description')}
        >
          <ComponentExample example={tooltipExamples.tooltipCursor} />
        </ArticleSection>
      </div>
    </ComponentExampleRuntimeProvider>
  );
}
