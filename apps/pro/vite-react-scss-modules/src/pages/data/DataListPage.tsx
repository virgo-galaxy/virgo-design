import { SearchIcon } from '@virgo-design/icons';
import { Button, Input, Pagination, Progress, SegmentedControl, Tag } from '@virgo-design/ui';
import { type Dispatch, useState } from 'react';
import { Link } from 'react-router';

import { projectDetailPath, projects } from '@/data/projects';
import { isOverdue, paginateTasks, type Task, type TaskAction, type TaskState } from '@/data/tasks';
import { taskAssignees, taskProjects, taskReferenceDate } from '@/data/tasks.seed';
import { sortTasks } from '@/data/tasks.sort';
import { formatDueDate } from '@/data/workplace';
import { FilterSelect, MetricStrip, NoResults, Panel, Person } from '@/pages/shared/ProPage';
import shared from '@/pages/shared/ProPage.module.scss';
import { useTaskEditor } from '@/pages/shared/use-task-editor';
import { taskPriorityIntent, taskStatusIntent } from '@/pages/tasks/task-presentation';

import styles from './DataListPage.module.scss';

export function DataListPage({
  state,
  dispatch,
}: {
  state: TaskState;
  dispatch: Dispatch<TaskAction>;
}) {
  const [search, setSearch] = useState('');
  const [project, setProject] = useState('all');
  const [owner, setOwner] = useState('all');
  const [scope, setScope] = useState('open');
  const [order, setOrder] = useState('due');
  const [layout, setLayout] = useState('list');
  const [page, setPage] = useState(1);
  const query = search.trim().toLowerCase();
  const matches = (task: Task) =>
    (project === 'all' || task.project === project) &&
    (owner === 'all' || task.assignee === owner) &&
    (scope === 'all' ||
      (scope === 'open' && task.status !== 'Done') ||
      (scope === 'review' && task.status === 'In Review') ||
      (scope === 'done' && task.status === 'Done')) &&
    [
      task.id,
      task.title,
      task.description,
      task.project,
      taskAssignees.find((member) => member.id === task.assignee)?.name,
    ]
      .join(' ')
      .toLowerCase()
      .includes(query);
  const filtered = sortTasks(state.tasks.filter(matches), {
    column: order === 'due' ? 'dueDate' : order === 'effort' ? 'estimateHours' : 'createdAt',
    direction: order === 'due' ? 'ascending' : 'descending',
  });
  const view = paginateTasks(filtered, page, 6);
  if (page !== view.page) setPage(view.page);
  const editor = useTaskEditor(state, dispatch, matches);
  const reset = () => {
    setSearch('');
    setProject('all');
    setOwner('all');
    setScope('open');
    setPage(1);
  };
  const completed = state.tasks.filter((task) => task.status === 'Done').length;
  const review = state.tasks.filter((task) => task.status === 'In Review').length;
  return (
    <div className={shared.page}>
      <MetricStrip
        items={[
          {
            label: 'Open briefs',
            value: state.tasks.length - completed,
            note: 'not yet completed',
          },
          { label: 'Ready for review', value: review, note: 'acceptance is the next step' },
          { label: 'Completed', value: completed, note: 'in the current register' },
          { label: 'Focus areas', value: projects.length, note: 'same projects, shared owners' },
        ]}
      />
      <div className={shared.twoColumns}>
        <Panel
          title="Task briefs"
          description="Context, ownership and delivery state in one place"
          actions={
            <>
              <SegmentedControl
                size="small"
                variant="soft"
                value={layout}
                aria-label="Brief layout"
                onValueChange={setLayout}
              >
                <SegmentedControl.Item value="list">List</SegmentedControl.Item>
                <SegmentedControl.Item value="cards">Cards</SegmentedControl.Item>
              </SegmentedControl>

              <Link className={shared.link} to="/data/search-table">
                Open task register →
              </Link>
            </>
          }
        >
          <div className={shared.toolbar}>
            <Input
              size="small"
              aria-label="Search task briefs"
              placeholder="Search briefs or people…"
              value={search}
              clearable
              prefix={<SearchIcon />}
              rootClassName={shared.search!}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
            />
            <span className={shared.count} aria-live="polite">
              {filtered.length} briefs match
            </span>
          </div>
          <div className={styles.filters}>
            <FilterSelect
              label="Project"
              value={project}
              onChange={(value) => {
                setProject(value);
                setPage(1);
              }}
              options={[
                { value: 'all', label: 'All projects' },
                ...taskProjects.map((value) => ({ value, label: value })),
              ]}
            />
            <FilterSelect
              label="Owner"
              value={owner}
              onChange={(value) => {
                setOwner(value);
                setPage(1);
              }}
              options={[
                { value: 'all', label: 'All people' },
                ...taskAssignees.map((member) => ({ value: member.id, label: member.name })),
              ]}
            />
            <FilterSelect
              label="Sort by"
              value={order}
              onChange={(value) => {
                setOrder(value);
                setPage(1);
              }}
              options={[
                { value: 'due', label: 'Due date · soonest' },
                { value: 'recent', label: 'Newest first' },
                { value: 'effort', label: 'Largest estimate' },
              ]}
            />
          </div>
          <div className={styles.viewBar}>
            <SegmentedControl
              size="small"
              value={scope}
              aria-label="Brief status"
              onValueChange={(value) => {
                setScope(value);
                setPage(1);
              }}
            >
              <SegmentedControl.Item value="open">Open</SegmentedControl.Item>
              <SegmentedControl.Item value="review">In review</SegmentedControl.Item>
              <SegmentedControl.Item value="done">Done</SegmentedControl.Item>
              <SegmentedControl.Item value="all">All</SegmentedControl.Item>
            </SegmentedControl>
            <Button size="small" variant="text" onClick={reset}>
              Reset filters
            </Button>
          </div>
          <ul className={styles.briefs} data-layout={layout} aria-label="Task briefs">
            {view.tasks.map((task) => {
              const related = projects.find((item) => item.name === task.project)!;
              return (
                <li key={task.id}>
                  <article className={styles.brief} aria-label={`${task.id}: ${task.title}`}>
                    <div className={styles.briefTop}>
                      <span className={shared.mono}>{task.id}</span>
                      <div>
                        <Tag size="sm" intent={taskStatusIntent[task.status]}>
                          {task.status}
                        </Tag>
                        <Tag size="sm" intent={taskPriorityIntent[task.priority]} variant="outline">
                          {task.priority}
                        </Tag>
                      </div>
                    </div>
                    <h3>
                      <Button
                        size="small"
                        variant="text"
                        className={styles.briefTitle}
                        onClick={(event) => editor.open(task, event.currentTarget)}
                      >
                        {task.title}
                      </Button>
                    </h3>
                    <p>{task.description}</p>
                    <div className={styles.briefMeta}>
                      <Link to={projectDetailPath(related)} className={shared.link}>
                        <i style={{ background: `var(--vd-data-categorical-${related.color})` }} />
                        {task.project}
                      </Link>
                      <span>{task.estimateHours}h estimated</span>
                      <span data-overdue={isOverdue(task, taskReferenceDate)}>
                        {task.dueDate ? (
                          <>
                            <time dateTime={task.dueDate}>Due {formatDueDate(task.dueDate)}</time>
                            {isOverdue(task, taskReferenceDate) ? ' · overdue' : ''}
                          </>
                        ) : (
                          'Unscheduled'
                        )}
                      </span>
                    </div>
                    <div className={styles.briefFooter}>
                      <Person id={task.assignee} />
                      <Button
                        size="small"
                        variant="text"
                        onClick={(event) => editor.open(task, event.currentTarget)}
                        aria-label={`Read brief ${task.id}`}
                      >
                        Read brief →
                      </Button>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
          {!filtered.length ? (
            <NoResults title="No briefs match this view" onReset={reset} />
          ) : null}
          <div className={shared.footer}>
            <span>
              Showing {view.range[0]}–{view.range[1]} of {filtered.length}
            </span>
            <Pagination
              total={filtered.length}
              page={view.page}
              pageSize={6}
              onChange={setPage}
              aria-label="Brief pages"
              className={styles.pagination}
            />
          </div>
          <div className={styles.feedback} role="status">
            {editor.feedback || 'Briefs and the task register share the same saved records.'}
          </div>
        </Panel>
        <div className={shared.stack}>
          <Panel title="October checkpoint" description="Prepare the next team handoff">
            <div className={shared.body}>
              <span className={shared.eyebrow}>OCT 06 / RELEASE READINESS</span>
              <h3 className={styles.asideTitle}>Make acceptance visible.</h3>
              <p className={styles.asideCopy}>
                Attach review notes, confirm the next owner and surface unresolved risks before the
                team checkpoint.
              </p>
              <div className={styles.checkpointMetric}>
                <strong>{review}</strong>
                <span>briefs waiting for review</span>
              </div>
              <Button
                size="small"
                variant="outline"
                onClick={() => {
                  setScope('review');
                  setProject('all');
                  setOwner('all');
                  setSearch('');
                  setPage(1);
                }}
              >
                Review the queue
              </Button>
            </div>
          </Panel>
          <Panel title="Focus areas" description="Open work in the current register">
            <ul className={styles.focusAreas}>
              {projects.map((item) => {
                const count = state.tasks.filter(
                  (task) => task.project === item.name && task.status !== 'Done',
                ).length;
                return (
                  <li key={item.id}>
                    <div>
                      <Link className={shared.link} to={projectDetailPath(item)}>
                        {item.name}
                      </Link>
                      <span>{count} open</span>
                    </div>
                    <Progress
                      size="sm"
                      value={count}
                      max={Math.max(1, state.tasks.length - completed)}
                      aria-label={`${item.name} open task share`}
                    />
                  </li>
                );
              })}
            </ul>
          </Panel>
          <Panel title="How briefs connect">
            <div className={shared.body}>
              <p className={styles.asideCopy}>
                A brief is the full context of a task. Status and ownership changes here appear in
                Tasks, Projects and the current-register analytics.
              </p>
              <Link className={shared.link} to="/work/projects">
                Explore the portfolio →
              </Link>
            </div>
          </Panel>
        </div>
      </div>
      {editor.editor}
    </div>
  );
}
