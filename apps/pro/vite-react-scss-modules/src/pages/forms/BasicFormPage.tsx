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
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router';

import { initialWorkRequest, validateWorkRequest, type WorkRequest } from '@/data/pro-workflows';
import { projectDetailPath, projects } from '@/data/projects';
import { isTaskPriority, taskPriorities } from '@/data/tasks';
import { taskAssignees } from '@/data/tasks.seed';
import { Panel, Person } from '@/pages/shared/ProPage';
import shared from '@/pages/shared/ProPage.module.scss';
import { getTaskPriorityLabel } from '@/pages/tasks/task-presentation';

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
  const { t, i18n } = useTranslation();
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
              title={t('forms.text01TheBrief')}
              description={t('forms.whatNeedsToChangeAndWhatDoesGoodLook')}
            >
              <div className={styles.fields}>
                <Field required invalid={Boolean(errors.title)}>
                  <Field.Label>{t('forms.requestTitle')}</Field.Label>
                  <Input
                    value={draft.title}
                    onChange={(event) => update('title', event.target.value)}
                    placeholder={t('forms.aSpecificOutcomeInAFewWords')}
                    maxLength={120}
                  />
                  {errors.title ? (
                    <Field.Message>{t(`tasks.validation.${errors.title}`)}</Field.Message>
                  ) : (
                    <Field.Description>
                      {t('forms.value120CharactersThisBecomesTheTaskTitle', {
                        v0: draft.title.length,
                      })}
                    </Field.Description>
                  )}
                </Field>
                <Field invalid={Boolean(errors.description)}>
                  <Field.Label>{t('forms.contextAndAcceptanceNotes')}</Field.Label>
                  <Textarea
                    rows={5}
                    value={draft.description}
                    onChange={(event) => update('description', event.target.value)}
                    placeholder={t('forms.describeTheProblemUsefulContextAndTheAcceptanceCriteria')}
                    maxLength={2000}
                  />
                  <Field.Description>
                    {t('forms.includeTheDecisionOrDeliverableTheAssigneeNeedsTo')}
                  </Field.Description>
                  {errors.description ? (
                    <Field.Message>{t(`tasks.validation.${errors.description}`)}</Field.Message>
                  ) : null}
                </Field>
              </div>
            </Panel>
            <Panel
              className={styles.formSection!}
              title={t('forms.text02OwnershipAndDelivery')}
              description={t('forms.connectThisRequestToTheTeamSActiveWork')}
            >
              <div className={styles.fields}>
                <div className={styles.fieldGrid}>
                  <Field required invalid={Boolean(errors.project)}>
                    <Field.Label>{t('forms.project')}</Field.Label>
                    <Combobox
                      size="small"
                      value={draft.project}
                      onValueChange={(value) => update('project', value)}
                    >
                      <Combobox.Input placeholder={t('forms.findAProject')} />
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
                        <Combobox.Empty>{t('forms.noProjectMatches')}</Combobox.Empty>
                      </Combobox.Content>
                    </Combobox>
                    {errors.project ? (
                      <Field.Message>{t(`tasks.validation.${errors.project}`)}</Field.Message>
                    ) : null}
                  </Field>
                  <Field required invalid={Boolean(errors.assignee)}>
                    <Field.Label>{t('forms.assignee')}</Field.Label>
                    <Combobox
                      size="small"
                      value={draft.assignee}
                      onValueChange={(value) => update('assignee', value)}
                    >
                      <Combobox.Input placeholder={t('forms.findATeamMember')} />
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
                        <Combobox.Empty>{t('forms.noTeamMemberMatches')}</Combobox.Empty>
                      </Combobox.Content>
                    </Combobox>
                    {errors.assignee ? (
                      <Field.Message>{t(`tasks.validation.${errors.assignee}`)}</Field.Message>
                    ) : (
                      <Field.Description>
                        {t('forms.onePersonResponsibleForTheNextStep')}
                      </Field.Description>
                    )}
                  </Field>
                </div>
                <fieldset className={styles.fieldset}>
                  <legend>{t('forms.priority')}</legend>
                  <Radio.Group
                    aria-label={t('forms.requestPriority')}
                    orientation="horizontal"
                    value={draft.priority}
                    onValueChange={(value) => {
                      if (isTaskPriority(value)) update('priority', value);
                    }}
                  >
                    {taskPriorities.map((priority) => (
                      <Radio key={priority} value={priority}>
                        {getTaskPriorityLabel(t, priority)}
                      </Radio>
                    ))}
                  </Radio.Group>
                  <p className={shared.caption}>
                    {t('forms.urgentWorkNeedsImmediateAttentionKeepItDeliberate')}
                  </p>
                </fieldset>
                <div className={styles.fieldGrid}>
                  <Field invalid={Boolean(errors.dueDate)}>
                    <Field.Label>{t('forms.dueDate')}</Field.Label>
                    <DatePicker
                      size="small"
                      value={draft.dueDate}
                      onValueChange={(value) => update('dueDate', value)}
                    >
                      <DatePicker.Input />
                      <DatePicker.Trigger aria-label={t('forms.chooseRequestDueDate')} />
                      <DatePicker.Content aria-label={t('forms.requestDueDateCalendar')}>
                        <DatePicker.Calendar
                          locale={i18n.language}
                          defaultMonth="2026-10"
                          weekStartsOn={1}
                        />
                      </DatePicker.Content>
                    </DatePicker>
                    <Field.Description>
                      {t('forms.optionalLeaveEmptyForUnscheduledWork')}
                    </Field.Description>
                    {errors.dueDate ? (
                      <Field.Message>{t(`tasks.validation.${errors.dueDate}`)}</Field.Message>
                    ) : null}
                  </Field>
                  <Field>
                    <Field.Label>
                      {t('forms.estimatedEffortValueH', { v0: draft.estimateHours })}
                    </Field.Label>
                    <Slider
                      size="small"
                      min={0}
                      max={40}
                      step={1}
                      value={draft.estimateHours}
                      onValueChange={(value) => update('estimateHours', value)}
                    />
                    <Field.Description>
                      {t('forms.text0MeansUnestimatedUpTo40hForThisRequest')}
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
                  {t('forms.theBriefIsReadyForTheAssignee')}
                </Checkbox>
                {errors.acceptanceConfirmed ? (
                  <Field.Message>
                    {t(`forms.validation.${errors.acceptanceConfirmed}`)}
                  </Field.Message>
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
                  {t('forms.resetRequest')}
                </Button>
                <Button size="small" type="submit" trailingIcon={<ArrowRightIcon />}>
                  {t('forms.submitRequest')}
                </Button>
              </div>
            </div>
          </Form>
        </Surface>
        <aside className={shared.stack} aria-label={t('forms.workRequestContext')}>
          <Panel
            title={t('forms.requestDestination')}
            description={t('forms.theProjectThisWorkBelongsTo')}
          >
            <div className={shared.body}>
              <span className={shared.eyebrow}>{project?.code ?? t('forms.chooseAProject')}</span>
              <h3 className={styles.asideTitle}>{project?.name ?? t('forms.unassigned')}</h3>
              <p className={styles.asideCopy}>
                {project?.summary ?? t('forms.chooseAnExistingProjectToPlaceTheRequest')}
              </p>
              {project ? (
                <>
                  <Person id={project.owner} />
                  <div className={styles.asideLink}>
                    <Link className={shared.link} to={projectDetailPath(project)}>
                      {t('forms.reviewProjectContext')}
                    </Link>
                  </div>
                </>
              ) : null}
            </div>
          </Panel>
          <Panel title={t('forms.aUsefulBrief')}>
            <ul className={styles.guidance}>
              {[
                t('forms.nameAnOutcomeNotJustAnActivity'),
                t('forms.addEnoughContextToStartIndependently'),
                t('forms.defineWhatMakesTheWorkComplete'),
              ].map((item) => (
                <li key={item}>
                  <CheckIcon aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Panel>
          <Alert intent="info">
            <Alert.Title>{t('forms.fromRequestToDelivery')}</Alert.Title>
            <Alert.Description>
              {t('forms.submittingCreatesATodoTaskItWillAppearIn')}
            </Alert.Description>
          </Alert>
        </aside>
      </div>
    </div>
  );
}
