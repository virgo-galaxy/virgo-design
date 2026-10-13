import { Button, Dialog } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import { MutationFeedback } from '@/shared/async/MutationFeedback';
import { useMutation } from '@/shared/async/use-mutation';

import taskActions from './TaskActions.module.scss';

export function TaskDeleteDialog({
  ids,
  onDelete,
  onClose,
  restoreFocus,
}: {
  ids: readonly string[];
  onDelete: (ids: readonly string[]) => Promise<void>;
  onClose: () => void;
  restoreFocus: () => void;
}) {
  const { t } = useTranslation();
  const mutation = useMutation();
  const close = () => {
    if (!mutation.pending) onClose();
  };
  return (
    <Dialog.Root
      open
      onOpenChange={(open) => {
        if (!open) close();
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content
          size="sm"
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            restoreFocus();
          }}
        >
          <Dialog.Header>
            <Dialog.Title>{t('tasks.deleteTasksTitle')}</Dialog.Title>
            <Dialog.Description>
              {t('tasks.deleteTasksDescription', { count: ids.length })}
            </Dialog.Description>
          </Dialog.Header>
          {mutation.error ? (
            <Dialog.Body>
              <MutationFeedback
                pending={false}
                error={mutation.error}
                title={t('tasks.deleteError')}
              />
            </Dialog.Body>
          ) : null}
          <Button.Group layout="custom" render={(groupProps) => <Dialog.Footer {...groupProps} />}>
            <Button variant="outline" size="medium" disabled={mutation.pending} onClick={close}>
              {t('tasks.cancel')}
            </Button>
            <Button
              className={taskActions.deleteButton}
              size="medium"
              disabled={mutation.pending}
              onClick={() => {
                void mutation.run(async () => {
                  await onDelete(ids);
                  onClose();
                });
              }}
            >
              {t('tasks.deleteSelected')}
            </Button>
          </Button.Group>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
