import { LayoutIcon } from '@virgo-design/icons';
import { Button, Empty } from '@virgo-design/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './EmptyActionExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  const [created, setCreated] = useState(false);

  return created ? (
    <div className={styles.root!}>
      <p role="status">{t('examples.empty.copy.documentCreated')}</p>
      <Button variant="outline" onClick={() => setCreated(false)}>
        {t('examples.empty.copy.resetExample')}
      </Button>
    </div>
  ) : (
    <Empty aria-label={t('examples.empty.copy.documentsEmptyState')}>
      <Empty.Icon>
        <LayoutIcon />
      </Empty.Icon>
      <Empty.Title>{t('examples.empty.copy.noDocuments')}</Empty.Title>
      <Empty.Description>
        {t('examples.empty.copy.createYourFirstDocumentToGetStarted')}
      </Empty.Description>
      <Empty.Action>
        <Button onClick={() => setCreated(true)}>{t('examples.empty.copy.createDocument')}</Button>
      </Empty.Action>
    </Empty>
  );
}
