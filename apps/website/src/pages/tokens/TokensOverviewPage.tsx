import { useTranslation } from 'react-i18next';

import {
  DocumentationCatalogue,
  DocumentationCatalogueItem,
} from '@/components/docs/DocumentationCatalogue';

import { tokenNavigationGroups } from './token-navigation';

import styles from './token-page.module.scss';

export function TokensOverviewPage() {
  const { t } = useTranslation();

  return (
    <DocumentationCatalogue
      pageId="tokens"
      eyebrow="@virgo-design/tokens"
      title={t('tokens.overview.title')}
      description={t('tokens.overview.description')}
    >
      {tokenNavigationGroups.map((group) => (
        <section key={group.id} className={styles.overviewGroup}>
          <h2>{t(group.label)}</h2>
          <p>{t(group.description)}</p>
          <div className={styles.overviewLinks}>
            {group.items.map((item) => (
              <DocumentationCatalogueItem key={item.path} to={item.path} title={t(item.label)}>
                {t(item.description)}
              </DocumentationCatalogueItem>
            ))}
          </div>
        </section>
      ))}
    </DocumentationCatalogue>
  );
}
