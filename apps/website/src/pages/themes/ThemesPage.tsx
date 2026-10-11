import { themePresets } from '@virgo-design/themes';
import { SegmentedControl, Surface, Table } from '@virgo-design/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ArticleSection } from '@/components/docs/ArticleSection';
import { DocumentationCatalogue } from '@/components/docs/DocumentationCatalogue';
import type { Appearance } from '@/shared/theme/types';
import { useAppearance } from '@/shared/theme/use-appearance';

import { ThemeComparison } from './ThemeComparison';
import styles from './themes-page.module.scss';

const installCode = `pnpm add @virgo-design/tokens @virgo-design/themes @virgo-design/ui`;
const runtimeCode = `import '@virgo-design/tokens/styles.css';
import '@virgo-design/themes/styles.css';
import '@virgo-design/ui/styles.css';
import { initializeTheme, setTheme } from '@virgo-design/themes';

initializeTheme(); // before first render
setTheme('soft');
// html: data-virgo-theme="soft" data-theme="light"
// Appearance stays in your existing light / dark / auto state.`;
const reactCode = `import { useSyncExternalStore } from 'react';
import { getTheme, getServerTheme, setTheme, subscribeTheme }
  from '@virgo-design/themes';

const theme = useSyncExternalStore(subscribeTheme, getTheme, getServerTheme);
// Header, Settings and other controls share this state.
setTheme('glass');`;
const customCode = `import { registerTheme, initializeTheme } from '@virgo-design/themes';
import './studio-theme.css'; // after official CSS

registerTheme({
  id: 'studio', name: 'Studio', descriptionKey: 'studio',
  contractVersion: 1, appearances: ['light', 'dark'],
});
initializeTheme();

/* studio-theme.css */
[data-virgo-theme='studio'] {
  --vd-control-medium-radius: 10px;
  --vd-theme-light-brand-primary: #2252ad;
  --vd-theme-light-brand-foreground: #ffffff;
  --vd-theme-dark-brand-primary: #9dbfff;
  --vd-theme-dark-brand-foreground: #10203a;
}
/* Complete hover, active, focus, disabled, overlays and chart roles,
   then audit the same components in both appearances. */`;

export function ThemesPage() {
  const { t } = useTranslation();
  const { appearance } = useAppearance();
  const [comparisonAppearance, setComparisonAppearance] = useState<Appearance | null>(null);
  const comparison = comparisonAppearance ?? appearance;
  return (
    <DocumentationCatalogue
      pageId="themes"
      eyebrow="Virgo Design"
      title={t('themes.title')}
      description={t('themes.description')}
    >
      <ArticleSection
        id="theme-model"
        index="01"
        title={t('themes.model.title')}
        description={t('themes.model.description')}
      >
        <Surface border="subtle" radius={12} className={styles.explanation}>
          <p>{t('themes.model.ownership')}</p>
          <p>{t('themes.model.appearance')}</p>
          <p>{t('themes.model.baseline')}</p>
        </Surface>
      </ArticleSection>
      <ArticleSection
        id="theme-comparison"
        index="02"
        title={t('themes.comparison.title')}
        description={t('themes.comparison.description')}
      >
        <SegmentedControl
          value={comparison}
          onValueChange={(value) => {
            if (value === 'light' || value === 'dark') setComparisonAppearance(value);
          }}
          aria-label={t('themes.comparison.appearance')}
        >
          <SegmentedControl.Item value="light">{t('app.controls.light')}</SegmentedControl.Item>
          <SegmentedControl.Item value="dark">{t('app.controls.dark')}</SegmentedControl.Item>
        </SegmentedControl>
        <ThemeComparison appearance={comparison} />
      </ArticleSection>
      <ArticleSection
        id="theme-install"
        index="03"
        title={t('themes.install.title')}
        description={t('themes.install.description')}
      >
        <pre className={styles.code}>
          <code>{installCode}</code>
        </pre>
        <pre className={styles.code}>
          <code>{runtimeCode}</code>
        </pre>
        <p>{t('themes.install.persistence')}</p>
        <pre className={styles.code}>
          <code>{reactCode}</code>
        </pre>
      </ArticleSection>
      <ArticleSection
        id="theme-registry"
        index="04"
        title={t('themes.registry.title')}
        description={t('themes.registry.description')}
      >
        <Table.Viewport aria-label={t('themes.registry.title')}>
          <Table border="rows">
            <Table.Header>
              <Table.Row>
                <Table.Head>ID</Table.Head>
                <Table.Head>{t('themes.registry.name')}</Table.Head>
                <Table.Head>{t('themes.registry.direction')}</Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {themePresets.map((preset) => (
                <Table.Row key={preset.id}>
                  <Table.Cell>
                    <code>{preset.id}</code>
                  </Table.Cell>
                  <Table.Cell>{preset.name}</Table.Cell>
                  <Table.Cell>{t(`themes.directions.${preset.descriptionKey}`)}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Table.Viewport>
        <pre className={styles.code}>
          <code>{`import { themePresets, themeRegistry, defaultTheme } from '@virgo-design/themes';
import type { ThemeId, ThemePreset } from '@virgo-design/themes';`}</code>
        </pre>
      </ArticleSection>
      <ArticleSection
        id="theme-authoring"
        index="05"
        title={t('themes.authoring.title')}
        description={t('themes.authoring.description')}
      >
        <p>{t('themes.authoring.contract')}</p>
        <pre className={styles.code}>
          <code>{customCode}</code>
        </pre>
        <p>{t('themes.authoring.scopes')}</p>
        <p>{t('themes.authoring.audit')}</p>
      </ArticleSection>
    </DocumentationCatalogue>
  );
}
