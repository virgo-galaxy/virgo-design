import './CommandPage.scss';

import { DashboardIcon, LayoutIcon, SettingsIcon } from '@virgo-design/icons';
import { Command } from '@virgo-design/ui';

import { ArticleSection } from '@/components/docs/ArticleSection';
import {
  ComponentExample,
  ComponentExampleRuntimeControl,
  ComponentExampleRuntimeProvider,
} from '@/components/docs/ComponentExample';
import { commandExamples } from '@/examples/components/command/examples';

import { ComponentPageMetadata } from '../../components/ComponentPageMetadata';

function CommandItems({ select }: { select: (value: string) => void }) {
  return (
    <>
      <Command.Empty>No matching commands.</Command.Empty>
      <Command.Group heading="Workspace">
        <Command.Item
          value="open-dashboard"
          keywords={['home']}
          icon={<DashboardIcon />}
          shortcut="G D"
          onSelect={select}
        >
          Open dashboard
        </Command.Item>
        <Command.Item
          value="switch-workspace"
          icon={<LayoutIcon />}
          shortcut="⌘ W"
          onSelect={select}
        >
          Switch workspace
        </Command.Item>
      </Command.Group>
      <Command.Separator />
      <Command.Group heading="Settings">
        <Command.Item
          value="preferences"
          keywords={['settings']}
          icon={<SettingsIcon />}
          shortcut="⌘ ,"
          onSelect={select}
        >
          Open preferences
        </Command.Item>
        <Command.Item value="unavailable" disabled>
          Unavailable command
        </Command.Item>
      </Command.Group>
    </>
  );
}

export function CommandPage() {
  return (
    <ComponentExampleRuntimeProvider>
      <div className="review-board command-review">
        <section className="overview" id="overview" data-review-section="overview">
          <div className="overview-copy">
            <ComponentPageMetadata />
            <h1>Command</h1>
            <p>
              Search application actions, keep focus in one input, and execute the active result.
            </p>
            <dl className="component-facts">
              <div>
                <dt>Modes</dt>
                <dd>Inline · Dialog</dd>
              </div>
              <div>
                <dt>Search</dt>
                <dd>Built-in</dd>
              </div>
              <div>
                <dt>Results</dt>
                <dd>Grouped</dd>
              </div>
            </dl>
          </div>
          <div className="hero-specimen">
            <div className="specimen-toolbar">
              <span>Reference specimen</span>
              <code>inline · grouped · searchable</code>
            </div>
            <div className="hero-stage">
              <Command className="command-demo">
                <Command.Input aria-label="Hero command search" placeholder="Search commands…" />
                <Command.List>
                  <CommandItems select={() => {}} />
                </Command.List>
              </Command>
            </div>
            <div className="specimen-caption">
              <span>Single input</span>
              <span>Grouped results</span>
              <span>Keyboard-first</span>
              <ComponentExampleRuntimeControl />
            </div>
          </div>
        </section>
        <ArticleSection
          id={'command-inline'}
          index={'01'}
          title={'Inline command list'}
          description={
            'Type settings or home. Arrow keys change the active option; Enter selects it.'
          }
        >
          <ComponentExample example={commandExamples.commandInline} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'command-dialog'}
          index={'02'}
          title={'Dialog palette'}
          description={
            'Open with the button, or focus this example and press ⌘/Ctrl K. The shortcut does not intercept keys elsewhere on the page.'
          }
        >
          <ComponentExample example={commandExamples.commandDialog} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'command-filter'}
          index={'03'}
          title={'Custom filter'}
          description={'This list only matches the beginning of each command value.'}
        >
          <ComponentExample example={commandExamples.commandFilter} showCaption={false} />
        </ArticleSection>
      </div>
    </ComponentExampleRuntimeProvider>
  );
}
