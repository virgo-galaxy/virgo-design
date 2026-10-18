import { MailIcon, MailOpenIcon } from '@virgo-design/icons';
import { Button, Separator } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import { readAllNotifications, readNotification } from '@/api/notifications';
import { MutationFeedback } from '@/components/feedback/mutation-feedback';
import { RemoteState } from '@/components/feedback/remote-state';
import { taskDetailsPath } from '@/features/tasks';
import { useMutation } from '@/hooks/async/use-mutation';
import { businessLabel } from '@/lib/formatting/business-labels';
import { useAppNavigation } from '@/routes/navigation';

import type { useNotificationInbox } from '../hooks/use-notification-inbox';

export function NotificationInbox({
  inbox,
  onNavigate,
}: {
  inbox: ReturnType<typeof useNotificationInbox>;
  onNavigate: () => void;
}) {
  const { t, i18n } = useTranslation();
  const navigate = useAppNavigation();
  const mutation = useMutation();

  return (
    <div>
      <div className="flex items-center justify-between [gap:12px] [margin-bottom:12px]">
        <strong>
          {t('notifications.title')} {inbox.data?.unreadCount ? `(${inbox.data.unreadCount})` : ''}
        </strong>
        <Button
          size="small"
          variant="text"
          leadingIcon={<MailOpenIcon size={16} />}
          disabled={!inbox.data?.unreadCount || mutation.pending}
          onClick={() =>
            void mutation.run(async () => {
              await readAllNotifications();
              inbox.retry();
            })
          }
        >
          {t('notifications.inbox.readAll')}
        </Button>
      </div>
      <MutationFeedback pending={mutation.pending} error={mutation.error} />
      {inbox.error || !inbox.data ? (
        <RemoteState loading={inbox.loading} error={inbox.error} retry={inbox.retry} />
      ) : null}
      <Separator decorative />
      {inbox.data ? (
        <ul className="[&_li_+_li]:[border-top:1px_solid_var(--vd-border-subtle)] [list-style:none] p-0 m-0 [max-height:min(440px,_65dvh)] overflow-auto">
          {!inbox.data.items.length ? (
            <li className="[padding:28px_12px] text-center text-text-secondary">
              {t('notifications.inbox.empty')}
            </li>
          ) : (
            inbox.data.items.map((item) => (
              <li key={item.id} data-unread={!item.readAt || undefined}>
                <Button
                  variant="text"
                  className={[
                    'data-[variant=text]:[height:auto] data-[variant=text]:whitespace-normal',
                    "[&[data-variant='text']_[data-slot='label']]:grid [&[data-variant='text']_[data-slot='label']]:[justify-items:start]",
                    "[&[data-variant='text']_[data-slot='label']]:gap-6 [&[data-variant='text']_[data-slot='label']]:w-full",
                    'data-[variant=text]:flex data-[variant=text]:flex-col data-[variant=text]:items-start data-[variant=text]:[gap:6px]',
                    'data-[variant=text]:text-start data-[variant=text]:w-full data-[variant=text]:[padding:14px_6px] data-[variant=text]:[border:0]',
                    'data-[variant=text]:[background:transparent] data-[variant=text]:text-text-primary data-[variant=text]:cursor-pointer',
                    'data-[variant=text]:[border-radius:4px]',
                    "[&[data-variant='text']:hover]:bg-surface-secondary focus-visible:[outline:2px_solid_var(--vd-brand-primary)]",
                    'focus-visible:[outline-offset:-2px]',
                  ].join(' ')}
                  type="button"
                  disabled={mutation.pending}
                  onClick={() =>
                    void mutation.run(async () => {
                      if (!item.readAt) await readNotification(item.id);

                      inbox.retry();

                      if (item.available && item.taskId) {
                        onNavigate();
                        navigate(taskDetailsPath(item.taskId));
                      }
                    })
                  }
                >
                  <span className="flex items-center [gap:8px] [font-size:13px]">
                    <span
                      className="[li[data-unread]_&]:text-brand-primary inline-flex text-text-secondary [flex-shrink:0]"
                      role="img"
                      aria-label={t(
                        item.readAt ? 'notifications.inbox.read' : 'notifications.inbox.unread',
                      )}
                    >
                      {item.readAt ? <MailOpenIcon size={16} /> : <MailIcon size={16} />}
                    </span>
                    <strong>{t(`notifications.inbox.kinds.${item.kind}`)}</strong>
                  </span>
                  <span className="[font-size:13px] [line-height:1.6] [padding-inline-start:24px]">
                    {item.kind === 'welcome'
                      ? t('notifications.inbox.welcome')
                      : businessLabel(item.taskTitle, i18n.language)}
                  </span>
                  <span className="[font-size:12px] text-text-secondary [padding-inline-start:24px]">
                    {businessLabel(item.projectName, i18n.language)}
                    {item.project ? ' · ' : ''}
                    <time dateTime={item.createdAt}>
                      {new Intl.DateTimeFormat(i18n.language, {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      }).format(new Date(item.createdAt))}
                    </time>
                  </span>
                  {item.taskId && !item.available ? (
                    <span className="[font-size:12px] text-text-secondary [padding-inline-start:24px]">
                      {t('notifications.inbox.unavailable')}
                    </span>
                  ) : null}
                </Button>
              </li>
            ))
          )}
        </ul>
      ) : null}
    </div>
  );
}
