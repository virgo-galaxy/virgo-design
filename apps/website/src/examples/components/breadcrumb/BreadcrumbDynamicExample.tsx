import { Breadcrumb, Input } from '@virgo-design/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './BreadcrumbDynamicExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  const [userId, setUserId] = useState('1');

  return (
    <div className={styles.root!}>
      <Input
        aria-label={t('examples.breadcrumb.copy.userIdentifier')}
        value={userId}
        onChange={(event) => setUserId(event.target.value)}
      />
      <Breadcrumb>
        <Breadcrumb.Item href="#users">{t('examples.breadcrumb.copy.users')}</Breadcrumb.Item>
        <Breadcrumb.Item>{userId || t('examples.breadcrumb.details.newUser')}</Breadcrumb.Item>
      </Breadcrumb>
    </div>
  );
}
