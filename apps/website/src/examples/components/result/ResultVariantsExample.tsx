import { Button, Result } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './ResultVariantsExample.module.scss';
export default function App() {
  const { t } = useTranslation();
  const titles = {
    success: t('components.result.success'),
    error: t('components.result.error'),
    warning: t('components.result.warning'),
    info: t('components.result.info'),
    '403': t('components.result.403'),
    '404': t('components.result.404'),
    '500': t('components.result.500'),
  };
  return (
    <div className={styles.root}>
      {(['success', 'error', 'warning', 'info', '403', '404', '500'] as const).map((status) => (
        <Result
          key={status}
          status={status}
          title={titles[status]}
          description={t('components.result.support')}
          primaryAction={<Button size="small">{t('components.result.primary')}</Button>}
        />
      ))}
    </div>
  );
}
