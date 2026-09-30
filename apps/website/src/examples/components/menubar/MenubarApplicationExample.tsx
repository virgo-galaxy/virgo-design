import { LayoutIcon, PlusIcon, TrashIcon } from '@virgo-design/icons';
import { Menu, Menubar } from '@virgo-design/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { translateExampleText } from '@/i18n/translate-example-text';

import styles from './MenubarApplicationExample.module.scss';

function SharedItems({ select }: { select: (name: string) => void }) {
  const { t } = useTranslation();

  return (
    <>
      <Menu.Group label={t('examples.menubar.copy.actions')}>
        <Menu.Item icon={<PlusIcon />} shortcut="⌘N" onSelect={() => select('New')}>
          {t('examples.menubar.copy.new')}
        </Menu.Item>
        <Menu.Item shortcut="F2" onSelect={() => select('Rename')}>
          {t('examples.menubar.copy.rename')}
        </Menu.Item>
        <Menu.Item disabled>{t('examples.menubar.copy.paste')}</Menu.Item>
      </Menu.Group>
      <Menu.Separator />
      <Menu.Submenu>
        <Menu.SubmenuTrigger icon={<LayoutIcon />}>
          {t('examples.menubar.copy.export')}
        </Menu.SubmenuTrigger>
        <Menu.SubmenuContent>
          <Menu.Item onSelect={() => select('Export PDF')}>PDF</Menu.Item>
          <Menu.Submenu>
            <Menu.SubmenuTrigger>{t('examples.menubar.copy.image')}</Menu.SubmenuTrigger>
            <Menu.SubmenuContent>
              <Menu.Item onSelect={() => select('Export PNG')}>PNG</Menu.Item>
              <Menu.Item onSelect={() => select('Export SVG')}>SVG</Menu.Item>
            </Menu.SubmenuContent>
          </Menu.Submenu>
        </Menu.SubmenuContent>
      </Menu.Submenu>
      <Menu.Submenu>
        <Menu.SubmenuTrigger>{t('examples.menubar.copy.share')}</Menu.SubmenuTrigger>
        <Menu.SubmenuContent>
          <Menu.Item onSelect={() => select('Copy link')}>
            {t('examples.menubar.copy.copyLink')}
          </Menu.Item>
          <Menu.Item onSelect={() => select('Copy selection')}>
            {t('examples.menubar.copy.copySelection')}
          </Menu.Item>
        </Menu.SubmenuContent>
      </Menu.Submenu>
      <Menu.Separator />
      <Menu.Item danger icon={<TrashIcon />} onSelect={() => select('Delete')}>
        {t('examples.menubar.copy.delete')}
      </Menu.Item>
    </>
  );
}

export default function App() {
  const { t } = useTranslation();

  const [action, setAction] = useState('Choose an application action.');
  return (
    <div className={styles.root!}>
      <Menubar aria-label={t('examples.menubar.copy.applicationActions')}>
        <Menubar.Menu value="file">
          <Menubar.Trigger>{t('examples.menubar.copy.file')}</Menubar.Trigger>
          <Menubar.Content>
            <SharedItems select={setAction} />
          </Menubar.Content>
        </Menubar.Menu>
        <Menubar.Menu value="edit">
          <Menubar.Trigger>{t('examples.menubar.copy.edit')}</Menubar.Trigger>
          <Menubar.Content>
            <Menubar.Item shortcut="⌘Z" onSelect={() => setAction('Undo')}>
              {t('examples.menubar.copy.undo')}
            </Menubar.Item>
            <Menubar.Item shortcut="⌘⇧Z" onSelect={() => setAction('Redo')}>
              {t('examples.menubar.copy.redo')}
            </Menubar.Item>
            <Menubar.Separator />
            <Menubar.Item shortcut="⌘C" onSelect={() => setAction('Copy')}>
              {t('examples.menubar.copy.copy')}
            </Menubar.Item>
            <Menubar.Item disabled shortcut="⌘V">
              {t('examples.menubar.copy.paste')}
            </Menubar.Item>
          </Menubar.Content>
        </Menubar.Menu>
        <Menubar.Menu value="view">
          <Menubar.Trigger>{t('examples.menubar.copy.view')}</Menubar.Trigger>
          <Menubar.Content>
            <Menubar.CheckboxItem defaultChecked>
              {t('examples.menubar.copy.showToolbar')}
            </Menubar.CheckboxItem>
            <Menubar.CheckboxItem>{t('examples.menubar.copy.showGuides')}</Menubar.CheckboxItem>
          </Menubar.Content>
        </Menubar.Menu>
        <Menubar.Menu value="help" disabled>
          <Menubar.Trigger>{t('examples.menubar.copy.help')}</Menubar.Trigger>
        </Menubar.Menu>
      </Menubar>
      <div className={styles.stage!}>
        <p role="status" className={styles.text!}>
          {translateExampleText(t, 'menubar', action)}
        </p>
        <p className={styles.text2!}>
          {t('examples.menubar.copy.shortcutLabelsAreDisplayOnlyThisDemoDoesNotBind')}
        </p>
      </div>
    </div>
  );
}
