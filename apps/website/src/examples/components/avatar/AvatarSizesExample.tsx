import { Avatar } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './AvatarSizesExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  return (
    <div className={styles.root!}>
      <Avatar size="sm" fallback="S" aria-label={t('examples.avatar.copy.smallAvatar')} />
      <Avatar size="md" fallback="M" aria-label={t('examples.avatar.copy.mediumAvatar')} />
      <Avatar size="lg" fallback="L" aria-label={t('examples.avatar.copy.largeAvatar')} />
    </div>
  );
}
