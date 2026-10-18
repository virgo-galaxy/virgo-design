import { GenderFemaleIcon, GenderMaleIcon } from '@virgo-design/icons';
import { useTranslation } from 'react-i18next';

import type { UserGender } from '@/api/users/types';

interface UserGenderIconProps {
  gender?: UserGender | undefined;
}

export function UserGenderIcon({ gender }: UserGenderIconProps) {
  const { t } = useTranslation();

  if (!gender) return null;

  const Icon = gender === 'female' ? GenderFemaleIcon : GenderMaleIcon;
  const label = t(`shared.gender.${gender}`);

  return (
    <span
      className={[
        'data-[gender=female]:[color:#c9367c] data-[gender=male]:[color:#2169cb]',
        "[[data-theme='dark']_&[data-gender='female']]:[color:#f588b7] [[data-theme='dark']_&[data-gender='male']]:[color:#78b0ff]",
        'inline-flex items-center [flex-shrink:0] [vertical-align:middle]',
      ].join(' ')}
      data-gender={gender}
      role="img"
      aria-label={label}
      title={label}
    >
      <Icon size={16} />
    </span>
  );
}
