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
import { useNavigate } from 'react-router';

import {
  type HandoffDraft,
  reconcileScope,
  scopeGroups,
  scopeTreeValues,
  validateHandoff,
  type WorkflowReceipt,
} from '@/data/pro-workflows';
import { projects } from '@/data/projects';
import type { TaskState } from '@/data/tasks';
import { FilterSelect, Panel } from '@/pages/shared/ProPage';
import shared from '@/pages/shared/ProPage.module.scss';
import { taskStatusIntent } from '@/pages/tasks/task-presentation';

import styles from './FormsPage.module.scss';

const stages = [
  { title: 'Define the handoff', description: 'Project and schedule' },
  { title: 'Build the scope', description: 'Work and audience' },
  { title: 'Review and prepare', description: 'One final check' },
];

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
  onPrepare: () => WorkflowReceipt | null;
}) {
  const navigate = useNavigate();
  const [errors, setErrors] = useState<ReturnType<typeof validateHandoff>>({});
  const [expanded, setExpanded] = useState<readonly string[]>([
    'scope-review',
    'scope-open',
    'scope-done',
  ]);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const groups = scopeGroups(draft.projectId, state.tasks);
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
      const invalid = validateHandoff(draft, state.tasks, next - 1);
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
      <Surface border="default" radius={8} className={styles.wizardSurface}>
        <div className={styles.wizard}>
          <div className={styles.stepsFrame}>
            <Steps className={styles.steps} aria-label="Handoff steps">
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
            title={`Step ${stage + 1} / ${stages[stage]!.title}`}
            description={stages[stage]!.description}
          >
            <Form
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
                const invalid = validateHandoff(draft, state.tasks, 2);
                setErrors(invalid);
                if (Object.keys(invalid).length) return;
                const receipt = onPrepare();
                if (receipt) navigate(`/result/${receipt.outcome}`);
              }}
            >
              <div className={styles.fields}>
                <h3 tabIndex={-1} ref={headingRef} className={styles.stageHeading}>
                  {stage === 0
                    ? 'A clear destination.'
                    : stage === 1
                      ? 'Choose what goes into the packet.'
                      : 'Ready for the next team handoff.'}
                </h3>
                {Object.keys(errors).length ? (
                  <Alert intent="error">
                    <Alert.Title>Check the handoff details</Alert.Title>
                    <Alert.Description>
                      {Object.values(errors).map((error) => (
                        <p key={error}>{error}</p>
                      ))}
                    </Alert.Description>
                  </Alert>
                ) : null}
                {stage === 0 ? (
                  <>
                    <Field required invalid={Boolean(errors.title)}>
                      <Field.Label>Handoff title</Field.Label>
                      <Input
                        value={draft.title}
                        maxLength={100}
                        onChange={(event) => update('title', event.target.value)}
                      />
                      {errors.title ? <Field.Message>{errors.title}</Field.Message> : null}
                    </Field>
                    <FilterSelect
                      label="Handoff project"
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
                        <Field.Label>Handoff date</Field.Label>
                        <DatePicker
                          size="small"
                          value={draft.date}
                          onValueChange={(value) => update('date', value)}
                          min="2026-10-03"
                        >
                          <DatePicker.Input />
                          <DatePicker.Trigger aria-label="Choose handoff date" />
                          <DatePicker.Content aria-label="Handoff date calendar">
                            <DatePicker.Calendar
                              defaultMonth="2026-10"
                              locale="en-US"
                              weekStartsOn={1}
                            />
                          </DatePicker.Content>
                        </DatePicker>
                        {errors.date ? <Field.Message>{errors.date}</Field.Message> : null}
                      </Field>
                      <Field required invalid={Boolean(errors.time)}>
                        <Field.Label>Handoff time</Field.Label>
                        <TimePicker
                          size="small"
                          value={draft.time}
                          onValueChange={(value) => update('time', value)}
                        />
                        <Field.Description>Asia/Shanghai · UTC+08:00</Field.Description>
                        {errors.time ? <Field.Message>{errors.time}</Field.Message> : null}
                      </Field>
                    </div>
                    <p className={styles.stageCopy}>
                      {project?.summary} Your selections will be kept while moving between steps.
                    </p>
                  </>
                ) : stage === 1 ? (
                  <div className={styles.scopeLayout}>
                    <div>
                      <div className={styles.treeTools}>
                        <Tag size="sm" variant="outline">
                          {selected.length} {selected.length === 1 ? 'task' : 'tasks'} selected
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
                            Select all
                          </Button>
                          <Button
                            size="small"
                            variant="text"
                            type="button"
                            onClick={() => update('taskIds', [])}
                          >
                            Clear
                          </Button>
                        </div>
                      </div>
                      <Tree
                        key={draft.projectId}
                        className={styles.scopeTree}
                        size="small"
                        selectionMode="multiple"
                        aria-label="Handoff task scope"
                        expandedValues={expanded}
                        onExpandedValuesChange={setExpanded}
                        selectedValues={treeValues}
                        onSelectedValuesChange={(next) =>
                          update('taskIds', reconcileScope(draft.taskIds, next, groups))
                        }
                      >
                        {groups.map((group) => (
                          <Tree.Item key={group.id} value={group.id} branch textValue={group.title}>
                            <Tree.Label className={styles.treeLabel}>
                              <Tree.Toggle aria-label={`Toggle ${group.title}`} />
                              <span
                                className={styles.treeMark}
                                data-selected={treeValues.includes(group.id)}
                              >
                                {treeValues.includes(group.id) ? '✓' : '＋'}
                              </span>
                              <strong>
                                {group.title} · {group.tasks.length}
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
                                        {task.id} · {task.estimateHours}h
                                      </span>
                                    </span>
                                    <Tag size="sm" intent={taskStatusIntent[task.status]}>
                                      {task.status}
                                    </Tag>
                                  </Tree.Label>
                                </Tree.Item>
                              ))}
                            </Tree.Group>
                          </Tree.Item>
                        ))}
                      </Tree>
                      <p className={styles.scopeNote}>
                        Select a group to include its tasks, or select individual rows. Arrow keys
                        move through the hierarchy; Space toggles selection.
                      </p>
                    </div>
                    <div className={shared.stack}>
                      <fieldset className={styles.fieldset}>
                        <legend>Packet audience</legend>
                        <Radio.Group
                          aria-label="Packet audience"
                          value={draft.audience}
                          orientation="vertical"
                          onValueChange={(value) => {
                            if (value === 'team' || value === 'external') update('audience', value);
                          }}
                        >
                          <Radio value="team" className={styles.choice!}>
                            Team workspace
                          </Radio>
                          <Radio value="external" className={styles.choice!}>
                            External collaborators
                          </Radio>
                        </Radio.Group>
                        <p className={shared.caption}>
                          Workspace release material currently supports team access. External
                          preparation will return a permission result.
                        </p>
                      </fieldset>
                      <Field invalid={Boolean(errors.notes)}>
                        <Field.Label>Handoff notes</Field.Label>
                        <Textarea
                          rows={5}
                          value={draft.notes}
                          maxLength={1500}
                          onChange={(event) => update('notes', event.target.value)}
                          placeholder="Acceptance notes, risks and the next owner…"
                        />
                      </Field>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className={styles.reviewGrid}>
                      <dl className={styles.reviewMetadata}>
                        <div>
                          <dt>Handoff</dt>
                          <dd>{draft.title}</dd>
                        </div>
                        <div>
                          <dt>Project</dt>
                          <dd>{project?.name}</dd>
                        </div>
                        <div>
                          <dt>Schedule · UTC+08:00</dt>
                          <dd>
                            {draft.date} · {draft.time}
                          </dd>
                        </div>
                        <div>
                          <dt>Audience</dt>
                          <dd>
                            <Tag size="sm" intent={draft.audience === 'team' ? 'info' : 'warning'}>
                              {draft.audience === 'team'
                                ? 'Team workspace'
                                : 'External collaborators'}
                            </Tag>
                          </dd>
                        </div>
                      </dl>
                      <div>
                        <span className={shared.eyebrow}>
                          PACKET SCOPE / {selected.length} TASKS
                        </span>
                        <ul className={styles.scopeReview}>
                          {selected.map((task) => (
                            <li key={task.id}>
                              <span>
                                <span className={shared.mono}>{task.id}</span>
                                {task.title}
                              </span>
                              <Tag size="sm" intent={taskStatusIntent[task.status]}>
                                {task.status}
                              </Tag>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    {draft.notes ? <div className={styles.reviewNotes}>{draft.notes}</div> : null}
                    {draft.audience === 'external' && draft.projectId === 'workspace' ? (
                      <Alert intent="warning">
                        <Alert.Title>External access needs review</Alert.Title>
                        <Alert.Description>
                          The packet will be checked against Workspace’s current export policy. You
                          can change the audience in step 2.
                        </Alert.Description>
                      </Alert>
                    ) : null}
                    <Checkbox
                      checked={draft.confirmed}
                      onChange={(event) => update('confirmed', event.target.checked)}
                    >
                      I reviewed the task scope, audience and schedule.
                    </Checkbox>
                  </>
                )}
              </div>
              <div className={styles.wizardFooter}>
                <span className={shared.caption}>
                  Step {stage + 1} of 3 · draft kept in this session
                </span>
                <div className={shared.actions}>
                  {stage > 0 ? (
                    <Button
                      size="small"
                      variant="outline"
                      type="button"
                      onClick={() => move(stage - 1)}
                    >
                      Back
                    </Button>
                  ) : null}
                  <Button size="small" type="submit" trailingIcon={<ArrowRightIcon />}>
                    {stage === 2 ? 'Prepare handoff' : 'Continue'}
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
