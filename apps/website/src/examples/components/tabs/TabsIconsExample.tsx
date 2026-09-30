import { CircleInfoIcon, SearchIcon, SettingsIcon, UserIcon } from '@virgo-design/icons';
import { Tabs } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './TabsIconsExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  return (
    <Tabs defaultValue="account" className={styles.root!}>
      <Tabs.List aria-label={t('examples.tabs.copy.settingsSections')}>
        <Tabs.Tab value="account" icon={<UserIcon />}>
          {t('examples.tabs.copy.account')}
        </Tabs.Tab>
        <Tabs.Tab value="preferences" icon={<SettingsIcon />}>
          {t('examples.tabs.copy.preferences')}
        </Tabs.Tab>
        <Tabs.Tab value="about" icon={<CircleInfoIcon />}>
          {t('examples.tabs.copy.about')}
        </Tabs.Tab>
        <Tabs.Tab value="search" icon={<SearchIcon />}>
          {t('examples.tabs.copy.search')}
        </Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="account">
        <p>{t('examples.tabs.copy.profileAndIdentityPreferences')}</p>
      </Tabs.Panel>
      <Tabs.Panel value="preferences">
        <p>{t('examples.tabs.copy.workspaceLevelConfiguration')}</p>
      </Tabs.Panel>
      <Tabs.Panel value="about">
        <p>{t('examples.tabs.copy.productAndVersionInformation')}</p>
      </Tabs.Panel>
      <Tabs.Panel value="search">
        <p>{t('examples.tabs.copy.searchConfiguration')}</p>
      </Tabs.Panel>
    </Tabs>
  );
}
