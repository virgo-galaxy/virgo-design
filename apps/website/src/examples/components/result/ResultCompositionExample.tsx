import { Button, Result } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './ResultCompositionExample.module.scss';
export default function App() {
  const { t } = useTranslation();
  return (
    <div className={styles.root}>
      <Result.Root status="success">
        <Result.Icon />
        <Result.Title>{t('components.result.title')}</Result.Title>
        <Result.Description>{t('components.result.support')}</Result.Description>
        <Result.Actions>
          <Button>{t('components.result.primary')}</Button>
          <Button variant="outline">{t('components.result.secondary')}</Button>
        </Result.Actions>
        <Result.Extra>{t('components.result.extra')}</Result.Extra>
      </Result.Root>
    </div>
  );
}
