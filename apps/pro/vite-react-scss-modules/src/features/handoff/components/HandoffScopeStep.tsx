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

import styles from './HandoffSteps.module.scss';
import shared from '@/styles/product-layout.module.scss';

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
    <div className={styles.scopeLayout}>
      <div>
        <div className={styles.treeTools}>
          <Tag size="md" variant="outline">
            {t('handoff.selectedTasks', { count: selected.length })}
          </Tag>
          <Button.Group layout="custom" className={shared.actions}>
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
          className={styles.scopeTree}
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
              <Tree.Label className={styles.treeLabel}>
                <Tree.Toggle
                  aria-label={t('handoff.toggleValue', {
                    v0: t(`handoff.scopeLabels.${group.id}`),
                  })}
                />
                <span
                  className={styles.treeMark}
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
        <p className={styles.scopeNote}>
          {t('handoff.selectAGroupToIncludeItsTasksOrSelect')}
        </p>
      </div>
      <div className={shared.stack}>
        <fieldset className={styles.fieldset}>
          <legend>{t('handoff.packetAudience')}</legend>
          <Radio.Group
            aria-label={t('handoff.packetAudience')}
            value={draft.audience}
            orientation="vertical"
            onValueChange={(value) => {
              if (value === 'team' || value === 'external') onChange('audience', value);
            }}
          >
            <Radio value="team" className={styles.choice!}>
              {t('handoff.teamWorkspace')}
            </Radio>
            <Radio value="external" className={styles.choice!}>
              {t('handoff.externalCollaborators')}
            </Radio>
          </Radio.Group>
          <p className={shared.caption}>
            {t(
              'handoff.workspaceReleaseMaterialCurrentlySupportsTeamAccessExternalPreparation',
            )}
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
