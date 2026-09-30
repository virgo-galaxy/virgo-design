import { Tabs } from '@virgo-design/ui';
import { type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { ArticleSection } from '@/components/docs/ArticleSection';
import {
  ComponentExample,
  ComponentExampleRuntimeControl,
  ComponentExampleRuntimeProvider,
} from '@/components/docs/ComponentExample';
import { tabsExamples } from '@/examples/components/tabs/examples';
import { translateExampleText } from '@/i18n/translate-example-text';

import { ComponentPageMetadata } from '../../components/ComponentPageMetadata';

const baseTabs = [
  { value: 'overview', label: 'Overview' },
  { value: 'api', label: 'API' },
  { value: 'accessibility', label: 'Accessibility' },
] as const;
function ContentPanel({ title, children }: { title: string; children: ReactNode }) {
  const { t } = useTranslation();

  return (
    <div className="tabs-content-panel">
      <strong>{translateExampleText(t, 'tabs', title)}</strong>
      <p>{children}</p>
    </div>
  );
}

function BasicTabs({ align = 'start' }: { align?: 'start' | 'center' }) {
  const { t } = useTranslation();

  return (
    <Tabs align={align} defaultValue="overview">
      <Tabs.List
        aria-label={t('examples.tabs.details.valueProjectSections', {
          v0: translateExampleText(t, 'tabs', String(align)),
        })}
      >
        {baseTabs.map((tab) => (
          <Tabs.Tab key={tab.value} value={tab.value}>
            {translateExampleText(t, 'tabs', tab.label)}
          </Tabs.Tab>
        ))}
      </Tabs.List>
      <Tabs.Panel value="overview">
        <ContentPanel title={t('examples.tabs.copy.overview')}>
          {t('examples.tabs.copy.aConciseSummaryOfTheCurrentProject')}
        </ContentPanel>
      </Tabs.Panel>
      <Tabs.Panel value="api">
        <ContentPanel title="API">
          {t('examples.tabs.copy.publicComponentPropsAndCompositionGuidance')}
        </ContentPanel>
      </Tabs.Panel>
      <Tabs.Panel value="accessibility">
        <ContentPanel title={t('examples.tabs.copy.accessibility')}>
          {t('examples.tabs.copy.keyboardAndAssistiveTechnologyBehavior')}
        </ContentPanel>
      </Tabs.Panel>
    </Tabs>
  );
}

export function TabsPage() {
  const { t } = useTranslation();

  return (
    <ComponentExampleRuntimeProvider>
      <div className="review-board" id="tabs-review">
        <section className="overview" id="overview" data-review-section="overview">
          <div className="overview-copy">
            <ComponentPageMetadata />
            <h1>Tabs</h1>
            <p>{t('components.tabs.overview.description')}</p>
            <dl className="component-facts">
              <div>
                <dt>{t('components.tabs.facts.variants')}</dt>
                <dd>03</dd>
              </div>
              <div>
                <dt>{t('components.tabs.facts.alignment')}</dt>
                <dd>02</dd>
              </div>
              <div>
                <dt>{t('components.tabs.facts.panels')}</dt>
                <dd>{t('components.tabs.facts.linked')}</dd>
              </div>
            </dl>
          </div>
          <div className="hero-specimen tabs-hero-specimen">
            <div className="specimen-toolbar">
              <span>{t('components.tabs.specimen.referenceSpecimen')}</span>
              <code>line · start</code>
            </div>
            <div className="hero-stage tabs-hero-stage">
              <BasicTabs />
            </div>
            <div className="specimen-caption">
              <span>{t('components.tabs.specimen.automaticActivation')}</span>
              <span>{t('components.tabs.specimen.slidingIndicator')}</span>
              <span>{t('components.tabs.specimen.linkedPanels')}</span>
              <ComponentExampleRuntimeControl />
            </div>
          </div>
        </section>
        <ArticleSection
          id={'tabs-basic'}
          index={'01'}
          title={t('components.tabs.basic.title')}
          description={t('components.tabs.basic.description')}
        >
          <ComponentExample example={tabsExamples.tabsBasic} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'tabs-disabled'}
          index={'02'}
          title={t('components.tabs.disabled.title')}
          description={t('components.tabs.disabled.description')}
        >
          <ComponentExample example={tabsExamples.tabsDisabled} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'tabs-alignment'}
          index={'03'}
          title={t('components.tabs.alignment.title')}
          description={t('components.tabs.alignment.description')}
        >
          <ComponentExample example={tabsExamples.tabsAlignment} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'tabs-icons'}
          index={'04'}
          title={t('components.tabs.icons.title')}
          description={t('components.tabs.icons.description')}
        >
          <ComponentExample example={tabsExamples.tabsIcons} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'tabs-plain'}
          index={'05'}
          title={t('components.tabs.plain.title')}
          description={t('components.tabs.plain.description')}
        >
          <ComponentExample example={tabsExamples.tabsPlain} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'tabs-card'}
          index={'06'}
          title={t('components.tabs.card.title')}
          description={t('components.tabs.card.description')}
        >
          <ComponentExample example={tabsExamples.tabsCard} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'tabs-editable-card'}
          index={'07'}
          title={t('components.tabs.editableCard.title')}
          description={t('components.tabs.editableCard.description')}
        >
          <ComponentExample example={tabsExamples.tabsEditable} showCaption={false} />
        </ArticleSection>
      </div>
    </ComponentExampleRuntimeProvider>
  );
}
