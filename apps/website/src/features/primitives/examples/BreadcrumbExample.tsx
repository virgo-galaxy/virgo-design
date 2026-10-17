import { Breadcrumb } from '@virgo-design/primitives';
import { useTranslation } from 'react-i18next';

export function BreadcrumbExample() {
  const { t } = useTranslation();

  return (
    <Breadcrumb data-docs-primitive="breadcrumb">
      <Breadcrumb.Item href="#primitives">{t('primitives.examples.primitives')}</Breadcrumb.Item>
      <Breadcrumb.Item href="#navigation">{t('primitives.examples.navigation')}</Breadcrumb.Item>
      <Breadcrumb.Item>{t('primitives.examples.breadcrumb')}</Breadcrumb.Item>
    </Breadcrumb>
  );
}
