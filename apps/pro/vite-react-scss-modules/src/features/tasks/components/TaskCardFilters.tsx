import { SearchIcon } from '@virgo-design/icons';
import { Button, Field, Form, Input } from '@virgo-design/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { MultiFilterSelect } from '@/components/filters/MultiFilterSelect';
import { projectName, useTaskCatalog } from '@/features/catalog';
import { businessLabel } from '@/lib/demo/labels';

import type { TaskQuery } from '../model/query-params';
import { filterValues, taskStatuses } from '../model/task';
import { taskStatusLabelNames } from '../presentation/task-presentation';
import styles from '../styles/TaskCards.module.scss';

export function TaskCardFilters({
  filters,
  onChange,
  onReset,
}: {
  filters: TaskQuery;
  onChange: (key: 'search' | 'status' | 'project', value: string | string[]) => void;
  onReset: () => void;
}) {
  const { t, i18n } = useTranslation();
  const { projects, metadata } = useTaskCatalog();
  const taskProjects = metadata.projects;
  const [search, setSearch] = useState(filters.search);

  const reset = () => {
    setSearch('');
    onReset();
  };

  return (
    <Form
      className={styles.filterForm}
      onSubmit={(event) => {
        event.preventDefault();
        onChange('search', search.trim());
      }}
    >
      <Field>
        <Field.Label>{t('tasks.searchTasks')}</Field.Label>
        <Input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder={t('tasks.searchTasksIdsDescriptionsOrPeople')}
        />
      </Field>
      <MultiFilterSelect
        label={t('tasks.status')}
        value={filterValues(filters.status)}
        placeholder={t('tasks.allStatuses')}
        onChange={(value) => onChange('status', value)}
        options={taskStatuses.map((status) => ({
            value: status,
            label: t(`tasks.statusLabels.${taskStatusLabelNames[status]}`),
          }))}
      />
      <MultiFilterSelect
        label={t('tasks.project')}
        value={filterValues(filters.project)}
        placeholder={t('tasks.allProjects')}
        onChange={(value) => onChange('project', value)}
        options={taskProjects.map((project) => ({
            value: project,
            label: businessLabel(projectName(project, projects), i18n.language),
          }))}
      />
      <Button.Group>
        <Button type="button" variant="outline" onClick={reset}>
          {t('tasks.resetQuery')}
        </Button>
        <Button type="submit" leadingIcon={<SearchIcon />}>
          {t('tasks.applyQuery')}
        </Button>
      </Button.Group>
    </Form>
  );
}
