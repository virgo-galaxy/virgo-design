import { SearchIcon } from '@virgo-design/icons';
import { Button, Input, Pagination, Progress, SegmentedControl, Tag } from '@virgo-design/ui';
import { type Dispatch, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

import { projectDetailPath, projects } from '@/data/projects';
import { isOverdue, paginateTasks, type Task, type TaskAction, type TaskState } from '@/data/tasks';
import { taskAssignees, taskProjects, taskReferenceDate } from '@/data/tasks.seed';
import { sortTasks } from '@/data/tasks.sort';
import { formatDueDate } from '@/data/workplace';
import { FilterSelect, MetricStrip, NoResults, Panel, Person } from '@/pages/shared/ProPage';
import shared from '@/pages/shared/ProPage.module.scss';
import { usePaginationLabels } from '@/pages/shared/use-pagination-labels';
import { useTaskEditor } from '@/pages/shared/use-task-editor';
import { getTaskPriorityLabel, getTaskStatusLabel } from '@/pages/tasks/task-presentation';
import { taskPriorityIntent, taskStatusIntent } from '@/pages/tasks/task-presentation';

import styles from './DataListPage.module.scss';

export function DataListPage({
  state,
  dispatch,
}: {
  state: TaskState;
  dispatch: Dispatch<TaskAction>;
}) {
  const { t, i18n } = useTranslation();
  const paginationLabels = usePaginationLabels();
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
            label: t('data.openBriefs'),
            value: state.tasks.length - completed,
            note: t('data.notYetCompleted'),
          },
          {
            label: t('data.readyForReview'),
            value: review,
            note: t('data.acceptanceIsTheNextStep'),
          },
          { label: t('data.completed'), value: completed, note: t('data.inTheCurrentRegister') },
          {
            label: t('data.focusAreas'),
            value: projects.length,
            note: t('data.sameProjectsSharedOwners'),
          },
        ]}
      />
      <div className={shared.twoColumns}>
        <Panel
          title={t('data.taskBriefs')}
          description={t('data.contextOwnershipAndDeliveryStateInOnePlace')}
          actions={
            <>
              <SegmentedControl
                size="small"
                variant="soft"
                value={layout}
                aria-label={t('data.briefLayout')}
                onValueChange={setLayout}
              >
                <SegmentedControl.Item value="list">{t('data.list')}</SegmentedControl.Item>
                <SegmentedControl.Item value="cards">{t('data.cards')}</SegmentedControl.Item>
              </SegmentedControl>

              <Link className={shared.link} to="/data/search-table">
                {t('data.openTaskRegister')}
              </Link>
            </>
          }
        >
          <div className={shared.toolbar}>
            <Input
              size="small"
              aria-label={t('data.searchTaskBriefs')}
              placeholder={t('data.searchBriefsOrPeople')}
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
              {t('data.valueBriefsMatch', { v0: filtered.length })}
            </span>
          </div>
          <div className={styles.filters}>
            <FilterSelect
              label={t('data.project')}
              value={project}
              onChange={(value) => {
                setProject(value);
                setPage(1);
              }}
              options={[
                { value: 'all', label: t('data.allProjects') },
                ...taskProjects.map((value) => ({ value, label: value })),
              ]}
            />
            <FilterSelect
              label={t('data.owner')}
              value={owner}
              onChange={(value) => {
                setOwner(value);
                setPage(1);
              }}
              options={[
                { value: 'all', label: t('data.allPeople') },
                ...taskAssignees.map((member) => ({ value: member.id, label: member.name })),
              ]}
            />
            <FilterSelect
              label={t('data.sortBy')}
              value={order}
              onChange={(value) => {
                setOrder(value);
                setPage(1);
              }}
              options={[
                { value: 'due', label: t('data.dueDateSoonest') },
                { value: 'recent', label: t('data.newestFirst') },
                { value: 'effort', label: t('data.largestEstimate') },
              ]}
            />
          </div>
          <div className={styles.viewBar}>
            <SegmentedControl
              size="small"
              value={scope}
              aria-label={t('data.briefStatus')}
              onValueChange={(value) => {
                setScope(value);
                setPage(1);
              }}
            >
              <SegmentedControl.Item value="open">{t('data.open')}</SegmentedControl.Item>
              <SegmentedControl.Item value="review">{t('data.inReview')}</SegmentedControl.Item>
              <SegmentedControl.Item value="done">{t('data.done')}</SegmentedControl.Item>
              <SegmentedControl.Item value="all">{t('data.all')}</SegmentedControl.Item>
            </SegmentedControl>
            <Button size="small" variant="text" onClick={reset}>
              {t('data.resetFilters')}
            </Button>
          </div>
          <ul className={styles.briefs} data-layout={layout} aria-label={t('data.taskBriefs')}>
            {view.tasks.map((task) => {
              const related = projects.find((item) => item.name === task.project)!;
              return (
                <li key={task.id}>
                  <article className={styles.brief} aria-label={`${task.id}: ${task.title}`}>
                    <div className={styles.briefTop}>
                      <span className={shared.mono}>{task.id}</span>
                      <div>
                        <Tag size="sm" intent={taskStatusIntent[task.status]}>
                          {getTaskStatusLabel(t, task.status)}
                        </Tag>
                        <Tag size="sm" intent={taskPriorityIntent[task.priority]} variant="outline">
                          {getTaskPriorityLabel(t, task.priority)}
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
                      <span>{t('data.valueHEstimated', { v0: task.estimateHours })}</span>
                      <span data-overdue={isOverdue(task, taskReferenceDate)}>
                        {task.dueDate ? (
                          <>
                            <time dateTime={task.dueDate}>
                              {t('data.dueValue', {
                                v0: formatDueDate(task.dueDate, i18n.language),
                              })}
                            </time>
                            {isOverdue(task, taskReferenceDate) ? t('data.overdue') : ''}
                          </>
                        ) : (
                          t('data.unscheduled')
                        )}
                      </span>
                    </div>
                    <div className={styles.briefFooter}>
                      <Person id={task.assignee} />
                      <Button
                        size="small"
                        variant="text"
                        onClick={(event) => editor.open(task, event.currentTarget)}
                        aria-label={t('data.readBriefValue', { v0: task.id })}
                      >
                        {t('data.readBrief')}
                      </Button>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
          {!filtered.length ? (
            <NoResults title={t('data.noBriefsMatchThisView')} onReset={reset} />
          ) : null}
          <div className={shared.footer}>
            <span>
              {t('data.showingValueValueOfValue', {
                v0: view.range[0],
                v1: view.range[1],
                v2: filtered.length,
              })}
            </span>
            <Pagination
              labels={paginationLabels}
              total={filtered.length}
              page={view.page}
              pageSize={6}
              onChange={setPage}
              aria-label={t('data.briefPages')}
              className={styles.pagination}
            />
          </div>
          <div className={styles.feedback} role="status">
            {editor.feedback || t('data.briefsAndTheTaskRegisterShareTheSameSaved')}
          </div>
        </Panel>
        <div className={shared.stack}>
          <Panel
            title={t('data.octoberCheckpoint')}
            description={t('data.prepareTheNextTeamHandoff')}
          >
            <div className={shared.body}>
              <span className={shared.eyebrow}>{t('data.oct06ReleaseReadiness')}</span>
              <h3 className={styles.asideTitle}>{t('data.makeAcceptanceVisible')}</h3>
              <p className={styles.asideCopy}>
                {t('data.attachReviewNotesConfirmTheNextOwnerAndSurface')}
              </p>
              <div className={styles.checkpointMetric}>
                <strong>{review}</strong>
                <span>{t('data.briefsWaitingForReview')}</span>
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
                {t('data.reviewTheQueue')}
              </Button>
            </div>
          </Panel>
          <Panel title={t('data.focusAreas')} description={t('data.openWorkInTheCurrentRegister')}>
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
                      <span>{t('data.valueOpen', { v0: count })}</span>
                    </div>
                    <Progress
                      size="sm"
                      value={count}
                      max={Math.max(1, state.tasks.length - completed)}
                      aria-label={t('data.valueOpenTaskShare', { v0: item.name })}
                    />
                  </li>
                );
              })}
            </ul>
          </Panel>
          <Panel title={t('data.howBriefsConnect')}>
            <div className={shared.body}>
              <p className={styles.asideCopy}>{t('data.aBriefIsTheFullContextOfATask')}</p>
              <Link className={shared.link} to="/work/projects">
                {t('data.exploreThePortfolio')}
              </Link>
            </div>
          </Panel>
        </div>
      </div>
      {editor.editor}
    </div>
  );
}
