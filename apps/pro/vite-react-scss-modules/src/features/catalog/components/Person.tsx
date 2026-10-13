import { Avatar, type AvatarSize } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import { businessLabel } from '@/lib/demo/labels';

import { useTaskCatalog } from '../resource';
import styles from './Person.module.scss';

export function Person({ id, size = 'md' }: { id: string; size?: AvatarSize }) {
  const { metadata } = useTaskCatalog();
  const { members: taskAssignees } = metadata;

  const { t, i18n } = useTranslation();
  const member = taskAssignees.find((person) => person.id === id);
  return (
    <span className={styles.person}>
      <Avatar
        src={member?.avatarUrl ?? ''}
        size={size}
        fallback={member?.initials ?? '?'}
        className={styles.avatar}
      />
      <span>{member ? businessLabel(member.name, i18n.language) : t('shared.unassigned')}</span>
    </span>
  );
}
