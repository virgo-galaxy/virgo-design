import { Alert, Button, Field, Form, Radio, Switch, TimePicker } from '@virgo-design/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { FilterSelect } from '@/components/filter-select/FilterSelect';
import { MutationFeedback } from '@/components/mutation-feedback/MutationFeedback';
import { Panel } from '@/components/panel/Panel';
import type { UpdateProfilePreferencesRequest } from '@/contracts/profile';
import { useTaskCatalog } from '@/features/catalog';
import { useMutation } from '@/hooks/use-mutation';
import { businessLabel } from '@/lib/demo/labels';
import shared from '@/styles/product-layout.module.scss';

import type { profileEnUS } from '../locales/en-US';
import {
  type ProfilePreferences,
  profilePreferences,
  validateProfilePreferences,
} from '../model/profile';
import styles from './ProfilePreferencesForm.module.scss';

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
        className={styles.preferencesForm}
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
        <div className={styles.preferenceRow}>
          <div>
            <h3>{t('profile.focusProject')}</h3>
            <p>{t('profile.theProjectHighlightedOnYourProfileOverview')}</p>
          </div>
          <div className={styles.preferenceControl}>
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
        <div className={styles.preferenceRow}>
          <div>
            <h3>{t('profile.dailyDigest')}</h3>
            <p>{t('profile.keepYourPreferredReviewTimeWithYourWorkspaceSettings')}</p>
          </div>
          <div className={styles.preferenceControl}>
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
        <div className={styles.preferenceRow}>
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
        <div className={styles.preferenceRow}>
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
        <div className={styles.preferenceFooter}>
          <span className={shared.caption}>
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
