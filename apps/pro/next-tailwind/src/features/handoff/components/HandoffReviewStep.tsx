import { Alert, Checkbox, Tag } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import type { ProjectDto } from '@/api/projects/types';
import { type Task, taskStatusIntent, taskStatusLabelNames } from '@/features/tasks';
import { businessLabel } from '@/lib/formatting/business-labels';

import type { HandoffDraft } from '../model/handoff';

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
      <div className="viewport-max-760:grid-cols-1 grid [grid-template-columns:repeat(2,_minmax(0,_1fr))] gap-20">
        <dl
          className={[
            '[border:1px_solid_var(--vd-border-subtle)] [border-radius:var(--vd-shape-radius-8,_var(--vd-radius-8))]',
            '[&_>_div]:grid [&_>_div]:gap-4 [&_dt]:text-text-tertiary [&_dt]:text-(length:--vd-font-size-11) [&_dd]:m-0',
            '[&_dd]:text-(length:--vd-font-size-13) [&_dd]:wrap-anywhere',
            'm-0 p-16 grid gap-16',
          ].join(' ')}
        >
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
          <span className="text-text-tertiary [font:var(--vd-font-size-10)_var(--vd-font-family-mono)] [letter-spacing:1px]">
            {t('handoff.packetScopeValueTasks', { v0: selected.length })}
          </span>
          <ul
            className={[
              '[&_li]:flex [&_li]:[align-items:start] [&_li]:justify-between [&_li]:gap-12 [&_li]:text-(length:--vd-font-size-12)',
              '[&_li_>_span:first-child]:grid [&_li_>_span:first-child]:gap-4',
              'p-0 [list-style:none] m-0 grid gap-12',
            ].join(' ')}
          >
            {selected.map((task) => (
              <li key={task.id}>
                <span>
                  <span className="[font-family:var(--vd-font-family-mono)] [font-size:var(--vd-font-size-11)] text-text-tertiary">
                    {task.id}
                  </span>
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
      {draft.notes ? (
        <div
          className={[
            'bg-surface-secondary [border-radius:var(--vd-shape-radius-8,_var(--vd-radius-8))] p-16 text-text-secondary',
            '[font-size:var(--vd-font-size-12)] whitespace-pre-wrap [overflow-wrap:anywhere]',
          ].join(' ')}
        >
          {draft.notes}
        </div>
      ) : null}
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
