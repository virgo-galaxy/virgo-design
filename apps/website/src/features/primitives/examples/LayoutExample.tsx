import { Layout } from '@virgo-design/primitives';
import { useTranslation } from 'react-i18next';

export function LayoutExample() {
  const { t } = useTranslation();

  return (
    <Layout data-docs-primitive="layout">
      <Layout.Header>{t('primitives.examples.header')}</Layout.Header>
      <Layout.Lane direction="horizontal">
        <Layout.Sidebar>
          <Layout.SidebarTrigger aria-label={t('primitives.examples.toggleSidebar')}>
            {t('primitives.examples.toggleSidebar')}
          </Layout.SidebarTrigger>
          <nav aria-label={t('primitives.examples.exampleSidebar')}>
            {t('primitives.examples.sidebar')}
          </nav>
        </Layout.Sidebar>
        <Layout.Content as="div">{t('primitives.examples.mainContent')}</Layout.Content>
      </Layout.Lane>
      <Layout.Footer>{t('primitives.examples.footer')}</Layout.Footer>
    </Layout>
  );
}
