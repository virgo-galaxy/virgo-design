import './CommandPage.scss';

import { DashboardIcon, LayoutIcon, SettingsIcon } from '@virgo-design/icons';
import { Command } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import { ArticleSection } from '@/components/docs/ArticleSection';
import {
  ComponentExample,
  ComponentExampleRuntimeControl,
  ComponentExampleRuntimeProvider,
} from '@/components/docs/ComponentExample';
import { ReferenceSpecimen } from '@/components/docs/ReferenceSpecimen';
import { commandExamples } from '@/examples/components/command/examples';

import { ComponentPageMetadata } from '../../components/ComponentPageMetadata';

function CommandItems() {
  const { t } = useTranslation();

  return (
    <>
      <Command.Empty>{t('examples.command.copy.noMatchingCommands')}</Command.Empty>
      <Command.Group heading={t('examples.command.details.workspace')}>
        <Command.Item
          value="open-dashboard"
          keywords={['home']}
          icon={<DashboardIcon />}
          shortcut="G D"
        >
          {t('examples.command.copy.openDashboard')}
        </Command.Item>
        <Command.Item value="switch-workspace" icon={<LayoutIcon />} shortcut="⌘ W">
          {t('examples.command.copy.switchWorkspace')}
        </Command.Item>
      </Command.Group>
      <Command.Separator />
      <Command.Group heading={t('examples.command.details.settings')}>
        <Command.Item
          value="preferences"
          keywords={['settings']}
          icon={<SettingsIcon />}
          shortcut="⌘ ,"
        >
          {t('examples.command.copy.openPreferences')}
        </Command.Item>
        <Command.Item value="unavailable" disabled>
          {t('examples.command.copy.unavailableCommand')}
        </Command.Item>
      </Command.Group>
    </>
  );
}

export function CommandPage() {
  const { t } = useTranslation();

  return (
    <ComponentExampleRuntimeProvider>
      <div className="component-page command-page">
        <section className="overview" id="overview" data-docs-section="overview">
          <div className="overview-copy">
            <ComponentPageMetadata />
            <h1>Command</h1>
            <p>{t('components.command.overview.description')}</p>
            <dl className="component-facts">
              <div>
                <dt>{t('components.command.facts.modes')}</dt>
                <dd>{t('components.command.facts.inlineDialog')}</dd>
              </div>
              <div>
                <dt>{t('components.command.facts.search')}</dt>
                <dd>{t('components.command.facts.builtIn')}</dd>
              </div>
              <div>
                <dt>{t('components.command.facts.results')}</dt>
                <dd>{t('components.command.facts.grouped')}</dd>
              </div>
            </dl>
          </div>
          <ReferenceSpecimen>
            <ReferenceSpecimen.Toolbar>
              <span>{t('components.command.specimen.referenceSpecimen')}</span>
              <code>inline · grouped · searchable</code>
            </ReferenceSpecimen.Toolbar>
            <ReferenceSpecimen.Stage>
              <Command className="command-demo">
                <Command.Input
                  aria-label={t('examples.command.copy.heroCommandSearch')}
                  placeholder={t('examples.command.copy.searchCommands')}
                />
                <Command.List>
                  <CommandItems />
                </Command.List>
              </Command>
            </ReferenceSpecimen.Stage>
            <ReferenceSpecimen.Caption>
              <span>{t('components.command.specimen.singleInput')}</span>
              <span>{t('components.command.specimen.groupedResults')}</span>
              <span>{t('components.command.specimen.keyboardFirst')}</span>
              <ComponentExampleRuntimeControl />
            </ReferenceSpecimen.Caption>
          </ReferenceSpecimen>
        </section>
        <ArticleSection
          id="command-inline"
          index="01"
          title={t('components.command.inline.title')}
          description={t('components.command.inline.description')}
        >
          <ComponentExample example={commandExamples.commandInline} showCaption={false} />
        </ArticleSection>

        <ArticleSection
          id="command-dialog"
          index="02"
          title={t('components.command.dialog.title')}
          description={t('components.command.dialog.description')}
        >
          <ComponentExample example={commandExamples.commandDialog} showCaption={false} />
        </ArticleSection>

        <ArticleSection
          id="command-filter"
          index="03"
          title={t('components.command.filter.title')}
          description={t('components.command.filter.description')}
        >
          <ComponentExample example={commandExamples.commandFilter} showCaption={false} />
        </ArticleSection>
      </div>
    </ComponentExampleRuntimeProvider>
  );
}
