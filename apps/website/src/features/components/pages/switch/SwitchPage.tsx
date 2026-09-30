import { Switch } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import { ArticleSection } from '@/components/docs/ArticleSection';
import {
  ComponentExample,
  ComponentExampleRuntimeControl,
  ComponentExampleRuntimeProvider,
} from '@/components/docs/ComponentExample';
import { switchExamples } from '@/examples/components/switch/examples';

import { ComponentPageMetadata } from '../../components/ComponentPageMetadata';

export function SwitchPage() {
  const { t } = useTranslation();

  return (
    <ComponentExampleRuntimeProvider>
      <div className="review-board" id="switch-review">
        <section className="overview" id="overview" data-review-section="overview">
          <div className="overview-copy">
            <ComponentPageMetadata />
            <h1>Switch</h1>
            <p>{t('components.switch.overview.description')}</p>
            <dl className="component-facts">
              <div>
                <dt>{t('components.switch.facts.appearances')}</dt>
                <dd>02</dd>
              </div>
              <div>
                <dt>{t('components.switch.facts.sizes')}</dt>
                <dd>02</dd>
              </div>
              <div>
                <dt>{t('components.switch.facts.states')}</dt>
                <dd>03</dd>
              </div>
            </dl>
          </div>
          <div className="hero-specimen">
            <div className="specimen-toolbar">
              <span>{t('components.switch.specimen.referenceSpecimen')}</span>
              <code>toggle · default</code>
            </div>
            <div className="hero-stage">
              <Switch defaultChecked>{t('examples.switch.copy.syncChanges')}</Switch>
            </div>
            <div className="specimen-caption">
              <span>{t('examples.switch.copy.4424px')}</span>
              <span>{t('examples.switch.copy.bodyMedium')}</span>
              <span>{t('components.switch.specimen.nativeSwitchSemantics')}</span>
              <ComponentExampleRuntimeControl />
            </div>
          </div>
        </section>
        <ArticleSection
          id={'switch-basic'}
          index={'01'}
          title={t('components.switch.basic.title')}
          description={t('components.switch.basic.description')}
        >
          <ComponentExample example={switchExamples.switchBasic} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'switch-sizes'}
          index={'02'}
          title={t('components.switch.sizes.title')}
          description={t('components.switch.sizes.description')}
        >
          <ComponentExample example={switchExamples.switchSizes} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'switch-content'}
          index={'03'}
          title={t('components.switch.content.title')}
          description={t('components.switch.content.description')}
        >
          <ComponentExample example={switchExamples.switchText} />
          <ComponentExample example={switchExamples.switchIcons} />
        </ArticleSection>
        <ArticleSection
          id={'switch-appearances'}
          index={'04'}
          title={t('components.switch.appearances.title')}
          description={t('components.switch.appearances.description')}
        >
          <ComponentExample example={switchExamples.switchAppearances} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'switch-disabled'}
          index={'05'}
          title={t('components.switch.disabled.title')}
          description={t('components.switch.disabled.description')}
        >
          <ComponentExample example={switchExamples.switchDisabled} showCaption={false} />
        </ArticleSection>
      </div>
    </ComponentExampleRuntimeProvider>
  );
}
