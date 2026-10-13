import { ArrowRightIcon, CheckIcon } from '@virgo-design/icons';
import {
  Alert,
  Button,
  Checkbox,
  DatePicker,
  Empty,
  Field,
  Form,
  Input,
  Radio,
  Skeleton,
  Steps,
  Surface,
  Tag,
  Textarea,
  TimePicker,
  Tree,
} from '@virgo-design/ui';
import {
  type Dispatch,
  type SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useParams } from 'react-router';

import { ExceptionState } from '@/components/exception-state/ExceptionState';
import { FilterSelect } from '@/components/filters/FilterSelect';
import { Panel } from '@/components/page/Panel';
import { useCurrentUser } from '@/features/auth';
import { CatalogBoundary, useTaskCatalog } from '@/features/catalog';
import { projectHandoffPath } from '@/features/projects';
import type { TaskState } from '@/features/tasks';
import {
  getTaskCollection,
  taskStatusIntent,
  taskStatusLabelNames,
  useTaskDependentQuery,
} from '@/features/tasks';
import { canManageProject, isAdmin } from '@/lib/auth/permissions';
import { businessLabel } from '@/lib/demo/labels';
import { routePath } from '@/routes';
import { MutationFeedback } from '@/shared/async/MutationFeedback';
import { RemoteState } from '@/shared/async/RemoteState';
import { useMutation } from '@/shared/async/use-mutation';
import shared from '@/styles/product-layout.module.scss';

import { useHandoffSession } from '../context/handoff-session-context';
import {
  type HandoffDraft,
  reconcileScope,
  scopeGroups,
  scopeTreeValues,
  validateHandoff,
  type WorkflowReceipt,
} from '../model/handoff';
import styles from './ProjectHandoffPage.module.scss';

function ProjectHandoffPageView({
  draft,
  setDraft,
  state,
  stage,
  setStage,
  onPrepare,
}: {
  draft: HandoffDraft;
  setDraft: Dispatch<SetStateAction<HandoffDraft>>;
  state: TaskState;
  stage: number;
  setStage: Dispatch<SetStateAction<number>>;
  onPrepare: () => Promise<WorkflowReceipt>;
}) {
  const { projects } = useTaskCatalog();
  const { projectId } = useParams();
  useEffect(() => {
    if (projectId && projects.some((p) => p.id === projectId) && draft.projectId !== projectId) {
      setDraft((current) => ({ ...current, projectId, taskIds: [], confirmed: false }));
      setStage(0);
    }
  }, [projectId, projects, draft.projectId, setDraft, setStage]);

  useEffect(() => {
    setSubmission(null);
    setErrors({});
  }, [projectId]);
  const mutation = useMutation();
  const { t, i18n } = useTranslation();
  const stages = [
    { title: t('handoff.defineTheHandoff'), description: t('handoff.projectAndSchedule') },
    { title: t('handoff.buildTheScope'), description: t('handoff.workAndAudience') },
    { title: t('handoff.reviewAndPrepare'), description: t('handoff.oneFinalCheck') },
  ];
  const navigate = useNavigate();
  const user = useCurrentUser()!;
  const admin = isAdmin(user);
  const [submission, setSubmission] = useState<WorkflowReceipt | null>(null);
  const [errors, setErrors] = useState<ReturnType<typeof validateHandoff>>({});
  const [expanded, setExpanded] = useState<readonly string[]>([
    'scope-review',
    'scope-open',
    'scope-done',
  ]);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const groups = scopeGroups(draft.projectId, state.tasks, projects);
  const selected = groups
    .flatMap((group) => group.tasks)
    .filter((task) => draft.taskIds.includes(task.id));
  const treeValues = scopeTreeValues(draft.taskIds, groups);
  const project = projects.find((item) => item.id === draft.projectId)!;
  const update = <Key extends keyof HandoffDraft>(key: Key, value: HandoffDraft[Key]) => {
    setDraft((previous) => ({
      ...previous,
      [key]: value,
      confirmed: key === 'confirmed' ? Boolean(value) : false,
    }));
    setErrors((previous) => {
      const next = { ...previous };
      delete next[key];
      return next;
    });
    setSubmission(null);
  };
  const move = (next: number) => {
    if (next > stage) {
      const invalid = validateHandoff(draft, state.tasks, next - 1, projects);
      setErrors(invalid);
      if (Object.keys(invalid).length) {
        requestAnimationFrame(() =>
          formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus(),
        );
        return;
      }
    }
    setStage(next);
    setErrors({});
    requestAnimationFrame(() => headingRef.current?.focus());
  };
  if (projectId && !projects.some((item) => item.id === projectId))
    return (
      <Empty>
        <Empty.Title>{t('projectDetails.projectNotFound')}</Empty.Title>
        <Empty.Action>
          <Link className={shared.link} to={routePath('projects')}>
            {t('projectDetails.backToProjects')}
          </Link>
        </Empty.Action>
      </Empty>
    );
  if (project && !canManageProject(user, project.id)) return <ExceptionState code="403" />;
  if (projectId && draft.projectId !== projectId) return <Skeleton variant="text" />;
  return (
    <div className={shared.page}>
      <Link
        className={shared.link}
        to={routePath('project-detail', { projectId: draft.projectId })}
      >
        {t('tasks.workspace.backToProject')}
      </Link>
      <MutationFeedback pending={mutation.pending} error={mutation.error} />
      {submission ? (
        <Alert intent={submission.outcome === 'success' ? 'success' : 'error'}>
          <Alert.Title>{t(`results.receipts.${submission.message}.title`)}</Alert.Title>
          <Alert.Description>
            {t(`results.receipts.${submission.message}.description`)}
          </Alert.Description>
        </Alert>
      ) : null}
      <h1 className={shared.srOnly}>{t('tasks.workspace.handoff')}</h1>
      <Surface border="default" radius={8} className={styles.wizardSurface}>
        <div className={styles.wizard}>
          <div className={styles.stepsFrame}>
            <Steps className={styles.steps} aria-label={t('handoff.handoffSteps')}>
              {stages.map((item, index) => (
                <Steps.Item
                  key={item.title}
                  status={index === stage ? 'current' : index < stage ? 'complete' : 'upcoming'}
                >
                  <Steps.Trigger onClick={() => move(index)}>
                    <Steps.Indicator>
                      {index < stage ? <CheckIcon size={16} /> : `0${index + 1}`}
                    </Steps.Indicator>
                    <Steps.Title>{item.title}</Steps.Title>
                    <Steps.Description>{item.description}</Steps.Description>
                  </Steps.Trigger>
                </Steps.Item>
              ))}
            </Steps>
          </div>
          <Panel
            className={styles.wizardStage!}
            title={t('handoff.stepValueValue', { v0: stage + 1, v1: stages[stage]!.title })}
            description={stages[stage]!.description}
          >
            <Form
              inert={mutation.pending}
              aria-busy={mutation.pending}
              className={styles.wizardForm}
              ref={formRef}
              size="medium"
              noValidate
              onSubmit={(event) => {
                event.preventDefault();
                if (stage < 2) {
                  move(stage + 1);
                  return;
                }
                const invalid = validateHandoff(draft, state.tasks, 2, projects);
                setErrors(invalid);
                if (Object.keys(invalid).length) return;
                void mutation.run(async () => {
                  const receipt = await onPrepare();
                  if (receipt) {
                    if (admin) navigate(routePath(receipt.outcome));
                    else setSubmission(receipt);
                  }
                });
              }}
            >
              <div className={styles.fields}>
                <h3 tabIndex={-1} ref={headingRef} className={styles.stageHeading}>
                  {stage === 0
                    ? t('handoff.aClearDestination')
                    : stage === 1
                      ? t('handoff.chooseWhatGoesIntoThePacket')
                      : t('handoff.readyForTheNextTeamHandoff')}
                </h3>
                {Object.keys(errors).length ? (
                  <Alert intent="error">
                    <Alert.Title>{t('handoff.checkTheHandoffDetails')}</Alert.Title>
                    <Alert.Description>
                      {Object.values(errors).map((error) => (
                        <p key={error}>{t(`handoff.validation.${error}`)}</p>
                      ))}
                    </Alert.Description>
                  </Alert>
                ) : null}
                {stage === 0 ? (
                  <>
                    <Field required invalid={Boolean(errors.title)}>
                      <Field.Label>{t('handoff.handoffTitle')}</Field.Label>
                      <Input
                        value={draft.title}
                        maxLength={100}
                        onChange={(event) => update('title', event.target.value)}
                      />
                      {errors.title ? (
                        <Field.Message>{t(`handoff.validation.${errors.title}`)}</Field.Message>
                      ) : null}
                    </Field>
                    <FilterSelect
                      label={t('handoff.handoffProject')}
                      value={draft.projectId}
                      onChange={(value) => {
                        navigate(projectHandoffPath(value));
                        setStage(0);
                        setDraft((previous) => ({
                          ...previous,
                          projectId: value,
                          taskIds: [],
                          confirmed: false,
                        }));
                        setErrors({});
                      }}
                      options={projects
                        .filter((item) => canManageProject(user, item.name))
                        .map((item) => ({
                          value: item.id,
                          label: businessLabel(item.name, i18n.language),
                        }))}
                    />
                    <div className={styles.fieldGrid}>
                      <Field required invalid={Boolean(errors.date)}>
                        <Field.Label>{t('handoff.handoffDate')}</Field.Label>
                        <DatePicker
                          size="medium"
                          value={draft.date}
                          onValueChange={(value) => update('date', value)}
                          min={project?.start}
                        >
                          <DatePicker.Input />
                          <DatePicker.Trigger aria-label={t('handoff.chooseHandoffDate')} />
                          <DatePicker.Content aria-label={t('handoff.handoffDateCalendar')}>
                            <DatePicker.Calendar
                              locale={i18n.language}
                              defaultMonth={draft.date.slice(0, 7)}
                              weekStartsOn={1}
                            />
                          </DatePicker.Content>
                        </DatePicker>
                        {errors.date ? (
                          <Field.Message>{t(`handoff.validation.${errors.date}`)}</Field.Message>
                        ) : null}
                      </Field>
                      <Field required invalid={Boolean(errors.time)}>
                        <Field.Label>{t('handoff.handoffTime')}</Field.Label>
                        <TimePicker
                          size="medium"
                          value={draft.time}
                          onValueChange={(value) => update('time', value)}
                        />
                        <Field.Description>{t('handoff.asiaShanghaiUtc0800')}</Field.Description>
                        {errors.time ? (
                          <Field.Message>{t(`handoff.validation.${errors.time}`)}</Field.Message>
                        ) : null}
                      </Field>
                    </div>
                    <p className={styles.stageCopy}>
                      {t('handoff.valueYourSelectionsWillBeKeptWhileMovingBetween', {
                        v0: businessLabel(project?.summary ?? '', i18n.language),
                      })}
                    </p>
                  </>
                ) : stage === 1 ? (
                  <div className={styles.scopeLayout}>
                    <div>
                      <div className={styles.treeTools}>
                        <Tag size="md" variant="outline">
                          {t('handoff.selectedTasks', { count: selected.length })}
                        </Tag>
                        <Button.Group layout="custom" className={shared.actions}>
                          <Button
                            size="medium"
                            variant="text"
                            type="button"
                            onClick={() =>
                              update(
                                'taskIds',
                                groups.flatMap((group) => group.tasks.map((task) => task.id)),
                              )
                            }
                          >
                            {t('handoff.selectAll')}
                          </Button>
                          <Button
                            size="medium"
                            variant="text"
                            type="button"
                            onClick={() => update('taskIds', [])}
                          >
                            {t('handoff.clear')}
                          </Button>
                        </Button.Group>
                      </div>
                      <Tree
                        key={draft.projectId}
                        className={styles.scopeTree}
                        size="medium"
                        selectionMode="multiple"
                        aria-label={t('handoff.handoffTaskScope')}
                        expandedValues={expanded}
                        onExpandedValuesChange={setExpanded}
                        selectedValues={treeValues}
                        onSelectedValuesChange={(next) =>
                          update('taskIds', reconcileScope(draft.taskIds, next, groups))
                        }
                      >
                        {groups.map((group) => (
                          <Tree.Item
                            key={group.id}
                            value={group.id}
                            branch
                            textValue={t(`handoff.scopeLabels.${group.id}`)}
                          >
                            <Tree.Label className={styles.treeLabel}>
                              <Tree.Toggle
                                aria-label={t('handoff.toggleValue', {
                                  v0: t(`handoff.scopeLabels.${group.id}`),
                                })}
                              />
                              <span
                                className={styles.treeMark}
                                data-selected={treeValues.includes(group.id)}
                              >
                                {treeValues.includes(group.id) ? '✓' : '＋'}
                              </span>
                              <strong>
                                {t(`handoff.scopeLabels.${group.id}`)} · {group.tasks.length}
                              </strong>
                            </Tree.Label>
                            <Tree.Group>
                              {group.tasks.map((task) => (
                                <Tree.Item
                                  key={task.id}
                                  value={task.id}
                                  textValue={`${task.id} ${businessLabel(task.title, i18n.language)}`}
                                >
                                  <Tree.Label className={styles.treeLabel}>
                                    <span
                                      className={styles.treeMark}
                                      data-selected={draft.taskIds.includes(task.id)}
                                    >
                                      {draft.taskIds.includes(task.id) ? '✓' : '＋'}
                                    </span>
                                    <span className={styles.treeCopy}>
                                      <span>{businessLabel(task.title, i18n.language)}</span>
                                      <span className={shared.mono}>
                                        {t('handoff.valueValueH', {
                                          v0: task.id,
                                          v1: task.estimateHours,
                                        })}
                                      </span>
                                    </span>
                                    <Tag size="md" intent={taskStatusIntent[task.status]}>
                                      {t(`tasks.statusLabels.${taskStatusLabelNames[task.status]}`)}
                                    </Tag>
                                  </Tree.Label>
                                </Tree.Item>
                              ))}
                            </Tree.Group>
                          </Tree.Item>
                        ))}
                      </Tree>
                      <p className={styles.scopeNote}>
                        {t('handoff.selectAGroupToIncludeItsTasksOrSelect')}
                      </p>
                    </div>
                    <div className={shared.stack}>
                      <fieldset className={styles.fieldset}>
                        <legend>{t('handoff.packetAudience')}</legend>
                        <Radio.Group
                          aria-label={t('handoff.packetAudience')}
                          value={draft.audience}
                          orientation="vertical"
                          onValueChange={(value) => {
                            if (value === 'team' || value === 'external') update('audience', value);
                          }}
                        >
                          <Radio value="team" className={styles.choice!}>
                            {t('handoff.teamWorkspace')}
                          </Radio>
                          <Radio value="external" className={styles.choice!}>
                            {t('handoff.externalCollaborators')}
                          </Radio>
                        </Radio.Group>
                        <p className={shared.caption}>
                          {t(
                            'handoff.workspaceReleaseMaterialCurrentlySupportsTeamAccessExternalPreparation',
                          )}
                        </p>
                      </fieldset>
                      <Field invalid={Boolean(errors.notes)}>
                        <Field.Label>{t('handoff.handoffNotes')}</Field.Label>
                        <Textarea
                          rows={5}
                          value={draft.notes}
                          maxLength={1500}
                          onChange={(event) => update('notes', event.target.value)}
                          placeholder={t('handoff.acceptanceNotesRisksAndTheNextOwner')}
                        />
                      </Field>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className={styles.reviewGrid}>
                      <dl className={styles.reviewMetadata}>
                        <div>
                          <dt>{t('handoff.handoff')}</dt>
                          <dd>{businessLabel(draft.title, i18n.language)}</dd>
                        </div>
                        <div>
                          <dt>{t('handoff.project')}</dt>
                          <dd>{businessLabel(project?.name ?? '', i18n.language)}</dd>
                        </div>
                        <div>
                          <dt>{t('handoff.scheduleUtc0800')}</dt>
                          <dd>
                            {draft.date} · {draft.time}
                          </dd>
                        </div>
                        <div>
                          <dt>{t('handoff.audience')}</dt>
                          <dd>
                            <Tag size="md" intent={draft.audience === 'team' ? 'info' : 'warning'}>
                              {draft.audience === 'team'
                                ? t('handoff.teamWorkspace')
                                : t('handoff.externalCollaborators')}
                            </Tag>
                          </dd>
                        </div>
                      </dl>
                      <div>
                        <span className={shared.eyebrow}>
                          {t('handoff.packetScopeValueTasks', { v0: selected.length })}
                        </span>
                        <ul className={styles.scopeReview}>
                          {selected.map((task) => (
                            <li key={task.id}>
                              <span>
                                <span className={shared.mono}>{task.id}</span>
                                {businessLabel(task.title, i18n.language)}
                              </span>
                              <Tag size="md" intent={taskStatusIntent[task.status]}>
                                {t(`tasks.statusLabels.${taskStatusLabelNames[task.status]}`)}
                              </Tag>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    {draft.notes ? <div className={styles.reviewNotes}>{draft.notes}</div> : null}
                    {draft.audience === 'external' && draft.projectId === 'online-store' ? (
                      <Alert intent="warning">
                        <Alert.Title>{t('handoff.externalAccessNeedsReview')}</Alert.Title>
                        <Alert.Description>
                          {t('handoff.thePacketWillBeCheckedAgainstWorkspaceSCurrent')}
                        </Alert.Description>
                      </Alert>
                    ) : null}
                    <Checkbox
                      checked={draft.confirmed}
                      onChange={(event) => update('confirmed', event.target.checked)}
                    >
                      {t('handoff.iReviewedTheTaskScopeAudienceAndSchedule')}
                    </Checkbox>
                  </>
                )}
              </div>
              <div className={styles.wizardFooter}>
                <span className={shared.caption}>
                  {t('handoff.stepValueOf3DraftKeptInThisSession', { v0: stage + 1 })}
                </span>
                <Button.Group layout="custom" className={shared.actions}>
                  {stage > 0 ? (
                    <Button
                      size="medium"
                      variant="outline"
                      type="button"
                      onClick={() => move(stage - 1)}
                    >
                      {t('handoff.back')}
                    </Button>
                  ) : null}
                  <Button
                    size="medium"
                    type="submit"
                    disabled={mutation.pending || Boolean(submission)}
                    trailingIcon={<ArrowRightIcon />}
                  >
                    {stage === 2 ? t('handoff.prepareHandoff') : t('handoff.continue')}
                  </Button>
                </Button.Group>
              </div>
            </Form>
          </Panel>
        </div>
      </Surface>
    </div>
  );
}

function HandoffResource() {
  const { projectId } = useParams();
  const session = useHandoffSession();
  const { projects, metadata } = useTaskCatalog();
  const { initialize } = session;
  useEffect(
    () => initialize(metadata.referenceDate, projectId ?? projects[0]?.id ?? ''),
    [initialize, metadata.referenceDate, projectId, projects],
  );
  const project = projects.find((item) => item.id === projectId);
  const id = project?.id;
  const load = useCallback(
    async (signal: AbortSignal) =>
      id ? (await getTaskCollection({ project: id }, signal)).items : [],
    [id],
  );
  const resource = useTaskDependentQuery(load);
  if (!resource.data) return <RemoteState {...resource} />;
  return (
    <>
      {resource.error ? <RemoteState error={resource.error} retry={resource.retry} /> : null}
      <ProjectHandoffPageView
        draft={session.draft}
        setDraft={session.setDraft}
        stage={session.stage}
        setStage={session.setStage}
        onPrepare={() => session.prepare()}
        state={{ tasks: resource.data }}
      />
    </>
  );
}
export function ProjectHandoffPage() {
  return (
    <CatalogBoundary>
      <HandoffResource />
    </CatalogBoundary>
  );
}
