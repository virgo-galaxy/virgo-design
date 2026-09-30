import { Tabs } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './TabsDisabledExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  return (
    <Tabs defaultValue="overview" className={styles.root!}>
      <Tabs.List aria-label={t('examples.tabs.copy.sectionsWithDisabledTab')}>
        <Tabs.Tab value="overview">{t('examples.tabs.copy.overview')}</Tabs.Tab>
        <Tabs.Tab value="api" disabled>
          API
        </Tabs.Tab>
        <Tabs.Tab value="accessibility">{t('examples.tabs.copy.accessibility')}</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="overview">
        <p>{t('examples.tabs.copy.theApiTabIsCurrentlyUnavailable')}</p>
      </Tabs.Panel>
      <Tabs.Panel value="api">
        <p>{t('examples.tabs.copy.unavailableContent')}</p>
      </Tabs.Panel>
      <Tabs.Panel value="accessibility">
        <p>{t('examples.tabs.copy.disabledTabsAreSkipped')}</p>
      </Tabs.Panel>
    </Tabs>
  );
}
