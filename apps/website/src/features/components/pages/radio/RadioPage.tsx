import { Radio } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import { ArticleSection } from '@/components/docs/ArticleSection';
import {
  ComponentExample,
  ComponentExampleRuntimeControl,
  ComponentExampleRuntimeProvider,
} from '@/components/docs/ComponentExample';
import { radioExamples } from '@/examples/components/radio/examples';

import { ComponentPageMetadata } from '../../components/ComponentPageMetadata';

export function RadioPage() {
  const { t } = useTranslation();

  return (
    <ComponentExampleRuntimeProvider>
      <div className="review-board" id="radio-review">
        <section className="overview" id="overview" data-review-section="overview">
          <div className="overview-copy">
            <ComponentPageMetadata />
            <h1>Radio</h1>
            <p>{t('components.radio.overview.description')}</p>
            <dl className="component-facts">
              <div>
                <dt>{t('components.radio.facts.orientation')}</dt>
                <dd>02</dd>
              </div>
              <div>
                <dt>{t('components.radio.facts.states')}</dt>
                <dd>03</dd>
              </div>
              <div>
                <dt>{t('components.radio.facts.selection')}</dt>
                <dd>{t('components.radio.facts.single')}</dd>
              </div>
            </dl>
          </div>
          <div className="hero-specimen">
            <div className="specimen-toolbar">
              <span>{t('components.radio.specimen.referenceSpecimen')}</span>
              <code>horizontal · standard</code>
            </div>
            <div className="hero-stage">
              <Radio.Group defaultValue="pear" aria-label={t('examples.radio.copy.fruit')}>
                <Radio value="apple">{t('examples.radio.copy.apple')}</Radio>
                <Radio value="pear">{t('examples.radio.copy.pear')}</Radio>
                <Radio value="orange">{t('examples.radio.copy.orange')}</Radio>
              </Radio.Group>
            </div>
            <div className="specimen-caption">
              <span>{t('components.radio.specimen.16pxControl')}</span>
              <span>{t('examples.radio.copy.bodyMedium')}</span>
              <span>{t('components.radio.specimen.singleSelection')}</span>
              <ComponentExampleRuntimeControl />
            </div>
          </div>
        </section>
        <ArticleSection
          id={'radio-basic'}
          index={'01'}
          title={t('components.radio.basic.title')}
          description={t('components.radio.basic.description')}
        >
          <ComponentExample example={radioExamples.radioBasic} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'radio-orientation'}
          index={'02'}
          title={t('components.radio.orientation.title')}
          description={t('components.radio.orientation.description')}
        >
          <ComponentExample example={radioExamples.radioHorizontal} />
          <ComponentExample example={radioExamples.radioVertical} />
        </ArticleSection>
        <ArticleSection
          id={'radio-disabled'}
          index={'03'}
          title={t('components.radio.disabled.title')}
          description={t('components.radio.disabled.description')}
        >
          <ComponentExample example={radioExamples.radioDisabled} showCaption={false} />
        </ArticleSection>
      </div>
    </ComponentExampleRuntimeProvider>
  );
}
