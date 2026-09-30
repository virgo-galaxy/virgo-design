import { Tabs } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import { translateExampleText } from '@/i18n/translate-example-text';

import styles from './TabsAlignmentExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  return (
    <div className={styles.root!}>
      {(['start', 'center'] as const).map((align) => (
        <Tabs key={align} align={align} defaultValue="overview">
          <Tabs.List
            aria-label={t('examples.tabs.details.valueProjectSections', {
              v0: translateExampleText(t, 'tabs', String(align)),
            })}
          >
            <Tabs.Tab value="overview">{t('examples.tabs.copy.overview')}</Tabs.Tab>
            <Tabs.Tab value="api">API</Tabs.Tab>
            <Tabs.Tab value="accessibility">{t('examples.tabs.copy.accessibility')}</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="overview">
            <p>{t('examples.tabs.copy.aConciseSummaryOfTheCurrentProject')}</p>
          </Tabs.Panel>
          <Tabs.Panel value="api">
            <p>{t('examples.tabs.copy.publicComponentPropsAndCompositionGuidance')}</p>
          </Tabs.Panel>
          <Tabs.Panel value="accessibility">
            <p>{t('examples.tabs.copy.keyboardAndAssistiveTechnologyBehavior')}</p>
          </Tabs.Panel>
        </Tabs>
      ))}
    </div>
  );
}
