import { InfoIcon, SearchIcon, SettingsIcon, UserIcon } from '@virgo-design/icons';
import { Tab, TabList, TabPanel, Tabs } from '@virgo-design/ui';
import { type ReactNode, useState } from 'react';

import { ReviewSection } from '../../components/ReviewSection';

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
      <TabList aria-label={`${align} project sections`}>
        {baseTabs.map((tab) => (
          <Tab key={tab.value} value={tab.value}>
            {tab.label}
          </Tab>
        ))}
      </TabList>
      <TabPanel value="overview">
        <ContentPanel title="Overview">A concise summary of the current project.</ContentPanel>
      </TabPanel>
      <TabPanel value="api">
        <ContentPanel title="API">Public component props and composition guidance.</ContentPanel>
      </TabPanel>
      <TabPanel value="accessibility">
        <ContentPanel title="Accessibility">
          Keyboard and assistive technology behavior.
        </ContentPanel>
      </TabPanel>
    </Tabs>
  );
}

type EditableTab = {
  value: string;
  label: string;
};

function EditableCardTabs() {
  const [tabs, setTabs] = useState<EditableTab[]>([
    { value: 'document-1', label: 'Tab 1' },
    { value: 'document-2', label: 'Tab 2' },
    { value: 'document-3', label: 'Tab 3' },
  ]);
  const [value, setValue] = useState('document-1');
  const [nextNumber, setNextNumber] = useState(4);

  const addTab = () => {
    const nextValue = `document-${nextNumber}`;
    setTabs((currentTabs) => [...currentTabs, { value: nextValue, label: 'New Tab' }]);
    setValue(nextValue);
    setNextNumber((currentNumber) => currentNumber + 1);
  };

  const closeTab = (tabValue: string) => {
    setTabs((currentTabs) => currentTabs.filter((tab) => tab.value !== tabValue));
  };

  return (
    <Tabs
      addable
      variant="card"
      value={value}
      onValueChange={setValue}
      onAdd={addTab}
      addLabel="Add document tab"
    >
      <TabList aria-label="Open documents">
        {tabs.map((tab) => (
          <Tab
            closable
            key={tab.value}
            value={tab.value}
            closeLabel={`Close ${tab.label}`}
            onClose={closeTab}
          >
            {tab.label}
          </Tab>
        ))}
      </TabList>
      {tabs.map((tab) => (
        <TabPanel key={tab.value} value={tab.value}>
          <ContentPanel title={tab.label}>Editable content for {tab.label}.</ContentPanel>
        </TabPanel>
      ))}
      {tabs.length === 0 ? (
        <div className="tabs-empty-state">No documents are open. Use Add tab to create one.</div>
      ) : null}
    </Tabs>
  );
}

export function TabsPage() {
  return (
    <main className="review-board" id="tabs-review">
      <section className="overview" id="overview" data-review-section="overview">
        <div className="overview-copy">
          <div className="eyebrow-row">
            <span>Component 03</span>
            <span className="version-badge">Stable · V1</span>
          </div>
          <h1>Tabs</h1>
          <p>
            Navigates between related content panels with standard tab semantics, automatic keyboard
            activation, and a selected indicator that follows the active label.
          </p>

          <dl className="component-facts">
            <div>
              <dt>Variants</dt>
              <dd>02</dd>
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
          </div>
        </div>
      </section>

      <ReviewSection
        id="tabs-basic"
        index="01"
        title="Basic"
        description="Choose labels with different widths to inspect both the position and width transition of the independent indicator."
      >
        <div className="tabs-review-card">
          <BasicTabs />
        </div>
      </ReviewSection>

      <ReviewSection
        id="tabs-disabled"
        index="02"
        title="Disabled"
        description="The disabled tab remains visible but pointer and keyboard navigation skip it."
      >
        <div className="tabs-review-card">
          <Tabs defaultValue="overview">
            <TabList aria-label="Sections with disabled tab">
              <Tab value="overview">Overview</Tab>
              <Tab disabled value="api">
                API
              </Tab>
              <Tab value="accessibility">Accessibility</Tab>
            </TabList>
            <TabPanel value="overview">
              <ContentPanel title="Overview">The API tab is currently unavailable.</ContentPanel>
            </TabPanel>
            <TabPanel value="api">
              <ContentPanel title="API">Unavailable content.</ContentPanel>
            </TabPanel>
            <TabPanel value="accessibility">
              <ContentPanel title="Accessibility">Disabled tabs are skipped.</ContentPanel>
            </TabPanel>
          </Tabs>
        </div>
      </ReviewSection>

      <ReviewSection
        id="tabs-alignment"
        index="03"
        title="Alignment"
        description="Only horizontal alignment changes; tab content and line treatment remain identical."
      >
        <div className="tabs-comparison-grid">
          <article className="tabs-specimen-card">
            <div className="cell-meta">
              <strong>Start</strong>
              <span>Default document alignment</span>
            </div>
            <BasicTabs />
            <code>align=&quot;start&quot;</code>
          </article>
          <article className="tabs-specimen-card">
            <div className="cell-meta">
              <strong>Center</strong>
              <span>Centered navigation set</span>
            </div>
            <BasicTabs align="center" />
            <code>align=&quot;center&quot;</code>
          </article>
        </div>
      </ReviewSection>

      <ReviewSection
        id="tabs-icons"
        index="04"
        title="Icons"
        description="Decorative Virgo icons inherit tab state color while the text label keeps the accessible name."
      >
        <div className="tabs-review-card">
          <Tabs defaultValue="account">
            <TabList aria-label="Settings sections">
              <Tab icon={<UserIcon />} value="account">
                Account
              </Tab>
              <Tab icon={<SettingsIcon />} value="preferences">
                Preferences
              </Tab>
              <Tab icon={<InfoIcon />} value="about">
                About
              </Tab>
              <Tab icon={<SearchIcon />} value="search">
                Search
              </Tab>
            </TabList>
            <TabPanel value="account">
              <ContentPanel title="Account">Profile and identity preferences.</ContentPanel>
            </TabPanel>
            <TabPanel value="preferences">
              <ContentPanel title="Preferences">Workspace-level configuration.</ContentPanel>
            </TabPanel>
            <TabPanel value="about">
              <ContentPanel title="About">Product and version information.</ContentPanel>
            </TabPanel>
            <TabPanel value="search">
              <ContentPanel title="Search">Search configuration.</ContentPanel>
            </TabPanel>
          </Tabs>
        </div>
      </ReviewSection>

      <ReviewSection
        id="tabs-card"
        index="05"
        title="Card"
        description="Card tabs replace the underline with connected document-like surfaces while preserving the same tab and panel semantics."
      >
        <div className="tabs-review-card">
          <Tabs variant="card" defaultValue="document-1">
            <TabList aria-label="Documents">
              <Tab value="document-1">Tab 1</Tab>
              <Tab value="document-2">Tab 2</Tab>
              <Tab value="document-3">Tab 3</Tab>
            </TabList>
            <TabPanel value="document-1">
              <ContentPanel title="Tab 1">Content for the first tab.</ContentPanel>
            </TabPanel>
            <TabPanel value="document-2">
              <ContentPanel title="Tab 2">Content for the second tab.</ContentPanel>
            </TabPanel>
            <TabPanel value="document-3">
              <ContentPanel title="Tab 3">Content for the third tab.</ContentPanel>
            </TabPanel>
          </Tabs>
        </div>
      </ReviewSection>

      <ReviewSection
        id="tabs-editable-card"
        index="06"
        title="Editable Card"
        description="Close actions preserve an adjacent active tab; the trailing add action creates and activates a new tab."
      >
        <div className="tabs-review-card">
          <EditableCardTabs />
        </div>
      </ReviewSection>

      <footer className="review-footer">
        <span>Virgo Design UI · Tabs V1</span>
        <span>Primitive · Tokens · Icons · Motion · Metadata</span>
      </footer>
    </main>
  );
}
