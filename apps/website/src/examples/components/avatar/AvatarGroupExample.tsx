import './AvatarGroupExample.module.scss';

import { Avatar } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

export default function App() {
  const { t } = useTranslation();

  return (
    <Avatar.Group aria-label={t('examples.avatar.copy.exampleCollection')}>
      <Avatar fallback="DU" aria-label={t('examples.avatar.copy.demoUser')} />
      <Avatar fallback="EX" aria-label="Item A" />
      <Avatar fallback="AB" aria-label={t('examples.avatar.copy.exampleB')} />
    </Avatar.Group>
  );
}
