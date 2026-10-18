import { Avatar, type AvatarSize } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import { businessLabel } from '@/lib/formatting/business-labels';

import { useTaskCatalog } from '../context/resource';

export function Person({ id, size = 'md' }: { id: string; size?: AvatarSize }) {
  const { metadata } = useTaskCatalog();
  const { members: taskAssignees } = metadata;

  const { t, i18n } = useTranslation();
  const member = taskAssignees.find((person) => person.id === id);

  return (
    <span className="inline-flex gap-8 items-center text-text-secondary [font-size:var(--vd-font-size-12)] whitespace-nowrap">
      <Avatar
        src={member?.avatarUrl ?? ''}
        size={size}
        fallback={member?.initials ?? '?'}
        className="font-mono shrink-0"
      />
      <span>{member ? businessLabel(member.name, i18n.language) : t('shared.unassigned')}</span>
    </span>
  );
}
