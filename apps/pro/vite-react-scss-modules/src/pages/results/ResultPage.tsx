import { CheckIcon, CloseIcon, DownloadIcon } from '@virgo-design/icons';
import { Accordion, Alert, Button, Separator, Steps, Surface, Tag } from '@virgo-design/ui';
import { Link, useNavigate } from 'react-router';

import type { WorkflowReceipt } from '@/data/pro-workflows';
import { projectDetailPath, projects } from '@/data/projects';
import type { TaskState } from '@/data/tasks';
import { createTasksCsv } from '@/data/tasks.export';
import { downloadCsv } from '@/pages/shared/download';
import shared from '@/pages/shared/ProPage.module.scss';
import { taskStatusIntent } from '@/pages/tasks/task-presentation';

import styles from './ResultPage.module.scss';

const receiptTime = new Intl.DateTimeFormat('en-US', {
  dateStyle: 'medium',
  timeStyle: 'short',
  timeZone: 'Asia/Shanghai',
});

export function ResultPage({
  receipt,
  state,
  onRecover,
  onRetry,
}: {
  receipt: WorkflowReceipt;
  state: TaskState;
  onRecover?: () => void;
  onRetry?: () => WorkflowReceipt | null;
}) {
  const success = receipt.outcome === 'success';
  const navigate = useNavigate();
  const project = projects.find((item) => item.id === receipt.projectId)!;
  const tasks = state.tasks.filter((task) => receipt.taskIds.includes(task.id));
  return (
    <div className={shared.page}>
      <Surface border="default" radius={12} className={styles.result}>
        <div className={styles.resultHero}>
          <span className={styles.resultIcon} data-outcome={receipt.outcome} aria-hidden="true">
            {success ? <CheckIcon size={36} /> : <CloseIcon size={36} />}
          </span>
          <Tag size="sm" variant="outline">
            {receipt.reference}
          </Tag>
          <h1>{receipt.title}</h1>
          <p>{receipt.description}</p>
          <div className={styles.primaryActions}>
            {success ? (
              <>
                <Button size="small" onClick={() => navigate(projectDetailPath(project))}>
                  View project
                </Button>
                <Button
                  size="small"
                  variant="outline"
                  leadingIcon={<DownloadIcon />}
                  disabled={!tasks.length}
                  onClick={() =>
                    downloadCsv(
                      createTasksCsv(tasks),
                      `virgo-${receipt.reference.toLowerCase()}-scope.csv`,
                    )
                  }
                >
                  Download task scope
                </Button>
              </>
            ) : (
              <>
                <Button
                  size="small"
                  onClick={() => {
                    onRecover?.();
                    navigate('/form/step');
                  }}
                >
                  Review handoff settings
                </Button>
                <Button
                  size="small"
                  variant="outline"
                  onClick={() => {
                    const next = onRetry?.();
                    navigate(next ? '/result/success' : '/form/step');
                  }}
                >
                  Prepare for team instead
                </Button>
              </>
            )}
          </div>
        </div>
        <Separator decorative />
        <div className={styles.receiptBody}>
          <dl className={styles.receiptMetadata}>
            <div>
              <dt>Project</dt>
              <dd>
                <Link className={shared.link} to={projectDetailPath(project)}>
                  {project.name}
                </Link>
              </dd>
            </div>
            <div>
              <dt>Prepared by</dt>
              <dd>{receipt.requester}</dd>
            </div>
            <div>
              <dt>Recorded · UTC+08:00</dt>
              <dd>
                <time dateTime={receipt.recordedAt}>
                  {receiptTime.format(new Date(receipt.recordedAt))}
                </time>
              </dd>
            </div>
            <div>
              <dt>Audience</dt>
              <dd>{receipt.audience === 'team' ? 'Team workspace' : 'External collaborators'}</dd>
            </div>
            {receipt.handoffTitle ? (
              <div>
                <dt>Handoff</dt>
                <dd>{receipt.handoffTitle}</dd>
              </div>
            ) : null}
            {receipt.schedule ? (
              <div>
                <dt>Handoff schedule</dt>
                <dd>
                  <time dateTime={receipt.schedule}>
                    {receiptTime.format(new Date(receipt.schedule))}
                  </time>
                </dd>
              </div>
            ) : null}
            <div>
              <dt>Scope</dt>
              <dd>
                {receipt.taskIds.length} linked {receipt.taskIds.length === 1 ? 'task' : 'tasks'}
              </dd>
            </div>
          </dl>
          {success ? (
            <div className={styles.nextSteps}>
              <h3>
                {receipt.kind === 'task' ? 'Keep the work moving' : 'Bring this to the checkpoint'}
              </h3>
              <Steps orientation="vertical" aria-label="Next steps">
                <Steps.Item status="complete">
                  <Steps.Indicator>01</Steps.Indicator>
                  <Steps.Title>
                    {receipt.kind === 'task' ? 'Work recorded' : 'Scope prepared'}
                  </Steps.Title>
                  <Steps.Description>
                    The project and linked task records are available.
                  </Steps.Description>
                </Steps.Item>
                <Steps.Item status="current">
                  <Steps.Indicator>02</Steps.Indicator>
                  <Steps.Title>
                    {receipt.kind === 'task' ? 'Review the next step' : 'Review with the team'}
                  </Steps.Title>
                  <Steps.Description>
                    Keep the owner and acceptance criteria visible.
                  </Steps.Description>
                </Steps.Item>
                <Steps.Item>
                  <Steps.Indicator>03</Steps.Indicator>
                  <Steps.Title>Follow through</Steps.Title>
                  <Steps.Description>
                    Use the task queue to track the next delivery.
                  </Steps.Description>
                </Steps.Item>
              </Steps>
              <Link className={shared.link} to="/work/tasks">
                Open task queue →
              </Link>
            </div>
          ) : (
            <div className={styles.recovery}>
              <Alert intent="error">
                <Alert.Title>Permission policy · WS-EXPORT-01</Alert.Title>
                <Alert.Description>
                  The Workspace packet can be prepared for team review. External sharing remains
                  restricted.
                </Alert.Description>
              </Alert>
              <Accordion type="single" variant="ghost" size="sm">
                <Accordion.Item value="why">
                  <Accordion.Trigger icon>Why did this fail?</Accordion.Trigger>
                  <Accordion.Content>
                    Workspace’s export permission states are still under review. The restriction
                    applies to the audience, not to your selected tasks.
                  </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item value="draft">
                  <Accordion.Trigger icon>What happens to my draft?</Accordion.Trigger>
                  <Accordion.Content>
                    Your scope, schedule and notes are kept. Review the settings, or prepare the
                    same scope for the team.
                  </Accordion.Content>
                </Accordion.Item>
              </Accordion>
              <Link className={shared.link} to="/data/search-table?search=VD-126">
                Review the permission task →
              </Link>
            </div>
          )}
        </div>
        <div className={styles.scopeSection}>
          <div>
            <h3>Linked work</h3>
            <span className={shared.caption}>Current task records for this result</span>
          </div>
          <ul>
            {tasks.map((task) => (
              <li key={task.id}>
                <div>
                  <span className={shared.mono}>{task.id}</span>
                  <Link className={shared.link} to={`/data/search-table?search=${task.id}`}>
                    {task.title}
                  </Link>
                </div>
                <Tag size="sm" intent={taskStatusIntent[task.status]}>
                  {task.status}
                </Tag>
              </li>
            ))}
          </ul>
          {!tasks.length ? (
            <p className={shared.caption}>
              These tasks have moved out of the current register. Review the project to continue.
            </p>
          ) : null}
        </div>
        <div className={styles.resultFooter}>
          <span className={shared.mono}>VIRGO STUDIO / {success ? 'RECORDED' : 'DRAFT KEPT'}</span>
          <Link className={shared.link} to={success ? '/form/basic' : '/work/projects'}>
            {success ? 'Create another request →' : 'Back to projects →'}
          </Link>
        </div>
      </Surface>
    </div>
  );
}
