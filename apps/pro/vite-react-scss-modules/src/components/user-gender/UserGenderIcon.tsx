import { GenderFemaleIcon, GenderMaleIcon } from '@virgo-design/icons';
import { useTranslation } from 'react-i18next';

import type { UserGender } from '@/contracts/users';

import styles from './UserGenderIcon.module.scss';

export function UserGenderIcon({ gender }: { gender?: UserGender | undefined }) {
  const { t } = useTranslation();

  if (!gender) return null;

  const Icon = gender === 'female' ? GenderFemaleIcon : GenderMaleIcon;
  const label = t(`shared.gender.${gender}`);

  return (
    <span className={styles.icon} data-gender={gender} role="img" aria-label={label} title={label}>
      <Icon size={16} />
    </span>
  );
}
