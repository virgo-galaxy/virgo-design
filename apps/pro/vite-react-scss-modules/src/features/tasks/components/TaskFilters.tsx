import { ResetIcon, SearchIcon } from '@virgo-design/icons';
import { Alert, Button, Combobox, DatePicker, Field, Form, Input } from '@virgo-design/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { FilterSelect } from '@/components/filters/FilterSelect';
import { MultiFilterSelect } from '@/components/filters/MultiFilterSelect';
import { projectName, useTaskCatalog } from '@/features/catalog';
import { businessLabel } from '@/lib/demo/labels';

import { emptyTaskQuery, queryError, type TaskQuery as Filters } from '../model/query-params';
import { filterValues, taskPriorities, taskStatuses } from '../model/task';
import {
  taskPriorityIntent,
  taskStatusIntent,
  taskStatusLabelNames,
} from '../presentation/task-presentation';
import styles from './TaskFilters.module.scss';

export function TaskFilters({
  filters,
  onApply,
  onReset,
}: {
  filters: Filters;
  onApply: (filters: Filters) => void;
  onReset: () => void;
}) {
  const { projects, metadata } = useTaskCatalog();
  const {
    members: taskAssignees,
    projects: taskProjects,
    referenceDate: taskReferenceDate,
  } = metadata;
  const [draft, onChange] = useState(filters);
  const [error, setError] = useState<ReturnType<typeof queryError>>('');
  const [assigneeInput, setAssigneeInput] = useState(
    () =>
      taskAssignees.find((person) => person.id === filterValues(filters.assignee)[0])?.name ?? '',
  );
  const [assigneeError, setAssigneeError] = useState(false);
  const [assigneeOpen, setAssigneeOpen] = useState(false);
  const selectedAssignee = filterValues(draft.assignee)[0] ?? '';

  const { t, i18n } = useTranslation();
  const now = new Date();
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  return (
    <Form
      size="medium"
      className={styles.filterToolbar}
      aria-label={t('tasks.queryTasks')}
      onSubmit={(event) => {
        event.preventDefault();
        const missingAssignee = Boolean(assigneeInput.trim() && !selectedAssignee);
        setAssigneeError(missingAssignee);
        const invalid = queryError(draft, { maxCreatedDate: today });
        setError(invalid);
        if (!invalid && !missingAssignee) onApply(draft);
      }}
    >
      <div className={styles.filterGrid}>
        <Field>
          <Field.Label className={styles.filterLabel}>{t('tasks.searchTasks')}</Field.Label>
          <Input
            size="medium"
            placeholder={t('tasks.searchTasksIdsDescriptionsOrPeople')}
            value={draft.search}
            clearable
            onChange={(event) => onChange({ ...draft, search: event.target.value })}
          />
        </Field>
        <MultiFilterSelect
          size="medium"
          label={t('tasks.status')}
          placeholder={t('tasks.allStatuses')}
          value={filterValues(draft.status)}
          onChange={(value) =>
            onChange({
              ...draft,
              status: value.filter((entry): entry is (typeof taskStatuses)[number] =>
                taskStatuses.some((status) => status === entry),
              ),
            })
          }
          options={taskStatuses.map((status) => ({
            value: status,
            label: t(`tasks.statusLabels.${taskStatusLabelNames[status]}`),
            intent: taskStatusIntent[status],
          }))}
        />
        <MultiFilterSelect
          size="medium"
          label={t('tasks.priority')}
          placeholder={t('tasks.allPriorities')}
          value={filterValues(draft.priority)}
          onChange={(value) =>
            onChange({
              ...draft,
              priority: value.filter((entry): entry is (typeof taskPriorities)[number] =>
                taskPriorities.some((priority) => priority === entry),
              ),
            })
          }
          options={taskPriorities.map((priority) => ({
            value: priority,
            label: t(`tasks.priorityLabels.${priority}`),
            intent: taskPriorityIntent[priority],
          }))}
        />
        <MultiFilterSelect
          size="medium"
          label={t('tasks.project')}
          placeholder={t('tasks.allProjects')}
          value={filterValues(draft.project)}
          onChange={(project) => onChange({ ...draft, project, module: 'all' })}
          options={taskProjects.map((project) => ({
            value: project,
            label: businessLabel(projectName(project, projects), i18n.language),
          }))}
        />
        <Field invalid={assigneeError}>
          <Field.Label className={styles.filterLabel}>{t('tasks.assignee')}</Field.Label>
          <Combobox
            size="medium"
            className={styles.assigneeAutocomplete}
            value={selectedAssignee}
            inputValue={businessLabel(assigneeInput, i18n.language)}
            open={assigneeOpen && Boolean(assigneeInput.trim())}
            onOpenChange={setAssigneeOpen}
            onInputValueChange={setAssigneeInput}
            onValueChange={(value) => {
              onChange({ ...draft, assignee: value ? [value] : [] });
              setAssigneeError(false);
            }}
          >
            <Combobox.Input
              placeholder={t('tasks.query.findATeamMember')}
              onFocus={(event) => event.preventDefault()}
              onClick={(event) => event.preventDefault()}
              onChange={() => {
                onChange({ ...draft, assignee: [] });
                setAssigneeError(false);
              }}
            />
            <Combobox.Content>
              {taskAssignees.map((member) => (
                <Combobox.Option
                  key={member.id}
                  value={member.id}
                  textValue={businessLabel(member.name, i18n.language)}
                >
                  {businessLabel(member.name, i18n.language)}
                </Combobox.Option>
              ))}
              <Combobox.Empty>{t('tasks.query.noTeamMemberMatches')}</Combobox.Empty>
            </Combobox.Content>
            {assigneeInput ? <Combobox.Clear /> : null}
          </Combobox>
          {assigneeError ? (
            <Field.Message>{t('tasks.validation.assigneeRequired')}</Field.Message>
          ) : null}
        </Field>
        <Field>
          <Field.Label className={styles.filterLabel}>{t('tasks.createdRange')}</Field.Label>
          <DatePicker.Range
            max={today}
            size="medium"
            value={[draft.createdFrom, draft.createdTo]}
            onValueChange={([createdFrom, createdTo]) =>
              onChange({ ...draft, createdFrom, createdTo })
            }
          >
            <DatePicker.RangeInput edge="start" placeholder={t('tasks.startDate')} />
            <span aria-hidden="true">–</span>
            <DatePicker.RangeInput
              edge="end"
              aria-label={t('tasks.endDate')}
              placeholder={t('tasks.endDate')}
            />
            <DatePicker.Trigger aria-label={t('tasks.chooseCreatedRange')} />
            <DatePicker.Content aria-label={t('tasks.chooseCreatedRange')} placement="bottomStart">
              <DatePicker.RangeCalendar
                locale={i18n.language}
                weekStartsOn={1}
                defaultMonth={(draft.createdFrom || taskReferenceDate).slice(0, 7)}
              />
            </DatePicker.Content>
          </DatePicker.Range>
        </Field>
        <FilterSelect
          size="medium"
          label={t('tasks.query.dueCondition')}
          value={Array.isArray(draft.due) ? (draft.due[0] ?? 'all') : (draft.due as string)}
          onChange={(value) => onChange({ ...draft, due: value as Filters['due'] })}
          options={[
            { value: 'all', label: t('tasks.query.anyDueDate') },
            { value: 'overdue', label: t('tasks.query.overdueOpenTasks') },
            { value: 'week', label: t('tasks.query.next7DaysOpenTasks') },
            { value: 'unscheduled', label: t('tasks.query.unscheduled') },
          ]}
        />
        <Field>
          <Field.Label className={styles.filterLabel}>
            {t('tasks.query.minimumEstimate')}
          </Field.Label>
          <Input
            size="medium"
            type="number"
            steppers
            min={0}
            max={999}
            step={1}
            suffix={t('tasks.h')}
            placeholder="0"
            value={draft.minimumHours}
            onChange={(event) => onChange({ ...draft, minimumHours: event.target.value })}
          />
        </Field>
      </div>
      {error ? (
        <Alert intent="error">
          <Alert.Description>{t(`tasks.query.validation.${error}`)}</Alert.Description>
        </Alert>
      ) : null}
      <Button.Group layout="custom" className={styles.queryActions}>
        <span className={styles.queryHint}>{t('tasks.queryHint')}</span>
        <Button
          size="medium"
          variant="outline"
          leadingIcon={<ResetIcon />}
          onClick={() => {
            onChange(emptyTaskQuery);
            setError('');
            setAssigneeInput('');
            setAssigneeError(false);
            setAssigneeOpen(false);
            onReset();
          }}
        >
          {t('tasks.resetQuery')}
        </Button>
        <Button size="medium" type="submit" leadingIcon={<SearchIcon />}>
          {t('tasks.applyQuery')}
        </Button>
      </Button.Group>
    </Form>
  );
}
