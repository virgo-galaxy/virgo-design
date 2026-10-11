import { themePresets } from '@virgo-design/themes';
import { Surface, Table } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import { ArticleSection } from '@/components/docs/ArticleSection';
import { DocumentationCatalogue } from '@/components/docs/DocumentationCatalogue';

import { ThemeExperience } from './ThemeExperience';
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
const customCode = `import { getDefaultThemeTokens, validateThemeContract } from '@virgo-design/tokens';
import { createThemeRegistry, createThemeRuntime, getThemeCss,
  getInitialThemeScript, getThemeAttributes, resolveTheme } from '@virgo-design/themes';

const defaults = getDefaultThemeTokens();
const tokens = {
  light: { ...defaults.light, '--vd-brand-primary': '#2252ad' },
  dark: { ...defaults.dark, '--vd-brand-primary': '#9dbfff',
    '--vd-brand-foreground': '#10203a' },
};
const diagnostics = validateThemeContract({ contractVersion: 1, tokens });
diagnostics.missingOptionalRoles; // fallback roles per appearance
diagnostics.completeness; // required / optional / overall coverage
// Build/import studio.css from getThemeCss('studio', tokens).
export function createAppThemeRegistry() {
  const registry = createThemeRegistry();
  registry.registerTheme({
    id: 'studio', name: 'Studio', contractVersion: 1,
    appearances: ['light', 'dark'],
  }, tokens);
  return registry;
}
const serverRegistry = createAppThemeRegistry();
const state = resolveTheme({ theme: 'studio', appearance: 'dark' }, serverRegistry);
getThemeAttributes(state, serverRegistry); // Render attributes and serialize state.
getInitialThemeScript({ registry: serverRegistry, defaultTheme: state.theme,
  defaultAppearance: state.appearance, respectServerAttributes: true });
// Install synchronously before CSS; use the same registry definition on the client.
const clientRegistry = createAppThemeRegistry();
const runtime = createThemeRuntime({ registry: clientRegistry,
  initialTheme: state.theme, window });
runtime.hydrateTheme(state); // before rendering, with the serialized server snapshot
clientRegistry.listThemes(); // official + registered; themePresets stays official-only`;

export function ThemesPage() {
  const { t } = useTranslation();
  return (
    <DocumentationCatalogue
      pageId="themes"
      eyebrow="@virgo-design/themes"
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
        id="theme-experience"
        index="02"
        title={t('themes.experience.title')}
        description={t('themes.experience.description')}
      >
        <ThemeExperience />
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
                  <Table.Cell>{t(`themeStyleControl.names.${preset.id}`)}</Table.Cell>
                  <Table.Cell>{t(`themes.directions.${preset.id}`)}</Table.Cell>
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
