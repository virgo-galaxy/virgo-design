import { Avatar } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './AvatarImageFallbackExample.module.scss';
import { avatarImageFixture } from './fixtures';

export default function App() {
  const { t } = useTranslation();

  return (
    <div className={styles.root!}>
      <Avatar src={avatarImageFixture} alt={t('examples.avatar.copy.exampleAvatar')} />
      <Avatar fallback="DU" aria-label={t('examples.avatar.copy.demoUser')} />
      <Avatar
        src="data:image/png;base64,broken"
        alt={t('examples.avatar.copy.unavailablePortrait')}
        fallback="BR"
      />
    </div>
  );
}
