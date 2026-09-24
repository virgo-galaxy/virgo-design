import './MenuSystemPages.scss';

import { CheckIcon, PlusIcon, TrashIcon, WorkspaceIcon } from '@virgo-design/icons';
import { ContextMenu, Menu, Menubar } from '@virgo-design/ui';
import type { ReactNode } from 'react';
import { useState } from 'react';

import { ReviewSection } from '../../components/ReviewSection';

function Page({
  name,
  index,
  description,
  children,
}: {
  name: string;
  index: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className="review-board menu-system-review">
      <section className="menu-system-intro" id="overview">
        <div className="eyebrow-row">
          <span>Component {index}</span>
          <span className="version-badge">STABLE · V1.0.0</span>
        </div>
        <h1>{name}</h1>
        <p>{description}</p>
      </section>
      {children}
      <footer className="review-footer">
        <span>Virgo Design UI · {name}</span>
        <span>Actions · Shared menu protocol · Classic</span>
      </footer>
    </div>
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
        <Menu.SubmenuTrigger icon={<WorkspaceIcon />}>Export</Menu.SubmenuTrigger>
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
  const [action, setAction] = useState('Choose an action.');
  const [grid, setGrid] = useState(true);
  const [zoom, setZoom] = useState('100');
  return (
    <Page
      name="Menu"
      index="21"
      description="Choose what to do. Button-triggered actions, nested submenus and persistent preferences share one menu protocol."
    >
      <ReviewSection
        id="menu-actions"
        index="01"
        title="Actions and submenus"
        description="Click Actions. Hover Export → Image, or use arrow keys to navigate. Escape returns one level at a time."
      >
        <div className="menu-example">
          <Menu>
            <Menu.Trigger>Actions</Menu.Trigger>
            <Menu.Content>
              <SharedItems select={setAction} />
            </Menu.Content>
          </Menu>
          <p role="status">{action}</p>
        </div>
      </ReviewSection>
      <ReviewSection
        id="menu-preferences"
        index="02"
        title="Checkbox and radio items"
        description="Preferences stay open after selection. Shortcut labels are display only."
      >
        <div className="menu-example">
          <Menu>
            <Menu.Trigger>View options</Menu.Trigger>
            <Menu.Content>
              <Menu.CheckboxItem checked={grid} onCheckedChange={setGrid}>
                Show grid
              </Menu.CheckboxItem>
              <Menu.CheckboxItem>Show guides</Menu.CheckboxItem>
              <Menu.Separator />
              <Menu.Group label="Zoom">
                <Menu.RadioGroup value={zoom} onValueChange={setZoom} aria-label="Zoom">
                  {['50', '100', '200'].map((value) => (
                    <Menu.RadioItem key={value} value={value}>
                      {value}%
                    </Menu.RadioItem>
                  ))}
                </Menu.RadioGroup>
              </Menu.Group>
            </Menu.Content>
          </Menu>
          <p>
            Grid {grid ? 'on' : 'off'} · Zoom {zoom}%
          </p>
        </div>
      </ReviewSection>
      <ReviewSection
        id="menu-density"
        index="03"
        title="Density"
        description="Classic menu rows inherit the root size and page theme."
      >
        <div className="menu-density">
          {(['small', 'medium', 'large'] as const).map((size) => (
            <Menu key={size} size={size}>
              <Menu.Trigger>{size}</Menu.Trigger>
              <Menu.Content>
                <Menu.Item icon={<CheckIcon />} onSelect={() => setAction(size + ' selected')}>
                  Select
                </Menu.Item>
                <Menu.Item disabled>Unavailable</Menu.Item>
              </Menu.Content>
            </Menu>
          ))}
        </div>
      </ReviewSection>
    </Page>
  );
}
export function ContextMenuPage() {
  const [action, setAction] = useState('No context action selected.');
  return (
    <Page
      name="ContextMenu"
      index="20"
      description="Actions for the object under the pointer. Right-click a target, or focus it and press Shift+F10 or the context-menu key."
    >
      <ReviewSection
        id="context-target"
        index="01"
        title="Pointer and keyboard context"
        description="The popup anchors to the pointer and adjusts at the viewport edges. Keyboard opening anchors to the focused target."
      >
        <div className="menu-example">
          <ContextMenu>
            <ContextMenu.Trigger className="context-target" aria-label="Document context">
              <WorkspaceIcon />
              <strong>Document</strong>
              <span>Right-click here · Shift+F10</span>
            </ContextMenu.Trigger>
            <ContextMenu.Content aria-label="Document actions">
              <SharedItems select={setAction} />
            </ContextMenu.Content>
          </ContextMenu>
          <p role="status">{action}</p>
        </div>
      </ReviewSection>
      <ReviewSection
        id="context-settings"
        index="02"
        title="Shared item system"
        description="Context menus support the same persistent checkbox and grouped radio items."
      >
        <div className="menu-example">
          <ContextMenu>
            <ContextMenu.Trigger className="context-target" aria-label="Canvas context">
              Canvas options · Right-click or use the keyboard
            </ContextMenu.Trigger>
            <ContextMenu.Content aria-label="Canvas options">
              <ContextMenu.CheckboxItem defaultChecked>Snap to grid</ContextMenu.CheckboxItem>
              <ContextMenu.RadioGroup defaultValue="pixels" aria-label="Units">
                <ContextMenu.RadioItem value="pixels">Pixels</ContextMenu.RadioItem>
                <ContextMenu.RadioItem value="points">Points</ContextMenu.RadioItem>
              </ContextMenu.RadioGroup>
            </ContextMenu.Content>
          </ContextMenu>
        </div>
      </ReviewSection>
    </Page>
  );
}
export function MenubarPage() {
  const [action, setAction] = useState('Choose an application action.');
  return (
    <Page
      name="Menubar"
      index="22"
      description="Application-level action groups. Arrow keys move between menus; an open menu follows the pointer across its neighboring triggers."
    >
      <ReviewSection
        id="menubar-application"
        index="01"
        title="Application menus"
        description="Use File, Edit or View. Arrow Left/Right switches groups; Arrow Down opens a group; Tab leaves the menu bar."
      >
        <div className="menu-example">
          <Menubar aria-label="Application actions">
            <Menubar.Menu value="file">
              <Menubar.Trigger>File</Menubar.Trigger>
              <Menubar.Content>
                <SharedItems select={setAction} />
              </Menubar.Content>
            </Menubar.Menu>
            <Menubar.Menu value="edit">
              <Menubar.Trigger>Edit</Menubar.Trigger>
              <Menubar.Content>
                <Menubar.Item shortcut="⌘Z" onSelect={() => setAction('Undo')}>
                  Undo
                </Menubar.Item>
                <Menubar.Item shortcut="⌘⇧Z" onSelect={() => setAction('Redo')}>
                  Redo
                </Menubar.Item>
                <Menubar.Separator />
                <Menubar.Item shortcut="⌘C" onSelect={() => setAction('Copy')}>
                  Copy
                </Menubar.Item>
                <Menubar.Item disabled shortcut="⌘V">
                  Paste
                </Menubar.Item>
              </Menubar.Content>
            </Menubar.Menu>
            <Menubar.Menu value="view">
              <Menubar.Trigger>View</Menubar.Trigger>
              <Menubar.Content>
                <Menubar.CheckboxItem defaultChecked>Show toolbar</Menubar.CheckboxItem>
                <Menubar.CheckboxItem>Show guides</Menubar.CheckboxItem>
              </Menubar.Content>
            </Menubar.Menu>
            <Menubar.Menu value="help" disabled>
              <Menubar.Trigger>Help</Menubar.Trigger>
            </Menubar.Menu>
          </Menubar>
          <div className="menu-editor">
            <span className="eyebrow">CONTENT</span>
            <p role="status">{action}</p>
            <p>
              Menu commands are demonstrated as local feedback. Shortcut labels do not bind keys.
            </p>
          </div>
        </div>
      </ReviewSection>
    </Page>
  );
}
