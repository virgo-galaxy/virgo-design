import { ArrowRightIcon, CheckIcon } from '@virgo-design/icons';
import {
  Alert,
  Button,
  Checkbox,
  Combobox,
  DatePicker,
  Field,
  Form,
  Input,
  Radio,
  Slider,
  Surface,
  Textarea,
} from '@virgo-design/ui';
import { type Dispatch, type SetStateAction, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router';

import { initialWorkRequest, validateWorkRequest, type WorkRequest } from '@/data/pro-workflows';
import { projectDetailPath, projects } from '@/data/projects';
import { isTaskPriority, taskPriorities } from '@/data/tasks';
import { taskAssignees } from '@/data/tasks.seed';
import { Panel, Person } from '@/pages/shared/ProPage';
import shared from '@/pages/shared/ProPage.module.scss';

import styles from './FormsPage.module.scss';

export function BasicFormPage({
  draft,
  setDraft,
  onCreate,
}: {
  draft: WorkRequest;
  setDraft: Dispatch<SetStateAction<WorkRequest>>;
  onCreate: (draft: WorkRequest) => void;
}) {
  const [errors, setErrors] = useState<ReturnType<typeof validateWorkRequest>>({});
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();
  const project = projects.find((item) => item.name === draft.project)!;
  const update = <Key extends keyof WorkRequest>(key: Key, value: WorkRequest[Key]) => {
    setDraft((previous) => ({ ...previous, [key]: value }));
    setErrors((previous) => {
      const next = { ...previous };
      delete next[key as keyof typeof next];
      return next;
    });
  };
  return (
    <div className={shared.page}>
      <div className={styles.requestLayout}>
        <Surface border="default" radius={8} className={styles.requestSurface}>
          <Form
            ref={formRef}
            id="work-request"
            size="small"
            noValidate
            className={styles.requestForm}
            onSubmit={(event) => {
              event.preventDefault();
              const next = validateWorkRequest(draft);
              setErrors(next);
              if (Object.keys(next).length) {
                requestAnimationFrame(() =>
                  formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus(),
                );
                return;
              }
              onCreate(draft);
              setDraft({ ...initialWorkRequest });
              navigate('/result/success');
            }}
          >
            <Panel
              className={styles.formSection!}
              title="01 / The brief"
              description="What needs to change, and what does good look like?"
            >
              <div className={styles.fields}>
                <Field required invalid={Boolean(errors.title)}>
                  <Field.Label>Request title</Field.Label>
                  <Input
                    value={draft.title}
                    onChange={(event) => update('title', event.target.value)}
                    placeholder="A specific outcome, in a few words"
                    maxLength={120}
                  />
                  {errors.title ? (
                    <Field.Message>{errors.title}</Field.Message>
                  ) : (
                    <Field.Description>
                      {draft.title.length}/120 characters · this becomes the task title
                    </Field.Description>
                  )}
                </Field>
                <Field invalid={Boolean(errors.description)}>
                  <Field.Label>Context and acceptance notes</Field.Label>
                  <Textarea
                    rows={5}
                    value={draft.description}
                    onChange={(event) => update('description', event.target.value)}
                    placeholder="Describe the problem, useful context and the acceptance criteria…"
                    maxLength={2000}
                  />
                  <Field.Description>
                    Include the decision or deliverable the assignee needs to produce.
                  </Field.Description>
                  {errors.description ? <Field.Message>{errors.description}</Field.Message> : null}
                </Field>
              </div>
            </Panel>
            <Panel
              className={styles.formSection!}
              title="02 / Ownership and delivery"
              description="Connect this request to the team’s active work."
            >
              <div className={styles.fields}>
                <div className={styles.fieldGrid}>
                  <Field required invalid={Boolean(errors.project)}>
                    <Field.Label>Project</Field.Label>
                    <Combobox
                      size="small"
                      value={draft.project}
                      onValueChange={(value) => update('project', value)}
                    >
                      <Combobox.Input placeholder="Find a project" />
                      <Combobox.Content>
                        {projects.map((item) => (
                          <Combobox.Option
                            key={item.id}
                            value={item.name}
                            textValue={item.name}
                            keywords={[item.code]}
                          >
                            {item.name}
                            <span className={shared.mono}>{item.code}</span>
                          </Combobox.Option>
                        ))}
                        <Combobox.Empty>No project matches</Combobox.Empty>
                      </Combobox.Content>
                    </Combobox>
                    {errors.project ? <Field.Message>{errors.project}</Field.Message> : null}
                  </Field>
                  <Field required invalid={Boolean(errors.assignee)}>
                    <Field.Label>Assignee</Field.Label>
                    <Combobox
                      size="small"
                      value={draft.assignee}
                      onValueChange={(value) => update('assignee', value)}
                    >
                      <Combobox.Input placeholder="Find a team member" />
                      <Combobox.Content>
                        {taskAssignees.map((person) => (
                          <Combobox.Option
                            key={person.id}
                            value={person.id}
                            textValue={person.name}
                            keywords={[person.initials]}
                          >
                            <Person id={person.id} />
                          </Combobox.Option>
                        ))}
                        <Combobox.Empty>No team member matches</Combobox.Empty>
                      </Combobox.Content>
                    </Combobox>
                    {errors.assignee ? (
                      <Field.Message>{errors.assignee}</Field.Message>
                    ) : (
                      <Field.Description>
                        One person responsible for the next step.
                      </Field.Description>
                    )}
                  </Field>
                </div>
                <fieldset className={styles.fieldset}>
                  <legend>Priority</legend>
                  <Radio.Group
                    aria-label="Request priority"
                    orientation="horizontal"
                    value={draft.priority}
                    onValueChange={(value) => {
                      if (isTaskPriority(value)) update('priority', value);
                    }}
                  >
                    {taskPriorities.map((priority) => (
                      <Radio key={priority} value={priority}>
                        {priority}
                      </Radio>
                    ))}
                  </Radio.Group>
                  <p className={shared.caption}>
                    Urgent work needs immediate attention; keep it deliberate.
                  </p>
                </fieldset>
                <div className={styles.fieldGrid}>
                  <Field invalid={Boolean(errors.dueDate)}>
                    <Field.Label>Due date</Field.Label>
                    <DatePicker
                      size="small"
                      value={draft.dueDate}
                      onValueChange={(value) => update('dueDate', value)}
                    >
                      <DatePicker.Input />
                      <DatePicker.Trigger aria-label="Choose request due date" />
                      <DatePicker.Content aria-label="Request due date calendar">
                        <DatePicker.Calendar
                          defaultMonth="2026-10"
                          locale="en-US"
                          weekStartsOn={1}
                        />
                      </DatePicker.Content>
                    </DatePicker>
                    <Field.Description>
                      Optional. Leave empty for unscheduled work.
                    </Field.Description>
                    {errors.dueDate ? <Field.Message>{errors.dueDate}</Field.Message> : null}
                  </Field>
                  <Field>
                    <Field.Label>Estimated effort · {draft.estimateHours}h</Field.Label>
                    <Slider
                      size="small"
                      min={0}
                      max={40}
                      step={1}
                      value={draft.estimateHours}
                      onValueChange={(value) => update('estimateHours', value)}
                    />
                    <Field.Description>
                      0 means unestimated · up to 40h for this request.
                    </Field.Description>
                  </Field>
                </div>
              </div>
            </Panel>
            <div className={styles.submitBar}>
              <Field invalid={Boolean(errors.acceptanceConfirmed)}>
                <Checkbox
                  checked={draft.acceptanceConfirmed}
                  onChange={(event) => update('acceptanceConfirmed', event.target.checked)}
                >
                  The brief is ready for the assignee.
                </Checkbox>
                {errors.acceptanceConfirmed ? (
                  <Field.Message>{errors.acceptanceConfirmed}</Field.Message>
                ) : null}
              </Field>
              <div className={shared.actions}>
                <Button
                  size="small"
                  variant="text"
                  type="button"
                  onClick={() => {
                    setDraft({ ...initialWorkRequest });
                    setErrors({});
                  }}
                >
                  Reset request
                </Button>
                <Button size="small" type="submit" trailingIcon={<ArrowRightIcon />}>
                  Submit request
                </Button>
              </div>
            </div>
          </Form>
        </Surface>
        <aside className={shared.stack} aria-label="Work request context">
          <Panel title="Request destination" description="The project this work belongs to">
            <div className={shared.body}>
              <span className={shared.eyebrow}>{project?.code ?? 'CHOOSE A PROJECT'}</span>
              <h3 className={styles.asideTitle}>{project?.name ?? 'Unassigned'}</h3>
              <p className={styles.asideCopy}>
                {project?.summary ?? 'Choose an existing project to place the request.'}
              </p>
              {project ? (
                <>
                  <Person id={project.owner} />
                  <div className={styles.asideLink}>
                    <Link className={shared.link} to={projectDetailPath(project)}>
                      Review project context →
                    </Link>
                  </div>
                </>
              ) : null}
            </div>
          </Panel>
          <Panel title="A useful brief">
            <ul className={styles.guidance}>
              {[
                'Name an outcome, not just an activity.',
                'Add enough context to start independently.',
                'Define what makes the work complete.',
              ].map((item) => (
                <li key={item}>
                  <CheckIcon aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Panel>
          <Alert intent="info">
            <Alert.Title>From request to delivery</Alert.Title>
            <Alert.Description>
              Submitting creates a Todo task. It will appear in Tasks, the project and the task
              register.
            </Alert.Description>
          </Alert>
        </aside>
      </div>
    </div>
  );
}
