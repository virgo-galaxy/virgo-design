import { ArrowRightIcon, CheckIcon } from '@virgo-design/icons';
import {
  Alert,
  Button,
  Checkbox,
  DatePicker,
  Field,
  Form,
  Input,
  Radio,
  Steps,
  Surface,
  Tag,
  Textarea,
  TimePicker,
  Tree,
} from '@virgo-design/ui';
import { type Dispatch, type SetStateAction, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { MutationFeedback } from '@/application/MutationFeedback';
import { useProData } from '@/application/pro-data-context';
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
import { FilterSelect, Panel } from '@/pages/shared/ProPage';
import shared from '@/pages/shared/ProPage.module.scss';
import { getTaskStatusLabel } from '@/pages/tasks/task-presentation';
import { taskStatusIntent } from '@/pages/tasks/task-presentation';

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

  const mutation = useMutation();
  const { t, i18n } = useTranslation();
  const stages = [
    { title: t('forms.defineTheHandoff'), description: t('forms.projectAndSchedule') },
    { title: t('forms.buildTheScope'), description: t('forms.workAndAudience') },
    { title: t('forms.reviewAndPrepare'), description: t('forms.oneFinalCheck') },
  ];
  const navigate = useNavigate();
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
  return (
    <div className={shared.page}>
      <MutationFeedback pending={mutation.pending} error={mutation.error} />
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
              size="small"
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
                  if (receipt) navigate(`/result/${receipt.outcome}`);
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
                        value={draft.title}
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
                        setDraft((previous) => ({
                          ...previous,
                          projectId: value,
                          taskIds: [],
                          confirmed: false,
                        }));
                        setErrors({});
                      }}
                      options={projects.map((item) => ({ value: item.id, label: item.name }))}
                    />
                    <div className={styles.fieldGrid}>
                      <Field required invalid={Boolean(errors.date)}>
                        <Field.Label>{t('forms.handoffDate')}</Field.Label>
                        <DatePicker
                          size="small"
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
                          size="small"
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
                        v0: project?.summary,
                      })}
                    </p>
                  </>
                ) : stage === 1 ? (
                  <div className={styles.scopeLayout}>
                    <div>
                      <div className={styles.treeTools}>
                        <Tag size="sm" variant="outline">
                          {t('forms.valueValueSelected', {
                            v0: selected.length,
                            v1: selected.length === 1 ? 'task' : 'tasks',
                          })}
                        </Tag>
                        <div className={shared.actions}>
                          <Button
                            size="small"
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
                            size="small"
                            variant="text"
                            type="button"
                            onClick={() => update('taskIds', [])}
                          >
                            {t('forms.clear')}
                          </Button>
                        </div>
                      </div>
                      <Tree
                        key={draft.projectId}
                        className={styles.scopeTree}
                        size="small"
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
                                  textValue={`${task.id} ${task.title}`}
                                >
                                  <Tree.Label className={styles.treeLabel}>
                                    <span
                                      className={styles.treeMark}
                                      data-selected={draft.taskIds.includes(task.id)}
                                    >
                                      {draft.taskIds.includes(task.id) ? '✓' : '＋'}
                                    </span>
                                    <span className={styles.treeCopy}>
                                      <span>{task.title}</span>
                                      <span className={shared.mono}>
                                        {t('forms.valueValueH', {
                                          v0: task.id,
                                          v1: task.estimateHours,
                                        })}
                                      </span>
                                    </span>
                                    <Tag size="sm" intent={taskStatusIntent[task.status]}>
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
                          <dd>{draft.title}</dd>
                        </div>
                        <div>
                          <dt>{t('forms.project')}</dt>
                          <dd>{project?.name}</dd>
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
                            <Tag size="sm" intent={draft.audience === 'team' ? 'info' : 'warning'}>
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
                                {task.title}
                              </span>
                              <Tag size="sm" intent={taskStatusIntent[task.status]}>
                                {getTaskStatusLabel(t, task.status)}
                              </Tag>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    {draft.notes ? <div className={styles.reviewNotes}>{draft.notes}</div> : null}
                    {draft.audience === 'external' && draft.projectId === 'workspace' ? (
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
                <div className={shared.actions}>
                  {stage > 0 ? (
                    <Button
                      size="small"
                      variant="outline"
                      type="button"
                      onClick={() => move(stage - 1)}
                    >
                      {t('forms.back')}
                    </Button>
                  ) : null}
                  <Button
                    size="small"
                    type="submit"
                    disabled={mutation.pending}
                    trailingIcon={<ArrowRightIcon />}
                  >
                    {stage === 2 ? t('forms.prepareHandoff') : t('forms.continue')}
                  </Button>
                </div>
              </div>
            </Form>
          </Panel>
        </div>
      </Surface>
    </div>
  );
}
