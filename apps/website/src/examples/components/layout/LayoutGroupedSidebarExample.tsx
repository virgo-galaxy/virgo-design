import { Layout, NavigationMenu } from '@virgo-design/ui';
import { useId, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { translateExampleText } from '@/i18n/translate-example-text';

import styles from './LayoutGroupedSidebarExample.module.scss';

const groups = [
  { label: 'Label 1', items: ['Item 1', 'Item 2', 'Item 3'] },
  { label: 'Label 2', items: ['Item 1', 'Item 2', 'Item 3'] },
  { label: 'Label 3', items: ['Item 1', 'Item 2', 'Item 3'] },
  { label: 'Label 4', items: ['Item 1', 'Item 2', 'Item 3'] },
  { label: 'Label 5', items: ['Item 1', 'Item 2', 'Item 3'] },
  { label: 'Label 6', items: ['Item 1', 'Item 2', 'Item 3'] },
];

export default function App() {
  const { t } = useTranslation();

  const id = useId();
  const [value, setValue] = useState('0-Item 1');
  return (
    <Layout direction="horizontal" className={styles.root!}>
      <Layout.Sidebar width={224} className={styles.sidebar!} surface={{ border: 'subtle' }}>
        <NavigationMenu.Root
          aria-label={t('examples.layout.copy.groupedSidebarExample')}
          orientation="vertical"
          value={value}
        >
          <NavigationMenu.List className={styles.groups!}>
            {groups.map((group, index) => (
              <NavigationMenu.Group key={group.label} aria-labelledby={`${id}-${index}`}>
                <NavigationMenu.GroupLabel id={`${id}-${index}`} className={styles.groupLabel!}>
                  {translateExampleText(t, 'layout', group.label)}
                </NavigationMenu.GroupLabel>
                <NavigationMenu.List>
                  {group.items.map((item) => (
                    <NavigationMenu.Item key={item} value={`${index}-${item}`}>
                      <NavigationMenu.Link
                        href={`#${id}-${index}-${item.replace(/ /g, '-')}`}
                        onClick={(event) => {
                          event.preventDefault();
                          setValue(`${index}-${item}`);
                        }}
                      >
                        {translateExampleText(t, 'layout', item)}
                      </NavigationMenu.Link>
                    </NavigationMenu.Item>
                  ))}
                  {index < groups.length - 1 ? (
                    <NavigationMenu.Separator className={styles.separator!} />
                  ) : null}
                </NavigationMenu.List>
              </NavigationMenu.Group>
            ))}
          </NavigationMenu.List>
        </NavigationMenu.Root>
      </Layout.Sidebar>
      <Layout.Content className={styles.content!} surface={{ tone: 'elevated' }}>
        <span className={styles.contentLabel!}>{t('examples.layout.copy.content')}</span>
      </Layout.Content>
    </Layout>
  );
}
