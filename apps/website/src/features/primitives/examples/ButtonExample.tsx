import { Button } from '@virgo-design/primitives';
import { useTranslation } from 'react-i18next';

export function ButtonExample() {
  const { t } = useTranslation();

  return <Button data-docs-primitive="button">{t('primitives.examples.nativeButton')}</Button>;
}
