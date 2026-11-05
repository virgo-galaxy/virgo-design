import { useTranslation } from 'react-i18next';

import { DocumentationCatalogue } from '@/components/docs/DocumentationCatalogue';

import { FontCatalogue } from './components/FontCatalogue';
import { InternationalSansPreview } from './components/InternationalSansPreview';

import styles from './fonts-page.module.scss';

const installCode = 'pnpm add @virgo-design/fonts';
const individualCode = `import '@virgo-design/fonts/sans/inter.css';
import '@virgo-design/fonts/sans/noto-sans-sc.css';
import '@virgo-design/fonts/mono/jetbrains-mono.css';`;
const applicationCode = `body {
  font-family: 'Inter Variable', 'Noto Sans SC Variable', sans-serif;
}

code, pre {
  font-family: 'JetBrains Mono Variable', monospace;
}`;
const metadataCode = `import { sansFonts, monoFonts } from '@virgo-design/fonts';

const bodyFamily = sansFonts.inter.cssFamily;
const codeFamily = monoFonts.jetbrainsMono.cssFamily;`;

export function FontsPage() {
  const { t } = useTranslation();

  return (
    <DocumentationCatalogue
      pageId="fonts"
      eyebrow="@virgo-design/fonts"
      title={t('fonts.title')}
      description={t('fonts.description')}
    >
      <section className={styles.section} aria-labelledby="font-catalogue-title">
        <header className={styles.sectionHeader}>
          <h2 id="font-catalogue-title">{t('fonts.catalogue.title')}</h2>
          <p>{t('fonts.catalogue.description')}</p>
        </header>
        <FontCatalogue />
      </section>

      <section
        className={styles.section}
        aria-labelledby="international-fonts-title"
        id="international-sans"
      >
        <header className={styles.sectionHeader}>
          <h2 id="international-fonts-title">{t('fonts.internationalSans.title')}</h2>
          <p>{t('fonts.internationalSans.description')}</p>
        </header>
        <InternationalSansPreview />
      </section>

      <section className={styles.section} aria-labelledby="font-usage-title">
        <header className={styles.sectionHeader}>
          <h2 id="font-usage-title">{t('fonts.usage.title')}</h2>
          <p>{t('fonts.usage.description')}</p>
        </header>
        <pre className={styles.code}>
          <code>{installCode}</code>
        </pre>
        <h3>{t('fonts.usage.individual')}</h3>
        <pre className={styles.code}>
          <code>{individualCode}</code>
        </pre>
        <pre className={styles.code}>
          <code>{applicationCode}</code>
        </pre>
        <h3>{t('fonts.usage.metadata')}</h3>
        <p>{t('fonts.usage.metadataDescription')}</p>
        <pre className={styles.code}>
          <code>{metadataCode}</code>
        </pre>
        <h3>{t('fonts.usage.aggregate')}</h3>
        <p>{t('fonts.usage.aggregateDescription')}</p>
        <pre className={styles.code}>
          <code>{"import '@virgo-design/fonts/default.css';"}</code>
        </pre>
      </section>
    </DocumentationCatalogue>
  );
}
