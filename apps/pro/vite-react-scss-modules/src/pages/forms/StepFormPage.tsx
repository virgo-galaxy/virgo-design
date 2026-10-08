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
import { type Dispatch, type SetStateAction, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useParams } from 'react-router';

import { MutationFeedback } from '@/application/MutationFeedback';
import { useProData } from '@/application/pro-data-context';
import { useCurrentUser } from '@/application/session-context';
import { useMutation } from '@/application/use-mutation';
import {
  type HandoffDraft,
  reconcileScope,
  scopeGroups,
  scopeTreeValues,
  validateHandoff,
  type WorkflowReceipt,
} from '@/data/pro-workflows';
import type { TaskState } from '@/data/tasks';
import { isAdmin } from '@/lib/auth/permissions';
import { businessLabel } from '@/lib/demo/labels';
import { FilterSelect, Panel } from '@/pages/shared/ProPage';
import shared from '@/pages/shared/ProPage.module.scss';
import { getTaskStatusLabel } from '@/pages/tasks/task-presentation';
import { taskLabelStyles, taskStatusIntent } from '@/pages/tasks/task-presentation';

import styles from './FormsPage.module.scss';

export function StepFormPage({
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
  const { projects } = useProData();
  const { projectId } = useParams();
  useEffect(() => {
    if (projectId && projects.some((p) => p.id === projectId) && draft.projectId !== projectId) {
      setDraft((current) => ({ ...current, projectId, taskIds: [], confirmed: false }));
      setStage(0);
    }
  }, [projectId, projects, draft.projectId, setDraft, setStage]);

  const mutation = useMutation();
  const { t, i18n } = useTranslation();
  const stages = [
    { title: t('forms.defineTheHandoff'), description: t('forms.projectAndSchedule') },
    { title: t('forms.buildTheScope'), description: t('forms.workAndAudience') },
    { title: t('forms.reviewAndPrepare'), description: t('forms.oneFinalCheck') },
  ];
  const navigate = useNavigate();
  const admin = isAdmin(useCurrentUser());
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
        <Empty.Title>{t('data.projectNotFound')}</Empty.Title>
        <Empty.Action>
          <Link className={shared.link} to="/work/projects">
            {t('data.backToProjects')}
          </Link>
        </Empty.Action>
      </Empty>
    );
  if (projectId && draft.projectId !== projectId) return <Skeleton variant="text" />;
  return (
    <div className={shared.page}>
      <Link className={shared.link} to={`/work/projects/${encodeURIComponent(draft.projectId)}`}>
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
      <h1 className={shared.srOnly}>{t('app.stepForm')}</h1>
      <Surface border="default" radius={8} className={styles.wizardSurface}>
        <div className={styles.wizard}>
          <div className={styles.stepsFrame}>
            <Steps className={styles.steps} aria-label={t('forms.handoffSteps')}>
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
            title={t('forms.stepValueValue', { v0: stage + 1, v1: stages[stage]!.title })}
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
                    if (admin) navigate(`/result/${receipt.outcome}`);
                    else setSubmission(receipt);
                  }
                });
              }}
            >
              <div className={styles.fields}>
                <h3 tabIndex={-1} ref={headingRef} className={styles.stageHeading}>
                  {stage === 0
                    ? t('forms.aClearDestination')
                    : stage === 1
                      ? t('forms.chooseWhatGoesIntoThePacket')
                      : t('forms.readyForTheNextTeamHandoff')}
                </h3>
                {Object.keys(errors).length ? (
                  <Alert intent="error">
                    <Alert.Title>{t('forms.checkTheHandoffDetails')}</Alert.Title>
                    <Alert.Description>
                      {Object.values(errors).map((error) => (
                        <p key={error}>{t(`forms.validation.${error}`)}</p>
                      ))}
                    </Alert.Description>
                  </Alert>
                ) : null}
                {stage === 0 ? (
                  <>
                    <Field required invalid={Boolean(errors.title)}>
                      <Field.Label>{t('forms.handoffTitle')}</Field.Label>
                      <Input
                        value={businessLabel(draft.title, i18n.language)}
                        maxLength={100}
                        onChange={(event) => update('title', event.target.value)}
                      />
                      {errors.title ? (
                        <Field.Message>{t(`forms.validation.${errors.title}`)}</Field.Message>
                      ) : null}
                    </Field>
                    <FilterSelect
                      label={t('forms.handoffProject')}
                      value={draft.projectId}
                      onChange={(value) => {
                        navigate(`/work/projects/${encodeURIComponent(value)}/handoff`);
                        setStage(0);
                        setDraft((previous) => ({
                          ...previous,
                          projectId: value,
                          taskIds: [],
                          confirmed: false,
                        }));
                        setErrors({});
                      }}
                      options={projects.map((item) => ({
                        value: item.id,
                        label: businessLabel(item.name, i18n.language),
                      }))}
                    />
                    <div className={styles.fieldGrid}>
                      <Field required invalid={Boolean(errors.date)}>
                        <Field.Label>{t('forms.handoffDate')}</Field.Label>
                        <DatePicker
                          size="medium"
                          value={draft.date}
                          onValueChange={(value) => update('date', value)}
                          min="2026-10-03"
                        >
                          <DatePicker.Input />
                          <DatePicker.Trigger aria-label={t('forms.chooseHandoffDate')} />
                          <DatePicker.Content aria-label={t('forms.handoffDateCalendar')}>
                            <DatePicker.Calendar
                              locale={i18n.language}
                              defaultMonth="2026-10"
                              weekStartsOn={1}
                            />
                          </DatePicker.Content>
                        </DatePicker>
                        {errors.date ? (
                          <Field.Message>{t(`forms.validation.${errors.date}`)}</Field.Message>
                        ) : null}
                      </Field>
                      <Field required invalid={Boolean(errors.time)}>
                        <Field.Label>{t('forms.handoffTime')}</Field.Label>
                        <TimePicker
                          size="medium"
                          value={draft.time}
                          onValueChange={(value) => update('time', value)}
                        />
                        <Field.Description>{t('forms.asiaShanghaiUtc0800')}</Field.Description>
                        {errors.time ? (
                          <Field.Message>{t(`forms.validation.${errors.time}`)}</Field.Message>
                        ) : null}
                      </Field>
                    </div>
                    <p className={styles.stageCopy}>
                      {t('forms.valueYourSelectionsWillBeKeptWhileMovingBetween', {
                        v0: businessLabel(project?.summary ?? '', i18n.language),
                      })}
                    </p>
                  </>
                ) : stage === 1 ? (
                  <div className={styles.scopeLayout}>
                    <div>
                      <div className={styles.treeTools}>
                        <Tag size="md" variant="outline">
                          {t('forms.valueValueSelected', {
                            v0: selected.length,
                            v1: selected.length === 1 ? 'task' : 'tasks',
                          })}
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
                            {t('forms.selectAll')}
                          </Button>
                          <Button
                            size="medium"
                            variant="text"
                            type="button"
                            onClick={() => update('taskIds', [])}
                          >
                            {t('forms.clear')}
                          </Button>
                        </Button.Group>
                      </div>
                      <Tree
                        key={draft.projectId}
                        className={styles.scopeTree}
                        size="medium"
                        selectionMode="multiple"
                        aria-label={t('forms.handoffTaskScope')}
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
                            textValue={t(`forms.scopeLabels.${group.id}`)}
                          >
                            <Tree.Label className={styles.treeLabel}>
                              <Tree.Toggle
                                aria-label={t('forms.toggleValue', { v0: group.title })}
                              />
                              <span
                                className={styles.treeMark}
                                data-selected={treeValues.includes(group.id)}
                              >
                                {treeValues.includes(group.id) ? '✓' : '＋'}
                              </span>
                              <strong>
                                {t(`forms.scopeLabels.${group.id}`)} · {group.tasks.length}
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
                                        {t('forms.valueValueH', {
                                          v0: task.id,
                                          v1: task.estimateHours,
                                        })}
                                      </span>
                                    </span>
                                    <Tag
                                      size="md"
                                      intent={taskStatusIntent[task.status]}
                                      className={taskLabelStyles.tag}
                                    >
                                      {getTaskStatusLabel(t, task.status)}
                                    </Tag>
                                  </Tree.Label>
                                </Tree.Item>
                              ))}
                            </Tree.Group>
                          </Tree.Item>
                        ))}
                      </Tree>
                      <p className={styles.scopeNote}>
                        {t('forms.selectAGroupToIncludeItsTasksOrSelect')}
                      </p>
                    </div>
                    <div className={shared.stack}>
                      <fieldset className={styles.fieldset}>
                        <legend>{t('forms.packetAudience')}</legend>
                        <Radio.Group
                          aria-label={t('forms.packetAudience')}
                          value={draft.audience}
                          orientation="vertical"
                          onValueChange={(value) => {
                            if (value === 'team' || value === 'external') update('audience', value);
                          }}
                        >
                          <Radio value="team" className={styles.choice!}>
                            {t('forms.teamWorkspace')}
                          </Radio>
                          <Radio value="external" className={styles.choice!}>
                            {t('forms.externalCollaborators')}
                          </Radio>
                        </Radio.Group>
                        <p className={shared.caption}>
                          {t(
                            'forms.workspaceReleaseMaterialCurrentlySupportsTeamAccessExternalPreparation',
                          )}
                        </p>
                      </fieldset>
                      <Field invalid={Boolean(errors.notes)}>
                        <Field.Label>{t('forms.handoffNotes')}</Field.Label>
                        <Textarea
                          rows={5}
                          value={draft.notes}
                          maxLength={1500}
                          onChange={(event) => update('notes', event.target.value)}
                          placeholder={t('forms.acceptanceNotesRisksAndTheNextOwner')}
                        />
                      </Field>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className={styles.reviewGrid}>
                      <dl className={styles.reviewMetadata}>
                        <div>
                          <dt>{t('forms.handoff')}</dt>
                          <dd>{businessLabel(draft.title, i18n.language)}</dd>
                        </div>
                        <div>
                          <dt>{t('forms.project')}</dt>
                          <dd>{businessLabel(project?.name ?? '', i18n.language)}</dd>
                        </div>
                        <div>
                          <dt>{t('forms.scheduleUtc0800')}</dt>
                          <dd>
                            {draft.date} · {draft.time}
                          </dd>
                        </div>
                        <div>
                          <dt>{t('forms.audience')}</dt>
                          <dd>
                            <Tag size="md" intent={draft.audience === 'team' ? 'info' : 'warning'}>
                              {draft.audience === 'team'
                                ? t('forms.teamWorkspace')
                                : t('forms.externalCollaborators')}
                            </Tag>
                          </dd>
                        </div>
                      </dl>
                      <div>
                        <span className={shared.eyebrow}>
                          {t('forms.packetScopeValueTasks', { v0: selected.length })}
                        </span>
                        <ul className={styles.scopeReview}>
                          {selected.map((task) => (
                            <li key={task.id}>
                              <span>
                                <span className={shared.mono}>{task.id}</span>
                                {businessLabel(task.title, i18n.language)}
                              </span>
                              <Tag
                                size="md"
                                intent={taskStatusIntent[task.status]}
                                className={taskLabelStyles.tag}
                              >
                                {getTaskStatusLabel(t, task.status)}
                              </Tag>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    {draft.notes ? <div className={styles.reviewNotes}>{draft.notes}</div> : null}
                    {draft.audience === 'external' && draft.projectId === 'online-store' ? (
                      <Alert intent="warning">
                        <Alert.Title>{t('forms.externalAccessNeedsReview')}</Alert.Title>
                        <Alert.Description>
                          {t('forms.thePacketWillBeCheckedAgainstWorkspaceSCurrent')}
                        </Alert.Description>
                      </Alert>
                    ) : null}
                    <Checkbox
                      checked={draft.confirmed}
                      onChange={(event) => update('confirmed', event.target.checked)}
                    >
                      {t('forms.iReviewedTheTaskScopeAudienceAndSchedule')}
                    </Checkbox>
                  </>
                )}
              </div>
              <div className={styles.wizardFooter}>
                <span className={shared.caption}>
                  {t('forms.stepValueOf3DraftKeptInThisSession', { v0: stage + 1 })}
                </span>
                <Button.Group layout="custom" className={shared.actions}>
                  {stage > 0 ? (
                    <Button
                      size="medium"
                      variant="outline"
                      type="button"
                      onClick={() => move(stage - 1)}
                    >
                      {t('forms.back')}
                    </Button>
                  ) : null}
                  <Button
                    size="medium"
                    type="submit"
                    disabled={mutation.pending}
                    trailingIcon={<ArrowRightIcon />}
                  >
                    {stage === 2 ? t('forms.prepareHandoff') : t('forms.continue')}
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
