import './AvatarGroupExample.module.scss';

import { Avatar } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

export default function App() {
  const { t } = useTranslation();

  return (
    <Avatar.Group aria-label={t('examples.avatar.copy.projectMembers')}>
      <Avatar fallback="PK" aria-label={t('examples.avatar.copy.pokeya')} />
      <Avatar fallback="VD" aria-label="Virgo Design" />
      <Avatar fallback="UI" aria-label={t('examples.avatar.copy.uiTeam')} />
    </Avatar.Group>
  );
}
