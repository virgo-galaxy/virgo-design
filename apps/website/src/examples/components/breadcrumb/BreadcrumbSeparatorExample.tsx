import './BreadcrumbSeparatorExample.module.scss';

import { Breadcrumb } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

export default function App() {
  const { t } = useTranslation();

  return (
    <Breadcrumb separator=">">
      <Breadcrumb.Item href="#home">{t('examples.breadcrumb.copy.home')}</Breadcrumb.Item>
      <Breadcrumb.Item href="#application-center">
        {t('examples.breadcrumb.copy.applicationCenter')}
      </Breadcrumb.Item>
      <Breadcrumb.Item href="#application-list">
        {t('examples.breadcrumb.copy.applicationList')}
      </Breadcrumb.Item>
      <Breadcrumb.Item>{t('examples.breadcrumb.copy.anApplication')}</Breadcrumb.Item>
    </Breadcrumb>
  );
}
