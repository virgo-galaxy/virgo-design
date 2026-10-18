import { ArrowRightIcon, CheckIcon } from '@virgo-design/icons';
import { Alert, Button, Empty, Form, Skeleton, Steps, Surface } from '@virgo-design/ui';
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

import { Panel } from '@/components/display/panel';
import { ExceptionState } from '@/components/feedback/exception-state';
import { MutationFeedback } from '@/components/feedback/mutation-feedback';
import { RemoteState } from '@/components/feedback/remote-state';
import { useCurrentUser } from '@/features/auth';
import { CatalogBoundary, useTaskCatalog } from '@/features/catalog';
import { projectHandoffPath } from '@/features/projects';
import type { TaskState } from '@/features/tasks';
import { getTaskCollection, useTaskDependentQuery } from '@/features/tasks';
import { useMutation } from '@/hooks/async/use-mutation';
import { canManageProject, isAdmin } from '@/lib/auth/permissions';
import { routePath } from '@/routes';

import { HandoffDetailsStep } from '../components/HandoffDetailsStep';
import { HandoffReviewStep } from '../components/HandoffReviewStep';
import { HandoffScopeStep } from '../components/HandoffScopeStep';
import { useHandoffSession } from '../hooks/use-handoff-session';
import {
  type HandoffDraft,
  scopeGroups,
  validateHandoff,
  type WorkflowReceipt,
} from '../model/handoff';

import * as styles from './ProjectHandoffView.css';
import * as shared from '@/components/layout/product-layout.css';

function ProjectHandoffContent({
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

  const mutation = useMutation();
  const { t } = useTranslation();
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

  useEffect(() => {
    if (projectId && projects.some((p) => p.id === projectId) && draft.projectId !== projectId) {
      setDraft((current) => ({ ...current, projectId, taskIds: [], confirmed: false }));
      setStage(0);
    }
  }, [projectId, projects, draft.projectId, setDraft, setStage]);

  const groups = scopeGroups(draft.projectId, state.tasks, projects);
  const selected = groups
    .flatMap((group) => group.tasks)
    .filter((task) => draft.taskIds.includes(task.id));
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
          <Link className={shared.link} to={routePath('work.projects')}>
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
        to={routePath('work.projects.[projectId]', { projectId: draft.projectId })}
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
                    if (admin) navigate(routePath(`result.${receipt.outcome}`));
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
                  <HandoffDetailsStep
                    draft={draft}
                    project={project}
                    errors={errors}
                    onChange={update}
                    onProjectChange={(projectId) => {
                      navigate(projectHandoffPath(projectId));
                      setStage(0);
                      setDraft((previous) => ({
                        ...previous,
                        projectId,
                        taskIds: [],
                        confirmed: false,
                      }));
                      setErrors({});
                    }}
                  />
                ) : stage === 1 ? (
                  <HandoffScopeStep
                    draft={draft}
                    groups={groups}
                    errors={errors}
                    expanded={expanded}
                    onExpandedChange={setExpanded}
                    onChange={update}
                  />
                ) : (
                  <HandoffReviewStep
                    draft={draft}
                    project={project}
                    selected={selected}
                    onChange={update}
                  />
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
  const resource = useTaskDependentQuery(load, projectId);

  if (!resource.data) return <RemoteState {...resource} />;

  return (
    <>
      {resource.error ? <RemoteState error={resource.error} retry={resource.retry} /> : null}
      <ProjectHandoffContent
        key={projectId}
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

export function ProjectHandoffView() {
  return (
    <CatalogBoundary>
      <HandoffResource />
    </CatalogBoundary>
  );
}
