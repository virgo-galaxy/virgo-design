import { Avatar } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './AvatarShapesExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  return (
    <div className={styles.root!}>
      <Avatar shape="circle" fallback="PK" aria-label={t('examples.avatar.copy.person')} />
      <Avatar shape="square" fallback="VD" aria-label={t('examples.avatar.copy.workspace')} />
    </div>
  );
}
