import { Tabs } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './TabsPlainExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  return (
    <Tabs variant="plain" defaultValue="overview" className={styles.root!}>
      <Tabs.List aria-label={t('examples.tabs.copy.projectViews')}>
        <Tabs.Tab value="overview">{t('examples.tabs.copy.overview')}</Tabs.Tab>
        <Tabs.Tab value="activity">{t('examples.tabs.copy.activity')}</Tabs.Tab>
        <Tabs.Tab value="settings">{t('examples.tabs.copy.settings')}</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="overview">
        <p>{t('examples.tabs.copy.aConciseSummaryOfTheCurrentProject')}</p>
      </Tabs.Panel>
      <Tabs.Panel value="activity">
        <p>{t('examples.tabs.copy.recentChangesAndActivityAcrossTheWorkspace')}</p>
      </Tabs.Panel>
      <Tabs.Panel value="settings">
        <p>{t('examples.tabs.copy.projectLevelPreferencesAndConfiguration')}</p>
      </Tabs.Panel>
    </Tabs>
  );
}
