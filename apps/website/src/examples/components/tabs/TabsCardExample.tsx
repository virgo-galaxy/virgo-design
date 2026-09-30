import { Tabs } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './TabsCardExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  return (
    <Tabs variant="card" defaultValue="document-1" className={styles.root!}>
      <Tabs.List aria-label={t('examples.tabs.copy.documents')}>
        <Tabs.Tab value="document-1">{t('examples.tabs.copy.tab1')}</Tabs.Tab>
        <Tabs.Tab value="document-2">{t('examples.tabs.copy.tab2')}</Tabs.Tab>
        <Tabs.Tab value="document-3">{t('examples.tabs.copy.tab3')}</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="document-1">
        <p>{t('examples.tabs.copy.contentForTheFirstTab')}</p>
      </Tabs.Panel>
      <Tabs.Panel value="document-2">
        <p>{t('examples.tabs.copy.contentForTheSecondTab')}</p>
      </Tabs.Panel>
      <Tabs.Panel value="document-3">
        <p>{t('examples.tabs.copy.contentForTheThirdTab')}</p>
      </Tabs.Panel>
    </Tabs>
  );
}
