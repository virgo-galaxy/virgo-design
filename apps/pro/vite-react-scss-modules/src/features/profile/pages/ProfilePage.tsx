import { SettingsIcon, UserIcon } from '@virgo-design/icons';
import { Avatar, Badge, Button, Surface, Tabs, Tag, Timeline, Toast } from '@virgo-design/ui';
import { type CSSProperties, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

import { getActivity } from '@/api/analytics';
import { getTasks } from '@/api/tasks';
import { Panel } from '@/components/panel/Panel';
import { UserGenderIcon } from '@/components/user-gender-icon/UserGenderIcon';
import type { ProfileIdentityDto, UpdateProfileIdentityRequest } from '@/contracts/profile';
import { useCurrentUser } from '@/features/auth';
import { CatalogBoundary, Person, projectName, useTaskCatalog } from '@/features/catalog';
import { projectDetailPath, projectHandoffPath } from '@/features/projects';
import { useTaskDependentQuery } from '@/features/tasks';
import { isAdmin } from '@/lib/auth/permissions';
import { businessLabel, formatWorkLocation } from '@/lib/demo/labels';
import { routePath } from '@/routes';
import { RemoteState } from '@/shared/async/RemoteState';
import { ResourceContent } from '@/shared/async/ResourceContent';
import shared from '@/styles/product-layout.module.scss';

import { ProfileEditor } from '../components/ProfileEditor/ProfileEditor';
import { ProfilePreferencesForm } from '../components/ProfilePreferencesForm';
import { useProfileIdentityResource, useProfilePreferencesData } from '../context/resource';
import { avatarForeground, profileInitials } from '../model/profile';
import styles from './ProfilePage.module.scss';

function ProfilePageView({
  profile,
  saveIdentity,
  preferenceResource,
}: {
  profile: ProfileIdentityDto;
  saveIdentity: (patch: UpdateProfileIdentityRequest) => Promise<void>;
  preferenceResource: ReturnType<typeof useProfilePreferencesData>;
}) {
  const { projects } = useTaskCatalog();
  const activityResource = useTaskDependentQuery(getActivity);
  const reviewsResource = useTaskDependentQuery(loadReviewCount);
  const activity = activityResource.data ?? [];

  const { t, i18n } = useTranslation();
  const [editing, setEditing] = useState(false);
  const [notice, setNotice] = useState<{ id: number; kind: 'preferences' | 'profile' } | null>(
    null,
  );
  const noticeId = useRef(0);

  const user = useCurrentUser()!;
  const admin = isAdmin(user);
  const manager = admin || user.role === 'manager';
  const roleLabel = t(`auth.login.roles.${user.role}`);
  const editRef = useRef<HTMLButtonElement>(null);

  const notify = (kind: 'preferences' | 'profile') => setNotice({ id: ++noticeId.current, kind });
  const focusProject = preferenceResource.data
    ? projects.find((item) => item.id === preferenceResource.data?.focusProject)
    : undefined;

  return (
    <Toast.Provider>
      <div className={shared.page}>
        <Surface border="default" radius={12} className={styles.identity}>
          <div className={styles.identityMain}>
            <Badge dot intent="success">
              <Avatar
                size="md"
                shape="square"
                className={styles.heroAvatar!}
                {...(profile.avatarImage ? { src: profile.avatarImage } : {})}
                fallback={profileInitials(profile.name)}
                style={{
                  background: profile.avatarImage ? 'transparent' : profile.avatarColor,
                  border: 'none',
                  color: avatarForeground(profile.avatarColor),
                }}
              />
            </Badge>
            <div>
              <span className={shared.eyebrow}>
                {t('profile.virgoStudio')} / {roleLabel}
              </span>
              <h1>
                {businessLabel(profile.name, i18n.language)}
                <UserGenderIcon gender={user.gender} />
              </h1>
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
                      {user.workLocation ? (
                        <div>
                          <dt>{t('shared.workLocation')}</dt>
                          <dd>{formatWorkLocation(user.workLocation, i18n.language)}</dd>
                        </div>
                      ) : null}
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
                      <Link className={shared.link} to={routePath('projects')}>
                        {t('profile.projectPortfolio')}
                      </Link>
                    </div>
                  </li>
                  <li>
                    <span className={shared.mono}>02</span>
                    <div>
                      <h3>
                        {t(manager ? 'profile.makeAcceptanceVisible' : 'profile.yourReviews')}
                        {reviewsResource.error ? (
                          <RemoteState
                            error={reviewsResource.error}
                            retry={reviewsResource.retry}
                          />
                        ) : (
                          <Badge
                            count={reviewsResource.data?.total ?? 0}
                            intent="warning"
                            showZero
                          />
                        )}
                      </h3>
                      <p>{t('profile.reviewOwnershipAndTheNotesBehindPendingWork')}</p>
                      <Link className={shared.link} to={routePath('tasks') + '?status=in_review'}>
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
                        <Link className={shared.link} to={projectHandoffPath(focusProject.id)}>
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
                        <Link className={shared.link} to={routePath('tasks')}>
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
            <ResourceContent resource={preferenceResource}>
              {(preferences) => (
                <ProfilePreferencesForm
                  profile={preferences}
                  savePreferences={preferenceResource.savePreferences}
                  onSaved={() => notify('preferences')}
                />
              )}
            </ResourceContent>
          </Tabs.Panel>
          <Tabs.Panel value="activity">
            {activityResource.error || !activityResource.data ? (
              <RemoteState {...activityResource} />
            ) : null}
            <Panel
              title={t('profile.aroundYourWorkspace')}
              description={t('profile.recordedTeamActivityOctober12026')}
            >
              <div className={shared.body}>
                <Timeline
                  size="medium"
                  aria-label={t('profile.profileWorkspaceActivity')}
                  style={
                    {
                      '--timeline-gap': preferenceResource.data?.compactActivity ? '12px' : '28px',
                    } as CSSProperties
                  }
                >
                  {activity.map((event) => (
                    <Timeline.Item key={event.id} status={event.status}>
                      <Timeline.Title>{businessLabel(event.name, i18n.language)}</Timeline.Title>
                      <Timeline.Description>
                        {event.taskTitle && event.action
                          ? t(`workplace.activityActions.${event.action}`, {
                              title: businessLabel(event.taskTitle, i18n.language),
                            })
                          : t('workplace.activityUpdated')}
                      </Timeline.Description>
                      <Timeline.Time dateTime={event.dateTime}>
                        {new Intl.DateTimeFormat(i18n.language, {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        }).format(new Date(event.dateTime))}{' '}
                        · {businessLabel(projectName(event.project, projects), i18n.language)}
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
              await saveIdentity(next);
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

const loadReviewCount = (signal: AbortSignal) => getTasks({ scope: 'review', pageSize: 1 }, signal);

function ProfileResource() {
  const resource = useProfileIdentityResource();
  const preferences = useProfilePreferencesData();

  if (!resource.data) return <RemoteState {...resource} />;

  return (
    <>
      {resource.error ? <RemoteState error={resource.error} retry={resource.retry} /> : null}
      <ProfilePageView
        profile={resource.data}
        saveIdentity={resource.saveIdentity}
        preferenceResource={preferences}
      />
    </>
  );
}

export function ProfilePage() {
  return (
    <CatalogBoundary>
      <ProfileResource />
    </CatalogBoundary>
  );
}
