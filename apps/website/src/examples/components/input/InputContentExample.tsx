import { Input } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './InputContentExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  return (
    <div className={styles.root!}>
      <Input
        aria-label={t('examples.input.copy.projectName')}
        placeholder={t('examples.input.copy.untitledProject')}
      />
      <Input aria-label={t('examples.input.copy.workspaceName')} defaultValue="Virgo Design" />
    </div>
  );
}
