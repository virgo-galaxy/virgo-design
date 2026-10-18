import { Button, DatePicker, Dialog, Field, Form, Input, Select, Textarea } from '@virgo-design/ui';
import { type FormEvent, useEffect, useId, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { MutationFeedback } from '@/components/feedback/mutation-feedback';
import { projectName, useTaskCatalog } from '@/features/catalog';
import { useMutation } from '@/hooks/async/use-mutation';
import { businessLabel } from '@/lib/formatting/business-labels';
import { useNavigationBlocker } from '@/routes/navigation';

import {
  draftHasChanges,
  emptyTaskDraft,
  isTaskPriority,
  isTaskStatus,
  normalizeTaskDraft,
  type Task,
  type TaskDraft,
  taskDraft,
  type TaskErrors,
  taskPriorities,
  validateTask,
} from '../../model/task';
import { taskStatusLabelNames } from '../../presentation/task-presentation';

import styles from './TaskForm.module.scss';

export function TaskForm({
  task,
  onSave,
  onCancel,
}: {
  task?: Task | undefined;
  onSave: (draft: TaskDraft) => Promise<void>;
  onCancel: () => void;
}) {
  const { projects, metadata } = useTaskCatalog();
  const {
    members: taskAssignees,
    projects: taskProjects,
    referenceDate: taskReferenceDate,
  } = metadata;
  const { t, i18n } = useTranslation();
  const mutation = useMutation();

  const [draft, setDraft] = useState<TaskDraft>(() =>
    task
      ? taskDraft(task)
      : {
          ...emptyTaskDraft,
          project: taskProjects[0] ?? '',
          module: projects.find((p) => p.id === taskProjects[0])?.modules[0]?.id ?? '',
        },
  );
  const [errors, setErrors] = useState<TaskErrors>({});
  const [saved, setSaved] = useState(false);

  const formId = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const initial = useRef(draft);

  const dirty = !saved && draftHasChanges(draft, initial.current);
  const blocker = useNavigationBlocker(
    ({ currentLocation, nextLocation }) =>
      dirty &&
      !mutation.pending &&
      (currentLocation.pathname !== nextLocation.pathname ||
        currentLocation.search !== nextLocation.search),
  );

  useEffect(() => {
    if (!dirty) return;

    const beforeUnload = (event: BeforeUnloadEvent) => event.preventDefault();
    window.addEventListener('beforeunload', beforeUnload);

    return () => window.removeEventListener('beforeunload', beforeUnload);
  }, [dirty]);

  const statusChoices = ['backlog', 'todo'] as const;
  const selectedProject = projects.find((p) => p.id === draft.project);
  const eligibleMembers = selectedProject
    ? taskAssignees.filter((p) => selectedProject.memberIds.includes(p.id))
    : taskAssignees;

  const update = <Key extends keyof TaskDraft>(key: Key, value: TaskDraft[Key]) => {
    setDraft((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateTask(
      draft,
      taskProjects,
      taskAssignees.map((member) => member.id),
      projects,
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
      setSaved(true);
      setDraft(normalized);
    });
  };

  return (
    <>
      <MutationFeedback pending={mutation.pending} error={mutation.error} />
      <Form
        inert={mutation.pending}
        aria-busy={mutation.pending}
        id={formId}
        ref={formRef}
        size="medium"
        noValidate
        className={styles.form}
        onSubmit={submit}
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
          {!task ? (
            <Field required invalid={Boolean(errors.status)}>
              <Field.Label>{t('tasks.status')}</Field.Label>
              <Select
                name="status"
                disabled={statusChoices.length <= 1}
                value={draft.status}
                onValueChange={(value) => {
                  if (isTaskStatus(value)) update('status', value);
                }}
              >
                <Select.Trigger />
                <Select.Content>
                  {statusChoices.map((status) => (
                    <Select.Option value={status} key={status}>
                      {t(`tasks.statusLabels.${taskStatusLabelNames[status]}`)}
                    </Select.Option>
                  ))}
                </Select.Content>
              </Select>
              {errors.status ? (
                <Field.Message>{t(`tasks.validation.${errors.status}`)}</Field.Message>
              ) : null}
            </Field>
          ) : null}
          <Field required invalid={Boolean(errors.priority)}>
            <Field.Label>{t('tasks.priority')}</Field.Label>
            <Select
              name="priority"
              disabled={mutation.pending}
              value={draft.priority}
              onValueChange={(value) => {
                if (isTaskPriority(value)) update('priority', value);
              }}
            >
              <Select.Trigger />
              <Select.Content>
                {taskPriorities.map((priority) => (
                  <Select.Option value={priority} key={priority}>
                    {t(`tasks.priorityLabels.${priority}`)}
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
              disabled={mutation.pending}
              value={draft.project}
              onValueChange={(value) => {
                const project = projects.find((entry) => entry.id === value);
                setDraft((current) => ({
                  ...current,
                  project: value,
                  module: '',
                  assignee: project?.memberIds.includes(current.assignee) ? current.assignee : '',
                }));
                setErrors({});
              }}
            >
              <Select.Trigger placeholder={t('tasks.chooseAProject')} />
              <Select.Content>
                {taskProjects.map((project) => (
                  <Select.Option value={project} key={project}>
                    {businessLabel(projectName(project, projects), i18n.language)}
                  </Select.Option>
                ))}
              </Select.Content>
            </Select>
            {errors.project ? (
              <Field.Message>{t(`tasks.validation.${errors.project}`)}</Field.Message>
            ) : null}
          </Field>
          <Field required invalid={Boolean(errors.module)}>
            <Field.Label>{t('tasks.module')}</Field.Label>
            <Select
              name="module"
              disabled={mutation.pending || !selectedProject}
              value={draft.module}
              onValueChange={(value) => update('module', value)}
            >
              <Select.Trigger placeholder={t('tasks.chooseAModule')} />
              <Select.Content>
                {(selectedProject?.modules ?? []).map((module) => (
                  <Select.Option key={module.id} value={module.id}>
                    {businessLabel(module.name, i18n.language)}
                  </Select.Option>
                ))}
              </Select.Content>
            </Select>
            {errors.module ? (
              <Field.Message>{t(`tasks.validation.${errors.module}`)}</Field.Message>
            ) : null}
          </Field>
          <Field required invalid={Boolean(errors.assignee)}>
            <Field.Label>{t('tasks.assignee')}</Field.Label>
            <Select
              name="assignee"
              disabled={mutation.pending}
              value={draft.assignee}
              onValueChange={(value) => update('assignee', value)}
            >
              <Select.Trigger placeholder={t('tasks.chooseAnAssignee')} />
              <Select.Content>
                {eligibleMembers.map((member) => (
                  <Select.Option value={member.id} key={member.id}>
                    {businessLabel(member.name, i18n.language)}
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
              <Field.Description>{t('tasks.wholeHoursUse0WhenTheTaskHasNot')}</Field.Description>
            )}
          </Field>
          <Field invalid={Boolean(errors.dueDate)}>
            <Field.Label>{t('tasks.dueDate')}</Field.Label>
            <DatePicker
              name="dueDate"
              disabled={mutation.pending}
              value={draft.dueDate}
              onValueChange={(value) => update('dueDate', value)}
            >
              <DatePicker.Input type="text" placeholder={t('tasks.dateFormat')} />
              <DatePicker.Trigger aria-label={t('tasks.chooseDueDate')} />
              <DatePicker.Content aria-label={t('tasks.dueDateCalendar')}>
                <DatePicker.Calendar
                  locale={i18n.language}
                  weekStartsOn={1}
                  defaultMonth={taskReferenceDate.slice(0, 7)}
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
      <Button.Group className={styles.formActions}>
        <Button variant="outline" disabled={mutation.pending} onClick={onCancel}>
          {t('tasks.cancel')}
        </Button>
        <Button type="submit" form={formId} disabled={mutation.pending || (!!task && !dirty)}>
          {t(task ? 'tasks.saveChanges' : 'tasks.createTask')}
        </Button>
      </Button.Group>
      <Dialog.Root
        open={blocker.state === 'blocked'}
        onOpenChange={(open) => {
          if (!open && blocker.state === 'blocked') blocker.reset();
        }}
      >
        <Dialog.Portal>
          <Dialog.Overlay />
          <Dialog.Content size="sm">
            <Dialog.Header>
              <Dialog.Title>{t('tasks.discardUnsavedChanges')}</Dialog.Title>
              <Dialog.Description>{t('tasks.theSavedTaskWillStayAsItIs')}</Dialog.Description>
            </Dialog.Header>
            <Dialog.Footer>
              <Button
                variant="outline"
                onClick={() => blocker.state === 'blocked' && blocker.reset()}
              >
                {t('tasks.keepEditing')}
              </Button>
              <Button onClick={() => blocker.state === 'blocked' && blocker.proceed()}>
                {t('tasks.discardChanges')}
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
