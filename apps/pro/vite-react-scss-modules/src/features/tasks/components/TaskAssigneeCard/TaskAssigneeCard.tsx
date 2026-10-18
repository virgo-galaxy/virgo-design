import { Avatar, type AvatarSize, Button, Popover, Skeleton, Tag } from '@virgo-design/ui';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import type { MemberDto } from '@/api/tasks/types';
import type { UserDetailsDto } from '@/api/users/types';
import { UserGenderIcon } from '@/components/user-gender-icon/UserGenderIcon';
import { projectName, useTaskCatalog } from '@/features/catalog';
import { userDetailsCache } from '@/features/users';
import { businessLabel, formatWorkLocation } from '@/lib/formatting/business-labels';

import styles from './TaskAssigneeCard.module.scss';

type Resource =
  { status: 'loading' } | { status: 'error' } | { status: 'ready'; data: UserDetailsDto };

function UserCardDetails({ userId }: { userId: string }) {
  const { t, i18n } = useTranslation();
  const { projects } = useTaskCatalog();
  const [resource, setResource] = useState<Resource>(() => {
    const data = userDetailsCache.peek(userId);

    return data ? { status: 'ready', data } : { status: 'loading' };
  });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let active = true;

    void userDetailsCache.get(userId).then(
      (data) => {
        if (active) setResource({ status: 'ready', data });
      },
      () => {
        if (active) setResource({ status: 'error' });
      },
    );

    return () => {
      active = false;
    };
  }, [userId, attempt]);

  if (resource.status === 'loading')
    return (
      <div className={styles.loading} role="status" aria-label={t('tasks.userCard.loading')}>
        <Skeleton variant="circle" className={styles.photo} />
        <div className={styles.loadingLines}>
          <Skeleton variant="text" />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
        </div>
      </div>
    );

  if (resource.status === 'error')
    return (
      <div className={styles.error}>
        <p role="alert">{t('tasks.userCard.failed')}</p>
        <Button
          size="small"
          variant="outline"
          onClick={() => {
            setResource({ status: 'loading' });
            setAttempt((value) => value + 1);
          }}
        >
          {t('tasks.userCard.retry')}
        </Button>
      </div>
    );

  const user = resource.data;

  return (
    <div className={styles.details}>
      <div className={styles.identity}>
        <Avatar
          src={user.avatarUrl}
          alt={businessLabel(user.name, i18n.language)}
          fallback={user.initials}
          size="lg"
          className={styles.photo}
        />
        <div className={styles.heading}>
          <strong>
            {businessLabel(user.name, i18n.language)}
            <UserGenderIcon gender={user.gender} />
          </strong>
          <span>{businessLabel(user.jobTitle, i18n.language)}</span>
          <span className={styles.employeeNumber}>
            {t('tasks.userCard.employeeNumber')} · {user.employeeNumber}
          </span>
        </div>
      </div>
      <dl className={styles.fields}>
        {user.workLocation ? (
          <div>
            <dt>{t('shared.workLocation')}</dt>
            <dd>{formatWorkLocation(user.workLocation, i18n.language)}</dd>
          </div>
        ) : null}
        <div>
          <dt>{t('tasks.userCard.department')}</dt>
          <dd>{businessLabel(user.department, i18n.language)}</dd>
        </div>
        <div>
          <dt>{t('tasks.userCard.phone')}</dt>
          <dd>
            <a href={`tel:${user.phone.replaceAll(' ', '')}`}>{user.phone}</a>
          </dd>
        </div>
        <div>
          <dt>{t('tasks.userCard.email')}</dt>
          <dd>
            <a href={`mailto:${user.email}`}>{user.email}</a>
          </dd>
        </div>
      </dl>
      {user.managedProjects?.length ? (
        <div className={styles.projects}>
          <span>{t('tasks.userCard.managedProjects')}</span>
          <div>
            {user.managedProjects.map((project) => (
              <Tag key={project} size="sm">
                {businessLabel(projectName(project, projects), i18n.language)}
              </Tag>
            ))}
          </div>
        </div>
      ) : null}
      <div className={styles.projects}>
        <span>{t('tasks.userCard.projects')}</span>
        <div>
          {user.projects.map((project) => (
            <Tag key={project} size="sm">
              {businessLabel(projectName(project, projects), i18n.language)}
            </Tag>
          ))}
        </div>
      </div>
    </div>
  );
}

export function TaskAssigneeCard({ member, size }: { member: MemberDto; size: AvatarSize }) {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  return (
    <Popover
      trigger="hover"
      open={open}
      onOpenChange={(next) => {
        clearTimeout(timer.current);
        if (next) timer.current = setTimeout(() => setOpen(true), 250);
        else setOpen(false);
      }}
      autoFocus={false}
      restoreFocusOnClose={false}
    >
      <Popover.Trigger
        aria-label={t('tasks.userCard.view', { name: businessLabel(member.name, i18n.language) })}
        onPointerLeave={() => clearTimeout(timer.current)}
        onBlur={(event) => {
          if (!(event.relatedTarget as HTMLElement | null)?.closest('[data-user-card]')) {
            clearTimeout(timer.current);
            setOpen(false);
          }
        }}
        render={(props) => <button {...props} className={styles.trigger} />}
      >
        <Avatar
          src={member.avatarUrl ?? ''}
          size={size}
          fallback={member.initials}
          className={styles.avatar}
        />
        <span title={businessLabel(member.name, i18n.language)}>
          {businessLabel(member.name, i18n.language)}
        </span>
      </Popover.Trigger>
      <Popover.Content
        data-user-card=""
        placement="bottomStart"
        className={styles.card}
        aria-label={t('tasks.userCard.label', { name: businessLabel(member.name, i18n.language) })}
      >
        {open ? <UserCardDetails key={member.id} userId={member.id} /> : null}
      </Popover.Content>
    </Popover>
  );
}
