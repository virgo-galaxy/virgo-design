import { LayoutIcon, PlusIcon, TrashIcon } from '@virgo-design/icons';
import { Menu } from '@virgo-design/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { translateExampleText } from '@/i18n/translate-example-text';

import styles from './MenuActionsExample.module.scss';

function SharedItems({ select }: { select: (name: string) => void }) {
  const { t } = useTranslation();

  return (
    <>
      <Menu.Group label={t('examples.menu.copy.actions')}>
        <Menu.Item icon={<PlusIcon />} shortcut="⌘N" onSelect={() => select('New')}>
          {t('examples.menu.copy.new')}
        </Menu.Item>
        <Menu.Item shortcut="F2" onSelect={() => select('Rename')}>
          {t('examples.menu.copy.rename')}
        </Menu.Item>
        <Menu.Item disabled>{t('examples.menu.copy.paste')}</Menu.Item>
      </Menu.Group>
      <Menu.Separator />
      <Menu.Submenu>
        <Menu.SubmenuTrigger icon={<LayoutIcon />}>
          {t('examples.menu.copy.export')}
        </Menu.SubmenuTrigger>
        <Menu.SubmenuContent>
          <Menu.Item onSelect={() => select('Export PDF')}>PDF</Menu.Item>
          <Menu.Submenu>
            <Menu.SubmenuTrigger>{t('examples.menu.copy.image')}</Menu.SubmenuTrigger>
            <Menu.SubmenuContent>
              <Menu.Item onSelect={() => select('Export PNG')}>PNG</Menu.Item>
              <Menu.Item onSelect={() => select('Export SVG')}>SVG</Menu.Item>
            </Menu.SubmenuContent>
          </Menu.Submenu>
        </Menu.SubmenuContent>
      </Menu.Submenu>
      <Menu.Submenu>
        <Menu.SubmenuTrigger>{t('examples.menu.copy.share')}</Menu.SubmenuTrigger>
        <Menu.SubmenuContent>
          <Menu.Item onSelect={() => select('Copy link')}>
            {t('examples.menu.copy.copyLink')}
          </Menu.Item>
          <Menu.Item onSelect={() => select('Copy selection')}>
            {t('examples.menu.copy.copySelection')}
          </Menu.Item>
        </Menu.SubmenuContent>
      </Menu.Submenu>
      <Menu.Separator />
      <Menu.Item danger icon={<TrashIcon />} onSelect={() => select('Delete')}>
        {t('examples.menu.copy.delete')}
      </Menu.Item>
    </>
  );
}

export default function App() {
  const { t } = useTranslation();

  const [action, setAction] = useState('Choose an action.');
  return (
    <div className={styles.root!}>
      <Menu>
        <Menu.Trigger>{t('examples.menu.copy.actions')}</Menu.Trigger>
        <Menu.Content>
          <SharedItems select={setAction} />
        </Menu.Content>
      </Menu>
      <p role="status" className={styles.text!}>
        {translateExampleText(t, 'menu', action)}
      </p>
    </div>
  );
}
