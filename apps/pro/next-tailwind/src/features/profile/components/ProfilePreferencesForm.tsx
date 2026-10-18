import { Alert, Button, Field, Form, Radio, Switch, TimePicker } from '@virgo-design/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import type { UpdateProfilePreferencesRequest } from '@/api/profile/types';
import { FilterSelect } from '@/components/controls/filter-select';
import { Panel } from '@/components/display/panel';
import { MutationFeedback } from '@/components/feedback/mutation-feedback';
import { useTaskCatalog } from '@/features/catalog';
import { useMutation } from '@/hooks/async/use-mutation';
import { businessLabel } from '@/lib/formatting/business-labels';

import type { profileEnUS } from '../locales/en-US';
import {
  type ProfilePreferences,
  profilePreferences,
  validateProfilePreferences,
} from '../model/profile';

export function ProfilePreferencesForm({
  profile,
  savePreferences,
  onSaved,
}: {
  profile: ProfilePreferences;
  savePreferences: (patch: UpdateProfilePreferencesRequest) => Promise<void>;
  onSaved: () => void;
}) {
  const { projects } = useTaskCatalog();
  const { t, i18n } = useTranslation();
  const mutation = useMutation();
  const [preferenceChanges, setPreferenceChanges] = useState<Partial<ProfilePreferences>>({});
  const [preferenceError, setPreferenceError] = useState<keyof typeof profileEnUS.validation | ''>(
    '',
  );

  const preferences = { ...profilePreferences(profile), ...preferenceChanges };
  const preferenceDirty = Object.entries(preferenceChanges).some(
    ([key, value]) => value !== profile[key as keyof ProfilePreferences],
  );

  return (
    <Panel
      title={t('profile.workspacePreferences')}
      description={t('profile.savedPreferencesApplyForThisSession')}
    >
      <MutationFeedback pending={mutation.pending} error={mutation.error} />
      <Form
        inert={mutation.pending}
        aria-busy={mutation.pending}
        size="medium"
        className="w-full [padding:0_var(--vd-spacing-20)] viewport-max-640:px-16"
        onSubmit={(event) => {
          event.preventDefault();

          const invalid = validateProfilePreferences(preferences, projects);

          if (Object.keys(invalid).length) {
            setPreferenceError(Object.values(invalid)[0]!);

            return;
          }

          void mutation.run(async () => {
            await savePreferences(preferenceChanges);

            setPreferenceChanges({});
            setPreferenceError('');
            onSaved();
          });
        }}
      >
        <div
          className={[
            '[&_+_&]:[border-top:1px_solid_var(--vd-border-subtle)] [&_h3]:[margin:0_0_var(--vd-spacing-6)] [&_h3]:text-(length:--vd-font-size-13)',
            "[&_p]:m-0 [&_p]:text-(length:--vd-font-size-12) [&_p]:text-text-secondary [&_[role='radiogroup']]:flex-wrap",
            'viewport-max-640:flex-col viewport-max-640:gap-16',
            'flex [align-items:start] justify-between gap-32 [padding:var(--vd-spacing-24)_0]',
          ].join(' ')}
        >
          <div>
            <h3>{t('profile.focusProject')}</h3>
            <p>{t('profile.theProjectHighlightedOnYourProfileOverview')}</p>
          </div>
          <div className="viewport-max-640:w-full [width:250px] [flex-shrink:0] grid gap-16">
            <FilterSelect
              label={t('profile.preferredProject')}
              value={preferences.focusProject}
              onChange={(value) =>
                setPreferenceChanges((previous) => ({ ...previous, focusProject: value }))
              }
              options={projects.map((item) => ({
                value: item.id,
                label: businessLabel(item.name, i18n.language),
              }))}
            />
          </div>
        </div>
        <div
          className={[
            '[&_+_&]:[border-top:1px_solid_var(--vd-border-subtle)] [&_h3]:[margin:0_0_var(--vd-spacing-6)] [&_h3]:text-(length:--vd-font-size-13)',
            "[&_p]:m-0 [&_p]:text-(length:--vd-font-size-12) [&_p]:text-text-secondary [&_[role='radiogroup']]:flex-wrap",
            'viewport-max-640:flex-col viewport-max-640:gap-16',
            'flex [align-items:start] justify-between gap-32 [padding:var(--vd-spacing-24)_0]',
          ].join(' ')}
        >
          <div>
            <h3>{t('profile.dailyDigest')}</h3>
            <p>{t('profile.keepYourPreferredReviewTimeWithYourWorkspaceSettings')}</p>
          </div>
          <div className="viewport-max-640:w-full [width:250px] [flex-shrink:0] grid gap-16">
            <Switch
              checked={preferences.digest}
              onCheckedChange={(checked) =>
                setPreferenceChanges((previous) => ({ ...previous, digest: checked }))
              }
            >
              {t('profile.dailyDigestEnabled')}
            </Switch>
            <Field disabled={!preferences.digest}>
              <Field.Label>{t('profile.digestTime')}</Field.Label>
              <TimePicker
                size="medium"
                value={preferences.digestTime}
                onValueChange={(value) =>
                  setPreferenceChanges((previous) => ({ ...previous, digestTime: value }))
                }
              />
              <Field.Description>{t('profile.asiaShanghai')}</Field.Description>
            </Field>
          </div>
        </div>
        <div
          className={[
            '[&_+_&]:[border-top:1px_solid_var(--vd-border-subtle)] [&_h3]:[margin:0_0_var(--vd-spacing-6)] [&_h3]:text-(length:--vd-font-size-13)',
            "[&_p]:m-0 [&_p]:text-(length:--vd-font-size-12) [&_p]:text-text-secondary [&_[role='radiogroup']]:flex-wrap",
            'viewport-max-640:flex-col viewport-max-640:gap-16',
            'flex [align-items:start] justify-between gap-32 [padding:var(--vd-spacing-24)_0]',
          ].join(' ')}
        >
          <div>
            <h3>{t('profile.reviewReminders')}</h3>
            <p>{t('profile.storeYourPreferenceForAcceptanceReviewReminders')}</p>
          </div>
          <Switch
            appearance="fader"
            checked={preferences.reviewReminders}
            onCheckedChange={(checked) =>
              setPreferenceChanges((previous) => ({
                ...previous,
                reviewReminders: checked,
              }))
            }
          >
            {t('profile.reviewRemindersEnabled')}
          </Switch>
        </div>
        <div
          className={[
            '[&_+_&]:[border-top:1px_solid_var(--vd-border-subtle)] [&_h3]:[margin:0_0_var(--vd-spacing-6)] [&_h3]:text-(length:--vd-font-size-13)',
            "[&_p]:m-0 [&_p]:text-(length:--vd-font-size-12) [&_p]:text-text-secondary [&_[role='radiogroup']]:flex-wrap",
            'viewport-max-640:flex-col viewport-max-640:gap-16',
            'flex [align-items:start] justify-between gap-32 [padding:var(--vd-spacing-24)_0]',
          ].join(' ')}
        >
          <div>
            <h3>{t('profile.activitySpacing')}</h3>
            <p>{t('profile.chooseHowTheActivityTimelineReadsOnYourProfile')}</p>
          </div>
          <Radio.Group
            value={preferences.compactActivity ? 'compact' : 'comfortable'}
            aria-label={t('profile.activitySpacing')}
            orientation="horizontal"
            onValueChange={(value) =>
              setPreferenceChanges((previous) => ({
                ...previous,
                compactActivity: value === 'compact',
              }))
            }
          >
            <Radio value="comfortable">{t('profile.comfortable')}</Radio>
            <Radio value="compact">{t('profile.compact')}</Radio>
          </Radio.Group>
        </div>
        {preferenceError ? (
          <Alert intent="error">
            <Alert.Title>{t(`profile.validation.${preferenceError}`)}</Alert.Title>
          </Alert>
        ) : null}
        <div className="[border-top:1px_solid_var(--vd-border-subtle)] flex items-center justify-between flex-wrap gap-12 [padding:var(--vd-spacing-20)_0]">
          <span className="text-text-tertiary [font-size:var(--vd-font-size-11)]">
            {preferenceDirty
              ? t('profile.unsavedPreferenceChanges')
              : t('profile.preferencesAreUpToDate')}
          </span>
          <Button size="medium" type="submit" disabled={mutation.pending || !preferenceDirty}>
            {t('profile.savePreferences')}
          </Button>
        </div>
      </Form>
    </Panel>
  );
}
