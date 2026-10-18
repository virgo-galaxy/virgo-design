import { Avatar, type AvatarSize, Button, Popover, Skeleton, Tag } from '@virgo-design/ui';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import type { MemberDto } from '@/api/tasks/types';
import type { UserDetailsDto } from '@/api/users/types';
import { UserGenderIcon } from '@/components/display/user-gender-icon';
import { projectName, useTaskCatalog } from '@/features/catalog';
import { userDetailsCache } from '@/features/users';
import { businessLabel, formatWorkLocation } from '@/lib/formatting/business-labels';

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
      <div
        className="flex items-center gap-16 [min-height:232px]"
        role="status"
        aria-label={t('tasks.userCard.loading')}
      >
        <Skeleton variant="circle" className="shrink-0 [width:56px] [height:56px]" />
        <div className="grid [flex:1] gap-12">
          <Skeleton variant="text" />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
        </div>
      </div>
    );

  if (resource.status === 'error')
    return (
      <div className="[&_p]:m-0 [&_p]:text-text-secondary grid [justify-items:start] gap-12 [min-height:120px]">
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
    <div className="grid gap-16">
      <div className="flex items-center gap-12">
        <Avatar
          src={user.avatarUrl}
          alt={businessLabel(user.name, i18n.language)}
          fallback={user.initials}
          size="lg"
          className="shrink-0 [width:56px] [height:56px]"
        />
        <div
          className={[
            '[&_strong]:flex [&_strong]:items-center [&_strong]:gap-8 [&_strong]:text-text-primary [&_strong]:text-(length:--vd-font-size-16)',
            '[&_strong]:[font-weight:var(--vd-font-weight-600)]',
            'grid min-w-0 gap-4 text-text-secondary [font-size:var(--vd-font-size-12)]',
          ].join(' ')}
        >
          <strong>
            {businessLabel(user.name, i18n.language)}
            <UserGenderIcon gender={user.gender} />
          </strong>
          <span>{businessLabel(user.jobTitle, i18n.language)}</span>
          <span className="text-text-tertiary tabular-nums">
            {t('tasks.userCard.employeeNumber')} · {user.employeeNumber}
          </span>
        </div>
      </div>
      <dl
        className={[
          '[border-block:var(--vd-stroke-width,_var(--vd-border-width-1))_solid_var(--vd-border-default)]',
          '[&_>_div]:grid [&_>_div]:[grid-template-columns:92px_minmax(0,_1fr)] [&_>_div]:gap-12 [&_dt]:text-text-tertiary [&_dd]:m-0',
          '[&_dd]:text-text-primary [&_dd]:wrap-anywhere [&_a]:[color:inherit] [&_a]:no-underline [&_a:hover]:text-brand-link [&_a:hover]:underline',
          '[&_a:focus-visible]:[outline:var(--vd-border-width-2)_solid_var(--vd-border-focus)]',
          '[&_a:focus-visible]:[outline-offset:var(--vd-spacing-2)]',
          'grid gap-12 m-0 py-16',
        ].join(' ')}
      >
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
        <div className="[&_>_span]:text-text-tertiary [&_>_div]:flex [&_>_div]:flex-wrap [&_>_div]:gap-8 grid gap-8">
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
      <div className="[&_>_span]:text-text-tertiary [&_>_div]:flex [&_>_div]:flex-wrap [&_>_div]:gap-8 grid gap-8">
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
        render={(props) => (
          <button
            {...props}
            className={[
              '[border:0] [border-radius:var(--vd-shape-radius-4,_var(--vd-radius-4))] [background:transparent]',
              '[transition:color_var(--vd-motion-interaction-duration,_var(--vd-duration-120))_var(--vd-motion-easing-standard,_var(--vd-easing-standard))]',
              '[&_>_span:last-child]:min-w-0 [&_>_span:last-child]:overflow-hidden [&_>_span:last-child]:text-ellipsis hover:text-text-primary',
              "[&[aria-expanded='true']]:text-text-primary focus-visible:[outline:var(--vd-border-width-2)_solid_var(--vd-border-focus)]",
              'focus-visible:[outline-offset:var(--vd-spacing-4)]',
              'inline-flex items-center gap-8 [max-width:100%] p-0 text-text-secondary [font:inherit] text-start whitespace-nowrap [cursor:pointer]',
            ].join(' ')}
          />
        )}
      >
        <Avatar
          src={member.avatarUrl ?? ''}
          size={size}
          fallback={member.initials}
          className="shrink-0 font-mono"
        />
        <span title={businessLabel(member.name, i18n.language)}>
          {businessLabel(member.name, i18n.language)}
        </span>
      </Popover.Trigger>
      <Popover.Content
        data-user-card=""
        placement="bottomStart"
        className="[width:340px] [max-width:calc(100vw_-_32px)] p-20 text-(length:--vd-font-size-14)"
        aria-label={t('tasks.userCard.label', { name: businessLabel(member.name, i18n.language) })}
      >
        {open ? <UserCardDetails key={member.id} userId={member.id} /> : null}
      </Popover.Content>
    </Popover>
  );
}
