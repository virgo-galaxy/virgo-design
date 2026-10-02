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
import { formatDueDate } from '@/data/workplace';

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
              <span className={styles.eyebrow}>{task ? task.id : 'PLAN THE NEXT DELIVERY'}</span>
              <Dialog.Title>{task ? 'Task details' : 'New task'}</Dialog.Title>
              <Dialog.Description>
                {task
                  ? `Created ${formatDueDate(task.createdAt.slice(0, 10))}, ${task.createdAt.slice(0, 4)} · Changes apply to the task list immediately after saving.`
                  : 'Give the work a clear owner, a priority and a next step.'}
              </Dialog.Description>
            </div>
            <Dialog.Close
              aria-label="Close task editor"
              render={(buttonProps) => (
                <Button
                  {...buttonProps}
                  aria-label="Close task editor"
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
                    {task.status}
                  </Tag>
                  <span>Saved status</span>
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
                    Move to {nextStatus}
                  </Button>
                ) : (
                  <span className={styles.completedNote}>Ready for the next delivery.</span>
                )}
                {dirty ? (
                  <span className={styles.workflowHint}>
                    Save your edits before advancing the task.
                  </span>
                ) : null}
              </div>
            ) : null}
            {hiddenByFilters ? (
              <Alert intent="info">
                <Alert.Title>Saved, but outside this view</Alert.Title>
                <Alert.Description>
                  This task no longer matches your current filters. Your changes are still saved.
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
                <Field.Label>Title</Field.Label>
                <Input
                  ref={titleRef}
                  name="title"
                  value={draft.title}
                  onChange={(event) => update('title', event.target.value)}
                  placeholder="What needs to be done?"
                />
                {errors.title ? (
                  <Field.Message>{errors.title}</Field.Message>
                ) : (
                  <Field.Description>Keep it specific and within 120 characters.</Field.Description>
                )}
              </Field>
              <Field invalid={Boolean(errors.description)}>
                <Field.Label>Description</Field.Label>
                <Textarea
                  name="description"
                  rows={4}
                  value={draft.description}
                  onChange={(event) => update('description', event.target.value)}
                  placeholder="Context, acceptance criteria, or the next step…"
                />
                {errors.description ? (
                  <Field.Message>{errors.description}</Field.Message>
                ) : (
                  <Field.Description>Optional · up to 2,000 characters.</Field.Description>
                )}
              </Field>
              <div className={styles.formGrid}>
                <Field required invalid={Boolean(errors.status)}>
                  <Field.Label>Status</Field.Label>
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
                          {status}
                        </Select.Option>
                      ))}
                    </Select.Content>
                  </Select>
                  {errors.status ? <Field.Message>{errors.status}</Field.Message> : null}
                </Field>
                <Field required invalid={Boolean(errors.priority)}>
                  <Field.Label>Priority</Field.Label>
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
                          {priority}
                        </Select.Option>
                      ))}
                    </Select.Content>
                  </Select>
                  {errors.priority ? <Field.Message>{errors.priority}</Field.Message> : null}
                </Field>
                <Field required invalid={Boolean(errors.project)}>
                  <Field.Label>Project</Field.Label>
                  <Select
                    name="project"
                    value={draft.project}
                    onValueChange={(value) => update('project', value)}
                  >
                    <Select.Trigger placeholder="Choose a project" />
                    <Select.Content className={styles.ownershipOptions}>
                      {taskProjects.map((project) => (
                        <Select.Option value={project} key={project}>
                          {project}
                        </Select.Option>
                      ))}
                    </Select.Content>
                  </Select>
                  {errors.project ? <Field.Message>{errors.project}</Field.Message> : null}
                </Field>
                <Field required invalid={Boolean(errors.assignee)}>
                  <Field.Label>Assignee</Field.Label>
                  <Select
                    name="assignee"
                    value={draft.assignee}
                    onValueChange={(value) => update('assignee', value)}
                  >
                    <Select.Trigger placeholder="Choose an assignee" />
                    <Select.Content className={styles.ownershipOptions}>
                      {taskAssignees.map((member) => (
                        <Select.Option value={member.id} key={member.id}>
                          {member.name}
                        </Select.Option>
                      ))}
                    </Select.Content>
                  </Select>
                  {errors.assignee ? <Field.Message>{errors.assignee}</Field.Message> : null}
                </Field>
              </div>
              <Field invalid={Boolean(errors.estimateHours)}>
                <Field.Label>Estimated hours</Field.Label>
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
                  suffix="h"
                />
                {errors.estimateHours ? (
                  <Field.Message>{errors.estimateHours}</Field.Message>
                ) : (
                  <Field.Description>
                    Whole hours. Use 0 when the task has not been estimated.
                  </Field.Description>
                )}
              </Field>
              <Field invalid={Boolean(errors.dueDate)}>
                <Field.Label>Due date</Field.Label>
                <DatePicker
                  name="dueDate"
                  value={draft.dueDate}
                  onValueChange={(value) => update('dueDate', value)}
                >
                  <DatePicker.Input />
                  <DatePicker.Trigger aria-label="Choose due date" />
                  <DatePicker.Content aria-label="Due date calendar">
                    <DatePicker.Calendar locale="en-US" weekStartsOn={1} defaultMonth="2026-10" />
                  </DatePicker.Content>
                </DatePicker>
                {errors.dueDate ? (
                  <Field.Message>{errors.dueDate}</Field.Message>
                ) : (
                  <Field.Description>
                    Optional. Leave empty when the work is not scheduled.
                  </Field.Description>
                )}
              </Field>
            </Form>
          </Dialog.Body>
          <Dialog.Footer className={styles.taskDialogFooter}>
            {confirmDiscard ? (
              <Alert intent="warning" className={styles.discardNotice}>
                <Alert.Title>Discard unsaved changes?</Alert.Title>
                <Alert.Description>The saved task will stay as it is.</Alert.Description>
                <Alert.Action>
                  <Button variant="outline" size="small" onClick={onClose}>
                    Discard changes
                  </Button>
                  <Button size="small" onClick={() => setConfirmDiscard(false)}>
                    Keep editing
                  </Button>
                </Alert.Action>
              </Alert>
            ) : (
              <>
                <span className={styles.saveState} aria-live="polite">
                  {dirty ? 'Unsaved changes' : task ? 'All changes saved' : 'New task'}
                </span>
                <Dialog.Close size="small">{task ? 'Close' : 'Cancel'}</Dialog.Close>
                <Button size="small" type="submit" form={formId} disabled={Boolean(task) && !dirty}>
                  {task ? 'Save changes' : 'Create task'}
                </Button>
              </>
            )}
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
