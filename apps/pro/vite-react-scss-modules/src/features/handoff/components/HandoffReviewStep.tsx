import { Alert, Checkbox, Tag } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import type { ProjectDto } from '@/api/projects/types';
import { type Task, taskStatusIntent, taskStatusLabelNames } from '@/features/tasks';
import { businessLabel } from '@/lib/formatting/business-labels';

import type { HandoffDraft } from '../model/handoff';

import styles from './HandoffSteps.module.scss';
import shared from '@/styles/product-layout.module.scss';

export function HandoffReviewStep({
  draft,
  project,
  selected,
  onChange,
}: {
  draft: HandoffDraft;
  project: ProjectDto | undefined;
  selected: Task[];
  onChange: <Key extends keyof HandoffDraft>(key: Key, value: HandoffDraft[Key]) => void;
}) {
  const { t, i18n } = useTranslation();

  return (
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
        onChange={(event) => onChange('confirmed', event.target.checked)}
      >
        {t('handoff.iReviewedTheTaskScopeAudienceAndSchedule')}
      </Checkbox>
    </>
  );
}
