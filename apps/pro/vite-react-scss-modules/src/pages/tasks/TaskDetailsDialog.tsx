import { CloseIcon } from '@virgo-design/icons';
import { Button, Dialog, Tag } from '@virgo-design/ui';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { useProData } from '@/application/pro-data-context';
import type { Task } from '@/data/tasks';
import { formatDueDate } from '@/data/workplace';

import {
  getTaskPriorityLabel,
  getTaskStatusLabel,
  taskLabelStyles,
  taskPriorityIntent,
  taskStatusIntent,
} from './task-presentation';
import styles from './TasksPage.module.scss';

export function TaskDetailsDialog({
  task,
  onEdit,
  onClose,
  restoreFocus,
}: {
  task: Task;
  onEdit: () => void;
  onClose: () => void;
  restoreFocus: () => void;
}) {
  const { t, i18n } = useTranslation();
  const { taskAssignees } = useProData();
  const editing = useRef(false);
  const assignee = taskAssignees.find((member) => member.id === task.assignee);
  return (
    <Dialog.Root
      open
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content
          size="md"
          className={`${styles.taskDialog} ${styles.taskDetailsDialog}`}
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            if (!editing.current) restoreFocus();
          }}
        >
          <Dialog.Header className={styles.dialogHeader}>
            <div className={styles.dialogHeading}>
              <span className={styles.eyebrow}>{task.id}</span>
              <Dialog.Title>{t('tasks.taskDetails')}</Dialog.Title>
              <Dialog.Description>{task.title}</Dialog.Description>
            </div>
            <Dialog.Close
              aria-label={t('tasks.close')}
              render={(props) => (
                <Button
                  {...props}
                  iconOnly
                  variant="text"
                  size="medium"
                  aria-label={t('tasks.close')}
                >
                  <CloseIcon />
                </Button>
              )}
            />
          </Dialog.Header>
          <Dialog.Body className={styles.taskDialogBody}>
            <dl className={styles.taskDetails}>
              <div className={styles.detailFullWidth}>
                <dt>{t('tasks.description')}</dt>
                <dd>{task.description || '—'}</dd>
              </div>
              <div>
                <dt>{t('tasks.status')}</dt>
                <dd>
                  <Tag
                    size="md"
                    intent={taskStatusIntent[task.status]}
                    className={taskLabelStyles.tag}
                  >
                    {getTaskStatusLabel(t, task.status)}
                  </Tag>
                </dd>
              </div>
              <div>
                <dt>{t('tasks.priority')}</dt>
                <dd>
                  <Tag
                    size="md"
                    variant="outline"
                    intent={taskPriorityIntent[task.priority]}
                    className={taskLabelStyles.tag}
                  >
                    {getTaskPriorityLabel(t, task.priority)}
                  </Tag>
                </dd>
              </div>
              <div>
                <dt>{t('tasks.project')}</dt>
                <dd>{task.project}</dd>
              </div>
              <div>
                <dt>{t('tasks.assignee')}</dt>
                <dd>{assignee?.name ?? t('tasks.unknownMember')}</dd>
              </div>
              <div>
                <dt>{t('tasks.estimatedHours')}</dt>
                <dd>
                  {task.estimateHours} {t('tasks.h')}
                </dd>
              </div>
              <div>
                <dt>{t('tasks.dueDate')}</dt>
                <dd>
                  {task.dueDate ? (
                    <time dateTime={task.dueDate}>
                      {formatDueDate(task.dueDate, i18n.language)}
                    </time>
                  ) : (
                    t('tasks.noDueDate')
                  )}
                </dd>
              </div>
              <div className={styles.detailFullWidth}>
                <dt>{t('tasks.createdAt')}</dt>
                <dd>
                  <time dateTime={task.createdAt}>
                    {new Intl.DateTimeFormat(i18n.language, {
                      dateStyle: 'medium',
                      timeStyle: 'short',
                      timeZone: 'UTC',
                    }).format(new Date(task.createdAt))}
                  </time>
                </dd>
              </div>
              <div>
                <dt>{t('tasks.completedAt')}</dt>
                <dd>
                  {task.completedAt ? (
                    <time dateTime={task.completedAt}>
                      {new Intl.DateTimeFormat(i18n.language, {
                        dateStyle: 'medium',
                        timeStyle: 'short',
                        timeZone: 'UTC',
                      }).format(new Date(task.completedAt))}
                    </time>
                  ) : (
                    '—'
                  )}
                </dd>
              </div>
            </dl>
          </Dialog.Body>
          <Button.Group layout="custom" render={(groupProps) => <Dialog.Footer {...groupProps} />}>
            <Dialog.Close size="medium">{t('tasks.close')}</Dialog.Close>
            <Button
              size="medium"
              onClick={() => {
                editing.current = true;
                onEdit();
              }}
            >
              {t('tasks.edit')}
            </Button>
          </Button.Group>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
