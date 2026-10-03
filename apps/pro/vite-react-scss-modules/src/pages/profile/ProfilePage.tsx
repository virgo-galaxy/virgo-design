import { CloseIcon, SettingsIcon, UploadIcon, UserIcon } from '@virgo-design/icons';
import {
  Alert,
  Avatar,
  Badge,
  Button,
  ColorPicker,
  Drawer,
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
import {
  type CSSProperties,
  type Dispatch,
  type SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Link } from 'react-router';

import {
  avatarFileError,
  avatarForeground,
  profileInitials,
  type ProfileState,
  validateProfile,
} from '@/data/pro-workflows';
import { projectDetailPath, projects } from '@/data/projects';
import type { TaskState } from '@/data/tasks';
import { activity } from '@/data/workplace';
import { FilterSelect, Panel, Person } from '@/pages/shared/ProPage';
import shared from '@/pages/shared/ProPage.module.scss';

import styles from './ProfilePage.module.scss';

function ProfileEditor({
  profile,
  onSave,
  onClose,
  restoreFocus,
}: {
  profile: ProfileState;
  onSave: (profile: ProfileState) => void;
  onClose: () => void;
  restoreFocus: () => void;
}) {
  const [draft, setDraft] = useState(profile);
  const [errors, setErrors] = useState<ReturnType<typeof validateProfile>>({});
  const [discard, setDiscard] = useState(false);
  const [reading, setReading] = useState(false);
  const [imageError, setImageError] = useState('');
  const formRef = useRef<HTMLFormElement>(null);
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
    <Drawer.Root
      open
      onOpenChange={(open) => {
        if (!open) close();
      }}
    >
      <Drawer.Portal>
        <Drawer.Overlay />
        <Drawer.Content
          size="md"
          className={styles.drawer}
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            restoreFocus();
          }}
        >
          <Drawer.Header className={styles.drawerHeader}>
            <div>
              <Drawer.Title>Edit your profile</Drawer.Title>
              <Drawer.Description>Your identity in the Virgo Studio workspace.</Drawer.Description>
            </div>
            <Drawer.Close aria-label="Close profile editor" variant="text">
              <CloseIcon />
            </Drawer.Close>
          </Drawer.Header>
          <Drawer.Body>
            <Form
              ref={formRef}
              id="profile-editor"
              size="small"
              noValidate
              className={styles.editorForm}
              onSubmit={(event) => {
                event.preventDefault();
                const invalid = validateProfile(draft);
                setErrors(invalid);
                if (Object.keys(invalid).length) {
                  requestAnimationFrame(() =>
                    formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus(),
                  );
                  return;
                }
                alive.current = false;
                onSave({
                  ...draft,
                  name: draft.name.trim(),
                  headline: draft.headline.trim(),
                  bio: draft.bio.trim(),
                });
                onClose();
              }}
            >
              <div className={styles.photoRow}>
                <Avatar
                  size="lg"
                  fallback={profileInitials(draft.name)}
                  {...(draft.avatarImage ? { src: draft.avatarImage } : {})}
                  style={{
                    background: draft.avatarColor,
                    color: avatarForeground(draft.avatarColor),
                  }}
                />
                <div>
                  <strong>Profile photo</strong>
                  <p>PNG, JPEG or WebP · up to 2 MB</p>
                </div>
                {reading ? <Spinner size="sm" aria-label="Reading profile photo" /> : null}
              </div>
              <Field invalid={Boolean(imageError)}>
                <Field.Label>Choose a photo</Field.Label>
                <Input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  size="small"
                  onChange={async (event) => {
                    const file = event.target.files?.[0];
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
                      if (alive.current && revision === photoRevision.current)
                        update('avatarImage', url);
                    } catch {
                      if (alive.current && revision === photoRevision.current)
                        setImageError('This image could not be read. Choose another photo.');
                    } finally {
                      if (alive.current && revision === photoRevision.current) setReading(false);
                    }
                  }}
                  prefix={<UploadIcon />}
                />
                {imageError ? (
                  <Field.Message>{imageError}</Field.Message>
                ) : (
                  <Field.Description>The selected photo is kept in this session.</Field.Description>
                )}
              </Field>
              {draft.avatarImage ? (
                <Button
                  size="small"
                  variant="text"
                  type="button"
                  onClick={() => {
                    photoRevision.current++;
                    setReading(false);
                    update('avatarImage', '');
                  }}
                >
                  Remove photo
                </Button>
              ) : null}
              <Separator decorative />
              <Field required invalid={Boolean(errors.name)}>
                <Field.Label>Display name</Field.Label>
                <Input
                  value={draft.name}
                  maxLength={60}
                  onChange={(event) => update('name', event.target.value)}
                />
                {errors.name ? <Field.Message>{errors.name}</Field.Message> : null}
              </Field>
              <Field invalid={Boolean(errors.headline)}>
                <Field.Label>Headline</Field.Label>
                <Input
                  value={draft.headline}
                  maxLength={100}
                  onChange={(event) => update('headline', event.target.value)}
                />
                {errors.headline ? <Field.Message>{errors.headline}</Field.Message> : null}
              </Field>
              <Field invalid={Boolean(errors.bio)}>
                <Field.Label>About you</Field.Label>
                <Textarea
                  rows={4}
                  value={draft.bio}
                  maxLength={600}
                  onChange={(event) => update('bio', event.target.value)}
                />
                <Field.Description>{draft.bio.length}/600 characters</Field.Description>
                {errors.bio ? <Field.Message>{errors.bio}</Field.Message> : null}
              </Field>
              <Field invalid={Boolean(errors.avatarColor)}>
                <Field.Label>Avatar background</Field.Label>
                <ColorPicker
                  size="small"
                  value={draft.avatarColor}
                  onValueChange={(value) => update('avatarColor', value)}
                >
                  <div className={styles.colorRow}>
                    <ColorPicker.Trigger aria-label="Choose avatar color">
                      <ColorPicker.Preview />
                    </ColorPicker.Trigger>
                    <ColorPicker.HexField aria-label="Avatar hex color" />
                    {['#1664f9', '#127d55', '#824bc2', '#bf432a'].map((color) => (
                      <ColorPicker.Swatch
                        key={color}
                        value={color}
                        aria-label={`Avatar color ${color}`}
                      />
                    ))}
                  </div>
                  <ColorPicker.Content
                    aria-label="Avatar color picker"
                    className={styles.colorPanel}
                  >
                    <ColorPicker.Area
                      saturationLabel="Avatar color saturation"
                      brightnessLabel="Avatar color brightness"
                    />
                    <ColorPicker.Hue aria-label="Avatar color hue" />
                    <ColorPicker.HexField aria-label="Picker hex color" />
                  </ColorPicker.Content>
                </ColorPicker>
                {errors.avatarColor ? <Field.Message>{errors.avatarColor}</Field.Message> : null}
                <Field.Description>
                  Shown behind your initials when no photo is selected.
                </Field.Description>
              </Field>
            </Form>
          </Drawer.Body>
          <Drawer.Footer className={styles.drawerFooter}>
            {discard ? (
              <Alert intent="warning">
                <Alert.Title>Discard profile changes?</Alert.Title>
                <Alert.Description>Your saved profile will stay as it is.</Alert.Description>
                <Alert.Action>
                  <Button
                    size="small"
                    variant="outline"
                    onClick={() => {
                      alive.current = false;
                      onClose();
                    }}
                  >
                    Discard changes
                  </Button>
                  <Button size="small" onClick={() => setDiscard(false)}>
                    Keep editing
                  </Button>
                </Alert.Action>
              </Alert>
            ) : (
              <>
                <span className={shared.caption}>
                  {dirty ? 'Unsaved changes' : 'Your profile is up to date'}
                </span>
                <Button
                  size="small"
                  type="submit"
                  form="profile-editor"
                  disabled={!dirty || reading}
                >
                  Save profile
                </Button>
              </>
            )}
          </Drawer.Footer>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

export function ProfilePage({
  profile,
  setProfile,
  state,
}: {
  profile: ProfileState;
  setProfile: Dispatch<SetStateAction<ProfileState>>;
  state: TaskState;
}) {
  const [editing, setEditing] = useState(false);
  const [preferences, setPreferences] = useState(profile);
  const [preferenceError, setPreferenceError] = useState('');
  const [notice, setNotice] = useState<{ id: number; text: string } | null>(null);
  const noticeId = useRef(0);
  const editRef = useRef<HTMLButtonElement>(null);
  const notify = (text: string) => setNotice({ id: ++noticeId.current, text });
  const focusProject = projects.find((item) => item.id === profile.focusProject)!;
  const openReviews = state.tasks.filter((task) => task.status === 'In Review');
  const preferenceDirty =
    preferences.focusProject !== profile.focusProject ||
    preferences.digest !== profile.digest ||
    preferences.digestTime !== profile.digestTime ||
    preferences.reviewReminders !== profile.reviewReminders ||
    preferences.compactActivity !== profile.compactActivity;
  return (
    <Toast.Provider>
      <div className={shared.page}>
        <Surface border="default" radius={12} className={styles.identity}>
          <div className={styles.identityMain}>
            <Badge dot intent="success">
              <Avatar
                size="lg"
                className={styles.heroAvatar!}
                {...(profile.avatarImage ? { src: profile.avatarImage } : {})}
                fallback={profileInitials(profile.name)}
                style={{
                  background: profile.avatarColor,
                  color: avatarForeground(profile.avatarColor),
                }}
              />
            </Badge>
            <div>
              <span className={shared.eyebrow}>VIRGO STUDIO / WORKSPACE OWNER</span>
              <h1>{profile.name}</h1>
              <p>{profile.headline}</p>
              <div className={shared.actions}>
                <Tag size="sm" intent="brand">
                  Owner
                </Tag>
                <Tag size="sm" variant="outline">
                  Product & Design
                </Tag>
              </div>
            </div>
          </div>
          <div className={styles.identityActions}>
            <span className={shared.caption}>Member since September 2026</span>
            <Button
              ref={editRef}
              size="small"
              variant="outline"
              leadingIcon={<UserIcon />}
              onClick={() => setEditing(true)}
            >
              Edit profile
            </Button>
          </div>
        </Surface>
        <Tabs defaultValue="overview" variant="line" className={styles.tabs!}>
          <Tabs.List aria-label="Profile sections">
            <Tabs.Tab value="overview">Overview</Tabs.Tab>
            <Tabs.Tab value="preferences" icon={<SettingsIcon />}>
              Preferences
            </Tabs.Tab>
            <Tabs.Tab value="activity">Activity</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="overview">
            <div className={shared.twoColumns}>
              <div className={shared.stack}>
                <Panel title="About">
                  <div className={shared.body}>
                    <p className={styles.bio}>
                      {profile.bio || 'Add an introduction so your team knows how you work.'}
                    </p>
                    <dl className={styles.accountMetadata}>
                      <div>
                        <dt>Workspace</dt>
                        <dd>Virgo Studio</dd>
                      </div>
                      <div>
                        <dt>Role</dt>
                        <dd>Workspace owner</dd>
                      </div>
                      <div>
                        <dt>Team</dt>
                        <dd>Product & Design</dd>
                      </div>
                      <div>
                        <dt>Time zone</dt>
                        <dd>Asia/Shanghai · UTC+08:00</dd>
                      </div>
                    </dl>
                  </div>
                </Panel>
                <Panel title="Focus project" description="Your preferred starting point">
                  <div className={shared.body}>
                    <span className={shared.eyebrow}>{focusProject.code}</span>
                    <h3 className={styles.focusTitle}>{focusProject.name}</h3>
                    <p className={styles.bio}>{focusProject.summary}</p>
                    <Person id={focusProject.owner} />
                    <div className={styles.focusLink}>
                      <Link className={shared.link} to={projectDetailPath(focusProject)}>
                        Open project record →
                      </Link>
                    </div>
                  </div>
                </Panel>
              </div>
              <Panel
                title="Your workspace responsibilities"
                description="Keep the team’s work clear and connected"
              >
                <ul className={styles.responsibilities}>
                  <li>
                    <span className={shared.mono}>01</span>
                    <div>
                      <h3>Maintain project direction</h3>
                      <p>Four focus areas share one October delivery plan.</p>
                      <Link className={shared.link} to="/work/projects">
                        Project portfolio →
                      </Link>
                    </div>
                  </li>
                  <li>
                    <span className={shared.mono}>02</span>
                    <div>
                      <h3>
                        Make acceptance visible{' '}
                        <Badge count={openReviews.length} intent="warning" showZero />
                      </h3>
                      <p>Review ownership and the notes behind pending work.</p>
                      <Link className={shared.link} to="/data/search-table?status=In+Review">
                        Review queue →
                      </Link>
                    </div>
                  </li>
                  <li>
                    <span className={shared.mono}>03</span>
                    <div>
                      <h3>Prepare reliable handoffs</h3>
                      <p>Bring scope, audience and the next checkpoint together.</p>
                      <Link className={shared.link} to="/form/step">
                        Prepare a handoff →
                      </Link>
                    </div>
                  </li>
                </ul>
              </Panel>
            </div>
          </Tabs.Panel>
          <Tabs.Panel value="preferences">
            <Panel
              title="Workspace preferences"
              description="Saved preferences apply for this session."
            >
              <Form
                size="small"
                className={styles.preferencesForm}
                onSubmit={(event) => {
                  event.preventDefault();
                  const invalid = validateProfile({
                    ...profile,
                    ...preferences,
                    name: profile.name,
                    headline: profile.headline,
                    bio: profile.bio,
                    avatarColor: profile.avatarColor,
                    avatarImage: profile.avatarImage,
                  });
                  if (Object.keys(invalid).length) {
                    setPreferenceError(Object.values(invalid)[0]!);
                    return;
                  }
                  setProfile((previous) => ({
                    ...previous,
                    focusProject: preferences.focusProject,
                    digest: preferences.digest,
                    digestTime: preferences.digestTime,
                    reviewReminders: preferences.reviewReminders,
                    compactActivity: preferences.compactActivity,
                  }));
                  setPreferenceError('');
                  notify('Workspace preferences saved.');
                }}
              >
                <div className={styles.preferenceRow}>
                  <div>
                    <h3>Focus project</h3>
                    <p>The project highlighted on your profile overview.</p>
                  </div>
                  <div className={styles.preferenceControl}>
                    <FilterSelect
                      label="Preferred project"
                      value={preferences.focusProject}
                      onChange={(value) =>
                        setPreferences((previous) => ({ ...previous, focusProject: value }))
                      }
                      options={projects.map((item) => ({ value: item.id, label: item.name }))}
                    />
                  </div>
                </div>
                <div className={styles.preferenceRow}>
                  <div>
                    <h3>Daily digest</h3>
                    <p>Keep your preferred review time with your workspace settings.</p>
                  </div>
                  <div className={styles.preferenceControl}>
                    <Switch
                      checked={preferences.digest}
                      onCheckedChange={(checked) =>
                        setPreferences((previous) => ({ ...previous, digest: checked }))
                      }
                    >
                      Daily digest enabled
                    </Switch>
                    <Field disabled={!preferences.digest}>
                      <Field.Label>Digest time</Field.Label>
                      <TimePicker
                        size="small"
                        value={preferences.digestTime}
                        onValueChange={(value) =>
                          setPreferences((previous) => ({ ...previous, digestTime: value }))
                        }
                      />
                      <Field.Description>Asia/Shanghai</Field.Description>
                    </Field>
                  </div>
                </div>
                <div className={styles.preferenceRow}>
                  <div>
                    <h3>Review reminders</h3>
                    <p>Store your preference for acceptance review reminders.</p>
                  </div>
                  <Switch
                    appearance="fader"
                    checked={preferences.reviewReminders}
                    onCheckedChange={(checked) =>
                      setPreferences((previous) => ({ ...previous, reviewReminders: checked }))
                    }
                  >
                    Review reminders enabled
                  </Switch>
                </div>
                <div className={styles.preferenceRow}>
                  <div>
                    <h3>Activity spacing</h3>
                    <p>Choose how the activity timeline reads on your profile.</p>
                  </div>
                  <Radio.Group
                    value={preferences.compactActivity ? 'compact' : 'comfortable'}
                    aria-label="Activity spacing"
                    orientation="horizontal"
                    onValueChange={(value) =>
                      setPreferences((previous) => ({
                        ...previous,
                        compactActivity: value === 'compact',
                      }))
                    }
                  >
                    <Radio value="comfortable">Comfortable</Radio>
                    <Radio value="compact">Compact</Radio>
                  </Radio.Group>
                </div>
                {preferenceError ? (
                  <Alert intent="error">
                    <Alert.Title>{preferenceError}</Alert.Title>
                  </Alert>
                ) : null}
                <div className={styles.preferenceFooter}>
                  <span className={shared.caption}>
                    {preferenceDirty ? 'Unsaved preference changes' : 'Preferences are up to date'}
                  </span>
                  <Button size="small" type="submit" disabled={!preferenceDirty}>
                    Save preferences
                  </Button>
                </div>
              </Form>
            </Panel>
          </Tabs.Panel>
          <Tabs.Panel value="activity">
            <Panel
              title="Around your workspace"
              description="Recorded team activity · October 1, 2026"
            >
              <div className={shared.body}>
                <Timeline
                  size="small"
                  aria-label="Profile workspace activity"
                  style={
                    { '--timeline-gap': profile.compactActivity ? '12px' : '28px' } as CSSProperties
                  }
                >
                  {activity.map((event) => (
                    <Timeline.Item key={event.id} status={event.status}>
                      <Timeline.Title>{event.name}</Timeline.Title>
                      <Timeline.Description>{event.action}</Timeline.Description>
                      <Timeline.Time dateTime={event.dateTime}>
                        {event.time} · {event.project}
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
            onSave={(next) => {
              setProfile(next);
              notify('Profile saved. Your workspace identity is up to date.');
            }}
            onClose={() => setEditing(false)}
            restoreFocus={() => editRef.current?.focus()}
          />
        ) : null}
      </div>
      <Toast.Viewport placement="bottom-end" aria-label="Profile feedback" />
      {notice ? (
        <Toast.Root
          key={notice.id}
          intent="success"
          appearance="compact"
          onOpenChange={(open) => {
            if (!open) setNotice(null);
          }}
        >
          <Toast.Title>{notice.text}</Toast.Title>
          <Toast.Close aria-label="Dismiss profile feedback" />
        </Toast.Root>
      ) : null}
    </Toast.Provider>
  );
}
