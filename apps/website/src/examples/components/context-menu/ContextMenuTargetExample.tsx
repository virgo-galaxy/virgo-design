import { LayoutIcon, PlusIcon, TrashIcon } from '@virgo-design/icons';
import { ContextMenu, Menu } from '@virgo-design/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { translateExampleText } from '@/i18n/translate-example-text';

import styles from './ContextMenuTargetExample.module.scss';

function SharedItems({ select }: { select: (name: string) => void }) {
  const { t } = useTranslation();

  return (
    <>
      <Menu.Group label={t('examples.contextMenu.copy.actions')}>
        <Menu.Item icon={<PlusIcon />} shortcut="⌘N" onSelect={() => select('New')}>
          {t('examples.contextMenu.copy.new')}
        </Menu.Item>
        <Menu.Item shortcut="F2" onSelect={() => select('Rename')}>
          {t('examples.contextMenu.copy.rename')}
        </Menu.Item>
        <Menu.Item disabled>{t('examples.contextMenu.copy.paste')}</Menu.Item>
      </Menu.Group>
      <Menu.Separator />
      <Menu.Submenu>
        <Menu.SubmenuTrigger icon={<LayoutIcon />}>
          {t('examples.contextMenu.copy.export')}
        </Menu.SubmenuTrigger>
        <Menu.SubmenuContent>
          <Menu.Item onSelect={() => select('Export PDF')}>PDF</Menu.Item>
          <Menu.Submenu>
            <Menu.SubmenuTrigger>{t('examples.contextMenu.copy.image')}</Menu.SubmenuTrigger>
            <Menu.SubmenuContent>
              <Menu.Item onSelect={() => select('Export PNG')}>PNG</Menu.Item>
              <Menu.Item onSelect={() => select('Export SVG')}>SVG</Menu.Item>
            </Menu.SubmenuContent>
          </Menu.Submenu>
        </Menu.SubmenuContent>
      </Menu.Submenu>
      <Menu.Submenu>
        <Menu.SubmenuTrigger>{t('examples.contextMenu.copy.share')}</Menu.SubmenuTrigger>
        <Menu.SubmenuContent>
          <Menu.Item onSelect={() => select('Copy link')}>
            {t('examples.contextMenu.copy.copyLink')}
          </Menu.Item>
          <Menu.Item onSelect={() => select('Copy selection')}>
            {t('examples.contextMenu.copy.copySelection')}
          </Menu.Item>
        </Menu.SubmenuContent>
      </Menu.Submenu>
      <Menu.Separator />
      <Menu.Item danger icon={<TrashIcon />} onSelect={() => select('Delete')}>
        {t('examples.contextMenu.copy.delete')}
      </Menu.Item>
    </>
  );
}

export default function App() {
  const { t } = useTranslation();

  const [action, setAction] = useState('No context action selected.');
  return (
    <div className={styles.root!}>
      <ContextMenu>
        <ContextMenu.Trigger
          aria-label={t('examples.contextMenu.copy.documentContext')}
          className={styles.trigger!}
        >
          <LayoutIcon />
          <strong>{t('examples.contextMenu.copy.document')}</strong>
          <span>{t('examples.contextMenu.copy.rightClickHereShiftF10')}</span>
        </ContextMenu.Trigger>
        <ContextMenu.Content aria-label={t('examples.contextMenu.copy.documentActions')}>
          <SharedItems select={setAction} />
        </ContextMenu.Content>
      </ContextMenu>
      <span role="status">{translateExampleText(t, 'contextMenu', action)}</span>
    </div>
  );
}
