import './MenuSystemPages.scss';

import { LayoutIcon, PlusIcon, TrashIcon } from '@virgo-design/icons';
import { ContextMenu, Menu, Menubar } from '@virgo-design/ui';
import type { ReactNode } from 'react';

import { ArticleSection } from '@/components/docs/ArticleSection';
import {
  ComponentExample,
  ComponentExampleRuntimeControl,
  ComponentExampleRuntimeProvider,
} from '@/components/docs/ComponentExample';
import { contextMenuExamples } from '@/examples/components/context-menu/examples';
import { menuExamples } from '@/examples/components/menu/examples';
import { menubarExamples } from '@/examples/components/menubar/examples';

function Page({
  name,
  index,
  description,
  specimenCode,
  specimenCaption,
  specimen,
  children,
}: {
  name: string;
  index: string;
  description: string;
  specimenCode: string;
  specimenCaption: [string, string, string];
  specimen: ReactNode;
  children: ReactNode;
}) {
  return (
    <ComponentExampleRuntimeProvider>
      <div className="review-board menu-system-review">
        <section className="overview" id="overview" data-review-section="overview">
          <div className="overview-copy">
            <div className="eyebrow-row">
              <span>Component {index}</span>
              <span className="version-badge">STABLE · V1.0.0</span>
            </div>
            <h1>{name}</h1>
            <p>{description}</p>
            <dl className="component-facts">
              <div>
                <dt>Items</dt>
                <dd>Shared</dd>
              </div>
              <div>
                <dt>Input</dt>
                <dd>Keyboard</dd>
              </div>
              <div>
                <dt>Composition</dt>
                <dd>Nested menus</dd>
              </div>
            </dl>
          </div>
          <div className="hero-specimen">
            <div className="specimen-toolbar">
              <span>Reference specimen</span>
              <code>{specimenCode}</code>
            </div>
            <div className="hero-stage menu-hero-stage">{specimen}</div>
            <div className="specimen-caption">
              {specimenCaption.map((item) => (
                <span key={item}>{item}</span>
              ))}
              <ComponentExampleRuntimeControl />
            </div>
          </div>
        </section>
        {children}
        <footer className="review-footer">
          <span>Virgo Design UI · {name}</span>
          <span>Actions · Shared menu protocol · Classic</span>
        </footer>
      </div>
    </ComponentExampleRuntimeProvider>
  );
}

function SharedItems({ select }: { select: (name: string) => void }) {
  return (
    <>
      <Menu.Group label="Actions">
        <Menu.Item icon={<PlusIcon />} shortcut="⌘N" onSelect={() => select('New')}>
          New
        </Menu.Item>
        <Menu.Item shortcut="F2" onSelect={() => select('Rename')}>
          Rename
        </Menu.Item>
        <Menu.Item disabled>Paste</Menu.Item>
      </Menu.Group>
      <Menu.Separator />
      <Menu.Submenu>
        <Menu.SubmenuTrigger icon={<LayoutIcon />}>Export</Menu.SubmenuTrigger>
        <Menu.SubmenuContent>
          <Menu.Item onSelect={() => select('Export PDF')}>PDF</Menu.Item>
          <Menu.Submenu>
            <Menu.SubmenuTrigger>Image</Menu.SubmenuTrigger>
            <Menu.SubmenuContent>
              <Menu.Item onSelect={() => select('Export PNG')}>PNG</Menu.Item>
              <Menu.Item onSelect={() => select('Export SVG')}>SVG</Menu.Item>
            </Menu.SubmenuContent>
          </Menu.Submenu>
        </Menu.SubmenuContent>
      </Menu.Submenu>
      <Menu.Submenu>
        <Menu.SubmenuTrigger>Share</Menu.SubmenuTrigger>
        <Menu.SubmenuContent>
          <Menu.Item onSelect={() => select('Copy link')}>Copy link</Menu.Item>
          <Menu.Item onSelect={() => select('Copy selection')}>Copy selection</Menu.Item>
        </Menu.SubmenuContent>
      </Menu.Submenu>
      <Menu.Separator />
      <Menu.Item danger icon={<TrashIcon />} onSelect={() => select('Delete')}>
        Delete
      </Menu.Item>
    </>
  );
}

export function MenuPage() {
  return (
    <Page
      name="Menu"
      index="33"
      description="Choose what to do. Button-triggered actions, nested submenus and persistent preferences share one menu protocol."
      specimenCode="button trigger · submenu"
      specimenCaption={['Button trigger', 'Nested submenu', 'Shared menu parts']}
      specimen={
        <div className="menu-hero-card">
          <Menu>
            <Menu.Trigger>Actions</Menu.Trigger>
            <Menu.Content>
              <SharedItems select={() => {}} />
            </Menu.Content>
          </Menu>
        </div>
      }
    >
      <ArticleSection
        id={'menu-actions'}
        index={'01'}
        title={'Actions and submenus'}
        description={
          'Click Actions. Hover Export → Image, or use arrow keys to navigate. Escape returns one level at a time.'
        }
      >
        <ComponentExample example={menuExamples.menuActions} showCaption={false} />
      </ArticleSection>
      <ArticleSection
        id={'menu-preferences'}
        index={'02'}
        title={'Checkbox and radio items'}
        description={'Preferences stay open after selection. Shortcut labels are display only.'}
      >
        <ComponentExample example={menuExamples.menuCheckbox} />
        <ComponentExample example={menuExamples.menuRadio} />
      </ArticleSection>
      <ArticleSection
        id={'menu-density'}
        index={'03'}
        title={'Density'}
        description={'Classic menu rows inherit the root size and page theme.'}
      >
        <ComponentExample example={menuExamples.menuSizes} showCaption={false} />
      </ArticleSection>
    </Page>
  );
}

export function ContextMenuPage() {
  return (
    <Page
      name="ContextMenu"
      index="32"
      description="Actions for the object under the pointer. Right-click a target, or focus it and press Shift+F10 or the context-menu key."
      specimenCode="target trigger · contextual actions"
      specimenCaption={['Object-scoped', 'Pointer anchored', 'Keyboard accessible']}
      specimen={
        <div className="menu-hero-card">
          <ContextMenu>
            <ContextMenu.Trigger className="context-target" aria-label="Hero document context">
              <LayoutIcon />
              <strong>Document</strong>
              <span>Right-click here · Shift+F10</span>
            </ContextMenu.Trigger>
            <ContextMenu.Content aria-label="Document actions">
              <SharedItems select={() => {}} />
            </ContextMenu.Content>
          </ContextMenu>
        </div>
      }
    >
      <ArticleSection
        id={'context-target'}
        index={'01'}
        title={'Pointer and keyboard context'}
        description={
          'The popup anchors to the pointer and adjusts at the viewport edges. Keyboard opening anchors to the focused target.'
        }
      >
        <ComponentExample example={contextMenuExamples.contextMenuTarget} showCaption={false} />
      </ArticleSection>
      <ArticleSection
        id={'context-settings'}
        index={'02'}
        title={'Shared item system'}
        description={'Context menus support the same persistent checkbox and grouped radio items.'}
      >
        <ComponentExample example={contextMenuExamples.contextMenuCheckbox} />
        <ComponentExample example={contextMenuExamples.contextMenuRadio} />
      </ArticleSection>
    </Page>
  );
}

export function MenubarPage() {
  return (
    <Page
      name="Menubar"
      index="34"
      description="Application-level action groups. Arrow keys move between menus; an open menu follows the pointer across its neighboring triggers."
      specimenCode="application bar · grouped actions"
      specimenCaption={['App-level navigation', 'Shared menu content', 'Arrow-key flow']}
      specimen={
        <div className="menu-hero-card">
          <Menubar aria-label="Hero application actions">
            <Menubar.Menu value="file">
              <Menubar.Trigger>File</Menubar.Trigger>
              <Menubar.Content>
                <Menubar.Item>New</Menubar.Item>
                <Menubar.Item>Save</Menubar.Item>
              </Menubar.Content>
            </Menubar.Menu>
            <Menubar.Menu value="edit">
              <Menubar.Trigger>Edit</Menubar.Trigger>
              <Menubar.Content>
                <Menubar.Item>Undo</Menubar.Item>
                <Menubar.Item>Redo</Menubar.Item>
              </Menubar.Content>
            </Menubar.Menu>
            <Menubar.Menu value="view">
              <Menubar.Trigger>View</Menubar.Trigger>
              <Menubar.Content>
                <Menubar.CheckboxItem defaultChecked>Show toolbar</Menubar.CheckboxItem>
              </Menubar.Content>
            </Menubar.Menu>
          </Menubar>
        </div>
      }
    >
      <ArticleSection
        id={'menubar-application'}
        index={'01'}
        title={'Application menus'}
        description={
          'Use File, Edit or View. Arrow Left/Right switches groups; Arrow Down opens a group; Tab leaves the menu bar.'
        }
      >
        <ComponentExample example={menubarExamples.menubarApplication} showCaption={false} />
      </ArticleSection>
    </Page>
  );
}
