import './MenuSystemPages.scss';

import { LayoutIcon, PlusIcon, TrashIcon } from '@virgo-design/icons';
import { ContextMenu, Menu, Menubar } from '@virgo-design/ui';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { ArticleSection } from '@/components/docs/ArticleSection';
import {
  ComponentExample,
  ComponentExampleRuntimeControl,
  ComponentExampleRuntimeProvider,
} from '@/components/docs/ComponentExample';
import { ReferenceSpecimen } from '@/components/docs/ReferenceSpecimen';
import { contextMenuExamples } from '@/examples/components/context-menu/examples';
import { menuExamples } from '@/examples/components/menu/examples';
import { menubarExamples } from '@/examples/components/menubar/examples';

import { ComponentPageMetadata } from '../../components/ComponentPageMetadata';

function Page({
  name,
  description,
  specimenCode,
  specimenCaption,
  specimen,
  children,
}: {
  name: string;
  description: string;
  specimenCode: string;
  specimenCaption: [string, string, string];
  specimen: ReactNode;
  children: ReactNode;
}) {
  const { t } = useTranslation();

  return (
    <ComponentExampleRuntimeProvider>
      <div className="component-page menu-system-page">
        <section className="overview" id="overview" data-docs-section="overview">
          <div className="overview-copy">
            <ComponentPageMetadata />
            <h1>{name}</h1>
            <p>{description}</p>
            <dl className="component-facts">
              <div>
                <dt>{t('components.menuSystem.facts.items')}</dt>
                <dd>{t('components.menuSystem.facts.shared')}</dd>
              </div>
              <div>
                <dt>{t('components.menuSystem.facts.input')}</dt>
                <dd>{t('components.menuSystem.facts.keyboard')}</dd>
              </div>
              <div>
                <dt>{t('components.menuSystem.facts.composition')}</dt>
                <dd>{t('components.menuSystem.facts.nestedMenus')}</dd>
              </div>
            </dl>
          </div>
          <ReferenceSpecimen>
            <ReferenceSpecimen.Toolbar>
              <span>{t('components.menuSystem.specimen.referenceSpecimen')}</span>
              <code>{specimenCode}</code>
            </ReferenceSpecimen.Toolbar>
            <ReferenceSpecimen.Stage className="menu-hero-stage">
              {specimen}
            </ReferenceSpecimen.Stage>
            <ReferenceSpecimen.Caption>
              {specimenCaption.map((item) => (
                <span key={item}>{item}</span>
              ))}
              <ComponentExampleRuntimeControl />
            </ReferenceSpecimen.Caption>
          </ReferenceSpecimen>
        </section>
        {children}
      </div>
    </ComponentExampleRuntimeProvider>
  );
}

function SharedItems() {
  const { t } = useTranslation();

  return (
    <>
      <Menu.Group label={t('examples.menuSystem.copy.actions')}>
        <Menu.Item icon={<PlusIcon />} shortcut="⌘N">
          {t('examples.menuSystem.copy.new')}
        </Menu.Item>
        <Menu.Item shortcut="F2">{t('examples.menuSystem.copy.rename')}</Menu.Item>
        <Menu.Item disabled>{t('examples.menuSystem.copy.paste')}</Menu.Item>
      </Menu.Group>
      <Menu.Separator />
      <Menu.Submenu>
        <Menu.SubmenuTrigger icon={<LayoutIcon />}>
          {t('examples.menuSystem.copy.export')}
        </Menu.SubmenuTrigger>
        <Menu.SubmenuContent>
          <Menu.Item>PDF</Menu.Item>
          <Menu.Submenu>
            <Menu.SubmenuTrigger>{t('examples.menuSystem.copy.image')}</Menu.SubmenuTrigger>
            <Menu.SubmenuContent>
              <Menu.Item>PNG</Menu.Item>
              <Menu.Item>SVG</Menu.Item>
            </Menu.SubmenuContent>
          </Menu.Submenu>
        </Menu.SubmenuContent>
      </Menu.Submenu>
      <Menu.Submenu>
        <Menu.SubmenuTrigger>{t('examples.menuSystem.copy.share')}</Menu.SubmenuTrigger>
        <Menu.SubmenuContent>
          <Menu.Item>{t('examples.menuSystem.copy.copyLink')}</Menu.Item>
          <Menu.Item>{t('examples.menuSystem.copy.copySelection')}</Menu.Item>
        </Menu.SubmenuContent>
      </Menu.Submenu>
      <Menu.Separator />
      <Menu.Item danger icon={<TrashIcon />}>
        {t('examples.menuSystem.copy.delete')}
      </Menu.Item>
    </>
  );
}

export function MenuPage() {
  const { t } = useTranslation();

  return (
    <Page
      name="Menu"
      description={t('components.menuSystem.menu.overview.description')}
      specimenCode="button trigger · submenu"
      specimenCaption={[
        t('components.menuSystem.menu.specimen.buttonTrigger'),
        t('components.menuSystem.menu.specimen.nestedSubmenu'),
        t('components.menuSystem.menu.specimen.sharedMenuParts'),
      ]}
      specimen={
        <div className="menu-hero-card">
          <Menu>
            <Menu.Trigger>{t('examples.menuSystem.copy.actions')}</Menu.Trigger>
            <Menu.Content>
              <SharedItems />
            </Menu.Content>
          </Menu>
        </div>
      }
    >
      <ArticleSection
        id={'menu-actions'}
        index={'01'}
        title={t('components.menuSystem.menuActions.title')}
        description={t('components.menuSystem.menuActions.description')}
      >
        <ComponentExample example={menuExamples.menuActions} showCaption={false} />
      </ArticleSection>
      <ArticleSection
        id={'menu-preferences'}
        index={'02'}
        title={t('components.menuSystem.menuPreferences.title')}
        description={t('components.menuSystem.menuPreferences.description')}
      >
        <ComponentExample example={menuExamples.menuCheckbox} />
        <ComponentExample example={menuExamples.menuRadio} />
      </ArticleSection>
      <ArticleSection
        id={'menu-density'}
        index={'03'}
        title={t('components.menuSystem.menuDensity.title')}
        description={t('components.menuSystem.menuDensity.description')}
      >
        <ComponentExample example={menuExamples.menuSizes} showCaption={false} />
      </ArticleSection>
    </Page>
  );
}

export function ContextMenuPage() {
  const { t } = useTranslation();

  return (
    <Page
      name="ContextMenu"
      description={t('components.menuSystem.contextMenu.overview.description')}
      specimenCode="target trigger · contextual actions"
      specimenCaption={[
        t('components.menuSystem.contextMenu.specimen.objectScoped'),
        t('components.menuSystem.contextMenu.specimen.pointerAnchored'),
        t('components.menuSystem.contextMenu.specimen.keyboardAccessible'),
      ]}
      specimen={
        <div className="menu-hero-card">
          <ContextMenu>
            <ContextMenu.Trigger
              className="context-target"
              aria-label={t('examples.menuSystem.copy.heroDocumentContext')}
            >
              <LayoutIcon />
              <strong>{t('examples.menuSystem.copy.document')}</strong>
              <span>{t('examples.menuSystem.copy.rightClickHereShiftF10')}</span>
            </ContextMenu.Trigger>
            <ContextMenu.Content aria-label={t('examples.menuSystem.copy.documentActions')}>
              <SharedItems />
            </ContextMenu.Content>
          </ContextMenu>
        </div>
      }
    >
      <ArticleSection
        id={'context-target'}
        index={'01'}
        title={t('components.menuSystem.contextTarget.title')}
        description={t('components.menuSystem.contextTarget.description')}
      >
        <ComponentExample example={contextMenuExamples.contextMenuTarget} showCaption={false} />
      </ArticleSection>
      <ArticleSection
        id={'context-settings'}
        index={'02'}
        title={t('components.menuSystem.contextSettings.title')}
        description={t('components.menuSystem.contextSettings.description')}
      >
        <ComponentExample example={contextMenuExamples.contextMenuCheckbox} />
        <ComponentExample example={contextMenuExamples.contextMenuRadio} />
      </ArticleSection>
    </Page>
  );
}

export function MenubarPage() {
  const { t } = useTranslation();

  return (
    <Page
      name="Menubar"
      description={t('components.menuSystem.menubar.overview.description')}
      specimenCode="application bar · grouped actions"
      specimenCaption={[
        t('components.menuSystem.menubar.specimen.appLevelNavigation'),
        t('components.menuSystem.menubar.specimen.sharedMenuContent'),
        t('components.menuSystem.menubar.specimen.arrowKeyFlow'),
      ]}
      specimen={
        <div className="menu-hero-card">
          <Menubar aria-label={t('examples.menuSystem.copy.heroApplicationActions')}>
            <Menubar.Menu value="file">
              <Menubar.Trigger>{t('examples.menuSystem.copy.file')}</Menubar.Trigger>
              <Menubar.Content>
                <Menubar.Item>{t('examples.menuSystem.copy.new')}</Menubar.Item>
                <Menubar.Item>{t('examples.menuSystem.copy.save')}</Menubar.Item>
              </Menubar.Content>
            </Menubar.Menu>
            <Menubar.Menu value="edit">
              <Menubar.Trigger>{t('examples.menuSystem.copy.edit')}</Menubar.Trigger>
              <Menubar.Content>
                <Menubar.Item>{t('examples.menuSystem.copy.undo')}</Menubar.Item>
                <Menubar.Item>{t('examples.menuSystem.copy.redo')}</Menubar.Item>
              </Menubar.Content>
            </Menubar.Menu>
            <Menubar.Menu value="view">
              <Menubar.Trigger>{t('examples.menuSystem.copy.view')}</Menubar.Trigger>
              <Menubar.Content>
                <Menubar.CheckboxItem defaultChecked>
                  {t('examples.menuSystem.copy.showToolbar')}
                </Menubar.CheckboxItem>
              </Menubar.Content>
            </Menubar.Menu>
          </Menubar>
        </div>
      }
    >
      <ArticleSection
        id={'menubar-application'}
        index={'01'}
        title={t('components.menuSystem.menubarApplication.title')}
        description={t('components.menuSystem.menubarApplication.description')}
      >
        <ComponentExample example={menubarExamples.menubarApplication} showCaption={false} />
      </ArticleSection>
    </Page>
  );
}
