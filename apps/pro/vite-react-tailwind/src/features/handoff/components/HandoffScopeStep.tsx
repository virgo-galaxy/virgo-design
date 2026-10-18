import { Button, Field, Radio, Tag, Textarea, Tree } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import { taskStatusIntent, taskStatusLabelNames } from '@/features/tasks';
import { businessLabel } from '@/lib/formatting/business-labels';

import {
  type HandoffDraft,
  reconcileScope,
  type ScopeGroup,
  scopeTreeValues,
  type validateHandoff,
} from '../model/handoff';

export function HandoffScopeStep({
  draft,
  groups,
  errors,
  expanded,
  onExpandedChange,
  onChange,
}: {
  draft: HandoffDraft;
  groups: ScopeGroup[];
  errors: ReturnType<typeof validateHandoff>;
  expanded: readonly string[];
  onExpandedChange: (values: readonly string[]) => void;
  onChange: <Key extends keyof HandoffDraft>(key: Key, value: HandoffDraft[Key]) => void;
}) {
  const { t, i18n } = useTranslation();
  const selected = groups
    .flatMap((group) => group.tasks)
    .filter((task) => draft.taskIds.includes(task.id));
  const treeValues = scopeTreeValues(draft.taskIds, groups);

  return (
    <div className="viewport-max-760:grid-cols-1 grid [grid-template-columns:minmax(0,_1.4fr)_minmax(230px,_1fr)] gap-24">
      <div>
        <div className="flex flex-wrap items-center justify-between gap-12 pb-12">
          <Tag size="md" variant="outline">
            {t('handoff.selectedTasks', { count: selected.length })}
          </Tag>
          <Button.Group layout="custom" className="flex items-center flex-wrap gap-8">
            <Button
              size="medium"
              variant="text"
              type="button"
              onClick={() =>
                onChange(
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
              onClick={() => onChange('taskIds', [])}
            >
              {t('handoff.clear')}
            </Button>
          </Button.Group>
        </div>
        <Tree
          key={draft.projectId}
          className="min-w-0 [&_[role='treeitem']]:min-w-0 [&_[data-slot='label']]:min-w-0 [&_[data-slot='label']]:whitespace-normal"
          size="medium"
          selectionMode="multiple"
          aria-label={t('handoff.handoffTaskScope')}
          expandedValues={expanded}
          onExpandedValuesChange={onExpandedChange}
          selectedValues={treeValues}
          onSelectedValuesChange={(next) =>
            onChange('taskIds', reconcileScope(draft.taskIds, next, groups))
          }
        >
          {groups.map((group) => (
            <Tree.Item
              key={group.id}
              value={group.id}
              branch
              textValue={t(`handoff.scopeLabels.${group.id}`)}
            >
              <Tree.Label className="flex [align-items:start] gap-8 w-full text-(length:--vd-font-size-12) viewport-max-640:flex-wrap viewport-max-640:[&_>_[data-slot='root']]:ms-24">
                <Tree.Toggle
                  aria-label={t('handoff.toggleValue', {
                    v0: t(`handoff.scopeLabels.${group.id}`),
                  })}
                />
                <span
                  className="data-[selected=true]:text-brand-primary text-text-tertiary [width:16px] [flex-shrink:0] [font-family:var(--vd-font-family-mono)]"
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
                    <Tree.Label className="flex [align-items:start] gap-8 w-full text-(length:--vd-font-size-12) viewport-max-640:flex-wrap viewport-max-640:[&_>_[data-slot='root']]:ms-24">
                      <span
                        className="data-[selected=true]:text-brand-primary text-text-tertiary [width:16px] [flex-shrink:0] [font-family:var(--vd-font-family-mono)]"
                        data-selected={draft.taskIds.includes(task.id)}
                      >
                        {draft.taskIds.includes(task.id) ? '✓' : '＋'}
                      </span>
                      <span className="grid gap-4 min-w-0 [flex:1]">
                        <span>{businessLabel(task.title, i18n.language)}</span>
                        <span className="[font-family:var(--vd-font-family-mono)] [font-size:var(--vd-font-size-11)] text-text-tertiary">
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
        <p className="text-text-tertiary [font-size:var(--vd-font-size-11)] [line-height:1.7] [margin:var(--vd-spacing-12)_0_0]">
          {t('handoff.selectAGroupToIncludeItsTasksOrSelect')}
        </p>
      </div>
      <div className="grid gap-20 min-w-0">
        <fieldset
          className={[
            '[border:0]',
            "[&_legend]:mb-12 [&_legend]:text-(length:--vd-font-size-12) [&_legend]:font-[500] [&_[role='radiogroup']]:flex-wrap",
            "[&_[role='radiogroup']]:[gap:var(--vd-spacing-12)_var(--vd-spacing-24)] [&_p]:[margin:var(--vd-spacing-12)_0_0]",
            'm-0 p-0 min-w-0',
          ].join(' ')}
        >
          <legend>{t('handoff.packetAudience')}</legend>
          <Radio.Group
            aria-label={t('handoff.packetAudience')}
            value={draft.audience}
            orientation="vertical"
            onValueChange={(value) => {
              if (value === 'team' || value === 'external') onChange('audience', value);
            }}
          >
            <Radio
              value="team"
              className="p-12 [border:1px_solid_var(--vd-border-subtle)] [border-radius:var(--vd-shape-radius-8,_var(--vd-radius-8))] text-(length:--vd-font-size-12)"
            >
              {t('handoff.teamWorkspace')}
            </Radio>
            <Radio
              value="external"
              className="p-12 [border:1px_solid_var(--vd-border-subtle)] [border-radius:var(--vd-shape-radius-8,_var(--vd-radius-8))] text-(length:--vd-font-size-12)"
            >
              {t('handoff.externalCollaborators')}
            </Radio>
          </Radio.Group>
          <p className="text-text-tertiary [font-size:var(--vd-font-size-11)]">
            {t('handoff.workspaceReleaseMaterialCurrentlySupportsTeamAccessExternalPreparation')}
          </p>
        </fieldset>
        <Field invalid={Boolean(errors.notes)}>
          <Field.Label>{t('handoff.handoffNotes')}</Field.Label>
          <Textarea
            rows={5}
            value={draft.notes}
            maxLength={1500}
            onChange={(event) => onChange('notes', event.target.value)}
            placeholder={t('handoff.acceptanceNotesRisksAndTheNextOwner')}
          />
        </Field>
      </div>
    </div>
  );
}
