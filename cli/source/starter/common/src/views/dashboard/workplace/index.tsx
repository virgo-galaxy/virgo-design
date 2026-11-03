import { Surface } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import { PageHeading } from '@/components/PageHeading';
import * as classes from '@/styles/classes';

export function WorkplacePage() {
  const { t } = useTranslation();

  return (
    <Surface border="default" radius={8} className={classes.workplace}>
      <PageHeading
        title={t('app.workplace')}
        description={t('workplaceDescription')}
        variant="integrated"
      />
    </Surface>
  );
}
