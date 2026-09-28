import { LayoutIcon } from '@virgo-design/icons';
import { Layout, NavigationMenu, Surface } from '@virgo-design/ui';
import { useState } from 'react';

import styles from './LayoutHeaderExample.module.scss';

export default function App() {
  const [selected, setSelected] = useState('nav-01');

  return (
    <div className={styles.root!}>
      <Layout surface={{ tone: 'secondary' }} className={styles.layout!}>
        <Layout.Header
          contentAlign="center"
          position="static"
          height={64}
          surface={{ tone: 'default', border: 'subtle' }}
          className={styles.header!}
        >
          <span aria-label="Logo" className={styles.label!} />
          <div className={styles.stage!}>
            <NavigationMenu
              value={selected}
              onValueChange={setSelected}
              aria-label="Header navigation"
            >
              <NavigationMenu.List className={styles.list!}>
                {[
                  { id: 'nav-01', label: 'Nav 01' },
                  { id: 'nav-02', label: 'Nav 02' },
                  { id: 'nav-03', label: 'Nav 03' },
                ].map(({ id, label }) => (
                  <NavigationMenu.Item key={id} value={id} icon={<LayoutIcon />}>
                    <NavigationMenu.Link
                      href={`#${id}`}
                      onClick={(event) => {
                        event.preventDefault();
                        setSelected(id);
                      }}
                    >
                      {label}
                    </NavigationMenu.Link>
                  </NavigationMenu.Item>
                ))}
              </NavigationMenu.List>
            </NavigationMenu>
          </div>
        </Layout.Header>
        <Layout.Content padding={16} className={styles.content!}>
          <Surface tone="elevated" radius={12} border="subtle" className={styles.surface!}>
            <span className={styles.label2!}>Content</span>
          </Surface>
        </Layout.Content>
        <Layout.Footer surface={{ tone: 'default', border: 'subtle' }} className={styles.footer!}>
          <span className={styles.label2!}>Footer</span>
        </Layout.Footer>
      </Layout>
    </div>
  );
}
