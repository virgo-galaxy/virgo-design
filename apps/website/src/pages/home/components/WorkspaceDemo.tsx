import { CalendarIcon, ChevronDownIcon, DashboardIcon, FileTextIcon } from '@virgo-design/icons';
import {
  Avatar,
  Button,
  Calendar,
  Checkbox,
  Dialog,
  Field,
  Form,
  Input,
  Select,
  Surface,
  Tabs,
} from '@virgo-design/ui';
import { useId, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { VirgoMark } from '@/components/brand/VirgoBrand/VirgoMark';

import styles from '../home-demo.module.scss';

type Status = 'progress' | 'done' | 'todo';
type TaskLabel = 'foundation' | 'build' | 'review' | 'release';
interface Task {
  id: number;
  label: TaskLabel | null;
  name: string;
  status: Status;
  owner: string;
}
const initialTasks: Task[] = [
  { id: 1, label: 'foundation', name: '', status: 'progress', owner: 'AL' },
  { id: 2, label: 'build', name: '', status: 'progress', owner: 'CY' },
  { id: 3, label: 'review', name: '', status: 'done', owner: 'MK' },
  { id: 4, label: 'release', name: '', status: 'todo', owner: 'AL' },
];

export function WorkspaceDemo() {
  const { t, i18n } = useTranslation();
  const [tasks, setTasks] = useState(initialTasks);
  const [date, setDate] = useState('2026-09-26');
  const [calendarOpen, setCalendarOpen] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [name, setName] = useState('');
  const id = useId();
  const dateButton = useRef<HTMLButtonElement>(null);
  const setStatus = (taskId: number, status: Status) =>
    setTasks((current) => current.map((task) => (task.id === taskId ? { ...task, status } : task)));

  return (
    <div className={styles.workspaceScene}>
      <div className={styles.shellFragment} aria-hidden="true">
        <div className={styles.appBrand}>
          <VirgoMark />
          <strong>Virgo Design</strong>
          <span>Starter</span>
        </div>
        <div className={styles.ghostNavigation}>
          <DashboardIcon size={15} /> Dashboard <ChevronDownIcon size={14} />
        </div>
      </div>
      <Surface
        className={styles.workspace!}
        tone="elevated"
        border="subtle"
        radius={16}
        elevation={3}
      >
        <Tabs defaultValue="tasks" variant="plain">
          <div className={styles.workspaceHeader}>
            <h2>{t('home.demo.workspace')}</h2>
            <Tabs.List className={styles.workspaceTabs!} aria-label={t('home.demo.tabs')}>
              <Tabs.Tab value="tasks">{t('home.demo.tasks')}</Tabs.Tab>
              <Tabs.Tab value="files">{t('home.demo.files')}</Tabs.Tab>
            </Tabs.List>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <Dialog.Trigger size="small" variant="primary">
                {t('home.demo.newTask')}
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay />
                <Dialog.Content>
                  <Dialog.Header>
                    <Dialog.Title>{t('home.demo.newTask')}</Dialog.Title>
                    <Dialog.Description>{t('home.demo.newTaskDescription')}</Dialog.Description>
                  </Dialog.Header>
                  <Dialog.Body>
                    <Form
                      id={`${id}-form`}
                      onSubmit={(event) => {
                        event.preventDefault();
                        if (!name.trim()) return;
                        setTasks((current) => [
                          ...current,
                          {
                            id: Math.max(...current.map((task) => task.id)) + 1,
                            label: null,
                            name: name.trim(),
                            status: 'todo',
                            owner: 'AL',
                          },
                        ]);
                        setName('');
                        setDialogOpen(false);
                      }}
                    >
                      <Field>
                        <Field.Label>{t('home.demo.taskName')}</Field.Label>
                        <Input
                          name="taskName"
                          autoComplete="off"
                          required
                          value={name}
                          onChange={(event) => setName(event.target.value)}
                          placeholder={t('home.demo.taskPlaceholder')}
                        />
                      </Field>
                    </Form>
                  </Dialog.Body>
                  <Dialog.Footer>
                    <Dialog.Close variant="outline">{t('home.demo.cancel')}</Dialog.Close>
                    <Button type="submit" form={`${id}-form`}>
                      {t('home.demo.add')}
                    </Button>
                  </Dialog.Footer>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog>
          </div>
          <Tabs.Panel value="tasks" className={styles.tasksPanel!}>
            <div className={styles.tasks}>
              {tasks.map((task) => {
                const title = task.label ? t(`home.demo.${task.label}`) : task.name;
                return (
                  <div key={task.id} className={styles.taskRow}>
                    <Checkbox
                      aria-label={t('home.demo.complete', { task: title })}
                      checked={task.status === 'done'}
                      onChange={(event) =>
                        setStatus(task.id, event.target.checked ? 'done' : 'progress')
                      }
                    />
                    <span className={styles.taskTitle}>{title}</span>
                    <Avatar
                      size="sm"
                      fallback={task.owner}
                      className={styles.avatar}
                      data-owner={task.owner}
                      aria-hidden="true"
                    />
                    {task.label === 'release' ? (
                      <Button
                        size="small"
                        variant="outline"
                        ref={dateButton}
                        leadingIcon={<CalendarIcon size={14} aria-hidden="true" />}
                        aria-label={t('home.demo.dueDate')}
                        aria-expanded={calendarOpen}
                        aria-controls={`${id}-calendar`}
                        onClick={() => setCalendarOpen((current) => !current)}
                      >
                        {date}
                      </Button>
                    ) : (
                      <div className={styles.status} data-status={task.status}>
                        <Select
                          value={task.status}
                          onValueChange={(value) => setStatus(task.id, value as Status)}
                          size="small"
                        >
                          <Select.Trigger aria-label={t('home.demo.status', { task: title })} />
                          <Select.Content>
                            {(['progress', 'done', 'todo'] as const).map((status) => (
                              <Select.Option key={status} value={status}>
                                {t(`home.demo.${status}`)}
                              </Select.Option>
                            ))}
                          </Select.Content>
                        </Select>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            {calendarOpen ? (
              <Surface
                id={`${id}-calendar`}
                className={styles.calendar!}
                tone="elevated"
                border="subtle"
                radius={12}
                elevation={4}
                role="region"
                aria-label={t('home.demo.calendar')}
                onKeyDown={(event) => {
                  if (event.key === 'Escape') {
                    event.preventDefault();
                    setCalendarOpen(false);
                    dateButton.current?.focus();
                  }
                }}
              >
                <Calendar
                  value={date}
                  onValueChange={setDate}
                  defaultMonth="2026-09"
                  locale={i18n.language}
                  weekStartsOn={1}
                  size="small"
                />
              </Surface>
            ) : null}
          </Tabs.Panel>
          <Tabs.Panel value="files" className={styles.filesPanel!}>
            {['design-tokens.json', 'workspace.tsx', 'theme.css', 'README.md'].map((file) => (
              <div className={styles.fileRow} key={file}>
                <FileTextIcon size={18} aria-hidden="true" />
                <span>{file}</span>
              </div>
            ))}
          </Tabs.Panel>
        </Tabs>
      </Surface>
    </div>
  );
}
