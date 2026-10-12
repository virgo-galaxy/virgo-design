import './AvatarPresenceExample.module.scss';

import { Avatar, Badge } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

export default function App() {
  const { t } = useTranslation();

  return (
    <Badge dot intent="success" aria-label={t('examples.avatar.copy.online')}>
      <Avatar fallback="DU" aria-label={t('examples.avatar.copy.demoUser')} />
    </Badge>
  );
}
