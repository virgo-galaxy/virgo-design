import { Avatar } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './AvatarImageFallbackExample.module.scss';

// A self-contained image fixture. In an application, src can be any image URL.
const image = `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"><rect width="80" height="80" fill="#D1E9FF"/><circle cx="40" cy="29" r="14" fill="#1664F9"/><path d="M12 80v-8a28 28 0 0 1 56 0v8" fill="#1664F9"/></svg>')}`;

export default function App() {
  const { t } = useTranslation();

  return (
    <div className={styles.root!}>
      <Avatar src={image} alt={t('examples.avatar.copy.teamMember')} />
      <Avatar fallback="PK" aria-label={t('examples.avatar.copy.pokeya')} />
      <Avatar
        src="data:image/png;base64,broken"
        alt={t('examples.avatar.copy.unavailablePortrait')}
        fallback="BR"
      />
    </div>
  );
}
