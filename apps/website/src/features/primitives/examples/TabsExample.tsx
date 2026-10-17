import { Tabs } from '@virgo-design/primitives';
import { useTranslation } from 'react-i18next';

export function TabsExample() {
  const { t } = useTranslation();

  return (
    <Tabs defaultValue="overview" data-docs-primitive="tabs">
      <Tabs.List aria-label={t('primitives.examples.primitiveInformation')}>
        <Tabs.Tab value="overview">{t('primitives.examples.overview')}</Tabs.Tab>
        <Tabs.Tab value="api">API</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="overview">{t('primitives.examples.aHeadlessTabPanel')}</Tabs.Panel>
      <Tabs.Panel value="api">
        {t('primitives.examples.composableRootListTabAndPanelParts')}
      </Tabs.Panel>
    </Tabs>
  );
}
