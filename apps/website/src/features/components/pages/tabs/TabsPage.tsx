import { Tabs } from '@virgo-design/ui';
import { type ReactNode } from 'react';

import { ArticleSection } from '@/components/docs/ArticleSection';
import {
  ComponentExample,
  ComponentExampleRuntimeControl,
  ComponentExampleRuntimeProvider,
} from '@/components/docs/ComponentExample';
import { tabsExamples } from '@/examples/components/tabs/examples';

const baseTabs = [
  { value: 'overview', label: 'Overview' },
  { value: 'api', label: 'API' },
  { value: 'accessibility', label: 'Accessibility' },
] as const;
function ContentPanel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="tabs-content-panel">
      <strong>{title}</strong>
      <p>{children}</p>
    </div>
  );
}

function BasicTabs({ align = 'start' }: { align?: 'start' | 'center' }) {
  return (
    <Tabs align={align} defaultValue="overview">
      <Tabs.List aria-label={`${align} project sections`}>
        {baseTabs.map((tab) => (
          <Tabs.Tab key={tab.value} value={tab.value}>
            {tab.label}
          </Tabs.Tab>
        ))}
      </Tabs.List>
      <Tabs.Panel value="overview">
        <ContentPanel title="Overview">A concise summary of the current project.</ContentPanel>
      </Tabs.Panel>
      <Tabs.Panel value="api">
        <ContentPanel title="API">Public component props and composition guidance.</ContentPanel>
      </Tabs.Panel>
      <Tabs.Panel value="accessibility">
        <ContentPanel title="Accessibility">
          Keyboard and assistive technology behavior.
        </ContentPanel>
      </Tabs.Panel>
    </Tabs>
  );
}

export function TabsPage() {
  return (
    <ComponentExampleRuntimeProvider>
      <div className="review-board" id="tabs-review">
        <section className="overview" id="overview" data-review-section="overview">
          <div className="overview-copy">
            <div className="eyebrow-row">
              <span>Component 10</span>
              <span className="version-badge">STABLE · V1.0.0</span>
            </div>
            <h1>Tabs</h1>
            <p>
              Navigates between related content panels with standard tab semantics, automatic
              keyboard activation, and line, plain, or card visual treatments.
            </p>
            <dl className="component-facts">
              <div>
                <dt>Variants</dt>
                <dd>03</dd>
              </div>
              <div>
                <dt>Alignment</dt>
                <dd>02</dd>
              </div>
              <div>
                <dt>Panels</dt>
                <dd>Linked</dd>
              </div>
            </dl>
          </div>
          <div className="hero-specimen tabs-hero-specimen">
            <div className="specimen-toolbar">
              <span>Reference specimen</span>
              <code>line · start</code>
            </div>
            <div className="hero-stage tabs-hero-stage">
              <BasicTabs />
            </div>
            <div className="specimen-caption">
              <span>Automatic activation</span>
              <span>Sliding indicator</span>
              <span>Linked panels</span>
              <ComponentExampleRuntimeControl />
            </div>
          </div>
        </section>
        <ArticleSection
          id={'tabs-basic'}
          index={'01'}
          title={'Basic'}
          description={
            'Choose labels with different widths to inspect both the position and width transition of the independent indicator.'
          }
        >
          <ComponentExample example={tabsExamples.tabsBasic} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'tabs-disabled'}
          index={'02'}
          title={'Disabled'}
          description={
            'The disabled tab remains visible but pointer and keyboard navigation skip it.'
          }
        >
          <ComponentExample example={tabsExamples.tabsDisabled} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'tabs-alignment'}
          index={'03'}
          title={'Alignment'}
          description={
            'Only horizontal alignment changes; tab content and line treatment remain identical.'
          }
        >
          <ComponentExample example={tabsExamples.tabsAlignment} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'tabs-icons'}
          index={'04'}
          title={'Icons'}
          description={
            'Decorative Virgo icons inherit tab state color while the text label keeps the accessible name.'
          }
        >
          <ComponentExample example={tabsExamples.tabsIcons} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'tabs-plain'}
          index={'05'}
          title={'Plain'}
          description={
            'Plain tabs keep selection lightweight: separators organize adjacent labels, hover adds a soft surface, and the active label is color-only.'
          }
        >
          <ComponentExample example={tabsExamples.tabsPlain} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'tabs-card'}
          index={'06'}
          title={'Card'}
          description={
            'Card tabs replace the underline with connected document-like surfaces while preserving the same tab and panel semantics.'
          }
        >
          <ComponentExample example={tabsExamples.tabsCard} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'tabs-editable-card'}
          index={'07'}
          title={'Editable Card'}
          description={
            'Close actions preserve an adjacent active tab; the trailing add action creates and activates a new tab.'
          }
        >
          <ComponentExample example={tabsExamples.tabsEditable} showCaption={false} />
        </ArticleSection>
        <footer className="review-footer">
          <span>Virgo Design UI · Tabs V1.0.0</span>
          <span>Primitive · Tokens · Icons · Motion · Metadata</span>
        </footer>
      </div>
    </ComponentExampleRuntimeProvider>
  );
}
