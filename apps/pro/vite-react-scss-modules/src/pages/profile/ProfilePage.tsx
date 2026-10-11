import { CloseIcon, SettingsIcon, UploadIcon, UserIcon } from '@virgo-design/icons';
import {
  Alert,
  Avatar,
  Badge,
  Button,
  ColorPicker,
  Dialog,
  Field,
  Form,
  Input,
  Radio,
  Separator,
  Spinner,
  Surface,
  Switch,
  Tabs,
  Tag,
  Textarea,
  Timeline,
  TimePicker,
  Toast,
} from '@virgo-design/ui';
import { type CSSProperties, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

import { MutationFeedback } from '@/application/MutationFeedback';
import { useProData } from '@/application/pro-data-context';
import { useCurrentUser } from '@/application/session-context';
import { useMutation } from '@/application/use-mutation';
import {
  accountAvatarImage,
  avatarFileError,
  avatarForeground,
  profileInitials,
  type ProfileState,
  validateProfile,
} from '@/data/pro-workflows';
import { projectDetailPath } from '@/data/projects';
import type { TaskState } from '@/data/tasks';
import { isAdmin } from '@/lib/auth/permissions';
import { businessLabel } from '@/lib/demo/labels';
import { FilterSelect, Panel, Person } from '@/pages/shared/ProPage';
import shared from '@/pages/shared/ProPage.module.scss';
import { getActivityActionLabel } from '@/pages/workplace/activity-presentation';

import type { profileEnUS } from './locales/en-US';
import styles from './ProfilePage.module.scss';

function ProfileEditor({
  profile,
  onSave,
  onClose,
  restoreFocus,
}: {
  profile: ProfileState;
  onSave: (profile: ProfileState) => Promise<void>;
  onClose: () => void;
  restoreFocus: () => void;
}) {
  const { projects } = useProData();
  const mutation = useMutation();
  const { t } = useTranslation();
  const [draft, setDraft] = useState(profile);
  const [errors, setErrors] = useState<ReturnType<typeof validateProfile>>({});
  const [discard, setDiscard] = useState(false);
  const [reading, setReading] = useState(false);
  const [photoName, setPhotoName] = useState('');
  const [imageError, setImageError] = useState<keyof typeof profileEnUS.validation | ''>('');
  const formRef = useRef<HTMLFormElement>(null);
  const photoInput = useRef<HTMLInputElement>(null);
  const photoRevision = useRef(0);
  const alive = useRef(true);
  useEffect(() => {
    alive.current = true;
    return () => {
      alive.current = false;
    };
  }, []);
  const dirty = JSON.stringify(draft) !== JSON.stringify(profile);
  const close = () => {
    if (dirty) setDiscard(true);
    else {
      alive.current = false;
      onClose();
    }
  };
  const update = <Key extends keyof ProfileState>(key: Key, value: ProfileState[Key]) => {
    setDraft((previous) => ({ ...previous, [key]: value }));
    setDiscard(false);
    setErrors((previous) => {
      const next = { ...previous };
      delete next[key];
      return next;
    });
  };
  return (
    <Dialog.Root
      open
      onOpenChange={(open) => {
        if (!open) close();
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content
          size="md"
          className={styles.editorDialog}
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            restoreFocus();
          }}
        >
          <Dialog.Header className={styles.editorHeader}>
            <div>
              <Dialog.Title>{t('profile.editYourProfile')}</Dialog.Title>
              <Dialog.Description>
                {t('profile.yourIdentityInTheVirgoStudioWorkspace')}
              </Dialog.Description>
            </div>
            <Dialog.Close aria-label={t('profile.closeProfileEditor')} variant="text">
              <CloseIcon />
            </Dialog.Close>
          </Dialog.Header>
          <Dialog.Body>
            <MutationFeedback pending={mutation.pending} error={mutation.error} />
            <Form
              inert={mutation.pending}
              aria-busy={mutation.pending}
              ref={formRef}
              id="profile-editor"
              size="medium"
              noValidate
              className={styles.editorForm}
              onSubmit={(event) => {
                event.preventDefault();
                const invalid = validateProfile(draft, projects);
                setErrors(invalid);
                if (Object.keys(invalid).length) {
                  requestAnimationFrame(() =>
                    formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus(),
                  );
                  return;
                }
                void mutation.run(async () => {
                  await onSave({
                    ...draft,
                    name: draft.name.trim(),
                    displayName: draft.name.trim(),
                    headline: draft.headline.trim(),
                    bio: draft.bio.trim(),
                  });
                  alive.current = false;
                  onClose();
                });
              }}
            >
              <Field invalid={Boolean(imageError)} className={styles.fullWidth}>
                <div className={styles.photoLayout}>
                  <div className={styles.photoRow}>
                    <Avatar
                      size="md"
                      shape="square"
                      fallback={profileInitials(draft.name)}
                      {...(draft.avatarImage ? { src: draft.avatarImage } : {})}
                      style={{
                        background: draft.avatarImage ? 'transparent' : draft.avatarColor,
                        border: 'none',
                        color: avatarForeground(draft.avatarColor),
                      }}
                    />
                    <div>
                      <strong>{t('profile.profilePhoto')}</strong>
                      <p>{t('profile.pngJpegOrWebpUpTo2Mb')}</p>
                    </div>
                    {reading ? (
                      <Spinner size="md" aria-label={t('profile.readingProfilePhoto')} />
                    ) : null}
                  </div>
                  <input
                    ref={photoInput}
                    hidden
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={async (event) => {
                      const file = event.currentTarget.files?.[0];
                      // Allow choosing the same file again after removal or a failed read.
                      event.currentTarget.value = '';
                      if (!file) return;
                      const invalid = avatarFileError(file);
                      const revision = ++photoRevision.current;
                      setImageError(invalid);
                      if (invalid) {
                        setReading(false);
                        return;
                      }
                      setReading(true);
                      try {
                        const url = await new Promise<string>((resolve, reject) => {
                          const reader = new FileReader();
                          reader.onload = () => resolve(String(reader.result));
                          reader.onerror = () => reject(new Error('read'));
                          reader.readAsDataURL(file);
                        });
                        const image = new Image();
                        image.src = url;
                        await image.decode();
                        if (alive.current && revision === photoRevision.current) {
                          update('avatarImage', url);
                          setPhotoName(file.name);
                        }
                      } catch {
                        if (alive.current && revision === photoRevision.current)
                          setImageError('imageUnreadable');
                      } finally {
                        if (alive.current && revision === photoRevision.current) setReading(false);
                      }
                    }}
                  />
                  <div className={styles.photoActions}>
                    <Field.Control
                      render={(attributes) => (
                        <Button
                          id={attributes.id}
                          aria-describedby={attributes['aria-describedby']}
                          aria-invalid={attributes['aria-invalid']}
                          aria-busy={reading}
                          disabled={reading}
                          type="button"
                          size="medium"
                          variant="outline"
                          leadingIcon={<UploadIcon />}
                          onClick={() => photoInput.current?.click()}
                        >
                          {draft.avatarImage ? t('profile.changePhoto') : t('profile.chooseAPhoto')}
                        </Button>
                      )}
                    />
                    {draft.avatarImage ? (
                      <Button
                        size="medium"
                        variant="text"
                        type="button"
                        onClick={() => {
                          photoRevision.current++;
                          setReading(false);
                          setImageError('');
                          setPhotoName('');
                          update('avatarImage', '');
                        }}
                      >
                        {t('profile.removePhoto')}
                      </Button>
                    ) : null}
                  </div>
                </div>
                {photoName ? (
                  <p className={styles.photoFilename} role="status">
                    {photoName}
                  </p>
                ) : null}
                {imageError ? (
                  <Field.Message>{t(`profile.validation.${imageError}`)}</Field.Message>
                ) : (
                  <Field.Description>
                    {t('profile.theSelectedPhotoIsKeptInThisSession')}
                  </Field.Description>
                )}
              </Field>
              <Separator decorative className={styles.fullWidth} />
              <Field required invalid={Boolean(errors.name)}>
                <Field.Label>{t('profile.displayName')}</Field.Label>
                <Input
                  value={draft.name}
                  maxLength={60}
                  onChange={(event) => update('name', event.target.value)}
                />
                {errors.name ? (
                  <Field.Message>{t(`profile.validation.${errors.name}`)}</Field.Message>
                ) : null}
              </Field>
              <Field invalid={Boolean(errors.headline)}>
                <Field.Label>{t('profile.headline')}</Field.Label>
                <Input
                  value={draft.headline}
                  maxLength={100}
                  onChange={(event) => update('headline', event.target.value)}
                />
                {errors.headline ? (
                  <Field.Message>{t(`profile.validation.${errors.headline}`)}</Field.Message>
                ) : null}
              </Field>
              <Field invalid={Boolean(errors.bio)} className={styles.fullWidth}>
                <Field.Label>{t('profile.aboutYou')}</Field.Label>
                <Textarea
                  rows={4}
                  value={draft.bio}
                  maxLength={600}
                  onChange={(event) => update('bio', event.target.value)}
                />
                <Field.Description>
                  {t('profile.value600Characters', { v0: draft.bio.length })}
                </Field.Description>
                {errors.bio ? (
                  <Field.Message>{t(`profile.validation.${errors.bio}`)}</Field.Message>
                ) : null}
              </Field>
              <Field invalid={Boolean(errors.avatarColor)} className={styles.fullWidth}>
                <Field.Label>{t('profile.avatarBackground')}</Field.Label>
                <ColorPicker
                  size="medium"
                  value={draft.avatarColor}
                  onValueChange={(value) => update('avatarColor', value)}
                >
                  <div className={styles.colorRow}>
                    <ColorPicker.Trigger aria-label={t('profile.chooseAvatarColor')}>
                      <ColorPicker.Preview />
                    </ColorPicker.Trigger>
                    <ColorPicker.HexField aria-label={t('profile.avatarHexColor')} />
                    {['#1664f9', '#127d55', '#824bc2', '#bf432a'].map((color) => (
                      <ColorPicker.Swatch
                        key={color}
                        value={color}
                        aria-label={t('profile.avatarColorValue', { v0: color })}
                      />
                    ))}
                  </div>
                  <ColorPicker.Content
                    aria-label={t('profile.avatarColorPicker')}
                    className={styles.colorPanel}
                  >
                    <ColorPicker.Area
                      saturationLabel={t('profile.avatarColorSaturation')}
                      brightnessLabel={t('profile.avatarColorBrightness')}
                    />
                    <ColorPicker.Hue aria-label={t('profile.avatarColorHue')} />
                    <ColorPicker.HexField aria-label={t('profile.pickerHexColor')} />
                  </ColorPicker.Content>
                </ColorPicker>
                {errors.avatarColor ? (
                  <Field.Message>{t(`profile.validation.${errors.avatarColor}`)}</Field.Message>
                ) : null}
                <Field.Description>
                  {t('profile.shownBehindYourInitialsWhenNoPhotoIsSelected')}
                </Field.Description>
              </Field>
            </Form>
          </Dialog.Body>
          <Button.Group
            layout="custom"
            render={(groupProps) => (
              <Dialog.Footer {...groupProps} className={styles.editorFooter} />
            )}
          >
            {discard ? (
              <Alert intent="warning">
                <Alert.Title>{t('profile.discardProfileChanges')}</Alert.Title>
                <Alert.Description>{t('profile.yourSavedProfileWillStayAsItIs')}</Alert.Description>
                <Button.Group
                  layout="custom"
                  render={(groupProps) => <Alert.Action {...groupProps} />}
                >
                  <Button
                    size="medium"
                    variant="outline"
                    onClick={() => {
                      alive.current = false;
                      onClose();
                    }}
                  >
                    {t('profile.discardChanges')}
                  </Button>
                  <Button size="medium" onClick={() => setDiscard(false)}>
                    {t('profile.keepEditing')}
                  </Button>
                </Button.Group>
              </Alert>
            ) : (
              <>
                <span className={shared.caption}>
                  {dirty ? t('profile.unsavedChanges') : t('profile.yourProfileIsUpToDate')}
                </span>
                <Button
                  size="medium"
                  type="submit"
                  form="profile-editor"
                  disabled={mutation.pending || !dirty || reading}
                >
                  {t('profile.saveProfile')}
                </Button>
              </>
            )}
          </Button.Group>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export function ProfilePage({
  profile,
  setProfile,
  state,
}: {
  profile: ProfileState;
  setProfile: (next: ProfileState | ((previous: ProfileState) => ProfileState)) => Promise<void>;
  state: TaskState;
}) {
  const { projects, activity } = useProData();

  const mutation = useMutation();
  const { t, i18n } = useTranslation();
  const [editing, setEditing] = useState(false);
  const [preferences, setPreferences] = useState(profile);
  const [preferenceError, setPreferenceError] = useState<keyof typeof profileEnUS.validation | ''>(
    '',
  );
  const [notice, setNotice] = useState<{ id: number; kind: 'preferences' | 'profile' } | null>(
    null,
  );
  const noticeId = useRef(0);
  const user = useCurrentUser()!;
  const admin = isAdmin(user);
  const manager = admin || user.role === 'manager';
  const roleLabel = t(`app.login.roles.${user.role}`);
  const editRef = useRef<HTMLButtonElement>(null);
  const notify = (kind: 'preferences' | 'profile') => setNotice({ id: ++noticeId.current, kind });
  const focusProject = projects.find((item) => item.id === profile.focusProject) ?? projects[0];
  const openReviews = state.tasks.filter((task) => task.status === 'in_review');
  const preferenceDirty =
    preferences.focusProject !== profile.focusProject ||
    preferences.digest !== profile.digest ||
    preferences.digestTime !== profile.digestTime ||
    preferences.reviewReminders !== profile.reviewReminders ||
    preferences.compactActivity !== profile.compactActivity;
  return (
    <Toast.Provider>
      <div className={shared.page}>
        <MutationFeedback pending={mutation.pending} error={mutation.error} />
        <Surface border="default" radius={12} className={styles.identity}>
          <div className={styles.identityMain}>
            <Badge dot intent="success">
              <Avatar
                size="md"
                shape="square"
                className={styles.heroAvatar!}
                {...(accountAvatarImage(profile) ? { src: accountAvatarImage(profile) } : {})}
                fallback={profileInitials(profile.name)}
                style={{
                  background: accountAvatarImage(profile) ? 'transparent' : profile.avatarColor,
                  border: 'none',
                  color: avatarForeground(profile.avatarColor),
                }}
              />
            </Badge>
            <div>
              <span className={shared.eyebrow}>
                {t('profile.virgoStudio')} / {roleLabel}
              </span>
              <h1>{businessLabel(profile.name, i18n.language)}</h1>
              <p>{businessLabel(profile.headline, i18n.language)}</p>
              <Button.Group layout="custom" className={shared.actions}>
                <Tag size="md" intent="brand">
                  {roleLabel}
                </Tag>
                <Tag size="md" variant="outline">
                  {businessLabel(user.department, i18n.language)}
                </Tag>
              </Button.Group>
            </div>
          </div>
          <Button.Group layout="custom" className={styles.identityActions}>
            <span className={shared.caption}>{user.account}</span>
            <Button
              ref={editRef}
              size="medium"
              variant="outline"
              leadingIcon={<UserIcon />}
              onClick={() => setEditing(true)}
            >
              {t('profile.editProfile')}
            </Button>
          </Button.Group>
        </Surface>
        <Tabs defaultValue="overview" variant="line" className={styles.tabs!}>
          <Tabs.List aria-label={t('profile.profileSections')}>
            <Tabs.Tab value="overview">{t('profile.overview')}</Tabs.Tab>
            <Tabs.Tab value="preferences" icon={<SettingsIcon />}>
              {t('profile.preferences')}
            </Tabs.Tab>
            <Tabs.Tab value="activity">{t('profile.activity')}</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="overview">
            <div className={shared.twoColumns}>
              <div className={shared.stack}>
                <Panel title={t('profile.about')}>
                  <div className={shared.body}>
                    <p className={styles.bio}>
                      {businessLabel(profile.bio, i18n.language) ||
                        t('profile.addAnIntroductionSoYourTeamKnowsHowYou')}
                    </p>
                    <dl className={styles.accountMetadata}>
                      <div>
                        <dt>{t('profile.workspace')}</dt>
                        <dd>{t('profile.virgoStudio')}</dd>
                      </div>
                      <div>
                        <dt>{t('profile.role')}</dt>
                        <dd>{roleLabel}</dd>
                      </div>
                      <div>
                        <dt>{t('profile.team')}</dt>
                        <dd>{businessLabel(user.department, i18n.language)}</dd>
                      </div>
                      <div>
                        <dt>{t('profile.timeZone')}</dt>
                        <dd>{t('profile.asiaShanghaiUtc0800')}</dd>
                      </div>
                    </dl>
                  </div>
                </Panel>
                {focusProject ? (
                  <Panel
                    title={t('profile.focusProject')}
                    description={t('profile.yourPreferredStartingPoint')}
                  >
                    <div className={shared.body}>
                      <span className={shared.eyebrow}>{focusProject.code}</span>
                      <h3 className={styles.focusTitle}>
                        {businessLabel(focusProject.name, i18n.language)}
                      </h3>
                      <p className={styles.bio}>
                        {businessLabel(focusProject.summary, i18n.language)}
                      </p>
                      <Person id={focusProject.owner} />
                      <div className={styles.focusLink}>
                        <Link className={shared.link} to={projectDetailPath(focusProject)}>
                          {t('profile.openProjectRecord')}
                        </Link>
                      </div>
                    </div>
                  </Panel>
                ) : null}
              </div>
              <Panel
                title={t('profile.yourWorkspaceResponsibilities')}
                description={t('profile.keepTheTeamSWorkClearAndConnected')}
              >
                <ul className={styles.responsibilities}>
                  <li>
                    <span className={shared.mono}>01</span>
                    <div>
                      <h3>
                        {t(manager ? 'profile.maintainProjectDirection' : 'profile.yourProjects')}
                      </h3>
                      <p>{t('profile.projectScope', { count: projects.length })}</p>
                      <Link className={shared.link} to="/work/projects">
                        {t('profile.projectPortfolio')}
                      </Link>
                    </div>
                  </li>
                  <li>
                    <span className={shared.mono}>02</span>
                    <div>
                      <h3>
                        {t(manager ? 'profile.makeAcceptanceVisible' : 'profile.yourReviews')}
                        <Badge count={openReviews.length} intent="warning" showZero />
                      </h3>
                      <p>{t('profile.reviewOwnershipAndTheNotesBehindPendingWork')}</p>
                      <Link className={shared.link} to="/work/tasks?status=in_review">
                        {t('profile.reviewQueue')}
                      </Link>
                    </div>
                  </li>
                  {manager && focusProject ? (
                    <li>
                      <span className={shared.mono}>03</span>
                      <div>
                        <h3>{t('profile.prepareReliableHandoffs')}</h3>
                        <p>{t('profile.bringScopeAudienceAndTheNextCheckpointTogether')}</p>
                        <Link
                          className={shared.link}
                          to={projectDetailPath(focusProject) + '/handoff'}
                        >
                          {t('profile.prepareAHandoff')}
                        </Link>
                      </div>
                    </li>
                  ) : (
                    <li>
                      <span className={shared.mono}>03</span>
                      <div>
                        <h3>{t('profile.yourTaskQueue')}</h3>
                        <p>{t('profile.moveYourWorkForward')}</p>
                        <Link className={shared.link} to="/work/tasks">
                          {t('projects.viewTasks')}
                        </Link>
                      </div>
                    </li>
                  )}
                </ul>
              </Panel>
            </div>
          </Tabs.Panel>
          <Tabs.Panel value="preferences">
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
                  const invalid = validateProfile(
                    {
                      ...profile,
                      ...preferences,
                      name: profile.name,
                      headline: profile.headline,
                      bio: profile.bio,
                      avatarColor: profile.avatarColor,
                      avatarImage: profile.avatarImage,
                    },
                    projects,
                  );
                  if (Object.keys(invalid).length) {
                    setPreferenceError(Object.values(invalid)[0]!);
                    return;
                  }
                  void mutation.run(async () => {
                    await setProfile((previous) => ({
                      ...previous,
                      focusProject: preferences.focusProject,
                      digest: preferences.digest,
                      digestTime: preferences.digestTime,
                      reviewReminders: preferences.reviewReminders,
                      compactActivity: preferences.compactActivity,
                    }));
                    setPreferenceError('');
                    notify('preferences');
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
                        setPreferences((previous) => ({ ...previous, focusProject: value }))
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
                        setPreferences((previous) => ({ ...previous, digest: checked }))
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
                          setPreferences((previous) => ({ ...previous, digestTime: value }))
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
                      setPreferences((previous) => ({ ...previous, reviewReminders: checked }))
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
                      setPreferences((previous) => ({
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
                  <Button
                    size="medium"
                    type="submit"
                    disabled={mutation.pending || !preferenceDirty}
                  >
                    {t('profile.savePreferences')}
                  </Button>
                </div>
              </Form>
            </Panel>
          </Tabs.Panel>
          <Tabs.Panel value="activity">
            <Panel
              title={t('profile.aroundYourWorkspace')}
              description={t('profile.recordedTeamActivityOctober12026')}
            >
              <div className={shared.body}>
                <Timeline
                  size="medium"
                  aria-label={t('profile.profileWorkspaceActivity')}
                  style={
                    { '--timeline-gap': profile.compactActivity ? '12px' : '28px' } as CSSProperties
                  }
                >
                  {activity.map((event) => (
                    <Timeline.Item key={event.id} status={event.status}>
                      <Timeline.Title>{businessLabel(event.name, i18n.language)}</Timeline.Title>
                      <Timeline.Description>
                        {getActivityActionLabel(t, event, i18n.language)}
                      </Timeline.Description>
                      <Timeline.Time dateTime={event.dateTime}>
                        {new Intl.DateTimeFormat(i18n.language, {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        }).format(new Date(event.dateTime))}{' '}
                        · {businessLabel(event.project, i18n.language)}
                      </Timeline.Time>
                    </Timeline.Item>
                  ))}
                </Timeline>
              </div>
            </Panel>
          </Tabs.Panel>
        </Tabs>
        {editing ? (
          <ProfileEditor
            profile={profile}
            onSave={async (next) => {
              await setProfile(next);
              notify('profile');
            }}
            onClose={() => setEditing(false)}
            restoreFocus={() => editRef.current?.focus()}
          />
        ) : null}
      </div>
      <Toast.Viewport placement="bottom-end" aria-label={t('profile.profileFeedback')} />
      {notice ? (
        <Toast.Root
          key={notice.id}
          intent="success"
          appearance="compact"
          onOpenChange={(open) => {
            if (!open) setNotice(null);
          }}
        >
          <Toast.Title>
            {notice.kind === 'preferences'
              ? t('profile.workspacePreferencesSaved')
              : t('profile.profileSavedYourWorkspaceIdentityIsUpToDate')}
          </Toast.Title>
          <Toast.Close aria-label={t('profile.dismissProfileFeedback')} />
        </Toast.Root>
      ) : null}
    </Toast.Provider>
  );
}
