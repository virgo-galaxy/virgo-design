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
} from '@virgo-design/ui';
import { useId, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

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
import { taskAssignees, taskProjects } from '@/data/tasks.seed';
import { getTaskPriorityLabel, getTaskStatusLabel } from '@/pages/tasks/task-presentation';

import { taskStatusIntent } from './task-presentation';
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
  onSave: (draft: TaskDraft) => void;
  onStatusChange: (status: Task['status']) => void;
  onClose: () => void;
  restoreFocus: () => void;
}) {
  const { t, i18n } = useTranslation();
  const [draft, setDraft] = useState<TaskDraft>(() =>
    task ? taskDraft(task) : { ...emptyTaskDraft },
  );
  const [errors, setErrors] = useState<TaskErrors>({});
  const [confirmDiscard, setConfirmDiscard] = useState(false);
  const formId = useId();
  const titleRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const dirty = draftHasChanges(draft, task ? taskDraft(task) : emptyTaskDraft);
  const nextStatus = task ? nextTaskStatus(task.status) : undefined;
  const requestClose = () => {
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
          size="lg"
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
              <Dialog.Title>{task ? t('tasks.taskDetails') : t('tasks.newTask')}</Dialog.Title>
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
                  size="small"
                  variant="text"
                  iconOnly
                >
                  <CloseIcon />
                </Button>
              )}
            />
          </Dialog.Header>
          <Dialog.Body className={styles.taskDialogBody}>
            {task ? (
              <div className={styles.workflow}>
                <div>
                  <Tag intent={taskStatusIntent[task.status]} size="sm">
                    {getTaskStatusLabel(t, task.status)}
                  </Tag>
                  <span>{t('tasks.savedStatus')}</span>
                </div>
                {nextStatus ? (
                  <Button
                    size="small"
                    variant="outline"
                    trailingIcon={<ArrowRightIcon />}
                    disabled={dirty}
                    onClick={() => {
                      onStatusChange(nextStatus);
                      setDraft((current) => ({ ...current, status: nextStatus }));
                    }}
                  >
                    {t('tasks.moveToValue', { v0: nextStatus })}
                  </Button>
                ) : (
                  <span className={styles.completedNote}>{t('tasks.readyForTheNextDelivery')}</span>
                )}
                {dirty ? (
                  <span className={styles.workflowHint}>
                    {t('tasks.saveYourEditsBeforeAdvancingTheTask')}
                  </span>
                ) : null}
              </div>
            ) : null}
            {hiddenByFilters ? (
              <Alert intent="info">
                <Alert.Title>{t('tasks.savedButOutsideThisView')}</Alert.Title>
                <Alert.Description>
                  {t('tasks.thisTaskNoLongerMatchesYourCurrentFiltersYour')}
                </Alert.Description>
              </Alert>
            ) : null}
            <Form
              id={formId}
              ref={formRef}
              size="small"
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
                onSave(normalized);
                setDraft(normalized);
                setConfirmDiscard(false);
                if (task) requestAnimationFrame(() => titleRef.current?.focus());
              }}
            >
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
                  rows={4}
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
              </div>
              <Field invalid={Boolean(errors.estimateHours)}>
                <Field.Label>{t('tasks.estimatedHours')}</Field.Label>
                <Input
                  name="estimateHours"
                  type="number"
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
                  <DatePicker.Input />
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
            </Form>
          </Dialog.Body>
          <Dialog.Footer className={styles.taskDialogFooter}>
            {confirmDiscard ? (
              <Alert intent="warning" className={styles.discardNotice}>
                <Alert.Title>{t('tasks.discardUnsavedChanges')}</Alert.Title>
                <Alert.Description>{t('tasks.theSavedTaskWillStayAsItIs')}</Alert.Description>
                <Alert.Action>
                  <Button variant="outline" size="small" onClick={onClose}>
                    {t('tasks.discardChanges')}
                  </Button>
                  <Button size="small" onClick={() => setConfirmDiscard(false)}>
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
                <Dialog.Close size="small">
                  {task ? t('tasks.close') : t('tasks.cancel')}
                </Dialog.Close>
                <Button size="small" type="submit" form={formId} disabled={Boolean(task) && !dirty}>
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
