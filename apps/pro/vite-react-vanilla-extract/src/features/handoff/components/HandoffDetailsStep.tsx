import { DatePicker, Field, Input, TimePicker } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import type { ProjectDto } from '@/api/projects/types';
import { FilterSelect } from '@/components/controls/filter-select';
import { useCurrentUser } from '@/features/auth';
import { useTaskCatalog } from '@/features/catalog';
import { canManageProject } from '@/lib/auth/permissions';
import { businessLabel } from '@/lib/formatting/business-labels';

import type { HandoffDraft, validateHandoff } from '../model/handoff';

import * as styles from './HandoffSteps.css';

export function HandoffDetailsStep({
  draft,
  project,
  errors,
  onChange,
  onProjectChange,
}: {
  draft: HandoffDraft;
  project: ProjectDto | undefined;
  errors: ReturnType<typeof validateHandoff>;
  onChange: <Key extends keyof HandoffDraft>(key: Key, value: HandoffDraft[Key]) => void;
  onProjectChange: (projectId: string) => void;
}) {
  const { t, i18n } = useTranslation();
  const { projects } = useTaskCatalog();
  const user = useCurrentUser()!;

  return (
    <>
      <Field required invalid={Boolean(errors.title)}>
        <Field.Label>{t('handoff.handoffTitle')}</Field.Label>
        <Input
          value={draft.title}
          maxLength={100}
          onChange={(event) => onChange('title', event.target.value)}
        />
        {errors.title ? (
          <Field.Message>{t(`handoff.validation.${errors.title}`)}</Field.Message>
        ) : null}
      </Field>
      <FilterSelect
        label={t('handoff.handoffProject')}
        value={draft.projectId}
        onChange={onProjectChange}
        options={projects
          .filter((item) => canManageProject(user, item.id))
          .map((item) => ({
            value: item.id,
            label: businessLabel(item.name, i18n.language),
          }))}
      />
      <div className={styles.fieldGrid}>
        <Field required invalid={Boolean(errors.date)}>
          <Field.Label>{t('handoff.handoffDate')}</Field.Label>
          <DatePicker
            size="medium"
            value={draft.date}
            onValueChange={(value) => onChange('date', value)}
            min={project?.start}
          >
            <DatePicker.Input />
            <DatePicker.Trigger aria-label={t('handoff.chooseHandoffDate')} />
            <DatePicker.Content aria-label={t('handoff.handoffDateCalendar')}>
              <DatePicker.Calendar
                locale={i18n.language}
                defaultMonth={draft.date.slice(0, 7)}
                weekStartsOn={1}
              />
            </DatePicker.Content>
          </DatePicker>
          {errors.date ? (
            <Field.Message>{t(`handoff.validation.${errors.date}`)}</Field.Message>
          ) : null}
        </Field>
        <Field required invalid={Boolean(errors.time)}>
          <Field.Label>{t('handoff.handoffTime')}</Field.Label>
          <TimePicker
            size="medium"
            value={draft.time}
            onValueChange={(value) => onChange('time', value)}
          />
          <Field.Description>{t('handoff.asiaShanghaiUtc0800')}</Field.Description>
          {errors.time ? (
            <Field.Message>{t(`handoff.validation.${errors.time}`)}</Field.Message>
          ) : null}
        </Field>
      </div>
      <p className={styles.stageCopy}>
        {t('handoff.valueYourSelectionsWillBeKeptWhileMovingBetween', {
          v0: businessLabel(project?.summary ?? '', i18n.language),
        })}
      </p>
    </>
  );
}
