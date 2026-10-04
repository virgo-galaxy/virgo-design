import { ArrowRightIcon, CloseIcon } from '@virgo-design/icons';
import {
  Alert,
  Button,
  DatePicker,
  Dialog,
  Field,
  Form,
  Input,
  Select,
  Tag,
  Textarea,
  Tooltip,
} from '@virgo-design/ui';
import { useId, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { MutationFeedback } from '@/application/MutationFeedback';
import { useProData } from '@/application/pro-data-context';
import { useMutation } from '@/application/use-mutation';
import {
  draftHasChanges,
  emptyTaskDraft,
  isTaskPriority,
  isTaskStatus,
  nextTaskStatus,
  normalizeTaskDraft,
  type Task,
  type TaskDraft,
  taskDraft,
  type TaskErrors,
  taskPriorities,
  taskStatuses,
  validateTask,
} from '@/data/tasks';
import { getTaskPriorityLabel, getTaskStatusLabel } from '@/pages/tasks/task-presentation';

import { taskLabelStyles, taskStatusIntent } from './task-presentation';
import styles from './TasksPage.module.scss';

export function TaskDialog({
  task,
  hiddenByFilters,
  onSave,
  onStatusChange,
  onClose,
  restoreFocus,
}: {
  task: Task | undefined;
  hiddenByFilters: boolean;
  onSave: (draft: TaskDraft) => Promise<void>;
  onStatusChange: (status: Task['status']) => Promise<void>;
  onClose: () => void;
  restoreFocus: () => void;
}) {
  const { taskAssignees, taskProjects } = useProData();

  const mutation = useMutation();
  const { t, i18n } = useTranslation();
  const [draft, setDraft] = useState<TaskDraft>(() =>
    task ? taskDraft(task) : { ...emptyTaskDraft },
  );
  const [errors, setErrors] = useState<TaskErrors>({});
  const [confirmDiscard, setConfirmDiscard] = useState(false);
  const [statusHintOpen, setStatusHintOpen] = useState(false);
  const formId = useId();
  const titleRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const dirty = draftHasChanges(draft, task ? taskDraft(task) : emptyTaskDraft);
  const nextStatus = task ? nextTaskStatus(task.status) : undefined;
  const requestClose = () => {
    if (mutation.pending) return;
    if (dirty) setConfirmDiscard(true);
    else onClose();
  };
  const update = <Key extends keyof TaskDraft>(key: Key, value: TaskDraft[Key]) => {
    setDraft((current) => ({ ...current, [key]: value }));
    setConfirmDiscard(false);
    setErrors((current) => {
      const next = { ...current };
      delete next[key];
      return next;
    });
  };

  return (
    <Dialog.Root
      open
      onOpenChange={(open) => {
        if (!open) requestClose();
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content
          size="md"
          className={styles.taskDialog}
          onOpenAutoFocus={(event) => {
            event.preventDefault();
            titleRef.current?.focus();
          }}
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            restoreFocus();
          }}
        >
          <Dialog.Header className={styles.dialogHeader}>
            <div className={styles.dialogHeading}>
              <span className={styles.eyebrow}>
                {task ? task.id : t('tasks.planTheNextDelivery')}
              </span>
              <Dialog.Title>{task ? t('tasks.editTask') : t('tasks.newTask')}</Dialog.Title>
              <Dialog.Description>
                {task
                  ? t('tasks.createdDescription', {
                      date: new Intl.DateTimeFormat(i18n.language, {
                        dateStyle: 'medium',
                        timeZone: 'UTC',
                      }).format(new Date(task.createdAt)),
                    })
                  : t('tasks.giveTheWorkAClearOwnerAPriorityAnd')}
              </Dialog.Description>
            </div>
            <Dialog.Close
              aria-label={t('tasks.closeTaskEditor')}
              render={(buttonProps) => (
                <Button
                  {...buttonProps}
                  aria-label={t('tasks.closeTaskEditor')}
                  size="medium"
                  variant="text"
                  iconOnly
                >
                  <CloseIcon />
                </Button>
              )}
            />
          </Dialog.Header>
          <Dialog.Body className={styles.taskDialogBody}>
            <MutationFeedback pending={mutation.pending} error={mutation.error} />
            {task ? (
              <div className={styles.workflow}>
                <div>
                  <Tag
                    intent={taskStatusIntent[task.status]}
                    className={taskLabelStyles.tag}
                    size="md"
                  >
                    {getTaskStatusLabel(t, task.status)}
                  </Tag>
                  <span>{t('tasks.savedStatus')}</span>
                </div>
                {nextStatus ? (
                  <Tooltip open={dirty && statusHintOpen} onOpenChange={setStatusHintOpen}>
                    <Tooltip.Trigger
                      disabled={dirty || mutation.pending}
                      onClick={() => {
                        void mutation.run(async () => {
                          await onStatusChange(nextStatus);
                          setDraft((current) => ({ ...current, status: nextStatus }));
                        });
                      }}
                      render={(props) => (
                        <Button
                          {...props}
                          size="medium"
                          variant="outline"
                          trailingIcon={<ArrowRightIcon />}
                        >
                          {t('tasks.moveToValue', { v0: nextStatus })}
                        </Button>
                      )}
                    />
                    <Tooltip.Content>
                      {t('tasks.saveYourEditsBeforeAdvancingTheTask')}
                    </Tooltip.Content>
                  </Tooltip>
                ) : (
                  <span className={styles.completedNote}>{t('tasks.readyForTheNextDelivery')}</span>
                )}
              </div>
            ) : null}
            {hiddenByFilters ? (
              <Alert intent="info">
                <Alert.Content>
                  <Alert.Title>{t('tasks.savedButOutsideThisView')}</Alert.Title>
                  <Alert.Description>
                    {t('tasks.thisTaskNoLongerMatchesYourCurrentFiltersYour')}
                  </Alert.Description>
                </Alert.Content>
              </Alert>
            ) : null}
            <Form
              inert={mutation.pending}
              aria-busy={mutation.pending}
              id={formId}
              ref={formRef}
              size="medium"
              noValidate
              className={styles.taskForm}
              onSubmit={(event) => {
                event.preventDefault();
                const nextErrors = validateTask(
                  draft,
                  taskProjects,
                  taskAssignees.map((member) => member.id),
                );
                setErrors(nextErrors);
                if (Object.keys(nextErrors).length) {
                  requestAnimationFrame(() =>
                    formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus(),
                  );
                  return;
                }
                const normalized = normalizeTaskDraft(draft);
                void mutation.run(async () => {
                  await onSave(normalized);
                  setDraft(normalized);
                  setConfirmDiscard(false);
                  if (task) requestAnimationFrame(() => titleRef.current?.focus());
                });
              }}
            >
              <div className={styles.taskEditorContent}>
                <Field required invalid={Boolean(errors.title)}>
                  <Field.Label>{t('tasks.title')}</Field.Label>
                  <Input
                    ref={titleRef}
                    name="title"
                    value={draft.title}
                    onChange={(event) => update('title', event.target.value)}
                    placeholder={t('tasks.whatNeedsToBeDone')}
                  />
                  {errors.title ? (
                    <Field.Message>{t(`tasks.validation.${errors.title}`)}</Field.Message>
                  ) : (
                    <Field.Description>
                      {t('tasks.keepItSpecificAndWithin120Characters')}
                    </Field.Description>
                  )}
                </Field>
                <Field invalid={Boolean(errors.description)}>
                  <Field.Label>{t('tasks.description')}</Field.Label>
                  <Textarea
                    name="description"
                    rows={6}
                    value={draft.description}
                    onChange={(event) => update('description', event.target.value)}
                    placeholder={t('tasks.contextAcceptanceCriteriaOrTheNextStep')}
                  />
                  {errors.description ? (
                    <Field.Message>{t(`tasks.validation.${errors.description}`)}</Field.Message>
                  ) : (
                    <Field.Description>{t('tasks.optionalUpTo2000Characters')}</Field.Description>
                  )}
                </Field>
              </div>
              <div className={styles.formGrid}>
                <Field required invalid={Boolean(errors.status)}>
                  <Field.Label>{t('tasks.status')}</Field.Label>
                  <Select
                    name="status"
                    value={draft.status}
                    onValueChange={(value) => {
                      if (isTaskStatus(value)) update('status', value);
                    }}
                  >
                    <Select.Trigger />
                    <Select.Content>
                      {taskStatuses.map((status) => (
                        <Select.Option value={status} key={status}>
                          {getTaskStatusLabel(t, status)}
                        </Select.Option>
                      ))}
                    </Select.Content>
                  </Select>
                  {errors.status ? (
                    <Field.Message>{t(`tasks.validation.${errors.status}`)}</Field.Message>
                  ) : null}
                </Field>
                <Field required invalid={Boolean(errors.priority)}>
                  <Field.Label>{t('tasks.priority')}</Field.Label>
                  <Select
                    name="priority"
                    value={draft.priority}
                    onValueChange={(value) => {
                      if (isTaskPriority(value)) update('priority', value);
                    }}
                  >
                    <Select.Trigger />
                    <Select.Content>
                      {taskPriorities.map((priority) => (
                        <Select.Option value={priority} key={priority}>
                          {getTaskPriorityLabel(t, priority)}
                        </Select.Option>
                      ))}
                    </Select.Content>
                  </Select>
                  {errors.priority ? (
                    <Field.Message>{t(`tasks.validation.${errors.priority}`)}</Field.Message>
                  ) : null}
                </Field>
                <Field required invalid={Boolean(errors.project)}>
                  <Field.Label>{t('tasks.project')}</Field.Label>
                  <Select
                    name="project"
                    value={draft.project}
                    onValueChange={(value) => update('project', value)}
                  >
                    <Select.Trigger placeholder={t('tasks.chooseAProject')} />
                    <Select.Content>
                      {taskProjects.map((project) => (
                        <Select.Option value={project} key={project}>
                          {project}
                        </Select.Option>
                      ))}
                    </Select.Content>
                  </Select>
                  {errors.project ? (
                    <Field.Message>{t(`tasks.validation.${errors.project}`)}</Field.Message>
                  ) : null}
                </Field>
                <Field required invalid={Boolean(errors.assignee)}>
                  <Field.Label>{t('tasks.assignee')}</Field.Label>
                  <Select
                    name="assignee"
                    value={draft.assignee}
                    onValueChange={(value) => update('assignee', value)}
                  >
                    <Select.Trigger placeholder={t('tasks.chooseAnAssignee')} />
                    <Select.Content>
                      {taskAssignees.map((member) => (
                        <Select.Option value={member.id} key={member.id}>
                          {member.name}
                        </Select.Option>
                      ))}
                    </Select.Content>
                  </Select>
                  {errors.assignee ? (
                    <Field.Message>{t(`tasks.validation.${errors.assignee}`)}</Field.Message>
                  ) : null}
                </Field>
                <Field invalid={Boolean(errors.estimateHours)}>
                  <Field.Label>{t('tasks.estimatedHours')}</Field.Label>
                  <Input
                    name="estimateHours"
                    type="number"
                    steppers
                    min={0}
                    max={999}
                    step={1}
                    value={String(draft.estimateHours)}
                    onChange={(event) =>
                      update(
                        'estimateHours',
                        event.currentTarget.value === '' ? 0 : Number(event.currentTarget.value),
                      )
                    }
                    suffix={t('tasks.h')}
                  />
                  {errors.estimateHours ? (
                    <Field.Message>{t(`tasks.validation.${errors.estimateHours}`)}</Field.Message>
                  ) : (
                    <Field.Description>
                      {t('tasks.wholeHoursUse0WhenTheTaskHasNot')}
                    </Field.Description>
                  )}
                </Field>
                <Field invalid={Boolean(errors.dueDate)}>
                  <Field.Label>{t('tasks.dueDate')}</Field.Label>
                  <DatePicker
                    name="dueDate"
                    value={draft.dueDate}
                    onValueChange={(value) => update('dueDate', value)}
                  >
                    <DatePicker.Input type="text" placeholder={t('tasks.dateFormat')} />
                    <DatePicker.Trigger aria-label={t('tasks.chooseDueDate')} />
                    <DatePicker.Content aria-label={t('tasks.dueDateCalendar')}>
                      <DatePicker.Calendar
                        locale={i18n.language}
                        weekStartsOn={1}
                        defaultMonth="2026-10"
                      />
                    </DatePicker.Content>
                  </DatePicker>
                  {errors.dueDate ? (
                    <Field.Message>{t(`tasks.validation.${errors.dueDate}`)}</Field.Message>
                  ) : (
                    <Field.Description>
                      {t('tasks.optionalLeaveEmptyWhenTheWorkIsNotScheduled')}
                    </Field.Description>
                  )}
                </Field>
              </div>
            </Form>
          </Dialog.Body>
          <Dialog.Footer className={styles.taskDialogFooter}>
            {confirmDiscard ? (
              <Alert intent="warning" className={styles.discardNotice}>
                <Alert.Content>
                  <Alert.Title>{t('tasks.discardUnsavedChanges')}</Alert.Title>
                  <Alert.Description>{t('tasks.theSavedTaskWillStayAsItIs')}</Alert.Description>
                </Alert.Content>
                <Alert.Action className={styles.discardActions!}>
                  <Button variant="outline" size="medium" onClick={onClose}>
                    {t('tasks.discardChanges')}
                  </Button>
                  <Button size="medium" onClick={() => setConfirmDiscard(false)}>
                    {t('tasks.keepEditing')}
                  </Button>
                </Alert.Action>
              </Alert>
            ) : (
              <>
                <span className={styles.saveState} aria-live="polite">
                  {dirty
                    ? t('tasks.unsavedChanges')
                    : task
                      ? t('tasks.allChangesSaved')
                      : t('tasks.newTask')}
                </span>
                <Dialog.Close size="medium">
                  {task ? t('tasks.close') : t('tasks.cancel')}
                </Dialog.Close>
                <Button
                  size="medium"
                  type="submit"
                  form={formId}
                  disabled={mutation.pending || (Boolean(task) && !dirty)}
                >
                  {task ? t('tasks.saveChanges') : t('tasks.createTask')}
                </Button>
              </>
            )}
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
