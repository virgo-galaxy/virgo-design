import { Button, Separator } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { readAllNotifications, readNotification } from '@/api/notifications';
import { taskDetailsPath } from '@/features/tasks';
import { businessLabel } from '@/lib/demo/labels';
import { MutationFeedback } from '@/shared/async/MutationFeedback';
import { RemoteState } from '@/shared/async/RemoteState';
import { useMutation } from '@/shared/async/use-mutation';

import styles from './NotificationInbox.module.scss';
import type { useNotificationInbox } from './use-notification-inbox';
export function NotificationInbox({
  inbox,
  onNavigate,
}: {
  inbox: ReturnType<typeof useNotificationInbox>;
  onNavigate: () => void;
}) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const mutation = useMutation();
  return (
    <div>
      <div className={styles.heading}>
        <strong>
          {t('notifications.title')} {inbox.data?.unreadCount ? `(${inbox.data.unreadCount})` : ''}
        </strong>
        <Button
          size="small"
          variant="text"
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
        <ul className={styles.list}>
          {!inbox.data.items.length ? (
            <li className={styles.empty}>{t('notifications.inbox.empty')}</li>
          ) : (
            inbox.data.items.map((item) => (
              <li key={item.id} data-unread={!item.readAt || undefined}>
                <Button
                  variant="text"
                  className={styles.item}
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
                  <span className={styles.itemHeading}>
                    <span className={styles.dot} aria-hidden="true" />
                    <strong>{t(`notifications.inbox.kinds.${item.kind}`)}</strong>
                  </span>
                  <span className={styles.task}>
                    {item.kind === 'welcome'
                      ? t('notifications.inbox.welcome')
                      : businessLabel(item.taskTitle, i18n.language)}
                  </span>
                  <span className={styles.meta}>
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
                    <span className={styles.unavailable}>
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
